import { useEffect, useState } from "react";
import "./Listgroup.css";
import { db } from "../../config/auth";
import { getDocs, collection } from "firebase/firestore";

function Listgroup() {
  let items = [
    ["anthonynbui", "3 days ago", "Chest"],
    ["anthonynbui", "3 days ago", "Back and Bis"],
    ["anthonynbui", "5 days ago", "Legs"],
  ];

  const [workoutList, setWorkoutList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const workoutCollectionsRef = collection(db, "workouts");

  useEffect(() => {
    const getWorkoutList = async () => {
      try {
        const data = await getDocs(workoutCollectionsRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setWorkoutList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getWorkoutList();
  }, []);

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
          }}
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{item.exercise}</h5>
            {/* <small style={{ marginLeft: "20px" }}>{item.reps}</small> */}
          </div>
          <p class="mb-1">{item.weight + " x " + item.reps}</p>
        </a>
      ))}
    </div>
  );
}

export default Listgroup;
