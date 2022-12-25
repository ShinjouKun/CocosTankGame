import { _decorator, Component, Node, Vec3 , input, Input, KeyCode, director, SystemEvent, macro, EventKeyboard, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MisaileBase')
export class MisaileBase extends Component 
{
    @property
    _moveSpeed:number = 50;
    _rotateSpeed:number = 1.0;
    _moveFlagFront:boolean = false;//移動操作を受け付けている間trueになる
    _moveFlagLeft:boolean = false;//移動操作を受け付けている間trueになる
    _moveFlagRight:boolean = false;//移動操作を受け付けている間trueになる
    start() 
    {
         //キー入力イベントのセット
         input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
         input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) 
    {
        this.misaileMoveing(deltaTime);
    }

    misaileMoveing(deltaTime)
    {
       let velcity = new Vec2(0,0);
       let currentAngle = this.node.eulerAngles.z;

      if(this._moveFlagLeft)
      {
        currentAngle = currentAngle + this._rotateSpeed;
        this.node.setRotationFromEuler(0,0,currentAngle);
      }
      if(this._moveFlagRight)
      {
        currentAngle = currentAngle - this._rotateSpeed;
        this.node.setRotationFromEuler(0,0,currentAngle);
      }
      if(this._moveFlagFront)
      {
        velcity = this.yaw(currentAngle - 90);
        velcity.x = (velcity.x * this._moveSpeed)*deltaTime;
        velcity.y = (velcity.y * this._moveSpeed)*deltaTime;
      }


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
        }
    }

    onDestroy () 
    {
        //キー入力イベントの削除
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
}


