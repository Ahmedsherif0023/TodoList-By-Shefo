"use client";
import "../app/globals.css";
import TasksList from "./components/TasksList";




export default function App() {


  
  return (
      <div>
      <div className="container">
        <section className="centered">
          <div className="TasksToDo">
            <TasksList />
          </div>
    
          <div className="TasksDone">
            
          </div>
        </section>
      </div>
    </div>
  );
}
