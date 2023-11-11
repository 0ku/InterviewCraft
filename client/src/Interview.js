import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './styles.css';
import './Interview.css';
import axios from 'axios';

const Interview = (props) => {  
  const [questionIndex,setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [answer, setAnswer] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [loading,setLoading] = useState(true)
  const handleStartListening = () => {
    SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const retrieveResults = () => {
    let final = []
    //console.log(props.answers)
    for (let question in props.answers) {
      axios.post('http://127.0.0.1:5000/getFeedback', {
        question: question,
        answer: props.answers[question],
      })
      .then(function (response) {
        console.log(question,response.data,props.results)
        props.setResults(prev=>[...prev,response.data])
      })
      .catch(function (error) {
        return error;
      });
    }
  }

  const handleSubmit = () => {      
    //move to next question, append question:answer to map
    const questions = props.questions;
    props.setAnswers(prev=>({
      ...prev,
      [currentQuestion]:answer,
    }));
    console.log("setting answer...", answer);
    setQuestionIndex((prev)=>prev+1);
    return;
  }

  useEffect(()=>{
    console.log(questionIndex)
    setCurrentQuestion(props.questions[questionIndex]); 
    if (Object.keys(props.answers).length === 3) {
      console.log(Object.keys(props.answers).length,props.answers)
      retrieveResults()
      props.setShowResults(true);
      props.setIsInterview(false);
      return;
    }
  },[questionIndex,props.answers])

  useEffect(() => {
    const handleRecordingEnd = () => {
      const statementWithPeriod = transcript.trim() + '.';
      setAnswer((prevAnswer) => prevAnswer + ' ' + statementWithPeriod);
      resetTranscript();
      SpeechRecognition.startListening();
    };

    if (!listening && transcript.trim() !== '') {
      handleRecordingEnd();
    }

    SpeechRecognition.onEnd = handleRecordingEnd;

    return () => {
      SpeechRecognition.onEnd = null;
    };
  }, [listening, transcript, resetTranscript]);

  // Update currentQuestion when questions become available
  useEffect(() => {
    const questions = props.questions;
    console.log("Questions:", questions);
    console.log("Current Question:", currentQuestion);
  
    if (questions.length > 0 && !currentQuestion) {
      setCurrentQuestion(questions[questionIndex]);
      setLoading(false);
    }
  }, [props.questions]);
  return (
    <div>
      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>
          <div className ="question-header">{currentQuestion}</div>
          <div>
            <textarea
              rows="8"
              cols="50"
              value={answer}
              placeholder="Type/Record your answer..."
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="buttons-container">
            <button className="custom-button" onClick={handleStartListening} disabled={listening}>
              Start Voice-to-Text
            </button>
            <button className="custom-button" onClick={handleStopListening} disabled={!listening}>
              Stop
            </button>
            {listening && <div>Recording...</div>}
          </div>
          <div className="buttons-container">
            <button className='submit-button' onClick={handleSubmit}>
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
