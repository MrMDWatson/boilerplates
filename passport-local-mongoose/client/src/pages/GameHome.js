import { Link } from "react-router-dom";
import "../App.css";

function GameHome() {
  return (
    <div id="GameHome">
      <Link className="Square-link" to="/Games/Hangman">Hangman</Link>
      <Link className="Square-link" to="/Games/Betbox">Betbox</Link>
    </div>
  );
}

export default GameHome;