import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { ItemProvider } from "./context/ItemContext";
import ItemManagement from "./pages/ItemManagement";
import OpenAIPage from "./pages/OpenAIPage";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  return (
    <>
      <ItemProvider>
        <AppBar position="static" sx={{ paddingInline: 24,backgroundColor:'whitesmoke' }}>
          <Toolbar>
            <Button
              color={"info" }
              sx={{
                fontSize: location.pathname === "/" ? "1.1rem" : "1rem",
             fontWeight: location.pathname === "/" ? "bold" : "normal",
              }}
              component={Link}
              to="/"
            >
              Item Management
            </Button>
            <Button
              color={"info" }
              sx={{
                fontSize: location.pathname === "/openai" ? "1.1rem" : "1rem",
           fontWeight: location.pathname === "/openai" ? "bold" : "normal",
              }}
              component={Link}
              to="/openai"
            >
              OpenAI Prompt
            </Button>
    
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<ItemManagement />} />
            <Route path="/openai" element={<OpenAIPage />} />
            <Route path="/about" element={<div>About Us Page</div>} />
          </Routes>
        </Container>
      </ItemProvider>
    </>
  );
}

export default App;
