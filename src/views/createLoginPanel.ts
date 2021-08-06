import * as GUI from "babylonjs-gui";

function createLoginPanel(scene:BABYLON.Scene){
   var alignTop=GUI.Control.VERTICAL_ALIGNMENT_TOP,
      alignBottom=GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      alignLeft=GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

   var result:any={};

   var ui=GUI.AdvancedDynamicTexture.CreateFullscreenUI("login",true,scene as any);
   ui.rootContainer.isVisible=false;
   var panel=new GUI.Rectangle("login-panel");
   panel.width="400px";
   panel.height="440px";
   panel.background="#FFFFFFCC";
   panel.color="#696969";
   panel.cornerRadius=20;
   panel.thickness=0;
   ui.addControl(panel);

   var textBlock=new GUI.TextBlock("","您好\n请登录");
   textBlock.fontSize=48;
   textBlock.fontWeight="300";
   textBlock.textVerticalAlignment=alignTop;
   textBlock.textHorizontalAlignment=alignLeft;
   textBlock.left="30px";
   textBlock.top="30px";   
   panel.addControl(textBlock);
   
   var textBlock2=new GUI.TextBlock("","HELLO\nPLEASE LOGIN");
   textBlock2.fontSize=24;
   textBlock2.fontWeight="200";
   textBlock2.textVerticalAlignment=alignTop;
   textBlock2.textHorizontalAlignment=alignLeft;
   textBlock2.color="#404040A5";
   textBlock2.left="190px";
   textBlock2.top="82px"; 
   panel.addControl(textBlock2);

   // 输入框 
   var input1 = createInputItem("statics/assets/account--X.png","请输入账号");
   var input2 = createInputItem("statics/assets/password--X.png","请输入密码",true);
   input1.top="-30px";
   input2.top="35x";

   panel.addControl(input1).addControl(input2);

   // 提交按钮
   var submitButton=GUI.Button.CreateSimpleButton("","登录学习");
   submitButton.color="#FFF";
   submitButton.background="#D00";
   submitButton.height="40px";
   submitButton.width="80%";
   submitButton.top="120px";
   submitButton.onPointerClickObservable.add(function(){
      alert("死了这条心吧\n未实现后台逻辑");
      hide();
   });
   submitButton.cornerRadius=50;
   panel.addControl(submitButton);

   // 随便看看
   var button1=GUI.Button.CreateSimpleButton("","随便看看");
   var button2=GUI.Button.CreateSimpleButton("","我要注册");
   button1.height=button2.height="40px";
   button1.width=button2.width="140px";
   button1.horizontalAlignment=alignLeft;

   button2.horizontalAlignment=GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
   button1.verticalAlignment=button2.verticalAlignment=alignBottom;
   button1.top=button2.top="-20px";
   button1.left="40px";
   button2.left="-40px";
   button1.cornerRadius=button2.cornerRadius=40;
   button1.color=button2.color="#696969";

   button1.onPointerClickObservable.add(hide);
   button2.onPointerClickObservable.add(function(){
      alert("没注册功能！");
      hide();
   });
   
   panel.addControl(button1)
      .addControl(button2);

   function hide(){
      ui.rootContainer.isVisible=false;
      result.hideCallback && result.hideCallback();
   }

   function show(){
      ui.rootContainer.isVisible=true;
      result.showCallback && result.showCallback();
   }

   result.ui=ui;
   result.hide=hide;
   result.show=show;
   result.showCallback=null as any;
   result.hideCallback=null as any;

   return result;
}

function createInputItem(iconUrl:string,placehold:string,isPassword:boolean=false){
   var container=new GUI.Container("");
   container.height="36px";
   var icon=new GUI.Image("",iconUrl);
   icon.width="80%";
   container.addControl(icon);
   var input = isPassword?new GUI.InputPassword():new GUI.InputText();
   input.placeholderText=placehold;
   input.width = "150px";
   input.height = 1;
   input.color="#000";
   input.fontSize=20;
   input.background=input.focusedBackground = "#FFFFFF00";
   input.thickness = 0;
   input.width=0.6;

   container.addControl(input);

   // var line=new GUI.Line("");
   // line.x1=30;
   // line.y1=line.y2=50;
   // line.x2=360;
   // line.color="#000";
   // container.addControl(line);

   return container;
}

export default createLoginPanel;