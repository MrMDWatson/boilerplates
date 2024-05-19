import Home from "../pages/Home.js";
import Games from "../pages/Games.js";
import GameHome from "../pages/GameHome.js";
import Hangman from "../pages/hangman/Hangman.js";
import Betbox from "../pages/Betbox.js";
import TicTacToe from "../pages/tictactoe/TicTacToe.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import ToDoList from "../pages/todo-list/ToDoList.js";

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
    url: "/Games",
    path: "Games",
    subContent: [
      {
        title: "Game Station",
        content: <GameHome />,
        url: "/Games",
        path: "Games",
        subContent: null
      },
      {
        title: "Hangman",
        content: <Hangman />,
        url: "/Hangman",
        path: "Hangman",
        subContent: null
      },
      {
        title: "BetBox",
        content: <Betbox />,
        url: "/Betbox",
        path: "Betbox",
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
    title: "Todo List",
    content: <ToDoList />,
    url: "/todolist",
    path: "todolist",
    subContent: null
  }
];

export default pages;