import { _decorator, Component, Node, input, Input, KeyCode, director, SystemEvent, macro, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneChanger')
//シーン切り替えクラス
export class SceneChanger extends Component {

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) {
      
    }
    onKeyDown(event:EventKeyboard)
    {
        if(KeyCode.KEY_A)
        {
            director.loadScene("BattleScene");
        }
    }
    

}


