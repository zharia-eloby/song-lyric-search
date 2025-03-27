import { useLocation, Navigate, Link } from "react-router-dom";
import _ from 'lodash';

function toTitleCase(str) {
    return str.split(' ').map((word) => _.capitalize(word.toLowerCase())).join(' ');
}

function LyricLine(props) {
    if (props.line.length == 0) {
        return <br key={props.key}></br>
    }
    return <p key={props.key}>{ props.line }</p>
}

function Lyrics() {
    const location = useLocation();
    if (!location.state) {
        return <Navigate to="/" />
    }
    const { state: { songLyrics, artist, songTitle } = {}} = location;
    
    return (
        <div>
            <div className="text-center w-100 mb-5">
                <Link to="/">&lt; Back to Search</Link>
            </div>
            <div className="text-center">
                <h1>
                    "{ toTitleCase(songTitle) }"
                    <br></br>
                    <span className="fs-4">by { toTitleCase(artist) }</span>
                </h1>

                <hr></hr>

                <div>
                    {
                        songLyrics.map((line, index) =>
                            <LyricLine line={line} key={index} />
                        )
                    }
                </div>
            </div>
            <div className="text-center w-100 mb-5">
                <Link to="/">&lt; Back to Search</Link>
            </div>
        </div>
    )
}

export default Lyrics;