/*
* 原生的XMLHttpRequest, 并提供CORS解决方案
* Author: shuxianghui, CreatedTime: 2018-04-01: 15:50
*/
var XMLHttp = {
  createXHR: function( ) {
    if ( typeof XMLHttpRequest !== "undefined" ) {
      return new XMLHttpRequest( );
    }
    else if ( typeof ActiveXObject !== "undefined" ) {
      if ( typeof arguments.callee.activeXString !== "string" ) {
        var version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
            i, len;

        for ( i = 0, len = version.length; i < len; i++ ) {
          try {
            new ActiveXObject(version[i]);
            arguments.callee.activeXString = version[i];
            break;
          }
          catch( ex ) {
            console.log( ex );
          }
        }
      }

      return new ActiveXObject( arguments.callee.activeXString );
    }
    else {
      console.log( "createXHR(): No XHR object available." );
    }
  },

  get: function( url, callback, async ) {
    XMLHttp.ajax( 'get', url, null ,callback, async );
  },

  post: function( url, data, callback, async ) {
    XMLHttp.ajax( 'post', url, data, callback, async );
  },

  ajax: function( requestMethod, url, data, callback, async ) {
    var xhr = XMLHttp.createXHR( ),
        async = async === false ? false : true,
        data = data || null;

    xhr.onreadystatechange = function() {
      if ( xhr.readyState === 4 ) {
        if ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ) {
          callback( xhr.responseText );
        }
        else {
          console.log('Request was unsuccessful: ' + xhr.status);
        }
      }
    }

    xhr.open( requestMethod, url, async );
    xhr.setRequestHeader( 'Content-Type', 'applicatin/x-ww-form-urlencoded' );
    xhr.send( data );
  },

  isObject: function( obj ) {
    return Object.prototype.toString.call( obj ) === '[object Object]' ? true: false;
  },

  isArray: function( arr ) {
    if ( Array.isArray ) {
      return Array.isArray( arr );
    }
    else {
      return Object.prototype.toString.call( arr ) === '[object Array]' ? true: false;
    }
  }
}