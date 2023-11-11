import React, { useState, useEffect } from 'react';
import './styles.css';
import './Results.css';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';


const SeparatorLine = () => {
    return <div className="separator-line"></div>;
  };

const FlashCard = (props) => {
    // Simulated percentage value (replace with actual logic)
    const percentage = props.score;
  
    // Determine the color based on the percentage
    const color =
    percentage < 33
      ? '#ff0000' // Red for percentages less than 33
      : percentage < 66
      ? '#ffff00' // Yellow for percentages between 33 and 66
      : '#00ff00'; // Green for percentages greater than or equal to 66
  
    return (
      <div className="flash-card-container">
        <h2 className="flash-card-header">{props.question}</h2>
        <div className="flash-card-content">
          <div className="progressbar-container">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={{
                root: { width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
                path: { stroke: color },
                text: { fill: '#000', fontSize: '20px', dominantBaseline: 'middle', textAnchor: 'middle' },
              }}
            />
          </div>
          <div className="split-sections">
            <div className="green-box">
              <h3>Positive Points</h3>
              {/* Add positive points content */}
              <div>{props.positive}</div>
            </div>
            <div className="red-box">
              <h3>Negative Points</h3>
              {/* Add negative points content */}
              <div> {props.negative}</div>
            </div>
          </div>
          <div className="additional-info-box">
            <div className="original-answer">
              <h3>Original Answer</h3>
              <div> {props.originalAnswer}</div>
            </div>
            <div className="improved-answer">
              <h3>Improved Answer</h3>
              <div>{props.improvedAnswer}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const Results = (props) => {
    const [loading, setLoading] = useState(true);
    const handleRestart = () => {
        props.restartInterview();
      };
    useEffect(() => {
      if (props.results.length === 3) {
        setLoading(false);
      }
    }, [props.results]);
  
    return (
      <div>
        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="results-container">
            <h2 className="subheader">Your Results</h2>
            {props.results.map((item, index) => (
              <FlashCard
                key={index}
                question={item.question}
                positive={item.positive}
                negative={item.negative}
                originalAnswer={item.answer}
                improvedAnswer={item.improved}
                score={item.score}
              />
            ))}
            <button className="restart-button" onClick={handleRestart}>Restart</button>
          </div>
        )}
      </div>
    );
  };

export default Results;