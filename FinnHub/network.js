import {FINNHUB_API_KEY} from "../keys";

const axios = require('axios');

export const TOKEN = '&token=' + FINNHUB_API_KEY;

export const searchBySymbol = query => `search?q=${query}${TOKEN}`;
export const getETFHoldingsPath = etf => `etf/holdings?symbol=${etf}${TOKEN}`;

export const instance = axios.create({
    baseURL: 'https://finnhub.io/api/v1/',
    timeout: 10000,
});
