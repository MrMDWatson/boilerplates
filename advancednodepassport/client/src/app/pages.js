import Home from "../pages/Home.js";
import Games from "../pages/games/Games.js";
import GameHome from "../pages/games/GameHome.js";
import Hangman from "../pages/games/hangman/Hangman.js";
import Betbox from "../pages/games/betbox/Betbox.js";
import TicTacToe from "../pages/games/tictactoe/TicTacToe.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import ProtectedRoutes from "../pages/protected-routes/ProtectedRoutes.js";
import Dashboard from "../pages/protected-routes/dashboard/Dashboard.js";
import DashboardHome from "../pages/protected-routes/dashboard/dashboard-home/DashboardHome.js";
import ToDoList from "../pages/protected-routes/todo-list/ToDoList.js";
import Chat from "../pages/protected-routes/chat/chat.js";

const pages = [
  {
    title: "ioLaunchpad",
    content: <Home />,
    url: "/",
    path: "",
    subContent: null
  },
  {
    title: "Games",
    content: <Games />,
    url: "/games",
    path: "games",
    subContent: [
      {
        title: "GamePad",
        content: <GameHome />,
        url: "/gamepad",
        path: "gamepad",
        subContent: null
      },
      {
        title: "Hangman",
        content: <Hangman />,
        url: "/hangman",
        path: "hangman",
        subContent: null
      },
      {
        title: "BetBox",
        content: <Betbox />,
        url: "/betbox",
        path: "betbox",
        subContent: null
      },
      {
        title: "Tic Tac Toe",
        content: <TicTacToe />,
        url: "/tictactoe",
        path: "tictactoe",
        subContent: null
      }
    ]
  },
  {
    title: "Login",
    content: <Login />,
    url: "/login",
    path: "login",
    subContent: null
  },
  {
    title: "Register",
    content: <Register />,
    url: "/register",
    path: "register",
    subContent: null
  },
  {
    title: "Profile",
    content: <ProtectedRoutes />,
    url: "/profile",
    path: "profile",
    subContent: [
      {
        title: "Dashboard",
        content: <Dashboard />,
        url: "/dashboard",
        path: "dashboard",
        subContent: [
          {
            title: "Dashboard Home",
            content: <DashboardHome />,
            url: "/dashboard-main",
            path: "dashboard-main",
            subContent: null
          }
        ]
      },
      {
        title: "Todo List",
        content: <ToDoList />,
        url: "/todolist",
        path: "todolist",
        subContent: null
      },
      {
        title: "Chat",
        content: <Chat />,
        url: "/chat",
        path: "chat",
        subContent: null
      }
    ]
  }
];

export default pages;