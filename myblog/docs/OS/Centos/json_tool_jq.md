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
[meizhaohui@hellogitlab ~]$ yum info jq
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

[meizhaohui@hellogitlab ~]$
```

安装：

```sh
[meizhaohui@hellogitlab ~]$ sudo yum install -y jq
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
[meizhaohui@hellogitlab ~]$
```



## 2. 使用

查看`jq`的版本信息和帮助信息：

```sh
[meizhaohui@hellogitlab ~]$ jq --version
jq-1.6
[meizhaohui@hellogitlab ~]$ jq --help
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
[meizhaohui@hellogitlab ~]$
```

### 2.1 按tutorial教程进行简单测试



GitHub提供JSON API,我们从`jq`仓库获取最新的3个提交。

```sh
[meizhaohui@hellogitlab ~]$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=3'
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
[meizhaohui@hellogitlab ~]$
```

此时，可以看到，GitHub返回格式化好的json。 对于不这样的服务器，通过`jq`将通过管道漂亮打印出结果。 最简单的`jq`程序是表达式`.`,它取得了输入，并将其与输出保持不变。

```sh
[meizhaohui@hellogitlab ~]$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=3'|jq '.'
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
[meizhaohui@hellogitlab ~]$
```

此时，我们可以看到，虽然结果相同，但现在的输出结果中，已经美化过了，变得非常漂亮了。

![](https://meizhaohui.gitee.io/imagebed/img/20210821171120.png)

为了加快我们测试，我先将`curl`请求的结果保存到本地文件中。

```sh
[meizhaohui@hellogitlab ~]$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=3' > data.json
[meizhaohui@hellogitlab ~]$
```



获取第一个提交。

```sh
[meizhaohui@hellogitlab ~]$ cat data.json |jq '.[0]'
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
[meizhaohui@hellogitlab ~]$
```

有很多信息我们不关心，我们可以过滤出我们关心的字段。

如我们只关心`commit`信息：

```sh
[meizhaohui@hellogitlab ~]$ cat data.json |jq '.[0].commit'
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
[meizhaohui@hellogitlab ~]$
```

现在如果我们只关心第一个提交的`message`和提交人的`name`姓名信息，则可以这样：

```sh
[meizhaohui@hellogitlab ~]$ cat data.json |jq '.[0] | {message: .commit.message, name: .commit.committer.name}'
{
  "message": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "name": "William Langford"
}
[meizhaohui@hellogitlab ~]$ cat data.json |jq '.[0] | {CommitMessage: .commit.message, CommitterName: .commit.committer.name}'
{
  "CommitMessage": "Fix msys2 installation on AppVeyor\n\nRef: https://www.msys2.org/news/#2020-06-29-new-packagers",
  "CommitterName": "William Langford"
}
[meizhaohui@hellogitlab ~]$
```

效果如下图：

![](https://meizhaohui.gitee.io/imagebed/img/20210821172451.png)

可以看到，我们在`jq`命令内部的管道中，通过类似`message`/`name`或`CommitMessage`/`CommitterName`等来定义最后要显示的字段的名称，而通过`.commit.message`或`.commit.committer.name`来获取`json`数据中的关键信息。
