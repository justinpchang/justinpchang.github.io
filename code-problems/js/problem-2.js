/*! Problem 2 solution (JavaScript)
 *  Justin Chang
 *  15 May 2018
 * */
var msg,key;
$(document).ready(function() {
  var res = "";
  msg = "";
  var count = 0;
  keys = {};
  var alphabet_decoded = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,;:!?\'";

  // Create new WebSocket
  var socket = new WebSocket("ws://206.189.172.118");

  // Create listener to grab responses
  socket.addEventListener('message', function (event) {
    res = event.data;
    // Get first message then subsequent 26 letter messages
    if(count === 0) {
      // Get first encoded message from the server
      msg = res.split(" ");
      // Send alphabet to be encoded
      socket.send(alphabet_decoded);
      count++;
    } else if(count === 1) {
      // Get encoded alphabet
      var alphabet_encoded = res.split(" ");
      // Decode message using received alphabet
      var i = alphabet_decoded.length;
      while(i--) {
        msg.forEach(function(letter, idx) { if(letter == alphabet_encoded[i]) msg[idx] = alphabet_decoded[i]; });
      }
      msg = msg.join("");
    };
  });
});
