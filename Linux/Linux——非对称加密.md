

- 对称加密算法：在加密和解密时使用同一个密钥，这种算法不安全，几乎不再使用了。
- 非对称加密算法：通过密钥算法同时一对密钥：公钥和私钥，分别用于加密和解密。目前在各大安全协议中被使用。

假设网络上的两台主机A和B需要传递信息。那么A和B首先生成自己的私钥和公钥。公钥和私钥都是一个文本文件，里面存放着一定长度的字符串，默认放在如下目录：
私钥：~/.ssh/id_rsa
公钥：~/.ssh/id_rsa.pub

公钥顾名思义就是可以公开的，A和B首先把自己的公钥发给对方，然后把对方的的公钥追加进自己的~/.ssh/known_hosts文件中，这个文件存放的是从网络上接收到的各个主机的公钥，每条信息占一行，每一行的格式如下：
```
主机名  加密算法   公钥字符串
```

现在A要跟B发送信息，A就使用B的公钥将原始信息加密，得到一条加密信息通过网络发送给B，由于原始信息是通过B的公钥加密的，那么加密信息只能通过B的私钥解密，A的公钥私钥、B的公钥、其它网络上任何人的公钥私钥都无法解密这条加密信息。B收到后通过自己的私钥成功界面，就看到了原始信息。在这个过程中，哪怕加密信息被别人截取到了，也无法解密。

总而言之，公钥是用来加密的，私钥是用来解密的。要给对方发送消息，就用对方的公钥加密，等信息到达对方主机后，对方就可以解密了。

非对称秘钥有几个特点：
- 全局唯一：不同的人在同一时间，或同一个人在不同时间生成公钥私钥一定是不同的。也就是说，每个人的私钥一定是不同的，这确保了身份的准确性。
- 一对一：公钥和私钥是成对生成的，用公钥加密的信息只能通过对应的私钥解密，其它私钥绝对不可能解密。
- 确定性：用对应的私钥一定能解密，不用对应的私钥一定不能解密。

现在，又有一个问题，如何保证这条加密信息是由a发出来的？换句话说，C也可以生成一对公私钥，发送给B，然后对B说：“我是A，这是我的公钥”。

这种问题的漏洞在于，每个人都可以生成公钥私钥，但无法根据识别身份。这个时候，有一个第三方的权威机构，A向这家机构发动自己的公钥以及能够证明身份的信息（例如营业执照），完成自己在网络上的“实名认证”。这家权威机构在核实了A的信息和公钥之后，颁发给A一张数字证书，这家机构也叫数字证书颁发机构。有了权威机构的背书，任何人也无法冒充A了，因为现在人们获取公钥都直接从权威机构获取。

现在，A要向B发生信息，首先使用B的公钥加密原始信息，然后再用自己（A）的私钥再进行一道加密，这个过程就是数字签名。B收到加密信息后，首先向第三方权威机构获取A的公钥，然后使用A的公钥进行第一级解密，再用自己（B）的的私钥进行二级解密，就获取了原始信息。

数字证书颁发机构的作用就是完成公钥信息的“实名制”。

第一级加密和数字签名是对称的：
- 第一级加密使用对方的公钥加密
- 第二级数字签名使用自己的私钥加密
- 收到信息后，首先向数字证书颁发机构获取发送方的公钥，完成数字签名信息的解密
- 然后使用自己的私钥解密出原始信息。

总之，原始信息加密解密的方式是：接收的公钥加密，接收方的私钥解密。数字签名的加密解密方式是：发送方的私钥加密，发送到的公钥解密。