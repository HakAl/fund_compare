import React from "react";
import {Pie} from "react-chartjs-2";
import {Fragment} from "react";
import {round} from "mathjs";

const TopTen = ({fundHoldings = []}) => {
    const sorted = fundHoldings
            .sort((firstEl, secondEl) => firstEl.percent > secondEl.percent)
    const topTen = sorted.slice(0,10);
    const data = {
        labels: topTen.map(fund => fund.symbol),
        datasets: [{
            data: topTen.map(fund => fund.percent),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(128, 0, 0, 0.2)',
                'rgba(128, 128, 0, 0.2)',
                'rgba(128, 0, 128, 0.2)',
                'rgba(0, 128, 0, 0.2)',
            ],
        }]
    };
    return <Fragment>
        Top Ten:
        <ol>
            {topTen.map(holding => <li key={holding.symbol}>{holding.symbol+' '+round(holding.percent, 3)}%</li>)}
        </ol>
        {/*<Pie data={data} />*/}
    </Fragment>
}

export default TopTen;