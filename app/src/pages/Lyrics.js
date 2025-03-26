import { useLocation, Navigate } from "react-router-dom";

function Lyrics() {
    const location = useLocation();
    if (!location.state) {
        return <Navigate to="/" />
    }
    const { state: { songLyrics, artist, songTitle } = {}} = location;
    
    return (
        <>
            <h1>Artist: { artist }, Song: { songTitle }</h1>
            <div>
                {
                    songLyrics.map((line, index) =>
                        <p key={index}>
                            { line }
                        </p>
                    )
                }
            </div>
            <a href="/">Back</a>
        </>
    )
}

export default Lyrics;