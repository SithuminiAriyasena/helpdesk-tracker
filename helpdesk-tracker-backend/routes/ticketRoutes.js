const express = require('express');
const { getTickets, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();

// Middleware to verify JWT could be added here
// For now, we will just create the basic routes

router.get('/', getTickets);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
