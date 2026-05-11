# ruby_parser

Rubyファイルをパースし、メソッド、引数、コメント、ASTを取得するためのシンプルなESモジュールです。（[puntorigen/ruby_parser](https://github.com/puntorigen/ruby_parser)からのフォークです）

## 機能
- Rubyコードをパースして抽象構文木（AST）に変換します。
- コメント、診断情報（エラーや警告）、ソースコード上の位置情報を抽出します。
- メソッドの詳細を抽出するための高レベルなNode.jsラッパーを提供します。
- ESモジュールとして、モダンブラウザ上で直接使用可能です。
- 強力なRustクレートである`lib-ruby-parser`をベースにしています。

## 使い方

### ブラウザでの使用（ESM）
CDNからインポートすることで、ブラウザ上で直接パーサーを使用できます。これにより、コアのパース機能に直接アクセスできます。

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
`parse`関数は、`ast`、`comments`、`diagnostics`を含むオブジェクトを返します。

### Node.jsでの使用（CommonJS）
Node.js向けには、パース後にメソッドやコメントなどの情報を簡単に抽出できるヘルパーメソッドを備えたラッパークラスを提供しています。

**1. インストール:**
```bash
npm install ruby_parser
```

**2. パースとデータ抽出:**
Node.jsモジュールはインスタンス化が必要なクラスとなっています。ファイルまたは文字列をパースした後、インスタンスのメソッドを呼び出すことで構造化されたデータを取得できます。

```javascript
const RubyParser = require('ruby_parser'); // または require('./index.js')
const fs = require('fs');

// テストファイルの作成
fs.writeFileSync('test.rb', 'def my_method(arg1, arg2)\n  # A comment\n  puts "hello"\nend');

const parser = new RubyParser();

// ファイルパスからのパース
parser.parse({ filePath: 'test.rb' });

// または文字列からのパース
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

### ブラウザ向けAPI
- **`parser.parse(source: string): object`**
  - Rubyコードの文字列をパースします。
  - **戻り値:** 以下のキーを持つオブジェクト:
    - `ast`: 抽象構文木（AST）のルートノード。
    - `comments`: 位置情報を含むコメントノードの配列。
    - `diagnostics`: パース時のエラーや警告の配列。

### Node.js向けAPI（`RubyParser`クラス）
- **`new RubyParser()`**
  - 新しいパーサーのインスタンスを作成します。
- **`.parse({ rubyString: string } | { filePath: string })`**
  - 文字列またはファイルパスからRubyコードをパースします。このメソッドを実行すると、インスタンスにパース結果が保持されます。
  - **戻り値:** パースされたASTオブジェクト。
- **`.getAst(): object`**
  - 最後にパースしたソースの完全なASTを返します。
- **`.getMethods(): object`**
  - メソッド名をキーとし、引数、ボディ、位置情報、関連するコメントなどのメタデータを値として含むオブジェクトを返します。
- **`.getComments(): array`**
  - すべてのコメントの配列を返します。各要素にはコメントのテキストと位置情報が含まれます。
- **`.getDiagnostics(): array`**
  - パース時に発生した診断メッセージ（エラーや警告）の配列を返します。
- **`.getInfo(): object`**
  - パースされたASTのルートに関するメタデータを返します。

## ライセンス
MIT License
