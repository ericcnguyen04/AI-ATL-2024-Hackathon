from flask import Flask, jsonify
from flask_cors import CORS

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

if __name__ == '__main__':
    app.run(debug=True)