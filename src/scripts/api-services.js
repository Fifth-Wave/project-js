import { filmListRender } from './films-list-render';
import { instance } from './fetch-films';
import { modalRender } from './modal';

export default class ApiService {
  constructor(url, key, genresList) {
    this.url = url;
    this.key = key;
    this.genresList = genresList;
    this.currLink = '';
    this.totalPages;
    this.currFilm;
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
        this.totalPages = data.total_pages > 20 ? 20 : data.total_pages;
        filmListRender(data, this.genresList);
        console.log(data);
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
        filmListRender(data, this.genresList);
      })
      .catch(console.log);
  }

  fetchFilm(keyWords) {
    fetch(`${this.url}/search/movie?api_key=${this.key}&query=${keyWords}&page=1`)
      .then(data => {
        this.currLink = `${this.url}/search/movie?api_key=${this.key}&query=${keyWords}&page=`;
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then(data => {
        filmListRender(data, this.genresList);
        instance.reset(data.total_results);
      })
      .catch(console.log);
  }

  fetchByID(movieID) {
    fetch(`${this.url}/movie/${movieID}?api_key=${this.key}`)
      .then(data => {
        if (!data.ok) {
          throw new Error(data.status);
        }
        return data.json();
      })
      .then(data => {
        this.currFilm = data;

        modalRender(data);
      })
      .catch(console.log);
  }
}
