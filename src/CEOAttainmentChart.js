import React, { useState, useEffect } from 'react';
import './progressBar.css';

const CEOAttainmentChart = ({ attainment, nameRenderMap, selectedData }) => {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    let circularProgress = document.querySelector(".circular-progress");
    let progressValue = document.querySelector(".progress-value");

    
    let progressStartValue = 0;
    let progressEndValue = (`${attainment}`);
    
    let speed = 25;
    

    let progress = setInterval(() => {
      progressValue.textContent = `${progressStartValue}%`;
      // circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`;

      progressStartValue+=1;
      if(progressStartValue>60&&progressStartValue<70){
        circularProgress.style.background=`conic-gradient(orange ${progressStartValue * 3.6}deg, #ededed 0deg)`;
        progressValue.style.color='orange';
      
      }else if(progressStartValue>=70){
        circularProgress.style.background=`conic-gradient(green ${progressStartValue * 3.6}deg, #ededed 0deg)`;
        progressValue.style.color='green';
      }else{
        circularProgress.style.background=`conic-gradient(red ${progressStartValue * 3.6}deg, #ededed 0deg)`;
        progressValue.style.color='red';
      }
      if (progressStartValue === parseInt(progressEndValue)) {
        setAnimationDone(true);
        clearInterval(progress);
      }
    }, speed);

    // Cleanup function to prevent memory leaks
    return () => {
      clearInterval(progress);
      progressEndValue=0;
    };
  }, [attainment]); // useEffect will run whenever attainment changes

  return (
    <div className='bodyp'>
    <div className="container">
      <div className="circular-progress">
        < div className ="circular-progress2">
        <span className="progress-value">0%</span>
        </div>
      </div>
      <span className="text">{nameRenderMap[selectedData]}</span>
    </div>
    </div>
  );
};

export default CEOAttainmentChart;
