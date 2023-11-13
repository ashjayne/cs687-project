from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/get_data', methods=['GET'])
def get_data():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)