"use client";

import React, { useState, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const ListItem = ({ task, delHandler, doneHandler, editHandler, saveHandler }) => {
  const [editInput, setEditInput] = useState(task.title); // Local state for editing
  const [minutes, setMinutes] = useState(""); // State for minutes input
  const [seconds, setSeconds] = useState(""); // State for seconds input
  const [timeLeft, setTimeLeft] = useState(null); // State for countdown
  const [isTimerRunning, setIsTimerRunning] = useState(false); // State to track if the timer is running

  // Play the tick-tick sound
  const playSound = () => {
    const audio = new Audio("/tick.mp3");
    audio.play();
  };

  // Handle timer countdown
  useEffect(() => {
    let timerInterval;
    if (isTimerRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timeLeft === 0) {
      clearInterval(timerInterval);
      setIsTimerRunning(false);
      playSound(); // Play the tick-tick sound
      
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timeLeft, task.title]);

  // Start the timer
  const startTimer = () => {
    const totalSeconds = parseInt(minutes || 0) * 60 + parseInt(seconds || 0); // Convert minutes and seconds to total seconds
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsTimerRunning(true);
    }
  };

  // Stop the timer
  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  // Validate input to allow only numeric values
  const handleMinutesChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSeconds(value);
    }
  };

  return (
    <li>
      <div
        className={`ListItem ${task.completed ? "completed" : ""}`}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#6B7280" : "#ffffff",
        }}
      >
        {task.isEditing ? (
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            onBlur={() => saveHandler(editInput)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveHandler(editInput);
            }}
            autoFocus
          />
        ) : (
          <span className="task-title" onClick={editHandler}>
            {task.title}
          </span>
        )}

        {/* Timer Input */}
        <div className="timer">
          {isTimerRunning ? (
            <>
              <span>{`${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s`}</span>
              <button onClick={stopTimer}>Stop</button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Min"
                value={minutes}
                onChange={handleMinutesChange}
              />
              <input
                type="text"
                placeholder="Sec"
                value={seconds}
                onChange={handleSecondsChange}
              />
              <button onClick={startTimer}>Start</button>
            </>
          )}
        </div>

        <div className="icons">
          <button onClick={doneHandler}>
            <MdDoneOutline className="DoneIcon" />
          </button>
          <button onClick={delHandler}>
            <FaRegTrashAlt className="TrashIcon" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;