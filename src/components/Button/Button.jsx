import styles from './button.module.css';
import propTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default Button;
