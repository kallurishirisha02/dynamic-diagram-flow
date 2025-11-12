// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeNode } from "../store/diagramSlice";
import type { Node } from "reactflow";
import styles from "../styles/sidebar.module.css";

interface SidebarProps {
  selectedNode: Node | null;
  onLabelChange: (id: string, newLabel: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNode, onLabelChange }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (selectedNode) setLabel((selectedNode.data && (selectedNode.data as any).label) ?? "");
    else setLabel("");
  }, [selectedNode]);

  const handleSave = () => {
    if (!selectedNode) return;
    onLabelChange(selectedNode.id, label);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    dispatch(removeNode(selectedNode.id));
  };

  return (
    <div className={styles.sidebar}>
      {!selectedNode ? (
        <div style={{ textAlign: "center" }}>
          <p>Select a node to edit its label</p>
        </div>
      ) : (
        <>
          <h3>Edit Node</h3>
          <label>Label</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} />
          <div className={styles.buttons}>
            <button onClick={handleSave}>💾 Save</button>
            <button onClick={handleDelete}>🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
