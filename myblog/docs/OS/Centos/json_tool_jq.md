



# JSON解析工具-jq

[[toc]]

jq 是一个轻量级而且灵活的命令行 JSON 解析器，类似用于 JSON 数据的 sed 工具。

- jq官网地址：[https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)
- 官方教程：[https://stedolan.github.io/jq/tutorial/](https://stedolan.github.io/jq/tutorial/)
- 官方手册：[https://stedolan.github.io/jq/manual/](https://stedolan.github.io/jq/manual/)
- 源码地址：[https://github.com/stedolan/jq/](https://github.com/stedolan/jq/)

## 1. 安装

我们可以直接使用`yum`安装。

查看`jq`包的信息：

```sh
$ yum info jq
Loaded plugins: fastestmirror, langpacks
Repository epel is listed more than once in the configuration
Repository google-chrome is listed more than once in the configuration
Loading mirror speeds from cached hostfile
 * webtatic: us-east.repo.webtatic.com
Installed Packages
Name        : jq
Arch        : x86_64
Version     : 1.6
Release     : 2.el7
Size        : 381 k
Repo        : installed
From repo   : epel
Summary     : Command-line JSON processor
URL         : http://stedolan.github.io/jq/
License     : MIT and ASL 2.0 and CC-BY and GPLv3
Description : lightweight and flexible command-line JSON processor
            :
            :  jq is like sed for JSON data – you can use it to slice
            :  and filter and map and transform structured data with
            :  the same ease that sed, awk, grep and friends let you
            :  play with text.
            :
            :  It is written in portable C, and it has zero runtime
            :  dependencies.
            :
            :  jq can mangle the data format that you have into the
            :  one that you want with very little effort, and the
            :  program to do so is often shorter and simpler than
            :  you'd expect.

$
```

安装：

```sh
$ sudo yum install -y jq
Loaded plugins: fastestmirror, langpacks
Repository epel is listed more than once in the configuration
Repository google-chrome is listed more than once in the configuration
Loading mirror speeds from cached hostfile
 * webtatic: uk.repo.webtatic.com
Resolving Dependencies
--> Running transaction check
---> Package jq.x86_64 0:1.6-2.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                  Arch                         Version                         Repository                  Size
========================================================================================================================
Installing:
 jq                       x86_64                       1.6-2.el7                       epel                       167 k

Transaction Summary
========================================================================================================================
Install  1 Package

Total download size: 167 k
Installed size: 381 k
Downloading packages:
jq-1.6-2.el7.x86_64.rpm                                                                          | 167 kB  00:00:00
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : jq-1.6-2.el7.x86_64                                                                                  1/1
  Verifying  : jq-1.6-2.el7.x86_64                                                                                  1/1

Installed:
  jq.x86_64 0:1.6-2.el7

Complete!
$
```



## 2. 基本使用

查看`jq`的版本信息和帮助信息：

```sh
$ jq --version
jq-1.6
$ jq --help
jq - commandline JSON processor [version 1.6]

Usage:	jq [options] <jq filter> [file...]
	jq [options] --args <jq filter> [strings...]
	jq [options] --jsonargs <jq filter> [JSON_TEXTS...]

jq is a tool for processing JSON inputs, applying the given filter to
its JSON text inputs and producing the filter's results as JSON on
standard output.

The simplest filter is ., which copies jq's input to its output
unmodified (except for formatting, but note that IEEE754 is used
for number representation internally, with all that that implies).

For more advanced filters see the jq(1) manpage ("man jq")
and/or https://stedolan.github.io/jq

Example:

	$ echo '{"foo": 0}' | jq .
	{
		"foo": 0
	}

Some of the options include:
  -c               compact instead of pretty-printed output;
  -n               use `null` as the single input value;
  -e               set the exit status code based on the output;
  -s               read (slurp) all inputs into an array; apply filter to it;
  -r               output raw strings, not JSON texts;
  -R               read raw strings, not JSON texts;
  -C               colorize JSON;
  -M               monochrome (don't colorize JSON);
  -S               sort keys of objects on output;
  --tab            use tabs for indentation;
  --arg a v        set variable $a to value <v>;
  --argjson a v    set variable $a to JSON value <v>;
  --slurpfile a f  set variable $a to an array of JSON texts read from <f>;
  --rawfile a f    set variable $a to a string consisting of the contents of <f>;
  --args           remaining arguments are string arguments, not files;
  --jsonargs       remaining arguments are JSON arguments, not files;
  --               terminates argument processing;

Named arguments are also available as $ARGS.named[], while
positional arguments are available as $ARGS.positional[].

See the manpage for more options.
$
```

### 2.1 按tutorial教程进行简单测试

#### 2.1.1 获取原始数据

GitHub提供JSON API,我们从`jq`仓库获取最新的3个提交。

```sh
$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=3'
[
  {
    "sha": "d18b2d078c2383d9472d0a0a226e07009025574f",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTpkMThiMmQwNzhjMjM4M2Q5NDcyZDBhMGEyMjZlMDcwMDkwMjU1NzRm",
    "commit": {
      "author": {
        "name": "itchyny",
        "email": "itchyny@hatena.ne.jp",
        "date": "2020-10-08T06:20:11Z"
      },
      "committer": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2021-05-01T18:34:26Z"
      },
      "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
      "tree": {
        "sha": "57806511d068cc7af6f857baf8d4b84b340f9990",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/57806511d068cc7af6f857baf8d4b84b340f9990"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
    "html_url": "https://github.com/stedolan/jq/commit/d18b2d078c2383d9472d0a0a226e07009025574f",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/d18b2d078c2383d9472d0a0a226e07009025574f/comments",
    "author": {
      "login": "itchyny",
      "id": 375258,
      "node_id": "MDQ6VXNlcjM3NTI1OA==",
      "avatar_url": "https://avatars.githubusercontent.com/u/375258?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/itchyny",
      "html_url": "https://github.com/itchyny",
      "followers_url": "https://api.github.com/users/itchyny/followers",
      "following_url": "https://api.github.com/users/itchyny/following{/other_user}",
      "gists_url": "https://api.github.com/users/itchyny/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/itchyny/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/itchyny/subscriptions",
      "organizations_url": "https://api.github.com/users/itchyny/orgs",
      "repos_url": "https://api.github.com/users/itchyny/repos",
      "events_url": "https://api.github.com/users/itchyny/events{/privacy}",
      "received_events_url": "https://api.github.com/users/itchyny/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "cc4efc49e1eedb98289347bf264c50c5c8656e7c",
        "url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
        "html_url": "https://github.com/stedolan/jq/commit/cc4efc49e1eedb98289347bf264c50c5c8656e7c"
      }
    ]
  },
  {
    "sha": "cc4efc49e1eedb98289347bf264c50c5c8656e7c",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTpjYzRlZmM0OWUxZWVkYjk4Mjg5MzQ3YmYyNjRjNTBjNWM4NjU2ZTdj",
    "commit": {
      "author": {
        "name": "Mattias Wadman",
        "email": "mattias.wadman@gmail.com",
        "date": "2021-02-21T16:49:23Z"
      },
      "committer": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2021-05-01T18:33:01Z"
      },
      "message": "Fix incorrect if empty string example",
      "tree": {
        "sha": "ed9619cf4d31a028a8dd60eb6d313f5c3057372a",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/ed9619cf4d31a028a8dd60eb6d313f5c3057372a"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
    "html_url": "https://github.com/stedolan/jq/commit/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c/comments",
    "author": {
      "login": "wader",
      "id": 185566,
      "node_id": "MDQ6VXNlcjE4NTU2Ng==",
      "avatar_url": "https://avatars.githubusercontent.com/u/185566?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wader",
      "html_url": "https://github.com/wader",
      "followers_url": "https://api.github.com/users/wader/followers",
      "following_url": "https://api.github.com/users/wader/following{/other_user}",
      "gists_url": "https://api.github.com/users/wader/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wader/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wader/subscriptions",
      "organizations_url": "https://api.github.com/users/wader/orgs",
      "repos_url": "https://api.github.com/users/wader/repos",
      "events_url": "https://api.github.com/users/wader/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wader/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "e615bdc407ddcb82f1d78f1651464ad28e287954",
        "url": "https://api.github.com/repos/stedolan/jq/commits/e615bdc407ddcb82f1d78f1651464ad28e287954",
        "html_url": "https://github.com/stedolan/jq/commit/e615bdc407ddcb82f1d78f1651464ad28e287954"
      }
    ]
  },
  {
    "sha": "e615bdc407ddcb82f1d78f1651464ad28e287954",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTplNjE1YmRjNDA3ZGRjYjgyZjFkNzhmMTY1MTQ2NGFkMjhlMjg3OTU0",
    "commit": {
      "author": {
        "name": "mjarosie",
        "email": "mjarosie@users.noreply.github.com",
        "date": "2021-02-01T21:09:22Z"
      },
      "committer": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2021-05-01T18:32:38Z"
      },
      "message": "update the version available through Chocolatey",
      "tree": {
        "sha": "a90395af69a11ed29f935c651fa82125492e2697",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/a90395af69a11ed29f935c651fa82125492e2697"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/e615bdc407ddcb82f1d78f1651464ad28e287954",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/e615bdc407ddcb82f1d78f1651464ad28e287954",
    "html_url": "https://github.com/stedolan/jq/commit/e615bdc407ddcb82f1d78f1651464ad28e287954",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/e615bdc407ddcb82f1d78f1651464ad28e287954/comments",
    "author": {
      "login": "mjarosie",
      "id": 9082353,
      "node_id": "MDQ6VXNlcjkwODIzNTM=",
      "avatar_url": "https://avatars.githubusercontent.com/u/9082353?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/mjarosie",
      "html_url": "https://github.com/mjarosie",
      "followers_url": "https://api.github.com/users/mjarosie/followers",
      "following_url": "https://api.github.com/users/mjarosie/following{/other_user}",
      "gists_url": "https://api.github.com/users/mjarosie/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/mjarosie/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/mjarosie/subscriptions",
      "organizations_url": "https://api.github.com/users/mjarosie/orgs",
      "repos_url": "https://api.github.com/users/mjarosie/repos",
      "events_url": "https://api.github.com/users/mjarosie/events{/privacy}",
      "received_events_url": "https://api.github.com/users/mjarosie/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "9600a5c78141051adc08362b9c5446a15ae4d9a4",
        "url": "https://api.github.com/repos/stedolan/jq/commits/9600a5c78141051adc08362b9c5446a15ae4d9a4",
        "html_url": "https://github.com/stedolan/jq/commit/9600a5c78141051adc08362b9c5446a15ae4d9a4"
      }
    ]
  }
]
$
```

此时，可以看到，GitHub返回格式化好的json。 对于不这样的服务器，通过`jq`将通过管道漂亮打印出结果。 

#### 2.1.2 美化json输出

最简单的`jq`程序是表达式`.`,它取得了输入，并将其与输出保持不变。

```sh
$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=3'|jq '.'
[
  {
    "sha": "d18b2d078c2383d9472d0a0a226e07009025574f",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTpkMThiMmQwNzhjMjM4M2Q5NDcyZDBhMGEyMjZlMDcwMDkwMjU1NzRm",
    "commit": {
      "author": {
        "name": "itchyny",
        "email": "itchyny@hatena.ne.jp",
        "date": "2020-10-08T06:20:11Z"
      },
      "committer": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2021-05-01T18:34:26Z"
      },
      "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
      "tree": {
        "sha": "57806511d068cc7af6f857baf8d4b84b340f9990",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/57806511d068cc7af6f857baf8d4b84b340f9990"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
    "html_url": "https://github.com/stedolan/jq/commit/d18b2d078c2383d9472d0a0a226e07009025574f",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/d18b2d078c2383d9472d0a0a226e07009025574f/comments",
    "author": {
      "login": "itchyny",
      "id": 375258,
      "node_id": "MDQ6VXNlcjM3NTI1OA==",
      "avatar_url": "https://avatars.githubusercontent.com/u/375258?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/itchyny",
      "html_url": "https://github.com/itchyny",
      "followers_url": "https://api.github.com/users/itchyny/followers",
      "following_url": "https://api.github.com/users/itchyny/following{/other_user}",
      "gists_url": "https://api.github.com/users/itchyny/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/itchyny/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/itchyny/subscriptions",
      "organizations_url": "https://api.github.com/users/itchyny/orgs",
      "repos_url": "https://api.github.com/users/itchyny/repos",
      "events_url": "https://api.github.com/users/itchyny/events{/privacy}",
      "received_events_url": "https://api.github.com/users/itchyny/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "cc4efc49e1eedb98289347bf264c50c5c8656e7c",
        "url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
        "html_url": "https://github.com/stedolan/jq/commit/cc4efc49e1eedb98289347bf264c50c5c8656e7c"
      }
    ]
  },
  {
    "sha": "cc4efc49e1eedb98289347bf264c50c5c8656e7c",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTpjYzRlZmM0OWUxZWVkYjk4Mjg5MzQ3YmYyNjRjNTBjNWM4NjU2ZTdj",
    "commit": {
      "author": {
        "name": "Mattias Wadman",
        "email": "mattias.wadman@gmail.com",
        "date": "2021-02-21T16:49:23Z"
      },
      "committer": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2021-05-01T18:33:01Z"
      },
      "message": "Fix incorrect if empty string example",
      "tree": {
        "sha": "ed9619cf4d31a028a8dd60eb6d313f5c3057372a",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/ed9619cf4d31a028a8dd60eb6d313f5c3057372a"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
    "html_url": "https://github.com/stedolan/jq/commit/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c/comments",
    "author": {
      "login": "wader",
      "id": 185566,
      "node_id": "MDQ6VXNlcjE4NTU2Ng==",
      "avatar_url": "https://avatars.githubusercontent.com/u/185566?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wader",
      "html_url": "https://github.com/wader",
      "followers_url": "https://api.github.com/users/wader/followers",
      "following_url": "https://api.github.com/users/wader/following{/other_user}",
      "gists_url": "https://api.github.com/users/wader/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wader/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wader/subscriptions",
      "organizations_url": "https://api.github.com/users/wader/orgs",
      "repos_url": "https://api.github.com/users/wader/repos",
      "events_url": "https://api.github.com/users/wader/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wader/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "e615bdc407ddcb82f1d78f1651464ad28e287954",
        "url": "https://api.github.com/repos/stedolan/jq/commits/e615bdc407ddcb82f1d78f1651464ad28e287954",
        "html_url": "https://github.com/stedolan/jq/commit/e615bdc407ddcb82f1d78f1651464ad28e287954"
      }
    ]
  },
  {
    "sha": "e615bdc407ddcb82f1d78f1651464ad28e287954",
    "node_id": "MDY6Q29tbWl0NTEwMTE0MTplNjE1YmRjNDA3ZGRjYjgyZjFkNzhmMTY1MTQ2NGFkMjhlMjg3OTU0",
    "commit": {
      "author": {
        "name": "mjarosie",
        "email": "mjarosie@users.noreply.github.com",
        "date": "2021-02-01T21:09:22Z"
      },
      "committer": {
        "name": "William Langford",
        "email": "wlangfor@gmail.com",
        "date": "2021-05-01T18:32:38Z"
      },
      "message": "update the version available through Chocolatey",
      "tree": {
        "sha": "a90395af69a11ed29f935c651fa82125492e2697",
        "url": "https://api.github.com/repos/stedolan/jq/git/trees/a90395af69a11ed29f935c651fa82125492e2697"
      },
      "url": "https://api.github.com/repos/stedolan/jq/git/commits/e615bdc407ddcb82f1d78f1651464ad28e287954",
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "url": "https://api.github.com/repos/stedolan/jq/commits/e615bdc407ddcb82f1d78f1651464ad28e287954",
    "html_url": "https://github.com/stedolan/jq/commit/e615bdc407ddcb82f1d78f1651464ad28e287954",
    "comments_url": "https://api.github.com/repos/stedolan/jq/commits/e615bdc407ddcb82f1d78f1651464ad28e287954/comments",
    "author": {
      "login": "mjarosie",
      "id": 9082353,
      "node_id": "MDQ6VXNlcjkwODIzNTM=",
      "avatar_url": "https://avatars.githubusercontent.com/u/9082353?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/mjarosie",
      "html_url": "https://github.com/mjarosie",
      "followers_url": "https://api.github.com/users/mjarosie/followers",
      "following_url": "https://api.github.com/users/mjarosie/following{/other_user}",
      "gists_url": "https://api.github.com/users/mjarosie/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/mjarosie/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/mjarosie/subscriptions",
      "organizations_url": "https://api.github.com/users/mjarosie/orgs",
      "repos_url": "https://api.github.com/users/mjarosie/repos",
      "events_url": "https://api.github.com/users/mjarosie/events{/privacy}",
      "received_events_url": "https://api.github.com/users/mjarosie/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "wtlangford",
      "id": 3422295,
      "node_id": "MDQ6VXNlcjM0MjIyOTU=",
      "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/wtlangford",
      "html_url": "https://github.com/wtlangford",
      "followers_url": "https://api.github.com/users/wtlangford/followers",
      "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
      "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
      "organizations_url": "https://api.github.com/users/wtlangford/orgs",
      "repos_url": "https://api.github.com/users/wtlangford/repos",
      "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
      "received_events_url": "https://api.github.com/users/wtlangford/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "sha": "9600a5c78141051adc08362b9c5446a15ae4d9a4",
        "url": "https://api.github.com/repos/stedolan/jq/commits/9600a5c78141051adc08362b9c5446a15ae4d9a4",
        "html_url": "https://github.com/stedolan/jq/commit/9600a5c78141051adc08362b9c5446a15ae4d9a4"
      }
    ]
  }
]
$
```

此时，我们可以看到，虽然结果相同，但现在的输出结果中，已经美化过了，变得非常漂亮了。

![](https://meizhaohui.gitee.io/imagebed/img/20210821171120.png)

为了加快我们测试，我先将`curl`请求的结果保存到本地文件中。

```sh
$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=3' > data.json
$
```



#### 2.1.3 获取单一子元素

获取第一个提交。

```sh
$ cat data.json |jq '.[0]'
{
  "sha": "d18b2d078c2383d9472d0a0a226e07009025574f",
  "node_id": "MDY6Q29tbWl0NTEwMTE0MTpkMThiMmQwNzhjMjM4M2Q5NDcyZDBhMGEyMjZlMDcwMDkwMjU1NzRm",
  "commit": {
    "author": {
      "name": "itchyny",
      "email": "itchyny@hatena.ne.jp",
      "date": "2020-10-08T06:20:11Z"
    },
    "committer": {
      "name": "William Langford",
      "email": "wlangfor@gmail.com",
      "date": "2021-05-01T18:34:26Z"
    },
    "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
    "tree": {
      "sha": "57806511d068cc7af6f857baf8d4b84b340f9990",
      "url": "https://api.github.com/repos/stedolan/jq/git/trees/57806511d068cc7af6f857baf8d4b84b340f9990"
    },
    "url": "https://api.github.com/repos/stedolan/jq/git/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
    "comment_count": 0,
    "verification": {
      "verified": false,
      "reason": "unsigned",
      "signature": null,
      "payload": null
    }
  },
  "url": "https://api.github.com/repos/stedolan/jq/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
  "html_url": "https://github.com/stedolan/jq/commit/d18b2d078c2383d9472d0a0a226e07009025574f",
  "comments_url": "https://api.github.com/repos/stedolan/jq/commits/d18b2d078c2383d9472d0a0a226e07009025574f/comments",
  "author": {
    "login": "itchyny",
    "id": 375258,
    "node_id": "MDQ6VXNlcjM3NTI1OA==",
    "avatar_url": "https://avatars.githubusercontent.com/u/375258?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/itchyny",
    "html_url": "https://github.com/itchyny",
    "followers_url": "https://api.github.com/users/itchyny/followers",
    "following_url": "https://api.github.com/users/itchyny/following{/other_user}",
    "gists_url": "https://api.github.com/users/itchyny/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/itchyny/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/itchyny/subscriptions",
    "organizations_url": "https://api.github.com/users/itchyny/orgs",
    "repos_url": "https://api.github.com/users/itchyny/repos",
    "events_url": "https://api.github.com/users/itchyny/events{/privacy}",
    "received_events_url": "https://api.github.com/users/itchyny/received_events",
    "type": "User",
    "site_admin": false
  },
  "committer": {
    "login": "wtlangford",
    "id": 3422295,
    "node_id": "MDQ6VXNlcjM0MjIyOTU=",
    "avatar_url": "https://avatars.githubusercontent.com/u/3422295?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/wtlangford",
    "html_url": "https://github.com/wtlangford",
    "followers_url": "https://api.github.com/users/wtlangford/followers",
    "following_url": "https://api.github.com/users/wtlangford/following{/other_user}",
    "gists_url": "https://api.github.com/users/wtlangford/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/wtlangford/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/wtlangford/subscriptions",
    "organizations_url": "https://api.github.com/users/wtlangford/orgs",
    "repos_url": "https://api.github.com/users/wtlangford/repos",
    "events_url": "https://api.github.com/users/wtlangford/events{/privacy}",
    "received_events_url": "https://api.github.com/users/wtlangford/received_events",
    "type": "User",
    "site_admin": false
  },
  "parents": [
    {
      "sha": "cc4efc49e1eedb98289347bf264c50c5c8656e7c",
      "url": "https://api.github.com/repos/stedolan/jq/commits/cc4efc49e1eedb98289347bf264c50c5c8656e7c",
      "html_url": "https://github.com/stedolan/jq/commit/cc4efc49e1eedb98289347bf264c50c5c8656e7c"
    }
  ]
}
$
```

#### 2.1.4 元素过滤

有很多信息我们不关心，我们可以过滤出我们关心的字段。

如我们只关心`commit`信息：

```sh
$ cat data.json |jq '.[0].commit'
{
  "author": {
    "name": "itchyny",
    "email": "itchyny@hatena.ne.jp",
    "date": "2020-10-08T06:20:11Z"
  },
  "committer": {
    "name": "William Langford",
    "email": "wlangfor@gmail.com",
    "date": "2021-05-01T18:34:26Z"
  },
  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "tree": {
    "sha": "57806511d068cc7af6f857baf8d4b84b340f9990",
    "url": "https://api.github.com/repos/stedolan/jq/git/trees/57806511d068cc7af6f857baf8d4b84b340f9990"
  },
  "url": "https://api.github.com/repos/stedolan/jq/git/commits/d18b2d078c2383d9472d0a0a226e07009025574f",
  "comment_count": 0,
  "verification": {
    "verified": false,
    "reason": "unsigned",
    "signature": null,
    "payload": null
  }
}
$
```

现在如果我们只关心第一个提交的`message`和提交人的`name`姓名信息，则可以这样：

```sh
$ cat data.json |jq '.[0] | {message: .commit.message, name: .commit.committer.name}'{  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",  "name": "William Langford"}$ cat data.json |jq '.[0] | {CommitMessage: .commit.message, CommitterName: .commit.committer.name}'{  "CommitMessage": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",  "CommitterName": "William Langford"}$
```

效果如下图：

![](https://meizhaohui.gitee.io/imagebed/img/20210821172451.png)

可以看到，我们在`jq`命令内部的管道中，通过类似`message`/`name`或`CommitMessage`/`CommitterName`等来定义最后要显示的字段的名称，而通过`.commit.message`或`.commit.committer.name`来获取`json`数据中的关键信息。你可以通过`.`点号来访问嵌套属性，如`.commit.committer.name`。

#### 2.1.5 对所有元素进行过滤

对所有元素进行过滤。

获取所有的提交的提交消息和提交人信息。

```sh
$ cat data.json |jq '.[] | {message: .commit.message, name: .commit.committer.name}'
{
  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "name": "William Langford"
}
{
  "message": "Fix incorrect if empty string example",
  "name": "William Langford"
}
{
  "message": "update the version available through Chocolatey",
  "name": "William Langford"
}
```

> `.[]` returns each element of the array returned in the response, one at a time, which are all fed into `{message: .commit.message, name: .commit.committer.name}`.

`.[]`返回列表中的每一个元素，一次返回一个，并送入到后面的过滤器中。



在`jq`中数据是以流的形式进行传输的，每个`jq`表达式对其输入流的每个值进行操作，然后在输出流中可以生成任何数量的值。

只需要将`json`值与空格分开来序列化，这是一种`cat`友好的格式。你可以将两个`json`流合并到一起，并形成一个有效的`json`流。



#### 2.1.6 生成单个数组

如果您想将输出作为单个数组，您可以通过将过滤器包装在方括号中来告诉 `jq`收集所有结果。

你可以像下面这样：

```sh
$ cat data.json |jq '[.[] | {message: .commit.message, name: .commit.committer.name}]'
[
  {
    "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
    "name": "William Langford"
  },
  {
    "message": "Fix incorrect if empty string example",
    "name": "William Langford"
  },
  {
    "message": "update the version available through Chocolatey",
    "name": "William Langford"
  }
]
```

可以看到，已经将结果集中的三个对象放在数组中了。



#### 2.1.7 获取子元素的列表

每一个提交都有可能有多个父提交。现在我们来获取每个提交的父提交的散列值。

```sh
$ cat data.json |jq '[.[] | {message: .commit.message, name: .commit.committer.name, parents: [.parents[].sha]}]'
[
  {
    "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
    "name": "William Langford",
    "parents": [
      "cc4efc49e1eedb98289347bf264c50c5c8656e7c"
    ]
  },
  {
    "message": "Fix incorrect if empty string example",
    "name": "William Langford",
    "parents": [
      "e615bdc407ddcb82f1d78f1651464ad28e287954"
    ]
  },
  {
    "message": "update the version available through Chocolatey",
    "name": "William Langford",
    "parents": [
      "9600a5c78141051adc08362b9c5446a15ae4d9a4"
    ]
  }
]
```



## 3. jq手册页

你可以访问 [https://stedolan.github.io/jq/manual/](https://stedolan.github.io/jq/manual/) 获取在线手册页，也可以使用`man jq`命令获取`jq`的手册页。

- `jq`程序是一个过滤器，对输入流进入处理，然后返回输出流。
- `jq`有很多内置的过滤器。
- 可以对过滤器进行多种方式的组合。



下面我们一点点的来了解`jq`手册页中的内容，从简单的开始入手。

### 3.1  调用`jq`

> jq filters run on a stream of JSON data. The input to jq is parsed as a sequence of whitespace-separated JSON values which are passed through the provided filter one at a time. The output(s) of the filter are written to standard out, again as a sequence of whitespace-separated JSON data.

- `jq`过滤器运行在JSON数据流上。输入流是以`whitespace`分隔的JSON序列，输出流是以`whitespace`分隔的JSON序列，并输出到标准输出。
- 注意，在使用`jq`时，请使用单引号`'`进行引用，不要使用双引号，如`jq "foo"`将被理解为`jq foo`，此时会提示`foo`未定义。

#### 3.1.1 查看`jq`版本信息

```sh
$ jq --version
jq-1.6
```

#### 3.1.2 查看帮助信息

可以通过`man jq`查看`jq`的手册页，也可以使用`jq --help`获取简单的帮助信息。

```sh
$ jq --help
jq - commandline JSON processor [version 1.6]

Usage:	jq [options] <jq filter> [file...]
	jq [options] --args <jq filter> [strings...]
	jq [options] --jsonargs <jq filter> [JSON_TEXTS...]

jq is a tool for processing JSON inputs, applying the given filter to
its JSON text inputs and producing the filter's results as JSON on
standard output.

The simplest filter is ., which copies jq's input to its output
unmodified (except for formatting, but note that IEEE754 is used
for number representation internally, with all that that implies).

For more advanced filters see the jq(1) manpage ("man jq")
and/or https://stedolan.github.io/jq

Example:

	$ echo '{"foo": 0}' | jq .
	{
		"foo": 0
	}

Some of the options include:
  -c               compact instead of pretty-printed output;
  -n               use `null` as the single input value;
  -e               set the exit status code based on the output;
  -s               read (slurp) all inputs into an array; apply filter to it;
  -r               output raw strings, not JSON texts;
  -R               read raw strings, not JSON texts;
  -C               colorize JSON;
  -M               monochrome (don't colorize JSON);
  -S               sort keys of objects on output;
  --tab            use tabs for indentation;
  --arg a v        set variable $a to value <v>;
  --argjson a v    set variable $a to JSON value <v>;
  --slurpfile a f  set variable $a to an array of JSON texts read from <f>;
  --rawfile a f    set variable $a to a string consisting of the contents of <f>;
  --args           remaining arguments are string arguments, not files;
  --jsonargs       remaining arguments are JSON arguments, not files;
  --               terminates argument processing;

Named arguments are also available as $ARGS.named[], while
positional arguments are available as $ARGS.positional[].

See the manpage for more options.
$
```



#### 3.1.3  忽略参数

现阶段有些参数不明白什么意思。此处记录一下。

- `--seq `：使用 application/json-seq MIME 类型方案在 jq 的输入和输出中分隔 JSON 文本。
- `--stream`: 以流形式解析输入。
- `--unbuffered`: 如果有慢速数据源输入到`jq`的话，打印每个JSON对象后刷新输出。
- `-Ldirectory` / `-L directory`: 在指定目录搜索模块，此时将忽略内置模块。
- `-e` / `--exit-status`: 退出码设置。



#### 3.1.4 将JSON数据一次读入到数组中

- `--slurp`/`-s`参数可以一次将JSON数据读入到数组中。

请看以下示例。

我们先准备一个测试用的JSON文件`test.json`，文件内容如下：

```json
{"name":"网站","num":3,"sites":["Google", "Runoob", "Taobao"]}
```

测试数据来源: [https://www.runoob.com/json/js-json-arrays.html](https://www.runoob.com/json/js-json-arrays.html)

先不使用参数，直接输出，看看效果：

```sh
$ cat test.json |jq
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
```

使用`-s`或`--slurp`参数，查看输出结果：

```sh
$ cat test.json |jq -s
[
  {
    "name": "网站",
    "num": 3,
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  }
]
```

可以看到，在输出结果中多出了第一行的`[`和最后一行的`]`。

使用`-s`参数一次将JSON数据加入到数组(array)中，形成一个大的数组(array)。





#### 3.1.5 不解析JSON数据

- `--raw-input`/`-R`: 可以使用该参数以字符串形式显示，不解析JSON数据。如果如`-s`参数一起使用，则输出一行长的字符串。

测试如下：

```sh
$ cat test.json |jq -R
"{"
"\"name\":\"网站\","
"\"num\":3,"
"\"sites\":[\"Google\", \"Runoob\", \"Taobao\"]"
"}"
""
$ cat test.json |jq --raw-input
"{"
"\"name\":\"网站\","
"\"num\":3,"
"\"sites\":[\"Google\", \"Runoob\", \"Taobao\"]"
"}"
""
$
```

可以看到，数据没有当JSON字符解析。



与`-s`参数一起使用：

```sh
$ cat test.json |jq -sR
"{\n\"name\":\"网站\",\n\"num\":3,\n\"sites\":[\"Google\", \"Runoob\", \"Taobao\"]\n}\n\n"
```

此时仅显示了一个单行的长字符串。



#### 3.1.6 不解析任何输入流

- `--null-input`/`-n`:  不解析任何输入流，用`null`作为输入，当将`jq`作为简单的计算器的时候，这比较有用。

我们测试一下：

```sh
$ cat test.json|jq -n
null
$ echo ''|jq -n
null

# 加法
$ echo ''|jq -n '2+3'
5

# 减法
$ echo ''|jq -n '2-3'
-1

# 乘法
$ echo ''|jq -n '2 * 3'
6
$ echo ''|jq --null-input '2 * 3'
6

# 除法
$ echo ''|jq -n '2 / 3'
0.6666666666666666

# 取模
$ echo ''|jq -n '4 % 4'
0
$ echo ''|jq -n '5 % 4'
1
$ echo ''|jq -n '6 % 4'
2
```

可以看到，使用`jq`进行了简单的加减乘除运算，取模运算。



#### 3.1.7 输出紧凑的数据

- `--compact-output`/ `-c`:默认情况下，JQ漂亮打印JSON输出。 使用此选项将导致更紧凑的输出，而是将每个JSON对象放在一行输出。 

```sh
$ cat test.json |jq
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$ cat test.json |jq -c
{"name":"网站","num":3,"sites":["Google","Runoob","Taobao"]}
$ cat test.json |jq --compact-output
{"name":"网站","num":3,"sites":["Google","Runoob","Taobao"]}
$
```

可以看到，使用`-c`参数输出的数据更加紧凑。而默认情况下，输出的JSON数据会更加漂亮。



#### 3.1.8 使用Tab作为缩进

- `--tab`: 默认情况下，使用2个空格作为缩进，可以使用`--tab`参数使用Tab作为缩进。

```sh
$ cat test.json |jq --tab
{
	"name": "网站",
	"num": 3,
	"sites": [
		"Google",
		"Runoob",
		"Taobao"
	]
}
```

说明：由于markdown显示的问题，上面控制台输出是异常的。

请看以下图片中的效果：

![](https://meizhaohui.gitee.io/imagebed/img/20210825204936.png)



#### 3.1.9 设置缩进的空格数

- `--indent n`: 默认情况下，使用2个空格作为缩进，你可以通过使用本参数，设置n的值，以n个空格作为缩进。注意n不能超过7。

```sh
$ cat test.json |jq --indent 1
{
 "name": "网站",
 "num": 3,
 "sites": [
  "Google",
  "Runoob",
  "Taobao"
 ]
}
$ cat test.json |jq --indent 2
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$ cat test.json |jq --indent 3
{
   "name": "网站",
   "num": 3,
   "sites": [
      "Google",
      "Runoob",
      "Taobao"
   ]
}
$ cat test.json |jq --indent 4
{
    "name": "网站",
    "num": 3,
    "sites": [
        "Google",
        "Runoob",
        "Taobao"
    ]
}
$ cat test.json |jq --indent 5
{
     "name": "网站",
     "num": 3,
     "sites": [
          "Google",
          "Runoob",
          "Taobao"
     ]
}
$ cat test.json |jq --indent 6
{
      "name": "网站",
      "num": 3,
      "sites": [
            "Google",
            "Runoob",
            "Taobao"
      ]
}
$ cat test.json |jq --indent 7
{
       "name": "网站",
       "num": 3,
       "sites": [
              "Google",
              "Runoob",
              "Taobao"
       ]
}
$ cat test.json |jq --indent 8
jq: --indent takes a number between -1 and 7
Use jq --help for help with command-line options,
or see the jq manpage, or online docs  at https://stedolan.github.io/jq
$ cat test.json |jq --indent 0
{"name":"网站","num":3,"sites":["Google","Runoob","Taobao"]}
$ cat test.json |jq --indent -1
{
	"name": "网站",
	"num": 3,
	"sites": [
		"Google",
		"Runoob",
		"Taobao"
	]
}
$ cat test.json |jq --indent -1|cat -A
{$
^I"name": "M-gM-=M-^QM-gM-+M-^Y",$
^I"num": 3,$
^I"sites": [$
^I^I"Google",$
^I^I"Runoob",$
^I^I"Taobao"$
^I]$
}$
$
```

可以看到：

- 当设置`--indent 0`时，与参数`-c`作用相当，按紧凑形式输出。
- 当设置`--indent -1`时，与参数`--tab`作用相当，按Tab形式输出。
- 当设置`--indent 2`时，与默认设置相同。

我们可以设置`--indent 4`缩进为4个空格，这种更漂亮美观。



#### 3.1.10 颜色开关设置

- `--color-output` / `-C` and `--monochrome-output` / `-M`: 默认情况下，`jq
`会输出彩色的JSON数据到终端，你可以使用`-C`参数来强制使用彩色输出，即使你使用了管道或者输出到文件。也可以使用`-M`参数来关掉彩色输出，这样就是单色输出了。

```sh
$ cat test.json |jq
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$ cat test.json |jq -M
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$ cat test.json |jq --monochrome-output
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
```

在控制台看不出效果，请看以下效果图：

![](https://meizhaohui.gitee.io/imagebed/img/20210825212233.png)

可以看到，使用`-M`参数已经关掉了彩色输出。



我们也可以使用`-C`参数，设置一直保持彩色输出。

```sh
$ cat test.json |jq
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}

# 在jq输出后，再使用管道后，再次查看时没有彩色输出
$ cat test.json |jq|cat
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}

# 在jq -C输出后，再使用管道后，再次查看时仍然有彩色输出
$ cat test.json |jq -C|cat
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$ cat test.json |jq -C|cat|grep num
  "num": 3,
$ cat test.json |jq -C|cat|grep name
  "name": "网站",
$
```

效果图如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210825212453.png)



同样，我们可以将彩色输出写入到文件中。

```sh
$ cat test.json |jq -C > out.json
$ cat out.json
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$
```

此时，可以看到，直接查看`out.json`的内容时，就有彩色输出：

![](https://meizhaohui.gitee.io/imagebed/img/20210825212928.png)

可以通过配置环境变量`JQ_COLORS`来改变默认的颜色输出。请参考后续章节。



#### 3.1.11  以ASCII码输出数据

- `--ascii-output` / `-a`: JQ通常将非ASCII编码的字符输出为UTF-8，即使输入作为转义序列指定的输入（如`\u03bc`）。 使用此选项，您可以强制JQ生成纯ASCII输出，每个非ASCII字符用等效的转义序列替换。 

```sh
$ echo '"\u03bc"'|jq
"μ"
$ echo '"\u03bc"'|jq -a
"\u03bc"
$ echo '"\u03bc"'|jq --ascii-output
"\u03bc"
$ cat test.json |jq
{
  "name": "网站",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$ cat test.json |jq -a
{
  "name": "\u7f51\u7ad9",
  "num": 3,
  "sites": [
    "Google",
    "Runoob",
    "Taobao"
  ]
}
$
```

可以看到，像拉丁字母和中文都被转义成转义序列了。



#### 3.1.12 对对象的键进行排序

- `--sort-keys` / `-S`: 该参数可以对所有对象的字段(键)进行升序排序。

假设我们的`data1.json`内容如下：

```json
[
  {
    "name": "网站",
    "inum": 1,
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  },
  {
    "tame": "网站",
    "anum": 2,
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  },
  {
    "name": "网站",
    "nbum": 3,
    "osites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  }
]
```

现在我们对其输出时使用`-S`参数，注意是大写`S`。

```sh
$ cat test1.json |jq
[
  {
    "name": "网站",
    "inum": 1,
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  },
  {
    "tame": "网站",
    "anum": 2,
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  },
  {
    "name": "网站",
    "nbum": 3,
    "osites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  }
]
```

默认情况下，并没有对字段进行排序，原样显示出来。

使用`-S`参数：

```sh
$ cat test1.json |jq -S
[
  {
    "inum": 1,
    "name": "网站",
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  },
  {
    "anum": 2,
    "sites": [
      "Google",
      "Runoob",
      "Taobao"
    ],
    "tame": "网站"
  },
  {
    "name": "网站",
    "nbum": 3,
    "osites": [
      "Google",
      "Runoob",
      "Taobao"
    ]
  }
]
$
```

可以看到，每个对象中的字段名称已经排序了。

#### 3.1.13 输出原始字符串而非JSON字符串

- `--raw-output` / `-r`: 直接原样输出字符串而不是JSON数据。

```sh
$ echo '"non-JSON-based systems."'|jq
"non-JSON-based systems."
$ echo '"non-JSON-based systems."'|jq -r
non-JSON-based systems.
$ echo '"non-JSON-based systems."'|jq --raw-output
non-JSON-based systems.
$
```

可以看到使用`-r`参数后，输出没有最外面的双引号。



另外，还有一个参数：

- `--join-output` / `-j`: 与`-r`参数类似，但是不自动添加换行符。

```sh
$ echo '"non-JSON-based systems."'|jq -j
non-JSON-based systems.$
$
$ echo '"non-JSON-based systems."'|jq --join-output
non-JSON-based systems.$
$
```

可以看到，输出`non-JSON-based systems.`信息后，控制台直接在后面输出了终端控制符`$ `。



#### 3.1.14 从文件中读取过滤器

`jq`支持类似`awk -f`命令一样的参数：

- `-f filename` / `--from-file filename`

通过该参数，我们可以直接将过滤器写在文件中，然后进行过滤操作。

我们以2.1.5节的对所有元素进行过滤的示例，来进行说明。

获取所有的提交的提交消息和提交人信息。

```sh
$ cat data.json |jq '.[] | {message: .commit.message, name: .commit.committer.name}'
{
  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "name": "William Langford"
}
{
  "message": "Fix incorrect if empty string example",
  "name": "William Langford"
}
{
  "message": "update the version available through Chocolatey",
  "name": "William Langford"
}
```

我们将过滤器字符串`.[] | {message: .commit.message, name: .commit.committer.name}`写入到`test.jq`文件(**注意，不要两侧的单引号**)。

```sh
$ cat test.jq
# filter in the file
.[] | {message: .commit.message, name: .commit.committer.name}

$ cat data.json |jq -f test.jq
{
  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "name": "William Langford"
}
{
  "message": "Fix incorrect if empty string example",
  "name": "William Langford"
}
{
  "message": "update the version available through Chocolatey",
  "name": "William Langford"
}
$ cat data.json |jq --from-file test.jq
{
  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "name": "William Langford"
}
{
  "message": "Fix incorrect if empty string example",
  "name": "William Langford"
}
{
  "message": "update the version available through Chocolatey",
  "name": "William Langford"
}
```

可以看到，执行的结果与在命令行的输出是一致的。



这样，当学习了`jq`更复杂的语法后，可以在文件中写出更加复杂的过滤器。这个使用通过文件加载过滤器会更加方便。此处只是一个简单的示例。

#### 3.1.15 向过滤中传递参数

##### 3.1.15.1 向过滤中传递字符串参数

- `--arg name value`:

> This option passes a value to the jq program as a predefined  variable. If you run jq with `--arg foo bar`, then `$foo` is  available in the program and has the value `"bar"`. Note that  `value` will be treated as a string, so `--arg foo 123` will  bind `$foo` to `"123"`.

该参数可以向`jq`程序中传递变量，注意，使用`--arg foo 123`传递的变量`foo`的值是字符串`123`，不是整数。

```sh
$ echo '[1,2,3]'|jq --arg tool "jq " '.[]*$tool'
"jq "
"jq jq "
"jq jq jq "
$
```

可以看到，整数和字符串相乘，是将字符串进行重复拼接在一起。

```sh
$ echo '[1,2,3]'|jq --arg num "2" '.[]*$num'
"2"
"22"
"222"
```

此时，可以看到`num`变量的值`2`是一个字符串，不是整型，使用乘法也是对字符串进行多次重复拼接的。



```sh
$ echo '["one", "two", "three"]'|jq --arg tool "jq"  --arg num "1" '.[] + " " + $tool + " and " + $num + " string"'
"one jq and 1 string"
"two jq and 1 string"
"three jq and 1 string"
$
```

此例中，可以看到，传递的参数`tool`和`num`都在过滤器中正常引用了，`$tool`引用`tool`变量，`$num`引用`num`变量，注意，变量名不需要使用`{}`包裹起来。



- 可以通过`$ARGS.named`来获取命名参数对象。

```sh
$ echo '[1,2,3]'|jq --arg num "2" --arg flag "true" '$ARGS.named'
{
  "num": "2",
  "flag": "true"
}
```

可以看到，我们提供的两个参数都包含在最终显示的对象中了。

也可以在命名参数对象中获取我们定义的参数：

```sh
$ echo '[1,2,3]'|jq --arg num "2" --arg flag "true" '$ARGS.named.flag + " " + $ARGS.named.num'
"true 2"
```

或者直接获取：

```sh
$ echo '[1,2,3]'|jq --arg num "2" --arg flag "true" '$flag + " " + $num'
"true 2"
```

获取的结果一样。

##### 3.1.15.2 向过滤器传递JSON数据参数

上述使用`--arg`传输的参数都是字符串类型。如果我们需要传递JSON数据类型的参数到`jq`过滤器中，则需要使用以下的`--argjson`参数。

- `--argjson name JSON-text`:

> This option passes a JSON-encoded value to the jq program as a  predefined variable. If you run jq with `--argjson foo 123`, then  `$foo` is available in the program and has the value `123`.

注意，对于字符串参数和对象参数，必须要用单引号包裹起来，其他类型的参数可以包裹也可以不包裹。

```sh
# 查看命名参数对象中的内容
$ echo '[1,2,3]'|jq --argjson mystr '"string"' --argjson myobject '{"key":"value"}' --argjson myarray [1,2,3,4] --argjson mynum 2 --argjson mybool true --argjson mynull null '$ARGS.named'
{
  "mystr": "string",
  "myobject": {
    "key": "value"
  },
  "myarray": [
    1,
    2,
    3,
    4
  ],
  "mynum": 2,
  "mybool": true,
  "mynull": null
}
$

# 查看各传入参数的类型，此条命令不懂没关系，要以忽略，后面专门会讲内置方法type等
$ echo '[1,2,3]'|jq --argjson mystr '"string"' --argjson myobject '{"key":"value"}' --argjson myarray '[1,2,3,4]' --argjson mynum '2' --argjson mybool 'true' --argjson mynull null '$ARGS.named|.[]|type'
"string"
"object"
"array"
"number"
"boolean"
"null"
```





##### 3.1.15.3 通过文件向过滤器中传递参数

我们也可以通过在JSON文件中定义好数据，然后再传入到变量中。使用以下参数：

- `--slurpfile variable-name filename`:

> This option reads all the JSON texts in the named file and binds  an array of the parsed JSON values to the given global variable.  If you run jq with `--slurpfile foo bar`, then `$foo` is available  in the program and has an array whose elements correspond to the  texts in the file named `bar`.

该参数会读取文件中的JSON文件，并解析JSON数据，然后放在一个array列表中，然后再绑定该列表到你定义的变量上。

现在假如我们有两个`json`文件，分别查看其内容：

```sh
$ cat arguments1.json
{
  "mystr": "string",
  "myobject": {
    "key": "value"
  },
  "myarray": [
    1,
    2,
    3,
    4
  ],
  "mynum": 2,
  "mybool": true,
  "mynull": null
}
$ cat arguments2.json
"tool"
$
```

使用`--slurpfile`参数解析JSON文件数据作为变量内容。

```sh
# 从JSON文件中读取数据并解析到array列表中，然后绑定到参数中
$ echo 'null'|jq --slurpfile data1 arguments1.json --slurpfile data2 arguments2.json '$ARGS.named'
{
  "data1": [
    {
      "mystr": "string",
      "myobject": {
        "key": "value"
      },
      "myarray": [
        1,
        2,
        3,
        4
      ],
      "mynum": 2,
      "mybool": true,
      "mynull": null
    }
  ],
  "data2": [
    "tool"
  ]
}

# 查看获取的两个参数的类型，可以看到，是array列表类型
$ echo 'null'|jq --slurpfile data1 arguments1.json --slurpfile data2 arguments2.json '$ARGS.named|.[]|type'
"array"
"array"
$

# 获取data1参数的值
$ echo 'null'|jq --slurpfile data1 arguments1.json --slurpfile data2 arguments2.json '$ARGS.named.data1'
[
  {
    "mystr": "string",
    "myobject": {
      "key": "value"
    },
    "myarray": [
      1,
      2,
      3,
      4
    ],
    "mynum": 2,
    "mybool": true,
    "mynull": null
  }
]


# 获取data2参数的值
$ echo 'null'|jq --slurpfile data1 arguments1.json --slurpfile data2 arguments2.json '$ARGS.named.data2'
[
  "tool"
]
$
```

也可以直接像下面这样获取变量的值：

```sh
$ echo 'null'|jq --slurpfile data1 arguments1.json --slurpfile data2 arguments2.json '$data1'
[
  {
    "mystr": "string",
    "myobject": {
      "key": "value"
    },
    "myarray": [
      1,
      2,
      3,
      4
    ],
    "mynum": 2,
    "mybool": true,
    "mynull": null
  }
]
$ echo 'null'|jq --slurpfile data1 arguments1.json --slurpfile data2 arguments2.json '$data2'
[
  "tool"
]
$
```



##### 3.1.15.4 通过文件向过滤器中传递原始字符串参数

我们也可在一个普通文件定义好数据，然后再传入到变量中。使用以下参数：

- `--rawfile variable-name filename`:

> This option reads in the named file and binds its contents to the given  global variable.  If you run jq with `--rawfile foo bar`, then `$foo` is  available in the program and has a string whose contents are to the texts  in the file named `bar`.

该参数会读取文件中的所有内容，然后直接当普通文本绑定到你定义的变量上。

请看下面示例。

```sh
# 复制文件
$ cp arguments1.json arguments1.txt
$ cp arguments2.json arguments2.txt
$ cat arguments2.txt
"tool"

# 查看命名参数对象中的值
$ echo 'null'|jq --rawfile data1 arguments1.txt --rawfile data2 arguments2.txt '$ARGS.named'
{
  "data1": "{\n  \"mystr\": \"string\",\n  \"myobject\": {\n    \"key\": \"value\"\n  },\n  \"myarray\": [\n    1,\n    2,\n    3,\n    4\n  ],\n  \"mynum\": 2,\n  \"mybool\": true,\n  \"mynull\": null\n}\n",
  "data2": "\"tool\"\n"
}

# 查看data1参数的值
$ echo 'null'|jq --rawfile data1 arguments1.txt --rawfile data2 arguments2.txt '$data1'
"{\n  \"mystr\": \"string\",\n  \"myobject\": {\n    \"key\": \"value\"\n  },\n  \"myarray\": [\n    1,\n    2,\n    3,\n    4\n  ],\n  \"mynum\": 2,\n  \"mybool\": true,\n  \"mynull\": null\n}\n"

# 查看data2参数的值
$ echo 'null'|jq --rawfile data1 arguments1.txt --rawfile data2 arguments2.txt '$data2'
"\"tool\"\n"
$
```



##### 3.1.15.5 向过滤器中传递字符串位置参数

我们也可以将位置参数传递到过滤器中。使用以下参数：

- `--args`:

> Remaining arguments are positional string arguments.  These are  available to the jq program as `$ARGS.positional[]`.



剩下的参数是位置参数，可以使用`$ARGS.positional[]`获取位置参数。

可以像下面这样使用：

```sh
$ echo 'null'|jq '$ARGS' --arg tool "jq" --args '"positional argument one"' "positional argument two"
{
  "positional": [
    "\"positional argument one\"",
    "positional argument two"
  ],
  "named": {
    "tool": "jq"
  }
}
$ echo 'null'|jq '$ARGS.positional[]' --arg tool "jq" --args '"positional argument one"' "positional argument two"
"\"positional argument one\""
"positional argument two"
$
```

可以看到：

- 使用位置参数时，默认不需要使用单引号将需要传递的参数包裹起来。使用单引号包裹时，`'"positional argument one"'`，会将包裹字符的双引号也作为位置参数的一部分输出。

另外，位置参数必须放在命令的最后的位置，否则会仅输出第一个位置参数。这个是经过多次试验才发现的，请看下面的示例：

```sh
$ echo 'null'|jq --arg tool "jq" --args '"positional argument one"' "positional argument two"  '$ARGS.positional[]'
"positional argument one"
$ echo 'null'|jq --arg tool "jq" --args '"positional argument one"' "positional argument two"  '$ARGS.positional'
"positional argument one"
$ echo 'null'|jq --arg tool "jq" --args '"positional argument one"' "positional argument two"  '$ARGS'
"positional argument one"
$ echo 'null'|jq --arg tool "jq" --args '"positional argument one"' "positional argument two"  '$'
"positional argument one"
$ echo 'null'|jq --arg tool "jq" --args '"positional argument one"' "positional argument two"  ''
"positional argument one"
$ echo 'null'|jq --arg tool "jq" --args '"positional argument one"' "positional argument two"
"positional argument one"
$
```

示例中，我将过滤器放在了位置参数后面，这个时候，无论我怎么修改后面的过滤器字符，如最开始的` '$ARGS.positional[]'`，到最后直接没有过滤器，`jq`输出的结果一直都是第一个位置参数`"positional argument one"`。

上面的将过滤器放在位置参数后面，实质是`jq`执行的是以下命令：

```sh
$ echo 'null'|jq '"positional argument one"'
"positional argument one"
```

如果将`'"positional argument one"'`两侧的单引号去掉，再执行则会抛出异常：

```sh
$ echo 'null'|jq --arg tool "jq" --args "positional argument one" '"positional argument two"'
jq: error: syntax error, unexpected IDENT, expecting $end (Unix shell quoting issues?) at <top-level>, line 1:
positional argument one
jq: 1 compile error
$ echo $?
3
$
```

可以看到异常退出，退出码是3。与执行下面的命令的异常是一样的：

```sh
$ echo 'null'|jq "positional argument one"
jq: error: syntax error, unexpected IDENT, expecting $end (Unix shell quoting issues?) at <top-level>, line 1:
positional argument one
jq: 1 compile error
$ echo $?
3
```

结合上面的执行结果可以知道，有以下结论：

- 位置参数应放在命令行参数的最后的位置。
- 位置参数的字符串默认不需要使用单引号包裹。



##### 3.1.15.6 向过滤器中传递JSON位置参数

我们也可以将位置参数传递到过滤器中。使用以下参数：

- `--jsonargs`:

> Remaining arguments are positional JSON text arguments.  These  are available to the jq program as `$ARGS.positional[]`.



剩下的参数是JSON位置参数，可以使用`$ARGS.positional[]`获取位置参数。

有了上一节的测试，此处就知道直接将JSON型的位置参数放置在命令行的最后面，直接看下面的示例：

```sh
# 同时传递命名参数、字符串型位置参数、JSON型的位置参数到过滤器中
# 通过'$ARGS'可以打印所有的位置参数和命名参数
$ echo 'null'|jq '$ARGS' --arg tool "jq" --args '"positional argument one"' "positional argument two" --jsonargs true false '{"key":"value"}' null 2 '"string"'
{
  "positional": [
    "\"positional argument one\"",
    "positional argument two",
    true,
    false,
    {
      "key": "value"
    },
    null,
    2,
    "string"
  ],
  "named": {
    "tool": "jq"
  }
}

# 获取位置参数列表
$ echo 'null'|jq '$ARGS.positional[]' --arg tool "jq" --args '"positional argument one"' "positional argument two" --jsonargs true false '{"key":"value"}' null 2 '"string"'
"\"positional argument one\""
"positional argument two"
true
false
{
  "key": "value"
}
null
2
"string"


# 查看位置参数的各元素的数据类型
$ echo 'null'|jq '$ARGS.positional[]|type' --arg tool "jq" --args '"positional argument one"' "positional argument two" --jsonargs true false '{"key":"value"}' null 2 '"string"'
"string"
"string"
"boolean"
"boolean"
"object"
"null"
"number"
"string"
$
```



#### 3.1.16 运行测试用例

最后一个参数。

- `--run-tests [filename]`:

> Runs the tests in the given file or standard input.  This must  be the last option given and does not honor all preceding  options.  The input consists of comment lines, empty lines, and  program lines followed by one input line, as many lines of  output as are expected (one per output), and a terminating empty  line.  Compilation failure tests start with a line containing  only "%%FAIL", then a line containing the program to compile,  then a line containing an error message to compare to the  actual.
>
> Be warned that this option can change backwards-incompatibly.

在给定的文件或标准输入中运行测试，该参数是命令行最后一个参数。将会忽略前面的命令行参数选项。

测试文件的写法是这样的：

- 可以包含备注行，空行、程序行、输入行、输出行、终止的空行等。



你可以使用`git clone https://github.com/stedolan/jq.git`或`git clone git@github.com:stedolan/jq.git`下载`jq`的源码到本地，我这边已经下载好了。

```sh
[mzh@MacBookPro jq (master)]$ git remote -v
origin	git@github.com:meizhaohui/jq.git (fetch)
origin	git@github.com:meizhaohui/jq.git (push)
[mzh@MacBookPro jq (master)]$ ls
AUTHORS        Dockerfile     NEWS           appveyor.yml   config         jq.1.prebuilt  m4             sig
COPYING        KEYS           README         build          configure.ac   jq.spec        modules        src
ChangeLog      Makefile.am    README.md      compile-ios.sh docs           libjq.pc.in    scripts        tests
[mzh@MacBookPro jq (master)]$ ls tests/*.test
tests/base64.test   tests/jq.test       tests/man.test      tests/onig.test     tests/optional.test
```

可以看到在`tests`目录下面有几个以`.test`结尾的文件。这几个就是测试用例文件。

我们来看一下`tests.jq.test`文件，文件内容比较长，我们只看前100行：

```sh
[mzh@MacBookPro jq (master)]$ head -n 100 tests/jq.test
# Tests are groups of three lines: program, input, expected output
# Blank lines and lines starting with # are ignored

#
# Simple value tests to check parser. Input is irrelevant
#

true
null
true

false
null
false

null
42
null

1
null
1


-1
null
-1

# FIXME: much more number testing needed

{}
null
{}

[]
null
[]

{x: -1}
null
{"x": -1}

# The input line starts with a 0xFEFF (byte order mark) codepoint
# No, there is no reason to have a byte order mark in UTF8 text.
# But apparently people do, so jq shouldn't break on it.
.
"byte order mark"
"byte order mark"

# We test escapes by matching them against Unicode codepoints
# FIXME: more tests needed for weird unicode stuff (e.g. utf16 pairs)
"Aa\r\n\t\b\f\u03bc"
null
"Aa\u000d\u000a\u0009\u0008\u000c\u03bc"

.
"Aa\r\n\t\b\f\u03bc"
"Aa\u000d\u000a\u0009\u0008\u000c\u03bc"

"inter\("pol" + "ation")"
null
"interpolation"

@text,@json,([1,.] | (@csv, @tsv)),@html,@uri,@sh,@base64,(@base64 | @base64d)
"<>&'\"\t"
"<>&'\"\t"
"\"<>&'\\\"\\t\""
"1,\"<>&'\"\"\t\""
"1\t<>&'\"\\t"
"&lt;&gt;&amp;&apos;&quot;\t"
"%3C%3E%26'%22%09"
"'<>&'\\''\"\t'"
"PD4mJyIJ"
"<>&'\"\t"

# regression test for #436
@base64
"foóbar\n"
"Zm/Ds2Jhcgo="

@base64d
"Zm/Ds2Jhcgo="
"foóbar\n"

@uri
"\u03bc"
"%CE%BC"

@html "<b>\(.)</b>"
"<script>hax</script>"
"<b>&lt;script&gt;hax&lt;/script&gt;</b>"

[.[]|tojson|fromjson]
["foo", 1, ["a", 1, "b", 2, {"foo":"bar"}]]
["foo",1,["a",1,"b",2,{"foo":"bar"}]]

#
# Dictionary construction syntax
#

[mzh@MacBookPro jq (master)]$
```

我们直接将这100行保存到一个新的文件中去。

```sh
[mzh@MacBookPro jq (master)]$ head -n 100 tests/jq.test  > myjq.test
```

然后我们执行命令：
```sh
[mzh@MacBookPro jq (master ✗)]$ echo 'null'|jq '$ARGS.named' --arg tool "jq"
{
  "tool": "jq"
}
[mzh@MacBookPro jq (master ✗)]$ echo 'null'|jq '$ARGS.named' --arg tool "jq" --run-tests  myjq.test
Testing 'true' at line number 8
Testing 'false' at line number 12
Testing 'null' at line number 16
Testing '1' at line number 20
Testing '-1' at line number 25
Testing '{}' at line number 31
Testing '[]' at line number 35
Testing '{x: -1}' at line number 39
Testing '.' at line number 46
Testing '"Aa\r\n\t\b\f\u03bc"' at line number 52
Testing '.' at line number 56
Testing '"inter\("pol" + "ation")"' at line number 60
Testing '@text,@json,([1,.] | (@csv, @tsv)),@html,@uri,@sh,@base64,(@base64 | @base64d)' at line number 64
Testing '@base64' at line number 77
Testing '@base64d' at line number 81
Testing '@uri' at line number 85
Testing '@html "<b>\(.)</b>"' at line number 89
Testing '[.[]|tojson|fromjson]' at line number 93
18 of 18 tests passed (0 malformed)
[mzh@MacBookPro jq (master ✗)]$ echo $?
0
[mzh@MacBookPro jq (master ✗)]$
```

可以看到，`jq`直接忽略了`--run-tests`参数前的` '$ARGS.named' --arg tool "jq"`，只运行了测试用例。

我们来对比一下测试文件和输出结果，说明详见下图：

`![](https://meizhaohui.gitee.io/imagebed/img/20210827224132.png)



至此，我们已经实验完成所有的参数了！

可以看到，`jq`非常的强大，连参数都有这么多知识！加油！！









