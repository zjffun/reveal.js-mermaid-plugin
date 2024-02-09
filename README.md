[![jsdelivr][jsdelivr-badge]][jsdelivr-link]
[![npm version][fury-badge]][fury-link]

# [reveal.js-mermaid-plugin](https://zjffun.github.io/reveal.js-mermaid-plugin)

A [Mermaid](https://mermaid.js.org/) plugin for reveal.js.

## Usage

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reset.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/theme/black.css"
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

<script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js-mermaid-plugin@2.2.0/plugin/mermaid/mermaid.js"></script>
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

    plugins: [RevealMermaid],
  });
</script>
```

[fury-link]: https://badge.fury.io/js/reveal.js-mermaid-plugin
[fury-badge]: https://badge.fury.io/js/reveal.js-mermaid-plugin.svg
[jsdelivr-link]: https://www.jsdelivr.com/package/npm/reveal.js-mermaid-plugin
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/reveal.js-mermaid-plugin/badge

## [Release Notes](./CHANGELOG.md)