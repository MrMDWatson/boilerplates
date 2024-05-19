import { Outlet } from "react-router-dom";

export default function Dashbaord() {
  return (
    <div id="Dashboard">
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}