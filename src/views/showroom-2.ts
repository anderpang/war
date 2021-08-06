
import app from "../app";
import Question from "./Question";
import mediaControl from "./mediaControl";

var room={
    _isReady:false,

    enter:null as any,
    exit:null as any,

/**
 * 右二厅
 * @param scene 
 * @param displayPanel 展示面板
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI/2;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(638)!;   // 洋务活动
    var pic2=sc.getMeshByUniqueID(640)!;   // 北洋军舰-超勇号
    var pic3=sc.getMeshByUniqueID(628)!;   // 北洋军舰-致远号
    var pic4=sc.getMeshByUniqueID(650)!;   // 北洋军舰-定远号
    var pic5=sc.getMeshByUniqueID(612)!;   // 日本军舰-吉野号
    var pic6=sc.getMeshByUniqueID(616)!;   // 日本军舰-松岛号
    var pic7=sc.getMeshByUniqueID(622)!;   // 脱亚入欧
    var pic8=sc.getMeshByUniqueID(620)!;   // 大陆政策

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_57",474,126,1735,-rad);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_56",474,126,1610,-rad);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_59",660,134,1495,rad*2);
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_53",782,135,1495,rad*2);
    displayPanel.bindMeshEvent(pic5,sc,"exhibits","画_074",790,135,2233,0);
    displayPanel.bindMeshEvent(pic6,sc,"exhibits","画_073",665,135,2233,0);
    displayPanel.bindMeshEvent(pic7,sc,"exhibits","画_60",490,126,2150,rad*3);
    displayPanel.bindMeshEvent(pic8,sc,"exhibits","画_61",490,126,2020,rad*3);   

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);
    clickMeshes.push(pic5);
    clickMeshes.push(pic6);
    clickMeshes.push(pic7);
    clickMeshes.push(pic8);
    
    // 墙上视频
    //sc.getMeshByUniqueID(644)!.isPickable=true; // 防止点到对面
    let showroowNO=2;
    clickMeshes.push(sc.getMeshByUniqueID(644)!);
    clickMeshes.push(mediaControl.initWallVideo(showroowNO,632,"exhibit1-1.mp4",sc));
    clickMeshes.push(mediaControl.initWallVideo(showroowNO,642,"exhibit1-2.mp4",sc));

    // 误点挡板
    // let plane0=BABYLON.MeshBuilder.CreateBox("",{width:300,height:300,depth:20},sc);
    // plane0.position.set(590,130,2270);
    // let actionManager=new BABYLON.ActionManager(sc);
    // actionManager.hoverCursor="default";
    // plane0.isPickable=true;
    // plane0.actionManager=actionManager;
    // plane0.visibility=0.5;

    // 答题锁
    // 答题锁(1198 mesh名：touming-2)
    var question=Question.CreateNew("door-lock-1",sc,new BABYLON.Vector3(590.769,130,2254),"house1",1196);
    

    this.enter=function(){    
        if($IS_DEV){
            console.log("二厅enter");
        }

        mediaControl.currentShowroom=showroowNO;

        clickMeshes.forEach(function(mesh){
           mesh.isPickable=true;
        }); 
        question.bind();
       
    };
    this.exit=function(){
        if($IS_DEV){
            console.log("二厅exit");
         }

        clickMeshes.forEach(function(mesh){
            mesh.isPickable=false;
        }); 

        question.unbind();
    };

    // 判断是否出去
    let houseBox=BABYLON.MeshBuilder.CreateBox("house-box",{width:500*1.3,height:780,depth:1000*0.76},sc);
    houseBox.position.set(773,0,1870);
    // houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);
    // houseBox.isVisible=true;

    //  var gizmoManager = new BABYLON.GizmoManager(sc);
    // gizmoManager.attachToMesh(houseBox);
    // gizmoManager.scaleGizmoEnabled=
    // gizmoManager.positionGizmoEnabled=true;

    // let camera=sc.activeCamera!;
    // sc.onBeforeRenderObservable.add(function(){
    //    if(plane0.intersectsPoint(camera.position)){
    //       videos.forEach(function(video){
    //           if(!video.paused){
    //               video.pause();
    //           }
    //       });
    //    }
    // });

 }

};


 export default room;