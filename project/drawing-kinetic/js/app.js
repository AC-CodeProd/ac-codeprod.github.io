
$(document).ready(function(){var colorSelect,layer=new Kinetic.Layer,layerPalette=new Kinetic.Layer({x:600,y:50}),layerCurrentColor=new Kinetic.Layer({x:655,y:400}),rectCurrentColor=new Kinetic.Rect({width:250,height:50,y:40,fill:"#FFF",stroke:"black",strokeWidth:2}),text=new Kinetic.Text({text:"Couleur sélectionnée : ",fontSize:30,fill:"#000"});layerCurrentColor.add(text,rectCurrentColor);for(var stage=new Kinetic.Stage({width:1024,height:512,container:"canvas"}),i=0,max=datas.length;max>i;i++){var path=new Kinetic.Path({data:datas[i].path,fill:"#FFF",stroke:"black",strokeWidth:2});path.on("click",function(event){console.log(event),this.fill(colorSelect),layer.draw()}),layer.add(path)}for(var y=55,x=55,i=0;i<maPalette.length;i++){i%5==0?(y=10*i,x=55):x+=50;var rect=new Kinetic.Rect({x:x,y:y,width:50,height:50,fill:maPalette[i],stroke:"black",strokeWidth:2});rect.on("click",function(event){colorSelect=event.target.attrs.fill,rectCurrentColor.fill(colorSelect),layerCurrentColor.draw()}),layerPalette.add(rect)}stage.add(layer,layerPalette,layerCurrentColor)});