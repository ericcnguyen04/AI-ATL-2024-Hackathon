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
    


# 3. some export bs
if __name__ == '__main__':
    app.run(debug=True)
