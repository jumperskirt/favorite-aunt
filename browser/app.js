const whiteboard = window.whiteboard;
const socket = io(window.location.origin);

socket.on('connect', function(){
  console.log('success, connection!');

})


whiteboard.on('draw', function(start, end, strokeColor, shouldBroadcast) {
  // console.log(start, end, strokeColor, shouldBroadcast);
  let drawing = {
    start: start,
    end: end,
    strokeColor: strokeColor
  };
  socket.emit('draw', drawing);

  // whiteboard.send(start, end, strokeColor);
})

socket.on('drawing', (payload, send) => whiteboard.draw(payload.start, payload.end, payload.strokeColor));
// socket.on('drawing', function(payload, send) {
//
//   whiteboard.draw(payload.start, payload.end, payload.strokeColor);
//
//
// });
