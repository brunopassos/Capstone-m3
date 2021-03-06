import {
  CardPaper,
  ContainerAccommodation,
  ContainerButton,
  ContainerInfo,
  ContainerPriceCity,
  ContainerRaiting,
  ContainerReviews,
} from "./styles";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import MiniCardImg from "../miniCardImg";
import {
  Button,
  Divider,
  Paper,
  Rating,
} from "@mui/material";

import MiniCardReview from "../miniCardReview";
import Header from "../header";
import HeaderDesktop from "../headerDesktop";

import { useState } from "react";
import ModalBooking from "../modalBooking";
import ModalReadMore from "../modalReadMore";
import HighLights from "../highLights";

function AccomodationCardPage({accommodation, reviewAccommodation}) {

  const [modal, setModal] = useState(false);
  const [ modalReadMore, setModalReadMore ] = useState(false)

  function modalDinamic() {
    setModal(true);
  }

  function handleModalReadMore(){
    setModalReadMore(true)
  }

  const reviewRating = reviewAccommodation?.reduce((a,b)=>(a + b.review),0) / reviewAccommodation.length

  return (
    <>
      <Header />
      <HeaderDesktop />
      <CardPaper>
      {modal && <ModalBooking setModal={setModal} price={accommodation.price} />}
      {modalReadMore && <ModalReadMore title={'casa'} description={accommodation?.description} setModalReadMore={setModalReadMore}/>}
        <>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {accommodation?.imageUrl?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item} alt={accommodation.name}/>
                  <ContainerPriceCity>
                    <div>
                      <h1>City</h1>
                      <p>{accommodation?.location?.city}</p>
                    </div>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        bgcolor: "grey",
                        borderWidth: "0.1rem",
                      }}
                    />
                    <div>
                      <h1>Daily</h1>
                      <p>$ {accommodation.price}</p>
                    </div>
                  </ContainerPriceCity>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
        <ContainerAccommodation>
          <h1>{accommodation.name}</h1>
          <MiniCardImg element={accommodation}/>
        </ContainerAccommodation>
        <ContainerRaiting>
          <Paper
            elevation={2}
            sx={{
              width: "9rem",
              textAlign: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <Rating value={reviewRating} precision={0.5} readOnly/>
          </Paper>
        </ContainerRaiting>
       <HighLights accommodation={ accommodation }/>
        <ContainerInfo>
          <div className="description">
            <p>
              {accommodation?.description?.substring(0, 455)}
              {accommodation?.description?.length >= 456 && <Button onClick={handleModalReadMore}>...more</Button>}
            </p>
          </div>
          <ContainerButton>
            <Button variant="contained" onClick={modalDinamic}>
              Booking
            </Button>
          </ContainerButton>
        </ContainerInfo>
        <ContainerReviews>
          <h1>Reviews</h1>
          <div className="reviews">
            <MiniCardReview handleModalReadMore={handleModalReadMore} modalReadMore={modalReadMore} setModalReadMore={setModalReadMore} reviewAccommodation={reviewAccommodation} />
          </div>
        </ContainerReviews>
      </CardPaper>
    </>
  );
}

export default AccomodationCardPage;
