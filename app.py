from flask import Flask, render_template, request, jsonify
from google import genai

app = Flask(__name__)

from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/explain", methods=["POST"])
def explain():

    data = request.get_json()

    topic = data.get("topic", "")

    print("User entered:", topic)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
        Explain the following topic in simple terms for a student:

        {topic}
        """
    )

    return jsonify({
        "response": response.text
    })

@app.route("/summarize", methods=["POST"])
def summarize():

    data = request.get_json()
    notes = data.get("notes", "")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
        Summarize these notes into concise bullet points:

        {notes}
        """
    )

    return jsonify({
        "response": response.text
    })


@app.route("/quiz", methods=["POST"])
def quiz():

    data = request.get_json()
    notes = data.get("notes", "")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
        Generate 5 multiple-choice questions from:

        {notes}

        Include answers.
        """
    )

    return jsonify({
        "response": response.text
    })


@app.route("/flashcards", methods=["POST"])
def flashcards():

    data = request.get_json()
    notes = data.get("notes", "")

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"""
        Create 5 flashcards.

        Format:
        Question:
        Answer:

        Notes:
        {notes}
        """
    )

    return jsonify({
        "response": response.text
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

