import {REACT_APP_BACKEND_URL} from '../../../config_urls.js'
const axios = require('axios');


export function save_ip_address(){
    axios.get(REACT_APP_BACKEND_URL + 'divers/ip')
    .then(function (response) {
    })
    .catch(function (error) {
    })
}