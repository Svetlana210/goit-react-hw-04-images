import styles from './image-gallery-item.module.css';
import propTypes from 'prop-types';

const ImageGalleryItem = ({ src, tags, largeImageURL, showImage }) => {
  return (
    <li onClick={() => showImage({ largeImageURL })} className={styles.item}>
      <img
        src={src}
        alt={tags}
        largeImageURL={largeImageURL}
        className={styles.image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired,
  showImage: propTypes.func.isRequired,
};

export default ImageGalleryItem;
