/*! Problem 1 solution (JavaScript)
 *  Justin Chang
 *  15 May 2018
 * */

$(document).ready(function() {
  $("#submit-string-btn").click(function() {
    var str = $("#submit-string").val();

    // Search string for valid substrings if string is longer than 1 character
    var substrs = (str.length > 1 ? findSubstrings(str) : []);

    // Update result with valid substrings if available
    var result = (substrs.length != 0 ? substrs.join(", ") : "No substrings found.");

    // Update text on webpage
    $("#substring-output").text(result);
  });
});

/**
 * Finds substrings with exactly 1 character repeated.
 *
 * Returns empty array if no valid substrings found.
 *
 * @param {String} str - String to be searched.
 */
function findSubstrings(str) {
  var substrs = new Array();
  var cur_str = "";
  for(i = 0; i < str.length - 1; i++) {
    for(j = i + 2; j < str.length + 1; j++) {
      // Test all substrings of size > 1
      cur_str = str.substring(i, j);
      if(hasRepeat(cur_str.toLowerCase())) substrs.push(cur_str);
    }
  }
  return substrs;
}

/**
 * Returns true if substring is valid.
 *
 * @param {String} str - String to be searched.
 */
function hasRepeat(str) {
  // RegEx solution (only works for a-zA-Z)
  // /([a-zA-Z])(?:.*)(\1)+/g

  // Build associative array of character counts
  var counts = {};
  for(x = 0, length = str.length; x < length; x++) {
    var l = str.charAt(x);
    // Check if character is repeated more than once
    if(counts[l] > 1) return false;
    counts[l] = (isNaN(counts[l]) ? 1 : counts[l] + 1);
  }

  // Check if more than one repeat exists
  var hasRepeat = false;
  for(var key in counts) {
    if(counts[key] > 1) {
      if(!hasRepeat) hasRepeat = true;
      else return false;
    }
  }

  return hasRepeat;
}
