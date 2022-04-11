import ajax from 'ajax';
import apiData from './tmbd-api-data';

export default class ApiService {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }
  fetchPopular() {
    return 'wow';
  }
}
