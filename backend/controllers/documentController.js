const multer = require('multer');
const s3 = require('../config/s3');
const Document = require('../models/Document');
const { v4: uuidv4 } = require('uuid');

// Configure multer (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to handle file upload from the request
exports.uploadDocument = upload.single('file');

exports.uploadDocumentHandler = async (req, res) => {
  try {
    
    const { category } = req.body;
   
    const employeeId = req.user.id;

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Create a unique filename
    const fileKey = `${uuidv4()}_${req.file.originalname}`;

    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        console.error('S3 upload error:', err);
        return res.status(500).json({ message: 'Error uploading to S3' });
      }

      // Save file metadata to MongoDB with employeeId from the authenticated user
      const newDoc = new Document({
        filename: req.file.originalname,
        s3_url: data.Location,
        category,
        employeeId
      });
      await newDoc.save();

      res.json({ message: 'File uploaded successfully', document: newDoc });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update listDocuments to filter files by the logged-in user
exports.listDocuments = async (req, res) => {
  try {
    // Only return documents for the authenticated user
    const documents = await Document.find({ employeeId: req.user.id });
    res.json(documents);
  } catch (error) {
    console.error('List documents error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Download a document by generating a signed URL for secure access
exports.downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);
    if (!document) return res.status(404).json({ message: 'Document not found' });
    
    // Extract the encoded key from the S3 URL
    const encodedKey = document.s3_url.split('/').pop();
    // Decode the key so that spaces and special characters are properly restored
    const key = decodeURIComponent(encodedKey);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Expires: 60 // URL valid for 60 seconds
    };
    
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        console.error('Error generating signed URL', err);
        return res.status(500).json({ message: 'Error generating signed URL' });
      }
      res.redirect(url);
    });
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

