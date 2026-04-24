
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { WorkflowDesigner } from './pages/WorkflowDesigner';
import { WorkflowList } from './pages/WorkflowList';
import { AdvancedCanvas } from './pages/AdvancedCanvas';
import { ExecutionLogs } from './pages/ExecutionLogs';
import { SimulationInstance } from './pages/SimulationInstance';
import { AutomationTemplates } from './pages/AutomationTemplates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/workflows" element={<WorkflowList />} />
      <Route path="/designer" element={<WorkflowDesigner />} />
      <Route path="/advanced" element={<AdvancedCanvas />} />
      <Route path="/logs" element={<ExecutionLogs />} />
      <Route path="/simulation" element={<SimulationInstance />} />
      <Route path="/automations" element={<AutomationTemplates />} />
      <Route path="/templates" element={<AutomationTemplates />} />
    </Routes>
  );
}

export default App;
