import {rederHeader, renderFooter } from './main.js';

document.getElementById("root").insertAdjacentHTML('afterbegin',rederHeader());
document.getElementById("root").insertAdjacentHTML('beforeend',renderFooter());