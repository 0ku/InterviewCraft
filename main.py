import g4f
import json

g4f.logging = False  # enable logging
g4f.check_version = False  # Disable automatic version checking
# print(g4f.version) # check version
# print(g4f.Provider.Ails.params)  # supported args

# Automatic selection of provider

# streamed completion
response = g4f.ChatCompletion.create(
    model=g4f.models.gpt_4,
    messages=[
        {
            "role": "user",
            "content": "give 3 questions for an interview for a python position, give the questions as a json format with each key being the question number and the value being the question",
        }
    ],
)
questionString = ""
for i, char in enumerate(response):
    if char != "{":
        continue
    else:
        j = i
        while response[j] != "}" and j < len(response):
            questionString += response[j]
            j += 1
        questionString+="}"

questionDict = json.loads(questionString)
print(questionDict)


# for message in response:
#     print(message, flush=True, end='')
# json_obj = None
# # normal response
# for message in response:
#     json_obj = json.loads(message)
# #print(response)
# print(json_obj)
