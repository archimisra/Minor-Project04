import React from 'react';

/**
 * Global Nav Header Module Configuration Component
 */
const Navbar = ({ activeModule, setActiveModule }) => {
  return (
    <header className="app-navigation">
      <div className="brand-title">Archi's.work studio</div>
      <nav className="nav-controls">
        <button 
          className={`nav-button ${activeModule === 'todos' ? 'active-tab' : ''}`}
          onClick={() => setActiveModule('todos')}
        >
          Task Ledger
        </button>
        <button 
          className={`nav-button ${activeModule === 'notes' ? 'active-tab' : ''}`}
          onClick={() => setActiveModule('notes')}
        >
          Notebook Matrix
        </button>
      </nav>
    </header>
  );
};

export default Navbar;