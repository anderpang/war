
import app from "../app";
import Question from "./Question";

var room={
    _isReady:false,

    enter:null as any,
    exit:null as any,

/**
 * 十厅
 * @param scene 
 * @param displayPanel 展示面板
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI/2;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(428)!;
    var pic2=sc.getMeshByUniqueID(440)!;
    var pic3=sc.getMeshByUniqueID(412)!;
    var pic4=sc.getMeshByUniqueID(420)!;
    var pic5=sc.getMeshByUniqueID(422)!;
    var pic6=sc.getMeshByUniqueID(426)!;
    var pic7=sc.getMeshByUniqueID(424)!;  // 7
    var pic8=sc.getMeshByUniqueID(414)!;  // 8
    var pic9=sc.getMeshByUniqueID(416)!;
    var pic10=sc.getMeshByUniqueID(418)!;

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_30",-938,134,4333,0);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_092",-1410,134,4333,0);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_21",-1897,134,3990,-rad);  
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_25",-1724,134,3894,-rad*2);
    displayPanel.bindMeshEvent(pic5,sc,"exhibits","画_26",-1212,134,3894,-rad*2); 
    displayPanel.bindMeshEvent(pic6,sc,"exhibits","画_28",-930,134,3824,0);   
    displayPanel.bindMeshEvent(pic7,sc,"exhibits","画_27",-1442,134,3824,0);   // 7 
    displayPanel.bindMeshEvent(pic8,sc,"exhibits","画_22",-1915,134,3738,-rad);  // 8
    displayPanel.bindMeshEvent(pic9,sc,"exhibits","画_23",-1706,134,3391,-rad*2);   
    displayPanel.bindMeshEvent(pic10,sc,"exhibits","画_24",-1241,134,3391,-rad*2);   

    clickMeshes.push(pic1);
    clickMeshes.push(pic2);
    clickMeshes.push(pic3);
    clickMeshes.push(pic4);
    clickMeshes.push(pic5);
    clickMeshes.push(pic6);
    clickMeshes.push(pic7);
    clickMeshes.push(pic8);
    clickMeshes.push(pic9);
    clickMeshes.push(pic10);
    

    // 误点挡板
    let box0=BABYLON.MeshBuilder.CreateBox("",{width:700,height:300,depth:20},sc);
    let actionManager=new BABYLON.ActionManager(sc);
    box0.position.set(-1326,185,3873);    
    actionManager.hoverCursor="default";
    box0.isPickable=true;
    box0.actionManager=actionManager;
    box0.visibility=0;

    // 答题锁(1024 mesh名：touming-005)
    var question=Question.CreateNew("door-lock-5",sc,new BABYLON.Vector3(-596.49,130,3379.61),"house5",1204);

    this.enter=function(){    
        if($IS_DEV){
            console.log("十厅enter");
        }       

        clickMeshes.forEach(function(mesh){
           mesh.isPickable=true;
        }); 
        question.bind();
       
    };
    this.exit=function(){
        if($IS_DEV){
            console.log("十厅exit");
         }

        clickMeshes.forEach(function(mesh){
            mesh.isPickable=false;
        }); 

        question.unbind();
    };

    // 判断是否出去
    let houseBox=BABYLON.MeshBuilder.CreateBox("house-box-10",{width:500*3.3,height:780,depth:1000},sc);
    houseBox.position.set(-1130,0,3870);
    // houseBox10.visibility=0.5;
    app.roomInit(houseBox,sc,this);

 }

};


 export default room;