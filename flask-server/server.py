from flask import Flask, request, make_response
from flask_cors import CORS
import openai
import g4f
import json

def getGptJsonResponse(message):
    print(message)
    response = g4f.ChatCompletion.create(
        model=g4f.models.gpt_4,
        messages=[
            {
                "role": "user",
                "content": message,
            }
        ],
    )
    responseString = ""
    print(response)
    for i, char in enumerate(response):
        if char != "{":
            continue
        else:
            j = i
            while response[j] != "}" and j < len(response):
                responseString += response[j]
                j += 1
            responseString+="}"
    print("responseString is",responseString)
    finalJson = json.loads(responseString)
    print("loaded successfully")
    return finalJson

app = Flask(__name__)
CORS(app)

@app.route("/getQuestions",methods=['POST'],endpoint='getQuestions')
def getQuestions():
    reqData = json.loads(request.data)
    keywords = reqData['topics']
    message = f"Give 3 questions for an interview related to the following topics: {keywords}. Give the questions as a single JSON format with the format: {{\"1\": <question1>, \"2\": <question>,...}} \
        Ensure that the JSON is valid"
    questions = ""
    while True:
        try:
            questions = getGptJsonResponse(message)
            break
        except:
            continue

    return questions

@app.route("/getFeedback",methods=['POST'],endpoint='getFeedback')
def getFeedBack():
    reqData = json.loads(request.data)
    question = reqData['question']
    userResponse = reqData['answer']    
    message = f"(Question: {question}. Answer: {userResponse}). Give a passage of criticism as a single JSON format with the format: {{\"question\": <original question>,\"answer\": <original answer>, \"positive\": <positive points as a single string>, \"negative\": <negative points as a single string, ignore any spelling or grammar mistakes>, \"improved\": <the original answer with some improvements as a single string>, \"score\": <integer from 0 to 100> }}. \
        Ensure that the JSON is valid"
    feedback = ""
    while True:
        try:
            feedback = getGptJsonResponse(message)
            break
        except:
            continue
    return feedback

if __name__ == "__main__":
    app.run(debug=True)