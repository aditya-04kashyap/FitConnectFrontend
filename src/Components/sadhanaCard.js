import React, { useState,useEffect } from 'react';


const convertTimeToValue = (hour, minute, amPm) => {
    let value = 0;
    if (amPm === 'pm') {
      value += 120;
    }

    value += hour * 10 + (minute / 6);

    return value;
  };

const SadhanaCard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [wakeupTime, setWakeupTime] = useState('');
  const [chantComplete, setChantComplete] = useState('');
  const [chantMorning, setChantMorning] = useState('');
  const [chantRound,setChantRound] =useState('');
  const [chantCount, setChantCount] = useState(0);
  const [chantQuality, setChantQuality] = useState('');
  const [mangalArti, setMangalArti] = useState(false);
  const [hearAndThink, setHearAndThink] = useState('');
  const [readAndThink, setReadAndThink] = useState('');
  const [service, setService] = useState('');
  const [timeWaste, setTimeWaste] = useState('');

  const [sleepHour, setSleepHour] = useState('');
  const [sleepMinute, setSleepMinute] = useState('');
  const [sleepAmPm, setSleepAmPm] = useState('');

  const [wakeupHour, setWakeupHour] = useState('');
  const [wakeupMinute, setWakeupMinute] = useState('');
  const [wakeupAmPm, setWakeupAmPm] = useState('');

  const [chantHour,setChantHour]= useState('');
  const [chantMinute,setChantMinute]=useState('');
  const [chantAmPm,setChantAmPm]=useState('');

  const [totalMarks, setTotalMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [mangalArtiMarks,setMangalArtiMarks] = useState(0);
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {

    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);
  

  const marksPlaceholder = "-";
  const handleSave = async () => {

    if (!sleepTime|| !chantComplete || !wakeupTime ||  !timeWaste ) {
      alert('Please fill in all  fields!');
      return;
    }
    const totalSleepTime = convertTimeToValue(sleepHour, sleepMinute, sleepAmPm);
    const totalWakeupTime = convertTimeToValue(wakeupHour, wakeupMinute, wakeupAmPm);

    let sleepMarks = calculateMarksSleepWakeup(totalSleepTime, 220, 25);
    let wakeupMarks = calculateMarksSleepWakeup(totalWakeupTime, 65, 25);
    let hearAndThinkMarks = calculateStepMarks(hearAndThink, 12500, 25);
    let readAndThinkMarks = calculateCalorieMarks(readAndThink, 2500, 25);
    let serviceMarks = calculateExerciseMarks(service, 105, 25);
    let wasteTime =calculateMarksSleepWakeup(timeWaste,75,25);

    let total = sleepMarks + wakeupMarks + hearAndThinkMarks + readAndThinkMarks + serviceMarks + wasteTime;
    

    let maxTotal = 25 * 6; 
    let percentage = Math.ceil((total / maxTotal) * 100);

    setTotalMarks(total);
    setPercentage(percentage);

    const baseDate = new Date('2016-01-01'); 
    const selectedDateObj = new Date(selectedDate);
    const daysSinceBaseDate = Math.ceil((selectedDateObj - baseDate) / (1000 * 60 * 60 * 24)) + 1;
    const convertedData = {
      userEmail: userEmail,
      sleepTime: convertTimeToValue(sleepHour, sleepMinute, sleepAmPm),
      wakeupTime: convertTimeToValue(wakeupHour, wakeupMinute, wakeupAmPm),
      chantComplete: convertTimeToValue(chantHour, chantMinute, chantAmPm),
      chantMorning,
      chantRound,
      chantCount,
      chantQuality,
      mangalArti: mangalArti ? 1 : 0,
      hearAndThink,
      readAndThink,
      service,
      timeWaste,
      dateNumber: daysSinceBaseDate,
      percentage,
    };
    console.log(convertedData);
    try {
      const response = await fetch('https://fitconnectbackend.onrender.com/save-sadhana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertedData),
      });
  
      if (!response.ok) {
        throw new Error('Error saving Sadhana data');
      }
      console.log('Sadhana data saved successfully');
      alert('Sadhana saved successfully');
      
    } catch (error) {
      console.error(error);
      alert('Error saving Sadhana data');
    }
};
const calculateMarksSleepWakeup = (value, threshold, maxMarks) => {
  let difference = threshold - value;
  if (difference >= 0) {
    return maxMarks;
  } else {
    let marks = maxMarks - Math.ceil(-difference / 5) * 2;
    return marks >= 0 ? marks : 0;
  }
};

const calculateStepMarks = (value, threshold, maxMarks) => {
  let difference = (threshold-value);
  if (difference >= 0) {
    let marks = maxMarks - Math.ceil(difference / 500);
    return marks >= 0 ? marks : 0;
  } else {
    return maxMarks;
  }
};
const calculateCalorieMarks = (value, threshold, maxMarks) => {
  let difference = (threshold-value);
  if (difference >= 0) {
    let marks = maxMarks - Math.ceil(difference / 100);
    return marks >= 0 ? marks : 0;
  } else {
    return maxMarks;
  }
};
const calculateExerciseMarks = (value, threshold, maxMarks) => {
  let difference = (threshold-value);
  if (difference >= 0) {
    let marks = maxMarks - Math.ceil(difference / 4);
    return marks >= 0 ? marks : 0;
  } else {
    return maxMarks;
  }
};

  return (
    <div className="bg-white p-4 md:m-5 sm:m-3 m-2 border-2 bg-gradient-to-l from-slate-950 to-zinc-900 rounded-lg  border-lime-400">
      <center><p className='font-extralight text-white text-xl mb-3'>Track Your Daily Fitness Progress and Stay Committed!</p></center>
      <label className="block text-white text-sm font-bold mb-2">Select Date:</label>
      <input
        required
        type="date"
        className="border border-gray-300 p-2  bg- mb-3 rounded-lg mt-1 shadow-sm shadow-lime-100 outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
        value={selectedDate}
        onChange={handleDateChange}
      />
     {/* Sleep Time */}
     <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Sleep Time:</label>
        <div className="flex mb-2">
          <select
            className="border shadow-lime-100  p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setSleepHour(e.target.value)}
            value={sleepHour}
            required
          >
            <option value="">Hour</option>
            {[...Array(12).keys()].map((hour) => (
              <option key={hour + 1} value={hour + 1}>
                {hour + 1}
              </option>
            ))}
          </select>
          <span className="mx-2"></span>
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setSleepMinute(e.target.value)}
            value={sleepMinute}
            required
          >
            <option value="">Min</option>
            {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54].map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span className="mx-2"></span>
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setSleepAmPm(e.target.value)}
            value={sleepAmPm}
            required
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </div>
      {/* Wake Up time */}
      
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Wakeup Time:</label>
        <div className="flex mb-2">
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setWakeupHour(e.target.value)}
            value={wakeupHour}
            required
          >
            <option value="">Hour</option>
            {[...Array(12).keys()].map((hour) => (
              <option key={hour + 1} value={hour + 1}>
                {hour + 1}
              </option>
            ))}
          </select>
          <span className="mx-2"></span>
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setWakeupMinute(e.target.value)}
            value={wakeupMinute}
            required
          >
            <option value="">Min</option>
            {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54].map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span className="mx-2"></span>
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setWakeupAmPm(e.target.value)}
            value={wakeupAmPm}
            required
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </div>
      {/* Chant Complete */}
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Workout/Exercise Time:</label>
        <div className="flex mb-2">
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setChantHour(e.target.value)}
            value={chantHour}
            required
          >
            <option value="">Hour</option>
            {[...Array(12).keys()].map((hour) => (
              <option key={hour + 1} value={hour + 1}>
                {hour + 1}
              </option>
            ))}
          </select>
          <span className="mx-2"></span>
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setChantMinute(e.target.value)}
            value={chantMinute}
            required
          >
            <option value="">Min</option>
            {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54].map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
          </select>
          <span className="mx-2"></span>
          <select
            className="border shadow-lime-100 border-gray-300 p-2 rounded-lg mt-1 shadow-sm  outline-none text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
            onChange={(e) => setChantAmPm(e.target.value)}
            value={chantAmPm}
            required
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </div>
      {/* Chant Morning */}
      <div className='mb-4'>
        <label className='block text-white text-sm font-bold mb-2'>Hardcore Workout(In Minutes)</label>
        <input 
            type='text'
            className='border shadow-sm  shadow-lime-100 text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100 border-gray-300 p-2 w-full'
            value={chantMorning}
            onChange={(e) => setChantMorning(e.target.value)}
            required
        />
      </div>
      {/* Chant Round */}
      <div className='mb-4'>
        <label className='block text-white text-sm font-bold mb-2'>Meditaion / Relaxation</label>
        <input 
            type='text'
            className='border shadow-sm shadow-lime-100 border-gray-300 p-2 w-full text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100'
            value={chantRound}
            onChange={(e) => setChantRound(e.target.value)}
            required
        />
      </div>
     
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Steps Count:
        </label>
        <input
          type="text"
          required
          placeholder="Enter minutes"
          className="border shadow-sm shadow-lime-100 border-gray-300 p-2 w-full text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
          value={hearAndThink}
          onChange={(e) => setHearAndThink(e.target.value)}
        />
        <p className='font-extralight text-neutral-500 mt-2'>Marks:<span className="text-gray-400  font-extralight ml-2">{calculateStepMarks(hearAndThink, 12500, 25)}</span></p>
      </div>
        {/* Read and Think */}
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Calories Burned(in calorie):
        </label>
        <input
          type="text"
          required
          placeholder="Enter minutes"
          className="border shadow-sm shadow-lime-100 border-gray-300 p-2 w-full text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
          value={readAndThink}
          onChange={(e) => setReadAndThink(e.target.value)}
        />
        <p className='font-extralight text-neutral-500 mt-1'>Marks:<span className="text-gray-400  font-extralight ml-2">{calculateCalorieMarks(readAndThink, 2500, 25)}</span></p>
      </div>
        {/* Service */}
      <div className="mb-4">
        <label className="block  text-white text-sm font-bold mb-2">
          Exercise(minutes):
        </label>
        <input
          required
          type="text"
          placeholder="Enter minutes"
          className="border shadow-sm shadow-lime-100 border-gray-300 p-2 w-full text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <p className='font-extralight text-neutral-500 mt-1'>Marks:<span className="text-gray-400  font-extralight ml-2">{calculateExerciseMarks(service, 105, 25)}</span></p>
      </div>
        {/*  Time Waste  */}
      <div className="mb-4 ">
        <label className="block text-white text-sm font-bold mb-2">
          Time Waste (minutes):
        </label>
        <input
          required
          type="text"
          placeholder="Enter minutes"
          className="border shadow-sm shadow-lime-100 border-gray-300 p-2 w-full text-slate-900 hover:text-white hover:bg-gray-700 bg-gray-100"
          value={timeWaste}
          onChange={(e) => setTimeWaste(e.target.value)}
        />
        <p className='font-extralight text-neutral-500 mt-1'>Marks:<span className="text-gray-300  font-extralight ml-2">{calculateMarksSleepWakeup(timeWaste, 60, 25)}</span></p>
      </div>
      <center>
      <div>
        <p className='mb-2 font-LO text-xl text-white' >Total Score : {percentage}%</p>
      </div>
      <button
        className="bg-lime-400  pl-4 pr-4 p-2 mb-2 hover:scale-105   rounded-md shadow-sm shadow-lime-600 hover:bg-lime-600 hover:shadow-md hover:shadow-lime-300 text-slate-900 cursor-pointer"
        onClick={handleSave}
      >
        Save
      </button>
      </center>
    </div>
  );
};

export default SadhanaCard;
