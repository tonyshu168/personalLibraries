/*
* Author: shuxianghui, created time: 2018-1-1 10:53
*/
// 需要先引入EventUtil.js文件
var DragDrop = function() {
  var dragging = null,
      diffX = 0,
      diffY = 0;

  function handlerEvent( event ) {
    // Get Event and Target
    event = EventUtil.getEvent( event )

    var target = EventUtil.getTarget( event )

    // Define Event Type
    switch ( event.type ) {
      case 'mousedown':
        if ( target.className.indexOf( 'draggable' ) >= 0 ) {
          dragging = target
          diffX = event.clientX - target.offsetLeft
          diffY = event.clientY - target.offsetTop
        }
        break
      case 'mousemove':
        if ( dragging !== null ) {
          // Specify location
          if ( event.clientX >= diffX ) {
            dragging.style.left = ( event.clientX - diffX ) + 'px'
          }

          if ( event.clientY >= diffY ) {
            dragging.style.top = ( event.clientY - diffY ) + 'px'
          }
          //dragging.style.left = ( event.clientX - diffX ) + 'px'
          //dragging.style.top = ( event.clientY - diffY ) + 'px'
        }
        break
      case 'mouseup':
        dragging = null
        break
    }
  }

  // public interface
  return {
    enable: function() {
      EventUtil.addHandler( document, 'mousedown', handlerEvent )
      EventUtil.addHandler( document, 'mousemove', handlerEvent )
      EventUtil.addHandler( document, 'mouseup', handlerEvent )
    },
    disable: function() {
      EventUtil.removeHandler( document, 'mousedown', handlerEvent )
      EventUtil.removeHandler( document, 'mousemove', handlerEvent )
      EventUtil.removeHandler( document, 'mouseup', handlerEvent )
    }
  }
}()