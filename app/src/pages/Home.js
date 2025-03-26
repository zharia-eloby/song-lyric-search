import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    const [error, setErrorStatus] = useState(-1);
    const [validated, setValidated] = useState(false);
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
            setValidated(true);
        }
    }

    return (
        <div className="w-75 mx-auto">
            <h1 className="text-center">Find song lyrics</h1>
            <Form noValidate validated={validated} className="w-50 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="artistGroup">
                    <Form.Label>Artist</Form.Label>
                    <Form.Control type="text" onChange={(e) => setArtist(e.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please enter an artist.</Form.Control.Feedback>
                </Form.Group>

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
                        <ErrorMessage message="hello?" />
                }
            </Form>
        </div>
    );
}

export default Home;