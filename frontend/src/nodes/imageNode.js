// imageNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const ImageNode = ({ id, data }) => {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-image-in` },
    { type: 'source', position: Position.Right, id: `${id}-image-out` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} style={{ width: 240 }}>
      <div className={styles.header}>
        <h3 className={styles.title}>Image Node</h3>
      </div>
      <div className={styles.content}>
        <label className={styles.label}>
          Image URL:
          <input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            className={styles.input}
            placeholder="https://example.com/image.png"
          />
        </label>
        {imageUrl && (
          <div style={{ marginTop: '8px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #333' }}>
            <img src={imageUrl} alt="preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        )}
      </div>
    </BaseNode>
  );
}
