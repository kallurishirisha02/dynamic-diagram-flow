import React from 'react';
import { useDispatch } from 'react-redux';
import { addNode, resetDiagram } from '../store/diagramSlice';
import styles from '../styles/toolbar.module.css';

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.toolbar}>
      <button onClick={() => dispatch(addNode())}>➕ Add Node</button>
      <button onClick={() => dispatch(resetDiagram())}>🔄 Reset</button>
    </div>
  );
};

export default Toolbar;
