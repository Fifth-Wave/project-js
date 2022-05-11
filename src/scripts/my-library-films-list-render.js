import { elem } from './dom-elements.js';
import { filmCardRender, filmListUpdate, filmListReset } from './films-list-render';
import { pagOptions } from './pagination.js';
import apiData from './tmbd-api-data';
import Pagination from 'tui-pagination';
import { LocalStorageTotalItems } from './local-storage';

elem.filterWatched = document.querySelector('#watched-btn');
elem.filterQueue = document.querySelector('#queue-btn');
document.addEventListener('click', onFilterClick);

const genresList = apiData.genresList;

const myLibraryStorageWatched = localStorage.getItem('watchedFilms');
const myLibraryStorageQueue = localStorage.getItem('queueFilms');

myLibraryRender('watchedFilms', 1);

const options = {
  ...pagOptions,
  totalItems: LocalStorageTotalItems('watchedFilms'),
  page: 1,
};
const instanceLibrary = new Pagination(elem.container, options);
instanceLibrary.on('afterMove', event => {
  const currentPage = event.page;
  myLibraryRender('watchedFilms', currentPage);
});

function myLibraryRender(localStorageName, pageNumber) {
  const StoredFils = localStorage.getItem(localStorageName);
  const data = JSON.parse(StoredFils);
  if (!data) {
    filmListReset();
    return;
  }
  const filmElList = data
    .filter((e, i) => i >= pageNumber * 18 - 18 && i < pageNumber * 18)
    .map(e => filmCardRender(e, genresList))
    .join('');
  filmListReset();
  filmListUpdate(filmElList);
}

function onFilterClick(e) {
  if (e.target === elem.filterWatched && !e.target.classList.contains('button-selected')) {
    instanceLibrary.reset(LocalStorageTotalItems('watchedFilms'));
    elem.filterWatched.classList.toggle('button-selected');
    elem.filterQueue.classList.toggle('button-selected');
    myLibraryRender('watchedFilms', 1);
  }
  if (e.target === elem.filterQueue && !e.target.classList.contains('button-selected')) {
    instanceLibrary.reset(LocalStorageTotalItems('queueFilms'));
    elem.filterQueue.classList.toggle('button-selected');
    elem.filterWatched.classList.toggle('button-selected');
    myLibraryRender('queueFilms', 1);
  }
}
