---
title: "4 things I learned at ffconf 2018"
published: true
post_id: "0003"
categories: ["Tech"]
credit: "Seb Lee-Delisle (CC BY-NC-ND 2.0)"
credit_url: "https://www.flickr.com/photos/sebleedelisle/24461418388/in/album-72157666198229809/"

# atom tags
author: dylan
image: "/assets/img/posts/0003.webp"
---

Back in November I had the privilege of attending my third FFConf. For those who don't know, [FFConf](https://2018.ffconf.org/) is an annual conference focused on the bleeding edge of front-end development. It's held in Brighton, England and is led by veteran developer [Remy Sharp](https://remysharp.com/) of JSbin and nodemon fame. It's a great insight into the future of the web thanks to the diverse range of speakers and topics. Here are some of my take aways from this year's conference.

## 1. AI + JS is a thing, and its future is looking bright

I was intrigued by [Elle Haproff](https://twitter.com/eleanorhaproff)'s (of AI JS Meetup London) talk about AI in client-side javascript. I've read about ML processing on cloud services previously, but it was really cool to see how capable browsers are when it comes to AI. Eleanor is one of the founders of the online showcase of these projects, [aijs.rocks](https://aijs.rocks), which features such projects as:

* **Nic or not**: A tensorflow.js project that determines whether your photos contain Nicolas Cage or not.
* **Emoji caption**: A computer vision project utilising Azure to generate captions for your Instagram pics.
* **image2image**: My personal favourite, a tensorflow.js project that turns your line drawings into surreal "photos". Based on Pix2Pix.

Eleanor makes the good point that with libraries like [Tensorflow.js](https://medium.com/tensorflow/introducing-tensorflow-js-machine-learning-in-javascript-bf3eab376db) are making it possible to run machine learning algorithms in the browser, an environment Javascript excels in. Javascript is also one of the most popular languages, which means that now AI development has opened up to even more developers. Tensorflow is an open source library developed by Google that lets you manage and create neural networks and models. [Google says that](https://medium.com/tensorflow/introducing-tensorflow-js-machine-learning-in-javascript-bf3eab376db):

> ML running in the browser means that from a user’s perspective, there’s no need to install any libraries or drivers. Just open a webpage, and your program is ready to run.

A good point Eleanor also made is that running ML client-side provides privacy benefits too, as potentially sensitive information won't leave the device while still providing value to the user. She then provided a demonstration of Tensorflow usage, including loading and training models, and using features like loss functions and layers:

{% include post_image.html name="ffconf-tensorflowdemo" ext=".png" alt="A slide deck from the presentation, showing the code used to plot a polynomial regression." caption="Here we see Tensorflow.js plotting polynomial regression. (Credit: Elle Haproff / FFConf)" %}

I found this all very useful as someone who doesn't really dabble in AI. In my day to day work I'm developing applications that process business data, and applying ML to this data could provide really valuable insights to our clients.

## 2. There are a number of exciting features and proposals coming to JS

While I work on greenfield applications a lot of the time (meaning I work on new JS stuff), I don't actively keep up to date with a lot of the TC39 proposals, so I was excited to see [Willian Martins](https://twitter.com/wmsbill)' presentation on the 'best of' new features. It's good to keep a tab on these proposals so you can integrate them as they become available, to enhance your code and surprise your ~~disgrunted~~ colleagues!

The first new feature Willian mentioned regards the messy nature of Javascript's `this` keyword. The keyword previously has caused trouble when used in a function scope, acting differently in the browser vs. Node. Setting values on `this` inside a function in many conditions would actually set the value on the globally scoped `this`. Using the [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) method or [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) overcomes the problems this causes. But there is also now a proposal for a Bind operator (theme tune included):

{% include post_image.html name="ffconf-bindop" ext=".png" alt="A screenshot from a slideshow with the text 'Bind Operator' and a drawing of Mega Man X" caption="The title card for the Bind Operator. (credit: Willian Martins / FFConf)" %}

The operator is more elegant than the bind method and can be used in a binary or unary fashion. Personally while I don't use this functionality often, I can see how it can be very useful when the behaviour of `this` can be quite opaque in big and legacy codebases.

Next Willian showcased the pipeline operator, again with some great artwork.

{% include post_image.html name="ffconf-pipeop" ext=".png" alt="A screenshot from a slideshow with the text 'Pipe Operator' and a drawing of a superhero" caption="The title card for the Pipe Operator. (credit: Willian Martins / FFConf)" %}

The pipeline operator looks a lot more beneficial for my every day use. Rather than wrapping variables in multiple functions, it provides a tidy way to apply a number of functions:

```js
// before

console.log(textualizeNumbers(sanitize(document.getElementById('user-input').value)))

// after
document.getElementById('user-input').value
  |> sanitize
  |> textualizeNumbers
  |> console.log
```

The proposal authors have also thought about the needs to provide extra params; this is made possible by providing an arrow function to the pipeline operator. Willian points out that there's still problems with functionality like async handling, and says there are some competing proposals to handle said issues: Smart pipelines and F# pipelines.

Personally, I'm really looking forward to this being implemented because it will tidy up a lot of code and replace a number of functions!

Next, Willians introduced us all to partial application to partially apply parameters within a function call. To me it looks messy, but I can see how it could be useful. It reminds me of Python or CLI syntax.

{% include post_image.html name="ffconf-partialapply" ext=".png" alt="A screenshot from a slideshow with a code demonstration of partial application, showing how parameters of a function can fill a template string." caption="A demonstration of the partial application syntax for a template literal. (credit: Willian Martins / FFConf)" %}

Finally, the spread token allows developers to pass all (or the rest) of a set of values as a parameter. For example, if I want to get an object of all props except some specific ones, I could write:

```js
const foo = {
  a: 'hello',
  b: 'goodbye',
  c: 'zoinks',
  d: 'noice',
};
const { a, b, ...props } = foo;

console.log(props);
```

and the output would be:

```js
{ c: 'zoinks', d: 'noice' }
```

Personally, I can see how this could be useful for passing through props to child components in React.js and I'm looking forward to using it.

## 3. You can recreate the 80s with the modern web (but why?)

Remy showed us how, even with all the fancy technology available for website development, we can still go back in time. I'd highly recommend [watching the 36 minute presentation](https://www.youtube.com/watch?v=lQMcZtiaD0A) in all its glory, it's very chaotic.

Using APIs like the [oscillator node](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createOscillator) and the deprecated [script processor](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode), Remy made a script that makes audio of web pages and loads it in the way a Sinclair ZX Spectrum would, which is a questionable goal. It was a good deep dive into audio processing APIs and binary handling.

## 4. You can do anything with Canvas

To cap it all off, [Tim Holman](https://twitter.com/twholman) demonstrated his collection of ~~procrastination~~ spare time projects, like using Canvas to make the DVD logo screensaver hit the corner (if you know you know), and discussing how he uses them as a form of meditation. Tim also demos his procrastination corner named The Zen Zone, which looks great a good use of my lunch break.

My favourite part of Tim's presentation was his chrome extension friend called Buddy. Buddy was an experimentation in using the [text to speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to mock him when he visited certain websites like Reddit, Seamless (a food delivery website) and Twitter. His voice is really annoying, which is the point I guess.

I generally got from these projects that having fun with coding teaches you a lot of tricks and features that help you in your career. I've always believed that working on fun hobby projects keeps you sane working on the more mundane coding projects.

My favourite quote was: "I use the word algorithm when I don't want to describe the work I did." Very apt.

---

Remy has very kindly shared the talks on [YouTube](https://www.youtube.com/playlist?list=PLXmT1r4krsTq3yrg4t14hPUbO1OsrA1Hx), I highly recommend you check them out. I can't wait to go again next year to see what's new.

Thanks to Red River for covering my ticket and transportation so I could attend the conference.
