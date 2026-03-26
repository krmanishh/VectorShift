// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%', backgroundColor: '#4ade80' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%', backgroundColor: '#f87171' } }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className={styles.header}>
        <h3 className={styles.title}>Condition</h3>
      </div>
      <div className={styles.content}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label className={styles.label} style={{ flex: 1 }}>
            Operator:
            <select value={operator} onChange={(e) => setOperator(e.target.value)} className={styles.select}>
              <option value="==">==</option>
              <option value="!=">!=</option>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
            </select>
          </label>
          <label className={styles.label} style={{ flex: 1 }}>
            Value:
            <input 
              type="text" 
              value={compareValue} 
              onChange={(e) => setCompareValue(e.target.value)} 
              className={styles.input}
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
}
