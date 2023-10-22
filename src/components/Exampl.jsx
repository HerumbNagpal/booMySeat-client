import React from "react";
import { useState } from "react";
import { createSelectable, SelectableGroup } from "react-selectable-fast";

function Exampl() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seats = [
    { seatNum: 1, isBooked: 0 },
    { seatNum: 2, isBooked: 0 },
    { seatNum: 3, isBooked: 1 },
    { seatNum: 4, isBooked: 0 },
    { seatNum: 5, isBooked: 0 },
  ];

  const handleSelection = (selectedSeats) => {
    // console.log(selectedSeats);
    setSelectedSeats(selectedSeats);
  };
  selectedSeats.map((x)=>console.log(x.props.item.seatNum))
  return (
    <div style={{ height: "fit-content", width: "500px", backgroundColor: "white" }}>
      <SelectableGroup onSelectionFinish={handleSelection}>
        {seats.map((seat) => (
          <SelectableItem key={seat.seatNum} item={seat}>
            <div style={{gap : '1rem',marginTop:'20rem'}} >{seat.seatNum}</div>
          </SelectableItem>
        ))}
      </SelectableGroup>
    </div>
  );
}
const SelectableItem = createSelectable(
  ({ selectableRef, isSelected, children }) => (
    <div
      data-selectable="true"
      ref={selectableRef}
      className={isSelected ? "selected" : ""}
    >
      {children}
    </div>
  )
);

export default Exampl;
