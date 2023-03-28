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
      user: {
        username: username,
        email: email,
        password: password
      }
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
      //window.location.replace('/');
      callback(response);
    }
  });
};

// Log out user (delete session)
export var logOutUser = function (callback) {
  var request = {
    type: 'DELETE',
    url: 'sessions',
    success: function (response) {
      callback(response);
    }
  };
  $.ajax(request);
};

// find symbol
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

// add to users prortfolio
export var addToPortfolio = function (symbol, callback) {
  var request = {
    type: 'POST',
    url: 'addToPortfolio',
    data: {
      portfolio: {
        symbol: symbol,
      }
    },
    success: function (response) {
      callback(response);
    }
  }
  $.ajax(request);
}

// index users portfolio
export var index = function (username, callback) {
  var request = {
    type: 'GET',
    url: '/index/' + username,
    success: function (response) {
      if (response.error) {
        window.location.replace('/signup');
      }
      else {
        callback(response);
      }
    }
  }
  $.ajax(request);
}
