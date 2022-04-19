import ApiService from './api-services';
import Pagination from 'tui-pagination';
import { pagOptions } from './pagination';
import { elem } from './dom-elements.js';
import apiData from './tmbd-api-data';

const api = new ApiService(apiData.url, apiData.key);
const container = document.getElementById('tui-pagination-container');
export const instance = new Pagination(container, pagOptions);
api.fetchPopular();

instance.on('afterMove', event => {
  const currentPage = event.page;
  api.fetchPage(currentPage);
});

elem.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const keyWords = e.currentTarget.searchKeyWords.value.trim();
  if (keyWords) {
    api.fetchFilm(keyWords);
  }
  e.currentTarget.reset();
}
