import 'reactflow/dist/style.css';
import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { updateDiagram } from "../store/diagramSlice";
import Sidebar from "./Sidebar";

const Diagram: React.FC = () => {
  const dispatch = useDispatch();
  const { nodes: reduxNodes, edges: reduxEdges } = useSelector(
    (state: RootState) => state.diagram
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(reduxEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const skipNextSync = useRef(false);

  const isMobile = window.innerWidth <= 768;


  

  // prevent circular updates
  useEffect(() => {
    if (!skipNextSync.current) {
      setNodes(reduxNodes);
      setEdges(reduxEdges);
    }
    skipNextSync.current = false;
  }, [reduxNodes, reduxEdges, setNodes, setEdges]);

  useEffect(() => {
    skipNextSync.current = true;
    const snapshot = { nodes, edges };
    localStorage.setItem("diagramData", JSON.stringify(snapshot));
    dispatch(updateDiagram(snapshot as any));
  }, [nodes, edges, dispatch]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleLabelChange = useCallback(
    (id: string, newLabel: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
        )
      );
      setSelectedNode((prev) =>
        prev && prev.id === id ? { ...prev, data: { label: newLabel } } : prev
      );
    },
    [setNodes]
  );

 


  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: "16px",
        height: isMobile ? "calc(100vh - 180px)" : "80vh",
        width: "100%",
      }}
    >
     
      <div
        style={{
          flex: 1,
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          minHeight: isMobile ? "55vh" : "auto",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges as Edge[]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView={false}
          {...(isMobile ? { defaultViewport: { x: 0, y: 20, zoom: 1 } } : {})}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

     
      <div
        style={{
          width: isMobile ? "100%" : "250px",
          marginTop: isMobile ? "10px" : "0",
        }}
      >
        <Sidebar
          selectedNode={selectedNode}
          onLabelChange={handleLabelChange}
        />
      </div>
    </div>
  );
};

export default Diagram;
