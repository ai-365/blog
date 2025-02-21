
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
