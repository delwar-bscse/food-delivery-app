import React, { useRef, useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null); // To hold the interval ID

  const startTimer = () => {
    console.log('startTimer');
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    console.log('stopTimer');
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div className='min-h-[200px] w-full mx-auto flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>{count}</h1>
      <div className='flex items-center justify-center gap-2'>
      <button onClick={startTimer} className='mt-4 bg-green-300  px-5 py-2 rounded-sm'>Start</button>
      <button onClick={stopTimer} className='mt-4 bg-red-300 px-5 py-2 rounded-sm'>Stop</button>
      </div>
    </div>
  );
}

export default Timer;
