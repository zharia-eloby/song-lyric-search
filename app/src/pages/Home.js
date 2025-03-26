import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NotFoundError() {
    return (
        <>
            <p>Couldn't find that song & artist. Please check your input and try again.</p>
        </>
    )
}

function GeneralError() {
    return (
        <>
            <p>Uh oh. An error occurred. Please try again.</p>
        </>
    )
}

function Home() {
    const [artist, setArtist] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [error, setErrorState] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`).then((response) => {
            const songLyrics = response.data.lyrics.split(/\n\n|\r\n/);
            navigate(`/lyrics`, { state: { songLyrics, artist, songTitle }});
        }).catch((err) => {
            if (err.status == 404) {
                setErrorState('not found');
            } else {
                setErrorState('general');
            }
            console.log(err);
        });
    }

    return (
        <>
            <h1>Find song lyrics</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Artist:
                    <input type="text" id="Artist" name="Artist" onChange={(e) => setArtist(e.target.value)} />
                </label>

                <br/>

                <label>
                    Song Title:
                    <input type="text" id="Song Title" name="Song Title" onChange={(e) => setSongTitle(e.target.value)} />
                </label>

                <br/>

                <input type="submit" value="Search" />
            </form>

            {
                error == 'not found' &&
                    <NotFoundError />
            }

            {
                error == 'general' &&
                    <GeneralError />
            }
        </>
    );
}

export default Home;