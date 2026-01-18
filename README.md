[![jsdelivr][jsdelivr-badge]][jsdelivr-link]
[![npm version][fury-badge]][fury-link]

# [reveal.js-mermaid-plugin](https://zjffun.github.io/reveal.js-mermaid-plugin)

A [Mermaid](https://mermaid.js.org/) plugin for reveal.js.

## Usage

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/reset.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/reveal.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/theme/black.css"
  id="theme"
/>

<div class="reveal">
  <div class="slides">
    <section>
      <h3>Flowchart</h3>
      <div class="mermaid">
        <pre>
          %%{init: {'theme': 'dark', 'themeVariables': { 'darkMode': true }}}%%
          flowchart TD
            A[Start] --> B{Is it?};
            B -- Yes --> C[OK];
            C --> D[Rethink];
            D --> B;
            B -- No ----> E[End];
        </pre>
      </div>
    </section>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.0.5/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js-mermaid-plugin@11.6.0/plugin/mermaid/mermaid.js"></script>
<script>
  Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    hash: true,

    // mermaid initialize config
    mermaid: {
      // flowchart: {
      //   curve: 'linear',
      // },
    },

    // this plugin config
    // mermaidPlugin: {
    //   beforeRender(el) {
    //     console.log(el);
    //     // if return false this element will not call mermaid render
    //   },
    //
    //   afterRender(el) {
    //     console.log(el);
    //   },
    //
    //   iconPacks: [], // Passed to mermaid.registerIconPacks(). https://mermaid.ai/open-source/config/icons.html
    // },

    plugins: [RevealMermaid],
  });
</script>
```

## Q&A

### Can I use Mermaid JavaScript API instead of this plugin?

[Calling the Mermaid JavaScript API](https://mermaid.js.org/intro/getting-started.html#_4-calling-the-mermaid-javascript-api) is great, but currently, using Mermaid `startOnLoad` with reveal.js will wrong in some case like [this example](https://codepen.io/1010543618/pen/poBrEGE).

## [Release Notes](./CHANGELOG.md)

[fury-link]: https://badge.fury.io/js/reveal.js-mermaid-plugin
[fury-badge]: https://badge.fury.io/js/reveal.js-mermaid-plugin.svg
[jsdelivr-link]: https://www.jsdelivr.com/package/npm/reveal.js-mermaid-plugin
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/reveal.js-mermaid-plugin/badge
