import React, {useState} from "react";
import {Fragment} from "react";
import {doRequests, getSearchPathMap, lookupPortfolio} from "../../FinnHub/network";
import {isPortfolioValid} from "../../FinnHub/utils";

const PortfolioForm = ({setSearchResults}) => {
    const [portfolio, setPortfolio] = useState('');
    const onSubmitPortfolio = (event) => {
        event.preventDefault();
        if (!isPortfolioValid(portfolio)) return;
        lookupPortfolio(portfolio, setSearchResults);
    }

    return <Fragment>
        <form onSubmit={onSubmitPortfolio}>
            <input
                type="text"
                name="input_portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
            />
            <button onClick={onSubmitPortfolio}>Submit</button>
        </form>
    </Fragment>
}

export default PortfolioForm;