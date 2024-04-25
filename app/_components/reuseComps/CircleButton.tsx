import React from 'react';
// pass props to change different properties e.g onclick, styles, text etc

const CircleButton = ({ onClick, children }) => {
 return (
    <button
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded-full flex items-center justify-center m-3"
    >
      {children}
      <svg className="h-5 w-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
 );
};

export default CircleButton;
