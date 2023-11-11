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
    message = f"Give 3 questions for an interview related to the following topics: {keywords}. Give the questions as a JSON format with the format: {{\"1\": <question1>, \"2\": <question>,...}} \
        Do not use curly brackets within the json itself. Ensure that the JSON is valid"
    questions = getGptJsonResponse(message)
    return questions

@app.route("/getFeedback",methods=['POST'],endpoint='getFeedback')
def getFeedBack():
    reqData = json.loads(request.data)
    question = reqData['question']
    userResponse = reqData['answer']    
    message = f"(Question: {question}. Answer: {userResponse}). Give a brief criticism of my answer to this question, providing feedback in the following JSON format: {{\"question\": <original question>,\"answer\": <original answer>, \"positive\": <positive points as a single string>, \"negative\": <negative points as a single string>, \"improved\": <improved answer as a single string>, \"score\": <integer from 0 to 100> }}. \
        Do NOT write any code, math expressions, or make comments about grammar or spelling. Ensure that the JSON is valid"
    feedback = getGptJsonResponse(message)
    return feedback

if __name__ == "__main__":
    app.run(debug=True)