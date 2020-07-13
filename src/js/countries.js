
import countriesService from './countries-service'
import countriesTemplates from '../templates/countries-item.hbs'
import oneCountryTemplates from '../templates/one-country-item.hbs'
import debounce from 'lodash.debounce';
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";


const refs = {
    searchForm: document.querySelector('.js-search-input'),
    countiesList: document.querySelector('.js-countries-list'),
    oneCountyForm: document.querySelector('.js-one-country-form'),
};


refs.searchForm.addEventListener("input", debounce(searchFormInputHandler, 500));

function searchFormInputHandler (e) { 
    e.preventDefault(); 
    const searchValue = e.target.value;

    clearList ();
    clearForm ()

    countriesService.fetchCountries(searchValue).then(data => {

      //   if (Object.prototype.toString.call(data) !== '[object Array]') {
      //     click()
      //  } else 
       if (data.length === 1) {
            const markup = buildItemMarkup (data);
            isertFormItem (markup)
            console.log(markup)

        } else if (data.length <= 10) {
            const markup = buildListItemsMarkup(data);
            isertListItems(markup);
        } else if (data.length >= 10) {
          click()
        }
    });
}
function isertListItems (items) {
    refs.countiesList.insertAdjacentHTML('beforeend', items)
}
function isertFormItem (items) {
  refs.oneCountyForm.insertAdjacentHTML('beforeend', items)
}
function buildListItemsMarkup (items) {
    return countriesTemplates(items)
}
function buildItemMarkup (items) {
  console.log(...items)
    return oneCountryTemplates(items)
}
function clearList () {
    refs.countiesList.innerHTML = '';
}
function clearForm () {
    refs.oneCountyForm.innerHTML = '';
}

function click() {
  info({
    text:
      "Too many matches found. Please enter a more specific query!",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}





// App.querySelector("button").addEventListener("click", click);