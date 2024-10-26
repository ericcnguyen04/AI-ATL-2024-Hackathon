import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState(''); // State to hold the input text
  const [response, setResponse] = useState(null); // State to hold the backend response
  const [userDummy, setUserDummy] = useState([]); // State to hold the backend response

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('yippie')
  }

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
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Patient ID"
        />
        <button type="submit">Submit</button>
      </form>

      {userDummy.map((user, index) => (
        <div key={index}>
          <span>{user}</span>
        </div>
      ))}
      
    </div>
  );
}

export default App;