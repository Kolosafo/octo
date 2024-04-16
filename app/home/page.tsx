"use client";
import useSpeechCognition from "../_hooks/useSpeechRecognition";

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
      {hasRecognitionSupport ? (
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
      )}

      {/* <div>
        <h2>What is Gemina?</h2>
        <p>
          Gemina is a platform that helps you learn more effectively by
          combining spaced repetition with the power of interactive games.
        </p>
      </div> */}
    </>
  );
}