import React from 'react'
// // import MathJax from "@nteract/mathjax";
// const MathJax = require("@nteract/mathjax")
import MathJax from "react-mathjax3";

export const MathJaxContent = props => {
  const { value } = props

  return (
    <MathJax.Context
      input='tex'
      onLoad={() => {
        console.log("Loaded MathJax script!")
      }}
      onError={(MathJax, error) => {
        console.warn(error);
        console.log("Encountered a MathJax error, re-attempting a typeset!");
        MathJax.Hub.Queue(
          MathJax.Hub.Typeset()
        );
      }}
      script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"
      // script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.1/MathJax.js"
      options={{
        messageStyle: 'none',
        extensions: ['tex2jax.js'],
        jax: ['input/TeX', 'output/HTML-CSS'],
        // jax: ['input/TeX', 'output/SVG'],
        tex2jax: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
        },
        TeX: {
          extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
        }
      }}
    >
      <MathJax.Html html={value} />
    </MathJax.Context>
  );
}

// export const MathJaxContent = props => {
//   // return <div dangerouslySetInnerHTML={{
//   //   __html: marked(When $a \ne 0$, there are two solutions to \(ax ^ 2 + bx + c = 0\) and they are
//   //   $$x = {- b \pm \sqrt{b ^ 2 - 4ac} \over 2a}.$$) }} />

// }