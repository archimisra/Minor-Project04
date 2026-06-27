import React, { useState } from 'react';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [rawText, setRawText] = useState('');

  const createNoteElement = () => {
    if (!rawText.trim()) return;

    const timestamp = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newNote = {
      id: `note_${Date.now()}`,
      body: rawText,
      timestamp,
      isEditing: false
    };

    setNotes([newNote, ...notes]);
    setRawText('');
  };

  const toggleEditState = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isEditing: !note.isEditing } : note
    ));
  };

  const captureLiveNoteEdits = (id, dynamicValue) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, body: dynamicValue } : note
    ));
  };

  const deleteNoteElement = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="notes-panel-scope">
      <h2 className="panel-header">Decoupled Thought Registry</h2>
      
      <div className="interactive-action-bar">
        <input 
          type="text"
          className="primary-input"
          placeholder="Capture flash-ideas context variables here..."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createNoteElement()}
        />
        <button onClick={createNoteElement} className="primary-action-btn">Log Note</button>
      </div>

      <div className="notes-matrix-grid">
        {notes.length === 0 ? (
          <p className="empty-state-placeholder">System memory arrays are currently blank.</p>
        ) : (
          notes.map(({ id, body, timestamp, isEditing }) => (
            <div key={id} className="note-card-node">
              {isEditing ? (
                <textarea 
                  className="note-card-body-textarea"
                  value={body}
                  onChange={(e) => captureLiveNoteEdits(id, e.target.value)}
                  autoFocus
                />
              ) : (
                <div className="note-static-render">{body}</div>
              )}

              <div className="note-card-footer">
                <span className="timestamp-lbl">{timestamp}</span>
                <div className="note-controls-cluster">
                  <button 
                    className={`note-action-trigger ${isEditing ? 'save-mode-btn' : 'edit-mode-btn'}`}
                    onClick={() => toggleEditState(id)}
                  >
                    {isEditing ? 'Save Changes' : 'Modify'}
                  </button>
                  <button 
                    className="note-action-trigger"
                    onClick={() => deleteNoteElement(id)}
                  >
                    Purge
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;