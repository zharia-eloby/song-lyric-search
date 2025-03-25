import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [artist, setArtist] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/${artist}/${songTitle}`);
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
        </>
    );
}

export default Home;