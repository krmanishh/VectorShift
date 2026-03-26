// BaseNode.js

import { Handle, Position } from 'reactflow';
import styles from '../styles/nodes.module.css';

export const BaseNode = ({ id, data, style, children, handles = [] }) => {
  return (
    <div className={`${styles.node} ${data?.selected ? styles.nodeSelected : ''}`} style={style}>
      {/* Dynamic Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
             ...handle.style,
          }}
          className={`${styles.handle} ${handle.position === Position.Right ? styles.handleRight : styles.handleLeft}`}
        />
      ))}
      
      {children}
    </div>
  );
};
