import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

enum Identification
{
    FRIEND,//味方
    ENEMY,//敵
    IMPORTANTENEMY,//ボス、クリア目標など
    OBSTACLE,//障害物、壁など
}

@ccclass('BaseObject')
export class BaseObject extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
}


