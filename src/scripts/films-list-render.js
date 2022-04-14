import filmCard from './film-card.hbs';
import { elem } from './dom-elements.js';
import apiData from './tmbd-api-data';

export const filmListRender = function (results, genresList) {
  const filmElList = results.map(e => filmCardRender(e, genresList)).join('');
  filmListReset();
  filmListUpdate();
};

const filmListReset = function () {
  elem.filmContainer.innerHTML = '';
};

const filmListUpdate = function () {
  elem.filmContainer.insertAdjacentHTML('afterbegin', filmElList);
};

const filmCardRender = function (
  { poster_path, original_title, genre_ids, release_date },
  genresList,
) {
  return filmCard({
    imgUrl: `${apiData.BASE_IMG_URL}${poster_path}`,
    filmTitle: original_title.slice(0, 30),
    filmGenre: genresList
      .filter(e => genre_ids.includes(e.id))
      .map(e => e.name)
      .join(', '),
    filmYear: release_date.split('').splice(0, 4).join(''),
  });
};
