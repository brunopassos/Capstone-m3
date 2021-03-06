import { DivReviews, StyledButton } from "./style";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import CardReviews from "../CardReviews";

import { useState, useEffect } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useSelector } from "react-redux";

import { Api } from "../../services/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const textFieldStyle = {
  width: 300,
};

function ReviewsApp() {
  const [reviews, setReviews] = useState([]);

  const reviewsDescending = [...reviews].sort((a, b) => b.id - a.id);
  useEffect(() => {
    Api.get("/appReview").then((resp) => setReviews(resp.data));
  }, [reviews]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schema = yup.object().shape({
    review: yup.string().min(20, "Please, type at least 20 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleCheckUserState() {
    if (userState) {
      handleOpen();
    }
  }

  async function onSubmitReview(data) {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");
    const userInfo = await Api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.data);
    // .catch((err) => console.log(err));

    const newReview = {
      userName: userInfo.name,
      userPicture: userInfo.profilePicture[0],
      userId: userInfo.id,
      message: data.review,
    };
    await Api.post("/appReview", newReview, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.data);
    // .catch((err) => console.log(err));
    handleClose();
  }

  const userState = useSelector(({ userState }) => userState);

  return (
    <DivReviews>
      <h2>Reviews</h2>
      <div className="divReviews-content">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            720: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviewsDescending?.map((element) => (
            <SwiperSlide key={element.id}>
              <CardReviews element={element} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <StyledButton
        userState={userState}
        onClick={handleCheckUserState}
        variant="contained"
      >
        Add a Review
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-multiline-static"
            label="Type your Review"
            multiline
            rows={8}
            sx={textFieldStyle}
            {...register("review")}
          />
          <p style={{ color: "#ee685f" }}>{errors.review?.message}</p>
          <StyledButton
            userState={userState}
            onClick={handleSubmit(onSubmitReview)}
            variant="contained"
          >
            Submit Review
          </StyledButton>
        </Box>
      </Modal>
    </DivReviews>
  );
}

export default ReviewsApp;
