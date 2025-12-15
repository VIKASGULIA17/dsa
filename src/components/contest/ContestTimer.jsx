import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const ContestTimer = ({ startTime, endTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState('upcoming'); // upcoming, ongoing, ended

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (now < start) {
        setStatus('upcoming');
        const diff = start - now;
        setTimeLeft(formatTime(diff));
      } else if (now >= start && now < end) {
        setStatus('ongoing');
        const diff = end - now;
        setTimeLeft(formatTime(diff));
      } else {
        setStatus('ended');
        setTimeLeft('00:00:00');
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
      status === 'ongoing' ? 'bg-green-900/20 border-green-800 text-green-400' : 
      status === 'upcoming' ? 'bg-blue-900/20 border-blue-800 text-blue-400' : 
      'bg-gray-800 border-gray-700 text-gray-400'
    }`}>
      <Clock className="w-5 h-5" />
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider">
          {status === 'upcoming' ? 'Starts In' : status === 'ongoing' ? 'Ends In' : 'Ended'}
        </div>
        <div className="text-xl font-mono font-bold leading-none">{timeLeft}</div>
      </div>
    </div>
  );
};

export default ContestTimer;
