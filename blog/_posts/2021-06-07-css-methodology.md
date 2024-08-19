---
layout: post
title:  "CSS 방법론<br/>(BEM + OOCSS + SMACSS 장점 통합)"
tags: [ CSS ]
featured_image_thumbnail:
featured_image: assets/images/posts/css.png
featured: true
hidden: true
---

## 마크다운이란?
**쉽게 읽고 쓰기** 위해 **2004**년 **존그루버**에 의해 만들어진 **텍스트 기반**의 **마크업 언어**로 별도 도구나 환경 없이 **텍스트로 저장**되어 **용량이 작고 작성이 간편**합니다.  
**블로그 포스트** 작성이나 **깃헙 저장소**에서 자주 이용됩니다.

## 줄바꿈(Line Break)
```markdown
Lorem Ipsum is simply  dummy<br> text  of the printing.  
Lorem Ipsum has been the industry's standard
```
**문장끝**에 **띄어쓰기 2개**를 **연속 사용**하면 **줄바꿈** 처리가 됩니다.  
**문장중**에는 줄바꿈 처리가 **되지 않습**니다.  
**&lt;br>태그**를 직접 사용하면 **줄바꿈** 처리가 됩니다.

Lorem Ipsum is simply  dummy<br> text  of the printing.  
Lorem Ipsum has been the industry's standard

## 헤더(Headers)
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```
**1~6** **까지**만 **지원**하며  
**"#"** 뒤에서 **띄어쓰기**가 **꼭** 들어가야합니다.  

# H1
## H2
### H3
#### H4
##### H5
###### H6

## 강조(Emphasis)
```markdown
*Italics* or _Italics_  
**Bord** or __Bord__
~~Strikethrough~~
```
**이텔릭체**는 **별표** 또는 **언더바** **하나**,  
**볼드**는 **별표** 또는 **언더바** **두개**로 감싸면 적용되며  
**취소선**은 **물결** **두개**로 감싸면 적용됩니다.

*Italics* or _Italics_  
**Bord** or __Bord__  
~~Strikethrough~~  

## 목록(List)
```markdown
1. 순서 있는 목록
    3. 순서 있는 하위 목록
    * 순서 없는 대하위 목록
        6. 순서 있는 대하위 목록

* 순서 없는 목록
    - 순서 없는 하위 목록
        + 순서 없는 대하위 목록
        9. 순서 있는 대하위 목록
```
**순서 있는** 목록은 `숫자. ` 형식으로 작성하며, **1부터** 시작하지 않으면 **1로 초기화**될 수 있습니다.  
**순서 없는**** 목록은 `* ` or `- ` or `+ ` 중에 어느것을 사용해도 **동일**합니다.  
**하위 목록**은 앞에 **띄어쓰기 4개** or **탭**을 넣으면 적용되며 **3뎁스**까지 가능합니다.  
**순서있는 목록 속**에서 **순서없는 목록** 사용 **혹은** 그 **반대**의 경우도 문제없이 작동합니다.  
**리스트 사이**는 한칸(**개행**) 띄어야 정상작동합니다.

1. 순서 있는 목록
    3. 순서 있는 하위 목록
    * 순서 없는 대하위 목록
        6. 순서 있는 대하위 목록

* 순서 없는 목록
    - 순서 없는 하위 목록
        + 순서 없는 대하위 목록
        9. 순서 있는 대하위 목록


## 이미지(Images)
```markdown
![이미지 alt값](../assets/images/computer.jpg "title값 (필수값 아님)")  
![이미지 alt값][test image]  

[test image]: https://casper.ghost.org/v1.0.0/images/computer.jpg
```
**!&#91;이미지 alt값](절대 / 상대 경로) 형식**으로 작성하며,  
**문서내 참조 이미지 경로**를 **변수처럼** 적어놓고 **연결**하여 사용할 수 있습니다.

![이미지 alt값](../assets/images/computer.jpg "title값 (필수값 아님)")  
![이미지 alt값][test image]

[test image]: https://casper.ghost.org/v1.0.0/images/computer.jpg


## 링크(Links)
```markdown
[상대경로 링크 텍스트](https://naver.com "title값 (필수값 아님)")  
[절대경로 링크 텍스트](../index.html "title값 (필수값 아님)")  
[문서내 참조 링크 텍스트][test link]  
<https://naver.com>
[![이미지 alt값](../assets/images/computer.jpg)](https://naver.com/)

[test link]: https://naver.com
```
**&#91;링크태그 텍스트](절대 / 상대 경로) 형식**으로 작성하며,  
**꺾쇠속 URL**은 자동으로 **링크** 태그로 **변환**됩니다.  
**문서내 참조 링크 경로**를 **변수처럼** 적어놓고 **연결**하여 사용할 수 있습니다.  
**이미지에 링크**를 연결할 수 있습니다.

[상대경로 링크 텍스트](https://naver.com "image alt값 (필수값 아님)")  
[절대경로 링크 텍스트](../index.html "image alt값 (필수값 아님)")  
[문서내 참조 링크 텍스트][test link]  
<https://naver.com>
[![이미지 alt값](../assets/images/computer.jpg)](https://naver.com/)

[test link]: https://naver.com


## 코드 블록 (Code Block) / 코드 인라인 (Code Inline)
````markdown
```html
<div class="text">Lorem Ipsum</div>
```

Lorem `<div class="text">Lorem Ipsum</div>` Ipsum
````
영문 키보드 선택 상태로 숫자 1번 키 왼쪽에 있는 물결 키를 누르면 나오는 **&#96;(Grave)** 로  
**위 아래 라인**에 **3개의 &#96;(Grave)**를 사용하여 **감싸**고 코드 타입을 적으면, **코드 블록 (Code Block)**,  
동일 라인 문장 도중, **좌우에 &#96;(Grave)**를 사용하여 **감싸**면, **코드 인라인 (Code Inline)** 으로 코드를 강조할 수 있습니다.  
코드블록에서 **코드타입**을 지정하면 해당 코드타입에 맞는 **코드 하이라이터**가 활성화됩니다.  
**코드블록 안에**서 **코드블록**을 적고싶을때 안에서 사용된 시작코드가 종료코드로 중복되어 종료되버리는 경우 감싸는 **&#96;(Grave)**를 **4번** 사용하여 감싸게되면 작동합니다.

```html
<div class="text">Lorem Ipsum</div>
```

Lorem `<div class="text">Lorem Ipsum</div>` Ipsum


## 특수 기호
```markdown
<p>Text</p>  
<img width="100" src="assets/images/posts/markdown.png?num=30&amp;q=larry+bird">  
&lt;p>Text&lt;/p>  
&lt;img width="100" src="assets/images/posts/markdown.png?num=30&amp;amp;q=larry+bird">  
```
markdown 내부에서 마크업 코드를 작성하면 html코드로 인식됩니다.  
텍스트로 노출시키고 싶을경우 사용된 특수문자를 (꺽쇠 &lt;, 대괄호 &#91;, 그레이브 &#96;, 엔드 &amp; 등 )  
간접표현식(`&lt;`, `&#91;`, `&#96;` `&amp;` 등 )으로 변환하여 작성하면 됩니다.

<p>Text</p>  
<img width="100" src="assets/images/posts/markdown.png?num=30&amp;q=larry+bird">  
&lt;p>Text&lt;/p>  
&lt;img width="100" src="assets/images/posts/markdown.png?num=30&amp;amp;q=larry+bird">  


| 값 | 의미 | 기본값 |
|:---|:---:|---:|
| `static` | 유형(기준) 없음 / 배치 불가능 | `static` |
| `relative` | 요소 자신을 기준으로 배치 |  |
| `absolute` | 위치 상 부모(조상)요소를 기준으로 배치 |  |
| `fixed` | 브라우저 창을 기준으로 배치 |  |

값 | 의미 | 기본값
---|---|---
`static` | 유형(기준) 없음 / 배치 불가능 | `static`
`relative` | 요소 **자신**을 기준으로 배치 |
`absolute` | 위치 상 **_부모_(조상)요소**를 기준으로 배치 |
`fixed` | **브라우저 창**을 기준으로 배치 |

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