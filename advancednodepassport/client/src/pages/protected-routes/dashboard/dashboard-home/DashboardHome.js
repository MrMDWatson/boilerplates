import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div id="DashHome">
      <Link className="Square-link" to="/dashboard/todolist">To Do List</Link>
      <Link className="Square-link" to="/Games/Betbox">Chat</Link>
    </div>
  );
}