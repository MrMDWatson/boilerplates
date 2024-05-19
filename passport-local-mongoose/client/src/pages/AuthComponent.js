import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function AuthComponent() {
  const token = cookies.get("TOKEN");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    axios({
      method: "get",
      url: "/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
    </div>
  );
}