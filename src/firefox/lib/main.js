const data = require("sdk/self").data;
const tabs = require("sdk/tabs");
const { ToggleButton } = require("sdk/ui/button/toggle");
var btn_config = {};
var btn;

function tabToggle(tab) {
  if (btn.state('window').checked) {
    tab.attach({
      contentScriptFile: data.url('embed.js')
    });
  } else {
    tab.attach({
      contentScript: [
        'var s = document.createElement("script");',
        's.setAttribute("src", "' + data.url('destroy.js') + '");',
        'document.body.appendChild(s);'
      ]
    });
  }
}

btn_config = {
  id: "hypothesis",
  label: "Annotate",
  icon: {
    "18": './images/sleeping_18.png',
    "32": './images/sleeping_32.png',
    "36": './images/sleeping_36.png',
    "64": './images/sleeping_64.png'
  },
  onClick: function(state) {
    tabToggle(tabs.activeTab)
  }
};

if (undefined === ToggleButton) {
  btn = require("sdk/widget").Widget(btn_config);
} else {
  btn = ToggleButton(btn_config);
}

tabs.on('pageshow', tabToggle);