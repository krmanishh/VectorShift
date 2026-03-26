// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100/3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200/3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className={styles.header}>
        <h3 className={styles.title}>LLM</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.label}>
          <span>This is a LLM.</span>
        </div>
      </div>
    </BaseNode>
  );
}
