import app from "../app";


var room={
   enter:null as any,
   exit:null as any,
/**
 * 十三厅（走廊）
 * @param scene 
 */
 init:function(sc:BABYLON.Scene,_displayPanel:any){   

    // 
   let door=sc.getMeshByUniqueID(1206)!;
   let timeout:number=-1;
   let resetTimeout=function(){
      if(timeout!==-1){
         clearTimeout(timeout);
         timeout=-1;
      }
   };
   
   this.enter=function(){
      if($IS_DEV){
         console.log("十三厅（廊）enter");
      }
      resetTimeout();
      door.setEnabled(false);
   };
   this.exit=function(){
      if($IS_DEV){
         console.log("十三厅（廊）exit");
      }
      resetTimeout();
      timeout=setTimeout(function(){
         door.setEnabled(true);
      },1000);   
   };    

   let houseBox=BABYLON.MeshBuilder.CreateBox("house-box-13",{width:500,height:780,depth:1000*0.8},sc);
   houseBox.position.set(-611,0,1070);
   // houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);
   // houseBox.isVisible=true;

   //  var gizmoManager = new BABYLON.GizmoManager(sc);
   //  gizmoManager.attachToMesh(houseBox);
   //  gizmoManager.scaleGizmoEnabled=
   //  gizmoManager.positionGizmoEnabled=true;
 }
};

 export default room;