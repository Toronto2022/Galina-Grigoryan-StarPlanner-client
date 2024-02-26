// TodoList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTaskPopup from "../../modals/CreateTask";
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
        const tasksWithPosition = response.data.map((task) => ({
          ...task,
          position: task.position ? JSON.parse(task.position) : { x: 0, y: 0 },
        }));
        setTaskList(tasksWithPosition);
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

      let tempList = [...taskList];
      tempList[index] = response.data;
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
      tempList.push(response.data);
      setTaskList(tempList);
      setModal(false);
    } catch (error) {
      console.error("Error saving new task", error);
    }
  };

  return (
    <div className="main">
      <div className="header text-center">
        <button className="btn btn-primary" onClick={toggle}>
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
    </div>
  );
};

export default TodoList;
