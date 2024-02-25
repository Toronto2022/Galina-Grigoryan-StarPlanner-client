// CreateTaskPopup.js
import React, { useState } from "react";
import "./CreateTask.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj["title"] = taskName;
    taskObj["description"] = description;
    save(taskObj);
  };

  return modal ? (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={toggle}>
            &times;
          </span>
          <h2>Create Task</h2>
        </div>
        <div className="modal-body">
          <form>
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
                rows="5"
                className="form-control"
                value={description}
                onChange={handleChange}
                name="description"
              ></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            Create
          </button>
          <button className="btn btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateTaskPopup;
