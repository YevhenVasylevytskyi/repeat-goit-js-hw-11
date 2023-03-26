import photoGallery from './templates/photoGallery.hbs';
import axios from 'axios'
import { Notify } from 'notiflix';
import './css/styles.css';

const API_KEY = '34753314-06c64cb5991208f98d3d609c3';
const BASE_URL = 'https://pixabay.com/api/';


const inputForm = document.querySelector('#search-form');
const query = ''

inputForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const query = event.currentTarget.searchQuery.value;

    console.log(query)

    fetchPictures(query)

}

function fetchPictures(query) {

    axios.get(`${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal`)
        .then(function (response) {
            // обработка успешного запроса
            return response.data;
        })
        .then(data => {
            inputForm.insertAdjacentHTML('afterend', ' ');
            // console.log(data);
            renderQuery(data)
        })

    // fetch(`${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal`).then(response => {
    //     // console.log(response);

    //     //&safesearch=true

    //     return response.json();
    // }).then(data => {
    //   console.log(data.hits);
    //     renderQuery(data)
    // })
}

const renderQuery = ({ hits }) => {
    console.log(hits.length)
    if (hits.length === 0) {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
    }
    
    const result = photoGallery(hits)
    inputForm.insertAdjacentHTML('afterend', result);
}