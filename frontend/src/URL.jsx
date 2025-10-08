import React, { useState } from "react";
import {
  Box, Input, Button, Text, Tooltip
} from "@chakra-ui/react";
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
      const res = await axios.post(`${API_BASE_URL}/shorten`, { ogURL: ogURL.trim() });
      setShortCode(res.data.shortCode);
      setOgURL("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const openShortURL = (shortCode) => {
    if (!shortCode) return;
    window.open(`http://localhost:5000/api/${shortCode}`, "_blank"); 
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      p={5}
      bg="gray.900"
      color="white"
      minH="100vh"
    >
      <Text fontSize="3xl" mb={4} fontWeight="bold">URL Shortener</Text>

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter long URL"
          value={ogURL}
          onChange={(e) => setOgURL(e.target.value)}
          width="400px"
          mb={3}
          bg="gray.800"
          border="1px solid gray"
          required
        />
        <Button type="submit" colorScheme="teal" isLoading={loading} disabled={!ogURL.trim()}>
          Shorten URL
        </Button>
      </form>

      {shortCode && (
        <Box mt={4} textAlign="center">
          <Text>Shortened URL:</Text>
          <Tooltip label="Click to open the shortened URL">
            <Text
              color="teal.300"
              cursor="pointer"
              textDecoration="underline"
              onClick={() => openShortURL(shortCode)}
            >
              {`http://localhost:5000/api/${shortCode}`}
            </Text>
          </Tooltip>
        </Box>
      )}

      {error && <Text color="red.400" mt={3}>{error}</Text>}
    </Box>
  );
}
