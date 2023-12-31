import { printLine } from './modules/print';
import { youtube } from './modules/youtube';
import { twitter } from './modules/twitter';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


// Remove all like, comment, retweet, and view counts from Twitter/X

let homeTimelineNode;
let userTimelineNode;
const HOME_TIMELINE_SELECTOR = '.css-175oi2r.r-1jgb5lz.r-13qz1uu.r-1ye8kvj';
const USER_TIMELINE_SELECTOR = '.css-175oi2r.r-16y2uox.r-1wbh5a2.r-1habvwh';
const TWEET_STATS_SELECTOR = '.css-175oi2r.r-xoduu5.r-1udh08x';

waitForElementCreationAndRemoveTweetStats(HOME_TIMELINE_SELECTOR);
waitForElementCreationAndRemoveTweetStats(USER_TIMELINE_SELECTOR);

function waitForElementCreationAndRemoveTweetStats(selector) {
    let intervalId = setInterval(() => {
        let targetNode = document.querySelector(selector);
        if (targetNode) {
            clearInterval(intervalId);
            initMutationObserver(TWEET_STATS_SELECTOR, targetNode);
        }
    }, 1000);
}

function initMutationObserver(selector, targetNode) {
    const config = { attributes: true, childList: true, subtree: true };
    function removeTweetStats() {
        document
            .querySelectorAll(selector)
            .forEach((element) => element.remove())
    };

    const observer = new MutationObserver(removeTweetStats)
    observer.observe(targetNode, config);
}


// Remove related section from YouTube
if (window.location.href.indexOf("youtube.com") !== -1) {
    const relatedVids = document.getElementById('related');
    if (relatedVids) relatedVids.remove()
}