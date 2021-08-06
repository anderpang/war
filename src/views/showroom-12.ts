
import app from "../app";
import Question from "./Question";

var videos:HTMLVideoElement[]=[];

var room={
    _isReady:false,

    enter:null as any,
    exit:null as any,

/**
 * 十二厅
 * @param scene 
 * @param displayPanel 展示面板
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(454)!;
    var pic2=sc.getMeshByUniqueID(450)!;
    var pic3=sc.getMeshByUniqueID(446)!;
    var pic4=sc.getMeshByUniqueID(442)!;
    var pic5=sc.getMeshByUniqueID(458)!;

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_34",-1004+143,166,2480,0);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_33",-1186+143,166,2480,0);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_32",-1372+143,166,2480,0); 
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_31",-1555+143,166,2480,0);
    displayPanel.bindMeshEvent(pic5,sc,"exhibits","画_093",-1141,168,1510,rad);  

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);
    clickMeshes.push(pic5);
    // clickMeshes.push(pic6);
    // clickMeshes.push(pic7);
    // clickMeshes.push(pic8);
    // clickMeshes.push(pic9);
    
    // 墙上视频
    clickMeshes.push(bindVideo(462,"exhibit6.mp4",sc));

    // 误点挡板
    // let plane0=BABYLON.MeshBuilder.CreateBox("",{width:300,height:300,depth:20},sc);
    // plane0.position.set(590,130,2270);
    // let actionManager=new BABYLON.ActionManager(sc);
    // actionManager.hoverCursor="default";
    // plane0.isPickable=true;
    // plane0.actionManager=actionManager;
    // plane0.visibility=0.5;

    // 答题锁(1198 mesh名：touming-2)
    // var question=Question.CreateNew("door-lock-4",sc,new BABYLON.Vector3(-597.06,120,5245.97),"house4",1202);

    this.enter=function(){    
        if($IS_DEV){
            console.log("十二厅enter");
        }

        clickMeshes.forEach(function(mesh){
           mesh.isPickable=true;
        }); 
       // question.bind();
       
    };
    this.exit=function(){
        if($IS_DEV){
            console.log("十二厅exit");
         }
        
        allVideoStop();

        clickMeshes.forEach(function(mesh){
            mesh.isPickable=false;
        }); 

       // question.unbind();
    };

    // 判断是否出去
    var houseBox=BABYLON.MeshBuilder.CreateBox("house-box-12",{width:500*3.3,height:780,depth:1000},sc);
    houseBox.position.set(-1117,0,1995);
    // houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);

 }

};

function allVideoStop(){
    videos.forEach(function(video){
      if(!video.paused){
         video.pause();
      }
    });
 }

 function bindVideo(uniqueID:number,fileName:string,scene:BABYLON.Scene){
     var mesh=scene.getMeshByUniqueID(uniqueID)!;
     
     var actionManager=new BABYLON.ActionManager(scene);
     var onceHandle=actionManager.registerAction(
         new BABYLON.ExecuteCodeAction(
             BABYLON.ActionManager.OnPickTrigger,
             function(this:any){
                var videoTexture=new BABYLON.VideoTexture("","statics/video/"+fileName,scene);
                var mat =new BABYLON.StandardMaterial("",scene);
                    mat.diffuseTexture=videoTexture;
                 mesh.material=mat;
                 allVideoStop();
                 videos.push(videoTexture.video);

                 actionManager.unregisterAction(onceHandle!);

                 actionManager.registerAction(
                     new BABYLON.ExecuteCodeAction(
                         BABYLON.ActionManager.OnPickTrigger,
                         function(){
                             var video=videoTexture.video;                    
                             if(video.paused){
                                 allVideoStop();
                                 video.play();
                             }
                             else{
                                 video.pause();
                             }
                         }
                     )
                 );
             }
         )
     );

     mesh.actionManager=actionManager;
     // mesh.isPickable=true;
     return mesh;
 }



 export default room;