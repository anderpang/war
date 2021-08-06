import * as GUI from "babylonjs-gui";

class VideoPanel{
  rootNode:BABYLON.TransformNode|null=null;
  video:HTMLVideoElement|null=null;
  onChangeObservable=new BABYLON.Observable();

  _url:string="";

  constructor(name:string,scene:BABYLON.Scene,public width:number,public height:number){
    let buttonSize=40;
    let videoTexture=new BABYLON.VideoTexture("","",scene,true,
    false,
    BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
    {
        autoPlay: true,
        loop: true,
        autoUpdateTexture: true
    });   
    let mat=new BABYLON.StandardMaterial("",scene);  
    let rootNode=new BABYLON.TransformNode(name || "videoRoot",scene);
    let plane=BABYLON.MeshBuilder.CreatePlane("",{width,height},scene);
       mat.diffuseTexture=videoTexture;
        plane.material=mat;        
        plane.setParent(rootNode);
        plane.enableEdgesRendering();

    let actionManager=new BABYLON.ActionManager(scene);
    actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            ()=>{
                let video=this.video!;
                if(video.paused){
                    video.play();
                }
                else{
                  video.pause();
                }
            })
    );
    plane.actionManager=actionManager;

    let uiPlane=BABYLON.MeshBuilder.CreatePlane("",{size:width+buttonSize},scene);
    uiPlane.setParent(rootNode);

    let ui=GUI.AdvancedDynamicTexture.CreateForMesh(uiPlane as any);
    let closeButton=GUI.Button.CreateImageOnlyButton("","statics/assets/close.png");    
    closeButton.widthInPixels=closeButton.heightInPixels=buttonSize;
    closeButton.thickness=0;
    closeButton.top="-270px";
    closeButton.left="10px";
   // closeButton.verticalAlignment=GUI.Control.VERTICAL_ALIGNMENT_TOP;
    closeButton.horizontalAlignment =GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    closeButton.onPointerClickObservable.add(()=>{
        this.hide();
    });
    ui.addControl(closeButton);         

     this.rootNode=rootNode;
     this.video=videoTexture.video;
  }
  
  show(url:string,isPlay:boolean=true){
    this.rootNode!.setEnabled(true);
    let video=this.video!;
    if(url!==this._url){
        video.src=url;
        this._url=url;
    }
    if(isPlay){
        video.play();
    }
    this.onChangeObservable.notifyObservers(true);

    return this;
  }
  hide(noNotify?:boolean){
    let video=this.video!;
    if(!video.paused){
        video.pause();
    }
    this.rootNode!.setEnabled(false);
    noNotify ||
    this.onChangeObservable.notifyObservers(false);

     return this;
  }

  setPosition(position:BABYLON.Vector3,rotateY:number=0){
      let rootNode=this.rootNode!;
      rootNode.position=position;
      rootNode.rotation.y=rotateY;

      return this;
  }
}

// class VideoWrap extends GUI.Control{
//     video:HTMLVideoElement|null=null;
//     _freezeControls:boolean=false;
  
//     constructor(name:string,url?:string){
//         super(name);
//         let video=document.createElement("video");
//         url && (video.src=url);
//         this.video=video;       
//     }
  
//     _draw(ctx:CanvasRenderingContext2D){
//         console.log("===========")
//       let video=this.video!;
//       let currentMeasure=this._currentMeasure;
//       // console.log("======",currentMeasure);
//       ctx.clearRect(0,0,currentMeasure.width,currentMeasure.height);
//       ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, currentMeasure.width, currentMeasure.height);
//     }
  
//     show(url?:string,isPlay:boolean=true){
//        let video=this.video!;
//        if(url){
//            video.src=url;
//        }
//        if(isPlay){
//            video.play();
//        }
//     }
//     hide(){
//         let video=this.video!;
//         if(!video.paused){
//             video.pause();
//         }
//     }
//   }

export default VideoPanel;

