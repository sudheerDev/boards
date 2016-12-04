(function() {
  'use strict';

  angular
    .module('dashboard')
    .service('ListService', ListService);

  /** @ngInject */
  function ListService($localForage, $q) {
    var lists = [];

    var deferred = $q.defer();
    var _this = this;
    this.init = function () {
      $localForage.getItem('lists').then(function (result) {
        if (result) {
          result.forEach(function (lists, index) {
            _this.setLists({
              boardId:  index,
              lists: lists
            });
          });
        }

        deferred.resolve();
      });
      return deferred.promise;
    };

    this.init();

    this.setList = function (listObj) {
      if (!lists[listObj.boardId]) {
        lists[listObj.boardId] = [];
      }

      var list = {
        id: lists[listObj.boardId].length+1,
        name: listObj.name,
        cards: []
      }

      lists[listObj.boardId].push(list);
      $localForage.setItem('lists', lists);
    };

    this.setLists = function (listObj) {
      lists[listObj.boardId] = listObj.lists;
    };


    this.getLists = function (listObj) {
      return this.init().then(function () {
        return lists[listObj.boardId];
      });
    };

    this.getList = function (listObj) {
      return lists[listObj.boardId];
    };

    this.setCard = function (cardObj) {

      var card = {
        name: cardObj.name,
        desc: cardObj.desc
      };
      console.log(lists[cardObj.boardId]);
      lists[cardObj.boardId][cardObj.listIndex].cards.push(card);
      $localForage.setItem('lists', lists);
    };

    this.removeList = function (cardObj) {
      lists[cardObj.boardId].splice(cardObj.listIndex, 1);
      $localForage.setItem('lists', lists);
    };

    this.removeLists = function (boardId) {
      lists.splice(boardId, 1)
      $localForage.setItem('lists', lists);
    };

    this.removeCard = function (cardObj) {
      lists[cardObj.boardId][cardObj.listIndex].cards.splice(cardObj.cardIndex, 1);
      $localForage.setItem('lists', lists);
    };

    this.saveCards = function (listsObj) {
      lists[listsObj.boardId] = listsObj.lists;
      $localForage.setItem('lists', lists);
    };

  }
})();
