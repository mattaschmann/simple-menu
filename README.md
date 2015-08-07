# simple-menu
A "simple as it get's" terminal based menu for numeric selection.
## Installation
```shell
npm install simple-menu
```
## Example
```javascript
var menu = require('simple-menu');

menu.reset();

menu.addText('Main Menu');
menu.addBreak('-', 60);

menu.addOption('Print \'Hello World\'', function() {
  console.log('Hello World');
});

menu.addBreak('-', 60);
menu.addQuit();

menu.init('What would you like to do?');
```
Displays
```
Main Menu
------------------------------------------------------------
1: Print 'Hello World'
------------------------------------------------------------
2: Quit

What would you like to do?
```
## Methods
### addOption(label, callback)
Add a selectable option to the menu
- _label_ - The label to show for this selectable item
- _callback_ - The function to execute when this item has been selected

```javascript
menu.addOption('Label', callback);
```
Displays
```shell
1: Label
```

### addText(text)
Add a line of text to the menu
- _text_ - The text to show in the menu

```javascript
menu.addText('Text');
```
Displays
```shell
Text
```

### addBreak(character, count)
Add a line break to the menu
- _character_ - The character that will make up the line break
- _count_ - How many times to repeat the character

```javascript
menu.addBreak('-', 60);
```
Displays
```shell
------------------------------------------------------------
```

### addQuit()
Simple utility function to add a quit option that will execute a ```process.exit() ```
```javascript
menu.addQuit();
```
Displays
```shell
1: Quit
```
