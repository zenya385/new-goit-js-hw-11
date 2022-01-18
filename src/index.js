import './sass/main.scss';
import Notiflix from 'notiflix';
import fetchImages from './fetchImages';
import renderCardImages from './renderCardImages';
import 'simplelightbox/dist/simple-lightbox.min.css';

const warning = 'Sorry, there are no images matching your search query. Please try again.';
const end = "We're sorry, but you've reached the end of search results.";
const notiflixFailure = Notiflix.Notify.failure;
const notiflixInfo = Notiflix.Notify.success;
const notiflixWarning = Notiflix.Notify.warning;
let page = 1;
let searchImage = '';

const refs = {
  form: document.querySelector('form'),
  listOfCards: document.querySelector('.gallery'),
  searchMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', searchSubmit);

function searchSubmit(event) {
  event.preventDefault();
  page = 1;
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  searchImage = searchQuery.value.trim();
  if (!searchImage) {
    renderMarkup(refs.listOfCards, '');
    refs.searchMore.classList.add('is-hidden');
    return;
  }

  fetchImages(searchImage, page).then(images => {
    if (images.hits.length !== 0) {
      renderMarkup(refs.listOfCards, renderCardImages(images.hits));
      notiflixInfo(`Hooray! We found ${images.totalHits} images.`);
      refs.searchMore.classList.remove('is-hidden');
      return;
    }
    if (images.hits.length === 0) {
      notiflixFailure(warning);
      renderMarkup(refs.listOfCards, '');
      return;
    }
  });
}

refs.searchMore.addEventListener('click', event => {
  event.preventDefault();
  page += 1;

  fetchImages(searchImage, page).then(images => {
    renderMarkup(refs.listOfCards, renderCardImages(images.hits));

    const totalPages = `${images.totalHits}` / 40;
    if (page > totalPages) {
      notiflixWarning(end);
      refs.searchMore.classList.add('is-hidden');
      return;
    }
  });
});

function renderMarkup(where, what) {
  where.innerHTML = what;
}
