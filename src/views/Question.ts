/**
 * 创建问题
 */
import * as GUI from "babylonjs-gui";
import app from "../app";

interface IQuestion {
    "type": string,
    "index": number,
    "question": string,
    "options": string[],
    "answer"?: number,
    "answers"?: number[],
    userAnswer?: number
}

interface INewQuestion{
    bind:()=>void,
    unbind:()=>void
}

class Question {
    width: number = 600;
    height: number = 600;
    bodyHeight: number = 0;
    success:null|Function=null;

    _index: number = 0;
    _ui: GUI.AdvancedDynamicTexture | null = null;
    _container: GUI.Container | null = null;
    _closeButton: GUI.Button | null = null;
    _indexTitle: GUI.TextBlock | null = null;
    _subject: GUI.TextBlock | null = null;
    _bodyHeader: GUI.Rectangle | null = null;
    _titleText: GUI.TextBlock | null = null;
    _optionsContainer: GUI.Container | null = null;
    _passImage: GUI.Image | null = null;
    _rightImage: GUI.Image | null = null;
    _errorImage: GUI.Image | null = null;

    _questions: IQuestion[] | null = null;

    _userAnswers: number[] = [];

    static CreateNew=function(name:string,sc:BABYLON.Scene,position:BABYLON.Vector3,questionKey:string,meshUniqueID:number):INewQuestion{
        
        var question=Object.create(null);
        var cache:Question;

        let plane=BABYLON.MeshBuilder.CreatePlane(name,{size:50},sc);
        plane.position=position;
       // question.plane=plane;
    
        let lockUI=GUI.AdvancedDynamicTexture.CreateForMesh(plane as any);
        let lockButton=GUI.Button.CreateImageOnlyButton("","statics/assets/lock.png");
        let lockHandle:any;
        lockButton.thickness=0;    
        lockUI.addControl(lockButton);

        question.bind=function(){
            lockHandle=lockButton.onPointerClickObservable.add(function(){
                if(cache){
                    cache.show();
                }
                else{
                    app.getQuestion(questionKey).then(function(data:any){
                        cache=new Question(data,function(){
                            // 关闭锁头图标
                            plane.setEnabled(false);
                            // 移开障碍物
                            sc.getMeshByUniqueID(meshUniqueID)!.setEnabled(false);
                        });
                    });
                }
              
            });
        };

        question.unbind=function(){
            lockButton.onPointerClickObservable.remove(lockHandle);
        };

        return question;        
    }

    constructor(questions: IQuestion[],success:()=>void) {
        this._questions = questions;
        this.success=success;
        var ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("quesitonUI");
        var container = new GUI.Container();
        var topContainer = this._createTop();
        var buttons = this._createButtons();
        var bodyContainer = this._createBody(questions[0]);
        var rootContainer = ui.rootContainer;
        var closeButton = GUI.Button.CreateImageOnlyButton("", "statics/assets/close.png");
        var pass = new GUI.Image("", "statics/assets/pass.png");
        rootContainer.widthInPixels = this.width;
        rootContainer.heightInPixels = this.height;
        closeButton.widthInPixels = 59;
        closeButton.heightInPixels = 59;
        closeButton.thickness = 0;
        closeButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        closeButton.onPointerClickObservable.add(() => {
            this.hide();
        });

        this._setAnswer(questions);

        pass.widthInPixels = 122 * 3;
        pass.heightInPixels = 54 * 3;
        pass.isVisible = false;

        this._container = container;
        this._passImage = pass;
        this._closeButton = closeButton;

        container.addControl(topContainer)
            .addControl(bodyContainer)
            .addControl(buttons[0])
            .addControl(buttons[1])
            .addControl(closeButton);

        ui.addControl(container)
            .addControl(pass);

        closeButton.top = this.bodyHeight + "px";
        this._ui = ui;
        this._userAnswers = questions.map(function () {
            return -1;
        });

    }

    _success() {
        var rootContainer = this._ui!.rootContainer;
        var alpha = 3;
        // var QueueNewFrame=BABYLON.Tools.QueueNewFrame;
        this._container!.isVisible =
            this._container!.isEnabled = false;

        this._passImage!.isVisible = true;

        if(this.success){
            this.success();
        }
        // 渐隐
        function run() {           
            
            if (alpha > 0) {
                requestAnimationFrame(run);
                rootContainer.alpha = Math.min(1,alpha);
            }
            else {
                rootContainer.isVisible =
                    rootContainer.isEnabled = false;
            }
            alpha -= 0.04;
        }
        run();
        // BABYLON.Animation.CreateAndStartAnimation("",this._ui!.rootContainer,"visible",30,30,1,0)
    }

    show() {
        var rootContainer = this._ui!.rootContainer;
        rootContainer.isVisible =
            rootContainer.isEnabled = true;
    }

    hide() {
        var rootContainer = this._ui!.rootContainer;
        rootContainer.isVisible =
            rootContainer.isEnabled = false;
    }

    setCurrentIndex(dir: -1 | 1) {
        var _index = this._index;
        var questions = this._questions!;
        _index = Math.max(0, _index + dir);
        let question = questions[_index];
        this._index = _index;
        this.bodyHeight = 90 + 40;
        this._indexTitle!.text = `(${_index + 1}/${questions.length})`;

        this._subject!.text = "知识问答 (" + question.type + ")";
        this._updateTitle(question.question);
        this._createOptions(question.options,question);
        this._checkAnswer(question,false);
        // this._ui!.rootContainer.height=this.bodyHeight+"px";
        this._closeButton!.top = this.bodyHeight + "px";
    }

    _setAnswer(questions: IQuestion[]) {
        questions.forEach(function (question) {
            var result: number;
            if (question.type === "多选题") {
                result = 0;
                question.answers!.forEach(function (n, i: number) {
                    result |= 1<<(n-1);
                });
                question.answer = result;  // 二进制
            }
            
            // 单选直接存值，多选用二进制
            question.userAnswer = 0;
        });
    }

    _updateTitle(text: string) {
        var titleText = this._titleText!;
        var bodyHeader = this._bodyHeader!;
        titleText.text = text;
        bodyHeader.heightInPixels = 50 + Math.ceil(text.length / 24) * (18 + 5) + 20;

        this._optionsContainer!.top = bodyHeader.heightInPixels + 20 + "px";

        this.bodyHeight += bodyHeader.heightInPixels + 20;
    }

    _createOptions(options: string[],question:IQuestion) {
        var _optionsContainer = this._optionsContainer!;
        var maxLen = 0;
        var itemHeight = 50;
        var _index=this._index;

        _optionsContainer.children.length = 0;
        options.forEach(function (text) {
            var len = text.length;
            if (len > maxLen) {
                maxLen = len;
            }
        });

        if (maxLen < 12) {
            options.forEach((option, i) => {
                var item = this._createOption(option, _index,i,question);
                item.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                item.width = 0.48;

                item.horizontalAlignment = i & 1 ?
                    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT :
                    GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

                item.top = (itemHeight * (i / 2 | 0)) + "px";

                _optionsContainer.addControl(item);
            });

            this.bodyHeight += itemHeight * 2;
        }
        else {
            let heightCount = 0;
            options.forEach((option, i) => {
                var item = this._createOption(option, _index,i,question);
                item.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                item.top = heightCount + "px";
                heightCount += itemHeight;
                heightCount += (Math.ceil(option.length / 24) - 1) * (16 + 5 + 15);  // fontSize + lineSpacing + 间隙       

                _optionsContainer.addControl(item);
            });

            this.bodyHeight += heightCount;
        }
    }

    _createOption(option: string, questionIndex:number,optionIndex:number,quesiton:IQuestion) {

        var btn = GUI.Button.CreateSimpleButton("", option);
        var text0 = btn.children[0] as GUI.TextBlock;
        var text = new TextLine("", option);
        var color:string="#696969",
            background:string="#ffffffB2";
        text.fontSize = 16;
        text.lineSpacing = 5;

        if(quesiton.userAnswer!>0){
            if(quesiton.type==="多选题"){
                color="#696969";
                background="#ffffffB2";           
            }
            else{
               if(optionIndex+1===quesiton.userAnswer){
                  color="#FFF";
                  background="#D82E2D";
               }
            }
        }

        btn.background = background;
        btn.color = color;

        btn.cornerRadius = 5;
        btn.thickness = 0;
        btn.heightInPixels = Math.ceil(option.length / 24) * (16 + 20);        

        btn.removeControl(text0);
        btn.addControl(text);

        btn.onPointerClickObservable.add(()=>{
            var question=this._questions![questionIndex];
            var answer:number;
            if(question.type==="多选题"){
                answer=1<<optionIndex;

                if((question.userAnswer!&answer)>0){
                   // 取消
                   btn.color = "#696969";
                   btn.background = "#ffffffB2"; 
                   question.userAnswer!^=answer;                  
                }
                else{ 
                    // 已选
                    btn.color="#FFF";
                    btn.background="#D82E2D";
                    question.userAnswer!|=answer;
                }                
            }
            else{
                let oldUserAnswer=question.userAnswer!;
                if(oldUserAnswer!==0){
                   let oldBtn=this._optionsContainer!.children[oldUserAnswer-1] as GUI.Button;
                   oldBtn.color = "#696969";
                   oldBtn.background = "#ffffffB2";
                }

                answer=optionIndex+1;
                if(question.userAnswer===answer){
                    // 取消
                    btn.color = "#696969";
                    btn.background = "#ffffffB2";
                    question.userAnswer=answer;
                 }
                 else{
                     // 已选
                     btn.color="#FFF";
                     btn.background="#D82E2D";
                     question.userAnswer=answer;
                 }
            }            
            
            this._checkAnswer(question,true);
            
        });

        return btn;
    }

    // 检查单题
    _checkAnswer(question:IQuestion,isCheckAll:boolean){
        var _rightImage=this._rightImage!,
            _errorImage=this._errorImage!;

        _rightImage.isVisible=
        _errorImage.isVisible=false;

        if(question.userAnswer!>0){     
        
            // 答对
           // console.log(question.answer,question.userAnswer)
            if(question.answer===question.userAnswer){
                _rightImage.isVisible=true;
            }
            else{
                _errorImage.isVisible=true;
            }

            isCheckAll && this._checkAnswers();
        }
    }

    // 检查所有题目
    _checkAnswers(){
       var _questions=this._questions!;
       var len=_questions.length;
       var i=len;
       var count=0;
       var question;
       
       while(i--){
           question=_questions[i];
           if(question.answer===question.userAnswer){
               count++;
           }
       }

       // 全答对
       if(count===len){
          this._success();
       }
    }

    _createTop(): GUI.Control {
        var topContainer = new GUI.Rectangle("top");
        var right = new GUI.Image("", "statics/assets/correct.png");
        var error = new GUI.Image("", "statics/assets/error.png");

        topContainer.heightInPixels = 90;
        right.width = error.width = 0.35;
        right.height = error.height = 0.6;
        right.isVisible =
            error.isVisible = false;

        this._rightImage = right;
        this._errorImage = error;

        topContainer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        topContainer.thickness = 0;
        topContainer.addControl(right)
            .addControl(error);

        this.bodyHeight = 40;

        return topContainer;
    }

    _createBody(question: IQuestion) {
        var alignLeft = GUI.Container.HORIZONTAL_ALIGNMENT_LEFT;
        var alignTop = GUI.Container.VERTICAL_ALIGNMENT_TOP;
        var alignRight = GUI.Container.HORIZONTAL_ALIGNMENT_RIGHT;

        var container = new GUI.Container("");
        var bodyHeader = new GUI.Rectangle("");
        var subject = new GUI.TextBlock("", "知识问答 (" + question.type + ")");
        var indexTitle = new GUI.TextBlock("", `(1/${this._questions!.length})`);
        var orderTitle = new GUI.TextBlock("", "NO." + question.index);
        var line = new GUI.Line("");
        var title = new TextLine("", "");
        var optionsContainer = new GUI.Container("");

        this._indexTitle = indexTitle;
        this._optionsContainer = optionsContainer;
        this._subject = subject;

        container.width = 0.7;
        container.top = "90px";
        container.verticalAlignment = alignTop;
        this.bodyHeight += 90;

        bodyHeader.verticalAlignment = alignTop;
        bodyHeader.height = "200px";
        bodyHeader.background = "#ffffffB2";
        bodyHeader.color = "#ffffffB2";
        bodyHeader.thickness = 0;
        bodyHeader.cornerRadius = 5;
        this._bodyHeader = bodyHeader;

        subject.textHorizontalAlignment = alignLeft;
        subject.textVerticalAlignment = alignTop;
        subject.color = "#696969";
        // subject.height = "40px";
        subject.left = "20px";
        subject.top = "10px";
        subject.fontSize = 20;
        subject.fontStyle = "bold";

        indexTitle.textHorizontalAlignment = alignRight;
        indexTitle.textVerticalAlignment = alignTop;
        indexTitle.color = "#696969";
        indexTitle.left = "-77px";
        indexTitle.top = "12px";
        indexTitle.fontSize = 14;

        orderTitle.textVerticalAlignment = alignTop;
        orderTitle.textHorizontalAlignment = alignRight;
        orderTitle.color = "#D82E2D";
        orderTitle.left = "-14px";
        orderTitle.top = "10px";
        orderTitle.fontSize = 20;
        orderTitle.fontStyle = "bold";

        line.x1 = 25;
        line.x2 = 390;
        line.y1 = line.y2 = 42;
        line.color = "#CCC";

        title.textHorizontalAlignment = alignLeft;
        title.textVerticalAlignment = alignTop;
        title.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        title.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        title.top = "52px";
        title.color = "#696969";
        title.fontSize = 15;
        title.paddingLeft = "20px";
        title.lineSpacing = 5;

        // title.paddingRight="20px";
        this._titleText = title;

        this._updateTitle(question.question);
        this._createOptions(question.options, question);

        bodyHeader.addControl(subject)
            .addControl(indexTitle)
            .addControl(orderTitle)
            .addControl(line)
            .addControl(title);

        container.addControl(bodyHeader)
            .addControl(optionsContainer);

        return container;
    }

    _createButtons() {
        var leftButton = GUI.Button.CreateImageOnlyButton("left", "statics/assets/left.png");
        var rightButton = GUI.Button.CreateImageOnlyButton("right", "statics/assets/right.png");
        leftButton.verticalAlignment =
            rightButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        leftButton.top =
            rightButton.top = "100px";
        leftButton.width =
            rightButton.width = "38px";
        leftButton.height =
            rightButton.height = "63px";
        leftButton.thickness =
            rightButton.thickness = 0;
        leftButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        rightButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        leftButton.isVisible = false;

        leftButton.onPointerClickObservable.add(() => {
            this.setCurrentIndex(-1);
            if (this._index === 0) {
                leftButton.isVisible = false;
            }
            else {
                rightButton.isVisible = true;
            }
        });

        rightButton.onPointerClickObservable.add(() => {
            this.setCurrentIndex(1);
            if (this._index + 1 === this._questions!.length) {
                rightButton.isVisible = false;
            }
            else {
                leftButton.isVisible = true;
            }
        });

        return [leftButton, rightButton];
    }

}

class TextLine extends GUI.TextBlock {

    constructor(name: string, text?: string) {
        super(name, text);
    }
    _breakLines(refWidth: number) {
        var lines: { text: string, width: number }[] = [];
        var text = this.text;
        var lineLen = 24;
        var s: string;
        for (var i = 0, ii = text.length; i < ii; i += lineLen) {
            s = text.substr(i, lineLen);
            lines.push({
                text: s,
                width: s.length * 16
            });
        }

        return lines;
    }
}

export default Question;