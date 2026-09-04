const db = require('../config/db');

exports.getTickets = async (req, res) => {
  try {
    const [tickets] = await db.query('SELECT * FROM tickets');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createTicket = async (req, res) => {
  const { title, description, priority, category, requestedBy } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO tickets (title, description, priority, category, requestedBy, status, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, priority, category, requestedBy, 'Open', new Date().toISOString().slice(0, 10)]
    );

    res.status(201).json({ message: 'Ticket created', ticketId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;
  
  try {
    const [result] = await db.query(
      'UPDATE tickets SET status = ?, assignedTo = ? WHERE id = ?',
      [status, assignedTo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
