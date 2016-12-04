(function() {
  'use strict';

  angular
    .module('dashboard')
    .service('BoardsService', BoardsService);

  /** @ngInject */
  function BoardsService($localForage, $q, ListService) {
    var boards = [];
    var deferred = $q.defer();
    var _this = this;
    this.init = function () {
      $localForage.getItem('boards').then(function (result) {
        if (result) {
          _this.setBoards(result);
        }
        deferred.resolve();
      });
      return deferred.promise;
    };

    this.init();

    this.setBoard = function (name) {
      var board = {
        id: boards.length+1,
        name: name
      }

      boards.push(board);
      $localForage.setItem('boards', boards);
    };

    this.setBoards = function (boardList) {
      boards = boardList;
    };


    this.getBoards = function () {
      return this.init().then(function () {
        return boards;
      });
    };

    this.getBoard = function (index) {
      return this.init().then(function () {
        return boards[index];
      });
    };


    this.removeBoard = function (index) {
      boards.splice(index, 1);
      ListService.removeLists(index);
      return $localForage.setItem('boards', boards);
    };


  }
})();
