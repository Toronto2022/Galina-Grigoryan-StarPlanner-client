import React, { useState, useEffect } from "react";
import "./CreateTask.scss";

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTaskName(taskObj.title || "");
    setDescription(taskObj.description || "");
  }, [taskObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const tempObj = {
      id: taskObj.id,
      title: taskName,
      description: description,
    };
    updateTask(tempObj);
    toggle(); // Consider closing the modal on update
  };

  if (!modal) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={toggle}>
            &times;
          </span>
          <h2>Update Task</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Task Name</label>
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={handleChange}
                name="taskName"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="5"
                value={description}
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPopup;
