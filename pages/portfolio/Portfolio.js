import React, {Fragment, useEffect, useState} from "react";
import {filterSearchResults, getAllMatchingHoldings} from "../../FinnHub/utils";
import {doRequests, getETFHoldingsPath, getSearchPathMap} from "../../FinnHub/network";
import PortfolioForm from "./PortfolioForm";
import Error from "../util/Error";
import {SYMBOL, TYPE} from "../../FinnHub/SearchResult";
import {Type} from "../../FinnHub/Type";
import MatchingHoldings from "./MatchingHoldings";

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState('');
    const [searchPathMap, setSearchPathMap] = useState(undefined);
    const [searchResults, setSearchResults] = useState(undefined);
    const [portfolioResults, setPortfolioResults] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [funds, setFunds] = useState(undefined);

    const fundLookupListener = () => {
        if (!portfolioResults) return;

        let success = true;
        success = portfolioResults.map(response => response.status === 200);
        if (success) {
            const resultFunds = portfolioResults.map(response => response.data);
            setFunds(resultFunds);
        } else {
            setError(true);
        }
    }
    useEffect(() => fundLookupListener(), [portfolioResults]);

    const portfolioSearchListener = () => {
        if (!searchResults || !searchPathMap) {
            return;
        }
        const filtered = filterSearchResults(searchPathMap, searchResults);
        // todo: support stocks and mutual funds
        const fundPaths = filtered.map(
            (fund) => fund[TYPE] === Type.ETF
                ? getETFHoldingsPath(fund[SYMBOL])
                : false
        );
        doRequests(fundPaths, setPortfolioResults);
    }
    useEffect(() => portfolioSearchListener(), [searchPathMap, searchResults]);

    const onSubmitPortfolio = () => {
        setError(undefined);
        const temp = getSearchPathMap(portfolio)
        setSearchPathMap(temp)
        const paths = Object.keys(temp);
        doRequests(paths, setSearchResults)
    }

    let matchingHoldings = undefined;
    if (funds) {
        matchingHoldings = getAllMatchingHoldings(funds);
    }

    const formProps = { onSubmitPortfolio, portfolio, setPortfolio }
    const overviewProps = { matchingHoldings, funds }
    const errorProps = { error, message: "There was a problem loading your portfolio."}

    return (
        <Fragment>
            <Error {...errorProps} />
            {!error && <Fragment>
                <PortfolioForm {...formProps} />
                {matchingHoldings && <MatchingHoldings {...overviewProps} />}
            </Fragment>}
        </Fragment>
    );
}

export default Portfolio;