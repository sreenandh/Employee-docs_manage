import React, { useState, useEffect } from 'react';
import UploadForm from './UploadForm';
import DocumentList from './DocumentList';

const Dashboard = ({ token, onLogout }) => {
  const [documents, setDocuments] = useState([]);

  // Function to fetch documents from the backend
  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/documents/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': 'rfcruujguahtucnlwzwgkylpfhdhrmdd'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setDocuments(data);
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  // Fetch documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>Employee Documents Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      {/* Pass refresh callback to UploadForm */}
      <UploadForm token={token} onUploadSuccess={fetchDocuments} />
      {/* Pass the documents list to DocumentList */}
      <DocumentList documents={documents} token={token} />
    </div>
  );
};

export default Dashboard;
