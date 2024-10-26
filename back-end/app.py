from flask import Flask, jsonify, request
from flask_cors import CORS

import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key
api_key = os.getenv('API_KEY')
genai.configure(api_key=api_key)

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/')
def home():
    return "Hello, Flask is up and running!"

@app.route("/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                'arol',
                'jess',
                'jackson'
            ]
        }
    )

# Route to generate content
@app.route('/generate-story', methods=['POST'])
def generate_story():
    data = request.json
    text = data.get('text')

    # Generate content using the text
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content('You are a helpful medical assistant for doctors. You have a vast corpus of knowledge at your disposal for helping summarize and assist medical professionals safely and reliably. Please assist the doctor by giving a summary of the patient, medical history, symptoms, possible diagnoses, and treatment. Use the data above to help with your diagnosis and summary.' + text)
    
    return jsonify({'text': response.text})

if __name__ == '__main__':
    app.run(debug=True)