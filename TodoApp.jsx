import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTaskSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const freshTaskNode = {
      id: `task_${Date.now()}_${Math.floor(Math.random() * 100)}`,
      label: inputValue.trim(),
      isCompleted: false
    };

    // Use spread destructuring to update array references safely
    setTasks([...tasks, freshTaskNode]);
    setInputValue('');
  };

  const toggleTaskCompletionStatus = (targetId) => {
    setTasks(tasks.map(task => 
      task.id === targetId ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  const executeTaskDeletion = (targetId) => {
    setTasks(tasks.filter(task => task.id !== targetId));
  };

  return (
    <div className="todo-panel-scope">
      <h2 className="panel-header">Daily Operations Ledger</h2>
      
      <form onSubmit={handleAddTaskSubmit} className="interactive-action-bar">
        <input 
          type="text" 
          className="primary-input"
          placeholder="Specify tracking task objectives..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="primary-action-btn">Commit Task</button>
      </form>

      <div className="todo-list-wrapper">
        {tasks.length === 0 ? (
          <p className="empty-state-placeholder">No clear task vectors logged for execution today.</p>
        ) : (
          tasks.map(({ id, label, isCompleted }) => (
            <div key={id} className={`todo-row ${isCompleted ? 'resolved-state' : ''}`}>
              <div className="todo-content-block" onClick={() => toggleTaskCompletionStatus(id)}>
                <div className="custom-checkbox-anchor" />
                <span className="todo-text-display">{label}</span>
              </div>
              <button 
                className="destructive-icon-btn" 
                onClick={() => executeTaskDeletion(id)}
              >
                Scrub
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;