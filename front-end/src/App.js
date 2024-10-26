import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState(''); // State to hold the input text
  const [response, setResponse] = useState([]); // State to hold the backend response

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(text)
  }

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:5000/users");
    // console.log(response.data.users)
    setResponse(response.data.users)
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Patient ID"
        />
        <button type="submit">Submit</button>
      </form>

        <div>
          <h3>users</h3>
          <p>
          {response.map((user, index) => (
            <span>{user + ", "}</span>
          ))}
          </p>
        </div>
    </div>
  );
}

export default App;
