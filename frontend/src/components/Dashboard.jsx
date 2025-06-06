import React, { useState } from 'react';
import Addbutton from '../components/AddButton';

//dashboard component , login was successful
const Dashboard = () => {
  //state to keep track of the selected time scale (day, week, month, year)
  const [timeScale, setTimeScale] = useState('d'); // Default to day

  //function to handle time scale button clicks
  const handleTimeScaleChange = (scale) => {
    setTimeScale(scale);
    //fetch or update graph data based on the selected scale here
    console.log('Time scale changed to:', scale);
  };

  return (

    <div className="flex flex-col md:flex-row md:items-start min-h-screen bg-gray-100 p-4 md:p-8 max-w-screen-xl mx-auto relative">

      <div className="flex flex-col w-full md:w-2/3 md:mr-4">

        <div className="flex-grow bg-white rounded-lg shadow p-4 mb-4 flex items-center justify-center text-gray-500 text-2xl min-h-[300px] max-h-[600px] overflow-hidden">
      {/*main graph*/}
          {/* This is where you would integrate your charting library */}          
          Graph Area ({timeScale.toUpperCase()})
          {/*replace this text with charting api*/}
        </div>

        <div className="flex justify-center mb-4">
      {/*button for Day */}
          <button
            onClick={() => handleTimeScaleChange('d')}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
              timeScale === 'd' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            D
          </button>
      {/*button for Week */}
          <button
            onClick={() => handleTimeScaleChange('w')}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
              timeScale === 'w' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            W
          </button>
      {/*button for Month */}
          <button
            onClick={() => handleTimeScaleChange('m')}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
              timeScale === 'm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            M
          </button>
      {/*button for Year */}
          <button
            onClick={() => handleTimeScaleChange('y')}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium ${
              timeScale === 'y' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Y
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-4 mb-20 md:mb-0 min-h-[200px] max-h-[400px] overflow-y-auto">
  {/*quick stats*/} 
        <h2 className="text-lg font-semibold mb-2">Miscellaneous Info</h2>
        <p className="text-gray-700">
          {/*example content*/}
          <h2>Quick Stats</h2>
          <br />
          This section can contain quick summaries, recent activities, or other relevant data points.
          <br />
          You can add more content here to test the scrollbar when the max height is reached.
          <br />
          Item 1, Item 2, Item 3, Item 4, Item 5, Item 6, Item 7, Item 8, Item 9, Item 10.
        </p>
      </div>

      <button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-3xl z-10" //added z-10 to ensure it's above other content
        onClick={() => console.log('Add button clicked!')}
        aria-label="Add New Item" //accessibility label
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;
