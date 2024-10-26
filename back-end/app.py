# 1. imports and set up
from flask import Flask, jsonify, requests
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

# 2. logics and initiation
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

@app.route("/analyze", methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    patient_id = data.get('patientId', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

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
            data = response.json()
            # Process the response data as needed
            response_data = {
                "patient_id": patient_id,
                "summary": data  # Assuming Gemini API returns a summary of the analysis
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
    


# 3. some export bs
if __name__ == '__main__':
    app.run(debug=True)
