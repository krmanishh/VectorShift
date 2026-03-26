// toolbar.js

import { DraggableNode } from './draggableNode';
import styles from './styles/toolbar.module.css';

export const PipelineToolbar = () => {

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>VectorShift Pipeline</h2>
            <div className={styles.nodesGrid}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='image' label='Image' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='math' label='Math Op' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='api' label='API Request' />
            </div>
        </div>
    );
};
