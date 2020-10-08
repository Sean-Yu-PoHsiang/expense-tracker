const totalAmount = document.querySelector('.totalAmount')
const amounts = document.querySelectorAll('.amount')

let total = 0
amounts.forEach(amount => total += Number(amount.innerText))

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

totalAmount.innerText = numberWithCommas(total)