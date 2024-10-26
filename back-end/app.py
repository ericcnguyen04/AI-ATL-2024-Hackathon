from flask import Flask, jsonify, request
from flask_cors import CORS

import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
cors = CORS(app, origins='*')

# Replace with your actual Gemini API URL and API key
GEMINI_API_URL = "https://aistudio.google.com/prompts/new_chat"
GEMINI_API_KEY = "AIzaSyA_NLgNcwTxCaudQLqnImLQqwb7FjVIBRQ"


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

@app.route("/users", methods=['POST'])
def add_user():
    data = request.json
    new_user = data.get('username','')

    if not new_user:
        return jsonify({"error": "No username provided"}), 400

    # Add the new user to the in-memory list
    users.append(new_user)

    return jsonify({"message": "User added successfully", "users": users}), 201


@app.route("/analyze", methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    patient_id = data.get('patientId', '')

    # if not text:
    #     return jsonify({"error": "No text provided"}), 400

    try:
        # Prepare the headers for Gemini API
        headers = {
            'Authorization': f'Bearer {GEMINI_API_KEY}',
            'Content-Type': 'application/json'
        }
        payload = {
            "text": text
        }

        # Make the request to the Gemini API
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload)

        # Check if the request was successful
        if response.status_code == 200:
            gemini_data = response.json() # actual AI response
            # Process the response data as needed
            response_data = {
                "patient_id": patient_id,
                "summary": gemini_data  # Assuming Gemini API returns a summary of the analysis
            }
        else:
            response_data = {
                "error": "Failed to analyze text",
                "details": response.text
            }
    except Exception as e:
        response_data = {
            "error": "An error occurred while analyzing the text",
            "details": str(e)
        }

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)