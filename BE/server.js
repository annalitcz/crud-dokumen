const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { authRouter } = require('./routes/auth');
const { documentRouter } = require('./routes/documents');
const {getDocumentsByUser} = require('./models/document')
const app = express();
const port = 3000;

// Middleware
app.use(cors());  // Menangani CORS
app.use(express.json());  // Middleware untuk parsing JSON (ganti body-parser dengan express.json())
app.use(express.static('public')); 

// Konfigurasi multer untuk menyimpan file di memori
const upload = multer({ storage: multer.memoryStorage() });

// Routes
app.use('/auth', authRouter);
app.use('/documents', documentRouter);

// Global Error Handler untuk menangani error yang tidak terduga
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
