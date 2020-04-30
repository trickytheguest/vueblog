# 剖析Web

[[toc]]

- `HTTP`超文本传输协议，规则了网络客户端和服务端之间如何交换请求和响应。
- `HTML`超文本标记语言，结果的展示格式。
- `URL`统一资源定位符，唯一表示服务器和服务器上资源的方法。

## Web客户端



### 使用telnet进行测试



使用windows操作系统时，可以在"打开或关闭Windows功能"中开启“Telnet客户端”，如下图所示：

![open_telnet_client](/img/open_telnet_client.png)



### Python的标准Web库



`http`库会处理所有客户端-服务器`HTTP`请求的具体细节：


```py
>>> import http
>>> http.
>>> http.HTTPStatus( http.IntEnum(    http.client      http.cookiejar   http.cookies
>>> http.HTTPStatus.OK
<HTTPStatus.OK: 200>

>>> import http.server                                                                                   
>>> http.server.                                                                                         
http.server.BaseHTTPRequestHandler(    http.server.email                      http.server.posixpath      
http.server.CGIHTTPRequestHandler(     http.server.executable(                http.server.select         
http.server.DEFAULT_ERROR_CONTENT_TYPE http.server.html                       http.server.shutil         
http.server.DEFAULT_ERROR_MESSAGE      http.server.http                       http.server.socket         
http.server.HTTPServer(                http.server.io                         http.server.socketserver   
http.server.HTTPStatus(                http.server.mimetypes                  http.server.sys            
http.server.SimpleHTTPRequestHandler(  http.server.nobody                     http.server.test(          
http.server.argparse                   http.server.nobody_uid(                http.server.time           
http.server.copy                       http.server.os                         http.server.urllib         
```

- `http.client`是一个底层的HTTP协议客户端，高层库使用`urllib.request`。

- `http.server`提示Web服务器程序。

- `Warning[http.server](https://docs.python.org/3/library/http.server.html#module-http.server) is not recommended for production. It only implements basic security checks.`官网上面不建议使用`http.server`用作生产服务器，因为它仅仅实现了基本的安全检查。

- 可以使用`python -m http.server 8000`生成一个简单的目录共享服务器。

  

`urllib`是基于`http`的高层库。

```py
>>> import urllib
>>> urllib.
urllib.error    urllib.parse    urllib.request  urllib.response
```



- `urllib.request`是处理客户端请求。
- `urllib.response`是处理服务端的响应。
- `urllib.parse`会解析URL数据。



### 第三方库`requests`



`requests`模块是基于`urllib`模块开发的，在大多数情况下，使用`requests`可以让Web客户端开发变得更加简单。

安装：

```py
pip install requests
```



```py
>>> import requests                                                                            
>>> requests.                                                                                  
requests.ConnectTimeout(            requests.URLRequired(               requests.logging       
requests.ConnectionError(           requests.adapters                   requests.models        
requests.DependencyWarning(         requests.api                        requests.options(      
requests.FileModeWarning(           requests.auth                       requests.packages      
requests.HTTPError(                 requests.certs                      requests.patch(        
requests.NullHandler(               requests.chardet                    requests.post(         
requests.PreparedRequest(           requests.check_compatibility(       requests.put(          
requests.ReadTimeout(               requests.codes                      requests.request(      
requests.Request(                   requests.compat                     requests.session(      
requests.RequestException(          requests.cookies                    requests.sessions      
requests.RequestsDependencyWarning( requests.delete(                    requests.status_codes  
requests.Response(                  requests.exceptions                 requests.structures    
requests.Session(                   requests.get(                       requests.urllib3       
requests.Timeout(                   requests.head(                      requests.utils         
requests.TooManyRedirects(          requests.hooks                      requests.warnings      
```

要通过GET访问一个页面，只需要几行代码。



查看豆瓣首页：

```py
>>> import requests
>>> r = requests.get('https://www.douban.com/') # 豆瓣首页
>>> r.
r.apparent_encoding     r.encoding              r.iter_lines(           r.raw
r.close(                r.headers               r.json(                 r.reason
r.connection            r.history               r.links                 r.request
r.content               r.is_permanent_redirect r.next                  r.status_code
r.cookies               r.is_redirect           r.ok                    r.text
r.elapsed               r.iter_content(         r.raise_for_status(     r.url
>>> r.status_code
418
>>> r.text
''
```

可以看到，因为豆瓣的反爬虫机制导致获取到的内容异常，返回码是418,而不是200。



我们补充上`headers` ,目的是模拟浏览器，欺骗服务器，获取和浏览器一致的内容。



```py
>>> import requests                                                                                                     
>>> headers={'Referer': 'https://book.douban.com/','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win
64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}       

# 增加请求头和超时设置
>>> r = requests.get('https://www.douban.com/', headers=headers, timeout=3) # 豆瓣首页                                       
# 请求状态码
>>> r.status_code                             
200                                                                                                                     
>>> r.text                                                                                                              
'<!DOCTYPE HTML>\n<html lang="zh-cmn-Hans" class="ua-windows ua-webkit">\n<head>\n<meta charset="UTF-8">\n<meta name="go
ogle-site-verification" content="ok0wCgT20tBBgo9_zat2iAcimtN4Ftf5ccsh092Xeyw" />\n<meta name="description" content="提供  
图书、电影、音乐唱片的推荐、评论和价格比较，以及城市独特的文化生活。">\n<meta name="keywords" content="豆瓣,广播,登陆豆                                          
瓣">\n<meta property="qc:admins" content="2554215131764752166375" />\n<meta property="wb:webmaster" content="375d4a17a4f 
... 省略

# 实际请求的URL
>>> r.url
'https://www.douban.com/'

# 查看cookies信息
>>> r.cookies
<RequestsCookieJar[Cookie(version=0, name='bid', value='XOX32QgJXj8', port=None, port_specified=False, domain='.douban.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=False, expires=1619771562, discard=False, comment=None, comment_url=None, rest={}, rfc2109=False), Cookie(version=0, name='ll', value='"108304"', port=None, port_specified=False, domain='.douban.com', domain_specified=True, domain_initial_dot=True, path='/', path_specified=True, secure=False, expires=1619771561, discard=False, comment=None, comment_url=None, rest={}, rfc2109=False)]>

# 内容编码方式
>>> r.encoding
'utf-8'
```





## Web服务端

可以使用一行代码启动一个最简单的Web服务器：



```sh
$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

默认是8000端口，启动服务时，也可以指定其他端口：

```sh
$ python -m http.server 9000
Serving HTTP on 0.0.0.0 port 9000 (http://0.0.0.0:9000/) ...
```

注意，不要将这个简单的Web服务器用用产品线网站中。`Nginx`和`Apache`等传统Web服务器可以更快地处理静态文件。



当我们想能够动态运行程序的Web服务器时，在Web发展的早期，出现了`通用网关接口(CGI)`，客户端通过它来让Web服务器运行外部程序并返回结果;CGI也会从Web服务器获取用户输入的参数并传递给外部程序。然而，对于每个用户请求都需要运行一次程序，这样很难扩大用户规模，因为即使程序很小，启动时还是会有明显的等待时间。



为了避免启动延时，人们开始把语言解释器合并到Web服务器中。`Apache`可以通过`mod_php`模块来运行PHP，通过`mod_perl`模块来运行Perl，通过`mod_python`模块来运行Python。这样，动态语言的代码就可以直接在持续运行的`Apache`进程中执行，不用再调用外部程序。另一种方式 是在一个独立的持续运行的程序中运行动态语言，并让它和Web服务器进行通信，例如`FastCGI`和`SCGI`。

Web服务器网关接口(`WSGI`)的定义极大地促进了Python在Web方面的发展，`WSGI`是一个通用的`API`，连接Python Web应用和Web服务器。





