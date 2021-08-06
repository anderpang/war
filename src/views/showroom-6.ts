import app from "../app";
import Question from "./Question";
import mediaControl from "./mediaControl";

var room={
   enter:null as any,
   exit:null as any,
/**
 * 六厅
 * @param scene 
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(934)!;
    var pic2=sc.getMeshByUniqueID(936)!;
    var pic3=sc.getMeshByUniqueID(898)!;
    var pic4=sc.getMeshByUniqueID(900)!;

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_078",866,173,5028,rad);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_079",1050,173,5028,rad);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_11",1152,173,6017,0);
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_12",1332,173,6017,0);
    
    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);

    let showroomNO=6;
    clickMeshes.push(mediaControl.initWallVideo(showroomNO,938,"exhibit3-1.mp4",sc));
    clickMeshes.push(mediaControl.initWallVideo(showroomNO,942,"exhibit3-2.mp4",sc));

    // 答题锁(1200 mesh名：touming-003)
    var question=Question.CreateNew("door-lock-3",sc,new BABYLON.Vector3(590.769,130,6031.98),"house3",1200);
     
   this.enter=function(){
      if($IS_DEV){
         console.log("六厅 enter");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=true;
      });

      mediaControl.currentShowroom=showroomNO;

      question.bind();
   };
   this.exit=function(){
      if($IS_DEV){
         console.log("六厅 exit");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=false;
      });

      question.unbind();
   };    

    let houseBox=BABYLON.MeshBuilder.CreateBox("house-box-6",{width:500*3.3,height:780,depth:1000},sc);
     houseBox.position.set(1119,0,5530);
    // houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);

   //  var gizmoManager = new BABYLON.GizmoManager(sc);
   //  gizmoManager.attachToMesh(houseBox);
   //  gizmoManager.scaleGizmoEnabled=
   //  gizmoManager.positionGizmoEnabled=true;
 }
};

 export default room;