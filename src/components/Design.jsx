// src/components/Design.jsx
import React from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Navbar.css";

function Design({ selectProfile, currentProfile }) {
  const navigate = useNavigate();

  const handleShowProfileSelection = () => {
    navigate("/select-profile");
  };

  const handleProfileClick = () => {
    if (selectProfile) {
      selectProfile(currentProfile);
    }
  };

  return (
    <Navbar variant="dark" expand="lg">
      <Container className="navbar-cont">
        <Navbar.Brand href="/" className="z-1">
          <img
            srcSet="../../src/assets/logo.png"
            alt=""
            style={{ width: "150px", height: "auto" }}
            className="logo"
          />
        </Navbar.Brand>
        <h2 className="navbar-text">¡Tus películas favoritas!</h2>
        <h5 className="navbar-textsecond">En un solo lugar</h5>

        <Nav style={{ marginRight: "-50px" }}>
          <Nav.Link href="/" className="text-light z-3">
            Home
          </Nav.Link>
          <Button
            variant="link"
            onClick={handleShowProfileSelection}
            className="p-0 z-3">
            <Image
              src={currentProfile.imageUrl}
              alt=""
              style={{ width: "50px", height: "50px", cursor: "pointer" }}
              className=" mx-1 z-5"
              onClick={handleProfileClick}
            />
          </Button>
          <img
            src="../../src/assets/stream.png"
            alt=""
            style={{ width: "30px", height: "30px" }}
            className="z-3 my-2 mx-1"
          />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Design;
