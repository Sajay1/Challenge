import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export default function URLShortener() {
  const [ogURL, setOgURL] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortCode("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/shorten`, { 
        ogURL: ogURL.trim() 
      });
      setShortCode(res.data.shortCode);
      setOgURL("");
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const openShortURL = (code) => {
    if (!code) return;
    window.open(`http://localhost:5000/api/${code}`, "_blank");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>URL Shortener</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={ogURL}
          onChange={(e) => setOgURL(e.target.value)}
          style={styles.input}
          required
        />
        <button 
          type="submit" 
          disabled={!ogURL.trim() || loading}
          style={{
            ...styles.button,
            opacity: (!ogURL.trim() || loading) ? 0.6 : 1,
            cursor: (!ogURL.trim() || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {shortCode && (
        <div style={styles.resultBox}>
          <p style={styles.resultLabel}>Shortened URL:</p>
          <p
            onClick={() => openShortURL(shortCode)}
            style={styles.shortLink}
            title="Click to open the shortened URL"
          >
            {`http://localhost:5000/api/${shortCode}`}
          </p>
        </div>
      )}

      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#1a202c',
    color: 'white',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '400px',
    maxWidth: '90%'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#2d3748',
    border: '1px solid #4a5568',
    borderRadius: '6px',
    color: 'white',
    outline: 'none'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#319795',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  resultBox: {
    marginTop: '20px',
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#2d3748',
    borderRadius: '8px'
  },
  resultLabel: {
    marginBottom: '8px',
    fontSize: '14px',
    color: '#a0aec0'
  },
  shortLink: {
    color: '#4fd1c5',
    cursor: 'pointer',
    textDecoration: 'underline',
    margin: 0,
    fontSize: '16px'
  },
  errorBox: {
    marginTop: '20px',
    padding: '12px 16px',
    backgroundColor: '#742a2a',
    border: '1px solid #fc8181',
    borderRadius: '6px',
    maxWidth: '400px'
  },
  errorText: {
    color: '#feb2b2',
    margin: 0
  }
};