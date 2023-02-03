import { Component } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { AiFillCloseCircle } from 'react-icons/ai';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.closeImage();
    }
  };

  render() {
    const { children, closeImage } = this.props;
    const { closeModal } = this;
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
  }
}

Modal.propTypes = {
  children: propTypes.object.isRequired,
  closeImage: propTypes.func.isRequired,
};

export default Modal;
