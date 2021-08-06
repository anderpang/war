import * as GUI from "babylonjs-gui";
/**
 * 引导层
 */

var guide={
    init(scene:BABYLON.Scene,ready:()=>void){
        var alignTop=GUI.Control.VERTICAL_ALIGNMENT_TOP,
            alignBottom=GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            alignLeft=GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        var stepIndex=0;
        var ui=GUI.AdvancedDynamicTexture.CreateFullscreenUI("guide",true,scene as any);
        var guide1=new GUI.Container("guide-1");
        var img1=new GUI.Image("img1","statics/assets/guide/10.png");
        var nextButton=GUI.Button.CreateSimpleButton("next-button","下一步");

        img1.width = "100%";
        img1.height = "100%";
        img1.verticalAlignment = alignTop;

        nextButton.cornerRadius = 10;
        nextButton.color = "white";
        nextButton.background = "#ffffff00";
        nextButton.top = "-50px";
        nextButton.width = "200px";
        nextButton.height = "70px";
       // nextButton.horizontalAlignment = alignTop;
        nextButton.verticalAlignment = alignBottom;
        // nextButton.children[0].color = "white",
        nextButton.children[0].fontSize = 38;

        nextButton.onPointerClickObservable.add(function(){
            switch(stepIndex++){
                case 0:
                    img1.source="statics/assets/guide/7.png";
                break;
                case 1:
                    img1.source="statics/assets/guide/8.jpg";
                break;
                case 2:
                    img1.source="statics/assets/guide/9.jpg";
                break;
                default:
                   // ui.rootContainer.
                     ui.layer?.dispose();
                    ready();
                break;
            }            
        });

        guide1.addControl(img1);
        ui.addControl(guide1)
          .addControl(nextButton);
    }
};

export default guide;