email-link.js - A tiny utility to hide e-mail addresses from spammers
=====================================================================

What is it
----------

This is just a tiny utility library to hide plain-text e-mail addresses
from your website.

Installation
------------

Use your favorite JavaScript package manager to download a copy into your
client project. You are using a package manager, are you? I mean, come on,
this is 2018 (or later) and everybody seems to love package managers. So
here is the command to install the package with npm:

`$ npm add -D email-link.js`

Usage
-----

This library has been written with package managers and the ES6 module
system in mind. So use your favorite package manager for installation,
just like this:

```javascript
import emailLinkJs from "email-link.js";
window.addEventListener("load", () => emailLinkJs.enableEmailLinks());
```

In order for the library to find the e-mail links, they must have a
`data-email-address` attribute. If the attribute is empty, the link text
must contain the e-mail address with the @ sign replaced by a single space.
Otherwise the e-mail address must be given as the attribute value:

```html
<a data-email-address>alice example.com</a>
<a data-email-address="bob example.com">Send a message to Bob</a>
```

Optional parameters
-------------------

Optionally the function enableEmailLinks takes two parameters. But they are only
needed if you want to override which links get processed and how the data attribute
with the e-mail address is called:

 * {String} selector: CSS selector string to select all <a> elements
   which link to an e-mail address. Default: "a[data-email-address]"
 * {String} dataAttributeName: Name of the data attribute, which contains
   the e-mail address if the link text doesn't. Default: "email-address"

__Example for another selector:__

```javascript
enableEmailLinks("a.hasEmail")
```

finds all `<a class="hasEmail">`

__Example for another selector and data attribute:__

```javascript
enableEmailLinks("#footer a.email", "mailto")
```

expects all links to be inside
an element with the ID `footer` and to be of the following form:

```html
<a class="email" data-mailto="chris example.com">Chris Doe</a>
```

Copyright
---------

email-link.js: https://www.github.com/DennisSchulmeister/email-link.js <br/>
© 2018  Dennis Schulmeister-Zimolong <dennis@pingu-mail.de>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
