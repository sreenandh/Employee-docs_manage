import React from 'react';

const DocumentList = ({ documents, token }) => {
  return (
    <div className="document-list">
      <h3>Uploaded Documents</h3>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Category</th>
            <th>Uploaded At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.filename}</td>
              <td>{doc.category}</td>
              <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
             <td>
                <a 
                  href={`http://localhost:5000/api/documents/download/${doc._id}?x-api-key=rfcruujguahtucnlwzwgkylpfhdhrmdd`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
 