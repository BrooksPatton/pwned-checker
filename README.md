# pwned-checker

A command line tool to check if an email address has been pwned. Uses the https://haveibeenpwned.com/ api

# the plan

This will be a terminal based application where you give your email address and it will determine if you have been pwned with that address.

* Get the email address from the user
* send http request to api
* parse through response
* generate a report
* print out report

```
Pwned report for test@example.com
---------------------------------
Host: otherhost.com
BreachDate: March 15, 2016
password compromised: false
report: http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html

Host: 000webhost.com
BreachDate: March 1, 2015
password compromised: true
report: http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html
```
