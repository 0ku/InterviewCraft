// GetTopics.js

import React, { useState } from 'react';
import './GetTopics.css'; // Import your styles file
import './styles.css';
const GetTopics = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [topics, setTopics] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTopic = () => {
    if (inputValue.trim() !== '') {
      setTopics([...topics, inputValue]);
      setInputValue('');
    }
  };

  const generateInterview = () => {
    // Add your logic for generating the interview
    console.log('Interview generated!');
    if (topics.length < 3) {
      alert('You need at least 3 topics!');
    }
    else {
      props.disableTopic();
    }
  };

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);
  };
  
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTopic();
    }
  };

  return (
    <div className="get-topics-ui">
      <div className="topic-area">
        {topics.map((topic, index) => (
          <div key={index} className="topic">
            <span>{topic}</span>
            <button className="topic-delete" onClick={() => handleDeleteTopic(index)}>x</button>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your topic..."
          onKeyDown={handleInputKeyDown}
        />
        <button className = "custom-button" onClick={handleAddTopic}> Add Topic</button>
      </div>
      <div className="generate-button">
        <button className = "custom-button"onClick={()=>generateInterview()}>Generate Interview</button>
      </div>
    </div>
  );
};

export default GetTopics;
