
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
