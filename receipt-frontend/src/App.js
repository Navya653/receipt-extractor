import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/extract-receipt-details', formData);
      setReceipt(res.data);
    } catch (err) {
      alert('Error uploading file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🧾 Receipt Extractor</h1>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload & Extract'}
      </button>

      {receipt && (
        <div className="receipt-output">
          <h2>Receipt Details</h2>
          <p><strong>Date:</strong> {receipt.date}</p>
          <p><strong>Vendor:</strong> {receipt.vendor_name}</p>
          <p><strong>Currency:</strong> {receipt.currency}</p>
          <p><strong>Tax:</strong> {receipt.tax}</p>
          <p><strong>Total:</strong> {receipt.total}</p>
          <h3>Items:</h3>
          <ul>
            {receipt.receipt_items.map((item, index) => (
              <li key={index}>{item.item_name} — ₹{item.item_cost}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
