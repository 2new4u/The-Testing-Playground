from flask import Flask, render_template, jsonify, request
import time

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/submit', methods=['POST'])
def submit_form():
    data = request.json if request.is_json else request.form.to_dict()
    return jsonify({"status": "success", "message": "Data successfully received!", "received": data}), 200


@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file found."}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No name given to the file."}), 400
    return jsonify({"status": "success", "message": f"'{file.filename}' was successfully uploaded!"}), 200


@app.route('/api/slow-data', methods=['GET'])
def slow_data():
    time.sleep(3)
    return jsonify(["A", "B", "C"])


@app.route('/api/error', methods=['GET'])
def server_error():
    return jsonify({"status": "error", "message": "An error has occurred.."}), 500


if __name__ == '__main__':
    app.run(debug=True)
