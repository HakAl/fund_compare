import React from "react";
import {Fragment, useState} from "react";
import {filterSearchResults, getAllMatchingHoldings, splitPortfolio} from "../../FinnHub/utils";
import {getETFHoldingsPath, instance, searchBySymbol} from "../../FinnHub/network";
import PortfolioForm from "./PortfolioForm";
import PortforlioOverview from "./PortfolioOverview";
import {SYMBOL, TYPE} from "../../FinnHub/SearchResult";
import {Type} from "../../FinnHub/Type";

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState('');
    const [portfolioResults, setPortfolioResults] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [funds, setFunds] = useState(undefined);


    const onSubmitPortfolio = (event) => {
        setError(undefined);
        event.preventDefault();
        const splitPortfolioArray = splitPortfolio(portfolio);
        if (splitPortfolioArray && splitPortfolioArray.length > 0) {
            // todo::  search each symbol here to determine type of holding
            const searchPathMapping = {};
            const searchPaths = splitPortfolioArray.map(
                (symbol) => {
                    const path = searchBySymbol(symbol)
                    searchPathMapping[path] = symbol;
                    return path;
                }
            )

            let result = undefined;
            Promise
                .all(searchPaths.map(path => instance.get(path)))
                .then((response) => {
                    let success = true;
                    success = response.map(response => response.status === 200);
                    if (success) {
                        return filterSearchResults(searchPathMapping, response);
                    } else {
                        setError(true);
                    }
                }).then((parsedSearchResults) => {
                    const fundPaths = parsedSearchResults.map(
                        (fund) => fund[TYPE] === Type.ETF ? getETFHoldingsPath(fund[SYMBOL]) : false
                    );
                    Promise.all(
                        fundPaths.map(path => instance.get(path))
                    ).then((results) => {
                        let success = true;
                        success = results.map(response => response.status === 200);
                        if (success) {
                            const resultFunds = results.map(response => response.data);
                            setFunds(resultFunds);
                        } else {
                            setError(true);
                        }
                    })
            })
        }
    }

    let matchingHoldings = undefined;
    if (funds) {
        matchingHoldings = getAllMatchingHoldings(funds);
    }

    const formProps = { onSubmitPortfolio, portfolio, setPortfolio }
    const overviewProps = { matchingHoldings, portfolio, funds }

    return (
        <Fragment>
            {error && <Fragment>There was a problem loading your portfolio.</Fragment>}
            {!error && <Fragment>
                <PortfolioForm {...formProps} />
                <PortforlioOverview {...overviewProps} />
            </Fragment>}
        </Fragment>
    );
}

export default Portfolio;