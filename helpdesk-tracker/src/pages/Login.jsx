import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Target, Eye, EyeOff, User, Hexagon, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, quickLogin, error: authError, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [previewRole, setPreviewRole] = useState('admin')

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    if (password.length !== 6) return false;
    if (!/[a-zA-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[@#$%!]/.test(password)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!email || !password) {
      setValidationError('Please fill in all fields.')
      return
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email format.')
      return
    }

    if (!validatePassword(password)) {
      setValidationError('Password must be exactly 6 characters and contain at least one letter, one number, and one special symbol (@, #, $, %, !).')
      return
    }

    const ok = await login(email, password)
    if (ok) goToDashboard()
  }

  const goToDashboard = () => {
    setTimeout(() => {
      navigate(email.includes('admin') ? '/admin/dashboard' : '/dashboard')
    }, 0)
  }

  const handleQuickLogin = (role) => {
    quickLogin(role)
    navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')
  }

  const handleRoleSelect = (role) => {
    setPreviewRole(role);
    if (role === 'admin') {
      setEmail('admin@company.com');
      setPassword('Pass@1');
    } else {
      setEmail('sithuminiariyasena@gmail.com');
      setPassword('user@1');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="group flex flex-col items-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5B50FF] shadow-lg group-hover:opacity-90 transition-opacity">
              <Target size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight group-hover:opacity-90 transition-opacity">HelpDesk Tracker</h1>
          </Link>
          <p className="mt-2 text-sm text-slate-400">Sign in to manage IT support tickets</p>
        </div>

        <div className="rounded-[24px] bg-white p-8 shadow-xl">
          <form onSubmit={handleSubmit}>
            <label className="mb-2 block text-sm font-bold text-slate-800">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sithuminiariyasena@gmail.com"
              className="mb-5 w-full rounded-xl bg-slate-100 border-transparent px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#5B50FF] focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all"
            />
            
            <label className="mb-2 block text-sm font-bold text-slate-800">Password</label>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-800 outline-none focus:border-[#5B50FF] focus:ring-2 focus:ring-indigo-200 transition-all"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="mb-6">
              <label className="mb-3 block text-sm font-bold text-slate-800">Log in as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('user')}
                  className={`relative flex items-center justify-start pl-4 gap-3 rounded-xl border py-3 text-sm font-bold transition-all ${
                    previewRole === 'user'
                      ? 'border-[#5B50FF] bg-indigo-50/50 text-[#5B50FF]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User size={18} />
                  User
                  {previewRole === 'user' && (
                    <CheckCircle2 size={16} className="absolute right-3 top-3 text-[#5B50FF]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin')}
                  className={`relative flex items-center justify-start pl-4 gap-3 rounded-xl border py-3 text-sm font-bold transition-all ${
                    previewRole === 'admin'
                      ? 'border-[#5B50FF] bg-indigo-50/50 text-[#5B50FF]'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Hexagon size={18} />
                  Admin
                  {previewRole === 'admin' && (
                    <CheckCircle2 size={16} className="absolute right-3 top-3 text-[#5B50FF]" />
                  )}
                </button>
              </div>
            </div>

            {(validationError || authError) && (
              <p className="mb-4 text-sm font-medium text-red-500">{validationError || authError}</p>
            )}
            
            <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-[#5B50FF] py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-600 shadow-sm"
          >
            Sign in
          </button>
          {/* Google Login */}
          <button
            type="button"
            className="mt-2 w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-sm"
            onClick={() => window.location.href='http://localhost:5000/auth/google'}
          >
            Sign in with Google
          </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-xs text-slate-500/80 leading-relaxed">
          User: sithuminiariyasena@gmail.com (password: "user@1")<br/>Admin: admin@company.com (password: "Pass@1")
        </p>
      </div>
    </div>
  )
}
