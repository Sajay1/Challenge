import React,{useState,useEffect} from "react";
import axios from "axios";
import {Box,Flex} from "@chakra-ui/react";

export default function URL(){

    const [ogURL,setogURL] = useState('')
    const [shortCode,setshortCode] = useState('')
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        ogURL: ogURL.trim(),
      });

      // Construct the full short URL (in production, this would be your domain)
      const fullShortUrl = `http://localhost:5000/${response.data.shortCode}`;
      setshortCode(fullShortUrl);
      setogURL('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleShortUrlClick = () => {
    if (shortUrl) {
      window.open(shortUrl, '_blank');
    }
  };


    return(
        <>
        <Box>
            <Text>SHORTEN URL</Text>
        </Box>
        <Box>
            <form onSubmit={handleSubmit}>
            <Input name="url" placeholder="Enter the URL" onChange={(e)=>setogURL(e.target.value)} value={ogURL} required></Input>
            <Button type="button" >Submit</Button>
            </form>
        </Box>
        </>
    )
}