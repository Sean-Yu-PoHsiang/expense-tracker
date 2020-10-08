
const categoryData = document.querySelector('#categoryData')
const selectOptions = document.querySelectorAll('.selectOption')
for (let i = 0; i < selectOptions.length; i++) {
  if (selectOptions[i].innerHTML == categoryData.dataset.category) {
    selectOptions[i].outerHTML = `<option class="selectOption" value="${categoryData.dataset.category}|${categoryData.dataset.icon}" selected>${categoryData.dataset.category}</option>`
    break
  }
}