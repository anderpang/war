import app from "../app";
import mediaControl from "./mediaControl";

var room = {

    enter: null as any,
    exit: null as any,

    /**
     * 前厅
     * @param scene 
     */
    init: function (sc: BABYLON.Scene,canvas:HTMLCanvasElement) {
        var videos:HTMLVideoElement[]=[];
        var showroomNO=0;

        // 视频
        var pic = sc.getMeshByUniqueID(176)!;
        var video = document.createElement("video");
        video.src = "statics/video/lobby.mp4";
        videos.push(video);
        mediaControl.showroomVideos.set(showroomNO,videos);

        // pic.enableEdgesRendering();

        // 点击启动视频
        // canvas.addEventListener("click", function () {
        //     var videoTexture = new BABYLON.VideoTexture("video", video, sc);
        //     var mat = new BABYLON.StandardMaterial("mat", sc);
        //     mat.diffuseTexture = videoTexture;
        //     pic.material = mat;
        // }, {
        //     once: true
        // });

        // 上一个写法对稍低版本浏览器兼容不好，故用这个
        let startVideoHandle=function(){
            var videoTexture = new BABYLON.VideoTexture("video", video, sc);
            var mat = new BABYLON.StandardMaterial("mat", sc);
            mat.diffuseTexture = videoTexture;
            pic.material = mat;
            canvas.removeEventListener("click",startVideoHandle,false);
        };
        canvas.addEventListener("click",startVideoHandle,false);

        var actionManager = new BABYLON.ActionManager(sc);
        actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger, function () {
                if (video.paused) {
                    mediaControl.stopBgSound();
                    video.play();
                }
                else {
                    video.pause();
                    mediaControl.resumeBgSound();
                }
            }
        ));
        // pic.isPickable = true;
        pic.actionManager = actionManager;

        // 碰撞开启
        // 柜子，柱
        // [158,162].forEach(function(uniqueID){
        //     var m=sc.getMeshByUniqueID(uniqueID)!;
        //     m.edgesWidth=40;
        //     m.enableEdgesRendering();

        //     sc.getMeshByUniqueID(uniqueID)!.checkCollisions=true;
        // });

        // 右门
        var m = sc.getMeshByUniqueID(1206);
        var checkBox = BABYLON.MeshBuilder.CreateBox("box", { width: 260, height: 300, depth: 20 }, sc);
        checkBox.setParent(m);
        // checkBox.position.set(-592.508,155.999,656.561);
        checkBox.position.set(0, 0, -10);
        checkBox.visibility = 0;
        checkBox.checkCollisions = true;

        // 入口
        var enter = sc.getMeshByUniqueID(204)!;
        enter.material!.backFaceCulling = false;
        var child = BABYLON.MeshBuilder.CreateBox("", { width: 200, height: 300, depth: 50 }, sc);
        child.position = enter.position.clone();
        child.checkCollisions = true;
        child.isVisible = false;
        enter.checkCollisions = false;
        enter.addChild(child);
       // enter.enableEdgesRendering();

        // (enter as BABYLON.Mesh).sideOrientation=2;

        // 左门
        var ld = BABYLON.MeshBuilder.CreateBox("box", { width: 260, height: 300, depth: 300 }, sc);
        var camera = sc.activeCamera as BABYLON.FreeCamera;
        ld.position.set(590, 150, 500);
        ld.visibility = 0;

        var previousAnima: BABYLON.Animatable | null;
        var doorIsOpen = false;
        var doorHandle = function () {
            // 靠近左门
            if (ld.intersectsPoint(camera.position)) {

                // Animation.CreateAndStartAnimation = function(name, mesh, targetProperty, framePerSecond, totalFrame, from, to, loopMode);

                if (doorIsOpen) {
                    return;
                }
                if (previousAnima) {
                    previousAnima.stop();
                }
                doorIsOpen = true;

                previousAnima = BABYLON.Animation.CreateAndStartAnimation("", enter, "position.x", 30, 30, enter.position.x, 0, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
            } else {
                if (!doorIsOpen) {
                    return;
                }
                if (previousAnima) {
                    previousAnima.stop();
                }
                doorIsOpen = false;
                previousAnima = BABYLON.Animation.CreateAndStartAnimation("", enter, "position.x", 30, 30, enter.position.x, 590, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
            }
        };

        this.enter = function () {
            if($IS_DEV){
                console.log("前厅 enter");
            }
            sc.registerBeforeRender(doorHandle);
            pic.isPickable = true;
        };

        this.exit = function () {
            if($IS_DEV){
                console.log("前厅 exit");
            }
            sc.unregisterBeforeRender(doorHandle);
            if (!video.paused) {
                video.pause();
            }

            pic.isPickable = false;
        };

        // 房间盒子
        var houseBox = BABYLON.MeshBuilder.CreateBox("house-box", { width: 1000 * 1.6, height: 300 * 2.6, depth: 500 * 2.6 }, sc);

        //houseBox.visibility = 0.5;
        // houseBox.enableEdgesRendering();
        // houseBox.edgesWidth = 50;
        app.roomInit(houseBox, sc, this);

        //  var gizmoManager = new BABYLON.GizmoManager(sc);
        //  gizmoManager.attachToMesh(houseBox);
        //  gizmoManager.scaleGizmoEnabled=true;

        // var actionManager=new BABYLON.ActionManager(sc);
        // var previousAnima:BABYLON.Animatable|null;
        //  actionManager.registerAction(
        //      new BABYLON.ExecuteCodeAction({
        //         trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
        //         parameter:camera
        //      },function(){
        //          if(previousAnima){
        //              previousAnima.stop();
        //          }
        //          video.pause();
        //          previousAnima=BABYLON.Animation.CreateAndStartAnimation("",enter,"position.x",30,30,enter.position.x,0,BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
        //      })
        //  );

        //  ld.actionManager=actionManager

        
        if($IS_DEV){
            document.addEventListener("keydown",function(e){
                if(e.key==="."){
                    if(sc.debugLayer.isVisible()){
                        sc.debugLayer.hide();
                    }
                    else{
                        sc.debugLayer.show();
                    }
                }

                if(e.keyCode===32){
                    //camera.cameraDirection.y+=25;
                    // camera.position=new BABYLON.Vector3(0,130,-110);
                    // camera.position=new BABYLON.Vector3(562,135,2364);  // 第三厅位置
                    // camera.position=new BABYLON.Vector3(590,135,4320);  // 第五厅位置
                    // camera.position=new BABYLON.Vector3(590,135,6220);  // 第七厅位置（后厅）
                     camera.position=new BABYLON.Vector3(-976,135,5813);  // 八厅
                    //   camera.position=new BABYLON.Vector3(-670,135,4820);  // 九厅
                    // camera.position=new BABYLON.Vector3(-808,135,2329);  // 十二厅
                }
            });
        }
    }
};



export default room;