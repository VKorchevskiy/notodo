import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [todoName, setTodoName] = useState("");
  const [id, setId] = useState(0);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    setTodos(localTodos ? JSON.parse(localTodos) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChangeTodo = (e) => setTodoName(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    setId(id + 1);
    if (currentTodo === null) {
      setTodos([{ id: id, name: todoName }, ...todos]);
    } else {
      setTodos((state) =>
        state.map((t) => {
          if (t.id !== currentTodo.id) {
            return t;
          } else {
            return { id: t.id, name: todoName };
          }
        })
      );
      setCurrentTodo(null);
    }
    setTodoName("");
  }

  function handleDelete(todo) {
    setTodos((state) => state.filter((t) => t.id !== todo.id));
  }

  function handleEdit(todo) {
    setCurrentTodo(todo);
    setTodoName(todo?.name);
  }

  return (
    <div className="App">
      <h1>Todo list</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" value={todoName || ""} onChange={handleChangeTodo} />
        <input
          type="submit"
          value={currentTodo === null ? `Добавить` : `Редактировать`}
        />
      </form>
      <ul className="list">
        {todos?.map((todo) => (
          <li key={`${todo.name}${todo.id}`} className="item">
            <div className="todo">
              <p style={{ margin: 0, padding: 0 }}>{todo.name}</p>
              <input
                type="button"
                value="Удалить"
                onClick={() => handleDelete(todo)}
              />
              <input
                type="button"
                value="Редактировать"
                onClick={() => handleEdit(todo)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
