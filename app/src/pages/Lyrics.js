import { useLocation, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Lyrics() {
    const location = useLocation();
    if (!location.state) {
        return <Navigate to="/" />
    }
    const { state: { songLyrics, artist, songTitle } = {}} = location;
    
    return (
        <>
            <Button href="/">Back</Button>
            <h1>{ songTitle }</h1>
            <h2>{ artist }</h2>
            <div>
                {
                    songLyrics.map((line, index) =>
                        <p key={index}>
                            { line }
                        </p>
                    )
                }
            </div>
        </>
    )
}

export default Lyrics;