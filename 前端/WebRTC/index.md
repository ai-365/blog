
# WebRTC

## 原理



web real-time communication，网页实时通信。主要用于视频通话。

RTCPeerConnection确保打开线路，打开媒体通道。

mediaDevices.getUserMedia处理摄像头、话筒、视频和声音。

RTCDataChannel数据通道的通信。

SDP，Session Description Protocol会话描述协议，用于在p2p协商时共享彼此的IP地址和端口，以及双方都能使用的音频和视频的编码信息。

ICE，穿透Nat建立点对点通信的方法，其中会用到STUN和TURN服务器。本地主机将包发送到stun服务器。stun服务器将请求的全球IP地址和端口返回给nat内部的主机。通过这两个步骤，就可以确保通信线路，并获取可以从外部进行通信的地址和端口。stun对于穿透nat必不可少。

## SDP

SDP是基于文本的描述协议，描述了自己的媒体信息、能接受的媒体信息。SDP不是网络协议，而是一种在用户之间传递媒体信息所遵循的标准格式，就好比markdown标准一样，规定了标题怎么写、加粗怎么加，大家都按照这个语法写文件即可，这样别人也能看懂你的markdown源码。SDP文本可以附加在HTTP报文的body中传给对方。如下是一个SDP示例：

```
v=0
o=- 2397106153131073818 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE video
a=msid-semantic: WMS gLzQPGuagv3xXolwPiiGAULOwOLNItvl8LyS
m=video 9 UDP/TLS/RTP/SAVPF 96 97
c=IN IP4 0.0.0.0
a=rtcp:9 IN IP4 0.0.0.0
a=ice-ufrag:l5KU
a=ice-pwd:+Sxmm3PoJUERpeHYL0HW4/T9
a=ice-options:trickle
a=fingerprint:sha-256 7C:93:85:40:01:07:91:BE:DA:64:A0:37:7E:61:CB:9D:91:9B:44:F6:C9:AC:3B:37:1C:00:15:4C:5A:B5:67:74
a=setup:actpass
a=mid:video
a=sendrecv
a=rtcp-mux
a=rtcp-rsize
a=rtpmap:96 VP8/90000
a=rtcp-fb:96 goog-remb
a=rtcp-fb:96 transport-cc
a=rtcp-fb:96 ccm fir
a=rtcp-fb:96 nack
a=rtcp-fb:96 nack pli
a=rtpmap:97 rtx/90000
a=fmtp:97 apt=96
a=ssrc-group:FID 2527104241
a=ssrc:2527104241 cname:JPmKBgFHH5YVFyaJ
a=ssrc:2527104241 msid:gLzQPGuagv3xXolwPiiGAULOwOLNItvl8LyS c7072509-df47-4828-ad03-7d0274585a56
a=ssrc:2527104241 mslabel:gLzQPGuagv3xXolwPiiGAULOwOLNItvl8LyS
a=ssrc:2527104241 label:c7072509-df47-4828-ad03-7d0274585a56
```


## ICE Candidate（连接候选项）

candidate中文翻译为候选人，顾名思义，在WebRTC中表示连接的候选方案，因为两个用户传输可以有多个候选方案，比如有两块网卡，那么每块网卡都对应一个候选项，再比如传输层可以是TCP，也可以是UDP。

ICE Candidate 主要分为以下三种类型：

- host 类型：即本机内网的 IP 和端口
- srflx 类型：即本机 NAT 映射后的外网的 IP 和端口
- relay 类型：即中继服务器的 IP 和端口

一般由以下字段组成:

```
IP: xxx.xxx.xxx.xxx       \\IP地址
  port: number              \\端口
  type: host/srflx/relay    \\类型
  priority: number          \\优先级
  protocol: UDP/TCP         \\传输协议
  usernameFragment: string  \\访问服务的用户名
  ...
```

如下是一个客户端的ICE candidate示例：

```
sdpMid: audio, sdpMLineIndex: 0, candidate:2213672593 1 udp 2122260223 30.2.228.19 51068 typ host
sdpMid: video, sdpMLineIndex: 1, candidate:2213672593 1 udp 2122260223 30.2.228.19 55061 typ host
 
sdpMid: audio, sdpMLineIndex: 0, candidate:3446803041 1 tcp 1518280447 30.2.228.19 9 typ host
sdpMid: video, sdpMLineIndex: 1, candidate:3446803041 1 tcp 1518280447 30.2.228.19 9 typ host
 
sdpMid: video, sdpMLineIndex: 1, candidate:150963819 1 udp 41885439 182.92.80.26 54400 typ relay raddr 42.120.74.91 rport 37714
sdpMid: audio, sdpMLineIndex: 0, candidate:150963819 1 udp 41885439 182.92.80.26 59241 typ relay raddr 42.120.74.91 rport 49618
```

双方都会提供自己的candidates给对方，双方商量出一个最优的传输方案。

candidate与SDP协议一样，也只是一种信息交流所遵循的文本格式。

## STUN服务器

STUN 服务器的目的就是为用户找到公网地址+端口，让用户可以使用这个公网地址+端口与其他用户进行通信。

STUN 是非常轻量级的，用户可以使用 docker 建立一个 STUN 服务器。STUN 服务器通常在 3478 端口上运行，TLS 端口为 5349。由于STUN搭建的成本低廉，所消耗的资源也不多，因此有许多免费的STUN服务器。

![STUN服务器](https://pic2.zhimg.com/80/v2-93b9f67687ba717100d0ad3220697475_720w.webp)

##  媒体协商


创建RTCPeerConnection。

```js
// 新建本地PC(PeerConnection)和远程PC(PeerConnection)对象
const localPC = new RTCPeerConnection()
const remotePC = new RTCPeerConnection()
```

createOffer()、setLocalDescription()、setRemoteDescription()、createAnswer()


```js
localPC.createOffer()
.then(offer=>{
localPc.setLocalDescription(offer)
socket.emit('offer', offer)
})
```

接收Offer、发送Answer

```js
socket.on('offer', offer) => {
  // 新建对方PC(PeerConnection)对象
  remotePc = new RTCPeerConnection()
  await remotePc.setRemoteDescription(offer)
  let remoteAnswer = await remotePc.createAnswer()
  await remotePc.setLocalDescription(remoteAnswer)
  socket.emit('answer', remoteAnswer)
});
```

接收Answer

```js
socket.on('answer', answer) => {
  // 将 Answer 保存为远程描述；
  await localPc.setRemoteDescription(answer);
});
```

监听candidate

```js
localPC.onicecandidate = event => {
  if (event.candidate) {
    remotePC.addIceCandidate(event.candidate)
  }
}

remotePC.onicecandidate = event=>{
  if (event.candidate) {
                localPC.addIceCandidate(event.candidate);
  }
}
```


只要检测到remotePC有数据流，就可以传给视频组件HTML元素了。

```js
remotePC.ontrack = event =>{
  video.srcObject = e.streams[0]
  video.oncanplay => video.play()
}

```

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


##  录制与下载

```js

// 设置录制的参数
const options = {mimeType: "video/webm;codecs=vp8"}
// 录制对象
const mediaRecorder = new MediaRecorder(window.stream,options)
// 录制文件存储区
const buffer = []

// 录制
function record(){
  mediaRecorder.ondataavailable = event => buffer.push(event.data)
}



// 下载
function download(){
  const blob = new Blob(buffer,{type: 'video/webm'})
  const url = window.URL.createObjectURL(blob)

  //模拟链接，进行点击下载
  var a = document.createElement("a")   
  a.href = url
  a.style.display = "none"   //不显示
  a.download = "video.webm"
  a.click()
}

const recordButton = document.querySelector('#record')
const downloadButton = document.querySelector('#download')
recordButton.onclick = record
downloadButton.onclick = download

```
