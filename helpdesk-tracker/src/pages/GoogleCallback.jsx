import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  // We'll manually parse the token and then fetch the user profile in a real app,
  // but for now let's just log them in if there's a token
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      // Decode JWT payload (base64) to get user info if needed,
      // or we can just fetch from a /me endpoint using the token.
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = atob(payloadBase64);
        const user = JSON.parse(payloadDecoded);
        
        localStorage.setItem('helpdesk_token', token);
        localStorage.setItem('helpdesk_user', JSON.stringify(user));
        
        // Use a simple reload to let the auth context pick up the local storage,
        // or we could add a `setSession(user, token)` method to AuthContext.
        window.location.href = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      } catch (err) {
        console.error('Failed to parse token', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] text-white">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Completing Google Sign In...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  );
}
