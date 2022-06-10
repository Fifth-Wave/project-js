import { elem } from './dom-elements';

export function loader() {
  const loaderMarkUp = `<div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>`;
  elem.filmContainer.innerHTML = loaderMarkUp;
}
