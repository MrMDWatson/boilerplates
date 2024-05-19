import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../App.css";

function Games() {
  const { user } = useSelector((store) => store.app);
  return (
    <div id="Games"><Outlet /></div>
  );
}

export default Games;