import './App.css';
import React, { useState } from 'react';

function App() {
  const [todoName, setTodoName] = useState("");
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState([]);

  const handleChangeTodo = (e) => setTodoName(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    setId(id + 1)
    setTodos([{id: id, name: todoName}, ...todos]);
  }

  function handleDelete(todo) {
    setTodos((state) => state.filter((t) => t.id !== todo.id));
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={todoName || ""} onChange={handleChangeTodo} />
        <input type="submit" value="Добавить" />
      </form>
      <ul className="list">
        {todos.map((todo) => (
          <li key={`${todo.name}${todo.id}`} className="item">
            <div className="todo">
              <p>{todo.name}</p>
              <input type="button" value="Удалить" onClick={() => handleDelete(todo)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
