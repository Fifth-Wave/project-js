import { elem } from './dom-elements.js';
import { filmCardRender, filmListUpdate, filmListReset } from './films-list-render';
import { pagOptions } from './pagination.js';
import apiData from './tmbd-api-data';
import Pagination from 'tui-pagination';
import { LocalStorageTotalItems } from './local-storage';
import { onClickDocument } from './my-library-modal';

elem.filterWatched = document.querySelector('#watched-btn');
elem.filterQueue = document.querySelector('#queue-btn');
elem.myLibFilmContainer = document.querySelector('.films-list__container');

document.addEventListener('click', onFilterClick);

elem.myLibFilmContainer.addEventListener('click', onClickDocument);

const genresList = apiData.genresList;
const myLibraryStorageWatched = localStorage.getItem('watchedFilms');
const myLibraryStorageQueue = localStorage.getItem('queueFilms');
export let currentTab = 'watchedFilms';
export let currentPage = 1;
myLibraryRender(currentTab, 1);

const options = {
  ...pagOptions,
  totalItems: LocalStorageTotalItems(currentTab),
  page: 1,
};
const instanceLibrary = new Pagination(elem.container, options);

instanceLibrary.on('afterMove', event => {
  currentPage = event.page;
  myLibraryRender(currentTab, currentPage);
});

export function myLibraryRender(localStorageName, pageNumber) {
  const StoredFils = localStorage.getItem(localStorageName);
  const data = JSON.parse(StoredFils);
  if (!data) {
    filmListReset();
    return;
  }

  if (Math.ceil(data.length / 18) < pageNumber) {
    pageNumber = pageNumber - 1 <= 0 ? 1 : pageNumber - 1;
    instanceLibrary.reset(pageNumber);
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
    currentTab = 'watchedFilms';
    instanceLibrary.reset(LocalStorageTotalItems(currentTab));
    elem.filterWatched.classList.toggle('button-selected');
    elem.filterQueue.classList.toggle('button-selected');
    myLibraryRender(currentTab, 1);
  }
  if (e.target === elem.filterQueue && !e.target.classList.contains('button-selected')) {
    currentTab = 'queueFilms';
    instanceLibrary.reset(LocalStorageTotalItems(currentTab));
    elem.filterQueue.classList.toggle('button-selected');
    elem.filterWatched.classList.toggle('button-selected');
    myLibraryRender(currentTab, 1);
  }
}
