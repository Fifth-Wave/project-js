import ajax from 'ajax';

export default class ApiService {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }

  currentPage = 0;
  totalPages = 0;

  fetchPopular() {
    fetch(`${this.url}/discover/movie?api_key=${this.key}&sort_by=popularity.desc`)
      .then(data => {
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then(console.log)
      .catch(console.log);
  }
}
