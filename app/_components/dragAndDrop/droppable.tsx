import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div
      ref={setNodeRef}
      className="border-2 border-white  flex flex-col justify-center items-center p-8 border-dashed rounded-sm"
      style={style}
    >
      {props.children}
    </div>
  );
}
