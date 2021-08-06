
import app from "../app";
import Question from "./Question";
import mediaControl from "./mediaControl";

var room={
    _isReady:false,

    enter:null as any,
    exit:null as any,

/**
 * 八厅
 * @param scene 
 * @param displayPanel 展示面板
 */
 init:function(sc:BABYLON.Scene,displayPanel:any){
    var rad=Math.PI/2;
    var clickMeshes:BABYLON.AbstractMesh[]=[];
    var pic1=sc.getMeshByUniqueID(1056)!;
    var pic2=sc.getMeshByUniqueID(1054)!;
    var pic3=sc.getMeshByUniqueID(1076)!;
    var pic4=sc.getMeshByUniqueID(1064)!;
    var pic5=sc.getMeshByUniqueID(1072)!;
    var pic6=sc.getMeshByUniqueID(1048)!;
    var pic7=sc.getMeshByUniqueID(1046)!;  // 7
    var pic8=sc.getMeshByUniqueID(1042)!;  // 8
    var pic9=sc.getMeshByUniqueID(1062)!;
    var pic10=sc.getMeshByUniqueID(1038)!;

    displayPanel.bindMeshEvent(pic1,sc,"exhibits","画_085",-473,134,5767,rad);
    displayPanel.bindMeshEvent(pic2,sc,"exhibits","画_086",-473,134,5888,rad);
    displayPanel.bindMeshEvent(pic3,sc,"exhibits","画_63",-738,134,5643,rad*2);  // 已调
    displayPanel.bindMeshEvent(pic4,sc,"exhibits","画_083",-723,134,6021,0);
    displayPanel.bindMeshEvent(pic5,sc,"exhibits","画_089",-738,134,5589,0);  // 已调
    displayPanel.bindMeshEvent(pic6,sc,"exhibits","画_087",-473,134,5355,rad);   // 6 // 已调
    displayPanel.bindMeshEvent(pic7,sc,"exhibits","画_088",-473,134,5481,rad);   // 7 // 已调
    displayPanel.bindMeshEvent(pic8,sc,"exhibits","画_090",-724,134,5256,rad*2);  // 8
    displayPanel.bindMeshEvent(pic9,sc,"exhibits","画_084",-937,166,5966,0);   
   // displayPanel.bindMeshEvent(pic10,sc,"exhibits","画_091",-1097,166,5300,0);   
    displayPanel.bindMeshEvent(pic10,sc,"exhibits","画_39",-936,166,5315,rad*2);  // 原项目没有“画91”的事件 

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
    // let plane0=BABYLON.MeshBuilder.CreateBox("",{width:300,height:300,depth:20},sc);
    // plane0.position.set(590,130,2270);
    // let actionManager=new BABYLON.ActionManager(sc);
    // actionManager.hoverCursor="default";
    // plane0.isPickable=true;
    // plane0.actionManager=actionManager;
    // plane0.visibility=0.5;

    // 答题锁(1198 mesh名：touming-2)
     var question=Question.CreateNew("door-lock-4",sc,new BABYLON.Vector3(-597.06,120,5245.97),"house4",1202);

    this.enter=function(){    
        if($IS_DEV){
            console.log("八厅enter");
        }

        mediaControl.currentShowroom=8;

        clickMeshes.forEach(function(mesh){
           mesh.isPickable=true;
        }); 
        question.bind();
       
    };
    this.exit=function(){
        if($IS_DEV){
            console.log("八厅exit");
         }
         
        clickMeshes.forEach(function(mesh){
            mesh.isPickable=false;
        }); 

        question.unbind();
    };

    // 判断是否出去
    var houseBox=BABYLON.MeshBuilder.CreateBox("house-box-8",{width:500*1.5,height:780,depth:1000*0.8},sc);
    houseBox.position.set(-805,0,5643);
    // houseBox.visibility=0.5;
    app.roomInit(houseBox,sc,this);

 }

};


 export default room;