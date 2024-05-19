import React, { Fragment } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/appSlice";
import { Container, Navbar, Nav, NavDropdown, Dropdown, DropdownButton, Button } from 'react-bootstrap';

export default function Header() {
  const dispatch = useDispatch();
  let { user } = useSelector((store) => store.app);
  
  const logout = () => {
    const configuration = {
      method: "get",
      url: "/logout"
    };
    axios(configuration)
    .then(() => {
      dispatch(setUser(null));
      console.log("Logging in");
      window.location.href = "/";
    })
    .catch((error) => {
      error = new Error();
    });  
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">ioLaunchPad</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Games">
              <NavDropdown.Item href="/Games">Game Pad</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Games/Betbox">Betbox</NavDropdown.Item>
              <NavDropdown.Item href="/Games/Hangman">Hangman</NavDropdown.Item>
              <NavDropdown.Item href="/Games/tictactoe">Tic Tac Toe</NavDropdown.Item>
            </NavDropdown>

            <Nav.Item>
              <Nav.Link href="/profile/todolist">To Do List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/profile/chat">Chat</Nav.Link>
            </Nav.Item>

          </Nav>
          <Nav>
            {user
              ? (
                <Fragment>
                  <DropdownButton title={user}>
                    <Dropdown.Item href="/profile">Dashboard</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <Button type="submit" variant="danger" onClick={() => logout()}>Logout</Button>
                    </Dropdown.Item>
                  </DropdownButton>
                </Fragment>
              )
              : (
                <Fragment>
                  <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </Nav.Item>
                </Fragment>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}