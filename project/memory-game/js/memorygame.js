
"use strict";!function($){$.memoryGame=function(element,options){var defaults={contents:[],interval:"2000",quantity:6,callback:{}},plugin=this;plugin.settings={};var tiling,currentIndex,$element=$(element),element=element,currentTile=[],timerId=[],nbClick=0,nbTileLook=0;plugin.construct=function(){plugin.settings=$.extend({},defaults,options),$element.append('<h1 class="title-game text-center">Jeu du memory</h1>'),$element.append('<section class="row"><button class="button-replay" onClick="window.location.reload()"><span>Rejouer</span> <i class="fa fa-refresh"></i></button><div id="tiling" class="col-lg-10 col-lg-offset-1 tiling"></div></section>');var $tiling=$element.find("#tiling");if(0==plugin.settings.contents.length)$tiling.append('<p class="text-center">Pas de tuiles</p>');else{tiling=_.sample(plugin.settings.contents,plugin.settings.quantity/2),tiling=_.shuffle($.merge(tiling,tiling));for(var i=0;i<=tiling.length-1;i++)$tiling.append('<li class="tile col-xs-6 col-sm-4 col-md-3 col-lg-2"><div class="front"><i class="fa fa-eye"></i></div>'+tiling[i].content+"</li>")}$element.append('<p class="info-game">Nombre de clics : <span  id="number-click" class="number-click">0</span></p>'),plugin.init()},plugin.init=function(){setBindingEvents()};var setBindingEvents=function(){setClickTile()},setClickTile=function(){$element.find(".tile").on("click",function(){var index=$(this).index();currentIndex!=index&&2>nbTileLook&&!$(this).hasClass("tile-valid")?(currentIndex=index,currentTile.push({id:$(this).find(".back").attr("data-tile"),index:index}),2!=nbTileLook&&(nbClick++,nbTileLook++,$element.find("#number-click").text(nbClick),$(this).toggleClass("tile-look"),timerId.push(_.delay(onTimeOutHideTile($(this)),plugin.settings.interval)),2==nbTileLook&&onMatchedTile())):(toastr.clear(),toastr.warning("Dèjà active !"))})},onTimeOutHideTile=function(e){return{apply:function(){e.toggleClass("tile-look"),currentIndex=-1,nbTileLook--,currentTile=[]}}},onMatchedTile=function(){if(toastr.clear(),currentIndex=-1,currentTile[0].id==currentTile[1].id){toastr.success("Win !"),$element.find('.back[data-tile="'+currentTile[0].id+'"]').parent().addClass("tile-valid"),currentTile=[];for(var i=0;i<timerId.length;i++)clearTimeout(timerId[i]);nbTileLook=0}else{toastr.error("Loser !"),currentTile=[];for(var i=0;i<timerId.length;i++)clearTimeout(timerId[i]);_.delay(function(){nbTileLook=0,$element.find(".tile").each(function(){$(this).hasClass("tile-look")&&$(this).removeClass("tile-look")})},1e3)}timerId=[]};plugin.construct()},$.fn.memoryGame=function(options,customParams){return $(this).each(function(){if(void 0==$(this).data("memoryGame")){"undefined"==typeof options&&(options={});var plugin=new $.memoryGame(this,options);$(this).data("memoryGame",plugin)}"string"==typeof options&&$(this).data("memoryGame")[options].call($(this),$(this),customParams)})}}(jQuery,window.App);