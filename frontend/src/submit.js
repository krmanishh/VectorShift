// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import styles from './styles/submit.module.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            alert(
                `Pipeline Submission Result:\n- Number of Nodes: ${data.num_nodes}\n- Number of Edges: ${data.num_edges}\n- Is Directed Acyclic Graph (DAG): ${data.is_dag}`
            );

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit the pipeline. Ensure the backend is running.');
        }
    };

    return (
        <div className={styles.container}>
            <button type="button" onClick={handleSubmit} className={styles.button}>Submit Pipeline</button>
        </div>
    );
}
