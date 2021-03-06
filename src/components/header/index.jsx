import { IconButton } from "@mui/material";
import { useState } from "react";
import MenuNav from "../menuNav";
import { HeaderNav } from "./styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ModalUSer from "../modalUser";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const history = useHistory();
  const userState = useSelector(({ userState }) => userState);
  const userData = useSelector(({ userData }) => userData);

  const [modal, setModal] = useState(false);
  const [modalUser, setModalUser] = useState(false);

  function modalNavDinamic() {
    setModal(true);
  }

  function modalUserDinamic() {
    setModalUser(true);
  }

  function homePage() {
    history.push("/");
  }

  return (
    <HeaderNav>
      <div>
        {modal === true && <MenuNav setModal={setModal} />}
        <IconButton onClick={modalNavDinamic}>
          <MenuIcon />
        </IconButton>
        <div className="containerLogo" onClick={homePage}>
          <h1>On</h1>
          <h2>Trip</h2>
        </div>
      </div>
      {modalUser === true && <ModalUSer setModalUser={setModalUser} />}
      {userState ? (
        <>
          <img
            src={userData?.profilePicture[0] && userData?.profilePicture[0]}
            alt="Avatar user"
            onClick={modalUserDinamic}
          />
        </>
      ) : (
        <IconButton onClick={modalUserDinamic}>
          <AccountCircleOutlinedIcon color="primary" />
        </IconButton>
      )}

      {/* <IconButton onClick={modalUserDinamic}>
        <AccountCircleOutlinedIcon color="primary" />
      </IconButton> */}
    </HeaderNav>
  );
}

export default Header;
