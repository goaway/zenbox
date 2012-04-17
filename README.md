# zenbox

Zenbox is a beautiful and simple lightbox, styled and animated via pure css, making it extremely configurable and flexible. It was inspired in part by fancybox and Twitter's bootstrap modal, but set out to achieve more than either, all in a single ultra-lightweight package:

## Features

- Pure CSS presentation: all zenbox presentational aspects are handled via pure css, and set up to be easy to override
- Lightweight: zenbox is half the size of Twitter's bootstrap modal and less than a tenth(!) the size of fancybox
- Beautiful: zenbox comes with several complete css themes, including ones that emulate other popular lightbox packages
- Optimized: the included styles target the latest browsers, but are designed to degrade gracefully for older versions
- Simple: built with the philosophy that less is more, zenbox aims to give you exactly what you need and nothing that you don't
- For developers and everyone else too: zenbox is easy enough for anyone to use, but completely configurable for your next-gen fancy web apps
- Free: licensed under the Apache license, use it for whatever and enjoy

## Quickstart

- Put zenbox.js somewhere it will get loaded.
- Put zenbox.css somewhere it will get loaded.
- zenbox currently requires you to be running jQuery on your site. This may change in the future.

## Basic Usage

### Displaying content
Say you have a sneaky element on your page you've been hiding that you're ready to display in a lightbox:
`<div id="awesome-content">`

Do this:
`$("#awesome-content").zenbox("show");`

Or this:
`$.zenbox.show("#awesome-content");`

Or even this:
`$.zenbox.show(document.getElementById("awesome-content"));`

### Closing content and modal behavior
Need to close it programmatically?
`$.zenbox.close();`

Need to keep the user from closing it?
`$.zenbox.show("#awesome-content", { modal: true });`

Or if the lightbox is already being displayed:
`$.zenbox.modal(true);`

### Styling
Want to set some custom styles?
`$.zenbox.show("#awesome-content", { style: 'my-custom-class' });`

Your class will be added to the classes on the zenbox parent element: `<div id="zenbox-elements" class="my-custom-class visible">`

Want to combine your styles with one of the themes already included with zenbox? Use both!
`$.zenbox.show("#awesome-content", { style: 'fancy my-custom-class' });`

How about if you know you always want your custom style:
`$.zenbox.defaults.style = "my-custom-class";`

## Contributing
Please report bugs or better yet, [fork](http://help.github.com/fork-a-repo/), fix and [submit a pull request](http://help.github.com/send-pull-requests/).

Thanks, and enjoy!
