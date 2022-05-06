import { elem } from './dom-elements';
import { api } from './fetch-films';
import modalCard from './modal.hbs';
import apiData from './tmbd-api-data';
import { ifFilmWatched, saveFilm, removeFilm } from './local-storage';

elem.filmContainer.addEventListener('click', onClickDocument);

function onClickDocument(e) {
  const selectedEl = e.path
    .filter(i => i.nodeName === 'DIV')
    .filter(i => i.classList.contains('card'))[0];

  if (selectedEl) {
    const movieID = selectedEl.dataset.movieid;

    //check if already exist in local storage
    //if yes render it
    const filmWatched = ifFilmWatched(movieID);

    if (filmWatched) {
      api.currFilm = filmWatched;
      modalRender(filmWatched);
      setBtnWatched();
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
    setBtnWatched();

    return;
  }
  if (e.target.dataset.watched === 'true') {
    removeFilm('watchedFilms', api.currFilm);
    setBtnNotWatched();

    return;
  }
}

const setBtnWatched = () => {
  const btn = elem.modalWindowEl.querySelector('.modal-btn ');
  btn.classList.toggle('button-selected');
  btn.innerHTML = 'remove from watched';
  btn.dataset.watched = 'true';
};

const setBtnNotWatched = () => {
  const btn = elem.modalWindowEl.querySelector('.modal-btn ');
  btn.classList.toggle('button-selected');
  btn.innerHTML = 'add to watched';
  btn.dataset.watched = 'false';
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
    Genre: genres.map(e => e.name).join(', '),
    about: overview,
  });
  if (elem.modalWindowEl) {
    elem.modalWindowEl.remove();
  }
  elem.modalContainer.insertAdjacentHTML('beforeend', filmData);
  elem.modalWindowEl = document.querySelector('.modal');

  elem.modalContainer.classList.toggle('closed');
  elem.modalContainer.addEventListener('click', onClick);
}
