# JSON解析工具-jq

[[toc]]

jq 是一个轻量级而且灵活的命令行 JSON 解析器，类似用于 JSON 数据的 sed 工具。

- jq官网地址：[https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)
- 官方教程：[https://stedolan.github.io/jq/tutorial/](https://stedolan.github.io/jq/tutorial/)
- 官方手册：[https://stedolan.github.io/jq/manual/](https://stedolan.github.io/jq/manual/)

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
$ cat data.json |jq '.[] | {message: .commit.message, name: .commit.committer.name}'{  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",  "name": "William Langford"}{  "message": "Fix incorrect if empty string example",  "name": "William Langford"}{  "message": "update the version available through Chocolatey",  "name": "William Langford"}$
```

> `.[]` returns each element of the array returned in the response, one at a time, which are all fed into `{message: .commit.message, name: .commit.committer.name}`.

`.[]`返回列表中的每一个元素，一次返回一个，并送入到后面的过滤器中。



在`jq`中数据是以流的形式进行传输的，每个`jq`表达式对其输入流的每个值进行操作，然后在输出流中可以生成任何数量的值。

只需要将`json`值与空格分开来序列化，这是一种`cat`友好的格式。你可以将两个`json`流合并到一起，并形成一个有效的`json`流。



#### 2.1.6 生成单个数组

如果您想将输出作为单个数组，您可以通过将过滤器包装在方括号中来告诉 `jq`收集所有结果。

你可以像下面这样：

```sh
$ cat data.json |jq '[.[] | {message: .commit.message, name: .commit.committer.name}]'[  {    "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",    "name": "William Langford"  },  {    "message": "Fix incorrect if empty string example",    "name": "William Langford"  },  {    "message": "update the version available through Chocolatey",    "name": "William Langford"  }]
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
$ jq --versionjq-1.6
```

#### 3.1.2 查看帮助信息

可以通过`man jq`查看`jq`的手册页，也可以使用`jq --help`获取简单的帮助信息。

```sh
$ jq --helpjq - commandline JSON processor [version 1.6]Usage:	jq [options] <jq filter> [file...]	jq [options] --args <jq filter> [strings...]	jq [options] --jsonargs <jq filter> [JSON_TEXTS...]jq is a tool for processing JSON inputs, applying the given filter toits JSON text inputs and producing the filter's results as JSON onstandard output.The simplest filter is ., which copies jq's input to its outputunmodified (except for formatting, but note that IEEE754 is usedfor number representation internally, with all that that implies).For more advanced filters see the jq(1) manpage ("man jq")and/or https://stedolan.github.io/jqExample:	$ echo '{"foo": 0}' | jq .	{		"foo": 0	}Some of the options include:  -c               compact instead of pretty-printed output;  -n               use `null` as the single input value;  -e               set the exit status code based on the output;  -s               read (slurp) all inputs into an array; apply filter to it;  -r               output raw strings, not JSON texts;  -R               read raw strings, not JSON texts;  -C               colorize JSON;  -M               monochrome (don't colorize JSON);  -S               sort keys of objects on output;  --tab            use tabs for indentation;  --arg a v        set variable $a to value <v>;  --argjson a v    set variable $a to JSON value <v>;  --slurpfile a f  set variable $a to an array of JSON texts read from <f>;  --rawfile a f    set variable $a to a string consisting of the contents of <f>;  --args           remaining arguments are string arguments, not files;  --jsonargs       remaining arguments are JSON arguments, not files;  --               terminates argument processing;Named arguments are also available as $ARGS.named[], whilepositional arguments are available as $ARGS.positional[].See the manpage for more options.$
```



#### 3.1.3  忽略参数

现阶段有些参数不明白什么意思。此处记录一下。

- `--seq `：使用 application/json-seq MIME 类型方案在 jq 的输入和输出中分隔 JSON 文本。
- `--stream`: 以流形式解析输入。



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
$ cat test.json |jq{  "name": "网站",  "num": 3,  "sites": [    "Google",    "Runoob",    "Taobao"  ]}$
```

使用`-s`或`--slurp`参数，查看输出结果：

```sh
$ cat test.json |jq -s[  {    "name": "网站",    "num": 3,    "sites": [      "Google",      "Runoob",      "Taobao"    ]  }]$ cat test.json |jq --slurp[  {    "name": "网站",    "num": 3,    "sites": [      "Google",      "Runoob",      "Taobao"    ]  }]$
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

说明：由于markdown显示的问题，请看以下图片中的效果：

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










