import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/appSlice";
import axios from "axios";
import { Form, Button } from "react-bootstrap";


export default function Login() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.app);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "/login",
      data: {
        username,
        password
      },
    };
    axios(configuration)
      .then((result) => {
        if (result.data.username) {
          console.log("Logging in");
        } else {
          setMessage("Incorrect password");
        }
        dispatch(setUser(result.data.username))
      })
      .catch((error) => {
        error = new Error();
        setMessage("Error logging in")
      });
  }

  if (user) {
    window.location.href = "/";
  }

  return (
    <div>
      <Fragment>
        <h2>Login</h2>
        <Form onSubmit={(e)=>handleSubmit(e)}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              name="username"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>                

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e)=>handleSubmit(e)}
          >
            Submit
          </Button>
          <h4>{message}</h4>
        </Form>
      </Fragment>
    </div>
  );
};
