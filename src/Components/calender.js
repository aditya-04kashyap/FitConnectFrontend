import React, { useState } from 'react';

const EventCalendar = ({ data }) => {
  const [expandedMonth, setExpandedMonth] = useState(null);

  const toggleMonth = (month) => {
    setExpandedMonth((prevMonth) => (prevMonth === month ? null : month));
  };

  const closeModal = () => {
    setExpandedMonth(null);
  };

  return (
    <div className="flex flex-wrap justify-around m-6 ">
      {data.map((monthData) => (
        <div key={monthData.month} className="  border-2 border-yellow-400 bg-yellow-200   shadow-md shadow-yellow-500 hover:bg-orange-300 rounded-md p-4 m-2">
          <div
            className="cursor-pointer"
            onClick={() => toggleMonth(monthData.month)}
          >
            <h2 className="text-lg font-bold mb-2">{monthData.month}</h2>
          </div>
          {expandedMonth === monthData.month && (
            <div className=''>
              <div style={styles.blurBackground}></div>
              <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                  <span className="close-btn" onClick={closeModal}>
                    &times;
                  </span>
                  <h2 className="text-lg font-bold mb-2 ">{monthData.month}</h2>
                  <div style={styles.scrollableContent}>
                    <ul className="list-none p-0">
                      {monthData.events.map((event) => (
                        <li key={event.date} className="border-b border-gray-300 mb-2 pb-2">
                          <div className="bg-orange-400 text-white font-bold rounded-md p-1">
                            {event.date}
                          </div>
                          <div className="ml-2 bg-yellow-100 p-4">
                            <div className="font-bold">{event.event}</div>
                            <div className="italic">Breaking Fast: {event.breakingFast}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  blurBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0,0.75 )', 
    filter: 'blur(75px)', 
    zIndex: 1,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    position: 'relative', 
    zIndex: 3,
  },
  scrollableContent: {
    maxHeight: '70vh', 
    overflowY: 'auto',
  },
  closeBtn: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    fontSize: '30px',
    cursor: 'pointer',
    color: 'black',
  },
};

export default EventCalendar;
