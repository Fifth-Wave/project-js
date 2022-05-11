import { elem } from './dom-elements';
import { api } from './fetch-films';
import modalCard from './modal.hbs';
import apiData from './tmbd-api-data';
import { localStorageSearch, saveFilm, removeFilm } from './local-storage';

elem.filmContainer.addEventListener('click', onClickDocument);

function onClickDocument(e) {
  const selectedEl = e.path
    .filter(i => i.nodeName === 'DIV')
    .filter(i => i.classList.contains('card'))[0];

  if (selectedEl) {
    const movieID = selectedEl.dataset.movieid;

    //check if already exist in local storage
    //if yes render it
    const filmFound = localStorageSearch(movieID);
    const { film, watched, queue } = filmFound;

    if (film) {
      api.currFilm = film;
      modalRender(film);

      if (watched === 'true') {
        setBtnWatched(elem.modalBtnWatched);
      }

      if (queue === 'true') {
        setBtnWatched(elem.modalBtnQueue);
      }
    } else {
      //if no
      api.fetchByID(movieID);
    }

    elem.filmContainer.removeEventListener('click', onClickDocument);
  }
}

function onClick(e) {
  if (e.target.classList.contains('closeBtn') || e.target.classList.contains('backdrop')) {
    elem.modalContainer.classList.toggle('closed');

    elem.filmContainer.addEventListener('click', onClickDocument);
    return;
  }

  if (e.target.dataset.watched === 'false') {
    // add object and save
    saveFilm('watchedFilms', api.currFilm);
    setBtnWatched(e.target);

    return;
  }
  if (e.target.dataset.watched === 'true') {
    removeFilm('watchedFilms', api.currFilm);
    setBtnNotWatched(e.target);

    return;
  }

  if (e.target.dataset.queue === 'false') {
    saveFilm('queueFilms', api.currFilm);
    setBtnWatched(e.target);
    return;
  }

  if (e.target.dataset.queue === 'true') {
    removeFilm('queueFilms', api.currFilm);
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

export function modalRender({
  overview,
  popularity,
  genres,
  poster_path,
  title,
  original_title,
  vote_average,
  vote_count,
}) {
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
