import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/appSlice";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default function Register() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.app);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "/register",
      data: {
        email,
        username,
        password,
      }
    };
    axios(configuration)
      .then((result) => {
        if (result.data.username) {
          console.log(`Registered ${result.data.username}`);
          window.location.href = "/";
        } else {
          setMessage(result.data.message);
        }
        setEmail("");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        error = new Error();
        setMessage("Error with registration");
      });
  }
  /*
  if (user) {
    
  }
*/
  return (
    <div>
      <Fragment>       
        <h2>Register</h2>
        <Form onSubmit={(e)=>handleSubmit(e)}>
          {/* email */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* username */}
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

          {/* password */}
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

          {/* submit button */}
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
