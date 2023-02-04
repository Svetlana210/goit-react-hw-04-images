import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeImage, children }) => {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      closeImage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={closeImage}>
          <AiFillCloseCircle />
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: propTypes.object.isRequired,
  closeImage: propTypes.func.isRequired,
};

export default Modal;
