# pwned-checker

A command line tool to check if an email address has been pwned. Uses the <https://haveibeenpwned.com/> api

# the plan

This will be a terminal based application where you give your email address and it will determine if you have been pwned with that address.

*   [x] Get the email address from the user
*   [x] send http request to api
*   [x] parse through response
    *   [x] Host
    *   [x] BreachDate
    *   [x] password compromised
    *   [x] password hint compromised
    *   [x] report
*   [x] generate a report
*   [x] print out report
*   [ ] tests
*   [ ] if no email address provided, use json object as persistent storage
*   [ ] handle multiple email addresses
*   [ ] convert npm package so that it can be installed globally
*   [ ] deploy to npm
*   [ ] update readme files
*   [ ] test coverage

## What the report will look like

```
Pwned report for test@example.com
---------------------------------
Host: otherhost.com
BreachDate: March 15, 2016
password compromised: false
Password hints compromised: true
report: In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and (http://stricture-group.com/files/adobe-top100.txt) many were quickly resolved back to plain text. The unencrypted hints also (http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html) disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced.

Host: 000webhost.com
BreachDate: March 1, 2015
password compromised: true
Password hints compromised: true
report: In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and (http://stricture-group.com/files/adobe-top100.txt) many were quickly resolved back to plain text. The unencrypted hints also (http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html) disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced.
```
