import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from './config';


function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/todos`);
    setTodos(res.data);
  };
  
  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post(`${API_BASE_URL}/api/todos`, { task });
    setTask("");
    fetchTodos();
  };
  
  

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📝 Todo List</h2>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
