
##  获取媒体流

媒体流包括：
- 摄像头
- 麦克风
- 设备屏幕
- 设备声音

使用getUserMedia()获取摄像头和麦克风； 使用getDisplayMedia()获取设备屏幕和设备声音。

```js
const constraints = { video: true, audio: true }

// 获取视频HTML元素
const video = document.querySelector("#video")

// getUserMedia()返回期约，因此使用then()接收
navigator.mediaDevices.getDisplayMedia(constraints)
.then(localStream=>video.srcObject = localStream)


```

