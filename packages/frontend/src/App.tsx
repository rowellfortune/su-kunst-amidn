import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes.tsx";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppContext, type AppContextType } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import Nav from "react-bootstrap/Nav";
import "./App.css";

function App() {
  const nav = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  
    nav("/login");
  }
  
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ): (
                <>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>

    </div>
  );
}

export default App;
