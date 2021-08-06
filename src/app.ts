import mediaControl from "./views/mediaControl";

let app={
   // engine:null as BABYLON.Engine | null,
    sceneMain:null as BABYLON.Scene | null,
    scene360:null as BABYLON.Scene | null,
    currentScene:null as BABYLON.Scene | null,      

    models:Object.create(null),

    roomInit(box:BABYLON.Mesh,sc:BABYLON.Scene,roomObject:{enter:()=>void,exit:()=>void,[propName:string]:any}){
       var camera=sc.activeCamera!;
       var isEnter=false;
       box.isVisible=false;
       sc.onReadyObservable.addOnce(function(){
         sc.onBeforeRenderObservable.add(function(){
            var _isEnter=box.intersectsPoint(camera.position);
           if(isEnter){
              // 离开时触发
               if(!_isEnter){
                  isEnter=false;
                  mediaControl.exitRoom();
                  roomObject.exit();
               }
           }
           else{
              if(_isEnter){
                 isEnter=true;
                 roomObject.enter();
              }
           }
         });
       });       
    },
    
    sceneChange(this:any,targetScene:string | BABYLON.Scene){
       var fromScene=this.currentScene;
       var toScene=typeof targetScene==="string"?this[targetScene]:targetScene;
       // var engine=this.engine;
       if(fromScene===toScene){
          return;
       }
       if(fromScene){
           fromScene.detachControl();
       }
       
       // engine.stopRenderLoop();
       toScene.attachControl();
       this.currentScene=toScene;
    //    engine.runRenderLoop(function(){
    //         toScene.render();
    //    });
    },

    _quesitons:null as any,

    getQuestion(key:string){
       var that=this;
       return new Promise(function(resolve:any){
         var _quesitons=that._quesitons;
         if(_quesitons){
            resolve(_quesitons[key]);
         }
         else{
            BABYLON.Tools.LoadFile("statics/data/question.json",function(str){
               var json=JSON.parse(str as string);
               that._quesitons=json;
               resolve(json[key]);
            });
         }         
       });
    }
};

export default app;