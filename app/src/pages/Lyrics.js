import { useLocation, Navigate, Link } from "react-router-dom";
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
            <div className="text-center w-100 mb-3">
                <Link to="/">Back to Search</Link>
            </div>
            <div className="text-center">
                <h1>"{ toTitleCase(songTitle) }"<br></br><span className="fs-4">by { toTitleCase(artist) }</span></h1>
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