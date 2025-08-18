/**
 * Harold is a kidnapper who wrote a ransom note, but now he is worried it will be traced back to him through his handwriting.
 * He found a magazine and is cutting out letters to match the note.
 * He needs a function to determine if he can create the ransom note using the letters from the magazine.
 *
 * The words in his note are case-sensitive and he must use only whole words available in the magazine.
 * He cannot use substrings or concatenation to create the words he needs.
 *
 * Given the words in the magazine and words in the ransom note, print Yes if he can replicate his ransom note exactly using whole words from the magazine, otherwise print No.
 *
 * Topics: Hash Tables, String Manipulation
 * Recommended Approach: Use a hash table to count the occurrences of each word in the magazine and then check if the ransom note can be constructed from those words.
 * Recommended Time Complexity: O(m + n), where m is the number of words in the magazine and n is the number of words in the ransom note.
 */
var checkMagazine = function (magazine, note) {
  var magazineCount = new Map();
  // Count occurrences of each word in the magazine
  for (var _i = 0, magazine_1 = magazine; _i < magazine_1.length; _i++) {
    var word = magazine_1[_i];
    magazineCount.set(word, (magazineCount.get(word) || 0) + 1);
  }
  // Check if ransom note can be constructed
  for (var _a = 0, note_1 = note; _a < note_1.length; _a++) {
    var word = note_1[_a];
    // Can't be constructed
    if (!magazineCount.has(word) || magazineCount.get(word) <= 0) return false;
    magazineCount.set(word, magazineCount.get(word) - 1);
  }
  return true;
};
console.log(checkMagazine(['attack', 'at', 'dawn'], ['Attack', 'at', 'dawn'])); // false
console.log(
  checkMagazine(
    ['give', 'me', 'one', 'grand', 'today', 'night'],
    ['give', 'one', 'grand', 'today']
  )
); // true
