import app from "../app";


var room={
   enter:null as any,
   exit:null as any,
/**
 * 七厅（后面的那个厅）
 * @param scene 
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(916)!;
    var pic2=sc.getMeshByUniqueID(910)!;
    var pic3=sc.getMeshByUniqueID(914)!;
    var pic4=sc.getMeshByUniqueID(912)!;
    // pic1.enableEdgesRendering();
   // console.log(pic1);
    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_51",11,134,6089,-rad);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_48",-286,134,6089,-rad);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_50",298,134,6363,0);
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_49",2,134,6363,0);

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);

    // 丰岛海战
    let door=sc.getMeshByUniqueID(780)!;
    let box=BABYLON.MeshBuilder.CreateBox("",{width:260,height:350,depth:500},sc);
    box.position=door.position.clone();
    box.position.x=-627;
    box.position.z=6177;
    box.isVisible=
    box.isPickable=
    door.checkCollisions=false;
    door.material!.backFaceCulling=false;
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
             prevAnim=BABYLON.Animation.CreateAndStartAnimation("",door,"position.x",30,30,door.position.x,defaultX-1000,BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
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
  sc.registerBeforeRender(doorHandle);
 
   this.enter=function(){
      if($IS_DEV){
         console.log("七厅（最后面的厅）enter");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=true;
      });
     
   };
   this.exit=function(){
      if($IS_DEV){
         console.log("七厅（最后面的厅）exit");
      }
      clickMeshes.forEach(function(mesh){
         mesh.isPickable=false;
      });
    // sc.unregisterBeforeRender(doorHandle);
   };    

    // 后厅
    let houseBox=BABYLON.MeshBuilder.CreateBox("house-box-7",{width:500*3,height:780,depth:1000*0.6},sc);
    houseBox.position.set(-19,0,6385);
   //  houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);
   // houseBox.isVisible=true;

   //  var gizmoManager = new BABYLON.GizmoManager(sc);
   //  gizmoManager.attachToMesh(houseBox);
   //  gizmoManager.scaleGizmoEnabled=
   //  gizmoManager.positionGizmoEnabled=true;
 }
};

 export default room;