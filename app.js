const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'supertumsdb'
});

// Route to fetch all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
            throw err;
        }
        res.json(results);
    });
});

// Route to fetch a specific user by ID
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Route to fetch all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
            throw err;
        }
        res.json(results);
    });
});

// Route to fetch a specific product by ID
app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Server error' });
            throw err;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});