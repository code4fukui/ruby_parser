const parser = require("./nodejs-lib-ruby-parser.js");
//const { RubyParser } = require("./nodejs-lib-ruby-parser.js");
//const parser = RubyParser; // new RubyParser();
//const p = parser.parse({ filePath: './test.rb' });
//const p = parser.parse('./test.rb');
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
//console.log(p);
console.log(JSON.stringify(p.ast, null, 2))
//console.log(parser.getAst());

/*
const inspect = require('util').inspect;
const full = (x)=>inspect(x, true, Infinity);

const parser = new RubyParser('./test.rb');
const methods = parser.getMethods();
console.log('info', parser.getInfo());
console.log('methods', methods);
*/
