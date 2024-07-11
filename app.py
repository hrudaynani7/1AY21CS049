from flask import Flask, jsonify, request
import requests
from collections import deque
import time

app = Flask(__name__)

WINDOW_SIZE = 10
numbers_store = deque(maxlen=WINDOW_SIZE)

# Mock function to fetch numbers from a third-party server
def fetch_number(number_id):
    # Replace with actual API call logic
    mock_data = {
        'p': [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
        'f': [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
        'e': [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        'r': [5, 3, 8, 2, 7, 9, 4, 1, 6, 0]
    }
    return mock_data.get(number_id, [])

@app.route('/numbers/<string:number_id>', methods=['GET'])
def get_numbers(number_id):
    start_time = time.time()

    if number_id not in ['p', 'f', 'e', 'r']:
        return jsonify({"error": "Invalid number ID"}), 400

    # Fetch new numbers from the third-party server
    new_numbers = fetch_number(number_id)
    
    # Filter out duplicates and only store unique values
    unique_numbers = [num for num in new_numbers if num not in numbers_store]
    numbers_store.extend(unique_numbers)

    # Calculate the average
    if len(numbers_store) == 0:
        avg = 0
    else:
        avg = sum(numbers_store) / len(numbers_store)

    # Check response time
    response_time = time.time() - start_time
    if response_time > 0.5:
        return jsonify({"error": "Request took too long"}), 500

    response = {
        "windowPrevState": list(numbers_store)[:-len(unique_numbers)],
        "windowCurrState": list(numbers_store),
        "numbers": unique_numbers,
        "avg": round(avg, 2)
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
