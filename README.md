# Hexbot
Hacker Experience BOT

The HExBot is being rewritten over the jSpaghetti (https://github.com/gresendesa/jSpaghetti) framework that makes everything very easier.

This framework provides a modular, sequential and declarative way to build scripts.

## Basic structure
I've structured the directory tree this way:

* All HMLT content and funcions to handle it must be placed into views.js
* Every global function must be placed into /libraries/functions directory
* Every global class must be placed into /libraries/classes
* Controllers to handle user input and bot state must be placed into /controllers
* Each jSpaghetti module must be placed into its respective folder into /modules
* All global constants must be placed into constants.js
