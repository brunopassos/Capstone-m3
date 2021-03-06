import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Api } from "../../services/api";
import CardDashBoard from "../cardDashBoard";
import Footer from "../Footer";
import Header from "../header";
import HeaderDesktop from "../headerDesktop";
import ModalReviewAccommodation from "../ModalReviewAccommodation";
import NomadeHeader from "../NomadeHeader";
import StartATrip from "../startATrip";
import { ContainerInfo, MainPaper, MainSection, NoInfo } from "./styles";

function DashBoard() {
  const [filterTrips, setFilterTrips] = useState("booked");
  const [myTrips, setMyTrips] = useState([]);
  const [bookHistory, setBookHistory] = useState([]);
  const [myBookedAccommodations, setMyBookedAccommodations] = useState([]);
  const [conditional, setConditional] = useState("booked");
  const [userBookings, setUserBookings] = useState([]);
  const [renderAgain, setRenderAgain] = useState(false);

  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    Api.get(`/accommodation`)
      .then((resp) => setMyTrips(resp.data))
      .catch((err) => console.log(err));
    setRenderAgain(false);
  }, [renderAgain]);

  useEffect(() => {
    Api.get(`/users/${id}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => setBookHistory(resp.data))
      .catch((err) => err.data);
    setRenderAgain(false);
  }, [renderAgain]);

  useEffect(() => {
    let temporaryArray = [];
    let another = [];
    let temporaryBooking = [];
    for (let i = 0; i < bookHistory.length; i++) {
      for (let j = 0; j < myTrips.length; j++) {
        if (bookHistory[i].accommodationId === myTrips[j].id) {
          if (bookHistory[i].status === filterTrips || filterTrips === "all") {
            if (bookHistory[i].status === "booked") {
              let copy = [...myTrips];
              let middle = copy[j];
              another.push("booked");
              temporaryArray.push(middle);
              temporaryBooking.push(bookHistory[i]);
            } else if (bookHistory[i].status === "cancelled") {
              let copy = [...myTrips];
              let middle = copy[j];
              another.push("cancelled");
              temporaryArray.push(middle);
              temporaryBooking.push(bookHistory[i]);
            } else if (bookHistory[i].status === "finished") {
              let copy = [...myTrips];
              let middle = copy[j];
              another.push("finished");
              temporaryArray.push(middle);
              temporaryBooking.push(bookHistory[i]);
            }
          }
        }
      }
      setUserBookings(temporaryBooking);
      setConditional(another);
      setMyBookedAccommodations(temporaryArray);
      setRenderAgain(false);
    }
  }, [myTrips, filterTrips, renderAgain]);

  return (
    <>
      <MainSection>
        <HeaderDesktop />
        <Header />
        <Divider
          className="btnAdd"
          flexItem
          sx={{
            bgcolor: "#EE685F",
            borderWidth: "1px",
            width: "90%",
            alignSelf: "center",
          }}
        />
        <NomadeHeader
          filterTrips={filterTrips}
          setFilterTrips={setFilterTrips}
        />
        <ContainerInfo></ContainerInfo>
        <MainPaper elevation={2}>
          {myBookedAccommodations.length >= 1 ? (
            myBookedAccommodations.map((element, index) => (
              <CardDashBoard
                setRenderAgain={setRenderAgain}
                element={element}
                userBookings={userBookings[index]}
                key={index}
                conditional={conditional[index]}
              />
            ))
          ) : (
            <NoInfo>
              <StartATrip/>
            </NoInfo>
          )}
        </MainPaper>
      </MainSection>
      <Footer />
    </>
  );
}

export default DashBoard;
