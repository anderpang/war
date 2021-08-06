import * as GUI from "babylonjs-gui";
import app from "../app";
import Loading from "./Loading";

class Photo360{
    list:any=null;
    
    scene:BABYLON.Scene|null=null;
    dome:BABYLON.PhotoDome|null=null;
    intro:GUI.Container|null=null;
    thumbs:GUI.Container|null=null;
    
    photoTextures=new Map();

    loading=new Loading();

    // onExitObservable=new BABYLON.Observable();

    constructor(public directory:string,public keyName:string,engine:BABYLON.Engine,canvas:HTMLCanvasElement){
        var loading=this.loading;
        var scene:BABYLON.Scene=new BABYLON.Scene(engine);

        // 360的相机
        var camera360=new BABYLON.ArcRotateCamera("",2.3,1.8,1,BABYLON.Vector3.Zero(),scene);
            camera360.useAutoRotationBehavior=true;  
            camera360.autoRotationBehavior!.idleRotationSpeed*=-1;
            camera360.maxZ=15000;
            camera360.attachControl(canvas,true);

        this.scene=scene;
        app.sceneChange(scene);

       // loading.show();

        BABYLON.Tools.LoadFile("statics/data/360.json",(data:string|ArrayBuffer)=>{
            var list=JSON.parse(data as string);
            var item=list[keyName];        
   
            var dome = new BABYLON.PhotoDome(
                "photo360",
                `statics/assets/360/${directory}/${item.path}`,
                {
                    resolution: 32,
                    size: 1520*4
                },
                scene
            );

            this.list=list;
            
            dome.photoTexture.onLoadObservable.addOnce(()=>{
                this._initGUI(item,scene);
               // loading.hide();                
            });  

            this.dome=dome;
        });
    }

    _initGUI(item:any,scene:BABYLON.Scene){
        var mode=this;
        var list=this.list;
        var keyName=this.keyName;
        var alignTop=GUI.Control.VERTICAL_ALIGNMENT_TOP;
        var alignLeft=GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        var alignRight=GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        var alignBottom=GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        var ui=GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui360",true,scene as any);
    
        var intro=new GUI.Container("");
        // intro.background="blue"
        var img=new GUI.Image("",item.intro?`statics/assets/360/${this.directory}/${item.intro.path}`:"");
        var closeBtn=GUI.Button.CreateImageOnlyButton("","statics/assets/360/close.png");
        intro.widthInPixels=716+40*2;// "716px";
        if(item.intro){
          intro.heightInPixels=item.intro.height+40;
          img.heightInPixels=item.intro.height;
        }
        else{
            intro.isVisible=false;
        }
         
        closeBtn.width="40px";
        closeBtn.height="40px";
        closeBtn.thickness=0;
        closeBtn.verticalAlignment=alignTop;
        closeBtn.horizontalAlignment=alignLeft;
        // closeBtn.top="-60px";
        closeBtn.onPointerClickObservable.add(function(){
            intro.isVisible=false;
        });        
        img.width=0.9;
        img.verticalAlignment=alignBottom;      
    
        intro.addControl(img)
           .addControl(closeBtn);
        
        ui.addControl(intro);
        this.intro=intro;
    
        var quitButton=GUI.Button.CreateImageOnlyButton("","statics/assets/360/quit.png");
        quitButton.width="50px";
        quitButton.height="50px";
        quitButton.thickness=0;
        quitButton.verticalAlignment=alignTop;
        quitButton.horizontalAlignment=alignRight;
        quitButton.top="20px";
        quitButton.left="-20px";
        quitButton.onPointerClickObservable.add(function(){
            app.sceneChange("sceneMain");
        });
        ui.addControl(quitButton);
    
        var thumbs=new GUI.Container("");
            thumbs.height="110px";
            thumbs.background="#00000045";
            thumbs.verticalAlignment=alignBottom;
            thumbs.top="-50px";
        ui.addControl(thumbs);
        this.thumbs=thumbs;
    
        // 缩略图 
        var lks=item.links,
            len=lks.length,
            outWidth=116,
            left=-outWidth*(len+1)/2;
 
        for(var i=0;i<len;i++){
            let text=lks[i];
            let hasEllipsis=text.length>6;
            if(hasEllipsis){
                text=text.substr(0,5)+"...";
            }
            let button=GUI.Button.CreateImageWithCenterTextButton(lks[i],text,`statics/assets/360/${this.directory}/${list[lks[i]].thumbnail}`);
            let textBlock=button.textBlock!;
            let bg=new GUI.Container("");
            bg.background="#000000B2";
            bg.height="20px";
            bg.verticalAlignment=alignBottom;
        
            left+=outWidth;

            button.left=left+"px";
            button.width="100px";
            button.height="100px";
            button.thickness=3;
            if(lks[i]===keyName){
                button.color="#FFA500";
            }
            button.fontSize=14;
            textBlock.textVerticalAlignment=alignBottom;
            textBlock.color="#FFF";
            textBlock.top="-2px";
            button.removeControl(textBlock);
            button.addControl(bg);
            button.addControl(textBlock);
            button.onPointerClickObservable.add(function(this:string){
               mode.show(this);
            }.bind(lks[i]));
            thumbs.addControl(button);
        }
    }

    show(keyName:string){
        if(keyName===this.keyName){
            return;
        }
        this.keyName=keyName;

        // let engine=scene.getEngine();
        let scene=this.scene!;
        let list=this.list;
        let item=list[keyName];
        let dome=this.dome!;
        let photoTextures=this.photoTextures;
        let photoTexture:any=photoTextures.get(keyName);
        let intro=this.intro!;
        let loading=this.loading;
        let thumbsChild=this.thumbs!.children as GUI.Button[];

        app.sceneChange(scene);
       // this.onExitObservable.notifyObservers(scene,true);

        if(!photoTexture){
            loading.show();
            photoTexture=new BABYLON.Texture(`statics/assets/360/${this.directory}/${item.path}`,scene,false,false);
            photoTexture.onLoadObservable.addOnce(function(){
              loading.hide();
            });
            photoTextures.set(keyName,photoTexture);
        }

        dome.photoTexture=photoTexture;

        // 介绍
        if(item.intro){
            let img=intro.children[0] as GUI.Image;
            img.source=`statics/assets/360/${this.directory}/${item.intro.path}`;
            img.widthInPixels=item.intro.width;
            img.heightInPixels=item.intro.height;
            intro.heightInPixels=item.intro.height+40;
            intro.isVisible=true;
        }
        else{
            intro.isVisible=false;
        }

        thumbsChild.forEach(function(btn){
            if(btn.name===keyName){
                btn.color="#FFA500";
            }
            else{
                btn.color="#FFF";
            }
        });
    }

    // hide(){
    //    // this.onExitObservable.notifyObservers(this.scene,false);
    //    app.sceneChange("")
    // }
}

export default Photo360;