from flask import Flask
from overpass import overpass
from flask_cors import CORS
from other_scrapers import other_scrapers_bp
from processing import processing_bp
app = Flask(__name__)
CORS(app)
app.secret_key = "your_secret_key_here"

CORS(overpass)
# Register blueprints
app.register_blueprint(overpass, url_prefix="/overpass")
app.register_blueprint(other_scrapers_bp, url_prefix="/scraper")
app.register_blueprint(processing_bp, url_prefix="/processing")

@app.route("/")
def index():
    return "Mumbai OSM Data API Service"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
