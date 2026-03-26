from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

# Add CORS to allow requests from the React frontend port 3000 -> 8000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    # Parse the pipeline payload from JSON string
    try:
        pipeline_data = json.loads(pipeline)
        nodes = pipeline_data.get('nodes', [])
        edges = pipeline_data.get('edges', [])
    except json.JSONDecodeError:
        return {"num_nodes": 0, "num_edges": 0, "is_dag": False}

    num_nodes = len(nodes)
    num_edges = len(edges)

    # Calculate whether the mapped graph forms a Directed Acyclic Graph (DAG).
    # Step 1: Initialize the adjacency map
    adj = {}
    for node in nodes:
        adj[node['id']] = []
        
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        # If there's an edge from a source not explicitly in `nodes`, initialize safely
        if source not in adj:
            adj[source] = []
        adj[source].append(target)

    # Step 2: Traverse graph using DFS to detect cycles
    visited = set()
    rec_stack = set()
    has_cycle = False

    def is_cyclic(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)

        for neighbor in adj.get(node_id, []):
            if neighbor not in visited:
                if is_cyclic(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True # Detected a backedge to a currently resolving path -> Cycle!

        rec_stack.remove(node_id)
        return False

    # Check across all independent sub-graphs
    for node_id in adj.keys():
        if node_id not in visited:
            if is_cyclic(node_id):
                has_cycle = True
                break
                
    # If no cycle was detected, the Directed Graph is Acyclic
    is_dag = not has_cycle

    # Returns expected dictionary map
    return {
        "num_nodes": num_nodes, 
        "num_edges": num_edges, 
        "is_dag": is_dag
    }
