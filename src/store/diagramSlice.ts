import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import metadata from '../metadata.json';
import { v4 as uuidv4 } from 'uuid';

export interface NodeData {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface DiagramState {
  nodes: NodeData[];
  edges: EdgeData[];
}

const savedData = localStorage.getItem('diagramData');
const initialState: DiagramState = savedData
  ? JSON.parse(savedData)
  : { nodes: metadata.nodes, edges: metadata.edges };

const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    addNode: (state) => {
      const newNode: NodeData = {
        id: uuidv4(),
        type: 'default',
        position: { x: Math.random() * 400, y: Math.random() * 200 },
        data: { label: 'New Node' },
      };
      state.nodes.push(newNode);
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
      state.edges = state.edges.filter(
        (e) => e.source !== action.payload && e.target !== action.payload
      );
    },
    addEdge: (state, action: PayloadAction<EdgeData>) => {
      state.edges.push(action.payload);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter((e) => e.id !== action.payload);
    },
    resetDiagram: (state) => {
      state.nodes = metadata.nodes;
      state.edges = metadata.edges;
    },
    updateDiagram: (state, action: PayloadAction<DiagramState>) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
  },
});

export const {
  addNode,
  removeNode,
  addEdge,
  removeEdge,
  resetDiagram,
  updateDiagram,
} = diagramSlice.actions;

export default diagramSlice.reducer;
