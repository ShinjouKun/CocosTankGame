import { _decorator, Component, Node, Vec2 ,input, Input, KeyCode, director, SystemEvent, macro, EventKeyboard, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    _moveSpeed:number = 100;
    _moveAngle:number;
    _movePosition:Vec2 = new Vec2(0,0);


//    constructor(pos:Vec2= new Vec2(0,0),angle:number = 0,speed:number = 200) 
//    {
//     super();
//     this._movePosition = new Vec2(pos.x,pos.y);
//     this._moveAngle = angle;
//     this._moveSpeed = speed;
//    }

    start() 
    {
      this.node.setRotationFromEuler(0,0,this._moveAngle);
    }

    update(deltaTime: number) 
    {
        let velcity = new Vec2(0,1);
        this._moveAngle = this.node.eulerAngles.z;
        velcity = this.yaw(this._moveAngle - 90);
        velcity.x = (velcity.x * this._moveSpeed)*deltaTime;
        velcity.y = (velcity.y * this._moveSpeed)*deltaTime;
        this.node.setPosition(this.node.position.x - velcity.x,this.node.position.y + velcity.y,0);
    }


     //回転移動計算
     yaw(ang)
     {
         ang = ang + 45;
         ang = ang *Math.PI /180;
 
         let sin = Math.sin(ang);
         let cos = Math.cos(ang);
 
         let x = cos + sin;
         let y = -(sin) + cos;
 
         let v = new Vec2(x,y);
 
         return v;
     }
}


