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
  console.log(newTask. changeList)
  return (
    <div id="listSquare"> 
      <h1>To do list</h1> 
      <div>
        <ul>
          {changeList.map((x) => (
            <li>{x}</li>
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

