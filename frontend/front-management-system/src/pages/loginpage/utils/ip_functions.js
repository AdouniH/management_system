import {REACT_APP_BACKEND_URL} from '../../../config_urls.js'
const axios = require('axios');


export function save_ip_address(){
    axios.get('https://api64.ipify.org?format=json')
    .then(function (response) {
        axios.get(REACT_APP_BACKEND_URL + 'divers/ip?ip=' + response.data.ip)
        .then(function (response) {
        })
        .catch(function (error) {
        })
    })
    .catch(function (error) {
    })
}