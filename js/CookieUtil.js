/*
* common get, set, del cookie function
* Author: shuxianghui, created time: 2017-12-30 13:47
*/
var CookieUtil = {

  get: function( name ) {
    var cookieName = encodeURIComponent( name ) + '=',
        cookieStart = document.cookie.indexOf( cookieName ),
        cookieEnd = 0,
        cookieValue = null;

    if ( cookieStart > -1 ) {
      cookieEnd = document.cookie.indexOf( ';', cookieStart )

      if ( cookieEnd == -1 ) {
        cookieEnd = document.cookie.length
      }

      cookieValue = decodeURIComponent( document.cookie.substring( cookieStart + cookieName.length, cookieEnd ) )
    }

    return cookieValue
  },

  set: function( name, value, expires, path, domain, secure ) {
    var cookieText = encodeURIComponent( name ) + '=' + encodeURIComponent( value )

    if ( expires instanceof Date ) {
      cookieText += '; expires=' + expires.toGMTString()
    }

    if ( path ) {
      cookie += '; path=' + path
    }

    if ( domain ) {
      cookie += '; domain=' + domain
    }

    if ( secure ) {
      cookie += '; secure'
    }

    document.cookie = cookieText
  },

  unset: function( name, patch, domain, secure ) {
    this.set( name, '', new Date( 0 ), path, domain, secure )
  }
}