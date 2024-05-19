import { React, useEffect, useState } from "react";
import axios from "axios";
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";
import "./ToDoList.css";

export default function ToDoList() {
  const [inbox, setInbox] = useState([]);
  const [description, setDescription] = useState("");

  const getInbox = () => {
    axios({
      method: "get",
      url: "/todos"
    })
      .then((response) => setInbox(response.data))
      .catch((err) => console.log(err));
  }

  const addTodo = () => {
    axios({
      method: "post",
      url: "/todos",
      data: { description }  
    })
      .then((response) => setInbox(response.data))
      .catch((err) => console.log(err));
    setDescription("");
  }

  const updateTodo = (id, desc) => {
    const description = desc;
    axios({
      method: "put",
      url: "/todos",
      data: { id, description }
    })
      .then((response) => setInbox(response.data))
      .catch((err) => console.log(err));
  }

  const deleteTodo = (id) => {
    axios({
      method: "delete",
      url: "/todos",
      data: { id }
    })
      .then((response) => setInbox(response.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getInbox();
  }, []);
  

  return (
    <div className="Todo-list">
      <div>
        <InputTodo
          description={description}
          setDescription={setDescription}
          addTodo={addTodo} />
        <input type="button" name="refresh" value="refresh" onClick={() => getInbox()} />
      </div>
      <br />
      <br />
      {`${inbox.length} items`}
      {inbox.map((x, y) => (
        <TodoItem
          key={x._id}
          x={x}
          y={y}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};