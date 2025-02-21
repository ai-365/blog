
## 原理



web real-time communication，网页实时通信。主要用于视频通话。

RTCPeerConnection确保打开线路，打开媒体通道。

mediaDevices.getUserMedia处理摄像头、话筒、视频和声音。

RTCDataChannel数据通道的通信。

SDP，Session Description Protocol会话描述协议，用于在p2p协商时共享彼此的IP地址和端口，以及双方都能使用的音频和视频的编码信息。

ICE，穿透Nat建立点对点通信的方法，其中会用到STUN和TURN服务器。本地主机将包发送到stun服务器。stun服务器将请求的全球IP地址和端口返回给nat内部的主机。通过这两个步骤，就可以确保通信线路，并获取可以从外部进行通信的地址和端口。stun对于穿透nat必不可少。
