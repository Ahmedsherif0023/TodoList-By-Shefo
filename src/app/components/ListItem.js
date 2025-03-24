"use client"; // Mark this file as a Client Component

import React, { useState } from "react";
import { MdDoneOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const ListItem = ({ task, delHandler, doneHandler, editHandler, saveHandler }) => {
  const [editInput, setEditInput] = useState(task.title); // Local state for editing

  return (
    <li>
      <div
        className={`ListItem ${task.completed ? "completed" : ""}`} // Add a conditional class
        style={{
          textDecoration: task.completed ? "line-through" : "none", // Inline style for completed tasks
          color: task.completed ? "#78CFB0" : "#9E78CF",
        }}
      >
        {task.isEditing ? (
          // Render input field if in edit mode
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)} // Update local input state
            onBlur={() => saveHandler(editInput)} // Save when input loses focus
            onKeyDown={(e) => {
              if (e.key === "Enter") saveHandler(editInput); // Save on Enter key
            }}
            autoFocus
          />
        ) : (
          // Render task title if not in edit mode
          <span onClick={editHandler}>{task.title}</span>
        )}
        <div className="icons">
          {/* Button for marking as done */}
          <button onClick={doneHandler}>
            <MdDoneOutline className="DoneIcon" />
          </button>

          {/* Button for deleting */}
          <button onClick={delHandler}>
            <FaRegTrashAlt className="TrashIcon" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;