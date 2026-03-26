// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className={styles.header}>
        <h3 className={styles.title}>Output</h3>
      </div>
      <div className={styles.content}>
        <label className={styles.label}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={(e) => setCurrName(e.target.value)} 
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Type:
          <select value={outputType} onChange={(e) => setOutputType(e.target.value)} className={styles.select}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
