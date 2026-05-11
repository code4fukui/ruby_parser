# ruby_parser

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple ES module for parsing Ruby files, getting their methods, arguments, comments, and AST. (Forked from [puntorigen/ruby_parser](https://github.com/puntorigen/ruby_parser))

## Features
- Parses Ruby code into an Abstract Syntax Tree (AST).
- Extracts comments, diagnostics, and source location information.
- Provides a high-level Node.js wrapper for extracting method details.
- Usable directly in modern browsers via ES modules.
- Based on the powerful `lib-ruby-parser` Rust crate.

## Usage

### In the Browser (ESM)
You can use the parser directly in the browser by importing it from a CDN. This provides direct access to the core parsing functionality.

```html
<script type="module">
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
  const result = parser.parse(src);
  console.log(JSON.stringify(result.ast, null, 2));
</script>
```
The `parse` function returns an object containing the `ast`, `comments`, and `diagnostics`.

### In Node.js (CommonJS)
For Node.js, the package provides a wrapper class with helper methods to easily extract information like methods and comments after parsing.

**1. Installation:**
```bash
npm install ruby_parser
```

**2. Parsing and data extraction:**
The Node.js module is a class that must be instantiated. After parsing a file or string, you can call methods on the instance to get structured data.

```javascript
const RubyParser = require('ruby_parser'); // or require('./index.js')
const fs = require('fs');

// Write a test file
fs.writeFileSync('test.rb', 'def my_method(arg1, arg2)\n  # A comment\n  puts "hello"\nend');

const parser = new RubyParser();

// Parse from a file path
parser.parse({ filePath: 'test.rb' });

// Or parse from a string
// const rubyCode = '...';
// parser.parse({ rubyString: rubyCode });

const methods = parser.getMethods();
console.log(methods);
/*
{
  my_method: {
    args_type: 'arg',
    args: [ 'arg1', 'arg2' ],
    location: { begin: 23, end: 49 },
    body: '\n  # A comment\n  puts "hello"\n',
    comments: [ '# A comment' ],
    type: 'public'
  }
}
*/

const ast = parser.getAst();
console.log(ast);
```

## API

### Browser API
- **`parser.parse(source: string): object`**
  - Parses a string of Ruby code.
  - **Returns:** An object with the following keys:
    - `ast`: The root node of the Abstract Syntax Tree.
    - `comments`: An array of comment nodes with location info.
    - `diagnostics`: An array of parsing errors or warnings.

### Node.js API (`RubyParser` class)
- **`new RubyParser()`**
  - Creates a new parser instance.
- **`.parse({ rubyString: string } | { filePath: string })`**
  - Parses Ruby code from either a string or a file path. This method populates the instance with the parsed result.
  - **Returns:** The parsed AST object.
- **`.getAst(): object`**
  - Returns the full AST from the last parsed source.
- **`.getMethods(): object`**
  - Returns an object where keys are method names and values contain metadata like arguments, body, location, and associated comments.
- **`.getComments(): array`**
  - Returns an array of all comments, each with its text and location.
- **`.getDiagnostics(): array`**
  - Returns an array of diagnostic messages (errors/warnings) from the parse.
- **`.getInfo(): object`**
  - Returns metadata about the root of the parsed AST.

## License
MIT License