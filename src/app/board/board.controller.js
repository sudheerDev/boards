
(function() {
  'use strict';

  angular
    .module('dashboard')
    .controller('BoardController', BoardController);

  /** @ngInject */
  function BoardController(BoardsService, $stateParams, ListService, SweetAlert, $timeout) {
    var vm = this;
    vm.createCardFlag = false;
    vm.init = function () {
      if ($stateParams.id) {
        BoardsService.getBoard($stateParams.id).then(function (result) {
          vm.board = result;
        });

        ListService.getLists({
          boardId: $stateParams.id
        }). then(function(lists) {
          console.log(lists);
          vm.lists = lists;
        });

      }
    };

    vm.createList = function () {
      SweetAlert.swal({
        title: "Name your List!",
        type: 'input',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top"
      }, function(inputValue){
        console.log(inputValue);
        if (inputValue !== 'false' && inputValue !== false) {
          if (inputValue === false) return false;

          if (inputValue === "") {
            swal.showInputError("You need to give a name to List!");
            return false
          } else {
            SweetAlert.swal("List created!", "", "success");
            vm.addList(inputValue);
          }

        } else {
          SweetAlert.close();
        }
      });
    };


    vm.addList = function (inputValue) {
      $timeout(function () {
        SweetAlert.close();
      }, 900);

      ListService.setList({
        name: inputValue,
        boardId: $stateParams.id
      });
    };

    vm.createCard = function (index) {
      vm.createCardFlag = true;
      vm.itemIndex = index;
      ListService.getLists({
        boardId: $stateParams.id
      }). then(function(lists) {
        console.log(lists);
        vm.lists = lists;
      });
    };

    vm.closeCard = function () {
      vm.createCardFlag = false;
    };

    vm.saveCards = function (event, index, item, itemIndesx) {
      console.log(event, item, index, itemIndesx);
      $timeout(function () {
        ListService.saveCards({
          lists: vm.lists,
          boardId: $stateParams.id
        });
      }, 100);

      return item;
    };

    vm.cardMoved = function (index, index1) {
      vm.lists[index1].splice(index, 1);
      // console.log(index, index1);

    };

    vm.addCard = function (inputValue) {
        vm.createCardFlag = false;
        SweetAlert.swal("Card created!", "", "success");
      $timeout(function () {
        SweetAlert.close();
      }, 900);

      ListService.setCard({
        name: vm.name,
        boardId: $stateParams.id,
        listIndex: vm.itemIndex,
        desc: vm.desc
      });
      ListService.getLists({
        boardId: $stateParams.id
      }). then(function(lists) {
        console.log(lists);
        vm.lists = lists;
      });
    };

    vm.removeList = function (listId) {
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will not be able to recover this list",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
         cancelButtonText: "No, cancel",
         closeOnConfirm: false,
         closeOnCancel: false },
      function(isConfirm){
         if (isConfirm) {
            SweetAlert.swal("List is deleted!", "", "success");
            ListService.removeList({
              boardId: $stateParams.id,
              listIndex: listId
            });
         } else {
            SweetAlert.swal("", "Your List is safe :)", "error");
         }
      });
    };

    vm.removeCard = function (listId, index) {
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will not be able to recover this card",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
         cancelButtonText: "No, cancel",
         closeOnConfirm: false,
         closeOnCancel: false },
      function(isConfirm){
         if (isConfirm) {
            SweetAlert.swal("Card is deleted!", "", "success");
            ListService.removeCard({
              boardId: $stateParams.id,
              listIndex: listId,
              cardIndex: index
            });
            ListService.getLists({
              boardId: $stateParams.id
            }). then(function(lists) {
              console.log(lists);
              vm.lists = lists;
            });
         } else {
            SweetAlert.swal("", "Your card is safe :)", "error");
         }
      });
    };

    vm.init();


  }
})();
