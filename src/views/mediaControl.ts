
/**
 * 音频视频控制
 */

var mediaControl={
      bgSound:null as HTMLAudioElement|null,
      bgButton:null as HTMLElement|null,
      isBgPlaying:false,

      showroomVideos:new Map<number,HTMLVideoElement[]>(),

      displayPanelVideo:null as HTMLVideoElement|null,

      currentShowroom:0,  // 展厅号

      initBgSound(canvas:HTMLCanvasElement){
          var that=this;
          var btn=document.querySelector(".sound-btn") as HTMLSpanElement;
          var audio=document.createElement("audio");
          audio.src="statics/assets/background.mp3";
          this.bgSound=audio;
          this.bgButton=btn;
          btn.addEventListener("click",function(){
             if(audio.paused){
               that.isBgPlaying=true;
               that.stop();
               audio.play();
               this.classList.add("is-playing");
             }
             else{
                that.isBgPlaying=false;
                audio.pause();
                this.classList.remove("is-playing");
             }
             canvas.focus();
          },false);
          btn.style.display="block";
      },

      stop(excludeVideo?:HTMLVideoElement){
        var videos=this.showroomVideos.get(this.currentShowroom);

        if(!videos){
            return this;
        }
        videos.forEach(function(video){
           if(video!==excludeVideo && !video.paused){
              video.pause();
           }
        });

        return this;
     },

     stopBgSound(){
        var bgSound=this.bgSound;
        if(bgSound && !bgSound.paused){
           bgSound.pause();
           this.bgButton?.classList.remove("is-playing");
        }

        return this;
     },

     resumeBgSound(){
        var bgSound=this.bgSound;

        if(this.isBgPlaying && bgSound && bgSound.paused){
            bgSound.play();
            this.bgButton?.classList.add("is-playing");
        }
        return this;
     },

     /**
      * 退出房间
      */
     exitRoom(){         
         this.stop()
             .resumeBgSound();  
         
         return this;
     },
     
     /**
      * 初始化墙上的视频
      * @param uniqueID number
      * @param fileName string 视频文件名
      * @param scene 
      * @returns BABYLON.Mesh
      */
     initWallVideo(showroomNO:number,uniqueID:number,fileName:string,scene:BABYLON.Scene):BABYLON.AbstractMesh{
        var mesh=scene.getMeshByUniqueID(uniqueID)!;
        var vc=this;
        var videos=vc.showroomVideos.get(showroomNO);
        if(!videos){
            videos=[] as HTMLVideoElement[];
            vc.showroomVideos.set(showroomNO,videos);
        }

        var actionManager=new BABYLON.ActionManager(scene);
        var onceHandle=actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function(this:any){
                   var videoTexture=new BABYLON.VideoTexture("","statics/video/"+fileName,scene);
                   var mat =new BABYLON.StandardMaterial("",scene);
                   var video=videoTexture.video;
                       mat.diffuseTexture=videoTexture;
                    mesh.material=mat;
    
                    vc.stop(video)
                      .stopBgSound();
                    videos!.push(video);
   
                    actionManager.unregisterAction(onceHandle!);
   
                    actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPickTrigger,
                            function(){
                                var video=videoTexture.video;                    
                                if(video.paused){
                                    vc.stop(video)
                                      .stopBgSound();;
                                    video.play();
                                }
                                else{
                                    video.pause();
                                    vc.resumeBgSound();
                                }
                            }
                        )
                    );
                }
            )
        );
   
        mesh.actionManager=actionManager;
        // mesh.isPickable=true;
        return mesh;
    }
};

export default mediaControl;