export default class Pagination {
  constructor(select, totalPages) {
    this.totalPages = totalPages > 20 ? 20 : totalPages;
    this.currPag = 1;
    this.paginator = document.getElementById(select);
    this.pagLinkElem = Array.from(this.paginator.children);
    this.currPagEl = this.pagLinkElem[1];
  }

  get paginatorEl() {
    return this.paginator;
  }

  onClick(currPagEl) {
    this.toggleId(this.currPagEl, 'selected');
    this.currPagEl = currPagEl;

    if (currPagEl.id === 'arrow-right') {
      this.currPagIncrement();
      return this.currPag;
    }
    if (currPagEl.id === 'arrow-left') {
      this.currPagDecrement();
      return this.currPag;
    }

    this.currPag = currPagEl.textContent;
    this.toggleId(currPagEl, 'selected');
    return this.currPag;
  }

  currPagIncrement() {
    this.currPag += 1;
    this.redrawPag();
  }

  currPagDecrement() {
    this.currPag -= 1;
    this.redrawPag();
  }

  redrawPag() {
    console.log(this.pagLinkElem);
    this.pagLinkElem.forEach(element => {
      console.log(element, element.id);
      if (!element.id) {
        if (element.textContent === '2' || element.textContent === '19') {
          element.textContent = '...';
          this.toggleId(element, 'tripledot');
        }
      }
    });
  }

  toggleId(elem, id) {
    console.log(elem.classList);
    elem.classList.toggle(id);
  }
}
