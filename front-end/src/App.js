import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState(''); // State to hold the input text
  const [response, setResponse] = useState(null); // State to hold the backend response

  // Handle form submission
  const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent form from refreshing the page

      try {
          // Send a POST request to the backend with the input text
          const result = await axios.post('http://localhost:5000/submit-text', {
              text: text,
          });
          setResponse(result.data); // Store the backend response
      } catch (error) {
          console.error('Error submitting text:', error);
      }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter some text"
            />
            <button type="submit">Submit</button>
        </form>

        {response && (
            <div>
                <h3>Backend Response:</h3>
                <p>{response.message}</p>
            </div>
        )}
    </div>

  );
}

export default App;
