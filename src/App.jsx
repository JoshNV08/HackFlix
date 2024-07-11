import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Cards.css";
import MovieDetails from "./components/MovieDetails";
import ProfileSelection from "./components/ProfileSelection";
import Design from "./components/Design";
import Stars from "./components/Stars";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({
    id: null,
    name: "Default Profile",
    imageUrl: "../../src/assets/perfil1.png",
  });

  const location = useLocation();

  const apiKey = import.meta.env.VITE_API_KEY;
  const discoverUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`;

  const url = search ? searchUrl : discoverUrl;

  useEffect(() => {
    fetchMovies(page);
  }, [page, search]);

  useEffect(() => {
    filterMovies();
  }, [rating, movies]);

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies((prevMovies) =>
        page === 1 ? data.results : [...prevMovies, ...data.results]
      );
      setTotalPages(data.total_pages);

      if (page >= data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const filterMovies = () => {
    const minRating = rating * 2 - 2;
    const filtered = movies.filter((movie) => movie.vote_average >= minRating);
    setFilteredMovies(filtered);
  };

  const handleShowModal = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    setMovies([]);
  }

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="App">
      {location.pathname !== "/select-profile" && (
        <Design
          selectProfile={setCurrentProfile}
          currentProfile={currentProfile}
        />
      )}
      <Container style={{ paddingTop: "50px" }}>
        {location.pathname !== "/" &&
          location.pathname !== "/select-profile" && (
            <a href="/">
              <Button
                variant="danger"
                style={{ backgroundColor: "transparent" }}>
                Volver atrás
              </Button>
            </a>
          )}
        {location.pathname === "/" && (
          <Row className="align-items-center">
            <Col xs={12} md={4}>
              <Form onSubmit={handleSubmit} className="transparent-form">
                <input
                  type="text"
                  placeholder="Buscar Película"
                  value={search}
                  onChange={handleInputChange}
                />
              </Form>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-center">
              <Stars setRating={setRating} />
            </Col>
          </Row>
        )}
        <Row>
          <Routes>
            <Route
              path="/"
              element={
                <InfiniteScroll
                  dataLength={filteredMovies.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={<p>No more movies</p>}>
                  <Container style={{ paddingTop: "20px" }}>
                    <Row>
                      {filteredMovies.map((movie) => (
                        <Col md={3} className="mb-4" key={movie.id}>
                          <Card
                            className="movie-card"
                            onClick={() => handleShowModal(movie)}>
                            {movie.poster_path ? (
                              <img
                                srcSet={
                                  "https://image.tmdb.org/t/p/w500" +
                                  movie.poster_path
                                }
                                alt={movie.title}
                              />
                            ) : (
                              <div>{movie.title}</div>
                            )}
                            <div className="card-overlay">
                              <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                  Rating: {movie.vote_average}
                                </Card.Text>
                              </Card.Body>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </InfiniteScroll>
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route
              path="/select-profile"
              element={<ProfileSelection selectProfile={setCurrentProfile} />}
            />
          </Routes>
        </Row>
      </Container>
      <Modal
        show={selectedMovie !== null}
        onHide={handleCloseModal}
        dialogClassName="custom-modal">
        <Modal.Body className="modal-body">
          {selectedMovie && (
            <Row>
              <Col>
                <img
                  srcSet={
                    "https://image.tmdb.org/t/p/w500" +
                    selectedMovie.poster_path
                  }
                  alt={selectedMovie.title}
                  className="modal-poster"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </Col>
              <Col className="col-md-8">
                <Modal.Title>{selectedMovie.title}</Modal.Title>
                <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                  <p className="modal-description">{selectedMovie.overview}</p>
                </div>
                <p className="modal-rating">
                  Rating: {selectedMovie.vote_average}
                </p>
              </Col>
              <Link
                to={`/movie/${selectedMovie.id}`}
                className="btn my-1 text-light"
                style={{ backgroundColor: "#e50914" }}
                onClick={handleCloseModal}>
                Ver más detalles
              </Link>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
