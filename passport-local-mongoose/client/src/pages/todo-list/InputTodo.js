import { React } from "react";
import "./ToDoList.css";

function InputTodo({ description, setDescription, addTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (description.length > 0) {
      addTodo();
    } else {
      console.log("Enter valid input");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        value={description}
        placeholder="Enter todo here"
        onChange={(event) => setDescription(event.target.value)} />
      <input type="submit" name="submit" value="Add" />
    </form>
  );
};

export default InputTodo;