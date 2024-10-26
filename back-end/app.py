from flask import Flask, jsonify
from flask_cors import CORS

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

if __name__ == '__main__':
    app.run(debug=True)