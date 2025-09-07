import React from 'react';
import ResultCard from './ResultCard';

export default function DetailsModal({ open, onClose, data }) {
  if (!open) return null;
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:16
    }}>
      <div style={{ background:'#fff', borderRadius:12, maxWidth:900, width:'100%', padding:16, maxHeight:'90vh', overflow:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ margin:0 }}>Resume Details</h2>
          <button onClick={onClose} style={{ padding:'6px 10px', borderRadius:8 }}>Close</button>
        </div>
        <ResultCard data={data} />
      </div>
    </div>
  );
}
