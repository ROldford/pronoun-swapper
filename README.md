# pronoun-swapper package

[![Build Status](https://travis-ci.org/ROldford/pronoun-swapper.svg?branch=master)](https://travis-ci.org/ROldford/pronoun-swapper)

**Convert all pronouns in selected text to female or male form**

## Usage

To use, just select some text, then activate the femaleify or maleify commands.
*Commands are accessible from command pallete and packages menu*

## Features

Currently swaps these pronoun pairs easily:
* She/He
* he/she
* himself/herself
* Her/His

### The problem with "her", "him" and "his"

The pairs her/him and her/his work fine when femaleify-ing, but maleifying is too context sensitive. (Is it the object of a word, or is it a possessive pronoun?)
Right now, it replaces "*her*" with "*him-his*". You'll have to fix it afterwards manually.
If you know a way to do this, try helping out on the GitHub repo!
