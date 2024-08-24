import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Container } from "react-bootstrap";

const profiles = [
  { id: 1, name: "Joshua", imageUrl: "../../src/assets/perfil1.png" },
  { id: 2, name: "Mateo", imageUrl: "../../src/assets/perfil2.png" },
  { id: 3, name: "Nahuel", imageUrl: "../../src/assets/perfil3.png" },
  { id: 4, name: "Esteban", imageUrl: "../../src/assets/perfil4.png" },
];

function ProfileSelection({ selectProfile }) {
  const navigate = useNavigate();

  const handleProfileSelect = (profile) => {
    selectProfile(profile);
    navigate("/");
  };

  return (
    <Container className="text-light">
      <h2 className="justify-content-center d-flex">Who's watching now?</h2>
      <Row>
        {profiles.map((profile) => (
          <Col key={profile.id} xs={6} sm={4} md={3}>
            <Card
              style={{ backgroundColor: "transparent" }}
              onClick={() => handleProfileSelect(profile)}
              className="text-center">
              <img src={profile.imageUrl} />
              <Card.Title className="text-light">{profile.name}</Card.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProfileSelection;
