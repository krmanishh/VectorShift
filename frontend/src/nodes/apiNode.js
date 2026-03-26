// apiNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-trigger` },
    { type: 'source', position: Position.Right, id: `${id}-response`, style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: `${id}-error`, style: { top: '66%', backgroundColor: '#f87171' } }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} style={{ width: 260 }}>
      <div className={styles.header}>
        <h3 className={styles.title}>API Request</h3>
      </div>
      <div className={styles.content}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label className={styles.label} style={{ flex: '0 0 auto', width: '80px' }}>
            Method:
            <select value={method} onChange={(e) => setMethod(e.target.value)} className={styles.select}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </label>
          <label className={styles.label} style={{ flex: 1 }}>
            URL:
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              className={styles.input}
              placeholder="https://api..."
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
}
