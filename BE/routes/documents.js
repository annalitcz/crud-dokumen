const express = require('express');
const multer = require('multer');
const { uploadDocument, getDocumentsByUser, deleteDocument } = require('../controllers/documentController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Penyimpanan file sementara di memori

// Route untuk upload dokumen
router.post('/uploads', authMiddleware, upload.single('file'), uploadDocument);

// Route untuk mengambil dokumen berdasarkan userId
router.get('/:userId', authMiddleware, getDocumentsByUser);

// Route untuk menghapus dokumen berdasarkan id
router.delete('/:id', authMiddleware, deleteDocument);

module.exports = { documentRouter: router };
