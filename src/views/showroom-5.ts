import app from "../app";


var room={
   enter:null as any,
   exit:null as any,
/**
 * 五厅
 * @param scene 
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI/2;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(1130)!;
    var pic2=sc.getMeshByUniqueID(1126)!;
    var pic3=sc.getMeshByUniqueID(1114)!;
    var pic4=sc.getMeshByUniqueID(1096)!;

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_076",433,134,4581,-rad);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_43",433,134,4866,-rad);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_077",747,134,4297,rad);
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_44",747,134,4582,rad);

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);
   

    // 黄海海战
    let door=sc.getMeshByUniqueID(782)!;
    let box=BABYLON.MeshBuilder.CreateBox("",{width:200,height:300,depth:300},sc);
    box.position=door.position.clone();
    box.position.z-=200;
    box.isVisible=
    box.isPickable=
    door.checkCollisions=false;
    // box.visibility=0.3;

    let doorIsOpen=false;
    let prevAnim:BABYLON.Animatable|null;
    let defaultX=door.position.x;
    let doorHandle=function(){
      if(box.intersectsPoint(sc.activeCamera!.position)){
          if(!doorIsOpen){             
             doorIsOpen=true;
             if(prevAnim){
                prevAnim.stop();
             }
             prevAnim=BABYLON.Animation.CreateAndStartAnimation("",door,"position.x",30,30,door.position.x,0,BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
          }
      }
      else if(doorIsOpen){
         doorIsOpen=false;
         if(prevAnim){
            prevAnim.stop();
         }
         prevAnim=BABYLON.Animation.CreateAndStartAnimation("",door,"position.x",30,30,door.position.x,defaultX,BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
      }
 };
 
   this.enter=function(){
      if($IS_DEV){
         console.log("五厅（走廊）enter");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=true;
      });
      sc.registerBeforeRender(doorHandle);
   };
   this.exit=function(){
      if($IS_DEV){
         console.log("五厅（走廊）exit");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=false;
      });
     sc.unregisterBeforeRender(doorHandle);
   };    

    var houseBox=BABYLON.MeshBuilder.CreateBox("house-box-5",{width:500*0.88,height:780,depth:1000*0.84},sc);
    houseBox.position.set(577,0,4562);
    // houseBox.visibility=0.8;
    app.roomInit(houseBox,sc,this);

   //  var gizmoManager = new BABYLON.GizmoManager(sc);
   //  gizmoManager.attachToMesh(houseBox);
   //  gizmoManager.scaleGizmoEnabled=
   //  gizmoManager.positionGizmoEnabled=true;
 }
};

 export default room;