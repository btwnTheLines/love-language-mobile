const express = require('express');
const cors = require('cors');

const app = express();

/**
 * Middleware
 */


app.use(express.json()); //Parses JSON requests automatically
app.use(cors()); // Allows requests from decoupled frontends - since backend API

/**
 * Routes
 */

app.use('/api/auth', require('./auth/auth.routes'));

// Optional health check
app.get('/health', (req, res) => {
    res.json({ status: 'API is running'});
})

module.exports = app;