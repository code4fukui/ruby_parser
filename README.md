# JS Ruby file parser
A simple ES module for parsing ruby files, getting their methods, arguments, comments and AST. (forked [puntorigen/ruby_parser](https://github.com/puntorigen/ruby_parser))

```js
import parser from "https://code4fukui.github.io/ruby_parser/RubyParser.js";

const src = `
cls; x=15
while true
  lc x,5; p 79 
  lc rnd(32),23; p 42; p 10
  wait 3
  k=inkey()
  x=x-(k==28?1:0)+(k==29?1:0)
  if scr(x,5)!=0
    break
  end
end
`;
const p = parser.parse(src);
console.log(JSON.stringify(p.ast, null, 2))
```
