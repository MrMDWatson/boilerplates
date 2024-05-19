import { Outlet } from "react-router-dom";
import "../App.css";

function Games() {
  return (
    <div id="Games">
      <Outlet />
    </div>
  );
}

export default Games;