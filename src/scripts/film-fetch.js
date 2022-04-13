import { elem } from './dom-elements';
import ApiService from './api-services';
import apiData from './tmbd-api-data';

const api = new ApiService(apiData.url, apiData.key);

api.fetchPopular();

// elem.form.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   event.preventDefault();
//   api.fetchPopular();
// }
