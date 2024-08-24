import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [castChunks, setCastChunks] = useState([]);

  const apiKey = "dde347c48350d1db209090de2977ece0";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);

        fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            const trailer = data.results.find(
              (video) => video.type === "Trailer"
            );
            if (trailer) {
              setTrailerKey(trailer.key);
            }
          });

        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            setCast(data.cast);
          });
      });
  }, [id, apiKey]);

  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const updateChunks = () => {
    const screenWidth = window.innerWidth;
    const chunkSize = screenWidth < 576 ? 2 : 6;
    setCastChunks(chunkArray(cast, chunkSize));
  };

  useEffect(() => {
    updateChunks();
    window.addEventListener("resize", updateChunks);

    return () => {
      window.removeEventListener("resize", updateChunks);
    };
  }, [cast]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="movie-details" style={{ paddingTop: "20px" }}>
      <Row>
        <Col md={6}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-100"
          />
        </Col>
        <Col md={6} className="text-white">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          <p>Duration: {movie.runtime} minutes</p>
          <p>Budget: ${movie.budget.toLocaleString()}</p>
          <p>Revenue: ${movie.revenue.toLocaleString()}</p>
          <p>
            Production:{" "}
            {movie.production_companies
              .map((company) => company.name)
              .join(", ")}
          </p>
          <p>
            Production Countries:{" "}
            {movie.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
          <p>Rating: {movie.vote_average}</p>
          <p>Release Date: {movie.release_date}</p>
          {trailerKey && (
            <iframe
              title={`${movie.title} Trailer`}
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen></iframe>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="text-light">Cast:</h3>
          <Carousel
            indicators={false}
            interval={null}
            className="cast-carousel">
            {castChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <Row className="justify-content-center">
                  {chunk.map((actor) => (
                    <Col key={actor.id} xs={6} sm={6} md={4} lg={3} xl={2}>
                      <Card className="bg-dark text-white mb-3">
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                          alt={actor.name}
                        />
                        <Card.Body>
                          <Card.Title style={{ fontSize: "0.9rem" }}>
                            {actor.name}
                          </Card.Title>
                          <Card.Text style={{ fontSize: "0.75rem" }}>
                            {actor.character}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDetails;
