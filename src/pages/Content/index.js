import { remove } from 'fs-extra';
import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


// Remove all like, comment, retweet, and view counts from Twitter/X

let targetNode;

let intervalId = setInterval(() => {
    targetNode = document.querySelector(".css-175oi2r.r-1jgb5lz.r-13qz1uu.r-1ye8kvj");
    if (targetNode) {
        clearInterval(intervalId);
        initMutationObserver();
    }
}, 1000);

function initMutationObserver() {
    console.log(targetNode);
    const config = { attributes: true, childList: true, subtree: true };
    function removeTweetStats(mutationList, observer) {
        console.log("hi");
        document
            .querySelectorAll('.css-175oi2r.r-xoduu5.r-1udh08x')
            .forEach((element) => element.remove())
    };

    const observer = new MutationObserver(removeTweetStats)
    observer.observe(targetNode, config);
}
