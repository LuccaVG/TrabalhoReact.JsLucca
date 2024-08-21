import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Começar a execução do projeto', completed: false },
    { id: 2, text: 'Começar a execução do projeto', completed: true },
  ]);

  const [isModalOpen, setModalOpen] = useState(false); // Modal state
  const [newTaskText, setNewTaskText] = useState(''); // New task text state

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (id) => {
    console.log('Editing task', id);
  };

  const handleAddTask = () => {
    setModalOpen(true); // Open the modal
  };

  const handleConfirmTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText(''); // Clear the input
    }
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="container">
      <div className="task-container">
        <h1>Terça-Feira, <span>24 de Julho</span></h1>
        
        <div className="search-bar">
          <input type="text" placeholder="Procurar tarefa" />
          <button>🔍</button>
        </div>

        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => {
                  setTasks(tasks.map(t => 
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                  ));
                }} 
              />
              <p>{task.text}</p>
              <button onClick={() => handleEdit(task.id)}>✏️</button>
              <button onClick={() => handleDelete(task.id)}>❌</button>
            </div>
          ))}
        </div>

        <button className="new-task" onClick={handleAddTask}>Nova tarefa</button>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Descreva sua tarefa</h2>
            <textarea 
              value={newTaskText} 
              onChange={(e) => setNewTaskText(e.target.value)} 
              placeholder="Exemplo de descrição"
            ></textarea>
            <button className="confirm-button" onClick={handleConfirmTask}>Confirmar tarefa</button>
            <button className="close-button" onClick={() => setModalOpen(false)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
