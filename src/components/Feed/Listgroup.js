import { MouseEvent, useState } from "react";

function Listgroup() {
  let items = [
    ["anthonynbui", "3 days ago", "Chest"],
    ["anthonynbui", "3 days ago", "Back and Bis"],
    ["anthonynbui", "5 days ago", "Legs"],
  ];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div class="list-group">
      {items.map((item, index) => (
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
            <h5 class="mb-1">{item[0]}</h5>
            <small style={{ marginLeft: "20px" }}>{item[1]}</small>
          </div>
          <p class="mb-1">{item[2]}</p>
        </a>
      ))}
    </div>
  );
}

export default Listgroup;
