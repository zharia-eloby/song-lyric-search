import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Lyrics() {
    const params = useParams();

    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        axios.get(`https://api.lyrics.ovh/v1/${params.artist}/${params.song_title}`).then((response) => {
            const lyrics = response.data.lyrics;
            const lyricsArr = lyrics.split(/\n\n|\r\n/);
            setLyrics(lyricsArr);
        }).catch((err) => {
            console.log(err);
        });
    }, [])
    
    return (
        <>
            <h1>Artist: { params.artist }, Song: { params.song_title }</h1>
            <div>
                {
                    lyrics.map((line, index) =>
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