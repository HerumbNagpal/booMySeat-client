import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal/Modal.css";
import "./Loader.css";
function DisplaySeats() {
  const [allSeats, setAllSeats] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [modalBooked, setModalBooked] = useState(false);
  const [modalNotBooked, setModalNotBooked] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);

  const [seatClicked, setSeatClicked] = useState(null);

  const fetchSeats = async () => {
    const res = await axios.get(
      "https://seatbooking-server-herumb.onrender.com/seats"
      // "http://localhost:8080/seats"
    );
    setAllSeats(res.data);
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  const toggleModalBooked = (seat) => {
    setModalBooked(!modalBooked);

    console.log(seat.seatNum);
  };
  const toggleModalNotBooked = (seat) => {
    setModalNotBooked(!modalNotBooked);
    console.log(seat.seatNum);
  };
  const toggleModalDone = () => {
    setModalDone(!modalDone);
  };
  const toggleModalCancel = () => {
    setModalCancel(!modalCancel);
  };
  // const toggleMailCheck = () => {
  //   setModalNotBooked(false);
  //   setLoader(true);
  //   setTimeout(()=>{
  //     setLoader(false)
  //   },2000)
  //   setMailCheck(!mailCheck)
  //   console.log(seatClicked)
  // }

  if (modalBooked || modalNotBooked) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const trainCoach = [];
  for (let i = 0; i < 12; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const ind = i * 7 + j;
      if (ind < allSeats.length) {
        row.push(allSeats[ind]);
      } else {
        row.push(null);
      }
    }
    trainCoach.push(row);
  }
  const bookSeat = async () => {
    const data = {
      seatNum: seatClicked,
    };
    const res = await axios.post(
      "https://seatbooking-server-herumb.onrender.com/book",
      // "http://localhost:8080/book",
      data
    );
    console.log(res);
    setLoader(true);
    toggleModalNotBooked(!modalNotBooked);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    fetchSeats();
    setModalDone(!modalDone);
  };

  const cancelSeat = async () => {
    const data = {
      seatNum: seatClicked,
    };
    const res = await axios.post(
      "https://seatbooking-server-herumb.onrender.com/cancel",
      // "http://localhost:8080/cancel",
      data
    );
    console.log(res);
    setLoader(true);
    toggleModalBooked(!modalBooked);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    fetchSeats();
    setModalCancel(!modalCancel);
  };
  
  
  const handleSeatClick = (seat) => {
    // console.log("Seat Clicked!",seat.seatNum,seat.isBooked)
    setSeatClicked(seat.seatNum);
    if (seat.isBooked) {
      toggleModalBooked(seat);
    } else {
      toggleModalNotBooked(seat);
    }
  };

  return (
    <div>
      <div
        style={{
          width: "100vw",
          backgroundColor: "#0D0D0D",
          overflowX: "hidden",
        }}
      >
        <h1
          style={{
            height: "4rem",
            paddingTop: "2rem",
            paddingLeft: "1.6rem",
            textAlign: "start",
            color: "white",
          }}
        >
          bookMySeats
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            color: "white",
            width: "60%",
            height: "100vh",
            backgroundImage: `url("https://raretransportation.com/uploads/images/31PassengerBus_Interior.jpg")`,
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              marginTop: "-1.17rem",
            }}
          >
            <h3 style={{ paddingTop: "5rem", textTransform: "uppercase" }}>
              Welcome to Book My Seats
            </h3>
            <p>
              Please select the available seats for the your ride from{" "}
              <b>Point A</b> to <b>Point B</b>.<br />
              <br /> We are working hard to offer you more rides Esse cupidatat
              Lorem deserunt qui duis. Do proident magna veniam occaecat anim
              consequat nisi ea ad ut officia consectetur tempor. <br />
              <br /> Incididunt pariatur eiusmod ad magna deserunt aliquip
              labore quis officia. Consequat voluptate cupidatat amet velit
              aliqua eu Lorem. Adipisicing aliqua ea dolore est enim eiusmod
              esse enim velit velit consequat eiusmod.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
              <table>
                <tbody>
                  {trainCoach.map((row, rowIndex) => {
                    return (
                      <tr key={rowIndex}>
                        {row.map((seat, seatIndex) => {
                          return (
                            <td key={seatIndex}>
                              {seat ? (
                                  <div
                                    style={{
                                      height: 35,
                                      width: 35,
                                      display: "flex",
                                      margin: "5px 1px",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor: seat.isBooked
                                        ? "#8a8a8a"
                                        : "green",
                                      cursor: seat.isBooked
                                        ? "not-allowed"
                                        : "pointer",
                                    }}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    <p
                                      style={{
                                        color: seat.isBooked
                                          ? "#d2d2d2"
                                          : "white",
                                        textAlign: "center",
                                        height: "100%",
                                      }}
                                    >
                                      {seat.seatNum}
                                    </p>
                                  </div>
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>
          <div
            style={{
              marginTop: "4rem",
              lineHeight: "0",
              color: "white",
              textAlign: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{ height: 10, width: 10, backgroundColor: "green" }}
              ></div>
              <p>Seat Available</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{ height: 10, width: 10, backgroundColor: "#8a8a8a" }}
              ></div>
              <p>Seat Not available</p>
            </div>
          </div>
        </div>
      </div>
      {modalBooked && (
        <div className="modal">
          <div onClick={toggleModalBooked} className="overlay"></div>
          <div className="modal-content">
            <h2>Seat not available!</h2>
            <p>
              This seat is already booked by someone else. Please select a
              different seat.
            </p>
            <button className="cancel-modal btn" onClick={cancelSeat}>
              CANCEL BOOKING
            </button>
            <button className="close-modal btn" onClick={toggleModalBooked}>
              CLOSE
            </button>
          </div>
        </div>
      )}

      {modalNotBooked && (
        <div className="modal">
          <div onClick={toggleModalNotBooked} className="overlay"></div>
          <div className="modal-content">
            <h2>Seat available!</h2>
            <p>Are you you want to book seat number : {seatClicked}?</p>
            <button className="yes-btn btn" onClick={bookSeat}>
              CONFIRM
            </button>
            <button className="no-btn btn" onClick={toggleModalNotBooked}>
              RETURN
            </button>
          </div>
        </div>
      )}

      {/* {modalNotBooked && (
        <div className="modal">
        <div onClick={toggleModalNotBooked} className="overlay"></div>
        <div className="modal-content">
          <h2>Seat available!</h2>
          <p>
            Please enter your email to recieve the payment link to complete the booking.
          </p>
          <input type="text" className = "mail-box" value={mail} placeholder="Enter your email" onChange={text=>setMail(text.target.value)} />
          <button className="send-link-modal btn" onClick={toggleModalNotBooked}>
            SEND
          </button>
        </div>
      </div>
      )} 
      
      {
        mailCheck && (
        <div className="modal">
          <div onClick={toggleModalNotBooked} className="overlay"></div>
            <div className="modal-content">
                <h2>Mail Sent!</h2>
                <p>
                 We have sent payment link to {mail}. Please complete the payment to book the seat. 
                </p>
                <button className="send-link-modal btn" onClick={toggleMailCheck}>
                  OKAY
                </button>
            </div>
      </div>
        )} */}

      {modalDone && (
        <div className="modal">
          <div onClick={toggleModalDone} className="overlay"></div>
          <div className="modal-content">
            <h2>Booking Successful</h2>
            <p>You have successfully booked seat number : {seatClicked}.</p>
            <button className="send-link-modal btn" onClick={toggleModalDone}>
              OKAY
            </button>
          </div>
        </div>
      )}

      {modalCancel && (
        <div className="modal">
          <div onClick={toggleModalCancel} className="overlay"></div>
          <div className="modal-content">
            <h2>Cacnellation Successful</h2>
            <p>You have successfully cancelled seat number : {seatClicked}.</p>
            <button className="send-link-modal btn" onClick={toggleModalCancel}>
              OKAY
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
export default DisplaySeats;
