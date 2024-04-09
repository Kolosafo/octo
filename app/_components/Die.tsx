interface DieProps {
  value: number;
  held: boolean;
  hold: () => void;
}

const Die = (props: DieProps) => {
  const variant = props.held ? 'bg-[#59E391]' : 'bg-[white]';

  return (
    <button
      type='button'
      className={`die-face focus-visible:outline-dashed outline-offset-2 focus-visible:outline-1 focus-visible:outline-[#5035FF] rounded-lg w-[3.125rem] h-[3.125rem] text-[#2b283a] flex items-center justify-center text-base ${variant}`}
      onClick={props.hold}
    >
      <span className='text-3xl font-medium'>{props.value}</span>
    </button>
  );
};

export default Die;
