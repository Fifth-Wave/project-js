export const pagOptions = {
  totalItems: 400,
  itemsPerPage: 18,
  visiblePages: 5,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="pagination-link tui-pagination">{{page}}</a>',
    currentPage: '<strong class="pagination-link selected">{{page}}</strong>',
    moveButton: '<a href="#" class="pagination-link  arrow-{{type}} trippledot-{{type}}"></a>',
    disabledMoveButton:
      '<a href="#" class="pagination-link tui-is-disabled  arrow-{{type}} trippledot-{{type}}"></a>',
    moreButton:
      '<a href="#" class="pagination-link trippledot tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
