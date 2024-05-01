import { ReactElement } from "react";

interface Props {
  icon: ReactElement;
  text: string;
}

function PracticeInfoCard(props: Props) {

  return (
    <li className="relative group">
      <span
        className={`tracking-widest text-sm rounded-md p-2 font-medium flex items-center group focus-visible:outline-main focus-visible:text-main `}
      >
        {props.icon}
      </span>

      <div
        className={`
             w-72 absolute top-1.5 left-full rounded-md 
            px-2 py-1 ml-6 bg-main/10 text-main text-xs
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
         `}
      >
        {props.text}
      </div>
    </li>
  );
}

export default PracticeInfoCard;
