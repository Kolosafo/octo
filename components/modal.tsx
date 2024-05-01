import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';

interface PromptModalProps {
  children: React.ReactNode;
}

const PromptModal = forwardRef<HTMLDialogElement, PromptModalProps>(({ children }, ref) => {
  const portalContainer = document.getElementById('portal') as Element | null;

  if (!portalContainer) {
    console.error('The portal container was not found.');
    return null;
  }

  return createPortal(
    <dialog
      className="scale-0 absolute inset-0 m-auto bg-transparent backdrop:bg-black/70 grid place-content-center p-0 backdrop:backdrop-blur-md"
      ref={ref}
    >
      {children}
    </dialog>,
    portalContainer
  );
});

// Set the display name for the component
PromptModal.displayName = 'PromptModal';

export default PromptModal;
