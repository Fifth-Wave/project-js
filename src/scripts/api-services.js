import { filmListRender } from './films-list-render';

export default class ApiService {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.genresList = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];
    this.currLink = '';
    this.totalPages;
  }

  fetchPopular() {
    fetch(`${this.url}/discover/movie?api_key=${this.key}&sort_by=popularity.desc&page=1`)
      .then(data => {
        this.currLink = `${this.url}/discover/movie?api_key=${this.key}&sort_by=popularity.desc&page=`;
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then(data => {
        this.totalPages = data.total_pages;

        filmListRender(data.results, this.genresList);
      })
      .catch(console.log);
  }

  fetchPage(num) {
    fetch(`${this.currLink}${num}`)
      .then(data => {
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then(data => {
        filmListRender(data.results, this.genresList);
      })
      .catch(console.log);
  }
}
