import app from "../app";


var room={
   enter:null as any,
   exit:null as any,
/**
 * 九厅（走廊）
 * @param scene 
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI/2;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(1160)!;
    var pic2=sc.getMeshByUniqueID(1154)!;
    var pic3=sc.getMeshByUniqueID(1158)!;
    var pic4=sc.getMeshByUniqueID(1156)!;

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_39",-423,134,4818,rad);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_36",-423,134,4531,rad);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_38",-757,134,5102,-rad);
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_37",-757,134,4816,-rad);

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);

    // 马关谈判
    let door=sc.getMeshByUniqueID(752)!;
    let box=BABYLON.MeshBuilder.CreateBox("",{width:300,height:300,depth:300},sc);
    box.position=door.position.clone();
    box.position.z+=200;
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
         console.log("九厅（廊）enter");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=true;
      });
      sc.registerBeforeRender(doorHandle);
   };
   this.exit=function(){
      if($IS_DEV){
         console.log("九厅（廊）exit");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=false;
      });
     sc.unregisterBeforeRender(doorHandle);
   };    

   let houseBox=BABYLON.MeshBuilder.CreateBox("house-box-9",{width:500*0.84,height:780,depth:1000*0.8},sc);
     houseBox.position.set(-577,0,4820);
    // houseBox9.visibility=0.5;
    app.roomInit(houseBox,sc,this);

   //  var gizmoManager = new BABYLON.GizmoManager(sc);
   //  gizmoManager.attachToMesh(houseBox);
   //  gizmoManager.scaleGizmoEnabled=
   //  gizmoManager.positionGizmoEnabled=true;
 }
};

 export default room;