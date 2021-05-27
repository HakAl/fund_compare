import React from "react";
import {Fragment} from "react";
import {splitPortfolio} from "../../FinnHub/utils";
import MatchingHoldings from "./matching/MatchingHoldings";

const PortforlioOverview = ({portfolio, matchingHoldings, funds}) => (
    <Fragment>
        {portfolio && <Fragment>
            <br/>
            Funds to compare:
            {splitPortfolio(portfolio).toString()}
            <br/>
        </Fragment>}
        {matchingHoldings && <MatchingHoldings funds={funds} matchingHoldings={matchingHoldings} /> }
    </Fragment>
)

export default PortforlioOverview;