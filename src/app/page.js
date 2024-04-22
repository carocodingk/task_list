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

