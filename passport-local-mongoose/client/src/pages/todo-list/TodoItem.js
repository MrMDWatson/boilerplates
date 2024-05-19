import { React, useState, Fragment } from "react";
import "./ToDoList.css";

function TodoItem({ x, y, updateTodo, deleteTodo }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const handleEdit = (event) => {
    event.preventDefault();
    if (newDescription.length > 0) {
      setOpenEdit(false);
      updateTodo(x._id, newDescription);
    } else {
      console.log("Enter valid input");
    }
  }

  const cancelEdit = () => {
    setOpenEdit(false);
    setNewDescription("");
  }

  const display = (
    <div className="Todo-item" key={x._id}>
      {`${y + 1}. ${x.description}`}
      <div>
        <button onClick={() => setOpenEdit(true)}>Edit</button>
        <button onClick={() => deleteTodo(x._id)}>Delete</button>
      </div>
    </div>

  );

  const edit = (
    <form className="Todo-item" key={x._id} onSubmit={handleEdit}>
      <div>
        {`${y + 1}.`}
        <input
          type="text"
          name="description"
          value={newDescription}
          placeholder={x.description}
          onChange={(event) => setNewDescription(event.target.value)}
        />
      </div>
      <div>
        <input type="submit" name="submit" />
        <input type="button" name="cancel" value="Cancel" onClick={cancelEdit} />
      </div>
    </form>
  );

  return (
    <Fragment>
      {openEdit ? edit : display}
    </Fragment>
  )
}

export default TodoItem;