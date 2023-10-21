import React, {useState} from 'react';
import './styles.css';
import GetTopics from './GetTopics';
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
  const [showTopics,setShowTopics] = useState(false);
  const [topics, setTopics] = useState([]);

  const handleStartClick = () => {
    setnotStarted(false);
    setShowTopics(true);
  };

  const disableTopic = () => {
    setShowTopics(false);
    console.log("test")
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px'}}>
      <Title />
      <div>
        {notStarted && (
          <Button onClick={handleStartClick}>Start</Button>
        )}
        {showTopics && (
          <GetTopics disableTopic={disableTopic} topics = {topics} setTopics = {setTopics}></GetTopics>
        )}
        
      </div>
    </div>
  );
};

export default App;