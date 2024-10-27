import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ReactMarkdown from 'react-markdown';
import { Box, Button, TextField, Typography } from '@mui/material';


function App() {
  const [text, setText] = useState(''); // State to hold the input text
  const [response, setResponse] = useState(null); // State to hold the backend response
  const [userDummy, setUserDummy] = useState([]); // State to hold the backend response


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-story', { text });
      setResponse(response.data.text);
      console.log("Submitted")
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  const fetchAPI = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/users");
      // Update the response state with the data
      setUserDummy(res.data.users);
      console.log(res.data.users)
    } catch (error) {
      console.error('Error fetching data:', error);

      // const response = await axios.get("http://127.0.0.1:5000/users");
      // console.log(response.data.users)
    }
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <div className='screen'>
      <div className='container'>
        <Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={20}
            sx={{ backgroundColor: 'rgba(246,249,254,1.0)' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Patient Information"
          />
          <Box>
            <Button onClick={handleSubmit} sx={{marginTop: 1, width:'100%',border: 'black', backgroundColor: "#F6F9FE", color: 'black' }}>Submit</Button>
          </Box>  
        </Box>

        {/* <div className='input-section'>
            <form onSubmit={handleSubmit}>
              <textarea
                className='input-box'
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Patient ID"
              />
              <button type="submit">Submit</button>
            </form>
          </div> */}

        {/* <div>
            <h3>User list:</h3>
            {userDummy.map((user, index) => (
              <div key={index}>
                <span>{user}</span>
              </div>
            ))}
          </div> */}

        <div className='generated-story'>
          {/* <h2>Generated Story:</h2> */}
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default App;