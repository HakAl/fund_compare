import {HOLDINGS, NUMBER_OF_HOLDINGS} from "./Fund";
import {RESULT} from "./SearchResults";
import {SYMBOL} from "./SearchResult";

const isChar = (variable) => variable.toUpperCase() !== variable.toLowerCase();

export const isPortfolioValid = (portfolio = '') => {
    portfolio += '';
    portfolio = portfolio.trim();
    if (portfolio.length === 0) return false;
    if (!isChar(portfolio.charAt(0))) return false;
    if (!isChar(portfolio.charAt(portfolio.length-1))) return false;
    const regex = new RegExp('[a-zA-Z ,]')
    return regex.test(portfolio);
}

export const splitPortfolio = (portfolioString = '') => {
    portfolioString += '';
    portfolioString = portfolioString.trim();
    if (portfolioString.length === 0) return [];

    if (!isChar(portfolioString.charAt(0))) {
        portfolioString = portfolioString.slice(1, portfolioString.length);
        //sorry
        if (!isChar(portfolioString.charAt(0))) {
            return [];
        }
    }
    if (!isChar(portfolioString.charAt(portfolioString.length-1))) {
        portfolioString = portfolioString.slice(0, -1);
        //sorry
        if (!isChar(portfolioString.charAt(portfolioString.length-1))) {
            return [];
        }
    }

    if (!portfolioString.includes(',')
        && !portfolioString.includes(' ')) {
        return [ portfolioString ];
    }

    if (portfolioString.includes(',')) {
        portfolioString = portfolioString.replace(' ', '');
        return getPortfolioArray(',', portfolioString);
    }

    if (portfolioString.includes(' ')) {
        return getPortfolioArray(' ', portfolioString);
    }
}

const getPortfolioArray = (splitChar, portfolio) => {
    return portfolio.split(splitChar)
        .map(x => x.trim())
        .filter(y => y.length > 0);
}

export const getHoldingsCount = (funds = [], matchingHoldings = []) => {
    const total = funds.map(fund => fund[NUMBER_OF_HOLDINGS])
    return total - matchingHoldings.length;
}

export const getAllMatchingHoldings = (funds = []) => {
    if (funds.length === 0) return []
    if (funds.length === 1) return funds[HOLDINGS]
    let result = [];
    for (let i = 0; i < funds.length-1; i++) {
        result = getMatchingHoldings(funds[i], funds[i+1]);
    }
    return result;
}

/**
 * Compare the holdings of 2 funds.
 *
 * @param {object} fundA
 * @param {object} fundB
 * @returns {*[]} array with stocks contained in both funds
 */
export const getMatchingHoldings = (fundA= {}, fundB = {}) => {
    var result = [];
    const fundAHoldings = fundA[HOLDINGS];
    const fundBHoldings = fundB[HOLDINGS];
    const fundBDict = {};
    fundBHoldings.forEach(holding => {
        fundBDict[holding.symbol] = holding;
    });
    let holder;
    fundAHoldings.forEach(holding => {
        holder = fundBDict[holding.symbol];
        if (holder) {
            result.push(holder);
        }
    });
    return result
}

/**
 *
 * @param searchPathMapping dict with contents { path: tickerSymbol }
 * @param response          response from network->searchBySymbol()
 * @returns {{}|{}[]}       an array of results where tickerSymbol is set as key and
 *                          search result json as value
 */
export const filterSearchResults = (searchPathMapping = {}    , response = []) => {
    if (!response || response.length === 0) return []

    const hasBadData = response.map(result => !result.config || !result.data)[0]
    if (hasBadData) return []

    const keys = response.map(result => searchPathMapping[result.config.url])
    const allSearchResults = response
        .flatMap(result => result.data.result)
        .filter(result => !result.hasOwnProperty('primary'));

    return keys.map(key => (allSearchResults.filter(result => result[SYMBOL] === key.toUpperCase())[0]));
}