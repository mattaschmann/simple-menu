/*
 * Created by Matt Aschmann on Aug 6, 2015
 *
 * Simple console based menu for numerical based selection.
 */

var readlineSync = require('readline-sync');

var simpleMenu = module.exports;

var menuArray = [];
var menuIndex = 1;
var menuMap = {};

/**
 * Add a selectable option to the menu.  This will be given a number, starting at 1, in the order it is added.
 *
 * @param  {String}   label    The label for the option.
 * @param  {Function} callback The function to call when this option is selected.
 */
simpleMenu.addOption = function(label, callback) {
  menuMap[menuIndex] = menuArray.length;
  menuArray.push({type: 'option', label: label, callback: callback, index: menuIndex});
  menuIndex++;
};

/**
 * Simple utility function to add a 'Quit' option to the menu.
 */
simpleMenu.addQuit = function() {
  simpleMenu.addOption('Quit', function() {
		process.exit();
	});
};

/**
 * Add a line break to the menu.
 *
 * @param  {String} character The character to use for the line break.
 * @param  {Number} charCount How many times to repeat the character.
 */
simpleMenu.addBreak = function(character, charCount) {
  menuArray.push({type: 'break', character: character, charCount: charCount});
};

/**
 * Add text to the menu.
 *
 * @param  {String} text The text to add to the menu.
 */
simpleMenu.addText = function(text) {
  menuArray.push({type: 'text', text: text});
};

/**
 * Reset the menu.
 */
simpleMenu.reset = function() {
  menuArray = [];
  menuIndex = 1;
  menuMap = {};
};

/**
 * Initialize the menu, printing it out to the console and wating for user input.
 *
 * @param  {String} prompt    The text to prompt for the user.
 * @param  {String} [errMsg]  Shows the user an error message if defined.
 */
simpleMenu.init = function(prompt, errMsg) {
  prompt = prompt || 'Choose an option:';

  _cls();

  // print the array
  _printArray();

  if (errMsg) {
    console.error('\n' + errMsg + '\n');
  }

  // wait for, then handle, user input
  var selection = readlineSync.question('\n' + prompt + ' ');

  if (typeof menuArray[menuMap[selection]] === 'undefined') {
    simpleMenu.init(prompt, 'Invalid selection, try again!');
  } else {
    menuArray[menuMap[selection]].callback();
  }
};

/**
 * Utility function to print out the array.
 */
function _printArray () {
  for (var i = 0; i < menuArray.length; i++) {
    _printItem(menuArray[i]);
  }
}

/**
 * Utility function to print out an item in the array.
 *
 * @param  {Object} item An item in the array.
 */
function _printItem (item) {
  switch(item.type) {
    case 'option':
      console.log(item.index + ': ' + item.label);
      break;
    case 'break':
      for (var breakString = ''; breakString.length < item.charCount;) {
        breakString += item.character;
      }

      console.log(breakString);
      break;
    case 'text':
      console.log(item.text);
      break;
    default:
      console.error('Invalid item type: ' + item.type);
      process.exit();
  }
}

/**
 * Utility function to clear the console.
 */
function _cls () {
  // clear the console
  console.log('\u001b[2J\u001b[0;0H');
}
