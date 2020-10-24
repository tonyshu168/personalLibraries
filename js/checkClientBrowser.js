/*
*Check clinet browser
*created by shuxianghui, created time 2017-11-04
*/
var client = function() {

  var engine = {
    //appear engine
    ie: 0,
    edge: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,

    //specific version
    ver: null
  }

  var browser = {
    //browser
    ie: 0,
    edge: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,

    //specific version
    ver: null
  }

  var system = {
    win: false,
    mac: false,
    x11: false,

    //mobile device
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winPhone: false,

    //Game system
    wii: false,
    ps: false
  }

  //check appear engine, browser
  var ua = navigator.userAgent

  if( window.opera ) {
    engine.ver = browser.ver = window.opera.version()     
    //"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko"
    engine.opera = browser.opera = parseFloat(engine.ver)
  }
  else if( (/AppleWebKit\/ (\s+)/.test(ua) || /AppleWebKit\/(\d+.\d+)/.test(ua)) && !/Edge/.test(ua) ) {
    engine.ver = RegExp["$1"]
    engine.webkit = parseFloat(engine.ver)
 
    //is Chrome or Safari
    if( /Chrome\/(\s+)/.test(ua) || /Chrome\/(\d+.\d+.\d+.\d+)/.test(ua) ) {
      browser.ver = RegExp["$1"]
      browser.chrome = parseFloat(browser.ver)
    }
    else if( /Version\/(\s+)/.test(ua) ) {
      browser.ver = RegExp["$1"]
      browser.safari = parseFloat(browser.ver)
    }
    else {
      //Approximate the actual version number
      var safariVersion = 1;
      if(engine.webkit < 100) {
        safariVersion = 1
      }
      else if(engine.webkit < 312) {
        safariVersion = 1.2
      }
      else if(engine.webkit < 412) {
        safariVersion = 1.3
      }
      else {
        safariVersion = 2
      }

      browser.safari = browser.ver = safariVersion
    }
  }
  else if( /KHTML\/(\s+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua) ) {
    engine.ver = browser.ver = RegExp["$1"]
    engine.khtml = browser.konq = parseFloat(engine.ver)
  }
  else if( /rv:([^\)]+)\) Gecko\/\d{8}/.test(ua) ) {
    engine.ver = RegExp["$1"]
    engine.gecko = parseFloat(engine.ver)

    //Determine is Firefox
    if( /Firefox\/(\s+)/.test(ua) ) {
      browser.ver = RegExp["$1"]
      engine.ie = browser.ie = parseFloat(engine.ver)
    }
  }
  else if( /MSIE ([^;]+)/.test(ua) || /Trident\/(\d+.\d+)/.test(ua) ) {
    var Reg01 = RegExp.$1
    engine.ver = browser.ver = ua.match(/rv:\d+.\d+/)[0].toString().match(/\d+.\d/)[0] || Reg01
    engine.ie = browser.ie = parseFloat(engine.ver)

    Reg01 = null
  }
  else if( /Edge\/(\d+.\d+)/.test(ua) ) {
    engine.ver = browser.ver = RegExp["$1"]
    engine.edge = browser.edge = parseFloat(engine.ver)
  }

  //check browser
  browser.ie = engine.ie
  browser.edge = engine.edge
  browser.opera = engine.opera

  //check platform
  var p = navigator.platform
  system.win = p.indexOf("Win") == 0
  system.mac = p.indexOf("Mac") == 0
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0)

  //check windows system
  if(system.win) {
    if( /Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua) ) {
      if(RegExp["$1"] == "NT") {
        switch(RegExp["$2"]) {
          case "5.0":
            system.win = "2000"
            break
          case "5.1":
            system.win = "xp"
            break
          case "6.0":
            system.win = "Vista"
            break
          case "6.1":
            system.win = "7"
            break
          case "8.0":
            system.win = '8'
            break
          case "10.0":
            system.win = "10"
            break  
          default:
            system.win = "NT"  
        }
      }
      else if( RegExp["$1"] == "9x" ) {
        system.win = "ME"
      }
      else {
        system.win = RegExp["$1"]
      }
    }
  }

  //mobile device
  system.iphone = ua.indexOf("iPhone") > -1
  system.ipod = ua.indexOf("iPod") > -1
  system.ipad = ua.indexOf("iPad") > -1
  system.nokiaN = ua.indexOf("NokiaN") > -1

  //winPhone
  if(system.win == "CE") {
    system.winPhone = system.win
  }
  else if(system.win == "Ph") {
    if( /Window.Phone OS (\d+.\d+)/.test(ua) ) {
      system.win = "Phone"
      system.winMobile = parseFloat(RegExp["$1"])
    }
  }

  //check iOS version
  if( system.mac && ua.indexOf("Mobile") > -1 ) {
    if( /CPU (?:iPhone ) ?OS (\d+_\d+)/.test(ua) ) {
      stytem.ios = parseFloat( RegExp["$1"].replace("_", ".") )
    }
    else {
      system.ios = 2             //不能真正检测出来，只能猜测
    }
  }

  //check android version
  if( /Android (\d+\.\d+)/.test(ua) ) {
    system.android = parseFloat(RegExp.$1)
  }

  //Game system
  system.wii = ua.indexOf("Wii") > -1
  system.ps = /playstation/i.test(ua)

  //check appear engine, paltform and device
  return {
    engine: engine,
    browser: browser,
    system: system
  }

} ()