import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { searchImages } from '../api/api';

import styles from './app.module.css';

export class App extends Component {
  state = {
    items: [],
    search: '',
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImages(search, page);
      this.setState(({ items }) => ({ items: [...items, ...data.hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  showImage = ({ largeImageURL, tags }) => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };
  closeImage = () => {
    this.setState({ showModal: false });
  };
  render() {
    const { items, loading, error, largeImageURL, tags, showModal } =
      this.state;
    const { searchImages, loadMore, showImage, closeImage } = this;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={searchImages} />
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
  }
}
