import React, {useState} from 'react';
import './styles.css';
import GetTopics from './GetTopics';
import Interview from './Interview';
import Results from './Results'
// Title component
const Title = () => {
  return <h1 className="title">Interview Craft</h1>;
};

const Button = ({ onClick, children }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
};

// App component
const App = () => {
  const [results,setResults] = useState([])
  const [answers,setAnswers] = useState({});
  const [notStarted, setnotStarted] = useState(true);
  const [showTopics,setShowTopics] = useState(true);
  const [isInterview,setIsInterview] = useState(false)
  const [topics, setTopics] = useState([]);
  const [questions,setQuestions] = useState([])
  const [showResults,setShowResults] = useState(false)

  const restartInterview = () => {
    setResults([]);
    setAnswers({});
    setnotStarted(true);
    setShowTopics(true);
    setIsInterview(false);
    setTopics([]);
    setQuestions([]);
    setShowResults(false);
  };

  const disableTopic = () => {
    setShowTopics(false);
    console.log("test")
  };


  const getTopics = () => {
    return topics
  }
  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px'}}>
      <Title />
      <div>
        {showTopics && (
          <GetTopics setQuestions = {setQuestions} setIsInterview = {setIsInterview} disableTopic={disableTopic} topics = {topics} setTopics = {setTopics} getTopics = {getTopics}></GetTopics>
        )}
        {
          isInterview && (
            <Interview results = {results} setResults = {setResults} questions = {questions} setAnswers = {setAnswers} answers = {answers} setShowResults = {setShowResults} setIsInterview = {setIsInterview}></Interview>
          )
        }
        {
          showResults && (
            <Results results = {results} restartInterview={restartInterview}></Results>
          )
        }
        
      </div>
    </div>
  );
};

export default App;