import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar } from "./components/SearchBar/SearchBar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal";

import { fetchImages } from "services/api-service";
import css from './App.module.css';



export function App() {
  const [images, setImages] = useState([]);
  const [modalImage, setModalImage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getSearchResults = async() => {
      setStatus('pending');

      try {
        const nextImages = await fetchImages(searchQuery, page);
        setImages(prevState => ([...prevState, ...nextImages]));
        setStatus('resolved');
        ScrollToBottom();
      }
      catch (error) {
        setStatus('rejected');
      }
    };
    getSearchResults();
  }, [searchQuery, page]);


  const ScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      // top: 0,
      behavior: "smooth",
    });
  };

  const onSearchFormSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  // const getSearchResults = async() => {
  //   setStatus('pending');

  //   try {
  //     const nextImages = await fetchImages(searchQuery, page);
  //     setImages(prevState => ([...prevState, ...nextImages]));
  //     setStatus('resolved');
  //     ScrollToBottom();
  //   }
  //   catch (error) {
  //     setStatus('rejected');
  //   }
  // };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImage) => {
    setShowModal(!showModal);
    setModalImage(largeImage);
  };

  return (
    <div className={css.App}>
      <SearchBar onSearchSubmit={onSearchFormSubmit} />
      <ImageGallery images={images} openModal={toggleModal} />

      {status === 'idle' && (
        <div className={css.Notification}>Please enter your search query...</div>
      )}

      {status === 'pending' && (
        <Loader/>
      )}

      {status === 'rejected' && (
        <div className={`${css.Notification} ${css.Error}`}>Oops! Something went wrong.</div>
      )}

      {images.length >= 12 && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal largeImage={modalImage} closeModal={toggleModal} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};