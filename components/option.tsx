import { useState } from 'react';

interface OptionProps {
  option: string;
  question: string;
  correctOption: string;
  type: string;
}

function Option() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [correctOption, setCorrectOption] = useState('');
  const [selected, setSelected] = useState('');
  const [option, setOption] = useState('');
  const [question, setQuestion] = useState('');

  const selectOption = (option: string, question: string) => {
    if (selectedOption === null) {
      setSelected(option);
      setSelectedOption(option);
    }
    if (selectedOption !== null) {
      setSelected(option);
    }
    if (selectedOption !== null && selectedOption === option) {
      setShowResults(true);
      if (option === correctOption) {
        setTimeout(() => {
          setShowResults(false);
          setSelectedOption(null);
          setSelected('');
        }, 3000);
      }
    }
  };

  return (
    <button
      type='button'
      onClick={() => selectOption(option, question)}
      className={`${!showResults && selected === option ? 'bg-main/40' : ''} ${
        showResults && correctOption === option ? 'bg-green-400' : ''
      } ${
        showResults && selected === option
          ? option !== correctOption && 'bg-red-400'
          : ''
      } ${
        showResults && selected !== option
          ? option === correctOption && 'border-transparent'
          : ''
      } ${selected === option && 'border-transparent'} ${
        showResults && selected !== option ? 'opacity-60' : ''
      }  border border-lightBlue rounded-lg py-0.5 px-5 focus-visible:border-transparent focus-visible:outline-2 outline-offset-2 outline-accent transition`}
    >
      {option}
    </button>
  );
}

export default Option;
