import React, {Fragment, useEffect, useState} from "react";
import {filterSearchResults, getAllMatchingHoldings} from "../../FinnHub/utils";
import {doRequests, getETFHoldingsPath, getSearchPathMap} from "../../FinnHub/network";
import PortfolioForm from "./PortfolioForm";
import {SYMBOL, TYPE} from "../../FinnHub/SearchResult";
import {Type} from "../../FinnHub/Type";
import MatchingHoldings from "./MatchingHoldings";

const Portfolio = () => {
    const [funds, setFunds] = useState(undefined);
    const [searchResults, setSearchResults] = useState(undefined);
    const [portfolioResults, setPortfolioResults] = useState(undefined);

    const fundLookupListener = () => {
        if (!portfolioResults) return;

        const resultFunds = portfolioResults.map(response => response.data);
        setFunds(resultFunds);
    }
    useEffect(() => fundLookupListener(), [portfolioResults]);

    const portfolioSearchListener = () => {
        if (!searchResults) {
            return;
        }

        const filtered = filterSearchResults(searchResults.searchPathMap, searchResults.response);
        const fundPaths = filtered.map((fund) => getETFHoldingsPath(fund[SYMBOL]));
        doRequests(fundPaths, setPortfolioResults);
    }
    useEffect(() => portfolioSearchListener(), [searchResults]);

    let matchingHoldings = undefined;
    if (funds) {
        matchingHoldings = getAllMatchingHoldings(funds);
    }

    const formProps = { setSearchResults }
    const overviewProps = { matchingHoldings, funds }

    return (
        <Fragment>
            <PortfolioForm {...formProps} />
            {matchingHoldings && <MatchingHoldings {...overviewProps} />}
        </Fragment>
    );
}

export default Portfolio;