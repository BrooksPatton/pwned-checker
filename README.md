# pwned-checker

A command line tool to check if an email address has been pwned. Uses the <https://haveibeenpwned.com/> api.

# Installing

**Through NPM**

```
npm install -g pwned-checker
```

**Running**

Use `pwned-checker -e <email address>`

The address will be saved along with the last time that it ran in a configuration file at **~/.pwned-checker/config.json**. This will make it so you will only see the report for the pwned accounts once per email address.
