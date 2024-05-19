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
  const { loaded } = useSelector((store) => store.app);

  useEffect(() => {
    if (!loaded) {

      console.log("Checking user...")
      axios({
        method: "get",
        url: "/user"
      })
      .then((result) => {
        if (result.data.username) {
          console.log("User found")
          dispatch(setUser(result.data.username));
        } else {
          console.log("No user found")
          dispatch(setUser(null));
        }
      })
      .catch((error) => {
        error = new Error();
      });
    }
  }, []);
  return (
    <div id="App">
      {
        loaded
          ? (<>
              <Header />
              <Main />
              <Footer />
            </>)
          : <h1>Loading...</h1>
          }
    </div>
  );
}

export default App;