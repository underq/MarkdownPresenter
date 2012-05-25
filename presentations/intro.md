Easy Presentations
==================

Write your software in [Markdown][] syntax,
and it automatically displays as a *presentation*!

  [Markdown]: http://daringfireball.net/projects/markdown/

!

Features
========

  * Enter text in your favorite editor
  * Online without a special server
  * Code highlighting
  * Images

**Remember:** Presentations should be simple!

!

Un-Features
===========

  * No animations
  * Text is always the same size
  * No image placement
  * No slide background images

Think about listing talking points.  
Anything more complex, use a real presentation tool.

!

Code Highlighting
=================

Code is automatically recognized and highlighted:

    // Create a jQuery button:
    $("#button").button().click(myAction);
    
    function myAction(event) {
         alert("What it is!");
    }

!

How to Do It
============

  * Create a `blah.md`
  * Store it in `presentations`
  * Use Markdown format
  * Each slide separated by `!`
  * URL: `.../presenter.html?blah`

**Note:** The final `.md` is optional.

!

Example
=======

Each slide is separated by a `!` character:

    This is a slide
    Blah blah blah

    !

    This is another slide
    Yada yada yada

!

Sample Slide
============

Each slide uses Markdown format:

    Slide Title
    ===========

    Some introductory paragraph, 
    followed by bullets:

      * Item 1
      * Item 2
      * Item 3