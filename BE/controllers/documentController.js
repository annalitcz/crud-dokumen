const documentModel = require("../models/document");

// Upload Document
exports.uploadDocument = async (req, res) => {
  const userId = req.userId;
  const file = req.file; 

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const document = await documentModel.uploadDocument(
      userId,
      file.originalname, file.mimetype, file.size, file.buffer
    );

    res.status(201).json({ message: "File uploaded successfully", document });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Documents by User
exports.getDocumentsByUser = async (req, res) => {
  const userId = req.userId;
  try {
    const documents = await documentModel.getDocumentsByUser(userId);
    res.json({ message: "Documents retrieved successfully", documents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Document
exports.deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await documentModel.deleteDocumentById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "Document deleted successfully", document });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
