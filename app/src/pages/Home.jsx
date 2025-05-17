import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function formatLyrics(lyricsArr) {
  const newArr = lyricsArr.split(/\n\n|\r\n/);
  return newArr;
}

function ErrorMessage(props) {
  return (
    <>
      <p className="error-message text-center fw-bold py-2" role="alert" data-testid={props.id}>{ props.message }</p>
    </>
  );
}

function Home() {
  const [artist, setArtist] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [error, setErrorStatus] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (artist !== "" && songTitle !== "") {
      axios.get(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`).then((response) => {
        const songLyrics = formatLyrics(response.data.lyrics);
        navigate("/lyrics", { state: { songLyrics, artist, songTitle }});
      }).catch((err) => {
        if (err.status) {
          setErrorStatus(err.status);
        } else {
          setErrorStatus(1);
        }
      });
    } else {
      setErrorStatus(-1);
    }
  };

  return (
    <div data-testid="home-page">
      <h1 className="text-center fw-bold">Find Song Lyrics</h1>
      <p className="fs-6 text-center my-3">
        Enter an artist and song title and we&apos;ll see if we can find the lyrics!
      </p>
      <Form noValidate validated={error} onSubmit={handleSubmit}>
        {
          error == 404 &&
                        <ErrorMessage message="Lyrics not found. Please check your input and try again." id="not-found-error" />
        }
        {
          (error != 404 && error > 0) &&
                        <ErrorMessage message="An error occurred. Please try again." id="api-error" />
        }

        <Form.Group className="mb-2" controlId="artistGroup">
          <Form.Label>Artist</Form.Label>
          <Form.Control type="text" onChange={(e) => setArtist(e.target.value)} required data-testid="artist-input-field" />
          <Form.Control.Feedback type="invalid" data-testid="artist-input-invalid">Please enter an artist.</Form.Control.Feedback>
        </Form.Group>

        <Container fluid className="d-flex flex-row px-0 align-items-center">
          <div className="w-100"><hr></hr></div>
          <div className="px-2"><span>and</span></div>
          <div className="w-100"><hr></hr></div>
        </Container>

        <Form.Group controlId="songTitleGroup">
          <Form.Label>Song Title</Form.Label>
          <Form.Control type="text" onChange={(e) => setSongTitle(e.target.value)} required data-testid="song-title-input-field" />
          <Form.Control.Feedback type="invalid" data-testid="song-title-input-invalid">Please enter a song title.</Form.Control.Feedback>
        </Form.Group>

        <div className="mt-3 mx-auto text-center">
          <button className="w-50 rounded rounded-3 py-2 border-0 fw-bold" type="submit" data-testid="submit-button">Search</button>
        </div>
      </Form>
    </div>
  );
}

export default Home;