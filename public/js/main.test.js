const fs = require('fs');
const { calculateMortgage, storeResult, calculateAverages } = require('./main');

test.each([
    [100000, 6.5, 30, 632.07, 227545.2, 327545.2],[50000, 17, 15, 769.5, 138510, 188510], [0, 2, 30, 0, 0 , 0]
])(
    'Calculate Mortgate using %i(principle), %i(interest rate), %i(loan term) = %i (monthly payments), %i(total interest), i%(total amount)', (a, b, c, d, e, f) =>{
        const result = calculateMortgage(a, b, c);
        expect(parseFloat(result.monthlypayment)).toBe(d);
        expect(parseFloat(result.totalInterestRateAtEnd)).toBe(e);
        expect(parseFloat(result.totalAmountAtEnd)).toBe(f);
    },
);

test.each([[632.07, 227545.2, 327545.2, 100000, 6.5, 30],[769.5, 138510, 188510, 50000, 17, 15]])(
    'check if mortgage data(%i, %i, %i, %i, %i, %i ) is stored in JSON', (a, b, c, d, e, f) =>{
        const result = storeResult(a, b, c, d, e);
        expect(result).toBe("successful");

    },
);

test.each([
    {
        data: [{monthlypayment: '632.07', totalInterestRateAtEnd: 227545.2, totalAmountAtEnd: 327545.2, principle: '100000', interestrate: '6.5', loanterm: '30'},
        {monthlypayment: '732.08', totalInterestRateAtEnd: 327545.2, totalAmountAtEnd: 427545.2, principle: '200000', interestrate: '7.5', loanterm: '40'}], 

        expecteddata: [
            {
                averageMonthlyPayment: 682.08,
                averageInterestRateAtEnd: 277545.20,
                averageAmountAtEnd: 377545.20,
                averagePrinciple: 150000.00,
                averageInterestRate: 7,
                averageLoanTerm: 35
            }],
    }])(
    'calculate average of different mortgage metrics- monthly payment, total interest, total amount, principle, interestrate, loan term.', ({data, expecteddata}) =>{
        const result = calculateAverages(data);
        expect(parseFloat(result.averageMonthlyPayment)).toBe(expecteddata[0].averageMonthlyPayment);
        expect(parseFloat(result.averageInterestRateAtEnd)).toBe(expecteddata[0].averageInterestRateAtEnd);
        expect(parseFloat(result.averageAmountAtEnd)).toBe(expecteddata[0].averageAmountAtEnd);
        expect(parseFloat(result.averagePrinciple)).toBe(expecteddata[0].averagePrinciple);
        expect(parseFloat(result.averageInterestRate)).toBe(expecteddata[0].averageInterestRate);
        expect(parseFloat(result.averageLoanTerm)).toBe(expecteddata[0].averageLoanTerm);      
    },
);




