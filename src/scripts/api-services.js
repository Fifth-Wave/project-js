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
    this.matrix = { 2: -4, 3: -6, 4: -8, 5: -10, 6: -12, 7: -14, 8: -16, 9: -18 };
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
        filmListRender(data.results.slice(0, 18), this.genresList);
      })
      .catch(console.log);
  }

  fetchPage(num) {
    const lastDigit = String(num).slice(-1);
    const decrement = this.matrix[lastDigit];
    if (lastDigit === '1') {
      fetch(`${this.currLink}${num}`)
        .then(data => {
          if (!data.ok) {
            throw new Error(data.status);
          }
          return data.json();
        })
        .then(data => {
          filmListRender(data.results.slice(0, 18), this.genresList);
        })
        .catch(console.log);
      return;
    }
    if (lastDigit === '0') {
      fetch(`${this.currLink}${num - 1}`)
        .then(data => {
          if (!data.ok) {
            throw new Error(data.status);
          }
          return data.json();
        })
        .then(data => {
          filmListRender(data.results.slice(-18), this.genresList);
        })
        .catch(console.log);
      return;
    }
    this.getPage(num, decrement);
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
        filmListRender(data.results, this.genresList);
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
        modalRender(data);
      })
      .catch(console.log);
  }
  getPage = async (num, decrement) => {
    const firstResponse = await fetch(`${this.currLink}${num - 1}`);
    const firstPartIn = await firstResponse.json();
    const firstPart = firstPartIn.results.slice(decrement + 2);

    const secondResponse = await fetch(`${this.currLink}${num}`);
    const secondPartIn = await secondResponse.json();
    const secondPart = secondPartIn.results.slice(0, 20 + decrement);
    filmListRender([...firstPart, ...secondPart], this.genresList);
    return;
  };
}
