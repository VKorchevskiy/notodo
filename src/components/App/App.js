import './App.css';
import React, { useState } from 'react';

function App() {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);

  const handleChangeTodo = (e) => setTodo(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([todo, ...todos]);
  }

  function handleDelete(todo) {
    setTodos((state) => state.filter((t) => t !== todo));
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={todo || ""} onChange={handleChangeTodo} />
        <input type="submit" value="Добавить" />
      </form>
      <ul className="list">
        {todos.map((todo, i) => (
          <li key={`${todo}${i}`} className="item">
            <div className="todo">
              <p>{todo}</p>
              <input type="button" value="Удалить" onClick={() => handleDelete(`${todo}`)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
