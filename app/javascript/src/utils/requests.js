import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
    'Access-Control-Allow-Origin': "*"
  },
  error: function (request, errorMessage) {
    console.log(request, errorMessage);
  }
});

// Create new user
export var createUser = function (username, email, password, callback) {
  var request = {
    type: 'POST',
    url: 'users',
    data: {

        username: username,
        password: password,
        email: email

    },
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

// Log in user
export var signInUser = function (username, password, callback) {
  var request = {
    type: 'POST',
    url: 'sessions',
    data: {
      user: {
        username: username,
        password: password
      }
    },
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

// Authenticate user
export var authenticate = function (callback) {
  var request = {
    type: 'GET',
    url: 'authenticated',
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

// Get current username
export var  getCurrentUser = function (callback) {
  authenticate(function (response){
    if (response.authenticated == true) {
      callback(response);
    }
    else if (response.authenticated ==  false) {
      window.location.replace('/');
    }
  });
};

export var getSymbolData = function (symbol) {
  var request = {
    type: 'GET',
    url: 'https://query1.finance.yahoo.com/v11/finance/quoteSummary/' + symbol + '?modules=financialData',
    success: function (response, textStatus) {
      console.log("success");
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  }
  $.ajax(request);
};
