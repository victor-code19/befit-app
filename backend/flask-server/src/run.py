import sklearn
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from text_processing import process_text
from email_sender import send_email


app = Flask(__name__)

CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

tfidf = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))


@app.route('/predict', methods=['POST'])
def predict():
    request_data = request.get_json()
    message = request_data['message']
    proccessed_message = process_text(message)
    vectorized_message = tfidf.transform([proccessed_message])
    prediction = model.predict(vectorized_message)[0]

    if prediction == 1:
        prediction = 'not spam'
        send_email(request_data)
        return jsonify(prediction_result=prediction)
    else:
        prediction = 'spam'
        return jsonify(prediction_result=prediction)


if __name__ == '__main__':
    app.run(debug=True)
