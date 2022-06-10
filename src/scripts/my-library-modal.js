import { elem } from './dom-elements';
import modalCard from './modal.hbs';
import apiData from './tmbd-api-data';
import { localStorageSearch, saveFilm, removeFilm } from './local-storage';
import { myLibraryRender, currentPage, currentTab } from '../scripts/my-library-films-list-render';
// elem.filmContainer.addEventListener('click', onClickDocument);

let filmFound = {};

export function onClickDocument(e) {
  const selectedEl = e.path
    .filter(i => i.nodeName === 'DIV')
    .filter(i => i.classList.contains('card'))[0];

  if (selectedEl) {
    const movieID = selectedEl.dataset.movieid;
    filmFound = localStorageSearch(movieID);
    const { film, watched, queue } = filmFound;

    if (film) {
      modalRender(film);
      document.addEventListener('keydown', onClick);
      if (watched === 'true') {
        setBtnWatched(elem.modalBtnWatched);
      }

      if (queue === 'true') {
        setBtnWatched(elem.modalBtnQueue);
      }
    }

    elem.myLibFilmContainer.removeEventListener('click', onClickDocument);
  }
}

function onClick(e) {
  if (
    e.target.classList.contains('closeBtn') ||
    e.target.classList.contains('backdrop') ||
    e.key === 'Escape'
  ) {
    elem.modalContainer.classList.toggle('closed');
    elem.modalContainer.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onClick);
    elem.filmContainer.addEventListener('click', onClickDocument);
    myLibraryRender(currentTab, currentPage);

    return;
  }

  if (e.target.dataset.watched === 'false') {
    // add object and save
    saveFilm('watchedFilms', filmFound.film);
    setBtnWatched(e.target);

    return;
  }
  if (e.target.dataset.watched === 'true') {
    removeFilm('watchedFilms', filmFound.film);
    setBtnNotWatched(e.target);

    return;
  }

  if (e.target.dataset.queue === 'false') {
    saveFilm('queueFilms', filmFound.film);
    setBtnWatched(e.target);
    return;
  }

  if (e.target.dataset.queue === 'true') {
    removeFilm('queueFilms', filmFound.film);
    setBtnNotWatched(e.target);
    return;
  }
}

const setBtnWatched = btn => {
  btn.classList.toggle('button-selected');

  if (btn.dataset.watched) {
    btn.innerHTML = 'remove from watched';
    btn.dataset.watched = 'true';
  }
  if (btn.dataset.queue) {
    btn.innerHTML = 'remove from queue';
    btn.dataset.queue = 'true';
  }
};

const setBtnNotWatched = btn => {
  btn.classList.toggle('button-selected');

  if (btn.dataset.watched) {
    btn.innerHTML = 'add to watched';
    btn.dataset.watched = 'false';
  }
  if (btn.dataset.queue) {
    btn.innerHTML = 'add to queue';
    btn.dataset.queue = 'false';
  }
};

export function modalRender(film) {
  const {
    overview,
    popularity,
    genres,
    poster_path,
    title,
    original_title,
    vote_average,
    vote_count,
  } = film;
  filmFound.film = film;
  const filmData = modalCard({
    imgUrl: `${apiData.BASE_IMG_URL}${poster_path}`,
    title,
    Vote: vote_average,
    Votes: vote_count,
    Popularity: popularity,
    Original_Title: original_title,
    Genre: genres.map(i => i.name).join(', '),
    about: overview,
  });
  if (elem.modalWindowEl) {
    elem.modalWindowEl.remove();
  }
  elem.modalContainer.insertAdjacentHTML('beforeend', filmData);
  elem.modalWindowEl = document.querySelector('.modal');

  elem.modalContainer.classList.toggle('closed');
  elem.modalContainer.addEventListener('click', onClick);
  elem.modalBtnWatched = elem.modalWindowEl.querySelector('[data-watched]');
  elem.modalBtnQueue = elem.modalWindowEl.querySelector('[data-queue]');
}
