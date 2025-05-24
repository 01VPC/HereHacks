from flask import Blueprint, request, jsonify
from scrapers.wikipedia_scraper import WikipediaScraper
from scrapers.justdial_scraper import JustDialScraper

other_scrapers_bp = Blueprint('other_scrapers', __name__)

@other_scrapers_bp.route('/scrape/wikipedia', methods=['GET'])
def scrape_wikipedia():
    location = request.args.get('location')
    if not location:
        return jsonify({"error": "Missing 'location' parameter"}), 400
    scraper = WikipediaScraper()
    try:
        data = scraper.search_location(location)
        return jsonify({"results": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@other_scrapers_bp.route('/scrape/justdial', methods=['GET'])
def scrape_justdial():
    location = request.args.get('location')
    categories = request.args.getlist('category')
    if not location:
        return jsonify({"error": "Missing 'location' parameter"}), 400
    scraper = JustDialScraper()
    try:
        data = scraper.search_location(location, categories if categories else None)
        return jsonify({"results": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
