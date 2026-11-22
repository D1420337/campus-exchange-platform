import os
from flask import Flask, send_from_directory, jsonify, abort

app = Flask(__name__, static_folder=".", static_url_path="")
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "campus-exchange-platform"})

@app.route("/<path:filename>")
def serve_file(filename):
    target_path = os.path.normpath(os.path.join(BASE_DIR, filename))
    if not target_path.startswith(BASE_DIR):
        abort(403)

    if os.path.isdir(target_path):
        index_file = os.path.join(target_path, "index.html")
        if os.path.isfile(index_file):
            return send_from_directory(target_path, "index.html")

    if os.path.isfile(target_path):
        return send_from_directory(BASE_DIR, filename)

    abort(404)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
