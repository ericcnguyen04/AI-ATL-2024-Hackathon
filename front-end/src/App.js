import './App.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:5000/users", {
        username: text
      });

      // Update the user list after adding the new user
      setUserDummy(res.data.users);
      setText(''); // Clear the input field
    } catch (error) {
      console.error('Error adding new user:', error);
      console.log('Error details:', error.response?.data);

    }
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
        <textarea
          className='input-box'
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Patient ID"
        />
        <button type="submit">Submit</button>
        <button onClick={handleAddUser}>Add user</button>
      </form>

      <div>
        <h3>User list:</h3>
        {userDummy.map((user, index) => (
          <div key={index}>
            <span>{user}</span>
          </div>
        ))}
      </div>
      

      <div>
        <h2>Generated Story:</h2>
        <p>{response}</p>
      </div>



    </div>
  );
}

export default App;