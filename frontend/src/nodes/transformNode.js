// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const TransformNode = ({ id, data }) => {
  const [transformRule, setTransformRule] = useState(data?.rule || 'x => x * 2');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles} style={{ width: 250 }}>
      <div className={styles.header}>
        <h3 className={styles.title}>Transform</h3>
      </div>
      <div className={styles.content}>
        <label className={styles.label}>
          Transformation Rule (JS function):
          <textarea 
            value={transformRule} 
            onChange={(e) => setTransformRule(e.target.value)} 
            className={styles.textarea}
            placeholder="e.g. data => data.toUpperCase()"
          />
        </label>
      </div>
    </BaseNode>
  );
}
