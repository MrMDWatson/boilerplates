import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./app/appSlice"; 
import axios from 'axios';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import './App.css';


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.app);
  
  useEffect(() => {
    console.log("Checking user...")
    if (!user) {
      console.log("Reloading")
      axios({
        method: "get",
        url: "/user"
      })
        .then((result) => {
          console.log("User loaded")
          dispatch(setUser(result.data.username));
        })
        .catch((error) => {
          error = new Error();
        });
    }
  }, [user]);
  
  return (
    <div id="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;