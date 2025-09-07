import React, { useState } from 'react';
import api from '../api';
import ResultCard from './ResultCard';

export default function UploadTab() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onUpload = async () => {
    setError('');
    setResult(null);
    if (!file) return setError('Please select a PDF file');

    if (file.type !== 'application/pdf') return setError('Only PDF files are allowed');
    if (file.size > 5 * 1024 * 1024) return setError('File too large (max 5MB)');

    try {
      setBusy(true);
      const form = new FormData();
      form.append('resume', file);
      const { data } = await api.post('/resumes/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.error || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={onUpload} disabled={busy} style={{ padding: '8px 14px', borderRadius: 8 }}>
          {busy ? 'Analyzing…' : 'Upload & Analyze'}
        </button>
      </div>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ResultCard data={result} />
    </div>
  );
}
