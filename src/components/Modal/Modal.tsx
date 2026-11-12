import { createPortal } from 'react-dom';
import useEscapeAndScrollLock from '../../hooks/useEscapeAndScrollLock';
import useFocusControl from '../../hooks/useFocusControl';
import css from './Modal.module.css';
import { useState } from 'react';

interface ModalProps {
  children: (handleClose: () => void) => React.ReactNode;
  labelledBy?: string;
  onClose: () => void;
}

export default function Modal({ children, labelledBy, onClose }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useFocusControl();

  const handleClose = () => setIsClosing(true);

  const handleBackdrop = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && isClosing) {
      onClose();
    }
  };

  useEscapeAndScrollLock(handleClose);

  const backdropClass = `${css.backdrop} ${isClosing ? css.backdropClosing : ''}`;
  const modalClass = `${css.modal} ${isClosing ? css.modalClosing : ''}`;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={backdropClass}
      onMouseDown={handleBackdrop}
      onAnimationEnd={handleAnimationEnd}
    >
      <div ref={modalRef} tabIndex={-1} className={modalClass}>
        {children(handleClose)}
        <button
          type="button"
          className={css.closeBtn}
          onClick={handleClose}
          onMouseDown={(e) => e.preventDefault()}
        >
          <svg width="32" height="32" aria-hidden="true">
            <use href="/icons.svg#close-icon" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}
