# facebook-messenger-bot-on-google-spreadsheet
Facebook Messenger Botを、Google Spreadsheet(とGAS)だけで構築するためのコードです。

## Setup
この記事を参照してください。
<!-- あとで書く -->

## Usage
`sample.js`をGoogle Spreadsheetのスクリプトエディタに貼り付けます。下記の部分だけ書きかえます。

```
var PAGE_ACCESS_TOKEN = 'ここにFacebook Developerから取得したページアクセストークンを貼り付け';
var SHEET_ID = 'ここにスプレッドシートのIDを貼り付け';
var SHEET_NAME = 'bot';
```

`SHEET_NAME`で指定したシートのA列に期待するワード、B列にそのワードが来た時に返すメッセージを列挙します。

## LICENSE
MIT
