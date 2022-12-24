/*document represents current webpage
query selector is a method that references the 1st element in a document that matches the selector
document.querySelector('.class-name')


can either use single or double quotes
document.querySelector('#id-name')


//how to select the quote button
document.querySelector('#js-new-quote')


DOM events:
signals sent by browser when a specific actions takes place on a web page due to user interaction
we set up our programs to listen for these events and do something when they happen



//this variable is a reference to the quote button
const newQuoteButton = document.querySelector('#js-new-quote');

//listening for a click of the quote button so we can get a random quote
//takes at least 2 arguments -  1. what event we're listening for, 2. function that will be evoked
newQuoteButton.addEventListener('click', getQuote);

const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

//async means you can use the await keyword to pause the function while waiting for an operation to complete
//will throw error if you use await anywhere else
async function getQuote() {
    try {
        //fetch takes a single arg and returns a promise
        //promise is the eventual success/failure of an operation
        //await keyword pauses function until the promise is resolved
        //if the request is successful, saves a 200 ok response, if not the request failed
        const response = await fetch(endpoint)
        //checking if this is a 200 ok error
        if (!response.ok) {
            throw Error(response.statusText)
        }
        //response.json reads the response body and parses as JSON
        //json() method returns a promise, so we need to use await
        //if there's an error, the catch block will execute
        const json = await response.json();
        displayQuotes(json.message);
    }  catch (err) {
        console.log(err)  
        alert('Failed to fetch new quote');
    }
} 

//where the quote is displayed to the user
function displayQuotes(quote) {
    const quoteText = document.querySelector('#js-quote-text');
    //we're assigning the button with a textContent property to the quote we want to display
    //so this replaces the quoteText element with a text node with the quote from the API
    quoteText.textContent = quote;
}
*/

const spinner = document.querySelector('#js-spinner');
const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);

const endpoint = "https://api.quotable.io/random";

async function getQuote() {

  spinner.classList.remove('hidden');
  newQuoteButton.disabled = true;
  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw Error(response.statusText)
    }
    const json = await response.json();
    displayQuote(json.message);
  } catch (err) {
    console.log(err)
    alert('Failed to fetch new quote');
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add('hidden');
  }
}

//don't think this is working properly
function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}