import { _decorator, Component, Node, Vec2 ,input, Input, KeyCode, director, SystemEvent, macro, EventKeyboard, Prefab, instantiate, Scene } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;
//戦車の基礎クラス
@ccclass('TankBase')
export class TankBase extends Component {
    ATTAKCK_ROTATE_OFFSET:number = 20;
    _hp:number = 100;
    _moveSpeed:number = 50;
    _rotateSpeed:number = 1;
    _bulletAngle:number = 0;
    //操作を受け付けている間trueになる
    _moveFlagBack:boolean = false;
    _moveFlagFront:boolean = false;
    _moveFlagLeft:boolean = false;
    _moveFlagRight:boolean = false;
    _rotateAttackLeft:boolean = false;
    _rotateAttackRight:boolean = false;
    //射撃制御
    _shotFlag:boolean = true;//開始時点で発射可能状態

    //カンバス
    _rendCanvas:Node = null;
    @property({type:Node})
    tankAttack:Node = null;//砲塔
    @property({type:Node})
    tankBottom:Node = null;//車体
    @property({type:Prefab})
    bullet:Prefab = null;//弾

    start() 
    {
        //弾を生成したりするためにCanvasノードを登録
        let scene = director.getScene();
        this._rendCanvas = scene.getChildByName("Canvas");
        //キー入力イベントのセット
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) 
    {
        this.tankAttckMove(deltaTime);
        this.tankBottomMove(deltaTime);
        
        if(!this._shotFlag)
        {
            this.scheduleOnce(function(){ console.log("リロード完了"), this._shotFlag = true},3);
        }
      
    }
    //砲塔回転
    tankAttckMove(deltaTime: number)
    {
        let currentAngle = this.tankAttack.eulerAngles.z;
 
        if(this._rotateAttackLeft)
        {
            this._rotateSpeed * deltaTime;
            this._bulletAngle = currentAngle + this._rotateSpeed;
            this.tankAttack.setRotationFromEuler(0,0,this._bulletAngle);
        }
        if(this._rotateAttackRight)
        {
            this._rotateSpeed * deltaTime;
            this._bulletAngle = currentAngle - this._rotateSpeed;
            this.tankAttack.setRotationFromEuler(0,0,this._bulletAngle);
        }
    }

    //移動操作
    tankBottomMove(deltaTime: number)
    {
        let velcity = new Vec2(0,0);
        let currentAngle = this.tankBottom.eulerAngles.z;
 
       if(this._moveFlagLeft)
       {
         this._rotateSpeed * deltaTime;
         currentAngle = currentAngle + this._rotateSpeed;
         this.tankBottom.setRotationFromEuler(0,0,currentAngle);
       }
       if(this._moveFlagRight)
       {
         this._rotateSpeed * deltaTime;
         currentAngle = currentAngle - this._rotateSpeed;
         this.tankBottom.setRotationFromEuler(0,0,currentAngle);
       }
       if(this._moveFlagFront)
       {
         velcity = this.yaw(currentAngle - 90);
         velcity.x = (velcity.x * this._moveSpeed)*deltaTime;
         velcity.y = (velcity.y * this._moveSpeed)*deltaTime;
       }
       if(this._moveFlagBack)
       {
         velcity = this.yaw(currentAngle - 90);
         velcity.x = (-velcity.x * this._moveSpeed)*deltaTime;
         velcity.y = (-velcity.y * this._moveSpeed)*deltaTime;
       }

        this.node.setPosition(this.node.position.x - velcity.x,this.node.position.y + velcity.y,0);
    }
    //砲撃
    shot()
    {
         //弾を生成
         let b =  instantiate(this.bullet);
         let bulletYaw = this.yaw(this._bulletAngle - 90);
         b.setPosition(this.node.position.x - this.ATTAKCK_ROTATE_OFFSET * bulletYaw.x,this.node.position.y + this.ATTAKCK_ROTATE_OFFSET * bulletYaw.y ,0);
         b.setRotationFromEuler(0,0,this._bulletAngle);
         //シーンノード直下のCanvasに描画させる
         this._rendCanvas.addChild(b);
         this._shotFlag = false;
    }

    onKeyDown(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            case KeyCode.KEY_W:
                this._moveFlagFront = true;
                break;
            case KeyCode.KEY_A:
                this._moveFlagLeft = true;
                break;
            case KeyCode.KEY_D:
                this._moveFlagRight = true;
                break;
            case KeyCode.KEY_S:
                this._moveFlagBack = true;
                break;
            case KeyCode.ARROW_LEFT:
                this._rotateAttackLeft = true;
                break;
            case KeyCode.ARROW_RIGHT:
                this._rotateAttackRight = true;
                break;
            case KeyCode.ARROW_UP:
                if(this._shotFlag)
                {
                  this.shot();
                }
                break;
        }
    }

    onKeyUp(event:EventKeyboard)
    {
        switch(event.keyCode)
        {
            case KeyCode.KEY_W:
                this._moveFlagFront = false;
                break;
            case KeyCode.KEY_A:
                this._moveFlagLeft = false;
                break;
            case KeyCode.KEY_D:
                this._moveFlagRight = false;
                break;
            case KeyCode.KEY_S:
                this._moveFlagBack = false;
                break;
            case KeyCode.ARROW_LEFT:
                this._rotateAttackLeft = false;
                break;
            case KeyCode.ARROW_RIGHT:
                this._rotateAttackRight = false;
        }
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

    onDestroy () 
    {
        //キー入力イベントの削除
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
}


