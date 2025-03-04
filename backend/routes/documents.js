const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const apiKeyMiddleware = require('../middlewares/apiKey');
const {
  uploadDocument,
  uploadDocumentHandler,
  listDocuments,
  downloadDocument
} = require('../controllers/documentController');

// Protect all document routes with both API key and login authentication
router.post('/upload', apiKeyMiddleware, auth, uploadDocument, uploadDocumentHandler);

router.get('/', apiKeyMiddleware, auth, listDocuments);

router.get('/download/:id', apiKeyMiddleware, downloadDocument);


module.exports = router;
