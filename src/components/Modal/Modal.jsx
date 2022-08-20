import { useEffect } from "react";
import css from './Modal.module.css';


export function Modal({closeModal, largeImage}) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  });

  const onKeyDown = (event) => {
    if (event.code === 'Escape') {
      closeModal();
    }
  }

  const onBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  }

  return (
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};