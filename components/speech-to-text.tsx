import React from 'react';
import useSpeechCognition from '../app/_hooks/useSpeechRecognition';

function SpeechToText() {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechCognition();

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button
              className='p-1 bg-gray-600 rounded-md'
              onClick={startListening}
            >
              Start Listening
            </button>
          </div>
          <div>
            {isListening ? (
              <div className='flex flex-col'>
                <span>Listening...</span>
                <button
                  className='p-1 bg-gray-600 rounded-md'
                  onClick={stopListening}
                >
                  Stop Listening
                </button>
              </div>
            ) : null}
          </div>
          <span className='text-2xl'>{text}</span>
        </>
      ) : (
        <span> Your browser has no speech recognition support</span>
      )}
    </div>
  );
}

export default SpeechToText;
