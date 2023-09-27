import { useEffect, useState } from "react";
import "./Listgroup.css";
import { db } from "../../config/auth";
import { getDocs, collection } from "firebase/firestore";
import workoutForm from "./WorkoutForm";

function Listgroup({ workoutList, selectedIndex, setSelectedIndex, setSelectedWorkout}) {
  return (
    <div class="list-group">
      {workoutList.map((item, index) => (
        <a
          href="#"
          class={
            selectedIndex === index
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          aria-current="true"
          key={item}
          onClick={() => {
            setSelectedIndex(index);
            setSelectedWorkout(item);
          }}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{item.exercise}</h5>
          </div>
          <p class="mb-1">{item.weight + " x " + item.reps}</p>
        </a>
      ))}
    </div>
  );
}

export default Listgroup;
