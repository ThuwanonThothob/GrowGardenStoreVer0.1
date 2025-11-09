const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// ใช้ JSON และ CORS
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // เสิร์ฟไฟล์ในโฟลเดอร์ public

// เปิด Database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('เชื่อมต่อ Database ไม่สำเร็จ:', err.message);
  } else {
    console.log('เชื่อมต่อ Database สำเร็จ');
  }
});

// สร้างตาราง
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT, last_name TEXT, gender TEXT, age INTEGER,
    address TEXT, province TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER, total REAL, items TEXT
  )`);
});

// API: บันทึกผู้ใช้
app.post('/api/users', (req, res) => {
  const { firstName, lastName, gender, age, address, province } = req.body;
  db.run(
    `INSERT INTO users (first_name, last_name, gender, age, address, province) VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, gender, age, address, province],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// API: บันทึกคำสั่งซื้อ
app.post('/api/orders', (req, res) => {
  const { userId, total, items } = req.body;
  db.run(
    `INSERT INTO orders (user_id, total, items) VALUES (?, ?, ?)`,
    [userId, total, JSON.stringify(items)],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// API: ดูข้อมูล
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/orders', (req, res) => {
  db.all('SELECT o.*, u.first_name, u.last_name FROM orders o JOIN users u ON o.user_id = u.id', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach(r => r.items = JSON.parse(r.items));
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`ร้านต้นไม้รันที่ http://localhost:${PORT}`);
});