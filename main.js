import "./style.css";
import quoteFiles from "./quotes.txt?raw";

const quotes = quoteFiles.trim().split("\n");
let currentQuoteIndex;

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

const switchQuote = (index) => {
  console.log(index)
  document.querySelector("#quote").innerHTML =
    quotes[index];
  speak();
};

const putQuoteLinkInClipboard = () => {
  const currentUrl = window.location.href.split('?')[0];
  const quoteUrl = `${currentUrl}?q=${currentQuoteIndex}`;
  navigator.clipboard.writeText(quoteUrl).then(() => {
    console.log('Quote link copied to clipboard!');
  }, (err) => {
    console.error('Could not copy quote link to clipboard: ', err);
  });
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: quotes[currentQuoteIndex],
      url: quoteUrl
    })
  }
}

document.querySelector("#switch-quote").addEventListener("click", () => switchQuote(randomQuoteIndex(currentQuoteIndex)));
document.querySelector("#share").addEventListener("click", putQuoteLinkInClipboard);
document.querySelector("#quote").addEventListener("click", speak);

const searchParams = new URLSearchParams(window.location.search);
currentQuoteIndex = !searchParams.has("q") ? randomQuoteIndex(-1) :searchParams.get("q");
switchQuote(currentQuoteIndex);
