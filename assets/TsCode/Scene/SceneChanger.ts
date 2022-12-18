import { _decorator, Component, Node, input, Input, KeyCode, director, SystemEvent, macro, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneChanger')
//シーン切り替えクラス
export class SceneChanger extends Component {

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
            case KeyCode.NUM_1:
                director.loadScene("BattleScene");
                break;
            case KeyCode.NUM_2:
                director.loadScene("TestScene");
                break;
        }
    }
    onDestroy () 
    {
        //キー入力イベントの削除
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    

}


