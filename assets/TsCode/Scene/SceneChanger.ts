import { _decorator, Component, Node, input, Input, KeyCode, director, macro, EventKeyboard, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneChanger')
//シーン切り替えクラス
export class SceneChanger extends Component {

    @property({type:Prefab})
     mis:Prefab = null;
    start() 
    {
        //キー入力イベントのセット
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }



    update(deltaTime: number) {
      
    }
    onKeyDown(event:EventKeyboard)
    {
        //switch文じゃないと動かない仕様らしい
        switch(event.keyCode)
        {
            case KeyCode.KEY_B: 
                director.loadScene("BattleScene");
                break;
            case KeyCode.KEY_C:
                director.loadScene("TestScene");
                 break;
            case KeyCode.KEY_V:
                let newMiss = instantiate(this.mis);
                this.node.addChild(newMiss);
                newMiss.setPosition(6,200,0);
                 break;
            
        }
    }
    onDestroy () 
    {
        //キー入力イベントの削除
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    

}


