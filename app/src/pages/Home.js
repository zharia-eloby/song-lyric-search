import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";

function formatLyrics(lyricsArr) {
    const newArr = lyricsArr.split(/\n\n|\r\n/);
    console.log(newArr);
    return newArr;
}

function ErrorMessage(props) {
    return (
        <>
            <p className="error-message text-center fw-bold" role="alert">{ props.message }</p>
        </>
    )
}

function Home() {
    const [artist, setArtist] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [error, setErrorStatus] = useState(undefined);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (artist !== '' && songTitle !== '') {
            axios.get(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`).then((response) => {
                const songLyrics = formatLyrics(response.data.lyrics);
                navigate(`/lyrics`, { state: { songLyrics, artist, songTitle }});
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
    }

    return (
        <div>
            <h1 className="text-center fw-bold">Search</h1>
            <p className="fs-5 fst-italic text-center">
                Enter an artist and song title and we'll see if we can find the lyrics!
            </p>
            <Form noValidate validated={error} onSubmit={handleSubmit}>
                {
                    error == 404 &&
                        <ErrorMessage message="Lyrics not found. Please check your input and try again." />
                }
                {
                    (error != 404 && error > 0) &&
                        <ErrorMessage message="An error occurred. Please try again." />
                }

                <Form.Group className="mb-3" controlId="artistGroup">
                    <Form.Label>Artist</Form.Label>
                    <Form.Control type="text" onChange={(e) => setArtist(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter an artist.</Form.Control.Feedback>
                </Form.Group>

                <Container fluid className="separator">
                    <Row>
                        <div className="col col-5 px-0"><hr></hr></div>
                        <div className="col col-2 text-center">and</div>
                        <div className="col col-5 px-0"><hr></hr></div>
                    </Row>
                </Container>

                <Form.Group className="mb-3" controlId="songTitleGroup">
                    <Form.Label>Song Title</Form.Label>
                    <Form.Control type="text" onChange={(e) => setSongTitle(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter a song title.</Form.Control.Feedback>
                </Form.Group>

                <div className="mx-auto text-center">
                    <button className="w-50 rounded rounded-3 py-2 border-0 fw-bold" type="submit">Search</button>
                </div>
            </Form>
        </div>
    );
}

export default Home;