// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MainControl from "./MainControl"
import { SoundType } from "./AudioSourceControl"

const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {

    //Speed of bird
    speed: number = 0

    // assign of main Control component
    mainControl: MainControl = null;

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        //game over
        if (other.tag === 0) {
            cc.log("game over")
            this.mainControl.gameOver()
            this.speed = 0
            this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Fly)

        } else if (other.tag === 1) {
            this.mainControl.gameScore++
            this.mainControl.labelScore.string = this.mainControl.gameScore.toString()
        }
    }

    onLoad() {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.mainControl = cc.Canvas.instance.node.getComponent('MainControl')
    }

    start() {

    }

    update(dt: number) {
        this.speed -= 0.05
        this.node.y += this.speed

        var angle = -(this.speed / 2) * 30
        if (angle >= 30) {
            angle = 30
        }
        this.node.angle = angle

        if (this.node.y >= 256 || this.node.y <= -256) {
            this.mainControl.gameOver()
            this.speed = 0
        }
    }

    onTouchStart(event: cc.Event.EventTouch) {
        this.speed = 2
        this.mainControl.audioSourceControl.playSound(SoundType.E_Sound_Fly)
    }
}
