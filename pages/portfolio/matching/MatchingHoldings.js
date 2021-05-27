import {Fragment, useEffect} from "react";
import React from "react";
import TopTen from "./TopTen";
import * as d3 from "d3";
import {NUMBER_OF_HOLDINGS} from "../../../FinnHub/Fund";

const venn = require('venn.js')

const MatchingHoldings = ({funds = [], matchingHoldings = []}) => {
    useEffect(() => {
        let fundSets = funds.map(
            fund => ({sets: [fund.symbol], size:fund[NUMBER_OF_HOLDINGS]})
        )
        fundSets.push({
            sets: funds.map(fund => fund.symbol),
            size: matchingHoldings.length
        })
        var chart = venn.VennDiagram()
        d3
            .select("#venn")
            .datum(fundSets)
            .call(chart);
    }, []);
    return <Fragment>
        Matching Holdings: {matchingHoldings.length}
        <div id="venn" />
        {matchingHoldings && <TopTen fundHoldings={matchingHoldings} />}
    </Fragment>
}

export default MatchingHoldings;