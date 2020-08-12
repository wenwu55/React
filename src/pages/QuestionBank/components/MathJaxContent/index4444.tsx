import React from 'react'
// // import MathJax from "@nteract/mathjax";
// const MathJax = require("@nteract/mathjax")
import MathJax from "mathjax3-react";

export const MathJaxContent = props => {
  const { value } = props
  return (
    <div>
      <MathJax.Provider
        // src="../mathjax/es5/tex-chtml-full.js"
        // url={require("../mathjax/es5/tex-svg-full.js")}
        // url="/mathjax-full/es5/tex-chtml-full.js"
        url="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.5/es5/tex-mml-chtml.js"
        // options={{
        //   messageStyle: 'none',
        //   extensions: ['tex2jax.js'],
        //   // jax: ['input/TeX', 'output/HTML-CSS'],
        //   jax: ['input/TeX', 'output/SVG'],
        //   tex2jax: {
        //     inlineMath: [['$', '$'], ['\\(', '\\)']],
        //     displayMath: [['$$', '$$'], ['\\[', '\\]']],
        //     processEscapes: true,
        //   },
        //   TeX: {
        //     extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
        //   }
        // }}
        options={{
          tex: {
            inlineMath: [['$', '$'], ["\\(", "\\)"]],   // 行内公式选择符
            displayMath: [['$$', '$$'], ["\\[", "\\]"]]    // 段内公式选择符
          },
          loader: {
            // load: ["input/tex", 'output/svg']
            // load: ['[tex]/tagFormat', 'output/svg']
          },
          includeHtmlTags: {         //  HTML tags that can appear within math
            br: '\n', wbr: '', '#comment': ''
          },
          svg: {
            scale: 1,                      // global scaling factor for all expressions
            minScale: .5,                  // smallest scaling factor to use
            mtextInheritFont: false,       // true to make mtext elements use surrounding font
            merrorInheritFont: true,       // true to make merror text use surrounding font
            mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
            skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
            exFactor: .5,                  // default size of ex in em units
            displayAlign: 'center',        // default for indentalign when set to 'auto'
            displayIndent: '0',            // default for indentshift when set to 'auto'
            fontCache: 'local',            // or 'global' or 'none'
            localID: null,                 // ID to use for local font cache (for single equation processing)
            internalSpeechTitles: true,    // insert <title> tags with speech content
            titleID: 0                     // initial id number to use for aria-labeledby titles
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a'],   // 避开某些标签
            ignoreHtmlClass: "comment-content",   // 避开含该Class的标签
            processHtmlClass: 'tex2jax_process'
          }
        }}
      >
        <MathJax.Formula formula={value} />
      </MathJax.Provider>
    </div>
  );
}

// export const MathJaxContent = props => {
//   // return <div dangerouslySetInnerHTML={{
//   //   __html: marked(When $a \ne 0$, there are two solutions to \(ax ^ 2 + bx + c = 0\) and they are
//   //   $$x = {- b \pm \sqrt{b ^ 2 - 4ac} \over 2a}.$$) }} />

// }