import app from "../app";
import Question from "./Question";

var room={
   enter:null as any,
   exit:null as any,
/**
 * 四厅
 * @param scene 
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI/2;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(436)!;
    var pic2=sc.getMeshByUniqueID(404)!;
    var pic3=sc.getMeshByUniqueID(406)!;
    var pic4=sc.getMeshByUniqueID(408)!;
    var pic5=sc.getMeshByUniqueID(410)!;
    // pic1.enableEdgesRendering();
   // console.log(pic1);
    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_075",1100,173,3166,rad*2);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_15",1157,173,4118,0);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_07",1340,173,4118,0);
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_17",1524,173,4118,0);
    displayPanel.bindMeshEvent(pic5,sc,"exhibits","画_18",1707,173,4118,0);

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);
    clickMeshes.push(pic5);

    // 答题锁(1198 mesh名：touming-2)
    var question=Question.CreateNew("door-lock-2",sc,new BABYLON.Vector3(590.769,130,4131),"house2",1198);
     
   this.enter=function(){
      if($IS_DEV){
         console.log("四厅 enter");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=true;
      });

      question.bind();
   };
   this.exit=function(){
      if($IS_DEV){
         console.log("四厅 exit");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=false;
      });

      question.unbind();
   };    

    let houseBox=BABYLON.MeshBuilder.CreateBox("house-box-4",{width:500*3.28,height:780,depth:1000},sc);
    houseBox.position.set(1118,0,3658);
    // houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);

   //  var gizmoManager = new BABYLON.GizmoManager(sc);
   //  gizmoManager.attachToMesh(houseBox);
   //  gizmoManager.scaleGizmoEnabled=
   //  gizmoManager.positionGizmoEnabled=true;
 }
};

 export default room;