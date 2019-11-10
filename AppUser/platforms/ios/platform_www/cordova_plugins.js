cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "ionic-plugin-keyboard.keyboard",
      "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
      "pluginId": "ionic-plugin-keyboard",
      "clobbers": [
        "cordova.plugins.Keyboard"
      ],
      "runs": true
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-ionic-webview.ios-wkwebview-exec",
      "file": "plugins/cordova-plugin-ionic-webview/src/www/ios/ios-wkwebview-exec.js",
      "pluginId": "cordova-plugin-ionic-webview",
      "clobbers": [
        "cordova.exec"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.Coordinates",
      "file": "plugins/cordova-plugin-geolocation/www/Coordinates.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "Coordinates"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "PositionError"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.Position",
      "file": "plugins/cordova-plugin-geolocation/www/Position.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "Position"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "call-number.CallNumber",
      "file": "plugins/call-number/www/CallNumber.js",
      "pluginId": "call-number",
      "clobbers": [
        "call"
      ]
    },
    {
      "id": "cordova-plugin-email-composer.EmailComposer",
      "file": "plugins/cordova-plugin-email-composer/www/email_composer.js",
      "pluginId": "cordova-plugin-email-composer",
      "clobbers": [
        "cordova.plugins.email",
        "plugin.email"
      ]
    }
  ];
  module.exports.metadata = {
    "ionic-plugin-keyboard": "2.2.1",
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-ionic-webview": "1.2.1",
    "cordova-plugin-geolocation": "4.0.2",
    "call-number": "0.0.2",
    "cordova-plugin-email-composer": "0.8.15"
  };
});