import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div id="listSquare"> 
      <h1>To do list</h1> 
      <div>
        <ul>
          <li>Being alive</li>
          <li>Eating noodles</li>
          <li>Taking a shower</li>
          <li>Cleaning the bathroom</li>
        </ul>
      </div>
      <div>
        <form>
          <input type="text" />
        </form>
      </div>
    </div>
  );
}
