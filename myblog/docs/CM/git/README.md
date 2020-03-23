# git的使用

## 修改Github历史提交记录中的username和email信息

GitHub提交时，发现github没有统计贡献值，多半是由于邮箱没有关联。

下面是解决方法的具体步骤。

- 克隆项目

克隆项目，并切换到项目根目录下：

```shell
$ git clone git@github.com:meizhaohui/vueblog.git
$ cd vueblog
```

- 查看本地配置的用户名和邮箱地址

```shell
$ git config --global user.email
mistake@email.com
$ git config  user.email
mistake@email.com
$ git config --global user.name
Zhaohui Mei
$ git config user.name
Zhaohui Mei
```
可以发现全局的和本项目的邮箱都是错的邮箱。

- 修改全局和本项目的邮箱地址

将本地邮箱地址改成正确的邮箱。
```
$ git config --global user.email "mzh.whut@gmail.com"
$ git config user.email "mzh.whut@gmail.com"
$ git config --global user.email
mzh.whut@gmail.com
$ git config user.email
mzh.whut@gmail.com
```

- 配置修改脚本

项目根目录下面修改脚本文件，脚本内容如下：

```shell
$ cat change_history_commit_username_email.sh
#!/bin/sh
git filter-branch --env-filter '
OLD_EMAIL="mistake@email.com" # 填入旧的、错误的email
CORRECT_NAME="Zhaohui Mei" # 填入修改后的username
CORRECT_EMAIL="mzh.whut@gmail.com" # 填入修改后的email
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

下载脚本 [change_history_commit_username_email.sh](/scripts/shell/change_history_commit_username_email.sh)

修改脚本中的OLD_EMAIL、CORRECT_NAME、CORRECT_EMAIL等参数

- 执行shell脚本

```shell
$ sh change_history_commit_username_email.sh
Rewrite 3473c357c13a91716e97e9ae572a8db195fafbdf (22/25) (1 seconds passed, remaining 0 predicted)
Ref 'refs/heads/master' was rewritten
```

::: tip 提示
脚本需要放置在项目的根目录下面，否则会提示如下异常：

```shell
$ sh change_history_commit_username_email.sh
You need to run this command from the toplevel of the working tree.
```
:::


- 提交修改

```shell
$ git push --force --tags origin 'refs/heads/*'
Enumerating objects: 321, done.
Counting objects: 100% (321/321), done.
Delta compression using up to 8 threads
Compressing objects: 100% (178/178), done.
Writing objects: 100% (321/321), 2.56 MiB | 569.00 KiB/s, done.
Total 321 (delta 125), reused 181 (delta 87)
remote: Resolving deltas: 100% (125/125), done.
To https://github.com/meizhaohui/vueblog.git
 + 3473c35...1e6ed60 master -> master (forced update)
```


提交完成后，可以发现Github个人页面上面的贡献图示位置已经变成绿色，说明修改成功。

参考: [修改Github历史提交记录中的username和email信息](https://blog.csdn.net/Kexiii/article/details/86561273)


## github合并分支到master



在写项目的时候习惯创建一个dev分支用于更新代码，等到整个或者阶段性完成的时候再合并到master上

步骤如下:

```shell
# 切换到master分支
$ git checkout master
Switched to branch 'master'
# 将dev分支的代合并到master
$ git merge dev

# 查看状态
git status

# 推送
git push origin master
```


