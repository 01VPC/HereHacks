from flask import Flask
from overpass import overpass

app = Flask(__name__)
app.secret_key = "your_secret_key_here"

# Register blueprints
app.register_blueprint(overpass, url_prefix="/overpass")

@app.route("/")
def index():
    return "Mumbai OSM Data API Service"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
