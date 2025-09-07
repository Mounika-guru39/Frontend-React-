import React, { useEffect, useState } from 'react';
import api from '../api';
import DetailsModal from './DetailsModal';

export default function HistoryTab() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setError('');
    try {
      setBusy(true);
      const { data } = await api.get('/resumes');
      setRows(data);
    } catch (e) {
      setError('Failed to fetch history');
    } finally {
      setBusy(false);
    }
  };

  const openDetails = async (id) => {
    try {
      const { data } = await api.get(`/resumes/${id}`);
      setSelected(data);
      setOpen(true);
    } catch {
      setSelected(null);
      setOpen(false);
      alert('Failed to fetch details');
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <h3 style={{ margin:0 }}>Analyzed Resumes</h3>
        <button onClick={fetchAll} disabled={busy} style={{ padding:'6px 10px', borderRadius:8 }}>
          {busy ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      {error && <p style={{ color:'crimson' }}>{error}</p>}
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>File</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Uploaded</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={td}>{r.id}</td>
                <td style={td}>{r.file_name}</td>
                <td style={td}>{r.name || '—'}</td>
                <td style={td}>{r.email || '—'}</td>
                <td style={td}>{new Date(r.uploaded_at).toLocaleString()}</td>
                <td style={td}>
                  <button onClick={() => openDetails(r.id)} style={{ padding:'6px 10px', borderRadius:8 }}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
            {!rows.length && !busy && (
              <tr><td style={td} colSpan={6}>No records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <DetailsModal open={open} onClose={() => setOpen(false)} data={selected} />
    </div>
  );
}

const th = { textAlign:'left', borderBottom:'1px solid #ddd', padding:'8px' };
const td = { borderBottom:'1px solid #eee', padding:'8px' };
