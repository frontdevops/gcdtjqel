//$.cache[ $('#UploadBtnEmpty')[0][$.expando] ].events.click[0].handler
var page_getProperties = function() {
    var jq = window.jQuery;
    var data = jq && $0 ? jq.cache[ jq($0)[0][jq.expando] ].events : {};
    //var data = jq && $0 ? jq._data($0, "events") : {};
    var props = Object.getOwnPropertyNames(data);
    var copy = { __proto__: null };

    for (var i=0,l=props.length; i<l; i++) {
        //if (!copy[props[i]]) copy[props[i]] = { __proto__: null };
        for (var i1=0,l1=data[props[i]].length; i1<l1; i1++) {
            copy[props[i]+'('+i1+')'] = data[props[i]][i1].handler.toString().replace(/\s+/g,' ').trim().substr(12);
        }
    }

    return copy;
};
/*
function page_initProperties(){
    window.chromeDevToolsSrcBuffer = [];
    var jq = window.jQuery;
    var srclist = document.querySelectorAll('script[src]');

    for (var k in srclist){
        jq.ajax({
            url: srclist[k].src,
            success: function(result) {
                window.chromeDevToolsSrcBuffer.push({
                    path: srclist[k].src,
                    data: result
                })
            },
            async: false
        });
    }
}
*/

chrome.devtools.panels.elements.createSidebarPane(
    "JQuery Callback Events",
    function(sidebar) {
        function updateElementProperties() {
            sidebar.setExpression("(" + page_getProperties.toString() + ")()");
        }

//        function initElementProperties() {
//            sidebar.setExpression("(" + page_initProperties.toString() + ")()");
//        }
        updateElementProperties();

//        chrome.devtools.panels.elements.onShown.addListener(initElementProperties);
        chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
    }
);
