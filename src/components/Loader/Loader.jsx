import styles from './loader.module.css';
import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loader}
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
};

export default Loader;
