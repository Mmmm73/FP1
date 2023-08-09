const express = require('express');
const fs = require('fs');
const fileName = 'records.json';
//let rawData = fs.readFileSync(fileName);
//let data = JSON.parse(rawData);

const hbs = require('hbs');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

const { calculateMortgage, storeResult, calculateAverages, getMortgages } = require('./public/js/main');
//app.use(express.urlencoded());

app.set('views', path.join(__dirname)+"/views");
app.set('view engine', 'hbs');
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))



const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


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
    let rawData = fs.readFileSync(fileName);
    let data = JSON.parse(rawData);
//    let datatwo = getMortgages();
    console.log("dataxxxxxxxx", data);
  //  console.log("dataxxxxxxxxtwo", datatwo);
    let {averageMonthlyPayment, averageInterestRateAtEnd, averageAmountAtEnd, averagePrinciple, averageInterestRate, averageLoanTerm} = calculateAverages(data);
    response.render('mortgages', { data: data,  averageMonthlyPayment: averageMonthlyPayment, averageInterestRateAtEnd, averageAmountAtEnd, averagePrinciple, averageInterestRate, averageLoanTerm});
});

app.listen(port);
console.log(`server listening on port ${port}`);


  