import React from "react";
import ReactStars from "react-rating-stars-component";
import { Container, Row } from "react-bootstrap";

function Stars({ setRating }) {
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <Container className=" justify-content-center d-flex">
      <Row>
        <div className="text-white">
          Filtrar por Rating:
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={30}
            activeColor="red"
          />{" "}
        </div>
      </Row>
    </Container>
  );
}

export default Stars;
