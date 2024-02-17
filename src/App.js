import { useState } from "react";
import "./App.css";

function App() {
  //state with default data
  const [tasks, setTasks] = useState([
    {
      name: "STORY-4513: Add tooltip",
      category: "inProgress",
      bgcolor: "lightblue",
    },
    {
      name: "STORY-4547: Fix search bug",
      category: "inProgress",
      bgcolor: "lightgrey",
    },
    {
      name: "STORY-4525: New filter option",
      category: "complete",
      bgcolor: "lightgreen",
    },
    {
      name: "STORY-4526: Remove region filter",
      category: "complete",
      bgcolor: "#ee9090",
    },
    {
      name: "STORY-4520: Improve performance",
      category: "complete",
      bgcolor: "#eeed90",
    },
  ]);
  const [newTask, setNewTask] = useState("");

  // Create New Task
  const handleSubmit = (e) => {
    console.log(newTask);
    e.preventDefault();

    //Generate Random Colors
    const setBg = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const randomBgColor = "#" + randomColor;
      return randomBgColor;
    };

    //Adding new task with existing task's
    setTasks((prev) => {
      return [
        ...prev,
        {
          name: newTask,
          bgcolor: setBg(),
          category: "inProgress",
        },
      ];
    });

    //reset field
    setNewTask("");
  };

  //this event is for the dragged task card.
  //this is required to save unique id in the dom event so that when we drop it
  // we would know the card id
  const onDragStart = (event, id) => {
    console.log("Dragging Mode On");
    event.dataTransfer.setData("id", id);
  };

  //fetches the card id and based on that update the status/category of that card
  // in tasks state
  const onDrop = (event, cat) => {
    console.log('Current Category -->>', cat);
    console.log("Dropping Right Now");
    let id = event.dataTransfer.getData("id");
    console.log("get data by id -->>", id);
    let newTasks = tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    setTasks([...newTasks]);
  };

  //method to filter tasks based on their status
  const getTask = () => {
    console.log("getTask Function Called");
    const tasksToRender = {
      inProgress: [],
      complete: [],
    };
    // console.log(tasksToRender)

    //this div is the task card which is 'draggable' and calls onDragStart method
    //when we drag it
    tasks.map((t) =>
      tasksToRender[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) =>
            console.log("OndragStart Activated-->>", onDragStart(e, t.name))
          }
          draggable
          className="task-card"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      )
    );
    return tasksToRender;
  };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-header">JIRA BOARD: Sprint 21U</h2>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name: </label>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          id="taskName"
          name="taskName"
        />
        <input disabled={!newTask} type="submit" value="Submit" />
      </form>

      <div className="drag-drop-board">
        <div
          className="inProgress"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) =>
            console.log(
              "Ondrop inProgress Activated -->>>",
              onDrop(e, "inProgress")
            )
          }
        >
          <div className="task-header">In-PROGRESS</div>
          {getTask().inProgress}
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) =>
            console.log(
              "Ondrop Complete Activated -->>>",
              onDrop(e, "complete")
            )
          }
        >
          <div className="task-header">COMPLETED</div>
          {getTask().complete}
        </div>
      </div>
    </div>
  );
}

export default App;
