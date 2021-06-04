---
layout: post
title:  "Markdown : 마크다운 정리"
tags: [ Tips ]
featured_image_thumbnail:
featured_image: assets/images/posts/markdown.png
featured: true
hidden: true
---

## Heading
```
# 뒤에서 한번 띄어쓰기를 사용해야 정상적으로 동작합니다.

#H (X)

# H (O)
```

# # H1
## ## H2
### ### H3
#### #### H4
##### ##### H5
###### ###### H6

Jekyll uses a language called **Markdown** to format text.

If you've gotten pretty comfortable with Markdown in Jekyll, then you may enjoy some more advanced tips about the types of things you can do with it!

>“You can only do so many things great, and you should cast aside everything else.”
> <cite>- Tim Cook -</cite>

As with the last post about the editor, you'll want to be actually editing this post as you read it so that you can see all the Markdown code we're using.


## Special formatting

As well as bold and italics, you can also use some other special formatting in Markdown when the need arises, for example:

+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*


## Writing code blocks

There are two types of code elements which can be inserted in Markdown, the first is inline, and the other is block. Inline code is formatted by wrapping any word or words in back-ticks, `like this`. Larger snippets of code can be displayed across multiple lines using triple back ticks:

```
.my-link {
    text-decoration: underline;
}
```

If you want to get really fancy, you can even add syntax highlighting using [Prism.js](http://prismjs.com/).

## Reference lists

**The quick brown [fox][1], jumped over the lazy [dog][2].**

[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"

Another way to insert links in markdown is using reference lists. You might want to use this style of linking to cite reference material in a Wikipedia-style. All of the links are listed at the end of the document, so you can maintain full separation between content and its source or reference.


## Creating footnotes

The quick brown fox[^1] jumped over the lazy dog[^2].

[^1]: Foxes are red
[^2]: Dogs are usually not red

Footnotes are a great way to add additional contextual details when appropriate. Ghost will automatically add footnote content to the very end of your post.


## Full HTML

Perhaps the best part of Markdown is that you're never limited to just Markdown. You can write HTML directly in the Ghost editor and it will just work as HTML usually does. No limits! Here's a standard YouTube embed code as an example:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cniqsc9QfDo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

## options

`jekyll new <PATH>` installs a new Jekyll site at the path specified (relative to current directory). In this case, Jekyll will be installed in a directory called `myblog`. Here are some additional details:

- To install the Jekyll site into the directory you're currently in, run `jekyll new` . If the existing directory isn't empty, you can pass the --force option with jekyll new . --force.
- `jekyll new` automatically initiates `bundle install` to install the dependencies required. (If you don't want Bundler to install the gems, use `jekyll new myblog --skip-bundle`.)
- By default, the Jekyll site installed by `jekyll new` uses a gem-based theme called Minima. With gem-based themes, some of the directories and files are stored in the theme-gem, hidden from your immediate view.
- We recommend setting up Jekyll with a gem-based theme but if you want to start with a blank slate, use `jekyll new myblog --blank`
- To learn about other parameters you can include with `jekyll new`, type `jekyll new --help`.

The most common shortcuts are of course, **bold** text, _italic_ text, and [hyperlinks](https://example.com). These generally make up the bulk of any document. You can type the characters out, but you can also use keyboard shortcuts.

- `CMD/Ctrl + B` for Bold
- `CMD/Ctrl + I` for Italic
- `CMD/Ctrl + K` for a Link
- `CMD/Ctrl + H` for a Heading (Press multiple times for h2/h3/h4/etc)

![Computer](https://casper.ghost.org/v1.0.0/images/computer.jpg#wide)

> A well placed quote guides a reader through a story, helping them to understand the most important points being made

> “Computer science education cannot make anybody an expert programmer any more than studying brushes and pigment can make somebody an expert painter.”
> <cite>- Eric S. Raymond -</cite>

Node.js was originally written by [Ryan Dahl](https://en.wikipedia.org/wiki/Ryan_Dahl) in 2009, about thirteen years after the introduction of the first server-side JavaScript environment, Netscape's LiveWire Pro Web. The initial release supported only Linux and Mac OS X. Its development and maintenance was led by Dahl and later sponsored by Joyent.

1. Crack the eggs over a bowl
2. Whisk them together
3. Make an omelette

or

- Remember to buy milk
- Feed the cat
- Come up with idea for next story