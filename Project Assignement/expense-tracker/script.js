const balance = document.getElementById('balance');
const incomes = document.getElementById('money-plus');
const expens = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyData = [
//   {id:1 , text:'tea', amount :30},
//   {id:2 , text:'water', amount :90},
//   {id:3 , text:'burgur', amount :100},
//   {id:4 , text:'coffe', amount :120}
// ]

const localStorageTransactions = JSON.parse(

);

let transactions =localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function generateId(){
  // Youre code 
}


function addTransaction(e){
  // your code 

  
}

function addTransactionDOM(transaction){
  // your code
}

function updatevalues(){
  // your code
}

function updateLocalStorage(){
  // your code
}

function removeTransaction(id){
//  your code
}

function init(){
  // your code 
}

// add event Listener