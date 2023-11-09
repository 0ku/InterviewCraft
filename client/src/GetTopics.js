// GetTopics.js
import axios from 'axios';
import React, { useState } from 'react';
import './GetTopics.css'; // Import your styles file
import './styles.css';
const GetTopics = (props) => {
  const [inputValue, setInputValue] = useState('');
  //const [topics, setTopics] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTopic = () => {
    if (inputValue.trim() !== '') {
      props.setTopics([...props.getTopics(), inputValue]);
      setInputValue('');
    }
  };

  const getQuestions = () => {
    axios.post('http://127.0.0.1:5000/getQuestions', {
      topics: props.getTopics()
    })
    .then(function (response) {
      console.log(response.data)
      props.setQuestions(Object.values(response.data))
    })
    .catch(function (error) {
      return error;
    });
  }

  const generateInterview = () => {
    // Add your logic for generating the interview
    console.log('Interview generated!');
    if (props.getTopics().length < 3) {
      alert('You need at least 3 topics!');
    }
    else {
      getQuestions();
      props.disableTopic();
      props.setIsInterview(true);
    }
  };

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...props.getTopics()]; // Create a new array
    updatedTopics.splice(index, 1);
    props.setTopics(updatedTopics);
  };
  
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTopic();
    }
  };

  return (
    <div className="get-topics-ui">
      <div className="topic-area">
        {props.getTopics().map((topic, index) => (
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
        <button className = "custom-button" onClick={()=>handleAddTopic()}> Add Topic</button>
      </div>
      <div className="generate-button">
        <button className = "custom-button"onClick={()=>generateInterview()}>Generate Interview</button>
      </div>
    </div>
  );
};

export default GetTopics;
