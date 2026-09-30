/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — header panels
   Loaded on demand by app/app.js when a reader opens either header cell.

   · THE CHRONICLES APP — how to install the app on any phone or computer,
     with a one-tap install where the browser allows it, the link to copy or
     share, and a QR code to carry it from a laptop to a phone.
   · THE CHRONICLES ENGAGEMENT TRACKER — live readership of the website and
     the app together: this hour, the past 24 hours, this week, month, year
     and since launch; every country readers have come from, on a world map
     and in a ranked list; activity by hour and by day; the pages read, how
     readers arrived and on what. Refreshes itself every two minutes.

   Map data: Natural Earth 1:110m (public domain) and GeoNames (CC-BY 4.0).
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__chxHub) return;

  var APP = window.ChroniclesApp || {};
  var TRK = window.ChroniclesTracker || null;
  var ROOT = APP.ROOT || new URL('./', location.href).href;
  var SITE_URL = APP.URL || 'https://rayyan200103.github.io/THE-CHRONICLE/';
  var MAP = {"step":2.0,"top":80.0,"cols":180,"rows":68,"codes":["AE","AF","AL","AM","AO","AR","AT","AU","AZ","BA","BD","BE","BF","BG","BI","BJ","BN","BO","BR","BS","BT","BW","BY","BZ","CA","CD","CF","CG","CH","CI","CL","CM","CN","CO","CR","CU","CY","CZ","DE","DJ","DK","DO","DZ","EC","EE","EG","EH","ER","ES","ET","FI","FJ","FK","FR","GA","GB","GE","GH","GL","GM","GN","GQ","GR","GT","GW","GY","HN","HR","HT","HU","ID","IE","IL","IN","IQ","IR","IS","IT","JM","JO","JP","KE","KG","KH","KP","KR","KW","KZ","LA","LB","LK","LR","LS","LT","LU","LV","LY","MA","MD","ME","MG","MK","ML","MM","MN","MR","MW","MX","MY","MZ","NA","NC","NE","NG","NI","NL","NO","NP","NZ","OM","PA","PE","PG","PH","PK","PL","PR","PS","PT","PY","QA","RO","RS","RU","RW","SA","SB","SD","SE","SI","SK","SL","SN","SO","SR","SS","SV","SY","SZ","TD","TF","TG","TH","TJ","TL","TM","TN","TR","TT","TW","TZ","UA","UG","US","UY","UZ","VE","VN","VU","XK","YE","ZA","ZM","ZW"],"rle":[[0,37,25,2,0,4,25,3,0,1,25,5,0,4,59,24,0,16,117,5,0,37,134,4,0,38],[0,30,25,2,0,10,25,1,0,2,25,5,0,4,59,27,0,17,117,1,0,42,134,2,0,37],[0,34,25,3,0,3,25,1,0,1,25,1,0,1,25,6,0,11,59,19,0,38,134,2,0,13,134,13,0,13,134,3,0,1,134,2,0,15],[0,28,25,3,0,1,25,1,0,3,25,1,0,3,25,1,0,1,25,2,0,1,25,4,0,1,25,2,0,10,59,17,0,37,134,2,0,12,134,21,0,1,134,2,0,26],[134,1,0,10,164,2,0,15,25,1,0,2,25,7,0,4,25,2,0,2,25,8,0,10,59,13,0,1,59,1,0,23,117,2,0,13,134,1,0,5,134,3,0,1,134,28,0,1,134,10,0,2,134,1,0,10,134,1],[0,8,164,12,25,1,0,1,25,9,0,2,25,3,0,2,25,1,0,2,25,1,0,1,25,3,0,1,25,2,0,3,25,4,0,8,59,13,0,22,117,1,51,1,117,2,51,1,134,4,0,12,134,3,0,1,134,2,0,1,134,47,0,1,134,5],[134,3,0,5,164,12,25,29,0,4,25,5,0,5,59,10,0,24,117,1,139,4,51,3,134,6,0,1,134,1,0,1,134,12,0,1,134,53],[0,2,134,2,0,3,164,13,25,26,0,1,25,1,0,3,25,6,0,7,59,6,0,9,77,4,0,13,117,1,139,4,0,2,51,2,134,2,0,1,134,1,0,1,134,70],[0,8,164,12,25,25,0,9,25,2,0,1,25,1,0,7,59,4,0,25,117,2,139,3,0,2,51,5,134,74],[0,7,164,7,0,1,164,5,25,23,0,8,25,4,0,11,59,3,0,24,117,3,139,3,0,2,51,3,134,64,0,2,134,1,0,1,134,4,0,4],[0,9,164,4,0,8,164,2,25,20,0,8,25,4,0,2,25,1,0,35,117,3,139,3,0,3,45,2,134,57,0,5,134,1,0,3,134,1,0,9],[0,11,164,1,0,11,164,1,25,21,0,7,25,7,0,28,56,2,0,5,41,1,0,1,139,2,0,3,96,3,134,55,0,9,134,4,0,8],[0,8,164,1,0,16,25,24,0,2,25,10,0,25,56,3,0,5,41,1,0,5,134,1,94,2,23,2,134,19,88,1,134,33,0,10,134,3,0,9],[0,25,25,24,0,2,25,11,0,23,72,2,0,1,56,2,0,2,116,2,39,3,126,5,23,4,134,15,88,8,134,21,33,3,134,9,0,6,134,1,0,11],[0,26,25,36,0,26,56,2,0,1,12,2,39,4,38,1,126,4,162,6,134,7,88,2,134,1,88,1,134,2,88,11,134,7,105,2,134,9,33,4,134,6,0,1,134,1,0,18],[0,27,25,1,0,1,164,2,0,5,25,4,164,3,25,13,0,1,25,1,0,3,25,2,0,26,54,5,39,3,38,2,141,2,162,9,134,3,88,21,105,14,33,7,134,5,0,1,134,1,0,18],[0,28,164,19,25,8,164,1,25,2,0,5,25,1,0,25,54,4,29,2,7,3,70,3,132,3,99,1,162,4,134,5,88,18,33,3,105,15,33,7,134,2,0,2,134,1,0,18],[0,28,164,21,25,4,164,3,0,1,25,2,0,30,54,4,78,3,0,1,68,1,10,1,68,1,133,1,132,4,0,2,162,1,0,1,134,5,0,2,88,2,166,2,88,10,33,7,105,10,33,9,134,2,0,22],[0,28,164,21,25,2,164,4,0,30,49,4,54,3,0,3,78,2,0,2,100,1,170,1,14,3,0,6,57,2,134,2,0,2,88,2,166,5,88,4,83,1,88,2,33,8,105,7,33,11,134,1,0,3,81,2,0,18],[0,28,164,26,0,32,129,1,49,3,0,4,78,1,0,2,78,2,3,1,102,1,63,2,158,1,0,1,158,7,4,1,9,2,0,2,156,4,166,5,83,2,33,25,85,2,0,5,81,1,0,19],[0,28,164,24,0,33,129,1,49,4,0,8,78,1,0,1,63,2,0,1,158,9,76,2,9,1,0,2,156,5,166,2,154,3,33,22,0,4,85,1,0,6,81,1,0,19],[0,29,164,23,0,35,49,2,0,4,43,1,157,2,0,1,78,1,0,6,158,6,148,1,75,1,76,3,0,2,76,3,156,2,2,5,125,1,33,23,0,2,86,2,0,3,81,2,0,20],[0,30,164,22,0,35,98,2,43,5,157,1,0,7,63,1,0,3,37,1,0,1,148,3,75,2,76,7,2,6,125,3,33,21,0,3,86,1,0,2,81,4,0,20],[0,31,164,19,0,36,98,3,43,5,157,2,0,11,90,1,148,1,75,4,76,7,2,5,125,2,74,3,33,20,0,5,81,2,0,23],[0,32,108,5,164,12,0,36,98,3,43,7,97,4,0,1,97,2,46,2,0,1,46,2,73,1,80,1,136,2,75,3,76,7,2,2,125,4,74,3,33,21,0,29],[0,34,108,6,164,2,0,7,164,1,0,35,98,1,43,9,97,7,0,1,46,4,136,7,0,1,76,6,125,5,74,4,118,2,33,5,74,1,33,13,0,29],[0,33,108,1,0,1,108,5,164,1,0,8,164,1,20,1,0,32,98,2,47,1,43,9,97,7,0,1,46,4,0,1,136,7,0,2,76,5,125,3,74,7,118,2,74,1,21,1,74,2,104,1,33,11,0,30],[0,34,108,1,0,1,108,5,0,42,98,1,106,4,43,7,97,7,0,1,46,4,0,2,136,6,131,1,0,1,1,1,0,5,125,2,74,9,11,2,74,1,104,2,33,11,0,30],[0,37,108,4,0,7,36,2,0,32,98,1,106,4,103,2,43,7,113,1,97,5,0,1,46,5,0,1,136,7,1,2,120,2,0,5,74,9,11,2,74,1,104,3,33,2,168,1,33,5,0,2,160,1,0,29],[0,37,108,4,0,4,108,2,0,4,36,1,0,29,106,6,103,4,43,3,113,4,150,2,97,3,138,6,0,1,136,8,120,1,0,6,74,9,0,2,104,4,89,2,168,2,0,36],[0,38,108,4,0,2,108,2,0,5,79,1,0,1,69,1,42,1,0,1,127,1,0,25,106,5,103,5,113,6,150,4,138,7,0,2,136,5,120,3,0,7,74,6,0,5,104,2,153,2,89,1,168,1,0,1,33,1,0,35],[0,40,108,4,64,1,24,1,0,36,106,5,103,5,113,6,150,4,138,6,48,1,0,2,136,1,171,1,136,1,171,2,120,1,0,10,74,4,0,6,104,2,153,3,89,1,168,1,0,6,124,1,0,29],[0,44,64,1,67,3,0,33,143,3,103,7,113,6,150,4,138,7,48,2,0,1,171,4,0,12,74,3,0,9,153,4,89,1,0,6,124,1,0,29],[0,45,147,1,115,2,0,33,60,1,143,2,103,4,13,3,113,1,114,2,113,1,114,2,150,4,138,7,50,3,0,1,171,1,0,14,74,3,0,9,104,1,153,1,84,3,168,1,0,5,124,1,0,29],[0,47,115,1,0,4,34,2,167,2,0,3,159,1,0,22,61,4,103,1,13,3,16,2,114,5,150,4,138,5,146,1,50,4,40,1,0,2,144,2,0,12,74,2,0,9,104,1,0,2,84,1,168,1,0,8,124,1,0,27],[0,48,35,1,0,1,121,1,0,1,34,2,167,6,0,23,142,2,61,1,30,3,58,1,152,1,114,5,32,1,150,2,27,3,146,5,50,5,0,2,144,1,0,13,74,1,0,1,91,1,0,8,153,1,0,2,168,1,0,37],[0,51,34,4,167,5,66,1,0,23,92,2,30,2,58,2,152,1,114,5,32,2,27,5,146,4,50,6,144,2,0,15,91,1,0,21,124,1,0,27],[0,51,34,5,167,4,66,1,145,2,54,1,0,21,92,1,30,1,0,1,30,1,0,4,114,1,32,3,27,6,26,1,146,3,82,1,50,4,144,2,0,24,71,1,0,1,109,2,0,5,17,1,109,1,0,31],[0,51,34,5,167,2,19,2,66,1,145,2,54,1,19,1,0,30,32,3,28,1,26,6,163,2,82,4,144,2,0,26,71,1,0,1,109,1,0,4,109,2,71,1,0,31],[0,50,44,1,34,4,19,10,0,30,55,2,28,2,26,6,163,2,82,3,144,2,0,27,71,2,0,4,109,1,71,3,0,1,71,1,0,29],[0,50,44,2,122,1,34,2,19,12,0,27,55,3,28,2,26,6,163,1,161,1,82,4,0,29,71,2,0,3,71,4,0,6,71,2,0,23],[0,50,44,1,122,4,19,15,0,25,55,1,28,2,26,7,161,4,82,1,0,31,71,2,0,2,71,3,0,1,71,2,0,3,71,1,0,1,71,1,0,1,71,3,0,19],[0,49,122,5,19,18,0,24,26,9,161,5,0,32,71,1,0,8,71,1,0,7,71,2,123,2,0,17],[0,50,122,3,19,20,0,23,5,2,26,7,161,5,0,33,71,3,0,13,71,2,123,3,0,4,137,1,0,11],[0,51,122,2,19,19,0,24,5,5,26,3,173,2,161,4,0,38,71,1,0,3,71,1,0,7,71,1,123,1,0,1,123,1,0,6,137,1,0,9],[0,51,122,4,19,1,18,1,19,14,0,26,5,5,26,2,173,3,161,3,0,70],[0,52,122,4,18,3,19,12,0,25,5,5,173,3,26,1,173,1,107,1,110,3,0,4,101,1,0,40,8,3,0,3,8,1,0,18],[0,52,122,3,18,5,19,11,0,25,5,5,173,4,110,2,107,1,110,2,0,4,101,1,0,37,8,6,0,3,8,2,0,10,169,1,0,6],[0,54,122,1,18,6,19,9,0,26,111,1,5,4,173,3,174,2,110,3,0,3,101,3,0,36,8,8,0,2,8,2,0,15,52,1,0,1],[0,55,31,1,18,5,19,9,0,26,111,4,22,3,174,3,110,2,0,4,101,3,0,36,8,12,0,17],[0,55,31,1,18,3,130,2,19,9,0,27,111,3,22,4,174,2,110,2,0,4,101,2,0,34,8,17,0,7,112,1,0,7],[0,55,31,2,6,2,130,3,19,6,0,29,111,3,22,4,172,2,110,2,0,4,101,2,0,33,8,18,0,15],[0,55,31,1,6,5,130,2,19,3,0,31,111,3,22,3,172,3,110,1,0,5,101,1,0,34,8,19,0,14],[0,55,31,1,6,5,130,1,6,1,19,3,0,32,111,2,172,5,149,1,0,41,8,20,0,13],[0,54,31,1,6,7,19,3,0,33,172,6,93,1,172,1,0,41,8,20,0,13],[0,54,31,1,6,6,165,1,19,3,0,34,172,6,0,43,8,19,0,13],[0,54,31,1,6,6,165,2,19,1,0,35,172,5,0,44,8,4,0,5,8,9,0,14],[0,54,31,1,6,6,0,87,8,1,0,10,8,6,0,11,119,1,0,3],[0,53,31,1,6,8,0,98,8,5,0,12,119,1,0,2],[0,53,31,1,6,5,0,118,119,2,0,1],[0,53,31,1,6,3,0,1,6,1,0,103,8,2,0,12,119,2,0,2],[0,54,6,4,0,105,8,1,0,11,119,2,0,3],[0,53,31,1,6,3,0,117,119,2,0,4],[0,53,31,1,6,3,0,123],[0,52,31,2,6,2,0,68,151,1,0,55],[0,52,31,2,6,1,0,5,53,1,0,119],[0,53,31,3,0,124],[0,54,31,2,0,124]],"anchors":{"AD":[42.51,1.52,"EU"],"AE":[25.08,55.31,"AS"],"AF":[34.53,69.17,"AS"],"AG":[17.12,-61.84,"NA"],"AI":[18.22,-63.06,"NA"],"AL":[41.33,19.82,"EU"],"AM":[40.18,44.51,"AS"],"AO":[-8.84,13.23,"AF"],"AR":[-34.61,-58.38,"SA"],"AS":[-14.28,-170.7,"OC"],"AT":[48.21,16.37,"EU"],"AU":[-33.87,151.21,"OC"],"AW":[12.52,-70.03,"NA"],"AX":[60.1,19.93,"EU"],"AZ":[40.38,49.89,"AS"],"BA":[43.85,18.36,"EU"],"BB":[13.11,-59.62,"NA"],"BD":[23.71,90.41,"AS"],"BE":[50.85,4.35,"EU"],"BF":[12.37,-1.53,"AF"],"BG":[42.7,23.32,"EU"],"BH":[26.26,50.61,"AS"],"BI":[-3.38,29.36,"AF"],"BJ":[6.37,2.42,"AF"],"BL":[17.9,-62.85,"NA"],"BM":[32.29,-64.78,"NA"],"BN":[4.89,114.94,"AS"],"BO":[-16.5,-68.15,"SA"],"BQ":[12.15,-68.27,"NA"],"BR":[-23.55,-46.64,"SA"],"BS":[25.06,-77.34,"NA"],"BT":[27.47,89.64,"AS"],"BW":[-24.65,25.91,"AF"],"BY":[53.9,27.57,"EU"],"BZ":[17.5,-88.2,"NA"],"CA":[43.71,-79.4,"NA"],"CC":[-12.16,96.82,"AS"],"CD":[-4.33,15.31,"AF"],"CF":[4.36,18.55,"AF"],"CG":[-4.27,15.28,"AF"],"CH":[47.37,8.55,"EU"],"CI":[5.35,-4.0,"AF"],"CK":[-21.21,-159.78,"OC"],"CL":[-33.46,-70.65,"SA"],"CM":[4.05,9.7,"AF"],"CN":[31.22,121.46,"AS"],"CO":[4.61,-74.08,"SA"],"CR":[9.93,-84.08,"NA"],"CU":[23.13,-82.38,"NA"],"CV":[14.93,-23.51,"AF"],"CW":[12.12,-68.89,"NA"],"CX":[-10.42,105.68,"OC"],"CY":[35.17,33.35,"EU"],"CZ":[50.09,14.42,"EU"],"DE":[52.52,13.41,"EU"],"DJ":[11.59,43.15,"AF"],"DK":[55.68,12.57,"EU"],"DM":[15.3,-61.39,"NA"],"DO":[18.47,-69.89,"NA"],"DZ":[36.73,3.09,"AF"],"EC":[-0.23,-78.52,"SA"],"EE":[59.44,24.75,"EU"],"EG":[30.06,31.25,"AF"],"EH":[27.14,-13.19,"AF"],"ER":[15.34,38.93,"AF"],"ES":[40.42,-3.7,"EU"],"ET":[9.02,38.75,"AF"],"FI":[60.17,24.94,"EU"],"FJ":[-18.07,178.51,"OC"],"FK":[-51.69,-57.86,"SA"],"FM":[6.92,158.16,"OC"],"FO":[62.01,-6.77,"EU"],"FR":[48.85,2.35,"EU"],"GA":[0.39,9.45,"AF"],"GB":[51.51,-0.13,"EU"],"GD":[12.05,-61.75,"NA"],"GE":[41.69,44.83,"AS"],"GF":[4.94,-52.33,"SA"],"GG":[49.46,-2.54,"EU"],"GH":[6.69,-1.62,"AF"],"GI":[36.14,-5.35,"EU"],"GL":[64.18,-51.72,"NA"],"GM":[13.44,-16.68,"AF"],"GN":[9.54,-13.68,"AF"],"GP":[16.27,-61.51,"NA"],"GQ":[1.86,9.77,"AF"],"GR":[37.98,23.73,"EU"],"GS":[-54.28,-36.51,"AN"],"GT":[14.64,-90.51,"NA"],"GU":[13.52,144.84,"OC"],"GW":[11.86,-15.6,"AF"],"GY":[6.8,-58.16,"SA"],"HK":[22.28,114.17,"AS"],"HN":[14.08,-87.21,"NA"],"HR":[45.81,15.98,"EU"],"HT":[18.54,-72.34,"NA"],"HU":[47.5,19.04,"EU"],"ID":[-6.21,106.85,"AS"],"IE":[53.33,-6.25,"EU"],"IL":[31.77,35.22,"AS"],"IM":[54.15,-4.48,"EU"],"IN":[19.07,72.88,"AS"],"IQ":[33.34,44.4,"AS"],"IR":[35.69,51.42,"AS"],"IS":[64.14,-21.9,"EU"],"IT":[41.89,12.51,"EU"],"JE":[49.19,-2.1,"EU"],"JM":[18.0,-76.79,"NA"],"JO":[31.96,35.95,"AS"],"JP":[35.69,139.69,"AS"],"KE":[-1.28,36.82,"AF"],"KG":[42.87,74.59,"AS"],"KH":[11.56,104.92,"AS"],"KI":[1.33,172.98,"OC"],"KM":[-11.7,43.26,"AF"],"KN":[17.3,-62.72,"NA"],"KP":[39.03,125.75,"AS"],"KR":[37.57,126.98,"AS"],"XK":[42.67,21.17,"EU"],"KW":[29.08,48.08,"AS"],"KY":[19.29,-81.37,"NA"],"KZ":[43.25,76.91,"AS"],"LA":[17.97,102.6,"AS"],"LB":[33.89,35.5,"AS"],"LC":[14.07,-60.95,"NA"],"LI":[47.14,9.52,"EU"],"LK":[6.94,79.85,"AS"],"LR":[6.3,-10.8,"AF"],"LS":[-29.32,27.48,"AF"],"LT":[54.69,25.28,"EU"],"LU":[49.61,6.13,"EU"],"LV":[56.95,24.11,"EU"],"LY":[32.89,13.19,"AF"],"MA":[33.59,-7.61,"AF"],"MC":[43.74,7.42,"EU"],"MD":[47.01,28.86,"EU"],"ME":[42.44,19.26,"EU"],"MF":[18.07,-63.08,"NA"],"MG":[-18.91,47.54,"AF"],"MH":[7.09,171.38,"OC"],"MK":[42.0,21.43,"EU"],"ML":[12.61,-7.98,"AF"],"MM":[16.81,96.16,"AS"],"MN":[47.91,106.88,"AS"],"MO":[22.2,113.55,"AS"],"MP":[15.21,145.75,"OC"],"MQ":[14.6,-61.07,"NA"],"MR":[18.09,-15.98,"AF"],"MS":[16.79,-62.21,"NA"],"MT":[35.95,14.42,"EU"],"MU":[-20.16,57.5,"AF"],"MV":[4.18,73.51,"AS"],"MW":[-13.97,33.79,"AF"],"MX":[19.43,-99.13,"NA"],"MY":[3.14,101.69,"AS"],"MZ":[-25.97,32.58,"AF"],"NA":[-22.56,17.08,"AF"],"NC":[-22.27,166.45,"OC"],"NE":[13.51,2.11,"AF"],"NF":[-29.05,167.97,"OC"],"NG":[6.45,3.39,"AF"],"NI":[12.13,-86.25,"NA"],"NL":[51.92,4.48,"EU"],"NO":[59.91,10.75,"EU"],"NP":[27.7,85.32,"AS"],"NR":[-0.55,166.93,"OC"],"NU":[-19.05,-169.92,"OC"],"NZ":[-36.85,174.76,"OC"],"OM":[23.58,58.41,"AS"],"PA":[8.99,-79.52,"NA"],"PE":[-12.04,-77.03,"SA"],"PF":[-17.56,-149.6,"OC"],"PG":[-9.48,147.15,"OC"],"PH":[14.65,121.05,"AS"],"PK":[31.56,74.35,"AS"],"PL":[52.23,21.01,"EU"],"PM":[46.78,-56.18,"NA"],"PN":[-25.07,-130.1,"OC"],"PR":[18.47,-66.11,"NA"],"PS":[31.78,35.23,"AS"],"PT":[38.73,-9.15,"EU"],"PW":[7.5,134.62,"OC"],"PY":[-25.29,-57.65,"SA"],"QA":[25.29,51.53,"AS"],"RE":[-20.88,55.45,"AF"],"RO":[44.43,26.11,"EU"],"RS":[44.8,20.47,"EU"],"RU":[55.75,37.62,"EU"],"RW":[-1.95,30.06,"AF"],"SA":[21.49,39.19,"AS"],"SB":[-9.43,159.95,"OC"],"SC":[-4.62,55.46,"AF"],"SD":[15.55,32.53,"AF"],"SS":[4.85,31.58,"AF"],"SE":[59.33,18.07,"EU"],"SG":[1.29,103.85,"AS"],"SH":[-15.92,-5.72,"AF"],"SI":[46.05,14.51,"EU"],"SJ":[78.22,15.65,"EU"],"SK":[48.15,17.11,"EU"],"SL":[8.49,-13.24,"AF"],"SM":[43.94,12.45,"EU"],"SN":[14.69,-17.44,"AF"],"SO":[2.04,45.34,"AF"],"SR":[5.87,-55.17,"SA"],"ST":[0.34,6.73,"AF"],"SV":[13.69,-89.19,"NA"],"SX":[18.03,-63.05,"NA"],"SY":[36.2,37.16,"AS"],"SZ":[-26.5,31.38,"AF"],"TC":[21.78,-72.25,"NA"],"TD":[12.11,15.04,"AF"],"TG":[6.13,1.22,"AF"],"TH":[13.75,100.5,"AS"],"TJ":[38.54,68.78,"AS"],"TL":[-8.56,125.57,"OC"],"TM":[37.95,58.38,"AS"],"TN":[36.82,10.17,"AF"],"TO":[-21.14,-175.2,"OC"],"TR":[41.01,28.95,"AS"],"TT":[10.52,-61.42,"NA"],"TV":[-8.52,179.19,"OC"],"TW":[25.05,121.53,"AS"],"TZ":[-6.82,39.27,"AF"],"UA":[50.45,30.52,"EU"],"UG":[0.32,32.58,"AF"],"US":[40.71,-74.01,"NA"],"UY":[-34.9,-56.19,"SA"],"UZ":[41.26,69.22,"AS"],"VA":[41.9,12.45,"EU"],"VC":[13.16,-61.23,"NA"],"VE":[10.49,-66.88,"SA"],"VG":[18.43,-64.62,"NA"],"VI":[17.73,-64.75,"NA"],"VN":[10.82,106.63,"AS"],"VU":[-17.74,168.31,"OC"],"WF":[-13.28,-176.17,"OC"],"WS":[-13.83,-171.77,"OC"],"YE":[15.35,44.21,"AS"],"YT":[-12.78,45.23,"AF"],"ZA":[-26.2,28.04,"AF"],"ZM":[-15.41,28.29,"AF"],"ZW":[-17.83,31.05,"AF"]}};
  var QR = {"n":33,"d":"M0 0.5h7m3 0h3m1 0h1m1 0h5m2 0h1m2 0h7m-33 1h1m5 0h1m1 0h2m1 0h1m1 0h4m1 0h1m1 0h1m2 0h2m1 0h1m5 0h1m-33 1h1m1 0h3m1 0h1m1 0h1m2 0h4m3 0h1m1 0h1m1 0h1m3 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m2 0h7m2 0h2m1 0h2m1 0h1m1 0h1m1 0h3m1 0h1m-33 1h1m1 0h3m1 0h1m2 0h1m2 0h1m1 0h4m1 0h6m1 0h1m1 0h3m1 0h1m-33 1h1m5 0h1m3 0h3m3 0h6m2 0h1m1 0h1m5 0h1m-33 1h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7m-23 1h1m6 0h2m-18 1h3m1 0h2m4 0h1m4 0h4m1 0h2m7 0h2m-31 1h2m1 0h1m2 0h1m1 0h1m1 0h3m4 0h2m1 0h3m2 0h2m1 0h4m-30 1h1m2 0h1m1 0h1m1 0h4m2 0h2m3 0h1m1 0h3m1 0h3m1 0h2m-29 1h2m1 0h3m3 0h1m8 0h1m3 0h2m1 0h1m1 0h1m-32 1h1m1 0h1m2 0h2m3 0h1m2 0h2m3 0h1m2 0h5m1 0h3m2 0h1m-33 1h1m1 0h4m1 0h1m2 0h6m1 0h1m5 0h4m4 0h1m-31 1h1m1 0h2m1 0h1m2 0h2m1 0h5m1 0h2m1 0h2m1 0h1m1 0h2m1 0h1m-30 1h3m2 0h1m2 0h2m4 0h1m5 0h2m3 0h2m1 0h3m-29 1h7m1 0h1m2 0h2m2 0h1m1 0h1m1 0h1m2 0h3m1 0h3m-31 1h2m1 0h1m1 0h1m1 0h2m1 0h2m6 0h1m2 0h1m1 0h2m1 0h1m1 0h2m1 0h2m-32 1h2m2 0h2m1 0h2m2 0h2m3 0h1m4 0h1m2 0h1m1 0h2m1 0h2m-29 1h1m1 0h1m3 0h3m3 0h2m3 0h1m1 0h2m2 0h1m1 0h1m3 0h1m-33 1h3m1 0h3m3 0h2m1 0h1m1 0h1m3 0h1m3 0h1m5 0h2m-31 1h2m2 0h2m1 0h1m2 0h1m3 0h1m5 0h2m1 0h2m5 0h1m1 0h1m-30 1h1m2 0h1m4 0h3m1 0h1m7 0h2m1 0h2m1 0h4m-32 1h1m1 0h2m2 0h1m1 0h2m2 0h1m1 0h1m6 0h1m1 0h3m-27 1h1m5 0h1m1 0h1m1 0h1m2 0h2m1 0h2m2 0h1m3 0h5m2 0h2m-25 1h4m4 0h1m1 0h5m1 0h1m3 0h2m1 0h1m-32 1h7m2 0h1m2 0h2m3 0h1m1 0h3m1 0h2m1 0h1m1 0h1m-29 1h1m5 0h1m1 0h1m1 0h1m4 0h1m5 0h1m1 0h2m3 0h4m-32 1h1m1 0h3m1 0h1m3 0h2m2 0h3m3 0h1m1 0h7m1 0h1m-31 1h1m1 0h3m1 0h1m1 0h1m2 0h1m2 0h1m1 0h1m2 0h2m1 0h2m3 0h1m1 0h4m-33 1h1m1 0h3m1 0h1m1 0h2m3 0h1m2 0h1m3 0h2m2 0h1m1 0h2m-28 1h1m5 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h2m1 0h1m2 0h1m3 0h2m3 0h1m-33 1h7m3 0h2m8 0h4m1 0h1m2 0h1m1 0h1"};
  var REFRESH_MS = 120000;
  var reduced = false;
  try { reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var ua = navigator.userAgent || '';

  /* ── helpers ──────────────────────────────────────────────────────────── */
  function $(sel, el) { return (el || document).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function h(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (attrs[k] != null) e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { try { return Math.round(n).toLocaleString('en-GB'); } catch (e) { return String(Math.round(n)); } }
  function pct(a, b) { return b > 0 ? (a / b * 100) : 0; }
  function pctTxt(a, b) { if (!(b > 0)) return '0%'; var p = a / b * 100; return (p > 0 && p < 1 ? '<1' : (p >= 99.5 && a < b ? '>99' : Math.round(p))) + '%'; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function sum(o) { var s = 0; if (o) for (var k in o) s += +o[k] || 0; return s; }

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  function hourKey(ms) { var d = new Date(ms); return '' + d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + pad(d.getUTCHours()); }
  function dayKey(ms) { var d = new Date(ms); return '' + d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()); }
  function monthKey(ms) { var d = new Date(ms); return '' + d.getUTCFullYear() + pad(d.getUTCMonth() + 1); }
  function yearKey(ms) { return '' + new Date(ms).getUTCFullYear(); }
  function isoWeek(ms) {
    if (TRK && TRK.isoWeek) return TRK.isoWeek(new Date(ms));
    var date = new Date(ms), d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    var day = d.getUTCDay() || 7; d.setUTCDate(d.getUTCDate() + 4 - day);
    var y = d.getUTCFullYear(); return y + 'W' + pad(Math.ceil(((d - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7));
  }
  function keyToMs(k) { // YYYYMMDD[HH]
    return Date.UTC(+k.slice(0, 4), +k.slice(4, 6) - 1, +k.slice(6, 8), k.length > 8 ? +k.slice(8, 10) : 0);
  }
  function weekStartMs(ms) { var d = new Date(ms); var day = d.getUTCDay() || 7; return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day + 1); }
  function localTime(ms) { try { return new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch (e) { var d = new Date(ms); return pad(d.getHours()) + ':' + pad(d.getMinutes()); } }
  function utcDate(ms, withDow) { var d = new Date(ms); return (withDow ? DOW[d.getUTCDay()] + ' ' : '') + d.getUTCDate() + ' ' + MON[d.getUTCMonth()]; }

  var regionNames = null;
  try { regionNames = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) {}
  var NAME_FIX = { ZZ: 'Not determined', EUROPE: 'Europe', XK: 'Kosovo', GB: 'United Kingdom', US: 'United States', PS: 'Palestine' };
  function cname(cc) {
    if (NAME_FIX[cc]) return NAME_FIX[cc];
    try { var n = regionNames && regionNames.of(cc); if (n && n !== cc) return n; } catch (e) {}
    return cc;
  }
  var flagsOK = (function () {
    try {
      var c = document.createElement('canvas'); c.width = c.height = 24;
      var x = c.getContext('2d'); x.textBaseline = 'top'; x.font = '20px sans-serif'; x.fillStyle = '#000';
      x.fillText('🇬🇧', 0, 0);
      var d = x.getImageData(0, 0, 24, 24).data;
      for (var i = 0; i < d.length; i += 4) { if (d[i + 3] > 0 && (Math.abs(d[i] - d[i + 1]) > 20 || Math.abs(d[i + 1] - d[i + 2]) > 20)) return true; }
    } catch (e) {}
    return false;
  })();
  function flag(cc) {
    if (cc === 'EUROPE') return '<span class="tk-flag tk-flag-code" aria-hidden="true">EUR</span>';
    if (cc === 'ZZ' || !/^[A-Z]{2}$/.test(cc)) return '<span class="tk-flag tk-flag-code" aria-hidden="true">··</span>';
    if (flagsOK) return '<span class="tk-flag" aria-hidden="true">' + String.fromCodePoint(0x1F1E6 + cc.charCodeAt(0) - 65, 0x1F1E6 + cc.charCodeAt(1) - 65) + '</span>';
    return '<span class="tk-flag tk-flag-code" aria-hidden="true">' + cc + '</span>';
  }
  function continentOf(cc) {
    if (cc === 'EUROPE') return 'EU';
    var a = MAP && MAP.anchors[cc];
    return a ? a[2] : '';
  }
  var CONT = { AS: 'Asia', EU: 'Europe', AF: 'Africa', NA: 'North America', SA: 'South America', OC: 'Oceania', AN: 'Antarctica' };

  /* ── styles ───────────────────────────────────────────────────────────── */
  var CSS = [
    '.hx-ov{position:fixed;inset:0;z-index:10050;display:flex;align-items:center;justify-content:center;padding:22px;',
    'background:rgba(8,1,3,.8);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);opacity:0;transition:opacity .28s ease}',
    '.hx-ov.on{opacity:1}',
    '.hx-sheet{position:relative;display:flex;flex-direction:column;width:min(1180px,100%);max-height:calc(100vh - 44px);max-height:calc(100dvh - 44px);',
    'background:radial-gradient(ellipse 80% 40% at 50% 0%,rgba(150,40,52,.22) 0%,transparent 70%),linear-gradient(172deg,#2B0A11 0%,#1F070C 46%,#170509 100%);',
    'border:1px solid rgba(201,168,76,.5);border-radius:18px;overflow:hidden;color:#F0E6CC;',
    'box-shadow:0 30px 90px rgba(0,0,0,.75),0 0 0 1px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,230,180,.08);',
    'transform:translateY(16px) scale(.985);transition:transform .34s cubic-bezier(.2,.8,.2,1)}',
    '.hx-ov.on .hx-sheet{transform:none}',
    '.hx-sheet.narrow{width:min(620px,100%)}',
    '.hx-head{flex:none;display:flex;align-items:center;gap:14px;padding:15px 18px 14px 20px;',
    'border-bottom:1px solid rgba(201,168,76,.24);background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,.08))}',
    '.hx-logo{width:44px;height:44px;border-radius:11px;flex:none;box-shadow:0 3px 12px rgba(0,0,0,.6),0 0 0 1px rgba(201,168,76,.35)}',
    '.hx-ht{flex:1;min-width:0}',
    '.hx-k{font:500 9.5px/1.2 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.22em;color:#B89A5A;text-transform:uppercase}',
    '.hx-t{font:700 19px/1.2 Cinzel,Georgia,serif;letter-spacing:.07em;color:#E8C97A;margin-top:3px;text-shadow:0 0 22px rgba(232,201,122,.25)}',
    '.hx-s{font:italic 400 14px/1.35 "EB Garamond",Georgia,serif;color:#C9B894;margin-top:2px}',
    '.hx-x{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid rgba(201,168,76,.4);background:rgba(0,0,0,.25);',
    'color:#E8C97A;font-size:16px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;',
    'transition:transform .2s,border-color .2s,background .2s;-webkit-tap-highlight-color:transparent}',
    '.hx-x:hover{transform:rotate(90deg);border-color:#E8C97A;background:rgba(201,168,76,.14)}',
    '.hx-x:focus-visible,.hx-btn:focus-visible,.hx-tab:focus-visible,.tk-more:focus-visible{outline:2px solid #E8C97A;outline-offset:2px}',
    '.hx-body{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:18px 20px 22px;',
    'scrollbar-width:thin;scrollbar-color:#7A5F28 transparent}',
    '.hx-body::-webkit-scrollbar{width:6px}.hx-body::-webkit-scrollbar-thumb{background:#7A5F28;border-radius:3px}',
    '.hx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;border-radius:22px;',
    'font:700 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;padding:11px 18px;',
    'border:1px solid #C9A84C;background:linear-gradient(180deg,#EBC873,#B98A2C);color:#1E0A05;box-shadow:0 4px 16px rgba(0,0,0,.45);',
    'transition:transform .15s,filter .15s;-webkit-tap-highlight-color:transparent;text-decoration:none}',
    '.hx-btn:hover{filter:brightness(1.08);transform:translateY(-1px)}.hx-btn:active{transform:none}',
    '.hx-btn.ghost{background:rgba(0,0,0,.22);color:#E8C97A;border-color:rgba(201,168,76,.5);box-shadow:none;font-weight:500}',
    '.hx-btn.sm{padding:8px 13px;font-size:10px}',
    '.hx-btn[disabled]{opacity:.5;cursor:default;transform:none}',
    'html.chx-hub-open,html.chx-hub-open body{overflow:hidden!important}',
    '@media (max-width:640px){.hx-ov{padding:0;align-items:stretch}.hx-sheet,.hx-sheet.narrow{width:100%;max-height:none;height:100%;border-radius:0;border:none}',
    '.hx-head{padding:calc(12px + env(safe-area-inset-top,0px)) 14px 12px 16px}.hx-t{font-size:16px}.hx-s{font-size:13px}.hx-logo{width:38px;height:38px}',
    '.hx-body{padding:14px 14px calc(22px + env(safe-area-inset-bottom,0px))}}',
    '@media (max-height:500px) and (min-width:480px){.hx-ov{padding:8px}.hx-sheet,.hx-sheet.narrow{max-height:calc(100vh - 16px);max-height:calc(100dvh - 16px)}',
    '.hx-head{padding:9px 14px}.hx-logo{width:32px;height:32px}.hx-t{font-size:15px}.hx-s{display:none}.hx-body{padding:12px 16px 16px}}',

    /* ── App panel ── */
    '.ap-state{display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:12px;margin-bottom:14px;',
    'border:1px solid rgba(44,191,128,.45);background:linear-gradient(90deg,rgba(44,191,128,.14),rgba(44,191,128,.04));font:400 15px/1.45 "EB Garamond",Georgia,serif;color:#D8F2E4}',
    '.ap-state b{color:#8FE8BD;font-weight:600}',
    '.ap-state svg{flex:none;width:22px;height:22px}',
    '.ap-cta{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;padding:16px 14px 18px;margin-bottom:14px;border-radius:14px;',
    'border:1px solid rgba(201,168,76,.35);background:radial-gradient(ellipse 90% 90% at 50% 0%,rgba(201,168,76,.12),transparent 70%)}',
    '.ap-cta .hx-btn{font-size:12px;padding:13px 24px}',
    '.ap-cta small{font:italic 13.5px/1.4 "EB Garamond",Georgia,serif;color:#BBA880}',
    '.ap-tabs{display:flex;gap:6px;margin:4px 0 12px;padding:4px;border-radius:24px;background:rgba(0,0,0,.28);border:1px solid rgba(201,168,76,.18)}',
    '.hx-tab{flex:1;min-width:0;cursor:pointer;border:none;border-radius:20px;padding:9px 8px;background:none;color:#B8A882;',
    'font:500 10.5px/1.1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
    'transition:background .2s,color .2s;-webkit-tap-highlight-color:transparent}',
    '.hx-tab[aria-selected="true"]{background:linear-gradient(180deg,rgba(232,201,122,.24),rgba(201,168,76,.1));color:#F3DC98;box-shadow:inset 0 0 0 1px rgba(201,168,76,.45)}',
    '.ap-steps{list-style:none;margin:0;padding:0;counter-reset:s}',
    '.ap-steps li{position:relative;counter-increment:s;padding:11px 12px 11px 52px;margin-bottom:8px;border-radius:12px;',
    'background:rgba(255,236,200,.035);border:1px solid rgba(201,168,76,.14);font:400 15.5px/1.5 "EB Garamond",Georgia,serif;color:#E9DDC0}',
    '.ap-steps li::before{content:counter(s);position:absolute;left:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;',
    'display:flex;align-items:center;justify-content:center;font:700 13px/1 Cinzel,Georgia,serif;color:#1E0A05;background:linear-gradient(180deg,#EBC873,#B98A2C)}',
    '.ap-steps b{color:#F3DC98;font-weight:600}',
    '.ap-ic{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 5px;margin:0 2px;border-radius:6px;',
    'vertical-align:-5px;border:1px solid rgba(201,168,76,.45);background:rgba(0,0,0,.3);color:#F3DC98;font:600 12px/1 "JetBrains Mono",monospace}',
    '.ap-ic svg{width:14px;height:14px}',
    '.ap-note{font:italic 14px/1.5 "EB Garamond",Georgia,serif;color:#B7A47E;margin:10px 2px 0}',
    '.ap-warn{margin:0 0 12px;padding:10px 13px;border-radius:10px;border:1px solid rgba(224,120,90,.45);background:rgba(224,120,90,.1);',
    'font:400 14.5px/1.45 "EB Garamond",Georgia,serif;color:#F4D3C4}',
    '.ap-sec{margin-top:18px}',
    '.ap-h{font:600 11px/1.2 Cinzel,Georgia,serif;letter-spacing:.2em;text-transform:uppercase;color:#C9A84C;margin:0 0 9px;display:flex;align-items:center;gap:10px}',
    '.ap-h::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,.35),transparent)}',
    '.ap-link{display:flex;gap:8px;align-items:stretch;flex-wrap:wrap}',
    '.ap-url{flex:1 1 240px;min-width:0;border-radius:22px;border:1px solid rgba(201,168,76,.4);background:rgba(0,0,0,.35);color:#F0E6CC;',
    'font:400 13px/1 "JetBrains Mono",ui-monospace,monospace;padding:11px 15px;letter-spacing:.02em;outline:none}',
    '.ap-url:focus{border-color:#E8C97A}',
    '.ap-share{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center}',
    '.ap-qr{width:148px;height:148px;padding:10px;border-radius:12px;background:#F6E7C1;box-shadow:0 6px 20px rgba(0,0,0,.5),0 0 0 1px rgba(201,168,76,.6)}',
    '.ap-qr svg{display:block;width:100%;height:100%}',
    '.ap-qr-t{font:400 15px/1.5 "EB Garamond",Georgia,serif;color:#D9C9A6}',
    '.ap-qr-t b{color:#F3DC98;font-weight:600}',
    '.ap-why{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
    '.ap-why div{padding:10px 12px;border-radius:11px;border:1px solid rgba(201,168,76,.14);background:rgba(255,236,200,.03)}',
    '.ap-why b{display:block;font:600 11px/1.3 Cinzel,Georgia,serif;letter-spacing:.1em;color:#E8C97A;text-transform:uppercase}',
    '.ap-why span{display:block;font:400 14px/1.4 "EB Garamond",Georgia,serif;color:#C8B690;margin-top:3px}',
    '.ap-copied{font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.12em;color:#8FE8BD;text-transform:uppercase;align-self:center;opacity:0;transition:opacity .2s}',
    '.ap-copied.on{opacity:1}',
    '@media (max-width:520px){.ap-share{grid-template-columns:1fr;justify-items:center;text-align:center}.ap-why{grid-template-columns:1fr}.ap-steps li{font-size:15px}}',

    /* ── Tracker ── */
    '.tk-live{display:inline-flex;align-items:center;gap:7px;padding:6px 11px;border-radius:14px;border:1px solid rgba(44,191,128,.5);',
    'background:rgba(44,191,128,.1);font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.18em;color:#8FE8BD;white-space:nowrap}',
    '.tk-live i{width:7px;height:7px;border-radius:50%;background:#2CBF80;box-shadow:0 0 0 0 rgba(44,191,128,.6);animation:tkPulse 1.8s infinite}',
    '.tk-live.off{border-color:rgba(201,168,76,.35);background:rgba(0,0,0,.2);color:#C9B894}.tk-live.off i{background:#8E806A;animation:none}',
    '@keyframes tkPulse{0%{box-shadow:0 0 0 0 rgba(44,191,128,.6)}70%{box-shadow:0 0 0 8px rgba(44,191,128,0)}100%{box-shadow:0 0 0 0 rgba(44,191,128,0)}}',
    '.tk-status{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}',
    '.tk-upd{font:400 10px/1.3 "JetBrains Mono",monospace;letter-spacing:.06em;color:#A8997C;text-align:right}.tk-u2{display:block}.tk-ns{display:none}',
    '.tk-rf{width:36px;height:36px;border-radius:50%;border:1px solid rgba(201,168,76,.4);background:rgba(0,0,0,.25);color:#E8C97A;cursor:pointer;',
    'display:flex;align-items:center;justify-content:center;flex:none;-webkit-tap-highlight-color:transparent;transition:border-color .2s,background .2s}',
    '.tk-rf:hover{border-color:#E8C97A;background:rgba(201,168,76,.14)}.tk-rf svg{width:16px;height:16px}.tk-rf.spin svg{animation:tkSpin .9s linear infinite}',
    '@keyframes tkSpin{to{transform:rotate(360deg)}}',
    '.tk-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:14px}',
    '.tk-card{position:relative;border-radius:14px;border:1px solid rgba(201,168,76,.17);padding:14px 16px 15px;',
    'background:linear-gradient(180deg,rgba(255,236,200,.045),rgba(255,236,200,.018));min-width:0}',
    '.tk-h{font:600 10.5px/1.2 Cinzel,Georgia,serif;letter-spacing:.2em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:10px}',
    '.tk-h small{font:400 9.5px/1.2 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:none;color:#9C8D70;text-align:right}',
    '.tk-hero{grid-column:span 4;display:flex;flex-direction:column;justify-content:space-between;',
    'background:radial-gradient(ellipse 100% 70% at 30% 0%,rgba(232,201,122,.13),transparent 70%),linear-gradient(180deg,rgba(255,236,200,.05),rgba(255,236,200,.02));border-color:rgba(201,168,76,.32)}',
    '.tk-big{font:700 clamp(40px,5.2vw,58px)/1 Cinzel,Georgia,serif;letter-spacing:.02em;margin:4px 0 6px;',
    'background:linear-gradient(180deg,#FFF1C2 0%,#E8C97A 45%,#B98A2C 100%);-webkit-background-clip:text;background-clip:text;color:transparent;',
    'filter:drop-shadow(0 2px 12px rgba(232,201,122,.22));font-variant-numeric:tabular-nums}',
    '.tk-bigl{font:400 15px/1.45 "EB Garamond",Georgia,serif;color:#D2C19C}',
    '.tk-you{display:flex;gap:9px;align-items:flex-start;margin-top:12px;padding:10px 12px;border-radius:11px;background:rgba(0,0,0,.24);',
    'border:1px solid rgba(201,168,76,.16);font:400 14px/1.45 "EB Garamond",Georgia,serif;color:#DCCCA8}',
    '.tk-you b{color:#F3DC98;font-weight:600}.tk-you .tk-flag{font-size:17px}',
    '.tk-ms{margin-top:12px}',
    '.tk-ms-t{display:flex;justify-content:space-between;gap:8px;font:400 10px/1.3 "JetBrains Mono",monospace;letter-spacing:.05em;color:#B8A882;margin-bottom:6px}',
    '.tk-ms-t b{color:#E8C97A;font-weight:500}',
    '.tk-bar{height:7px;border-radius:5px;background:rgba(0,0,0,.4);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(201,168,76,.14)}',
    '.tk-bar i{display:block;height:100%;border-radius:5px;background:linear-gradient(90deg,#8A6424,#E8C97A);transition:width .9s cubic-bezier(.2,.8,.2,1)}',
    '.tk-tiles{grid-column:span 8;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
    '.tk-tile{position:relative;border-radius:13px;border:1px solid rgba(201,168,76,.17);padding:13px 14px 12px;min-width:0;overflow:hidden;',
    'background:linear-gradient(180deg,rgba(255,236,200,.05),rgba(255,236,200,.015))}',
    '.tk-tile::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#E8C97A,#7A5F28);opacity:.75}',
    '.tk-tl{font:500 9.5px/1.2 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#C9B894}',
    '.tk-tn{font:700 clamp(24px,2.6vw,31px)/1.1 Cinzel,Georgia,serif;color:#F3DC98;margin:7px 0 4px;font-variant-numeric:tabular-nums;letter-spacing:.01em}',
    '.tk-tc{font:italic 400 13px/1.3 "EB Garamond",Georgia,serif;color:#A8997C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.tk-dl{position:absolute;top:10px;right:10px;font:600 9.5px/1 "JetBrains Mono",monospace;color:#8FE8BD;background:rgba(44,191,128,.14);',
    'border:1px solid rgba(44,191,128,.4);border-radius:10px;padding:3px 6px;opacity:0;transform:translateY(-3px);transition:opacity .4s,transform .4s}',
    '.tk-dl.on{opacity:1;transform:none}',
    '.tk-flash{animation:tkFlash 1.4s ease}',
    '@keyframes tkFlash{0%{box-shadow:0 0 0 0 rgba(232,201,122,.0)}20%{box-shadow:0 0 0 2px rgba(232,201,122,.55),0 0 26px rgba(232,201,122,.25)}100%{box-shadow:0 0 0 0 rgba(232,201,122,0)}}',
    '.tk-map{grid-column:span 8;padding-bottom:10px}',
    '.tk-mapw{position:relative;border-radius:10px;overflow:hidden;background:radial-gradient(ellipse 70% 60% at 50% 45%,rgba(120,30,40,.25),transparent 75%),#140408;',
    'border:1px solid rgba(201,168,76,.12)}',
    '.tk-mapw svg{display:block;width:100%;height:auto}',
    '.tk-mapw .l{fill:#5E2A2C;opacity:.62}',
    '.tk-tip{position:absolute;pointer-events:none;transform:translate(-50%,-120%);white-space:nowrap;padding:5px 9px;border-radius:8px;',
    'background:rgba(20,5,8,.94);border:1px solid rgba(201,168,76,.55);font:500 11px/1.2 "JetBrains Mono",monospace;color:#F3DC98;opacity:0;transition:opacity .15s}',
    '.tk-tip.on{opacity:1}',
    '.tk-conts{display:flex;height:8px;border-radius:5px;overflow:hidden;margin-top:10px;background:rgba(0,0,0,.35)}',
    '.tk-conts i{display:block;height:100%}',
    '.tk-ckey{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:7px;font:400 10px/1.3 "JetBrains Mono",monospace;color:#B8A882}',
    '.tk-ckey span{display:inline-flex;align-items:center;gap:5px;white-space:nowrap}.tk-ckey span i{width:8px;height:8px;border-radius:2px;display:inline-block}',
    '.tk-countries{grid-column:span 4;display:flex;flex-direction:column}',
    '.tk-list{list-style:none;margin:0;padding:0;overflow:auto;max-height:352px;scrollbar-width:thin;scrollbar-color:#7A5F28 transparent}',
    '.tk-list li{display:grid;grid-template-columns:18px 26px minmax(0,1fr) auto;align-items:center;gap:8px;padding:7px 2px;border-bottom:1px solid rgba(201,168,76,.08)}',
    '.tk-list li:last-child{border-bottom:none}',
    '.tk-rk{font:500 10px/1 "JetBrains Mono",monospace;color:#8E806A;text-align:right}',
    '.tk-flag{font-size:18px;line-height:1;text-align:center}',
    '.tk-flag-code{display:inline-flex;align-items:center;justify-content:center;height:18px;min-width:24px;padding:0 3px;border-radius:4px;',
    'font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:.04em;color:#1E0A05;background:linear-gradient(180deg,#E8C97A,#B98A2C)}',
    '.tk-cn{min-width:0}',
    '.tk-cn b{display:block;font:500 14.5px/1.25 "EB Garamond",Georgia,serif;color:#F0E6CC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.tk-cn .tk-bar{height:4px;margin-top:4px}',
    '.tk-cn small{display:block;font:italic 11.5px/1.2 "EB Garamond",Georgia,serif;color:#9C8D70;margin-top:2px}',
    '.tk-cv{text-align:right;font:600 13px/1.1 "JetBrains Mono",monospace;color:#F3DC98;font-variant-numeric:tabular-nums}',
    '.tk-cv small{display:block;font:400 9.5px/1.2 "JetBrains Mono",monospace;color:#9C8D70;margin-top:2px}',
    '.tk-more{margin-top:10px;align-self:center;cursor:pointer;border-radius:16px;border:1px solid rgba(201,168,76,.4);background:rgba(0,0,0,.2);',
    'color:#E8C97A;font:500 10px/1 "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;padding:8px 14px}',
    '.tk-chart{grid-column:span 6}',
    '.tk-read{font:400 10.5px/1.3 "JetBrains Mono",monospace;color:#D9C9A6;min-height:14px;margin:-2px 0 8px;letter-spacing:.03em}',
    '.tk-read b{color:#F3DC98;font-weight:600}',
    '.tk-bars{display:flex;align-items:flex-end;gap:3px;height:120px;padding:0 1px;border-bottom:1px solid rgba(201,168,76,.25);touch-action:pan-y}',
    '.tk-bars span{flex:1;min-width:0;position:relative;height:100%;display:flex;align-items:flex-end;cursor:pointer}',
    '.tk-bars span i{display:block;width:100%;border-radius:3px 3px 0 0;min-height:2px;background:linear-gradient(180deg,#E8C97A,#8A6424);',
    'opacity:.85;transition:height .8s cubic-bezier(.2,.8,.2,1),opacity .2s}',
    '.tk-bars span.z i{background:rgba(201,168,76,.18)}',
    '.tk-bars span:hover i,.tk-bars span.sel i{opacity:1;filter:brightness(1.2)}',
    '.tk-bars span.now i{background:linear-gradient(180deg,#8FE8BD,#1C8A5C)}',
    '.tk-ax{display:flex;justify-content:space-between;margin-top:6px;font:400 9.5px/1 "JetBrains Mono",monospace;color:#9C8D70}',
    '.tk-ins{grid-column:span 12;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}',
    '.tk-in{border-radius:12px;border:1px solid rgba(201,168,76,.14);padding:11px 12px;background:rgba(0,0,0,.18);min-width:0}',
    '.tk-in b{display:block;font:700 18px/1.15 Cinzel,Georgia,serif;color:#F3DC98;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.tk-in span{display:block;font:500 9px/1.3 "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#A8997C;margin-top:5px}',
    '.tk-in small{display:block;font:italic 12.5px/1.3 "EB Garamond",Georgia,serif;color:#9C8D70;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.tk-third{grid-column:span 4}',
    '.tk-rows{display:flex;flex-direction:column;gap:9px}',
    '.tk-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 10px;align-items:center}',
    '.tk-row em{font:400 14px/1.2 "EB Garamond",Georgia,serif;font-style:normal;color:#E6D8B8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.tk-row strong{font:600 12px/1 "JetBrains Mono",monospace;color:#F3DC98;text-align:right;font-variant-numeric:tabular-nums}',
    '.tk-row strong small{font-weight:400;color:#9C8D70;margin-left:5px}',
    '.tk-row .tk-bar{grid-column:1 / -1;height:5px}',
    '.tk-seg{display:flex;height:26px;border-radius:8px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(201,168,76,.2);background:rgba(0,0,0,.3)}',
    '.tk-seg i{display:flex;align-items:center;justify-content:center;font:600 9.5px/1 "JetBrains Mono",monospace;color:#1E0A05;white-space:nowrap;overflow:hidden;',
    'transition:width .9s cubic-bezier(.2,.8,.2,1)}',
    '.tk-segk{display:flex;flex-wrap:wrap;gap:4px 12px;margin:7px 0 12px;font:400 10px/1.3 "JetBrains Mono",monospace;color:#B8A882}',
    '.tk-segk span{display:inline-flex;align-items:center;gap:5px}.tk-segk i{width:8px;height:8px;border-radius:2px;display:inline-block}',
    '.tk-empty{font:italic 14px/1.5 "EB Garamond",Georgia,serif;color:#9C8D70;padding:6px 0}',
    '.tk-foot{grid-column:span 12;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:start;',
    'padding:14px 16px;border-radius:14px;border:1px dashed rgba(201,168,76,.22);background:rgba(0,0,0,.14)}',
    '.tk-foot p{margin:0 0 6px;font:400 13.5px/1.55 "EB Garamond",Georgia,serif;color:#B7A47E}.tk-foot p:last-child{margin:0}',
    '.tk-foot b{color:#E0CC98;font-weight:600}',
    '.tk-banner{grid-column:span 12;padding:10px 14px;border-radius:11px;font:400 14.5px/1.45 "EB Garamond",Georgia,serif;',
    'border:1px solid rgba(224,160,90,.45);background:rgba(224,160,90,.1);color:#F2DCC0}',
    '.tk-skel{opacity:.4}',
    '@media (min-width:1021px){.tk-countries{contain:size}.tk-countries .tk-list{flex:1;min-height:0;max-height:none;',
    '-webkit-mask-image:linear-gradient(180deg,#000 88%,transparent);mask-image:linear-gradient(180deg,#000 88%,transparent);padding-bottom:14px}}',
    '@media (max-width:1020px){.tk-hero{grid-column:span 12}.tk-tiles{grid-column:span 12}.tk-map,.tk-countries{grid-column:span 12}',
    '.tk-list{max-height:none!important}.tk-ins{grid-template-columns:repeat(3,minmax(0,1fr))}}',
    '@media (max-width:760px){.tk-chart,.tk-third{grid-column:span 12}.tk-foot{grid-template-columns:1fr}}',
    '@media (max-width:560px){.tk-grid{gap:10px}.tk-tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.tk-ins{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
    '.tk-card{padding:12px 13px 13px}.tk-tile{padding:11px 12px 10px}.tk-bars{height:96px;gap:2px}.tk-big{font-size:44px}',
    '.hx-head{flex-wrap:wrap;row-gap:10px}.hx-head .hx-k{display:none}.hx-head .hx-ht{flex:1 1 0}',
    '.hx-head .tk-status{order:3;flex:1 1 100%;flex-wrap:nowrap;justify-content:flex-end;padding-top:9px;border-top:1px solid rgba(201,168,76,.14)}',
    '.hx-head .tk-upd{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hx-head .tk-nl{display:none}.hx-head .tk-ns{display:inline}',
    '.hx-head .tk-upd{text-align:left;font-size:9.5px}.hx-head .tk-u2{display:inline}.hx-head .tk-u2::before{content:"· "}}',
    '@media (max-height:500px) and (min-width:480px){.tk-tiles{grid-template-columns:repeat(3,minmax(0,1fr))}.tk-bars{height:84px}}',
    '@media (prefers-reduced-motion:reduce){.hx-ov,.hx-sheet,.tk-bar i,.tk-bars span i,.tk-seg i{transition:none!important}.tk-live i,.tk-flash,.tk-rf.spin svg{animation:none!important}}'
  ].join('');

  function injectCSS() {
    if (document.getElementById('hx-css')) return;
    var s = h('style', { id: 'hx-css' }); s.textContent = CSS; document.head.appendChild(s);
  }

  /* ── overlay shell (focus trap, Esc, back button, scroll lock) ─────────── */
  var cur = null;
  function shell(opts) {
    injectCSS();
    var hadState = false;
    if (cur) { hadState = cur.pushed; close(true, true); }
    var ov = h('div', { class: 'hx-ov', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'hx-title' });
    var sheet = h('div', { class: 'hx-sheet' + (opts.narrow ? ' narrow' : '') });
    var head = h('div', { class: 'hx-head' });
    head.innerHTML =
      '<img class="hx-logo" alt="" src="' + ROOT + 'app/icon-96.png">' +
      '<div class="hx-ht"><div class="hx-k">The Chronicles</div><div class="hx-t" id="hx-title">' + opts.title + '</div>' +
      (opts.sub ? '<div class="hx-s">' + opts.sub + '</div>' : '') + '</div>' +
      (opts.headExtra || '') +
      '<button type="button" class="hx-x" aria-label="Close">✕</button>';
    var body = h('div', { class: 'hx-body' });
    sheet.appendChild(head); sheet.appendChild(body); ov.appendChild(sheet);
    document.body.appendChild(ov);
    document.documentElement.classList.add('chx-hub-open');
    var prevFocus = document.activeElement;
    cur = { ov: ov, sheet: sheet, head: head, body: body, prevFocus: prevFocus, onClose: opts.onClose, pushed: false };
    $('.hx-x', head).addEventListener('click', function () { close(); });
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', trap, true);
    if (hadState) cur.pushed = true;
    else { try { history.pushState({ chxHub: 1 }, ''); cur.pushed = true; } catch (e) {} }
    requestAnimationFrame(function () { requestAnimationFrame(function () { ov.classList.add('on'); }); });
    setTimeout(function () { var x = $('.hx-x', head); if (x && cur && cur.ov === ov) x.focus({ preventScroll: true }); }, 60);
    return cur;
  }
  function trap(e) {
    if (!cur) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = $$('button,a[href],input,[tabindex]:not([tabindex="-1"])', cur.sheet).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1], a = document.activeElement;
    if (!cur.sheet.contains(a)) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
    else if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
  }
  function close(silent, fromPop) {
    if (!cur) return;
    var c = cur; cur = null;
    document.removeEventListener('keydown', trap, true);
    if (c.onClose) try { c.onClose(); } catch (e) {}
    document.documentElement.classList.remove('chx-hub-open');
    if (c.pushed && !fromPop) { try { if (history.state && history.state.chxHub) history.back(); } catch (e) {} }
    if (silent) { c.ov.remove(); return; }
    c.ov.classList.remove('on');
    setTimeout(function () { c.ov.remove(); }, reduced ? 0 : 300);
    try { if (c.prevFocus && c.prevFocus.focus) c.prevFocus.focus({ preventScroll: true }); } catch (e) {}
  }
  window.addEventListener('popstate', function () { if (cur) close(false, true); });

  /* ═══════════════════════════════════════════════════════════════════════
     THE CHRONICLES APP
     ═══════════════════════════════════════════════════════════════════════ */
  var I_SHARE = '<svg viewBox="0 0 13 15" aria-hidden="true"><path d="M6.5 1v8.6M3.6 3.8 6.5 1l2.9 2.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.4 6H2.2v7.8h8.6V6H8.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  var I_ADD = '<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1.2" y="1.2" width="11.6" height="11.6" rx="2.6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M7 4v6M4 7h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
  var I_DOTS_V = '⋮';
  var I_OK = '<svg viewBox="0 0 22 22" aria-hidden="true"><circle cx="11" cy="11" r="10" fill="#1C8A5C"/><path d="M6.5 11.4l3 3 6-6.4" fill="none" stroke="#EFFFF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var I_INSTALL = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="2" width="13" height="9.5" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 4.5v4.6M5.9 7.2 8 9.3l2.1-2.1M5 14h6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var inApp = /Instagram|FBAN|FBAV|FB_IAB|LinkedInApp|Line\/|Snapchat|musical_ly|BytedanceWebview|TikTok|; wv\)/i.test(ua);

  function platform() {
    if (APP.isIOS) return 'ios';
    if (APP.isAndroid) return 'android';
    return 'desktop';
  }

  function stepsFor(p) {
    if (p === 'ios') {
      return (inApp && APP.isIOS ? '<div class="ap-warn">You are inside another app’s browser. First open this page in <b>Safari</b>: tap <b>•••</b> or the compass icon, then <b>Open in Safari</b>.</div>' : '') +
        '<ol class="ap-steps">' +
        '<li>Open <b>rayyan200103.github.io/THE-CHRONICLE</b> in <b>Safari</b>.</li>' +
        '<li>Tap <span class="ap-ic">•••</span> beside the address bar, then <span class="ap-ic">' + I_SHARE + '</span> <b>Share</b>. On older iPhones, tap the <span class="ap-ic">' + I_SHARE + '</span> Share button at the bottom of the screen.</li>' +
        '<li>Scroll down and tap <span class="ap-ic">' + I_ADD + '</span> <b>Add to Home Screen</b>.</li>' +
        '<li>Keep <b>Open as Web App</b> switched on, then tap <b>Add</b>.</li>' +
        '<li>The maroon and gold book is now on your Home Screen. Tap it to open The Chronicles full-screen.</li>' +
        '</ol><p class="ap-note">Works in Safari on every iPhone and iPad; on iOS 16.4 and later, Chrome and Edge can also add it through their Share menu.</p>';
    }
    if (p === 'android') {
      return (inApp && APP.isAndroid ? '<div class="ap-warn">You are inside another app’s browser. First open this page in <b>Chrome</b>: tap <b>' + I_DOTS_V + '</b>, then <b>Open in Chrome</b> (or <b>Open in browser</b>).</div>' : '') +
        '<ol class="ap-steps">' +
        '<li>Open <b>rayyan200103.github.io/THE-CHRONICLE</b> in <b>Chrome</b>.</li>' +
        '<li>Tap <span class="ap-ic">' + I_DOTS_V + '</span> at the top right of the screen.</li>' +
        '<li>Tap <b>Add to home screen</b>, then <b>Install</b>. (If Chrome shows <b>Install app</b> instead, tap that.)</li>' +
        '<li>The Chronicles appears on your home screen and in your app drawer.</li>' +
        '</ol><p class="ap-note">In Samsung Internet: tap <b>☰</b>, then <b>Add page to</b> → <b>Home screen</b>. In Edge: <b>•••</b> → <b>Add to phone</b>.</p>';
    }
    return '<ol class="ap-steps">' +
      '<li>Open <b>rayyan200103.github.io/THE-CHRONICLE</b> in <b>Chrome</b> or <b>Edge</b>.</li>' +
      '<li>Click the install icon <span class="ap-ic">' + I_INSTALL + '</span> at the right-hand end of the address bar.</li>' +
      '<li>Click <b>Install</b>. The Chronicles opens in its own window and gets its own icon in your dock, taskbar or Start menu.</li>' +
      '</ol><p class="ap-note">No install icon? In Chrome use <b>⋮</b> → <b>Cast, save and share</b> → <b>Install page as app</b>; in Edge use <b>•••</b> → <b>Apps</b> → <b>Install this site as an app</b>. On a Mac with Safari: <b>File</b> → <b>Add to Dock</b>.</p>';
  }

  function openApp() {
    var p = platform();
    var c = shell({
      title: 'The Chronicles App',
      sub: 'Free · no sign-up · no app store · updates itself',
      narrow: true
    });
    var b = c.body;
    function render() {
      var st = '';
      if (APP.standalone) st = '<div class="ap-state">' + I_OK + '<div><b>You are reading in the app.</b> Every new edition reaches you the next time you open it — nothing to update.</div></div>';
      else if (APP.installed) st = '<div class="ap-state">' + I_OK + '<div><b>Installed on this device.</b> Open it from your home screen, dock or Start menu.</div></div>';

      var cta = '';
      if (!APP.standalone && APP.canPrompt) {
        cta = '<div class="ap-cta"><button type="button" class="hx-btn" id="apInstall">' + I_INSTALL + ' Install The Chronicles</button>' +
          '<small>One tap. Your browser will ask you to confirm.</small></div>';
      }
      var tabs = [['ios', 'iPhone & iPad'], ['android', 'Android'], ['desktop', 'Computer']];
      var tabHtml = '<div class="ap-tabs" role="tablist" aria-label="Choose your device">' + tabs.map(function (t) {
        return '<button type="button" class="hx-tab" role="tab" id="apTab-' + t[0] + '" aria-controls="apSteps" aria-selected="' + (t[0] === p) + '" data-p="' + t[0] + '">' + t[1] + '</button>';
      }).join('') + '</div>';

      b.innerHTML = st + cta +
        '<div class="ap-sec" style="margin-top:' + (st || cta ? '6px' : '0') + '"><div class="ap-h">' + (APP.standalone ? 'Install it on another device' : 'Install in a minute') + '</div>' +
        tabHtml + '<div id="apSteps" role="tabpanel">' + stepsFor(p) + '</div></div>' +
        '<div class="ap-sec"><div class="ap-h">The link</div>' +
        '<div class="ap-link"><input class="ap-url" id="apUrl" type="text" readonly value="' + SITE_URL + '" aria-label="The Chronicles web address">' +
        '<button type="button" class="hx-btn sm" id="apCopy">Copy link</button>' +
        (navigator.share ? '<button type="button" class="hx-btn sm ghost" id="apShare">Share</button>' : '') +
        '<span class="ap-copied" id="apCopied" role="status" aria-live="polite">Copied</span></div></div>' +
        '<div class="ap-sec"><div class="ap-h">From a computer to a phone</div><div class="ap-share">' +
        '<div class="ap-qr" role="img" aria-label="QR code for ' + SITE_URL + '">' +
        '<svg viewBox="0 0 ' + QR.n + ' ' + QR.n + '" shape-rendering="crispEdges"><path stroke="#3A0710" d="' + QR.d + '"/></svg></div>' +
        '<div class="ap-qr-t">Point your phone’s camera at the code and tap the link that appears. The Chronicles opens on your phone — then follow the steps for your phone above.</div></div></div>' +
        '<div class="ap-sec"><div class="ap-h">Why install it</div><div class="ap-why">' +
        '<div><b>Full-screen</b><span>Opens like any app, from its own icon — no address bar, no tabs.</span></div>' +
        '<div><b>Reads offline</b><span>Every page you have opened stays readable without a connection.</span></div>' +
        '<div><b>Updates itself</b><span>Each new edition arrives automatically. Nothing to download again.</span></div>' +
        '<div><b>Private</b><span>No account, no permissions, no app store. It is the website, installed.</span></div>' +
        '</div></div>';

      $$('.hx-tab', b).forEach(function (t) {
        t.addEventListener('click', function () {
          p = t.getAttribute('data-p');
          $$('.hx-tab', b).forEach(function (x) { x.setAttribute('aria-selected', String(x === t)); });
          $('#apSteps', b).innerHTML = stepsFor(p);
        });
        t.addEventListener('keydown', function (e) {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          var all = $$('.hx-tab', b), i = all.indexOf(t);
          var n = all[(i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length];
          n.focus(); n.click();
        });
      });
      var inst = $('#apInstall', b);
      if (inst) inst.addEventListener('click', function () {
        inst.disabled = true;
        APP.promptInstall().then(function (o) {
          if (o === 'accepted') { b.insertAdjacentHTML('afterbegin', '<div class="ap-state">' + I_OK + '<div><b>Installing.</b> The Chronicles will appear on your home screen in a moment.</div></div>'); inst.closest('.ap-cta').remove(); }
          else { inst.disabled = false; }
        });
      });
      var url = $('#apUrl', b);
      url.addEventListener('focus', function () { url.select(); });
      $('#apCopy', b).addEventListener('click', function () {
        var ok = function () { var m = $('#apCopied', b); m.classList.add('on'); setTimeout(function () { m.classList.remove('on'); }, 1800); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(SITE_URL).then(ok, fallback);
        else fallback();
        function fallback() { try { url.focus(); url.select(); if (document.execCommand('copy')) ok(); } catch (e) {} }
      });
      var sh = $('#apShare', b);
      if (sh) sh.addEventListener('click', function () {
        navigator.share({ title: 'The Chronicles', text: 'The Chronicles — an interactive world history timeline by Chaudhry Muhammad Rayyan Shahid.', url: SITE_URL }).catch(function () {});
      });
    }
    render();
    c.kind = 'app';
    appRender = render;
  }
  var appRender = null;
  if (APP.onInstallChange) APP.onInstallChange(function () { if (cur && cur.kind === 'app' && appRender) appRender(); });

  /* ═══════════════════════════════════════════════════════════════════════
     THE CHRONICLES ENGAGEMENT TRACKER
     ═══════════════════════════════════════════════════════════════════════ */
  var tkState = { data: null, shown: {}, timer: 0, tick: 0, next: 0, firstHour: null, loading: false, updatedAt: 0, showAll: false };

  function q(path, params) {
    var url = TRK.base + '/v1/' + path + '.json';
    var qs = [];
    if (params) for (var k in params) qs.push(k + '=' + encodeURIComponent(params[k]));
    if (qs.length) url += '?' + qs.join('&');
    return fetch(url, { cache: 'no-store', credentials: 'omit' }).then(function (r) {
      if (!r.ok) { var e = new Error('http ' + r.status); e.status = r.status; throw e; }
      return r.json();
    });
  }

  function fetchAll() {
    var now = Date.now();
    var jobs = {
      total: q('total'),
      h: q('h', { orderBy: '"$key"', startAt: '"' + hourKey(now - 7 * 864e5) + '"', endAt: '"' + hourKey(now + 36e5) + '"' }),
      d: q('d', { orderBy: '"$key"', startAt: '"' + dayKey(now - 59 * 864e5) + '"', endAt: '"' + dayKey(now + 864e5) + '"' }),
      wNow: q('w/' + isoWeek(now)),
      wPrev: q('w/' + isoWeek(now - 7 * 864e5)),
      mNow: q('m/' + monthKey(now)),
      yNow: q('y/' + yearKey(now)),
      c: q('c'),
      dc: q('dc', { orderBy: '"$key"', startAt: '"' + dayKey(now - 864e5) + '"', endAt: '"' + dayKey(now + 864e5) + '"' }),
      p: q('p'), s: q('s'), a: q('a'), v: q('v')
    };
    if (tkState.firstHour === null) {
      var B0 = (TRK && TRK.baseline) || {};
      var from = hourKey(Date.parse((B0.asOf || '2026-09-30') + 'T00:00:00Z') - 864e5);
      jobs.first = q('h', { orderBy: '"$key"', startAt: '"' + from + '"', limitToFirst: 1 });
    }
    var keys = Object.keys(jobs);
    return Promise.all(keys.map(function (k) { return jobs[k]; })).then(function (vals) {
      var o = { now: now };
      keys.forEach(function (k, i) { o[k] = vals[i]; });
      if (o.first !== undefined) {
        var fk = o.first && Object.keys(o.first)[0];
        tkState.firstHour = fk ? keyToMs(fk) : 0;
      }
      return o;
    });
  }

  function compute(raw) {
    var B = (TRK && TRK.baseline) || {};
    var now = raw.now;
    var asOf = Date.parse((B.asOf || '2026-09-30') + 'T12:00:00Z');
    var launch = tkState.firstHour || now;
    var h = raw.h || {}, d = raw.d || {};
    var hNow = hourKey(now);
    // past 24 h = the current clock hour and the 23 before it
    var h24 = hourKey(now - 23 * 36e5), live24 = 0;
    for (var k in h) if (k >= h24 && k <= hNow) live24 += +h[k] || 0;
    var asOfEnd = Date.parse((B.asOf || '2026-09-30') + 'T23:59:59Z');
    // The carried-over figure sits in the 24 hourly slots before live counting began and
    // leaves the rolling window one hour at a time, exactly as live hours do.
    var hrsIn = Math.max(0, Math.round((keyToMs(hNow) - keyToMs(hourKey(launch))) / 36e5));
    var fade = (launch - asOfEnd) < 864e5 && hrsIn < 24 ? (24 - hrsIn) / 24 : 0;
    var base24 = Math.round((+B.past24h || 0) * fade);
    var bw = isoWeek(asOf) === isoWeek(now) ? (+B.week || 0) : 0;
    var bm = monthKey(asOf) === monthKey(now) ? (+B.month || 0) : 0;
    var by = yearKey(asOf) === yearKey(now) ? (+B.year || 0) : 0;
    var liveTotal = +raw.total || 0;
    var m = {
      hour: +h[hNow] || 0,
      past24: live24 + base24,
      week: (+raw.wNow || 0) + bw,
      month: (+raw.mNow || 0) + bm,
      year: (+raw.yNow || 0) + by,
      all: liveTotal + (+B.sinceLaunch || 0),
      liveTotal: liveTotal,
      weekLive: +raw.wNow || 0, weekPrevLive: +raw.wPrev || 0
    };
    var last7 = 0, prev7 = 0;
    for (var i7 = 0; i7 < 14; i7++) { var dk7 = dayKey(now - i7 * 864e5); if (i7 < 7) last7 += +d[dk7] || 0; else prev7 += +d[dk7] || 0; }
    m.last7 = last7; m.prev7 = prev7;
    // countries: live + carried-over figures
    // Only well-formed country codes are ever displayed, whatever the database holds.
    var cs = {}, c = raw.c || {};
    for (var cc in c) if (/^[A-Z]{2}$/.test(cc) && +c[cc] > 0) cs[cc] = (cs[cc] || 0) + (+c[cc] || 0);
    var bc = B.countries || {};
    for (var cb in bc) if (/^[A-Z]{2}$|^EUROPE$/.test(cb)) cs[cb] = (cs[cb] || 0) + (+bc[cb] || 0);
    m.countries = Object.keys(cs).filter(function (k) { return cs[k] > 0; }).map(function (k) {
      return { cc: k, n: cs[k], live: +c[k] || 0, carried: +bc[k] || 0 };
    }).sort(function (a, b) { return b.n - a.n || a.cc.localeCompare(b.cc); });
    m.countryCount = m.countries.filter(function (x) { return /^[A-Z]{2}$/.test(x.cc) && x.cc !== 'ZZ'; }).length;
    var dcToday = (raw.dc || {})[dayKey(now)] || {};
    m.countriesToday = Object.keys(dcToday).filter(function (k) { return k !== 'ZZ' && dcToday[k] > 0; }).length;
    // continents
    var ct = {};
    m.countries.forEach(function (x) { var k = continentOf(x.cc) || '??'; ct[k] = (ct[k] || 0) + x.n; });
    m.continents = ct;
    // 24 hourly bars (oldest → now)
    m.bars24 = [];
    for (var i = 23; i >= 0; i--) { var t = now - i * 36e5; var hk = hourKey(t); m.bars24.push({ k: hk, ms: keyToMs(hk), n: +h[hk] || 0 }); }
    // 30 daily bars
    m.bars30 = [];
    for (var j = 29; j >= 0; j--) { var t2 = now - j * 864e5; var dk = dayKey(t2); m.bars30.push({ k: dk, ms: keyToMs(dk), n: +d[dk] || 0 }); }
    // busiest hour of day over the last 7 days (in the reader's own time)
    var byLocalHour = {}, sum7 = 0;
    for (var hk2 in h) {
      var ms = keyToMs(hk2);
      if (ms < now - 7 * 864e5) continue;
      var lh = new Date(ms).getHours();
      byLocalHour[lh] = (byLocalHour[lh] || 0) + (+h[hk2] || 0); sum7 += +h[hk2] || 0;
    }
    var bestH = -1, bestHn = 0;
    for (var lh2 in byLocalHour) if (byLocalHour[lh2] > bestHn) { bestHn = byLocalHour[lh2]; bestH = +lh2; }
    m.peakHour = bestH >= 0 ? { h: bestH, n: bestHn } : null;
    var bestD = null;
    m.bars30.forEach(function (x) { if (x.n > 0 && (!bestD || x.n > bestD.n)) bestD = x; });
    m.bestDay = bestD;
    var dom = new Date(now).getUTCDate();
    m.dailyAvg = m.month / dom;
    m.p = raw.p || {}; m.s = raw.s || {}; m.a = raw.a || {}; m.v = raw.v || {};
    m.launch = tkState.firstHour || 0;
    return m;
  }

  function countTo(el, to, from) {
    if (!el) return;
    if (from == null || reduced || from === to) { el.textContent = fmt(to); return; }
    var t0 = null, dur = Math.min(1400, 500 + Math.abs(to - from) * 2);
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur); var e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(from + (to - from) * e);
      if (k < 1 && el.isConnected) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var MILESTONES = [500, 1000, 2500, 5000, 7500, 10000, 15000, 20000, 25000, 35000, 50000, 75000, 100000, 150000, 250000, 500000, 750000, 1000000, 2500000, 5000000, 10000000];
  function milestone(n) {
    var prev = 0;
    for (var i = 0; i < MILESTONES.length; i++) { if (MILESTONES[i] > n) return { prev: prev, next: MILESTONES[i] }; prev = MILESTONES[i]; }
    return { prev: prev, next: prev * 2 };
  }

  var PAGE_NAMES = [['timeline', 'The Timeline'], ['before_adam', 'Before Adam'], ['karbala', 'Karbala'], ['comparative_religion', 'Comparative Religion'], ['about', 'About Me']];
  var SRC_NAMES = { direct: 'Direct, bookmarks & the app', google: 'Google', bing: 'Bing', search: 'Other search engines', facebook: 'Facebook', instagram: 'Instagram', whatsapp: 'WhatsApp', x: 'X (Twitter)', linkedin: 'LinkedIn', youtube: 'YouTube', tiktok: 'TikTok', reddit: 'Reddit', telegram: 'Telegram', github: 'GitHub', ai: 'AI assistants', other: 'Other websites' };
  var CONT_COL = { AS: '#E8C97A', EU: '#7FA6E8', AF: '#E0915E', NA: '#6CCFA0', SA: '#48B8A8', OC: '#6AB8E0', AN: '#C8C8C8', '??': '#6E6250' };

  function rowsHtml(list, total) {
    if (!total) return '<div class="tk-empty">Figures appear here as readers arrive.</div>';
    var top = list.reduce(function (m, x) { return Math.max(m, x[1]); }, 0) || 1;
    return '<div class="tk-rows">' + list.map(function (x) {
      return '<div class="tk-row"><em>' + esc(x[0]) + '</em><strong>' + fmt(x[1]) + '<small>' + pctTxt(x[1], total) + '</small></strong>' +
        '<div class="tk-bar"><i style="width:' + pct(x[1], top).toFixed(2) + '%"></i></div></div>';
    }).join('') + '</div>';
  }
  function segHtml(parts, total) {
    if (!total) return '<div class="tk-empty">Figures appear here as readers arrive.</div>';
    return '<div class="tk-seg">' + parts.map(function (p) {
      var w = pct(p[1], total);
      return w > 0 ? '<i style="width:' + w.toFixed(2) + '%;background:' + p[2] + '" title="' + esc(p[0]) + ' ' + pctTxt(p[1], total) + '">' + (w >= 14 ? pctTxt(p[1], total) : '') + '</i>' : '';
    }).join('') + '</div><div class="tk-segk">' + parts.map(function (p) {
      return '<span><i style="background:' + p[2] + '"></i>' + esc(p[0]) + ' · ' + fmt(p[1]) + '</span>';
    }).join('') + '</div>';
  }

  /* the dot-matrix world */
  var mapIdx = null;
  function buildMap(host) {
    var cols = MAP.cols, rows = MAP.rows, S = 10;
    var groups = {};
    var out = [];
    for (var r = 0; r < rows; r++) {
      var row = MAP.rle[r], c = 0;
      for (var i = 0; i < row.length; i += 2) {
        var v = row[i], n = row[i + 1];
        if (v) {
          var cc = MAP.codes[v - 1];
          var g = groups[cc] || (groups[cc] = []);
          for (var k = 0; k < n; k++) g.push('<circle cx="' + ((c + k) * S + 5) + '" cy="' + (r * S + 5) + '" r="3.3"/>');
        }
        c += n;
      }
    }
    for (var cc2 in groups) out.push('<g class="l" data-cc="' + cc2 + '">' + groups[cc2].join('') + '</g>');
    host.innerHTML = '<svg viewBox="0 0 ' + (cols * S) + ' ' + (rows * S) + '" role="img" aria-label="World map of reader countries">' +
      '<defs><radialGradient id="tkGlow"><stop offset="0" stop-color="#FFF1C2" stop-opacity=".95"/><stop offset=".35" stop-color="#E8C97A" stop-opacity=".55"/><stop offset="1" stop-color="#E8C97A" stop-opacity="0"/></radialGradient></defs>' +
      out.join('') + '<g class="tk-marks"></g></svg><div class="tk-tip" role="status"></div>';
    mapIdx = { svg: $('svg', host), tip: $('.tk-tip', host), S: S };
    var svg = mapIdx.svg;
    function show(e) {
      var t = e.target; var g = t && t.closest ? t.closest('[data-cc]') : null;
      if (!g) { mapIdx.tip.classList.remove('on'); return; }
      var cc = g.getAttribute('data-cc'); var n = (mapIdx.counts || {})[cc] || 0;
      var rect = host.getBoundingClientRect();
      var pt = e.touches ? e.touches[0] : e;
      mapIdx.tip.textContent = cname(cc) + ' · ' + (n ? fmt(n) + (n === 1 ? ' visit' : ' visits') : 'no visits yet');
      mapIdx.tip.style.left = (pt.clientX - rect.left) + 'px';
      mapIdx.tip.style.top = (pt.clientY - rect.top) + 'px';
      mapIdx.tip.classList.add('on');
    }
    svg.addEventListener('mousemove', show);
    svg.addEventListener('click', show);
    svg.addEventListener('mouseleave', function () { mapIdx.tip.classList.remove('on'); });
  }
  function project(lat, lon) {
    var S = mapIdx.S;
    return [((lon + 180) / MAP.step) * S, ((MAP.top - lat) / MAP.step) * S];
  }
  function paintMap(m) {
    if (!mapIdx) return;
    var counts = {}; m.countries.forEach(function (x) { counts[x.cc] = x.n; });
    mapIdx.counts = counts;
    var max = 1; m.countries.forEach(function (x) { if (x.cc !== 'EUROPE' && x.cc !== 'ZZ') max = Math.max(max, x.n); });
    var lmax = Math.log(1 + max);
    $$('g[data-cc]', mapIdx.svg).forEach(function (g) {
      var n = counts[g.getAttribute('data-cc')] || 0;
      if (!n) { g.setAttribute('class', 'l'); g.removeAttribute('style'); return; }
      var t = Math.log(1 + n) / lmax;
      var col = mix([122, 84, 32], [255, 236, 170], .25 + .75 * t);
      g.setAttribute('class', 'v');
      g.setAttribute('style', 'fill:rgb(' + col.join(',') + ')');
    });
    var marks = [];
    var drawn = {};
    $$('g[data-cc]', mapIdx.svg).forEach(function (g) { drawn[g.getAttribute('data-cc')] = true; });
    m.countries.slice(0, 40).forEach(function (x, i) {
      var a;
      if (x.cc === 'EUROPE') a = [50.5, 12.5];
      else a = MAP.anchors[x.cc];
      if (!a) return;
      var p = project(a[0], a[1]);
      var t = Math.log(1 + x.n) / lmax;
      var r = 10 + 22 * Math.min(1, t);
      var small = !drawn[x.cc] || x.cc === 'EUROPE';
      marks.push('<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r.toFixed(1) + '" fill="url(#tkGlow)" opacity="' + (i < 3 ? .95 : .6) + '">' +
        (i < 3 && !reduced ? '<animate attributeName="r" values="' + r.toFixed(1) + ';' + (r * 1.35).toFixed(1) + ';' + r.toFixed(1) + '" dur="3.2s" repeatCount="indefinite"/>' : '') + '</circle>');
      if (small) {
        marks.push('<circle data-cc="' + x.cc + '" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4.4" fill="#FFF1C2" stroke="#8A6424" stroke-width="1.2"' +
          (x.cc === 'EUROPE' ? ' stroke-dasharray="2 2"' : '') + '/>');
      }
    });
    $('.tk-marks', mapIdx.svg).innerHTML = marks.join('');
  }
  function mix(a, b, t) { return [0, 1, 2].map(function (i) { return Math.round(a[i] + (b[i] - a[i]) * t); }); }

  function barsHtml(list, isHour) {
    var max = list.reduce(function (mm, x) { return Math.max(mm, x.n); }, 0);
    var html = list.map(function (x, i) {
      var hgt = max ? Math.max(2, x.n / max * 100) : 2;
      var cls = (x.n ? '' : 'z') + (isHour && i === list.length - 1 ? ' now' : '') + (!isHour && i === list.length - 1 ? ' now' : '');
      return '<span class="' + cls + '" data-i="' + i + '"><i style="height:' + hgt.toFixed(1) + '%"></i></span>';
    }).join('');
    return html;
  }
  function wireBars(el, key, readEl, isHour) {
    if (el.__w) return;
    el.__w = 1;
    function list() { return (tkState.m && tkState.m[key]) || []; }
    function label(x) {
      if (isHour) return localTime(x.ms) + '–' + localTime(x.ms + 36e5) + ' <span style="color:#9C8D70">your time</span>';
      return utcDate(x.ms, true);
    }
    function pick(i) {
      var x = list()[i]; if (!x) return;
      $$('span', el).forEach(function (s) { s.classList.toggle('sel', +s.getAttribute('data-i') === i); });
      readEl.innerHTML = label(x) + ' · <b>' + fmt(x.n) + '</b> ' + (x.n === 1 ? 'visit' : 'visits');
    }
    function at(e) {
      var pt = e.touches ? e.touches[0] : e;
      var r = el.getBoundingClientRect(), L = list();
      if (!L.length || !r.width) return;
      var i = Math.floor((pt.clientX - r.left) / r.width * L.length);
      pick(Math.max(0, Math.min(L.length - 1, i)));
    }
    el.addEventListener('mousemove', at);
    el.addEventListener('click', at);
    el.addEventListener('touchstart', at, { passive: true });
    el.addEventListener('touchmove', at, { passive: true });
    el.addEventListener('mouseleave', function () {
      readEl.innerHTML = el.getAttribute('data-default') || '';
      $$('span', el).forEach(function (s) { s.classList.remove('sel'); });
    });
  }

  function renderTracker(m, prev) {
    var b = cur && cur.kind === 'tracker' && cur.body;
    if (!b || !tkState.built || !$('#tkTiles', b)) return;
    var tiles = [
      ['hour', 'This hour', 'since ' + localTime(keyToMs(hourKey(m.now || Date.now()))) + ' your time'],
      ['past24', 'Past 24 hours', 'rolling window'],
      ['week', 'This week', utcDate(weekStartMs(Date.now())) + ' – ' + utcDate(weekStartMs(Date.now()) + 6 * 864e5)],
      ['month', 'This month', MONTHS[new Date().getUTCMonth()] + ' ' + new Date().getUTCFullYear()],
      ['year', 'This year', String(new Date().getUTCFullYear())],
      ['all', 'Since launch', 'website + app, all time']
    ];
    var box = $('#tkTiles', b);
    if (!box.children.length) {
      box.innerHTML = tiles.map(function (t) {
        return '<div class="tk-tile" data-k="' + t[0] + '"><div class="tk-tl">' + t[1] + '</div><div class="tk-tn">0</div><div class="tk-tc">' + esc(t[2]) + '</div><span class="tk-dl"></span></div>';
      }).join('');
    } else {
      tiles.forEach(function (t) { var el = $('.tk-tile[data-k="' + t[0] + '"] .tk-tc', box); if (el) el.textContent = t[2]; });
    }
    tiles.forEach(function (t) {
      var tile = $('.tk-tile[data-k="' + t[0] + '"]', box);
      var from = prev ? prev[t[0]] : 0;
      countTo($('.tk-tn', tile), m[t[0]], from);
      var start = tkState.shown[t[0]];
      if (start == null) tkState.shown[t[0]] = m[t[0]];
      var dl = $('.tk-dl', tile);
      var delta = m[t[0]] - (tkState.shown[t[0]] || m[t[0]]);
      if (delta > 0) { dl.textContent = '+' + fmt(delta); dl.title = 'since you opened the tracker'; dl.classList.add('on'); }
      if (prev && m[t[0]] > prev[t[0]]) { tile.classList.remove('tk-flash'); void tile.offsetWidth; tile.classList.add('tk-flash'); }
    });

    countTo($('#tkBig', b), m.all, prev ? prev.all : 0);
    var ms = milestone(m.all);
    $('#tkMsT', b).innerHTML = '<span>Next milestone <b>' + fmt(ms.next) + '</b></span><span><b>' + fmt(ms.next - m.all) + '</b> to go</span>';
    $('#tkMsBar', b).style.width = Math.max(1.5, pct(m.all - ms.prev, ms.next - ms.prev)).toFixed(2) + '%';

    // countries
    var list = m.countries;
    var shown = tkState.showAll ? list : list.slice(0, 12);
    var topN = list.length ? list[0].n : 1;
    var cHead = $('#tkCHead', b);
    cHead.innerHTML = 'Countries &amp; regions <small>' + m.countryCount + (m.countryCount === 1 ? ' country' : ' countries') +
      (list.some(function (x) { return x.cc === 'EUROPE'; }) ? ' + Europe' : '') + '</small>';
    $('#tkList', b).innerHTML = shown.length ? shown.map(function (x, i) {
      var note = x.cc === 'EUROPE' ? 'regional total, before country-level tracking' :
        (x.carried && x.live ? fmt(x.carried) + ' carried over · ' + fmt(x.live) + ' live' : (x.carried ? 'carried over' : ''));
      return '<li><span class="tk-rk">' + (i + 1) + '</span>' + flag(x.cc) +
        '<div class="tk-cn"><b title="' + esc(cname(x.cc)) + '">' + esc(cname(x.cc)) + '</b>' + (note ? '<small>' + note + '</small>' : '') +
        '<div class="tk-bar"><i style="width:' + pct(x.n, topN).toFixed(2) + '%"></i></div></div>' +
        '<div class="tk-cv">' + fmt(x.n) + '<small>' + pctTxt(x.n, m.all) + '</small></div></li>';
    }).join('') : '<li class="tk-empty">Countries appear here as readers arrive.</li>';
    var more = $('#tkMore', b);
    more.hidden = list.length <= 12;
    more.textContent = tkState.showAll ? 'Show the top 12' : 'Show all ' + list.length;

    // continents
    var ck = Object.keys(m.continents).sort(function (x, y) { return m.continents[y] - m.continents[x]; });
    var ctot = sum(m.continents);
    $('#tkConts', b).innerHTML = ck.map(function (k) { return '<i style="width:' + pct(m.continents[k], ctot).toFixed(2) + '%;background:' + (CONT_COL[k] || '#6E6250') + '" title="' + (CONT[k] || 'Not determined') + '"></i>'; }).join('');
    $('#tkCKey', b).innerHTML = ck.map(function (k) { return '<span><i style="background:' + (CONT_COL[k] || '#6E6250') + '"></i>' + (CONT[k] || 'Not determined') + ' ' + pctTxt(m.continents[k], ctot) + '</span>'; }).join('');
    paintMap(m);

    // charts
    var c24 = $('#tkBars24', b), c30 = $('#tkBars30', b);
    c24.innerHTML = barsHtml(m.bars24, true);
    c30.innerHTML = barsHtml(m.bars30, false);
    var s24 = m.bars24.reduce(function (a, x) { return a + x.n; }, 0), s30 = m.bars30.reduce(function (a, x) { return a + x.n; }, 0);
    var r24 = $('#tkRead24', b), r30 = $('#tkRead30', b);
    var d24 = '<b>' + fmt(s24) + '</b> live-tracked ' + (s24 === 1 ? 'visit' : 'visits') + ' in the last 24 hours · hover or tap a bar';
    var d30 = '<b>' + fmt(s30) + '</b> live-tracked ' + (s30 === 1 ? 'visit' : 'visits') + ' in the last 30 days · hover or tap a bar';
    c24.setAttribute('data-default', d24); c30.setAttribute('data-default', d30);
    if (!c24.matches(':hover')) r24.innerHTML = d24;
    if (!c30.matches(':hover')) r30.innerHTML = d30;
    $('#tkAx24', b).innerHTML = '<span>' + localTime(m.bars24[0].ms) + '</span><span>' + localTime(m.bars24[12].ms) + '</span><span>now</span>';
    $('#tkAx30', b).innerHTML = '<span>' + utcDate(m.bars30[0].ms) + '</span><span>' + utcDate(m.bars30[15].ms) + '</span><span>today</span>';
    c24.setAttribute('aria-label', 'Visits per hour over the last 24 hours: ' + m.bars24.map(function (x) { return x.n; }).join(', '));
    c30.setAttribute('aria-label', 'Visits per day over the last 30 days: ' + m.bars30.map(function (x) { return x.n; }).join(', '));
    wireBars(c24, 'bars24', r24, true);
    wireBars(c30, 'bars30', r30, false);

    // insights
    var app = +m.a.app || 0, web = +m.a.web || 0;
    var wow = m.prev7 > 0 ? Math.round((m.last7 - m.prev7) / m.prev7 * 100) : null;
    var ins = [
      [fmt(m.countryCount), 'Countries reached', m.countriesToday ? m.countriesToday + ' reading today' : 'across all time'],
      [m.peakHour ? pad(m.peakHour.h) + ':00' : '—', 'Busiest hour', m.peakHour ? 'your time · last 7 days' : 'building up'],
      [m.bestDay ? utcDate(m.bestDay.ms) : '—', 'Busiest day', m.bestDay ? fmt(m.bestDay.n) + ' visits · last 30 days' : 'building up'],
      [fmt(Math.round(m.dailyAvg)), 'Daily average', 'this month'],
      [(app + web) ? pctTxt(app, app + web) : '—', 'Opened in the app', (app + web) ? fmt(app) + ' of ' + fmt(app + web) + ' openings' : 'building up'],
      [wow === null ? '—' : (wow > 0 ? '+' : '') + wow + '%', 'Last 7 days', wow === null ? 'vs the 7 before — building up' : fmt(m.last7) + ' vs ' + fmt(m.prev7) + ' the 7 days before']
    ];
    $('#tkIns', b).innerHTML = ins.map(function (x) { return '<div class="tk-in"><b>' + esc(x[0]) + '</b><span>' + x[1] + '</span><small>' + esc(x[2]) + '</small></div>'; }).join('');

    // pages, arrivals, devices
    var pl = PAGE_NAMES.map(function (p) { return [p[1], +m.p[p[0]] || 0]; }).sort(function (x, y) { return y[1] - x[1]; });
    $('#tkPages', b).innerHTML = rowsHtml(pl, sum(m.p));
    var sl = Object.keys(SRC_NAMES).map(function (k) { return [SRC_NAMES[k], +m.s[k] || 0]; }).filter(function (x) { return x[1] > 0; }).sort(function (x, y) { return y[1] - x[1]; });
    var sTot = sl.reduce(function (a, x) { return a + x[1]; }, 0);
    $('#tkSrc', b).innerHTML = rowsHtml(sl.slice(0, 8), sTot) + ((+m.s.internal || 0) ? '<p class="tk-empty" style="padding-top:8px">Plus ' + fmt(m.s.internal) + ' moves between pages of the site.</p>' : '');
    var dv = [['Phone', +m.v.phone || 0, '#E8C97A'], ['Computer', +m.v.desktop || 0, '#7FA6E8'], ['Tablet', +m.v.tablet || 0, '#6CCFA0']];
    var aw = [['Installed app', app, '#8FE8BD'], ['Browser', web, '#C9A84C']];
    $('#tkDev', b).innerHTML = '<div class="tk-h" style="margin-bottom:8px">Device</div>' + segHtml(dv, dv[0][1] + dv[1][1] + dv[2][1]) +
      '<div class="tk-h" style="margin-bottom:8px">App or browser</div>' + segHtml(aw, app + web);
  }
  function buildTracker(c) {
    var b = c.body;
    var you = TRK && TRK.visit;
    b.innerHTML =
      '<div class="tk-grid">' +
      '<div class="tk-banner" id="tkBanner" hidden></div>' +
      '<section class="tk-card tk-hero" aria-label="All-time total">' +
      '<div><div class="tk-h">Since launch</div><div class="tk-big" id="tkBig">0</div>' +
      '<div class="tk-bigl">visits to The Chronicles — the website and the app together, from every country, counting every opening.</div></div>' +
      '<div><div class="tk-you" id="tkYou"></div>' +
      '<div class="tk-ms"><div class="tk-ms-t" id="tkMsT"></div><div class="tk-bar"><i id="tkMsBar" style="width:0"></i></div></div></div>' +
      '</section>' +
      '<section class="tk-tiles" id="tkTiles" aria-label="Visits by period"></section>' +
      '<section class="tk-card tk-map" aria-label="Reader map"><div class="tk-h">Where readers are <small>brighter gold = more visits</small></div>' +
      '<div class="tk-mapw" id="tkMap"></div>' +
      '<div class="tk-conts" id="tkConts"></div><div class="tk-ckey" id="tkCKey"></div></section>' +
      '<section class="tk-card tk-countries" aria-label="Countries"><div class="tk-h" id="tkCHead">Countries &amp; regions</div>' +
      '<ul class="tk-list" id="tkList"></ul><button type="button" class="tk-more" id="tkMore" hidden></button></section>' +
      '<section class="tk-card tk-chart"><div class="tk-h">The last 24 hours <small>visits per hour</small></div><div class="tk-read" id="tkRead24"></div>' +
      '<div class="tk-bars" id="tkBars24" role="img"></div><div class="tk-ax" id="tkAx24"></div></section>' +
      '<section class="tk-card tk-chart"><div class="tk-h">The last 30 days <small>visits per day, UTC</small></div><div class="tk-read" id="tkRead30"></div>' +
      '<div class="tk-bars" id="tkBars30" role="img"></div><div class="tk-ax" id="tkAx30"></div></section>' +
      '<section class="tk-ins" id="tkIns" aria-label="Insights"></section>' +
      '<section class="tk-card tk-third"><div class="tk-h">What readers open <small>since live tracking</small></div><div id="tkPages"></div></section>' +
      '<section class="tk-card tk-third"><div class="tk-h">How readers arrive <small>since live tracking</small></div><div id="tkSrc"></div></section>' +
      '<section class="tk-card tk-third" id="tkDev"></section>' +
      '<footer class="tk-foot"><div>' +
      '<p><b>What is counted.</b> Every opening of any page of The Chronicles — in a browser or in the installed app, anywhere in the world, however many times the same reader returns. Link previews and search-engine crawlers are not counted. Openings made offline in the app are counted when the connection returns.</p>' +
      '<p><b>Privacy.</b> Anonymous by design: no cookies, no names, no identifiers, and no IP address is stored by The Chronicles. Only the time, the country, the page, how the visit arrived and the kind of device are tallied. The country is looked up from the connection by the free GeoJS or country.is services (which, like any website, see the connection’s address while answering) or, failing that, taken from the device’s time zone. The tally is kept in a Google Firebase database.</p>' +
      '<p><b>Periods.</b> Hours, days, weeks (Monday to Sunday), months and years follow Coordinated Universal Time. Figures for the period up to ' + esc(fmtAsOf()) + ' were carried over from before live tracking began and are included in the totals and the country list; the charts, pages, arrivals and devices show live-tracked visits only. Refreshes every two minutes.</p>' +
      '</div><button type="button" class="hx-btn sm ghost" id="tkCopy">Copy summary</button></footer>' +
      '</div>';
    buildMap($('#tkMap', b));
    $('#tkMore', b).addEventListener('click', function () { tkState.showAll = !tkState.showAll; if (tkState.m) renderTracker(tkState.m, tkState.m); });
    $('#tkCopy', b).addEventListener('click', function () {
      var m = tkState.m; if (!m) return;
      var t = 'The Chronicles — ' + fmt(m.all) + ' visits since launch, from ' + m.countryCount + ' countries' +
        ' (' + fmt(m.month) + ' this month, ' + fmt(m.week) + ' this week). ' + SITE_URL;
      var done = function () { var btn = $('#tkCopy', b); btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy summary'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function () {});
    });
    paintYou();
    tkState.built = true;
  }
  function fmtAsOf() {
    var B = (TRK && TRK.baseline) || {};
    var d = new Date((B.asOf || '2026-09-30') + 'T12:00:00Z');
    return d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()] + ' ' + d.getUTCFullYear();
  }
  function paintYou() {
    var el = cur && $('#tkYou', cur.body); if (!el) return;
    var v = TRK && TRK.visit;
    if (!v || v.counted === undefined) { el.innerHTML = '<span class="tk-flag tk-flag-code">··</span><div>Counting your visit…</div>'; return; }
    if (v.counted === false && !navigator.onLine) { el.innerHTML = flag(v.cc) + '<div>You are offline. <b>Your visit is saved</b> and will be counted when you reconnect.</div>'; return; }
    if (v.counted === false && v.queued) { el.innerHTML = flag(v.cc) + '<div><b>Your visit is saved</b> on this device and will be counted shortly.</div>'; return; }
    if (v.counted === false) { el.innerHTML = flag(v.cc) + '<div>Your visit could not be counted this time.</div>'; return; }
    var where = v.cc && v.cc !== 'ZZ' ? 'from <b>' + esc(cname(v.cc)) + '</b>' : 'from an undetermined country';
    var how = v.app ? 'in the app' : 'in the browser';
    var dev = { phone: 'on a phone', tablet: 'on a tablet', desktop: 'on a computer' }[v.dev] || '';
    el.innerHTML = flag(v.cc) + '<div>Your visit is counted — ' + where + ', ' + how + ' ' + dev + '.</div>';
  }

  function setLive(on, text) {
    if (!cur) return;
    var l = $('.tk-live', cur.head); if (!l) return;
    l.classList.toggle('off', !on);
    l.lastChild.textContent = text;
  }
  function banner(html) {
    var el = cur && $('#tkBanner', cur.body); if (!el) return;
    if (!html) { el.hidden = true; el.innerHTML = ''; } else { el.hidden = false; el.innerHTML = html; }
  }

  function refresh(manual) {
    if (!cur || cur.kind !== 'tracker' || tkState.loading) return;
    tkState.loading = true;
    var rf = $('.tk-rf', cur.head); if (rf) rf.classList.add('spin');
    fetchAll().then(function (raw) {
      var m = compute(raw); m.now = raw.now;
      var prev = tkState.m;
      tkState.m = m; tkState.updatedAt = Date.now();
      try { sessionStorage.setItem('chx-trk-last', JSON.stringify({ at: tkState.updatedAt, raw: raw, first: tkState.firstHour })); } catch (e) {}
      banner('');
      setLive(true, 'LIVE');
      renderTracker(m, prev);
    }).catch(function (e) {
      setLive(false, navigator.onLine ? 'PAUSED' : 'OFFLINE');
      if (!tkState.m) {
        try {
          var last = JSON.parse(sessionStorage.getItem('chx-trk-last') || 'null');
          if (last && last.raw) { tkState.firstHour = last.first; var m2 = compute(last.raw); m2.now = last.raw.now; tkState.m = m2; tkState.updatedAt = last.at; renderTracker(m2, null); }
        } catch (x) {}
      }
      banner(!navigator.onLine ? 'You are offline. ' + (tkState.m ? 'These are the figures from ' + localTime(tkState.updatedAt) + '; they will refresh when you reconnect.' : 'The figures will load when you reconnect.') :
        (e && (e.status === 401 || e.status === 403) ? 'Live figures are not available at the moment.' : 'The live figures could not be reached just now — trying again shortly.'));
    }).then(function () {
      tkState.loading = false;
      if (rf && rf.isConnected) rf.classList.remove('spin');
      tkState.next = Date.now() + REFRESH_MS;
    });
  }
  function tickClock() {
    if (!cur || cur.kind !== 'tracker') return;
    var el = $('.tk-upd', cur.head);
    if (el) {
      var left = Math.max(0, Math.round((tkState.next - Date.now()) / 1000));
      el.innerHTML = '<span>' + (tkState.updatedAt ? 'Updated ' + localTime(tkState.updatedAt) : 'Loading…') + '</span> <span class="tk-u2"><span class="tk-nl">next update in </span><span class="tk-ns">next </span>' + Math.floor(left / 60) + ':' + pad(left % 60) + '</span>';
    }
    if (tkState.next && Date.now() >= tkState.next && document.visibilityState === 'visible') refresh();
  }

  function openTracker() {
    if (!TRK || !TRK.configured) {
      var c0 = shell({ title: 'The Chronicles Engagement Tracker', sub: 'Live readership', narrow: true });
      c0.body.innerHTML = '<div class="tk-empty">The live tracker is being connected. Please check back soon.</div>';
      return;
    }
    tkState.shown = {}; tkState.showAll = false; tkState.built = false; tkState.m = null; mapIdx = null;
    var c = shell({
      title: 'The Chronicles Engagement Tracker',
      sub: 'Live readership of the website and the app, worldwide',
      headExtra: '<div class="tk-status"><div class="tk-upd">Loading…</div><span class="tk-live"><i></i>LIVE</span>' +
        '<button type="button" class="tk-rf" aria-label="Refresh now"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.2 8A5.2 5.2 0 1 1 11.6 4.3M13.2 2.6v2.9h-2.9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>',
      onClose: function () { clearInterval(tkState.timer); tkState.timer = 0; tkState.built = false; }
    });
    c.kind = 'tracker';
    buildTracker(c);
    $('.tk-rf', c.head).addEventListener('click', function () { refresh(true); });
    tkState.next = Date.now() + REFRESH_MS;
    refresh();
    tkState.timer = setInterval(tickClock, 1000);
    tickClock();
  }
  if (TRK && TRK.on) {
    TRK.on('visit', function () { paintYou(); });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && cur && cur.kind === 'tracker' && Date.now() - tkState.updatedAt > REFRESH_MS) refresh();
  });
  window.addEventListener('online', function () { if (cur && cur.kind === 'tracker') refresh(); });


  /* ═══════════════════════════════════════════════════════════════════════
     THE OWNER'S SELF-CHECK  —  …/THE-CHRONICLE/?tracker-check
     Runs every step the tracker depends on against the real database and
     says, in plain words, what works and what to do if something does not.
     It writes only to v1/check, a counter nothing on the site displays.
     ═══════════════════════════════════════════════════════════════════════ */
  function openCheck() {
    var c = shell({ title: 'Tracker self-check', sub: 'For the site owner — tests the live database in a few seconds', narrow: true });
    c.kind = 'check';
    var rows = [
      ['cfg', 'The settings file has a valid database address'],
      ['read', 'The database answers and allows reading the figures'],
      ['inc', 'A visit can be counted (the database adds +1 by itself)'],
      ['cheat', 'Nobody can overwrite or delete the figures'],
      ['geo', 'Readers’ countries can be looked up'],
      ['visit', 'Your own opening of this page was counted']
    ];
    c.body.innerHTML = '<ol class="ap-steps" id="ckList">' + rows.map(function (r) {
      return '<li data-k="' + r[0] + '"><b>' + r[1] + '</b><br><span class="ck-s" style="font-style:italic;color:#B7A47E">waiting…</span></li>';
    }).join('') + '</ol><div class="ap-note" id="ckSum"></div>';
    function set(k, ok, msg) {
      var li = $('li[data-k="' + k + '"]', c.body); if (!li) return;
      li.style.borderColor = ok === true ? 'rgba(44,191,128,.6)' : ok === false ? 'rgba(224,90,90,.7)' : '';
      li.style.background = ok === true ? 'rgba(44,191,128,.08)' : ok === false ? 'rgba(224,90,90,.1)' : '';
      $('.ck-s', li).innerHTML = (ok === true ? '✓ ' : ok === false ? '✗ ' : '') + msg;
    }
    var base = TRK && TRK.base, results = {};
    function done(k, ok, msg) { results[k] = ok; set(k, ok, msg); }
    if (!base) {
      done('cfg', false, 'No valid address in <b>app/tracker-config.js</b>. Paste the address from Firebase (it ends in <b>firebasedatabase.app</b> or <b>firebaseio.com</b>) between the quotes on the databaseURL line, commit, wait a minute, then open this check again.');
      ['read', 'inc', 'cheat', 'geo', 'visit'].forEach(function (k) { set(k, null, 'skipped until the address is in place'); });
      return;
    }
    done('cfg', true, esc(base));
    function req(method, path, body) {
      return fetch(base + path, { method: method, body: body, cache: 'no-store', credentials: 'omit' })
        .then(function (r) { return r.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} return { status: r.status, json: j }; }); },
              function (e) { return { status: 0, error: String(e) }; });
    }
    req('GET', '/v1/total.json').then(function (r) {
      if (r.status === 200) done('read', true, 'Reading works. Live visits so far: ' + fmt(typeof r.json === 'number' ? r.json : 0) + '.');
      else if (r.status === 401 || r.status === 403) done('read', false, 'The database refused. The <b>rules</b> are not published yet: in Firebase open Realtime Database → Rules, paste the rules from the guide, and press <b>Publish</b>.');
      else if (r.status === 0) done('read', false, 'The database could not be reached. Check the address for typing mistakes (no spaces, nothing after <b>.app</b> or <b>.com</b>).');
      else done('read', false, 'Unexpected answer (' + r.status + '). Check the address and the rules.');
      return req('GET', '/v1/check.json');
    }).then(function (before) {
      var n0 = typeof before.json === 'number' ? before.json : 0;
      return req('PATCH', '/v1.json?print=silent', JSON.stringify({ check: { '.sv': { increment: 1 } } })).then(function (w) {
        return req('GET', '/v1/check.json').then(function (after) {
          var n1 = typeof after.json === 'number' ? after.json : null;
          if (w.status >= 200 && w.status < 300 && n1 === n0 + 1) done('inc', true, 'Counting works (+1 confirmed by the database).');
          else if (w.status === 401 || w.status === 403) done('inc', false, 'The database refused the +1. Make sure the rules pasted are exactly the ones in the guide (including the <b>"check"</b> line), then Publish again.');
          else done('inc', false, 'The +1 was not applied (answer ' + w.status + '). Send a screenshot of this page to your developer.');
        });
      });
    }).then(function () {
      return Promise.all([
        req('PATCH', '/v1.json', JSON.stringify({ check: 999999 })),
        req('DELETE', '/v1/check.json'),
        req('PATCH', '/v1.json', JSON.stringify({ spam: 1 }))
      ]);
    }).then(function (rs) {
      var refused = rs.every(function (x) { return x.status === 401 || x.status === 403; });
      if (refused) done('cheat', true, 'Overwriting, deleting and inventing figures are all refused.');
      else done('cheat', false, 'The database accepted a change it should refuse — the rules are not the ones from the guide. Paste them again and Publish.');
    }).catch(function () {});
    fetch('https://get.geojs.io/v1/ip/country', { cache: 'no-store', credentials: 'omit' }).then(function (r) { return r.text(); })
      .then(function (t) { t = String(t || '').trim(); if (/^[A-Z]{2}$/i.test(t)) done('geo', true, 'Country service answered: ' + esc(cname(t.toUpperCase())) + '.'); else throw 0; })
      .catch(function () { done('geo', null, 'The country service did not answer from this browser (an ad-blocker can do this). Readers will still be counted; their country then comes from their time zone.'); });
    (function waitVisit(n) {
      var v = TRK && TRK.visit;
      if (v && v.counted === true) return done('visit', true, 'Counted from ' + esc(cname(v.cc)) + '.');
      if (v && v.counted === false && n > 3) return done('visit', false, v.queued ? 'Kept on this device for now — the database did not accept it yet.' : 'Not counted. The steps above show why.');
      if (n > 20) return done('visit', false, 'No answer yet — reload this page once.');
      setTimeout(function () { waitVisit(n + 1); }, 500);
    })(0);
    (function summary(n) {
      var keys = ['cfg', 'read', 'inc', 'cheat', 'visit'];
      if (!keys.every(function (k) { return k in results; }) && n < 40) return setTimeout(function () { summary(n + 1); }, 400);
      var all = keys.every(function (k) { return results[k] === true; });
      var el = $('#ckSum', c.body); if (!el) return;
      el.innerHTML = all ? '<b style="color:#8FE8BD">Everything works. The Engagement Tracker is live.</b> You can close this page.'
                         : 'Something needs attention — follow the note on the step marked ✗, then open this check again.';
    })(0);
  }

  window.__chxHub = {
    open: function (which) {
      if (which === 'tracker') openTracker(); else if (which === 'check') openCheck(); else openApp();
    },
    close: function () { close(); },
    _compute: compute, _state: tkState
  };
})();
