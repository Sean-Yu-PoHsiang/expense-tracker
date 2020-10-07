const totalAmount = document.querySelector('.totalAmount')
const amounts = document.querySelectorAll('.amount')

let total = 0
amounts.forEach(amount => total += Number(amount.innerText))

totalAmount.innerText = total