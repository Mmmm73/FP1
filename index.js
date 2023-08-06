const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const { calculateMortgage, storeResult, getMortgages, calculateAverages } = require('./public/js/main');
//app.use(express.urlencoded());

app.set('views', path.join(__dirname)+"/views");
app.set('view engine', 'hbs');
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))



const bodyParser = require('body-parser');
const fs = require('fs');
const jsonParser = bodyParser.json();
const fileName = 'records.json';

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);


app.get('/', function(request, response){
    response.render('home');
});

app.post('/', (request, response) => {
    const { principle, interestrate,  loanterm, startmonth} = request.body;
    console.log("bmiData", principle, interestrate, loanterm, startmonth);
    const {monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd} = calculateMortgage(principle, interestrate, loanterm);
    let result = storeResult(monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd, principle, interestrate, loanterm);
    console.log("result", result);
    if(result == "successful"){
        response.render('home', {monthlypayment, totalInterestRateAtEnd, totalAmountAtEnd, principle, interestrate, loanterm});
    }
});

app.get('/mortgages', function(request, response){
    let data = getMortgages();
    let {averageMonthlyPayment, averageInterestRateAtEnd, averageAmountAtEnd, averagePrinciple, averageInterestRate, averageLoanTerm} = calculateAverages();
    response.render('mortgages', { data: data,  averageMonthlyPayment: averageMonthlyPayment, averageInterestRateAtEnd, averageAmountAtEnd, averagePrinciple, averageInterestRate, averageLoanTerm});
});

app.listen(port);
console.log(`server listening on port ${port}`);


  