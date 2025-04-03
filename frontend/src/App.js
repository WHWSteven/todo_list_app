import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from './config';


function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/todos`);
    setTodos(res.data);
  };
  const deleteTodo = async (id) => {
    await axios.delete(`${API_BASE_URL}/api/todos/${id}`);
    fetchTodos(); // Refresh list
    

  };
 
  
  
  const addTodo = async () => {
    if (!task.trim()) return;
  
    setLoading(true);           // Show loading
    setMessage("");             // Clear old message
  
    try {
      await axios.post(`${API_BASE_URL}/api/todos`, { task });
      setMessage("✅ Task added!");
      setTask("");
      fetchTodos();             // Refresh list
    } catch (err) {
      setMessage("❌ Failed to add task.");
    }
  
    setLoading(false);          // Hide loading
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
      {loading && <p>Loading...</p>}
{message && <p>{message}</p>}
<ul>
  {todos.map((t) => (
    <li key={t.id}>
      {t.task}
      

      <button
        style={{ marginLeft: "1rem", padding: "2px 6px", color: "white", backgroundColor: "red", border: "none", borderRadius: "4px", cursor: "pointer" }}
        onClick={() => deleteTodo(t.id)}
      >
        Delete
      </button>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;
