import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  },
  error: function (request, errorMessage) {
    console.log(request, errorMessage);
  }
});


// Authenticate user
export var authenticate = function (callback) {
  var request = {
    type: 'GET',
    url: '/api/authenticated',
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
