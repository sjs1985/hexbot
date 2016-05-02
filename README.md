# Hexbot
Hacker Experience BOT

The HExBot is being rewritten over the jSpaghetti (https://github.com/gresendesa/jSpaghetti) framework that makes everything very easier.

This framework provides a modular, sequential and declarative way to build scripts.

## Basic structure
I've set the directory tree this way:

* The jSpaghetti framework must be placed into /libraries/jSpaghetti 
* Each jSpaghetti module must be placed into its respective folder into /modules
* Every global function must be placed into /libraries/functions directory
* Every global class must be placed into /libraries/classes
* All global constants must be placed into constants.js
* All HMLT content and funcions to handle it must be placed into views.js file
* Controllers to handle user input and bot state must be placed into /controllers
* Connect the respective button to the action (sequence) in /controllers/buttonToAction.js file
* Follow the manifest.json structure
