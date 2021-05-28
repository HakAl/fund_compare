import {FINNHUB_API_KEY} from "../keys";
import {splitPortfolio} from "./utils";
import {SYMBOL, TYPE} from "./SearchResult";
import {Type} from "./Type";

const axios = require('axios');

export const TOKEN = '&token=' + FINNHUB_API_KEY;
export const searchBySymbol = query => `search?q=${query}${TOKEN}`;
export const getETFHoldingsPath = etf => `etf/holdings?symbol=${etf}${TOKEN}`;
// /mutual-fund/profile?symbol=VTSAX

export const instance = axios.create({
    baseURL: 'https://finnhub.io/api/v1/',
    timeout: 10000,
});

export const doRequests = (requestPaths, responseListener) => {
    Promise
        .all(requestPaths.map(path => instance.get(path)))
        .then((response) => responseListener(response))
}

export const lookupPortfolio = (portfolio, responseListener) => {
    const searchPathMap = getSearchPathMap(portfolio)
    const paths = Object.keys(searchPathMap);
    const setSearchPathMap = (response) => {
        const result = {
            searchPathMap,
            response
        };
        responseListener(result)
    }
    doRequests(paths, setSearchPathMap)
}

const getSearchPathMap = portfolio => {
    let result = {};
    splitPortfolio(portfolio).map( (symbol) => (
            result[searchBySymbol(symbol)] = symbol
    ))
    return result;
}
