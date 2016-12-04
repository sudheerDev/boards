(function() {
  'use strict';

  angular
    .module('dashboard')
    .config(config);

  /** @ngInject */
  function config($localForageProvider) {
    // Enable log

    $localForageProvider.config({
      name        : 'boards', // name of the database and prefix for your data, it is "lf" by default
      version     : 1.0, // version of the database, you shouldn't have to use this
      storeName   : 'toDo' // name of the table
    });

  }

})();
