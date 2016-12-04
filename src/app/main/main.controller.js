(function() {
  'use strict';

  angular
    .module('dashboard')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, SweetAlert, BoardsService, $localForage) {
    var vm = this;

    vm.init = function () {
      BoardsService.getBoards().then(function (result) {
        vm.boardList = result;
      });
    };

    vm.init();


    vm.createBoard = function () {
      SweetAlert.swal({
        title: "Name your board!",
        type: 'input',
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top"
      }, function(inputValue){
        console.log(inputValue);
        if (inputValue !== 'false' && inputValue !== false) {
          if (inputValue === false) return false;

          if (inputValue === "") {
            swal.showInputError("You need to give a name to board!");
            return false
          } else {
            SweetAlert.swal("board created!", "", "success");
            vm.addBoard(inputValue);
          }
        } else {
          SweetAlert.close();
        }
      });
    };

    vm.addBoard = function (inputValue) {
      $timeout(function () {
        SweetAlert.close();
      }, 900);

      BoardsService.setBoard(inputValue);
        vm.init();
      ;
    };

    vm.removeBoard = function (index) {
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will not be able to recover this board",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
         cancelButtonText: "No, cancel",
         closeOnConfirm: false,
         closeOnCancel: false },
      function(isConfirm){
         if (isConfirm) {
            SweetAlert.swal("Board is deleted!", "", "success");
            BoardsService.removeBoard(index).then(function () {
              vm.init();
            });
         } else {
            SweetAlert.swal("", "Your board is safe :)", "error");
         }
      });

    };



  }
})();
