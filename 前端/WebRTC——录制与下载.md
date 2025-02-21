
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