import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  const [text, setText] = useState(''); // State to hold the input text
  const [response, setResponse] = useState(null); // State to hold the backend response
  const [userDummy, setUserDummy] = useState([]); // State to hold the backend response


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-story', { text });
      setResponse(response.data.text);
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
    <div>
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

      {/* <div>
        <h3>User list:</h3>
        {userDummy.map((user, index) => (
          <div key={index}>
            <span>{user}</span>
          </div>
        ))}
      </div> */}
      
      <div>
        <h2>Generated Story:</h2>
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>


    </div>
  );
}

export default App;