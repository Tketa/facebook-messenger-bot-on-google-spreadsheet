var PAGE_ACCESS_TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
var SHEET_ID = 'xxxxxxxxxxxxxxxxxxx';
var SHEET_NAME = 'bot';

function doGet(e) {
  var validRequest = e.parameter['hub.verify_token'] === PAGE_ACCESS_TOKEN;
  
  var res = validRequest ? e.parameter['hub.challenge'] : 'Invalid Request';

  return ContentService.createTextOutput(res).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var params = JSON.parse(e.postData.contents);
  var messagingEvents = params.entry[0].messaging;
  
  messagingEvents.forEach(function(event) {
    if (event.message && event.message.text) {
      sendHttpPost(event.sender.id, findResponse(event.message.text));
    }
  });

  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

function findResponse(word) {
  debug(word);
  return getData().reduce(function(memo, row) { return memo || (row.key === word && row.value); }, false) || undefined;
}

function getData() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  
  return data.map(function(row) { return {key: row[0], value: row[1]}; });
}

function sendHttpPost(sender, text) {
  UrlFetchApp.fetch('https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN, {
    method : 'POST',
    contentType : 'application/json',
    payload : JSON.stringify({
      recipient: {
        id: sender
      },
      message: {
        text: text || '見つかりませんでした'
      }
    })
  });
}

function debug(text) {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('debug');
  sheet.appendRow([text]);
}

function test() {
  Logger.log(findResponse("hoge"));
}
