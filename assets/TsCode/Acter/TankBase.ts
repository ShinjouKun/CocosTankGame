import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//戦車の操作タイプ
enum TankOperationType
{
    PLAYER,
    AI,
}
//戦車の基礎クラス
@ccclass('TankBase')
export class TankBase extends Component {

    start() {

    }

    update(deltaTime: number) {
        
    }
}


