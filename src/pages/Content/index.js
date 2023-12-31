import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


// Remove all like, comment, retweet, and view counts from Twitter/X
function removeTweetStats() {
    console.log("hi");
    document
        .querySelectorAll('.css-175oi2r.r-xoduu5.r-1udh08x')
        .forEach((element) => element.remove())
}
setInterval(removeTweetStats, 1000);


