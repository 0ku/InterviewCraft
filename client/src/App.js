import React, {useState} from 'react';
import './styles.css';
import GetTopics from './GetTopics';
import Interview from './Interview';
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
  const [notStarted, setnotStarted] = useState(true);
  const [showTopics,setShowTopics] = useState(true);
  const [isInterview,setIsInterview] = useState(false)
  const [topics, setTopics] = useState([]);
  const [questions,setQuestions] = useState([])
  const disableTopic = () => {
    setShowTopics(false);
    console.log("test")
  };

  const getQuestions = () => {
    return questions
  }

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
            <Interview getQuestions = {getQuestions}></Interview>
          )
        }
        
      </div>
    </div>
  );
};

export default App;