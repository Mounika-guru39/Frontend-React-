import React from 'react';

export default function Tabs({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      {['Live Analysis', 'History'].map((label, idx) => (
        <button
          key={label}
          onClick={() => onChange(idx)}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: value === idx ? '2px solid #222' : '1px solid #ccc',
            background: value === idx ? '#f0f0f0' : '#fff',
            cursor: 'pointer',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
