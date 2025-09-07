import React, { useState } from 'react';
import Tabs from './components/Tabs';
import UploadTab from './components/UploadTab';
import HistoryTab from './components/HistoryTab';
import './index.css';

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ maxWidth: 1000, margin:'0 auto', padding: 16 }}>
      <h1>Resume Analyzer</h1>
      <Tabs value={tab} onChange={setTab} />
      {tab === 0 ? <UploadTab /> : <HistoryTab />}
    </div>
  );
}
