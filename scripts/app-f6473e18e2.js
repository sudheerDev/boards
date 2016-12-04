!function(){"use strict";angular.module("dashboard",["ngAnimate","ngAria","ui.router","toastr","oitozero.ngSweetAlert","LocalForageModule","dndLists"])}(),function(){"use strict";function e(e,t,n,s){var a=this;a.init=function(){n.getBoards().then(function(e){a.boardList=e})},a.init(),a.createBoard=function(){t.swal({title:"Name your board!",type:"input",showCancelButton:!0,closeOnConfirm:!1,animation:"slide-from-top"},function(e){if(console.log(e),"false"!==e&&e!==!1){if(e===!1)return!1;if(""===e)return swal.showInputError("You need to give a name to board!"),!1;t.swal("board created!","","success"),a.addBoard(e)}else t.close()})},a.addBoard=function(s){e(function(){t.close()},900),n.setBoard(s),a.init()},a.removeBoard=function(e){t.swal({title:"Are you sure?",text:"Your will not be able to recover this board",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel",closeOnConfirm:!1,closeOnCancel:!1},function(s){s?(t.swal("Board is deleted!","","success"),n.removeBoard(e).then(function(){a.init()})):t.swal("","Your board is safe :)","error")})}}e.$inject=["$timeout","SweetAlert","BoardsService","$localForage"],angular.module("dashboard").controller("MainController",e)}(),function(){"use strict";function e(e,t){var n=[],s=t.defer(),a=this;this.init=function(){return e.getItem("lists").then(function(e){e&&e.forEach(function(e,t){a.setLists({boardId:t,lists:e})}),s.resolve()}),s.promise},this.init(),this.setList=function(t){n[t.boardId]||(n[t.boardId]=[]);var s={id:n[t.boardId].length+1,name:t.name,cards:[]};n[t.boardId].push(s),e.setItem("lists",n)},this.setLists=function(e){n[e.boardId]=e.lists},this.getLists=function(e){return this.init().then(function(){return n[e.boardId]})},this.getList=function(e){return n[e.boardId]},this.setCard=function(t){var s={name:t.name,desc:t.desc};console.log(n[t.boardId]),n[t.boardId][t.listIndex].cards.push(s),e.setItem("lists",n)},this.removeList=function(t){n[t.boardId].splice(t.listIndex,1),e.setItem("lists",n)},this.removeLists=function(t){n.splice(t,1),e.setItem("lists",n)},this.removeCard=function(t){n[t.boardId][t.listIndex].cards.splice(t.cardIndex,1),e.setItem("lists",n)},this.saveCards=function(t){n[t.boardId]=t.lists,e.setItem("lists",n)}}e.$inject=["$localForage","$q"],angular.module("dashboard").service("ListService",e)}(),function(){"use strict";function e(e,t,n){var s=[],a=t.defer(),i=this;this.init=function(){return e.getItem("boards").then(function(e){e&&i.setBoards(e),a.resolve()}),a.promise},this.init(),this.setBoard=function(t){var n={id:s.length+1,name:t};s.push(n),e.setItem("boards",s)},this.setBoards=function(e){s=e},this.getBoards=function(){return this.init().then(function(){return s})},this.getBoard=function(e){return this.init().then(function(){return s[e]})},this.removeBoard=function(t){return s.splice(t,1),n.removeLists(t),e.setItem("boards",s)}}e.$inject=["$localForage","$q","ListService"],angular.module("dashboard").service("BoardsService",e)}(),function(){"use strict";function e(e,t,n,s,a){var i=this;i.createCardFlag=!1,i.init=function(){t.id&&(e.getBoard(t.id).then(function(e){i.board=e}),n.getLists({boardId:t.id}).then(function(e){console.log(e),i.lists=e}))},i.createList=function(){s.swal({title:"Name your List!",type:"input",showCancelButton:!0,closeOnConfirm:!1,animation:"slide-from-top"},function(e){if(console.log(e),"false"!==e&&e!==!1){if(e===!1)return!1;if(""===e)return swal.showInputError("You need to give a name to List!"),!1;s.swal("List created!","","success"),i.addList(e)}else s.close()})},i.addList=function(e){a(function(){s.close()},900),n.setList({name:e,boardId:t.id})},i.createCard=function(e){i.createCardFlag=!0,i.itemIndex=e,n.getLists({boardId:t.id}).then(function(e){console.log(e),i.lists=e})},i.closeCard=function(){i.createCardFlag=!1},i.saveCards=function(e,s,r,o){return console.log(e,r,s,o),a(function(){n.saveCards({lists:i.lists,boardId:t.id})},100),r},i.cardMoved=function(e,t){i.lists[t].splice(e,1)},i.addCard=function(e){i.createCardFlag=!1,s.swal("Card created!","","success"),a(function(){s.close()},900),n.setCard({name:i.name,boardId:t.id,listIndex:i.itemIndex,desc:i.desc}),n.getLists({boardId:t.id}).then(function(e){console.log(e),i.lists=e})},i.removeList=function(e){s.swal({title:"Are you sure?",text:"Your will not be able to recover this list",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel",closeOnConfirm:!1,closeOnCancel:!1},function(a){a?(s.swal("List is deleted!","","success"),n.removeList({boardId:t.id,listIndex:e})):s.swal("","Your List is safe :)","error")})},i.removeCard=function(e,a){s.swal({title:"Are you sure?",text:"Your will not be able to recover this card",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel",closeOnConfirm:!1,closeOnCancel:!1},function(r){r?(s.swal("Card is deleted!","","success"),n.removeCard({boardId:t.id,listIndex:e,cardIndex:a}),n.getLists({boardId:t.id}).then(function(e){console.log(e),i.lists=e})):s.swal("","Your card is safe :)","error")})},i.init()}e.$inject=["BoardsService","$stateParams","ListService","SweetAlert","$timeout"],angular.module("dashboard").controller("BoardController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("dashboard").run(e)}(),function(){"use strict";function e(e,t){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm"}).state("board",{url:"/board/:id",templateUrl:"app/board/board.html",controller:"BoardController",controllerAs:"vm"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("dashboard").config(e)}(),function(){"use strict"}(),function(){"use strict";function e(e){e.config({name:"boards",version:1,storeName:"toDo"})}e.$inject=["$localForageProvider"],angular.module("dashboard").config(e)}(),angular.module("dashboard").run(["$templateCache",function(e){e.put("app/board/board.html",'<div class="container h100"><div class=cardList><h1 class=boardList__header><a href=#/ class=icon-home></a>{{vm.board.name}}<a href=javascript:; class=icon-plus ng-click=vm.createList()>Create new list</a></h1><div class=text-center ng-if=!vm.lists.length><p>You have not created any boards yet!</p></div><ul class="unstyled cardList__list"><li class=listItem ng-repeat="list in vm.lists track by $index"><span class=list__title href=# ui-sref="board({id: $index})">{{list.name}}</span> <a class="icon-trash-empty cardList__remove" ng-click=vm.removeList($index)></a> <a class="icon-plus cardList__add" ng-click=vm.createCard($index)></a><ul class=noMargin dnd-list=list.cards dnd-inserted="vm.saveCards(event, index, item, $index)"><li class=cards dnd-draggable=card dnd-moved="list.cards.splice($index, 1)" ng-repeat="card in list.cards track by $index"><a class="icon-trash-empty card__remove cardList__remove" ng-click="vm.removeCard($parent.$index, $index)"></a> <span class=boardList__link href=# ui-sref="board({id: $index})">{{card.name}}</span> <span class=card__desc>{{card.desc}}</span></li></ul></li></ul></div><div class=createCard ng-if=vm.createCardFlag><div class=vAlign><a href=javascript:; class="icon-cancel-circled cardList__remove" ng-click=vm.closeCard()></a><form name=createCard class=createCard__form ng-submit=vm.addCard(createCard.$valid) novalidate><!-- NAME --><div class=form-group><label>Name of the card</label><input type=text name=name class=form-control ng-model=vm.name required></div><div class=form-group><label>Description</label><textarea type=text name=username class=form-control ng-model=vm.desc></textarea></div><!-- SUBMIT BUTTON --> <button type=submit class="button button-primary float-right">Submit</button> <button class="button button-outline float-right" ng-click=vm.closeCard()>cancel</button></form></div></div></div>'),e.put("app/main/main.html",'<div class=container><div class=boardList><h1 class=boardList__header>My boards <a href=# class="icon-plus float-right" ng-click=vm.createBoard()>Create new board</a></h1><ul class=unstyled><li ng-repeat="board in vm.boardList track by $index"><a class=boardList__link href=# ui-sref="board({id: $index})">{{board.name}}</a> <a class="icon-minus-circled boardList__options" ng-click=vm.removeBoard($index)></a></li></ul><div class=text-center ng-if=!vm.boardList.length><p>You have not created any boards yet!</p></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-f6473e18e2.js.map