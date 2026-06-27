import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TodoApp from './components/TodoApp';
import NotesApp from './components/NotesApp';
import './App.css';

function App() {
  // Use a simple module view control flag configuration setup
  const [activeModule, setActiveModule] = useState('todos');

  return (
    <main className="workspace-container">
      <Navbar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <section className="application-view-panel">
        {activeModule === 'todos' ? <TodoApp /> : <NotesApp />}
      </section>
    </main>
  );
}

export default App;
