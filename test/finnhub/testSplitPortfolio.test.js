import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import {splitPortfolio} from "../../FinnHub/utils";

const AAPL = 'AAPL';
const MSFT = 'MSFT';
const VOO = 'VOO';
const VTI = 'VTI';
const VEU = 'VEU';
const AGG = 'AGG';

test('splitPortfolio -- edges',() => {
    expect(splitPortfolio()).toEqual([]);
    expect(splitPortfolio(1)).toEqual([]);
    expect(splitPortfolio(-1, -1)).toEqual([]);
    expect(splitPortfolio(',')).toEqual([]);
})

test('splitPortfolio -- commas',() => {
    expect(splitPortfolio(AAPL)).toEqual([AAPL]);
    expect(splitPortfolio(AAPL+', '+MSFT)).toEqual([AAPL, MSFT]);
    expect(splitPortfolio(','+AAPL+', '+MSFT+',')).toEqual([AAPL, MSFT]);
    expect(splitPortfolio(AAPL+', '+MSFT+' ,  ,'+AGG)).toEqual([AAPL, MSFT, AGG]);
})

test('splitPortfolio -- spaces',() => {
    expect(splitPortfolio(VTI)).toEqual([VTI]);
    expect(splitPortfolio(AAPL+' '+MSFT)).toEqual([AAPL, MSFT]);
    expect(splitPortfolio('    '+AAPL+'    '+MSFT+'   ')).toEqual([AAPL, MSFT]);
    expect(splitPortfolio(AAPL+' '+MSFT+'   '+AGG)).toEqual([AAPL, MSFT, AGG]);
})
