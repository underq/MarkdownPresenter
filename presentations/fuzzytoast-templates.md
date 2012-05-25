This is a presentation to explain the changes to the FuzzyToast plugin for jQuery to support multiple template engines.

!

FuzzyToast Templates
====================

!

jQuery Templates
================

In the beginning, we supported one template.

Not because it was good, but because it was there.

jQuery Templates (or `tmpl`) was donated by Microsoft, and is *pretty good*.

!

What about other Templates?
================

Templates like **Mustache** and **Handlebars** are really cool, 
but each template engine system has a different *call interface*.
So we chose to support just one.

Until now...

!

Requirements
============

  1. Do not break existing systems.
  2. Try to use the template system available.
  3. Easy support for template systems that we don't know about.

We accomplished all three of these.

!

Using Templates
=====================

Just include the template engine in your HTML. FuzzyToast will pick it up and use it. Supported template engines:

  * [jQuery Templates][1]
  * [Mustache][2]
  * [Handlebars][3]
  * [Underscore's Template System][4]

  [1]: http://api.jquery.com/category/plugins/templates/
  [2]: http://mustache.github.com/
  [3]: http://handlebarsjs.com/
  [4]: http://documentcloud.github.com/underscore/#template

!

Example
=======

Just include the template system *before* including the `jquery.fuzzytoast.js` plugin:

    <script src="js/jquery.js"></script>
    <script src="js/mustache.js"></script>
    <script src="js/jquery.fuzzytoast.js"></script>

Why yes, you probably should put a `type="text/javascript"` attribute with those links.

!

Other Templates
=====================

But what about the snazzy, new *XYZ* template system!?

This is pretty difficult for us, since we kinda need to know how to call it. However, give us a function to do this rendering.

Here are the steps...

!

Step 1.
============================

Create a function that takes a template and the data model to process, and the output from this function should be the HTML to put back into your document:

    function renderXYZ( template, data ) {
       // Call XYZ system to render the 
       // template and data
       
       return htmlResults;
    }

!

Step 2.
============================

Now, set a few FuzzyToast variables to tell us about your new render function:

    $.fuzzytoast.template.engine = "XYZ";
    $.fuzzytoast.template.type   = "functional";
    $.fuzzytoast.template.render = renderXYZ;

That's all there is to it.

!

Handlebar Helpers?
===============================

No problem. 

Handlebar's helpers are essentially global variables, so just set up the helpers, and if your templates use them, they will be available.
