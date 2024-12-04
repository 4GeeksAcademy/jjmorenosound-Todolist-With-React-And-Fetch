import React, { useState, useEffect } from "react";
import { TaskInput } from "./taskinput";

export const Task = () => {
  const [values, setValues] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/users/jjmorenosound')
      .then(resp => resp.json())
      .then(respJson => {
        console.log(respJson);
        const serverValues = respJson.todos;
        setValues(serverValues);
      })
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const createTask = async (task) => {
    await fetch('https://playground.4geeks.com/todo/todos/jjmorenosound', {
      method: 'POST',
      body: JSON.stringify({
        "label": task,
        "is_done": false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then (respJson => {
      const newTasks = [...values, respJson];
      setValues([...newTasks])
    })
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = async (event) => {
    if (inputValue.trim() !== "") {

      setValues((previous) => [...previous, { label: inputValue, is_done: false }]);

      await createTask(inputValue);

      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    console.log(id);
    
    fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
      method: 'DELETE'
    }).then(()=>{setValues(values.filter(item => item.id !== id))})
  };

  
 
    const deleteAllTasks = async() => {
   
      const deleteAll = values.map(item => deleteTask(item.id));
      const responses = await Promise.all(deleteAll);
      responses.forEach(() => setValues([]))
    };
    
  //  const deleteAll = values.filter(deleteTask => deleteTask.id !== id);
  //   await Promise.all(deleteAll).then(() => setValues ([]));
  // };
  
  const toggleCompletion = (index) => {
    setValues((previous) =>
      previous.map((task, i) =>
        i === index ? { ...task, is_done: !task.is_done } : task
      )
    );
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-6 d-flex align-items-center">
            <TaskInput className="me-2" value={inputValue} onChange={handleInputChange} />
            <i onClick={addTask} className="fa fa-plus"></i>
          </div>

          <div className="row pending-box justify-content-end align-items-end">
            <div className="col-5 d-flex align-items-center">
              <h5>Tasks pending: {values.length}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-7 list-box">
            {values.length === 0 ? (
              <p className="text-center">You're all caught up!</p>
            ) : (
              <ul>
                {values.map((item, index) => (
                  <li key={index} style={{ textDecoration: item.is_done ? "line-through" : "none" }}>
                    <div className="input-group mb-3 d-flex justify-content-between align-items-center">
                      <p>{item.label}</p>
                      <div>
                        <i onClick={() => toggleCompletion(index)} className="fa fa-check pe-1">
                          {item.is_done ? "Undo" : ""}
                        </i>
                        <i onClick={() => deleteTask(item.id)} className="fa fa-trash"></i>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
        </div>
        
      </div>
      <div className="delete-box row d-flex justify-content-end align-items-end"
><button onClick={() => deleteAllTasks()}>Clear all tasks </button> 
</div>
    </>
  );
};
