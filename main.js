import "./style.css";
import quoteFiles from "./quotes.txt?raw";

const quotes = quoteFiles.trim().split("\n");
let currentQuoteIndex = null;

const randomQuoteIndex = () => {
  let index = Math.floor(Math.random() * quotes.length);
  while (index === currentQuoteIndex) {
    index = Math.floor(Math.random() * quotes.length);
  }
  currentQuoteIndex = index;
  return index;
};

const speak = () => {
  const text = document.querySelector("#quote").innerHTML;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

const switchQuote = () => {
  document.querySelector("#quote").innerHTML =
    quotes[randomQuoteIndex(currentQuoteIndex)];
  speak();
};

document.querySelector("#switch-quote").addEventListener("click", switchQuote);
document.querySelector("#quote").addEventListener("click", speak);

switchQuote();
