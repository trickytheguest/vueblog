# Git版本控制管理

[[toc]]

本文是对Jon Loeliger等著的第二版《Git版本控制管理》一书的总结。

## 第1章 介绍

### 1.1 背景

- 一个可以管理和追踪软件代码或其他类似内容的不同版本的工具，通常称为：版本控制系统VCS，或者源代码管理器SCM，或者修订控制系统RCS，或其他各种和修订、代码、内容、版本、控制、管理和系统等相关的叫法。本书中，版本控制系统VCS一词就是泛指一切这样的工具。
- 本书主要介绍Git这款功能强大、灵活而且开销低的VCS。
- Git由Linux Torvalds发明，超初是为了方便管理Linux内核的开发工作。

### 1.2 Git的诞生

- 通常来说，当工具跟不上项目需求时，开发人员就会开发一个新的工具。

- Git设计优良，能够胜任世界范围内大规模的软件开发工程。

- 在Git诞生之前，Linux内核开发过程中使用BitKeeper来作为版本控制系统，但在2005年，BitKeeper所有方对他们的免费的BitKeeper加入了额外的限制，Linux社区意识到，使用BitKeeper不再是一个长期可行的解决方案。Linus本人开始寻找替代品。这次，他回避使用商业解决方案，在自由软件包中寻找。但是，当是现有的VCS存在一些缺陷。Linus没能找到的有关特性有：

    - 有助于分布式开发。需要允许并行开发，各人可以在自己的版本库中独立且同时地开发，而不需要与中心版本库时刻同步。
    - 能够胜任上千开发人员的规模。Linus深知，每个Linux版本都凝聚了数以千计的开发人员的心血，所以新的VCS需要支持非常多的开发人员。
    - 性能优异。新的VCS需要能够快速并且高效地执行。不管是个人的更新操作，还是网络传输操作，都需要保证执行速度，为了节约存储空间，从而节约传输时间，需要使用`压缩`和`差异比较`技术。
    - 保持完整性和可靠性。因为Git是一个分布式版本控制系统，所以非常需要能够绝对的保证数据的完整性和不会被意外修改，Git使用一个叫做`安全散列函数SHA1`的通用加密散列函数，来命名和识别数据库中的对象。实践证明，这是一种足够可靠的方式。
    - 强化责任。版本控制系统的一个关键方面，就是能够定位谁改动了文件，甚至改动的原因。对所有的改动进行责任追踪。
    - 不可变性。版本库中存储的数据对象均是不可变的。一旦创建数据对象并把它们存放在数据库中，它们便不可修改。
    - 原子事务。可以让一系列不同但是相关的操作要么全部执行要么一个都不执行。
    - 支持并且鼓励基于分支的开发。几乎所有的VCS都支持在同一个项目存在多个支线，例如代码变更的一条支线叫开发，同时又存在另一条支线要测试。Git把这样的支线叫做“分支”。需要提供一个简单、清晰、快速的分支合并功能。
    - 完整的版本库。为了让各个开发人员不需要查询中心服务器就可以得到历史修订信息，每个人的版本库都有一份关于每个文件的完整历史修改信息。
    - 一个清晰的内部设计。Git的对象模型拥有着简单的结构，并且能够保存原始数据最基本的部分和目录结构，能够记录变更内容等。
    - 免费自由-Be free, as in freedom。

### 1.3 先例

- SCCS——源代码控制系统 Source Code Control System。
- RCS——修订控制系统Revision Control System。
- CVS——并行版本系统Concurrent Version System。
- SVN——Subversion。
- BitKeeper。
- Mercruial。

Git沿用了Mercurial用散列指纹来唯一标识文件的内容，文件名只是一个绰号，旨在方便用户操作。



### 1.4 时间线

- Git于2005年4月7日诞生。正式成为自托管项目。
- 2005年4月16日，Linux内核的第一个提交也诞生了。
- Git源码地址：[https://github.com/git/git](https://github.com/git/git) 。
- Linux源码地址：[https://github.com/torvalds/linux/](https://github.com/torvalds/linux/)

下载git源码，由于国内下载github代码比较慢，我们可以注册一个码云的账号，并将github中的代码导入到码云上面。

- 码云地址：[https://gitee.com/](https://gitee.com/)

我将github上面git源码导入到我的码云上的地址为：[https://gitee.com/meizhaohui/git](https://gitee.com/meizhaohui/git)

下载Git源码：

```sh
$ git clone git@gitee.com:meizhaohui/git.git
Cloning into 'git'...
remote: Enumerating objects: 309613, done.
remote: Counting objects: 100% (309613/309613), done.
remote: Compressing objects: 100% (76164/76164), done.
remote: Total 309613 (delta 231105), reused 309613 (delta 231105), pack-reused 0
Receiving objects: 100% (309613/309613), 163.07 MiB | 9.03 MiB/s, done.
Resolving deltas: 100% (231105/231105), done.
Updating files: 100% (3967/3967), done.
```

下载完成后，就会有一个git目录：

```sh
[mzh@MacBookPro ~ ]$ cd git
[mzh@MacBookPro git (master)]$ ls
CODE_OF_CONDUCT.md             git-gui                        protocol-caps.h
COPYING                        git-instaweb.sh                protocol.c
Documentation                  git-merge-octopus.sh           protocol.h
GIT-VERSION-GEN                git-merge-one-file.sh          prune-packed.c
INSTALL                        git-merge-resolve.sh           prune-packed.h
LGPL-2.1                       git-mergetool--lib.sh          quote.c
Makefile                       git-mergetool.sh               quote.h
README.md                      git-p4.py                      range-diff.c
RelNotes                       git-quiltimport.sh             range-diff.h
SECURITY.md                    git-rebase--preserve-merges.sh reachable.c
abspath.c                      git-request-pull.sh            reachable.h
aclocal.m4                     git-send-email.perl            read-cache.c
add-interactive.c              git-sh-i18n.sh                 rebase-interactive.c
add-interactive.h              git-sh-setup.sh                rebase-interactive.h
add-patch.c                    git-submodule.sh               rebase.c
advice.c                       git-svn.perl                   rebase.h
advice.h                       git-web--browse.sh             ref-filter.c
alias.c                        git.c                          ref-filter.h
alias.h                        git.rc                         reflog-walk.c
alloc.c                        gitk-git                       reflog-walk.h
alloc.h                        gitweb                         refs
apply.c                        gpg-interface.c                refs.c
apply.h                        gpg-interface.h                refs.h
archive-tar.c                  graph.c                        refspec.c
archive-zip.c                  graph.h                        refspec.h
archive.c                      grep.c                         remote-curl.c
archive.h                      grep.h                         remote.c
attr.c                         hash-lookup.c                  remote.h
attr.h                         hash-lookup.h                  replace-object.c
banned.h                       hash.h                         replace-object.h
base85.c                       hashmap.c                      repo-settings.c
bisect.c                       hashmap.h                      repository.c
bisect.h                       help.c                         repository.h
blame.c                        help.h                         rerere.c
blame.h                        hex.c                          rerere.h
blob.c                         http-backend.c                 reset.c
blob.h                         http-fetch.c                   reset.h
block-sha1                     http-push.c                    resolve-undo.c
bloom.c                        http-walker.c                  resolve-undo.h
bloom.h                        http.c                         revision.c
branch.c                       http.h                         revision.h
branch.h                       ident.c                        run-command.c
builtin                        imap-send.c                    run-command.h
builtin.h                      iterator.h                     send-pack.c
bulk-checkin.c                 json-writer.c                  send-pack.h
bulk-checkin.h                 json-writer.h                  sequencer.c
bundle.c                       khash.h                        sequencer.h
bundle.h                       kwset.c                        serve.c
cache-tree.c                   kwset.h                        serve.h
cache-tree.h                   levenshtein.c                  server-info.c
cache.h                        levenshtein.h                  setup.c
chdir-notify.c                 line-log.c                     sh-i18n--envsubst.c
chdir-notify.h                 line-log.h                     sha1collisiondetection
check-builtins.sh              line-range.c                   sha1dc
check_bindir                   line-range.h                   sha1dc_git.c
checkout.c                     linear-assignment.c            sha1dc_git.h
checkout.h                     linear-assignment.h            sha256
chunk-format.c                 list-objects-filter-options.c  shallow.c
chunk-format.h                 list-objects-filter-options.h  shallow.h
ci                             list-objects-filter.c          shell.c
color.c                        list-objects-filter.h          shortlog.h
color.h                        list-objects.c                 sideband.c
column.c                       list-objects.h                 sideband.h
column.h                       list.h                         sigchain.c
combine-diff.c                 ll-merge.c                     sigchain.h
command-list.txt               ll-merge.h                     simple-ipc.h
commit-graph.c                 lockfile.c                     sparse-index.c
commit-graph.h                 lockfile.h                     sparse-index.h
commit-reach.c                 log-tree.c                     split-index.c
commit-reach.h                 log-tree.h                     split-index.h
commit-slab-decl.h             ls-refs.c                      stable-qsort.c
commit-slab-impl.h             ls-refs.h                      strbuf.c
commit-slab.h                  mailinfo.c                     strbuf.h
commit.c                       mailinfo.h                     streaming.c
commit.h                       mailmap.c                      streaming.h
common-main.c                  mailmap.h                      string-list.c
compat                         match-trees.c                  string-list.h
config.c                       mem-pool.c                     strmap.c
config.h                       mem-pool.h                     strmap.h
config.mak.dev                 merge-blobs.c                  strvec.c
config.mak.in                  merge-blobs.h                  strvec.h
config.mak.uname               merge-ort-wrappers.c           sub-process.c
configure.ac                   merge-ort-wrappers.h           sub-process.h
connect.c                      merge-ort.c                    submodule-config.c
connect.h                      merge-ort.h                    submodule-config.h
connected.c                    merge-recursive.c              submodule.c
connected.h                    merge-recursive.h              submodule.h
contrib                        merge.c                        symlinks.c
convert.c                      mergesort.c                    t
convert.h                      mergesort.h                    tag.c
copy.c                         mergetools                     tag.h
credential.c                   midx.c                         tar.h
credential.h                   midx.h                         tempfile.c
csum-file.c                    name-hash.c                    tempfile.h
csum-file.h                    negotiator                     templates
ctype.c                        notes-cache.c                  thread-utils.c
daemon.c                       notes-cache.h                  thread-utils.h
date.c                         notes-merge.c                  tmp-objdir.c
decorate.c                     notes-merge.h                  tmp-objdir.h
decorate.h                     notes-utils.c                  trace.c
delta-islands.c                notes-utils.h                  trace.h
delta-islands.h                notes.c                        trace2
delta.h                        notes.h                        trace2.c
detect-compiler                object-file.c                  trace2.h
diff-delta.c                   object-name.c                  trailer.c
diff-lib.c                     object-store.h                 trailer.h
diff-merges.c                  object.c                       transport-helper.c
diff-merges.h                  object.h                       transport-internal.h
diff-no-index.c                oid-array.c                    transport.c
diff.c                         oid-array.h                    transport.h
diff.h                         oidmap.c                       tree-diff.c
diffcore-break.c               oidmap.h                       tree-walk.c
diffcore-delta.c               oidset.c                       tree-walk.h
diffcore-order.c               oidset.h                       tree.c
diffcore-pickaxe.c             pack-bitmap-write.c            tree.h
diffcore-rename.c              pack-bitmap.c                  unicode-width.h
diffcore-rotate.c              pack-bitmap.h                  unimplemented.sh
diffcore.h                     pack-check.c                   unix-socket.c
dir-iterator.c                 pack-objects.c                 unix-socket.h
dir-iterator.h                 pack-objects.h                 unix-stream-server.c
dir.c                          pack-revindex.c                unix-stream-server.h
dir.h                          pack-revindex.h                unpack-trees.c
editor.c                       pack-write.c                   unpack-trees.h
entry.c                        pack.h                         upload-pack.c
entry.h                        packfile.c                     upload-pack.h
environment.c                  packfile.h                     url.c
environment.h                  pager.c                        url.h
ewah                           parallel-checkout.c            urlmatch.c
exec-cmd.c                     parallel-checkout.h            urlmatch.h
exec-cmd.h                     parse-options-cb.c             usage.c
fetch-negotiator.c             parse-options.c                userdiff.c
fetch-negotiator.h             parse-options.h                userdiff.h
fetch-pack.c                   patch-delta.c                  utf8.c
fetch-pack.h                   patch-ids.c                    utf8.h
fmt-merge-msg.c                patch-ids.h                    varint.c
fmt-merge-msg.h                path.c                         varint.h
fsck.c                         path.h                         version.c
fsck.h                         pathspec.c                     version.h
fsmonitor.c                    pathspec.h                     versioncmp.c
fsmonitor.h                    perl                           walker.c
fuzz-commit-graph.c            pkt-line.c                     walker.h
fuzz-pack-headers.c            pkt-line.h                     wildmatch.c
fuzz-pack-idx.c                po                             wildmatch.h
generate-cmdlist.sh            ppc                            worktree.c
generate-configlist.sh         preload-index.c                worktree.h
gettext.c                      pretty.c                       wrap-for-bin.sh
gettext.h                      pretty.h                       wrapper.c
git-add--interactive.perl      prio-queue.c                   write-or-die.c
git-archimport.perl            prio-queue.h                   ws.c
git-bisect.sh                  progress.c                     wt-status.c
git-compat-util.h              progress.h                     wt-status.h
git-cvsexportcommit.perl       promisor-remote.c              xdiff
git-cvsimport.perl             promisor-remote.h              xdiff-interface.c
git-cvsserver.perl             prompt.c                       xdiff-interface.h
git-difftool--helper.sh        prompt.h                       zlib.c
git-filter-branch.sh           protocol-caps.c
[mzh@MacBookPro git (master)]$
```

查看远程仓库路径：

```sh
[mzh@MacBookPro git (master)]$ git remote -v
origin	git@gitee.com:meizhaohui/git.git (fetch)
origin	git@gitee.com:meizhaohui/git.git (push)
```

将github远程库添加到远程库列表中：

```sh
[mzh@MacBookPro git (master)]$ git remote add github git@github.com:git/git.git
[mzh@MacBookPro git (master)]$ git remote -v
github	git@github.com:git/git.git (fetch)
github	git@github.com:git/git.git (push)
origin	git@gitee.com:meizhaohui/git.git (fetch)
origin	git@gitee.com:meizhaohui/git.git (push)
```

查看git的最开始的十次提交：

```sh
$ git log  --reverse --oneline |head
e83c516331 Initial revision of "git", the information manager from hell
8bc9a0c769 Add copyright notices.
e497ea2a9b Make read-tree actually unpack the whole tree.
bf0c6e839c Make "cat-file" output the file contents to stdout.
19b2860cba Use "-Wall -O2" for the compiler to get more warnings.
24778e335a Factor out "read_sha1_file" into mapping/inflating/unmapping.
2ade934026 Add "check_sha1_signature()" helper function
20222118ae Add first cut at "fsck-cache" that validates the SHA1 object store.
7660a188df Add new fsck-cache to Makefile.
9426167765 Add "-lz" to link line to get in zlib.
```

查看第一次的提交人和提交信息：

```sh
[mzh@MacBookPro git (master)]$ git log e83c516331|awk NF
commit e83c5163316f89bfbde7d9ab23ca2e25604af290
Author: Linus Torvalds <torvalds@linux-foundation.org>
Date:   Thu Apr 7 15:13:13 2005 -0700
    Initial revision of "git", the information manager from hell
```

可以看到Linus于2005年4月7日15:13:13提交了Git的第一个commit!



### 1.5 名字有何含义

- git是愚蠢无用的人的意思！



## 第2章 安装Git

- Git支持Windows、Linux、MacOS等多种操作系统。
- windows和MacOS上面直接可以下载Git的二进制安装包进行安装。MacOS上面安装可参考 [Download for macOS](https://git-scm.com/download/mac)。
- Linux系统上面可以使用包管理器进行安装。如ubuntu系统安装`apt-get install git`，CentOS系统安装`yum install git`等。可参考 [Download for Linux and Unix](https://git-scm.com/download/linux)。
- 也可以通过源码编译安装，但相对麻烦一些。

为了不影响我的电脑的git环境，我在docker ubuntu容器中安装git。你也可以直接在自己的电脑上进行测试。

- 下载镜像

```sh
[mzh@MacBookPro ~ ]$ docker pull ubuntu
```

- 启动ubuntu容器

```sh
[mzh@MacBookPro ~ ]$ docker run --privileged --name ubuntu -it -d ubuntu /bin/bash
```

- 进入到容器中,注dkin是快捷命令

```sh
# alias dkin='dockerin'
# function dockerin()
# {
#     docker exec -it $1 /bin/bash
# }
[mzh@MacBookPro ~ ]$ dkin ubuntu
```

- 查看ubuntu系统版本信息

```sh
root@4144e8c22fff:/# cat /etc/issue
Ubuntu 20.04 LTS \n \l
```

- 在容器中创建用户mei
```sh
root@4144e8c22fff:/# useradd mei -d /home/mei -s /bin/bash -m
```

- 安装必备软件vim git

```sh
root@4144e8c22fff:/# apt-get install vim git -y
```

- 查看git版本

```sh
root@4144e8c22fff:/# git --version
git version 2.25.1
```


- 切换到用户mei

```sh
root@4144e8c22fff:/# su mei
mei@4144e8c22fff:/$ cd
mei@4144e8c22fff:~$ pwd
/home/mei
mei@4144e8c22fff:~$ git --version
git version 2.25.1
```

后续我们就在该环境下进行测试操作。

## 第3章 起步