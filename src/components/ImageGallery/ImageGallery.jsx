import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';

import styles from './image-gallery.module.css';

const ImageGallery = ({ items, showImage }) => {
  const elements = items.map(item => (
    <ImageGalleryItem
      key={item.id}
      src={item.webformatURL}
      tags={item.tags}
      largeImageURL={item.largeImageURL}
      showImage={showImage}
    />
  ));
  return <ul className={styles.gallery}>{elements}</ul>;
};

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    })
  ),
  showImage: propTypes.func.isRequired,
};

export default ImageGallery;
