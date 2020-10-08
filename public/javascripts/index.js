//function of adding commas to 
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const totalAmount = document.querySelector('.totalAmount')
const amounts = document.querySelectorAll('.amount')

//adding all record's amount
let total = 0
amounts.forEach(amount => total += Number(amount.innerText))

//add commas to total amount
totalAmount.innerText = numberWithCommas(total)

//add commas to all record's amount
amounts.forEach(amount => {
  amount.innerText = numberWithCommas(amount.innerText)
})