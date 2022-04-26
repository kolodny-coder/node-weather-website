// const { response } = require("express");

// const { response } = require("express");

console.log("Client side javascript is loaded");



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')



addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    messageOne.textContent = 'Loading ...'


    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo = ''
        }
        else {

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        }
    })
})
})