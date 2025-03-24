"use client"; // Mark this file as a Client Component

import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { IoMdAdd } from "react-icons/io";
import Header from "./Header";

const TasksList = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [taskInput, setTaskInput] = useState(""); // State to store input value

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Parse and set tasks from local storage
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handler for adding a new task
  const handleAddTask = (event) => {
    event.preventDefault(); // Prevent page refresh
    if (taskInput.trim() === "") return; // Ignore empty input

    const newTask = { id: Date.now(), title: taskInput, completed: false, isEditing: false }; // Add `isEditing` property
    setTasks([...tasks, newTask]); // Add the new task to the list
    setTaskInput(""); // Clear the input field
  };

  // Handler for marking a task as done
  const handleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handler for deleting a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Remove the task from the list
  };

  // Handler for enabling edit mode
  const handleEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  // Handler for saving the edited task
  const handleSave = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, isEditing: false } : task
      )
    );
  };

  // Separate incomplete and completed tasks
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="listWrap">
    
    <Header />
      {/* Form for adding a new task */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)} // Update input value
          placeholder="Enter a new task"
        />
        <button type="submit" className="AddTaskBtn">
        <IoMdAdd />
        </button>
      </form>
  {/* Label showing the number of incomplete tasks */}
  <h3 className="TasksTodoCount">Tasks to do - {incompleteTasks.length}</h3>
  
      <ul>
        {incompleteTasks.map((task) => (
          <ListItem
            key={task.id}
            task={task} // Pass the entire task object
            delHandler={() => handleDelete(task.id)} // Pass delete handler
            doneHandler={() => handleDone(task.id)} // Pass done handler
            editHandler={() => handleEdit(task.id)} // Pass edit handler
            saveHandler={(newTitle) => handleSave(task.id, newTitle)} // Pass save handler
          />
        ))}
      </ul>

      {/* Label showing the number of completed tasks */}
  <h3 className="TasksTodoCount">Done - {completedTasks.length}</h3>
  
      <ul>
        {completedTasks.map((task) => (
          <ListItem
            key={task.id}
            task={task} // Pass the entire task object
            delHandler={() => handleDelete(task.id)} // Pass delete handler
            doneHandler={() => handleDone(task.id)} // Pass done handler
            editHandler={() => handleEdit(task.id)} // Pass edit handler
            saveHandler={(newTitle) => handleSave(task.id, newTitle)} // Pass save handler
          />
        ))}
      </ul>
    </div>
  );
};

export default TasksList;