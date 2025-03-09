import React, { useState } from "react";

const UploadForm = ({ token, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Personal");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": "rfcruujguahtucnlwzwgkylpfhdhrmdd",
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Upload succesfull");
        // Refresh the document list after it successfully uploaded
        onUploadSuccess();
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (error) {
      setMessage("Upload error");
    }
  };

  return (
    <div className="upload-form">
      <h3>Upload Document</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Education">Education</option>
          <option value="Professional">Professional</option>
        </select>
        <br />
        <button type="submit">Upload</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadForm;
