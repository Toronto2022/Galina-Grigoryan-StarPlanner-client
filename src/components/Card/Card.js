// Card.js
import React, { useState, useRef } from "react";
import EditTask from "../../modals/EditTask";
import Draggable from "react-draggable";

const Card = ({
  taskObj,
  index,
  deleteTask,
  updateListArray,
  updatePosition,
}) => {
  console.log(taskObj);
  const nodeRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [position, setPosition] = useState(taskObj.position || { x: 0, y: 0 });
  const handleStart = (e, data) => {
    // This function is called when dragging starts
    // console.log("Start dragging", data.node);
  };

  const handleDrag = (e, data) => {
    // This function is called while dragging
    // console.log("Currently dragging", data.x, data.y);
  };

  const handleStop = (e, data) => {
    // Update the position state
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    const updatedTask = { ...taskObj, position: newPosition };
    updatePosition(updatedTask, index);
    console.log(data);
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
        <div className="card-wrapper mr-5" ref={nodeRef}>
          <div
            className="card-top"
            style={{ backgroundColor: colors[index % 5].primaryColor }}
          ></div>
          <div className="task-holder">
            <span
              className="card-header"
              style={{
                backgroundColor: colors[index % 5].secondaryColor,
                borderRadius: "10px",
              }}
            >
              {taskObj.title}
            </span>
            <p className="mt-3">{taskObj.description}</p>

            <div
              style={{ position: "absolute", right: "20px", bottom: "20px" }}
            >
              <i
                className="far fa-edit mr-3"
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

// useEffect(() => {
//   let arr = localStorage.getItem("taskList");

//   if (arr) {
//     let tasks = JSON.parse(arr).map((task) => ({
//       ...task,
//       position: task.position || { x: 0, y: 0 }, // Provide a default position
//     }));
//     setTaskList(tasks);
//   }
// }, []);

// const updatePosition = (updatedTask, index) => {
//   let tempList = [...taskList];
//   tempList[index] = updatedTask;
//   setTaskList(tempList);
//   localStorage.setItem("taskList", JSON.stringify(tempList));
// };

// const deleteTask = (index) => {
//   let tempList = [...taskList];
//   tempList.splice(index, 1);
//   localStorage.setItem("taskList", JSON.stringify(tempList));
//   setTaskList(tempList);
//   // Consider removing window.location.reload() for a more React-friendly approach
// };

// const updateListArray = (obj, index) => {
//   let tempList = [...taskList];
//   tempList[index] = obj;
//   localStorage.setItem("taskList", JSON.stringify(tempList));
//   setTaskList(tempList);
// };

// const toggle = () => {
//   setModal(!modal);
// };

// const saveTask = (taskObj) => {
//   let tempList = [...taskList];
//   tempList.push(taskObj);
//   localStorage.setItem("taskList", JSON.stringify(tempList));
//   setTaskList(tempList);
//   setModal(false);
// };
