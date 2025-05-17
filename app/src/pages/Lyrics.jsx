import { useLocation, Navigate, Link } from "react-router";
import _ from "lodash";

function toTitleCase(str) {
  return str.split(" ").map((word) => _.capitalize(word.toLowerCase())).join(" ");
}

function BackLink(props) {
  const classNames = "w-100 " + props.classNames;
  return (
    <div className={classNames}>
      <Link to="/">&lt; Back to Search</Link>
    </div>
  );
}

function LyricLine(props) {
  if (props.line.length == 0) {
    return <br></br>;
  }
  return <p>{ props.line }</p>;
}

function Lyrics() {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to="/" />;
  }
  const { state: { songLyrics, artist, songTitle } = {}} = location;
    
  return (
    <div className="text-center">
      <BackLink classNames="mb-4" data-testid="back-to-home-link-top" />
      <div>
        <div>
          <h1 data-testid="song-title">&quot;{ toTitleCase(songTitle) }&quot;</h1>
          <p className="fs-4" data-testid="artist-name">by { toTitleCase(artist) }</p>
        </div>

        <hr className="separator"></hr>

        <div data-testid="lyrics">
          {
            songLyrics.map((line, index) =>
              <LyricLine key={index} line={line} />
            )
          }
        </div>

        <hr className="separator"></hr>
      </div>
      <BackLink classNames="mt-4" data-testid="back-to-home-link-bottom" />
    </div>
  );
}

export default Lyrics;