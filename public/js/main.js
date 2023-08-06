const { json } = require('express');
const fs = require('fs');
const fileName = 'records.json';
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

function calculateMortgage(principle, interestrate, loanterm){
    var r = (parseFloat(interestrate)/100)/12;
    var n = 12 * loanterm;
    console.log("r", r);
    console.log("n", n);

    var numerator = r *((1 + r)**n);
    console.log("numerator", numerator);
    var denominator = ((1+ r)**n)-1;
    console.log("denominator", denominator);

    var monthlypayment = (principle * (numerator/denominator)).toFixed(2);
    console.log("monthlypayment", monthlypayment);

    var totalInterestRateAtEnd = monthlypayment * n;
    console.log("totalInterestRateAtEnd", totalInterestRateAtEnd);

    var totalAmountAtEnd = parseFloat(principle) + parseFloat(totalInterestRateAtEnd);
    console.log("totalAmountAtEnd", totalAmountAtEnd);
    
    return {monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd};
}

function storeResult(monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd, principle, interestrate, loanterm){
    console.log("monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd, principle, interestrate, loanterm", monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd, principle, interestrate, loanterm);
    const record = {monthlypayment: monthlypayment, totalInterestRateAtEnd:totalInterestRateAtEnd, totalAmountAtEnd:totalAmountAtEnd, principle:principle, interestrate:interestrate, loanterm:loanterm};
    console.log("record:", record);
    data.push(record);
    fs.writeFileSync(fileName, JSON.stringify(data));
    return "successful";
}

function getMortgages(){
    return data;
}

function calculateAverages(){
    let totalMonthlyPayment = 0;
    let totalInterestRateAtEnd = 0;
    let totalAmountAtEnd = 0;
    let totalPrinciple = 0;
    let totalInterestRate = 0;
    let totalLoanTerm = 0;

    let averageMonthlyPayment = 0;
    let averageInterestRateAtEnd = 0;
    let averageAmountAtEnd = 0;
    let averagePrinciple = 0;
    let averageInterestRate = 0;
    let averageLoanTerm = 0;


    if(data.length > 0){
        for(let i = 0; i < data.length; i++){
            totalMonthlyPayment += parseFloat(data[i].monthlypayment);
            totalInterestRateAtEnd += parseFloat(data[i].totalInterestRateAtEnd);
            totalAmountAtEnd += parseFloat(data[i].totalAmountAtEnd);
            totalPrinciple += parseFloat(data[i].principle);
            totalInterestRate += parseFloat(data[i].interestrate);
            totalLoanTerm += parseFloat(data[i].loanterm);
        }
    
        // Calculate the averages
        averageMonthlyPayment = (totalMonthlyPayment / data.length).toFixed(2);
        averageInterestRateAtEnd = (totalInterestRateAtEnd / data.length).toFixed(2);
        averageAmountAtEnd = (totalAmountAtEnd / data.length).toFixed(2);
        averagePrinciple = (totalPrinciple / data.length).toFixed(2);
        averageInterestRate = totalInterestRate / data.length;
        averageLoanTerm = totalLoanTerm / data.length;

    }

    console.log("Average Monthly Payment:", averageMonthlyPayment);
    console.log("Average Interest Rate At End:", averageInterestRateAtEnd);
    console.log("Average Amount At End:", averageAmountAtEnd);
    console.log("Average Principle:", averagePrinciple);
    console.log("Average Interest Rate:", averageInterestRate);
    console.log("Average Loan Term:", averageLoanTerm);

    return {averageMonthlyPayment, averageInterestRateAtEnd, averageAmountAtEnd, averagePrinciple, averageInterestRate, averageLoanTerm};
    
}

module.exports = {calculateMortgage, storeResult, getMortgages, calculateAverages};