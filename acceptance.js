//const puppeteer = require('puppeteer');
const {remote} = require('webdriverio');
const assert = require('assert');

let browser;
let browserTwo;


(async ()  => {
    try{
    browser =  await remote({
        capabilities: {browserName:  'edge'}
    });

    await browser.navigateTo('http://localhost:3000');

    const principleinput = await browser.$('#principle');
    await principleinput.setValue('200000');

    const interestrateinput = await browser.$('#interestrate');
    await interestrateinput.setValue('5');

    const loanterminput = await browser.$('#loanterm');
    await loanterminput.setValue('30');

    const submitbutton = await browser.$('#submit-button');
    await submitbutton.click();

    let monthlypaymentdisplay = await browser.$('#monthly-payment-display');
    await monthlypaymentdisplay.waitForDisplayed(3000);
    const monthlypaymentdisplaytext = await monthlypaymentdisplay.getText();

    let principledisplay = await browser.$('#principle-display');
    await principledisplay.waitForDisplayed(3000);
    const principledisplaytext = await principledisplay.getText();

    let interestratedisplay = await browser.$('#interest-rate-display');
    await interestratedisplay.waitForDisplayed(3000);
    const interestratedisplaytext = await interestratedisplay.getText();

    let loantermdisplay = await browser.$('#loan-term-display');
    await loantermdisplay.waitForDisplayed(3000);
    const loantermdisplaytext = await loantermdisplay.getText();

    let totalamountdisplay = await browser.$('#total-amount-display');
    await totalamountdisplay.waitForDisplayed(3000);
    const totalamountdisplaytext = await totalamountdisplay.getText();

    let totalinterestdisplay = await browser.$('#total-interest-display');
    await totalinterestdisplay.waitForDisplayed(3000);
    const totalinterestdisplaytext = await totalinterestdisplay.getText();

    console.log("monthlyPaymentdisplaytext:", monthlypaymentdisplaytext);
    console.log("principledisplaytext:", principledisplaytext);
    console.log("interestratedisplaytext:", interestratedisplaytext);
    console.log("loantermdisplaytext:", loantermdisplaytext);
    console.log("totalamountdisplaytext:", totalamountdisplaytext);
    console.log("totalinterestdisplaytext:", totalinterestdisplaytext);

    assert(monthlypaymentdisplaytext.includes('Monthly Payment: 1073.64'));
    assert(principledisplaytext.includes('Principle: 200000'));
    assert(interestratedisplaytext.includes('Interest Rate: 5'));
    assert(loantermdisplaytext.includes('Loan term: 30'));
    assert(totalamountdisplaytext.includes('Total Amount(at the end): 586510.4'));
    assert(totalinterestdisplaytext.includes('Total Interest(at the end): 386510.4'));

} catch(err){
    console.log(err);
}finally{
    if(browser){
        await browser.deleteSession();
    }
}
})();


(async ()  => {
    try{
    browserTwo =  await remote({
        capabilities: {browserName:  'edge'}
    });

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

    await browserTwo.navigateTo('http://localhost:3000/mortgages');


    const mortgageRows = await browserTwo.$$('tbody tr');
    const mortgageData = [];

    for (const row of mortgageRows) {
        const columns = await row.$$('td');
        const principle = await columns[0].getText();
        const interestRate = await columns[1].getText();
        const loanTerm = await columns[2].getText();
        const monthlyPayment = await columns[3].getText();
        const totalInterest = await columns[4].getText();
        const totalAmount = await columns[5].getText();

        totalMonthlyPayment += parseFloat(monthlyPayment);
        totalInterestRateAtEnd += parseFloat(totalInterest);
        totalAmountAtEnd += parseFloat(totalAmount);
        totalPrinciple += parseFloat(principle);
        totalInterestRate += parseFloat(interestRate);
        totalLoanTerm += parseFloat(loanTerm);
  
        mortgageData.push({
          principle,
          interestRate,
          loanTerm,
          monthlyPayment,
          totalInterest,
          totalAmount,
        });
      }


      const averagePrincipleDisplay = await browserTwo.$('#average-principle-display');
      await averagePrincipleDisplay.waitForDisplayed(3000);
      const averagePrincipleDisplaytext = await averagePrincipleDisplay.getText();


      const averageInterestRateDisplay = await browserTwo.$('#average-interest-rate-display');
      await averageInterestRateDisplay.waitForDisplayed(3000);
      const averageInterestRateDisplaytext = await averageInterestRateDisplay.getText();

      const averageLoanTermDisplay = await browserTwo.$('#average-long-term-display');
      await averageLoanTermDisplay.waitForDisplayed(3000);
      const averageLoanTermDisplaytext = await averageLoanTermDisplay.getText();

      const averageMonthlyPaymentDisplay = await browserTwo.$('#average-monthly-payment-display');
      await averageMonthlyPaymentDisplay.waitForDisplayed(3000);
      const averageMonthlyPaymentDisplaytext = await averageMonthlyPaymentDisplay.getText();

      const averageInterestRateAtEndDisplay = await browserTwo.$('#average-interest-at-the-end-display');
      await averageInterestRateAtEndDisplay.waitForDisplayed(3000);
      const averageInterestRateAtEndDisplaytext = await averageInterestRateAtEndDisplay.getText();

      const averageAmountAtEndDisplay = await browserTwo.$('#average-amount-at-the-end-display');
      await averageAmountAtEndDisplay.waitForDisplayed(3000);
      const averageAmountAtEndDisplaytext = await averageAmountAtEndDisplay.getText();

      console.log("mortgageDataxxxxxxxxxxxxx", mortgageData);
      console.log("totalMonthlyPayment xxxxxxxxxxxxx", totalMonthlyPayment);
      console.log("totalInterestRateAtEnd xxxxxxxxxxxxx", totalInterestRateAtEnd);
      console.log("totalAmountAtEnd xxxxxxxxxxxxx", totalAmountAtEnd);
      console.log("totalPrinciple xxxxxxxxxxxxx", totalPrinciple);
      console.log("totalInterestRate xxxxxxxxxxxxx", totalInterestRate);
      console.log("totalLoanTerm xxxxxxxxxxxxx", totalLoanTerm);

      averageMonthlyPayment = (totalMonthlyPayment / mortgageData.length).toFixed(2);
      averageInterestRateAtEnd = (totalInterestRateAtEnd / mortgageData.length).toFixed(2);
      averageAmountAtEnd = (totalAmountAtEnd / mortgageData.length).toFixed(2);
      averagePrinciple = (totalPrinciple / mortgageData.length).toFixed(2);
      averageInterestRate = totalInterestRate / mortgageData.length;
      averageLoanTerm = totalLoanTerm / mortgageData.length;


      console.log("averageMonthlyPayment xxxxxxxxxxxxx", averageMonthlyPayment);
      console.log("averageInterestRateAtEnd xxxxxxxxxxxxx", averageInterestRateAtEnd);
      console.log("averageAmountAtEnd xxxxxxxxxxxxx", averageAmountAtEnd);
      console.log("averagePrinciple xxxxxxxxxxxxx", averagePrinciple);
      console.log("averageInterestRate xxxxxxxxxxxxx", averageInterestRate);
      console.log("averageLoanTerm xxxxxxxxxxxxx", averageLoanTerm);

      console.log("averagePrincipleDisplaytext xxxxxxxxxxxxx", averagePrincipleDisplaytext);
      console.log("averageInterestRateDisplaytext xxxxxxxxxxxxx", averageInterestRateDisplaytext);
      console.log("averageLoanTermDisplaytext xxxxxxxxxxxxx", averageLoanTermDisplaytext);
      console.log("averageMonthlyPaymentDisplaytext xxxxxxxxxxxxx", averageMonthlyPaymentDisplaytext);
      console.log("averageInterestRateAtEndDisplaytext xxxxxxxxxxxxx", averageInterestRateAtEndDisplaytext);
      console.log("averageAmountAtEndDisplaytext xxxxxxxxxxxxx", averageAmountAtEndDisplaytext);

      assert(averagePrincipleDisplaytext === 'Average principle: '+averagePrinciple);
      assert(averageInterestRateDisplaytext === 'Average interest rate: '+averageInterestRate);
      assert(averageLoanTermDisplaytext === 'Average long term: '+averageLoanTerm);
      assert(averageMonthlyPaymentDisplaytext === 'Average monthly payment: '+averageMonthlyPayment);
      assert(averageInterestRateAtEndDisplaytext === 'Average total interest payment: '+averageInterestRateAtEnd);
      assert(averageAmountAtEndDisplaytext === 'Average total amount: '+averageAmountAtEnd);


} catch(err){
    console.log(err);
}finally{
    if(browser){
        await browserTwo.deleteSession();
    }
}
})();