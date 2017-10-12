function Accordion(id,option) {
    var container=document.querySelector(id);
    var settingOption={
        defaultWidth:150,
        defaultHeight:50,
        activeWidth:350,
        activeHeight:450,
        animatDuration:300,
    };
    option=Object.assign({},settingOption,option);
    if(option.width==undefined) throw "width not defined";
    if(option.height==undefined) throw "height not defined";
    if(option.width*option.height!=container.children.length) throw "width and height not match children length";
    
      var lastRuntime = new Date(0);
      var runId = 0;
      function activePicture(index) {
          clearTimeout(runId);
          var currentTime = new Date();
          if (currentTime - lastRuntime < option.animatDuration) {
              runId = setTimeout(function () {
                  activePicture(index);
              }, option.animatDuration);
              return;
          }
          lastRuntime=currentTime ;
          var c_x=index%option.width;
          var c_y=Math.floor(index/option.width);
          container.style.width=(option.width-1)*option.defaultWidth+option.activeWidth+"px";
          for (var y = 0; y < option.height; y++) {
              for (var x = 0; x < option.width; x++) {
                   var  con=y*option.width+x;
                   var item=container.children[con];
                   if(y==c_y&&x==c_x){
                       item.style.width=option.activeWidth+"px";
                       item.style.height=option.activeHeight+"px";
                   }else if(y==c_y&&x!=c_x){
                       item.style.width=option.defaultWidth+"px";
                       item.style.height=option.activeHeight+"px";
                   }else if(y!=c_y&&x==c_x){
                       item.style.width=option.activeWidth+"px";
                       item.style.height=option.defaultHeight+"px";
                   }else{
                       item.style.width=option.defaultWidth+"px";
                       item.style.height=option.defaultHeight+"px";
                   }
              }           
          }     
      }
      activePicture(0);
      for (var i = 0; i < container.children.length; i++) {
          var element = container.children[i];
          (function(a){
                element.addEventListener('mouseenter',function(){
                activePicture(a);
              },false);
          })(i);
      }
    
}