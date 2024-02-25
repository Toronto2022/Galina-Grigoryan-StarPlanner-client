// TodoList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTaskPopup from "../../modals/CreateTask"; // Adjust the import based on your project structure
import Card from "../../components/Card/Card";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./ToDo.scss";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("No token found, user might not be logged in.");
      return;
    }
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${REACT_APP_SERVER_URL}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        const tasksWithPosition = response.data.map((task) => ({
          ...task,
          position: task.position ? JSON.parse(task.position) : { x: 0, y: 0 },
        }));
        console.log(tasksWithPosition);
        setTaskList(tasksWithPosition); // Set the tasks with positions in state
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const updatePosition = async (updatedTask, index) => {
    const token = sessionStorage.getItem("token");
    try {
      const taskWithCorrectFormat = {
        ...updatedTask,
        position: updatedTask.position,
      };

      const response = await axios.put(
        `${REACT_APP_SERVER_URL}/api/tasks/${updatedTask.id}`,
        taskWithCorrectFormat,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const tempList = [...taskList];
      tempList[index] = response.data;
      setTaskList(tempList);
    } catch (error) {
      console.error("Error updating task position", error);
    }
  };

  const updateTask = async (updatedTask) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(
        `${REACT_APP_SERVER_URL}/api/tasks/${updatedTask.id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Refresh the task list or update the state directly if successful
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async (taskId) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`${REACT_APP_SERVER_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedTasks = taskList.filter((task) => task.id !== taskId);
      setTaskList(updatedTasks);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const updateListArray = async (updatedTask, index) => {
    const token = sessionStorage.getItem("token");
    try {
      // Ensure the task ID is not undefined
      if (!updatedTask.id) {
        console.error("Task ID is undefined");
        return;
      }

      const response = await axios.put(
        `${REACT_APP_SERVER_URL}/api/tasks/${updatedTask.id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the task list with the response data
      let tempList = [...taskList];
      tempList[index] = response.data; // Assuming backend returns the updated task
      setTaskList(tempList);
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = async (taskObj) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/api/tasks`,
        taskObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let tempList = [...taskList];
      tempList.push(response.data); // Assuming backend returns the new task with an id
      setTaskList(tempList);
      setModal(false);
    } catch (error) {
      console.error("Error saving new task", error);
    }
  };

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

  return (
    <>
      <div className="header text-center">
        <button className="btn btn-primary mt-2" onClick={toggle}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
              updatePosition={updatePosition}
              updateTask={updateTask}
            />
          ))}
      </div>
      {modal && (
        <CreateTaskPopup toggle={toggle} modal={modal} save={saveTask} />
      )}
    </>
  );
};

export default TodoList;
