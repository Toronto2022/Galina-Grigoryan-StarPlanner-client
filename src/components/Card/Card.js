import React, { useState, useRef } from "react";
import EditTask from "../../modals/EditTask";
import Draggable from "react-draggable";
import "./Card.scss";

const Card = ({
  taskObj,
  index,
  deleteTask,
  updateListArray,
  updatePosition,
}) => {
  const nodeRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [position, setPosition] = useState(taskObj.position || { x: 0, y: 0 });
  const handleStart = (e, data) => {};

  const handleDrag = (e, data) => {};

  const handleStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    const updatedTask = { ...taskObj, position: newPosition };
    updatePosition(updatedTask, index);
  };

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(taskObj.id);
  };

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        position={position}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div className="card__wrapper" ref={nodeRef}>
          <div
            className="card__top"
            style={{ backgroundColor: colors[index % 5].primaryColor }}
          ></div>
          <div className="task-holder">
            <span
              className="card__header"
              style={{
                backgroundColor: colors[index % 5].secondaryColor,
                borderRadius: "10px",
              }}
            >
              {taskObj.title}
            </span>
            <p className="card__description">{taskObj.description}</p>
            <div
              style={{ position: "absolute", right: "20px", bottom: "20px" }}
            >
              <i
                className="far fa-edit mr-3 card__edit"
                style={{
                  color: colors[index % 5].primaryColor,
                  cursor: "pointer",
                }}
                onClick={toggle}
              ></i>
              <i
                className="fas fa-trash-alt"
                style={{
                  color: colors[index % 5].primaryColor,
                  cursor: "pointer",
                }}
                onClick={handleDelete}
              ></i>
            </div>
          </div>
        </div>
      </Draggable>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </>
  );
};

export default Card;
