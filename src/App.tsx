import Toolbar from './components/Toolbar';
import Diagram from './components/Diagram';
import './styles/theme.module.css';
import "./App.css";


function App() {
  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Dynamic Diagram Flow</h1>
      <Toolbar />
      <Diagram />
    </div>
  );
}

export default App;
