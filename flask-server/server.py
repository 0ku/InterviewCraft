from flask import Flask,request
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
    print("check1")
    responseString = ""
    for i, char in enumerate(response):
        if char != "{":
            continue
        else:
            j = i
            while response[j] != "}" and j < len(response):
                responseString += response[j]
                j += 1
            responseString+="}"
    print(responseString)
    finalJson = json.loads(responseString)
    return finalJson

app = Flask(__name__)

@app.route("/members")
def members():
    return {"members":["Member1","Mem2","mem3"]}

@app.route("/getQuestions",methods=['POST'],endpoint='getQuestions')
def getQuestions():
    reqData = json.loads(request.data)
    keywords = reqData['topics']
    message = f"Give 3 questions for an interview related to the following topics: {keywords}. Give the questions as a JSON format with the keys as '1', '2', etc."
    questions = getGptJsonResponse(message)
    return questions

@app.route("/getFeedBack",methods=['POST'],endpoint='getFeedBack')
def getFeedBack():
    reqData = json.loads(request.data)
    question = reqData['question']
    userResponse = reqData['answer']
    message = f"Criticise my answer to this question, providing feedback and an improved example in JSON format with the keys \"positive\" and \"negative\" and \"improved\" Question: {question}. Answer: {userResponse}"
    feedback = getGptJsonResponse(message)
    return feedback

if __name__ == "__main__":
    app.run(debug=True)