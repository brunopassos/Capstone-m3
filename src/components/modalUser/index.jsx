import { Background, UserMenu } from "./styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../login";
import Register from "../Register";
import { useDispatch, useSelector } from "react-redux";
import { changeUseState } from "../../store/modules/userIsLogged/actions";

function ModalUSer({ setModalUser }) {
  const userState = useSelector(({ userState }) => userState);
  const dispatch = useDispatch();

  const [isModalClosed, setIsModalClosed] = useState(false);

  const [loginModal, setLoginModal] = useState(false);

  const [registerModal, setRegisterModal] = useState(false);

  const history = useHistory();

  function modalClose() {
    setIsModalClosed(true);

    setTimeout(() => {
      setModalUser(false);
    }, 1000);
  }

  const handleOpenModalLogin = () => {
    setLoginModal(true);
  };

  const handleCloseModalLogin = () => {
    setLoginModal(false);
  };

  const handleOpenRegisterModal = () => {
    setRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModal(false);
  };

  const logOff = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    dispatch(changeUseState(false));
  };
  console.log(userState);

  return (
    <>
      <Background onClick={modalClose} handleCloseUser={isModalClosed} />
      <UserMenu handleCloseUser={isModalClosed}>
        <div className="containerIcons">
          <IconButton>
            <AccountCircleOutlinedIcon fontSize="large" color="primary" />
          </IconButton>
          <IconButton onClick={modalClose}>
            <CloseIcon fontSize="" />
          </IconButton>
        </div>
        <div className="containerOptions">
          {!userState ? (
            <>
              <h3 onClick={handleOpenModalLogin}>Login</h3>{" "}
              <h3 onClick={handleOpenRegisterModal}>Register</h3>{" "}
            </>
          ) : (
            <>
              <h3>My trips</h3>
              <h3>My accommodations</h3>
              <h3 onClick={logOff}>Logout</h3>
            </>
          )}
        </div>
      </UserMenu>
      <Login
        loginModal={loginModal}
        handleCloseModalLogin={handleCloseModalLogin}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />
      <Register
        registerModal={registerModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
        handleOpenModalLogin={handleOpenModalLogin}
      />
    </>
  );
}

export default ModalUSer;
