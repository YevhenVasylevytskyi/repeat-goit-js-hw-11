import pictureItem from './templates/pictureItem.hbs';
const API_KEY = '23013902-f53df9bcd1cd3c8e660b93280';
const BASE_URL = 'https://pixabay.com/api/';


const inputForm = document.querySelector('#search-form');

// console.log(inputForm)

function fetchPictures(query) {

    fetch(`${BASE_URL}/?key=${API_KEY}&q=${query}`).then(response => {
        // console.log(response);

        return response.json();
    }).then(data => {
      console.log(data.hits);
        renderQuery(data)
    })
}

fetchPictures('cat')

const renderQuery = ({ hits }) => {
    const result = pictureItem(hits)
    inputForm.insertAdjacentHTML('afterend', result);
}