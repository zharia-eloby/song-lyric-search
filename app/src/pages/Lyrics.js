import { useLocation, Navigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import _ from 'lodash';

function toTitleCase(str) {
    return str.split(' ').map((word) => _.capitalize(word.toLowerCase())).join(' ');
}

function Lyrics() {
    const location = useLocation();
    if (!location.state) {
        return <Navigate to="/" />
    }
    const { state: { songLyrics, artist, songTitle } = {}} = location;
    
    return (
        <div>
            <Button href="/">Back</Button>
            <div className="text-center">
                <h1>"{ toTitleCase(songTitle) }"</h1>
                <h2>by { toTitleCase(artist) }</h2>
                <hr></hr>
                <div>
                    {
                        songLyrics.map((line, index) =>
                            <p key={index}>
                                { line }
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Lyrics;