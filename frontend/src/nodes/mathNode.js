// mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-result` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className={styles.header}>
        <h3 className={styles.title}>Math Op</h3>
      </div>
      <div className={styles.content}>
        <label className={styles.label}>
          Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)} className={styles.select}>
            <option value="Add">Add (+)</option>
            <option value="Subtract">Subtract (-)</option>
            <option value="Multiply">Multiply (*)</option>
            <option value="Divide">Divide (/)</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
