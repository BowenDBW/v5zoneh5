export function GetTimeState() {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 6 && hours <= 11) {
        text = `早上好`;
    } else if (hours > 11 && hours <= 14) {
        text = `中午好`;
    } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
    } else if (hours > 18 && hours < 24) {
        text = `晚上好`;
    }else if (hours >= 0 && hours < 6) {
        text = `快休息`;
    }
    return text;
};