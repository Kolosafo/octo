'use client';
import useSpeechCognition from '../_hooks/useSpeechRecognition';

export default function Home() {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechCognition();
  return (
    <>
      {/* {hasRecognitionSupport ? (
        <>
          <div>
            <button
              className="p-1 bg-gray-600 rounded-md"
              onClick={startListening}
            >
              Start Listening
            </button>
          </div>
          <div>
            {isListening ? (
              <div className="flex flex-col">
                <span>Listening...</span>
                <button
                  className="p-1 bg-gray-600 rounded-md"
                  onClick={stopListening}
                >
                  Stop Listening
                </button>
              </div>
            ) : null}
          </div>
          <span className="text-2xl">{text}</span>
        </>
      ) : (
        <span> Your browser has no speech recognition support</span>
      )} */}

      <section className='min-h-[85vh] bg-main'>
        <div className='min-h-[30vh] flex items-center justify-center p-5'>
          <h1 className='text-mainTxt text-2xl lg:text-4xl font-bold text-center'>Ready to <span className='text-accent'>learn?</span></h1>
        </div>
          <div className='z-10 py-6 lg:px-24 bg-white min-h-screen rounded-t-3xl lg:rounded-t-[5rem]'>

          </div>
      </section>
    </>
  );
}
