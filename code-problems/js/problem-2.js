/*! Problem 2 solution (JavaScript)
 *  Justin Chang
 *  15 May 2018
 * */

// Keeps track of current table row to add
var tr_count = 2;

$(document).ready(function() {
  $("#generate-msg-btn").click(function() {
    getMessage(createTableRow);
  });
  $("#clear-all-btn").click(clear_log);
});

/**
 * Creates new socket and returns encoded and decoded message.
 *
 * @param {function} callback - Called with encoded and decoded message
 */
function getMessage(callback) {
  var res = "";
  var msg = "";
  var msg_encoded = "";
  var count = 0;
  var keys = {};
  var alphabet_decoded = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,;:!?\'";

  // Create new WebSocket
  var socket = new WebSocket("ws://206.189.172.118");
  // Create listener to grab responses
  socket.addEventListener('message', function (event) {
    res = event.data;
    // Get first message then key
    if(count === 0) {
      // Get first encoded message from the server
      msg_encoded = res;
      msg = msg_encoded.split(" ");
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
      // Close socket connection
      socket.onclose = function() {};
      socket.close();
      // Return encoded and decoded message
      if(callback) callback(msg_encoded, msg);
    };
  });
}

/**
 * Adds table row with date and time.
 *
 * @param {String} msg_encoded - Encoded message received from server
 * @param {String} msg_decoded - Decoded message from keys
 */
function createTableRow(msg_encoded, msg_decoded) {
  var date = new Date();
  $("#message-log tr:last").after('<tr><th scope="row">' + tr_count + '</th><td>'
    + date.toLocaleDateString() + '<br />' + date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: "numeric",
      minute: "numeric"}) + '</td><td>' + msg_encoded + '</td><td>' + msg_decoded
    + '</td></tr>');
  tr_count++;
}

/**
 * Clear table of messages
 */
function clear_log() {
  tr_count = 2;
  $("#log-body").html("<tr><th scope=\"row\">1</th><td>05/14/18<br />09:31</td><td>29 14 41 0 34 22 7 68 11 22 35 4 7 56 21 30 4 22 64 34 0 30 22 14 47 4 68 15 22 30 12 64 45 4 22 35 4 7 56 21 30 4 22 64 34 22 58 56 5 5 4 41 4 60 39</td><td>Don't cry because it's over, smile because it happened.</td></tr>");
}
