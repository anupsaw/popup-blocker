console.log('Anup Saw, I have beeb loaded successfully !!!');

// chrome.runtime.onInstalled.addListener(function () {
//     chrome.storage.sync.set({ color: '#3aa757' }, function () {
//         console.log("The color is green.");
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: { urlContains: '.com' }
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });

function hasMatch(url, id) {
    chrome.storage.sync.get('szUrlList', function (data) {
        console.log('Url List', data);
        const urlList = data.szUrlList && JSON.parse(data.szUrlList);
        let isMatched = false;
        urlList && urlList.forEach(urlItem => {
            isMatched = isMatched || url && url.indexOf(urlItem) > -1;
        });

        if (urlList && urlList.indexOf(url) > -1) {
            parentTab.ids.push(id);
        }
        console.log(parentTab, 'black list url');
    });
}

let parentTab = { ids: [] };

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    // console.log(tab, changeInfo, tab);
    //https://fmovies.wtf/

    changeInfo && changeInfo.url && hasMatch(changeInfo.url, tab.id);

    // if (changeInfo && changeInfo.url) {

    //     console.log('on Update Tab Id Updated to : ', parentTab, parentTab.ids);

    //     chrome.storage.sync.get('szUrlList', function (data) {
    //         console.log('Url List', data);
    //         const urlList = data.szUrlList && JSON.parse(data.szUrlList);
    //         if (urlList.indexOf(changeInfo.url) > -1) {
    //             parentTab.ids.push(tab.id);
    //         }
    //     });
    // }



});

chrome.tabs.onCreated.addListener(function (tab) {

    if (tab && tab.pendingUrl === 'chrome://newtab/' && tab.title === 'New Tab') {
        return;
    }
    tab.pendingUrl && hasMatch(tab.pendingUrl);
    // if (tab.pendingUrl) {
    //     console.log('on Update Tab Id Updated to : ', parentTab, parentTab.ids);
    //     chrome.storage.sync.get('szUrlList', function (data) {
    //         console.log('Url List', data);
    //         const urlList = data.szUrlList && JSON.parse(data.szUrlList);
    //         if (urlList.indexOf(tab.pendingUrl) > -1) {
    //             parentTab.ids.push(tab.id);
    //         }
    //     });
    // }
    if (parentTab && parentTab.ids && parentTab.ids.indexOf(tab.openerTabId) > -1) {
        chrome.tabs.remove(tab.id);
    }
    // chrome.tabs.query({ currentWindow: true }, function (tabs) {
    //     console.log('my new tabs', tabs);
    //     // const deleteId = tabs.length - 1;
    //     // console.log('removed tabs', tabs[deleteId].id, tabs[deleteId]);
    //     // chrome.tabs.remove(tabs[deleteId].id);
    // });
    // console.log('new tab created', tab);
    // chrome.tabs.remove(tab.id);
})
// chrome.browserAction.onClicked.addListener(function (tab) {
//     // console.log(chrome.windows.tabs);
//     chrome.tabs.query({ currentWindow: true }, function (tabs) {
//         console.log('my new tabs', tabs);
//         const deleteId = tabs.length - 1;
//         console.log('removed tabs', tabs[deleteId].id, tabs[deleteId]);
//         chrome.tabs.remove(tabs[deleteId].id);
//     })
//     chrome.tabs.executeScript(
//         tab.id,
//         { code: 'console.log("called")' });
// });
// console.log(chrome.tabs);
// console.log(chrome);
// chrome.tabs.getCurrent((tab) => console.log(tab))