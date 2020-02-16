function getBtcPrice() {
  var response = UrlFetchApp.fetch('https://api.upbit.com/v1/ticker?markets=KRW-BTC');
  var responseText = response.getContentText();
  var data = JSON.parse(responseText);
  var trade_price = data[0]["trade_price"];
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1,1).setValue([JSON.stringify(trade_price)]);
}