export function localStorageSearch(id) {
  const watchedFilms = JSON.parse(localStorage.getItem('watchedFilms'));
  const queueFilms = JSON.parse(localStorage.getItem('queueFilms'));

  if (!watchedFilms && !queueFilms) {
    localStorage.setItem('watchedFilms', JSON.stringify([]));
    localStorage.setItem('queueFilms', JSON.stringify([]));
    return { film: false };
  }

  const reply = {
    film: '',
    watched: 'false',
    queue: 'false',
  };

  const filmWatched = findFilm(watchedFilms, id);
  const filmQueue = findFilm(queueFilms, id);

  if (filmWatched) {
    reply.film = filmWatched;
    reply.watched = 'true';
  }

  if (filmQueue) {
    reply.film = filmQueue;
    reply.queue = 'true';
  }

  return reply;
}

const findFilm = (watchedFilms, id) => {
  const filmFound = watchedFilms.filter(i => i.id === Number(id));

  if (filmFound[0]) {
    return filmFound[0];
  }

  return false;
};

export function saveFilm(localStorageKey, data) {
  data.genre_ids = data.genres.map(i => i.id);
  const watchedFilms = JSON.parse(localStorage.getItem(localStorageKey));
  watchedFilms.push(data);
  const newObj = JSON.stringify(watchedFilms);
  localStorage.setItem(localStorageKey, newObj);
}

export function removeFilm(localStorageKey, { id }) {
  const watchedFilms = JSON.parse(localStorage.getItem(localStorageKey));
  const newObj = JSON.stringify(watchedFilms.filter(i => i.id !== Number(id)));
  localStorage.setItem(localStorageKey, newObj);
}

export function LocalStorageTotalItems(localStorageKey) {
  const storedFilms = JSON.parse(localStorage.getItem(localStorageKey));

  return storedFilms.length;
}
