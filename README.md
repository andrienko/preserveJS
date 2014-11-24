PreserveJS
---
Hello. This one is a tiny library that helps you to save entered values of HTML elements.
It is actually pretty lame.

Usage
===
All you have to do is add the script in your html file:

    <script type="text/javascript" src="preserve.js"></script>
    
And then add the "preserve" property to any html element:

    <input type="checkbox" id="checkit" preserve/>
    
This will save element value every time it changes, in a localstorage.

Preservation ID
===

Values are saved in an identifier which, if no value for "preserve" attribute is set, is generated, url- and
elementID-dependant. You can alter this by specifying the value for preserve attribute

    <input type="checkbox" id="checkit" preserve="check_it"/>

Preservation ID generation
===
By default the values are saved by a key formed from current url + hash symbol + id or name of element. (Name is used
if id is empty). Say, for this:

    <input type="checkbox" id="checkit" preserve/>

The value, on http://localhost/preserve will be saved in a key called `localhost/preserve#checkit`. This means that, say,
on http://localhost/preserve?mode=gallery page it will not be preserved, even if input has same id.

Future Plans
===

 - Support for select multiple

Warning
===
LocalStorage is limited to 5MB. So maybe consider not using this for large input fields etc.

