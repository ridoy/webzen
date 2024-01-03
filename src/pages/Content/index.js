import { youtube } from './modules/youtube';
import { twitter } from './modules/twitter';

console.log('webzen content script has loaded.');

const HOME_TIMELINE_SELECTOR = '.css-175oi2r.r-1jgb5lz.r-13qz1uu.r-1ye8kvj';
const USER_TIMELINE_SELECTOR = '.css-175oi2r.r-16y2uox.r-1wbh5a2.r-1habvwh';
const TRENDING_SELECTOR = '.css-175oi2r.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x.r-g2wdr4.r-14wv3jr';
const TWEET_STATS_SELECTOR = '.css-175oi2r.r-xoduu5.r-1udh08x';
const RELATED_VIDEOS_SELECTOR = "#related";
const MAX_RETRY_COUNT = 100; // 100s

waitForElementsCreation(HOME_TIMELINE_SELECTOR)
    .then((homeTimelineNode) => {
        observeAndRemoveChildElements(homeTimelineNode[0], TWEET_STATS_SELECTOR);
    })
    .catch((err) => {
        console.log(err);
    })

waitForElementsCreation(USER_TIMELINE_SELECTOR)
    .then((userTimelineNode) => {
        observeAndRemoveChildElements(userTimelineNode[0], TWEET_STATS_SELECTOR);
    })
    .catch((err) => {
        console.log(err);
    });

waitForElementsCreation(TRENDING_SELECTOR)
    .then((trendingNode) => {
        trendingNode.forEach(node => node.remove());
    })
    .catch((err) => {
        console.log(err);
    });

waitForElementsCreation(RELATED_VIDEOS_SELECTOR)
    .then((relatedVideosNode) => {
        relatedVideosNode.forEach(node => node.remove());
    })
    .catch((err) => {
        console.log(err);
    });

function waitForElementsCreation(selector) {
    return new Promise((resolve, reject) => {
        let retryCount = 0;
        let intervalId = setInterval(() => {
            let elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                clearInterval(intervalId);
                resolve(elements);
            }
            retryCount++;
            if (retryCount > MAX_RETRY_COUNT) {
                reject(`No element at ${selector} was found.`);
            }
        }, 1000);
    });
}

// TODO better name
function observeAndRemoveChildElements(parentNode, childElementSelector) {
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(() => {
        document.querySelectorAll(childElementSelector)
            .forEach((element) => element.remove());
    })
    observer.observe(parentNode, config);
}
