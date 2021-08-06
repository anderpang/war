import * as GUI from 'babylonjs-gui';
// import photoDome from "./photoDome";
import Photo360 from "./Photo360";
import ShowModel from "./ShowModel";
import VideoPanel from './VideoPanel';
import app from "../app";

function createDisplayPanel(scene:BABYLON.Scene){
  var alignTop=GUI.Control.VERTICAL_ALIGNMENT_TOP,
      alignBottom=GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
      alignLeft=GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

  var result:any={
      scrollViewIsReady:false,
      photo360:Object.create(null) as any,
      videoPlanel:null as VideoPanel|null,    // 用于在界面上暂停视频
      _likes:[],
      _data:null,
      _currentRecord:null,
      currentRecordName:"",
      _loadCommentFile:null,
      // 总记录 data目录下的
      updateData(fileName:string,recordName:string,x:number,y:number,z:number,yRotation:number){
        BABYLON.Tools.LoadFile(`statics/data/${fileName}.json`,(data:any)=>{
            var j=JSON.parse(data);
            var record=j[recordName];
            var smallButtonVisible:boolean[]=[
                !!record.photo360,  // 360全景图
                !!record.model3d,   // 3d模型 
                !!record.video,     // 视频
                !!record.link       // 链接
            ];

     
            this._data=data;
            this.currentRecordName=recordName;
            this._currentRecord=record;
            chineseTitle.text=record.title;
            englishTitle.text=record.english;
            sumaryText.text=record.content;
            englishTitle.left=chineseTitle.text.length*50+25;

            rectangle.isVisible=comment.isVisible=true;
            buttonWrap.top="220px";
            commentButton.textBlock!.text="展开评论(1K+)";
            sv.isVisible=false;  

            this.requestCommentList(function(data:any){
                (comment.children[1] as any).text=data[0];
            });

            plane.position.set(x,y,z);
            plane.rotation.y=yRotation;

            // 小按钮显示与排版位置
            var leftStep=60;
            var left=30;
            smallButtonList.forEach(function(button,index){
                button.isVisible=smallButtonVisible[index];
                if(button.isVisible){
                    button.left=left+"px";
                    left+=leftStep;
                }
            });
           
            // 是否点了赞
            likedImage.isVisible=result._likes.indexOf(recordName.split("_")[1])!==-1;

            result.show();
        });
        if(this._loadCommentFile){
            this._loadCommentFile.abort();
            this._loadCommentFile=null;
        }
        this.scrollViewIsReady=false;        
      },
      // 请求评论列表
      requestCommentList(cb:(data:any)=>void){
          var id=this.currentRecordName.split("_")[1];
          // var that=this;
          this._loadCommentFile=BABYLON.Tools.LoadFile(`statics/comments/${id}.json`,function(text:any){
              var j=JSON.parse(text);
             cb(j.data);
          });         
      }
  };

   var plane=BABYLON.MeshBuilder.CreatePlane("plane",{
       size:180
   },scene);

   plane.isVisible=false;

//    var giz=new BABYLON.PositionGizmo();
//    giz.attachedMesh=plane;

   var smallButtonList:any[]=[];

   var ui=GUI.AdvancedDynamicTexture.CreateForMesh(plane as any);

   var panel=new GUI.Rectangle("panel");
   //panel.background="#00000032";
   panel.width=1;
   panel.height=1;
   //panel.cornerRadius=12;
   panel.thickness=0;
   ui.addControl(panel);

   // 视频面板
   var videoPanel=new VideoPanel("",scene,240,240*9/16);
     //  videoPanel.rootNode!.position.y+=120;
   //    videoPanel.show("statics/assets/videos/exhibit1-picture2.mp4");
       videoPanel.hide(true);
       videoPanel.onChangeObservable.add(function(isShow){
          if(isShow){
              result.hide();
          }
          else{
              result.show();
          }
       });

       result.videoPanel=videoPanel;
//    ui.addControl(videoPanel);

//    var videoContainer=new GUI.Container();
//        videoContainer.width=1;
//        videoContainer.height=0.8;
//     ui.addControl(videoContainer);
//    var videoRect=new VideoPanel("");
//        videoRect.width=0.8;
//        videoRect.height=0.8;
//        videoRect.show("statics/assets/videos/exhibit1-picture2.mp4");
//     // var videoTexture=new BABYLON.VideoTexture("","statics/assets/videos/exhibit1-picture2.mp4",scene);
//     // videoRect.material=videoTexture;

//     videoContainer.addControl(videoRect);
   

   var rectangle=new GUI.Rectangle("rect");
   rectangle.height=0.5;
   rectangle.background="#FFFFFFCC";
   rectangle.thickness=0;
   rectangle.cornerRadius=10;
   rectangle.verticalAlignment=alignTop;
   rectangle.top="80px";
   panel.addControl(rectangle);
   

   // 中文标题
   var chineseTitle=new GUI.TextBlock("title-chinese");
   chineseTitle.textVerticalAlignment=alignTop;
   chineseTitle.textHorizontalAlignment=alignLeft;
   
   chineseTitle.text="";
   chineseTitle.fontSize=50;
   chineseTitle.paddingLeft=30;
   chineseTitle.paddingTop=30;
   
   rectangle.addControl(chineseTitle as any);

   // 英文标题
   var englishTitle=new GUI.TextBlock("title-chinese");
   englishTitle.textVerticalAlignment=alignTop;
   englishTitle.textHorizontalAlignment=alignLeft;
   
   englishTitle.text="";
   englishTitle.fontSize=35;
   englishTitle.paddingLeft=30;
   englishTitle.paddingTop=50;
   englishTitle.color="#404040A5";
      
   rectangle.addControl(englishTitle as any);

   // 水平线
   var line=new GUI.Line("line");
   line.x1=30;
   line.x2=995;
   line.y1=line.y2=110;
   line.color="#000";

   rectangle.addControl(line as any);

   // 简介
   //var sumaryText=new GUI.TextBlock("sumary");
   var sumaryText=new Word("sumary");
   sumaryText.text="";
   sumaryText.fontSize=35;
   sumaryText.color="#696969";
   sumaryText.textWrapping=true;
   sumaryText.textVerticalAlignment=alignTop;
   sumaryText.textHorizontalAlignment=alignLeft;
    sumaryText.width="95%";
    sumaryText.paddingTop=140;
    sumaryText.lineSpacing=12;
    // sumaryText.wordSplittingFunction=function(line:string){
    //     var lines:string[]=[],
    //         fontSize=35,
    //         width=990*0.95,
    //         count=0,
    //         start=0,
    //         end=0,
    //         countStep;
    //     for(var i=0,ii=line.length;i<ii;i++){
    //         countStep=line.charCodeAt(i)<256?0.5:1;            
    //         if(fontSize*(count+countStep)>width){            
    //            lines.push(line.substr(start,end));
    //            count=countStep;
    //            start+=end;
    //            end=1;
    //         }
    //         else{
    //             count+=countStep;
    //             end++;
    //         }
    //     }
    //     if(end>0){
    //         lines.push(line.substr(start,end));
    //     }
    //     return lines;
    // };
   
   rectangle.addControl(sumaryText);

   // 360
   var button360=GUI.Button.CreateImageOnlyButton("button360","statics/assets/360Button.png");
   button360.width="50px";
   button360.height="40px";
   button360.verticalAlignment=alignBottom;
   button360.horizontalAlignment=alignLeft;
  // button360.left="30px";
   button360.top="-10px";
   button360.thickness=0;
   button360.onPointerClickObservable.add(function(){
       // console.log("360");
       // photoDome.show(result._currentRecord.photo360);
       var record=result._currentRecord;
       var text=record.photo360;
       var map:any={
           "静海寺正门":"01",
           "刘公岛甲午战争纪念馆外景":"02"
       };
  
       var directory=map[text];
       if(result.photo360[directory]){
           result.photo360[directory].show(text);
       }
       else{
           let engine=scene.getEngine();
           let canvas=engine.getRenderingCanvas() as HTMLCanvasElement;
           result.photo360[directory]=new Photo360(directory,text,engine,canvas);
       }
   });   
   rectangle.addControl(button360);
   smallButtonList.push(button360);

   // 3d模型展示
   var buttonModel=GUI.Button.CreateImageOnlyButton("buttonModel","statics/assets/3DButton.png");
    buttonModel.width="50px";
   buttonModel.height="40px";
   buttonModel.verticalAlignment=alignBottom;
   buttonModel.horizontalAlignment=alignLeft;
  // buttonModel.left="30px";
   buttonModel.top="-10px";
   buttonModel.thickness=0;
   buttonModel.onPointerClickObservable.add(function(){
       // console.log("3d");
       var models=app.models,
           model3d=result._currentRecord.model3d,
           fileName=model3d.split("/").pop(),
           model=models[fileName];
        
        if(model){
            model.show();
        }
        else{
           models[fileName]=new ShowModel(scene.getEngine(),fileName);
        }        
   });
   rectangle.addControl(buttonModel);
   smallButtonList.push(buttonModel);

   // video
   var buttonVideo=GUI.Button.CreateImageOnlyButton("buttonVideo","statics/assets/videoButton.png");
   buttonVideo.width="50px";
   buttonVideo.height="40px";
   buttonVideo.verticalAlignment=alignBottom;
   buttonVideo.horizontalAlignment=alignLeft;
  // buttonVideo.left="30px";
   buttonVideo.top="-10px";
   buttonVideo.thickness=0;
   buttonVideo.onPointerClickObservable.add(function(){
      // console.log("video"); 
      let url=result._currentRecord.video;
      videoPanel.setPosition(plane.position,plane.rotation.y)
        .show("statics/assets/videos/"+url);   
   });
   rectangle.addControl(buttonVideo);
   smallButtonList.push(buttonVideo);

   // link
   var buttonLink=GUI.Button.CreateImageOnlyButton("buttonLink","statics/assets/link.png");
   buttonLink.width="50px";
   buttonLink.height="40px";
   buttonLink.verticalAlignment=alignBottom;
   buttonLink.horizontalAlignment=alignLeft;
  // buttonLink.left="90px";
   buttonLink.top="-10px";
   buttonLink.thickness=0;
   buttonLink.onPointerClickObservable.add(function(){
      // console.log("link");
       window.open(result._currentRecord.link);
   });
   rectangle.addControl(buttonLink); 
   smallButtonList.push(buttonLink);   

   // 按钮区域
   var buttonWrap=new GUI.Container("");
   buttonWrap.height=0.3;
   buttonWrap.top="220px";

   // 展开评论
   var commentButton=GUI.Button.CreateImageButton("commentButton","展开评论(1K+)","statics/assets/comment2.png");
   commentButton.width="310px";
   commentButton.height="60px";
   commentButton.image!.width="50px";
   commentButton.fontSize=35;
   commentButton.color="#FFFFFFCC";
   commentButton.thickness=0;
   commentButton.horizontalAlignment=alignLeft;
   commentButton.top="-80px";
   commentButton.left="30px";

   commentButton.onPointerClickObservable.add(function(){
     if(rectangle.isVisible){
         rectangle.isVisible=comment.isVisible=false;
         buttonWrap.top=-230;
         commentButton.textBlock!.text="收起评论(1K+)";

          // 填充滚动评论
         if(!result.scrollViewIsReady){
            result.scrollViewIsReady=true;
            result.requestCommentList(function(data:any){
                sv.verticalBar.value=0;
                updateCommentList(data,sv);                
                sv.isVisible=true;
            });
         }
         else{
           // sv.verticalBar.value=0;
            sv.isVisible=true;
         }
     }
     else{
         rectangle.isVisible=comment.isVisible=true;
         buttonWrap.top="220px";
         commentButton.textBlock!.text="展开评论(1K+)";
         sv.isVisible=false;        
     }
   });
   buttonWrap.addControl(commentButton);

   // 我要评论
   var sendButton=GUI.Button.CreateImageButton("commentButton","我要评论","statics/assets/ping.png");
   sendButton.image!.width="50px";
   sendButton.width="230px";
   sendButton.height="60px";
   sendButton.fontSize=35;
   sendButton.color="#FFFFFFCC";
   sendButton.thickness=0;
   sendButton.top="-80px";
   sendButton.left="60px";
   sendButton.onPointerClickObservable.add(function(){
       result.wantComment && result.wantComment();
   });
   buttonWrap.addControl(sendButton);

   // 点赞
   var likeButton=GUI.Button.CreateImageButton("commentButton","点赞(1K+)","statics/assets/like.png");   
   likeButton.image!.width="50px";
   likeButton.width="240px";
   likeButton.height="60px";
   likeButton.fontSize=35;
   likeButton.color="#FFFFFFCC";
   likeButton.thickness=0;
   likeButton.top="-80px";
   likeButton.left="380px";
   var likedImage=new GUI.Image("likeImage","statics/assets/like-a.png");
   likedImage.width="50px";
   likedImage.horizontalAlignment=alignLeft;
   likedImage.isVisible=false;
   likeButton.addControl(likedImage);

   likeButton.onPointerClickObservable.add(function(){
        if(!likedImage.isVisible){
            likedImage.isVisible=true;
            result._likes.push(result.currentRecordName.split("_")[1]);
        }
   });
   buttonWrap.addControl(likeButton);  
  
   // 精彩评论 title
   var commentTitle=new GUI.TextBlock("commentTitle","精彩评论");
   commentTitle.fontSize=35;
   commentTitle.color="#FFF";
   commentTitle.textHorizontalAlignment=alignLeft;
  // commentTitle.top="110px";
   commentTitle.left="30px";
   commentTitle.height="40px";
   buttonWrap.addControl(commentTitle);

   panel.addControl(buttonWrap);

   // 评论默认项
   var comment=createCommentItem("");
   comment.verticalAlignment=alignBottom;
   comment.top="-80px";
   panel.addControl(comment);

   result.ui=ui;
   result.wantComment=null;

   var cover=new GUI.Rectangle("cover");
   cover.height=1;
   cover.width=1;
   //cover.background="#FFFFFF00";
   cover.thickness=0;
   panel.addControl(cover);

   result.disable=function(){
       cover.isVisible=true;
   };
   result.enable=function(){
       cover.isVisible=false;
   };

   // 留言列表
   var sv=new GUI.ScrollViewer("");
   var svInner=new GUI.Container("");
   sv.height="480px";
   sv.thickness=0;
   sv.top="50px";
   sv.barSize=0;
   //sv.verticalBar.isVisible=sv.horizontalBar.isVisible=false;
   sv.barColor="#FFFFFF00";
   
  // svInner.verticalAlignment=alignTop;
  //  svInner.background="red"
   sv.addControl(svInner);
   sv.isVisible=false;
   panel.addControl(sv);

   result.enable();

   result.hide=function(){
     plane.isVisible=false;
   };
   result.show=function(){
     plane.isVisible=true;
   };
   result.isShow=function(){
       return plane.isVisible;
   };


   // 给mesh绑定面板事件
   result.bindMeshEvent=function(mesh:BABYLON.AbstractMesh,sc:BABYLON.Scene,fileName:string,keyName:string,x:number,y:number,z:number,yRotation:number){

    var manager=new BABYLON.ActionManager(sc);
    manager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            function(this:typeof result){
                videoPanel.hide(true);
                if(keyName!==this.currentRecordName){
                    this.updateData(fileName,keyName,x,y,z,yRotation);
                    this.enable();
                }
                else{
                if(this.isShow()){
                    this.disable();
                    this.hide();
                }
                else{
                    this.updateData(fileName,keyName,x,y,z,yRotation);
                    this.enable();
                }              
                }
        }.bind(this))
    );

   // mesh.isPickable=true;
    mesh.actionManager=manager;
 };

   return result;
}

function createCommentItem(text:string){
   var container=new GUI.Rectangle("commentBg");
   container.height="150px";
   container.cornerRadius=10;
   container.background="#FFFFFFCC";
   var icon=new GUI.Image("commentIcon","statics/assets/tou.png");
   icon.width="90px";
   icon.height="90px";
   icon.left="20px";
   icon.horizontalAlignment=GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   container.addControl(icon);

   var textBlock=new GUI.TextBlock("commentText",text);
   textBlock.fontSize=35;
   textBlock.color="#696969";
   textBlock.textVerticalAlignment=GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
   textBlock.textHorizontalAlignment=GUI.Control.VERTICAL_ALIGNMENT_TOP;
   textBlock.left="140px";
   textBlock.top="30px";
   container.addControl(textBlock);

    return container;
}

function updateCommentList(list:string[],sv:GUI.ScrollViewer){
    // 不知道原来是怎么挑选显示的，这里直接显示前N条(不纠结留言规则，只要显示效果)
    var height=150;
    var spacing=12;
    var alignTop=GUI.Container.VERTICAL_ALIGNMENT_TOP;
    var i=0,ii=Math.min(list.length,20),item;
    var svInner=sv.children[0] as GUI.Container;
    svInner.children.length=0;
    svInner.height=(height+spacing)*ii-spacing+"px";

    for(;i<ii;i++){
        item=createCommentItem(list[i+2]);
        item.verticalAlignment=alignTop;
        item.top=(height+spacing)*i+"px";
        svInner.addControl(item);
    }
}



// class Word extends GUI.Control{
//    constructor(name:string,public text:string=""){
//        super(name);
//    }

//    _draw(ctx:CanvasRenderingContext2D){
//        ctx.save();
//       // ctx.font="300px null";
//        ctx.fillText(this.text,10,160);
//        ctx.restore();
//    }
// }

class Word extends GUI.TextBlock{
    constructor(name:string,text?:string){
        super(name,text);
    }

    _breakLines(refWidth:number, context:CanvasRenderingContext2D) {
        var lines:{text:string,width:number}[] = [];
        var text=this.text;

        var fontSize=this.fontSizeInPixels,
            maxLines=6,  // 最多7行
            currentIndex=0,
            testLineLen=refWidth/fontSize|0,   // 预测每行字符数
            count=testLineLen,
            len=text.length,
            line:string,
            measureWidth:number,
            dir:number=0,  // 加减line字符方向,-1向左，0正好，1，向右
            pushLine=function(){
               //{ text: line, width: lineWidth }
                lines.push({
                    text:line,
                    width:measureWidth
                });
                currentIndex+=count;
                count=testLineLen;
                dir=0;
            };

        if(testLineLen>0){
            while(currentIndex<len){
                // 达到最大行数，最后的加省略号
                if(lines.length===maxLines){
                    line=lines[maxLines-1].text;
                    lines[maxLines-1].text=line.slice(0,-1)+"...";
                    break;
                }
                line=text.substr(currentIndex,count);

                measureWidth=context.measureText(line).width;

                if(measureWidth>refWidth){
                    if(dir===1){
                        pushLine();
                    }
                    else{
                       dir=-1;
                       count--;
                    }
                }
                else if(measureWidth<refWidth){
                    if(measureWidth+fontSize>refWidth){
                        pushLine();
                    }
                    else if(currentIndex+count>=len){
                        pushLine();
                        break;
                    }
                    else{
                        if(dir===-1){
                            pushLine();
                        }
                        else{
                            dir=1;
                            count++;
                        }
                        
                    }
                }
                else{
                    pushLine();
                }
            }
        }

       return lines;
    }
}

export default createDisplayPanel;