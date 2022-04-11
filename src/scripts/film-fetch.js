import { elem } from './elements';
import apiService from './api-services';

const api = new apiService();

console.log(api);

elem.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  event.preventDefault();
  console.log(e.currentTarget.value);
}
