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
  const [newTask, setNewTask] = useState("wacky");
  const [changeList, setChangeList] = useState(tasks);
  const [selectedItemIdx, setSelectedItemIdx] = useState(null);
  // console.log(newTask. changeList)

  const deletingTask = (idx) => {
    const deleteTasks = changeList.toSpliced(idx, 1)
    setChangeList(deleteTasks)
  }
  console.log(selectedItemIdx)

  const editingTask = (idx) => {
    const editedTask = changeList.toSpliced(idx, 1, newTask)
    setChangeList(editedTask)
    setSelectedItemIdx(null)
    console.log(editedTask)
  }


  return (
    <div id="listSquare"> 
      <h1>To do list</h1> 
      <div>
        <ul>
          {changeList.map((task, idx) => (
            <li>
              {idx === selectedItemIdx 
                ? <div>
                    <input type="text" value={changeList[idx]} onChange={(e)=>{setNewTask(e.target.value)}} />
                    <input type="button" value="save" onClick={()=>editingTask(idx)} />
                    <input type="button" value="cancel" onClick={()=>{setSelectedItemIdx(null)}}/>
                  </div>
                : (
                  <div>
                    {task}
                    <input type="button" value="edit" onClick={()=>setSelectedItemIdx(idx)}/>
                    <input type="button" value="delete" onClick={()=>deletingTask(idx)} />
                  </div>
                )
              }
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <label for="task"></label>
          <input type="text" id="task" name="task" value={newTask} onChange={(e)=>{setNewTask(e.target.value)}}/>
          <input type='submit' value="Add" onClick={()=>{setChangeList([...changeList, newTask])}}/>
        </div>
      </div>
    </div>
  );
}

