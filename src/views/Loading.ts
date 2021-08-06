// import * as GUI from "babylonjs-gui";

// class Loading{
//     ui:GUI.AdvancedDynamicTexture|null=null;
//     _render:any;
//     // scene:BABYLON.Scene|null=null;

//     constructor(public scene:BABYLON.Scene){

//     }

//     show(){
//         var scene=this.scene;
//         var ui=GUI.AdvancedDynamicTexture.CreateFullscreenUI("loadingUI");
//         //var rect=new GUI.Rectangle("");
//         var rect=new GUI.Rectangle("");
//         var img=new GUI.Image("","statics/assets/loading.png");
//             img.width=img.height=1;
//             rect.width=rect.height="70px";
//             rect.thickness=0;
//             rect.addControl(img);
//         ui.addControl(rect);
//         var render=function(){
//             console.log("sssss")
//             rect.rotation+=0.05;
//         };
    
//         scene.registerBeforeRender(render);

//         this.ui=ui;
//         this._render=render;
    
//         this.show=function(){ 
//             var scene=this.scene;
//             ui.rootContainer.isVisible=true;
//             scene.registerBeforeRender(render);
//         };
//     }
//     hide(){
//       var ui=this.ui;
//       if(!ui){
//           return;
//       }
//       let scene=this.scene;
//       ui.rootContainer.isVisible=false;
//       scene.unregisterBeforeRender(this._render);
//     }
// }

// export default Loading;

import * as GUI from "babylonjs-gui";

class Loading{
    el:HTMLElement|null=null;

    show(){
       var doc=document,
           div=doc.createElement("div");

        div.className="loading";
        doc.body.appendChild(div);

        this.el=div;
    
        this.show=function(){ 
          div.style.display="block";
        };
    }
    hide(){
      let el=this.el;
      if(!el){
          return;
      }
      el.style.display="none";
    }
}

export default Loading;