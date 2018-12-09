var app = angular.module('dashboardApp',[]);

app.controller('appContoller', function($scope,$http) {

    $scope.cart_items = [];
    $scope.cart_total = 0;

    $http.get('json/purchase.json').then(function (response) {
        $scope.purchase_data = response.data.purchases;
    });

    $scope.loadProducts = function(){
      $http.get('json/products.json').then(function (response) {
          delete $scope.category_data;
          delete $scope.brand_data;
          $scope.products_data = response.data.products;
      });
    };

    $scope.loadCategories = function(){
      $http.get('json/categories.json').then(function (response) {
          delete $scope.products_data;
          delete $scope.brand_data;
          $scope.category_data = response.data.categories;
      });
    };

    $scope.loadBrands = function(){
      $http.get('json/brands.json').then(function (response) {
          delete $scope.products_data;
          delete $scope.category_data;
          $scope.brand_data = response.data.brands;
      });
    };

    $scope.add2cart = function(prod_obj){
      $scope.cart_items.push(prod_obj);
      $scope.calculateCartTotal();
      console.log($scope.cart_items);
    };

    $scope.prod_detail_popup = function(detail){
      bootbox.alert(detail);
    };

    $scope.calculateCartTotal = function(){
      angular.forEach($scope.cart_items, function(value, key) {
          $scope.cart_total += value.price;
      });
    };

    $scope.purchaseDetails = function(pur){
      $scope.purchase_detail = pur;
    };
});
