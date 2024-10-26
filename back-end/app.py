from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for communication with React frontend

@app.route('/')
def home():
    return "Hello, Flask is up and running!"

@app.route('/submit-text', methods=['POST'])
def submit_text():
    data = request.get_json()  # Get JSON data from the POST request
    input_text = data.get('text')  # Extract the text field from the JSON data

    # Dummy processing - You can add AI processing here
    response_message = f"Received the text: {input_text}"

    # Return a response to the frontend
    return jsonify({'message': response_message})

if __name__ == '__main__':
    app.run(debug=True)
