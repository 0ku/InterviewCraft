import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './styles.css';
import './Interview.css';

const Interview = (props) => {  
  let questionIndex = 0
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
    const questions = props.getQuestions();
    console.log("Questions:", questions);
    console.log("Current Question:", currentQuestion);
  
    if (questions.length > 0 && !currentQuestion) {
      setCurrentQuestion(questions[questionIndex]);
      setLoading(false);
    }
  }, [props.getQuestions]);
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
            <button className='submit-button'>
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
