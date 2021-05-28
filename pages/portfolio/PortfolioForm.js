import React from "react";
import {Fragment} from "react";

const PortfolioForm = ({onSubmitPortfolio, portfolio, setPortfolio}) => (
    <Fragment>
        <form onSubmit={onSubmitPortfolio}>
            <input
                type="text"
                name="input_portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
            />
            <button onClick={(event) => {
                event.preventDefault();
                onSubmitPortfolio();
            }}>Submit</button>
        </form>
    </Fragment>
);

export default PortfolioForm;