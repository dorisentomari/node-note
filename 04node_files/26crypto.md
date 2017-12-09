# crypto加密与解密
在Node.js中，使用OpenSSL类库作为其内部实现加密与解密处理的基础手段，这是因为目前OpenSSL已经成为了一个经过严格测试的可靠的加密与解密算法的实现工具。

在Node.js中，OpenSSL类库被封装在crypto模块中，因为可以使用crypto模块来实现不同的加密与解密处理。在crypto模块中，提供了一些加密方法来实现数据的可靠加密。另外在crypto模块中，也提供了一些利用HMAC(Hash-based Message Authentication Code，散列运算消息认证码)运算来实现数字签名以及对数字签名进行验证的方法。

在crypto模块中，为每一种加密算法定义了一个类。可以使用getCiphers方法来查看Node.js能够使用的所有的加密算法。`crypto.getCiphers()`，返回一个数组，包括了在Node.js中能够使用的所有加密算法。

HMAC运算利用散列算法，以一个密钥和一个消息为输入，生成一个消息摘要作为输出，HMAC算法可以用来验证两段数据是否匹配，以确认该数据没有被篡改。

### 散列算法

散列(也称哈希)算法用来实现一些重要处理，例如，在允许对一段数据进行验证的前提下，将该数据模糊化，或者为一大段数据提供一个校验码。

在Node.js中，为了使用散列算法，首先应该使用createHash方法创建一个hash对象。`crypto.createHash(algorithm)`

在createHash方法中，使用一个参数，其参数值为一个在Node.js中可以使用的算法，例如sha1,md5,sha256,sha512,ripemd160等，用于指定需要使用的散列算法，该方法返回被创建的hash对象。

在创建了一个hash对象后，可以通过使用该对象的update方法创建一个摘要,`hash.update(data, [input_encoding])`，在hash对象的update方法中，其中data参数为必须使用的参数，而input_encoding参数可选，用于指定摘要内从所需要使用的编码格式，可指定参数值为utf8,ascii,binary,如果不使用input_encoding参数，则data参数值必须为一个Buffer对象，可以在摘要被输出前使用多次update方法来添加摘要内容。

可以使用hash对象的digest方法来输出只要内容，在使用了hash对象的digest方法后，不能再向hash对象中追加摘要内容，`hash.digest([encoding])`,encoding参数可选，用于指定摘要内从所需要使用的编码格式，可指定参数值为utf8,ascii,binary,如果不使用encoding参数，则data参数值必须为一个Buffer对象。在hash对象的digest方法被调用之后，该对象不能再次被使用。

### HMAC算法
HMAC算法将散列算法与一个密钥结合在一起，以阻止对签名完整性的破坏，在Node.js中，为了使用HMAC算法，首先应该使用createHmac方法创建一个hmac对象。`crypto.createHmac(algorithm, key)`,第一个参数为在Node.js中可以使用的算法，用于指定所需要使用的散列算法，key参数值为一个字符串，用于指定PEM格式的密钥。该方法返回被创建的hmac对象。
在OpenSSL工具中，使用命令创建一个密钥`openssl genrsa -out key.pem 1024`

在创建了一个hmac对象后，可以通过使用该对象的update方法来创建一个摘要。`hmac.update(data);`data参数为一个Buffer对象或一个字符串，用于指定摘要内容，可以在摘要被输出前使用多次updae方法来添加摘要内容。

可以使用hmac对象的digest方法输出摘要内容，在使用了hmac对象的digest方法后，不能再向hmac对象中追加摘要的内容。`hmac.digest([encoding])`,encoding参数可选，用于指定摘要内从所需要使用的编码格式，可指定参数值为utf8,ascii,binary,如果不使用encoding参数，则data参数值必须为一个Buffer对象。在hash对象的digest方法被调用之后，该对象不能再次被使用。

### 公钥加密
Node.js提供了以下4个与公钥加密相关的类
+ Cipher类，用于加密数据
+ Decipher类，用于解密数据
+ Sign类，用于生成签名
+ Verify类，用于验证签名

在使用HMAC算法时，只需要使用一个私钥，但在使用公钥加密技术时，需要使用公钥及私钥，其中私钥用于解密数据以及对数据进行签名，而公钥用于创建只有私钥的拥有者能够读出的加密数据，以及对私钥的拥有者的签名进行验证。
在OpenSSL工具中，可以使用下边的命令为一个私钥创建一个PEM格式的公钥。`openssl req -key key.pem -new -x509 -out cert.pem`

在Node.js中，要求公钥必须为一个证书文件，这意味着在创建公钥时需要提供一些附加的信息


##### 加密数据
在crypto模块中，Cipher类用于对数据进行加密操作，在加密数据之前，首先要创建一个cipher对象，有两种方法
+ createCipher方法，该方法使用指定的算法与密码来创建cipher对象`crypto.createCipher(algorithm, password)`,password参数用于指定加密时所使用的密码，必须为一个二进制格式的字符串或一个Buffer对象，返回一个被创建的cipher对象
+ createCipheriv方法，该方法使用指定的算法，密码与初始向量来创建cipher对象`crypto.createCipheriv(algorithm, password, iv)`,iv参数用于指定加密时所使用的初始向量，参数值必须为一个二进制的字符串或者一个Buffer对象。返回一个被创建的cipher对象。

**分块加密**
在Node.js中，使用分块加密法进行加密，分块家密法将固定长度的数据快或纯文本数据加密成长度相同的快数据，该数据的前提是用户提供密码，在解密时，使用相同的密码对密码快数据进行逆转换，此处的“固定长度”称为数据快的尺寸，根据使用算法的不同，数据块的尺寸也各不相同。例如在使用blowfish算法时，数据块的尺寸为40字节。分块加密法可以在网站被攻击时防止加密数据以及加密时所使用的密码泄露。

在创建一个cipher对象后，可以通过使用该对象的update方法来指定需要被加密的数据。`cipher.update(data, [input_encoding], [output_encoding])`，data为一个Buffer对象或一个字符串，用于指定需要加密的数据。如果缺少第二个或第三个参数，data必须为一个Buffer对象。

update方法返回被加密的数据，可以使用update方法多次以添加需要加密的数据。如果在update方法中使用output_encoding参数，则该方法会被编码的字符串，如果在update方法中不使用output_encodig参数，该方法返回一个存放了加密数据的Buffer对象。

**cipher与hmac,hash对象的不同**
cipher对象的update方法总是返回一个被分块的加密数据，因此块的大小时非常关键的。如果加密数据的字节数足够创建一个或多个块，update方法将返回被加密的数据，如果加密数据的字节数不足以创建一个块，加密时局将被缓存在cipher对象中。

可以使用cipher对象的final方法返回加密数据，当该方法被调用时，任何cipher对象中所缓存的数据都将被加密，如果加密数据的字节数不足以创建一个块，将使用PKCS填充方式来填充这个块，在使用了cipher对象的final方法后，不能再向cipher对象中追加加密数据。`cipher.final([output_encoding])`，如果使用了该参数，那么final方法返回字符串格式的加密数据，如果不使用该参数，那么final方法返回一个buffer对象，当cipher对象的final方法被调用后，该对象不能再被使用。


























