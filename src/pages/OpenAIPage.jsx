import { useState } from "react";
import { Container, TextField, Button, Typography, Paper, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";

export default function OpenAIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {
    if (!prompt.trim()) {
      setError("Prompt is a required field.");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post(`/generate`, { prompt });

      if (res.data?.success) {
        setResponse(res.data.data);
        setPrompt("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      console.error("Error fetching response", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Ask OpenAI
      </Typography>
      <TextField
        fullWidth
        label="Enter prompt"
        variant="outlined"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{ mb: 2 }}
      />
      {response && (
        <Paper elevation={3} sx={{ mt: 4, p: 2, textAlign: "left", whiteSpace: "pre-wrap" }}>
          <Typography variant="body1">{response}</Typography>
        </Paper>
      )}
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      <Button
        variant="contained"
        color="success"
        onClick={generateResponse}
        fullWidth
        disabled={loading || !prompt.trim()}
        sx={{ mt: 2 }}
      >
        {loading ? "Asking AI..." : "Ask AI"}
      </Button>
    </Container>
  );
}
