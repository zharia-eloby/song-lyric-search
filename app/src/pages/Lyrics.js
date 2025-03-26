import { useLocation } from "react-router-dom";

function Lyrics() {
    const { state: { songLyrics, artist, songTitle } = {} } = useLocation();
    
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