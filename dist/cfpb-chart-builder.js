(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 Highmaps JS v5.0.7 (2017-01-17)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(I,a){"object"===typeof module&&module.exports?module.exports=I.document?a(I):a:I.Highcharts=a(I)})("undefined"!==typeof window?window:this,function(I){I=function(){var a=window,y=a.document,F=a.navigator&&a.navigator.userAgent||"",A=y&&y.createElementNS&&!!y.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,D=/(edge|msie|trident)/i.test(F)&&!window.opera,f=!A,k=/Firefox/.test(F),r=k&&4>parseInt(F.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highmaps",
version:"5.0.7",deg2rad:2*Math.PI/360,doc:y,hasBidiBug:r,hasTouch:y&&void 0!==y.documentElement.ontouchstart,isMS:D,isWebKit:/AppleWebKit/.test(F),isFirefox:k,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(F),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:A,vml:f,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var y=[],F=a.charts,A=a.doc,D=a.win;a.error=function(f,k){f=a.isNumber(f)?"Highcharts error #"+
f+": www.highcharts.com/errors/"+f:f;if(k)throw Error(f);D.console&&console.log(f)};a.Fx=function(a,k,r){this.options=k;this.elem=a;this.prop=r};a.Fx.prototype={dSetter:function(){var a=this.paths[0],k=this.paths[1],r=[],t=this.now,e=a.length,p;if(1===t)r=this.toD;else if(e===k.length&&1>t)for(;e--;)p=parseFloat(a[e]),r[e]=isNaN(p)?a[e]:t*parseFloat(k[e]-p)+p;else r=k;this.elem.attr("d",r,null,!0)},update:function(){var a=this.elem,k=this.prop,r=this.now,t=this.options.step;if(this[k+"Setter"])this[k+
"Setter"]();else a.attr?a.element&&a.attr(k,r,null,!0):a.style[k]=r+this.unit;t&&t.call(a,r,this)},run:function(a,k,r){var f=this,e=function(a){return e.stopped?!1:f.step(a)},p;this.startTime=+new Date;this.start=a;this.end=k;this.unit=r;this.now=this.start;this.pos=0;e.elem=this.elem;e.prop=this.prop;e()&&1===y.push(e)&&(e.timerId=setInterval(function(){for(p=0;p<y.length;p++)y[p]()||y.splice(p--,1);y.length||clearInterval(e.timerId)},13))},step:function(a){var f=+new Date,r,t=this.options;r=this.elem;
var e=t.complete,p=t.duration,d=t.curAnim,q;if(r.attr&&!r.element)r=!1;else if(a||f>=p+this.startTime){this.now=this.end;this.pos=1;this.update();a=d[this.prop]=!0;for(q in d)!0!==d[q]&&(a=!1);a&&e&&e.call(r);r=!1}else this.pos=t.easing((f-this.startTime)/p),this.now=this.start+(this.end-this.start)*this.pos,this.update(),r=!0;return r},initPath:function(f,k,r){function t(a){var g,c;for(b=a.length;b--;)g="M"===a[b]||"L"===a[b],c=/[a-zA-Z]/.test(a[b+3]),g&&c&&a.splice(b+1,0,a[b+1],a[b+2],a[b+1],a[b+
2])}function e(a,g){for(;a.length<m;){a[0]=g[m-a.length];var c=a.slice(0,n);[].splice.apply(a,[0,0].concat(c));E&&(c=a.slice(a.length-n),[].splice.apply(a,[a.length,0].concat(c)),b--)}a[0]="M"}function p(a,b){for(var g=(m-a.length)/n;0<g&&g--;)c=a.slice().splice(a.length/u-n,n*u),c[0]=b[m-n-g*n],v&&(c[n-6]=c[n-2],c[n-5]=c[n-1]),[].splice.apply(a,[a.length/u,0].concat(c)),E&&g--}k=k||"";var d,q=f.startX,x=f.endX,v=-1<k.indexOf("C"),n=v?7:3,m,c,b;k=k.split(" ");r=r.slice();var E=f.isArea,u=E?2:1,g;
v&&(t(k),t(r));if(q&&x){for(b=0;b<q.length;b++)if(q[b]===x[0]){d=b;break}else if(q[0]===x[x.length-q.length+b]){d=b;g=!0;break}void 0===d&&(k=[])}k.length&&a.isNumber(d)&&(m=r.length+d*u*n,g?(e(k,r),p(r,k)):(e(r,k),p(k,r)));return[k,r]}};a.extend=function(a,k){var f;a||(a={});for(f in k)a[f]=k[f];return a};a.merge=function(){var f,k=arguments,r,t={},e=function(p,d){var f,k;"object"!==typeof p&&(p={});for(k in d)d.hasOwnProperty(k)&&(f=d[k],a.isObject(f,!0)&&"renderTo"!==k&&"number"!==typeof f.nodeType?
p[k]=e(p[k]||{},f):p[k]=d[k]);return p};!0===k[0]&&(t=k[1],k=Array.prototype.slice.call(k,2));r=k.length;for(f=0;f<r;f++)t=e(t,k[f]);return t};a.pInt=function(a,k){return parseInt(a,k||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(f,k){return f&&"object"===typeof f&&(!k||!a.isArray(f))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=
function(a,k){for(var f=a.length;f--;)if(a[f]===k){a.splice(f,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(f,k,r){var t,e;if(a.isString(k))a.defined(r)?f.setAttribute(k,r):f&&f.getAttribute&&(e=f.getAttribute(k));else if(a.defined(k)&&a.isObject(k))for(t in k)f.setAttribute(t,k[t]);return e};a.splat=function(f){return a.isArray(f)?f:[f]};a.syncTimeout=function(a,k,r){if(k)return setTimeout(a,k,r);a.call(0,r)};a.pick=function(){var a=arguments,k,r,t=a.length;for(k=
0;k<t;k++)if(r=a[k],void 0!==r&&null!==r)return r};a.css=function(f,k){a.isMS&&!a.svg&&k&&void 0!==k.opacity&&(k.filter="alpha(opacity\x3d"+100*k.opacity+")");a.extend(f.style,k)};a.createElement=function(f,k,r,t,e){f=A.createElement(f);var p=a.css;k&&a.extend(f,k);e&&p(f,{padding:0,border:"none",margin:0});r&&p(f,r);t&&t.appendChild(f);return f};a.extendClass=function(f,k){var r=function(){};r.prototype=new f;a.extend(r.prototype,k);return r};a.pad=function(a,k,r){return Array((k||2)+1-String(a).length).join(r||
0)+a};a.relativeLength=function(a,k){return/%$/.test(a)?k*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,k,r){var f=a[k];a[k]=function(){var a=Array.prototype.slice.call(arguments),p=arguments,d=this;d.proceed=function(){f.apply(d,arguments.length?arguments:p)};a.unshift(f);a=r.apply(this,a);d.proceed=null;return a}};a.getTZOffset=function(f){var k=a.Date;return 6E4*(k.hcGetTimezoneOffset&&k.hcGetTimezoneOffset(f)||k.hcTimezoneOffset||0)};a.dateFormat=function(f,k,r){if(!a.defined(k)||isNaN(k))return a.defaultOptions.lang.invalidDate||
"";f=a.pick(f,"%Y-%m-%d %H:%M:%S");var t=a.Date,e=new t(k-a.getTZOffset(k)),p,d=e[t.hcGetHours](),q=e[t.hcGetDay](),x=e[t.hcGetDate](),v=e[t.hcGetMonth](),n=e[t.hcGetFullYear](),m=a.defaultOptions.lang,c=m.weekdays,b=m.shortWeekdays,E=a.pad,t=a.extend({a:b?b[q]:c[q].substr(0,3),A:c[q],d:E(x),e:E(x,2," "),w:q,b:m.shortMonths[v],B:m.months[v],m:E(v+1),y:n.toString().substr(2,2),Y:n,H:E(d),k:d,I:E(d%12||12),l:d%12||12,M:E(e[t.hcGetMinutes]()),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:E(e.getSeconds()),L:E(Math.round(k%
1E3),3)},a.dateFormats);for(p in t)for(;-1!==f.indexOf("%"+p);)f=f.replace("%"+p,"function"===typeof t[p]?t[p](k):t[p]);return r?f.substr(0,1).toUpperCase()+f.substr(1):f};a.formatSingle=function(f,k){var r=/\.([0-9])/,t=a.defaultOptions.lang;/f$/.test(f)?(r=(r=f.match(r))?r[1]:-1,null!==k&&(k=a.numberFormat(k,r,t.decimalPoint,-1<f.indexOf(",")?t.thousandsSep:""))):k=a.dateFormat(f,k);return k};a.format=function(f,k){for(var r="{",t=!1,e,p,d,q,x=[],v;f;){r=f.indexOf(r);if(-1===r)break;e=f.slice(0,
r);if(t){e=e.split(":");p=e.shift().split(".");q=p.length;v=k;for(d=0;d<q;d++)v=v[p[d]];e.length&&(v=a.formatSingle(e.join(":"),v));x.push(v)}else x.push(e);f=f.slice(r+1);r=(t=!t)?"}":"{"}x.push(f);return x.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(f,k,r,t,e){var p,d=f;r=a.pick(r,1);p=f/r;k||(k=e?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===r?k=a.grep(k,function(a){return 0===a%1}):.1>=r&&(k=[1/r])));
for(t=0;t<k.length&&!(d=k[t],e&&d*r>=f||!e&&p<=(k[t]+(k[t+1]||k[t]))/2);t++);return d=a.correctFloat(d*r,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,k){var f=a.length,t,e;for(e=0;e<f;e++)a[e].safeI=e;a.sort(function(a,d){t=k(a,d);return 0===t?a.safeI-d.safeI:t});for(e=0;e<f;e++)delete a[e].safeI};a.arrayMin=function(a){for(var k=a.length,f=a[0];k--;)a[k]<f&&(f=a[k]);return f};a.arrayMax=function(a){for(var k=a.length,f=a[0];k--;)a[k]>f&&(f=a[k]);return f};a.destroyObjectProperties=
function(a,k){for(var f in a)a[f]&&a[f]!==k&&a[f].destroy&&a[f].destroy(),delete a[f]};a.discardElement=function(f){var k=a.garbageBin;k||(k=a.createElement("div"));f&&k.appendChild(f);k.innerHTML=""};a.correctFloat=function(a,k){return parseFloat(a.toPrecision(k||14))};a.setAnimation=function(f,k){k.renderer.globalAnimation=a.pick(f,k.options.chart.animation,!0)};a.animObject=function(f){return a.isObject(f)?a.merge(f):{duration:f?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,
day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(f,k,r,t){f=+f||0;k=+k;var e=a.defaultOptions.lang,p=(f.toString().split(".")[1]||"").length,d,q;-1===k?k=Math.min(p,20):a.isNumber(k)||(k=2);q=(Math.abs(f)+Math.pow(10,-Math.max(k,p)-1)).toFixed(k);p=String(a.pInt(q));d=3<p.length?p.length%3:0;r=a.pick(r,e.decimalPoint);t=a.pick(t,e.thousandsSep);f=(0>f?"-":"")+(d?p.substr(0,d)+t:"");f+=p.substr(d).replace(/(\d{3})(?=\d)/g,"$1"+t);k&&(f+=r+q.slice(-k));return f};Math.easeInOutSine=
function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(f,k){return"width"===k?Math.min(f.offsetWidth,f.scrollWidth)-a.getStyle(f,"padding-left")-a.getStyle(f,"padding-right"):"height"===k?Math.min(f.offsetHeight,f.scrollHeight)-a.getStyle(f,"padding-top")-a.getStyle(f,"padding-bottom"):(f=D.getComputedStyle(f,void 0))&&a.pInt(f.getPropertyValue(k))};a.inArray=function(a,k){return k.indexOf?k.indexOf(a):[].indexOf.call(k,a)};a.grep=function(a,k){return[].filter.call(a,k)};a.find=function(a,
k){return[].find.call(a,k)};a.map=function(a,k){for(var f=[],t=0,e=a.length;t<e;t++)f[t]=k.call(a[t],a[t],t,a);return f};a.offset=function(a){var k=A.documentElement;a=a.getBoundingClientRect();return{top:a.top+(D.pageYOffset||k.scrollTop)-(k.clientTop||0),left:a.left+(D.pageXOffset||k.scrollLeft)-(k.clientLeft||0)}};a.stop=function(a,k){for(var f=y.length;f--;)y[f].elem!==a||k&&k!==y[f].prop||(y[f].stopped=!0)};a.each=function(a,k,r){return Array.prototype.forEach.call(a,k,r)};a.addEvent=function(f,
k,r){function t(a){a.target=a.srcElement||D;r.call(f,a)}var e=f.hcEvents=f.hcEvents||{};f.addEventListener?f.addEventListener(k,r,!1):f.attachEvent&&(f.hcEventsIE||(f.hcEventsIE={}),f.hcEventsIE[r.toString()]=t,f.attachEvent("on"+k,t));e[k]||(e[k]=[]);e[k].push(r);return function(){a.removeEvent(f,k,r)}};a.removeEvent=function(f,k,r){function t(a,d){f.removeEventListener?f.removeEventListener(a,d,!1):f.attachEvent&&(d=f.hcEventsIE[d.toString()],f.detachEvent("on"+a,d))}function e(){var a,e;if(f.nodeName)for(e in k?
(a={},a[k]=!0):a=d,a)if(d[e])for(a=d[e].length;a--;)t(e,d[e][a])}var p,d=f.hcEvents,q;d&&(k?(p=d[k]||[],r?(q=a.inArray(r,p),-1<q&&(p.splice(q,1),d[k]=p),t(k,r)):(e(),d[k]=[])):(e(),f.hcEvents={}))};a.fireEvent=function(f,k,r,t){var e;e=f.hcEvents;var p,d;r=r||{};if(A.createEvent&&(f.dispatchEvent||f.fireEvent))e=A.createEvent("Events"),e.initEvent(k,!0,!0),a.extend(e,r),f.dispatchEvent?f.dispatchEvent(e):f.fireEvent(k,e);else if(e)for(e=e[k]||[],p=e.length,r.target||a.extend(r,{preventDefault:function(){r.defaultPrevented=
!0},target:f,type:k}),k=0;k<p;k++)(d=e[k])&&!1===d.call(f,r)&&r.preventDefault();t&&!r.defaultPrevented&&t(r)};a.animate=function(f,k,r){var t,e="",p,d,q;a.isObject(r)||(t=arguments,r={duration:t[2],easing:t[3],complete:t[4]});a.isNumber(r.duration)||(r.duration=400);r.easing="function"===typeof r.easing?r.easing:Math[r.easing]||Math.easeInOutSine;r.curAnim=a.merge(k);for(q in k)a.stop(f,q),d=new a.Fx(f,r,q),p=null,"d"===q?(d.paths=d.initPath(f,f.d,k.d),d.toD=k.d,t=0,p=1):f.attr?t=f.attr(q):(t=parseFloat(a.getStyle(f,
q))||0,"opacity"!==q&&(e="px")),p||(p=k[q]),p.match&&p.match("px")&&(p=p.replace(/px/g,"")),d.run(t,p,e)};a.seriesType=function(f,k,r,t,e){var p=a.getOptions(),d=a.seriesTypes;p.plotOptions[f]=a.merge(p.plotOptions[k],r);d[f]=a.extendClass(d[k]||function(){},t);d[f].prototype.type=f;e&&(d[f].prototype.pointClass=a.extendClass(a.Point,e));return d[f]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),k=0;return function(){return"highcharts-"+a+"-"+k++}}();D.jQuery&&(D.jQuery.fn.highcharts=
function(){var f=[].slice.call(arguments);if(this[0])return f[0]?(new (a[a.isString(f[0])?f.shift():"Chart"])(this[0],f[0],f[1]),this):F[a.attr(this[0],"data-highcharts-chart")]});A&&!A.defaultView&&(a.getStyle=function(f,k){var r={width:"clientWidth",height:"clientHeight"}[k];if(f.style[k])return a.pInt(f.style[k]);"opacity"===k&&(k="filter");if(r)return f.style.zoom=1,Math.max(f[r]-2*a.getStyle(f,"padding"),0);f=f.currentStyle[k.replace(/\-(\w)/g,function(a,e){return e.toUpperCase()})];"filter"===
k&&(f=f.replace(/alpha\(opacity=([0-9]+)\)/,function(a,e){return e/100}));return""===f?1:a.pInt(f)});Array.prototype.forEach||(a.each=function(a,k,r){for(var f=0,e=a.length;f<e;f++)if(!1===k.call(r,a[f],f,a))return f});Array.prototype.indexOf||(a.inArray=function(a,k){var f,t=0;if(k)for(f=k.length;t<f;t++)if(k[t]===a)return t;return-1});Array.prototype.filter||(a.grep=function(a,k){for(var f=[],t=0,e=a.length;t<e;t++)k(a[t],t)&&f.push(a[t]);return f});Array.prototype.find||(a.find=function(a,k){var f,
t=a.length;for(f=0;f<t;f++)if(k(a[f],f))return a[f]})})(I);(function(a){var y=a.each,F=a.isNumber,A=a.map,D=a.merge,f=a.pInt;a.Color=function(k){if(!(this instanceof a.Color))return new a.Color(k);this.init(k)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[f(a[1]),f(a[2]),f(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[f(a[1],
16),f(a[2],16),f(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[f(a[1]),f(a[2]),f(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(f){var k,t,e,p;if((this.input=f=this.names[f]||f)&&f.stops)this.stops=A(f.stops,function(d){return new a.Color(d[1])});else for(e=this.parsers.length;e--&&!t;)p=this.parsers[e],(k=p.regex.exec(f))&&(t=p.parse(k));this.rgba=t||[]},get:function(a){var f=this.input,k=this.rgba,e;this.stops?
(e=D(f),e.stops=[].concat(e.stops),y(this.stops,function(p,d){e.stops[d]=[e.stops[d][0],p.get(a)]})):e=k&&F(k[0])?"rgb"===a||!a&&1===k[3]?"rgb("+k[0]+","+k[1]+","+k[2]+")":"a"===a?k[3]:"rgba("+k.join(",")+")":f;return e},brighten:function(a){var k,t=this.rgba;if(this.stops)y(this.stops,function(e){e.brighten(a)});else if(F(a)&&0!==a)for(k=0;3>k;k++)t[k]+=f(255*a),0>t[k]&&(t[k]=0),255<t[k]&&(t[k]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(f){return new a.Color(f)}})(I);
(function(a){function y(){var e=a.defaultOptions.global,p=t.moment;if(e.timezone){if(p)return function(a){return-p.tz(a,e.timezone).utcOffset()};a.error(25)}return e.useUTC&&e.getTimezoneOffset}function F(){var e=a.defaultOptions.global,p,d=e.useUTC,q=d?"getUTC":"get",k=d?"setUTC":"set";a.Date=p=e.Date||t.Date;p.hcTimezoneOffset=d&&e.timezoneOffset;p.hcGetTimezoneOffset=y();p.hcMakeTime=function(a,n,m,c,b,e){var u;d?(u=p.UTC.apply(0,arguments),u+=f(u)):u=(new p(a,n,r(m,1),r(c,0),r(b,0),r(e,0))).getTime();
return u};D("Minutes Hours Day Date Month FullYear".split(" "),function(a){p["hcGet"+a]=q+a});D("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),function(a){p["hcSet"+a]=k+a})}var A=a.color,D=a.each,f=a.getTZOffset,k=a.merge,r=a.pick,t=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),
shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.7/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},
itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,
dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:A("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(e){a.defaultOptions=k(!0,a.defaultOptions,e);F();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;F()})(I);
(function(a){var y,F,A=a.addEvent,D=a.animate,f=a.attr,k=a.charts,r=a.color,t=a.css,e=a.createElement,p=a.defined,d=a.deg2rad,q=a.destroyObjectProperties,x=a.doc,v=a.each,n=a.extend,m=a.erase,c=a.grep,b=a.hasTouch,E=a.inArray,u=a.isArray,g=a.isFirefox,z=a.isMS,G=a.isObject,H=a.isString,l=a.isWebKit,B=a.merge,K=a.noop,L=a.pick,J=a.pInt,h=a.removeEvent,C=a.stop,M=a.svg,N=a.SVG_NS,R=a.symbolSizes,S=a.win;y=a.SVGElement=function(){return this};y.prototype={opacity:1,SVG_NS:N,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
init:function(a,h){this.element="span"===h?e(h):x.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(w,h,b){h=a.animObject(L(h,this.renderer.globalAnimation,!0));0!==h.duration?(b&&(h.complete=b),D(this,w,h)):this.attr(w,null,b);return this},colorGradient:function(w,h,b){var g=this.renderer,c,C,l,m,z,n,Q,d,e,G,q,f=[],H;w.linearGradient?C="linearGradient":w.radialGradient&&(C="radialGradient");if(C){l=w[C];z=g.gradients;Q=w.stops;G=b.radialReference;u(l)&&(w[C]=l={x1:l[0],y1:l[1],x2:l[2],
y2:l[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===C&&G&&!p(l.gradientUnits)&&(m=l,l=B(l,g.getRadialAttr(G,m),{gradientUnits:"userSpaceOnUse"}));for(q in l)"id"!==q&&f.push(q,l[q]);for(q in Q)f.push(Q[q]);f=f.join(",");z[f]?G=z[f].attr("id"):(l.id=G=a.uniqueKey(),z[f]=n=g.createElement(C).attr(l).add(g.defs),n.radAttr=m,n.stops=[],v(Q,function(w){0===w[1].indexOf("rgba")?(c=a.color(w[1]),d=c.get("rgb"),e=c.get("a")):(d=w[1],e=1);w=g.createElement("stop").attr({offset:w[0],"stop-color":d,
"stop-opacity":e}).add(n);n.stops.push(w)}));H="url("+g.url+"#"+G+")";b.setAttribute(h,H);b.gradient=f;w.toString=function(){return H}}},applyTextOutline:function(a){var w=this.element,h,b,g,c;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(w.style.fill)));this.fakeTS=!0;this.ySetter=this.xSetter;h=[].slice.call(w.getElementsByTagName("tspan"));a=a.split(" ");b=a[a.length-1];(g=a[0])&&"none"!==g&&(g=g.replace(/(^[\d\.]+)(.*?)$/g,function(a,w,h){return 2*w+h}),v(h,function(a){"highcharts-text-outline"===
a.getAttribute("class")&&m(h,w.removeChild(a))}),c=w.firstChild,v(h,function(a,h){0===h&&(a.setAttribute("x",w.getAttribute("x")),h=w.getAttribute("y"),a.setAttribute("y",h||0),null===h&&w.setAttribute("y",0));a=a.cloneNode(1);f(a,{"class":"highcharts-text-outline",fill:b,stroke:b,"stroke-width":g,"stroke-linejoin":"round"});w.insertBefore(a,c)}))},attr:function(a,h,b,g){var w,c=this.element,l,m=this,z;"string"===typeof a&&void 0!==h&&(w=a,a={},a[w]=h);if("string"===typeof a)m=(this[a+"Getter"]||
this._defaultGetter).call(this,a,c);else{for(w in a)h=a[w],z=!1,g||C(this,w),this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(w)&&(l||(this.symbolAttr(a),l=!0),z=!0),!this.rotation||"x"!==w&&"y"!==w||(this.doTransform=!0),z||(z=this[w+"Setter"]||this._defaultSetter,z.call(this,h,w,c),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(w)&&this.updateShadows(w,h,z));this.doTransform&&(this.updateTransform(),this.doTransform=!1)}b&&b();return m},updateShadows:function(a,
h,b){for(var w=this.shadows,g=w.length;g--;)b.call(w[g],"height"===a?Math.max(h-(w[g].cutHeight||0),0):"d"===a?this.d:h,a,w[g])},addClass:function(a,h){var w=this.attr("class")||"";-1===w.indexOf(a)&&(h||(a=(w+(w?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==f(this.element,"class").indexOf(a)},removeClass:function(a){f(this.element,"class",(f(this.element,"class")||"").replace(a,""));return this},symbolAttr:function(a){var w=this;v("x y r start end width height innerR anchorX anchorY".split(" "),
function(h){w[h]=L(a[h],w[h])});w.attr({d:w.renderer.symbols[w.symbolName](w.x,w.y,w.width,w.height,w)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var w,b={},g;h=h||a.strokeWidth||0;g=Math.round(h)%2/2;a.x=Math.floor(a.x||this.x||0)+g;a.y=Math.floor(a.y||this.y||0)+g;a.width=Math.floor((a.width||this.width||0)-2*g);a.height=Math.floor((a.height||this.height||0)-2*g);p(a.strokeWidth)&&(a.strokeWidth=h);for(w in a)this[w]!==a[w]&&
(this[w]=b[w]=a[w]);return b},css:function(a){var w=this.styles,h={},b=this.element,g,c,l="";g=!w;var C=["textOverflow","width"];a&&a.color&&(a.fill=a.color);if(w)for(c in a)a[c]!==w[c]&&(h[c]=a[c],g=!0);if(g){g=this.textWidth=a&&a.width&&"text"===b.nodeName.toLowerCase()&&J(a.width)||this.textWidth;w&&(a=n(w,h));this.styles=a;g&&!M&&this.renderer.forExport&&delete a.width;if(z&&!M)t(this.element,a);else{w=function(a,w){return"-"+w.toLowerCase()};for(c in a)-1===E(c,C)&&(l+=c.replace(/([A-Z])/g,w)+
":"+a[c]+";");l&&f(b,"style",l)}this.added&&(g&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var w=this,g=w.element;b&&"click"===a?(g.ontouchstart=function(a){w.touchEventFired=Date.now();a.preventDefault();h.call(g,a)},g.onclick=function(a){(-1===S.navigator.userAgent.indexOf("Android")||1100<Date.now()-(w.touchEventFired||0))&&h.call(g,a)}):g["on"+a]=h;return this},setRadialReference:function(a){var w=
this.renderer.gradients[this.element.gradient];this.element.radialReference=a;w&&w.radAttr&&w.animate(this.renderer.getRadialAttr(a,w.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,b=this.scaleX,g=this.scaleY,c=this.inverted,l=this.rotation,C=this.element;c&&(a+=this.width,h+=this.height);a=["translate("+a+","+
h+")"];c?a.push("rotate(90) scale(-1,1)"):l&&a.push("rotate("+l+" "+(C.getAttribute("x")||0)+" "+(C.getAttribute("y")||0)+")");(p(b)||p(g))&&a.push("scale("+L(b,1)+" "+L(g,1)+")");a.length&&C.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,b){var w,g,c,l,C={};g=this.renderer;c=g.alignedObjects;var z,n;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!b||H(b))this.alignTo=w=b||"renderer",m(c,this),c.push(this),
b=null}else a=this.alignOptions,h=this.alignByTranslate,w=this.alignTo;b=L(b,g[w],g);w=a.align;g=a.verticalAlign;c=(b.x||0)+(a.x||0);l=(b.y||0)+(a.y||0);"right"===w?z=1:"center"===w&&(z=2);z&&(c+=(b.width-(a.width||0))/z);C[h?"translateX":"x"]=Math.round(c);"bottom"===g?n=1:"middle"===g&&(n=2);n&&(l+=(b.height-(a.height||0))/n);C[h?"translateY":"y"]=Math.round(l);this[this.placed?"animate":"attr"](C);this.placed=!0;this.alignAttr=C;return this},getBBox:function(a,h){var w,b=this.renderer,g,c=this.element,
l=this.styles,C,m=this.textStr,z,e=b.cache,B=b.cacheKeys,G;h=L(h,this.rotation);g=h*d;C=l&&l.fontSize;void 0!==m&&(G=m.toString(),-1===G.indexOf("\x3c")&&(G=G.replace(/[0-9]/g,"0")),G+=["",h||0,C,l&&l.width,l&&l.textOverflow].join());G&&!a&&(w=e[G]);if(!w){if(c.namespaceURI===this.SVG_NS||b.forExport){try{(z=this.fakeTS&&function(a){v(c.querySelectorAll(".highcharts-text-outline"),function(w){w.style.display=a})})&&z("none"),w=c.getBBox?n({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight},
z&&z("")}catch(V){}if(!w||0>w.width)w={width:0,height:0}}else w=this.htmlGetBBox();b.isSVG&&(a=w.width,b=w.height,l&&"11px"===l.fontSize&&17===Math.round(b)&&(w.height=b=14),h&&(w.width=Math.abs(b*Math.sin(g))+Math.abs(a*Math.cos(g)),w.height=Math.abs(b*Math.cos(g))+Math.abs(a*Math.sin(g))));if(G&&0<w.height){for(;250<B.length;)delete e[B.shift()];e[G]||B.push(G);e[G]=w}}return w},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},
fadeOut:function(a){var w=this;w.animate({opacity:0},{duration:a||150,complete:function(){w.attr({y:-9999})}})},add:function(a){var w=this.renderer,h=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&w.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:w.box).appendChild(h);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var w=a.parentNode;w&&w.removeChild(a)},destroy:function(){var a=
this.element||{},h=this.renderer.isSVG&&"SPAN"===a.nodeName&&this.parentGroup,b,g;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;C(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(g=0;g<this.stops.length;g++)this.stops[g]=this.stops[g].destroy();this.stops=null}this.safeRemoveChild(a);for(this.destroyShadows();h&&h.div&&0===h.div.childNodes.length;)a=h.parentGroup,this.safeRemoveChild(h.div),delete h.div,h=a;this.alignTo&&m(this.renderer.alignedObjects,
this);for(b in this)delete this[b];return null},shadow:function(a,h,b){var w=[],g,c,l=this.element,C,m,z,n;if(!a)this.destroyShadows();else if(!this.shadows){m=L(a.width,3);z=(a.opacity||.15)/m;n=this.parentInverted?"(-1,-1)":"("+L(a.offsetX,1)+", "+L(a.offsetY,1)+")";for(g=1;g<=m;g++)c=l.cloneNode(0),C=2*m+1-2*g,f(c,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":z*g,"stroke-width":C,transform:"translate"+n,fill:"none"}),b&&(f(c,"height",Math.max(f(c,"height")-C,0)),c.cutHeight=C),h?
h.element.appendChild(c):l.parentNode.insertBefore(c,l),w.push(c);this.shadows=w}return this},destroyShadows:function(){v(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=L(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,b){a&&a.join&&(a=
a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");b.setAttribute(h,a);this[h]=a},dashstyleSetter:function(a){var w,h=this["stroke-width"];"inherit"===h&&(h=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(w=a.length;w--;)a[w]=J(a[w])*h;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",
a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,b){this[h]=a;b.setAttribute(h,a)},titleSetter:function(a){var w=this.element.getElementsByTagName("title")[0];w||(w=x.createElementNS(this.SVG_NS,"title"),this.element.appendChild(w));w.firstChild&&w.removeChild(w.firstChild);w.appendChild(x.createTextNode(String(L(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,
this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,h,b){"string"===typeof a?b.setAttribute(h,a):a&&this.colorGradient(a,h,b)},visibilitySetter:function(a,h,b){"inherit"===a?b.removeAttribute(h):b.setAttribute(h,a)},zIndexSetter:function(a,h){var w=this.renderer,b=this.parentGroup,g=(b||w).element||w.box,c,l=this.element,C;c=this.added;var m;p(a)&&(l.zIndex=a,a=+a,this[h]===a&&(c=!1),this[h]=a);if(c){(a=this.zIndex)&&b&&(b.handleZ=!0);h=g.childNodes;for(m=0;m<h.length&&
!C;m++)b=h[m],c=b.zIndex,b!==l&&(J(c)>a||!p(a)&&p(c)||0>a&&!p(c)&&g!==w.box)&&(g.insertBefore(l,b),C=!0);C||g.appendChild(l)}return C},_defaultSetter:function(a,h,b){b.setAttribute(h,a)}};y.prototype.yGetter=y.prototype.xGetter;y.prototype.translateXSetter=y.prototype.translateYSetter=y.prototype.rotationSetter=y.prototype.verticalAlignSetter=y.prototype.scaleXSetter=y.prototype.scaleYSetter=function(a,h){this[h]=a;this.doTransform=!0};y.prototype["stroke-widthSetter"]=y.prototype.strokeSetter=function(a,
h,b){this[h]=a;this.stroke&&this["stroke-width"]?(y.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===h&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),this.hasStroke=!1)};F=a.SVGRenderer=function(){this.init.apply(this,arguments)};F.prototype={Element:y,SVG_NS:N,init:function(a,h,b,c,C,m){var w;c=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(c));w=c.element;
a.appendChild(w);-1===a.innerHTML.indexOf("xmlns")&&f(w,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=w;this.boxWrapper=c;this.alignedObjects=[];this.url=(g||l)&&x.getElementsByTagName("base").length?S.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highmaps 5.0.7"));this.defs=this.createElement("defs").add();this.allowHTML=m;this.forExport=C;this.gradients=
{};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(h,b,!1);var z;g&&a.getBoundingClientRect&&(h=function(){t(a,{left:0,top:0});z=a.getBoundingClientRect();t(a,{left:Math.ceil(z.left)-z.left+"px",top:Math.ceil(z.top)-z.top+"px"})},h(),this.unSubPixelFix=A(S,"resize",h))},getStyle:function(a){return this.style=n({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},
destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();q(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:K,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},buildText:function(a){var h=a.element,w=this,b=w.forExport,g=L(a.textStr,"").toString(),
l=-1!==g.indexOf("\x3c"),C=h.childNodes,m,z,n,e,d=f(h,"x"),B=a.styles,G=a.textWidth,p=B&&B.lineHeight,u=B&&B.textOutline,q=B&&"ellipsis"===B.textOverflow,H=B&&"nowrap"===B.whiteSpace,E=B&&B.fontSize,k,K=C.length,B=G&&!a.added&&this.box,r=function(a){var b;b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:E||w.style.fontSize||12;return p?J(p):w.fontMetrics(b,a.getAttribute("style")?a:h).h};k=[g,q,H,p,u,E,G].join();if(k!==a.textCache){for(a.textCache=k;K--;)h.removeChild(C[K]);l||u||q||G||-1!==
g.indexOf(" ")?(m=/<.*class="([^"]+)".*>/,z=/<.*style="([^"]+)".*>/,n=/<.*href="(http[^"]+)".*>/,B&&B.appendChild(h),g=l?g.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[g],g=c(g,function(a){return""!==a}),v(g,function(g,c){var l,C=0;g=g.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");
l=g.split("|||");v(l,function(g){if(""!==g||1===l.length){var B={},u=x.createElementNS(w.SVG_NS,"tspan"),p,v;m.test(g)&&(p=g.match(m)[1],f(u,"class",p));z.test(g)&&(v=g.match(z)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),f(u,"style",v));n.test(g)&&!b&&(f(u,"onclick",'location.href\x3d"'+g.match(n)[1]+'"'),t(u,{cursor:"pointer"}));g=(g.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==g){u.appendChild(x.createTextNode(g));C?B.dx=0:c&&null!==d&&(B.x=d);f(u,B);
h.appendChild(u);!C&&c&&(!M&&b&&t(u,{display:"block"}),f(u,"dy",r(u)));if(G){B=g.replace(/([^\^])-/g,"$1- ").split(" ");p=1<l.length||c||1<B.length&&!H;for(var k,E,L=[],K=r(u),Q=a.rotation,J=g,O=J.length;(p||q)&&(B.length||L.length);)a.rotation=0,k=a.getBBox(!0),E=k.width,!M&&w.forExport&&(E=w.measureSpanWidth(u.firstChild.data,a.styles)),k=E>G,void 0===e&&(e=k),q&&e?(O/=2,""===J||!k&&.5>O?B=[]:(J=g.substring(0,J.length+(k?-1:1)*Math.ceil(O)),B=[J+(3<G?"\u2026":"")],u.removeChild(u.firstChild))):
k&&1!==B.length?(u.removeChild(u.firstChild),L.unshift(B.pop())):(B=L,L=[],B.length&&!H&&(u=x.createElementNS(N,"tspan"),f(u,{dy:K,x:d}),v&&f(u,"style",v),h.appendChild(u)),E>G&&(G=E)),B.length&&u.appendChild(x.createTextNode(B.join(" ").replace(/- /g,"-")));a.rotation=Q}C++}}})}),e&&a.attr("title",a.textStr),B&&B.removeChild(h),u&&a.applyTextOutline&&a.applyTextOutline(u)):h.appendChild(x.createTextNode(g.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=r(a).rgba;return 510<
a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,b,g,c,l,C,m,e){var w=this.label(a,h,b,e,null,null,null,null,"button"),d=0;w.attr(B({padding:8,r:2},c));var G,u,p,q;c=B({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},c);G=c.style;delete c.style;l=B(c,{fill:"#e6e6e6"},l);u=l.style;delete l.style;C=B(c,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},C);p=C.style;delete C.style;m=B(c,{style:{color:"#cccccc"}},m);q=m.style;
delete m.style;A(w.element,z?"mouseover":"mouseenter",function(){3!==d&&w.setState(1)});A(w.element,z?"mouseout":"mouseleave",function(){3!==d&&w.setState(d)});w.setState=function(a){1!==a&&(w.state=d=a);w.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);w.attr([c,l,C,m][a||0]).css([G,u,p,q][a||0])};w.attr(c).css(n({cursor:"default"},G));return w.on("click",function(a){3!==d&&g.call(w,a)})},crispLine:function(a,
h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};u(a)?h.d=a:G(a)&&n(h,a);return this.createElement("path").attr(h)},circle:function(a,h,b){a=G(a)?a:{x:a,y:h,r:b};h=this.createElement("circle");h.xSetter=h.ySetter=function(a,h,b){b.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,b,g,c,l){G(a)&&(h=a.y,b=a.r,g=a.innerR,c=a.start,l=a.end,a=a.x);a=this.symbol("arc",a||0,h||0,b||0,b||0,{innerR:g||
0,start:c||0,end:l||0});a.r=b;return a},rect:function(a,h,b,g,c,l){c=G(a)?a.r:c;var w=this.createElement("rect");a=G(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(b,0),height:Math.max(g,0)};void 0!==l&&(a.strokeWidth=l,a=w.crisp(a));a.fill="none";c&&(a.r=c);w.rSetter=function(a,h,b){f(b,{rx:a,ry:a})};return w.attr(a)},setSize:function(a,h,b){var g=this.alignedObjects,c=g.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+
" "+this.attr("height")})},duration:L(b,!0)?void 0:0});c--;)g[c].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,b,g,c){var w={preserveAspectRatio:"none"};1<arguments.length&&n(w,{x:h,y:b,width:g,height:c});w=this.createElement("image").attr(w);w.element.setAttributeNS?w.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):w.element.setAttribute("hc-svg-href",a);return w},symbol:function(a,h,b,g,c,l){var w=this,C,m=this.symbols[a],
z=p(h)&&m&&this.symbols[a](Math.round(h),Math.round(b),g,c,l),B=/^url\((.*?)\)$/,d,G;m?(C=this.path(z),C.attr("fill","none"),n(C,{symbolName:a,x:h,y:b,width:g,height:c}),l&&n(C,l)):B.test(a)&&(d=a.match(B)[1],C=this.image(d),C.imgwidth=L(R[d]&&R[d].width,l&&l.width),C.imgheight=L(R[d]&&R[d].height,l&&l.height),G=function(){C.attr({width:C.width,height:C.height})},v(["width","height"],function(a){C[a+"Setter"]=function(a,h){var b={},g=this["img"+h],c="width"===h?"translateX":"translateY";this[h]=a;
p(g)&&(this.element&&this.element.setAttribute(h,g),this.alignByTranslate||(b[c]=((this[h]||0)-g)/2,this.attr(b)))}}),p(h)&&C.attr({x:h,y:b}),C.isImg=!0,p(C.imgwidth)&&p(C.imgheight)?G():(C.attr({width:0,height:0}),e("img",{onload:function(){var a=k[w.chartIndex];0===this.width&&(t(this,{position:"absolute",top:"-999em"}),x.body.appendChild(this));R[d]={width:this.width,height:this.height};C.imgwidth=this.width;C.imgheight=this.height;C.element&&G();this.parentNode&&this.parentNode.removeChild(this);
w.imgCount--;if(!w.imgCount&&a&&a.onload)a.onload()},src:d}),this.imgCount++));return C},symbols:{circle:function(a,h,b,g){return this.arc(a+b/2,h+g/2,b/2,g/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,b,g){return["M",a,h,"L",a+b,h,a+b,h+g,a,h+g,"Z"]},triangle:function(a,h,b,g){return["M",a+b/2,h,"L",a+b,h+g,a,h+g,"Z"]},"triangle-down":function(a,h,b,g){return["M",a,h,"L",a+b,h,a+b/2,h+g,"Z"]},diamond:function(a,h,b,g){return["M",a+b/2,h,"L",a+b,h+g/2,a+b/2,h+g,a,h+g/2,"Z"]},arc:function(a,
h,b,g,c){var C=c.start,l=c.r||b,w=c.r||g||b,m=c.end-.001;b=c.innerR;g=c.open;var z=Math.cos(C),n=Math.sin(C),B=Math.cos(m),m=Math.sin(m);c=c.end-C<Math.PI?0:1;l=["M",a+l*z,h+w*n,"A",l,w,0,c,1,a+l*B,h+w*m];p(b)&&l.push(g?"M":"L",a+b*B,h+b*m,"A",b,b,0,c,0,a+b*z,h+b*n);l.push(g?"":"Z");return l},callout:function(a,h,b,g,c){var l=Math.min(c&&c.r||0,b,g),C=l+6,m=c&&c.anchorX;c=c&&c.anchorY;var w;w=["M",a+l,h,"L",a+b-l,h,"C",a+b,h,a+b,h,a+b,h+l,"L",a+b,h+g-l,"C",a+b,h+g,a+b,h+g,a+b-l,h+g,"L",a+l,h+g,"C",
a,h+g,a,h+g,a,h+g-l,"L",a,h+l,"C",a,h,a,h,a+l,h];m&&m>b?c>h+C&&c<h+g-C?w.splice(13,3,"L",a+b,c-6,a+b+6,c,a+b,c+6,a+b,h+g-l):w.splice(13,3,"L",a+b,g/2,m,c,a+b,g/2,a+b,h+g-l):m&&0>m?c>h+C&&c<h+g-C?w.splice(33,3,"L",a,c+6,a-6,c,a,c-6,a,h+l):w.splice(33,3,"L",a,g/2,m,c,a,g/2,a,h+l):c&&c>g&&m>a+C&&m<a+b-C?w.splice(23,3,"L",m+6,h+g,m,h+g+6,m-6,h+g,a+l,h+g):c&&0>c&&m>a+C&&m<a+b-C&&w.splice(3,3,"L",m-6,h,m,h-6,m+6,h,b-l,h);return w}},clipRect:function(h,b,g,c){var l=a.uniqueKey(),C=this.createElement("clipPath").attr({id:l}).add(this.defs);
h=this.rect(h,b,g,c,0).add(C);h.id=l;h.clipPath=C;h.count=0;return h},text:function(a,h,b,g){var c=!M&&this.forExport,l={};if(g&&(this.allowHTML||!this.forExport))return this.html(a,h,b);l.x=Math.round(h||0);b&&(l.y=Math.round(b));if(a||0===a)l.text=a;a=this.createElement("text").attr(l);c&&a.css({position:"absolute"});g||(a.xSetter=function(a,h,b){var g=b.getElementsByTagName("tspan"),c,l=b.getAttribute(h),C;for(C=0;C<g.length;C++)c=g[C],c.getAttribute(h)===l&&c.setAttribute(h,a);b.setAttribute(h,
a)});return a},fontMetrics:function(a,h){a=a||h&&h.style&&h.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?J(a):/em/.test(a)?parseFloat(a)*(h?this.fontMetrics(null,h.parentNode).f:16):12;h=24>a?a+3:Math.round(1.2*a);return{h:h,b:Math.round(.8*h),f:a}},rotCorr:function(a,h,b){var g=a;h&&b&&(g=Math.max(g*Math.cos(h*d),4));return{x:-a/3*Math.sin(h*d),y:g}},label:function(a,b,g,c,l,C,m,z,d){var w=this,e=w.g("button"!==d&&"label"),G=e.text=w.text("",0,0,m).attr({zIndex:1}),u,q,f=0,k=3,
E=0,H,N,M,L,K,x={},J,t,r=/^url\((.*?)\)$/.test(c),R=r,Q,S,O,P;d&&e.addClass("highcharts-"+d);R=r;Q=function(){return(J||0)%2/2};S=function(){var a=G.element.style,h={};q=(void 0===H||void 0===N||K)&&p(G.textStr)&&G.getBBox();e.width=(H||q.width||0)+2*k+E;e.height=(N||q.height||0)+2*k;t=k+w.fontMetrics(a&&a.fontSize,G).b;R&&(u||(e.box=u=w.symbols[c]||r?w.symbol(c):w.rect(),u.addClass(("button"===d?"":"highcharts-label-box")+(d?" highcharts-"+d+"-box":"")),u.add(e),a=Q(),h.x=a,h.y=(z?-t:0)+a),h.width=
Math.round(e.width),h.height=Math.round(e.height),u.attr(n(h,x)),x={})};O=function(){var a=E+k,h;h=z?0:t;p(H)&&q&&("center"===K||"right"===K)&&(a+={center:.5,right:1}[K]*(H-q.width));if(a!==G.x||h!==G.y)G.attr("x",a),void 0!==h&&G.attr("y",h);G.x=a;G.y=h};P=function(a,h){u?u.attr(a,h):x[a]=h};e.onAdd=function(){G.add(e);e.attr({text:a||0===a?a:"",x:b,y:g});u&&p(l)&&e.attr({anchorX:l,anchorY:C})};e.widthSetter=function(a){H=a};e.heightSetter=function(a){N=a};e["text-alignSetter"]=function(a){K=a};
e.paddingSetter=function(a){p(a)&&a!==k&&(k=e.padding=a,O())};e.paddingLeftSetter=function(a){p(a)&&a!==E&&(E=a,O())};e.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==f&&(f=a,q&&e.attr({x:M}))};e.textSetter=function(a){void 0!==a&&G.textSetter(a);S();O()};e["stroke-widthSetter"]=function(a,h){a&&(R=!0);J=this["stroke-width"]=a;P(h,a)};e.strokeSetter=e.fillSetter=e.rSetter=function(a,h){"fill"===h&&a&&(R=!0);P(h,a)};e.anchorXSetter=function(a,h){l=a;P(h,Math.round(a)-Q()-M)};e.anchorYSetter=
function(a,h){C=a;P(h,a-L)};e.xSetter=function(a){e.x=a;f&&(a-=f*((H||q.width)+2*k));M=Math.round(a);e.attr("translateX",M)};e.ySetter=function(a){L=e.y=Math.round(a);e.attr("translateY",L)};var D=e.css;return n(e,{css:function(a){if(a){var h={};a=B(a);v(e.textProps,function(b){void 0!==a[b]&&(h[b]=a[b],delete a[b])});G.css(h)}return D.call(e,a)},getBBox:function(){return{width:q.width+2*k,height:q.height+2*k,x:q.x-k,y:q.y-k}},shadow:function(a){a&&(S(),u&&u.shadow(a));return e},destroy:function(){h(e.element,
"mouseenter");h(e.element,"mouseleave");G&&(G=G.destroy());u&&(u=u.destroy());y.prototype.destroy.call(e);e=w=S=O=P=null}})}};a.Renderer=F})(I);(function(a){var y=a.attr,F=a.createElement,A=a.css,D=a.defined,f=a.each,k=a.extend,r=a.isFirefox,t=a.isMS,e=a.isWebKit,p=a.pInt,d=a.SVGRenderer,q=a.win,x=a.wrap;k(a.SVGElement.prototype,{htmlCss:function(a){var n=this.element;if(n=a&&"SPAN"===n.tagName&&a.width)delete a.width,this.textWidth=n,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace=
"nowrap",a.overflow="hidden");this.styles=k(this.styles,a);A(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,n=this.element,m=this.translateX||0,c=this.translateY||0,b=this.x||0,d=this.y||0,u=this.textAlign||"left",g={left:0,center:.5,right:1}[u],z=this.styles;A(n,{marginLeft:m,marginTop:c});
this.shadows&&f(this.shadows,function(a){A(a,{marginLeft:m+1,marginTop:c+1})});this.inverted&&f(n.childNodes,function(b){a.invertChild(b,n)});if("SPAN"===n.tagName){var G=this.rotation,q=p(this.textWidth),l=z&&z.whiteSpace,B=[G,u,n.innerHTML,this.textWidth,this.textAlign].join();B!==this.cTT&&(z=a.fontMetrics(n.style.fontSize).b,D(G)&&this.setSpanRotation(G,g,z),A(n,{width:"",whiteSpace:l||"nowrap"}),n.offsetWidth>q&&/[ \-]/.test(n.textContent||n.innerText)&&A(n,{width:q+"px",display:"block",whiteSpace:l||
"normal"}),this.getSpanCorrection(n.offsetWidth,z,g,G,u));A(n,{left:b+(this.xCorr||0)+"px",top:d+(this.yCorr||0)+"px"});e&&(z=n.offsetHeight);this.cTT=B}}else this.alignOnAdd=!0},setSpanRotation:function(a,n,m){var c={},b=t?"-ms-transform":e?"-webkit-transform":r?"MozTransform":q.opera?"-o-transform":"";c[b]=c.transform="rotate("+a+"deg)";c[b+(r?"Origin":"-origin")]=c.transformOrigin=100*n+"% "+m+"px";A(this.element,c)},getSpanCorrection:function(a,n,m){this.xCorr=-a*m;this.yCorr=-n}});k(d.prototype,
{html:function(a,n,m){var c=this.createElement("span"),b=c.element,e=c.renderer,d=e.isSVG,g=function(a,b){f(["opacity","visibility"],function(g){x(a,g+"Setter",function(a,g,c,m){a.call(this,g,c,m);b[c]=g})})};c.textSetter=function(a){a!==b.innerHTML&&delete this.bBox;b.innerHTML=this.textStr=a;c.htmlUpdateTransform()};d&&g(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===b&&(b="textAlign");c[b]=a;c.htmlUpdateTransform()};c.attr({text:a,x:Math.round(n),
y:Math.round(m)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});b.style.whiteSpace="nowrap";c.css=c.htmlCss;d&&(c.add=function(a){var m,z=e.box.parentNode,l=[];if(this.parentGroup=a){if(m=a.div,!m){for(;a;)l.push(a),a=a.parentGroup;f(l.reverse(),function(a){var b,n=y(a.element,"class");n&&(n={className:n});m=a.div=a.div||F("div",n,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&
a.styles.pointerEvents},m||z);b=m.style;k(a,{on:function(){c.on.apply({element:l[0].div},arguments);return a},translateXSetter:function(g,h){b.left=g+"px";a[h]=g;a.doTransform=!0},translateYSetter:function(g,h){b.top=g+"px";a[h]=g;a.doTransform=!0}});g(a,b)})}}else m=z;m.appendChild(b);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})})(I);(function(a){var y,F,A=a.createElement,D=a.css,f=a.defined,k=a.deg2rad,r=a.discardElement,t=a.doc,e=a.each,p=a.erase,d=a.extend;y=a.extendClass;
var q=a.isArray,x=a.isNumber,v=a.isObject,n=a.merge;F=a.noop;var m=a.pick,c=a.pInt,b=a.SVGElement,E=a.SVGRenderer,u=a.win;a.svg||(F={docMode8:t&&8===t.documentMode,init:function(a,b){var g=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],c=["position: ","absolute",";"],l="div"===b;("shape"===b||l)&&c.push("left:0;top:0;width:1px;height:1px;");c.push("visibility: ",l?"hidden":"visible");g.push(' style\x3d"',c.join(""),'"/\x3e');b&&(g=l||"span"===b||"img"===b?g.join(""):a.prepVML(g),this.element=A(g));this.renderer=
a},add:function(a){var b=this.renderer,g=this.element,c=b.box,l=a&&a.inverted,c=a?a.element||a:c;a&&(this.parentGroup=a);l&&b.invertChild(g,c);c.appendChild(g);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:b.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*k),c=Math.sin(a*k);D(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",
b,", M12\x3d",-c,", M21\x3d",c,", M22\x3d",b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,n,l){var g=n?Math.cos(n*k):1,z=n?Math.sin(n*k):0,e=m(this.elemHeight,this.element.offsetHeight),d;this.xCorr=0>g&&-a;this.yCorr=0>z&&-e;d=0>g*z;this.xCorr+=z*b*(d?1-c:c);this.yCorr-=g*b*(n?d?c:1-c:1);l&&"left"!==l&&(this.xCorr-=a*c*(0>g?-1:1),n&&(this.yCorr-=e*c*(0>z?-1:1)),D(this.element,{textAlign:l}))},pathToVML:function(a){for(var b=a.length,g=[];b--;)x(a[b])?g[b]=
Math.round(10*a[b])-5:"Z"===a[b]?g[b]="x":(g[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b]||(g[b+5]===g[b+7]&&(g[b+7]+=a[b+7]>a[b+5]?1:-1),g[b+6]===g[b+8]&&(g[b+8]+=a[b+8]>a[b+6]?1:-1)));return g.join(" ")||"x"},clip:function(a){var b=this,g;a?(g=a.members,p(g,b),g.push(b),b.destroyClip=function(){p(g,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:b.docMode8?"inherit":"rect(auto)"});return b.css(a)},css:b.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&r(a)},destroy:function(){this.destroyClip&&
this.destroyClip();return b.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=u.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var g;a=a.split(/[ ,]/);g=a.length;if(9===g||11===g)a[g-4]=a[g-2]=c(a[g-2])-10*b;return a.join(" ")},shadow:function(a,b,n){var g=[],l,e=this.element,z=this.renderer,d,u=e.style,h,C=e.path,q,p,G,k;C&&"string"!==typeof C.value&&(C="x");p=C;if(a){G=m(a.width,3);k=(a.opacity||.15)/G;for(l=1;3>=l;l++)q=2*G+1-2*l,n&&
(p=this.cutOffPath(C.value,q+.5)),h=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',q,'" filled\x3d"false" path\x3d"',p,'" coordsize\x3d"10 10" style\x3d"',e.style.cssText,'" /\x3e'],d=A(z.prepVML(h),null,{left:c(u.left)+m(a.offsetX,1),top:c(u.top)+m(a.offsetY,1)}),n&&(d.cutOff=q+1),h=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',k*l,'"/\x3e'],A(z.prepVML(h),null,null,d),b?b.element.appendChild(d):e.parentNode.insertBefore(d,e),g.push(d);this.shadows=g}return this},updateShadows:F,
setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||A(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var g=this.shadows;a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(g)for(c=g.length;c--;)g[c].path=g[c].cutOff?this.cutOffPath(a,g[c].cutOff):a;this.setAttr(b,
a)},fillSetter:function(a,b,c){var g=c.nodeName;"SPAN"===g?c.style.color=a:"IMG"!==g&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,b,this)))},"fill-opacitySetter":function(a,b,c){A(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,c)},opacitySetter:F,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-Math.round(Math.sin(a*k)+1)+"px";c.top=Math.round(Math.cos(a*k))+"px"},strokeSetter:function(a,b,c){this.setAttr("strokecolor",
this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;x(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){"inherit"===a&&(a="visible");this.shadows&&e(this.shadows,function(c){c.style[b]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?
(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a}},F["stroke-opacitySetter"]=F["fill-opacitySetter"],a.VMLElement=F=y(b,F),F.prototype.ySetter=F.prototype.widthSetter=F.prototype.heightSetter=F.prototype.xSetter,F={Element:F,isIE8:-1<u.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,c){var g,l;this.alignedObjects=[];g=this.createElement("div").css({position:"relative"});l=g.element;a.appendChild(g.element);this.isVML=!0;this.box=l;this.boxWrapper=
g;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!t.namespaces.hcv){t.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{t.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(B){t.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},
clipRect:function(a,b,c,m){var g=this.createElement(),n=v(a);return d(g,{members:[],count:0,left:(n?a.x:a)+1,top:(n?a.y:b)+1,width:(n?a.width:c)-1,height:(n?a.height:m)-1,getCSS:function(a){var b=a.element,c=b.nodeName,h=a.inverted,g=this.top-("shape"===c?b.offsetTop:0),l=this.left,b=l+this.width,m=g+this.height,g={clip:"rect("+Math.round(h?l:g)+"px,"+Math.round(h?m:b)+"px,"+Math.round(h?b:m)+"px,"+Math.round(h?g:l)+"px)"};!h&&a.docMode8&&"DIV"===c&&d(g,{width:b+"px",height:m+"px"});return g},updateClipping:function(){e(g.members,
function(a){a.element&&a.css(g.getCSS(a))})}})},color:function(b,c,m,n){var g=this,d,u=/^rgba/,z,q,h="none";b&&b.linearGradient?q="gradient":b&&b.radialGradient&&(q="pattern");if(q){var C,p,k=b.linearGradient||b.radialGradient,f,E,w,v,G,H="";b=b.stops;var x,t=[],r=function(){z=['\x3cfill colors\x3d"'+t.join(",")+'" opacity\x3d"',w,'" o:opacity2\x3d"',E,'" type\x3d"',q,'" ',H,'focus\x3d"100%" method\x3d"any" /\x3e'];A(g.prepVML(z),null,null,c)};f=b[0];x=b[b.length-1];0<f[0]&&b.unshift([0,f[1]]);1>
x[0]&&b.push([1,x[1]]);e(b,function(h,b){u.test(h[1])?(d=a.color(h[1]),C=d.get("rgb"),p=d.get("a")):(C=h[1],p=1);t.push(100*h[0]+"% "+C);b?(w=p,v=C):(E=p,G=C)});if("fill"===m)if("gradient"===q)m=k.x1||k[0]||0,b=k.y1||k[1]||0,f=k.x2||k[2]||0,k=k.y2||k[3]||0,H='angle\x3d"'+(90-180*Math.atan((k-b)/(f-m))/Math.PI)+'"',r();else{var h=k.r,D=2*h,y=2*h,F=k.cx,U=k.cy,I=c.radialReference,T,h=function(){I&&(T=n.getBBox(),F+=(I[0]-T.x)/T.width-.5,U+=(I[1]-T.y)/T.height-.5,D*=I[2]/T.width,y*=I[2]/T.height);H=
'src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+D+","+y+'" origin\x3d"0.5,0.5" position\x3d"'+F+","+U+'" color2\x3d"'+G+'" ';r()};n.added?h():n.onAdd=h;h=v}else h=C}else u.test(b)&&"IMG"!==c.tagName?(d=a.color(b),n[m+"-opacitySetter"](d.get("a"),m,c),h=d.get("rgb")):(h=c.getElementsByTagName(m),h.length&&(h[0].opacity=1,h[0].type="solid"),h=b);return h},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=
-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:E.prototype.html,path:function(a){var b={coordsize:"10 10"};q(a)?b.d=a:v(a)&&d(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var g=this.symbol("circle");v(a)&&(c=a.r,b=a.y,a=a.x);g.isCircle=!0;g.r=c;return g.attr({x:a,y:b})},g:function(a){var b;
a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,c,m,l){var g=this.createElement("img").attr({src:a});1<arguments.length&&g.attr({x:b,y:c,width:m,height:l});return g},createElement:function(a){return"rect"===a?this.symbol(a):E.prototype.createElement.call(this,a)},invertChild:function(a,b){var g=this;b=b.style;var m="IMG"===a.tagName&&a.style;D(a,{flip:"x",left:c(b.width)-(m?c(m.top):1),top:c(b.height)-(m?c(m.left):1),rotation:-90});
e(a.childNodes,function(b){g.invertChild(b,a)})},symbols:{arc:function(a,b,c,m,l){var g=l.start,n=l.end,e=l.r||c||m;c=l.innerR;m=Math.cos(g);var d=Math.sin(g),h=Math.cos(n),C=Math.sin(n);if(0===n-g)return["x"];g=["wa",a-e,b-e,a+e,b+e,a+e*m,b+e*d,a+e*h,b+e*C];l.open&&!c&&g.push("e","M",a,b);g.push("at",a-c,b-c,a+c,b+c,a+c*h,b+c*C,a+c*m,b+c*d,"x","e");g.isArc=!0;return g},circle:function(a,b,c,m,l){l&&f(l.r)&&(c=m=2*l.r);l&&l.isCircle&&(a-=c/2,b-=m/2);return["wa",a,b,a+c,b+m,a+c,b+m/2,a+c,b+m/2,"e"]},
rect:function(a,b,c,m,l){return E.prototype.symbols[f(l)&&l.r?"callout":"square"].call(0,a,b,c,m,l)}}},a.VMLRenderer=y=function(){this.init.apply(this,arguments)},y.prototype=n(E.prototype,F),a.Renderer=y);E.prototype.measureSpanWidth=function(a,b){var c=t.createElement("span");a=t.createTextNode(a);c.appendChild(a);D(c,b);this.box.appendChild(c);b=c.offsetWidth;r(c);return b}})(I);(function(a){var y=a.correctFloat,F=a.defined,A=a.destroyObjectProperties,D=a.isNumber,f=a.merge,k=a.pick,r=a.deg2rad;
a.Tick=function(a,e,p,d){this.axis=a;this.pos=e;this.type=p||"";this.isNew=!0;p||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,e=a.options,p=a.chart,d=a.categories,q=a.names,x=this.pos,v=e.labels,n=a.tickPositions,m=x===n[0],c=x===n[n.length-1],q=d?k(d[x],q[x],x):x,d=this.label,n=n.info,b;a.isDatetimeAxis&&n&&(b=e.dateTimeLabelFormats[n.higherRanks[x]||n.unitName]);this.isFirst=m;this.isLast=c;e=a.labelFormatter.call({axis:a,chart:p,isFirst:m,isLast:c,dateTimeLabelFormat:b,
value:a.isLog?y(a.lin2log(q)):q});F(d)?d&&d.attr({text:e}):(this.labelLength=(this.label=d=F(e)&&v.enabled?p.renderer.text(e,0,0,v.useHTML).css(f(v.style)).add(a.labelGroup):null)&&d.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var e=this.axis,p=a.x,d=e.chart.chartWidth,q=e.chart.spacing,f=k(e.labelLeft,Math.min(e.pos,q[3])),q=k(e.labelRight,Math.max(e.pos+e.len,d-q[1])),v=this.label,
n=this.rotation,m={left:0,center:.5,right:1}[e.labelAlign],c=v.getBBox().width,b=e.getSlotWidth(),E=b,u=1,g,z={};if(n)0>n&&p-m*c<f?g=Math.round(p/Math.cos(n*r)-f):0<n&&p+m*c>q&&(g=Math.round((d-p)/Math.cos(n*r)));else if(d=p+(1-m)*c,p-m*c<f?E=a.x+E*(1-m)-f:d>q&&(E=q-a.x+E*m,u=-1),E=Math.min(b,E),E<b&&"center"===e.labelAlign&&(a.x+=u*(b-E-m*(b-Math.min(c,E)))),c>E||e.autoRotation&&(v.styles||{}).width)g=E;g&&(z.width=g,(e.options.labels.style||{}).textOverflow||(z.textOverflow="ellipsis"),v.css(z))},
getPosition:function(a,e,p,d){var q=this.axis,k=q.chart,f=d&&k.oldChartHeight||k.chartHeight;return{x:a?q.translate(e+p,null,null,d)+q.transB:q.left+q.offset+(q.opposite?(d&&k.oldChartWidth||k.chartWidth)-q.right-q.left:0),y:a?f-q.bottom+q.offset-(q.opposite?q.height:0):f-q.translate(e+p,null,null,d)-q.transB}},getLabelPosition:function(a,e,p,d,q,k,f,n){var m=this.axis,c=m.transA,b=m.reversed,E=m.staggerLines,u=m.tickRotCorr||{x:0,y:0},g=q.y;F(g)||(g=0===m.side?p.rotation?-8:-p.getBBox().height:2===
m.side?u.y+8:Math.cos(p.rotation*r)*(u.y-p.getBBox(!1,0).height/2));a=a+q.x+u.x-(k&&d?k*c*(b?-1:1):0);e=e+g-(k&&!d?k*c*(b?1:-1):0);E&&(p=f/(n||1)%E,m.opposite&&(p=E-p-1),e+=m.labelOffset/E*p);return{x:a,y:Math.round(e)}},getMarkPath:function(a,e,p,d,q,k){return k.crispLine(["M",a,e,"L",a+(q?0:-p),e+(q?p:0)],d)},render:function(a,e,p){var d=this.axis,q=d.options,f=d.chart.renderer,v=d.horiz,n=this.type,m=this.label,c=this.pos,b=q.labels,E=this.gridLine,u=n?n+"Tick":"tick",g=d.tickSize(u),z=this.mark,
G=!z,H=b.step,l={},B=!0,K=d.tickmarkOffset,L=this.getPosition(v,c,K,e),J=L.x,L=L.y,h=v&&J===d.pos+d.len||!v&&L===d.pos?-1:1,C=n?n+"Grid":"grid",M=q[C+"LineWidth"],N=q[C+"LineColor"],r=q[C+"LineDashStyle"],C=k(q[u+"Width"],!n&&d.isXAxis?1:0),u=q[u+"Color"];p=k(p,1);this.isActive=!0;E||(l.stroke=N,l["stroke-width"]=M,r&&(l.dashstyle=r),n||(l.zIndex=1),e&&(l.opacity=0),this.gridLine=E=f.path().attr(l).addClass("highcharts-"+(n?n+"-":"")+"grid-line").add(d.gridGroup));if(!e&&E&&(c=d.getPlotLinePath(c+
K,E.strokeWidth()*h,e,!0)))E[this.isNew?"attr":"animate"]({d:c,opacity:p});g&&(d.opposite&&(g[0]=-g[0]),G&&(this.mark=z=f.path().addClass("highcharts-"+(n?n+"-":"")+"tick").add(d.axisGroup),z.attr({stroke:u,"stroke-width":C})),z[G?"attr":"animate"]({d:this.getMarkPath(J,L,g[0],z.strokeWidth()*h,v,f),opacity:p}));m&&D(J)&&(m.xy=L=this.getLabelPosition(J,L,m,v,b,K,a,H),this.isFirst&&!this.isLast&&!k(q.showFirstLabel,1)||this.isLast&&!this.isFirst&&!k(q.showLastLabel,1)?B=!1:!v||d.isRadial||b.step||
b.rotation||e||0===p||this.handleOverflow(L),H&&a%H&&(B=!1),B&&D(L.y)?(L.opacity=p,m[this.isNew?"attr":"animate"](L)):m.attr("y",-9999),this.isNew=!1)},destroy:function(){A(this,this.axis)}}})(I);(function(a){var y=a.arrayMax,F=a.arrayMin,A=a.defined,D=a.destroyObjectProperties,f=a.each,k=a.erase,r=a.merge,t=a.pick;a.PlotLineOrBand=function(a,p){this.axis=a;p&&(this.options=p,this.id=p.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,p=a.axis,d=p.horiz,q=a.options,k=q.label,f=a.label,
n=q.to,m=q.from,c=q.value,b=A(m)&&A(n),E=A(c),u=a.svgElem,g=!u,z=[],G,H=q.color,l=t(q.zIndex,0),B=q.events,z={"class":"highcharts-plot-"+(b?"band ":"line ")+(q.className||"")},K={},L=p.chart.renderer,J=b?"bands":"lines",h=p.log2lin;p.isLog&&(m=h(m),n=h(n),c=h(c));E?(z={stroke:H,"stroke-width":q.width},q.dashStyle&&(z.dashstyle=q.dashStyle)):b&&(H&&(z.fill=H),q.borderWidth&&(z.stroke=q.borderColor,z["stroke-width"]=q.borderWidth));K.zIndex=l;J+="-"+l;(H=p[J])||(p[J]=H=L.g("plot-"+J).attr(K).add());
g&&(a.svgElem=u=L.path().attr(z).add(H));if(E)z=p.getPlotLinePath(c,u.strokeWidth());else if(b)z=p.getPlotBandPath(m,n,q);else return;if(g&&z&&z.length){if(u.attr({d:z}),B)for(G in q=function(b){u.on(b,function(h){B[b].apply(a,[h])})},B)q(G)}else u&&(z?(u.show(),u.animate({d:z})):(u.hide(),f&&(a.label=f=f.destroy())));k&&A(k.text)&&z&&z.length&&0<p.width&&0<p.height&&!z.flat?(k=r({align:d&&b&&"center",x:d?!b&&4:10,verticalAlign:!d&&b&&"middle",y:d?b?16:10:b?6:-4,rotation:d&&!b&&90},k),this.renderLabel(k,
z,b,l)):f&&f.hide();return a},renderLabel:function(a,p,d,q){var e=this.label,k=this.axis.chart.renderer;e||(e={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(d?"band":"line")+"-label "+(a.className||"")},e.zIndex=q,this.label=e=k.text(a.text,0,0,a.useHTML).attr(e).add(),e.css(a.style));q=[p[1],p[4],d?p[6]:p[1]];p=[p[2],p[5],d?p[7]:p[2]];d=F(q);k=F(p);e.align(a,!1,{x:d,y:k,width:y(q)-d,height:y(p)-k});e.show()},destroy:function(){k(this.axis.plotLinesAndBands,this);delete this.axis;
D(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,k){k=this.getPlotLinePath(k,null,null,!0);(a=this.getPlotLinePath(a,null,null,!0))&&k?(a.flat=a.toString()===k.toString(),a.push(k[4],k[5],k[1],k[2],"z")):a=null;return a},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(e,k){var d=(new a.PlotLineOrBand(this,e)).render(),q=this.userOptions;d&&(k&&(q[k]=q[k]||[],q[k].push(e)),
this.plotLinesAndBands.push(d));return d},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,d=this.options,q=this.userOptions,x=e.length;x--;)e[x].id===a&&e[x].destroy();f([d.plotLines||[],q.plotLines||[],d.plotBands||[],q.plotBands||[]],function(d){for(x=d.length;x--;)d[x].id===a&&k(d,d[x])})}}})(I);(function(a){var y=a.addEvent,F=a.animObject,A=a.arrayMax,D=a.arrayMin,f=a.AxisPlotLineOrBandExtension,k=a.color,r=a.correctFloat,t=a.defaultOptions,e=a.defined,p=a.deg2rad,d=a.destroyObjectProperties,
q=a.each,x=a.extend,v=a.fireEvent,n=a.format,m=a.getMagnitude,c=a.grep,b=a.inArray,E=a.isArray,u=a.isNumber,g=a.isString,z=a.merge,G=a.normalizeTickInterval,H=a.pick,l=a.PlotLineOrBand,B=a.removeEvent,K=a.splat,L=a.syncTimeout,J=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",
cursor:"default",fontSize:"11px"},x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,
labels:{x:-8},maxPadding:.05,minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],
x:0},title:{rotation:0}},init:function(a,c){var h=c.isX;this.chart=a;this.horiz=a.inverted?!h:h;this.isXAxis=h;this.coll=this.coll||(h?"xAxis":"yAxis");this.opposite=c.opposite;this.side=c.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(c);var l=this.options,m=l.type;this.labelFormatter=l.labels.formatter||this.defaultLabelFormatter;this.userOptions=c;this.minPixelPadding=0;this.reversed=l.reversed;this.visible=!1!==l.visible;this.zoomEnabled=!1!==l.zoomEnabled;this.hasNames=
"category"===m||!0===l.categories;this.categories=l.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===m;this.isDatetimeAxis="datetime"===m;this.isLinked=e(l.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=l.minRange||l.maxZoom;this.range=l.range;this.offset=l.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=H(l.crosshair,
K(a.options.tooltip.crosshairs)[h?0:1],!1);var g;c=this.options.events;-1===b(this,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&h&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(g in c)y(this,g,c[g]);this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=z(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,
[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],z(t[this.coll],a))},defaultLabelFormatter:function(){var b=this.axis,c=this.value,l=b.categories,m=this.dateTimeLabelFormat,g=t.lang,d=g.numericSymbols,g=g.numericSymbolMagnitude||1E3,w=d&&d.length,e,u=b.options.labels.format,b=b.isLog?c:b.tickInterval;if(u)e=n(u,this);else if(l)e=c;else if(m)e=a.dateFormat(m,c);else if(w&&1E3<=b)for(;w--&&void 0===e;)l=Math.pow(g,w+1),b>=
l&&0===10*c%l&&null!==d[w]&&0!==c&&(e=a.numberFormat(c/l,-1)+d[w]);void 0===e&&(e=1E4<=Math.abs(c)?a.numberFormat(c,-1):a.numberFormat(c,-1,void 0,""));return e},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();q(a.series,function(h){if(h.visible||!b.options.chart.ignoreHiddenSeries){var l=h.options,g=l.threshold,m;a.hasVisibleSeries=!0;a.isLog&&0>=g&&(g=null);if(a.isXAxis)l=h.xData,
l.length&&(h=D(l),u(h)||h instanceof Date||(l=c(l,function(a){return u(a)}),h=D(l)),a.dataMin=Math.min(H(a.dataMin,l[0]),h),a.dataMax=Math.max(H(a.dataMax,l[0]),A(l)));else if(h.getExtremes(),m=h.dataMax,h=h.dataMin,e(h)&&e(m)&&(a.dataMin=Math.min(H(a.dataMin,h),h),a.dataMax=Math.max(H(a.dataMax,m),m)),e(g)&&(a.threshold=g),!l.softThreshold||a.isLog)a.softThreshold=!1}})},translate:function(a,b,c,l,g,m){var h=this.linkedParent||this,C=1,n=0,d=l?h.oldTransA:h.transA;l=l?h.oldMin:h.min;var e=h.minPixelPadding;
g=(h.isOrdinal||h.isBroken||h.isLog&&g)&&h.lin2val;d||(d=h.transA);c&&(C*=-1,n=h.len);h.reversed&&(C*=-1,n-=C*(h.sector||h.len));b?(a=(a*C+n-e)/d+l,g&&(a=h.lin2val(a))):(g&&(a=h.val2lin(a)),a=C*(a-l)*d+n+C*e+(u(m)?d*m:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,l,g){var h=this.chart,m=this.left,C=this.top,n,d,e=c&&h.oldChartHeight||
h.chartHeight,k=c&&h.oldChartWidth||h.chartWidth,q;n=this.transB;var f=function(a,b,h){if(a<b||a>h)l?a=Math.min(Math.max(b,a),h):q=!0;return a};g=H(g,this.translate(a,null,null,c));a=c=Math.round(g+n);n=d=Math.round(e-g-n);u(g)?this.horiz?(n=C,d=e-this.bottom,a=c=f(a,m,m+this.width)):(a=m,c=k-this.right,n=d=f(n,C,C+this.height)):q=!0;return q&&!l?null:h.renderer.crispLine(["M",a,n,"L",c,d],b||1)},getLinearTickPositions:function(a,b,c){var h,l=r(Math.floor(b/a)*a),g=r(Math.ceil(c/a)*a),m=[];if(b===
c&&u(b))return[b];for(b=l;b<=g;){m.push(b);b=r(b+a);if(b===h)break;h=b}return m},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,l=[],g,m=this.pointRangePadding||0;g=this.min-m;var m=this.max+m,n=m-g;if(n&&n/c<this.len/3)if(this.isLog)for(m=b.length,g=1;g<m;g++)l=l.concat(this.getLogTickPositions(c,b[g-1],b[g],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)l=l.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),g,m,a.startOfWeek));
else for(b=g+(b[0]-g)%c;b<=m&&b!==l[0];b+=c)l.push(b);0!==l.length&&this.trimTicks(l,a.startOnTick,a.endOnTick);return l},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,l,g=this.dataMax-this.dataMin>=this.minRange,m,n,d,u,k,f;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(e(a.min)||e(a.max)?this.minRange=null:(q(this.series,function(a){u=a.xData;for(n=k=a.xIncrement?1:u.length-1;0<n;n--)if(d=u[n]-u[n-1],void 0===m||d<m)m=d}),this.minRange=Math.min(5*m,this.dataMax-this.dataMin)));
c-b<this.minRange&&(f=this.minRange,l=(f-c+b)/2,l=[b-l,H(a.min,b-l)],g&&(l[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=A(l),c=[b+f,H(a.max,b+f)],g&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=D(c),c-b<f&&(l[0]=c-f,l[1]=H(a.min,c-f),b=A(l)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:q(this.series,function(b){var h=b.closestPointRange,c=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&e(h)&&c&&(a=e(a)?Math.min(a,h):h)});
return a},nameToX:function(a){var h=E(this.categories),c=h?this.categories:this.names,l=a.options.x,g;a.series.requireSorting=!1;e(l)||(l=!1===this.options.uniqueNames?a.series.autoIncrement():b(a.name,c));-1===l?h||(g=c.length):g=l;this.names[g]=a.name;return g},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,q(this.series||[],function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)b.processData(),b.generatePoints();q(b.points,function(h,c){var l;
h.options&&(l=a.nameToX(h),l!==h.x&&(h.x=l,b.xData[c]=l))})}))},setAxisTranslation:function(a){var b=this,h=b.max-b.min,c=b.axisPointRange||0,l,m=0,n=0,d=b.linkedParent,e=!!b.categories,u=b.transA,k=b.isXAxis;if(k||e||c)l=b.getClosest(),d?(m=d.minPointOffset,n=d.pointRangePadding):q(b.series,function(a){var h=e?1:k?H(a.options.pointRange,l,0):b.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,h);b.single||(m=Math.max(m,g(a)?0:h/2),n=Math.max(n,"on"===a?0:h))}),d=b.ordinalSlope&&l?b.ordinalSlope/
l:1,b.minPointOffset=m*=d,b.pointRangePadding=n*=d,b.pointRange=Math.min(c,h),k&&(b.closestPointRange=l);a&&(b.oldTransA=u);b.translationSlope=b.transA=u=b.len/(h+n||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=u*m},minFromRange:function(){return this.max-this.range},setTickInterval:function(b){var h=this,c=h.chart,l=h.options,g=h.isLog,n=h.log2lin,d=h.isDatetimeAxis,k=h.isXAxis,f=h.isLinked,B=l.maxPadding,p=l.minPadding,z=l.tickInterval,E=l.tickPixelInterval,L=h.categories,K=h.threshold,
x=h.softThreshold,J,t,D,y;d||L||f||this.getTickAmount();D=H(h.userMin,l.min);y=H(h.userMax,l.max);f?(h.linkedParent=c[h.coll][l.linkedTo],c=h.linkedParent.getExtremes(),h.min=H(c.min,c.dataMin),h.max=H(c.max,c.dataMax),l.type!==h.linkedParent.options.type&&a.error(11,1)):(!x&&e(K)&&(h.dataMin>=K?(J=K,p=0):h.dataMax<=K&&(t=K,B=0)),h.min=H(D,J,h.dataMin),h.max=H(y,t,h.dataMax));g&&(!b&&0>=Math.min(h.min,H(h.dataMin,h.min))&&a.error(10,1),h.min=r(n(h.min),15),h.max=r(n(h.max),15));h.range&&e(h.max)&&
(h.userMin=h.min=D=Math.max(h.min,h.minFromRange()),h.userMax=y=h.max,h.range=null);v(h,"foundExtremes");h.beforePadding&&h.beforePadding();h.adjustForMinRange();!(L||h.axisPointRange||h.usePercentage||f)&&e(h.min)&&e(h.max)&&(n=h.max-h.min)&&(!e(D)&&p&&(h.min-=n*p),!e(y)&&B&&(h.max+=n*B));u(l.floor)?h.min=Math.max(h.min,l.floor):u(l.softMin)&&(h.min=Math.min(h.min,l.softMin));u(l.ceiling)?h.max=Math.min(h.max,l.ceiling):u(l.softMax)&&(h.max=Math.max(h.max,l.softMax));x&&e(h.dataMin)&&(K=K||0,!e(D)&&
h.min<K&&h.dataMin>=K?h.min=K:!e(y)&&h.max>K&&h.dataMax<=K&&(h.max=K));h.tickInterval=h.min===h.max||void 0===h.min||void 0===h.max?1:f&&!z&&E===h.linkedParent.options.tickPixelInterval?z=h.linkedParent.tickInterval:H(z,this.tickAmount?(h.max-h.min)/Math.max(this.tickAmount-1,1):void 0,L?1:(h.max-h.min)*E/Math.max(h.len,E));k&&!b&&q(h.series,function(a){a.processData(h.min!==h.oldMin||h.max!==h.oldMax)});h.setAxisTranslation(!0);h.beforeSetTickPositions&&h.beforeSetTickPositions();h.postProcessTickInterval&&
(h.tickInterval=h.postProcessTickInterval(h.tickInterval));h.pointRange&&!z&&(h.tickInterval=Math.max(h.pointRange,h.tickInterval));b=H(l.minTickInterval,h.isDatetimeAxis&&h.closestPointRange);!z&&h.tickInterval<b&&(h.tickInterval=b);d||g||z||(h.tickInterval=G(h.tickInterval,null,m(h.tickInterval),H(l.allowDecimals,!(.5<h.tickInterval&&5>h.tickInterval&&1E3<h.max&&9999>h.max)),!!this.tickAmount));this.tickAmount||(h.tickInterval=h.unsquish());this.setTickPositions()},setTickPositions:function(){var a=
this.options,b,c=a.tickPositions,l=a.tickPositioner,g=a.startOnTick,m=a.endOnTick,n;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=b=c&&c.slice();!b&&(b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,
!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],b.pop()]),this.tickPositions=b,l&&(l=l.apply(this,[this.min,this.max])))&&(this.tickPositions=b=l);this.trimTicks(b,g,m);this.isLinked||(this.min===this.max&&e(this.min)&&!this.tickAmount&&(n=!0,this.min-=.5,this.max+=.5),this.single=n,c||l||this.adjustTickAmount())},trimTicks:function(a,b,c){var h=a[0],l=a[a.length-1],g=this.minPointOffset||
0;if(!this.isLinked){if(b)this.min=h;else for(;this.min-g>a[0];)a.shift();if(c)this.max=l;else for(;this.max+g<a[a.length-1];)a.pop();0===a.length&&e(h)&&a.push((l+h)/2)}},alignToOthers:function(){var a={},b,c=this.options;!1===this.chart.options.chart.alignTicks||!1===c.alignTicks||this.isLog||q(this.chart[this.coll],function(h){var c=h.options,c=[h.horiz?c.left:c.top,c.width,c.height,c.pane].join();h.series.length&&(a[c]?b=!0:a[c]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,
c=a.tickPixelInterval;!e(a.tickInterval)&&this.len<c&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/c)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,c=this.tickAmount,l=this.finalTickAmt,g=b&&b.length;if(g<c){for(;b.length<c;)b.push(r(b[b.length-1]+a));this.transA*=(g-1)/(c-1);this.max=b[b.length-1]}else g>c&&(this.tickInterval*=2,this.setTickPositions());
if(e(l)){for(a=c=b.length;a--;)(3===l&&1===a%2||2>=l&&0<a&&a<c-1)&&b.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;q(this.series,function(b){if(b.isDirtyData||b.isDirty||b.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=
!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,b,c,l,g){var h=this,m=h.chart;c=H(c,!0);q(h.series,function(a){delete a.kdTree});g=x(g,{min:a,max:b});v(h,"setExtremes",g,function(){h.userMin=a;h.userMax=b;h.eventArgs=g;c&&m.redraw(l)})},zoom:function(a,b){var h=this.dataMin,c=this.dataMax,l=this.options,
g=Math.min(h,H(l.min,h)),l=Math.max(c,H(l.max,c));if(a!==this.min||b!==this.max)this.allowZoomOutside||(e(h)&&(a<g&&(a=g),a>l&&(a=l)),e(c)&&(b<g&&(b=g),b>l&&(b=l))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsets||[0,0,0,0],l=this.horiz,g=H(b.width,a.plotWidth-c[3]+c[1]),m=H(b.height,a.plotHeight-c[0]+c[2]),n=H(b.top,a.plotTop+c[0]),b=H(b.left,a.plotLeft+c[3]),c=/%$/;c.test(m)&&(m=
Math.round(parseFloat(m)/100*a.plotHeight));c.test(n)&&(n=Math.round(parseFloat(n)/100*a.plotHeight+a.plotTop));this.left=b;this.top=n;this.width=g;this.height=m;this.bottom=a.chartHeight-m-n;this.right=a.chartWidth-g-b;this.len=Math.max(l?g:m,0);this.pos=l?b:n},getExtremes:function(){var a=this.isLog,b=this.lin2log;return{min:a?r(b(this.min)):this.min,max:a?r(b(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=
this.isLog,h=this.lin2log,c=b?h(this.min):this.min,b=b?h(this.max):this.max;null===a?a=c:c>a?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(H(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var b=this.options,h=b[a+"Length"],c=H(b[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(c&&h)return"inside"===b[a+"Position"]&&(h=-h),[h,c]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,c=this.tickInterval,l=c,g=this.len/(((this.categories?1:0)+this.max-this.min)/c),m,n=a.rotation,d=this.labelMetrics(),u,k=Number.MAX_VALUE,f,B=function(a){a/=g||1;a=1<a?Math.ceil(a):1;return a*c};b?(f=!a.staggerLines&&!a.step&&(e(n)?[n]:g<H(a.autoRotationLimit,80)&&a.autoRotation))&&q(f,function(a){var b;if(a===n||a&&-90<=a&&90>=a)u=B(Math.abs(d.h/Math.sin(p*a))),b=u+
Math.abs(a/360),b<k&&(k=b,m=a,l=u)}):a.step||(l=B(d.h));this.autoRotation=f;this.labelRotation=H(m,n);return l},getSlotWidth:function(){var a=this.chart,b=this.horiz,c=this.options.labels,l=Math.max(this.tickPositions.length-(this.categories?0:1),1),g=a.margin[3];return b&&2>(c.step||0)&&!c.rotation&&(this.staggerLines||1)*this.len/l||!b&&(g&&g-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,c=this.tickPositions,l=this.ticks,m=this.options.labels,n=this.horiz,
d=this.getSlotWidth(),e=Math.max(1,Math.round(d-2*(m.padding||5))),u={},k=this.labelMetrics(),f=m.style&&m.style.textOverflow,B,p=0,E,v;g(m.rotation)||(u.rotation=m.rotation||0);q(c,function(a){(a=l[a])&&a.labelLength>p&&(p=a.labelLength)});this.maxLabelLength=p;if(this.autoRotation)p>e&&p>k.h?u.rotation=this.labelRotation:this.labelRotation=0;else if(d&&(B={width:e+"px"},!f))for(B.textOverflow="clip",E=c.length;!n&&E--;)if(v=c[E],e=l[v].label)e.styles&&"ellipsis"===e.styles.textOverflow?e.css({textOverflow:"clip"}):
l[v].labelLength>d&&e.css({width:d+"px"}),e.getBBox().height>this.len/c.length-(k.h-k.f)&&(e.specCss={textOverflow:"ellipsis"});u.rotation&&(B={width:(p>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},f||(B.textOverflow="ellipsis"));if(this.labelAlign=m.align||this.autoLabelAlign(this.labelRotation))u.align=this.labelAlign;q(c,function(a){var b=(a=l[a])&&a.label;b&&(b.attr(u),B&&b.css(z(B,b.specCss)),delete b.specCss,a.rotation=u.rotation)});this.tickRotCorr=b.rotCorr(k.b,this.labelRotation||
0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||e(this.min)&&e(this.max)&&!!this.tickPositions},addTitle:function(a){var b=this.chart.renderer,c=this.horiz,h=this.opposite,l=this.options.title,g;this.axisTitle||((g=l.textAlign)||(g=(c?{low:"left",middle:"center",high:"right"}:{low:h?"right":"left",middle:"center",high:h?"left":"right"})[l.align]),this.axisTitle=b.text(l.text,0,0,l.useHTML).attr({zIndex:7,rotation:l.rotation||0,align:g}).addClass("highcharts-axis-title").css(l.style).add(this.axisGroup),
this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new J(this,a)},getOffset:function(){var a=this,b=a.chart,c=b.renderer,l=a.options,g=a.tickPositions,m=a.ticks,n=a.horiz,d=a.side,u=b.inverted?[1,0,3,2][d]:d,k,f,B=0,p,z=0,E=l.title,v=l.labels,G=0,K=b.axisOffset,b=b.clipOffset,L=[-1,1,1,-1][d],x,J=l.className,r=a.axisParent,t=this.tickSize("tick");k=a.hasData();a.showAxis=f=k||H(l.showEmpty,!0);a.staggerLines=a.horiz&&v.staggerLines;
a.axisGroup||(a.gridGroup=c.g("grid").attr({zIndex:l.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(J||"")).add(r),a.axisGroup=c.g("axis").attr({zIndex:l.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(J||"")).add(r),a.labelGroup=c.g("axis-labels").attr({zIndex:v.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(J||"")).add(r));if(k||a.isLinked)q(g,function(b,c){a.generateTick(b,c)}),a.renderUnsquish(),!1===v.reserveSpace||0!==d&&2!==d&&
{1:"left",3:"right"}[d]!==a.labelAlign&&"center"!==a.labelAlign||q(g,function(a){G=Math.max(m[a].getLabelSize(),G)}),a.staggerLines&&(G*=a.staggerLines,a.labelOffset=G*(a.opposite?-1:1));else for(x in m)m[x].destroy(),delete m[x];E&&E.text&&!1!==E.enabled&&(a.addTitle(f),f&&(B=a.axisTitle.getBBox()[n?"height":"width"],p=E.offset,z=e(p)?0:H(E.margin,n?5:10)));a.renderLine();a.offset=L*H(l.offset,K[d]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};c=0===d?-a.labelMetrics().h:2===d?a.tickRotCorr.y:0;z=Math.abs(G)+
z;G&&(z=z-c+L*(n?H(v.y,a.tickRotCorr.y+8*L):v.x));a.axisTitleMargin=H(p,z);K[d]=Math.max(K[d],a.axisTitleMargin+B+L*a.offset,z,k&&g.length&&t?t[0]:0);l=l.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[u]=Math.max(b[u],l)},getLinePath:function(a){var b=this.chart,c=this.opposite,h=this.offset,l=this.horiz,g=this.left+(c?this.width:0)+h,h=b.chartHeight-this.bottom-(c?this.height:0)+h;c&&(a*=-1);return b.renderer.crispLine(["M",l?this.left:g,l?h:this.top,"L",l?b.chartWidth-this.right:g,l?h:b.chartHeight-
this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,l=this.len,g=this.options.title,m=a?b:c,n=this.opposite,d=this.offset,e=g.x||0,u=g.y||0,k=this.chart.renderer.fontMetrics(g.style&&g.style.fontSize,this.axisTitle).f,l={low:m+(a?0:l),
middle:m+l/2,high:m+(a?l:0)}[g.align],b=(a?c+this.height:b)+(a?1:-1)*(n?-1:1)*this.axisTitleMargin+(2===this.side?k:0);return{x:a?l+e:b+(n?this.width:0)+d+e,y:a?b+u-(n?this.height:0)+d:l+u}},renderMinorTick:function(a){var b=this.chart.hasRendered&&u(this.oldMin),c=this.minorTicks;c[a]||(c[a]=new J(this,a,"minor"));b&&c[a].isNew&&c[a].render(null,!0);c[a].render(null,!1,1)},renderTick:function(a,b){var c=this.isLinked,h=this.ticks,l=this.chart.hasRendered&&u(this.oldMin);if(!c||a>=this.min&&a<=this.max)h[a]||
(h[a]=new J(this,a)),l&&h[a].isNew&&h[a].render(b,!0,.1),h[a].render(b)},render:function(){var a=this,b=a.chart,c=a.options,g=a.isLog,m=a.lin2log,n=a.isLinked,d=a.tickPositions,e=a.axisTitle,u=a.ticks,k=a.minorTicks,f=a.alternateBands,B=c.stackLabels,p=c.alternateGridColor,z=a.tickmarkOffset,E=a.axisLine,v=a.showAxis,G=F(b.renderer.globalAnimation),K,H;a.labelEdge.length=0;a.overlap=!1;q([u,k,f],function(a){for(var b in a)a[b].isActive=!1});if(a.hasData()||n)a.minorTickInterval&&!a.categories&&q(a.getMinorTickPositions(),
function(b){a.renderMinorTick(b)}),d.length&&(q(d,function(b,c){a.renderTick(b,c)}),z&&(0===a.min||a.single)&&(u[-1]||(u[-1]=new J(a,-1,null,!0)),u[-1].render(-1))),p&&q(d,function(c,h){H=void 0!==d[h+1]?d[h+1]+z:a.max-z;0===h%2&&c<a.max&&H<=a.max+(b.polar?-z:z)&&(f[c]||(f[c]=new l(a)),K=c+z,f[c].options={from:g?m(K):K,to:g?m(H):H,color:p},f[c].render(),f[c].isActive=!0)}),a._addedPlotLB||(q((c.plotLines||[]).concat(c.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0);q([u,k,f],
function(a){var c,h,l=[],g=G.duration;for(c in a)a[c].isActive||(a[c].render(c,!1,0),a[c].isActive=!1,l.push(c));L(function(){for(h=l.length;h--;)a[l[h]]&&!a[l[h]].isActive&&(a[l[h]].destroy(),delete a[l[h]])},a!==f&&b.hasRendered&&g?g:0)});E&&(E[E.isPlaced?"animate":"attr"]({d:this.getLinePath(E.strokeWidth())}),E.isPlaced=!0,E[v?"show":"hide"](!0));e&&v&&(e[e.isNew?"attr":"animate"](a.getTitlePosition()),e.isNew=!1);B&&B.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&
(this.render(),q(this.plotLinesAndBands,function(a){a.render()}));q(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,h=c.stacks,l,g=c.plotLinesAndBands,m;a||B(c);for(l in h)d(h[l]),h[l]=null;q([c.ticks,c.minorTicks,c.alternateBands],function(a){d(a)});if(g)for(a=g.length;a--;)g[a].destroy();q("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});
for(m in c)c.hasOwnProperty(m)&&-1===b(m,c.keepProps)&&delete c[m]},drawCrosshair:function(a,b){var c,l=this.crosshair,h=H(l.snap,!0),g,m=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(e(b)||!h)?(h?e(b)&&(g=this.isXAxis?b.plotX:this.len-b.plotY):g=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),e(g)&&(c=this.getPlotLinePath(b&&(this.isXAxis?b.x:H(b.stackY,b.y)),null,null,null,g)||null),e(c)?(b=this.categories&&!this.isRadial,m||(this.cross=m=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+
(b?"category ":"thin ")+l.className).attr({zIndex:H(l.zIndex,2)}).add(),m.attr({stroke:l.color||(b?k("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":H(l.width,1)}),l.dashStyle&&m.attr({dashstyle:l.dashStyle})),m.show().attr({d:c}),b&&!l.width&&m.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};x(a.Axis.prototype,f)})(I);(function(a){var y=a.Axis,F=a.getMagnitude,A=a.map,D=a.normalizeTickInterval,
f=a.pick;y.prototype.getLogTickPositions=function(a,r,t,e){var k=this.options,d=this.len,q=this.lin2log,x=this.log2lin,v=[];e||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),v=this.getLinearTickPositions(a,r,t);else if(.08<=a)for(var d=Math.floor(r),n,m,c,b,E,k=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];d<t+1&&!E;d++)for(m=k.length,n=0;n<m&&!E;n++)c=x(q(d)*k[n]),c>r&&(!e||b<=t)&&void 0!==b&&v.push(b),b>t&&(E=!0),b=c;else r=q(r),t=q(t),a=k[e?"minorTickInterval":"tickInterval"],a=f("auto"===
a?null:a,this._minorAutoInterval,k.tickPixelInterval/(e?5:1)*(t-r)/((e?d/this.tickPositions.length:d)||1)),a=D(a,null,F(a)),v=A(this.getLinearTickPositions(a,r,t),x),e||(this._minorAutoInterval=a/5);e||(this.tickInterval=a);return v};y.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};y.prototype.lin2log=function(a){return Math.pow(10,a)}})(I);(function(a){var y=a.dateFormat,F=a.each,A=a.extend,D=a.format,f=a.isNumber,k=a.map,r=a.merge,t=a.pick,e=a.splat,p=a.syncTimeout,d=a.timeUnits;a.Tooltip=
function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split},cleanSplit:function(a){F(this.chart.series,function(d){var e=d&&d.tt;e&&(!e.isActive||a?d.tt=e.destroy():e.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,d=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,d.shape||
"callout",null,null,d.useHTML,null,"tooltip").attr({padding:d.padding,r:d.borderRadius}),this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();this.init(this.chart,r(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},
move:function(a,d,e,n){var m=this,c=m.now,b=!1!==m.options.animation&&!m.isHidden&&(1<Math.abs(a-c.x)||1<Math.abs(d-c.y)),k=m.followPointer||1<m.len;A(c,{x:b?(2*c.x+a)/3:a,y:b?(c.y+d)/2:d,anchorX:k?void 0:b?(2*c.anchorX+e)/3:e,anchorY:k?void 0:b?(c.anchorY+n)/2:n});m.getLabel().attr(c);b&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){m&&m.move(a,d,e,n)},32))},hide:function(a){var d=this;clearTimeout(this.hideTimer);a=t(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=
p(function(){d.getLabel()[a?"fadeOut":"hide"]();d.isHidden=!0},a))},getAnchor:function(a,d){var f,n=this.chart,m=n.inverted,c=n.plotTop,b=n.plotLeft,p=0,u=0,g,z;a=e(a);f=a[0].tooltipPos;this.followPointer&&d&&(void 0===d.chartX&&(d=n.pointer.normalize(d)),f=[d.chartX-n.plotLeft,d.chartY-c]);f||(F(a,function(a){g=a.series.yAxis;z=a.series.xAxis;p+=a.plotX+(!m&&z?z.left-b:0);u+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!m&&g?g.top-c:0)}),p/=a.length,u/=a.length,f=[m?n.plotWidth-u:p,this.shared&&
!m&&1<a.length&&d?d.chartY-c:m?n.plotHeight-p:u]);return k(f,Math.round)},getPosition:function(a,d,e){var n=this.chart,m=this.distance,c={},b=e.h||0,k,u=["y",n.chartHeight,d,e.plotY+n.plotTop,n.plotTop,n.plotTop+n.plotHeight],g=["x",n.chartWidth,a,e.plotX+n.plotLeft,n.plotLeft,n.plotLeft+n.plotWidth],f=!this.followPointer&&t(e.ttBelow,!n.inverted===!!e.negative),p=function(a,l,g,h,n,d){var e=g<h-m,u=h+m+g<l,k=h-m-g;h+=m;if(f&&u)c[a]=h;else if(!f&&e)c[a]=k;else if(e)c[a]=Math.min(d-g,0>k-b?k:k-b);
else if(u)c[a]=Math.max(n,h+b+g>l?h:h+b);else return!1},q=function(a,b,l,h){var g;h<m||h>b-m?g=!1:c[a]=h<l/2?1:h>b-l/2?b-l-2:h-l/2;return g},l=function(a){var b=u;u=g;g=b;k=a},B=function(){!1!==p.apply(0,u)?!1!==q.apply(0,g)||k||(l(!0),B()):k?c.x=c.y=0:(l(!0),B())};(n.inverted||1<this.len)&&l();B();return c},defaultFormatter:function(a){var d=this.points||e(this),k;k=[a.tooltipFooterHeaderFormatter(d[0])];k=k.concat(a.bodyFormatter(d));k.push(a.tooltipFooterHeaderFormatter(d[0],!0));return k},refresh:function(a,
d){var k=this.chart,n,m=this.options,c,b,f={},u=[];n=m.formatter||this.defaultFormatter;var f=k.hoverPoints,g=this.shared;clearTimeout(this.hideTimer);this.followPointer=e(a)[0].series.tooltipOptions.followPointer;b=this.getAnchor(a,d);d=b[0];c=b[1];!g||a.series&&a.series.noSharedTooltip?f=a.getLabelConfig():(k.hoverPoints=a,f&&F(f,function(a){a.setState()}),F(a,function(a){a.setState("hover");u.push(a.getLabelConfig())}),f={x:a[0].category,y:a[0].y},f.points=u,a=a[0]);this.len=u.length;f=n.call(f,
this);g=a.series;this.distance=t(g.tooltipOptions.distance,16);!1===f?this.hide():(n=this.getLabel(),this.isHidden&&n.attr({opacity:1}).show(),this.split?this.renderSplit(f,k.hoverPoints):(n.attr({text:f&&f.join?f.join(""):f}),n.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+t(a.colorIndex,g.colorIndex)),n.attr({stroke:m.borderColor||a.color||g.color||"#666666"}),this.updatePosition({plotX:d,plotY:c,negative:a.negative,ttBelow:a.ttBelow,h:b[2]||0})),this.isHidden=!1)},renderSplit:function(d,
e){var k=this,n=[],m=this.chart,c=m.renderer,b=!0,f=this.options,u,g=this.getLabel();F(d.slice(0,e.length+1),function(a,d){d=e[d-1]||{isHeader:!0,plotX:e[0].plotX};var p=d.series||k,l=p.tt,B=d.series||{},z="highcharts-color-"+t(d.colorIndex,B.colorIndex,"none");l||(p.tt=l=c.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+z).attr({padding:f.padding,r:f.borderRadius,fill:f.backgroundColor,stroke:d.color||B.color||"#333333","stroke-width":f.borderWidth}).add(g));l.isActive=!0;l.attr({text:a});
l.css(f.style);a=l.getBBox();B=a.width+l.strokeWidth();d.isHeader?(u=a.height,B=Math.max(0,Math.min(d.plotX+m.plotLeft-B/2,m.chartWidth-B))):B=d.plotX+m.plotLeft-t(f.distance,16)-B;0>B&&(b=!1);a=(d.series&&d.series.yAxis&&d.series.yAxis.pos)+(d.plotY||0);a-=m.plotTop;n.push({target:d.isHeader?m.plotHeight+u:a,rank:d.isHeader?1:0,size:p.tt.getBBox().height+1,point:d,x:B,tt:l})});this.cleanSplit();a.distribute(n,m.plotHeight+u);F(n,function(a){var c=a.point,g=c.series;a.tt.attr({visibility:void 0===
a.pos?"hidden":"inherit",x:b||c.isHeader?a.x:c.plotX+m.plotLeft+t(f.distance,16),y:a.pos+m.plotTop,anchorX:c.isHeader?c.plotX+m.plotLeft:c.plotX+g.xAxis.pos,anchorY:c.isHeader?a.pos+m.plotTop-15:c.plotY+g.yAxis.pos})})},updatePosition:function(a){var d=this.chart,e=this.getLabel(),e=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+d.plotLeft,a.plotY+d.plotTop)},getDateFormat:function(a,e,f,n){var m=y("%m-%d %H:%M:%S.%L",
e),c,b,k={millisecond:15,second:12,minute:9,hour:6,day:3},u="millisecond";for(b in d){if(a===d.week&&+y("%w",e)===f&&"00:00:00.000"===m.substr(6)){b="week";break}if(d[b]>a){b=u;break}if(k[b]&&m.substr(k[b])!=="01-01 00:00:00.000".substr(k[b]))break;"week"!==b&&(u=b)}b&&(c=n[b]);return c},getXDateFormat:function(a,d,e){d=d.dateTimeLabelFormats;var n=e&&e.closestPointRange;return(n?this.getDateFormat(n,a.x,e.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){var e=d?"footer":
"header";d=a.series;var n=d.tooltipOptions,m=n.xDateFormat,c=d.xAxis,b=c&&"datetime"===c.options.type&&f(a.key),e=n[e+"Format"];b&&!m&&(m=this.getXDateFormat(a,n,c));b&&m&&(e=e.replace("{point.key}","{point.key:"+m+"}"));return D(e,{point:a,series:d})},bodyFormatter:function(a){return k(a,function(a){var d=a.series.tooltipOptions;return(d.pointFormatter||a.point.tooltipFormatter).call(a.point,d.pointFormat)})}}})(I);(function(a){var y=a.addEvent,F=a.attr,A=a.charts,D=a.color,f=a.css,k=a.defined,r=
a.doc,t=a.each,e=a.extend,p=a.fireEvent,d=a.offset,q=a.pick,x=a.removeEvent,v=a.splat,n=a.Tooltip,m=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};n&&b.tooltip.enabled&&(a.tooltip=new n(a,b.tooltip),this.followTouchMove=q(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,m=c.zoomType||
"",b=b.inverted;/touch/.test(a.type)&&(m=q(c.pinchType,m));this.zoomX=a=/x/.test(m);this.zoomY=m=/y/.test(m);this.zoomHor=a&&!b||m&&b;this.zoomVert=m&&!b||a&&b;this.hasZoom=a||m},normalize:function(a,b){var c,n;a=a||m.event;a.target||(a.target=a.srcElement);n=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=d(this.chart.container));void 0===n.pageX?(c=Math.max(a.x,a.clientX-b.left),b=a.y):(c=n.pageX-b.left,b=n.pageY-b.top);return e(a,{chartX:Math.round(c),
chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};t(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},runPointActions:function(c){var b=this.chart,m=b.series,d=b.tooltip,g=d?d.shared:!1,n=!0,e=b.hoverPoint,f=b.hoverSeries,l,k,p,v=[],J;if(!g&&!f)for(l=0;l<m.length;l++)if(m[l].directTouch||!m[l].options.stickyTracking)m=[];f&&(g?f.noSharedTooltip:f.directTouch)&&e?v=[e]:(g||!f||f.options.stickyTracking||
(m=[f]),t(m,function(a){k=a.noSharedTooltip&&g;p=!g&&a.directTouch;a.visible&&!k&&!p&&q(a.options.enableMouseTracking,!0)&&(J=a.searchPoint(c,!k&&1===a.kdDimensions))&&J.series&&v.push(J)}),v.sort(function(a,b){var c=a.distX-b.distX,l=a.dist-b.dist,h=(b.series.group&&b.series.group.zIndex)-(a.series.group&&a.series.group.zIndex);return 0!==c&&g?c:0!==l?l:0!==h?h:a.series.index>b.series.index?-1:1}));if(g)for(l=v.length;l--;)(v[l].x!==v[0].x||v[l].series.noSharedTooltip)&&v.splice(l,1);if(v[0]&&(v[0]!==
this.prevKDPoint||d&&d.isHidden)){if(g&&!v[0].series.noSharedTooltip){for(l=0;l<v.length;l++)v[l].onMouseOver(c,v[l]!==(f&&f.directTouch&&e||v[0]));v.length&&d&&d.refresh(v.sort(function(a,b){return a.series.index-b.series.index}),c)}else if(d&&d.refresh(v[0],c),!f||!f.directTouch)v[0].onMouseOver(c);this.prevKDPoint=v[0];n=!1}n&&(m=f&&f.tooltipOptions.followPointer,d&&m&&!d.isHidden&&(m=d.getAnchor([{}],c),d.updatePosition({plotX:m[0],plotY:m[1]})));this.unDocMouseMove||(this.unDocMouseMove=y(r,
"mousemove",function(b){if(A[a.hoverChartIndex])A[a.hoverChartIndex].pointer.onDocumentMouseMove(b)}));t(g?v:[q(e,v[0])],function(a){t(b.axes,function(b){(!a||a.series&&a.series[b.coll]===b)&&b.drawCrosshair(c,a)})})},reset:function(a,b){var c=this.chart,m=c.hoverSeries,g=c.hoverPoint,d=c.hoverPoints,n=c.tooltip,e=n&&n.shared?d:g;a&&e&&t(v(e),function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)n&&e&&(n.refresh(e),g&&(g.setState(g.state,!0),t(c.axes,function(a){a.crosshair&&a.drawCrosshair(null,
g)})));else{if(g)g.onMouseOut();d&&t(d,function(a){a.setState()});if(m)m.onMouseOut();n&&n.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());t(c.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=c.hoverPoints=c.hoverPoint=null}},scaleGroups:function(a,b){var c=this.chart,m;t(c.series,function(g){m=a||g.getPlotBox();g.xAxis&&g.xAxis.zoomEnabled&&g.group&&(g.group.attr(m),g.markerGroup&&(g.markerGroup.attr(m),g.markerGroup.clip(b?c.clipRect:null)),g.dataLabelsGroup&&
g.dataLabelsGroup.attr(m))});c.clipRect.attr(b||c.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,m=a.chartX,g=a.chartY,d=this.zoomHor,n=this.zoomVert,e=b.plotLeft,l=b.plotTop,f=b.plotWidth,k=b.plotHeight,p,q=this.selectionMarker,h=this.mouseDownX,v=this.mouseDownY,r=c.panKey&&a[c.panKey+"Key"];q&&q.touch||(m<e?m=e:m>e+f&&(m=e+f),g<
l?g=l:g>l+k&&(g=l+k),this.hasDragged=Math.sqrt(Math.pow(h-m,2)+Math.pow(v-g,2)),10<this.hasDragged&&(p=b.isInsidePlot(h-e,v-l),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&p&&!r&&!q&&(this.selectionMarker=q=b.renderer.rect(e,l,d?1:f,n?1:k,0).attr({fill:c.selectionMarkerFill||D("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),q&&d&&(m-=h,q.attr({width:Math.abs(m),x:(0<m?0:m)+h})),q&&n&&(m=g-v,q.attr({height:Math.abs(m),y:(0<m?0:m)+v})),p&&!q&&c.panning&&b.pan(a,
c.panning)))},drop:function(a){var b=this,c=this.chart,m=this.hasPinched;if(this.selectionMarker){var g={originalEvent:a,xAxis:[],yAxis:[]},d=this.selectionMarker,n=d.attr?d.attr("x"):d.x,q=d.attr?d.attr("y"):d.y,l=d.attr?d.attr("width"):d.width,B=d.attr?d.attr("height"):d.height,v;if(this.hasDragged||m)t(c.axes,function(c){if(c.zoomEnabled&&k(c.min)&&(m||b[{xAxis:"zoomX",yAxis:"zoomY"}[c.coll]])){var d=c.horiz,h="touchend"===a.type?c.minPixelPadding:0,e=c.toValue((d?n:q)+h),d=c.toValue((d?n+l:q+
B)-h);g[c.coll].push({axis:c,min:Math.min(e,d),max:Math.max(e,d)});v=!0}}),v&&p(c,"selection",g,function(a){c.zoom(e(a,m?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();m&&this.scaleGroups()}c&&(f(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(c){A[a.hoverChartIndex]&&
A[a.hoverChartIndex].pointer.drop(c)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(c){var b=A[a.hoverChartIndex];b&&(c.relatedTarget||c.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=null)},onContainerMouseMove:function(c){var b=this.chart;k(a.hoverChartIndex)&&A[a.hoverChartIndex]&&A[a.hoverChartIndex].mouseIsDown||
(a.hoverChartIndex=b.index);c=this.normalize(c);c.returnValue=!1;"mousedown"===b.mouseIsDown&&this.drag(c);!this.inClass(c.target,"highcharts-tracker")&&!b.isInsidePlot(c.chartX-b.plotLeft,c.chartY-b.plotTop)||b.openMenu||this.runPointActions(c)},inClass:function(a,b){for(var c;a;){if(c=F(a,"class")){if(-1!==c.indexOf(b))return!0;if(-1!==c.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(!(!b||!a||
b.options.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,m=b.plotLeft,g=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(p(c.series,"click",e(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(e(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-m,a.chartY-g)&&p(b,"click",a)))},setDOMEvents:function(){var c=
this,b=c.chart.container;b.onmousedown=function(a){c.onContainerMouseDown(a)};b.onmousemove=function(a){c.onContainerMouseMove(a)};b.onclick=function(a){c.onContainerClick(a)};y(b,"mouseleave",c.onContainerMouseLeave);1===a.chartCount&&y(r,"mouseup",c.onDocumentMouseUp);a.hasTouch&&(b.ontouchstart=function(a){c.onContainerTouchStart(a)},b.ontouchmove=function(a){c.onContainerTouchMove(a)},1===a.chartCount&&y(r,"touchend",c.onDocumentTouchEnd))},destroy:function(){var c;x(this.chart.container,"mouseleave",
this.onContainerMouseLeave);a.chartCount||(x(r,"mouseup",this.onDocumentMouseUp),x(r,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(c in this)this[c]=null}}})(I);(function(a){var y=a.charts,F=a.each,A=a.extend,D=a.map,f=a.noop,k=a.pick;A(a.Pointer.prototype,{pinchTranslate:function(a,f,e,k,d,q){this.zoomHor&&this.pinchTranslateDirection(!0,a,f,e,k,d,q);this.zoomVert&&this.pinchTranslateDirection(!1,a,f,e,k,d,q)},pinchTranslateDirection:function(a,f,e,k,d,q,x,v){var n=
this.chart,m=a?"x":"y",c=a?"X":"Y",b="chart"+c,p=a?"width":"height",u=n["plot"+(a?"Left":"Top")],g,z,G=v||1,H=n.inverted,l=n.bounds[a?"h":"v"],B=1===f.length,K=f[0][b],r=e[0][b],J=!B&&f[1][b],h=!B&&e[1][b],t;e=function(){!B&&20<Math.abs(K-J)&&(G=v||Math.abs(r-h)/Math.abs(K-J));z=(u-r)/G+K;g=n["plot"+(a?"Width":"Height")]/G};e();f=z;f<l.min?(f=l.min,t=!0):f+g>l.max&&(f=l.max-g,t=!0);t?(r-=.8*(r-x[m][0]),B||(h-=.8*(h-x[m][1])),e()):x[m]=[r,h];H||(q[m]=z-u,q[p]=g);q=H?1/G:G;d[p]=g;d[m]=f;k[H?a?"scaleY":
"scaleX":"scale"+c]=G;k["translate"+c]=q*u+(r-q*K)},pinch:function(a){var r=this,e=r.chart,p=r.pinchDown,d=a.touches,q=d.length,x=r.lastValidTouch,v=r.hasZoom,n=r.selectionMarker,m={},c=1===q&&(r.inClass(a.target,"highcharts-tracker")&&e.runTrackerClick||r.runChartClick),b={};1<q&&(r.initiated=!0);v&&r.initiated&&!c&&a.preventDefault();D(d,function(a){return r.normalize(a)});"touchstart"===a.type?(F(d,function(a,b){p[b]={chartX:a.chartX,chartY:a.chartY}}),x.x=[p[0].chartX,p[1]&&p[1].chartX],x.y=[p[0].chartY,
p[1]&&p[1].chartY],F(e.axes,function(a){if(a.zoomEnabled){var b=e.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,m=a.toPixels(k(a.options.min,a.dataMin)),d=a.toPixels(k(a.options.max,a.dataMax)),n=Math.max(m,d);b.min=Math.min(a.pos,Math.min(m,d)-c);b.max=Math.max(a.pos+a.len,n+c)}}),r.res=!0):r.followTouchMove&&1===q?this.runPointActions(r.normalize(a)):p.length&&(n||(r.selectionMarker=n=A({destroy:f,touch:!0},e.plotBox)),r.pinchTranslate(p,d,m,n,b,x),r.hasPinched=v,r.scaleGroups(m,b),r.res&&(r.res=
!1,this.reset(!1,0)))},touch:function(f,t){var e=this.chart,p,d;if(e.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=e.index;1===f.touches.length?(f=this.normalize(f),(d=e.isInsidePlot(f.chartX-e.plotLeft,f.chartY-e.plotTop))&&!e.openMenu?(t&&this.runPointActions(f),"touchmove"===f.type&&(t=this.pinchDown,p=t[0]?4<=Math.sqrt(Math.pow(t[0].chartX-f.chartX,2)+Math.pow(t[0].chartY-f.chartY,2)):!1),k(p,!0)&&this.pinch(f)):t&&this.reset()):2===f.touches.length&&
this.pinch(f)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(f){y[a.hoverChartIndex]&&y[a.hoverChartIndex].pointer.drop(f)}})})(I);(function(a){var y=a.addEvent,F=a.charts,A=a.css,D=a.doc,f=a.extend,k=a.noop,r=a.Pointer,t=a.removeEvent,e=a.win,p=a.wrap;if(e.PointerEvent||e.MSPointerEvent){var d={},q=!!e.PointerEvent,x=function(){var a,m=[];m.item=function(a){return this[a]};for(a in d)d.hasOwnProperty(a)&&
m.push({pageX:d[a].pageX,pageY:d[a].pageY,target:d[a].target});return m},v=function(d,m,c,b){"touch"!==d.pointerType&&d.pointerType!==d.MSPOINTER_TYPE_TOUCH||!F[a.hoverChartIndex]||(b(d),b=F[a.hoverChartIndex].pointer,b[m]({type:c,target:d.currentTarget,preventDefault:k,touches:x()}))};f(r.prototype,{onContainerPointerDown:function(a){v(a,"onContainerTouchStart","touchstart",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){v(a,"onContainerTouchMove",
"touchmove",function(a){d[a.pointerId]={pageX:a.pageX,pageY:a.pageY};d[a.pointerId].target||(d[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){v(a,"onDocumentTouchEnd","touchend",function(a){delete d[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,q?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,q?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(D,q?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});p(r.prototype,
"init",function(a,m,c){a.call(this,m,c);this.hasZoom&&A(m.container,{"-ms-touch-action":"none","touch-action":"none"})});p(r.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(y)});p(r.prototype,"destroy",function(a){this.batchMSEvents(t);a.call(this)})}})(I);(function(a){var y,F=a.addEvent,A=a.css,D=a.discardElement,f=a.defined,k=a.each,r=a.extend,t=a.isFirefox,e=a.marginNames,p=a.merge,d=a.pick,q=a.setAnimation,x=a.stableSort,v=a.win,n=a.wrap;
y=a.Legend=function(a,c){this.init(a,c)};y.prototype={init:function(a,c){this.chart=a;this.setOptions(c);c.enabled&&(this.render(),F(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var c=d(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=p(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=c;this.initialItemY=c-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=d(a.symbolWidth,
16);this.pages=[]},update:function(a,c){var b=this.chart;this.setOptions(p(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;d(c,!0)&&b.redraw()},colorizeItem:function(a,c){a.legendGroup[c?"removeClass":"addClass"]("highcharts-legend-item-hidden");var b=this.options,m=a.legendItem,d=a.legendLine,g=a.legendSymbol,n=this.itemHiddenStyle.color,b=c?b.itemStyle.color:n,e=c?a.color||n:n,f=a.options&&a.options.marker,l={fill:e},k;m&&m.css({fill:b,color:b});d&&d.attr({stroke:e});if(g){if(f&&
g.isMarker&&(l=a.pointAttribs(),!c))for(k in l)l[k]=n;g.attr(l)}},positionItem:function(a){var c=this.options,b=c.symbolPadding,c=!c.rtl,m=a._legendItemPos,d=m[0],m=m[1],g=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(c?d:this.legendWidth-d-2*b-4,m);g&&(g.x=d,g.y=m)},destroyItem:function(a){var c=a.checkbox;k(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});c&&D(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}
k(this.getAllItems(),function(c){k(["legendItem","legendGroup"],a,c)});k(["box","title","group"],a,this);this.display=null},positionCheckboxes:function(a){var c=this.group&&this.group.alignAttr,b,m=this.clipHeight||this.legendHeight,d=this.titleHeight;c&&(b=c.translateY,k(this.allItems,function(g){var n=g.checkbox,e;n&&(e=b+d+n.y+(a||0)+3,A(n,{left:c.translateX+g.checkboxOffset+n.x-20+"px",top:e+"px",display:e>b-6&&e<b+m-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,c=this.options.title,
b=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(c.style).add(this.group)),a=this.title.getBBox(),b=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:b}));this.titleHeight=b},setText:function(m){var c=this.options;m.legendItem.attr({text:c.labelFormat?a.format(c.labelFormat,m):c.labelFormatter.call(m)})},renderItem:function(a){var c=this.chart,b=c.renderer,m=this.options,n="horizontal"===
m.layout,g=this.symbolWidth,e=m.symbolPadding,f=this.itemStyle,k=this.itemHiddenStyle,l=this.padding,B=n?d(m.itemDistance,20):0,q=!m.rtl,v=m.width,r=m.itemMarginBottom||0,h=this.itemMarginTop,C=this.initialItemX,t=a.legendItem,x=!a.series,D=!x&&a.series.drawLegendSymbol?a.series:a,y=D.options,y=this.createCheckboxForItem&&y&&y.showCheckbox,w=m.useHTML;t||(a.legendGroup=b.g("legend-item").addClass("highcharts-"+D.type+"-series highcharts-color-"+a.colorIndex+(a.options.className?" "+a.options.className:
"")+(x?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=t=b.text("",q?g+e:-e,this.baseline||0,w).css(p(a.visible?f:k)).attr({align:q?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(f=f.fontSize,this.fontMetrics=b.fontMetrics(f,t),this.baseline=this.fontMetrics.f+3+h,t.attr("y",this.baseline)),this.symbolHeight=m.symbolHeight||this.fontMetrics.f,D.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,t,w),y&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);this.setText(a);b=t.getBBox();g=a.checkboxOffset=m.itemWidth||a.legendItemWidth||g+e+b.width+B+(y?20:0);this.itemHeight=e=Math.round(a.legendItemHeight||b.height);n&&this.itemX-C+g>(v||c.chartWidth-2*l-C-m.x)&&(this.itemX=C,this.itemY+=h+this.lastLineHeight+r,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,g);this.lastItemY=h+this.itemY+r;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];n?this.itemX+=g:
(this.itemY+=h+e+r,this.lastLineHeight=e);this.offsetWidth=v||Math.max((n?this.itemX-C-B:g)+l,this.offsetWidth)},getAllItems:function(){var a=[];k(this.chart.series,function(c){var b=c&&c.options;c&&d(b.showInLegend,f(b.linkedTo)?!1:void 0,!0)&&(a=a.concat(c.legendItems||("point"===b.legendType?c.data:c)))});return a},adjustMargins:function(a,c){var b=this.chart,m=this.options,n=m.align.charAt(0)+m.verticalAlign.charAt(0)+m.layout.charAt(0);m.floating||k([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,
/(lbv|lm|ltv)/],function(g,k){g.test(n)&&!f(a[k])&&(b[e[k]]=Math.max(b[e[k]],b.legend[(k+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][k]*m[k%2?"x":"y"]+d(m.margin,12)+c[k]))})},render:function(){var a=this,c=a.chart,b=c.renderer,d=a.group,n,g,e,f,p=a.box,l=a.options,B=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;d||(a.group=d=b.g("legend").attr({zIndex:7}).add(),a.contentGroup=b.g().attr({zIndex:1}).add(d),a.scrollGroup=b.g().add(a.contentGroup));a.renderTitle();
n=a.getAllItems();x(n,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});l.reversed&&n.reverse();a.allItems=n;a.display=g=!!n.length;a.lastLineHeight=0;k(n,function(b){a.renderItem(b)});e=(l.width||a.offsetWidth)+B;f=a.lastItemY+a.lastLineHeight+a.titleHeight;f=a.handleOverflow(f);f+=B;p||(a.box=p=b.rect().addClass("highcharts-legend-box").attr({r:l.borderRadius}).add(d),p.isNew=!0);p.attr({stroke:l.borderColor,"stroke-width":l.borderWidth||0,fill:l.backgroundColor||
"none"}).shadow(l.shadow);0<e&&0<f&&(p[p.isNew?"attr":"animate"](p.crisp({x:0,y:0,width:e,height:f},p.strokeWidth())),p.isNew=!1);p[g?"show":"hide"]();a.legendWidth=e;a.legendHeight=f;k(n,function(b){a.positionItem(b)});g&&d.align(r({width:e,height:f},l),!0,"spacingBox");c.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var c=this,b=this.chart,m=b.renderer,n=this.options,g=n.y,b=b.spacingBox.height+("top"===n.verticalAlign?-g:g)-this.padding,g=n.maxHeight,e,f=this.clipRect,p=n.navigation,
l=d(p.animation,!0),B=p.arrowSize||12,q=this.nav,v=this.pages,r=this.padding,h,t=this.allItems,x=function(a){a?f.attr({height:a}):f&&(c.clipRect=f.destroy(),c.contentGroup.clip());c.contentGroup.div&&(c.contentGroup.div.style.clip=a?"rect("+r+"px,9999px,"+(r+a)+"px,0)":"auto")};"horizontal"!==n.layout||"middle"===n.verticalAlign||n.floating||(b/=2);g&&(b=Math.min(b,g));v.length=0;a>b&&!1!==p.enabled?(this.clipHeight=e=Math.max(b-20-this.titleHeight-r,0),this.currentPage=d(this.currentPage,1),this.fullHeight=
a,k(t,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var l=v.length;if(!l||c-v[l-1]>e&&(h||c)!==v[l-1])v.push(h||c),l++;b===t.length-1&&c+a-v[l-1]>e&&v.push(c);c!==h&&(h=c)}),f||(f=c.clipRect=m.clipRect(0,r,9999,0),c.contentGroup.clip(f)),x(e),q||(this.nav=q=m.g().attr({zIndex:1}).add(this.group),this.up=m.symbol("triangle",0,0,B,B).on("click",function(){c.scroll(-1,l)}).add(q),this.pager=m.text("",15,10).addClass("highcharts-legend-navigation").css(p.style).add(q),
this.down=m.symbol("triangle-down",0,0,B,B).on("click",function(){c.scroll(1,l)}).add(q)),c.scroll(0),a=b):q&&(x(),q.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,c){var b=this.pages,d=b.length;a=this.currentPage+a;var m=this.clipHeight,g=this.options.navigation,n=this.pager,e=this.padding;a>d&&(a=d);0<a&&(void 0!==c&&q(c,this.chart),this.nav.attr({translateX:e,translateY:m+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===
a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),n.attr({text:a+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===d?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?g.inactiveColor:g.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===d?g.inactiveColor:g.activeColor}).css({cursor:a===d?"default":"pointer"}),c=-b[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:c}),this.currentPage=
a,this.positionCheckboxes(c))}};a.LegendSymbolMixin={drawRectangle:function(a,c){var b=a.symbolHeight,m=a.options.squareSymbol;c.legendSymbol=this.chart.renderer.rect(m?(a.symbolWidth-b)/2:0,a.baseline-b+1,m?b:a.symbolWidth,b,d(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(c.legendGroup)},drawLineMarker:function(a){var c=this.options,b=c.marker,m=a.symbolWidth,n=a.symbolHeight,g=n/2,e=this.chart.renderer,f=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);
var k;k={"stroke-width":c.lineWidth||0};c.dashStyle&&(k.dashstyle=c.dashStyle);this.legendLine=e.path(["M",0,a,"L",m,a]).addClass("highcharts-graph").attr(k).add(f);b&&!1!==b.enabled&&(c=Math.min(d(b.radius,g),g),0===this.symbol.indexOf("url")&&(b=p(b,{width:n,height:n}),c=0),this.legendSymbol=b=e.symbol(this.symbol,m/2-c,a-c,2*c,2*c,b).addClass("highcharts-point").add(f),b.isMarker=!0)}};(/Trident\/7\.0/.test(v.navigator.userAgent)||t)&&n(y.prototype,"positionItem",function(a,c){var b=this,d=function(){c._legendItemPos&&
a.call(b,c)};d();setTimeout(d)})})(I);(function(a){var y=a.addEvent,F=a.animate,A=a.animObject,D=a.attr,f=a.doc,k=a.Axis,r=a.createElement,t=a.defaultOptions,e=a.discardElement,p=a.charts,d=a.css,q=a.defined,x=a.each,v=a.extend,n=a.find,m=a.fireEvent,c=a.getStyle,b=a.grep,E=a.isNumber,u=a.isObject,g=a.isString,z=a.Legend,G=a.marginNames,H=a.merge,l=a.Pointer,B=a.pick,K=a.pInt,L=a.removeEvent,J=a.seriesTypes,h=a.splat,C=a.svg,M=a.syncTimeout,N=a.win,R=a.Renderer,S=a.Chart=function(){this.getArgs.apply(this,
arguments)};a.chart=function(a,b,c){return new S(a,b,c)};S.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(g(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var l,h=b.series;b.series=null;l=H(t,b);l.series=b.series=h;this.userOptions=b;this.respRules=[];b=l.chart;h=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=l;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;
var g;this.index=p.length;p.push(this);a.chartCount++;if(h)for(g in h)y(this,g,h[g]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(b){var c=this.options.chart;(c=J[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var l=c?
b:a;a=c?a:b;return 0<=l&&l<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,l=this.series,h=this.pointer,g=this.legend,d=this.isDirtyLegend,n,e,f=this.hasCartesianSeries,k=this.isDirtyBox,p=l.length,B=p,q=this.renderer,w=q.isHidden(),u=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);w&&this.cloneRenderTo();for(this.layOutTitles();B--;)if(b=l[B],b.options.stacking&&(n=!0,b.isDirty)){e=!0;break}if(e)for(B=p;B--;)b=l[B],b.options.stacking&&(b.isDirty=
!0);x(l,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),d=!0);a.isDirtyData&&m(a,"updatedData")});d&&g.options.enabled&&(g.render(),this.isDirtyLegend=!1);n&&this.getStacks();f&&x(c,function(a){a.updateNames();a.setScale()});this.getMargins();f&&(x(c,function(a){a.isDirty&&(k=!0)}),x(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,u.push(function(){m(a,"afterSetExtremes",v(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(k||n)&&a.redraw()}));
k&&this.drawChartBox();m(this,"predraw");x(l,function(a){(k||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);q.draw();m(this,"redraw");m(this,"render");w&&this.cloneRenderTo(!0);x(u,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,l=this.series,h;c=n(this.axes,b)||n(this.series,b);for(h=0;!c&&h<l.length;h++)c=n(l[h].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=h(b.xAxis||{}),b=b.yAxis=h(b.yAxis||
{});x(c,function(a,b){a.index=b;a.isX=!0});x(b,function(a,b){a.index=b});c=c.concat(b);x(c,function(b){new k(a,b)})},getSelectedPoints:function(){var a=[];x(this.series,function(c){a=a.concat(b(c.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return b(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var l=this,h=l.options,g;g=h.title=H({style:{color:"#333333",fontSize:h.isStock?"16px":"18px"}},h.title,a);h=h.subtitle=H({style:{color:"#666666"}},
h.subtitle,b);x([["title",a,g],["subtitle",b,h]],function(a,b){var c=a[0],h=l[c],g=a[1];a=a[2];h&&g&&(l[c]=h=h.destroy());a&&a.text&&!h&&(l[c]=l.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),l[c].update=function(a){l.setTitle(!b&&a,b&&a)},l[c].css(a.style))});l.layOutTitles(c)},layOutTitles:function(a){var b=0,c,l=this.renderer,h=this.spacingBox;x(["title","subtitle"],function(a){var c=this[a],g=this.options[a],d;c&&(d=g.style.fontSize,
d=l.fontMetrics(d,c).b,c.css({width:(g.width||h.width+g.widthAdjust)+"px"}).align(v({y:b+d+("title"===a?-3:2)},g),!1,"spacingBox"),g.floating||g.verticalAlign||(b=Math.ceil(b+c.getBBox().height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&B(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,b=a.width,a=a.height,l=this.renderToClone||this.renderTo;q(b)||(this.containerWidth=c(l,"width"));q(a)||(this.containerHeight=
c(l,"height"));this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,a||this.containerHeight||400)},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);e(b);delete this.renderToClone}}else c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),d(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&
b.style.setProperty("display","block","important"),f.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,l=c.chart,h,d;b=this.renderTo;var m=a.uniqueKey(),n;b||(this.renderTo=b=l.renderTo);g(b)&&(this.renderTo=b=f.getElementById(b));b||a.error(13,!0);h=K(D(b,"data-highcharts-chart"));E(h)&&p[h]&&p[h].hasRendered&&p[h].destroy();D(b,"data-highcharts-chart",this.index);b.innerHTML="";
l.skipClone||b.offsetWidth||this.cloneRenderTo();this.getChartSize();h=this.chartWidth;d=this.chartHeight;n=v({position:"relative",overflow:"hidden",width:h+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},l.style);this.container=b=r("div",{id:m},n,this.renderToClone||b);this._cursor=b.style.cursor;this.renderer=new (a[l.renderer]||R)(b,h,d,null,l.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(l.className);this.renderer.setStyle(l.style);
this.renderer.chartIndex=this.index},getMargins:function(a){var b=this.spacing,c=this.margin,l=this.titleOffset;this.resetMargins();l&&!q(c[0])&&(this.plotTop=Math.max(this.plotTop,l+this.options.title.margin+b[0]));this.legend.display&&this.legend.adjustMargins(c,b);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=
[0,0,0,0],c=a.margin;a.hasCartesianSeries&&x(a.axes,function(a){a.visible&&a.getOffset()});x(G,function(l,h){q(c[h])||(a[l]+=b[h])});a.setChartSize()},reflow:function(a){var b=this,l=b.options.chart,h=b.renderTo,g=q(l.width),d=l.width||c(h,"width"),l=l.height||c(h,"height"),h=a?a.target:N;if(!g&&!b.isPrinting&&d&&l&&(h===N||h===f)){if(d!==b.containerWidth||l!==b.containerHeight)clearTimeout(b.reflowTimeout),b.reflowTimeout=M(function(){b.container&&b.setSize(void 0,void 0,!1)},a?100:0);b.containerWidth=
d;b.containerHeight=l}},initReflow:function(){var a=this,b;b=y(N,"resize",function(b){a.reflow(b)});y(a,"destroy",b)},setSize:function(b,c,l){var h=this,g=h.renderer;h.isResizing+=1;a.setAnimation(l,h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();b=g.globalAnimation;(b?F:d)(h.container,{width:h.chartWidth+"px",height:h.chartHeight+"px"},b);h.setChartSize(!0);g.setSize(h.chartWidth,h.chartHeight,
l);x(h.axes,function(a){a.isDirty=!0;a.setScale()});h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.redraw(l);h.oldChartHeight=null;m(h,"resize");M(function(){h&&m(h,"endResize",null,function(){--h.isResizing})},A(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,l=this.chartWidth,h=this.chartHeight,g=this.options.chart,d=this.spacing,m=this.clipOffset,n,e,f,k;this.plotLeft=n=Math.round(this.plotLeft);this.plotTop=e=Math.round(this.plotTop);this.plotWidth=
f=Math.max(0,Math.round(l-n-this.marginRight));this.plotHeight=k=Math.max(0,Math.round(h-e-this.marginBottom));this.plotSizeX=b?k:f;this.plotSizeY=b?f:k;this.plotBorderWidth=g.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:d[3],y:d[0],width:l-d[3]-d[1],height:h-d[0]-d[2]};this.plotBox=c.plotBox={x:n,y:e,width:f,height:k};l=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(l,m[3])/2);c=Math.ceil(Math.max(l,m[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(l,m[1])/
2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(l,m[2])/2-c))};a||x(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;x(["margin","spacing"],function(c){var l=b[c],h=u(l)?l:[l,l,l,l];x(["Top","Right","Bottom","Left"],function(l,g){a[c][g]=B(b[c+l],h[g])})});x(G,function(b,c){a[b]=B(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=
this.chartWidth,l=this.chartHeight,h=this.chartBackground,g=this.plotBackground,d=this.plotBorder,m,n=this.plotBGImage,e=a.backgroundColor,f=a.plotBackgroundColor,k=a.plotBackgroundImage,p,B=this.plotLeft,q=this.plotTop,u=this.plotWidth,v=this.plotHeight,z=this.plotBox,r=this.clipRect,K=this.clipBox,J="animate";h||(this.chartBackground=h=b.rect().addClass("highcharts-background").add(),J="attr");m=a.borderWidth||0;p=m+(a.shadow?8:0);e={fill:e||"none"};if(m||h["stroke-width"])e.stroke=a.borderColor,
e["stroke-width"]=m;h.attr(e).shadow(a.shadow);h[J]({x:p/2,y:p/2,width:c-p-m%2,height:l-p-m%2,r:a.borderRadius});J="animate";g||(J="attr",this.plotBackground=g=b.rect().addClass("highcharts-plot-background").add());g[J](z);g.attr({fill:f||"none"}).shadow(a.plotShadow);k&&(n?n.animate(z):this.plotBGImage=b.image(k,B,q,u,v).add());r?r.animate({width:K.width,height:K.height}):this.clipRect=b.clipRect(K);J="animate";d||(J="attr",this.plotBorder=d=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
d.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});d[J](d.crisp({x:B,y:q,width:u,height:v},-d.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,l=a.options.series,h,g;x(["inverted","angular","polar"],function(d){c=J[b.type||b.defaultSeriesType];g=b[d]||c&&c.prototype[d];for(h=l&&l.length;!g&&h--;)(c=J[l[h].type])&&c.prototype[d]&&(g=!0);a[d]=g})},linkSeries:function(){var a=this,b=a.series;x(b,function(a){a.linkedSeries.length=
0});x(b,function(b){var c=b.options.linkedTo;g(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=B(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){x(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&x(b.items,function(c){var l=v(b.style,c.style),h=K(l.left)+a.plotLeft,g=K(l.top)+a.plotTop+12;delete l.left;delete l.top;a.renderer.text(c.html,
h,g).attr({zIndex:2}).css(l).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,l,h,g;this.setTitle();this.legend=new z(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;l=this.plotHeight-=21;x(a,function(a){a.setScale()});this.getAxisMargins();h=1.1<c/this.plotWidth;g=1.05<l/this.plotHeight;if(h||g)x(a,function(a){(a.horiz&&h||!a.horiz&&g)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&
x(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=H(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(N.location.href=a.href)}).attr({align:a.position.align,
zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,l=b.series,h=b.container,g,d=h&&h.parentNode;m(b,"destroy");p[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");L(b);for(g=c.length;g--;)c[g]=c[g].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(g=l.length;g--;)l[g]=l[g].destroy();x("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});h&&(h.innerHTML="",L(h),d&&e(h));for(g in b)delete b[g]},isReadyToRender:function(){var a=this;return C||N!=N.top||"complete"===f.readyState?!0:(f.attachEvent("onreadystatechange",function(){f.detachEvent("onreadystatechange",a.firstRender);"complete"===f.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();m(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();x(b.series||[],function(b){a.initSeries(b)});a.linkSeries();m(a,"beforeRender");l&&(a.pointer=new l(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){x([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);m(this,"load");m(this,"render");q(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}}})(I);(function(a){var y,F=a.each,A=a.extend,D=a.erase,f=a.fireEvent,
k=a.format,r=a.isArray,t=a.isNumber,e=a.pick,p=a.removeEvent;y=a.Point=function(){};y.prototype={init:function(a,f,k){this.series=a;this.color=a.color;this.applyOptions(f,k);a.options.colorByPoint?(f=a.options.colors||a.chart.options.colors,this.color=this.color||f[a.colorCounter],f=f.length,k=a.colorCounter,a.colorCounter++,a.colorCounter===f&&(a.colorCounter=0)):k=a.colorIndex;this.colorIndex=e(this.colorIndex,k);a.chart.pointCount++;return this},applyOptions:function(a,f){var d=this.series,k=d.options.pointValKey||
d.pointValKey;a=y.prototype.optionsToObject.call(this,a);A(this,a);this.options=this.options?A(this.options,a):a;a.group&&delete this.group;k&&(this.y=this[k]);this.isNull=e(this.isValid&&!this.isValid(),null===this.x||!t(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===f&&d.xAxis&&d.xAxis.hasNames&&(this.x=d.xAxis.nameToX(this));void 0===this.x&&d&&(this.x=void 0===f?d.autoIncrement(this):f);return this},optionsToObject:function(a){var d={},e=this.series,f=e.options.keys,
n=f||e.pointArrayMap||["y"],m=n.length,c=0,b=0;if(t(a)||null===a)d[n[0]]=a;else if(r(a))for(!f&&a.length>m&&(e=typeof a[0],"string"===e?d.name=a[0]:"number"===e&&(d.x=a[0]),c++);b<m;)f&&void 0===a[c]||(d[n[b]]=a[c]),c++,b++;else"object"===typeof a&&(d=a,a.dataLabels&&(e._hasPointLabels=!0),a.marker&&(e._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":
"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||"y",f=0,k;for(k=e[f];this[a]>=k.value;)k=e[++f];k&&k.color&&!this.options.color&&(this.color=k.color);return k},destroy:function(){var a=this.series.chart,e=a.hoverPoints,f;a.pointCount--;e&&(this.setState(),D(e,this),e.length||
(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)p(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(f in this)this[f]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],e,f=6;f--;)e=a[f],this[e]&&(this[e]=this[e].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,
point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,f=d.tooltipOptions,p=e(f.valueDecimals,""),n=f.valuePrefix||"",m=f.valueSuffix||"";F(d.pointArrayMap||["y"],function(c){c="{point."+c;if(n||m)a=a.replace(c+"}",n+c+"}"+m);a=a.replace(c+"}",c+":,."+p+"f}")});return k(a,{point:this,series:this.series})},firePointEvent:function(a,e,k){var d=this,n=this.series.options;(n.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&
this.importEvents();"click"===a&&n.allowPointSelect&&(k=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});f(this,a,e,k)},visible:!0}})(I);(function(a){var y=a.addEvent,F=a.animObject,A=a.arrayMax,D=a.arrayMin,f=a.correctFloat,k=a.Date,r=a.defaultOptions,t=a.defaultPlotOptions,e=a.defined,p=a.each,d=a.erase,q=a.extend,x=a.fireEvent,v=a.grep,n=a.isArray,m=a.isNumber,c=a.isString,b=a.merge,E=a.pick,u=a.removeEvent,g=a.splat,z=a.SVGElement,G=a.syncTimeout,H=a.win;a.Series=a.seriesType("line",
null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",
x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){var c=this,l,g,h=a.series,d;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();q(c,{name:b.name,state:"",visible:!1!==
b.visible,selected:!0===b.selected});g=b.events;for(l in g)y(c,l,g[l]);if(g&&g.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();p(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);h.length&&(d=h[h.length-1]);c._i=E(d&&d._i,-1)+1;a.orderSeries(this.insert(h))},insert:function(a){var b=this.options.index,c;if(m(b)){for(c=a.length;c--;)if(b>=E(a[c].options.index,a[c]._i)){a.splice(c+
1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return E(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,g=b.chart,d;p(b.axisTypes||[],function(l){p(g[l],function(a){d=a.options;if(c[l]===d.index||void 0!==c[l]&&c[l]===d.id||void 0===c[l]&&0===d.index)b.insert(a.series),b[l]=a,a.isDirty=!0});b[l]||b.optionalAxis===l||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,l=arguments,g=m(b)?function(l){var h="y"===l&&c.toYData?c.toYData(a):a[l];c[l+"Data"][b]=
h}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(l,2))};p(c.parallelArrays,g)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,g=a.pointIntervalUnit,b=E(b,a.pointStart,0);this.pointInterval=c=E(this.pointInterval,a.pointInterval,1);g&&(a=new k(b),"day"===g?a=+a[k.hcSetDate](a[k.hcGetDate]()+c):"month"===g?a=+a[k.hcSetMonth](a[k.hcGetMonth]()+c):"year"===g&&(a=+a[k.hcSetFullYear](a[k.hcGetFullYear]()+c)),c=a-b);this.xIncrement=b+c;return b},setOptions:function(a){var c=
this.chart,l=c.options.plotOptions,c=c.userOptions||{},g=c.plotOptions||{},d=l[this.type];this.userOptions=a;l=b(d,l.series,a);this.tooltipOptions=b(r.tooltip,r.plotOptions[this.type].tooltip,c.tooltip,g.series&&g.series.tooltip,g[this.type]&&g[this.type].tooltip,a.tooltip);null===d.marker&&delete l.marker;this.zoneAxis=l.zoneAxis;a=this.zones=(l.zones||[]).slice();!l.negativeColor&&!l.negativeFillColor||l.zones||a.push({value:l[this.zoneAxis+"Threshold"]||l.threshold||0,className:"highcharts-negative",
color:l.negativeColor,fillColor:l.negativeFillColor});a.length&&e(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return l},getCyclic:function(a,b,c){var l,g=this.chart,h=this.userOptions,d=a+"Index",m=a+"Counter",n=c?c.length:E(g.options.chart[a+"Count"],g[a+"Count"]);b||(l=E(h[d],h["_"+d]),e(l)||(g.series.length||(g[m]=0),h["_"+d]=l=g[m]%n,g[m]+=1),c&&(b=c[l]));void 0!==l&&(this[d]=l);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",
this.options.color||t[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,g,d,e){var l=this,h=l.points,f=h&&h.length||0,k,u=l.options,B=l.chart,q=null,z=l.xAxis,v=u.turboThreshold,r=this.xData,H=this.yData,t=(k=l.pointArrayMap)&&k.length;b=b||[];k=b.length;g=E(g,!0);if(!1!==e&&k&&f===k&&!l.cropped&&!l.hasGroupedData&&l.visible)p(b,function(a,
b){h[b].update&&a!==u.data[b]&&h[b].update(a,!1,null,!1)});else{l.xIncrement=null;l.colorCounter=0;p(this.parallelArrays,function(a){l[a+"Data"].length=0});if(v&&k>v){for(d=0;null===q&&d<k;)q=b[d],d++;if(m(q))for(d=0;d<k;d++)r[d]=this.autoIncrement(),H[d]=b[d];else if(n(q))if(t)for(d=0;d<k;d++)q=b[d],r[d]=q[0],H[d]=q.slice(1,t+1);else for(d=0;d<k;d++)q=b[d],r[d]=q[0],H[d]=q[1];else a.error(12)}else for(d=0;d<k;d++)void 0!==b[d]&&(q={series:l},l.pointClass.prototype.applyOptions.apply(q,[b[d]]),l.updateParallelArrays(q,
d));c(H[0])&&a.error(14,!0);l.data=[];l.options.data=l.userOptions.data=b;for(d=f;d--;)h[d]&&h[d].destroy&&h[d].destroy();z&&(z.minRange=z.userMinRange);l.isDirty=B.isDirtyBox=!0;l.isDirtyData=!!h;d=!1}"point"===u.legendType&&(this.processData(),this.generatePoints());g&&B.redraw(d)},processData:function(b){var c=this.xData,l=this.yData,g=c.length,d;d=0;var h,m,e=this.xAxis,n,f=this.options;n=f.cropThreshold;var k=this.getExtremesFromAll||f.getExtremesFromAll,p=this.isCartesian,f=e&&e.val2lin,u=e&&
e.isLog,q,z;if(p&&!this.isDirty&&!e.isDirty&&!this.yAxis.isDirty&&!b)return!1;e&&(b=e.getExtremes(),q=b.min,z=b.max);if(p&&this.sorted&&!k&&(!n||g>n||this.forceCrop))if(c[g-1]<q||c[0]>z)c=[],l=[];else if(c[0]<q||c[g-1]>z)d=this.cropData(this.xData,this.yData,q,z),c=d.xData,l=d.yData,d=d.start,h=!0;for(n=c.length||1;--n;)g=u?f(c[n])-f(c[n-1]):c[n]-c[n-1],0<g&&(void 0===m||g<m)?m=g:0>g&&this.requireSorting&&a.error(15);this.cropped=h;this.cropStart=d;this.processedXData=c;this.processedYData=l;this.closestPointRange=
m},cropData:function(a,b,c,g){var l=a.length,h=0,d=l,m=E(this.cropShoulder,1),n;for(n=0;n<l;n++)if(a[n]>=c){h=Math.max(0,n-m);break}for(c=n;c<l;c++)if(a[c]>g){d=c+m;break}return{xData:a.slice(h,d),yData:b.slice(h,d),start:h,end:d}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,m=this.processedYData,h=this.pointClass,n=d.length,e=this.cropStart||0,f,k=this.hasGroupedData,p,u=[],q;b||k||(b=[],b.length=a.length,b=this.data=b);for(q=0;q<n;q++)f=e+q,k?(p=(new h).init(this,
[d[q]].concat(g(m[q]))),p.dataGroup=this.groupMap[q]):(p=b[f])||void 0===a[f]||(b[f]=p=(new h).init(this,a[f],d[q])),p.index=f,u[q]=p;if(b&&(n!==(c=b.length)||k))for(q=0;q<c;q++)q!==e||k||(q+=n),b[q]&&(b[q].destroyElements(),b[q].plotX=void 0);this.data=b;this.points=u},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,l,g=[],h=0;l=this.xAxis.getExtremes();var d=l.min,e=l.max,f,k,p,u;a=a||this.stackedYData||this.processedYData||[];l=a.length;for(u=0;u<l;u++)if(k=c[u],p=a[u],f=(m(p,!0)||
n(p))&&(!b.isLog||p.length||0<p),k=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[u+1]||k)>=d&&(c[u-1]||k)<=e,f&&k)if(f=p.length)for(;f--;)null!==p[f]&&(g[h++]=p[f]);else g[h++]=p;this.dataMin=D(g);this.dataMax=A(g)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,c=this.xAxis,g=c.categories,d=this.yAxis,h=this.points,n=h.length,k=!!this.modifyValue,p=a.pointPlacement,u="between"===p||m(p),q=a.threshold,
z=a.startFromThreshold?q:0,v,r,H,t,G=Number.MAX_VALUE;"between"===p&&(p=.5);m(p)&&(p*=E(a.pointRange||c.pointRange));for(a=0;a<n;a++){var x=h[a],D=x.x,y=x.y;r=x.low;var A=b&&d.stacks[(this.negStacks&&y<(z?0:q)?"-":"")+this.stackKey],F;d.isLog&&null!==y&&0>=y&&(x.isNull=!0);x.plotX=v=f(Math.min(Math.max(-1E5,c.translate(D,0,0,0,1,p,"flags"===this.type)),1E5));b&&this.visible&&!x.isNull&&A&&A[D]&&(t=this.getStackIndicator(t,D,this.index),F=A[D],y=F.points[t.key],r=y[0],y=y[1],r===z&&t.key===A[D].base&&
(r=E(q,d.min)),d.isLog&&0>=r&&(r=null),x.total=x.stackTotal=F.total,x.percentage=F.total&&x.y/F.total*100,x.stackY=y,F.setOffset(this.pointXOffset||0,this.barW||0));x.yBottom=e(r)?d.translate(r,0,1,0,1):null;k&&(y=this.modifyValue(y,x));x.plotY=r="number"===typeof y&&Infinity!==y?Math.min(Math.max(-1E5,d.translate(y,0,1,0,1)),1E5):void 0;x.isInside=void 0!==r&&0<=r&&r<=d.len&&0<=v&&v<=c.len;x.clientX=u?f(c.translate(D,0,0,0,1,p)):v;x.negative=x.y<(q||0);x.category=g&&void 0!==g[x.x]?g[x.x]:x.x;x.isNull||
(void 0!==H&&(G=Math.min(G,Math.abs(v-H))),H=v);x.zone=this.zones.length&&x.getZone()}this.closestPointRangePx=G},getValidPoints:function(a,b){var c=this.chart;return v(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,l=b.renderer,g=b.inverted,h=this.clipBox,d=h||b.clipBox,n=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,d.height,c.xAxis,c.yAxis].join(),m=b[n],e=b[n+"m"];m||(a&&(d.width=
0,b[n+"m"]=e=l.clipRect(-99,g?-b.plotLeft:-b.plotTop,99,g?b.chartWidth:b.chartHeight)),b[n]=m=l.clipRect(d),m.count={length:0});a&&!m.count[this.index]&&(m.count[this.index]=!0,m.count.length+=1);!1!==c.clip&&(this.group.clip(a||h?m:b.clipRect),this.markerGroup.clip(e),this.sharedClipKey=n);a||(m.count[this.index]&&(delete m.count[this.index],--m.count.length),0===m.count.length&&n&&b[n]&&(h||(b[n]=b[n].destroy()),b[n+"m"]&&(this.markerGroup.clip(),b[n+"m"]=b[n+"m"].destroy())))},animate:function(a){var b=
this.chart,c=F(this.options.animation),l;a?this.setClip(c):(l=this.sharedClipKey,(a=b[l])&&a.animate({width:b.plotSizeX},c),b[l+"m"]&&b[l+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();x(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,c,g,d,h,n=this.options.marker,e,f,k,p,u=this.markerGroup,q=E(n.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>2*n.radius);if(!1!==n.enabled||this._hasPointMarkers)for(g=0;g<a.length;g++)d=
a[g],c=d.plotY,h=d.graphic,e=d.marker||{},f=!!d.marker,k=q&&void 0===e.enabled||e.enabled,p=d.isInside,k&&m(c)&&null!==d.y?(c=E(e.symbol,this.symbol),d.hasImage=0===c.indexOf("url"),k=this.markerAttribs(d,d.selected&&"select"),h?h[p?"show":"hide"](!0).animate(k):p&&(0<k.width||d.hasImage)&&(d.graphic=h=b.renderer.symbol(c,k.x,k.y,k.width,k.height,f?e:n).add(u)),h&&h.attr(this.pointAttribs(d,d.selected&&"select")),h&&h.addClass(d.getClassName(),!0)):h&&(d.graphic=h.destroy())},markerAttribs:function(a,
b){var c=this.options.marker,l=a.marker||{},g=E(l.radius,c.radius);b&&(c=c.states[b],b=l.states&&l.states[b],g=E(b&&b.radius,c&&c.radius,g+(c&&c.radiusPlus||0)));a.hasImage&&(g=0);a={x:Math.floor(a.plotX)-g,y:a.plotY-g};g&&(a.width=a.height=2*g);return a},pointAttribs:function(a,b){var c=this.options.marker,l=a&&a.options,g=l&&l.marker||{},h=this.color,d=l&&l.color,n=a&&a.color,l=E(g.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;h=d||a||n||h;a=g.fillColor||c.fillColor||h;h=g.lineColor||c.lineColor||
h;b&&(c=c.states[b],b=g.states&&g.states[b]||{},l=E(b.lineWidth,c.lineWidth,l+E(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,h=b.lineColor||c.lineColor||h);return{stroke:h,"stroke-width":l,fill:a}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(H.navigator.userAgent),g,n=a.data||[],h,m,e;x(a,"destroy");u(a);p(a.axisTypes||[],function(b){(e=a[b])&&e.series&&(d(e.series,a),e.isDirty=e.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(g=n.length;g--;)(h=
n[g])&&h.destroy&&h.destroy();a.points=null;clearTimeout(a.animationTimeout);for(m in a)a[m]instanceof z&&!a[m].survive&&(g=c&&"group"===m?"hide":"destroy",a[m][g]());b.hoverSeries===a&&(b.hoverSeries=null);d(b.series,a);b.orderSeries();for(m in a)delete a[m]},getGraphPath:function(a,b,c){var g=this,l=g.options,h=l.step,d,n=[],m=[],f;a=a||g.points;(d=a.reversed)&&a.reverse();(h={right:1,center:2}[h]||h&&3)&&d&&(h=4-h);!l.connectNulls||b||c||(a=this.getValidPoints(a));p(a,function(d,k){var p=d.plotX,
u=d.plotY,q=a[k-1];(d.leftCliff||q&&q.rightCliff)&&!c&&(f=!0);d.isNull&&!e(b)&&0<k?f=!l.connectNulls:d.isNull&&!b?f=!0:(0===k||f?k=["M",d.plotX,d.plotY]:g.getPointSpline?k=g.getPointSpline(a,d,k):h?(k=1===h?["L",q.plotX,u]:2===h?["L",(q.plotX+p)/2,q.plotY,"L",(q.plotX+p)/2,u]:["L",p,q.plotY],k.push("L",p,u)):k=["L",p,u],m.push(d.x),h&&m.push(d.x),n.push.apply(n,k),f=!1)});n.xMap=m;return g.graphPath=n},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),
g=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];p(this.zones,function(c,h){g.push(["zone-graph-"+h,"highcharts-graph highcharts-zone-graph-"+h+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});p(g,function(g,h){var l=g[0],d=a[l];d?(d.endX=c.xMap,d.animate({d:c})):c.length&&(a[l]=a.chart.renderer.path(c).addClass(g[1]).attr({zIndex:1}).add(a.group),d={stroke:g[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},g[3]?d.dashstyle=g[3]:"square"!==b.linecap&&
(d["stroke-linecap"]=d["stroke-linejoin"]="round"),d=a[l].attr(d).shadow(2>h&&b.shadow));d&&(d.startX=c.xMap,d.isArea=c.isArea)})},applyZones:function(){var a=this,b=this.chart,c=b.renderer,g=this.zones,d,h,n=this.clips||[],m,e=this.graph,f=this.area,k=Math.max(b.chartWidth,b.chartHeight),u=this[(this.zoneAxis||"y")+"Axis"],q,z,v=b.inverted,r,H,t,G,x=!1;g.length&&(e||f)&&u&&void 0!==u.min&&(z=u.reversed,r=u.horiz,e&&e.hide(),f&&f.hide(),q=u.getExtremes(),p(g,function(g,l){d=z?r?b.plotWidth:0:r?0:
u.toPixels(q.min);d=Math.min(Math.max(E(h,d),0),k);h=Math.min(Math.max(Math.round(u.toPixels(E(g.value,q.max),!0)),0),k);x&&(d=h=u.toPixels(q.max));H=Math.abs(d-h);t=Math.min(d,h);G=Math.max(d,h);u.isXAxis?(m={x:v?G:t,y:0,width:H,height:k},r||(m.x=b.plotHeight-m.x)):(m={x:0,y:v?G:t,width:k,height:H},r&&(m.y=b.plotWidth-m.y));v&&c.isVML&&(m=u.isXAxis?{x:0,y:z?t:G,height:m.width,width:b.chartWidth}:{x:m.y-b.plotLeft-b.spacingBox.x,y:0,width:m.height,height:b.chartHeight});n[l]?n[l].animate(m):(n[l]=
c.clipRect(m),e&&a["zone-graph-"+l].clip(n[l]),f&&a["zone-area-"+l].clip(n[l]));x=g.value>q.max}),this.clips=n)},invertGroups:function(a){function b(){p(["group","markerGroup"],function(b){c[b]&&(c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,g;c.xAxis&&(g=y(c.chart,"resize",b),y(c,"destroy",g),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,g,d){var h=this[a],l=!h;l&&(this[a]=h=this.chart.renderer.g(b).attr({zIndex:g||.1}).add(d),h.addClass("highcharts-series-"+this.index+
" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||"")));h.attr({visibility:c})[l?"attr":"animate"](this.getPlotBox());return h},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,g=a.options,d=!!a.animate&&b.renderer.isSVG&&F(g.animation).duration,h=a.visible?"inherit":"hidden",n=
g.zIndex,m=a.hasRendered,e=b.seriesGroup,f=b.inverted;c=a.plotGroup("group","series",h,n,e);a.markerGroup=a.plotGroup("markerGroup","markers",h,n,e);d&&a.animate(!0);c.inverted=a.isCartesian?f:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(f);!1===g.clip||a.sharedClipKey||m||c.clip(b.clipRect);d&&a.animate();m||(a.animationTimeout=G(function(){a.afterAnimate()},
d));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,g=this.xAxis,d=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:E(g&&g.left,a.plotLeft),translateY:E(d&&d.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,g=this.yAxis,d=this.chart.inverted;return this.searchKDTree({clientX:d?
c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:d?g.len-a.chartX+g.pos:a.chartY-g.pos},b)},buildKDTree:function(){function a(c,g,h){var d,l;if(l=c&&c.length)return d=b.kdAxisArray[g%h],c.sort(function(a,b){return a[d]-b[d]}),l=Math.floor(l/2),{point:c[l],left:a(c.slice(0,l),g+1,h),right:a(c.slice(l+1),g+1,h)}}this.buildingKdTree=!0;var b=this,c=b.kdDimensions;delete b.kdTree;G(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,
b){function c(a,b,n,m){var f=b.point,k=g.kdAxisArray[n%m],p,u,q=f;u=e(a[d])&&e(f[d])?Math.pow(a[d]-f[d],2):null;p=e(a[h])&&e(f[h])?Math.pow(a[h]-f[h],2):null;p=(u||0)+(p||0);f.dist=e(p)?Math.sqrt(p):Number.MAX_VALUE;f.distX=e(u)?Math.sqrt(u):Number.MAX_VALUE;k=a[k]-f[k];p=0>k?"left":"right";u=0>k?"right":"left";b[p]&&(p=c(a,b[p],n+1,m),q=p[l]<q[l]?p:f);b[u]&&Math.sqrt(k*k)<q[l]&&(a=c(a,b[u],n+1,m),q=a[l]<q[l]?a:q);return q}var g=this,d=this.kdAxisArray[0],h=this.kdAxisArray[1],l=b?"distX":"dist";
this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(I);(function(a){var y=a.addEvent,F=a.animate,A=a.Axis,D=a.createElement,f=a.css,k=a.defined,r=a.each,t=a.erase,e=a.extend,p=a.fireEvent,d=a.inArray,q=a.isNumber,x=a.isObject,v=a.merge,n=a.pick,m=a.Point,c=a.Series,b=a.seriesTypes,E=a.setAnimation,u=a.splat;e(a.Chart.prototype,{addSeries:function(a,b,c){var g,d=this;a&&(b=n(b,!0),p(d,"addSeries",{options:a},function(){g=
d.initSeries(a);d.isDirtyLegend=!0;d.linkSeries();b&&d.redraw(c)}));return g},addAxis:function(a,b,c,d){var g=b?"xAxis":"yAxis",m=this.options;a=v(a,{index:this[g].length,isX:b});new A(this,a);m[g]=u(m[g]||{});m[g].push(a);n(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this,c=b.options,g=b.loadingDiv,d=c.loading,m=function(){g&&f(g,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};g||(b.loadingDiv=g=D("div",{className:"highcharts-loading highcharts-loading-hidden"},
null,b.container),b.loadingSpan=D("span",{className:"highcharts-loading-inner"},null,g),y(b,"redraw",m));g.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;f(g,e(d.style,{zIndex:10}));f(b.loadingSpan,d.labelStyle);b.loadingShown||(f(g,{opacity:0,display:""}),F(g,{opacity:d.style.opacity||.5},{duration:d.showDuration||0}));b.loadingShown=!0;m()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",F(b,{opacity:0},
{duration:a.loading.hideDuration||100,complete:function(){f(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),
update:function(a,b){var c,g={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},l=a.chart,m,e;if(l){v(!0,this.options.chart,l);"className"in l&&this.setClassName(l.className);if("inverted"in l||"polar"in l)this.propFromSeries(),m=!0;for(c in l)l.hasOwnProperty(c)&&(-1!==d("chart."+c,this.propsRequireUpdateSeries)&&(e=!0),-1!==d(c,this.propsRequireDirtyBox)&&(this.isDirtyBox=!0));"style"in l&&this.renderer.setStyle(l.style)}for(c in a){if(this[c]&&"function"===typeof this[c].update)this[c].update(a[c],
!1);else if("function"===typeof this[g[c]])this[g[c]](a[c]);"chart"!==c&&-1!==d(c,this.propsRequireUpdateSeries)&&(e=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&v(!0,this.options.plotOptions,a.plotOptions);r(["xAxis","yAxis","series"],function(b){a[b]&&r(u(a[b]),function(a,c){(c=k(a.id)&&this.get(a.id)||this[b][c])&&c.coll===b&&c.update(a,!1)},this)},this);m&&r(this.axes,function(a){a.update({},!1)});e&&r(this.series,function(a){a.update({},!1)});a.loading&&v(!0,this.options.loading,
a.loading);c=l&&l.width;l=l&&l.height;q(c)&&c!==this.chartWidth||q(l)&&l!==this.chartHeight?this.setSize(c,l):n(b,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});e(m.prototype,{update:function(a,b,c,d){function g(){m.applyOptions(a);null===m.y&&f&&(m.graphic=f.destroy());x(a,!0)&&(f&&f.element&&a&&a.marker&&a.marker.symbol&&(m.graphic=f.destroy()),a&&a.dataLabels&&m.dataLabel&&(m.dataLabel=m.dataLabel.destroy()));k=m.index;e.updateParallelArrays(m,k);p.data[k]=x(p.data[k],!0)?
m.options:a;e.isDirty=e.isDirtyData=!0;!e.fixedBox&&e.hasCartesianSeries&&(h.isDirtyBox=!0);"point"===p.legendType&&(h.isDirtyLegend=!0);b&&h.redraw(c)}var m=this,e=m.series,f=m.graphic,k,h=e.chart,p=e.options;b=n(b,!0);!1===d?g():m.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(d(this,this.series.data),a,b)}});e(c.prototype,{addPoint:function(a,b,c,d){var g=this.options,m=this.data,e=this.chart,f=this.xAxis,f=f&&f.hasNames&&f.names,k=g.data,h,p,u=this.xData,
q,v;b=n(b,!0);h={series:this};this.pointClass.prototype.applyOptions.apply(h,[a]);v=h.x;q=u.length;if(this.requireSorting&&v<u[q-1])for(p=!0;q&&u[q-1]>v;)q--;this.updateParallelArrays(h,"splice",q,0,0);this.updateParallelArrays(h,q);f&&h.name&&(f[v]=h.name);k.splice(q,0,a);p&&(this.data.splice(q,0,null),this.processData());"point"===g.legendType&&this.generatePoints();c&&(m[0]&&m[0].remove?m[0].remove(!1):(m.shift(),this.updateParallelArrays(h,"shift"),k.shift()));this.isDirtyData=this.isDirty=!0;
b&&e.redraw(d)},removePoint:function(a,b,c){var g=this,d=g.data,m=d[a],e=g.points,f=g.chart,k=function(){e&&e.length===d.length&&e.splice(a,1);d.splice(a,1);g.options.data.splice(a,1);g.updateParallelArrays(m||{series:g},"splice",a,1);m&&m.destroy();g.isDirty=!0;g.isDirtyData=!0;b&&f.redraw()};E(c,f);b=n(b,!0);m?m.firePointEvent("remove",null,k):k()},remove:function(a,b,c){function g(){d.destroy();m.isDirtyLegend=m.isDirtyBox=!0;m.linkSeries();n(a,!0)&&m.redraw(b)}var d=this,m=d.chart;!1!==c?p(d,
"remove",null,g):g()},update:function(a,c){var g=this,d=this.chart,l=this.userOptions,m=this.type,f=a.type||l.type||d.options.chart.type,k=b[m].prototype,p=["group","markerGroup","dataLabelsGroup"],h;if(f&&f!==m||void 0!==a.zIndex)p.length=0;r(p,function(a){p[a]=g[a];delete g[a]});a=v(l,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(h in k)this[h]=void 0;e(this,b[f||m].prototype);r(p,function(a){g[a]=p[a]});this.init(d,a);d.linkSeries();
n(c,!0)&&d.redraw(!1)}});e(A.prototype,{update:function(a,b){var c=this.chart;a=c.options[this.coll][this.options.index]=v(this.userOptions,a);this.destroy(!0);this.init(c,e(a,{events:void 0}));c.isDirtyBox=!0;n(b,!0)&&c.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,g=d.length;g--;)d[g]&&d[g].remove(!1);t(b.axes,this);t(b[c],this);b.options[c].splice(this.options.index,1);r(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;n(a,!0)&&b.redraw()},setTitle:function(a,
b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(I);(function(a){var y=a.animObject,F=a.color,A=a.each,D=a.extend,f=a.isNumber,k=a.merge,r=a.pick,t=a.Series,e=a.seriesType,p=a.svg;e("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},
softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){t.prototype.init.apply(this,arguments);var a=this,e=a.chart;e.hasRendered&&A(e.series,function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,e=a.options,f=a.xAxis,k=a.yAxis,n=f.reversed,m,c={},b=0;!1===e.grouping?b=1:A(a.chart.series,function(g){var d=g.options,
e=g.yAxis,l;g.type===a.type&&g.visible&&k.len===e.len&&k.pos===e.pos&&(d.stacking?(m=g.stackKey,void 0===c[m]&&(c[m]=b++),l=c[m]):!1!==d.grouping&&(l=b++),g.columnIndex=l)});var p=Math.min(Math.abs(f.transA)*(f.ordinalSlope||e.pointRange||f.closestPointRange||f.tickInterval||1),f.len),u=p*e.groupPadding,g=(p-2*u)/(b||1),e=Math.min(e.maxPointWidth||f.len,r(e.pointWidth,g*(1-2*e.pointPadding)));a.columnMetrics={width:e,offset:(g-e)/2+(u+((a.columnIndex||0)+(n?1:0))*g-p/2)*(n?-1:1)};return a.columnMetrics},
crispCol:function(a,e,f,k){var d=this.chart,m=this.borderWidth,c=-(m%2?.5:0),m=m%2?.5:1;d.inverted&&d.renderer.isVML&&(m+=1);f=Math.round(a+f)+c;a=Math.round(a)+c;k=Math.round(e+k)+m;c=.5>=Math.abs(e)&&.5<k;e=Math.round(e)+m;k-=e;c&&k&&(--e,k+=1);return{x:a,y:e,width:f-a,height:k}},translate:function(){var a=this,e=a.chart,f=a.options,k=a.dense=2>a.closestPointRange*a.xAxis.transA,k=a.borderWidth=r(f.borderWidth,k?0:1),n=a.yAxis,m=a.translatedThreshold=n.getThreshold(f.threshold),c=r(f.minPointLength,
5),b=a.getColumnMetrics(),p=b.width,u=a.barW=Math.max(p,1+2*k),g=a.pointXOffset=b.offset;e.inverted&&(m-=.5);f.pointPadding&&(u=Math.ceil(u));t.prototype.translate.apply(a);A(a.points,function(b){var d=r(b.yBottom,m),f=999+Math.abs(d),f=Math.min(Math.max(-f,b.plotY),n.len+f),l=b.plotX+g,k=u,q=Math.min(f,d),v,z=Math.max(f,d)-q;Math.abs(z)<c&&c&&(z=c,v=!n.reversed&&!b.negative||n.reversed&&b.negative,q=Math.abs(q-m)>c?d-c:m-(v?c:0));b.barX=l;b.pointWidth=p;b.tooltipPos=e.inverted?[n.len+n.pos-e.plotLeft-
f,a.xAxis.len-l-k/2,z]:[l+k/2,f+n.pos-e.plotTop,z];b.shapeType="rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?[b.plotX,n.len/2,0,0]:[l,q,k,z])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,e){var d=this.options,f,n=this.pointAttrToOptions||{};f=n.stroke||"borderColor";var m=n["stroke-width"]||"borderWidth",c=a&&a.color||this.color,b=a[f]||d[f]||this.color||
c,k=a[m]||d[m]||this[m]||0,n=d.dashStyle;a&&this.zones.length&&(c=(c=a.getZone())&&c.color||a.options.color||this.color);e&&(a=d.states[e],e=a.brightness,c=a.color||void 0!==e&&F(c).brighten(a.brightness).get()||c,b=a[f]||b,k=a[m]||k,n=a.dashStyle||n);f={fill:c,stroke:b,"stroke-width":k};d.borderRadius&&(f.r=d.borderRadius);n&&(f.dashstyle=n);return f},drawPoints:function(){var a=this,e=this.chart,p=a.options,v=e.renderer,n=p.animationLimit||250,m;A(a.points,function(c){var b=c.graphic;if(f(c.plotY)&&
null!==c.y){m=c.shapeArgs;if(b)b[e.pointCount<n?"animate":"attr"](k(m));else c.graphic=b=v[c.shapeType](m).attr({"class":c.getClassName()}).add(c.group||a.group);b.attr(a.pointAttribs(c,c.selected&&"select")).shadow(p.shadow,null,p.stacking&&!p.borderRadius)}else b&&(c.graphic=b.destroy())})},animate:function(a){var d=this,e=this.yAxis,f=d.options,n=this.chart.inverted,m={};p&&(a?(m.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(f.threshold))),n?m.translateX=a-e.len:m.translateY=a,d.group.attr(m)):
(m[n?"translateX":"translateY"]=e.pos,d.group.animate(m,D(y(d.options.animation),{step:function(a,b){d.group.attr({scaleY:Math.max(.001,b.pos)})}})),d.animate=null))},remove:function(){var a=this,e=a.chart;e.hasRendered&&A(e.series,function(d){d.type===a.type&&(d.isDirty=!0)});t.prototype.remove.apply(a,arguments)}})})(I);(function(a){var y=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&y.prototype.drawGraph.call(this)}})})(I);(function(a){var y=a.addEvent,F=a.arrayMax,A=a.defined,D=a.each,f=a.extend,k=a.format,r=a.map,t=a.merge,e=a.noop,p=a.pick,d=a.relativeLength,q=a.Series,x=a.seriesTypes,v=a.stableSort;
a.distribute=function(a,d){function c(a,b){return a.target-b.target}var b,m=!0,e=a,g=[],f;f=0;for(b=a.length;b--;)f+=a[b].size;if(f>d){v(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(f=b=0;f<=d;)f+=a[b].size,b++;g=a.splice(b-1,a.length)}v(a,c);for(a=r(a,function(a){return{size:a.size,targets:[a.target]}});m;){for(b=a.length;b--;)m=a[b],f=(Math.min.apply(0,m.targets)+Math.max.apply(0,m.targets))/2,m.pos=Math.min(Math.max(0,f-m.size/2),d-m.size);b=a.length;for(m=!1;b--;)0<b&&a[b-1].pos+a[b-1].size>
a[b].pos&&(a[b-1].size+=a[b].size,a[b-1].targets=a[b-1].targets.concat(a[b].targets),a[b-1].pos+a[b-1].size>d&&(a[b-1].pos=d-a[b-1].size),a.splice(b,1),m=!0)}b=0;D(a,function(a){var c=0;D(a.targets,function(){e[b].pos=a.pos+c;c+=e[b].size;b++})});e.push.apply(e,g);v(e,c)};q.prototype.drawDataLabels=function(){var a=this,d=a.options,c=d.dataLabels,b=a.points,e,f,g=a.hasRendered||0,q,v,r=p(c.defer,!0),l=a.chart.renderer;if(c.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(c),v=a.plotGroup("dataLabelsGroup",
"data-labels",r&&!g?"hidden":"visible",c.zIndex||6),r&&(v.attr({opacity:+g}),g||y(a,"afterAnimate",function(){a.visible&&v.show(!0);v[d.animation?"animate":"attr"]({opacity:1},{duration:200})})),f=c,D(b,function(b){var g,m=b.dataLabel,n,h,u,r=b.connector,z=!m,H;e=b.dlOptions||b.options&&b.options.dataLabels;if(g=p(e&&e.enabled,f.enabled)&&null!==b.y)for(h in c=t(f,e),n=b.getLabelConfig(),q=c.format?k(c.format,n):c.formatter.call(n,c),H=c.style,u=c.rotation,H.color=p(c.color,H.color,a.color,"#000000"),
"contrast"===H.color&&(H.color=c.inside||0>c.distance||d.stacking?l.getContrast(b.color||a.color):"#000000"),d.cursor&&(H.cursor=d.cursor),n={fill:c.backgroundColor,stroke:c.borderColor,"stroke-width":c.borderWidth,r:c.borderRadius||0,rotation:u,padding:c.padding,zIndex:1},n)void 0===n[h]&&delete n[h];!m||g&&A(q)?g&&A(q)&&(m?n.text=q:(m=b.dataLabel=l[u?"text":"label"](q,0,-9999,c.shape,null,null,c.useHTML,null,"data-label"),m.addClass("highcharts-data-label-color-"+b.colorIndex+" "+(c.className||
"")+(c.useHTML?"highcharts-tracker":""))),m.attr(n),m.css(H).shadow(c.shadow),m.added||m.add(v),a.alignDataLabel(b,m,c,null,z)):(b.dataLabel=m.destroy(),r&&(b.connector=r.destroy()))})};q.prototype.alignDataLabel=function(a,d,c,b,e){var m=this.chart,g=m.inverted,n=p(a.plotX,-9999),k=p(a.plotY,-9999),q=d.getBBox(),l,v=c.rotation,r=c.align,t=this.visible&&(a.series.forceDL||m.isInsidePlot(n,Math.round(k),g)||b&&m.isInsidePlot(n,g?b.x+1:b.y+b.height-1,g)),x="justify"===p(c.overflow,"justify");t&&(l=
c.style.fontSize,l=m.renderer.fontMetrics(l,d).b,b=f({x:g?m.plotWidth-k:n,y:Math.round(g?m.plotHeight-n:k),width:0,height:0},b),f(c,{width:q.width,height:q.height}),v?(x=!1,g=m.renderer.rotCorr(l,v),g={x:b.x+c.x+b.width/2+g.x,y:b.y+c.y+{top:0,middle:.5,bottom:1}[c.verticalAlign]*b.height},d[e?"attr":"animate"](g).attr({align:r}),n=(v+720)%360,n=180<n&&360>n,"left"===r?g.y-=n?q.height:0:"center"===r?(g.x-=q.width/2,g.y-=q.height/2):"right"===r&&(g.x-=q.width,g.y-=n?0:q.height)):(d.align(c,null,b),
g=d.alignAttr),x?this.justifyDataLabel(d,c,g,q,b,e):p(c.crop,!0)&&(t=m.isInsidePlot(g.x,g.y)&&m.isInsidePlot(g.x+q.width,g.y+q.height)),c.shape&&!v&&d.attr({anchorX:a.plotX,anchorY:a.plotY}));t||(d.attr({y:-9999}),d.placed=!1)};q.prototype.justifyDataLabel=function(a,d,c,b,e,f){var g=this.chart,m=d.align,n=d.verticalAlign,k,l,p=a.box?0:a.padding||0;k=c.x+p;0>k&&("right"===m?d.align="left":d.x=-k,l=!0);k=c.x+b.width-p;k>g.plotWidth&&("left"===m?d.align="right":d.x=g.plotWidth-k,l=!0);k=c.y+p;0>k&&
("bottom"===n?d.verticalAlign="top":d.y=-k,l=!0);k=c.y+b.height-p;k>g.plotHeight&&("top"===n?d.verticalAlign="bottom":d.y=g.plotHeight-k,l=!0);l&&(a.placed=!f,a.align(d,null,e))};x.pie&&(x.pie.prototype.drawDataLabels=function(){var d=this,e=d.data,c,b=d.chart,f=d.options.dataLabels,k=p(f.connectorPadding,10),g=p(f.connectorWidth,1),v=b.plotWidth,t=b.plotHeight,x,l=f.distance,B=d.center,y=B[2]/2,A=B[1],J=0<l,h,C,M,N,R=[[],[]],I,w,Q,O,P=[0,0,0,0];d.visible&&(f.enabled||d._hasPointLabels)&&(q.prototype.drawDataLabels.apply(d),
D(e,function(a){a.dataLabel&&a.visible&&(R[a.half].push(a),a.dataLabel._pos=null)}),D(R,function(g,e){var m,n,p=g.length,u,q,z;if(p)for(d.sortByAngle(g,e-.5),0<l&&(m=Math.max(0,A-y-l),n=Math.min(A+y+l,b.plotHeight),u=r(g,function(a){if(a.dataLabel)return z=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-m+z/2,size:z,rank:a.y}}),a.distribute(u,n+z-m)),O=0;O<p;O++)c=g[O],M=c.labelPos,h=c.dataLabel,Q=!1===c.visible?"hidden":"inherit",q=M[1],u?void 0===u[O].pos?Q="hidden":(N=u[O].size,w=m+u[O].pos):
w=q,I=f.justify?B[0]+(e?-1:1)*(y+l):d.getX(w<m+2||w>n-2?q:w,e),h._attr={visibility:Q,align:M[6]},h._pos={x:I+f.x+({left:k,right:-k}[M[6]]||0),y:w+f.y-10},M.x=I,M.y=w,null===d.options.size&&(C=h.width,I-C<k?P[3]=Math.max(Math.round(C-I+k),P[3]):I+C>v-k&&(P[1]=Math.max(Math.round(I+C-v+k),P[1])),0>w-N/2?P[0]=Math.max(Math.round(-w+N/2),P[0]):w+N/2>t&&(P[2]=Math.max(Math.round(w+N/2-t),P[2])))}),0===F(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),J&&g&&D(this.points,function(a){var c;
x=a.connector;if((h=a.dataLabel)&&h._pos&&a.visible){Q=h._attr.visibility;if(c=!x)a.connector=x=b.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(d.dataLabelsGroup),x.attr({"stroke-width":g,stroke:f.connectorColor||a.color||"#666666"});x[c?"attr":"animate"]({d:d.connectorPath(a.labelPos)});x.attr("visibility",Q)}else x&&(a.connector=x.destroy())}))},x.pie.prototype.connectorPath=function(a){var d=a.x,c=a.y;return p(this.options.dataLabels.softConnector,
!0)?["M",d+("left"===a[6]?5:-5),c,"C",d,c,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",d+("left"===a[6]?5:-5),c,"L",a[2],a[3],"L",a[4],a[5]]},x.pie.prototype.placeDataLabels=function(){D(this.points,function(a){var d=a.dataLabel;d&&a.visible&&((a=d._pos)?(d.attr(d._attr),d[d.moved?"animate":"attr"](a),d.moved=!0):d&&d.attr({y:-9999}))})},x.pie.prototype.alignDataLabel=e,x.pie.prototype.verifyDataLabelOverflow=function(a){var e=this.center,c=this.options,b=c.center,f=c.minSize||80,k,g;null!==
b[0]?k=Math.max(e[2]-Math.max(a[1],a[3]),f):(k=Math.max(e[2]-a[1]-a[3],f),e[0]+=(a[3]-a[1])/2);null!==b[1]?k=Math.max(Math.min(k,e[2]-Math.max(a[0],a[2])),f):(k=Math.max(Math.min(k,e[2]-a[0]-a[2]),f),e[1]+=(a[0]-a[2])/2);k<e[2]?(e[2]=k,e[3]=Math.min(d(c.innerSize||0,k),k),this.translate(e),this.drawDataLabels&&this.drawDataLabels()):g=!0;return g});x.column&&(x.column.prototype.alignDataLabel=function(a,d,c,b,e){var m=this.chart.inverted,g=a.series,f=a.dlBox||a.shapeArgs,k=p(a.below,a.plotY>p(this.translatedThreshold,
g.yAxis.len)),n=p(c.inside,!!this.options.stacking);f&&(b=t(f),0>b.y&&(b.height+=b.y,b.y=0),f=b.y+b.height-g.yAxis.len,0<f&&(b.height-=f),m&&(b={x:g.yAxis.len-b.y-b.height,y:g.xAxis.len-b.x-b.width,width:b.height,height:b.width}),n||(m?(b.x+=k?0:b.width,b.width=0):(b.y+=k?b.height:0,b.height=0)));c.align=p(c.align,!m||n?"center":k?"right":"left");c.verticalAlign=p(c.verticalAlign,m||n?"middle":k?"top":"bottom");q.prototype.alignDataLabel.call(this,a,d,c,b,e)})})(I);(function(a){var y=a.Chart,F=a.each,
A=a.pick,D=a.addEvent;y.prototype.callbacks.push(function(a){function f(){var f=[];F(a.series,function(a){var e=a.options.dataLabels,k=a.dataLabelCollections||["dataLabel"];(e.enabled||a._hasPointLabels)&&!e.allowOverlap&&a.visible&&F(k,function(d){F(a.points,function(a){a[d]&&(a[d].labelrank=A(a.labelrank,a.shapeArgs&&a.shapeArgs.height),f.push(a[d]))})})});a.hideOverlappingLabels(f)}f();D(a,"redraw",f)});y.prototype.hideOverlappingLabels=function(a){var f=a.length,r,t,e,p,d,q,x,v,n,m=function(a,
b,d,e,g,m,f,k){return!(g>a+d||g+f<a||m>b+e||m+k<b)};for(t=0;t<f;t++)if(r=a[t])r.oldOpacity=r.opacity,r.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(t=0;t<f;t++)for(e=a[t],r=t+1;r<f;++r)if(p=a[r],e&&p&&e.placed&&p.placed&&0!==e.newOpacity&&0!==p.newOpacity&&(d=e.alignAttr,q=p.alignAttr,x=e.parentGroup,v=p.parentGroup,n=2*(e.box?0:e.padding),d=m(d.x+x.translateX,d.y+x.translateY,e.width-n,e.height-n,q.x+v.translateX,q.y+v.translateY,p.width-n,p.height-n)))(e.labelrank<
p.labelrank?e:p).newOpacity=0;F(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(I);(function(a){var y=a.addEvent,F=a.Chart,A=a.createElement,D=a.css,f=a.defaultOptions,k=a.defaultPlotOptions,r=a.each,t=a.extend,e=a.fireEvent,p=a.hasTouch,d=a.inArray,q=a.isObject,x=a.Legend,v=a.merge,n=a.pick,m=a.Point,c=a.Series,b=a.seriesTypes,E=a.svg;a=a.TrackerMixin=
{drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=function(a){for(var c=a.target,d;c&&!d;)d=c.point,c=c.parentNode;if(void 0!==d&&d!==b.hoverPoint)d.onMouseOver(a)};r(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(r(a.trackerGroups,function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(p)a[b].on("touchstart",
d);a.options.cursor&&a[b].css(D).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,l=a.chart,m=l.pointer,f=l.renderer,k=l.options.tooltip.snap,n=a.tracker,h,q=function(){if(l.hoverSeries!==a)a.onMouseOver()},v="rgba(192,192,192,"+(E?.0001:.002)+")";if(e&&!c)for(h=e+1;h--;)"M"===d[h]&&d.splice(h+1,0,d[h+1]-k,d[h+2],"L"),(h&&"M"===d[h]||h===e)&&d.splice(h,0,"L",d[h-2]+k,d[h-1]);n?
n.attr({d:d}):a.graph&&(a.tracker=f.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:v,fill:c?v:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*k),zIndex:2}).add(a.group),r([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",q).on("mouseout",function(a){m.onTrackerMouseOut(a)});b.cursor&&a.css({cursor:b.cursor});if(p)a.on("touchstart",q)}))}};b.column&&(b.column.prototype.drawTracker=a.drawTrackerPoint);b.pie&&(b.pie.prototype.drawTracker=
a.drawTrackerPoint);b.scatter&&(b.scatter.prototype.drawTracker=a.drawTrackerPoint);t(x.prototype,{setItemEvents:function(a,b,c){var d=this,g=d.chart,l="highcharts-legend-"+(a.series?"point":"series")+"-active";(c?b:a.legendGroup).on("mouseover",function(){a.setState("hover");g.seriesGroup.addClass(l);b.css(d.options.itemHoverStyle)}).on("mouseout",function(){b.css(a.visible?d.itemStyle:d.itemHiddenStyle);g.seriesGroup.removeClass(l);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&
a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):e(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=A("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);y(a.checkbox,"click",function(b){e(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});f.legend.itemStyle.cursor="pointer";t(F.prototype,{showResetZoom:function(){var a=
this,b=f.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,l="chart"===c.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(c.position,!1,l)},zoomOut:function(){var a=this;e(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?r(this.axes,function(a){b=
a.zoom()}):r(a.xAxis.concat(a.yAxis),function(a){var g=a.axis;c[g.isXAxis?"zoomX":"zoomY"]&&(b=g.zoom(a.min,a.max),g.displayBtn&&(d=!0))});e=this.resetZoomButton;d&&!e?this.showResetZoom():!d&&q(e)&&(this.resetZoomButton=e.destroy());b&&this.redraw(n(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,g;d&&r(d,function(a){a.setState()});r("xy"===b?[1,0]:[1],function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,e=a[d?"chartX":"chartY"],d=d?
"mouseDownX":"mouseDownY",l=c[d],m=(b.pointRange||0)/2,h=b.getExtremes(),f=b.toValue(l-e,!0)+m,m=b.toValue(l+b.len-e,!0)-m,k=m<f,l=k?m:f,f=k?f:m,m=Math.min(h.dataMin,h.min)-l,h=f-Math.max(h.dataMax,h.max);b.series.length&&0>m&&0>h&&(b.setExtremes(l,f,!1,!1,{trigger:"pan"}),g=!0);c[d]=e});g&&c.redraw(!1);D(c.container,{cursor:"move"})}});t(m.prototype,{select:function(a,b){var c=this,g=c.series,e=g.chart;a=n(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=
c.options.selected=a;g.options.data[d(c,g.data)]=c.options;c.setState(a&&"select");b||r(e.getSelectedPoints(),function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,g.options.data[d(a,g.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,b){var c=this.series,d=c.chart,g=d.tooltip,e=d.hoverPoint;if(this.series){if(!b){if(e&&e!==this)e.onMouseOut();if(d.hoverSeries!==c)c.onMouseOver();d.hoverPoint=this}!g||g.shared&&!c.noSharedTooltip?g||this.setState("hover"):
(this.setState("hover"),g.refresh(this,a));this.firePointEvent("mouseOver")}},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");b&&-1!==d(this,b)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=v(this.series.options.point,this.options).events,b;this.events=a;for(b in a)y(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,g=this.series,e=g.options.states[a]||
{},m=k[g.type].marker&&g.options.marker,f=m&&!1===m.enabled,p=m&&m.states&&m.states[a]||{},q=!1===p.enabled,h=g.stateMarkerGraphic,v=this.marker||{},r=g.chart,u=g.halo,x,E=m&&g.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===e.enabled||a&&(q||f&&!1===p.enabled)||a&&v.states&&v.states[a]&&!1===v.states[a].enabled)){E&&(x=g.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+
a),this.graphic.attr(g.pointAttribs(this,a)),x&&this.graphic.animate(x,n(r.options.chart.animation,p.animation,m.animation)),h&&h.hide();else{if(a&&p){m=v.symbol||g.symbol;h&&h.currentSymbol!==m&&(h=h.destroy());if(h)h[b?"animate":"attr"]({x:x.x,y:x.y});else m&&(g.stateMarkerGraphic=h=r.renderer.symbol(m,x.x,x.y,x.width,x.height).add(g.markerGroup),h.currentSymbol=m);h&&h.attr(g.pointAttribs(this,a))}h&&(h[a&&r.isInsidePlot(c,d,r.inverted)?"show":"hide"](),h.element.point=this)}(c=e.halo)&&c.size?
(u||(g.halo=u=r.renderer.path().add(E?g.markerGroup:g.group)),u[b?"animate":"attr"]({d:this.haloPath(c.size)}),u.attr({"class":"highcharts-halo highcharts-color-"+n(this.colorIndex,g.colorIndex)}),u.point=this,u.attr(t({fill:this.color||g.color,"fill-opacity":c.opacity,zIndex:-1},c.attributes))):u&&u.point&&u.point.haloPath&&u.animate({d:u.point.haloPath(0)});this.state=a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});t(c.prototype,
{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&e(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&e(this,"mouseOut");!c||a.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,c=b.options,d=b.graph,e=c.states,m=c.lineWidth,
c=0;a=a||"";if(b.state!==a&&(r([b.group,b.markerGroup],function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!e[a]||!1!==e[a].enabled)&&(a&&(m=e[a].lineWidth||m+(e[a].lineWidthPlus||0)),d&&!d.dashstyle))for(e={"stroke-width":m},d.attr(e);b["zone-graph-"+c];)b["zone-graph-"+c].attr(e),c+=1},setVisible:function(a,b){var c=this,d=c.chart,g=c.legendItem,m,f=d.options.chart.ignoreHiddenSeries,k=c.visible;m=(c.visible=a=c.options.visible=
c.userOptions.visible=void 0===a?!k:a)?"show":"hide";r(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(c[a])c[a][m]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();g&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&r(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});r(c.linkedSeries,function(b){b.setVisible(a,!1)});f&&(d.isDirtyBox=!0);!1!==b&&d.redraw();e(c,m)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},
select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);e(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(I);(function(a){var y=a.Chart,F=a.each,A=a.inArray,D=a.isObject,f=a.pick,k=a.splat;y.prototype.setResponsive=function(a){var f=this.options.responsive;f&&f.rules&&F(f.rules,function(e){this.matchResponsiveRule(e,a)},this)};y.prototype.matchResponsiveRule=function(k,t){var e=this.respRules,p=k.condition,d;d=p.callback||function(){return this.chartWidth<=
f(p.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=f(p.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=f(p.minWidth,0)&&this.chartHeight>=f(p.minHeight,0)};void 0===k._id&&(k._id=a.uniqueKey());d=d.call(this);!e[k._id]&&d?k.chartOptions&&(e[k._id]=this.currentOptions(k.chartOptions),this.update(k.chartOptions,t)):e[k._id]&&!d&&(this.update(e[k._id],t),delete e[k._id])};y.prototype.currentOptions=function(a){function f(a,d,e,r){var p,n;for(p in a)if(!r&&-1<A(p,["series","xAxis","yAxis"]))for(a[p]=k(a[p]),
e[p]=[],n=0;n<a[p].length;n++)e[p][n]={},f(a[p][n],d[p][n],e[p][n],r+1);else D(a[p])?(e[p]={},f(a[p],d[p]||{},e[p],r+1)):e[p]=d[p]||null}var e={};f(a,this.options,e,0);return e}})(I);(function(a){var y=a.Axis,F=a.each,A=a.pick;a=a.wrap;a(y.prototype,"getSeriesExtremes",function(a){var f=this.isXAxis,k,r,t=[],e;f&&F(this.series,function(a,d){a.useMapGeometry&&(t[d]=a.xData,a.xData=[])});a.call(this);f&&(k=A(this.dataMin,Number.MAX_VALUE),r=A(this.dataMax,-Number.MAX_VALUE),F(this.series,function(a,
d){a.useMapGeometry&&(k=Math.min(k,A(a.minX,k)),r=Math.max(r,A(a.maxX,k)),a.xData=t[d],e=!0)}),e&&(this.dataMin=k,this.dataMax=r))});a(y.prototype,"setAxisTranslation",function(a){var f=this.chart,k=f.plotWidth/f.plotHeight,f=f.xAxis[0],r;a.call(this);"yAxis"===this.coll&&void 0!==f.transA&&F(this.series,function(a){a.preserveAspectRatio&&(r=!0)});if(r&&(this.transA=f.transA=Math.min(this.transA,f.transA),a=k/((f.max-f.min)/(this.max-this.min)),a=1>a?this:f,k=(a.max-a.min)*a.transA,a.pixelPadding=
a.len-k,a.minPixelPadding=a.pixelPadding/2,k=a.fixTo)){k=k[1]-a.toValue(k[0],!0);k*=a.transA;if(Math.abs(k)>a.minPixelPadding||a.min===a.dataMin&&a.max===a.dataMax)k=0;a.minPixelPadding-=k}});a(y.prototype,"render",function(a){a.call(this);this.fixTo=null})})(I);(function(a){var y=a.Axis,F=a.Chart,A=a.color,D,f=a.each,k=a.extend,r=a.isNumber,t=a.Legend,e=a.LegendSymbolMixin,p=a.noop,d=a.merge,q=a.pick,x=a.wrap;D=a.ColorAxis=function(){this.init.apply(this,arguments)};k(D.prototype,y.prototype);k(D.prototype,
{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItem","legendSymbol"].concat(y.prototype.keepProps),init:function(a,e){var m="vertical"!==a.options.legend.layout,c;this.coll="colorAxis";c=d(this.defaultColorAxisOptions,
{side:m?2:1,reversed:!m},e,{opposite:!m,showEmpty:!1,title:null});y.prototype.init.call(this,a,c);e.dataClasses&&this.initDataClasses(e);this.initStops(e);this.horiz=m;this.zoomEnabled=!1;this.defaultLegendLength=200},tweenColors:function(a,d,e){var c;d.rgba.length&&a.rgba.length?(a=a.rgba,d=d.rgba,c=1!==d[3]||1!==a[3],a=(c?"rgba(":"rgb(")+Math.round(d[0]+(a[0]-d[0])*(1-e))+","+Math.round(d[1]+(a[1]-d[1])*(1-e))+","+Math.round(d[2]+(a[2]-d[2])*(1-e))+(c?","+(d[3]+(a[3]-d[3])*(1-e)):"")+")"):a=d.input||
"none";return a},initDataClasses:function(a){var e=this,m=this.chart,c,b=0,k=m.options.chart.colorCount,p=this.options,g=a.dataClasses.length;this.dataClasses=c=[];this.legendItems=[];f(a.dataClasses,function(a,f){a=d(a);c.push(a);a.color||("category"===p.dataClassColor?(f=m.options.colors,k=f.length,a.color=f[b],a.colorIndex=b,b++,b===k&&(b=0)):a.color=e.tweenColors(A(p.minColor),A(p.maxColor),2>g?.5:f/(g-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];
f(this.stops,function(a){a.color=A(a[1])})},setOptions:function(a){y.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,d=this.chart,e=d.options.legend||{},c,b;a?(this.left=e=a.attr("x"),this.top=c=a.attr("y"),this.width=b=a.attr("width"),this.height=a=a.attr("height"),this.right=d.chartWidth-e-b,this.bottom=d.chartHeight-c-a,this.len=this.horiz?b:a,this.pos=this.horiz?e:c):this.len=(this.horiz?e.symbolWidth:e.symbolHeight)||
this.defaultLegendLength},toColor:function(a,d){var e=this.stops,c,b,f=this.dataClasses,k,g;if(f)for(g=f.length;g--;){if(k=f[g],c=k.from,e=k.to,(void 0===c||a>=c)&&(void 0===e||a<=e)){b=k.color;d&&(d.dataClass=g,d.colorIndex=k.colorIndex);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min||1);for(g=e.length;g--&&!(a>e[g][0]););c=e[g]||e[g+1];e=e[g+1]||c;a=1-(e[0]-a)/(e[0]-c[0]||1);b=this.tweenColors(c.color,e.color,a)}return b},getOffset:function(){var a=this.legendGroup,
d=this.chart.axisOffset[this.side];a&&(this.axisParent=a,y.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=d)},setLegendColor:function(){var a,d=this.options,e=this.reversed;a=e?1:0;e=e?0:1;a=this.horiz?[a,0,e,0]:[0,e,0,a];this.legendColor={linearGradient:{x1:a[0],y1:a[1],x2:a[2],y2:a[3]},stops:d.stops||[[0,d.minColor],[1,d.maxColor]]}},drawLegendSymbol:function(a,d){var e=a.padding,c=a.options,b=this.horiz,f=
q(c.symbolWidth,b?this.defaultLegendLength:12),k=q(c.symbolHeight,b?12:this.defaultLegendLength),g=q(c.labelPadding,b?16:30),c=q(c.itemDistance,10);this.setLegendColor();d.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,f,k).attr({zIndex:1}).add(d.legendGroup);this.legendItemWidth=f+e+(b?c:g);this.legendItemHeight=k+e+(b?g:0)},setState:p,visible:!0,setVisible:p,getSeriesExtremes:function(){var a=this.series,d=a.length;this.dataMin=Infinity;for(this.dataMax=-Infinity;d--;)void 0!==a[d].valueMin&&
(this.dataMin=Math.min(this.dataMin,a[d].valueMin),this.dataMax=Math.max(this.dataMax,a[d].valueMax))},drawCrosshair:function(a,d){var e=d&&d.plotX,c=d&&d.plotY,b,f=this.pos,k=this.len;d&&(b=this.toPixels(d[d.series.colorKey]),b<f?b=f-2:b>f+k&&(b=f+k+2),d.plotX=b,d.plotY=this.len-b,y.prototype.drawCrosshair.call(this,a,d),d.plotX=e,d.plotY=c,this.cross&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.attr({fill:this.crosshair.color})))},getPlotLinePath:function(a,
d,e,c,b){return r(b)?this.horiz?["M",b-4,this.top-6,"L",b+4,this.top-6,b,this.top,"Z"]:["M",this.left,b,"L",this.left-6,b+6,this.left-6,b-6,"Z"]:y.prototype.getPlotLinePath.call(this,a,d,e,c)},update:function(a,e){var m=this.chart,c=m.legend;f(this.series,function(a){a.isDirtyData=!0});a.dataClasses&&c.allItems&&(f(c.allItems,function(a){a.isDataClass&&a.legendGroup.destroy()}),m.isDirtyLegend=!0);m.options[this.coll]=d(this.userOptions,a);y.prototype.update.call(this,a,e);this.legendItem&&(this.setLegendColor(),
c.colorizeItem(this,!0))},getDataClassLegendSymbols:function(){var d=this,n=this.chart,m=this.legendItems,c=n.options.legend,b=c.valueDecimals,q=c.valueSuffix||"",r;m.length||f(this.dataClasses,function(c,u){var g=!0,v=c.from,l=c.to;r="";void 0===v?r="\x3c ":void 0===l&&(r="\x3e ");void 0!==v&&(r+=a.numberFormat(v,b)+q);void 0!==v&&void 0!==l&&(r+=" - ");void 0!==l&&(r+=a.numberFormat(l,b)+q);m.push(k({chart:n,name:r,options:{},drawLegendSymbol:e.drawRectangle,visible:!0,setState:p,isDataClass:!0,
setVisible:function(){g=this.visible=!g;f(d.series,function(a){f(a.points,function(a){a.dataClass===u&&a.setVisible(g)})});n.legend.colorizeItem(this,g)}},c))});return m},name:""});f(["fill","stroke"],function(d){a.Fx.prototype[d+"Setter"]=function(){this.elem.attr(d,D.prototype.tweenColors(A(this.start),A(this.end),this.pos),null,!0)}});x(F.prototype,"getAxes",function(a){var d=this.options.colorAxis;a.call(this);this.colorAxis=[];d&&new D(this,d)});x(t.prototype,"getAllItems",function(a){var d=
[],e=this.chart.colorAxis[0];e&&e.options&&(e.options.showInLegend&&(e.options.dataClasses?d=d.concat(e.getDataClassLegendSymbols()):d.push(e)),f(e.series,function(a){a.options.showInLegend=!1}));return d.concat(a.call(this))});x(t.prototype,"colorizeItem",function(a,d,e){a.call(this,d,e);e&&d.legendColor&&d.legendSymbol.attr({fill:d.legendColor})})})(I);(function(a){var y=a.defined,F=a.each,A=a.noop,D=a.seriesTypes;a.colorPointMixin={isValid:function(){return null!==this.value},setVisible:function(a){var f=
this,r=a?"show":"hide";F(["graphic","dataLabel"],function(a){if(f[a])f[a][r]()})},setState:function(f){a.Point.prototype.setState.call(this,f);this.graphic&&this.graphic.attr({zIndex:"hover"===f?1:0})}};a.colorSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],optionalAxis:"colorAxis",trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:A,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:D.column.prototype.pointAttribs,translateColors:function(){var a=
this,k=this.options.nullColor,r=this.colorAxis,t=this.colorKey;F(this.data,function(e){var f=e[t];if(f=e.options.color||(e.isNull?k:r&&void 0!==f?r.toColor(f,e):e.color||a.color))e.color=f})},colorAttribs:function(a){var f={};y(a.color)&&(f[this.colorProp||"fill"]=a.color);return f}}})(I);(function(a){function y(a){a&&(a.preventDefault&&a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)}var F=a.addEvent,A=a.Chart,D=a.doc,f=a.each,k=a.extend,r=a.merge,t=a.pick;a=a.wrap;k(A.prototype,
{renderMapNavigation:function(){var a=this,f=this.options.mapNavigation,d=f.buttons,q,x,v,n,m,c=function(b){this.handler.call(a,b);y(b)};if(t(f.enableButtons,f.enabled)&&!a.renderer.forExport)for(q in a.mapNavButtons=[],d)d.hasOwnProperty(q)&&(v=r(f.buttonOptions,d[q]),x=v.theme,x.style=r(v.theme.style,v.style),m=(n=x.states)&&n.hover,n=n&&n.select,x=a.renderer.button(v.text,0,0,c,x,m,n,0,"zoomIn"===q?"topbutton":"bottombutton").addClass("highcharts-map-navigation").attr({width:v.width,height:v.height,
title:a.options.lang[q],padding:v.padding,zIndex:5}).add(),x.handler=v.onclick,x.align(k(v,{width:x.width,height:2*x.height}),null,v.alignTo),F(x.element,"dblclick",y),a.mapNavButtons.push(x))},fitToBox:function(a,k){f([["x","width"],["y","height"]],function(d){var e=d[0];d=d[1];a[e]+a[d]>k[e]+k[d]&&(a[d]>k[d]?(a[d]=k[d],a[e]=k[e]):a[e]=k[e]+k[d]-a[d]);a[d]>k[d]&&(a[d]=k[d]);a[e]<k[e]&&(a[e]=k[e])});return a},mapZoom:function(a,f,d,k,r){var e=this.xAxis[0],n=e.max-e.min,m=t(f,e.min+n/2),c=n*a,n=this.yAxis[0],
b=n.max-n.min,p=t(d,n.min+b/2),b=b*a,m=this.fitToBox({x:m-c*(k?(k-e.pos)/e.len:.5),y:p-b*(r?(r-n.pos)/n.len:.5),width:c,height:b},{x:e.dataMin,y:n.dataMin,width:e.dataMax-e.dataMin,height:n.dataMax-n.dataMin}),c=m.x<=e.dataMin&&m.width>=e.dataMax-e.dataMin&&m.y<=n.dataMin&&m.height>=n.dataMax-n.dataMin;k&&(e.fixTo=[k-e.pos,f]);r&&(n.fixTo=[r-n.pos,d]);void 0===a||c?(e.setExtremes(void 0,void 0,!1),n.setExtremes(void 0,void 0,!1)):(e.setExtremes(m.x,m.x+m.width,!1),n.setExtremes(m.y,m.y+m.height,!1));
this.redraw()}});a(A.prototype,"render",function(a){var e=this,d=e.options.mapNavigation;e.renderMapNavigation();a.call(e);(t(d.enableDoubleClickZoom,d.enabled)||d.enableDoubleClickZoomTo)&&F(e.container,"dblclick",function(a){e.pointer.onContainerDblClick(a)});t(d.enableMouseWheelZoom,d.enabled)&&F(e.container,void 0===D.onmousewheel?"DOMMouseScroll":"mousewheel",function(a){e.pointer.onContainerMouseWheel(a);y(a);return!1})})})(I);(function(a){var y=a.extend,F=a.pick,A=a.Pointer;a=a.wrap;y(A.prototype,
{onContainerDblClick:function(a){var f=this.chart;a=this.normalize(a);f.options.mapNavigation.enableDoubleClickZoomTo?f.pointer.inClass(a.target,"highcharts-tracker")&&f.hoverPoint&&f.hoverPoint.zoomTo():f.isInsidePlot(a.chartX-f.plotLeft,a.chartY-f.plotTop)&&f.mapZoom(.5,f.xAxis[0].toValue(a.chartX),f.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)},onContainerMouseWheel:function(a){var f=this.chart,k;a=this.normalize(a);k=a.detail||-(a.wheelDelta/120);f.isInsidePlot(a.chartX-f.plotLeft,a.chartY-f.plotTop)&&
f.mapZoom(Math.pow(f.options.mapNavigation.mouseWheelSensitivity,k),f.xAxis[0].toValue(a.chartX),f.yAxis[0].toValue(a.chartY),a.chartX,a.chartY)}});a(A.prototype,"zoomOption",function(a){var f=this.chart.options.mapNavigation;F(f.enableTouchZoom,f.enabled)&&(this.chart.options.chart.pinchType="xy");a.apply(this,[].slice.call(arguments,1))});a(A.prototype,"pinchTranslate",function(a,f,k,r,t,e,p){a.call(this,f,k,r,t,e,p);"map"===this.chart.options.chart.type&&this.hasZoom&&(a=r.scaleX>r.scaleY,this.pinchTranslateDirection(!a,
f,k,r,t,e,p,a?r.scaleX:r.scaleY))})})(I);(function(a){var y=a.color,F=a.ColorAxis,A=a.colorPointMixin,D=a.each,f=a.extend,k=a.isNumber,r=a.map,t=a.merge,e=a.noop,p=a.pick,d=a.isArray,q=a.Point,x=a.Series,v=a.seriesType,n=a.seriesTypes,m=a.splat,c=void 0!==a.doc.documentElement.style.vectorEffect;v("map","scatter",{allAreas:!0,animation:!1,nullColor:"#f7f7f7",borderColor:"#cccccc",borderWidth:1,marker:null,stickyTracking:!1,joinBy:"hc-key",dataLabels:{formatter:function(){return this.point.value},
inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},turboThreshold:0,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{brightness:.2,halo:null},select:{color:"#cccccc"}}},t(a.colorSeriesMixin,{type:"map",supportsDrilldown:!0,getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:e,directTouch:!0,preserveAspectRatio:!0,pointArrayMap:["value"],getBox:function(b){var c=Number.MAX_VALUE,d=-c,g=c,e=-c,f=c,m=c,l=this.xAxis,
n=this.yAxis,q;D(b||[],function(b){if(b.path){"string"===typeof b.path&&(b.path=a.splitPath(b.path));var l=b.path||[],h=l.length,n=!1,r=-c,u=c,t=-c,v=c,x=b.properties;if(!b._foundBox){for(;h--;)k(l[h])&&(n?(r=Math.max(r,l[h]),u=Math.min(u,l[h])):(t=Math.max(t,l[h]),v=Math.min(v,l[h])),n=!n);b._midX=u+(r-u)*(b.middleX||x&&x["hc-middle-x"]||.5);b._midY=v+(t-v)*(b.middleY||x&&x["hc-middle-y"]||.5);b._maxX=r;b._minX=u;b._maxY=t;b._minY=v;b.labelrank=p(b.labelrank,(r-u)*(t-v));b._foundBox=!0}d=Math.max(d,
b._maxX);g=Math.min(g,b._minX);e=Math.max(e,b._maxY);f=Math.min(f,b._minY);m=Math.min(b._maxX-b._minX,b._maxY-b._minY,m);q=!0}});q&&(this.minY=Math.min(f,p(this.minY,c)),this.maxY=Math.max(e,p(this.maxY,-c)),this.minX=Math.min(g,p(this.minX,c)),this.maxX=Math.max(d,p(this.maxX,-c)),l&&void 0===l.options.minRange&&(l.minRange=Math.min(5*m,(this.maxX-this.minX)/5,l.minRange||c)),n&&void 0===n.options.minRange&&(n.minRange=Math.min(5*m,(this.maxY-this.minY)/5,n.minRange||c)))},getExtremes:function(){x.prototype.getExtremes.call(this,
this.valueData);this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);this.valueMin=this.dataMin;this.valueMax=this.dataMax;this.dataMin=this.minY;this.dataMax=this.maxY},translatePath:function(a){var b=!1,c=this.xAxis,d=this.yAxis,e=c.min,f=c.transA,c=c.minPixelPadding,m=d.min,l=d.transA,d=d.minPixelPadding,n,p=[];if(a)for(n=a.length;n--;)k(a[n])?(p[n]=b?(a[n]-e)*f+c:(a[n]-m)*l+d,b=!b):p[n]=a[n];return p},setData:function(b,c,e,g){var f=this.options,n=this.chart.options.chart,
p=n&&n.map,l=f.mapData,q=f.joinBy,u=null===q,v=f.keys||this.pointArrayMap,y=[],h={},E,A=this.chart.mapTransforms;!l&&p&&(l="string"===typeof p?a.maps[p]:p);u&&(q="_i");q=this.joinBy=m(q);q[1]||(q[1]=q[0]);b&&D(b,function(a,c){var e=0;if(k(a))b[c]={value:a};else if(d(a)){b[c]={};!f.keys&&a.length>v.length&&"string"===typeof a[0]&&(b[c]["hc-key"]=a[0],++e);for(var g=0;g<v.length;++g,++e)v[g]&&(b[c][v[g]]=a[e])}u&&(b[c]._i=c)});this.getBox(b);if(this.chart.mapTransforms=A=n&&n.mapTransforms||l&&l["hc-transform"]||
A)for(E in A)A.hasOwnProperty(E)&&E.rotation&&(E.cosAngle=Math.cos(E.rotation),E.sinAngle=Math.sin(E.rotation));if(l){"FeatureCollection"===l.type&&(this.mapTitle=l.title,l=a.geojson(l,this.type,this));this.mapData=l;this.mapMap={};for(E=0;E<l.length;E++)n=l[E],p=n.properties,n._i=E,q[0]&&p&&p[q[0]]&&(n[q[0]]=p[q[0]]),h[n[q[0]]]=n;this.mapMap=h;b&&q[1]&&D(b,function(a){h[a[q[1]]]&&y.push(h[a[q[1]]])});f.allAreas?(this.getBox(l),b=b||[],q[1]&&D(b,function(a){y.push(a[q[1]])}),y="|"+r(y,function(a){return a&&
a[q[0]]}).join("|")+"|",D(l,function(a){q[0]&&-1!==y.indexOf("|"+a[q[0]]+"|")||(b.push(t(a,{value:null})),g=!1)})):this.getBox(y)}x.prototype.setData.call(this,b,c,e,g)},drawGraph:e,drawDataLabels:e,doFullTranslate:function(){return this.isDirtyData||this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var a=this,c=a.xAxis,d=a.yAxis,e=a.doFullTranslate();a.generatePoints();D(a.data,function(b){b.plotX=c.toPixels(b._midX,!0);b.plotY=d.toPixels(b._midY,!0);e&&(b.shapeType=
"path",b.shapeArgs={d:a.translatePath(b.path)})});a.translateColors()},pointAttribs:function(a,d){d=n.column.prototype.pointAttribs.call(this,a,d);a.isFading&&delete d.fill;c?d["vector-effect"]="non-scaling-stroke":d["stroke-width"]="inherit";return d},drawPoints:function(){var a=this,d=a.xAxis,e=a.yAxis,g=a.group,f=a.chart,m=f.renderer,k,l,p,q,r=this.baseTrans,t,h,v,x,y;a.transformGroup||(a.transformGroup=m.g().attr({scaleX:1,scaleY:1}).add(g),a.transformGroup.survive=!0);a.doFullTranslate()?(f.hasRendered&&
D(a.points,function(b){b.shapeArgs&&(b.shapeArgs.fill=a.pointAttribs(b,b.state).fill)}),a.group=a.transformGroup,n.column.prototype.drawPoints.apply(a),a.group=g,D(a.points,function(a){a.graphic&&(a.name&&a.graphic.addClass("highcharts-name-"+a.name.replace(/ /g,"-").toLowerCase()),a.properties&&a.properties["hc-key"]&&a.graphic.addClass("highcharts-key-"+a.properties["hc-key"].toLowerCase()))}),this.baseTrans={originX:d.min-d.minPixelPadding/d.transA,originY:e.min-e.minPixelPadding/e.transA+(e.reversed?
0:e.len/e.transA),transAX:d.transA,transAY:e.transA},this.transformGroup.animate({translateX:0,translateY:0,scaleX:1,scaleY:1})):(k=d.transA/r.transAX,l=e.transA/r.transAY,p=d.toPixels(r.originX,!0),q=e.toPixels(r.originY,!0),.99<k&&1.01>k&&.99<l&&1.01>l&&(l=k=1,p=Math.round(p),q=Math.round(q)),t=this.transformGroup,f.renderer.globalAnimation?(h=t.attr("translateX"),v=t.attr("translateY"),x=t.attr("scaleX"),y=t.attr("scaleY"),t.attr({animator:0}).animate({animator:1},{step:function(a,b){t.attr({translateX:h+
(p-h)*b.pos,translateY:v+(q-v)*b.pos,scaleX:x+(k-x)*b.pos,scaleY:y+(l-y)*b.pos})}})):t.attr({translateX:p,translateY:q,scaleX:k,scaleY:l}));c||a.group.element.setAttribute("stroke-width",a.options[a.pointAttrToOptions&&a.pointAttrToOptions["stroke-width"]||"borderWidth"]/(k||1));this.drawMapDataLabels()},drawMapDataLabels:function(){x.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)},render:function(){var a=this,c=x.prototype.render;a.chart.renderer.isVML&&
3E3<a.data.length?setTimeout(function(){c.call(a)}):c.call(a)},animate:function(a){var b=this.options.animation,c=this.group,d=this.xAxis,e=this.yAxis,f=d.pos,k=e.pos;this.chart.renderer.isSVG&&(!0===b&&(b={duration:1E3}),a?c.attr({translateX:f+d.len/2,translateY:k+e.len/2,scaleX:.001,scaleY:.001}):(c.animate({translateX:f,translateY:k,scaleX:1,scaleY:1},b),this.animate=null))},animateDrilldown:function(a){var b=this.chart.plotBox,c=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],
d=c.bBox,e=this.chart.options.drilldown.animation;a||(a=Math.min(d.width/b.width,d.height/b.height),c.shapeArgs={scaleX:a,scaleY:a,translateX:d.x,translateY:d.y},D(this.points,function(a){a.graphic&&a.graphic.attr(c.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},e)}),this.animate=null)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,animateDrillupFrom:function(a){n.column.prototype.animateDrillupFrom.call(this,a)},animateDrillupTo:function(a){n.column.prototype.animateDrillupTo.call(this,
a)}}),f({applyOptions:function(a,c){a=q.prototype.applyOptions.call(this,a,c);c=this.series;var b=c.joinBy;c.mapData&&((b=void 0!==a[b[1]]&&c.mapMap[a[b[1]]])?(c.xyFromShape&&(a.x=b._midX,a.y=b._midY),f(a,b)):a.value=a.value||null);return a},onMouseOver:function(a){clearTimeout(this.colorInterval);if(null!==this.value)q.prototype.onMouseOver.call(this,a);else this.series.onMouseOut(a)},onMouseOut:function(){var a=this,c=+new Date,d=y(this.series.pointAttribs(a).fill),e=y(this.series.pointAttribs(a,
"hover").fill),f=a.series.options.states.normal.animation,k=f&&(f.duration||500);k&&4===d.rgba.length&&4===e.rgba.length&&"select"!==a.state&&(clearTimeout(a.colorInterval),a.colorInterval=setInterval(function(){var b=(new Date-c)/k,g=a.graphic;1<b&&(b=1);g&&g.attr("fill",F.prototype.tweenColors.call(0,e,d,b));1<=b&&clearTimeout(a.colorInterval)},13),a.isFading=!0);q.prototype.onMouseOut.call(a);a.isFading=null},zoomTo:function(){var a=this.series;a.xAxis.setExtremes(this._minX,this._maxX,!1);a.yAxis.setExtremes(this._minY,
this._maxY,!1);a.chart.redraw()}},A))})(I);(function(a){var y=a.seriesType,F=a.seriesTypes;y("mapline","map",{lineWidth:1,fillColor:"none"},{type:"mapline",colorProp:"stroke",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,y){a=F.map.prototype.pointAttribs.call(this,a,y);a.fill=this.options.fillColor;return a},drawLegendSymbol:F.line.prototype.drawLegendSymbol})})(I);(function(a){var y=a.merge,F=a.Point;a=a.seriesType;a("mappoint","scatter",{dataLabels:{enabled:!0,
formatter:function(){return this.point.name},crop:!1,defer:!1,overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0},{applyOptions:function(a,D){a=void 0!==a.lat&&void 0!==a.lon?y(a,this.series.chart.fromLatLonToPoint(a)):a;return F.prototype.applyOptions.call(this,a,D)}})})(I);(function(a){var y=a.arrayMax,F=a.arrayMin,A=a.Axis,D=a.color,f=a.each,k=a.isNumber,r=a.noop,t=a.pick,e=a.pInt,p=a.Point,d=a.Series,q=a.seriesType,x=a.seriesTypes;q("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},
inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["markerGroup","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",pointAttribs:function(a,e){var f=t(this.options.marker.fillOpacity,
.5);a=d.prototype.pointAttribs.call(this,a,e);1!==f&&(a.fill=D(a.fill).setOpacity(f).get("rgba"));return a},getRadii:function(a,d,e,c){var b,f,k,g=this.zData,m=[],n=this.options,p="width"!==n.sizeBy,l=n.zThreshold,q=d-a;f=0;for(b=g.length;f<b;f++)k=g[f],n.sizeByAbsoluteValue&&null!==k&&(k=Math.abs(k-l),d=Math.max(d-l,Math.abs(a-l)),a=0),null===k?k=null:k<a?k=e/2-1:(k=0<q?(k-a)/q:.5,p&&0<=k&&(k=Math.sqrt(k)),k=Math.ceil(e+k*(c-e))/2),m.push(k);this.radii=m},animate:function(a){var d=this.options.animation;
a||(f(this.points,function(a){var c=a.graphic,b;c&&c.width&&(b={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(b,d))}),this.animate=null)},translate:function(){var a,d=this.data,e,c,b=this.radii;x.scatter.prototype.translate.call(this);for(a=d.length;a--;)e=d[a],c=b?b[a]:0,k(c)&&c>=this.minPxSize/2?(e.marker={radius:c,width:2*c,height:2*c},e.dlBox={x:e.plotX-c,y:e.plotY-c,width:2*c,height:2*c}):e.shapeArgs=e.plotY=e.dlBox=void 0},alignDataLabel:x.column.prototype.alignDataLabel,
buildKDTree:r,applyZones:r},{haloPath:function(a){return p.prototype.haloPath.call(this,0===a?0:this.marker.radius+a)},ttBelow:!1});A.prototype.beforePadding=function(){var a=this,d=this.len,m=this.chart,c=0,b=d,p=this.isXAxis,q=p?"xData":"yData",g=this.min,r={},x=Math.min(m.plotWidth,m.plotHeight),A=Number.MAX_VALUE,l=-Number.MAX_VALUE,B=this.max-g,D=d/B,I=[];f(this.series,function(b){var c=b.options;!b.bubblePadding||!b.visible&&m.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=!0,I.push(b),
p&&(f(["minSize","maxSize"],function(a){var b=c[a],d=/%$/.test(b),b=e(b);r[a]=d?x*b/100:b}),b.minPxSize=r.minSize,b.maxPxSize=Math.max(r.maxSize,r.minSize),b=b.zData,b.length&&(A=t(c.zMin,Math.min(A,Math.max(F(b),!1===c.displayNegative?c.zThreshold:-Number.MAX_VALUE))),l=t(c.zMax,Math.max(l,y(b))))))});f(I,function(d){var e=d[q],f=e.length,m;p&&d.getRadii(A,l,d.minPxSize,d.maxPxSize);if(0<B)for(;f--;)k(e[f])&&a.dataMin<=e[f]&&e[f]<=a.dataMax&&(m=d.radii[f],c=Math.min((e[f]-g)*D-m,c),b=Math.max((e[f]-
g)*D+m,b))});I.length&&0<B&&!this.isLog&&(b-=d,D*=(d+c-b)/d,f([["min","userMin",c],["max","userMax",b]],function(b){void 0===t(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/D)}))}})(I);(function(a){var y=a.merge,F=a.Point,A=a.seriesType,D=a.seriesTypes;D.bubble&&A("mapbubble","bubble",{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,type:"mapbubble",pointArrayMap:["z"],getMapData:D.map.prototype.getMapData,getBox:D.map.prototype.getBox,setData:D.map.prototype.setData},
{applyOptions:function(a,k){return a&&void 0!==a.lat&&void 0!==a.lon?F.prototype.applyOptions.call(this,y(a,this.series.chart.fromLatLonToPoint(a)),k):D.map.prototype.pointClass.prototype.applyOptions.call(this,a,k)},ttBelow:!1})})(I);(function(a){var y=a.colorPointMixin,F=a.each,A=a.merge,D=a.noop,f=a.pick,k=a.Series,r=a.seriesType,t=a.seriesTypes;r("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",
crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}\x3cbr/\x3e"},states:{normal:{animation:!0},hover:{halo:!1,brightness:.2}}},A(a.colorSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,supportsDrilldown:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){var a;t.scatter.prototype.init.apply(this,arguments);a=this.options;a.pointRange=f(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1},translate:function(){var a=
this.options,f=this.xAxis,d=this.yAxis,k=function(a,d,e){return Math.min(Math.max(d,a),e)};this.generatePoints();F(this.points,function(e){var p=(a.colsize||1)/2,n=(a.rowsize||1)/2,m=k(Math.round(f.len-f.translate(e.x-p,0,1,0,1)),-f.len,2*f.len),p=k(Math.round(f.len-f.translate(e.x+p,0,1,0,1)),-f.len,2*f.len),c=k(Math.round(d.translate(e.y-n,0,1,0,1)),-d.len,2*d.len),n=k(Math.round(d.translate(e.y+n,0,1,0,1)),-d.len,2*d.len);e.plotX=e.clientX=(m+p)/2;e.plotY=(c+n)/2;e.shapeType="rect";e.shapeArgs=
{x:Math.min(m,p),y:Math.min(c,n),width:Math.abs(p-m),height:Math.abs(n-c)}});this.translateColors()},drawPoints:function(){t.column.prototype.drawPoints.call(this);F(this.points,function(a){a.graphic.attr(this.colorAttribs(a))},this)},animate:D,getBox:D,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,alignDataLabel:t.column.prototype.alignDataLabel,getExtremes:function(){k.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;k.prototype.getExtremes.call(this)}}),
y)})(I);(function(a){function y(a,f){var d,e,k,p=!1,n=a.x,m=a.y;a=0;for(d=f.length-1;a<f.length;d=a++)e=f[a][1]>m,k=f[d][1]>m,e!==k&&n<(f[d][0]-f[a][0])*(m-f[a][1])/(f[d][1]-f[a][1])+f[a][0]&&(p=!p);return p}var F=a.Chart,A=a.each,D=a.extend,f=a.format,k=a.merge,r=a.win,t=a.wrap;F.prototype.transformFromLatLon=function(e,f){if(void 0===r.proj4)return a.error(21),{x:0,y:null};e=r.proj4(f.crs,[e.lon,e.lat]);var d=f.cosAngle||f.rotation&&Math.cos(f.rotation),k=f.sinAngle||f.rotation&&Math.sin(f.rotation);
e=f.rotation?[e[0]*d+e[1]*k,-e[0]*k+e[1]*d]:e;return{x:((e[0]-(f.xoffset||0))*(f.scale||1)+(f.xpan||0))*(f.jsonres||1)+(f.jsonmarginX||0),y:(((f.yoffset||0)-e[1])*(f.scale||1)+(f.ypan||0))*(f.jsonres||1)-(f.jsonmarginY||0)}};F.prototype.transformToLatLon=function(e,f){if(void 0===r.proj4)a.error(21);else{e={x:((e.x-(f.jsonmarginX||0))/(f.jsonres||1)-(f.xpan||0))/(f.scale||1)+(f.xoffset||0),y:((-e.y-(f.jsonmarginY||0))/(f.jsonres||1)+(f.ypan||0))/(f.scale||1)+(f.yoffset||0)};var d=f.cosAngle||f.rotation&&
Math.cos(f.rotation),k=f.sinAngle||f.rotation&&Math.sin(f.rotation);f=r.proj4(f.crs,"WGS84",f.rotation?{x:e.x*d+e.y*-k,y:e.x*k+e.y*d}:e);return{lat:f.y,lon:f.x}}};F.prototype.fromPointToLatLon=function(e){var f=this.mapTransforms,d;if(f){for(d in f)if(f.hasOwnProperty(d)&&f[d].hitZone&&y({x:e.x,y:-e.y},f[d].hitZone.coordinates[0]))return this.transformToLatLon(e,f[d]);return this.transformToLatLon(e,f["default"])}a.error(22)};F.prototype.fromLatLonToPoint=function(e){var f=this.mapTransforms,d,k;
if(!f)return a.error(22),{x:0,y:null};for(d in f)if(f.hasOwnProperty(d)&&f[d].hitZone&&(k=this.transformFromLatLon(e,f[d]),y({x:k.x,y:-k.y},f[d].hitZone.coordinates[0])))return k;return this.transformFromLatLon(e,f["default"])};a.geojson=function(a,k,d){var e=[],p=[],r=function(a){var d,c=a.length;p.push("M");for(d=0;d<c;d++)1===d&&p.push("L"),p.push(a[d][0],-a[d][1])};k=k||"map";A(a.features,function(a){var d=a.geometry,c=d.type,d=d.coordinates;a=a.properties;var b;p=[];"map"===k||"mapbubble"===
k?("Polygon"===c?(A(d,r),p.push("Z")):"MultiPolygon"===c&&(A(d,function(a){A(a,r)}),p.push("Z")),p.length&&(b={path:p})):"mapline"===k?("LineString"===c?r(d):"MultiLineString"===c&&A(d,r),p.length&&(b={path:p})):"mappoint"===k&&"Point"===c&&(b={x:d[0],y:-d[1]});b&&e.push(D(b,{name:a.name||a.NAME,properties:a}))});d&&a.copyrightShort&&(d.chart.mapCredits=f(d.chart.options.credits.mapText,{geojson:a}),d.chart.mapCreditsFull=f(d.chart.options.credits.mapTextFull,{geojson:a}));return e};t(F.prototype,
"addCredits",function(a,f){f=k(!0,this.options.credits,f);this.mapCredits&&(f.href=null);a.call(this,f);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})})(I);(function(a){function y(a,e,f,k,n,m,c,b){return["M",a+n,e,"L",a+f-m,e,"C",a+f-m/2,e,a+f,e+m/2,a+f,e+m,"L",a+f,e+k-c,"C",a+f,e+k-c/2,a+f-c/2,e+k,a+f-c,e+k,"L",a+b,e+k,"C",a+b/2,e+k,a,e+k-b/2,a,e+k-b,"L",a,e+n,"C",a,e+n/2,a+n/2,e,a+n,e,"Z"]}var F=a.Chart,A=a.defaultOptions,D=a.each,f=a.extend,k=a.merge,r=a.pick,
t=a.Renderer,e=a.SVGRenderer,p=a.VMLRenderer;f(A.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});A.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5,style:{fontSize:"15px",fontWeight:"bold"},theme:{"stroke-width":1,"text-align":"center"}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}},mouseWheelSensitivity:1.1};a.splitPath=function(a){var d;a=a.replace(/([A-Za-z])/g,
" $1 ");a=a.replace(/^\s*/,"").replace(/\s*$/,"");a=a.split(/[ ,]+/);for(d=0;d<a.length;d++)/[a-zA-Z]/.test(a[d])||(a[d]=parseFloat(a[d]));return a};a.maps={};e.prototype.symbols.topbutton=function(a,e,f,k,n){return y(a-1,e-1,f,k,n.r,n.r,0,0)};e.prototype.symbols.bottombutton=function(a,e,f,k,n){return y(a-1,e-1,f,k,0,0,n.r,n.r)};t===p&&D(["topbutton","bottombutton"],function(a){p.prototype.symbols[a]=e.prototype.symbols[a]});a.Map=a.mapChart=function(d,e,f){var p="string"===typeof d||d.nodeName,
n=arguments[p?1:0],m={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},c,b=a.getOptions().credits;c=n.series;n.series=null;n=k({chart:{panning:"xy",type:"map"},credits:{mapText:r(b.mapText,' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),mapTextFull:r(b.mapTextFull,"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:m,yAxis:k(m,{reversed:!0})},n,{chart:{inverted:!1,alignTicks:!1}});n.series=c;return p?new F(d,n,f):new F(n,e)}})(I);return I});

},{}],2:[function(require,module,exports){
/*
 Highstock JS v5.0.7 (2017-01-17)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(K,a){"object"===typeof module&&module.exports?module.exports=K.document?a(K):a:K.Highcharts=a(K)})("undefined"!==typeof window?window:this,function(K){K=function(){var a=window,E=a.document,D=a.navigator&&a.navigator.userAgent||"",H=E&&E.createElementNS&&!!E.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,I=/(edge|msie|trident)/i.test(D)&&!window.opera,v=!H,n=/Firefox/.test(D),m=n&&4>parseInt(D.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highstock",
version:"5.0.7",deg2rad:2*Math.PI/360,doc:E,hasBidiBug:m,hasTouch:E&&void 0!==E.documentElement.ontouchstart,isMS:I,isWebKit:/AppleWebKit/.test(D),isFirefox:n,isTouchDevice:/(Mobile|Android|Windows Phone)/.test(D),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:H,vml:v,win:a,charts:[],marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){}}}();(function(a){var E=[],D=a.charts,H=a.doc,I=a.win;a.error=function(v,n){v=a.isNumber(v)?"Highcharts error #"+
v+": www.highcharts.com/errors/"+v:v;if(n)throw Error(v);I.console&&console.log(v)};a.Fx=function(a,n,m){this.options=n;this.elem=a;this.prop=m};a.Fx.prototype={dSetter:function(){var a=this.paths[0],n=this.paths[1],m=[],z=this.now,t=a.length,q;if(1===z)m=this.toD;else if(t===n.length&&1>z)for(;t--;)q=parseFloat(a[t]),m[t]=isNaN(q)?a[t]:z*parseFloat(n[t]-q)+q;else m=n;this.elem.attr("d",m,null,!0)},update:function(){var a=this.elem,n=this.prop,m=this.now,z=this.options.step;if(this[n+"Setter"])this[n+
"Setter"]();else a.attr?a.element&&a.attr(n,m,null,!0):a.style[n]=m+this.unit;z&&z.call(a,m,this)},run:function(a,n,m){var v=this,t=function(a){return t.stopped?!1:v.step(a)},q;this.startTime=+new Date;this.start=a;this.end=n;this.unit=m;this.now=this.start;this.pos=0;t.elem=this.elem;t.prop=this.prop;t()&&1===E.push(t)&&(t.timerId=setInterval(function(){for(q=0;q<E.length;q++)E[q]()||E.splice(q--,1);E.length||clearInterval(t.timerId)},13))},step:function(a){var n=+new Date,m,v=this.options;m=this.elem;
var t=v.complete,q=v.duration,e=v.curAnim,b;if(m.attr&&!m.element)m=!1;else if(a||n>=q+this.startTime){this.now=this.end;this.pos=1;this.update();a=e[this.prop]=!0;for(b in e)!0!==e[b]&&(a=!1);a&&t&&t.call(m);m=!1}else this.pos=v.easing((n-this.startTime)/q),this.now=this.start+(this.end-this.start)*this.pos,this.update(),m=!0;return m},initPath:function(v,n,m){function z(a){var d,f;for(F=a.length;F--;)d="M"===a[F]||"L"===a[F],f=/[a-zA-Z]/.test(a[F+3]),d&&f&&a.splice(F+1,0,a[F+1],a[F+2],a[F+1],a[F+
2])}function t(a,d){for(;a.length<l;){a[0]=d[l-a.length];var f=a.slice(0,k);[].splice.apply(a,[0,0].concat(f));r&&(f=a.slice(a.length-k),[].splice.apply(a,[a.length,0].concat(f)),F--)}a[0]="M"}function q(a,d){for(var f=(l-a.length)/k;0<f&&f--;)g=a.slice().splice(a.length/u-k,k*u),g[0]=d[l-k-f*k],w&&(g[k-6]=g[k-2],g[k-5]=g[k-1]),[].splice.apply(a,[a.length/u,0].concat(g)),r&&f--}n=n||"";var e,b=v.startX,p=v.endX,w=-1<n.indexOf("C"),k=w?7:3,l,g,F;n=n.split(" ");m=m.slice();var r=v.isArea,u=r?2:1,f;
w&&(z(n),z(m));if(b&&p){for(F=0;F<b.length;F++)if(b[F]===p[0]){e=F;break}else if(b[0]===p[p.length-b.length+F]){e=F;f=!0;break}void 0===e&&(n=[])}n.length&&a.isNumber(e)&&(l=m.length+e*u*k,f?(t(n,m),q(m,n)):(t(m,n),q(n,m)));return[n,m]}};a.extend=function(a,n){var m;a||(a={});for(m in n)a[m]=n[m];return a};a.merge=function(){var v,n=arguments,m,z={},t=function(q,e){var b,p;"object"!==typeof q&&(q={});for(p in e)e.hasOwnProperty(p)&&(b=e[p],a.isObject(b,!0)&&"renderTo"!==p&&"number"!==typeof b.nodeType?
q[p]=t(q[p]||{},b):q[p]=e[p]);return q};!0===n[0]&&(z=n[1],n=Array.prototype.slice.call(n,2));m=n.length;for(v=0;v<m;v++)z=t(z,n[v]);return z};a.pInt=function(a,n){return parseInt(a,n||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(v,n){return v&&"object"===typeof v&&(!n||!a.isArray(v))};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)};a.erase=
function(a,n){for(var m=a.length;m--;)if(a[m]===n){a.splice(m,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(v,n,m){var z,t;if(a.isString(n))a.defined(m)?v.setAttribute(n,m):v&&v.getAttribute&&(t=v.getAttribute(n));else if(a.defined(n)&&a.isObject(n))for(z in n)v.setAttribute(z,n[z]);return t};a.splat=function(v){return a.isArray(v)?v:[v]};a.syncTimeout=function(a,n,m){if(n)return setTimeout(a,n,m);a.call(0,m)};a.pick=function(){var a=arguments,n,m,z=a.length;for(n=
0;n<z;n++)if(m=a[n],void 0!==m&&null!==m)return m};a.css=function(v,n){a.isMS&&!a.svg&&n&&void 0!==n.opacity&&(n.filter="alpha(opacity\x3d"+100*n.opacity+")");a.extend(v.style,n)};a.createElement=function(v,n,m,z,t){v=H.createElement(v);var q=a.css;n&&a.extend(v,n);t&&q(v,{padding:0,border:"none",margin:0});m&&q(v,m);z&&z.appendChild(v);return v};a.extendClass=function(v,n){var m=function(){};m.prototype=new v;a.extend(m.prototype,n);return m};a.pad=function(a,n,m){return Array((n||2)+1-String(a).length).join(m||
0)+a};a.relativeLength=function(a,n){return/%$/.test(a)?n*parseFloat(a)/100:parseFloat(a)};a.wrap=function(a,n,m){var v=a[n];a[n]=function(){var a=Array.prototype.slice.call(arguments),q=arguments,e=this;e.proceed=function(){v.apply(e,arguments.length?arguments:q)};a.unshift(v);a=m.apply(this,a);e.proceed=null;return a}};a.getTZOffset=function(v){var n=a.Date;return 6E4*(n.hcGetTimezoneOffset&&n.hcGetTimezoneOffset(v)||n.hcTimezoneOffset||0)};a.dateFormat=function(v,n,m){if(!a.defined(n)||isNaN(n))return a.defaultOptions.lang.invalidDate||
"";v=a.pick(v,"%Y-%m-%d %H:%M:%S");var z=a.Date,t=new z(n-a.getTZOffset(n)),q,e=t[z.hcGetHours](),b=t[z.hcGetDay](),p=t[z.hcGetDate](),w=t[z.hcGetMonth](),k=t[z.hcGetFullYear](),l=a.defaultOptions.lang,g=l.weekdays,F=l.shortWeekdays,r=a.pad,z=a.extend({a:F?F[b]:g[b].substr(0,3),A:g[b],d:r(p),e:r(p,2," "),w:b,b:l.shortMonths[w],B:l.months[w],m:r(w+1),y:k.toString().substr(2,2),Y:k,H:r(e),k:e,I:r(e%12||12),l:e%12||12,M:r(t[z.hcGetMinutes]()),p:12>e?"AM":"PM",P:12>e?"am":"pm",S:r(t.getSeconds()),L:r(Math.round(n%
1E3),3)},a.dateFormats);for(q in z)for(;-1!==v.indexOf("%"+q);)v=v.replace("%"+q,"function"===typeof z[q]?z[q](n):z[q]);return m?v.substr(0,1).toUpperCase()+v.substr(1):v};a.formatSingle=function(v,n){var m=/\.([0-9])/,z=a.defaultOptions.lang;/f$/.test(v)?(m=(m=v.match(m))?m[1]:-1,null!==n&&(n=a.numberFormat(n,m,z.decimalPoint,-1<v.indexOf(",")?z.thousandsSep:""))):n=a.dateFormat(v,n);return n};a.format=function(v,n){for(var m="{",z=!1,t,q,e,b,p=[],w;v;){m=v.indexOf(m);if(-1===m)break;t=v.slice(0,
m);if(z){t=t.split(":");q=t.shift().split(".");b=q.length;w=n;for(e=0;e<b;e++)w=w[q[e]];t.length&&(w=a.formatSingle(t.join(":"),w));p.push(w)}else p.push(t);v=v.slice(m+1);m=(z=!z)?"}":"{"}p.push(v);return p.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(v,n,m,z,t){var q,e=v;m=a.pick(m,1);q=v/m;n||(n=t?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===z&&(1===m?n=a.grep(n,function(a){return 0===a%1}):.1>=m&&(n=[1/m])));
for(z=0;z<n.length&&!(e=n[z],t&&e*m>=v||!t&&q<=(n[z]+(n[z+1]||n[z]))/2);z++);return e=a.correctFloat(e*m,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,n){var m=a.length,v,t;for(t=0;t<m;t++)a[t].safeI=t;a.sort(function(a,e){v=n(a,e);return 0===v?a.safeI-e.safeI:v});for(t=0;t<m;t++)delete a[t].safeI};a.arrayMin=function(a){for(var n=a.length,m=a[0];n--;)a[n]<m&&(m=a[n]);return m};a.arrayMax=function(a){for(var n=a.length,m=a[0];n--;)a[n]>m&&(m=a[n]);return m};a.destroyObjectProperties=
function(a,n){for(var m in a)a[m]&&a[m]!==n&&a[m].destroy&&a[m].destroy(),delete a[m]};a.discardElement=function(v){var n=a.garbageBin;n||(n=a.createElement("div"));v&&n.appendChild(v);n.innerHTML=""};a.correctFloat=function(a,n){return parseFloat(a.toPrecision(n||14))};a.setAnimation=function(v,n){n.renderer.globalAnimation=a.pick(v,n.options.chart.animation,!0)};a.animObject=function(v){return a.isObject(v)?a.merge(v):{duration:v?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,
day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(v,n,m,z){v=+v||0;n=+n;var t=a.defaultOptions.lang,q=(v.toString().split(".")[1]||"").length,e,b;-1===n?n=Math.min(q,20):a.isNumber(n)||(n=2);b=(Math.abs(v)+Math.pow(10,-Math.max(n,q)-1)).toFixed(n);q=String(a.pInt(b));e=3<q.length?q.length%3:0;m=a.pick(m,t.decimalPoint);z=a.pick(z,t.thousandsSep);v=(0>v?"-":"")+(e?q.substr(0,e)+z:"");v+=q.substr(e).replace(/(\d{3})(?=\d)/g,"$1"+z);n&&(v+=m+b.slice(-n));return v};Math.easeInOutSine=
function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(v,n){return"width"===n?Math.min(v.offsetWidth,v.scrollWidth)-a.getStyle(v,"padding-left")-a.getStyle(v,"padding-right"):"height"===n?Math.min(v.offsetHeight,v.scrollHeight)-a.getStyle(v,"padding-top")-a.getStyle(v,"padding-bottom"):(v=I.getComputedStyle(v,void 0))&&a.pInt(v.getPropertyValue(n))};a.inArray=function(a,n){return n.indexOf?n.indexOf(a):[].indexOf.call(n,a)};a.grep=function(a,n){return[].filter.call(a,n)};a.find=function(a,
n){return[].find.call(a,n)};a.map=function(a,n){for(var m=[],z=0,t=a.length;z<t;z++)m[z]=n.call(a[z],a[z],z,a);return m};a.offset=function(a){var n=H.documentElement;a=a.getBoundingClientRect();return{top:a.top+(I.pageYOffset||n.scrollTop)-(n.clientTop||0),left:a.left+(I.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}};a.stop=function(a,n){for(var m=E.length;m--;)E[m].elem!==a||n&&n!==E[m].prop||(E[m].stopped=!0)};a.each=function(a,n,m){return Array.prototype.forEach.call(a,n,m)};a.addEvent=function(v,
n,m){function z(a){a.target=a.srcElement||I;m.call(v,a)}var t=v.hcEvents=v.hcEvents||{};v.addEventListener?v.addEventListener(n,m,!1):v.attachEvent&&(v.hcEventsIE||(v.hcEventsIE={}),v.hcEventsIE[m.toString()]=z,v.attachEvent("on"+n,z));t[n]||(t[n]=[]);t[n].push(m);return function(){a.removeEvent(v,n,m)}};a.removeEvent=function(v,n,m){function z(a,b){v.removeEventListener?v.removeEventListener(a,b,!1):v.attachEvent&&(b=v.hcEventsIE[b.toString()],v.detachEvent("on"+a,b))}function t(){var a,b;if(v.nodeName)for(b in n?
(a={},a[n]=!0):a=e,a)if(e[b])for(a=e[b].length;a--;)z(b,e[b][a])}var q,e=v.hcEvents,b;e&&(n?(q=e[n]||[],m?(b=a.inArray(m,q),-1<b&&(q.splice(b,1),e[n]=q),z(n,m)):(t(),e[n]=[])):(t(),v.hcEvents={}))};a.fireEvent=function(v,n,m,z){var t;t=v.hcEvents;var q,e;m=m||{};if(H.createEvent&&(v.dispatchEvent||v.fireEvent))t=H.createEvent("Events"),t.initEvent(n,!0,!0),a.extend(t,m),v.dispatchEvent?v.dispatchEvent(t):v.fireEvent(n,t);else if(t)for(t=t[n]||[],q=t.length,m.target||a.extend(m,{preventDefault:function(){m.defaultPrevented=
!0},target:v,type:n}),n=0;n<q;n++)(e=t[n])&&!1===e.call(v,m)&&m.preventDefault();z&&!m.defaultPrevented&&z(m)};a.animate=function(v,n,m){var z,t="",q,e,b;a.isObject(m)||(z=arguments,m={duration:z[2],easing:z[3],complete:z[4]});a.isNumber(m.duration)||(m.duration=400);m.easing="function"===typeof m.easing?m.easing:Math[m.easing]||Math.easeInOutSine;m.curAnim=a.merge(n);for(b in n)a.stop(v,b),e=new a.Fx(v,m,b),q=null,"d"===b?(e.paths=e.initPath(v,v.d,n.d),e.toD=n.d,z=0,q=1):v.attr?z=v.attr(b):(z=parseFloat(a.getStyle(v,
b))||0,"opacity"!==b&&(t="px")),q||(q=n[b]),q.match&&q.match("px")&&(q=q.replace(/px/g,"")),e.run(z,q,t)};a.seriesType=function(v,n,m,z,t){var q=a.getOptions(),e=a.seriesTypes;q.plotOptions[v]=a.merge(q.plotOptions[n],m);e[v]=a.extendClass(e[n]||function(){},z);e[v].prototype.type=v;t&&(e[v].prototype.pointClass=a.extendClass(a.Point,t));return e[v]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),n=0;return function(){return"highcharts-"+a+"-"+n++}}();I.jQuery&&(I.jQuery.fn.highcharts=
function(){var v=[].slice.call(arguments);if(this[0])return v[0]?(new (a[a.isString(v[0])?v.shift():"Chart"])(this[0],v[0],v[1]),this):D[a.attr(this[0],"data-highcharts-chart")]});H&&!H.defaultView&&(a.getStyle=function(v,n){var m={width:"clientWidth",height:"clientHeight"}[n];if(v.style[n])return a.pInt(v.style[n]);"opacity"===n&&(n="filter");if(m)return v.style.zoom=1,Math.max(v[m]-2*a.getStyle(v,"padding"),0);v=v.currentStyle[n.replace(/\-(\w)/g,function(a,t){return t.toUpperCase()})];"filter"===
n&&(v=v.replace(/alpha\(opacity=([0-9]+)\)/,function(a,t){return t/100}));return""===v?1:a.pInt(v)});Array.prototype.forEach||(a.each=function(a,n,m){for(var z=0,t=a.length;z<t;z++)if(!1===n.call(m,a[z],z,a))return z});Array.prototype.indexOf||(a.inArray=function(a,n){var m,z=0;if(n)for(m=n.length;z<m;z++)if(n[z]===a)return z;return-1});Array.prototype.filter||(a.grep=function(a,n){for(var m=[],z=0,t=a.length;z<t;z++)n(a[z],z)&&m.push(a[z]);return m});Array.prototype.find||(a.find=function(a,n){var m,
z=a.length;for(m=0;m<z;m++)if(n(a[m],m))return a[m]})})(K);(function(a){var E=a.each,D=a.isNumber,H=a.map,I=a.merge,v=a.pInt;a.Color=function(n){if(!(this instanceof a.Color))return new a.Color(n);this.init(n)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[v(a[1]),v(a[2]),v(a[3]),parseFloat(a[4],10)]}},{regex:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,parse:function(a){return[v(a[1],
16),v(a[2],16),v(a[3],16),1]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[v(a[1]),v(a[2]),v(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(n){var m,z,t,q;if((this.input=n=this.names[n]||n)&&n.stops)this.stops=H(n.stops,function(e){return new a.Color(e[1])});else for(t=this.parsers.length;t--&&!z;)q=this.parsers[t],(m=q.regex.exec(n))&&(z=q.parse(m));this.rgba=z||[]},get:function(a){var m=this.input,n=this.rgba,t;this.stops?
(t=I(m),t.stops=[].concat(t.stops),E(this.stops,function(q,e){t.stops[e]=[t.stops[e][0],q.get(a)]})):t=n&&D(n[0])?"rgb"===a||!a&&1===n[3]?"rgb("+n[0]+","+n[1]+","+n[2]+")":"a"===a?n[3]:"rgba("+n.join(",")+")":m;return t},brighten:function(a){var m,n=this.rgba;if(this.stops)E(this.stops,function(t){t.brighten(a)});else if(D(a)&&0!==a)for(m=0;3>m;m++)n[m]+=v(255*a),0>n[m]&&(n[m]=0),255<n[m]&&(n[m]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this}};a.color=function(n){return new a.Color(n)}})(K);
(function(a){var E,D,H=a.addEvent,I=a.animate,v=a.attr,n=a.charts,m=a.color,z=a.css,t=a.createElement,q=a.defined,e=a.deg2rad,b=a.destroyObjectProperties,p=a.doc,w=a.each,k=a.extend,l=a.erase,g=a.grep,F=a.hasTouch,r=a.inArray,u=a.isArray,f=a.isFirefox,B=a.isMS,d=a.isObject,x=a.isString,c=a.isWebKit,y=a.merge,L=a.noop,A=a.pick,J=a.pInt,h=a.removeEvent,G=a.stop,Q=a.svg,P=a.SVG_NS,N=a.symbolSizes,S=a.win;E=a.SVGElement=function(){return this};E.prototype={opacity:1,SVG_NS:P,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textOutline".split(" "),
init:function(a,h){this.element="span"===h?t(h):p.createElementNS(this.SVG_NS,h);this.renderer=a},animate:function(C,h,d){h=a.animObject(A(h,this.renderer.globalAnimation,!0));0!==h.duration?(d&&(h.complete=d),I(this,C,h)):this.attr(C,null,d);return this},colorGradient:function(C,h,d){var c=this.renderer,f,G,b,A,g,B,x,M,l,r,k,J=[],e;C.linearGradient?G="linearGradient":C.radialGradient&&(G="radialGradient");if(G){b=C[G];g=c.gradients;x=C.stops;r=d.radialReference;u(b)&&(C[G]=b={x1:b[0],y1:b[1],x2:b[2],
y2:b[3],gradientUnits:"userSpaceOnUse"});"radialGradient"===G&&r&&!q(b.gradientUnits)&&(A=b,b=y(b,c.getRadialAttr(r,A),{gradientUnits:"userSpaceOnUse"}));for(k in b)"id"!==k&&J.push(k,b[k]);for(k in x)J.push(x[k]);J=J.join(",");g[J]?r=g[J].attr("id"):(b.id=r=a.uniqueKey(),g[J]=B=c.createElement(G).attr(b).add(c.defs),B.radAttr=A,B.stops=[],w(x,function(C){0===C[1].indexOf("rgba")?(f=a.color(C[1]),M=f.get("rgb"),l=f.get("a")):(M=C[1],l=1);C=c.createElement("stop").attr({offset:C[0],"stop-color":M,
"stop-opacity":l}).add(B);B.stops.push(C)}));e="url("+c.url+"#"+r+")";d.setAttribute(h,e);d.gradient=J;C.toString=function(){return e}}},applyTextOutline:function(a){var C=this.element,h,d,c,f;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(C.style.fill)));this.fakeTS=!0;this.ySetter=this.xSetter;h=[].slice.call(C.getElementsByTagName("tspan"));a=a.split(" ");d=a[a.length-1];(c=a[0])&&"none"!==c&&(c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,C,h){return 2*C+h}),w(h,function(a){"highcharts-text-outline"===
a.getAttribute("class")&&l(h,C.removeChild(a))}),f=C.firstChild,w(h,function(a,h){0===h&&(a.setAttribute("x",C.getAttribute("x")),h=C.getAttribute("y"),a.setAttribute("y",h||0),null===h&&C.setAttribute("y",0));a=a.cloneNode(1);v(a,{"class":"highcharts-text-outline",fill:d,stroke:d,"stroke-width":c,"stroke-linejoin":"round"});C.insertBefore(a,f)}))},attr:function(a,h,d,c){var C,f=this.element,b,y=this,A;"string"===typeof a&&void 0!==h&&(C=a,a={},a[C]=h);if("string"===typeof a)y=(this[a+"Getter"]||
this._defaultGetter).call(this,a,f);else{for(C in a)h=a[C],A=!1,c||G(this,C),this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(C)&&(b||(this.symbolAttr(a),b=!0),A=!0),!this.rotation||"x"!==C&&"y"!==C||(this.doTransform=!0),A||(A=this[C+"Setter"]||this._defaultSetter,A.call(this,h,C,f),this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(C)&&this.updateShadows(C,h,A));this.doTransform&&(this.updateTransform(),this.doTransform=!1)}d&&d();return y},updateShadows:function(a,
h,d){for(var C=this.shadows,c=C.length;c--;)d.call(C[c],"height"===a?Math.max(h-(C[c].cutHeight||0),0):"d"===a?this.d:h,a,C[c])},addClass:function(a,h){var C=this.attr("class")||"";-1===C.indexOf(a)&&(h||(a=(C+(C?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==v(this.element,"class").indexOf(a)},removeClass:function(a){v(this.element,"class",(v(this.element,"class")||"").replace(a,""));return this},symbolAttr:function(a){var C=this;w("x y r start end width height innerR anchorX anchorY".split(" "),
function(h){C[h]=A(a[h],C[h])});C.attr({d:C.renderer.symbols[C.symbolName](C.x,C.y,C.width,C.height,C)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,h){var C,d={},c;h=h||a.strokeWidth||0;c=Math.round(h)%2/2;a.x=Math.floor(a.x||this.x||0)+c;a.y=Math.floor(a.y||this.y||0)+c;a.width=Math.floor((a.width||this.width||0)-2*c);a.height=Math.floor((a.height||this.height||0)-2*c);q(a.strokeWidth)&&(a.strokeWidth=h);for(C in a)this[C]!==a[C]&&
(this[C]=d[C]=a[C]);return d},css:function(a){var C=this.styles,h={},d=this.element,c,f,G="";c=!C;var b=["textOverflow","width"];a&&a.color&&(a.fill=a.color);if(C)for(f in a)a[f]!==C[f]&&(h[f]=a[f],c=!0);if(c){c=this.textWidth=a&&a.width&&"text"===d.nodeName.toLowerCase()&&J(a.width)||this.textWidth;C&&(a=k(C,h));this.styles=a;c&&!Q&&this.renderer.forExport&&delete a.width;if(B&&!Q)z(this.element,a);else{C=function(a,C){return"-"+C.toLowerCase()};for(f in a)-1===r(f,b)&&(G+=f.replace(/([A-Z])/g,C)+
":"+a[f]+";");G&&v(d,"style",G)}this.added&&(c&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},strokeWidth:function(){return this["stroke-width"]||0},on:function(a,h){var C=this,d=C.element;F&&"click"===a?(d.ontouchstart=function(a){C.touchEventFired=Date.now();a.preventDefault();h.call(d,a)},d.onclick=function(a){(-1===S.navigator.userAgent.indexOf("Android")||1100<Date.now()-(C.touchEventFired||0))&&h.call(d,a)}):d["on"+a]=h;return this},setRadialReference:function(a){var C=
this.renderer.gradients[this.element.gradient];this.element.radialReference=a;C&&C.radAttr&&C.animate(this.renderer.getRadialAttr(a,C.radAttr));return this},translate:function(a,h){return this.attr({translateX:a,translateY:h})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,h=this.translateY||0,d=this.scaleX,c=this.scaleY,f=this.inverted,G=this.rotation,b=this.element;f&&(a+=this.width,h+=this.height);a=["translate("+a+","+
h+")"];f?a.push("rotate(90) scale(-1,1)"):G&&a.push("rotate("+G+" "+(b.getAttribute("x")||0)+" "+(b.getAttribute("y")||0)+")");(q(d)||q(c))&&a.push("scale("+A(d,1)+" "+A(c,1)+")");a.length&&b.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,h,d){var C,c,f,G,b={};c=this.renderer;f=c.alignedObjects;var y,g;if(a){if(this.alignOptions=a,this.alignByTranslate=h,!d||x(d))this.alignTo=C=d||"renderer",l(f,this),f.push(this),
d=null}else a=this.alignOptions,h=this.alignByTranslate,C=this.alignTo;d=A(d,c[C],c);C=a.align;c=a.verticalAlign;f=(d.x||0)+(a.x||0);G=(d.y||0)+(a.y||0);"right"===C?y=1:"center"===C&&(y=2);y&&(f+=(d.width-(a.width||0))/y);b[h?"translateX":"x"]=Math.round(f);"bottom"===c?g=1:"middle"===c&&(g=2);g&&(G+=(d.height-(a.height||0))/g);b[h?"translateY":"y"]=Math.round(G);this[this.placed?"animate":"attr"](b);this.placed=!0;this.alignAttr=b;return this},getBBox:function(a,h){var C,d=this.renderer,c,f=this.element,
G=this.styles,b,y=this.textStr,g,B=d.cache,x=d.cacheKeys,r;h=A(h,this.rotation);c=h*e;b=G&&G.fontSize;void 0!==y&&(r=y.toString(),-1===r.indexOf("\x3c")&&(r=r.replace(/[0-9]/g,"0")),r+=["",h||0,b,G&&G.width,G&&G.textOverflow].join());r&&!a&&(C=B[r]);if(!C){if(f.namespaceURI===this.SVG_NS||d.forExport){try{(g=this.fakeTS&&function(a){w(f.querySelectorAll(".highcharts-text-outline"),function(C){C.style.display=a})})&&g("none"),C=f.getBBox?k({},f.getBBox()):{width:f.offsetWidth,height:f.offsetHeight},
g&&g("")}catch(U){}if(!C||0>C.width)C={width:0,height:0}}else C=this.htmlGetBBox();d.isSVG&&(a=C.width,d=C.height,G&&"11px"===G.fontSize&&17===Math.round(d)&&(C.height=d=14),h&&(C.width=Math.abs(d*Math.sin(c))+Math.abs(a*Math.cos(c)),C.height=Math.abs(d*Math.cos(c))+Math.abs(a*Math.sin(c))));if(r&&0<C.height){for(;250<x.length;)delete B[x.shift()];B[r]||x.push(r);B[r]=C}}return C},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},
fadeOut:function(a){var C=this;C.animate({opacity:0},{duration:a||150,complete:function(){C.attr({y:-9999})}})},add:function(a){var C=this.renderer,h=this.element,d;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;void 0!==this.textStr&&C.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)d=this.zIndexSetter();d||(a?a.element:C.box).appendChild(h);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var h=a.parentNode;h&&h.removeChild(a)},destroy:function(){var a=
this.element||{},h=this.renderer.isSVG&&"SPAN"===a.nodeName&&this.parentGroup,d,c;a.onclick=a.onmouseout=a.onmouseover=a.onmousemove=a.point=null;G(this);this.clipPath&&(this.clipPath=this.clipPath.destroy());if(this.stops){for(c=0;c<this.stops.length;c++)this.stops[c]=this.stops[c].destroy();this.stops=null}this.safeRemoveChild(a);for(this.destroyShadows();h&&h.div&&0===h.div.childNodes.length;)a=h.parentGroup,this.safeRemoveChild(h.div),delete h.div,h=a;this.alignTo&&l(this.renderer.alignedObjects,
this);for(d in this)delete this[d];return null},shadow:function(a,h,d){var C=[],c,f,G=this.element,b,y,g,B;if(!a)this.destroyShadows();else if(!this.shadows){y=A(a.width,3);g=(a.opacity||.15)/y;B=this.parentInverted?"(-1,-1)":"("+A(a.offsetX,1)+", "+A(a.offsetY,1)+")";for(c=1;c<=y;c++)f=G.cloneNode(0),b=2*y+1-2*c,v(f,{isShadow:"true",stroke:a.color||"#000000","stroke-opacity":g*c,"stroke-width":b,transform:"translate"+B,fill:"none"}),d&&(v(f,"height",Math.max(v(f,"height")-b,0)),f.cutHeight=b),h?
h.element.appendChild(f):G.parentNode.insertBefore(f,G),C.push(f);this.shadows=C}return this},destroyShadows:function(){w(this.shadows||[],function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=A(this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,h,d){a&&a.join&&(a=
a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");d.setAttribute(h,a);this[h]=a},dashstyleSetter:function(a){var h,C=this["stroke-width"];"inherit"===C&&(C=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(h=a.length;h--;)a[h]=J(a[h])*C;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",
a)}},alignSetter:function(a){this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,h,d){this[h]=a;d.setAttribute(h,a)},titleSetter:function(a){var h=this.element.getElementsByTagName("title")[0];h||(h=p.createElementNS(this.SVG_NS,"title"),this.element.appendChild(h));h.firstChild&&h.removeChild(h.firstChild);h.appendChild(p.createTextNode(String(A(a),"").replace(/<[^>]*>/g,"")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,
this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,h,d){"string"===typeof a?d.setAttribute(h,a):a&&this.colorGradient(a,h,d)},visibilitySetter:function(a,h,d){"inherit"===a?d.removeAttribute(h):d.setAttribute(h,a)},zIndexSetter:function(a,h){var C=this.renderer,d=this.parentGroup,c=(d||C).element||C.box,f,G=this.element,b;f=this.added;var y;q(a)&&(G.zIndex=a,a=+a,this[h]===a&&(f=!1),this[h]=a);if(f){(a=this.zIndex)&&d&&(d.handleZ=!0);h=c.childNodes;for(y=0;y<h.length&&
!b;y++)d=h[y],f=d.zIndex,d!==G&&(J(f)>a||!q(a)&&q(f)||0>a&&!q(f)&&c!==C.box)&&(c.insertBefore(G,d),b=!0);b||c.appendChild(G)}return b},_defaultSetter:function(a,h,d){d.setAttribute(h,a)}};E.prototype.yGetter=E.prototype.xGetter;E.prototype.translateXSetter=E.prototype.translateYSetter=E.prototype.rotationSetter=E.prototype.verticalAlignSetter=E.prototype.scaleXSetter=E.prototype.scaleYSetter=function(a,h){this[h]=a;this.doTransform=!0};E.prototype["stroke-widthSetter"]=E.prototype.strokeSetter=function(a,
h,d){this[h]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",d),d.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===h&&0===a&&this.hasStroke&&(d.removeAttribute("stroke"),this.hasStroke=!1)};D=a.SVGRenderer=function(){this.init.apply(this,arguments)};D.prototype={Element:E,SVG_NS:P,init:function(a,h,d,G,b,y){var C;G=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"}).css(this.getStyle(G));C=G.element;
a.appendChild(C);-1===a.innerHTML.indexOf("xmlns")&&v(C,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=C;this.boxWrapper=G;this.alignedObjects=[];this.url=(f||c)&&p.getElementsByTagName("base").length?S.location.href.replace(/#.*?$/,"").replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highstock 5.0.7"));this.defs=this.createElement("defs").add();this.allowHTML=y;this.forExport=b;this.gradients=
{};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(h,d,!1);var A;f&&a.getBoundingClientRect&&(h=function(){z(a,{left:0,top:0});A=a.getBoundingClientRect();z(a,{left:Math.ceil(A.left)-A.left+"px",top:Math.ceil(A.top)-A.top+"px"})},h(),this.unSubPixelFix=H(S,"resize",h))},getStyle:function(a){return this.style=k({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},
destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();b(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var h=new this.Element;h.init(this,a);return h},draw:L,getRadialAttr:function(a,h){return{cx:a[0]-a[2]/2+h.cx*a[2],cy:a[1]-a[2]/2+h.cy*a[2],r:h.r*a[2]}},buildText:function(a){var h=a.element,d=this,c=d.forExport,f=A(a.textStr,"").toString(),
C=-1!==f.indexOf("\x3c"),G=h.childNodes,b,y,B,r,x=v(h,"x"),l=a.styles,u=a.textWidth,k=l&&l.lineHeight,e=l&&l.textOutline,F=l&&"ellipsis"===l.textOverflow,L=l&&"nowrap"===l.whiteSpace,t=l&&l.fontSize,q,m=G.length,l=u&&!a.added&&this.box,n=function(a){var c;c=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:t||d.style.fontSize||12;return k?J(k):d.fontMetrics(c,a.getAttribute("style")?a:h).h};q=[f,F,L,k,e,t,u].join();if(q!==a.textCache){for(a.textCache=q;m--;)h.removeChild(G[m]);C||e||F||u||-1!==
f.indexOf(" ")?(b=/<.*class="([^"]+)".*>/,y=/<.*style="([^"]+)".*>/,B=/<.*href="(http[^"]+)".*>/,l&&l.appendChild(h),f=C?f.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g):[f],f=g(f,function(a){return""!==a}),w(f,function(f,C){var G,A=0;f=f.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");
G=f.split("|||");w(G,function(f){if(""!==f||1===G.length){var g={},l=p.createElementNS(d.SVG_NS,"tspan"),k,J;b.test(f)&&(k=f.match(b)[1],v(l,"class",k));y.test(f)&&(J=f.match(y)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),v(l,"style",J));B.test(f)&&!c&&(v(l,"onclick",'location.href\x3d"'+f.match(B)[1]+'"'),z(l,{cursor:"pointer"}));f=(f.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e");if(" "!==f){l.appendChild(p.createTextNode(f));A?g.dx=0:C&&null!==x&&(g.x=x);v(l,g);
h.appendChild(l);!A&&C&&(!Q&&c&&z(l,{display:"block"}),v(l,"dy",n(l)));if(u){g=f.replace(/([^\^])-/g,"$1- ").split(" ");k=1<G.length||C||1<g.length&&!L;for(var e,w,M=[],t=n(l),q=a.rotation,m=f,N=m.length;(k||F)&&(g.length||M.length);)a.rotation=0,e=a.getBBox(!0),w=e.width,!Q&&d.forExport&&(w=d.measureSpanWidth(l.firstChild.data,a.styles)),e=w>u,void 0===r&&(r=e),F&&r?(N/=2,""===m||!e&&.5>N?g=[]:(m=f.substring(0,m.length+(e?-1:1)*Math.ceil(N)),g=[m+(3<u?"\u2026":"")],l.removeChild(l.firstChild))):
e&&1!==g.length?(l.removeChild(l.firstChild),M.unshift(g.pop())):(g=M,M=[],g.length&&!L&&(l=p.createElementNS(P,"tspan"),v(l,{dy:t,x:x}),J&&v(l,"style",J),h.appendChild(l)),w>u&&(u=w)),g.length&&l.appendChild(p.createTextNode(g.join(" ").replace(/- /g,"-")));a.rotation=q}A++}}})}),r&&a.attr("title",a.textStr),l&&l.removeChild(h),e&&a.applyTextOutline&&a.applyTextOutline(e)):h.appendChild(p.createTextNode(f.replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))}},getContrast:function(a){a=m(a).rgba;return 510<
a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,h,d,f,c,G,b,g,A){var C=this.label(a,h,d,A,null,null,null,null,"button"),l=0;C.attr(y({padding:8,r:2},c));var r,x,u,J;c=y({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},c);r=c.style;delete c.style;G=y(c,{fill:"#e6e6e6"},G);x=G.style;delete G.style;b=y(c,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},b);u=b.style;delete b.style;g=y(c,{style:{color:"#cccccc"}},g);J=g.style;
delete g.style;H(C.element,B?"mouseover":"mouseenter",function(){3!==l&&C.setState(1)});H(C.element,B?"mouseout":"mouseleave",function(){3!==l&&C.setState(l)});C.setState=function(a){1!==a&&(C.state=l=a);C.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||0]);C.attr([c,G,b,g][a||0]).css([r,x,u,J][a||0])};C.attr(c).css(k({cursor:"default"},r));return C.on("click",function(a){3!==l&&f.call(C,a)})},crispLine:function(a,
h){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-h%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+h%2/2);return a},path:function(a){var h={fill:"none"};u(a)?h.d=a:d(a)&&k(h,a);return this.createElement("path").attr(h)},circle:function(a,h,c){a=d(a)?a:{x:a,y:h,r:c};h=this.createElement("circle");h.xSetter=h.ySetter=function(a,h,d){d.setAttribute("c"+h,a)};return h.attr(a)},arc:function(a,h,c,f,G,b){d(a)&&(h=a.y,c=a.r,f=a.innerR,G=a.start,b=a.end,a=a.x);a=this.symbol("arc",a||0,h||0,c||0,c||0,{innerR:f||
0,start:G||0,end:b||0});a.r=c;return a},rect:function(a,h,c,f,G,b){G=d(a)?a.r:G;var C=this.createElement("rect");a=d(a)?a:void 0===a?{}:{x:a,y:h,width:Math.max(c,0),height:Math.max(f,0)};void 0!==b&&(a.strokeWidth=b,a=C.crisp(a));a.fill="none";G&&(a.r=G);C.rSetter=function(a,h,d){v(d,{rx:a,ry:a})};return C.attr(a)},setSize:function(a,h,d){var c=this.alignedObjects,f=c.length;this.width=a;this.height=h;for(this.boxWrapper.animate({width:a,height:h},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+
" "+this.attr("height")})},duration:A(d,!0)?void 0:0});f--;)c[f].align()},g:function(a){var h=this.createElement("g");return a?h.attr({"class":"highcharts-"+a}):h},image:function(a,h,d,c,f){var G={preserveAspectRatio:"none"};1<arguments.length&&k(G,{x:h,y:d,width:c,height:f});G=this.createElement("image").attr(G);G.element.setAttributeNS?G.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):G.element.setAttribute("hc-svg-href",a);return G},symbol:function(a,h,d,c,f,G){var b=this,C,y=this.symbols[a],
g=q(h)&&y&&this.symbols[a](Math.round(h),Math.round(d),c,f,G),l=/^url\((.*?)\)$/,B,r;y?(C=this.path(g),C.attr("fill","none"),k(C,{symbolName:a,x:h,y:d,width:c,height:f}),G&&k(C,G)):l.test(a)&&(B=a.match(l)[1],C=this.image(B),C.imgwidth=A(N[B]&&N[B].width,G&&G.width),C.imgheight=A(N[B]&&N[B].height,G&&G.height),r=function(){C.attr({width:C.width,height:C.height})},w(["width","height"],function(a){C[a+"Setter"]=function(a,h){var d={},c=this["img"+h],f="width"===h?"translateX":"translateY";this[h]=a;
q(c)&&(this.element&&this.element.setAttribute(h,c),this.alignByTranslate||(d[f]=((this[h]||0)-c)/2,this.attr(d)))}}),q(h)&&C.attr({x:h,y:d}),C.isImg=!0,q(C.imgwidth)&&q(C.imgheight)?r():(C.attr({width:0,height:0}),t("img",{onload:function(){var a=n[b.chartIndex];0===this.width&&(z(this,{position:"absolute",top:"-999em"}),p.body.appendChild(this));N[B]={width:this.width,height:this.height};C.imgwidth=this.width;C.imgheight=this.height;C.element&&r();this.parentNode&&this.parentNode.removeChild(this);
b.imgCount--;if(!b.imgCount&&a&&a.onload)a.onload()},src:B}),this.imgCount++));return C},symbols:{circle:function(a,h,d,c){return this.arc(a+d/2,h+c/2,d/2,c/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,h,d,c){return["M",a,h,"L",a+d,h,a+d,h+c,a,h+c,"Z"]},triangle:function(a,h,d,c){return["M",a+d/2,h,"L",a+d,h+c,a,h+c,"Z"]},"triangle-down":function(a,h,d,c){return["M",a,h,"L",a+d,h,a+d/2,h+c,"Z"]},diamond:function(a,h,d,c){return["M",a+d/2,h,"L",a+d,h+c/2,a+d/2,h+c,a,h+c/2,"Z"]},arc:function(a,
h,d,c,f){var G=f.start,b=f.r||d,C=f.r||c||d,y=f.end-.001;d=f.innerR;c=f.open;var g=Math.cos(G),A=Math.sin(G),l=Math.cos(y),y=Math.sin(y);f=f.end-G<Math.PI?0:1;b=["M",a+b*g,h+C*A,"A",b,C,0,f,1,a+b*l,h+C*y];q(d)&&b.push(c?"M":"L",a+d*l,h+d*y,"A",d,d,0,f,0,a+d*g,h+d*A);b.push(c?"":"Z");return b},callout:function(a,h,d,c,f){var G=Math.min(f&&f.r||0,d,c),b=G+6,y=f&&f.anchorX;f=f&&f.anchorY;var g;g=["M",a+G,h,"L",a+d-G,h,"C",a+d,h,a+d,h,a+d,h+G,"L",a+d,h+c-G,"C",a+d,h+c,a+d,h+c,a+d-G,h+c,"L",a+G,h+c,"C",
a,h+c,a,h+c,a,h+c-G,"L",a,h+G,"C",a,h,a,h,a+G,h];y&&y>d?f>h+b&&f<h+c-b?g.splice(13,3,"L",a+d,f-6,a+d+6,f,a+d,f+6,a+d,h+c-G):g.splice(13,3,"L",a+d,c/2,y,f,a+d,c/2,a+d,h+c-G):y&&0>y?f>h+b&&f<h+c-b?g.splice(33,3,"L",a,f+6,a-6,f,a,f-6,a,h+G):g.splice(33,3,"L",a,c/2,y,f,a,c/2,a,h+G):f&&f>c&&y>a+b&&y<a+d-b?g.splice(23,3,"L",y+6,h+c,y,h+c+6,y-6,h+c,a+G,h+c):f&&0>f&&y>a+b&&y<a+d-b&&g.splice(3,3,"L",y-6,h,y,h-6,y+6,h,d-G,h);return g}},clipRect:function(h,d,c,f){var G=a.uniqueKey(),b=this.createElement("clipPath").attr({id:G}).add(this.defs);
h=this.rect(h,d,c,f,0).add(b);h.id=G;h.clipPath=b;h.count=0;return h},text:function(a,h,d,c){var f=!Q&&this.forExport,G={};if(c&&(this.allowHTML||!this.forExport))return this.html(a,h,d);G.x=Math.round(h||0);d&&(G.y=Math.round(d));if(a||0===a)G.text=a;a=this.createElement("text").attr(G);f&&a.css({position:"absolute"});c||(a.xSetter=function(a,h,d){var c=d.getElementsByTagName("tspan"),f,G=d.getAttribute(h),b;for(b=0;b<c.length;b++)f=c[b],f.getAttribute(h)===G&&f.setAttribute(h,a);d.setAttribute(h,
a)});return a},fontMetrics:function(a,h){a=a||h&&h.style&&h.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?J(a):/em/.test(a)?parseFloat(a)*(h?this.fontMetrics(null,h.parentNode).f:16):12;h=24>a?a+3:Math.round(1.2*a);return{h:h,b:Math.round(.8*h),f:a}},rotCorr:function(a,h,d){var c=a;h&&d&&(c=Math.max(c*Math.cos(h*e),4));return{x:-a/3*Math.sin(h*e),y:c}},label:function(a,d,c,f,G,b,g,A,l){var C=this,B=C.g("button"!==l&&"label"),r=B.text=C.text("",0,0,g).attr({zIndex:1}),x,u,J=0,e=3,
p=0,F,L,Q,P,t,m={},n,N,z=/^url\((.*?)\)$/.test(f),M=z,v,S,R,O;l&&B.addClass("highcharts-"+l);M=z;v=function(){return(n||0)%2/2};S=function(){var a=r.element.style,h={};u=(void 0===F||void 0===L||t)&&q(r.textStr)&&r.getBBox();B.width=(F||u.width||0)+2*e+p;B.height=(L||u.height||0)+2*e;N=e+C.fontMetrics(a&&a.fontSize,r).b;M&&(x||(B.box=x=C.symbols[f]||z?C.symbol(f):C.rect(),x.addClass(("button"===l?"":"highcharts-label-box")+(l?" highcharts-"+l+"-box":"")),x.add(B),a=v(),h.x=a,h.y=(A?-N:0)+a),h.width=
Math.round(B.width),h.height=Math.round(B.height),x.attr(k(h,m)),m={})};R=function(){var a=p+e,h;h=A?0:N;q(F)&&u&&("center"===t||"right"===t)&&(a+={center:.5,right:1}[t]*(F-u.width));if(a!==r.x||h!==r.y)r.attr("x",a),void 0!==h&&r.attr("y",h);r.x=a;r.y=h};O=function(a,h){x?x.attr(a,h):m[a]=h};B.onAdd=function(){r.add(B);B.attr({text:a||0===a?a:"",x:d,y:c});x&&q(G)&&B.attr({anchorX:G,anchorY:b})};B.widthSetter=function(a){F=a};B.heightSetter=function(a){L=a};B["text-alignSetter"]=function(a){t=a};
B.paddingSetter=function(a){q(a)&&a!==e&&(e=B.padding=a,R())};B.paddingLeftSetter=function(a){q(a)&&a!==p&&(p=a,R())};B.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==J&&(J=a,u&&B.attr({x:Q}))};B.textSetter=function(a){void 0!==a&&r.textSetter(a);S();R()};B["stroke-widthSetter"]=function(a,h){a&&(M=!0);n=this["stroke-width"]=a;O(h,a)};B.strokeSetter=B.fillSetter=B.rSetter=function(a,h){"fill"===h&&a&&(M=!0);O(h,a)};B.anchorXSetter=function(a,h){G=a;O(h,Math.round(a)-v()-Q)};B.anchorYSetter=
function(a,h){b=a;O(h,a-P)};B.xSetter=function(a){B.x=a;J&&(a-=J*((F||u.width)+2*e));Q=Math.round(a);B.attr("translateX",Q)};B.ySetter=function(a){P=B.y=Math.round(a);B.attr("translateY",P)};var T=B.css;return k(B,{css:function(a){if(a){var h={};a=y(a);w(B.textProps,function(d){void 0!==a[d]&&(h[d]=a[d],delete a[d])});r.css(h)}return T.call(B,a)},getBBox:function(){return{width:u.width+2*e,height:u.height+2*e,x:u.x-e,y:u.y-e}},shadow:function(a){a&&(S(),x&&x.shadow(a));return B},destroy:function(){h(B.element,
"mouseenter");h(B.element,"mouseleave");r&&(r=r.destroy());x&&(x=x.destroy());E.prototype.destroy.call(B);B=C=S=R=O=null}})}};a.Renderer=D})(K);(function(a){var E=a.attr,D=a.createElement,H=a.css,I=a.defined,v=a.each,n=a.extend,m=a.isFirefox,z=a.isMS,t=a.isWebKit,q=a.pInt,e=a.SVGRenderer,b=a.win,p=a.wrap;n(a.SVGElement.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&"SPAN"===b.tagName&&a.width)delete a.width,this.textWidth=b,this.updateTransform();a&&"ellipsis"===a.textOverflow&&(a.whiteSpace=
"nowrap",a.overflow="hidden");this.styles=n(this.styles,a);H(this.element,a);return this},htmlGetBBox:function(){var a=this.element;"text"===a.nodeName&&(a.style.position="absolute");return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,l=this.translateX||0,g=this.translateY||0,e=this.x||0,r=this.y||0,u=this.textAlign||"left",f={left:0,center:.5,right:1}[u],B=this.styles;H(b,{marginLeft:l,marginTop:g});
this.shadows&&v(this.shadows,function(a){H(a,{marginLeft:l+1,marginTop:g+1})});this.inverted&&v(b.childNodes,function(d){a.invertChild(d,b)});if("SPAN"===b.tagName){var d=this.rotation,x=q(this.textWidth),c=B&&B.whiteSpace,y=[d,u,b.innerHTML,this.textWidth,this.textAlign].join();y!==this.cTT&&(B=a.fontMetrics(b.style.fontSize).b,I(d)&&this.setSpanRotation(d,f,B),H(b,{width:"",whiteSpace:c||"nowrap"}),b.offsetWidth>x&&/[ \-]/.test(b.textContent||b.innerText)&&H(b,{width:x+"px",display:"block",whiteSpace:c||
"normal"}),this.getSpanCorrection(b.offsetWidth,B,f,d,u));H(b,{left:e+(this.xCorr||0)+"px",top:r+(this.yCorr||0)+"px"});t&&(B=b.offsetHeight);this.cTT=y}}else this.alignOnAdd=!0},setSpanRotation:function(a,k,l){var g={},e=z?"-ms-transform":t?"-webkit-transform":m?"MozTransform":b.opera?"-o-transform":"";g[e]=g.transform="rotate("+a+"deg)";g[e+(m?"Origin":"-origin")]=g.transformOrigin=100*k+"% "+l+"px";H(this.element,g)},getSpanCorrection:function(a,b,l){this.xCorr=-a*l;this.yCorr=-b}});n(e.prototype,
{html:function(a,b,l){var g=this.createElement("span"),k=g.element,r=g.renderer,u=r.isSVG,f=function(a,d){v(["opacity","visibility"],function(f){p(a,f+"Setter",function(a,f,b,g){a.call(this,f,b,g);d[b]=f})})};g.textSetter=function(a){a!==k.innerHTML&&delete this.bBox;k.innerHTML=this.textStr=a;g.htmlUpdateTransform()};u&&f(g,g.element.style);g.xSetter=g.ySetter=g.alignSetter=g.rotationSetter=function(a,d){"align"===d&&(d="textAlign");g[d]=a;g.htmlUpdateTransform()};g.attr({text:a,x:Math.round(b),
y:Math.round(l)}).css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize,position:"absolute"});k.style.whiteSpace="nowrap";g.css=g.htmlCss;u&&(g.add=function(a){var d,b=r.box.parentNode,c=[];if(this.parentGroup=a){if(d=a.div,!d){for(;a;)c.push(a),a=a.parentGroup;v(c.reverse(),function(a){var y,A=E(a.element,"class");A&&(A={className:A});d=a.div=a.div||D("div",A,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&
a.styles.pointerEvents},d||b);y=d.style;n(a,{on:function(){g.on.apply({element:c[0].div},arguments);return a},translateXSetter:function(d,h){y.left=d+"px";a[h]=d;a.doTransform=!0},translateYSetter:function(d,h){y.top=d+"px";a[h]=d;a.doTransform=!0}});f(a,y)})}}else d=b;d.appendChild(k);g.added=!0;g.alignOnAdd&&g.htmlUpdateTransform();return g});return g}})})(K);(function(a){var E,D,H=a.createElement,I=a.css,v=a.defined,n=a.deg2rad,m=a.discardElement,z=a.doc,t=a.each,q=a.erase,e=a.extend;E=a.extendClass;
var b=a.isArray,p=a.isNumber,w=a.isObject,k=a.merge;D=a.noop;var l=a.pick,g=a.pInt,F=a.SVGElement,r=a.SVGRenderer,u=a.win;a.svg||(D={docMode8:z&&8===z.documentMode,init:function(a,b){var d=["\x3c",b,' filled\x3d"f" stroked\x3d"f"'],f=["position: ","absolute",";"],c="div"===b;("shape"===b||c)&&f.push("left:0;top:0;width:1px;height:1px;");f.push("visibility: ",c?"hidden":"visible");d.push(' style\x3d"',f.join(""),'"/\x3e');b&&(d=c||"span"===b||"img"===b?d.join(""):a.prepVML(d),this.element=H(d));this.renderer=
a},add:function(a){var f=this.renderer,d=this.element,b=f.box,c=a&&a.inverted,b=a?a.element||a:b;a&&(this.parentGroup=a);c&&f.invertChild(d,b);b.appendChild(d);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:F.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*n),d=Math.sin(a*n);I(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11\x3d",
b,", M12\x3d",-d,", M21\x3d",d,", M22\x3d",b,", sizingMethod\x3d'auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,d,g,c){var f=g?Math.cos(g*n):1,B=g?Math.sin(g*n):0,A=l(this.elemHeight,this.element.offsetHeight),r;this.xCorr=0>f&&-a;this.yCorr=0>B&&-A;r=0>f*B;this.xCorr+=B*b*(r?1-d:d);this.yCorr-=f*b*(g?r?d:1-d:1);c&&"left"!==c&&(this.xCorr-=a*d*(0>f?-1:1),g&&(this.yCorr-=A*d*(0>B?-1:1)),I(this.element,{textAlign:c}))},pathToVML:function(a){for(var f=a.length,d=[];f--;)p(a[f])?d[f]=
Math.round(10*a[f])-5:"Z"===a[f]?d[f]="x":(d[f]=a[f],!a.isArc||"wa"!==a[f]&&"at"!==a[f]||(d[f+5]===d[f+7]&&(d[f+7]+=a[f+7]>a[f+5]?1:-1),d[f+6]===d[f+8]&&(d[f+8]+=a[f+8]>a[f+6]?1:-1)));return d.join(" ")||"x"},clip:function(a){var f=this,d;a?(d=a.members,q(d,f),d.push(f),f.destroyClip=function(){q(d,f)},a=a.getCSS(f)):(f.destroyClip&&f.destroyClip(),a={clip:f.docMode8?"inherit":"rect(auto)"});return f.css(a)},css:F.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&m(a)},destroy:function(){this.destroyClip&&
this.destroyClip();return F.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=u.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var d;a=a.split(/[ ,]/);d=a.length;if(9===d||11===d)a[d-4]=a[d-2]=g(a[d-2])-10*b;return a.join(" ")},shadow:function(a,b,d){var f=[],c,y=this.element,r=this.renderer,A,B=y.style,h,G=y.path,u,k,e,p;G&&"string"!==typeof G.value&&(G="x");k=G;if(a){e=l(a.width,3);p=(a.opacity||.15)/e;for(c=1;3>=c;c++)u=2*e+1-2*c,d&&
(k=this.cutOffPath(G.value,u+.5)),h=['\x3cshape isShadow\x3d"true" strokeweight\x3d"',u,'" filled\x3d"false" path\x3d"',k,'" coordsize\x3d"10 10" style\x3d"',y.style.cssText,'" /\x3e'],A=H(r.prepVML(h),null,{left:g(B.left)+l(a.offsetX,1),top:g(B.top)+l(a.offsetY,1)}),d&&(A.cutOff=u+1),h=['\x3cstroke color\x3d"',a.color||"#000000",'" opacity\x3d"',p*c,'"/\x3e'],H(r.prepVML(h),null,null,A),b?b.element.appendChild(A):y.parentNode.insertBefore(A,y),f.push(A);this.shadows=f}return this},updateShadows:D,
setAttr:function(a,b){this.docMode8?this.element[a]=b:this.element.setAttribute(a,b)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,d){(d.getElementsByTagName("stroke")[0]||H(this.renderer.prepVML(["\x3cstroke/\x3e"]),null,null,d))[b]=a||"solid";this[b]=a},dSetter:function(a,b,d){var f=this.shadows;a=a||[];this.d=a.join&&a.join(" ");d.path=a=this.pathToVML(a);if(f)for(d=f.length;d--;)f[d].path=f[d].cutOff?this.cutOffPath(a,f[d].cutOff):a;this.setAttr(b,
a)},fillSetter:function(a,b,d){var f=d.nodeName;"SPAN"===f?d.style.color=a:"IMG"!==f&&(d.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,d,b,this)))},"fill-opacitySetter":function(a,b,d){H(this.renderer.prepVML(["\x3c",b.split("-")[0],' opacity\x3d"',a,'"/\x3e']),null,null,d)},opacitySetter:D,rotationSetter:function(a,b,d){d=d.style;this[b]=d[b]=a;d.left=-Math.round(Math.sin(a*n)+1)+"px";d.top=Math.round(Math.cos(a*n))+"px"},strokeSetter:function(a,b,d){this.setAttr("strokecolor",
this.renderer.color(a,d,b,this))},"stroke-widthSetter":function(a,b,d){d.stroked=!!a;this[b]=a;p(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,d){"inherit"===a&&(a="visible");this.shadows&&t(this.shadows,function(d){d.style[b]=a});"DIV"===d.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(d.style[b]=a?"visible":"hidden"),b="top");d.style[b]=a},xSetter:function(a,b,d){this[b]=a;"x"===b?b="left":"y"===b&&(b="top");this.updateClipping?
(this[b]=a,this.updateClipping()):d.style[b]=a},zIndexSetter:function(a,b,d){d.style[b]=a}},D["stroke-opacitySetter"]=D["fill-opacitySetter"],a.VMLElement=D=E(F,D),D.prototype.ySetter=D.prototype.widthSetter=D.prototype.heightSetter=D.prototype.xSetter,D={Element:D,isIE8:-1<u.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,d){var f,c;this.alignedObjects=[];f=this.createElement("div").css({position:"relative"});c=f.element;a.appendChild(f.element);this.isVML=!0;this.box=c;this.boxWrapper=
f;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,d,!1);if(!z.namespaces.hcv){z.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{z.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(y){z.styleSheets[0].cssText+="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},
clipRect:function(a,b,d,g){var c=this.createElement(),f=w(a);return e(c,{members:[],count:0,left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:d)-1,height:(f?a.height:g)-1,getCSS:function(a){var d=a.element,c=d.nodeName,h=a.inverted,b=this.top-("shape"===c?d.offsetTop:0),f=this.left,d=f+this.width,g=b+this.height,b={clip:"rect("+Math.round(h?f:b)+"px,"+Math.round(h?g:d)+"px,"+Math.round(h?d:g)+"px,"+Math.round(h?b:f)+"px)"};!h&&a.docMode8&&"DIV"===c&&e(b,{width:d+"px",height:g+"px"});return b},updateClipping:function(){t(c.members,
function(a){a.element&&a.css(c.getCSS(a))})}})},color:function(b,g,d,l){var c=this,f,r=/^rgba/,A,u,h="none";b&&b.linearGradient?u="gradient":b&&b.radialGradient&&(u="pattern");if(u){var G,x,k=b.linearGradient||b.radialGradient,e,B,C,p,F,w="";b=b.stops;var q,m=[],n=function(){A=['\x3cfill colors\x3d"'+m.join(",")+'" opacity\x3d"',C,'" o:opacity2\x3d"',B,'" type\x3d"',u,'" ',w,'focus\x3d"100%" method\x3d"any" /\x3e'];H(c.prepVML(A),null,null,g)};e=b[0];q=b[b.length-1];0<e[0]&&b.unshift([0,e[1]]);1>
q[0]&&b.push([1,q[1]]);t(b,function(h,d){r.test(h[1])?(f=a.color(h[1]),G=f.get("rgb"),x=f.get("a")):(G=h[1],x=1);m.push(100*h[0]+"% "+G);d?(C=x,p=G):(B=x,F=G)});if("fill"===d)if("gradient"===u)d=k.x1||k[0]||0,b=k.y1||k[1]||0,e=k.x2||k[2]||0,k=k.y2||k[3]||0,w='angle\x3d"'+(90-180*Math.atan((k-b)/(e-d))/Math.PI)+'"',n();else{var h=k.r,z=2*h,v=2*h,D=k.cx,E=k.cy,I=g.radialReference,K,h=function(){I&&(K=l.getBBox(),D+=(I[0]-K.x)/K.width-.5,E+=(I[1]-K.y)/K.height-.5,z*=I[2]/K.width,v*=I[2]/K.height);w=
'src\x3d"'+a.getOptions().global.VMLRadialGradientURL+'" size\x3d"'+z+","+v+'" origin\x3d"0.5,0.5" position\x3d"'+D+","+E+'" color2\x3d"'+F+'" ';n()};l.added?h():l.onAdd=h;h=p}else h=G}else r.test(b)&&"IMG"!==g.tagName?(f=a.color(b),l[d+"-opacitySetter"](f.get("a"),d,g),h=f.get("rgb")):(h=g.getElementsByTagName(d),h.length&&(h[0].opacity=1,h[0].type="solid"),h=b);return h},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/\x3e",' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'),a=
-1===a.indexOf('style\x3d"')?a.replace("/\x3e",' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e'):a.replace('style\x3d"','style\x3d"display:inline-block;behavior:url(#default#VML);')):a=a.replace("\x3c","\x3chcv:");return a},text:r.prototype.html,path:function(a){var f={coordsize:"10 10"};b(a)?f.d=a:w(a)&&e(f,a);return this.createElement("shape").attr(f)},circle:function(a,b,d){var f=this.symbol("circle");w(a)&&(d=a.r,b=a.y,a=a.x);f.isCircle=!0;f.r=d;return f.attr({x:a,y:b})},g:function(a){var b;
a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,d,g,c){var f=this.createElement("img").attr({src:a});1<arguments.length&&f.attr({x:b,y:d,width:g,height:c});return f},createElement:function(a){return"rect"===a?this.symbol(a):r.prototype.createElement.call(this,a)},invertChild:function(a,b){var d=this;b=b.style;var f="IMG"===a.tagName&&a.style;I(a,{flip:"x",left:g(b.width)-(f?g(f.top):1),top:g(b.height)-(f?g(f.left):1),rotation:-90});
t(a.childNodes,function(b){d.invertChild(b,a)})},symbols:{arc:function(a,b,d,g,c){var f=c.start,l=c.end,A=c.r||d||g;d=c.innerR;g=Math.cos(f);var r=Math.sin(f),h=Math.cos(l),G=Math.sin(l);if(0===l-f)return["x"];f=["wa",a-A,b-A,a+A,b+A,a+A*g,b+A*r,a+A*h,b+A*G];c.open&&!d&&f.push("e","M",a,b);f.push("at",a-d,b-d,a+d,b+d,a+d*h,b+d*G,a+d*g,b+d*r,"x","e");f.isArc=!0;return f},circle:function(a,b,d,g,c){c&&v(c.r)&&(d=g=2*c.r);c&&c.isCircle&&(a-=d/2,b-=g/2);return["wa",a,b,a+d,b+g,a+d,b+g/2,a+d,b+g/2,"e"]},
rect:function(a,b,d,g,c){return r.prototype.symbols[v(c)&&c.r?"callout":"square"].call(0,a,b,d,g,c)}}},a.VMLRenderer=E=function(){this.init.apply(this,arguments)},E.prototype=k(r.prototype,D),a.Renderer=E);r.prototype.measureSpanWidth=function(a,b){var d=z.createElement("span");a=z.createTextNode(a);d.appendChild(a);I(d,b);this.box.appendChild(d);b=d.offsetWidth;m(d);return b}})(K);(function(a){function E(){var t=a.defaultOptions.global,q=z.moment;if(t.timezone){if(q)return function(a){return-q.tz(a,
t.timezone).utcOffset()};a.error(25)}return t.useUTC&&t.getTimezoneOffset}function D(){var t=a.defaultOptions.global,q,e=t.useUTC,b=e?"getUTC":"get",p=e?"setUTC":"set";a.Date=q=t.Date||z.Date;q.hcTimezoneOffset=e&&t.timezoneOffset;q.hcGetTimezoneOffset=E();q.hcMakeTime=function(a,b,l,g,p,r){var u;e?(u=q.UTC.apply(0,arguments),u+=v(u)):u=(new q(a,b,m(l,1),m(g,0),m(p,0),m(r,0))).getTime();return u};I("Minutes Hours Day Date Month FullYear".split(" "),function(a){q["hcGet"+a]=b+a});I("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "),
function(a){q["hcSet"+a]=p+a})}var H=a.color,I=a.each,v=a.getTZOffset,n=a.merge,m=a.pick,z=a.win;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{useUTC:!0,VMLRadialGradientURL:"http://code.highcharts.com/5.0.7/gfx/vml-radial-gradient.png"},chart:{borderRadius:0,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",
align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",fontSize:"12px",fontWeight:"bold"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",
width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",
month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,backgroundColor:H("#f7f7f7").setOpacity(.85).get(),borderWidth:1,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"http://www.highcharts.com",
position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(t){a.defaultOptions=n(!0,a.defaultOptions,t);D();return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;D()})(K);(function(a){var E=a.arrayMax,D=a.arrayMin,H=a.defined,I=a.destroyObjectProperties,v=a.each,n=a.erase,m=a.merge,z=a.pick;a.PlotLineOrBand=function(a,q){this.axis=
a;q&&(this.options=q,this.id=q.id)};a.PlotLineOrBand.prototype={render:function(){var a=this,q=a.axis,e=q.horiz,b=a.options,p=b.label,w=a.label,k=b.to,l=b.from,g=b.value,F=H(l)&&H(k),r=H(g),u=a.svgElem,f=!u,B=[],d,x=b.color,c=z(b.zIndex,0),y=b.events,B={"class":"highcharts-plot-"+(F?"band ":"line ")+(b.className||"")},L={},A=q.chart.renderer,J=F?"bands":"lines",h=q.log2lin;q.isLog&&(l=h(l),k=h(k),g=h(g));r?(B={stroke:x,"stroke-width":b.width},b.dashStyle&&(B.dashstyle=b.dashStyle)):F&&(x&&(B.fill=
x),b.borderWidth&&(B.stroke=b.borderColor,B["stroke-width"]=b.borderWidth));L.zIndex=c;J+="-"+c;(x=q[J])||(q[J]=x=A.g("plot-"+J).attr(L).add());f&&(a.svgElem=u=A.path().attr(B).add(x));if(r)B=q.getPlotLinePath(g,u.strokeWidth());else if(F)B=q.getPlotBandPath(l,k,b);else return;if(f&&B&&B.length){if(u.attr({d:B}),y)for(d in b=function(h){u.on(h,function(b){y[h].apply(a,[b])})},y)b(d)}else u&&(B?(u.show(),u.animate({d:B})):(u.hide(),w&&(a.label=w=w.destroy())));p&&H(p.text)&&B&&B.length&&0<q.width&&
0<q.height&&!B.flat?(p=m({align:e&&F&&"center",x:e?!F&&4:10,verticalAlign:!e&&F&&"middle",y:e?F?16:10:F?6:-4,rotation:e&&!F&&90},p),this.renderLabel(p,B,F,c)):w&&w.hide();return a},renderLabel:function(a,q,e,b){var p=this.label,w=this.axis.chart.renderer;p||(p={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(e?"band":"line")+"-label "+(a.className||"")},p.zIndex=b,this.label=p=w.text(a.text,0,0,a.useHTML).attr(p).add(),p.css(a.style));b=[q[1],q[4],e?q[6]:q[1]];q=[q[2],q[5],
e?q[7]:q[2]];e=D(b);w=D(q);p.align(a,!1,{x:e,y:w,width:E(b)-e,height:E(q)-w});p.show()},destroy:function(){n(this.axis.plotLinesAndBands,this);delete this.axis;I(this)}};a.AxisPlotLineOrBandExtension={getPlotBandPath:function(a,q){q=this.getPlotLinePath(q,null,null,!0);(a=this.getPlotLinePath(a,null,null,!0))&&q?(a.flat=a.toString()===q.toString(),a.push(q[4],q[5],q[1],q[2],"z")):a=null;return a},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,
"plotLines")},addPlotBandOrLine:function(m,q){var e=(new a.PlotLineOrBand(this,m)).render(),b=this.userOptions;e&&(q&&(b[q]=b[q]||[],b[q].push(m)),this.plotLinesAndBands.push(e));return e},removePlotBandOrLine:function(a){for(var q=this.plotLinesAndBands,e=this.options,b=this.userOptions,p=q.length;p--;)q[p].id===a&&q[p].destroy();v([e.plotLines||[],b.plotLines||[],e.plotBands||[],b.plotBands||[]],function(b){for(p=b.length;p--;)b[p].id===a&&n(b,b[p])})}}})(K);(function(a){var E=a.correctFloat,D=
a.defined,H=a.destroyObjectProperties,I=a.isNumber,v=a.merge,n=a.pick,m=a.deg2rad;a.Tick=function(a,m,q,e){this.axis=a;this.pos=m;this.type=q||"";this.isNew=!0;q||e||this.addLabel()};a.Tick.prototype={addLabel:function(){var a=this.axis,m=a.options,q=a.chart,e=a.categories,b=a.names,p=this.pos,w=m.labels,k=a.tickPositions,l=p===k[0],g=p===k[k.length-1],b=e?n(e[p],b[p],p):p,e=this.label,k=k.info,F;a.isDatetimeAxis&&k&&(F=m.dateTimeLabelFormats[k.higherRanks[p]||k.unitName]);this.isFirst=l;this.isLast=
g;m=a.labelFormatter.call({axis:a,chart:q,isFirst:l,isLast:g,dateTimeLabelFormat:F,value:a.isLog?E(a.lin2log(b)):b});D(e)?e&&e.attr({text:m}):(this.labelLength=(this.label=e=D(m)&&w.enabled?q.renderer.text(m,0,0,w.useHTML).css(v(w.style)).add(a.labelGroup):null)&&e.getBBox().width,this.rotation=0)},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var t=this.axis,q=a.x,e=t.chart.chartWidth,b=t.chart.spacing,p=n(t.labelLeft,
Math.min(t.pos,b[3])),b=n(t.labelRight,Math.max(t.pos+t.len,e-b[1])),w=this.label,k=this.rotation,l={left:0,center:.5,right:1}[t.labelAlign],g=w.getBBox().width,F=t.getSlotWidth(),r=F,u=1,f,B={};if(k)0>k&&q-l*g<p?f=Math.round(q/Math.cos(k*m)-p):0<k&&q+l*g>b&&(f=Math.round((e-q)/Math.cos(k*m)));else if(e=q+(1-l)*g,q-l*g<p?r=a.x+r*(1-l)-p:e>b&&(r=b-a.x+r*l,u=-1),r=Math.min(F,r),r<F&&"center"===t.labelAlign&&(a.x+=u*(F-r-l*(F-Math.min(g,r)))),g>r||t.autoRotation&&(w.styles||{}).width)f=r;f&&(B.width=
f,(t.options.labels.style||{}).textOverflow||(B.textOverflow="ellipsis"),w.css(B))},getPosition:function(a,m,q,e){var b=this.axis,p=b.chart,w=e&&p.oldChartHeight||p.chartHeight;return{x:a?b.translate(m+q,null,null,e)+b.transB:b.left+b.offset+(b.opposite?(e&&p.oldChartWidth||p.chartWidth)-b.right-b.left:0),y:a?w-b.bottom+b.offset-(b.opposite?b.height:0):w-b.translate(m+q,null,null,e)-b.transB}},getLabelPosition:function(a,n,q,e,b,p,w,k){var l=this.axis,g=l.transA,F=l.reversed,r=l.staggerLines,u=l.tickRotCorr||
{x:0,y:0},f=b.y;D(f)||(f=0===l.side?q.rotation?-8:-q.getBBox().height:2===l.side?u.y+8:Math.cos(q.rotation*m)*(u.y-q.getBBox(!1,0).height/2));a=a+b.x+u.x-(p&&e?p*g*(F?-1:1):0);n=n+f-(p&&!e?p*g*(F?1:-1):0);r&&(q=w/(k||1)%r,l.opposite&&(q=r-q-1),n+=l.labelOffset/r*q);return{x:a,y:Math.round(n)}},getMarkPath:function(a,m,q,e,b,p){return p.crispLine(["M",a,m,"L",a+(b?0:-q),m+(b?q:0)],e)},render:function(a,m,q){var e=this.axis,b=e.options,p=e.chart.renderer,w=e.horiz,k=this.type,l=this.label,g=this.pos,
F=b.labels,r=this.gridLine,u=k?k+"Tick":"tick",f=e.tickSize(u),B=this.mark,d=!B,x=F.step,c={},y=!0,L=e.tickmarkOffset,A=this.getPosition(w,g,L,m),J=A.x,A=A.y,h=w&&J===e.pos+e.len||!w&&A===e.pos?-1:1,G=k?k+"Grid":"grid",Q=b[G+"LineWidth"],P=b[G+"LineColor"],t=b[G+"LineDashStyle"],G=n(b[u+"Width"],!k&&e.isXAxis?1:0),u=b[u+"Color"];q=n(q,1);this.isActive=!0;r||(c.stroke=P,c["stroke-width"]=Q,t&&(c.dashstyle=t),k||(c.zIndex=1),m&&(c.opacity=0),this.gridLine=r=p.path().attr(c).addClass("highcharts-"+(k?
k+"-":"")+"grid-line").add(e.gridGroup));if(!m&&r&&(g=e.getPlotLinePath(g+L,r.strokeWidth()*h,m,!0)))r[this.isNew?"attr":"animate"]({d:g,opacity:q});f&&(e.opposite&&(f[0]=-f[0]),d&&(this.mark=B=p.path().addClass("highcharts-"+(k?k+"-":"")+"tick").add(e.axisGroup),B.attr({stroke:u,"stroke-width":G})),B[d?"attr":"animate"]({d:this.getMarkPath(J,A,f[0],B.strokeWidth()*h,w,p),opacity:q}));l&&I(J)&&(l.xy=A=this.getLabelPosition(J,A,l,w,F,L,a,x),this.isFirst&&!this.isLast&&!n(b.showFirstLabel,1)||this.isLast&&
!this.isFirst&&!n(b.showLastLabel,1)?y=!1:!w||e.isRadial||F.step||F.rotation||m||0===q||this.handleOverflow(A),x&&a%x&&(y=!1),y&&I(A.y)?(A.opacity=q,l[this.isNew?"attr":"animate"](A)):l.attr("y",-9999),this.isNew=!1)},destroy:function(){H(this,this.axis)}}})(K);(function(a){var E=a.addEvent,D=a.animObject,H=a.arrayMax,I=a.arrayMin,v=a.AxisPlotLineOrBandExtension,n=a.color,m=a.correctFloat,z=a.defaultOptions,t=a.defined,q=a.deg2rad,e=a.destroyObjectProperties,b=a.each,p=a.extend,w=a.fireEvent,k=a.format,
l=a.getMagnitude,g=a.grep,F=a.inArray,r=a.isArray,u=a.isNumber,f=a.isString,B=a.merge,d=a.normalizeTickInterval,x=a.pick,c=a.PlotLineOrBand,y=a.removeEvent,L=a.splat,A=a.syncTimeout,J=a.Tick;a.Axis=function(){this.init.apply(this,arguments)};a.Axis.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,labels:{enabled:!0,style:{color:"#666666",cursor:"default",fontSize:"11px"},
x:0},minPadding:.01,maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickLength:10,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},maxPadding:.05,
minPadding:.05,startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"#000000",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],
x:0},title:{rotation:0}},init:function(a,b){var h=b.isX;this.chart=a;this.horiz=a.inverted?!h:h;this.isXAxis=h;this.coll=this.coll||(h?"xAxis":"yAxis");this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,c=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.reversed=d.reversed;this.visible=!1!==d.visible;this.zoomEnabled=!1!==d.zoomEnabled;this.hasNames=
"category"===c||!0===d.categories;this.categories=d.categories||this.hasNames;this.names=this.names||[];this.isLog="logarithmic"===c;this.isDatetimeAxis="datetime"===c;this.isLinked=t(d.linkedTo);this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksTouched=0;this.min=this.max=null;this.crosshair=x(d.crosshair,
L(a.options.tooltip.crosshairs)[h?0:1],!1);var G;b=this.options.events;-1===F(this,a.axes)&&(h?a.axes.splice(a.xAxis.length,0,this):a.axes.push(this),a[this.coll].push(this));this.series=this.series||[];a.inverted&&h&&void 0===this.reversed&&(this.reversed=!0);this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(G in b)E(this,G,b[G]);this.isLog&&(this.val2lin=this.log2lin,this.lin2val=this.lin2log)},setOptions:function(a){this.options=B(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,
[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],B(z[this.coll],a))},defaultLabelFormatter:function(){var h=this.axis,b=this.value,d=h.categories,c=this.dateTimeLabelFormat,f=z.lang,g=f.numericSymbols,f=f.numericSymbolMagnitude||1E3,y=g&&g.length,l,A=h.options.labels.format,h=h.isLog?b:h.tickInterval;if(A)l=k(A,this);else if(d)l=b;else if(c)l=a.dateFormat(c,b);else if(y&&1E3<=h)for(;y--&&void 0===l;)d=Math.pow(f,y+1),h>=
d&&0===10*b%d&&null!==g[y]&&0!==b&&(l=a.numberFormat(b/d,-1)+g[y]);void 0===l&&(l=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return l},getSeriesExtremes:function(){var a=this,d=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();b(a.series,function(h){if(h.visible||!d.options.chart.ignoreHiddenSeries){var b=h.options,c=b.threshold,G;a.hasVisibleSeries=!0;a.isLog&&0>=c&&(c=null);if(a.isXAxis)b=h.xData,
b.length&&(h=I(b),u(h)||h instanceof Date||(b=g(b,function(a){return u(a)}),h=I(b)),a.dataMin=Math.min(x(a.dataMin,b[0]),h),a.dataMax=Math.max(x(a.dataMax,b[0]),H(b)));else if(h.getExtremes(),G=h.dataMax,h=h.dataMin,t(h)&&t(G)&&(a.dataMin=Math.min(x(a.dataMin,h),h),a.dataMax=Math.max(x(a.dataMax,G),G)),t(c)&&(a.threshold=c),!b.softThreshold||a.isLog)a.softThreshold=!1}})},translate:function(a,b,d,c,f,g){var h=this.linkedParent||this,G=1,y=0,l=c?h.oldTransA:h.transA;c=c?h.oldMin:h.min;var A=h.minPixelPadding;
f=(h.isOrdinal||h.isBroken||h.isLog&&f)&&h.lin2val;l||(l=h.transA);d&&(G*=-1,y=h.len);h.reversed&&(G*=-1,y-=G*(h.sector||h.len));b?(a=(a*G+y-A)/l+c,f&&(a=h.lin2val(a))):(f&&(a=h.val2lin(a)),a=G*(a-c)*l+y+G*A+(u(g)?l*g:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,d,c,f){var h=this.chart,G=this.left,g=this.top,y,l,A=d&&h.oldChartHeight||
h.chartHeight,r=d&&h.oldChartWidth||h.chartWidth,k;y=this.transB;var e=function(a,h,b){if(a<h||a>b)c?a=Math.min(Math.max(h,a),b):k=!0;return a};f=x(f,this.translate(a,null,null,d));a=d=Math.round(f+y);y=l=Math.round(A-f-y);u(f)?this.horiz?(y=g,l=A-this.bottom,a=d=e(a,G,G+this.width)):(a=G,d=r-this.right,y=l=e(y,g,g+this.height)):k=!0;return k&&!c?null:h.renderer.crispLine(["M",a,y,"L",d,l],b||1)},getLinearTickPositions:function(a,b,d){var h,c=m(Math.floor(b/a)*a),f=m(Math.ceil(d/a)*a),G=[];if(b===
d&&u(b))return[b];for(b=c;b<=f;){G.push(b);b=m(b+a);if(b===h)break;h=b}return G},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,d=this.minorTickInterval,c=[],f,g=this.pointRangePadding||0;f=this.min-g;var g=this.max+g,y=g-f;if(y&&y/d<this.len/3)if(this.isLog)for(g=b.length,f=1;f<g;f++)c=c.concat(this.getLogTickPositions(d,b[f-1],b[f],!0));else if(this.isDatetimeAxis&&"auto"===a.minorTickInterval)c=c.concat(this.getTimeTicks(this.normalizeTimeTickInterval(d),f,g,a.startOfWeek));
else for(b=f+(b[0]-f)%d;b<=g&&b!==c[0];b+=d)c.push(b);0!==c.length&&this.trimTicks(c,a.startOnTick,a.endOnTick);return c},adjustForMinRange:function(){var a=this.options,d=this.min,c=this.max,f,g=this.dataMax-this.dataMin>=this.minRange,y,l,A,r,u,k;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(t(a.min)||t(a.max)?this.minRange=null:(b(this.series,function(a){r=a.xData;for(l=u=a.xIncrement?1:r.length-1;0<l;l--)if(A=r[l]-r[l-1],void 0===y||A<y)y=A}),this.minRange=Math.min(5*y,this.dataMax-this.dataMin)));
c-d<this.minRange&&(k=this.minRange,f=(k-c+d)/2,f=[d-f,x(a.min,d-f)],g&&(f[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),d=H(f),c=[d+k,x(a.max,d+k)],g&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=I(c),c-d<k&&(f[0]=c-k,f[1]=x(a.min,c-k),d=H(f)));this.min=d;this.max=c},getClosest:function(){var a;this.categories?a=1:b(this.series,function(h){var b=h.closestPointRange,d=h.visible||!h.chart.options.chart.ignoreHiddenSeries;!h.noSharedTooltip&&t(b)&&d&&(a=t(a)?Math.min(a,b):b)});
return a},nameToX:function(a){var h=r(this.categories),b=h?this.categories:this.names,d=a.options.x,c;a.series.requireSorting=!1;t(d)||(d=!1===this.options.uniqueNames?a.series.autoIncrement():F(a.name,b));-1===d?h||(c=b.length):c=d;this.names[c]=a.name;return c},updateNames:function(){var a=this;0<this.names.length&&(this.names.length=0,this.minRange=void 0,b(this.series||[],function(h){h.xIncrement=null;if(!h.points||h.isDirtyData)h.processData(),h.generatePoints();b(h.points,function(b,d){var c;
b.options&&(c=a.nameToX(b),c!==b.x&&(b.x=c,h.xData[d]=c))})}))},setAxisTranslation:function(a){var h=this,d=h.max-h.min,c=h.axisPointRange||0,g,y=0,l=0,A=h.linkedParent,r=!!h.categories,u=h.transA,k=h.isXAxis;if(k||r||c)g=h.getClosest(),A?(y=A.minPointOffset,l=A.pointRangePadding):b(h.series,function(a){var b=r?1:k?x(a.options.pointRange,g,0):h.axisPointRange||0;a=a.options.pointPlacement;c=Math.max(c,b);h.single||(y=Math.max(y,f(a)?0:b/2),l=Math.max(l,"on"===a?0:b))}),A=h.ordinalSlope&&g?h.ordinalSlope/
g:1,h.minPointOffset=y*=A,h.pointRangePadding=l*=A,h.pointRange=Math.min(c,d),k&&(h.closestPointRange=g);a&&(h.oldTransA=u);h.translationSlope=h.transA=u=h.len/(d+l||1);h.transB=h.horiz?h.left:h.bottom;h.minPixelPadding=u*y},minFromRange:function(){return this.max-this.range},setTickInterval:function(h){var c=this,f=c.chart,g=c.options,y=c.isLog,A=c.log2lin,r=c.isDatetimeAxis,k=c.isXAxis,e=c.isLinked,J=g.maxPadding,p=g.minPadding,B=g.tickInterval,F=g.tickPixelInterval,L=c.categories,q=c.threshold,
n=c.softThreshold,v,z,D,E;r||L||e||this.getTickAmount();D=x(c.userMin,g.min);E=x(c.userMax,g.max);e?(c.linkedParent=f[c.coll][g.linkedTo],f=c.linkedParent.getExtremes(),c.min=x(f.min,f.dataMin),c.max=x(f.max,f.dataMax),g.type!==c.linkedParent.options.type&&a.error(11,1)):(!n&&t(q)&&(c.dataMin>=q?(v=q,p=0):c.dataMax<=q&&(z=q,J=0)),c.min=x(D,v,c.dataMin),c.max=x(E,z,c.dataMax));y&&(!h&&0>=Math.min(c.min,x(c.dataMin,c.min))&&a.error(10,1),c.min=m(A(c.min),15),c.max=m(A(c.max),15));c.range&&t(c.max)&&
(c.userMin=c.min=D=Math.max(c.min,c.minFromRange()),c.userMax=E=c.max,c.range=null);w(c,"foundExtremes");c.beforePadding&&c.beforePadding();c.adjustForMinRange();!(L||c.axisPointRange||c.usePercentage||e)&&t(c.min)&&t(c.max)&&(A=c.max-c.min)&&(!t(D)&&p&&(c.min-=A*p),!t(E)&&J&&(c.max+=A*J));u(g.floor)?c.min=Math.max(c.min,g.floor):u(g.softMin)&&(c.min=Math.min(c.min,g.softMin));u(g.ceiling)?c.max=Math.min(c.max,g.ceiling):u(g.softMax)&&(c.max=Math.max(c.max,g.softMax));n&&t(c.dataMin)&&(q=q||0,!t(D)&&
c.min<q&&c.dataMin>=q?c.min=q:!t(E)&&c.max>q&&c.dataMax<=q&&(c.max=q));c.tickInterval=c.min===c.max||void 0===c.min||void 0===c.max?1:e&&!B&&F===c.linkedParent.options.tickPixelInterval?B=c.linkedParent.tickInterval:x(B,this.tickAmount?(c.max-c.min)/Math.max(this.tickAmount-1,1):void 0,L?1:(c.max-c.min)*F/Math.max(c.len,F));k&&!h&&b(c.series,function(a){a.processData(c.min!==c.oldMin||c.max!==c.oldMax)});c.setAxisTranslation(!0);c.beforeSetTickPositions&&c.beforeSetTickPositions();c.postProcessTickInterval&&
(c.tickInterval=c.postProcessTickInterval(c.tickInterval));c.pointRange&&!B&&(c.tickInterval=Math.max(c.pointRange,c.tickInterval));h=x(g.minTickInterval,c.isDatetimeAxis&&c.closestPointRange);!B&&c.tickInterval<h&&(c.tickInterval=h);r||y||B||(c.tickInterval=d(c.tickInterval,null,l(c.tickInterval),x(g.allowDecimals,!(.5<c.tickInterval&&5>c.tickInterval&&1E3<c.max&&9999>c.max)),!!this.tickAmount));this.tickAmount||(c.tickInterval=c.unsquish());this.setTickPositions()},setTickPositions:function(){var a=
this.options,c,b=a.tickPositions,d=a.tickPositioner,f=a.startOnTick,g=a.endOnTick,y;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===a.minorTickInterval&&this.tickInterval?this.tickInterval/5:a.minorTickInterval;this.tickPositions=c=b&&b.slice();!c&&(c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,
!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()]),this.tickPositions=c,d&&(d=d.apply(this,[this.min,this.max])))&&(this.tickPositions=c=d);this.trimTicks(c,f,g);this.isLinked||(this.min===this.max&&t(this.min)&&!this.tickAmount&&(y=!0,this.min-=.5,this.max+=.5),this.single=y,b||d||this.adjustTickAmount())},trimTicks:function(a,c,b){var h=a[0],d=a[a.length-1],f=this.minPointOffset||
0;if(!this.isLinked){if(c)this.min=h;else for(;this.min-f>a[0];)a.shift();if(b)this.max=d;else for(;this.max+f<a[a.length-1];)a.pop();0===a.length&&t(h)&&a.push((d+h)/2)}},alignToOthers:function(){var a={},c,d=this.options;!1===this.chart.options.chart.alignTicks||!1===d.alignTicks||this.isLog||b(this.chart[this.coll],function(h){var b=h.options,b=[h.horiz?b.left:b.top,b.width,b.height,b.pane].join();h.series.length&&(a[b]?c=!0:a[b]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,
b=a.tickPixelInterval;!t(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=c},adjustTickAmount:function(){var a=this.tickInterval,c=this.tickPositions,b=this.tickAmount,d=this.finalTickAmt,f=c&&c.length;if(f<b){for(;c.length<b;)c.push(m(c[c.length-1]+a));this.transA*=(f-1)/(b-1);this.max=c[c.length-1]}else f>b&&(this.tickInterval*=2,this.setTickPositions());
if(t(d)){for(a=b=c.length;a--;)(3===d&&1===a%2||2>=d&&0<a&&a<b-1)&&c.splice(a,1);this.finalTickAmt=void 0}},setScale:function(){var a,c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();c=this.len!==this.oldAxisLength;b(this.series,function(h){if(h.isDirtyData||h.isDirty||h.xAxis.isDirty)a=!0});c||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=
!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks()},setExtremes:function(a,c,d,f,g){var h=this,y=h.chart;d=x(d,!0);b(h.series,function(a){delete a.kdTree});g=p(g,{min:a,max:c});w(h,"setExtremes",g,function(){h.userMin=a;h.userMax=c;h.eventArgs=g;d&&y.redraw(f)})},zoom:function(a,c){var h=this.dataMin,b=this.dataMax,d=this.options,
f=Math.min(h,x(d.min,h)),d=Math.max(b,x(d.max,b));if(a!==this.min||c!==this.max)this.allowZoomOutside||(t(h)&&(a<f&&(a=f),a>d&&(a=d)),t(b)&&(c<f&&(c=f),c>d&&(c=d))),this.displayBtn=void 0!==a||void 0!==c,this.setExtremes(a,c,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,c=this.options,b=c.offsets||[0,0,0,0],d=this.horiz,f=x(c.width,a.plotWidth-b[3]+b[1]),g=x(c.height,a.plotHeight-b[0]+b[2]),y=x(c.top,a.plotTop+b[0]),c=x(c.left,a.plotLeft+b[3]),b=/%$/;b.test(g)&&(g=
Math.round(parseFloat(g)/100*a.plotHeight));b.test(y)&&(y=Math.round(parseFloat(y)/100*a.plotHeight+a.plotTop));this.left=c;this.top=y;this.width=f;this.height=g;this.bottom=a.chartHeight-g-y;this.right=a.chartWidth-f-c;this.len=Math.max(d?f:g,0);this.pos=d?c:y},getExtremes:function(){var a=this.isLog,c=this.lin2log;return{min:a?m(c(this.min)):this.min,max:a?m(c(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var c=
this.isLog,h=this.lin2log,b=c?h(this.min):this.min,c=c?h(this.max):this.max;null===a?a=b:b>a?a=b:c<a&&(a=c);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(x(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var c=this.options,h=c[a+"Length"],b=x(c[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(b&&h)return"inside"===c[a+"Position"]&&(h=-h),[h,b]},labelMetrics:function(){return this.chart.renderer.fontMetrics(this.options.labels.style&&
this.options.labels.style.fontSize,this.ticks[0]&&this.ticks[0].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,d=this.tickInterval,f=d,g=this.len/(((this.categories?1:0)+this.max-this.min)/d),y,l=a.rotation,A=this.labelMetrics(),r,u=Number.MAX_VALUE,k,e=function(a){a/=g||1;a=1<a?Math.ceil(a):1;return a*d};c?(k=!a.staggerLines&&!a.step&&(t(l)?[l]:g<x(a.autoRotationLimit,80)&&a.autoRotation))&&b(k,function(a){var c;if(a===l||a&&-90<=a&&90>=a)r=e(Math.abs(A.h/Math.sin(q*a))),c=r+
Math.abs(a/360),c<u&&(u=c,y=a,f=r)}):a.step||(f=e(A.h));this.autoRotation=k;this.labelRotation=x(y,l);return f},getSlotWidth:function(){var a=this.chart,c=this.horiz,b=this.options.labels,d=Math.max(this.tickPositions.length-(this.categories?0:1),1),f=a.margin[3];return c&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/d||!c&&(f&&f-a.spacing[3]||.33*a.chartWidth)},renderUnsquish:function(){var a=this.chart,c=a.renderer,d=this.tickPositions,g=this.ticks,y=this.options.labels,l=this.horiz,
A=this.getSlotWidth(),r=Math.max(1,Math.round(A-2*(y.padding||5))),u={},k=this.labelMetrics(),e=y.style&&y.style.textOverflow,x,J=0,p,F;f(y.rotation)||(u.rotation=y.rotation||0);b(d,function(a){(a=g[a])&&a.labelLength>J&&(J=a.labelLength)});this.maxLabelLength=J;if(this.autoRotation)J>r&&J>k.h?u.rotation=this.labelRotation:this.labelRotation=0;else if(A&&(x={width:r+"px"},!e))for(x.textOverflow="clip",p=d.length;!l&&p--;)if(F=d[p],r=g[F].label)r.styles&&"ellipsis"===r.styles.textOverflow?r.css({textOverflow:"clip"}):
g[F].labelLength>A&&r.css({width:A+"px"}),r.getBBox().height>this.len/d.length-(k.h-k.f)&&(r.specCss={textOverflow:"ellipsis"});u.rotation&&(x={width:(J>.5*a.chartHeight?.33*a.chartHeight:a.chartHeight)+"px"},e||(x.textOverflow="ellipsis"));if(this.labelAlign=y.align||this.autoLabelAlign(this.labelRotation))u.align=this.labelAlign;b(d,function(a){var c=(a=g[a])&&a.label;c&&(c.attr(u),x&&c.css(B(x,c.specCss)),delete c.specCss,a.rotation=u.rotation)});this.tickRotCorr=c.rotCorr(k.b,this.labelRotation||
0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||t(this.min)&&t(this.max)&&!!this.tickPositions},addTitle:function(a){var c=this.chart.renderer,b=this.horiz,h=this.opposite,d=this.options.title,f;this.axisTitle||((f=d.textAlign)||(f=(b?{low:"left",middle:"center",high:"right"}:{low:h?"right":"left",middle:"center",high:h?"left":"right"})[d.align]),this.axisTitle=c.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:f}).addClass("highcharts-axis-title").css(d.style).add(this.axisGroup),
this.axisTitle.isNew=!0);this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var c=this.ticks;c[a]?c[a].addLabel():c[a]=new J(this,a)},getOffset:function(){var a=this,c=a.chart,d=c.renderer,f=a.options,g=a.tickPositions,y=a.ticks,l=a.horiz,A=a.side,r=c.inverted?[1,0,3,2][A]:A,u,k,e=0,J,p=0,B=f.title,F=f.labels,w=0,L=c.axisOffset,c=c.clipOffset,m=[-1,1,1,-1][A],q,n=f.className,v=a.axisParent,z=this.tickSize("tick");u=a.hasData();a.showAxis=k=u||x(f.showEmpty,!0);a.staggerLines=a.horiz&&F.staggerLines;
a.axisGroup||(a.gridGroup=d.g("grid").attr({zIndex:f.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(n||"")).add(v),a.axisGroup=d.g("axis").attr({zIndex:f.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(n||"")).add(v),a.labelGroup=d.g("axis-labels").attr({zIndex:F.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(n||"")).add(v));if(u||a.isLinked)b(g,function(c,b){a.generateTick(c,b)}),a.renderUnsquish(),!1===F.reserveSpace||0!==A&&2!==A&&
{1:"left",3:"right"}[A]!==a.labelAlign&&"center"!==a.labelAlign||b(g,function(a){w=Math.max(y[a].getLabelSize(),w)}),a.staggerLines&&(w*=a.staggerLines,a.labelOffset=w*(a.opposite?-1:1));else for(q in y)y[q].destroy(),delete y[q];B&&B.text&&!1!==B.enabled&&(a.addTitle(k),k&&(e=a.axisTitle.getBBox()[l?"height":"width"],J=B.offset,p=t(J)?0:x(B.margin,l?5:10)));a.renderLine();a.offset=m*x(f.offset,L[A]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};d=0===A?-a.labelMetrics().h:2===A?a.tickRotCorr.y:0;p=Math.abs(w)+
p;w&&(p=p-d+m*(l?x(F.y,a.tickRotCorr.y+8*m):F.x));a.axisTitleMargin=x(J,p);L[A]=Math.max(L[A],a.axisTitleMargin+e+m*a.offset,p,u&&g.length&&z?z[0]:0);f=f.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[r]=Math.max(c[r],f)},getLinePath:function(a){var c=this.chart,b=this.opposite,d=this.offset,h=this.horiz,f=this.left+(b?this.width:0)+d,d=c.chartHeight-this.bottom-(b?this.height:0)+d;b&&(a*=-1);return c.renderer.crispLine(["M",h?this.left:f,h?d:this.top,"L",h?c.chartWidth-this.right:f,h?d:c.chartHeight-
this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,c=this.left,b=this.top,d=this.len,f=this.options.title,g=a?c:b,y=this.opposite,A=this.offset,l=f.x||0,r=f.y||0,u=this.chart.renderer.fontMetrics(f.style&&f.style.fontSize,this.axisTitle).f,d={low:g+(a?0:d),
middle:g+d/2,high:g+(a?d:0)}[f.align],c=(a?b+this.height:c)+(a?1:-1)*(y?-1:1)*this.axisTitleMargin+(2===this.side?u:0);return{x:a?d+l:c+(y?this.width:0)+A+l,y:a?c+r-(y?this.height:0)+A:d+r}},renderMinorTick:function(a){var c=this.chart.hasRendered&&u(this.oldMin),b=this.minorTicks;b[a]||(b[a]=new J(this,a,"minor"));c&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1)},renderTick:function(a,c){var b=this.isLinked,d=this.ticks,h=this.chart.hasRendered&&u(this.oldMin);if(!b||a>=this.min&&a<=this.max)d[a]||
(d[a]=new J(this,a)),h&&d[a].isNew&&d[a].render(c,!0,.1),d[a].render(c)},render:function(){var a=this,d=a.chart,f=a.options,g=a.isLog,y=a.lin2log,l=a.isLinked,r=a.tickPositions,u=a.axisTitle,k=a.ticks,e=a.minorTicks,x=a.alternateBands,p=f.stackLabels,B=f.alternateGridColor,F=a.tickmarkOffset,w=a.axisLine,L=a.showAxis,m=D(d.renderer.globalAnimation),q,n;a.labelEdge.length=0;a.overlap=!1;b([k,e,x],function(a){for(var c in a)a[c].isActive=!1});if(a.hasData()||l)a.minorTickInterval&&!a.categories&&b(a.getMinorTickPositions(),
function(c){a.renderMinorTick(c)}),r.length&&(b(r,function(c,b){a.renderTick(c,b)}),F&&(0===a.min||a.single)&&(k[-1]||(k[-1]=new J(a,-1,null,!0)),k[-1].render(-1))),B&&b(r,function(b,h){n=void 0!==r[h+1]?r[h+1]+F:a.max-F;0===h%2&&b<a.max&&n<=a.max+(d.polar?-F:F)&&(x[b]||(x[b]=new c(a)),q=b+F,x[b].options={from:g?y(q):q,to:g?y(n):n,color:B},x[b].render(),x[b].isActive=!0)}),a._addedPlotLB||(b((f.plotLines||[]).concat(f.plotBands||[]),function(c){a.addPlotBandOrLine(c)}),a._addedPlotLB=!0);b([k,e,x],
function(a){var c,b,h=[],f=m.duration;for(c in a)a[c].isActive||(a[c].render(c,!1,0),a[c].isActive=!1,h.push(c));A(function(){for(b=h.length;b--;)a[h[b]]&&!a[h[b]].isActive&&(a[h[b]].destroy(),delete a[h[b]])},a!==x&&d.hasRendered&&f?f:0)});w&&(w[w.isPlaced?"animate":"attr"]({d:this.getLinePath(w.strokeWidth())}),w.isPlaced=!0,w[L?"show":"hide"](!0));u&&L&&(u[u.isNew?"attr":"animate"](a.getTitlePosition()),u.isNew=!1);p&&p.enabled&&a.renderStackTotals();a.isDirty=!1},redraw:function(){this.visible&&
(this.render(),b(this.plotLinesAndBands,function(a){a.render()}));b(this.series,function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,d=c.stacks,h,f=c.plotLinesAndBands,g;a||y(c);for(h in d)e(d[h]),d[h]=null;b([c.ticks,c.minorTicks,c.alternateBands],function(a){e(a)});if(f)for(a=f.length;a--;)f[a].destroy();b("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),function(a){c[a]&&(c[a]=c[a].destroy())});
for(g in c)c.hasOwnProperty(g)&&-1===F(g,c.keepProps)&&delete c[g]},drawCrosshair:function(a,c){var b,d=this.crosshair,h=x(d.snap,!0),f,g=this.cross;a||(a=this.cross&&this.cross.e);this.crosshair&&!1!==(t(c)||!h)?(h?t(c)&&(f=this.isXAxis?c.plotX:this.len-c.plotY):f=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos),t(f)&&(b=this.getPlotLinePath(c&&(this.isXAxis?c.x:x(c.stackY,c.y)),null,null,null,f)||null),t(b)?(c=this.categories&&!this.isRadial,g||(this.cross=g=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+
(c?"category ":"thin ")+d.className).attr({zIndex:x(d.zIndex,2)}).add(),g.attr({stroke:d.color||(c?n("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":x(d.width,1)}),d.dashStyle&&g.attr({dashstyle:d.dashStyle})),g.show().attr({d:b}),c&&!d.width&&g.attr({"stroke-width":this.transA}),this.cross.e=a):this.hideCrosshair()):this.hideCrosshair()},hideCrosshair:function(){this.cross&&this.cross.hide()}};p(a.Axis.prototype,v)})(K);(function(a){var E=a.Axis,D=a.Date,H=a.dateFormat,I=a.defaultOptions,
v=a.defined,n=a.each,m=a.extend,z=a.getMagnitude,t=a.getTZOffset,q=a.normalizeTickInterval,e=a.pick,b=a.timeUnits;E.prototype.getTimeTicks=function(a,w,k,l){var g=[],p={},r=I.global.useUTC,u,f=new D(w-t(w)),B=D.hcMakeTime,d=a.unitRange,x=a.count,c;if(v(w)){f[D.hcSetMilliseconds](d>=b.second?0:x*Math.floor(f.getMilliseconds()/x));if(d>=b.second)f[D.hcSetSeconds](d>=b.minute?0:x*Math.floor(f.getSeconds()/x));if(d>=b.minute)f[D.hcSetMinutes](d>=b.hour?0:x*Math.floor(f[D.hcGetMinutes]()/x));if(d>=b.hour)f[D.hcSetHours](d>=
b.day?0:x*Math.floor(f[D.hcGetHours]()/x));if(d>=b.day)f[D.hcSetDate](d>=b.month?1:x*Math.floor(f[D.hcGetDate]()/x));d>=b.month&&(f[D.hcSetMonth](d>=b.year?0:x*Math.floor(f[D.hcGetMonth]()/x)),u=f[D.hcGetFullYear]());if(d>=b.year)f[D.hcSetFullYear](u-u%x);if(d===b.week)f[D.hcSetDate](f[D.hcGetDate]()-f[D.hcGetDay]()+e(l,1));u=f[D.hcGetFullYear]();l=f[D.hcGetMonth]();var y=f[D.hcGetDate](),L=f[D.hcGetHours]();if(D.hcTimezoneOffset||D.hcGetTimezoneOffset)c=(!r||!!D.hcGetTimezoneOffset)&&(k-w>4*b.month||
t(w)!==t(k)),f=f.getTime(),f=new D(f+t(f));r=f.getTime();for(w=1;r<k;)g.push(r),r=d===b.year?B(u+w*x,0):d===b.month?B(u,l+w*x):!c||d!==b.day&&d!==b.week?c&&d===b.hour?B(u,l,y,L+w*x):r+d*x:B(u,l,y+w*x*(d===b.day?1:7)),w++;g.push(r);d<=b.hour&&1E4>g.length&&n(g,function(a){0===a%18E5&&"000000000"===H("%H%M%S%L",a)&&(p[a]="day")})}g.info=m(a,{higherRanks:p,totalRange:d*x});return g};E.prototype.normalizeTimeTickInterval=function(a,e){var k=e||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",
[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];e=k[k.length-1];var l=b[e[0]],g=e[1],p;for(p=0;p<k.length&&!(e=k[p],l=b[e[0]],g=e[1],k[p+1]&&a<=(l*g[g.length-1]+b[k[p+1][0]])/2);p++);l===b.year&&a<5*l&&(g=[1,2,5]);a=q(a/l,g,"year"===e[0]?Math.max(z(a/l),1):1);return{unitRange:l,count:a,unitName:e[0]}}})(K);(function(a){var E=a.Axis,D=a.getMagnitude,H=a.map,I=a.normalizeTickInterval,v=a.pick;E.prototype.getLogTickPositions=
function(a,m,z,t){var q=this.options,e=this.len,b=this.lin2log,p=this.log2lin,w=[];t||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),w=this.getLinearTickPositions(a,m,z);else if(.08<=a)for(var e=Math.floor(m),k,l,g,F,r,q=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];e<z+1&&!r;e++)for(l=q.length,k=0;k<l&&!r;k++)g=p(b(e)*q[k]),g>m&&(!t||F<=z)&&void 0!==F&&w.push(F),F>z&&(r=!0),F=g;else m=b(m),z=b(z),a=q[t?"minorTickInterval":"tickInterval"],a=v("auto"===a?null:a,this._minorAutoInterval,
q.tickPixelInterval/(t?5:1)*(z-m)/((t?e/this.tickPositions.length:e)||1)),a=I(a,null,D(a)),w=H(this.getLinearTickPositions(a,m,z),p),t||(this._minorAutoInterval=a/5);t||(this.tickInterval=a);return w};E.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};E.prototype.lin2log=function(a){return Math.pow(10,a)}})(K);(function(a){var E=a.dateFormat,D=a.each,H=a.extend,I=a.format,v=a.isNumber,n=a.map,m=a.merge,z=a.pick,t=a.splat,q=a.syncTimeout,e=a.timeUnits;a.Tooltip=function(){this.init.apply(this,
arguments)};a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=e.split&&!a.inverted;this.shared=e.shared||this.split},cleanSplit:function(a){D(this.chart.series,function(b){var e=b&&b.tt;e&&(!e.isActive||a?b.tt=e.destroy():e.isActive=!1)})},getLabel:function(){var a=this.chart.renderer,e=this.options;this.label||(this.split?this.label=a.g("tooltip"):(this.label=a.label("",0,0,e.shape||"callout",null,null,e.useHTML,
null,"tooltip").attr({padding:e.padding,r:e.borderRadius}),this.label.attr({fill:e.backgroundColor,"stroke-width":e.borderWidth}).css(e.style).shadow(e.shadow)),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();this.init(this.chart,m(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},
move:function(a,e,w,k){var b=this,g=b.now,p=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(a-g.x)||1<Math.abs(e-g.y)),r=b.followPointer||1<b.len;H(g,{x:p?(2*g.x+a)/3:a,y:p?(g.y+e)/2:e,anchorX:r?void 0:p?(2*g.anchorX+w)/3:w,anchorY:r?void 0:p?(g.anchorY+k)/2:k});b.getLabel().attr(g);p&&(clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){b&&b.move(a,e,w,k)},32))},hide:function(a){var b=this;clearTimeout(this.hideTimer);a=z(a,this.options.hideDelay,500);this.isHidden||(this.hideTimer=
q(function(){b.getLabel()[a?"fadeOut":"hide"]();b.isHidden=!0},a))},getAnchor:function(a,e){var b,k=this.chart,l=k.inverted,g=k.plotTop,p=k.plotLeft,r=0,u=0,f,B;a=t(a);b=a[0].tooltipPos;this.followPointer&&e&&(void 0===e.chartX&&(e=k.pointer.normalize(e)),b=[e.chartX-k.plotLeft,e.chartY-g]);b||(D(a,function(a){f=a.series.yAxis;B=a.series.xAxis;r+=a.plotX+(!l&&B?B.left-p:0);u+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!l&&f?f.top-g:0)}),r/=a.length,u/=a.length,b=[l?k.plotWidth-u:r,this.shared&&
!l&&1<a.length&&e?e.chartY-g:l?k.plotHeight-r:u]);return n(b,Math.round)},getPosition:function(a,e,w){var b=this.chart,l=this.distance,g={},p=w.h||0,r,u=["y",b.chartHeight,e,w.plotY+b.plotTop,b.plotTop,b.plotTop+b.plotHeight],f=["x",b.chartWidth,a,w.plotX+b.plotLeft,b.plotLeft,b.plotLeft+b.plotWidth],B=!this.followPointer&&z(w.ttBelow,!b.inverted===!!w.negative),d=function(a,c,b,d,f,y){var h=b<d-l,A=d+l+b<c,r=d-l-b;d+=l;if(B&&A)g[a]=d;else if(!B&&h)g[a]=r;else if(h)g[a]=Math.min(y-b,0>r-p?r:r-p);
else if(A)g[a]=Math.max(f,d+p+b>c?d:d+p);else return!1},x=function(a,c,b,d){var h;d<l||d>c-l?h=!1:g[a]=d<b/2?1:d>c-b/2?c-b-2:d-b/2;return h},c=function(a){var c=u;u=f;f=c;r=a},y=function(){!1!==d.apply(0,u)?!1!==x.apply(0,f)||r||(c(!0),y()):r?g.x=g.y=0:(c(!0),y())};(b.inverted||1<this.len)&&c();y();return g},defaultFormatter:function(a){var b=this.points||t(this),e;e=[a.tooltipFooterHeaderFormatter(b[0])];e=e.concat(a.bodyFormatter(b));e.push(a.tooltipFooterHeaderFormatter(b[0],!0));return e},refresh:function(a,
e){var b=this.chart,k,l=this.options,g,p,r={},u=[];k=l.formatter||this.defaultFormatter;var r=b.hoverPoints,f=this.shared;clearTimeout(this.hideTimer);this.followPointer=t(a)[0].series.tooltipOptions.followPointer;p=this.getAnchor(a,e);e=p[0];g=p[1];!f||a.series&&a.series.noSharedTooltip?r=a.getLabelConfig():(b.hoverPoints=a,r&&D(r,function(a){a.setState()}),D(a,function(a){a.setState("hover");u.push(a.getLabelConfig())}),r={x:a[0].category,y:a[0].y},r.points=u,a=a[0]);this.len=u.length;r=k.call(r,
this);f=a.series;this.distance=z(f.tooltipOptions.distance,16);!1===r?this.hide():(k=this.getLabel(),this.isHidden&&k.attr({opacity:1}).show(),this.split?this.renderSplit(r,b.hoverPoints):(k.attr({text:r&&r.join?r.join(""):r}),k.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+z(a.colorIndex,f.colorIndex)),k.attr({stroke:l.borderColor||a.color||f.color||"#666666"}),this.updatePosition({plotX:e,plotY:g,negative:a.negative,ttBelow:a.ttBelow,h:p[2]||0})),this.isHidden=!1)},renderSplit:function(b,
e){var p=this,k=[],l=this.chart,g=l.renderer,F=!0,r=this.options,u,f=this.getLabel();D(b.slice(0,e.length+1),function(a,b){b=e[b-1]||{isHeader:!0,plotX:e[0].plotX};var d=b.series||p,c=d.tt,y=b.series||{},B="highcharts-color-"+z(b.colorIndex,y.colorIndex,"none");c||(d.tt=c=g.label(null,null,null,"callout").addClass("highcharts-tooltip-box "+B).attr({padding:r.padding,r:r.borderRadius,fill:r.backgroundColor,stroke:b.color||y.color||"#333333","stroke-width":r.borderWidth}).add(f));c.isActive=!0;c.attr({text:a});
c.css(r.style);a=c.getBBox();y=a.width+c.strokeWidth();b.isHeader?(u=a.height,y=Math.max(0,Math.min(b.plotX+l.plotLeft-y/2,l.chartWidth-y))):y=b.plotX+l.plotLeft-z(r.distance,16)-y;0>y&&(F=!1);a=(b.series&&b.series.yAxis&&b.series.yAxis.pos)+(b.plotY||0);a-=l.plotTop;k.push({target:b.isHeader?l.plotHeight+u:a,rank:b.isHeader?1:0,size:d.tt.getBBox().height+1,point:b,x:y,tt:c})});this.cleanSplit();a.distribute(k,l.plotHeight+u);D(k,function(a){var b=a.point,f=b.series;a.tt.attr({visibility:void 0===
a.pos?"hidden":"inherit",x:F||b.isHeader?a.x:b.plotX+l.plotLeft+z(r.distance,16),y:a.pos+l.plotTop,anchorX:b.isHeader?b.plotX+l.plotLeft:b.plotX+f.xAxis.pos,anchorY:b.isHeader?a.pos+l.plotTop-15:b.plotY+f.yAxis.pos})})},updatePosition:function(a){var b=this.chart,e=this.getLabel(),e=(this.options.positioner||this.getPosition).call(this,e.width,e.height,a);this.move(Math.round(e.x),Math.round(e.y||0),a.plotX+b.plotLeft,a.plotY+b.plotTop)},getDateFormat:function(a,p,w,k){var b=E("%m-%d %H:%M:%S.%L",
p),g,F,r={millisecond:15,second:12,minute:9,hour:6,day:3},u="millisecond";for(F in e){if(a===e.week&&+E("%w",p)===w&&"00:00:00.000"===b.substr(6)){F="week";break}if(e[F]>a){F=u;break}if(r[F]&&b.substr(r[F])!=="01-01 00:00:00.000".substr(r[F]))break;"week"!==F&&(u=F)}F&&(g=k[F]);return g},getXDateFormat:function(a,e,w){e=e.dateTimeLabelFormats;var b=w&&w.closestPointRange;return(b?this.getDateFormat(b,a.x,w.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(a,e){var b=e?"footer":
"header";e=a.series;var k=e.tooltipOptions,l=k.xDateFormat,g=e.xAxis,F=g&&"datetime"===g.options.type&&v(a.key),b=k[b+"Format"];F&&!l&&(l=this.getXDateFormat(a,k,g));F&&l&&(b=b.replace("{point.key}","{point.key:"+l+"}"));return I(b,{point:a,series:e})},bodyFormatter:function(a){return n(a,function(a){var b=a.series.tooltipOptions;return(b.pointFormatter||a.point.tooltipFormatter).call(a.point,b.pointFormat)})}}})(K);(function(a){var E=a.addEvent,D=a.attr,H=a.charts,I=a.color,v=a.css,n=a.defined,m=
a.doc,z=a.each,t=a.extend,q=a.fireEvent,e=a.offset,b=a.pick,p=a.removeEvent,w=a.splat,k=a.Tooltip,l=a.win;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,l){this.options=l;this.chart=a;this.runChartClick=l.chart.events&&!!l.chart.events.click;this.pinchDown=[];this.lastValidTouch={};k&&l.tooltip.enabled&&(a.tooltip=new k(a,l.tooltip),this.followTouchMove=b(l.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var g=this.chart,l=g.options.chart,e=l.zoomType||
"",g=g.inverted;/touch/.test(a.type)&&(e=b(l.pinchType,e));this.zoomX=a=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=a&&!g||e&&g;this.zoomVert=e&&!g||a&&g;this.hasZoom=a||e},normalize:function(a,b){var g,u;a=a||l.event;a.target||(a.target=a.srcElement);u=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:a;b||(this.chartPosition=b=e(this.chart.container));void 0===u.pageX?(g=Math.max(a.x,a.clientX-b.left),b=a.y):(g=u.pageX-b.left,b=u.pageY-b.top);return t(a,{chartX:Math.round(g),
chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};z(this.chart.axes,function(g){b[g.isXAxis?"xAxis":"yAxis"].push({axis:g,value:g.toValue(a[g.horiz?"chartX":"chartY"])})});return b},runPointActions:function(g){var l=this.chart,r=l.series,e=l.tooltip,f=e?e.shared:!1,k=!0,d=l.hoverPoint,x=l.hoverSeries,c,y,p,A=[],J;if(!f&&!x)for(c=0;c<r.length;c++)if(r[c].directTouch||!r[c].options.stickyTracking)r=[];x&&(f?x.noSharedTooltip:x.directTouch)&&d?A=[d]:(f||!x||x.options.stickyTracking||
(r=[x]),z(r,function(a){y=a.noSharedTooltip&&f;p=!f&&a.directTouch;a.visible&&!y&&!p&&b(a.options.enableMouseTracking,!0)&&(J=a.searchPoint(g,!y&&1===a.kdDimensions))&&J.series&&A.push(J)}),A.sort(function(a,c){var b=a.distX-c.distX,d=a.dist-c.dist,h=(c.series.group&&c.series.group.zIndex)-(a.series.group&&a.series.group.zIndex);return 0!==b&&f?b:0!==d?d:0!==h?h:a.series.index>c.series.index?-1:1}));if(f)for(c=A.length;c--;)(A[c].x!==A[0].x||A[c].series.noSharedTooltip)&&A.splice(c,1);if(A[0]&&(A[0]!==
this.prevKDPoint||e&&e.isHidden)){if(f&&!A[0].series.noSharedTooltip){for(c=0;c<A.length;c++)A[c].onMouseOver(g,A[c]!==(x&&x.directTouch&&d||A[0]));A.length&&e&&e.refresh(A.sort(function(a,c){return a.series.index-c.series.index}),g)}else if(e&&e.refresh(A[0],g),!x||!x.directTouch)A[0].onMouseOver(g);this.prevKDPoint=A[0];k=!1}k&&(r=x&&x.tooltipOptions.followPointer,e&&r&&!e.isHidden&&(r=e.getAnchor([{}],g),e.updatePosition({plotX:r[0],plotY:r[1]})));this.unDocMouseMove||(this.unDocMouseMove=E(m,
"mousemove",function(c){if(H[a.hoverChartIndex])H[a.hoverChartIndex].pointer.onDocumentMouseMove(c)}));z(f?A:[b(d,A[0])],function(a){z(l.axes,function(c){(!a||a.series&&a.series[c.coll]===c)&&c.drawCrosshair(g,a)})})},reset:function(a,b){var g=this.chart,l=g.hoverSeries,f=g.hoverPoint,e=g.hoverPoints,d=g.tooltip,k=d&&d.shared?e:f;a&&k&&z(w(k),function(c){c.series.isCartesian&&void 0===c.plotX&&(a=!1)});if(a)d&&k&&(d.refresh(k),f&&(f.setState(f.state,!0),z(g.axes,function(a){a.crosshair&&a.drawCrosshair(null,
f)})));else{if(f)f.onMouseOut();e&&z(e,function(a){a.setState()});if(l)l.onMouseOut();d&&d.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());z(g.axes,function(a){a.hideCrosshair()});this.hoverX=this.prevKDPoint=g.hoverPoints=g.hoverPoint=null}},scaleGroups:function(a,b){var g=this.chart,l;z(g.series,function(f){l=a||f.getPlotBox();f.xAxis&&f.xAxis.zoomEnabled&&f.group&&(f.group.attr(l),f.markerGroup&&(f.markerGroup.attr(l),f.markerGroup.clip(b?g.clipRect:null)),f.dataLabelsGroup&&
f.dataLabelsGroup.attr(l))});g.clipRect.attr(b||g.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,g=b.options.chart,l=a.chartX,f=a.chartY,e=this.zoomHor,d=this.zoomVert,k=b.plotLeft,c=b.plotTop,y=b.plotWidth,p=b.plotHeight,A,J=this.selectionMarker,h=this.mouseDownX,q=this.mouseDownY,w=g.panKey&&a[g.panKey+"Key"];J&&J.touch||(l<k?l=k:l>k+y&&(l=k+y),f<
c?f=c:f>c+p&&(f=c+p),this.hasDragged=Math.sqrt(Math.pow(h-l,2)+Math.pow(q-f,2)),10<this.hasDragged&&(A=b.isInsidePlot(h-k,q-c),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&A&&!w&&!J&&(this.selectionMarker=J=b.renderer.rect(k,c,e?1:y,d?1:p,0).attr({fill:g.selectionMarkerFill||I("#335cad").setOpacity(.25).get(),"class":"highcharts-selection-marker",zIndex:7}).add()),J&&e&&(l-=h,J.attr({width:Math.abs(l),x:(0<l?0:l)+h})),J&&d&&(l=f-q,J.attr({height:Math.abs(l),y:(0<l?0:l)+q})),A&&!J&&g.panning&&b.pan(a,
g.panning)))},drop:function(a){var b=this,g=this.chart,l=this.hasPinched;if(this.selectionMarker){var f={originalEvent:a,xAxis:[],yAxis:[]},e=this.selectionMarker,d=e.attr?e.attr("x"):e.x,k=e.attr?e.attr("y"):e.y,c=e.attr?e.attr("width"):e.width,y=e.attr?e.attr("height"):e.height,p;if(this.hasDragged||l)z(g.axes,function(g){if(g.zoomEnabled&&n(g.min)&&(l||b[{xAxis:"zoomX",yAxis:"zoomY"}[g.coll]])){var e=g.horiz,h="touchend"===a.type?g.minPixelPadding:0,A=g.toValue((e?d:k)+h),e=g.toValue((e?d+c:k+
y)-h);f[g.coll].push({axis:g,min:Math.min(A,e),max:Math.max(A,e)});p=!0}}),p&&q(g,"selection",f,function(a){g.zoom(t(a,l?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();l&&this.scaleGroups()}g&&(v(g.container,{cursor:g._cursor}),g.cancelClick=10<this.hasDragged,g.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);this.zoomOption(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(b){H[a.hoverChartIndex]&&
H[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,g=this.chartPosition;a=this.normalize(a,g);!g||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var g=H[a.hoverChartIndex];g&&(b.relatedTarget||b.toElement)&&(g.pointer.reset(),g.pointer.chartPosition=null)},onContainerMouseMove:function(b){var g=this.chart;n(a.hoverChartIndex)&&H[a.hoverChartIndex]&&H[a.hoverChartIndex].mouseIsDown||
(a.hoverChartIndex=g.index);b=this.normalize(b);b.returnValue=!1;"mousedown"===g.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!g.isInsidePlot(b.chartX-g.plotLeft,b.chartY-g.plotTop)||g.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var g;a;){if(g=D(a,"class")){if(-1!==g.indexOf(b))return!0;if(-1!==g.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;if(!(!b||!a||
b.options.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,g=b.hoverPoint,l=b.plotLeft,f=b.plotTop;a=this.normalize(a);b.cancelClick||(g&&this.inClass(a.target,"highcharts-tracker")?(q(g.series,"click",t(a,{point:g})),b.hoverPoint&&g.firePointEvent("click",a)):(t(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-l,a.chartY-f)&&q(b,"click",a)))},setDOMEvents:function(){var b=
this,l=b.chart.container;l.onmousedown=function(a){b.onContainerMouseDown(a)};l.onmousemove=function(a){b.onContainerMouseMove(a)};l.onclick=function(a){b.onContainerClick(a)};E(l,"mouseleave",b.onContainerMouseLeave);1===a.chartCount&&E(m,"mouseup",b.onDocumentMouseUp);a.hasTouch&&(l.ontouchstart=function(a){b.onContainerTouchStart(a)},l.ontouchmove=function(a){b.onContainerTouchMove(a)},1===a.chartCount&&E(m,"touchend",b.onDocumentTouchEnd))},destroy:function(){var b;p(this.chart.container,"mouseleave",
this.onContainerMouseLeave);a.chartCount||(p(m,"mouseup",this.onDocumentMouseUp),p(m,"touchend",this.onDocumentTouchEnd));clearInterval(this.tooltipTimeout);for(b in this)this[b]=null}}})(K);(function(a){var E=a.charts,D=a.each,H=a.extend,I=a.map,v=a.noop,n=a.pick;H(a.Pointer.prototype,{pinchTranslate:function(a,n,t,q,e,b){this.zoomHor&&this.pinchTranslateDirection(!0,a,n,t,q,e,b);this.zoomVert&&this.pinchTranslateDirection(!1,a,n,t,q,e,b)},pinchTranslateDirection:function(a,n,t,q,e,b,p,w){var k=
this.chart,l=a?"x":"y",g=a?"X":"Y",m="chart"+g,r=a?"width":"height",u=k["plot"+(a?"Left":"Top")],f,B,d=w||1,x=k.inverted,c=k.bounds[a?"h":"v"],y=1===n.length,L=n[0][m],A=t[0][m],J=!y&&n[1][m],h=!y&&t[1][m],G;t=function(){!y&&20<Math.abs(L-J)&&(d=w||Math.abs(A-h)/Math.abs(L-J));B=(u-A)/d+L;f=k["plot"+(a?"Width":"Height")]/d};t();n=B;n<c.min?(n=c.min,G=!0):n+f>c.max&&(n=c.max-f,G=!0);G?(A-=.8*(A-p[l][0]),y||(h-=.8*(h-p[l][1])),t()):p[l]=[A,h];x||(b[l]=B-u,b[r]=f);b=x?1/d:d;e[r]=f;e[l]=n;q[x?a?"scaleY":
"scaleX":"scale"+g]=d;q["translate"+g]=b*u+(A-b*L)},pinch:function(a){var m=this,t=m.chart,q=m.pinchDown,e=a.touches,b=e.length,p=m.lastValidTouch,w=m.hasZoom,k=m.selectionMarker,l={},g=1===b&&(m.inClass(a.target,"highcharts-tracker")&&t.runTrackerClick||m.runChartClick),F={};1<b&&(m.initiated=!0);w&&m.initiated&&!g&&a.preventDefault();I(e,function(a){return m.normalize(a)});"touchstart"===a.type?(D(e,function(a,b){q[b]={chartX:a.chartX,chartY:a.chartY}}),p.x=[q[0].chartX,q[1]&&q[1].chartX],p.y=[q[0].chartY,
q[1]&&q[1].chartY],D(t.axes,function(a){if(a.zoomEnabled){var b=t.bounds[a.horiz?"h":"v"],f=a.minPixelPadding,g=a.toPixels(n(a.options.min,a.dataMin)),d=a.toPixels(n(a.options.max,a.dataMax)),l=Math.max(g,d);b.min=Math.min(a.pos,Math.min(g,d)-f);b.max=Math.max(a.pos+a.len,l+f)}}),m.res=!0):m.followTouchMove&&1===b?this.runPointActions(m.normalize(a)):q.length&&(k||(m.selectionMarker=k=H({destroy:v,touch:!0},t.plotBox)),m.pinchTranslate(q,e,l,k,F,p),m.hasPinched=w,m.scaleGroups(l,F),m.res&&(m.res=
!1,this.reset(!1,0)))},touch:function(m,v){var t=this.chart,q,e;if(t.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=t.index;1===m.touches.length?(m=this.normalize(m),(e=t.isInsidePlot(m.chartX-t.plotLeft,m.chartY-t.plotTop))&&!t.openMenu?(v&&this.runPointActions(m),"touchmove"===m.type&&(v=this.pinchDown,q=v[0]?4<=Math.sqrt(Math.pow(v[0].chartX-m.chartX,2)+Math.pow(v[0].chartY-m.chartY,2)):!1),n(q,!0)&&this.pinch(m)):v&&this.reset()):2===m.touches.length&&
this.pinch(m)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(m){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(m)}})})(K);(function(a){var E=a.addEvent,D=a.charts,H=a.css,I=a.doc,v=a.extend,n=a.noop,m=a.Pointer,z=a.removeEvent,t=a.win,q=a.wrap;if(t.PointerEvent||t.MSPointerEvent){var e={},b=!!t.PointerEvent,p=function(){var a,b=[];b.item=function(a){return this[a]};for(a in e)e.hasOwnProperty(a)&&
b.push({pageX:e[a].pageX,pageY:e[a].pageY,target:e[a].target});return b},w=function(b,l,g,e){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!D[a.hoverChartIndex]||(e(b),e=D[a.hoverChartIndex].pointer,e[l]({type:g,target:b.currentTarget,preventDefault:n,touches:p()}))};v(m.prototype,{onContainerPointerDown:function(a){w(a,"onContainerTouchStart","touchstart",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){w(a,"onContainerTouchMove",
"touchmove",function(a){e[a.pointerId]={pageX:a.pageX,pageY:a.pageY};e[a.pointerId].target||(e[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){w(a,"onDocumentTouchEnd","touchend",function(a){delete e[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,b?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,b?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(I,b?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});q(m.prototype,
"init",function(a,b,g){a.call(this,b,g);this.hasZoom&&H(b.container,{"-ms-touch-action":"none","touch-action":"none"})});q(m.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(E)});q(m.prototype,"destroy",function(a){this.batchMSEvents(z);a.call(this)})}})(K);(function(a){var E,D=a.addEvent,H=a.css,I=a.discardElement,v=a.defined,n=a.each,m=a.extend,z=a.isFirefox,t=a.marginNames,q=a.merge,e=a.pick,b=a.setAnimation,p=a.stableSort,w=a.win,k=a.wrap;
E=a.Legend=function(a,b){this.init(a,b)};E.prototype={init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),D(this.chart,"endResize",function(){this.legend.positionCheckboxes()}))},setOptions:function(a){var b=e(a.padding,8);this.options=a;this.itemStyle=a.itemStyle;this.itemHiddenStyle=q(this.itemStyle,a.itemHiddenStyle);this.itemMarginTop=a.itemMarginTop||0;this.initialItemX=this.padding=b;this.initialItemY=b-5;this.itemHeight=this.maxItemWidth=0;this.symbolWidth=e(a.symbolWidth,
16);this.pages=[]},update:function(a,b){var g=this.chart;this.setOptions(q(!0,this.options,a));this.destroy();g.isDirtyLegend=g.isDirtyBox=!0;e(b,!0)&&g.redraw()},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");var g=this.options,e=a.legendItem,l=a.legendLine,f=a.legendSymbol,k=this.itemHiddenStyle.color,g=b?g.itemStyle.color:k,d=b?a.color||k:k,x=a.options&&a.options.marker,c={fill:d},y;e&&e.css({fill:g,color:g});l&&l.attr({stroke:d});if(f){if(x&&
f.isMarker&&(c=a.pointAttribs(),!b))for(y in c)c[y]=k;f.attr(c)}},positionItem:function(a){var b=this.options,e=b.symbolPadding,b=!b.rtl,l=a._legendItemPos,k=l[0],l=l[1],f=a.checkbox;(a=a.legendGroup)&&a.element&&a.translate(b?k:this.legendWidth-k-2*e-4,l);f&&(f.x=k,f.y=l)},destroyItem:function(a){var b=a.checkbox;n(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&I(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}
n(this.getAllItems(),function(b){n(["legendItem","legendGroup"],a,b)});n(["box","title","group"],a,this);this.display=null},positionCheckboxes:function(a){var b=this.group&&this.group.alignAttr,e,l=this.clipHeight||this.legendHeight,k=this.titleHeight;b&&(e=b.translateY,n(this.allItems,function(f){var g=f.checkbox,d;g&&(d=e+k+g.y+(a||0)+3,H(g,{left:b.translateX+f.checkboxOffset+g.x-20+"px",top:d+"px",display:d>e-6&&d<e+l-6?"":"none"}))}))},renderTitle:function(){var a=this.padding,b=this.options.title,
e=0;b.text&&(this.title||(this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group)),a=this.title.getBBox(),e=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(b){var g=this.options;b.legendItem.attr({text:g.labelFormat?a.format(g.labelFormat,b):g.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,l=b.renderer,k=this.options,u="horizontal"===
k.layout,f=this.symbolWidth,p=k.symbolPadding,d=this.itemStyle,x=this.itemHiddenStyle,c=this.padding,y=u?e(k.itemDistance,20):0,m=!k.rtl,A=k.width,J=k.itemMarginBottom||0,h=this.itemMarginTop,w=this.initialItemX,n=a.legendItem,t=!a.series,v=!t&&a.series.drawLegendSymbol?a.series:a,z=v.options,z=this.createCheckboxForItem&&z&&z.showCheckbox,C=k.useHTML;n||(a.legendGroup=l.g("legend-item").addClass("highcharts-"+v.type+"-series highcharts-color-"+a.colorIndex+(a.options.className?" "+a.options.className:
"")+(t?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=n=l.text("",m?f+p:-p,this.baseline||0,C).css(q(a.visible?d:x)).attr({align:m?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(d=d.fontSize,this.fontMetrics=l.fontMetrics(d,n),this.baseline=this.fontMetrics.f+3+h,n.attr("y",this.baseline)),this.symbolHeight=k.symbolHeight||this.fontMetrics.f,v.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,n,C),z&&this.createCheckboxForItem(a));
this.colorizeItem(a,a.visible);this.setText(a);l=n.getBBox();f=a.checkboxOffset=k.itemWidth||a.legendItemWidth||f+p+l.width+y+(z?20:0);this.itemHeight=p=Math.round(a.legendItemHeight||l.height);u&&this.itemX-w+f>(A||b.chartWidth-2*c-w-k.x)&&(this.itemX=w,this.itemY+=h+this.lastLineHeight+J,this.lastLineHeight=0);this.maxItemWidth=Math.max(this.maxItemWidth,f);this.lastItemY=h+this.itemY+J;this.lastLineHeight=Math.max(p,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];u?this.itemX+=f:
(this.itemY+=h+p+J,this.lastLineHeight=p);this.offsetWidth=A||Math.max((u?this.itemX-w-y:f)+c,this.offsetWidth)},getAllItems:function(){var a=[];n(this.chart.series,function(b){var g=b&&b.options;b&&e(g.showInLegend,v(g.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===g.legendType?b.data:b)))});return a},adjustMargins:function(a,b){var g=this.chart,l=this.options,k=l.align.charAt(0)+l.verticalAlign.charAt(0)+l.layout.charAt(0);l.floating||n([/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,
/(lbv|lm|ltv)/],function(f,r){f.test(k)&&!v(a[r])&&(g[t[r]]=Math.max(g[t[r]],g.legend[(r+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][r]*l[r%2?"x":"y"]+e(l.margin,12)+b[r]))})},render:function(){var a=this,b=a.chart,e=b.renderer,k=a.group,u,f,B,d,x=a.box,c=a.options,y=a.padding;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;k||(a.group=k=e.g("legend").attr({zIndex:7}).add(),a.contentGroup=e.g().attr({zIndex:1}).add(k),a.scrollGroup=e.g().add(a.contentGroup));a.renderTitle();
u=a.getAllItems();p(u,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});c.reversed&&u.reverse();a.allItems=u;a.display=f=!!u.length;a.lastLineHeight=0;n(u,function(b){a.renderItem(b)});B=(c.width||a.offsetWidth)+y;d=a.lastItemY+a.lastLineHeight+a.titleHeight;d=a.handleOverflow(d);d+=y;x||(a.box=x=e.rect().addClass("highcharts-legend-box").attr({r:c.borderRadius}).add(k),x.isNew=!0);x.attr({stroke:c.borderColor,"stroke-width":c.borderWidth||0,fill:c.backgroundColor||
"none"}).shadow(c.shadow);0<B&&0<d&&(x[x.isNew?"attr":"animate"](x.crisp({x:0,y:0,width:B,height:d},x.strokeWidth())),x.isNew=!1);x[f?"show":"hide"]();a.legendWidth=B;a.legendHeight=d;n(u,function(b){a.positionItem(b)});f&&k.align(m({width:B,height:d},c),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,l=this.chart,k=l.renderer,u=this.options,f=u.y,l=l.spacingBox.height+("top"===u.verticalAlign?-f:f)-this.padding,f=u.maxHeight,p,d=this.clipRect,x=u.navigation,
c=e(x.animation,!0),y=x.arrowSize||12,w=this.nav,A=this.pages,J=this.padding,h,m=this.allItems,q=function(a){a?d.attr({height:a}):d&&(b.clipRect=d.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+J+"px,9999px,"+(J+a)+"px,0)":"auto")};"horizontal"!==u.layout||"middle"===u.verticalAlign||u.floating||(l/=2);f&&(l=Math.min(l,f));A.length=0;a>l&&!1!==x.enabled?(this.clipHeight=p=Math.max(l-20-this.titleHeight-J,0),this.currentPage=e(this.currentPage,1),this.fullHeight=
a,n(m,function(a,b){var c=a._legendItemPos[1];a=Math.round(a.legendItem.getBBox().height);var d=A.length;if(!d||c-A[d-1]>p&&(h||c)!==A[d-1])A.push(h||c),d++;b===m.length-1&&c+a-A[d-1]>p&&A.push(c);c!==h&&(h=c)}),d||(d=b.clipRect=k.clipRect(0,J,9999,0),b.contentGroup.clip(d)),q(p),w||(this.nav=w=k.g().attr({zIndex:1}).add(this.group),this.up=k.symbol("triangle",0,0,y,y).on("click",function(){b.scroll(-1,c)}).add(w),this.pager=k.text("",15,10).addClass("highcharts-legend-navigation").css(x.style).add(w),
this.down=k.symbol("triangle-down",0,0,y,y).on("click",function(){b.scroll(1,c)}).add(w)),b.scroll(0),a=l):w&&(q(),w.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,g){var e=this.pages,k=e.length;a=this.currentPage+a;var l=this.clipHeight,f=this.options.navigation,p=this.pager,d=this.padding;a>k&&(a=k);0<a&&(void 0!==g&&b(g,this.chart),this.nav.attr({translateX:d,translateY:l+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===
a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),p.attr({text:a+"/"+k}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===k?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),this.up.attr({fill:1===a?f.inactiveColor:f.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===k?f.inactiveColor:f.activeColor}).css({cursor:a===k?"default":"pointer"}),g=-e[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:g}),this.currentPage=
a,this.positionCheckboxes(g))}};a.LegendSymbolMixin={drawRectangle:function(a,b){var g=a.symbolHeight,k=a.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(k?(a.symbolWidth-g)/2:0,a.baseline-g+1,k?g:a.symbolWidth,g,e(a.options.symbolRadius,g/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,k=b.marker,l=a.symbolWidth,u=a.symbolHeight,f=u/2,p=this.chart.renderer,d=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);
var x;x={"stroke-width":b.lineWidth||0};b.dashStyle&&(x.dashstyle=b.dashStyle);this.legendLine=p.path(["M",0,a,"L",l,a]).addClass("highcharts-graph").attr(x).add(d);k&&!1!==k.enabled&&(b=Math.min(e(k.radius,f),f),0===this.symbol.indexOf("url")&&(k=q(k,{width:u,height:u}),b=0),this.legendSymbol=k=p.symbol(this.symbol,l/2-b,a-b,2*b,2*b,k).addClass("highcharts-point").add(d),k.isMarker=!0)}};(/Trident\/7\.0/.test(w.navigator.userAgent)||z)&&k(E.prototype,"positionItem",function(a,b){var e=this,g=function(){b._legendItemPos&&
a.call(e,b)};g();setTimeout(g)})})(K);(function(a){var E=a.addEvent,D=a.animate,H=a.animObject,I=a.attr,v=a.doc,n=a.Axis,m=a.createElement,z=a.defaultOptions,t=a.discardElement,q=a.charts,e=a.css,b=a.defined,p=a.each,w=a.extend,k=a.find,l=a.fireEvent,g=a.getStyle,F=a.grep,r=a.isNumber,u=a.isObject,f=a.isString,B=a.Legend,d=a.marginNames,x=a.merge,c=a.Pointer,y=a.pick,L=a.pInt,A=a.removeEvent,J=a.seriesTypes,h=a.splat,G=a.svg,Q=a.syncTimeout,P=a.win,N=a.Renderer,S=a.Chart=function(){this.getArgs.apply(this,
arguments)};a.chart=function(a,b,c){return new S(a,b,c)};S.prototype={callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(f(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,c){var d,h=b.series;b.series=null;d=x(z,b);d.series=b.series=h;this.userOptions=b;this.respRules=[];b=d.chart;h=b.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.callback=c;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.hasCartesianSeries=b.showAxes;
var f;this.index=q.length;q.push(this);a.chartCount++;if(h)for(f in h)E(this,f,h[f]);this.xAxis=[];this.yAxis=[];this.pointCount=this.colorCounter=this.symbolCounter=0;this.firstRender()},initSeries:function(b){var c=this.options.chart;(c=J[b.type||c.type||c.defaultSeriesType])||a.error(17,!0);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].name||"Series "+(b[a].index+1))},isInsidePlot:function(a,b,c){var d=c?
b:a;a=c?a:b;return 0<=d&&d<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(b){var c=this.axes,d=this.series,h=this.pointer,f=this.legend,e=this.isDirtyLegend,y,g,A=this.hasCartesianSeries,k=this.isDirtyBox,u=d.length,r=u,x=this.renderer,J=x.isHidden(),C=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);J&&this.cloneRenderTo();for(this.layOutTitles();r--;)if(b=d[r],b.options.stacking&&(y=!0,b.isDirty)){g=!0;break}if(g)for(r=u;r--;)b=d[r],b.options.stacking&&(b.isDirty=
!0);p(d,function(a){a.isDirty&&"point"===a.options.legendType&&(a.updateTotals&&a.updateTotals(),e=!0);a.isDirtyData&&l(a,"updatedData")});e&&f.options.enabled&&(f.render(),this.isDirtyLegend=!1);y&&this.getStacks();A&&p(c,function(a){a.updateNames();a.setScale()});this.getMargins();A&&(p(c,function(a){a.isDirty&&(k=!0)}),p(c,function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,C.push(function(){l(a,"afterSetExtremes",w(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(k||y)&&a.redraw()}));
k&&this.drawChartBox();l(this,"predraw");p(d,function(a){(k||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});h&&h.reset(!0);x.draw();l(this,"redraw");l(this,"render");J&&this.cloneRenderTo(!0);p(C,function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var c,d=this.series,h;c=k(this.axes,b)||k(this.series,b);for(h=0;!c&&h<d.length;h++)c=k(d[h].points||[],b);return c},getAxes:function(){var a=this,b=this.options,c=b.xAxis=h(b.xAxis||{}),b=b.yAxis=h(b.yAxis||
{});p(c,function(a,b){a.index=b;a.isX=!0});p(b,function(a,b){a.index=b});c=c.concat(b);p(c,function(b){new n(a,b)})},getSelectedPoints:function(){var a=[];p(this.series,function(b){a=a.concat(F(b.points||[],function(a){return a.selected}))});return a},getSelectedSeries:function(){return F(this.series,function(a){return a.selected})},setTitle:function(a,b,c){var d=this,h=d.options,f;f=h.title=x({style:{color:"#333333",fontSize:h.isStock?"16px":"18px"}},h.title,a);h=h.subtitle=x({style:{color:"#666666"}},
h.subtitle,b);p([["title",a,f],["subtitle",b,h]],function(a,b){var c=a[0],h=d[c],f=a[1];a=a[2];h&&f&&(d[c]=h=h.destroy());a&&a.text&&!h&&(d[c]=d.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),d[c].update=function(a){d.setTitle(!b&&a,b&&a)},d[c].css(a.style))});d.layOutTitles(c)},layOutTitles:function(a){var b=0,c,d=this.renderer,h=this.spacingBox;p(["title","subtitle"],function(a){var c=this[a],f=this.options[a],e;c&&(e=f.style.fontSize,
e=d.fontMetrics(e,c).b,c.css({width:(f.width||h.width+f.widthAdjust)+"px"}).align(w({y:b+e+("title"===a?-3:2)},f),!1,"spacingBox"),f.floating||f.verticalAlign||(b=Math.ceil(b+c.getBBox().height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&c&&(this.isDirtyBox=c,this.hasRendered&&y(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=this.options.chart,c=a.width,a=a.height,d=this.renderToClone||this.renderTo;b(c)||(this.containerWidth=g(d,"width"));b(a)||(this.containerHeight=
g(d,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a||this.containerHeight||400)},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;if(a){if(b){for(;b.childNodes.length;)this.renderTo.appendChild(b.firstChild);t(b);delete this.renderToClone}}else c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),e(b,{position:"absolute",top:"-9999px",display:"block"}),b.style.setProperty&&
b.style.setProperty("display","block","important"),v.body.appendChild(b),c&&b.appendChild(c)},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,d=c.chart,h,e;b=this.renderTo;var y=a.uniqueKey(),g;b||(this.renderTo=b=d.renderTo);f(b)&&(this.renderTo=b=v.getElementById(b));b||a.error(13,!0);h=L(I(b,"data-highcharts-chart"));r(h)&&q[h]&&q[h].hasRendered&&q[h].destroy();I(b,"data-highcharts-chart",this.index);b.innerHTML="";
d.skipClone||b.offsetWidth||this.cloneRenderTo();this.getChartSize();h=this.chartWidth;e=this.chartHeight;g=w({position:"relative",overflow:"hidden",width:h+"px",height:e+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},d.style);this.container=b=m("div",{id:y},g,this.renderToClone||b);this._cursor=b.style.cursor;this.renderer=new (a[d.renderer]||N)(b,h,e,null,d.forExport,c.exporting&&c.exporting.allowHTML);this.setClassName(d.className);this.renderer.setStyle(d.style);
this.renderer.chartIndex=this.index},getMargins:function(a){var c=this.spacing,d=this.margin,h=this.titleOffset;this.resetMargins();h&&!b(d[0])&&(this.plotTop=Math.max(this.plotTop,h+this.options.title.margin+c[0]));this.legend.display&&this.legend.adjustMargins(d,c);this.extraMargin&&(this[this.extraMargin.type]=(this[this.extraMargin.type]||0)+this.extraMargin.value);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);a||this.getAxisMargins()},getAxisMargins:function(){var a=this,c=a.axisOffset=
[0,0,0,0],h=a.margin;a.hasCartesianSeries&&p(a.axes,function(a){a.visible&&a.getOffset()});p(d,function(d,f){b(h[f])||(a[d]+=c[f])});a.setChartSize()},reflow:function(a){var c=this,d=c.options.chart,h=c.renderTo,f=b(d.width),e=d.width||g(h,"width"),d=d.height||g(h,"height"),h=a?a.target:P;if(!f&&!c.isPrinting&&e&&d&&(h===P||h===v)){if(e!==c.containerWidth||d!==c.containerHeight)clearTimeout(c.reflowTimeout),c.reflowTimeout=Q(function(){c.container&&c.setSize(void 0,void 0,!1)},a?100:0);c.containerWidth=
e;c.containerHeight=d}},initReflow:function(){var a=this,b;b=E(P,"resize",function(b){a.reflow(b)});E(a,"destroy",b)},setSize:function(b,c,d){var h=this,f=h.renderer;h.isResizing+=1;a.setAnimation(d,h);h.oldChartHeight=h.chartHeight;h.oldChartWidth=h.chartWidth;void 0!==b&&(h.options.chart.width=b);void 0!==c&&(h.options.chart.height=c);h.getChartSize();b=f.globalAnimation;(b?D:e)(h.container,{width:h.chartWidth+"px",height:h.chartHeight+"px"},b);h.setChartSize(!0);f.setSize(h.chartWidth,h.chartHeight,
d);p(h.axes,function(a){a.isDirty=!0;a.setScale()});h.isDirtyLegend=!0;h.isDirtyBox=!0;h.layOutTitles();h.getMargins();h.redraw(d);h.oldChartHeight=null;l(h,"resize");Q(function(){h&&l(h,"endResize",null,function(){--h.isResizing})},H(b).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,h=this.chartHeight,f=this.options.chart,e=this.spacing,y=this.clipOffset,g,A,k,l;this.plotLeft=g=Math.round(this.plotLeft);this.plotTop=A=Math.round(this.plotTop);this.plotWidth=
k=Math.max(0,Math.round(d-g-this.marginRight));this.plotHeight=l=Math.max(0,Math.round(h-A-this.marginBottom));this.plotSizeX=b?l:k;this.plotSizeY=b?k:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:e[3],y:e[0],width:d-e[3]-e[1],height:h-e[0]-e[2]};this.plotBox=c.plotBox={x:g,y:A,width:k,height:l};d=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(d,y[3])/2);c=Math.ceil(Math.max(d,y[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(d,y[1])/
2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(d,y[2])/2-c))};a||p(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this,b=a.options.chart;p(["margin","spacing"],function(c){var d=b[c],h=u(d)?d:[d,d,d,d];p(["Top","Right","Bottom","Left"],function(d,f){a[c][f]=y(b[c+d],h[f])})});p(d,function(b,c){a[b]=y(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=
this.chartWidth,d=this.chartHeight,h=this.chartBackground,f=this.plotBackground,e=this.plotBorder,y,g=this.plotBGImage,A=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,u,r=this.plotLeft,x=this.plotTop,J=this.plotWidth,p=this.plotHeight,w=this.plotBox,m=this.clipRect,q=this.clipBox,B="animate";h||(this.chartBackground=h=b.rect().addClass("highcharts-background").add(),B="attr");y=a.borderWidth||0;u=y+(a.shadow?8:0);A={fill:A||"none"};if(y||h["stroke-width"])A.stroke=a.borderColor,
A["stroke-width"]=y;h.attr(A).shadow(a.shadow);h[B]({x:u/2,y:u/2,width:c-u-y%2,height:d-u-y%2,r:a.borderRadius});B="animate";f||(B="attr",this.plotBackground=f=b.rect().addClass("highcharts-plot-background").add());f[B](w);f.attr({fill:k||"none"}).shadow(a.plotShadow);l&&(g?g.animate(w):this.plotBGImage=b.image(l,r,x,J,p).add());m?m.animate({width:q.width,height:q.height}):this.clipRect=b.clipRect(q);B="animate";e||(B="attr",this.plotBorder=e=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());
e.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});e[B](e.crisp({x:r,y:x,width:J,height:p},-e.strokeWidth()));this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,h,f;p(["inverted","angular","polar"],function(e){c=J[b.type||b.defaultSeriesType];f=b[e]||c&&c.prototype[e];for(h=d&&d.length;!f&&h--;)(c=J[d[h].type])&&c.prototype[e]&&(f=!0);a[e]=f})},linkSeries:function(){var a=this,b=a.series;p(b,function(a){a.linkedSeries.length=
0});p(b,function(b){var c=b.options.linkedTo;f(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=y(b.options.visible,c.options.visible,b.visible))})},renderSeries:function(){p(this.series,function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&p(b.items,function(c){var d=w(b.style,c.style),h=L(d.left)+a.plotLeft,f=L(d.top)+a.plotTop+12;delete d.left;delete d.top;a.renderer.text(c.html,
h,f).attr({zIndex:2}).css(d).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,d,h,f;this.setTitle();this.legend=new B(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;d=this.plotHeight-=21;p(a,function(a){a.setScale()});this.getAxisMargins();h=1.1<c/this.plotWidth;f=1.05<d/this.plotHeight;if(h||f)p(a,function(a){(a.horiz&&h||!a.horiz&&f)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&
p(a,function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=x(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(P.location.href=a.href)}).attr({align:a.position.align,
zIndex:8}).css(a.style).add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,d=b.series,h=b.container,f,e=h&&h.parentNode;l(b,"destroy");q[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");A(b);for(f=c.length;f--;)c[f]=c[f].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(f=d.length;f--;)d[f]=d[f].destroy();p("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});h&&(h.innerHTML="",A(h),e&&t(h));for(f in b)delete b[f]},isReadyToRender:function(){var a=this;return G||P!=P.top||"complete"===v.readyState?!0:(v.attachEvent("onreadystatechange",function(){v.detachEvent("onreadystatechange",a.firstRender);"complete"===v.readyState&&a.firstRender()}),!1)},firstRender:function(){var a=this,b=a.options;if(a.isReadyToRender()){a.getContainer();l(a,"init");a.resetMargins();a.setChartSize();a.propFromSeries();
a.getAxes();p(b.series||[],function(b){a.initSeries(b)});a.linkSeries();l(a,"beforeRender");c&&(a.pointer=new c(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.cloneRenderTo(!0)}},onload:function(){p([this.callback].concat(this.callbacks),function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);l(this,"load");l(this,"render");b(this.index)&&!1!==this.options.chart.reflow&&this.initReflow();this.onload=null}}})(K);(function(a){var E,D=a.each,H=a.extend,I=a.erase,v=a.fireEvent,
n=a.format,m=a.isArray,z=a.isNumber,t=a.pick,q=a.removeEvent;E=a.Point=function(){};E.prototype={init:function(a,b,p){this.series=a;this.color=a.color;this.applyOptions(b,p);a.options.colorByPoint?(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter],b=b.length,p=a.colorCounter,a.colorCounter++,a.colorCounter===b&&(a.colorCounter=0)):p=a.colorIndex;this.colorIndex=t(this.colorIndex,p);a.chart.pointCount++;return this},applyOptions:function(a,b){var e=this.series,w=e.options.pointValKey||
e.pointValKey;a=E.prototype.optionsToObject.call(this,a);H(this,a);this.options=this.options?H(this.options,a):a;a.group&&delete this.group;w&&(this.y=this[w]);this.isNull=t(this.isValid&&!this.isValid(),null===this.x||!z(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===b&&e.xAxis&&e.xAxis.hasNames&&(this.x=e.xAxis.nameToX(this));void 0===this.x&&e&&(this.x=void 0===b?e.autoIncrement(this):b);return this},optionsToObject:function(a){var b={},e=this.series,w=e.options.keys,
k=w||e.pointArrayMap||["y"],l=k.length,g=0,q=0;if(z(a)||null===a)b[k[0]]=a;else if(m(a))for(!w&&a.length>l&&(e=typeof a[0],"string"===e?b.name=a[0]:"number"===e&&(b.x=a[0]),g++);q<l;)w&&void 0===a[g]||(b[k[q]]=a[g]),g++,q++;else"object"===typeof a&&(b=a,a.dataLabels&&(e._hasPointLabels=!0),a.marker&&(e._hasPointMarkers=!0));return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":
"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,b=a.zones,a=a.zoneAxis||"y",p=0,w;for(w=b[p];this[a]>=w.value;)w=b[++p];w&&w.color&&!this.options.color&&(this.color=w.color);return w},destroy:function(){var a=this.series.chart,b=a.hoverPoints,p;a.pointCount--;b&&(this.setState(),I(b,this),b.length||
(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)q(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(p in this)this[p]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],b,p=6;p--;)b=a[p],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,
point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var b=this.series,e=b.tooltipOptions,w=t(e.valueDecimals,""),k=e.valuePrefix||"",l=e.valueSuffix||"";D(b.pointArrayMap||["y"],function(b){b="{point."+b;if(k||l)a=a.replace(b+"}",k+b+"}"+l);a=a.replace(b+"}",b+":,."+w+"f}")});return n(a,{point:this,series:this.series})},firePointEvent:function(a,b,p){var e=this,k=this.series.options;(k.point.events[a]||e.options&&e.options.events&&e.options.events[a])&&
this.importEvents();"click"===a&&k.allowPointSelect&&(p=function(a){e.select&&e.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});v(this,a,b,p)},visible:!0}})(K);(function(a){var E=a.addEvent,D=a.animObject,H=a.arrayMax,I=a.arrayMin,v=a.correctFloat,n=a.Date,m=a.defaultOptions,z=a.defaultPlotOptions,t=a.defined,q=a.each,e=a.erase,b=a.extend,p=a.fireEvent,w=a.grep,k=a.isArray,l=a.isNumber,g=a.isString,F=a.merge,r=a.pick,u=a.removeEvent,f=a.splat,B=a.SVGElement,d=a.syncTimeout,x=a.win;a.Series=a.seriesType("line",
null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",radius:4,states:{hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",
x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{hover:{lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,d){var c=this,f,e,h=a.series,y;c.chart=a;c.options=d=c.setOptions(d);c.linkedSeries=[];c.bindAxes();b(c,{name:d.name,state:"",visible:!1!==
d.visible,selected:!0===d.selected});e=d.events;for(f in e)E(c,f,e[f]);if(e&&e.click||d.point&&d.point.events&&d.point.events.click||d.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();q(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(d.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);h.length&&(y=h[h.length-1]);c._i=r(y&&y._i,-1)+1;a.orderSeries(this.insert(h))},insert:function(a){var b=this.options.index,c;if(l(b)){for(c=a.length;c--;)if(b>=r(a[c].options.index,a[c]._i)){a.splice(c+
1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return r(c,a.length-1)},bindAxes:function(){var b=this,d=b.options,f=b.chart,e;q(b.axisTypes||[],function(c){q(f[c],function(a){e=a.options;if(d[c]===e.index||void 0!==d[c]&&d[c]===e.id||void 0===d[c]&&0===e.index)b.insert(a.series),b[c]=a,a.isDirty=!0});b[c]||b.optionalAxis===c||a.error(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,f=l(b)?function(d){var h="y"===d&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=
h}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};q(c.parallelArrays,f)},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,f=a.pointIntervalUnit,b=r(b,a.pointStart,0);this.pointInterval=d=r(this.pointInterval,a.pointInterval,1);f&&(a=new n(b),"day"===f?a=+a[n.hcSetDate](a[n.hcGetDate]()+d):"month"===f?a=+a[n.hcSetMonth](a[n.hcGetMonth]()+d):"year"===f&&(a=+a[n.hcSetFullYear](a[n.hcGetFullYear]()+d)),d=a-b);this.xIncrement=b+d;return b},setOptions:function(a){var b=
this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},f=c[this.type];this.userOptions=a;c=F(f,c.series,a);this.tooltipOptions=F(m.tooltip,m.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);null===f.marker&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||a.push({value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative",
color:c.negativeColor,fillColor:c.negativeFillColor});a.length&&t(a[a.length-1].value)&&a.push({color:this.color,fillColor:this.fillColor});return c},getCyclic:function(a,b,d){var c,f=this.chart,h=this.userOptions,e=a+"Index",g=a+"Counter",y=d?d.length:r(f.options.chart[a+"Count"],f[a+"Count"]);b||(c=r(h[e],h["_"+e]),t(c)||(f.series.length||(f[g]=0),h["_"+e]=c=f[g]%y,f[g]+=1),d&&(b=d[c]));void 0!==c&&(this[e]=c);this[a]=b},getColor:function(){this.options.colorByPoint?this.options.color=null:this.getCyclic("color",
this.options.color||z[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,setData:function(b,d,f,e){var c=this,h=c.points,y=h&&h.length||0,A,u=c.options,x=c.chart,p=null,w=c.xAxis,m=u.turboThreshold,B=this.xData,n=this.yData,t=(A=c.pointArrayMap)&&A.length;b=b||[];A=b.length;d=r(d,!0);if(!1!==e&&A&&y===A&&!c.cropped&&!c.hasGroupedData&&c.visible)q(b,function(a,
b){h[b].update&&a!==u.data[b]&&h[b].update(a,!1,null,!1)});else{c.xIncrement=null;c.colorCounter=0;q(this.parallelArrays,function(a){c[a+"Data"].length=0});if(m&&A>m){for(f=0;null===p&&f<A;)p=b[f],f++;if(l(p))for(f=0;f<A;f++)B[f]=this.autoIncrement(),n[f]=b[f];else if(k(p))if(t)for(f=0;f<A;f++)p=b[f],B[f]=p[0],n[f]=p.slice(1,t+1);else for(f=0;f<A;f++)p=b[f],B[f]=p[0],n[f]=p[1];else a.error(12)}else for(f=0;f<A;f++)void 0!==b[f]&&(p={series:c},c.pointClass.prototype.applyOptions.apply(p,[b[f]]),c.updateParallelArrays(p,
f));g(n[0])&&a.error(14,!0);c.data=[];c.options.data=c.userOptions.data=b;for(f=y;f--;)h[f]&&h[f].destroy&&h[f].destroy();w&&(w.minRange=w.userMinRange);c.isDirty=x.isDirtyBox=!0;c.isDirtyData=!!h;f=!1}"point"===u.legendType&&(this.processData(),this.generatePoints());d&&x.redraw(f)},processData:function(b){var c=this.xData,d=this.yData,f=c.length,e;e=0;var h,g,k=this.xAxis,l,u=this.options;l=u.cropThreshold;var r=this.getExtremesFromAll||u.getExtremesFromAll,x=this.isCartesian,u=k&&k.val2lin,p=k&&
k.isLog,q,w;if(x&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!b)return!1;k&&(b=k.getExtremes(),q=b.min,w=b.max);if(x&&this.sorted&&!r&&(!l||f>l||this.forceCrop))if(c[f-1]<q||c[0]>w)c=[],d=[];else if(c[0]<q||c[f-1]>w)e=this.cropData(this.xData,this.yData,q,w),c=e.xData,d=e.yData,e=e.start,h=!0;for(l=c.length||1;--l;)f=p?u(c[l])-u(c[l-1]):c[l]-c[l-1],0<f&&(void 0===g||f<g)?g=f:0>f&&this.requireSorting&&a.error(15);this.cropped=h;this.cropStart=e;this.processedXData=c;this.processedYData=d;this.closestPointRange=
g},cropData:function(a,b,d,f){var c=a.length,h=0,e=c,g=r(this.cropShoulder,1),y;for(y=0;y<c;y++)if(a[y]>=d){h=Math.max(0,y-g);break}for(d=y;d<c;d++)if(a[d]>f){e=d+g;break}return{xData:a.slice(h,e),yData:b.slice(h,e),start:h,end:e}},generatePoints:function(){var a=this.options.data,b=this.data,d,e=this.processedXData,g=this.processedYData,h=this.pointClass,k=e.length,l=this.cropStart||0,u,r=this.hasGroupedData,x,p=[],q;b||r||(b=[],b.length=a.length,b=this.data=b);for(q=0;q<k;q++)u=l+q,r?(x=(new h).init(this,
[e[q]].concat(f(g[q]))),x.dataGroup=this.groupMap[q]):(x=b[u])||void 0===a[u]||(b[u]=x=(new h).init(this,a[u],e[q])),x.index=u,p[q]=x;if(b&&(k!==(d=b.length)||r))for(q=0;q<d;q++)q!==l||r||(q+=k),b[q]&&(b[q].destroyElements(),b[q].plotX=void 0);this.data=b;this.points=p},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,f=[],h=0;d=this.xAxis.getExtremes();var e=d.min,g=d.max,u,r,x,p;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(p=0;p<d;p++)if(r=c[p],x=a[p],u=(l(x,!0)||
k(x))&&(!b.isLog||x.length||0<x),r=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[p+1]||r)>=e&&(c[p-1]||r)<=g,u&&r)if(u=x.length)for(;u--;)null!==x[u]&&(f[h++]=x[u]);else f[h++]=x;this.dataMin=I(f);this.dataMax=H(f)},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,d=this.xAxis,f=d.categories,e=this.yAxis,h=this.points,g=h.length,k=!!this.modifyValue,u=a.pointPlacement,x="between"===u||l(u),p=a.threshold,
q=a.startFromThreshold?p:0,w,m,B,n,F=Number.MAX_VALUE;"between"===u&&(u=.5);l(u)&&(u*=r(a.pointRange||d.pointRange));for(a=0;a<g;a++){var z=h[a],D=z.x,E=z.y;m=z.low;var I=b&&e.stacks[(this.negStacks&&E<(q?0:p)?"-":"")+this.stackKey],H;e.isLog&&null!==E&&0>=E&&(z.isNull=!0);z.plotX=w=v(Math.min(Math.max(-1E5,d.translate(D,0,0,0,1,u,"flags"===this.type)),1E5));b&&this.visible&&!z.isNull&&I&&I[D]&&(n=this.getStackIndicator(n,D,this.index),H=I[D],E=H.points[n.key],m=E[0],E=E[1],m===q&&n.key===I[D].base&&
(m=r(p,e.min)),e.isLog&&0>=m&&(m=null),z.total=z.stackTotal=H.total,z.percentage=H.total&&z.y/H.total*100,z.stackY=E,H.setOffset(this.pointXOffset||0,this.barW||0));z.yBottom=t(m)?e.translate(m,0,1,0,1):null;k&&(E=this.modifyValue(E,z));z.plotY=m="number"===typeof E&&Infinity!==E?Math.min(Math.max(-1E5,e.translate(E,0,1,0,1)),1E5):void 0;z.isInside=void 0!==m&&0<=m&&m<=e.len&&0<=w&&w<=d.len;z.clientX=x?v(d.translate(D,0,0,0,1,u)):w;z.negative=z.y<(p||0);z.category=f&&void 0!==f[z.x]?f[z.x]:z.x;z.isNull||
(void 0!==B&&(F=Math.min(F,Math.abs(w-B))),B=w);z.zone=this.zones.length&&z.getZone()}this.closestPointRangePx=F},getValidPoints:function(a,b){var c=this.chart;return w(a||this.points||[],function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,f=b.inverted,h=this.clipBox,e=h||b.clipBox,g=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,e.height,c.xAxis,c.yAxis].join(),k=b[g],l=b[g+"m"];k||(a&&(e.width=
0,b[g+"m"]=l=d.clipRect(-99,f?-b.plotLeft:-b.plotTop,99,f?b.chartWidth:b.chartHeight)),b[g]=k=d.clipRect(e),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);!1!==c.clip&&(this.group.clip(a||h?k:b.clipRect),this.markerGroup.clip(l),this.sharedClipKey=g);a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&g&&b[g]&&(h||(b[g]=b[g].destroy()),b[g+"m"]&&(this.markerGroup.clip(),b[g+"m"]=b[g+"m"].destroy())))},animate:function(a){var b=
this.chart,c=D(this.options.animation),d;a?this.setClip(c):(d=this.sharedClipKey,(a=b[d])&&a.animate({width:b.plotSizeX},c),b[d+"m"]&&b[d+"m"].animate({width:b.plotSizeX+99},c),this.animate=null)},afterAnimate:function(){this.setClip();p(this,"afterAnimate")},drawPoints:function(){var a=this.points,b=this.chart,d,f,e,h,g=this.options.marker,k,u,x,p,q=this.markerGroup,w=r(g.enabled,this.xAxis.isRadial?!0:null,this.closestPointRangePx>2*g.radius);if(!1!==g.enabled||this._hasPointMarkers)for(f=0;f<a.length;f++)e=
a[f],d=e.plotY,h=e.graphic,k=e.marker||{},u=!!e.marker,x=w&&void 0===k.enabled||k.enabled,p=e.isInside,x&&l(d)&&null!==e.y?(d=r(k.symbol,this.symbol),e.hasImage=0===d.indexOf("url"),x=this.markerAttribs(e,e.selected&&"select"),h?h[p?"show":"hide"](!0).animate(x):p&&(0<x.width||e.hasImage)&&(e.graphic=h=b.renderer.symbol(d,x.x,x.y,x.width,x.height,u?k:g).add(q)),h&&h.attr(this.pointAttribs(e,e.selected&&"select")),h&&h.addClass(e.getClassName(),!0)):h&&(e.graphic=h.destroy())},markerAttribs:function(a,
b){var c=this.options.marker,d=a.marker||{},f=r(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],f=r(b&&b.radius,c&&c.radius,f+(c&&c.radiusPlus||0)));a.hasImage&&(f=0);a={x:Math.floor(a.plotX)-f,y:a.plotY-f};f&&(a.width=a.height=2*f);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,f=d&&d.marker||{},h=this.color,e=d&&d.color,g=a&&a.color,d=r(f.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;h=e||a||g||h;a=f.fillColor||c.fillColor||h;h=f.lineColor||c.lineColor||
h;b&&(c=c.states[b],b=f.states&&f.states[b]||{},d=r(b.lineWidth,c.lineWidth,d+r(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||a,h=b.lineColor||c.lineColor||h);return{stroke:h,"stroke-width":d,fill:a}},destroy:function(){var a=this,b=a.chart,d=/AppleWebKit\/533/.test(x.navigator.userAgent),f,g=a.data||[],h,k,l;p(a,"destroy");u(a);q(a.axisTypes||[],function(b){(l=a[b])&&l.series&&(e(l.series,a),l.isDirty=l.forceRedraw=!0)});a.legendItem&&a.chart.legend.destroyItem(a);for(f=g.length;f--;)(h=
g[f])&&h.destroy&&h.destroy();a.points=null;clearTimeout(a.animationTimeout);for(k in a)a[k]instanceof B&&!a[k].survive&&(f=d&&"group"===k?"hide":"destroy",a[k][f]());b.hoverSeries===a&&(b.hoverSeries=null);e(b.series,a);b.orderSeries();for(k in a)delete a[k]},getGraphPath:function(a,b,d){var c=this,f=c.options,h=f.step,e,g=[],k=[],l;a=a||c.points;(e=a.reversed)&&a.reverse();(h={right:1,center:2}[h]||h&&3)&&e&&(h=4-h);!f.connectNulls||b||d||(a=this.getValidPoints(a));q(a,function(e,y){var u=e.plotX,
A=e.plotY,x=a[y-1];(e.leftCliff||x&&x.rightCliff)&&!d&&(l=!0);e.isNull&&!t(b)&&0<y?l=!f.connectNulls:e.isNull&&!b?l=!0:(0===y||l?y=["M",e.plotX,e.plotY]:c.getPointSpline?y=c.getPointSpline(a,e,y):h?(y=1===h?["L",x.plotX,A]:2===h?["L",(x.plotX+u)/2,x.plotY,"L",(x.plotX+u)/2,A]:["L",u,x.plotY],y.push("L",u,A)):y=["L",u,A],k.push(e.x),h&&k.push(e.x),g.push.apply(g,y),l=!1)});g.xMap=k;return c.graphPath=g},drawGraph:function(){var a=this,b=this.options,d=(this.gappedPath||this.getGraphPath).call(this),
f=[["graph","highcharts-graph",b.lineColor||this.color,b.dashStyle]];q(this.zones,function(c,d){f.push(["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+(c.className||""),c.color||a.color,c.dashStyle||b.dashStyle])});q(f,function(c,f){var h=c[0],e=a[h];e?(e.endX=d.xMap,e.animate({d:d})):d.length&&(a[h]=a.chart.renderer.path(d).addClass(c[1]).attr({zIndex:1}).add(a.group),e={stroke:c[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},c[3]?e.dashstyle=c[3]:"square"!==b.linecap&&
(e["stroke-linecap"]=e["stroke-linejoin"]="round"),e=a[h].attr(e).shadow(2>f&&b.shadow));e&&(e.startX=d.xMap,e.isArea=d.isArea)})},applyZones:function(){var a=this,b=this.chart,d=b.renderer,f=this.zones,e,h,g=this.clips||[],k,l=this.graph,u=this.area,x=Math.max(b.chartWidth,b.chartHeight),p=this[(this.zoneAxis||"y")+"Axis"],w,m,B=b.inverted,n,t,v,F,z=!1;f.length&&(l||u)&&p&&void 0!==p.min&&(m=p.reversed,n=p.horiz,l&&l.hide(),u&&u.hide(),w=p.getExtremes(),q(f,function(c,f){e=m?n?b.plotWidth:0:n?0:
p.toPixels(w.min);e=Math.min(Math.max(r(h,e),0),x);h=Math.min(Math.max(Math.round(p.toPixels(r(c.value,w.max),!0)),0),x);z&&(e=h=p.toPixels(w.max));t=Math.abs(e-h);v=Math.min(e,h);F=Math.max(e,h);p.isXAxis?(k={x:B?F:v,y:0,width:t,height:x},n||(k.x=b.plotHeight-k.x)):(k={x:0,y:B?F:v,width:x,height:t},n&&(k.y=b.plotWidth-k.y));B&&d.isVML&&(k=p.isXAxis?{x:0,y:m?v:F,height:k.width,width:b.chartWidth}:{x:k.y-b.plotLeft-b.spacingBox.x,y:0,width:k.height,height:b.chartHeight});g[f]?g[f].animate(k):(g[f]=
d.clipRect(k),l&&a["zone-graph-"+f].clip(g[f]),u&&a["zone-area-"+f].clip(g[f]));z=c.value>w.max}),this.clips=g)},invertGroups:function(a){function b(){q(["group","markerGroup"],function(b){c[b]&&(c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d;c.xAxis&&(d=E(c.chart,"resize",b),E(c,"destroy",d),b(a),c.invertGroups=b)},plotGroup:function(a,b,d,f,e){var c=this[a],g=!c;g&&(this[a]=c=this.chart.renderer.g(b).attr({zIndex:f||.1}).add(e),c.addClass("highcharts-series-"+this.index+
" highcharts-"+this.type+"-series highcharts-color-"+this.colorIndex+" "+(this.options.className||"")));c.attr({visibility:d})[g?"attr":"animate"](this.getPlotBox());return c},getPlotBox:function(){var a=this.chart,b=this.xAxis,d=this.yAxis;a.inverted&&(b=d,d=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:d?d.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,f,e=a.options,g=!!a.animate&&b.renderer.isSVG&&D(e.animation).duration,h=a.visible?"inherit":"hidden",k=
e.zIndex,l=a.hasRendered,u=b.seriesGroup,x=b.inverted;f=a.plotGroup("group","series",h,k,u);a.markerGroup=a.plotGroup("markerGroup","markers",h,k,u);g&&a.animate(!0);f.inverted=a.isCartesian?x:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(x);!1===e.clip||a.sharedClipKey||l||f.clip(b.clipRect);g&&a.animate();l||(a.animationTimeout=d(function(){a.afterAnimate()},
g));a.isDirty=!1;a.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,f=this.xAxis,e=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:r(f&&f.left,a.plotLeft),translateY:r(e&&e.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdDimensions:1,kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,f=this.chart.inverted;return this.searchKDTree({clientX:f?
c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:f?d.len-a.chartX+d.pos:a.chartY-d.pos},b)},buildKDTree:function(){function a(d,c,f){var h,e;if(e=d&&d.length)return h=b.kdAxisArray[c%f],d.sort(function(a,b){return a[h]-b[h]}),e=Math.floor(e/2),{point:d[e],left:a(d.slice(0,e),c+1,f),right:a(d.slice(e+1),c+1,f)}}this.buildingKdTree=!0;var b=this,f=b.kdDimensions;delete b.kdTree;d(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),f,f);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,
b){function d(a,b,g,k){var l=b.point,u=c.kdAxisArray[g%k],x,y,A=l;y=t(a[f])&&t(l[f])?Math.pow(a[f]-l[f],2):null;x=t(a[h])&&t(l[h])?Math.pow(a[h]-l[h],2):null;x=(y||0)+(x||0);l.dist=t(x)?Math.sqrt(x):Number.MAX_VALUE;l.distX=t(y)?Math.sqrt(y):Number.MAX_VALUE;u=a[u]-l[u];x=0>u?"left":"right";y=0>u?"right":"left";b[x]&&(x=d(a,b[x],g+1,k),A=x[e]<A[e]?x:l);b[y]&&Math.sqrt(u*u)<A[e]&&(a=d(a,b[y],g+1,k),A=a[e]<A[e]?a:A);return A}var c=this,f=this.kdAxisArray[0],h=this.kdAxisArray[1],e=b?"distX":"dist";
this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return d(a,this.kdTree,this.kdDimensions,this.kdDimensions)}})})(K);(function(a){function E(a,e,b,p,w){var k=a.chart.inverted;this.axis=a;this.isNegative=b;this.options=e;this.x=p;this.total=null;this.points={};this.stack=w;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(k?b?"left":"right":"center"),verticalAlign:e.verticalAlign||(k?"middle":b?"bottom":"top"),y:t(e.y,k?4:b?14:-6),x:t(e.x,k?b?-6:6:0)};this.textAlign=
e.textAlign||(k?b?"right":"left":"center")}var D=a.Axis,H=a.Chart,I=a.correctFloat,v=a.defined,n=a.destroyObjectProperties,m=a.each,z=a.format,t=a.pick;a=a.Series;E.prototype={destroy:function(){n(this,this.axis)},render:function(a){var e=this.options,b=e.format,b=b?z(b,this):e.formatter.call(this);this.label?this.label.attr({text:b,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(b,null,null,e.useHTML).css(e.style).attr({align:this.textAlign,rotation:e.rotation,visibility:"hidden"}).add(a)},
setOffset:function(a,e){var b=this.axis,p=b.chart,w=p.inverted,k=b.reversed,k=this.isNegative&&!k||!this.isNegative&&k,l=b.translate(b.usePercentage?100:this.total,0,0,0,1),b=b.translate(0),b=Math.abs(l-b);a=p.xAxis[0].translate(this.x)+a;var g=p.plotHeight,w={x:w?k?l:l-b:a,y:w?g-a-e:k?g-l-b:g-l,width:w?b:e,height:w?e:b};if(e=this.label)e.align(this.alignOptions,null,w),w=e.alignAttr,e[!1===this.options.crop||p.isInsidePlot(w.x,w.y)?"show":"hide"](!0)}};H.prototype.getStacks=function(){var a=this;
m(a.yAxis,function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});m(a.series,function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+t(e.options.stack,""))})};D.prototype.buildStacks=function(){var a=this.series,e,b=t(this.options.reversedStacks,!0),p=a.length,w;if(!this.isXAxis){this.usePercentage=!1;for(w=p;w--;)a[b?w:p-w-1].setStackedPoints();for(w=p;w--;)e=a[b?w:p-w-1],e.setStackCliffs&&e.setStackCliffs();if(this.usePercentage)for(w=
0;w<p;w++)a[w].setPercentStacks()}};D.prototype.renderStackTotals=function(){var a=this.chart,e=a.renderer,b=this.stacks,p,w,k=this.stackTotalGroup;k||(this.stackTotalGroup=k=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());k.translate(a.plotLeft,a.plotTop);for(p in b)for(w in a=b[p],a)a[w].render(k)};D.prototype.resetStacks=function(){var a=this.stacks,e,b;if(!this.isXAxis)for(e in a)for(b in a[e])a[e][b].touched<this.stacksTouched?(a[e][b].destroy(),delete a[e][b]):(a[e][b].total=
null,a[e][b].cum=null)};D.prototype.cleanStacks=function(){var a,e,b;if(!this.isXAxis)for(e in this.oldStacks&&(a=this.stacks=this.oldStacks),a)for(b in a[e])a[e][b].cum=a[e][b].total};a.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var a=this.processedXData,e=this.processedYData,b=[],p=e.length,w=this.options,k=w.threshold,l=w.startFromThreshold?k:0,g=w.stack,w=w.stacking,m=this.stackKey,r="-"+m,u=this.negStacks,
f=this.yAxis,B=f.stacks,d=f.oldStacks,x,c,y,n,A,J,h;f.stacksTouched+=1;for(A=0;A<p;A++)J=a[A],h=e[A],x=this.getStackIndicator(x,J,this.index),n=x.key,y=(c=u&&h<(l?0:k))?r:m,B[y]||(B[y]={}),B[y][J]||(d[y]&&d[y][J]?(B[y][J]=d[y][J],B[y][J].total=null):B[y][J]=new E(f,f.options.stackLabels,c,J,g)),y=B[y][J],null!==h&&(y.points[n]=y.points[this.index]=[t(y.cum,l)],v(y.cum)||(y.base=n),y.touched=f.stacksTouched,0<x.index&&!1===this.singleStacks&&(y.points[n][0]=y.points[this.index+","+J+",0"][0])),"percent"===
w?(c=c?m:r,u&&B[c]&&B[c][J]?(c=B[c][J],y.total=c.total=Math.max(c.total,y.total)+Math.abs(h)||0):y.total=I(y.total+(Math.abs(h)||0))):y.total=I(y.total+(h||0)),y.cum=t(y.cum,l)+(h||0),null!==h&&(y.points[n].push(y.cum),b[A]=y.cum);"percent"===w&&(f.usePercentage=!0);this.stackedYData=b;f.oldStacks={}}};a.prototype.setPercentStacks=function(){var a=this,e=a.stackKey,b=a.yAxis.stacks,p=a.processedXData,w;m([e,"-"+e],function(e){for(var k=p.length,g,m;k--;)if(g=p[k],w=a.getStackIndicator(w,g,a.index,
e),g=(m=b[e]&&b[e][g])&&m.points[w.key])m=m.total?100/m.total:0,g[0]=I(g[0]*m),g[1]=I(g[1]*m),a.stackedYData[k]=g[1]})};a.prototype.getStackIndicator=function(a,e,b,p){!v(a)||a.x!==e||p&&a.key!==p?a={x:e,index:0,key:p}:a.index++;a.key=[b,e,a.index].join();return a}})(K);(function(a){var E=a.addEvent,D=a.animate,H=a.Axis,I=a.createElement,v=a.css,n=a.defined,m=a.each,z=a.erase,t=a.extend,q=a.fireEvent,e=a.inArray,b=a.isNumber,p=a.isObject,w=a.merge,k=a.pick,l=a.Point,g=a.Series,F=a.seriesTypes,r=a.setAnimation,
u=a.splat;t(a.Chart.prototype,{addSeries:function(a,b,d){var f,c=this;a&&(b=k(b,!0),q(c,"addSeries",{options:a},function(){f=c.initSeries(a);c.isDirtyLegend=!0;c.linkSeries();b&&c.redraw(d)}));return f},addAxis:function(a,b,d,e){var c=b?"xAxis":"yAxis",f=this.options;a=w(a,{index:this[c].length,isX:b});new H(this,a);f[c]=u(f[c]||{});f[c].push(a);k(d,!0)&&this.redraw(e)},showLoading:function(a){var b=this,d=b.options,f=b.loadingDiv,c=d.loading,e=function(){f&&v(f,{left:b.plotLeft+"px",top:b.plotTop+
"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};f||(b.loadingDiv=f=I("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=I("span",{className:"highcharts-loading-inner"},null,f),E(b,"redraw",e));f.className="highcharts-loading";b.loadingSpan.innerHTML=a||d.lang.loading;v(f,t(c.style,{zIndex:10}));v(b.loadingSpan,c.labelStyle);b.loadingShown||(v(f,{opacity:0,display:""}),D(f,{opacity:c.style.opacity||.5},{duration:c.showDuration||0}));b.loadingShown=
!0;e()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",D(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){v(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions".split(" "),update:function(a,g){var d,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},c=a.chart,l,r;if(c){w(!0,this.options.chart,c);"className"in c&&this.setClassName(c.className);if("inverted"in c||"polar"in c)this.propFromSeries(),l=!0;for(d in c)c.hasOwnProperty(d)&&(-1!==e("chart."+d,this.propsRequireUpdateSeries)&&(r=!0),-1!==e(d,this.propsRequireDirtyBox)&&(this.isDirtyBox=
!0));"style"in c&&this.renderer.setStyle(c.style)}for(d in a){if(this[d]&&"function"===typeof this[d].update)this[d].update(a[d],!1);else if("function"===typeof this[f[d]])this[f[d]](a[d]);"chart"!==d&&-1!==e(d,this.propsRequireUpdateSeries)&&(r=!0)}a.colors&&(this.options.colors=a.colors);a.plotOptions&&w(!0,this.options.plotOptions,a.plotOptions);m(["xAxis","yAxis","series"],function(b){a[b]&&m(u(a[b]),function(a,d){(d=n(a.id)&&this.get(a.id)||this[b][d])&&d.coll===b&&d.update(a,!1)},this)},this);
l&&m(this.axes,function(a){a.update({},!1)});r&&m(this.series,function(a){a.update({},!1)});a.loading&&w(!0,this.options.loading,a.loading);d=c&&c.width;c=c&&c.height;b(d)&&d!==this.chartWidth||b(c)&&c!==this.chartHeight?this.setSize(d,c):k(g,!0)&&this.redraw()},setSubtitle:function(a){this.setTitle(void 0,a)}});t(l.prototype,{update:function(a,b,d,e){function c(){f.applyOptions(a);null===f.y&&l&&(f.graphic=l.destroy());p(a,!0)&&(l&&l.element&&a&&a.marker&&a.marker.symbol&&(f.graphic=l.destroy()),
a&&a.dataLabels&&f.dataLabel&&(f.dataLabel=f.dataLabel.destroy()));u=f.index;g.updateParallelArrays(f,u);x.data[u]=p(x.data[u],!0)?f.options:a;g.isDirty=g.isDirtyData=!0;!g.fixedBox&&g.hasCartesianSeries&&(h.isDirtyBox=!0);"point"===x.legendType&&(h.isDirtyLegend=!0);b&&h.redraw(d)}var f=this,g=f.series,l=f.graphic,u,h=g.chart,x=g.options;b=k(b,!0);!1===e?c():f.firePointEvent("update",{options:a},c)},remove:function(a,b){this.series.removePoint(e(this,this.series.data),a,b)}});t(g.prototype,{addPoint:function(a,
b,d,e){var c=this.options,f=this.data,g=this.chart,l=this.xAxis,l=l&&l.hasNames&&l.names,u=c.data,h,x,r=this.xData,p,m;b=k(b,!0);h={series:this};this.pointClass.prototype.applyOptions.apply(h,[a]);m=h.x;p=r.length;if(this.requireSorting&&m<r[p-1])for(x=!0;p&&r[p-1]>m;)p--;this.updateParallelArrays(h,"splice",p,0,0);this.updateParallelArrays(h,p);l&&h.name&&(l[m]=h.name);u.splice(p,0,a);x&&(this.data.splice(p,0,null),this.processData());"point"===c.legendType&&this.generatePoints();d&&(f[0]&&f[0].remove?
f[0].remove(!1):(f.shift(),this.updateParallelArrays(h,"shift"),u.shift()));this.isDirtyData=this.isDirty=!0;b&&g.redraw(e)},removePoint:function(a,b,d){var f=this,c=f.data,e=c[a],g=f.points,l=f.chart,u=function(){g&&g.length===c.length&&g.splice(a,1);c.splice(a,1);f.options.data.splice(a,1);f.updateParallelArrays(e||{series:f},"splice",a,1);e&&e.destroy();f.isDirty=!0;f.isDirtyData=!0;b&&l.redraw()};r(d,l);b=k(b,!0);e?e.firePointEvent("remove",null,u):u()},remove:function(a,b,d){function f(){c.destroy();
e.isDirtyLegend=e.isDirtyBox=!0;e.linkSeries();k(a,!0)&&e.redraw(b)}var c=this,e=c.chart;!1!==d?q(c,"remove",null,f):f()},update:function(a,b){var d=this,f=this.chart,c=this.userOptions,e=this.type,g=a.type||c.type||f.options.chart.type,l=F[e].prototype,u=["group","markerGroup","dataLabelsGroup"],h;if(g&&g!==e||void 0!==a.zIndex)u.length=0;m(u,function(a){u[a]=d[a];delete d[a]});a=w(c,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1,null,!1);for(h in l)this[h]=
void 0;t(this,F[g||e].prototype);m(u,function(a){d[a]=u[a]});this.init(f,a);f.linkSeries();k(b,!0)&&f.redraw(!1)}});t(H.prototype,{update:function(a,b){var d=this.chart;a=d.options[this.coll][this.options.index]=w(this.userOptions,a);this.destroy(!0);this.init(d,t(a,{events:void 0}));d.isDirtyBox=!0;k(b,!0)&&d.redraw()},remove:function(a){for(var b=this.chart,d=this.coll,f=this.series,c=f.length;c--;)f[c]&&f[c].remove(!1);z(b.axes,this);z(b[d],this);b.options[d].splice(this.options.index,1);m(b[d],
function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;k(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(K);(function(a){var E=a.color,D=a.each,H=a.map,I=a.pick,v=a.Series,n=a.seriesType;n("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(){var a=[],n=[],t=this.xAxis,q=this.yAxis,e=q.stacks[this.stackKey],b={},p=this.points,w=this.index,k=q.series,l=k.length,g,v=I(q.options.reversedStacks,
!0)?1:-1,r,u;if(this.options.stacking){for(r=0;r<p.length;r++)b[p[r].x]=p[r];for(u in e)null!==e[u].total&&n.push(u);n.sort(function(a,b){return a-b});g=H(k,function(){return this.visible});D(n,function(f,k){var d=0,u,c;if(b[f]&&!b[f].isNull)a.push(b[f]),D([-1,1],function(a){var d=1===a?"rightNull":"leftNull",x=0,p=e[n[k+a]];if(p)for(r=w;0<=r&&r<l;)u=p.points[r],u||(r===w?b[f][d]=!0:g[r]&&(c=e[f].points[r])&&(x-=c[1]-c[0])),r+=v;b[f][1===a?"rightCliff":"leftCliff"]=x});else{for(r=w;0<=r&&r<l;){if(u=
e[f].points[r]){d=u[1];break}r+=v}d=q.toPixels(d,!0);a.push({isNull:!0,plotX:t.toPixels(f,!0),plotY:d,yBottom:d})}})}return a},getGraphPath:function(a){var m=v.prototype.getGraphPath,n=this.options,q=n.stacking,e=this.yAxis,b,p,w=[],k=[],l=this.index,g,F=e.stacks[this.stackKey],r=n.threshold,u=e.getThreshold(n.threshold),f,n=n.connectNulls||"percent"===q,B=function(b,f,c){var d=a[b];b=q&&F[d.x].points[l];var p=d[c+"Null"]||0;c=d[c+"Cliff"]||0;var x,m,d=!0;c||p?(x=(p?b[0]:b[1])+c,m=b[0]+c,d=!!p):!q&&
a[f]&&a[f].isNull&&(x=m=r);void 0!==x&&(k.push({plotX:g,plotY:null===x?u:e.getThreshold(x),isNull:d}),w.push({plotX:g,plotY:null===m?u:e.getThreshold(m),doCurve:!1}))};a=a||this.points;q&&(a=this.getStackPoints());for(b=0;b<a.length;b++)if(p=a[b].isNull,g=I(a[b].rectPlotX,a[b].plotX),f=I(a[b].yBottom,u),!p||n)n||B(b,b-1,"left"),p&&!q&&n||(k.push(a[b]),w.push({x:b,plotX:g,plotY:f})),n||B(b,b+1,"right");b=m.call(this,k,!0,!0);w.reversed=!0;p=m.call(this,w,!0,!0);p.length&&(p[0]="L");p=b.concat(p);m=
m.call(this,k,!1,n);p.xMap=b.xMap;this.areaPath=p;return m},drawGraph:function(){this.areaPath=[];v.prototype.drawGraph.apply(this);var a=this,n=this.areaPath,t=this.options,q=[["area","highcharts-area",this.color,t.fillColor]];D(this.zones,function(e,b){q.push(["zone-area-"+b,"highcharts-area highcharts-zone-area-"+b+" "+e.className,e.color||a.color,e.fillColor||t.fillColor])});D(q,function(e){var b=e[0],p=a[b];p?(p.endX=n.xMap,p.animate({d:n})):(p=a[b]=a.chart.renderer.path(n).addClass(e[1]).attr({fill:I(e[3],
E(e[2]).setOpacity(I(t.fillOpacity,.75)).get()),zIndex:0}).add(a.group),p.isArea=!0);p.startX=n.xMap;p.shiftUnit=t.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var E=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,H,I){var v=H.plotX,n=H.plotY,m=a[I-1];I=a[I+1];var z,t,q,e;if(m&&!m.isNull&&!1!==m.doCurve&&I&&!I.isNull&&!1!==I.doCurve){a=m.plotY;q=I.plotX;I=I.plotY;var b=0;z=(1.5*v+m.plotX)/2.5;t=(1.5*n+a)/2.5;q=(1.5*v+q)/2.5;e=(1.5*n+I)/2.5;
q!==z&&(b=(e-t)*(q-v)/(q-z)+n-e);t+=b;e+=b;t>a&&t>n?(t=Math.max(a,n),e=2*n-t):t<a&&t<n&&(t=Math.min(a,n),e=2*n-t);e>I&&e>n?(e=Math.max(I,n),t=2*n-e):e<I&&e<n&&(e=Math.min(I,n),t=2*n-e);H.rightContX=q;H.rightContY=e}H=["C",E(m.rightContX,m.plotX),E(m.rightContY,m.plotY),E(z,v),E(t,n),v,n];m.rightContX=m.rightContY=null;return H}})})(K);(function(a){var E=a.seriesTypes.area.prototype,D=a.seriesType;D("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:E.getStackPoints,getGraphPath:E.getGraphPath,
setStackCliffs:E.setStackCliffs,drawGraph:E.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(K);(function(a){var E=a.animObject,D=a.color,H=a.each,I=a.extend,v=a.isNumber,n=a.merge,m=a.pick,z=a.Series,t=a.seriesType,q=a.svg;t("column","line",{borderRadius:0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1,shadow:!1},select:{color:"#cccccc",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,
y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){z.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&H(b.series,function(b){b.type===a.type&&(b.isDirty=!0)})},getColumnMetrics:function(){var a=this,b=a.options,p=a.xAxis,w=a.yAxis,k=p.reversed,l,g={},n=0;!1===b.grouping?n=1:H(a.chart.series,function(b){var d=
b.options,f=b.yAxis,c;b.type===a.type&&b.visible&&w.len===f.len&&w.pos===f.pos&&(d.stacking?(l=b.stackKey,void 0===g[l]&&(g[l]=n++),c=g[l]):!1!==d.grouping&&(c=n++),b.columnIndex=c)});var r=Math.min(Math.abs(p.transA)*(p.ordinalSlope||b.pointRange||p.closestPointRange||p.tickInterval||1),p.len),u=r*b.groupPadding,f=(r-2*u)/(n||1),b=Math.min(b.maxPointWidth||p.len,m(b.pointWidth,f*(1-2*b.pointPadding)));a.columnMetrics={width:b,offset:(f-b)/2+(u+((a.columnIndex||0)+(k?1:0))*f-r/2)*(k?-1:1)};return a.columnMetrics},
crispCol:function(a,b,p,m){var e=this.chart,l=this.borderWidth,g=-(l%2?.5:0),l=l%2?.5:1;e.inverted&&e.renderer.isVML&&(l+=1);p=Math.round(a+p)+g;a=Math.round(a)+g;m=Math.round(b+m)+l;g=.5>=Math.abs(b)&&.5<m;b=Math.round(b)+l;m-=b;g&&m&&(--b,m+=1);return{x:a,y:b,width:p-a,height:m}},translate:function(){var a=this,b=a.chart,p=a.options,w=a.dense=2>a.closestPointRange*a.xAxis.transA,w=a.borderWidth=m(p.borderWidth,w?0:1),k=a.yAxis,l=a.translatedThreshold=k.getThreshold(p.threshold),g=m(p.minPointLength,
5),n=a.getColumnMetrics(),r=n.width,u=a.barW=Math.max(r,1+2*w),f=a.pointXOffset=n.offset;b.inverted&&(l-=.5);p.pointPadding&&(u=Math.ceil(u));z.prototype.translate.apply(a);H(a.points,function(e){var d=m(e.yBottom,l),x=999+Math.abs(d),x=Math.min(Math.max(-x,e.plotY),k.len+x),c=e.plotX+f,p=u,w=Math.min(x,d),A,n=Math.max(x,d)-w;Math.abs(n)<g&&g&&(n=g,A=!k.reversed&&!e.negative||k.reversed&&e.negative,w=Math.abs(w-l)>g?d-g:l-(A?g:0));e.barX=c;e.pointWidth=r;e.tooltipPos=b.inverted?[k.len+k.pos-b.plotLeft-
x,a.xAxis.len-c-p/2,n]:[c+p/2,x+k.pos-b.plotTop,n];e.shapeType="rect";e.shapeArgs=a.crispCol.apply(a,e.isNull?[e.plotX,k.len/2,0,0]:[c,w,p,n])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,b){var e=this.options,m,k=this.pointAttrToOptions||{};m=k.stroke||"borderColor";var l=k["stroke-width"]||"borderWidth",g=a&&a.color||this.color,n=a[m]||e[m]||this.color||
g,r=a[l]||e[l]||this[l]||0,k=e.dashStyle;a&&this.zones.length&&(g=(g=a.getZone())&&g.color||a.options.color||this.color);b&&(a=e.states[b],b=a.brightness,g=a.color||void 0!==b&&D(g).brighten(a.brightness).get()||g,n=a[m]||n,r=a[l]||r,k=a.dashStyle||k);m={fill:g,stroke:n,"stroke-width":r};e.borderRadius&&(m.r=e.borderRadius);k&&(m.dashstyle=k);return m},drawPoints:function(){var a=this,b=this.chart,p=a.options,m=b.renderer,k=p.animationLimit||250,l;H(a.points,function(e){var g=e.graphic;if(v(e.plotY)&&
null!==e.y){l=e.shapeArgs;if(g)g[b.pointCount<k?"animate":"attr"](n(l));else e.graphic=g=m[e.shapeType](l).attr({"class":e.getClassName()}).add(e.group||a.group);g.attr(a.pointAttribs(e,e.selected&&"select")).shadow(p.shadow,null,p.stacking&&!p.borderRadius)}else g&&(e.graphic=g.destroy())})},animate:function(a){var b=this,e=this.yAxis,m=b.options,k=this.chart.inverted,l={};q&&(a?(l.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(m.threshold))),k?l.translateX=a-e.len:l.translateY=a,b.group.attr(l)):
(l[k?"translateX":"translateY"]=e.pos,b.group.animate(l,I(E(b.options.animation),{step:function(a,e){b.group.attr({scaleY:Math.max(.001,e.pos)})}})),b.animate=null))},remove:function(){var a=this,b=a.chart;b.hasRendered&&H(b.series,function(b){b.type===a.type&&(b.isDirty=!0)});z.prototype.remove.apply(a,arguments)}})})(K);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(K);(function(a){var E=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,kdDimensions:2,drawGraph:function(){this.options.lineWidth&&E.prototype.drawGraph.call(this)}})})(K);(function(a){var E=a.pick,D=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,I=this.chart,v=2*(a.slicedOffset||0),n=I.plotWidth-2*v,I=I.plotHeight-
2*v,m=a.center,m=[E(m[0],"50%"),E(m[1],"50%"),a.size||"100%",a.innerSize||0],z=Math.min(n,I),t,q;for(t=0;4>t;++t)q=m[t],a=2>t||2===t&&/%$/.test(q),m[t]=D(q,[n,I,z,m[2]][t])+(a?v:0);m[3]>m[2]&&(m[3]=m[2]);return m}}})(K);(function(a){var E=a.addEvent,D=a.defined,H=a.each,I=a.extend,v=a.inArray,n=a.noop,m=a.pick,z=a.Point,t=a.Series,q=a.seriesType,e=a.setAnimation;q("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return null===this.y?
void 0:this.point.name},x:0},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1,shadow:!1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var b=this,e=b.points,k=b.startAngleRad;a||(H(e,function(a){var e=
a.graphic,l=a.shapeArgs;e&&(e.attr({r:a.startR||b.center[3]/2,start:k,end:k}),e.animate({r:l.r,start:l.start,end:l.end},b.options.animation))}),b.animate=null)},updateTotals:function(){var a,e=0,m=this.points,k=m.length,l,g=this.options.ignoreHiddenPoint;for(a=0;a<k;a++)l=m[a],0>l.y&&(l.y=null),e+=g&&!l.visible?0:l.y;this.total=e;for(a=0;a<k;a++)l=m[a],l.percentage=0<e&&(l.visible||!g)?l.y/e*100:0,l.total=e},generatePoints:function(){t.prototype.generatePoints.call(this);this.updateTotals()},translate:function(a){this.generatePoints();
var b=0,e=this.options,k=e.slicedOffset,l=k+(e.borderWidth||0),g,n,r,u=e.startAngle||0,f=this.startAngleRad=Math.PI/180*(u-90),u=(this.endAngleRad=Math.PI/180*(m(e.endAngle,u+360)-90))-f,q=this.points,d=e.dataLabels.distance,e=e.ignoreHiddenPoint,x,c=q.length,y;a||(this.center=a=this.getCenter());this.getX=function(b,c){r=Math.asin(Math.min((b-a[1])/(a[2]/2+d),1));return a[0]+(c?-1:1)*Math.cos(r)*(a[2]/2+d)};for(x=0;x<c;x++){y=q[x];g=f+b*u;if(!e||y.visible)b+=y.percentage/100;n=f+b*u;y.shapeType=
"arc";y.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*g)/1E3,end:Math.round(1E3*n)/1E3};r=(n+g)/2;r>1.5*Math.PI?r-=2*Math.PI:r<-Math.PI/2&&(r+=2*Math.PI);y.slicedTranslation={translateX:Math.round(Math.cos(r)*k),translateY:Math.round(Math.sin(r)*k)};g=Math.cos(r)*a[2]/2;n=Math.sin(r)*a[2]/2;y.tooltipPos=[a[0]+.7*g,a[1]+.7*n];y.half=r<-Math.PI/2||r>Math.PI/2?1:0;y.angle=r;l=Math.min(l,d/5);y.labelPos=[a[0]+g+Math.cos(r)*d,a[1]+n+Math.sin(r)*d,a[0]+g+Math.cos(r)*l,a[1]+n+Math.sin(r)*
l,a[0]+g,a[1]+n,0>d?"center":y.half?"right":"left",r]}},drawGraph:null,drawPoints:function(){var a=this,e=a.chart.renderer,m,k,l,g,n=a.options.shadow;n&&!a.shadowGroup&&(a.shadowGroup=e.g("shadow").add(a.group));H(a.points,function(b){if(null!==b.y){k=b.graphic;g=b.shapeArgs;m=b.sliced?b.slicedTranslation:{};var u=b.shadowGroup;n&&!u&&(u=b.shadowGroup=e.g("shadow").add(a.shadowGroup));u&&u.attr(m);l=a.pointAttribs(b,b.selected&&"select");k?k.setRadialReference(a.center).attr(l).animate(I(g,m)):(b.graphic=
k=e[b.shapeType](g).addClass(b.getClassName()).setRadialReference(a.center).attr(m).add(a.group),b.visible||k.attr({visibility:"hidden"}),k.attr(l).attr({"stroke-linejoin":"round"}).shadow(n,u))}})},searchPoint:n,sortByAngle:function(a,e){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*e})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:a.CenteredSeriesMixin.getCenter,getSymbol:n},{init:function(){z.prototype.init.apply(this,arguments);var a=this,e;a.name=m(a.name,"Slice");
e=function(b){a.slice("select"===b.type)};E(a,"select",e);E(a,"unselect",e);return a},setVisible:function(a,e){var b=this,k=b.series,l=k.chart,g=k.options.ignoreHiddenPoint;e=m(e,g);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,k.options.data[v(b,k.data)]=b.options,H(["graphic","dataLabel","connector","shadowGroup"],function(e){if(b[e])b[e][a?"show":"hide"](!0)}),b.legendItem&&l.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),g&&(k.isDirty=!0),e&&l.redraw())},
slice:function(a,p,n){var b=this.series;e(n,b.chart);m(p,!0);this.sliced=this.options.sliced=a=D(a)?a:!this.sliced;b.options.data[v(this,b.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)},haloPath:function(a){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+a,b.r+a,{innerR:this.shapeArgs.r,start:b.start,end:b.end})}})})(K);(function(a){var E=
a.addEvent,D=a.arrayMax,H=a.defined,I=a.each,v=a.extend,n=a.format,m=a.map,z=a.merge,t=a.noop,q=a.pick,e=a.relativeLength,b=a.Series,p=a.seriesTypes,w=a.stableSort;a.distribute=function(a,b){function e(a,b){return a.target-b.target}var k,l=!0,u=a,f=[],p;p=0;for(k=a.length;k--;)p+=a[k].size;if(p>b){w(a,function(a,b){return(b.rank||0)-(a.rank||0)});for(p=k=0;p<=b;)p+=a[k].size,k++;f=a.splice(k-1,a.length)}w(a,e);for(a=m(a,function(a){return{size:a.size,targets:[a.target]}});l;){for(k=a.length;k--;)l=
a[k],p=(Math.min.apply(0,l.targets)+Math.max.apply(0,l.targets))/2,l.pos=Math.min(Math.max(0,p-l.size/2),b-l.size);k=a.length;for(l=!1;k--;)0<k&&a[k-1].pos+a[k-1].size>a[k].pos&&(a[k-1].size+=a[k].size,a[k-1].targets=a[k-1].targets.concat(a[k].targets),a[k-1].pos+a[k-1].size>b&&(a[k-1].pos=b-a[k-1].size),a.splice(k,1),l=!0)}k=0;I(a,function(a){var b=0;I(a.targets,function(){u[k].pos=a.pos+b;b+=u[k].size;k++})});u.push.apply(u,f);w(u,e)};b.prototype.drawDataLabels=function(){var a=this,b=a.options,
e=b.dataLabels,p=a.points,r,u,f=a.hasRendered||0,m,d,x=q(e.defer,!0),c=a.chart.renderer;if(e.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(e),d=a.plotGroup("dataLabelsGroup","data-labels",x&&!f?"hidden":"visible",e.zIndex||6),x&&(d.attr({opacity:+f}),f||E(a,"afterAnimate",function(){a.visible&&d.show(!0);d[b.animation?"animate":"attr"]({opacity:1},{duration:200})})),u=e,I(p,function(f){var g,k=f.dataLabel,l,h,x,p=f.connector,y=!k,w;r=f.dlOptions||f.options&&f.options.dataLabels;
if(g=q(r&&r.enabled,u.enabled)&&null!==f.y)for(h in e=z(u,r),l=f.getLabelConfig(),m=e.format?n(e.format,l):e.formatter.call(l,e),w=e.style,x=e.rotation,w.color=q(e.color,w.color,a.color,"#000000"),"contrast"===w.color&&(w.color=e.inside||0>e.distance||b.stacking?c.getContrast(f.color||a.color):"#000000"),b.cursor&&(w.cursor=b.cursor),l={fill:e.backgroundColor,stroke:e.borderColor,"stroke-width":e.borderWidth,r:e.borderRadius||0,rotation:x,padding:e.padding,zIndex:1},l)void 0===l[h]&&delete l[h];!k||
g&&H(m)?g&&H(m)&&(k?l.text=m:(k=f.dataLabel=c[x?"text":"label"](m,0,-9999,e.shape,null,null,e.useHTML,null,"data-label"),k.addClass("highcharts-data-label-color-"+f.colorIndex+" "+(e.className||"")+(e.useHTML?"highcharts-tracker":""))),k.attr(l),k.css(w).shadow(e.shadow),k.added||k.add(d),a.alignDataLabel(f,k,e,null,y)):(f.dataLabel=k.destroy(),p&&(f.connector=p.destroy()))})};b.prototype.alignDataLabel=function(a,b,e,p,r){var g=this.chart,f=g.inverted,k=q(a.plotX,-9999),d=q(a.plotY,-9999),l=b.getBBox(),
c,y=e.rotation,m=e.align,A=this.visible&&(a.series.forceDL||g.isInsidePlot(k,Math.round(d),f)||p&&g.isInsidePlot(k,f?p.x+1:p.y+p.height-1,f)),n="justify"===q(e.overflow,"justify");A&&(c=e.style.fontSize,c=g.renderer.fontMetrics(c,b).b,p=v({x:f?g.plotWidth-d:k,y:Math.round(f?g.plotHeight-k:d),width:0,height:0},p),v(e,{width:l.width,height:l.height}),y?(n=!1,f=g.renderer.rotCorr(c,y),f={x:p.x+e.x+p.width/2+f.x,y:p.y+e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*p.height},b[r?"attr":"animate"](f).attr({align:m}),
k=(y+720)%360,k=180<k&&360>k,"left"===m?f.y-=k?l.height:0:"center"===m?(f.x-=l.width/2,f.y-=l.height/2):"right"===m&&(f.x-=l.width,f.y-=k?0:l.height)):(b.align(e,null,p),f=b.alignAttr),n?this.justifyDataLabel(b,e,f,l,p,r):q(e.crop,!0)&&(A=g.isInsidePlot(f.x,f.y)&&g.isInsidePlot(f.x+l.width,f.y+l.height)),e.shape&&!y&&b.attr({anchorX:a.plotX,anchorY:a.plotY}));A||(b.attr({y:-9999}),b.placed=!1)};b.prototype.justifyDataLabel=function(a,b,e,p,r,u){var f=this.chart,g=b.align,d=b.verticalAlign,k,c,l=a.box?
0:a.padding||0;k=e.x+l;0>k&&("right"===g?b.align="left":b.x=-k,c=!0);k=e.x+p.width-l;k>f.plotWidth&&("left"===g?b.align="right":b.x=f.plotWidth-k,c=!0);k=e.y+l;0>k&&("bottom"===d?b.verticalAlign="top":b.y=-k,c=!0);k=e.y+p.height-l;k>f.plotHeight&&("top"===d?b.verticalAlign="bottom":b.y=f.plotHeight-k,c=!0);c&&(a.placed=!u,a.align(b,null,r))};p.pie&&(p.pie.prototype.drawDataLabels=function(){var e=this,l=e.data,g,p=e.chart,r=e.options.dataLabels,u=q(r.connectorPadding,10),f=q(r.connectorWidth,1),n=
p.plotWidth,d=p.plotHeight,x,c=r.distance,y=e.center,w=y[2]/2,A=y[1],t=0<c,h,v,z,E,N=[[],[]],H,C,M,R,O=[0,0,0,0];e.visible&&(r.enabled||e._hasPointLabels)&&(b.prototype.drawDataLabels.apply(e),I(l,function(a){a.dataLabel&&a.visible&&(N[a.half].push(a),a.dataLabel._pos=null)}),I(N,function(b,f){var k,l,x=b.length,q,t,B;if(x)for(e.sortByAngle(b,f-.5),0<c&&(k=Math.max(0,A-w-c),l=Math.min(A+w+c,p.plotHeight),q=m(b,function(a){if(a.dataLabel)return B=a.dataLabel.getBBox().height||21,{target:a.labelPos[1]-
k+B/2,size:B,rank:a.y}}),a.distribute(q,l+B-k)),R=0;R<x;R++)g=b[R],z=g.labelPos,h=g.dataLabel,M=!1===g.visible?"hidden":"inherit",t=z[1],q?void 0===q[R].pos?M="hidden":(E=q[R].size,C=k+q[R].pos):C=t,H=r.justify?y[0]+(f?-1:1)*(w+c):e.getX(C<k+2||C>l-2?t:C,f),h._attr={visibility:M,align:z[6]},h._pos={x:H+r.x+({left:u,right:-u}[z[6]]||0),y:C+r.y-10},z.x=H,z.y=C,null===e.options.size&&(v=h.width,H-v<u?O[3]=Math.max(Math.round(v-H+u),O[3]):H+v>n-u&&(O[1]=Math.max(Math.round(H+v-n+u),O[1])),0>C-E/2?O[0]=
Math.max(Math.round(-C+E/2),O[0]):C+E/2>d&&(O[2]=Math.max(Math.round(C+E/2-d),O[2])))}),0===D(O)||this.verifyDataLabelOverflow(O))&&(this.placeDataLabels(),t&&f&&I(this.points,function(a){var b;x=a.connector;if((h=a.dataLabel)&&h._pos&&a.visible){M=h._attr.visibility;if(b=!x)a.connector=x=p.renderer.path().addClass("highcharts-data-label-connector highcharts-color-"+a.colorIndex).add(e.dataLabelsGroup),x.attr({"stroke-width":f,stroke:r.connectorColor||a.color||"#666666"});x[b?"attr":"animate"]({d:e.connectorPath(a.labelPos)});
x.attr("visibility",M)}else x&&(a.connector=x.destroy())}))},p.pie.prototype.connectorPath=function(a){var b=a.x,e=a.y;return q(this.options.dataLabels.softConnector,!0)?["M",b+("left"===a[6]?5:-5),e,"C",b,e,2*a[2]-a[4],2*a[3]-a[5],a[2],a[3],"L",a[4],a[5]]:["M",b+("left"===a[6]?5:-5),e,"L",a[2],a[3],"L",a[4],a[5]]},p.pie.prototype.placeDataLabels=function(){I(this.points,function(a){var b=a.dataLabel;b&&a.visible&&((a=b._pos)?(b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))})},
p.pie.prototype.alignDataLabel=t,p.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,g=this.options,k=g.center,r=g.minSize||80,u,f;null!==k[0]?u=Math.max(b[2]-Math.max(a[1],a[3]),r):(u=Math.max(b[2]-a[1]-a[3],r),b[0]+=(a[3]-a[1])/2);null!==k[1]?u=Math.max(Math.min(u,b[2]-Math.max(a[0],a[2])),r):(u=Math.max(Math.min(u,b[2]-a[0]-a[2]),r),b[1]+=(a[0]-a[2])/2);u<b[2]?(b[2]=u,b[3]=Math.min(e(g.innerSize||0,u),u),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):f=!0;return f});
p.column&&(p.column.prototype.alignDataLabel=function(a,e,g,p,r){var k=this.chart.inverted,f=a.series,l=a.dlBox||a.shapeArgs,d=q(a.below,a.plotY>q(this.translatedThreshold,f.yAxis.len)),x=q(g.inside,!!this.options.stacking);l&&(p=z(l),0>p.y&&(p.height+=p.y,p.y=0),l=p.y+p.height-f.yAxis.len,0<l&&(p.height-=l),k&&(p={x:f.yAxis.len-p.y-p.height,y:f.xAxis.len-p.x-p.width,width:p.height,height:p.width}),x||(k?(p.x+=d?0:p.width,p.width=0):(p.y+=d?p.height:0,p.height=0)));g.align=q(g.align,!k||x?"center":
d?"right":"left");g.verticalAlign=q(g.verticalAlign,k||x?"middle":d?"top":"bottom");b.prototype.alignDataLabel.call(this,a,e,g,p,r)})})(K);(function(a){var E=a.Chart,D=a.each,H=a.pick,I=a.addEvent;E.prototype.callbacks.push(function(a){function n(){var m=[];D(a.series,function(a){var n=a.options.dataLabels,q=a.dataLabelCollections||["dataLabel"];(n.enabled||a._hasPointLabels)&&!n.allowOverlap&&a.visible&&D(q,function(e){D(a.points,function(a){a[e]&&(a[e].labelrank=H(a.labelrank,a.shapeArgs&&a.shapeArgs.height),
m.push(a[e]))})})});a.hideOverlappingLabels(m)}n();I(a,"redraw",n)});E.prototype.hideOverlappingLabels=function(a){var n=a.length,m,v,t,q,e,b,p,w,k,l=function(a,b,e,k,f,l,d,p){return!(f>a+e||f+d<a||l>b+k||l+p<b)};for(v=0;v<n;v++)if(m=a[v])m.oldOpacity=m.opacity,m.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(v=0;v<n;v++)for(t=a[v],m=v+1;m<n;++m)if(q=a[m],t&&q&&t.placed&&q.placed&&0!==t.newOpacity&&0!==q.newOpacity&&(e=t.alignAttr,b=q.alignAttr,p=t.parentGroup,w=q.parentGroup,
k=2*(t.box?0:t.padding),e=l(e.x+p.translateX,e.y+p.translateY,t.width-k,t.height-k,b.x+w.translateX,b.y+w.translateY,q.width-k,q.height-k)))(t.labelrank<q.labelrank?t:q).newOpacity=0;D(a,function(a){var b,e;a&&(e=a.newOpacity,a.oldOpacity!==e&&a.placed&&(e?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=e,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(K);(function(a){var E=a.addEvent,D=a.Chart,H=a.createElement,I=a.css,v=a.defaultOptions,n=a.defaultPlotOptions,m=a.each,z=
a.extend,t=a.fireEvent,q=a.hasTouch,e=a.inArray,b=a.isObject,p=a.Legend,w=a.merge,k=a.pick,l=a.Point,g=a.Series,F=a.seriesTypes,r=a.svg;a=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,e=b.pointer,d=function(a){for(var d=a.target,f;d&&!f;)f=d.point,d=d.parentNode;if(void 0!==f&&f!==b.hoverPoint)f.onMouseOver(a)};m(a.points,function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(m(a.trackerGroups,
function(b){if(a[b]){a[b].addClass("highcharts-tracker").on("mouseover",d).on("mouseout",function(a){e.onTrackerMouseOut(a)});if(q)a[b].on("touchstart",d);a.options.cursor&&a[b].css(I).css({cursor:a.options.cursor})}}),a._hasTracking=!0)},drawTrackerGraph:function(){var a=this,b=a.options,e=b.trackByArea,d=[].concat(e?a.areaPath:a.graphPath),g=d.length,c=a.chart,k=c.pointer,l=c.renderer,p=c.options.tooltip.snap,n=a.tracker,h,w=function(){if(c.hoverSeries!==a)a.onMouseOver()},t="rgba(192,192,192,"+
(r?.0001:.002)+")";if(g&&!e)for(h=g+1;h--;)"M"===d[h]&&d.splice(h+1,0,d[h+1]-p,d[h+2],"L"),(h&&"M"===d[h]||h===g)&&d.splice(h,0,"L",d[h-2]+p,d[h-1]);n?n.attr({d:d}):a.graph&&(a.tracker=l.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:t,fill:e?t:"none","stroke-width":a.graph.strokeWidth()+(e?0:2*p),zIndex:2}).add(a.group),m([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",w).on("mouseout",function(a){k.onTrackerMouseOut(a)});
b.cursor&&a.css({cursor:b.cursor});if(q)a.on("touchstart",w)}))}};F.column&&(F.column.prototype.drawTracker=a.drawTrackerPoint);F.pie&&(F.pie.prototype.drawTracker=a.drawTrackerPoint);F.scatter&&(F.scatter.prototype.drawTracker=a.drawTrackerPoint);z(p.prototype,{setItemEvents:function(a,b,e){var d=this,f=d.chart,c="highcharts-legend-"+(a.series?"point":"series")+"-active";(e?b:a.legendGroup).on("mouseover",function(){a.setState("hover");f.seriesGroup.addClass(c);b.css(d.options.itemHoverStyle)}).on("mouseout",
function(){b.css(a.visible?d.itemStyle:d.itemHiddenStyle);f.seriesGroup.removeClass(c);a.setState()}).on("click",function(b){var d=function(){a.setVisible&&a.setVisible()};b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,d):t(a,"legendItemClick",b,d)})},createCheckboxForItem:function(a){a.checkbox=H("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);E(a.checkbox,"click",function(b){t(a.series||a,"checkboxClick",
{checked:b.target.checked,item:a},function(){a.select()})})}});v.legend.itemStyle.cursor="pointer";z(D.prototype,{showResetZoom:function(){var a=this,b=v.lang,e=a.options.chart.resetZoomButton,d=e.theme,g=d.states,c="chart"===e.relativeTo?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,g&&g.hover).attr({align:e.position.align,title:b.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(e.position,!1,c)},zoomOut:function(){var a=this;
t(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var f,e=this.pointer,d=!1,g;!a||a.resetSelection?m(this.axes,function(a){f=a.zoom()}):m(a.xAxis.concat(a.yAxis),function(a){var b=a.axis;e[b.isXAxis?"zoomX":"zoomY"]&&(f=b.zoom(a.min,a.max),b.displayBtn&&(d=!0))});g=this.resetZoomButton;d&&!g?this.showResetZoom():!d&&b(g)&&(this.resetZoomButton=g.destroy());f&&this.redraw(k(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var f=this,d=f.hoverPoints,
e;d&&m(d,function(a){a.setState()});m("xy"===b?[1,0]:[1],function(b){b=f[b?"xAxis":"yAxis"][0];var d=b.horiz,c=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",g=f[d],k=(b.pointRange||0)/2,h=b.getExtremes(),l=b.toValue(g-c,!0)+k,k=b.toValue(g+b.len-c,!0)-k,p=k<l,g=p?k:l,l=p?l:k,k=Math.min(h.dataMin,h.min)-g,h=l-Math.max(h.dataMax,h.max);b.series.length&&0>k&&0>h&&(b.setExtremes(g,l,!1,!1,{trigger:"pan"}),e=!0);f[d]=c});e&&f.redraw(!1);I(f.container,{cursor:"move"})}});z(l.prototype,{select:function(a,
b){var f=this,d=f.series,g=d.chart;a=k(a,!f.selected);f.firePointEvent(a?"select":"unselect",{accumulate:b},function(){f.selected=f.options.selected=a;d.options.data[e(f,d.data)]=f.options;f.setState(a&&"select");b||m(g.getSelectedPoints(),function(a){a.selected&&a!==f&&(a.selected=a.options.selected=!1,d.options.data[e(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a,b){var f=this.series,d=f.chart,e=d.tooltip,c=d.hoverPoint;if(this.series){if(!b){if(c&&
c!==this)c.onMouseOut();if(d.hoverSeries!==f)f.onMouseOver();d.hoverPoint=this}!e||e.shared&&!f.noSharedTooltip?e||this.setState("hover"):(this.setState("hover"),e.refresh(this,a));this.firePointEvent("mouseOver")}},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;this.firePointEvent("mouseOut");b&&-1!==e(this,b)||(this.setState(),a.hoverPoint=null)},importEvents:function(){if(!this.hasImportedEvents){var a=w(this.series.options.point,this.options).events,b;this.events=a;for(b in a)E(this,
b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var f=Math.floor(this.plotX),d=this.plotY,e=this.series,c=e.options.states[a]||{},g=n[e.type].marker&&e.options.marker,l=g&&!1===g.enabled,p=g&&g.states&&g.states[a]||{},r=!1===p.enabled,h=e.stateMarkerGraphic,u=this.marker||{},m=e.chart,q=e.halo,w,t=g&&e.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===c.enabled||a&&(r||l&&!1===p.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){t&&(w=e.markerAttribs(this,
a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),this.graphic.attr(e.pointAttribs(this,a)),w&&this.graphic.animate(w,k(m.options.chart.animation,p.animation,g.animation)),h&&h.hide();else{if(a&&p){g=u.symbol||e.symbol;h&&h.currentSymbol!==g&&(h=h.destroy());if(h)h[b?"animate":"attr"]({x:w.x,y:w.y});else g&&(e.stateMarkerGraphic=h=m.renderer.symbol(g,w.x,w.y,w.width,w.height).add(e.markerGroup),h.currentSymbol=
g);h&&h.attr(e.pointAttribs(this,a))}h&&(h[a&&m.isInsidePlot(f,d,m.inverted)?"show":"hide"](),h.element.point=this)}(f=c.halo)&&f.size?(q||(e.halo=q=m.renderer.path().add(t?e.markerGroup:e.group)),q[b?"animate":"attr"]({d:this.haloPath(f.size)}),q.attr({"class":"highcharts-halo highcharts-color-"+k(this.colorIndex,e.colorIndex)}),q.point=this,q.attr(z({fill:this.color||e.color,"fill-opacity":f.opacity,zIndex:-1},f.attributes))):q&&q.point&&q.point.haloPath&&q.animate({d:q.point.haloPath(0)});this.state=
a}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});z(g.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&t(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,e=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&t(this,"mouseOut");!e||a.stickyTracking||
e.shared&&!this.noSharedTooltip||e.hide();this.setState()},setState:function(a){var b=this,e=b.options,d=b.graph,g=e.states,c=e.lineWidth,e=0;a=a||"";if(b.state!==a&&(m([b.group,b.markerGroup],function(d){d&&(b.state&&d.removeClass("highcharts-series-"+b.state),a&&d.addClass("highcharts-series-"+a))}),b.state=a,!g[a]||!1!==g[a].enabled)&&(a&&(c=g[a].lineWidth||c+(g[a].lineWidthPlus||0)),d&&!d.dashstyle))for(g={"stroke-width":c},d.attr(g);b["zone-graph-"+e];)b["zone-graph-"+e].attr(g),e+=1},setVisible:function(a,
b){var f=this,d=f.chart,e=f.legendItem,c,g=d.options.chart.ignoreHiddenSeries,k=f.visible;c=(f.visible=a=f.options.visible=f.userOptions.visible=void 0===a?!k:a)?"show":"hide";m(["group","dataLabelsGroup","markerGroup","tracker","tt"],function(a){if(f[a])f[a][c]()});if(d.hoverSeries===f||(d.hoverPoint&&d.hoverPoint.series)===f)f.onMouseOut();e&&d.legend.colorizeItem(f,a);f.isDirty=!0;f.options.stacking&&m(d.series,function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});m(f.linkedSeries,function(b){b.setVisible(a,
!1)});g&&(d.isDirtyBox=!0);!1!==b&&d.redraw();t(f,c)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);t(this,a?"select":"unselect")},drawTracker:a.drawTrackerGraph})})(K);(function(a){var E=a.Chart,D=a.each,H=a.inArray,I=a.isObject,v=a.pick,n=a.splat;E.prototype.setResponsive=function(a){var m=this.options.responsive;m&&m.rules&&D(m.rules,function(m){this.matchResponsiveRule(m,
a)},this)};E.prototype.matchResponsiveRule=function(m,n){var t=this.respRules,q=m.condition,e;e=q.callback||function(){return this.chartWidth<=v(q.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=v(q.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=v(q.minWidth,0)&&this.chartHeight>=v(q.minHeight,0)};void 0===m._id&&(m._id=a.uniqueKey());e=e.call(this);!t[m._id]&&e?m.chartOptions&&(t[m._id]=this.currentOptions(m.chartOptions),this.update(m.chartOptions,n)):t[m._id]&&!e&&(this.update(t[m._id],n),delete t[m._id])};
E.prototype.currentOptions=function(a){function m(a,e,b,p){var w,k;for(w in a)if(!p&&-1<H(w,["series","xAxis","yAxis"]))for(a[w]=n(a[w]),b[w]=[],k=0;k<a[w].length;k++)b[w][k]={},m(a[w][k],e[w][k],b[w][k],p+1);else I(a[w])?(b[w]={},m(a[w],e[w]||{},b[w],p+1)):b[w]=e[w]||null}var t={};m(a,this.options,t,0);return t}})(K);(function(a){var E=a.addEvent,D=a.Axis,H=a.Chart,I=a.css,v=a.dateFormat,n=a.defined,m=a.each,z=a.extend,t=a.noop,q=a.Series,e=a.timeUnits;a=a.wrap;a(q.prototype,"init",function(a){var b;
a.apply(this,Array.prototype.slice.call(arguments,1));(b=this.xAxis)&&b.options.ordinal&&E(this,"updatedData",function(){delete b.ordinalIndex})});a(D.prototype,"getTimeTicks",function(a,p,m,k,l,g,q,r){var b=0,f,w,d={},x,c,y,t=[],A=-Number.MAX_VALUE,J=this.options.tickPixelInterval;if(!this.options.ordinal&&!this.options.breaks||!g||3>g.length||void 0===m)return a.call(this,p,m,k,l);c=g.length;for(f=0;f<c;f++){y=f&&g[f-1]>k;g[f]<m&&(b=f);if(f===c-1||g[f+1]-g[f]>5*q||y){if(g[f]>A){for(w=a.call(this,
p,g[b],g[f],l);w.length&&w[0]<=A;)w.shift();w.length&&(A=w[w.length-1]);t=t.concat(w)}b=f+1}if(y)break}a=w.info;if(r&&a.unitRange<=e.hour){f=t.length-1;for(b=1;b<f;b++)v("%d",t[b])!==v("%d",t[b-1])&&(d[t[b]]="day",x=!0);x&&(d[t[0]]="day");a.higherRanks=d}t.info=a;if(r&&n(J)){r=a=t.length;f=[];var h;for(x=[];r--;)b=this.translate(t[r]),h&&(x[r]=h-b),f[r]=h=b;x.sort();x=x[Math.floor(x.length/2)];x<.6*J&&(x=null);r=t[a-1]>k?a-1:a;for(h=void 0;r--;)b=f[r],k=Math.abs(h-b),h&&k<.8*J&&(null===x||k<.8*x)?
(d[t[r]]&&!d[t[r+1]]?(k=r+1,h=b):k=r,t.splice(k,1)):h=b}return t});z(D.prototype,{beforeSetTickPositions:function(){var a,e=[],n=!1,k,l=this.getExtremes(),g=l.min,q=l.max,r,u=this.isXAxis&&!!this.options.breaks,l=this.options.ordinal,f=this.chart.options.chart.ignoreHiddenSeries;if(l||u){m(this.series,function(b,d){if(!(f&&!1===b.visible||!1===b.takeOrdinalPosition&&!u)&&(e=e.concat(b.processedXData),a=e.length,e.sort(function(a,b){return a-b}),a))for(d=a-1;d--;)e[d]===e[d+1]&&e.splice(d,1)});a=e.length;
if(2<a){k=e[1]-e[0];for(r=a-1;r--&&!n;)e[r+1]-e[r]!==k&&(n=!0);!this.options.keepOrdinalPadding&&(e[0]-g>k||q-e[e.length-1]>k)&&(n=!0)}n?(this.ordinalPositions=e,k=this.ordinal2lin(Math.max(g,e[0]),!0),r=Math.max(this.ordinal2lin(Math.min(q,e[e.length-1]),!0),1),this.ordinalSlope=q=(q-g)/(r-k),this.ordinalOffset=g-k*q):this.ordinalPositions=this.ordinalSlope=this.ordinalOffset=void 0}this.isOrdinal=l&&n;this.groupIntervalFactor=null},val2lin:function(a,e){var b=this.ordinalPositions;if(b){var k=b.length,
l,g;for(l=k;l--;)if(b[l]===a){g=l;break}for(l=k-1;l--;)if(a>b[l]||0===l){a=(a-b[l])/(b[l+1]-b[l]);g=l+a;break}e=e?g:this.ordinalSlope*(g||0)+this.ordinalOffset}else e=a;return e},lin2val:function(a,e){var b=this.ordinalPositions;if(b){var k=this.ordinalSlope,l=this.ordinalOffset,g=b.length-1,p;if(e)0>a?a=b[0]:a>g?a=b[g]:(g=Math.floor(a),p=a-g);else for(;g--;)if(e=k*g+l,a>=e){k=k*(g+1)+l;p=(a-e)/(k-e);break}return void 0!==p&&void 0!==b[g]?b[g]+(p?p*(b[g+1]-b[g]):0):a}return a},getExtendedPositions:function(){var a=
this.chart,e=this.series[0].currentDataGrouping,n=this.ordinalIndex,k=e?e.count+e.unitName:"raw",l=this.getExtremes(),g,q;n||(n=this.ordinalIndex={});n[k]||(g={series:[],chart:a,getExtremes:function(){return{min:l.dataMin,max:l.dataMax}},options:{ordinal:!0},val2lin:D.prototype.val2lin},m(this.series,function(b){q={xAxis:g,xData:b.xData,chart:a,destroyGroupedData:t};q.options={dataGrouping:e?{enabled:!0,forced:!0,approximation:"open",units:[[e.unitName,[e.count]]]}:{enabled:!1}};b.processData.apply(q);
g.series.push(q)}),this.beforeSetTickPositions.apply(g),n[k]=g.ordinalPositions);return n[k]},getGroupIntervalFactor:function(a,e,m){var b;m=m.processedXData;var l=m.length,g=[];b=this.groupIntervalFactor;if(!b){for(b=0;b<l-1;b++)g[b]=m[b+1]-m[b];g.sort(function(a,b){return a-b});g=g[Math.floor(l/2)];a=Math.max(a,m[0]);e=Math.min(e,m[l-1]);this.groupIntervalFactor=b=l*g/(e-a)}return b},postProcessTickInterval:function(a){var b=this.ordinalSlope;return b?this.options.breaks?this.closestPointRange:
a/(b/this.closestPointRange):a}});D.prototype.ordinal2lin=D.prototype.val2lin;a(H.prototype,"pan",function(a,e){var b=this.xAxis[0],k=e.chartX,l=!1;if(b.options.ordinal&&b.series.length){var g=this.mouseDownX,p=b.getExtremes(),r=p.dataMax,n=p.min,f=p.max,q=this.hoverPoints,d=b.closestPointRange,g=(g-k)/(b.translationSlope*(b.ordinalSlope||d)),x={ordinalPositions:b.getExtendedPositions()},d=b.lin2val,c=b.val2lin,y;x.ordinalPositions?1<Math.abs(g)&&(q&&m(q,function(a){a.setState()}),0>g?(q=x,y=b.ordinalPositions?
b:x):(q=b.ordinalPositions?b:x,y=x),x=y.ordinalPositions,r>x[x.length-1]&&x.push(r),this.fixedRange=f-n,g=b.toFixedRange(null,null,d.apply(q,[c.apply(q,[n,!0])+g,!0]),d.apply(y,[c.apply(y,[f,!0])+g,!0])),g.min>=Math.min(p.dataMin,n)&&g.max<=Math.max(r,f)&&b.setExtremes(g.min,g.max,!0,!1,{trigger:"pan"}),this.mouseDownX=k,I(this.container,{cursor:"move"})):l=!0}else l=!0;l&&a.apply(this,Array.prototype.slice.call(arguments,1))});q.prototype.gappedPath=function(){var a=this.options.gapSize,e=this.points.slice(),
m=e.length-1;if(a&&0<m)for(;m--;)e[m+1].x-e[m].x>this.closestPointRange*a&&e.splice(m+1,0,{isNull:!0});return this.getGraphPath(e)}})(K);(function(a){function E(){return Array.prototype.slice.call(arguments,1)}function D(a){a.apply(this);this.drawBreaks(this.xAxis,["x"]);this.drawBreaks(this.yAxis,H(this.pointArrayMap,["y"]))}var H=a.pick,I=a.wrap,v=a.each,n=a.extend,m=a.isArray,z=a.fireEvent,t=a.Axis,q=a.Series;n(t.prototype,{isInBreak:function(a,b){var e=a.repeat||Infinity,m=a.from,k=a.to-a.from;
b=b>=m?(b-m)%e:e-(m-b)%e;return a.inclusive?b<=k:b<k&&0!==b},isInAnyBreak:function(a,b){var e=this.options.breaks,m=e&&e.length,k,l,g;if(m){for(;m--;)this.isInBreak(e[m],a)&&(k=!0,l||(l=H(e[m].showPoints,this.isXAxis?!1:!0)));g=k&&b?k&&!l:k}return g}});I(t.prototype,"setTickPositions",function(a){a.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var b=this.tickPositions,e=this.tickPositions.info,m=[],k;for(k=0;k<b.length;k++)this.isInAnyBreak(b[k])||m.push(b[k]);this.tickPositions=
m;this.tickPositions.info=e}});I(t.prototype,"init",function(a,b,p){var e=this;p.breaks&&p.breaks.length&&(p.ordinal=!1);a.call(this,b,p);a=this.options.breaks;e.isBroken=m(a)&&!!a.length;e.isBroken&&(e.val2lin=function(a){var b=a,g,k;for(k=0;k<e.breakArray.length;k++)if(g=e.breakArray[k],g.to<=a)b-=g.len;else if(g.from>=a)break;else if(e.isInBreak(g,a)){b-=a-g.from;break}return b},e.lin2val=function(a){var b,g;for(g=0;g<e.breakArray.length&&!(b=e.breakArray[g],b.from>=a);g++)b.to<a?a+=b.len:e.isInBreak(b,
a)&&(a+=b.len);return a},e.setExtremes=function(a,b,e,m,r){for(;this.isInAnyBreak(a);)a-=this.closestPointRange;for(;this.isInAnyBreak(b);)b-=this.closestPointRange;t.prototype.setExtremes.call(this,a,b,e,m,r)},e.setAxisTranslation=function(a){t.prototype.setAxisTranslation.call(this,a);var b=e.options.breaks;a=[];var g=[],k=0,m,p,f=e.userMin||e.min,n=e.userMax||e.max,d,x;for(x in b)p=b[x],m=p.repeat||Infinity,e.isInBreak(p,f)&&(f+=p.to%m-f%m),e.isInBreak(p,n)&&(n-=n%m-p.from%m);for(x in b){p=b[x];
d=p.from;for(m=p.repeat||Infinity;d-m>f;)d-=m;for(;d<f;)d+=m;for(;d<n;d+=m)a.push({value:d,move:"in"}),a.push({value:d+(p.to-p.from),move:"out",size:p.breakSize})}a.sort(function(a,b){return a.value===b.value?("in"===a.move?0:1)-("in"===b.move?0:1):a.value-b.value});b=0;d=f;for(x in a)p=a[x],b+="in"===p.move?1:-1,1===b&&"in"===p.move&&(d=p.value),0===b&&(g.push({from:d,to:p.value,len:p.value-d-(p.size||0)}),k+=p.value-d-(p.size||0));e.breakArray=g;z(e,"afterBreaks");e.transA*=(n-e.min)/(n-f-k);e.min=
f;e.max=n})});I(q.prototype,"generatePoints",function(a){a.apply(this,E(arguments));var b=this.xAxis,e=this.yAxis,m=this.points,k,l=m.length,g=this.options.connectNulls,n;if(b&&e&&(b.options.breaks||e.options.breaks))for(;l--;)k=m[l],n=null===k.y&&!1===g,n||!b.isInAnyBreak(k.x,!0)&&!e.isInAnyBreak(k.y,!0)||(m.splice(l,1),this.data[l]&&this.data[l].destroyElements())});a.Series.prototype.drawBreaks=function(a,b){var e=this,m=e.points,k,l,g,n;a&&v(b,function(b){k=a.breakArray||[];l=a.isXAxis?a.min:
H(e.options.threshold,a.min);v(m,function(e){n=H(e["stack"+b.toUpperCase()],e[b]);v(k,function(b){g=!1;if(l<b.from&&n>b.to||l>b.from&&n<b.from)g="pointBreak";else if(l<b.from&&n>b.from&&n<b.to||l>b.from&&n>b.to&&n<b.from)g="pointInBreak";g&&z(a,g,{point:e,brk:b})})})})};I(a.seriesTypes.column.prototype,"drawPoints",D);I(a.Series.prototype,"drawPoints",D)})(K);(function(a){var E=a.arrayMax,D=a.arrayMin,H=a.Axis,I=a.defaultPlotOptions,v=a.defined,n=a.each,m=a.extend,z=a.format,t=a.isNumber,q=a.merge,
e=a.pick,b=a.Point,p=a.Tooltip,w=a.wrap,k=a.Series.prototype,l=k.processData,g=k.generatePoints,F=k.destroy,r={approximation:"average",groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y",
"%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},u={line:{},spline:{},area:{},areaspline:{},column:{approximation:"sum",groupPixelWidth:10},arearange:{approximation:"range"},areasplinerange:{approximation:"range"},columnrange:{approximation:"range",groupPixelWidth:10},candlestick:{approximation:"ohlc",groupPixelWidth:10},ohlc:{approximation:"ohlc",groupPixelWidth:5}},f=a.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,
10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]],B={sum:function(a){var b=a.length,d;if(!b&&a.hasNulls)d=null;else if(b)for(d=0;b--;)d+=a[b];return d},average:function(a){var b=a.length;a=B.sum(a);t(a)&&b&&(a/=b);return a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?E(a):a.hasNulls?null:void 0},low:function(a){return a.length?D(a):a.hasNulls?null:void 0},close:function(a){return a.length?
a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,b,c,e){a=B.open(a);b=B.high(b);c=B.low(c);e=B.close(e);if(t(a)||t(b)||t(c)||t(e))return[a,b,c,e]},range:function(a,b){a=B.low(a);b=B.high(b);if(t(a)||t(b))return[a,b]}};k.groupData=function(a,b,c,e){var d=this.data,f=this.options.data,g=[],h=[],k=[],l=a.length,m,p,n=!!b,r=[[],[],[],[]];e="function"===typeof e?e:B[e];var q=this.pointArrayMap,y=q&&q.length,u,x=0;for(u=p=0;u<=l&&!(a[u]>=c[0]);u++);for(u;u<=l;u++){for(;(void 0!==c[x+1]&&a[u]>=c[x+
1]||u===l)&&(m=c[x],this.dataGroupInfo={start:p,length:r[0].length},p=e.apply(this,r),void 0!==p&&(g.push(m),h.push(p),k.push(this.dataGroupInfo)),p=u,r[0]=[],r[1]=[],r[2]=[],r[3]=[],x+=1,u!==l););if(u===l)break;if(q){m=this.cropStart+u;m=d&&d[m]||this.pointClass.prototype.applyOptions.apply({series:this},[f[m]]);var w,v;for(w=0;w<y;w++)v=m[q[w]],t(v)?r[w].push(v):null===v&&(r[w].hasNulls=!0)}else m=n?b[u]:null,t(m)?r[0].push(m):null===m&&(r[0].hasNulls=!0)}return[g,h,k]};k.processData=function(){var a=
this.chart,b=this.options.dataGrouping,c=!1!==this.allowDG&&b&&e(b.enabled,a.options.isStock),g=this.visible||!a.options.chart.ignoreHiddenSeries,m;this.forceCrop=c;this.groupPixelWidth=null;this.hasProcessed=!0;if(!1!==l.apply(this,arguments)&&c&&g){this.destroyGroupedData();var p=this.processedXData,r=this.processedYData,h=a.plotSizeX,a=this.xAxis,n=a.options.ordinal,u=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(u){this.isDirty=m=!0;g=a.getExtremes();c=g.min;g=g.max;n=n&&
a.getGroupIntervalFactor(c,g,this)||1;h=u*(g-c)/h*n;u=a.getTimeTicks(a.normalizeTimeTickInterval(h,b.units||f),Math.min(c,p[0]),Math.max(g,p[p.length-1]),a.options.startOfWeek,p,this.closestPointRange);p=k.groupData.apply(this,[p,r,u,b.approximation]);r=p[0];n=p[1];if(b.smoothed){b=r.length-1;for(r[b]=Math.min(r[b],g);b--&&0<b;)r[b]+=h/2;r[0]=Math.max(r[0],c)}this.currentDataGrouping=u.info;this.closestPointRange=u.info.totalRange;this.groupMap=p[2];v(r[0])&&r[0]<a.dataMin&&(a.min===a.dataMin&&(a.min=
r[0]),a.dataMin=r[0]);this.processedXData=r;this.processedYData=n}else this.currentDataGrouping=this.groupMap=null;this.hasGroupedData=m}};k.destroyGroupedData=function(){var a=this.groupedData;n(a||[],function(b,d){b&&(a[d]=b.destroy?b.destroy():null)});this.groupedData=null};k.generatePoints=function(){g.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};w(b.prototype,"update",function(b){this.dataGroup?a.error(24):b.apply(this,[].slice.call(arguments,1))});
w(p.prototype,"tooltipFooterHeaderFormatter",function(b,e,c){var d=e.series,f=d.tooltipOptions,g=d.options.dataGrouping,k=f.xDateFormat,h,l=d.xAxis,p=a.dateFormat;return l&&"datetime"===l.options.type&&g&&t(e.key)?(b=d.currentDataGrouping,g=g.dateTimeLabelFormats,b?(l=g[b.unitName],1===b.count?k=l[0]:(k=l[1],h=l[2])):!k&&g&&(k=this.getXDateFormat(e,f,l)),k=p(k,e.key),h&&(k+=p(h,e.key+b.totalRange-1)),z(f[(c?"footer":"header")+"Format"],{point:m(e.point,{key:k}),series:d})):b.call(this,e,c)});k.destroy=
function(){for(var a=this.groupedData||[],b=a.length;b--;)a[b]&&a[b].destroy();F.apply(this)};w(k,"setOptions",function(a,b){a=a.call(this,b);var d=this.type,e=this.chart.options.plotOptions,f=I[d].dataGrouping;u[d]&&(f||(f=q(r,u[d])),a.dataGrouping=q(f,e.series&&e.series.dataGrouping,e[d].dataGrouping,b.dataGrouping));this.chart.options.isStock&&(this.requireSorting=!0);return a});w(H.prototype,"setScale",function(a){a.call(this);n(this.series,function(a){a.hasProcessed=!1})});H.prototype.getGroupPixelWidth=
function(){var a=this.series,b=a.length,c,e=0,f=!1,g;for(c=b;c--;)(g=a[c].options.dataGrouping)&&(e=Math.max(e,g.groupPixelWidth));for(c=b;c--;)(g=a[c].options.dataGrouping)&&a[c].hasProcessed&&(b=(a[c].processedXData||a[c].data).length,a[c].groupPixelWidth||b>this.chart.plotSizeX/e||b&&g.forced)&&(f=!0);return f?e:0};H.prototype.setDataGrouping=function(a,b){var c;b=e(b,!0);a||(a={forced:!1,units:null});if(this instanceof H)for(c=this.series.length;c--;)this.series[c].update({dataGrouping:a},!1);
else n(this.chart.options.series,function(b){b.dataGrouping=a},!1);b&&this.chart.redraw()}})(K);(function(a){var E=a.each,D=a.Point,H=a.seriesType,I=a.seriesTypes;H("ohlc","column",{lineWidth:1,tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},threshold:null,states:{hover:{lineWidth:3}}},{pointArrayMap:["open",
"high","low","close"],toYData:function(a){return[a.open,a.high,a.low,a.close]},pointValKey:"high",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,n){n=I.column.prototype.pointAttribs.call(this,a,n);var m=this.options;delete n.fill;!a.options.color&&m.upColor&&a.open<a.close&&(n.stroke=m.upColor);return n},translate:function(){var a=this,n=a.yAxis,m=!!a.modifyValue,z=["plotOpen","yBottom","plotClose"];I.column.prototype.translate.apply(a);E(a.points,function(t){E([t.open,
t.low,t.close],function(q,e){null!==q&&(m&&(q=a.modifyValue(q)),t[z[e]]=n.toPixels(q,!0))})})},drawPoints:function(){var a=this,n=a.chart;E(a.points,function(m){var v,t,q,e,b=m.graphic,p,w=!b;void 0!==m.plotY&&(b||(m.graphic=b=n.renderer.path().add(a.group)),b.attr(a.pointAttribs(m,m.selected&&"select")),t=b.strokeWidth()%2/2,p=Math.round(m.plotX)-t,q=Math.round(m.shapeArgs.width/2),e=["M",p,Math.round(m.yBottom),"L",p,Math.round(m.plotY)],null!==m.open&&(v=Math.round(m.plotOpen)+t,e.push("M",p,v,
"L",p-q,v)),null!==m.close&&(v=Math.round(m.plotClose)+t,e.push("M",p,v,"L",p+q,v)),b[w?"attr":"animate"]({d:e}).addClass(m.getClassName(),!0))})},animate:null},{getClassName:function(){return D.prototype.getClassName.call(this)+(this.open<this.close?" highcharts-point-up":" highcharts-point-down")}})})(K);(function(a){var E=a.defaultPlotOptions,D=a.each,H=a.merge,I=a.seriesType,v=a.seriesTypes;I("candlestick","ohlc",H(E.column,{states:{hover:{lineWidth:2}},tooltip:E.ohlc.tooltip,threshold:null,lineColor:"#000000",
lineWidth:1,upColor:"#ffffff"}),{pointAttribs:function(a,m){var n=v.column.prototype.pointAttribs.call(this,a,m),t=this.options,q=a.open<a.close,e=t.lineColor||this.color;n["stroke-width"]=t.lineWidth;n.fill=a.options.color||(q?t.upColor||this.color:this.color);n.stroke=a.lineColor||(q?t.upLineColor||e:e);m&&(a=t.states[m],n.fill=a.color||n.fill,n.stroke=a.lineColor||n.stroke,n["stroke-width"]=a.lineWidth||n["stroke-width"]);return n},drawPoints:function(){var a=this,m=a.chart;D(a.points,function(n){var t=
n.graphic,q,e,b,p,w,k,l,g=!t;void 0!==n.plotY&&(t||(n.graphic=t=m.renderer.path().add(a.group)),t.attr(a.pointAttribs(n,n.selected&&"select")).shadow(a.options.shadow),w=t.strokeWidth()%2/2,k=Math.round(n.plotX)-w,q=n.plotOpen,e=n.plotClose,b=Math.min(q,e),q=Math.max(q,e),l=Math.round(n.shapeArgs.width/2),e=Math.round(b)!==Math.round(n.plotY),p=q!==n.yBottom,b=Math.round(b)+w,q=Math.round(q)+w,w=[],w.push("M",k-l,q,"L",k-l,b,"L",k+l,b,"L",k+l,q,"Z","M",k,b,"L",k,e?Math.round(n.plotY):b,"M",k,q,"L",
k,p?Math.round(n.yBottom):q),t[g?"attr":"animate"]({d:w}).addClass(n.getClassName(),!0))})}})})(K);(function(a){var E=a.addEvent,D=a.each,H=a.merge,I=a.noop,v=a.Renderer,n=a.seriesType,m=a.seriesTypes,z=a.TrackerMixin,t=a.VMLRenderer,q=a.SVGRenderer.prototype.symbols;n("flags","column",{pointRange:0,shape:"flag",stackDistance:12,textAlign:"center",tooltip:{pointFormat:"{point.text}\x3cbr/\x3e"},threshold:null,y:-30,fillColor:"#ffffff",lineWidth:1,states:{hover:{lineColor:"#000000",fillColor:"#ccd6eb"}},
style:{fontSize:"11px",fontWeight:"bold"}},{sorted:!1,noSharedTooltip:!0,allowDG:!1,takeOrdinalPosition:!1,trackerGroups:["markerGroup"],forceCrop:!0,init:a.Series.prototype.init,pointAttribs:function(a,b){var e=this.options,m=a&&a.color||this.color,k=e.lineColor,l=a&&a.lineWidth;a=a&&a.fillColor||e.fillColor;b&&(a=e.states[b].fillColor,k=e.states[b].lineColor,l=e.states[b].lineWidth);return{fill:a||m,stroke:k||m,"stroke-width":l||e.lineWidth||0}},translate:function(){m.column.prototype.translate.apply(this);
var a=this.options,b=this.chart,p=this.points,n=p.length-1,k,l,g=a.onSeries;k=g&&b.get(g);var a=a.onKey||"y",g=k&&k.options.step,q=k&&k.points,r=q&&q.length,u=this.xAxis,f=u.getExtremes(),t=0,d,x,c;if(k&&k.visible&&r)for(t=(k.pointXOffset||0)+(k.barW||0)/2,k=k.currentDataGrouping,x=q[r-1].x+(k?k.totalRange:0),p.sort(function(a,b){return a.x-b.x}),a="plot"+a[0].toUpperCase()+a.substr(1);r--&&p[n]&&!(k=p[n],d=q[r],d.x<=k.x&&void 0!==d[a]&&(k.x<=x&&(k.plotY=d[a],d.x<k.x&&!g&&(c=q[r+1])&&void 0!==c[a]&&
(k.plotY+=(k.x-d.x)/(c.x-d.x)*(c[a]-d[a]))),n--,r++,0>n)););D(p,function(a,c){var d;void 0===a.plotY&&(a.x>=f.min&&a.x<=f.max?a.plotY=b.chartHeight-u.bottom-(u.opposite?u.height:0)+u.offset-b.plotTop:a.shapeArgs={});a.plotX+=t;(l=p[c-1])&&l.plotX===a.plotX&&(void 0===l.stackIndex&&(l.stackIndex=0),d=l.stackIndex+1);a.stackIndex=d})},drawPoints:function(){var a=this.points,b=this.chart,m=b.renderer,n,k,l=this.options,g=l.y,q,r,u,f,t,d,x,c=this.yAxis;for(r=a.length;r--;)u=a[r],x=u.plotX>this.xAxis.len,
n=u.plotX,f=u.stackIndex,q=u.options.shape||l.shape,k=u.plotY,void 0!==k&&(k=u.plotY+g-(void 0!==f&&f*l.stackDistance)),t=f?void 0:u.plotX,d=f?void 0:u.plotY,f=u.graphic,void 0!==k&&0<=n&&!x?(f||(f=u.graphic=m.label("",null,null,q,null,null,l.useHTML).attr(this.pointAttribs(u)).css(H(l.style,u.style)).attr({align:"flag"===q?"left":"center",width:l.width,height:l.height,"text-align":l.textAlign}).addClass("highcharts-point").add(this.markerGroup),f.shadow(l.shadow)),0<n&&(n-=f.strokeWidth()%2),f.attr({text:u.options.title||
l.title||"A",x:n,y:k,anchorX:t,anchorY:d}),u.tooltipPos=b.inverted?[c.len+c.pos-b.plotLeft-k,this.xAxis.len-n]:[n,k]):f&&(u.graphic=f.destroy())},drawTracker:function(){var a=this.points;z.drawTrackerPoint.apply(this);D(a,function(b){var e=b.graphic;e&&E(e.element,"mouseover",function(){0<b.stackIndex&&!b.raised&&(b._y=e.y,e.attr({y:b._y-8}),b.raised=!0);D(a,function(a){a!==b&&a.raised&&a.graphic&&(a.graphic.attr({y:a._y}),a.raised=!1)})})})},animate:I,buildKDTree:I,setClip:I});q.flag=function(a,
b,m,n,k){return["M",k&&k.anchorX||a,k&&k.anchorY||b,"L",a,b+n,a,b,a+m,b,a+m,b+n,a,b+n,"Z"]};D(["circle","square"],function(a){q[a+"pin"]=function(b,e,m,k,l){var g=l&&l.anchorX;l=l&&l.anchorY;"circle"===a&&k>m&&(b-=Math.round((k-m)/2),m=k);b=q[a](b,e,m,k);g&&l&&b.push("M",g,e>l?e:e+k,"L",g,l);return b}});v===t&&D(["flag","circlepin","squarepin"],function(a){t.prototype.symbols[a]=q[a]})})(K);(function(a){function E(a,b,e){this.init(a,b,e)}var D=a.addEvent,H=a.Axis,I=a.correctFloat,v=a.defaultOptions,
n=a.defined,m=a.destroyObjectProperties,z=a.doc,t=a.each,q=a.fireEvent,e=a.hasTouch,b=a.isTouchDevice,p=a.merge,w=a.pick,k=a.removeEvent,l=a.wrap,g,F={height:b?20:14,barBorderRadius:0,buttonBorderRadius:0,liveRedraw:a.svg&&!b,margin:10,minWidth:6,step:.2,zIndex:3,barBackgroundColor:"#cccccc",barBorderWidth:1,barBorderColor:"#cccccc",buttonArrowColor:"#333333",buttonBackgroundColor:"#e6e6e6",buttonBorderColor:"#cccccc",buttonBorderWidth:1,rifleColor:"#333333",trackBackgroundColor:"#f2f2f2",trackBorderColor:"#f2f2f2",
trackBorderWidth:1};v.scrollbar=p(!0,F,v.scrollbar);a.swapXY=g=function(a,b){var e=a.length,g;if(b)for(b=0;b<e;b+=3)g=a[b+1],a[b+1]=a[b+2],a[b+2]=g;return a};E.prototype={init:function(a,b,e){this.scrollbarButtons=[];this.renderer=a;this.userOptions=b;this.options=p(F,b);this.chart=e;this.size=w(this.options.size,this.options.height);b.enabled&&(this.render(),this.initEvents(),this.addEvents())},render:function(){var a=this.renderer,b=this.options,e=this.size,k;this.group=k=a.g("scrollbar").attr({zIndex:b.zIndex,
translateY:-99999}).add();this.track=a.rect().addClass("highcharts-scrollbar-track").attr({x:0,r:b.trackBorderRadius||0,height:e,width:e}).add(k);this.track.attr({fill:b.trackBackgroundColor,stroke:b.trackBorderColor,"stroke-width":b.trackBorderWidth});this.trackBorderWidth=this.track.strokeWidth();this.track.attr({y:-this.trackBorderWidth%2/2});this.scrollbarGroup=a.g().add(k);this.scrollbar=a.rect().addClass("highcharts-scrollbar-thumb").attr({height:e,width:e,r:b.barBorderRadius||0}).add(this.scrollbarGroup);
this.scrollbarRifles=a.path(g(["M",-3,e/4,"L",-3,2*e/3,"M",0,e/4,"L",0,2*e/3,"M",3,e/4,"L",3,2*e/3],b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);this.scrollbar.attr({fill:b.barBackgroundColor,stroke:b.barBorderColor,"stroke-width":b.barBorderWidth});this.scrollbarRifles.attr({stroke:b.rifleColor,"stroke-width":1});this.scrollbarStrokeWidth=this.scrollbar.strokeWidth();this.scrollbarGroup.translate(-this.scrollbarStrokeWidth%2/2,-this.scrollbarStrokeWidth%2/2);this.drawScrollbarButton(0);
this.drawScrollbarButton(1)},position:function(a,b,e,g){var d=this.options.vertical,f=0,c=this.rendered?"animate":"attr";this.x=a;this.y=b+this.trackBorderWidth;this.width=e;this.xOffset=this.height=g;this.yOffset=f;d?(this.width=this.yOffset=e=f=this.size,this.xOffset=b=0,this.barWidth=g-2*e,this.x=a+=this.options.margin):(this.height=this.xOffset=g=b=this.size,this.barWidth=e-2*g,this.y+=this.options.margin);this.group[c]({translateX:a,translateY:this.y});this.track[c]({width:e,height:g});this.scrollbarButtons[1][c]({translateX:d?
0:e-b,translateY:d?g-f:0})},drawScrollbarButton:function(a){var b=this.renderer,e=this.scrollbarButtons,k=this.options,d=this.size,l;l=b.g().add(this.group);e.push(l);l=b.rect().addClass("highcharts-scrollbar-button").add(l);l.attr({stroke:k.buttonBorderColor,"stroke-width":k.buttonBorderWidth,fill:k.buttonBackgroundColor});l.attr(l.crisp({x:-.5,y:-.5,width:d+1,height:d+1,r:k.buttonBorderRadius},l.strokeWidth()));l=b.path(g(["M",d/2+(a?-1:1),d/2-3,"L",d/2+(a?-1:1),d/2+3,"L",d/2+(a?2:-2),d/2],k.vertical)).addClass("highcharts-scrollbar-arrow").add(e[a]);
l.attr({fill:k.buttonArrowColor})},setRange:function(a,b){var e=this.options,g=e.vertical,d=e.minWidth,k=this.barWidth,c,l,m=this.rendered&&!this.hasDragged?"animate":"attr";n(k)&&(a=Math.max(a,0),c=k*a,this.calculatedWidth=l=I(k*Math.min(b,1)-c),l<d&&(c=(k-d+l)*a,l=d),d=Math.floor(c+this.xOffset+this.yOffset),k=l/2-.5,this.from=a,this.to=b,g?(this.scrollbarGroup[m]({translateY:d}),this.scrollbar[m]({height:l}),this.scrollbarRifles[m]({translateY:k}),this.scrollbarTop=d,this.scrollbarLeft=0):(this.scrollbarGroup[m]({translateX:d}),
this.scrollbar[m]({width:l}),this.scrollbarRifles[m]({translateX:k}),this.scrollbarLeft=d,this.scrollbarTop=0),12>=l?this.scrollbarRifles.hide():this.scrollbarRifles.show(!0),!1===e.showFull&&(0>=a&&1<=b?this.group.hide():this.group.show()),this.rendered=!0)},initEvents:function(){var a=this;a.mouseMoveHandler=function(b){var e=a.chart.pointer.normalize(b),g=a.options.vertical?"chartY":"chartX",d=a.initPositions;!a.grabbedCenter||b.touches&&0===b.touches[0][g]||(e=a.cursorToScrollbarPosition(e)[g],
g=a[g],g=e-g,a.hasDragged=!0,a.updatePosition(d[0]+g,d[1]+g),a.hasDragged&&q(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b}))};a.mouseUpHandler=function(b){a.hasDragged&&q(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMType:b.type,DOMEvent:b});a.grabbedCenter=a.hasDragged=a.chartX=a.chartY=null};a.mouseDownHandler=function(b){b=a.chart.pointer.normalize(b);b=a.cursorToScrollbarPosition(b);a.chartX=b.chartX;a.chartY=b.chartY;a.initPositions=[a.from,a.to];a.grabbedCenter=
!0};a.buttonToMinClick=function(b){var e=I(a.to-a.from)*a.options.step;a.updatePosition(I(a.from-e),I(a.to-e));q(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.buttonToMaxClick=function(b){var e=(a.to-a.from)*a.options.step;a.updatePosition(a.from+e,a.to+e);q(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})};a.trackClick=function(b){var e=a.chart.pointer.normalize(b),g=a.to-a.from,d=a.y+a.scrollbarTop,k=a.x+a.scrollbarLeft;a.options.vertical&&e.chartY>d||!a.options.vertical&&
e.chartX>k?a.updatePosition(a.from+g,a.to+g):a.updatePosition(a.from-g,a.to-g);q(a,"changed",{from:a.from,to:a.to,trigger:"scrollbar",DOMEvent:b})}},cursorToScrollbarPosition:function(a){var b=this.options,b=b.minWidth>this.calculatedWidth?b.minWidth:0;return{chartX:(a.chartX-this.x-this.xOffset)/(this.barWidth-b),chartY:(a.chartY-this.y-this.yOffset)/(this.barWidth-b)}},updatePosition:function(a,b){1<b&&(a=I(1-I(b-a)),b=1);0>a&&(b=I(b-a),a=0);this.from=a;this.to=b},update:function(a){this.destroy();
this.init(this.chart.renderer,p(!0,this.options,a),this.chart)},addEvents:function(){var a=this.options.inverted?[1,0]:[0,1],b=this.scrollbarButtons,f=this.scrollbarGroup.element,g=this.mouseDownHandler,d=this.mouseMoveHandler,k=this.mouseUpHandler,a=[[b[a[0]].element,"click",this.buttonToMinClick],[b[a[1]].element,"click",this.buttonToMaxClick],[this.track.element,"click",this.trackClick],[f,"mousedown",g],[z,"mousemove",d],[z,"mouseup",k]];e&&a.push([f,"touchstart",g],[z,"touchmove",d],[z,"touchend",
k]);t(a,function(a){D.apply(null,a)});this._events=a},removeEvents:function(){t(this._events,function(a){k.apply(null,a)});this._events=void 0},destroy:function(){var a=this.chart.scroller;this.removeEvents();t(["track","scrollbarRifles","scrollbar","scrollbarGroup","group"],function(a){this[a]&&this[a].destroy&&(this[a]=this[a].destroy())},this);a&&(a.scrollbar=null,m(a.scrollbarButtons))}};l(H.prototype,"init",function(a){var b=this;a.apply(b,[].slice.call(arguments,1));b.options.scrollbar&&b.options.scrollbar.enabled&&
(b.options.scrollbar.vertical=!b.horiz,b.options.startOnTick=b.options.endOnTick=!1,b.scrollbar=new E(b.chart.renderer,b.options.scrollbar,b.chart),D(b.scrollbar,"changed",function(a){var e=Math.min(w(b.options.min,b.min),b.min,b.dataMin),d=Math.max(w(b.options.max,b.max),b.max,b.dataMax)-e,f;b.horiz&&!b.reversed||!b.horiz&&b.reversed?(f=e+d*this.to,e+=d*this.from):(f=e+d*(1-this.from),e+=d*(1-this.to));b.setExtremes(e,f,!0,!1,a)}))});l(H.prototype,"render",function(a){var b=Math.min(w(this.options.min,
this.min),this.min,this.dataMin),e=Math.max(w(this.options.max,this.max),this.max,this.dataMax),g=this.scrollbar,d;a.apply(this,[].slice.call(arguments,1));g&&(this.horiz?g.position(this.left,this.top+this.height+this.offset+2+(this.opposite?0:this.axisTitleMargin),this.width,this.height):g.position(this.left+this.width+2+this.offset+(this.opposite?this.axisTitleMargin:0),this.top,this.width,this.height),isNaN(b)||isNaN(e)||!n(this.min)||!n(this.max)?g.setRange(0,0):(d=(this.min-b)/(e-b),b=(this.max-
b)/(e-b),this.horiz&&!this.reversed||!this.horiz&&this.reversed?g.setRange(d,b):g.setRange(1-b,1-d)))});l(H.prototype,"getOffset",function(a){var b=this.horiz?2:1,e=this.scrollbar;a.apply(this,[].slice.call(arguments,1));e&&(this.chart.axisOffset[b]+=e.size+e.options.margin)});l(H.prototype,"destroy",function(a){this.scrollbar&&(this.scrollbar=this.scrollbar.destroy());a.apply(this,[].slice.call(arguments,1))});a.Scrollbar=E})(K);(function(a){function E(a){this.init(a)}var D=a.addEvent,H=a.Axis,I=
a.Chart,v=a.color,n=a.defaultOptions,m=a.defined,z=a.destroyObjectProperties,t=a.doc,q=a.each,e=a.erase,b=a.error,p=a.extend,w=a.grep,k=a.hasTouch,l=a.isNumber,g=a.isObject,F=a.merge,r=a.pick,u=a.removeEvent,f=a.Scrollbar,B=a.Series,d=a.seriesTypes,x=a.wrap,c=a.swapXY,y=[].concat(a.defaultDataGroupingUnits),L=function(a){var b=w(arguments,l);if(b.length)return Math[a].apply(0,b)};y[4]=["day",[1,2,3,4]];y[5]=["week",[1,2,3]];d=void 0===d.areaspline?"line":"areaspline";p(n,{navigator:{height:40,margin:25,
maskInside:!0,handles:{backgroundColor:"#f2f2f2",borderColor:"#999999"},maskFill:v("#6685c2").setOpacity(.3).get(),outlineColor:"#cccccc",outlineWidth:1,series:{type:d,color:"#335cad",fillOpacity:.05,lineWidth:1,compare:null,dataGrouping:{approximation:"average",enabled:!0,groupPixelWidth:2,smoothed:!0,units:y},dataLabels:{enabled:!1,zIndex:2},id:"highcharts-navigator-series",className:"highcharts-navigator-series",lineColor:null,marker:{enabled:!1},pointRange:0,shadow:!1,threshold:null},xAxis:{className:"highcharts-navigator-xaxis",
tickLength:0,lineWidth:0,gridLineColor:"#e6e6e6",gridLineWidth:1,tickPixelInterval:200,labels:{align:"left",style:{color:"#999999"},x:3,y:-4},crosshair:!1},yAxis:{className:"highcharts-navigator-yaxis",gridLineWidth:0,startOnTick:!1,endOnTick:!1,minPadding:.1,maxPadding:.1,labels:{enabled:!1},crosshair:!1,title:{text:null},tickLength:0,tickWidth:0}}});E.prototype={drawHandle:function(a,b,c,d){this.handles[b][d](c?{translateX:Math.round(this.left+this.height/2-8),translateY:Math.round(this.top+parseInt(a,
10)+.5)}:{translateX:Math.round(this.left+parseInt(a,10)),translateY:Math.round(this.top+this.height/2-8)})},getHandlePath:function(a){return c(["M",-4.5,.5,"L",3.5,.5,"L",3.5,15.5,"L",-4.5,15.5,"L",-4.5,.5,"M",-1.5,4,"L",-1.5,12,"M",.5,4,"L",.5,12],a)},drawOutline:function(a,b,c,d){var e=this.navigatorOptions.maskInside,f=this.outline.strokeWidth()/2,h=this.outlineHeight,g=this.scrollbarHeight,k=this.size,l=this.left-g,m=this.top;c?(l-=f,c=m+b+f,b=m+a+f,a=["M",l+h,m-g-f,"L",l+h,c,"L",l,c,"L",l,b,
"L",l+h,b,"L",l+h,m+k+g].concat(e?["M",l+h,c-f,"L",l+h,b+f]:[])):(a+=l+g-f,b+=l+g-f,m+=f,a=["M",l,m,"L",a,m,"L",a,m+h,"L",b,m+h,"L",b,m,"L",l+k+2*g,m].concat(e?["M",a-f,m,"L",b+f,m]:[]));this.outline[d]({d:a})},drawMasks:function(a,b,c,d){var e=this.left,f=this.top,h=this.height,g,k,l,m;c?(l=[e,e,e],m=[f,f+a,f+b],k=[h,h,h],g=[a,b-a,this.size-b]):(l=[e,e+a,e+b],m=[f,f,f],k=[a,b-a,this.size-b],g=[h,h,h]);q(this.shades,function(a,b){a[d]({x:l[b],y:m[b],width:k[b],height:g[b]})})},renderElements:function(){var a=
this,b=a.navigatorOptions,c=b.maskInside,d=a.chart,e=d.inverted,f=d.renderer,g;a.navigatorGroup=g=f.g("navigator").attr({zIndex:8,visibility:"hidden"}).add();var k={cursor:e?"ns-resize":"ew-resize"};q([!c,c,!c],function(c,d){a.shades[d]=f.rect().addClass("highcharts-navigator-mask"+(1===d?"-inside":"-outside")).attr({fill:c?b.maskFill:"transparent"}).css(1===d&&k).add(g)});a.outline=f.path().addClass("highcharts-navigator-outline").attr({"stroke-width":b.outlineWidth,stroke:b.outlineColor}).add(g);
q([0,1],function(c){a.handles[c]=f.path(a.getHandlePath(e)).attr({zIndex:7-c}).addClass("highcharts-navigator-handle highcharts-navigator-handle-"+["left","right"][c]).add(g);var d=b.handles;a.handles[c].attr({fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":1}).css(k)})},update:function(a){this.destroy();F(!0,this.chart.options.navigator,this.options,a);this.init(this.chart)},render:function(a,b,c,d){var e=this.chart,f,h,g=this.scrollbarHeight,k,n=this.xAxis;f=this.navigatorEnabled;var p,
q=this.rendered;h=e.inverted;var A=e.xAxis[0].minRange;if(!this.hasDragged||m(c)){if(!l(a)||!l(b))if(q)c=0,d=n.width;else return;this.left=r(n.left,e.plotLeft+g);h?(this.size=p=k=r(n.len,e.plotHeight-2*g),e=g):(this.size=p=k=r(n.len,e.plotWidth-2*g),e=k+2*g);c=r(c,n.toPixels(a,!0));d=r(d,n.toPixels(b,!0));l(c)&&Infinity!==Math.abs(c)||(c=0,d=e);a=n.toValue(c,!0);b=n.toValue(d,!0);if(Math.abs(b-a)<A)if(this.grabbedLeft)c=n.toPixels(b-A,!0);else if(this.grabbedRight)d=n.toPixels(a+A,!0);else return;
this.zoomedMax=Math.min(Math.max(c,d,0),p);this.zoomedMin=Math.min(Math.max(this.fixedWidth?this.zoomedMax-this.fixedWidth:Math.min(c,d),0),p);this.range=this.zoomedMax-this.zoomedMin;p=Math.round(this.zoomedMax);c=Math.round(this.zoomedMin);f&&(this.navigatorGroup.attr({visibility:"visible"}),q=q&&!this.hasDragged?"animate":"attr",this.drawMasks(c,p,h,q),this.drawOutline(c,p,h,q),this.drawHandle(c,0,h,q),this.drawHandle(p,1,h,q));this.scrollbar&&(h?(h=this.top-g,f=this.left-g+(f?0:this.height),g=
k+2*g):(h=this.top+(f?this.height:-g),f=this.left-g),this.scrollbar.position(f,h,e,g),this.scrollbar.setRange(c/k,p/k));this.rendered=!0}},addMouseEvents:function(){var a=this,b=a.chart,c=b.container,d=[],e,f;a.mouseMoveHandler=e=function(b){a.onMouseMove(b)};a.mouseUpHandler=f=function(b){a.onMouseUp(b)};d=a.getPartsEvents("mousedown");d.push(D(c,"mousemove",e),D(t,"mouseup",f));k&&(d.push(D(c,"touchmove",e),D(t,"touchend",f)),d.concat(a.getPartsEvents("touchstart")));a.eventsToUnbind=d;a.series&&
a.series[0]&&d.push(D(a.series[0].xAxis,"foundExtremes",function(){b.navigator.modifyNavigatorAxisExtremes()}))},getPartsEvents:function(a){var b=this,c=[];q(["shades","handles"],function(d){q(b[d],function(e,f){c.push(D(e.element,a,function(a){b[d+"Mousedown"](a,f)}))})});return c},shadesMousedown:function(a,b){a=this.chart.pointer.normalize(a);var c=this.chart,d=this.xAxis,e=this.zoomedMin,f=this.left,g=this.size,k=this.range,l=a.chartX,m;c.inverted&&(l=a.chartY,f=this.top);1===b?(this.grabbedCenter=
l,this.fixedWidth=k,this.dragOffset=l-e):(a=l-f-k/2,0===b?a=Math.max(0,a):2===b&&a+k>=g&&(a=g-k,m=this.getUnionExtremes().dataMax),a!==e&&(this.fixedWidth=k,b=d.toFixedRange(a,a+k,null,m),c.xAxis[0].setExtremes(Math.min(b.min,b.max),Math.max(b.min,b.max),!0,null,{trigger:"navigator"})))},handlesMousedown:function(a,b){this.chart.pointer.normalize(a);a=this.chart;var c=a.xAxis[0],d=a.inverted&&!c.reversed||!a.inverted&&c.reversed;0===b?(this.grabbedLeft=!0,this.otherHandlePos=this.zoomedMax,this.fixedExtreme=
d?c.min:c.max):(this.grabbedRight=!0,this.otherHandlePos=this.zoomedMin,this.fixedExtreme=d?c.max:c.min);a.fixedRange=null},onMouseMove:function(a){var b=this,c=b.chart,d=b.left,e=b.navigatorSize,f=b.range,g=b.dragOffset,k=c.inverted;a.touches&&0===a.touches[0].pageX||(a=c.pointer.normalize(a),c=a.chartX,k&&(d=b.top,c=a.chartY),b.grabbedLeft?(b.hasDragged=!0,b.render(0,0,c-d,b.otherHandlePos)):b.grabbedRight?(b.hasDragged=!0,b.render(0,0,b.otherHandlePos,c-d)):b.grabbedCenter&&(b.hasDragged=!0,c<
g?c=g:c>e+g-f&&(c=e+g-f),b.render(0,0,c-g,c-g+f)),b.hasDragged&&b.scrollbar&&b.scrollbar.options.liveRedraw&&(a.DOMType=a.type,setTimeout(function(){b.onMouseUp(a)},0)))},onMouseUp:function(a){var b=this.chart,c=this.xAxis,d,e,f=a.DOMEvent||a;if(this.hasDragged||"scrollbar"===a.trigger)this.zoomedMin===this.otherHandlePos?d=this.fixedExtreme:this.zoomedMax===this.otherHandlePos&&(e=this.fixedExtreme),this.zoomedMax===this.navigatorSize&&(e=this.getUnionExtremes().dataMax),c=c.toFixedRange(this.zoomedMin,
this.zoomedMax,d,e),m(c.min)&&b.xAxis[0].setExtremes(Math.min(c.min,c.max),Math.max(c.min,c.max),!0,this.hasDragged?!1:null,{trigger:"navigator",triggerOp:"navigator-drag",DOMEvent:f});"mousemove"!==a.DOMType&&(this.grabbedLeft=this.grabbedRight=this.grabbedCenter=this.fixedWidth=this.fixedExtreme=this.otherHandlePos=this.hasDragged=this.dragOffset=null)},removeEvents:function(){this.eventsToUnbind&&(q(this.eventsToUnbind,function(a){a()}),this.eventsToUnbind=void 0);this.removeBaseSeriesEvents()},
removeBaseSeriesEvents:function(){var a=this.baseSeries||[];this.navigatorEnabled&&a[0]&&!1!==this.navigatorOptions.adaptToUpdatedData&&(q(a,function(a){u(a,"updatedData",this.updatedDataHandler)},this),a[0].xAxis&&u(a[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes))},init:function(a){var b=a.options,c=b.navigator,d=c.enabled,e=b.scrollbar,g=e.enabled,b=d?c.height:0,k=g?e.height:0;this.handles=[];this.shades=[];this.chart=a;this.setBaseSeries();this.height=b;this.scrollbarHeight=k;this.scrollbarEnabled=
g;this.navigatorEnabled=d;this.navigatorOptions=c;this.scrollbarOptions=e;this.outlineHeight=b+k;var l=this,d=l.baseSeries,e=a.xAxis.length,g=a.yAxis.length,m=d&&d[0]&&d[0].xAxis||a.xAxis[0];a.extraMargin={type:c.opposite?"plotTop":"marginBottom",value:l.outlineHeight+c.margin};a.inverted&&(a.extraMargin.type=c.opposite?"marginRight":"plotLeft");a.isDirtyBox=!0;l.navigatorEnabled?(l.xAxis=new H(a,F({breaks:m.options.breaks,ordinal:m.options.ordinal},c.xAxis,{id:"navigator-x-axis",yAxis:"navigator-y-axis",
isX:!0,type:"datetime",index:e,offset:0,keepOrdinalPadding:!0,startOnTick:!1,endOnTick:!1,minPadding:0,maxPadding:0,zoomEnabled:!1},a.inverted?{offsets:[k,0,-k,0],width:b}:{offsets:[0,-k,0,k],height:b})),l.yAxis=new H(a,F(c.yAxis,{id:"navigator-y-axis",alignTicks:!1,offset:0,index:g,zoomEnabled:!1},a.inverted?{width:b}:{height:b})),d||c.series.data?l.addBaseSeries():0===a.series.length&&x(a,"redraw",function(b,c){0<a.series.length&&!l.series&&(l.setBaseSeries(),a.redraw=b);b.call(a,c)}),l.renderElements(),
l.addMouseEvents()):l.xAxis={translate:function(b,c){var d=a.xAxis[0],e=d.getExtremes(),f=a.plotWidth-2*k,h=L("min",d.options.min,e.dataMin),d=L("max",d.options.max,e.dataMax)-h;return c?b*d/f+h:f*(b-h)/d},toPixels:function(a){return this.translate(a)},toValue:function(a){return this.translate(a,!0)},toFixedRange:H.prototype.toFixedRange,fake:!0};a.options.scrollbar.enabled&&(a.scrollbar=l.scrollbar=new f(a.renderer,F(a.options.scrollbar,{margin:l.navigatorEnabled?0:10,vertical:a.inverted}),a),D(l.scrollbar,
"changed",function(b){var c=l.size,d=c*this.to,c=c*this.from;l.hasDragged=l.scrollbar.hasDragged;l.render(0,0,c,d);(a.options.scrollbar.liveRedraw||"mousemove"!==b.DOMType)&&setTimeout(function(){l.onMouseUp(b)})}));l.addBaseSeriesEvents();l.addChartEvents()},getUnionExtremes:function(a){var b=this.chart.xAxis[0],c=this.xAxis,d=c.options,e=b.options,f;a&&null===b.dataMin||(f={dataMin:r(d&&d.min,L("min",e.min,b.dataMin,c.dataMin,c.min)),dataMax:r(d&&d.max,L("max",e.max,b.dataMax,c.dataMax,c.max))});
return f},setBaseSeries:function(a){var b=this.chart,c=this.baseSeries=[];a=a||b.options&&b.options.navigator.baseSeries||0;this.series&&(this.removeBaseSeriesEvents(),q(this.series,function(a){a.destroy()}));q(b.series||[],function(b,d){(b.options.showInNavigator||(d===a||b.options.id===a)&&!1!==b.options.showInNavigator)&&c.push(b)});this.xAxis&&!this.xAxis.fake&&this.addBaseSeries()},addBaseSeries:function(){var a=this,b=a.chart,c=a.series=[],d=a.baseSeries,e,f,g=a.navigatorOptions.series,k,l=
{enableMouseTracking:!1,index:null,group:"nav",padXAxis:!1,xAxis:"navigator-x-axis",yAxis:"navigator-y-axis",showInLegend:!1,stacking:!1,isInternal:!0,visible:!0};d?q(d,function(d,h){l.name="Navigator "+(h+1);e=d.options||{};k=e.navigatorOptions||{};f=F(e,l,g,k);h=k.data||g.data;a.hasNavigatorData=a.hasNavigatorData||!!h;f.data=h||e.data&&e.data.slice(0);d.navigatorSeries=b.initSeries(f);c.push(d.navigatorSeries)}):(f=F(g,l),f.data=g.data,a.hasNavigatorData=!!f.data,c.push(b.initSeries(f)));this.addBaseSeriesEvents()},
addBaseSeriesEvents:function(){var a=this,b=a.baseSeries||[];b[0]&&b[0].xAxis&&D(b[0].xAxis,"foundExtremes",this.modifyBaseAxisExtremes);!1!==this.navigatorOptions.adaptToUpdatedData&&q(b,function(b){b.xAxis&&(D(b,"updatedData",this.updatedDataHandler),b.userOptions.events=p(b.userOptions.event,{updatedData:this.updatedDataHandler}));D(b,"remove",function(){this.navigatorSeries&&(e(a.series,this.navigatorSeries),this.navigatorSeries.remove(),delete this.navigatorSeries)})},this)},modifyNavigatorAxisExtremes:function(){var a=
this.xAxis,b;a.getExtremes&&(!(b=this.getUnionExtremes(!0))||b.dataMin===a.min&&b.dataMax===a.max||(a.min=b.dataMin,a.max=b.dataMax))},modifyBaseAxisExtremes:function(){var a=this.chart.navigator,b=this.getExtremes(),c=b.dataMin,d=b.dataMax,b=b.max-b.min,e=a.stickToMin,f=a.stickToMax,g,k,m=a.series&&a.series[0],n=!!this.setExtremes;this.eventArgs&&"rangeSelectorButton"===this.eventArgs.trigger||(e&&(k=c,g=k+b),f&&(g=d,e||(k=Math.max(g-b,m&&m.xData?m.xData[0]:-Number.MAX_VALUE))),n&&(e||f)&&l(k)&&
(this.min=this.userMin=k,this.max=this.userMax=g));a.stickToMin=a.stickToMax=null},updatedDataHandler:function(){var a=this.chart.navigator,b=this.navigatorSeries;a.stickToMin=l(this.xAxis.min)&&this.xAxis.min<=this.xData[0];a.stickToMax=Math.round(a.zoomedMax)>=Math.round(a.size);b&&!a.hasNavigatorData&&(b.options.pointStart=this.xData[0],b.setData(this.options.data,!1,null,!1))},addChartEvents:function(){D(this.chart,"redraw",function(){var a=this.navigator,b=a&&(a.baseSeries&&a.baseSeries[0]&&
a.baseSeries[0].xAxis||a.scrollbar&&this.xAxis[0]);b&&a.render(b.min,b.max)})},destroy:function(){this.removeEvents();this.xAxis&&(e(this.chart.xAxis,this.xAxis),e(this.chart.axes,this.xAxis));this.yAxis&&(e(this.chart.yAxis,this.yAxis),e(this.chart.axes,this.yAxis));q(this.series||[],function(a){a.destroy&&a.destroy()});q("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),function(a){this[a]&&this[a].destroy&&this[a].destroy();
this[a]=null},this);q([this.handles],function(a){z(a)},this)}};a.Navigator=E;x(H.prototype,"zoom",function(a,b,c){var d=this.chart,e=d.options,f=e.chart.zoomType,h=e.navigator,e=e.rangeSelector,g;this.isXAxis&&(h&&h.enabled||e&&e.enabled)&&("x"===f?d.resetZoomButton="blocked":"y"===f?g=!1:"xy"===f&&(d=this.previousZoom,m(b)?this.previousZoom=[this.min,this.max]:d&&(b=d[0],c=d[1],delete this.previousZoom)));return void 0!==g?g:a.call(this,b,c)});x(I.prototype,"init",function(a,b,c){D(this,"beforeRender",
function(){var a=this.options;if(a.navigator.enabled||a.scrollbar.enabled)this.scroller=this.navigator=new E(this)});a.call(this,b,c)});x(I.prototype,"setChartSize",function(a){var b=this.legend,c=this.navigator,d,e,f,g;a.apply(this,[].slice.call(arguments,1));c&&(e=b.options,f=c.xAxis,g=c.yAxis,d=c.scrollbarHeight,this.inverted?(c.left=c.navigatorOptions.opposite?this.chartWidth-d-c.height:this.spacing[3]+d,c.top=this.plotTop+d):(c.left=this.plotLeft+d,c.top=c.navigatorOptions.top||this.chartHeight-
c.height-d-this.spacing[2]-("bottom"===e.verticalAlign&&e.enabled&&!e.floating?b.legendHeight+r(e.margin,10):0)),f&&g&&(this.inverted?f.options.left=g.options.left=c.left:f.options.top=g.options.top=c.top,f.setAxisSize(),g.setAxisSize()))});x(B.prototype,"addPoint",function(a,c,d,e,f){var h=this.options.turboThreshold;h&&this.xData.length>h&&g(c,!0)&&this.chart.navigator&&b(20,!0);a.call(this,c,d,e,f)});x(I.prototype,"addSeries",function(a,b,c,d){a=a.call(this,b,!1,d);this.navigator&&this.navigator.setBaseSeries();
r(c,!0)&&this.redraw();return a});x(B.prototype,"update",function(a,b,c){a.call(this,b,!1);this.chart.navigator&&this.chart.navigator.setBaseSeries();r(c,!0)&&this.chart.redraw()});I.prototype.callbacks.push(function(a){var b=a.navigator;b&&(a=a.xAxis[0].getExtremes(),b.render(a.min,a.max))})})(K);(function(a){function E(a){this.init(a)}var D=a.addEvent,H=a.Axis,I=a.Chart,v=a.css,n=a.createElement,m=a.dateFormat,z=a.defaultOptions,t=z.global.useUTC,q=a.defined,e=a.destroyObjectProperties,b=a.discardElement,
p=a.each,w=a.extend,k=a.fireEvent,l=a.Date,g=a.isNumber,F=a.merge,r=a.pick,u=a.pInt,f=a.splat,B=a.wrap;w(z,{rangeSelector:{buttonTheme:{"stroke-width":0,width:28,height:18,padding:2,zIndex:7},height:35,inputPosition:{align:"right"},labelStyle:{color:"#666666"}}});z.lang=F(z.lang,{rangeSelectorZoom:"Zoom",rangeSelectorFrom:"From",rangeSelectorTo:"To"});E.prototype={clickButton:function(a,b){var c=this,d=c.chart,e=c.buttonOptions[a],k=d.xAxis[0],l=d.scroller&&d.scroller.getUnionExtremes()||k||{},h=
l.dataMin,m=l.dataMax,n,q=k&&Math.round(Math.min(k.max,r(m,k.max))),x=e.type,u,l=e._range,v,w,z,B=e.dataGrouping;if(null!==h&&null!==m){d.fixedRange=l;B&&(this.forcedDataGrouping=!0,H.prototype.setDataGrouping.call(k||{chart:this.chart},B,!1));if("month"===x||"year"===x)k?(x={range:e,max:q,dataMin:h,dataMax:m},n=k.minFromRange.call(x),g(x.newMax)&&(q=x.newMax)):l=e;else if(l)n=Math.max(q-l,h),q=Math.min(n+l,m);else if("ytd"===x)if(k)void 0===m&&(h=Number.MAX_VALUE,m=Number.MIN_VALUE,p(d.series,function(a){a=
a.xData;h=Math.min(a[0],h);m=Math.max(a[a.length-1],m)}),b=!1),q=c.getYTDExtremes(m,h,t),n=v=q.min,q=q.max;else{D(d,"beforeRender",function(){c.clickButton(a)});return}else"all"===x&&k&&(n=h,q=m);c.setSelected(a);k?k.setExtremes(n,q,r(b,1),null,{trigger:"rangeSelectorButton",rangeSelectorButton:e}):(u=f(d.options.xAxis)[0],z=u.range,u.range=l,w=u.min,u.min=v,D(d,"load",function(){u.range=z;u.min=w}))}},setSelected:function(a){this.selected=this.options.selected=a},defaultButtons:[{type:"month",count:1,
text:"1m"},{type:"month",count:3,text:"3m"},{type:"month",count:6,text:"6m"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"1y"},{type:"all",text:"All"}],init:function(a){var b=this,c=a.options.rangeSelector,d=c.buttons||[].concat(b.defaultButtons),e=c.selected,f=function(){var a=b.minInput,c=b.maxInput;a&&a.blur&&k(a,"blur");c&&c.blur&&k(c,"blur")};b.chart=a;b.options=c;b.buttons=[];a.extraTopMargin=c.height;b.buttonOptions=d;this.unMouseDown=D(a.container,"mousedown",f);this.unResize=D(a,"resize",
f);p(d,b.computeButtonRange);void 0!==e&&d[e]&&this.clickButton(e,!1);D(a,"load",function(){D(a.xAxis[0],"setExtremes",function(c){this.max-this.min!==a.fixedRange&&"rangeSelectorButton"!==c.trigger&&"updatedData"!==c.trigger&&b.forcedDataGrouping&&this.setDataGrouping(!1,!1)})})},updateButtonStates:function(){var a=this.chart,b=a.xAxis[0],c=Math.round(b.max-b.min),e=!b.hasVisibleSeries,a=a.scroller&&a.scroller.getUnionExtremes()||b,f=a.dataMin,k=a.dataMax,a=this.getYTDExtremes(k,f,t),l=a.min,h=a.max,
m=this.selected,n=g(m),q=this.options.allButtonsEnabled,r=this.buttons;p(this.buttonOptions,function(a,d){var g=a._range,p=a.type,t=a.count||1;a=r[d];var y=0;d=d===m;var u=g>k-f,x=g<b.minRange,v=!1,w=!1,g=g===c;("month"===p||"year"===p)&&c>=864E5*{month:28,year:365}[p]*t&&c<=864E5*{month:31,year:366}[p]*t?g=!0:"ytd"===p?(g=h-l===c,v=!d):"all"===p&&(g=b.max-b.min>=k-f,w=!d&&n&&g);p=!q&&(u||x||w||e);g=d&&g||g&&!n&&!v;p?y=3:g&&(n=!0,y=2);a.state!==y&&a.setState(y)})},computeButtonRange:function(a){var b=
a.type,c=a.count||1,d={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5};if(d[b])a._range=d[b]*c;else if("month"===b||"year"===b)a._range=864E5*{month:30,year:365}[b]*c},setInputValue:function(a,b){var c=this.chart.options.rangeSelector,d=this[a+"Input"];q(b)&&(d.previousValue=d.HCTime,d.HCTime=b);d.value=m(c.inputEditDateFormat||"%Y-%m-%d",d.HCTime);this[a+"DateBox"].attr({text:m(c.inputDateFormat||"%b %e, %Y",d.HCTime)})},showInput:function(a){var b=this.inputGroup,c=this[a+"DateBox"];
v(this[a+"Input"],{left:b.translateX+c.x+"px",top:b.translateY+"px",width:c.width-2+"px",height:c.height-2+"px",border:"2px solid silver"})},hideInput:function(a){v(this[a+"Input"],{border:0,width:"1px",height:"1px"});this.setInputValue(a)},drawInput:function(a){function b(){var a=m.value,b=(k.inputDateParser||Date.parse)(a),e=d.xAxis[0],f=d.scroller&&d.scroller.xAxis?d.scroller.xAxis:e,h=f.dataMin,f=f.dataMax;b!==m.previousValue&&(m.previousValue=b,g(b)||(b=a.split("-"),b=Date.UTC(u(b[0]),u(b[1])-
1,u(b[2]))),g(b)&&(t||(b+=6E4*(new Date).getTimezoneOffset()),l?b>c.maxInput.HCTime?b=void 0:b<h&&(b=h):b<c.minInput.HCTime?b=void 0:b>f&&(b=f),void 0!==b&&e.setExtremes(l?b:e.min,l?e.max:b,void 0,void 0,{trigger:"rangeSelectorInput"})))}var c=this,d=c.chart,e=d.renderer.style||{},f=d.renderer,k=d.options.rangeSelector,h=c.div,l="min"===a,m,p,q=this.inputGroup;this[a+"Label"]=p=f.label(z.lang[l?"rangeSelectorFrom":"rangeSelectorTo"],this.inputGroup.offset).addClass("highcharts-range-label").attr({padding:2}).add(q);
q.offset+=p.width+5;this[a+"DateBox"]=f=f.label("",q.offset).addClass("highcharts-range-input").attr({padding:2,width:k.inputBoxWidth||90,height:k.inputBoxHeight||17,stroke:k.inputBoxBorderColor||"#cccccc","stroke-width":1,"text-align":"center"}).on("click",function(){c.showInput(a);c[a+"Input"].focus()}).add(q);q.offset+=f.width+(l?10:0);this[a+"Input"]=m=n("input",{name:a,className:"highcharts-range-selector",type:"text"},{top:d.plotTop+"px"},h);p.css(F(e,k.labelStyle));f.css(F({color:"#333333"},
e,k.inputStyle));v(m,w({position:"absolute",border:0,width:"1px",height:"1px",padding:0,textAlign:"center",fontSize:e.fontSize,fontFamily:e.fontFamily,left:"-9em"},k.inputStyle));m.onfocus=function(){c.showInput(a)};m.onblur=function(){c.hideInput(a)};m.onchange=b;m.onkeypress=function(a){13===a.keyCode&&b()}},getPosition:function(){var a=this.chart,b=a.options.rangeSelector,a=r((b.buttonPosition||{}).y,a.plotTop-a.axisOffset[0]-b.height);return{buttonTop:a,inputTop:a-10}},getYTDExtremes:function(a,
b,c){var d=new l(a),e=d[l.hcGetFullYear]();c=c?l.UTC(e,0,1):+new l(e,0,1);b=Math.max(b||0,c);d=d.getTime();return{max:Math.min(a||d,d),min:b}},render:function(a,b){var c=this,d=c.chart,e=d.renderer,f=d.container,g=d.options,h=g.exporting&&!1!==g.exporting.enabled&&g.navigation&&g.navigation.buttonOptions,k=g.rangeSelector,l=c.buttons,g=z.lang,m=c.div,m=c.inputGroup,t=k.buttonTheme,u=k.buttonPosition||{},x=k.inputEnabled,v=t&&t.states,B=d.plotLeft,D,E=this.getPosition(),F=c.group,H=c.rendered;!1!==
k.enabled&&(H||(c.group=F=e.g("range-selector-buttons").add(),c.zoomText=e.text(g.rangeSelectorZoom,r(u.x,B),15).css(k.labelStyle).add(F),D=r(u.x,B)+c.zoomText.getBBox().width+5,p(c.buttonOptions,function(a,b){l[b]=e.button(a.text,D,0,function(){c.clickButton(b);c.isActive=!0},t,v&&v.hover,v&&v.select,v&&v.disabled).attr({"text-align":"center"}).add(F);D+=l[b].width+r(k.buttonSpacing,5)}),!1!==x&&(c.div=m=n("div",null,{position:"relative",height:0,zIndex:1}),f.parentNode.insertBefore(m,f),c.inputGroup=
m=e.g("input-group").add(),m.offset=0,c.drawInput("min"),c.drawInput("max"))),c.updateButtonStates(),F[H?"animate":"attr"]({translateY:E.buttonTop}),!1!==x&&(m.align(w({y:E.inputTop,width:m.offset,x:h&&E.inputTop<(h.y||0)+h.height-d.spacing[0]?-40:0},k.inputPosition),!0,d.spacingBox),q(x)||(d=F.getBBox(),m[m.alignAttr.translateX<d.x+d.width+10?"hide":"show"]()),c.setInputValue("min",a),c.setInputValue("max",b)),c.rendered=!0)},update:function(a){var b=this.chart;F(!0,b.options.rangeSelector,a);this.destroy();
this.init(b)},destroy:function(){var a=this.minInput,f=this.maxInput,c;this.unMouseDown();this.unResize();e(this.buttons);a&&(a.onfocus=a.onblur=a.onchange=null);f&&(f.onfocus=f.onblur=f.onchange=null);for(c in this)this[c]&&"chart"!==c&&(this[c].destroy?this[c].destroy():this[c].nodeType&&b(this[c])),this[c]!==E.prototype[c]&&(this[c]=null)}};H.prototype.toFixedRange=function(a,b,c,e){var d=this.chart&&this.chart.fixedRange;a=r(c,this.translate(a,!0,!this.horiz));b=r(e,this.translate(b,!0,!this.horiz));
c=d&&(b-a)/d;.7<c&&1.3>c&&(e?a=b-d:b=a+d);g(a)||(a=b=void 0);return{min:a,max:b}};H.prototype.minFromRange=function(){var a=this.range,b={month:"Month",year:"FullYear"}[a.type],c,e=this.max,f,k,l=function(a,c){var d=new Date(a);d["set"+b](d["get"+b]()+c);return d.getTime()-a};g(a)?(c=e-a,k=a):(c=e+l(e,-a.count),this.chart&&(this.chart.fixedRange=e-c));f=r(this.dataMin,Number.MIN_VALUE);g(c)||(c=f);c<=f&&(c=f,void 0===k&&(k=l(c,a.count)),this.newMax=Math.min(c+k,this.dataMax));g(e)||(c=void 0);return c};
B(I.prototype,"init",function(a,b,c){D(this,"init",function(){this.options.rangeSelector.enabled&&(this.rangeSelector=new E(this))});a.call(this,b,c)});I.prototype.callbacks.push(function(a){function b(){c=a.xAxis[0].getExtremes();g(c.min)&&d.render(c.min,c.max)}var c,d=a.rangeSelector,e,f;d&&(f=D(a.xAxis[0],"afterSetExtremes",function(a){d.render(a.min,a.max)}),e=D(a,"redraw",b),b());D(a,"destroy",function(){d&&(e(),f())})});a.RangeSelector=E})(K);(function(a){var E=a.arrayMax,D=a.arrayMin,H=a.Axis,
I=a.Chart,v=a.defined,n=a.each,m=a.extend,z=a.format,t=a.inArray,q=a.isNumber,e=a.isString,b=a.map,p=a.merge,w=a.pick,k=a.Point,l=a.Renderer,g=a.Series,F=a.splat,r=a.SVGRenderer,u=a.VMLRenderer,f=a.wrap,B=g.prototype,d=B.init,x=B.processData,c=k.prototype.tooltipFormatter;a.StockChart=a.stockChart=function(c,d,f){var g=e(c)||c.nodeName,h=arguments[g?1:0],k=h.series,l=a.getOptions(),m,n=w(h.navigator&&h.navigator.enabled,l.navigator.enabled,!0),q=n?{startOnTick:!1,endOnTick:!1}:null,r={marker:{enabled:!1,
radius:2}},t={shadow:!1,borderWidth:0};h.xAxis=b(F(h.xAxis||{}),function(a){return p({minPadding:0,maxPadding:0,ordinal:!0,title:{text:null},labels:{overflow:"justify"},showLastLabel:!0},l.xAxis,a,{type:"datetime",categories:null},q)});h.yAxis=b(F(h.yAxis||{}),function(a){m=w(a.opposite,!0);return p({labels:{y:-2},opposite:m,showLastLabel:!1,title:{text:null}},l.yAxis,a)});h.series=null;h=p({chart:{panning:!0,pinchType:"x"},navigator:{enabled:n},scrollbar:{enabled:w(l.scrollbar.enabled,!0)},rangeSelector:{enabled:w(l.rangeSelector.enabled,
!0)},title:{text:null},tooltip:{shared:!0,crosshairs:!0},legend:{enabled:!1},plotOptions:{line:r,spline:r,area:r,areaspline:r,arearange:r,areasplinerange:r,column:t,columnrange:t,candlestick:t,ohlc:t}},h,{isStock:!0});h.series=k;return g?new I(c,h,f):new I(h,d)};f(H.prototype,"autoLabelAlign",function(a){var b=this.chart,c=this.options,b=b._labelPanes=b._labelPanes||{},d=this.options.labels;return this.chart.options.isStock&&"yAxis"===this.coll&&(c=c.top+","+c.height,!b[c]&&d.enabled)?(15===d.x&&
(d.x=0),void 0===d.align&&(d.align="right"),b[c]=1,"right"):a.call(this,[].slice.call(arguments,1))});f(H.prototype,"getPlotLinePath",function(a,c,d,f,g,k){var h=this,l=this.isLinked&&!this.series?this.linkedParent.series:this.series,m=h.chart,p=m.renderer,r=h.left,u=h.top,y,x,z,A,B=[],D=[],E,G;if("colorAxis"===h.coll)return a.apply(this,[].slice.call(arguments,1));D=function(a){var c="xAxis"===a?"yAxis":"xAxis";a=h.options[c];return q(a)?[m[c][a]]:e(a)?[m.get(a)]:b(l,function(a){return a[c]})}(h.coll);
n(h.isXAxis?m.yAxis:m.xAxis,function(a){if(v(a.options.id)?-1===a.options.id.indexOf("navigator"):1){var b=a.isXAxis?"yAxis":"xAxis",b=v(a.options[b])?m[b][a.options[b]]:m[b][0];h===b&&D.push(a)}});E=D.length?[]:[h.isXAxis?m.yAxis[0]:m.xAxis[0]];n(D,function(a){-1===t(a,E)&&E.push(a)});G=w(k,h.translate(c,null,null,f));q(G)&&(h.horiz?n(E,function(a){var b;x=a.pos;A=x+a.len;y=z=Math.round(G+h.transB);if(y<r||y>r+h.width)g?y=z=Math.min(Math.max(r,y),r+h.width):b=!0;b||B.push("M",y,x,"L",z,A)}):n(E,
function(a){var b;y=a.pos;z=y+a.len;x=A=Math.round(u+h.height-G);if(x<u||x>u+h.height)g?x=A=Math.min(Math.max(u,x),h.top+h.height):b=!0;b||B.push("M",y,x,"L",z,A)}));return 0<B.length?p.crispPolyLine(B,d||1):null});H.prototype.getPlotBandPath=function(a,b){b=this.getPlotLinePath(b,null,null,!0);a=this.getPlotLinePath(a,null,null,!0);var c=[],d;if(a&&b)if(a.toString()===b.toString())c=a,c.flat=!0;else for(d=0;d<a.length;d+=6)c.push("M",a[d+1],a[d+2],"L",a[d+4],a[d+5],b[d+4],b[d+5],b[d+1],b[d+2],"z");
else c=null;return c};r.prototype.crispPolyLine=function(a,b){var c;for(c=0;c<a.length;c+=6)a[c+1]===a[c+4]&&(a[c+1]=a[c+4]=Math.round(a[c+1])-b%2/2),a[c+2]===a[c+5]&&(a[c+2]=a[c+5]=Math.round(a[c+2])+b%2/2);return a};l===u&&(u.prototype.crispPolyLine=r.prototype.crispPolyLine);f(H.prototype,"hideCrosshair",function(a,b){a.call(this,b);this.crossLabel&&(this.crossLabel=this.crossLabel.hide())});f(H.prototype,"drawCrosshair",function(a,b,c){var d,e;a.call(this,b,c);if(v(this.crosshair.label)&&this.crosshair.label.enabled&&
this.cross){a=this.chart;var f=this.options.crosshair.label,g=this.horiz;d=this.opposite;e=this.left;var k=this.top,l=this.crossLabel,n,p=f.format,q="",r="inside"===this.options.tickPosition,t=!1!==this.crosshair.snap,u=0;b||(b=this.cross&&this.cross.e);n=g?"center":d?"right"===this.labelAlign?"right":"left":"left"===this.labelAlign?"left":"center";l||(l=this.crossLabel=a.renderer.label(null,null,null,f.shape||"callout").addClass("highcharts-crosshair-label"+(this.series[0]&&" highcharts-color-"+
this.series[0].colorIndex)).attr({align:f.align||n,padding:w(f.padding,8),r:w(f.borderRadius,3),zIndex:2}).add(this.labelGroup),l.attr({fill:f.backgroundColor||this.series[0]&&this.series[0].color||"#666666",stroke:f.borderColor||"","stroke-width":f.borderWidth||0}).css(m({color:"#ffffff",fontWeight:"normal",fontSize:"11px",textAlign:"center"},f.style)));g?(n=t?c.plotX+e:b.chartX,k+=d?0:this.height):(n=d?this.width+e:0,k=t?c.plotY+k:b.chartY);p||f.formatter||(this.isDatetimeAxis&&(q="%b %d, %Y"),
p="{value"+(q?":"+q:"")+"}");b=t?c[this.isXAxis?"x":"y"]:this.toValue(g?b.chartX:b.chartY);l.attr({text:p?z(p,{value:b}):f.formatter.call(this,b),x:n,y:k,visibility:"visible"});b=l.getBBox();if(g){if(r&&!d||!r&&d)k=l.y-b.height}else k=l.y-b.height/2;g?(d=e-b.x,e=e+this.width-b.x):(d="left"===this.labelAlign?e:0,e="right"===this.labelAlign?e+this.width:a.chartWidth);l.translateX<d&&(u=d-l.translateX);l.translateX+b.width>=e&&(u=-(l.translateX+b.width-e));l.attr({x:n+u,y:k,anchorX:g?n:this.opposite?
0:a.chartWidth,anchorY:g?this.opposite?a.chartHeight:0:k+b.height/2})}});B.init=function(){d.apply(this,arguments);this.setCompare(this.options.compare)};B.setCompare=function(a){this.modifyValue="value"===a||"percent"===a?function(b,c){var d=this.compareValue;if(void 0!==b&&void 0!==d)return b="value"===a?b-d:b/d*100-(100===this.options.compareBase?0:100),c&&(c.change=b),b}:null;this.userOptions.compare=a;this.chart.hasRendered&&(this.isDirty=!0)};B.processData=function(){var a,b=-1,c,d,e,f;x.apply(this,
arguments);if(this.xAxis&&this.processedYData)for(c=this.processedXData,d=this.processedYData,e=d.length,this.pointArrayMap&&(b=t("close",this.pointArrayMap),-1===b&&(b=t(this.pointValKey||"y",this.pointArrayMap))),a=0;a<e-1;a++)if(f=-1<b?d[a][b]:d[a],q(f)&&c[a+1]>=this.xAxis.min&&0!==f){this.compareValue=f;break}};f(B,"getExtremes",function(a){var b;a.apply(this,[].slice.call(arguments,1));this.modifyValue&&(b=[this.modifyValue(this.dataMin),this.modifyValue(this.dataMax)],this.dataMin=D(b),this.dataMax=
E(b))});H.prototype.setCompare=function(a,b){this.isXAxis||(n(this.series,function(b){b.setCompare(a)}),w(b,!0)&&this.chart.redraw())};k.prototype.tooltipFormatter=function(b){b=b.replace("{point.change}",(0<this.change?"+":"")+a.numberFormat(this.change,w(this.series.tooltipOptions.changeDecimals,2)));return c.apply(this,[b])};f(g.prototype,"render",function(a){this.chart.is3d&&this.chart.is3d()||this.chart.polar||!this.xAxis||this.xAxis.isRadial||(!this.clipBox&&this.animate?(this.clipBox=p(this.chart.clipBox),
this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len):this.chart[this.sharedClipKey]?this.chart[this.sharedClipKey].attr({width:this.xAxis.len,height:this.yAxis.len}):this.clipBox&&(this.clipBox.width=this.xAxis.len,this.clipBox.height=this.yAxis.len));a.call(this)})})(K);return K});

},{}],3:[function(require,module,exports){
/*!
	Papa Parse
	v4.1.2
	https://github.com/mholt/PapaParse
*/
(function(global)
{
	"use strict";

	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = "\ufeff";
	Papa.BAD_DELIMITERS = ["\r", "\n", "\"", Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ",";			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;

	if (typeof module !== 'undefined' && module.exports)
	{
		// Export to Node...
		module.exports = Papa;
	}
	else if (isFunction(global.define) && global.define.amd)
	{
		// Wireup with RequireJS
		define(function() { return Papa; });
	}
	else
	{
		// ...or as browser global
		global.Papa = Papa;
	}

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() == "INPUT"
								&& $(this).attr('type').toLowerCase() == "file"
								&& global.FileReader;

				if (!supported || !this.files || this.files.length == 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length == 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action == "abort")
						{
							error("AbortError", f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action == "skip")
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned == "skip")
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		}
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = "";
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** delimiting character */
		var _delimiter = ",";

		/** newline character(s) */
		var _newline = "\r\n";

		unpackConfig();

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields = _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ["asdf"]
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw "exception: Unable to serialize unrecognized input";


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length == 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) == -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = "";

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === "undefined" || str === null)
				return "";

			str = str.toString().replace(/"/g, '""');

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) == ' '
							|| str.charAt(str.length - 1) == ' ';

			return needsQuotes ? '"' + str + '"' : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = "";
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = "";

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
			
			if (this._handle.paused() || this._handle.aborted())
				return;
			
			var lastIndex = results.meta.cursor;
			
			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();
			
			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open("GET", this._input, !IS_WORKER);
			
			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader("Range", "bytes="+this._start+"-"+end);
				xhr.setRequestHeader("If-None-Match", "webkit-no-cache"); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status == 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		}

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		}

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		}

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader("Content-Range");
			return parseInt(contentRange.substr(contentRange.lastIndexOf("/") + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		}

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		}

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		}

		this._chunkError = function()
		{
			this._sendError(reader.error);
		}

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		}
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		}
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;



	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;   // Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length == 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function () {
			return _aborted;
		}

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = "";
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '"+Papa.DefaultDelimiter+"'");
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length == 1 && _results.data[i][0] == "")
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length == 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = {};

				for (var j = 0; j < _results.data[i].length; j++)
				{
					if (_config.dynamicTyping)
					{
						var value = _results.data[i][j];
						if (value == "true" || value == "TRUE")
							_results.data[i][j] = true;
						else if (value == "false" || value == "FALSE")
							_results.data[i][j] = false;
						else
							_results.data[i][j] = tryParseFloat(value);
					}

					if (_config.header)
					{
						if (j >= _fields.length)
						{
							if (!row["__parsed_extra"])
								row["__parsed_extra"] = [];
							row["__parsed_extra"].push(_results.data[i][j]);
						}
						else
							row[_fields[j]] = _results.data[i][j];
					}
				}

				if (_config.header)
				{
					_results.data[i] = row;
					if (j > _fields.length)
						addError("FieldMismatch", "TooManyFields", "Too many fields: expected " + _fields.length + " fields but parsed " + j, i);
					else if (j < _fields.length)
						addError("FieldMismatch", "TooFewFields", "Too few fields: expected " + _fields.length + " fields but parsed " + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input)
		{
			var delimChoices = [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= preview.data.length;

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			if (r.length == 1)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] == '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ",";

		// Comment character must be valid
		if (comments === delim)
			throw "Comment character same as delimiter";
		else if (comments === true)
			comments = "#";
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw "Input must be a string";

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = typeof step === 'function';

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf('"') === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) == comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] == '"')
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf('"', quoteSearch+1);

						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: "Quotes",
									code: "MissingQuotes",
									message: "Quoted field unterminated",
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						if (quoteSearch === inputLen-1)
						{
							// Closing quote at EOF
							var value = input.substring(cursor, quoteSearch).replace(/""/g, '"');
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] == '"')
						{
							quoteSearch++;
							continue;
						}

						if (input[quoteSearch+1] == delim)
						{
							// Closing quote followed by delimiter
							row.push(input.substring(cursor, quoteSearch).replace(/""/g, '"'));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							// Closing quote followed by newline
							row.push(input.substring(cursor, quoteSearch).replace(/""/g, '"'));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}
							
							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}
					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline == -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append "papaworker" to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw "Not implemented.";
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}
})(typeof window !== 'undefined' ? window : this);

},{}],4:[function(require,module,exports){
;(function() {
  'use strict';

  /**
   *  Creates a DOM element.
   *
   *  @param tag The tag name for the element.
   *  @param attrs Attributes to assign to the element.
   *  @param text Text to append as a child node.
   *
   *  @return The created DOM element.
   */
  var createElement = function(tag, attrs, text) {
    var el = document.createElement(tag);
    for(var z in attrs) {
      el.setAttribute(z, attrs[z]);
    }
    if(text) el.appendChild(document.createTextNode(text));
    return el;
  }

  /**
   *  Detect Internet Explorer version as we cannot feature detect
   *  using ('XDomainRequest' in window) as IE10 retains the
   *  obsolete XDomainRequest object.
   */
  var ie = (function () {
    var version = 0, browser = false, map, jscript;
    map = {
      '5.5': 5.5,
      '5.6': 6,
      '5.7': 7,
      '5.8': 8,
      '9': 9,
      '10': 10
    };
    jscript = new Function('/*@cc_on return @_jscript_version; @*/')();
    if (jscript !== undefined) {
      browser = true;
      version = map[jscript];
    }
    return {version: version, browser: browser};
  }());

  /**
   *  Parse response headers into an object.
   *
   *  @param headers The response headers as a string.
   *
   *  @return An object encapsulating the response headers.
   */
  var parse = function(headers) {
    var output = {}, i, p, k, v;
    headers = headers || '';
    headers = headers.replace('\r', '');
    headers = headers.split('\n');
    for(i = 0;i < headers.length;i++) {
      p = headers[i].indexOf(':');
      k = headers[i].substr(0, p);
      v = headers[i].substr(p + 1);
      if(k && v) {
        k = k.replace(/^\s+/, '').replace(/\s+$/, '');
        v = v.replace(/^\s+/, '').replace(/\s+$/, '');
        output[k.toLowerCase()] = v;
      }
    }
    return output;
  }

  /**
   *  Accepts the URL and query string parameters
   *  and returns a new URL.
   *
   *  @param url The original URL.
   *  @param params The query string parameters.
   *
   *  @return The original or updated URL.
   */
  var qs = function(url, params) {
    if(!params || !(typeof(params) == 'object')) return url;
    var u = new String(url);
    var q = [];
    for(var z in params) {
      q.push(encodeURIComponent(z) + '=' + encodeURIComponent(params[z]));
    }
    var qs = q.join('&');
    u += (u.indexOf('?') == -1) ? '?' : '&';
    u += qs;
    return u;
  }

  /**
   *  Type converters.
   */
  var converters = {
    text: {
      mime: 'text/plain',
      encode: function(data){return data;},
      decode: function(data){return data;}
    },
    json: {
      mime: 'application/json',
      encode: function(data) {
        return JSON.stringify(data);
      },
      decode: function(data) {
        return JSON.parse(data);
      }
    }
  }

  /**
   *  Converts response text into a response format.
   *
   *  @param text The response text.
   *  @param type The expected response type identifer.
   */
  var convert = function(text, type) {
    var data = text;
    if(converters[type]) {
      var decoder = converters[type].decode;
      data = decoder(data);
    }
    return data;
  }

  /**
   *  Constant indicating whether CORS is used or
   *  whether the XDomainRequest object is used instead.
   */
  var cors = !('XDomainRequest' in window)
    || ie.browser && ie.version == 10;

  /**
   *  Retrieve the object used to make the request.
   */
  var xhr = function() {
    if(!cors) {
      return new XDomainRequest();
    }else if(window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    return null;
  }

  /**
   *  Injects custom error information into a response object.
   *
   *  When a server responds with a packet if the packet contains
   *  an *error* object and the object contains a status number
   *  then that overrides any pre-determined response status.
   *
   *  If the error object contains a message field then the response
   *  Error instance is overwritten to use the server message.
   *
   *  @param response The response object about to be returned to the caller.
   *  @param options The request options.
   */
  var error = function(response, options) {
    var packet = response.data;
    // override response status code
    if(typeof(packet[options.status]) == 'number') {
      response.status = packet[options.status];
    }
    if(typeof(packet[options.error]) == 'object') {
      var status = '' + response.status;
      if(!/^2/.test(status)) {
        if(packet[options.error].message) {
          response.error = new Error('' + packet[options.error].message);
        }
      }
    }
  }

  /**
   *  JSONP implementation.
   *
   *  @param url The URL to make the request to.
   *  @param options The configuration options.
   */
  var jsonp = function(url, options) {
    this.url = url;
    this.options = options;
  }

  jsonp.counter = -1;

  jsonp.prototype.send = function(message) {
    var self = this;
    var cb = '__jsonp__' + (++jsonp.counter);
    this.url += (this.url.indexOf('?') == -1) ? '?' : '&';
    this.url += encodeURIComponent(this.options.jsonp)
      + '=' + encodeURIComponent(cb);
    var elem = createElement('script',{src: this.url});
    window[cb] = function (packet) {
      if(typeof(self.options.callback) == 'function') {
        var res = {status: 200, xhr: self, headers: null, error: null};
        res.data = packet;
        error(res, self.options);
        self.options.callback(res);
      }
    }

    var head = document.getElementsByTagName('head')[0]
      || document.documentElement;
    var done = false;
    var cleanup = function() {
      window[cb] = null;
      // NOTE: empty try/catch due to a bug in IE8
      // SEE: http://stackoverflow.com/questions/1073414/ \
      // SEE:   deleting-a-window-property-in-ie
      try {
        delete window[cb];
      }catch(e){}
      if(head && elem.parentNode) {
        head.removeChild(elem);
      }
    }

    // load handlers for all browsers
    elem.onload = elem.onreadystatechange = function() {
      if(!done
         && (!this.readyState
           || this.readyState === 'loaded'
           || this.readyState === 'complete')) {
        done = true;
        // handle memory leak in IE
        elem.onload = elem.onreadystatechange = null;
        cleanup();
      }
    };
    // perform the request
    head.insertBefore(elem, head.firstChild);
  }

  /**
   *  Declared for compatibility with XMLHttpRequest.
   */
  jsonp.prototype.abort = function(){};

  /**
   *  Performs an ajax request.
   *
   *  @param options.method The HTTP method.
   *  @param options.url The URL to connect to.
   *  @param options.headers An object containing HTTP headers.
   *  @param options.timeout A timeout for the request in milliseconds.
   *  @param options.delay A delay before invoking send() in milliseconds.
   *  @param options.data Data to send with the request.
   *  @param options.credentials Authentication credentials.
   *  @param options.callback A callback for responses.
   *  @param options.error The name of a property of the response object that 
   *  contains error information, default is `error`.
   *  @param options.status The name of a property of the response object that 
   *  contains a status code, default is `code`.
   *  @param options.mime A MIME type passed to overrideMimeType().
   *  @param options.type The expected data type, one of `json`, `jsonp` 
   *  or `text`.
   *  @param options.async Whether the request is asynchronous.
   *  @param options.params Query string parameters to append to the URL.
   *  @param options.fields Properties to apply to the XMLHttpRequest.
   *  @param options.parameter Send the data as the named query string
   *  parameter.
   *  @param jsonp The name of the callback query string variable for jsonp
   *  requests, default is 'callback'.
   */
  var ajax = function(options, callback) {
    var req, z, jsp = false, data;
    // no options or no json capability (IE7 etc.)
    if(!(typeof(options) == 'object') || !('JSON' in window)) {
      return false;
    }

    var type = options.type || 'text';
    // mutate type for jsonp
    if(type == 'jsonp') {
      jsp = true;
      type = 'json';
      options.jsonp = options.jsonp || ajax.defaults.jsonp;
    }

    // unsupported content type
    if(!(type in converters)) {
      return false;
    }

    // unsupported browser version
    if(!jsp && ((ie.browser && ie.version < 8)
      || (!('XMLHttpRequest' in window) && !('XDomainRequest' in window)))) {
      return false;
    }

    if(typeof(callback) == 'function') {
      options.callback = callback;
    }

    // TODO: copy data so as not to affect the source data
    if(options.data) {
      var encoder = converters[type].encode;
      data = encoder(options.data);
    }

    // setup custom error field
    options.error = options.error || ajax.defaults.error;
    options.status = options.status || ajax.defaults.status;

    // send the data as a query string parameter
    if(data && (jsp || (typeof(options.parameter) == 'string'))) {
      options.params = options.params || {};
      options.params[options.parameter || ajax.defaults.parameter] = data;
    }

    var url = qs(options.url || '', options.params);
    var method = options.method || ajax.defaults.method;
    var headers = options.headers || {};
    var async = (typeof(options.async) == 'boolean') ? options.async
       : ajax.defaults.async;
    options.credentials = options.credentials || {};

    /**
     *  Generic response handler for invoking the
     *  callback functions.
     */
    var response = function(response) {
      if(typeof(options.callback) == 'function') {
        error(response, options);
        options.callback(response);
      }
    }

    // execute as jsonp
    if(jsp) {
      req = new jsonp(url, options);
      req.send(data);
      url = req.url;
    // execute as ajax
    }else{
      req = xhr();
      if(!cors) {
        req.open(method, url);
        req.onload = function() {
          var res = {status: this.status || 200,
            xhr: this, headers: null, error: null};
          res.data = convert(this.responseText, type);
          response(res);
        }
        req.onerror = function() {
          var res = {status: this.status || 500,
            xhr: this, headers: null, error: null};
          res.error = new Error('XDomainRequest error');
          response(res);
        }
        req.ontimeout = req.onprogress = function(){};
      }else{
        // apply custom fields, eg: withCredentials
        if(options.fields) {
          for(z in options.fields) {
            req[z] = options.fields[z];
          }
        }

        req.open(method, url, async,
          options.credentials.username, options.credentials.password);

        if(options.mime && (typeof(req.overrideMimeType) == 'function')) {
          req.overrideMimeType(options.mime);
        }

        // set default headers
        for(z in ajax.defaults.headers) {
          req.setRequestHeader(z, ajax.defaults.headers[z]);
        }

        // apply custom request headers
        for(z in headers) {
          req.setRequestHeader(z, headers[z]);
        }

        req.onreadystatechange = function() {
          if(this.readyState == 4) {
            var status = '' + (this.status || 0);
            var res = {status: this.status, xhr: this, error: null};
            if(!/^2/.test(status)) {
              res.error = new Error('XMLHttpRequest error ' + status);
            }
            res.headers = parse(this.getAllResponseHeaders());
            res.data = convert(this.responseText, type);
            response(res);
          }
        }
      }
      req.timeout = (options.timeout || ajax.defaults.timeout);
      if(!cors) {
        setTimeout(function(){
          req.send(data);
        }, options.delay || ajax.defaults.delay);
      }else{
        req.send(data);
      }
    }

    return {
      xhr: req,
      abort: req.abort,
      cors: cors,
      ie: ie,
      url: url,
      jsonp: jsp
    }
  }

  /**
   *  Expose IE browser information.
   */
  ajax.ie = ie;

  /**
   *  Expose the jsonp implementation.
   */
  ajax.jsonp = jsonp;

  /**
   *  Expose type converters.
   */
  ajax.converters = converters;

  /**
   *  Default options.
   */
  ajax.defaults = {
    method: 'GET',
    timeout: 10000,
    delay: 0,
    async: true,
    parameter: 'packet',
    jsonp: 'callback',
    error: 'error',
    status: 'code',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  if(typeof(module) === 'object' && typeof(module.exports) === 'object') {
    module.exports = ajax;
  }else if(typeof(define) == 'function' && define.amd) {
    define(function(require) {
      return ajax;
    });
  }else if(window) {
    window.ajax = ajax;
  }
})();

},{}],5:[function(require,module,exports){
'use strict';

var Highcharts = require( 'highcharts/highstock' );
var getColorScheme = require( '../utils/get-color-scheme.js' );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );


function BarChart( props ) {
  var colors = getColorScheme( props.color );
  var options = {
    title: {
      text: props.title
    },
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
      buttonPosition: {
        x: 0,
        y: 30
      },
      buttonTheme: {
        r: 5, // border radius
        fill: '#CCE3F5',
        style: {
          height: '35px'
        },
        states: {
          select: {
            fill: '#7FB8E6'
          }
        }
      },
      buttons: [ {
        type: 'year',
        count: 1,
        text: '1y'
      },
      {
        type: 'year',
        count: 3,
        text: '3y'
      },
      {
        type: 'year',
        count: 5,
        text: '5y'
      },
      {
        type: 'all',
        text: 'All'
      }
      ]
    },
    chart: {
      marginTop: 100,
      zoomType: 'none'
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 1,
        groupPadding: 0,
        shadow: false,
        grouping: false
      }
    },
    xAxis: {
      tickInterval: 12,
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          align: 'right',
          rotation: 0,
          style: {
            color: '#919395'
          },
          y: -15
        }
      } ]
    },
    yAxis: {
      opposite: false,
      title: {
        text: 'Year-over-year change (%)',
        style: {
          'color': '#75787b',
          'font-size': '16px'
        }
      }
    },
    navigator: {
      maskFill: 'rgba(0, 0, 0, 0.05)',
      handles: {
        backgroundColor: '#fff',
        borderColor: '#101820'
      },
      series: {
        color: '#addc91',
        lineWidth: 2
      }
    },
    series: [ {
      type: 'column',
      data: props.data.values,
      color: colors.primary,
      name: 'Year-over-year change (%)',
      tooltip: {
        valueDecimals: 2
      },
      zoneAxis: 'x',
      zones: [ {
        value: props.data.projectedDate.timestamp
      }, {
        color: colors.secondary
      } ]
    } ]
  };

  Highcharts.stockChart( props.selector, options,
    function( chart ) {
      chart.renderer.text( 'Select time range', 7, 16 )
        .css( {
          color: '#919395',
          fontSize: '14px'
        } )
        .add();

      chart.renderer.rect( 0, 75, 650, 2 )
        .attr( {
          fill: '#E3E4E5',
          zIndex: 10
        } )
        .add();
    }
  );

}

module.exports = BarChart;

},{"../utils/get-color-scheme.js":11,"highcharts/highstock":2}],6:[function(require,module,exports){
'use strict';

var Highcharts = require( 'highcharts/highstock' );
var getColorScheme = require( '../utils/get-color-scheme.js' );

Highcharts.setOptions( {
  lang: {
    rangeSelectorZoom: '',
    thousandsSep: ','
  }
} );


/**
 * _getFirstNumber - get the first value that is a Number
 *
 * @param  {array} array  An array of Objects with values to check
 * @returns {string}    an actual Number
 */

function _getFirstNumber( array ) {
  var val;
  for ( var x = 0; x < array.length; x++ ) {
    if ( !isNaN( array[x][1] ) ) {
      val = array[x][1];
      return val;
    }
  }
  return false;
}

/**
 * _getYAxisUnits - Get the text of the y-axis title
 *
 * @param  {array} array  An array of values to check
 * @returns {string}    Appropriate y-axis title
 */
function _getYAxisUnits( array ) {
  var value = _getFirstNumber( array );
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return 'billions';
  }
  return 'millions';
}

/**
 * _getTickValue - Convert the data point's unit to M or B.
 *
 * @param  {int} value  Data point's value
 * @returns {int}        Data point's value over million or billion.
 */

function _getTickValue( value ) {
  // If it's 0 or borked data gets passed in, return it.
  if ( !value ) {
    return value;
  }
  if ( value % 1000000000 < value ) {
    return value / 1000000000 + 'B';
  }
  return value / 1000000 + 'M';
}

function LineChart( props ) {
  var colors = getColorScheme( props.color );
  var options = {
    title: {
      text: props.title
    },
    description: props.description,
    credits: false,
    rangeSelector: {
      selected: 'all',
      height: 35,
      inputEnabled: false,
      buttonPosition: {
        x: 0,
        y: 30
      },
      buttonTheme: {
        r: 5, // border radius
        fill: '#CCE3F5',
        style: {
          height: '35px'
        },
        states: {
          select: {
            fill: '#7FB8E6'
          }
        }
      },
      buttons: [ {
        type: 'year',
        count: 1,
        text: '1y'
      },
      {
        type: 'year',
        count: 3,
        text: '3y'
      },
      {
        type: 'year',
        count: 5,
        text: '5y'
      },
      {
        type: 'all',
        text: 'All'
      }
      ]
    },
    legend: {
      align: 'right',
      enabled: true,
      floating: true,
      itemMarginTop: 10,
      itemStyle: {
        'color': '#919395',
        'font-weight': 'normal'
      },
      layout: 'vertical',
      verticalAlign: 'top',
      x: 0,
      y: -15
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    navigator: {
      maskFill: 'rgba(0, 0, 0, 0.05)',
      handles: {
        backgroundColor: '#fff',
        borderColor: '#101820'
      },
      series: {
        color: '#addc91',
        lineWidth: 2
      }
    },
    chart: {
      marginTop: 100,
      zoomType: 'none'
    },
    xAxis: {
      startOnTick: true,
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%b %Y'
      },
      plotLines: [ {
        color: '#75787b',
        width: 1,
        value: props.data.projectedDate.timestamp,
        zIndex: 10,
        label: {
          text: 'Values after ' + props.data.projectedDate.label + ' are projected',
          align: 'right',
          rotation: 0,
          style: {
            color: '#919395'
          },
          y: -15
        }
      } ],
      tickInterval: 60 * 60 * 24 * 365 * 1000 // one year in ms
    },
    yAxis: {
      opposite: false,
      className: 'axis-label',
      title: {
        text: 'Number of originations (in ' + _getYAxisUnits( props.data.adjusted ) + ')',
        style: {
          color: '#919395'
        }
      },
      labels: {
        formatter: function() {
          return _getTickValue( this.value );
        }
      }
    },
    series: [
      {
        name: 'Seasonally adjusted',
        data: props.data.adjusted,
        color: colors.primary,
        legendIndex: 1,
        lineWidth: 5,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        }, {
          dashStyle: 'ShortDot'
        } ]
      },
      {
        name: 'Unadjusted',
        data: props.data.unadjusted,
        color: colors.primary,
        lineWidth: 1,
        legendIndex: 2,
        tooltip: {
          valueDecimals: 0
        },
        zoneAxis: 'x',
        zones: [ {
          value: props.data.projectedDate.timestamp
        }, {
          dashStyle: 'dash'
        } ]
      }
    ]
  };

  Highcharts.stockChart( props.selector, options,
    function( chart ) {
      chart.renderer.text( 'Select time range', 7, 16 )
        .css( {
          color: '#919395',
          fontSize: '14px'
        } )
        .add();

      chart.renderer.rect( 0, 75, 650, 2 )
        .attr( {
          fill: '#E3E4E5',
          zIndex: 10
        } )
        .add();
    }
  );

}

module.exports = LineChart;

},{"../utils/get-color-scheme.js":11,"highcharts/highstock":2}],7:[function(require,module,exports){
'use strict';

var Highcharts = require( 'highcharts/highmaps' );

function _drawLegend( chart ) {

  var legendStyle = {
    color: '#101820',
    fontSize: '15px',
    fontWeight: 'bold',
    fontFamily: "'AvenirNextLTW01-Demi',Arial,sans-serif;"
  };

  var textStyle = {
    color: '#919395',
    fontSize: '15px',
    fontFamily: "'AvenirNextLTW01-Regular',Arial,sans-serif"
  };

  function _boxStyle( color ) {
    return {
      'stroke-width': 1,
      'stroke': '#75787b',
      'fill': color
    };
  }

  chart.renderer.text( 'Year-over-year change (rounded to the nearest whole number)', 10, 25 ).css( legendStyle ).add();

  chart.renderer.rect( 10, 48, 15, 15 ).attr( _boxStyle( '#93cf7c' ) ).add();
  chart.renderer.rect( 10, 71, 15, 15 ).attr( _boxStyle( '#d6e8fa' ) ).add();
  chart.renderer.rect( 10, 94, 15, 15 ).attr( _boxStyle( '#f7f8f9' ) ).add();
  chart.renderer.rect( 10, 117, 15, 15 ).attr( _boxStyle( '#d6e8fa' ) ).add();
  chart.renderer.rect( 10, 140, 15, 15 ).attr( _boxStyle( '#7eb7e8' ) ).add();

  chart.renderer.text( '16% or greater', 32, 61 ).css( textStyle ).add();
  chart.renderer.text( '6% to 15%', 32, 84 ).css( textStyle ).add();
  chart.renderer.text( '-5% to 5%', 32, 107 ).css( textStyle ).add();
  chart.renderer.text( '-15% to -6%', 32, 130 ).css( textStyle ).add();
  chart.renderer.text( '-16% or less', 32, 153 ).css( textStyle ).add();

}

Highcharts.setOptions( {
  lang: {
    thousandsSep: ','
  }
} );

function TileMap( props ) {

  props = props || {};

  var options = {
    title: {
      text: props.title
    },
    chart: {
      marginTop: 150
    },
    description: props.description,
    credits: false,
    legend: {
      enabled: false
    },
    // tooltip: {
    //   borderColor: 'rgb(117, 120, 123)',
    //   formatter: function() {
    //     return this.point.tooltip;
    //   }
    // },
    tooltip: {
      enabled: false
    },
    responsive: {
      rules: [ {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            height: 400
          },
          series: [ {
            type: 'map',
            borderColor: '#75787b',
            states: {
              hover: {
                brightness: 0,
                borderColor: '#101820'
              }
            },
            // borderWidth: 0.2,
            dataLabels: {
              enabled: true,
              color: '#101820',
              formatter: function() {
                return '<div style="text-align:center">' + this.point.name + '<br /><span style="font-weight:normal;">' + this.point.value + '%</span></div>';
              },
              useHTML: true,
              style: {
                fontSize: '10px',
                lineHeight: '1em'
              }
            },
            name: props.title,
            data: props.data
          } ]
        }
      } ]
    },
    series: [ {
      type: 'map',
      borderColor: '#75787b',
      states: {
        hover: {
          brightness: 0,
          borderColor: '#000'
        }
      },
      // borderWidth: 0.2,
      dataLabels: {
        enabled: true,
        color: '#101820',
        formatter: function() {
          return '<div style="text-align:center">' + this.point.name + '<br /><span style="font-weight:normal;">' + this.point.value + '%</span></div>';
        },
        useHTML: true,
        style: {
          fontSize: '14px',
          lineHeight: '1.4em'
        }
      },
      name: props.title,
      data: props.data
    } ]
  };

  props.selector.className += ' cfpb-chart__tile-map';
  Highcharts.mapChart( props.selector, options, _drawLegend );

}

module.exports = TileMap;

},{"highcharts/highmaps":1}],8:[function(require,module,exports){
'use strict';

var charts = {};
charts.bar = require( './BarChart' );
charts.line = require( './LineChart' );
charts.map = require( './TileMap' );

module.exports = charts;

},{"./BarChart":5,"./LineChart":6,"./TileMap":7}],9:[function(require,module,exports){
'use strict';

var ajax = require('xdr');
var documentReady = require( './utils/document-ready')
var createChart = require( './charts' );
var process = require( './utils/process-csv' );

var DATA_SOURCE_BASE = window.location.protocol.indexOf('https') === -1
                     ? "//files.consumerfinance.gov/data/"
                     : "//s3.amazonaws.com/files.consumerfinance.gov/data/";

documentReady( function() {
  var charts = document.getElementsByClassName( 'cfpb-chart' );

  for ( var x = 0; x < charts.length; x++ ) {
    var chart = charts[x];

    loadSource( chart, function( chart, data ) {
      var type = chart.getAttribute( 'data-chart-type' ),
          group = chart.getAttribute( 'data-chart-metadata' ),
          color = chart.getAttribute( 'data-chart-color' );

      // Ensure undefined attributes aren't cast as a string.
      group = group === "undefined" ? undefined : group;

      var properties = {
        type: type,
        selector: chart,
        color: color
      }

      if ( type === 'line' ) {
        properties.data = process.originations( data, group );
        createChart.line( properties );
      }

      if ( type === 'bar' ) {
        properties.data = process.yoy( data, group );
        createChart.bar( properties );
      }

      if ( type === 'tile_map' ) {
        properties.data = process.map( data, group );
        createChart.map( properties );
      }

    } );
  }
} );

// GET requests:

function loadSource( chart, callback ) {
    var url = chart.getAttribute( 'data-chart-source' );
    url = DATA_SOURCE_BASE + url;

    ajax( { url: url }, function( resp ) {
      callback( chart, resp.data );
    } );
}

},{"./charts":8,"./utils/document-ready":10,"./utils/process-csv":12,"xdr":4}],10:[function(require,module,exports){
'use strict';

function ready( fn ) {
  if ( document.readyState !== 'loading' ) {
    fn();
  } else if ( document.addEventListener ) {
    document.addEventListener( 'DOMContentLoaded', fn );
  } else {
    document.attachEvent( 'onreadystatechange', function() {
      if ( document.readyState !== 'loading' ) { fn(); }
    } );
  }
}

module.exports = ready;

},{}],11:[function(require,module,exports){
'use strict';

// This script simply retrieves colors for a color scheme

var colorScheme = {
  blue: {
    primary: '#0072ce',
    secondary: '#4497dc'
  },
  green: {
    primary: '#20aa3f',
    secondary: '#66c368'
  },
  navy: {
    primary: '#254b87',
    secondary: '#5674a3'
  },
  teal: {
    primary: '#257675',
    secondary: '#579695'
  }
};

var getColorScheme = function( color ) {
  return colorScheme[color];
};

module.exports = getColorScheme;

},{}],12:[function(require,module,exports){
'use strict';

//
// This data processing will eventually happen on the server.
// When we finish those scripts we will no longer need this file.
//

var Papa = require( 'papaparse' );
var tileMapUtils = require( './tile-map' );

// Convert the integers in the CSVs into human-readable dates.
function formatDate( index ) {
  var year = Math.floor( index / 12 ) + 2000;
  var month = index % 12;
  month += 1;
  if ( month < 10 ) {
    month = '0' + month;
  }

  // @todo: don't use Date.parse, it's incompatible with older browsers we support such as ie 8
  var theDate = Date.parse( new Date( year + '-' + month + '-01' ) );

  return theDate;
}

function _dateCategory( index ) {
  var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
  var year = Math.floor( index / 12 ) + 2000;
  var month = index % 12;
  month += 1;
  if ( month < 10 ) {
    month = '0' + month;
  }
  var date = Date.UTC( year, month, 1 );
  // var category = months[ date.getMonth() ] + ' ' + date.getFullYear();

  return date;
}

function processNumOriginationsData( csv, group ) {
  var data = {
    unadjusted: [],
    adjusted: []
  };
  csv = Papa.parse( csv ).data;
  csv.shift();
  csv.forEach( function( dataPoint ) {

    if ( _dateCategory( dataPoint[0] ) > new Date( '2009', '01', '01', '00', '00', '00', '00' ) ) {
      var arr = [];
      var series = dataPoint[2];
      arr.push( formatDate( dataPoint[0] ) );
      arr.push( parseFloat( dataPoint[1] ) );

      if ( group ) {
        series = dataPoint[3];
      }

      if ( !group || group === dataPoint[2] ) {
        if ( series === 'Unadjusted' ) {
          data.unadjusted.push( arr );
        } else {
          data.adjusted.push( arr );
        }
      }
    }

  } );
  data.unadjusted = data.unadjusted.sort( function( a, b ) {
    return a[0] - b[0];
  } );
  data.adjusted = data.adjusted.sort( function( a, b ) {
    return a[0] - b[0];
  } );

  data.projectedDate = {};
  data.projectedDate.timestamp = _getProjectedTimestamp( data.adjusted, false );
  data.projectedDate.label = _getProjectedDate( data.projectedDate.timestamp );

  return data;
}

function processYoyData( csv, group ) {
  var data = {
    values: [],
    projectedDate: null
  };
  csv = Papa.parse( csv ).data;

  csv.forEach( function( dataPoint ) {
    if ( dataPoint[2] === group ) {
      var date = _dateCategory( dataPoint[0] );

      if ( date > new Date( '2009', '01', '01', '00', '00', '00', '00' ) ) {
        data.values.push( [ _dateCategory( dataPoint[0] ), Number( dataPoint[1] ) * 100 ] );
      }
    }
  } );

  data.projectedDate = {};
  data.projectedDate.timestamp = _getProjectedTimestamp( data.values, true );
  data.projectedDate.label = _getProjectedDate( data.projectedDate.timestamp );

  return data;
}

/**
 * Returns a UTC timestamp number for the month when each graph's data is projected
 *
 * @param {Array} valuesList - list of values from the data, containing an array with timestamp representing the month and year at index 0, and the value at index 1
 * @param {Boolean} isYoy - is the valuesList year-over-year (Yoy) data? If so, it includes an additional month, so we need to calculate the projected date differently.
 * @returns {String} a timestamp.
 */
function _getProjectedTimestamp( valuesList, isYoy ) {
  var mostRecentMonthOfDataAvailable = valuesList[valuesList.length - 1][0];

  /*
  152.083 days = 5 months, which is six months ago for line chart data. Wee count 5 months back, because the timestamps are the first of each month:
  0 - november 1
  1 month - october 1
  2 - sept 1
  3 - aug 1
  4 - jul 1
  5 - june 1
  For data through November, months AFTER May are projected. June through November should be projected in the UI.
  */
  var projectedThreshold = 60 * 60 * 24 * 152.083 * 1000;

  if ( isYoy === true ) {
    // Year over year data has an extra month compared to line chart data, so we include the last 7 months of the set instead of only 6.
    projectedThreshold = 60 * 60 * 24 * 365 * 1000 / 2;
  }

  return mostRecentMonthOfDataAvailable - projectedThreshold;
}

/**
 * Returns a human-readable string representing the month and year after which data in each graph is projected
 *
 * @param {Number} timestamp - UTC timestamp representing the milliseconds elapsed since the UNIX epoch, for the month when each graph begins displaying projected data
 * @returns {String} projectedDate - text with the Month and Year of the projected data cutoff point, for use in labeling projected date in graphs
 */
function _getProjectedDate( timestamp ) {

  var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Projected month threshhold is one month before the data itself is projected. E.g., data after May 2016 is projected, so graphs show June 2016 and after as projected, not inclusive of the month of May.
  var projectedMonth = months[new Date( timestamp ).getMonth() - 1];
  var projectedYear = new Date( timestamp ).getFullYear();
  var projectedDate = projectedMonth + ' ' + projectedYear;

  return projectedDate;
}

function processMapData( csv ) {
  var data = Papa.parse( csv ).data;
  // Delete the first row (column titles)
  data.shift();
  // Filter out any empty values just in case
  data = data.filter( function( row ) {
    return Boolean( row[0] );
  } );
  data = data.map( function( row, i ) {
    var state = tileMapUtils.statePaths['state' + row[0]],
        value = Math.round( row[1] * 100 ),
        tooltip = state.abbr + ' ' + ( value < 0 ? 'decreased' : 'increased' ) + ' by ' + Math.abs( value ) + '%';
    return {
      name: state.abbr,
      path: state.path,
      value: value,
      tooltip: tooltip,
      color: tileMapUtils.getColor( value )
    };
  } );
  return data;
}

module.exports = {
  formatDate: formatDate,
  originations: processNumOriginationsData,
  yoy: processYoyData,
  map: processMapData
};

},{"./tile-map":13,"papaparse":3}],13:[function(require,module,exports){
'use strict';

function getColor( value ) {
  if ( value < -15 ) {
    return '#7eb7e8';
  }
  if ( value < -5 ) {
    return '#d6e8fa';
  }
  if ( value < 5 ) {
    return '#f7f8f9';
  }
  if ( value < 15 ) {
    return '#d6e8fa';
  }
  return '#93cf7c';
}

var statePaths = {
  state1: {
    abbr: 'AL',
    path: 'M550,-337L633,-337,633,-253,550,-253,550,-337'
  },
  state2: {
    abbr: 'AK',
    path: 'M92,-245L175,-245,175,-162,92,-162,92,-245'
  },
  state4: {
    abbr: 'AZ',
    path: 'M92,-428L175,-428,175,-345,92,-345,92,-428'
  },
  state5: {
    abbr: 'AR',
    path: 'M367,-428L450,-428,450,-345,367,-345,367,-428'
  },
  state6: {
    abbr: 'CA',
    path: 'M0,-520L83,-520,83,-437,0,-437,0,-520'
  },
  state8: {
    abbr: 'CO',
    path: 'M183,-520L267,-520,267,-437,183,-437,183,-520'
  },
  state9: {
    abbr: 'CT',
    path: 'M825,-612L908,-612,908,-528,825,-528,825,-612'
  },
  state10: {
    abbr: 'DE',
    path: 'M825,-520L908,-520,908,-437,825,-437,825,-520'
  },
  state11: {
    abbr: 'DC',
    path: 'M733,-428L817,-428,817,-345,733,-345,733,-428'
  },
  state12: {
    abbr: 'FL',
    path: 'M733,-245L817,-245,817,-162,733,-162,733,-245'
  },
  state13: {
    abbr: 'GA',
    path: 'M642,-337L725,-337,725,-253,642,-253,642,-337'
  },
  state15: {
    abbr: 'HI',
    path: 'M0,-245L83,-245,83,-162,0,-162,0,-245'
  },
  state16: {
    abbr: 'ID',
    path: 'M92,-703L175,-703,175,-620,92,-620,92,-703'
  },
  state17: {
    abbr: 'IL',
    path: 'M458,-703L542,-703,542,-620,458,-620,458,-703'
  },
  state18: {
    abbr: 'IN',
    path: 'M458,-612L542,-612,542,-528,458,-528,458,-612'
  },
  state19: {
    abbr: 'IA',
    path: 'M367,-612L450,-612,450,-528,367,-528,367,-612'
  },
  state20: {
    abbr: 'KS',
    path: 'M275,-428L358,-428,358,-345,275,-345,275,-428'
  },
  state21: {
    abbr: 'KY',
    path: 'M458,-520L542,-520,542,-437,458,-437,458,-520'
  },
  state22: {
    abbr: 'LA',
    path: 'M367,-337L450,-337,450,-253,367,-253,367,-337'
  },
  state23: {
    abbr: 'ME',
    path: 'M917,-887L1000,-887,1000,-803,917,-803,917,-887'
  },
  state24: {
    abbr: 'MD',
    path: 'M733,-520L817,-520,817,-437,733,-437,733,-520'
  },
  state25: {
    abbr: 'MA',
    path: 'M825,-703L908,-703,908,-620,825,-620,825,-703'
  },
  state26: {
    abbr: 'MI',
    path: 'M550,-703L633,-703,633,-620,550,-620,550,-703'
  },
  state27: {
    abbr: 'MN',
    path: 'M367,-703L450,-703,450,-620,367,-620,367,-703'
  },
  state28: {
    abbr: 'MS',
    path: 'M458,-337L542,-337,542,-253,458,-253,458,-337'
  },
  state29: {
    abbr: 'MO',
    path: 'M367,-520L450,-520,450,-437,367,-437,367,-520'
  },
  state30: {
    abbr: 'MT',
    path: 'M183,-703L267,-703,267,-620,183,-620,183,-703'
  },
  state31: {
    abbr: 'NE',
    path: 'M275,-520L358,-520,358,-437,275,-437,275,-520'
  },
  state32: {
    abbr: 'NV',
    path: 'M92,-612L175,-612,175,-528,92,-528,92,-612'
  },
  state33: {
    abbr: 'NH',
    path: 'M917,-795L1000,-795,1000,-712,917,-712,917,-795'
  },
  state34: {
    abbr: 'NJ',
    path: 'M733,-612L817,-612,817,-528,733,-528,733,-612'
  },
  state35: {
    abbr: 'NM',
    path: 'M183,-428L267,-428,267,-345,183,-345,183,-428'
  },
  state36: {
    abbr: 'NY',
    path: 'M733,-703L817,-703,817,-620,733,-620,733,-703'
  },
  state37: {
    abbr: 'NC',
    path: 'M550,-428L633,-428,633,-345,550,-345,550,-428'
  },
  state38: {
    abbr: 'ND',
    path: 'M275,-703L358,-703,358,-620,275,-620,275,-703'
  },
  state39: {
    abbr: 'OH',
    path: 'M550,-612L633,-612,633,-528,550,-528,550,-612'
  },
  state40: {
    abbr: 'OK',
    path: 'M275,-337L358,-337,358,-253,275,-253,275,-337'
  },
  state41: {
    abbr: 'OR',
    path: 'M0,-612L83,-612,83,-528,0,-528,0,-612'
  },
  state42: {
    abbr: 'PA',
    path: 'M642,-612L725,-612,725,-528,642,-528,642,-612'
  },
  state44: {
    abbr: 'RI',
    path: 'M917,-612L1000,-612,1000,-528,917,-528,917,-612'
  },
  state45: {
    abbr: 'SC',
    path: 'M642,-428L725,-428,725,-345,642,-345,642,-428'
  },
  state46: {
    abbr: 'SD',
    path: 'M275,-612L358,-612,358,-528,275,-528,275,-612'
  },
  state47: {
    abbr: 'TN',
    path: 'M458,-428L542,-428,542,-345,458,-345,458,-428'
  },
  state48: {
    abbr: 'TX',
    path: 'M275,-245L358,-245,358,-162,275,-162,275,-245'
  },
  state49: {
    abbr: 'UT',
    path: 'M92,-520L175,-520,175,-437,92,-437,92,-520'
  },
  state50: {
    abbr: 'VT',
    path: 'M825,-795L908,-795,908,-712,825,-712,825,-795'
  },
  state51: {
    abbr: 'VA',
    path: 'M642,-520L725,-520,725,-437,642,-437,642,-520'
  },
  state53: {
    abbr: 'WA',
    path: 'M0,-703L83,-703,83,-620,0,-620,0,-703'
  },
  state54: {
    abbr: 'WV',
    path: 'M550,-520L633,-520,633,-437,550,-437,550,-520'
  },
  state55: {
    abbr: 'WI',
    path: 'M458,-795L542,-795,542,-712,458,-712,458,-795'
  },
  state56: {
    abbr: 'WY',
    path: 'M183,-612L267,-612,267,-528,183,-528,183,-612'
  }
};

module.exports = {
  statePaths: statePaths,
  getColor: getColor
};

},{}]},{},[9]);
