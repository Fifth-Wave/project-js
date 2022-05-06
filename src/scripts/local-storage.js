export function ifFilmWatched(id) {
  const watchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));

  if (!watchedFilms) {
    localStorage.setItem('watchedFilms', JSON.stringify([]));
    return false;
  }

  if (!watchedFilms.length) {
    return false;
  }

  const filmWatched = findFilm(watchedFilms, id);

  if (filmWatched) {
    return filmWatched;
  }

  return false;
}

const findFilm = (watchedFilms, id) => {
  const filmFound = watchedFilms.filter(i => i.id === Number(id));

  if (filmFound[0]) {
    return filmFound[0];
  }

  return false;
};

export function saveFilm(localStorageKey, data) {
  const watchedFilms = JSON.parse(localStorage.getItem(localStorageKey));
  watchedFilms.push(data);
  const newObj = JSON.stringify(watchedFilms);
  localStorage.setItem(localStorageKey, newObj);
}

export function removeFilm(localStorageKey, { id }) {
  const watchedFilms = JSON.parse(localStorage.getItem(localStorageKey));
  console.log(watchedFilms);
  const newObj = JSON.stringify(watchedFilms.filter(i => i.id !== Number(id)));
  localStorage.setItem(localStorageKey, newObj);
}
