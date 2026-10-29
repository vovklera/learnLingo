import { createPortal } from 'react-dom';
import useEscapeAndScrollLock from '../../hooks/useEscapeAndScrollLock';
import useFocusControl from '../../hooks/useFocusControl';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  labelledBy?: string;
  onClose: () => void;
}

export default function Modal({ children, labelledBy, onClose }: ModalProps) {
  const modalRef = useFocusControl();

  const handleBackdrop = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEscapeAndScrollLock(onClose);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={handleBackdrop}
      className={css.backdrop}
    >
      <div ref={modalRef} tabIndex={-1} className={css.modal}>
        {children}
        <button type="button" onClick={onClose} className={css.closeBtn}>
          <svg width="32" height="32" aria-hidden="true">
            <use href="/icons.svg#close-icon" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}
