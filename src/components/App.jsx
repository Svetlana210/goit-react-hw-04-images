import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { searchImages } from '../api/api';

import styles from './app.module.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page, setLoading, setItems, setError]);

  const onSearchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const showImage = ({ largeImageURL, tags }) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeImage = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSearchImages} />
      <ImageGallery items={items} showImage={showImage} />
      {error && <p>{error}</p>}
      {loading && <Loader />}
      {Boolean(items.length) && <Button onClick={loadMore} />}
      {showModal && (
        <Modal closeImage={closeImage}>
          <>
            <img src={largeImageURL} alt={tags}></img>
          </>
        </Modal>
      )}
    </div>
  );
};

export default App;
