//% color=#0072C6 icon="\uf021" block="舵机控制"
namespace servos {

    /**
     * 控制指定引脚连接的标准舵机转动到指定角度 (0-180度).
     * @param pin The pin the servo is connected to (e.g., Pin.P0, Pin.P1, etc.)
     * @param angle The angle to set the servo to (0-180 degrees)
     */
    //% blockId=servo_write
    //% block="设置 %pin|舵机角度为 %angle=protractorPicker °"
    //% pin.defl=DigitalPin.P0
    //% weight=100
    //% angle.min=0 angle.max=180
    //% blockGap=8
    //% group="标准舵机"
    export function setServoAngle(pin: DigitalPin, angle: number): void {
        angle = Math.max(0, Math.min(180, angle));
        pins.analogSetPeriod(pin, 20);
        const pulseWidthMicroseconds = 500 + (angle * (2000.0 / 180.0));
        const analogValue = Math.round((pulseWidthMicroseconds / 20000.0) * 1023);
        pins.analogWritePin(pin, analogValue);
    }

    /**
     * 停止向舵机发送信号，让舵机可以自由转动 (如果舵机支持).
     */
    //% blockId=servo_stop
    //% block="停止 %pin|舵机信号"
    //% pin.defl=DigitalPin.P0
    //% weight=90
    //% blockGap=8
    //% group="标准舵机"
    export function stopServo(pin: DigitalPin): void {
        pins.digitalWritePin(pin, 1);
    }

    // 角度选择器
    //% blockId=protractorPicker
    //% block="%angle"
    //% angle.min=0 angle.max=180
    //% shim=TD_ID
    //% group="标准舵机"
    export function __protractorPicker(angle: number): number {
        return angle;
    }
}