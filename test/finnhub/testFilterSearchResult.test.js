import {
    AMC_SEARCH_RESULT,
    getSearchMap, MOCK_SEARCH,
    MULTI_SEARCH_MAPPING,
    MULTI_SEARCH_RESULT,
    VTI_SEARCH_RESULT
} from "./mockSearchData";
import {filterSearchResults} from "../../FinnHub/utils";

test('filterSearchResults returns expected result -- edge cases', () => {
    expect(filterSearchResults()).toEqual([])
    expect(filterSearchResults({}, [])).toEqual([])
    expect(filterSearchResults({'foo': false}, [{bar: true}])).toEqual([])
})

test('filterSearchResults returns expected result -- single query', () => {
    const AMC = 'amc'
    expect(filterSearchResults(getSearchMap(AMC), AMC_SEARCH_RESULT)).toEqual(
        [{
            "description": "AMC ENTERTAINMENT HLDS-CL A",
            "displaySymbol": "AMC",
            "symbol": "AMC",
            "type": "Common Stock"
        }]
    )
})


test('filterSearchResults returns expected result -- multi query', () => {
    const stuff = filterSearchResults(MULTI_SEARCH_MAPPING, MULTI_SEARCH_RESULT);
    expect(stuff).toEqual(
        [
            {
                "description": "VISA INC-CLASS A SHARES",
                "displaySymbol": "V",
                "symbol": "V",
                "type": "Common Stock"
            },
            {
                "description": "VANGUARD TOT WORLD STK ETF",
                "displaySymbol": "VT",
                "symbol": "VT",
                "type": "ETP"
            }
        ]
    )
})
test('filterSearchResults returns expected result -- multi query', () => {
    const stuff = filterSearchResults(MOCK_SEARCH.searchPathMap, MOCK_SEARCH.searchResults);
    expect(stuff).toEqual(
        [
            {
                "description": "VANGUARD S&P 500 ETF",
                "displaySymbol": "VOO",
                "symbol": "VOO",
                "type": "ETP"
            },
            {
                "description": "VANGUARD TOTAL STOCK MKT ETF",
                "displaySymbol": "VTI",
                "symbol": "VTI",
                "type": "ETP"
            }
        ]
    )
})
