describe('user.checkMenuItem', function () {

  var user;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      user = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  //check when input is valid
  it('should return Orange Chicken description', function() {
    var expectedResponse = {
      "description": "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
      "name": "Orange Chicken",
      "price_large": 9.75,
      "short_name": "L1"
    };
    $httpBackend.whenGET(ApiBasePath + '/menu_items/L/menu_items/0.json').respond(expectedResponse);
    user.checkMenuItem('L', '0').then(function(response) {
      expect(response).toEqual(expectedResponse);
    });
    $httpBackend.flush();
  });

  //check when input is invalid
  it('should return null', function() {
    var expectedResponse = null;
    $httpBackend.whenGET(ApiBasePath + '/menu_items/Z/menu_items/1.json').respond(expectedResponse);
    user.checkMenuItem('Z', '1').then(function(response) {
      expect(response).toEqual(expectedResponse);
    });
    $httpBackend.flush();
  });

});
