// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import styles from '../styles/nodes.module.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to allow shrinking
      textareaRef.current.style.height = 'inherit';
      // Set to the actual scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      // Auto-expand minimum width loosely based on character length 
      // (This pushes the boundaries of the parent BaseNode container)
      const containerWidth = Math.max(220, Math.min(400, currText.length * 8));
      textareaRef.current.style.width = `${containerWidth}px`;
    }
  }, [currText]);

  useEffect(() => {
    // Regex matches {{ variable_name }} with any internal spacing
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.push(match[1]);
    }
    // Remove duplicates
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
  }, [currText]);

  // Base output handle
  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  // Dynamic variable handles
  variables.forEach((variable, index) => {
    const spacing = 100 / (variables.length + 1);
    handles.push({
      type: 'target',
      position: Position.Left,
      id: `${id}-var-${variable}`,
      style: { top: `${(index + 1) * spacing}%` }
    });
  });

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className={styles.header}>
        <h3 className={styles.title}>Text</h3>
      </div>
      <div className={styles.content}>
        <label className={styles.label}>
          Text Input:
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={(e) => setCurrText(e.target.value)} 
            className={styles.textarea}
            style={{
               overflow: 'hidden', 
               resize: 'none',
               minHeight: '40px',
               transition: 'none' // Remove transition for smooth instantaneous auto-resize
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
