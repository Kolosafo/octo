import React, { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
  imgSrc: string;
  value: string;
};
export default function Draggable(props: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      imgSrc: props.imgSrc,
      value: props.value,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className={props.className}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
