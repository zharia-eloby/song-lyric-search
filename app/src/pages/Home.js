import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";

function ErrorMessage(props) {
    return (
        <>
            <p>{ props.message }</p>
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
                const songLyrics = response.data.lyrics.split(/\n\n|\r\n/);
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
        <div className="w-75 mx-auto">
            <h1 className="text-center">Find song lyrics</h1>
            <Form noValidate validated={error} className="w-50 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="artistGroup">
                    <Form.Label>Artist</Form.Label>
                    <Form.Control type="text" onChange={(e) => setArtist(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter an artist.</Form.Control.Feedback>
                </Form.Group>

                <Container fluid className="separator">
                    <Row>
                        <div className="col col-5 px-0"><hr></hr></div>
                        <div className="col col-2 text-center">AND</div>
                        <div className="col col-5 px-0"><hr></hr></div>
                    </Row>
                </Container>

                <Form.Group className="mb-3" controlId="songTitleGroup">
                    <Form.Label>Song Title</Form.Label>
                    <Form.Control type="text" onChange={(e) => setSongTitle(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter a song title.</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Search</Button>
                {
                    error == 404 &&
                        <ErrorMessage message="Song not found. Please check your input and try again" />
                }
                {
                    (error != 404 && error > 0) &&
                        <ErrorMessage message="An error occurred. Please try again." />
                }
            </Form>
        </div>
    );
}

export default Home;