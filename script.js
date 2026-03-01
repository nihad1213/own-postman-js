import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios'

const form = document.querySelector('[data-form]')

const queryParamsContainer = document.querySelector('[data-add-query-params]')
const requestHeadersContainer = document.querySelector('[data-add-request-headers]')
const keyValueTemplate = document.querySelector('[data-key-value-template]')

document.querySelector('[data-add-query-param-btn]')
  .addEventListener('click', () => {
      queryParamsContainer.append(createKeyValuePair())
})

document.querySelector('[data-add-request-header-btn]')
  .addEventListener('click', () => {
      requestHeadersContainer.append(createKeyValuePair())
})

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

form.addEventListener('submit', e => {
    e.preventDefault()

    axios({
        url: form.querySelector('[data-url]').value,
        method: form.querySelector('[data-method]').value,
        params: keyValuePairsTooObjects(queryParamsContainer),
        headers: keyValuePairsTooObjects(requestHeadersContainer)
    }).then(response => {
        console.log(response)
    })
})

function createKeyValuePair() {
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector('[data-remove-btn]')
      .addEventListener('click', (e) => {
          e.target.closest('[data-key-value-pair]').remove()
      })
    return element
}

function keyValuePairsTooObjects(container) {
    const pairs = container.querySelectorAll('[data-key-value-pair]')
    return [...pairs].reduce((data, pair) => {
        const key = pair.querySelector('[data-key]').value
        const value = pair.querySelector('[data-value]').value

        if (key) {
            data[key] = value
        }
        return data
    }, {}) 
}