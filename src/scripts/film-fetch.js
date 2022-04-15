import { elem } from './dom-elements';
import ApiService from './api-services';
import apiData from './tmbd-api-data';
import Pagination from './pagination';
import { filmListReset } from './films-list-render';

const api = new ApiService(apiData.url, apiData.key);
api.fetchPopular();

const pagination = new Pagination('pagination', 20);
pagination.paginatorEl.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  filmListReset();
  api.fetchPage(pagination.onClick(e.target));
}

// elem.form.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   event.preventDefault();
//   api.fetchPopular();
// }
