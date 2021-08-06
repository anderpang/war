import "babylonjs-loaders";
import app from "./app";
import createDisplayPanel from "./views/createDisplayPanel";
import createLoginPanel from "./views/createLoginPanel";
// import photoDome from "./views/photoDome";
// import Photo360 from "./views/Photo360";
import mediaControl from "./views/mediaControl";

import guide from "./views/guide";
import lobby from "./views/lobby";
import showroom1 from "./views/showroom-1";
import showroom2 from "./views/showroom-2";
import showroom3 from "./views/showroom-3";
import showroom4 from "./views/showroom-4";
import showroom5 from "./views/showroom-5";
import showroom6 from "./views/showroom-6";
import showroom7 from "./views/showroom-7";
import showroom8 from "./views/showroom-8";
import showroom9 from "./views/showroom-9";
import showroom10 from "./views/showroom-10";
import showroom11 from "./views/showroom-11";
import showroom12 from "./views/showroom-12";
import showroom13 from "./views/showroom-13";

// import Question from "./views/Question";

// BABYLON.Database.IDBStorageEnabled = true;

var canvas = document.querySelector("#renderCanvas") as HTMLCanvasElement;
var engine = new BABYLON.Engine(canvas, true);

//photoDome.init(engine);

var scene = new BABYLON.Scene(engine);

// var light=new BABYLON.HemisphericLight("light1",BABYLON.Axis.Y,scene);
// var camera=new BABYLON.ArcRotateCamera("camera1",-Math.PI/2,Math.PI/2.5,1880,BABYLON.Vector3.Zero(),scene)
// camera.setTarget(new BABYLON.Vector3(-300,0,1500));
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 130, -110), scene);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
engine.setSize(canvas.width, canvas.height);


// scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

new BABYLON.HemisphericLight('light', BABYLON.Axis.Y, scene);
scene.ambientColor = BABYLON.Color3.White();
scene.clearColor.set(158 / 225, 156 / 225, 143 / 225, 1);

// setTimeout(function(){photoDome.show("静海寺正门")},500);
app.sceneMain = app.currentScene = scene;

// new Question(json.house1,function(){
//     // 关闭锁头图标
//     console.log("close")
// });

// 默认loading
var loadingUI = document.querySelector(".loading-ui") as HTMLElement;
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    var span = loadingUI.querySelector("span") as HTMLElement;
    span.textContent = "0%";
    (<any>this)._loadingTextDiv = span;
    loadingUI.style.display = "block";

};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
    // 此处把displayLoadingUI里的showDiv给处理掉即可
    loadingUI.style.display = "none";
};

Object.defineProperty(BABYLON.DefaultLoadingScreen.prototype, "loadingUIText", {
    get: function () {
        return this._loadingText;
    },
    /**
     * Gets or sets the text to display while loading
     */
    set: function (text) {
        var _loadingTextDiv = this._loadingTextDiv;
        _loadingTextDiv.textContent = text;
        _loadingTextDiv.parentNode.style.width = text;
    }
});



BABYLON.SceneLoader.Append("statics/assets/", "JWHZ.babylon", scene, function (sc) {
    var meshes = sc.meshes;
    meshes.forEach(function (m) {
        // m.enableEdgesRendering();
        // m.edgesWidth=40;
        m.checkCollisions = true;
    });


    sc.ambientColor = BABYLON.Color3.White();
    sc.collisionsEnabled = true;
    sc.gravity.y = -9.8; // 模型把重力给清了，所以再赋值一次

    // var ground=BABYLON.MeshBuilder.CreateGround("g",{width:500,height:500},scene);
    // ground.checkCollisions=true;
    // ground.position.y=5;
    // ground.visibility=0;
    // 地板
    //var ground=scene.getMeshByUniqueID(134)!;
    var ground = meshes[1];
    // ground.edgesWidth=100;
    ground.checkCollisions = true;
    // ground.enableEdgesRendering(); 


    // 墙体加点击事件，防止actionManager点到对面物体
    //let walls=[132,160,654,644,1196,178,692,1106,908,788,922,944,1078,1110,678,698,704,702];
    let walls = [132];
    let actionManager = new BABYLON.ActionManager(scene);
    actionManager.hoverCursor = "default";
    walls.forEach(function (num) {
        let mesh = scene.getMeshByUniqueID(num)!
        mesh.isPickable = true;
        mesh.actionManager = actionManager;
    });

    // 引导层
    guide.init(sc, function () {
        // console.log("all ready");

        camera.speed = 6;
        // camera.rotation.x=0.11;
        camera.ellipsoid.set(40, 65, 40);
        camera.keysDown.push("S".charCodeAt(0));
        camera.keysUp.push("W".charCodeAt(0));
        camera.keysLeft.push("A".charCodeAt(0));
        camera.keysRight.push("D".charCodeAt(0));
        camera.attachControl(canvas, true);
        // scene.forceWireframe=true;
        camera.applyGravity = true;
        camera.checkCollisions = true;

        mediaControl.initBgSound(canvas);

        // 面板
        var displayPanel = createDisplayPanel(scene);
        // 登录界面
        var loginPanel = createLoginPanel(scene);

        displayPanel.wantComment = function () {
            this.disable();
            loginPanel.show();
        };

        loginPanel.showCallback = function () {
            displayPanel.disable();
        };

        loginPanel.hideCallback = function () {
            displayPanel.enable();
        };

        // 前厅
        lobby.init(sc, canvas);

        // 一厅(走廊)
        showroom1.init(sc, displayPanel);

        // 二厅
        showroom2.init(sc, displayPanel);

        // 三厅（走廊）
        showroom3.init(sc, displayPanel);

        // 四厅
        showroom4.init(sc, displayPanel);

        showroom5.init(sc, displayPanel);

        showroom6.init(sc, displayPanel);

        showroom7.init(sc, displayPanel);

        showroom8.init(sc, displayPanel);

        showroom9.init(sc, displayPanel);

        showroom10.init(sc, displayPanel);

        showroom11.init(sc, displayPanel);

        showroom12.init(sc, displayPanel);

        showroom13.init(sc, displayPanel);
    });


}, function (e) {
    var p = 0,
        n = "0%";

    if (e.lengthComputable) {
        p = 100 * e.loaded / e.total;
        n = Math.floor(p) + "%";
        engine.loadingScreen.loadingUIText = n;
    }
});

// new Photo360("01","静海寺正门",engine,canvas);
// new Photo360("02","刘公岛甲午战争纪念馆外景",engine,canvas);

engine.runRenderLoop(function () {
    //scene.render();
    app.currentScene!.render();
});

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
});