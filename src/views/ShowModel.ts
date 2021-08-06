import * as GUI from "babylonjs-gui";
import app from "../app";

class ShowModel{
    scene:BABYLON.Scene | null=null;

    constructor(engine:BABYLON.Engine,fileName:string){        
        engine.displayLoadingUI();

        let scene=new BABYLON.Scene(engine);        
        let camera=new BABYLON.ArcRotateCamera("",2.3,1.8,1,BABYLON.Vector3.Zero(),scene);
        camera.attachControl(engine.getRenderingCanvas(),true);
        
        let light=new BABYLON.HemisphericLight("",BABYLON.Axis.Y,scene);

        this.scene=scene;
        this.show();

        BABYLON.SceneLoader.Append("statics/assets/models/",fileName,scene,function(sc){
           engine.hideLoadingUI();
           let pos=sc.meshes[0].position.clone();

           scene.clearColor= BABYLON.Color4.FromColor3(BABYLON.Color3.Gray());
           scene.ambientColor=BABYLON.Color3.White();
           camera.setTarget(sc.meshes[0]);
           camera.setPosition(pos);
           camera.radius=800;

           // 关闭按钮
           var ui=GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui3d");

           var quitButton=GUI.Button.CreateImageOnlyButton("","statics/assets/quit.png");
           quitButton.width=quitButton.height="50px";
           quitButton.top="20px";
           quitButton.left="-20px";
           quitButton.thickness=0;
           quitButton.verticalAlignment=GUI.Control.VERTICAL_ALIGNMENT_TOP;
           quitButton.horizontalAlignment=GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
           quitButton.onPointerClickObservable.add(function(){
               app.sceneChange("sceneMain");
           });
           ui.addControl(quitButton);
         
        }, function(e) {
            var p = 0,
               n = "0%";
        
            if (e.lengthComputable){
                p = 100 * e.loaded / e.total;
                n=Math.floor(p)+"%";
                engine.loadingScreen.loadingUIText=n;
            }
        });
    }

    show(){
        app.sceneChange(this.scene!);
    }
}

export default ShowModel;