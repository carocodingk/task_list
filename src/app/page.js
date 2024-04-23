"use client"
import Image from "next/image";
import styles from "./page.module.css";
import {useState} from "react";

const tasks = [
  "Being alive",
  "Eating noodles",
  "Taking a shower",
  "Cleaning the bathroom",
];

const url = "http://127.0.0.1:5000"

async function logTasks() {
  const response = await fetch(`${url}/tasks`);
  const tasks = await response.json();
  console.log(tasks);
}

// task 1: create a function that post a task to flask server => postTask("write code"); postTask("learn more");
// creating a task will return an id. Grab id to delete/modify task
// body: { description: "new task" } 
// task 2: delete one of the task that exists in the server => deleteTask('idOfTask'); deleteTask(0);
// body: { id: taskId }
// task 3: modify a task  => modifyTask(0, 'delete') 
// put request
// body: { id: taskId, description: "updated task"}
// use the body to submit information

/* request needs headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
    method: 
*/
logTasks()


async function postTask(data) {
  const response = await fetch(`${url}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({description: data})
  });
  const x = await response.json();
  console.log(x)
}

postTask("Testing post task to server")

async function deleteTask(id) {
  const response = await fetch(`${url}/task`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({id: id})
  });
  const x = await response.json();
  console.log(x)
}

deleteTask(8)


async function modifyTask(id, newData) {
  const response = await fetch(`${url}/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: id, description: newData})
  });
  const x = await response.json();
  console.log(x)
}

modifyTask(10, "This is a modified task3")







export default function Home() {
  const [newTask, setNewTask] = useState("Enter new task...");
  const [changeList, setChangeList] = useState(tasks);
  const [selectedItemIdx, setSelectedItemIdx] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [doneTaskList, setDoneTaskList] = useState([])

  const deletingTask = (idx) => {
    const deleteTasks = changeList.toSpliced(idx, 1)
    setChangeList(deleteTasks)
  }
  console.log(selectedItemIdx)

  const editingTask = (idx) => {
    const editedList = changeList.toSpliced(idx, 1, editedTask)
    setChangeList(editedList)
    setSelectedItemIdx(null)
    console.log(editedList)
    // setNewTask("Enter new task...")
  }

  const markingDoneTask = (idx) => {
    const newDoneList = doneTaskList.concat([changeList[idx]])
    const newNotDoneList = changeList.toSpliced(idx, 1)
    setDoneTaskList(newDoneList)
    setChangeList(newNotDoneList)
    // console.log(newDoneList)
  }

  /*
    () => 2 // returnng 2
    () => [] // return an array
    () => ({ "value": 2}) // returns { "value": 2}
    () => {} // does not return anything. {} mean that this is the body of the function
    () => {   // returns 1
      return 1   
    }
  */

  console.log(changeList)
  return (
    <div id="listSquare"> 
      <div>
      <h1>To do list</h1> 
        {changeList.length === 0?
          <p>Your day is clear</p>
          : (
          <div>
          <ul>
            {changeList.map((task, idx) => (
              <li>
                {idx === selectedItemIdx 
                  ? <div>
                      <input type="text" value={editedTask} onChange={(e)=>{setEditedTask(e.target.value)}} />
                      <input type="button" value="save" onClick={()=>editingTask(idx)} />
                      <input type="button" value="cancel" onClick={()=>{setSelectedItemIdx(null)}}/>
                    </div>
                  : (
                    <div>
                      <input type="checkbox" onClick={()=>{console.log("checked " + idx); markingDoneTask(idx)}} checked={false} />
                      {task}
                      <input type="button" value="edit" onClick={()=>{setEditedTask(changeList[idx]); setSelectedItemIdx(idx)}}/>
                      <input type="button" value="delete" onClick={()=>deletingTask(idx)} />
                    </div>
                  )
                }
              </li>
            ))}
          </ul>
          </div>
        )}

        <div>
          <div>
            <label for="task"></label>
            <input type="text" id="task" name="task" value={newTask} onClick={()=>setNewTask('')} onChange={(e)=>{console.log(e.target.value);setNewTask(e.target.value)}}/>
            <input type='submit' value="Add" onClick={()=>{
                if (newTask.length > 0){
                  setChangeList([...changeList, newTask])
                }
                setNewTask("Enter new task...")
              }
            }/>
          </div>
        </div>
      </div>
      {
        doneTaskList.length > 0?
          <div>
            <h1>Done List</h1>
            <div>
              <ul>
                {doneTaskList.map((task) => (
                  <li>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          :
          <div>
          </div>
      }
      
    </div>
  );
}

