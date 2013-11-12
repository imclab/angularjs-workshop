var fs = require('fs');

describe('Stock home page', function() {

  function takeScreenshot() {

    var name = 'temp.png';
    browser.takeScreenshot().then(function(data) {
      fs.writeFileSync(name, data, 'base64');
    });
  }

  it('should display a list of stocks on the main page', function() {
    browser.get('/');
    var all =
      browser.findElements(by.repeater('stock in landingCtrl.stocks'));
    all.then(function(arr) {
      expect(arr.length).toEqual(11);
    });
  });

  it('should allow registering and clicking on all', function() {
    browser.get('/');


    element(by.css('.register-link')).click();

    element(by.model('signupCtrl.username')).sendKeys('shyam');
    element(by.model('signupCtrl.password')).sendKeys('test');

    element(by.css('.btn-success')).click();

    takeScreenshot();
    element(by.css('.btn-success.all')).click();

    var all =
      browser.findElements(by.repeater('stock in myStocksCtrl.stocks'));
    all.then(function(arr) {
      expect(arr.length).toEqual(11);
    });
  }, 20000);
});


