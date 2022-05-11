import filmCard from './film-card.hbs';
import { elem } from './dom-elements.js';
import apiData from './tmbd-api-data';

export const filmListRender = function (results, genresList) {
  const filmElList = results.map(e => filmCardRender(e, genresList)).join('');
  filmListReset();
  filmListUpdate(filmElList);
};

export const filmListReset = function () {
  elem.filmContainer.innerHTML = '';
};

export const filmListUpdate = function (filmElList) {
  elem.filmContainer.insertAdjacentHTML('afterbegin', filmElList);
};

export const filmCardRender = function (
  { poster_path, original_title, genre_ids, release_date, id },
  genresList,
) {
  if (!release_date) {
    return {
      imgUrl: `${apiData.BASE_IMG_URL}${poster_path}`,
      filmTitle: original_title.slice(0, 25),
      filmGenre: genresList

        .filter(e => genre_ids.includes(e.id))
        .map(e => e.name)
        .slice(0, 4)
        .join(', '),
      filmYear: 'unknown',
      movieID: id,
    };
  }
  return filmCard({
    imgUrl: `${apiData.BASE_IMG_URL}${poster_path}`,
    filmTitle: original_title.slice(0, 25),
    filmGenre: genresList

      .filter(e => genre_ids.includes(e.id))
      .map(e => e.name)
      .slice(0, 4)
      .join(', '),
    filmYear: release_date.split('').splice(0, 4).join(''),
    movieID: id,
  });
};
