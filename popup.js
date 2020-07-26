let szAddSiteBtn = document.getElementById('szAddSiteBtn');
let szClearSiteBtn = document.getElementById('szClearSiteBtn');

console.log('Pop up loaded');

let szUrl = { list: [] };
chrome.storage.sync.get('szUrlList', function (data) {
    console.log('Url List', data);
    szUrl.list = data.szUrlList && JSON.parse(data.szUrlList);
});

szAddSiteBtn.onclick = function (element) {
    const siteUrl = document.getElementById('szAddSiteInput').value;
    console.log(siteUrl);
    if (!szUrl.list) {
        szUrl.list = [];
    }
    szUrl.list.push(siteUrl);
    console.log(szUrl.list);
    chrome.storage.sync.set({ szUrlList: JSON.stringify(szUrl.list) })
};

szClearSiteBtn.onclick = function (element) {

    console.log(chrome.storage.sync);
    chrome.storage.sync.remove('szUrlList', function (data) {
        console.log('All removed');
    })
    // chrome.storage.sync.get('szUrlList', function (data) {
    //     console.log('Url List', data);
    //     szUrl.list = data.szUrlList && JSON.parse(data.szUrlList);
    // });

}

