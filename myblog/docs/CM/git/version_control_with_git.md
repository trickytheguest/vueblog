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

- 在Git诞生之前，Linux内核开发过程中使用BitKeeper来作为版本控制系统，但在2005年，BitKeeper所有方对他们的免费的BitKeeper加入了额外的限制，Linux社区意识到，使用BitKeeper不再是一个长期可行的解决方案。Linus本人开始寻找替代品。这次，他回避使用商业解决方案，在自由软件包中寻找。但是，当时现有的VCS存在一些缺陷。Linus没能找到的有关特性有：

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


- 解决git帮助异常

由于docker中的系统是最小化安装的，删除了不需要的包和内容，如需使用需要将这些内容恢复，方可使用，因此需要使用`unminimize`命令进行恢复。

```sh
root@4144e8c22fff:/# git help clone
This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, including manpages, you can run the 'unminimize'
command. You will still need to ensure the 'man-db' package is installed.

# 安装man-db包
root@4144e8c22fff:/# apt-get install man-db -y

# unminimize取消最小化
root@4144e8c22fff:/# unminimize
This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

This script restores content and packages that are found on a default
Ubuntu server system in order to make this system more suitable for
interactive use.

Reinstallation of packages may fail due to changes to the system
configuration, the presence of third-party packages, or for other
reasons.

This operation may take some time.

Would you like to continue? [y/N] y
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

### 3.1 Git命令行

Git简单易用，只需要在命令行输入`git`，Git就会不带任何参数地列出它的选项和最常用的子命令：

```sh
mei@4144e8c22fff:~$ git
usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone             Clone a repository into a new directory
   init              Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.
mei@4144e8c22fff:~$
```

- 查看完整的git子命令列表，可以输入`git help --all`：

```sh
mei@4144e8c22fff:~$ git help --all
See 'git help <command>' to read about a specific subcommand

Main Porcelain Commands
   add                  Add file contents to the index
   am                   Apply a series of patches from a mailbox
   archive              Create an archive of files from a named tree
   bisect               Use binary search to find the commit that introduced a bug
   branch               List, create, or delete branches
   bundle               Move objects and refs by archive
   checkout             Switch branches or restore working tree files
   cherry-pick          Apply the changes introduced by some existing commits
   citool               Graphical alternative to git-commit
   clean                Remove untracked files from the working tree
   clone                Clone a repository into a new directory
   commit               Record changes to the repository
   describe             Give an object a human readable name based on an available ref
   diff                 Show changes between commits, commit and working tree, etc
   fetch                Download objects and refs from another repository
   format-patch         Prepare patches for e-mail submission
   gc                   Cleanup unnecessary files and optimize the local repository
   gitk                 The Git repository browser
   grep                 Print lines matching a pattern
   gui                  A portable graphical interface to Git
   init                 Create an empty Git repository or reinitialize an existing one
   log                  Show commit logs
   merge                Join two or more development histories together
   mv                   Move or rename a file, a directory, or a symlink
   notes                Add or inspect object notes
   pull                 Fetch from and integrate with another repository or a local branch
   push                 Update remote refs along with associated objects
   range-diff           Compare two commit ranges (e.g. two versions of a branch)
   rebase               Reapply commits on top of another base tip
   reset                Reset current HEAD to the specified state
   restore              Restore working tree files
   revert               Revert some existing commits
   rm                   Remove files from the working tree and from the index
   shortlog             Summarize 'git log' output
   show                 Show various types of objects
   sparse-checkout      Initialize and modify the sparse-checkout
   stash                Stash the changes in a dirty working directory away
   status               Show the working tree status
   submodule            Initialize, update or inspect submodules
   switch               Switch branches
   tag                  Create, list, delete or verify a tag object signed with GPG
   worktree             Manage multiple working trees

Ancillary Commands / Manipulators
   config               Get and set repository or global options
   fast-export          Git data exporter
   fast-import          Backend for fast Git data importers
   filter-branch        Rewrite branches
   mergetool            Run merge conflict resolution tools to resolve merge conflicts
   pack-refs            Pack heads and tags for efficient repository access
   prune                Prune all unreachable objects from the object database
   reflog               Manage reflog information
   remote               Manage set of tracked repositories
   repack               Pack unpacked objects in a repository
   replace              Create, list, delete refs to replace objects

Ancillary Commands / Interrogators
   annotate             Annotate file lines with commit information
   blame                Show what revision and author last modified each line of a file
   count-objects        Count unpacked number of objects and their disk consumption
   difftool             Show changes using common diff tools
   fsck                 Verifies the connectivity and validity of the objects in the database
   gitweb               Git web interface (web frontend to Git repositories)
   help                 Display help information about Git
   instaweb             Instantly browse your working repository in gitweb
   merge-tree           Show three-way merge without touching index
   rerere               Reuse recorded resolution of conflicted merges
   show-branch          Show branches and their commits
   verify-commit        Check the GPG signature of commits
   verify-tag           Check the GPG signature of tags
   whatchanged          Show logs with difference each commit introduces

Interacting with Others
   archimport           Import a GNU Arch repository into Git
   cvsexportcommit      Export a single commit to a CVS checkout
   cvsimport            Salvage your data out of another SCM people love to hate
   cvsserver            A CVS server emulator for Git
   imap-send            Send a collection of patches from stdin to an IMAP folder
   p4                   Import from and submit to Perforce repositories
   quiltimport          Applies a quilt patchset onto the current branch
   request-pull         Generates a summary of pending changes
   send-email           Send a collection of patches as emails
   svn                  Bidirectional operation between a Subversion repository and Git

Low-level Commands / Manipulators
   apply                Apply a patch to files and/or to the index
   checkout-index       Copy files from the index to the working tree
   commit-graph         Write and verify Git commit-graph files
   commit-tree          Create a new commit object
   hash-object          Compute object ID and optionally creates a blob from a file
   index-pack           Build pack index file for an existing packed archive
   merge-file           Run a three-way file merge
   merge-index          Run a merge for files needing merging
   mktag                Creates a tag object
   mktree               Build a tree-object from ls-tree formatted text
   multi-pack-index     Write and verify multi-pack-indexes
   pack-objects         Create a packed archive of objects
   prune-packed         Remove extra objects that are already in pack files
   read-tree            Reads tree information into the index
   symbolic-ref         Read, modify and delete symbolic refs
   unpack-objects       Unpack objects from a packed archive
   update-index         Register file contents in the working tree to the index
   update-ref           Update the object name stored in a ref safely
   write-tree           Create a tree object from the current index

Low-level Commands / Interrogators
   cat-file             Provide content or type and size information for repository objects
   cherry               Find commits yet to be applied to upstream
   diff-files           Compares files in the working tree and the index
   diff-index           Compare a tree to the working tree or index
   diff-tree            Compares the content and mode of blobs found via two tree objects
   for-each-ref         Output information on each ref
   get-tar-commit-id    Extract commit ID from an archive created using git-archive
   ls-files             Show information about files in the index and the working tree
   ls-remote            List references in a remote repository
   ls-tree              List the contents of a tree object
   merge-base           Find as good common ancestors as possible for a merge
   name-rev             Find symbolic names for given revs
   pack-redundant       Find redundant pack files
   rev-list             Lists commit objects in reverse chronological order
   rev-parse            Pick out and massage parameters
   show-index           Show packed archive index
   show-ref             List references in a local repository
   unpack-file          Creates a temporary file with a blob's contents
   var                  Show a Git logical variable
   verify-pack          Validate packed Git archive files

Low-level Commands / Syncing Repositories
   daemon               A really simple server for Git repositories
   fetch-pack           Receive missing objects from another repository
   http-backend         Server side implementation of Git over HTTP
   send-pack            Push objects over Git protocol to another repository
   update-server-info   Update auxiliary info file to help dumb servers

Low-level Commands / Internal Helpers
   check-attr           Display gitattributes information
   check-ignore         Debug gitignore / exclude files
   check-mailmap        Show canonical names and email addresses of contacts
   check-ref-format     Ensures that a reference name is well formed
   column               Display data in columns
   credential           Retrieve and store user credentials
   credential-cache     Helper to temporarily store passwords in memory
   credential-store     Helper to store credentials on disk
   fmt-merge-msg        Produce a merge commit message
   interpret-trailers   Add or parse structured information in commit messages
   mailinfo             Extracts patch and authorship from a single e-mail message
   mailsplit            Simple UNIX mbox splitter program
   merge-one-file       The standard helper program to use with git-merge-index
   patch-id             Compute unique ID for a patch
   sh-i18n              Git's i18n setup code for shell scripts
   sh-setup             Common Git shell script setup code
   stripspace           Remove unnecessary whitespace
mei@4144e8c22fff:~$
```

可以看到Git的子命令特别的多。不要怕，我们慢慢的来了解它们。



- 查看Git版本信息

前面我们已经执行过，直接输入`git --version`即可。

```sh
mei@4144e8c22fff:~$ git --version
git version 2.25.1
mei@4144e8c22fff:~$ git version
git version 2.25.1
```

- 查看帮助信息

Git子命令都可以通过使用`git help subcommand`、`git --help subcommand`或者`git subcommand --help`来查看帮助文档信息。

我们尝试获取`clone`子命令的帮助信息：

```sh
# 方式一，git help subcommand
mei@4144e8c22fff:~$ git help clone|head -n 25|awk NF
GIT-CLONE(1)                                                              Git Manual                                                             GIT-CLONE(1)
NAME
       git-clone - Clone a repository into a new directory
SYNOPSIS
       git clone [--template=<template_directory>]
                 [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
                 [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
                 [--dissociate] [--separate-git-dir <git dir>]
                 [--depth <depth>] [--[no-]single-branch] [--no-tags]
                 [--recurse-submodules[=<pathspec>]] [--[no-]shallow-submodules]
                 [--[no-]remote-submodules] [--jobs <n>] [--sparse] [--] <repository>
                 [<directory>]
DESCRIPTION
       Clones a repository into a newly created directory, creates remote-tracking branches for each branch in the cloned repository (visible using git
       branch --remotes), and creates and checks out an initial branch that is forked from the cloned repository's currently active branch.
       After the clone, a plain git fetch without arguments will update all the remote-tracking branches, and a git pull without arguments will in addition
       merge the remote master branch into the current master branch, if any (this is untrue when "--single-branch" is given; see below).
       This default configuration is achieved by creating references to the remote branch heads under refs/remotes/origin and by initializing
       remote.origin.url and remote.origin.fetch configuration variables.
mei@4144e8c22fff:~$

# 方式二，git --help subcommand
mei@4144e8c22fff:~$ git --help clone|head -n 25|awk NF
GIT-CLONE(1)                                                              Git Manual                                                             GIT-CLONE(1)
NAME
       git-clone - Clone a repository into a new directory
SYNOPSIS
       git clone [--template=<template_directory>]
                 [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
                 [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
                 [--dissociate] [--separate-git-dir <git dir>]
                 [--depth <depth>] [--[no-]single-branch] [--no-tags]
                 [--recurse-submodules[=<pathspec>]] [--[no-]shallow-submodules]
                 [--[no-]remote-submodules] [--jobs <n>] [--sparse] [--] <repository>
                 [<directory>]
DESCRIPTION
       Clones a repository into a newly created directory, creates remote-tracking branches for each branch in the cloned repository (visible using git
       branch --remotes), and creates and checks out an initial branch that is forked from the cloned repository's currently active branch.
       After the clone, a plain git fetch without arguments will update all the remote-tracking branches, and a git pull without arguments will in addition
       merge the remote master branch into the current master branch, if any (this is untrue when "--single-branch" is given; see below).
       This default configuration is achieved by creating references to the remote branch heads under refs/remotes/origin and by initializing
       remote.origin.url and remote.origin.fetch configuration variables.
       
# 方式三，git subcommand --help
mei@4144e8c22fff:~$ git clone --help|head -n 25|awk NF
GIT-CLONE(1)                                                              Git Manual                                                             GIT-CLONE(1)
NAME
       git-clone - Clone a repository into a new directory
SYNOPSIS
       git clone [--template=<template_directory>]
                 [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
                 [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
                 [--dissociate] [--separate-git-dir <git dir>]
                 [--depth <depth>] [--[no-]single-branch] [--no-tags]
                 [--recurse-submodules[=<pathspec>]] [--[no-]shallow-submodules]
                 [--[no-]remote-submodules] [--jobs <n>] [--sparse] [--] <repository>
                 [<directory>]
DESCRIPTION
       Clones a repository into a newly created directory, creates remote-tracking branches for each branch in the cloned repository (visible using git
       branch --remotes), and creates and checks out an initial branch that is forked from the cloned repository's currently active branch.
       After the clone, a plain git fetch without arguments will update all the remote-tracking branches, and a git pull without arguments will in addition
       merge the remote master branch into the current master branch, if any (this is untrue when "--single-branch" is given; see below).
       This default configuration is achieved by creating references to the remote branch heads under refs/remotes/origin and by initializing
       remote.origin.url and remote.origin.fetch configuration variables.
mei@4144e8c22fff:~$
```

可以看到，三种方式都可以获取到帮助信息。

- 带连字符的命令

从历史上来看，Git是作为一套简单的、独特的、独立的命令提供的，并按照UNIX工具包的哲学来开发的：打造小的、可互操作的工具。每条命令都留有一个带连字符的名字，如`git-commit`和`git-log`。而现在开发人员之间的趋势是使用一条简单的可执行的`git`命令并附加上子命令。但话虽如此，`git-commit`和`git commit`形式上是相同的。

```sh
root@4144e8c22fff:~# find / -name 'git-commit'
/usr/lib/git-core/git-commit
root@4144e8c22fff:~# ls -lah /usr/lib/git-core/
total 26M
drwxr-xr-x 3 root root  24K Jul 10 00:51 .
drwxr-xr-x 1 root root 4.0K Jul 11 15:02 ..
-rwxr-xr-x 1 root root 3.0M Mar  4 13:01 git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-add -> git
-rwxr-xr-x 1 root root  46K Mar  4 13:01 git-add--interactive
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-am -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-annotate -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-apply -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-archive -> git
-rwxr-xr-x 1 root root 8.1K Mar  4 13:01 git-bisect
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-bisect--helper -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-blame -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-branch -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-bundle -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-cat-file -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-check-attr -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-check-ignore -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-check-mailmap -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-check-ref-format -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-checkout -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-checkout-index -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-cherry -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-cherry-pick -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-clean -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-clone -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-column -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-commit -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-commit-graph -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-commit-tree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-config -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-count-objects -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-credential -> git
-rwxr-xr-x 1 root root 1.7M Mar  4 13:01 git-credential-cache
-rwxr-xr-x 1 root root 1.7M Mar  4 13:01 git-credential-cache--daemon
-rwxr-xr-x 1 root root 1.7M Mar  4 13:01 git-credential-store
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-daemon
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-describe -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-diff -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-diff-files -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-diff-index -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-diff-tree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-difftool -> git
-rwxr-xr-x 1 root root 2.2K Mar  4 13:01 git-difftool--helper
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-env--helper -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-fast-export -> git
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-fast-import
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-fetch -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-fetch-pack -> git
-rwxr-xr-x 1 root root  16K Mar  4 13:01 git-filter-branch
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-fmt-merge-msg -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-for-each-ref -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-format-patch -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-fsck -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-fsck-objects -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-gc -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-get-tar-commit-id -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-grep -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-hash-object -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-help -> git
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-http-backend
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-http-fetch
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-http-push
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-imap-send
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-index-pack -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-init -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-init-db -> git
-rwxr-xr-x 1 root root  22K Mar  4 13:01 git-instaweb
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-interpret-trailers -> git
-rwxr-xr-x 1 root root  17K Mar  4 13:01 git-legacy-stash
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-log -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-ls-files -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-ls-remote -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-ls-tree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-mailinfo -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-mailsplit -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-base -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-file -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-index -> git
-rwxr-xr-x 1 root root 2.5K Mar  4 13:01 git-merge-octopus
-rwxr-xr-x 1 root root 3.7K Mar  4 13:01 git-merge-one-file
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-ours -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-recursive -> git
-rwxr-xr-x 1 root root  944 Mar  4 13:01 git-merge-resolve
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-subtree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-merge-tree -> git
-rwxr-xr-x 1 root root  11K Mar  4 13:01 git-mergetool
-rw-r--r-- 1 root root 9.0K Mar  4 13:01 git-mergetool--lib
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-mktag -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-mktree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-multi-pack-index -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-mv -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-name-rev -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-notes -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-pack-objects -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-pack-redundant -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-pack-refs -> git
-rw-r--r-- 1 root root 2.6K Mar  4 13:01 git-parse-remote
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-patch-id -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-prune -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-prune-packed -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-pull -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-push -> git
-rwxr-xr-x 1 root root 3.7K Mar  4 13:01 git-quiltimport
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-range-diff -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-read-tree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-rebase -> git
-rw-r--r-- 1 root root  29K Mar  4 13:01 git-rebase--preserve-merges
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-receive-pack -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-reflog -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-remote -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-remote-ext -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-remote-fd -> git
lrwxrwxrwx 1 root root   15 Mar  4 13:01 git-remote-ftp -> git-remote-http
lrwxrwxrwx 1 root root   15 Mar  4 13:01 git-remote-ftps -> git-remote-http
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-remote-http
lrwxrwxrwx 1 root root   15 Mar  4 13:01 git-remote-https -> git-remote-http
-rwxr-xr-x 1 root root 1.8M Mar  4 13:01 git-remote-testsvn
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-repack -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-replace -> git
-rwxr-xr-x 1 root root 4.1K Mar  4 13:01 git-request-pull
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-rerere -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-reset -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-restore -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-rev-list -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-rev-parse -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-revert -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-rm -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-send-pack -> git
-rw-r--r-- 1 root root 2.4K Mar  4 13:01 git-sh-i18n
-rwxr-xr-x 1 root root 1.7M Mar  4 13:01 git-sh-i18n--envsubst
-rw-r--r-- 1 root root  17K Mar  4 13:01 git-sh-prompt
-rw-r--r-- 1 root root 9.1K Mar  4 13:01 git-sh-setup
-rwxr-xr-x 1 root root 1.7M Mar  4 13:01 git-shell
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-shortlog -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-show -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-show-branch -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-show-index -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-show-ref -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-sparse-checkout -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-stage -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-stash -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-status -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-stripspace -> git
-rwxr-xr-x 1 root root  26K Mar  4 13:01 git-submodule
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-submodule--helper -> git
-rwxr-xr-x 1 root root  18K Mar  4 13:01 git-subtree
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-switch -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-symbolic-ref -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-tag -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-unpack-file -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-unpack-objects -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-update-index -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-update-ref -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-update-server-info -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-upload-archive -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-upload-pack -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-var -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-verify-commit -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-verify-pack -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-verify-tag -> git
-rwxr-xr-x 1 root root 4.3K Mar  4 13:01 git-web--browse
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-whatchanged -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-worktree -> git
lrwxrwxrwx 1 root root    3 Mar  4 13:01 git-write-tree -> git
drwxr-xr-x 2 root root 4.0K Jul 10 00:51 mergetools
```

可以看到大部分的`git`连字符命令都软链接到了`git`命令。

- 短选项与长选项

Git的命令能够理解短选项和长选项。如，`git commit`命令将下面两条命令视为等价的。

```sh
# 短选项
$ git commit -m "Fixed a type."

# 长选项
$ git commit --message="Fixed a type."
```

注意，有些选项只有一种形式。



- 祼双破折号的使用

可以使用祼双破折号的约定来分离一系列参数。

例如，使用双破折号来分离命令行的控制部分与操作数部分，如文件名。

```sh
$ git diff -w master origin -- tools/Makefile
```

你也可能需要使用双破折号分离并显示标识文件名，否则会认为它们是命令的另一部分。如，如果你碰巧有一个文件名和一个标签都叫做`main.c`，然后你会看到不同的行为：

```sh
# 检出main.c标签
$ git checkout main.c

# 检出文件main.c
$ git checkout -- main.c
```

为了测试这种不同的行为，我们在码云上面创建一个测试仓库 [https://gitee.com/meizhaohui/testgit](https://gitee.com/meizhaohui/testgit) , 并在其中创建一个`main.c`的标签，并增加一个`main.c`文件。

配置完成后，我们尝试使用`https`形式下载代码：

```sh
mei@4144e8c22fff:~$ git clone https://gitee.com/meizhaohui/testgit.git
Cloning into 'testgit'...
Username for 'https://gitee.com': meizhaohui
Password for 'https://meizhaohui@gitee.com':
remote: Enumerating objects: 8, done.
remote: Counting objects: 100% (8/8), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 8 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (8/8), 1.64 KiB | 129.00 KiB/s, done.
mei@4144e8c22fff:~$
```

此时需要输入用户名和密码。



测试使用破折号与不使用的区别：

```sh
mei@4144e8c22fff:~$ ls
testgit
mei@4144e8c22fff:~$ cd testgit/
mei@4144e8c22fff:~/testgit$ ls
README.en.md  README.md  main.c
mei@4144e8c22fff:~/testgit$ git remote -v
origin	https://gitee.com/meizhaohui/testgit.git (fetch)
origin	https://gitee.com/meizhaohui/testgit.git (push)

# 使用双破折号，不会切换分支，只是尝试检出文件
mei@4144e8c22fff:~/testgit$ git checkout -- main.c
mei@4144e8c22fff:~/testgit$ ls
README.en.md  README.md  main.c

# 分支信息是master
mei@4144e8c22fff:~/testgit$ git branch
* master
mei@4144e8c22fff:~/testgit$ git checkout main.c
Note: switching to 'main.c'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 31d636a Initial commit

# 修改一下配置
mei@4144e8c22fff:~/testgit$ git config advice.detachedHead false

# 检出main.c标签
mei@4144e8c22fff:~/testgit$ git checkout main.c
HEAD is now at 31d636a Initial commit

# 此时可以发现文件发生了变化
mei@4144e8c22fff:~/testgit$ ls
README.en.md  README.md
mei@4144e8c22fff:~/testgit$

# 当前分支也发生变化
mei@4144e8c22fff:~/testgit$ git branch
* (HEAD detached at main.c)
  master
mei@4144e8c22fff:~/testgit$ git tag
main.c
```

该示例可以说明，是否使用双破折号，命令的效果不一样！

### 3.2 Git使用快速入门

为了实际见识Git的操作，我们新建一个版本库，添加一些内容，然后管理一些修订版本。

- `git init`将目录转换成Git版本库。

```sh
mei@4144e8c22fff:~$ mkdir public_html
mei@4144e8c22fff:~$ cd public_html/
mei@4144e8c22fff:~/public_html$ echo 'My website is alive!' > index.html
mei@4144e8c22fff:~/public_html$ git init
Initialized empty Git repository in /home/mei/public_html/.git/
mei@4144e8c22fff:~/public_html$ ls -lah
total 16K
drwxrwxr-x 3 mei mei 4.0K Jul 15 13:00 .
drwxr-xr-x 4 mei mei 4.0K Jul 15 12:59 ..
drwxrwxr-x 7 mei mei 4.0K Jul 15 13:00 .git
-rw-rw-r-- 1 mei mei   21 Jul 15 13:00 index.html
```

可以看到`git init`会创建一个隐藏目录，在项目的顶层目录，名为`.git`。Git把所有修订信息都放在这唯一的顶层`.git`目录中。隐藏在`.git`目录内的版本库由Git维护。

- `git add`将文件添加到版本库中。
- `git status`查看当前状态。

```sh
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	index.html

nothing added to commit but untracked files present (use "git add" to track)
mei@4144e8c22fff:~/public_html$ git add index.html
mei@4144e8c22fff:~/public_html$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   index.html

mei@4144e8c22fff:~/public_html$
```

此时，Git会将`index.html`文件暂存(Staged)起来，这是提交之前的中间步骤。

- `git commit`提交。

```sh
mei@4144e8c22fff:~/public_html$ git commit -m"Initial contents of public_html"

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'mei@4144e8c22fff.(none)')
mei@4144e8c22fff:~/public_html$
```

可以看到，直接使用`git commit`提交，不提供用户名和邮箱信息时，Git不知道你是谁，因此必须指定姓名和邮箱地址。

通过`git commit`的帮助文档我们可以知道，可以指定`--author`参数来强制更新作者信息：

```sh
mei@4144e8c22fff:~/public_html$ git commit --help|grep -A 2 "\-\-author"
                  [--allow-empty-message] [--no-verify] [-e] [--author=<author>]
                  [--date=<date>] [--cleanup=<mode>] [--[no-]status]
                  [-i | -o] [--pathspec-from-file=<file> [--pathspec-file-nul]]
--
       --author=<author>
           Override the commit author. Specify an explicit author using the standard A U Thor <author@example.com> format. Otherwise <author> is assumed to
           be a pattern and is used to search for an existing commit by that author (i.e. rev-list --all -i --author=<author>); the commit author is then
           copied from the first such commit found.

mei@4144e8c22fff:~/public_html$
```

我们尝试在提交时使用`--author`参数：

```sh
mei@4144e8c22fff:~/public_html$ git commit -m"Initial contents of public_html" --author="Zhaohui Mei <mzh.whut@gmail.com>"

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'mei@4144e8c22fff.(none)')
```

可以看到，在Git新版本中，直接使用`--author`参数仍然会提示异常。

### 3.3 配置提交作者信息

虽然我们可以通过在`git commit`中指定`--author`参数，但更常用的方法是，在全局指定用户名和邮箱信息，正如上面提示的信息那样，使用以下命令：

```sh
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```

我们在全局配置一下作者信息，如我的邮箱地址是`mzh@hellogitlab.com`，用户名是`Zhaohui Mei`，则全局配置命令如下：

```sh
# 配置邮箱
mei@4144e8c22fff:~$ git config --global user.email "mzh@hellogitlab.com"
# 配置用户名
mei@4144e8c22fff:~$ git config --global user.name "Zhaohui Mei"
# 查看全局配置信息
mei@4144e8c22fff:~$ git config --global --list
user.email=mzh@hellogitlab.com
user.name=Zhaohui Mei
```

此时，我们再尝试使用`git commit`来设置`--author`参数提交：

```sh
mei@4144e8c22fff:~/public_html$ git commit -m"Initial contents of public_html" --author="Zhaohui Mei <mzh.whut@gmail.com>"
[master (root-commit) daa3d7d] Initial contents of public_html
 Author: Zhaohui Mei <mzh.whut@gmail.com>
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
 
# 查看提交日志信息 
mei@4144e8c22fff:~/public_html$ git log -n 1
commit daa3d7d538f64637f2b475015ed6858324f17223 (HEAD -> master)
Author: Zhaohui Mei <mzh.whut@gmail.com>
Date:   Sat Jul 17 01:20:00 2021 +0000

    Initial contents of public_html
mei@4144e8c22fff:~/public_html$
```

可以看到，已经正常提交成功了，并且作者信息使用的是命令行参数中指定的作者信息，而不是默认全局的用户名和邮箱信息。



为了验证是否可以通过`GIT_AUTHOR_NAME`和`GIT_AUTHOR_EMAIL`环境变量的方式来设置用户名和邮箱信息，我们先将全局配置的用户名和邮箱信息给移除掉：

```sh
# 查看全局配置信息
mei@4144e8c22fff:~$ git config --global --list
user.email=mzh@hellogitlab.com
user.name=Zhaohui Mei

# 删除全局配置项
mei@4144e8c22fff:~$ git config --global --unset user.email
mei@4144e8c22fff:~$ git config --global --unset user.name

# 再次查看全局配置信息
mei@4144e8c22fff:~$ git config --global --list
```

可以看到现在已经没有全局配置项了。



我们对`index.html`进行一些修改：

```sh
# 查看修改后的文件内容
mei@4144e8c22fff:~/public_html$ cat index.html
<html>
<body>
My website is alive!
</body>
</html>
mei@4144e8c22fff:~/public_html$ 

# 查看修改差异
mei@4144e8c22fff:~/public_html$ git diff
diff --git a/index.html b/index.html
index 34217e9..8638631 100644
--- a/index.html
+++ b/index.html
@@ -1 +1,5 @@
+<html>
+<body>
 My website is alive!
+</body>
+</html>
```

此时，我们再次进行提交，但在提交时，指定一下`GIT_AUTHOR_NAME`和`GIT_AUTHOR_EMAIL`环境变量：

```sh
mei@4144e8c22fff:~/public_html$ GIT_AUTHOR_EMAIL="mzh.whut@gmail.com" && GIT_AUTHOR_NAME="meizhaohui" && git commit -m"Convert to HTML" index.html

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'mei@4144e8c22fff.(none)')
mei@4144e8c22fff:~/public_html$ git commit -m"Convert to HTML" index.html

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'mei@4144e8c22fff.(none)')
```

此时，可以看到，提交失败，仍然提示需要配置全局用户名和邮箱。因此我按上面的方式再次把全局用户名和邮箱配置好：

```sh
mei@4144e8c22fff:~$ git config --global user.email "mzh@hellogitlab.com"
mei@4144e8c22fff:~$ git config --global user.name "Zhaohui Mei"
mei@4144e8c22fff:~$ git config --global --list
user.email=mzh@hellogitlab.com
user.name=Zhaohui Mei
```

再次使用环境变量的方式进行提交：

```sh
mei@4144e8c22fff:~/public_html$ GIT_AUTHOR_EMAIL="mzh.whut@gmail.com" && GIT_AUTHOR_NAME="meizhaohui" && git commit -m"Convert to HTML" index.html
[master b7dc136] Convert to HTML
 1 file changed, 4 insertions(+)
mei@4144e8c22fff:~/public_html$ git log -n 1
commit b7dc13619a73fa49fe7ea0b9284bcb277717a984 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Sat Jul 17 01:44:07 2021 +0000

    Convert to HTML
mei@4144e8c22fff:~/public_html$ echo $GIT_AUTHOR_NAME
meizhaohui
mei@4144e8c22fff:~/public_html$ echo $GIT_AUTHOR_EMAIL
mzh.whut@gmail.com
```

此处可以看到，设定的环境变量在提交过程中没有起作用，因为日志信息中作者信息是`Author: Zhaohui Mei <mzh@hellogitlab.com>`，与我们设定的环境变量不一样。

### 3.4 查看提交信息

- `git log`命令会产生版本库里一系列单独提交的历史信息。

我们刚才已经进行了两次提交，我们查看一下：

```sh
mei@4144e8c22fff:~/public_html$ git log
commit b7dc13619a73fa49fe7ea0b9284bcb277717a984 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Sat Jul 17 01:44:07 2021 +0000

    Convert to HTML

commit daa3d7d538f64637f2b475015ed6858324f17223
Author: Zhaohui Mei <mzh.whut@gmail.com>
Date:   Sat Jul 17 01:20:00 2021 +0000

    Initial contents of public_html
mei@4144e8c22fff:~/public_html$
```

条目按时间逆序罗列出来(*严格来说，它们不是按照时间顺序，而是提交的拓扑顺序排列*)，每条信息显示了提交作者的名字和邮箱地址，提交日期，哟赶紧去的日志信息以及提交的内部识别码(也就是commit id)。

- `git show <commit_id>`命令可以查看特定提交的更加详细的信息。

```sh
mei@4144e8c22fff:~/public_html$ git show
commit b7dc13619a73fa49fe7ea0b9284bcb277717a984 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Sat Jul 17 01:44:07 2021 +0000

    Convert to HTML

diff --git a/index.html b/index.html
index 34217e9..8638631 100644
--- a/index.html
+++ b/index.html
@@ -1 +1,5 @@
+<html>
+<body>
 My website is alive!
+</body>
+</html>
mei@4144e8c22fff:~/public_html$ git show daa3d7d538f64637f2b475015ed6858324f17223
commit daa3d7d538f64637f2b475015ed6858324f17223
Author: Zhaohui Mei <mzh.whut@gmail.com>
Date:   Sat Jul 17 01:20:00 2021 +0000

    Initial contents of public_html

diff --git a/index.html b/index.html
new file mode 100644
index 0000000..34217e9
--- /dev/null
+++ b/index.html
@@ -0,0 +1 @@
+My website is alive!
mei@4144e8c22fff:~/public_html$
```

如果在`git show`命令中未指定commit_id，则会显示最近一次提交的详细信息。

- `git show-branch`,查看当前开发分支简洁的单行摘要信息。

```sh
mei@4144e8c22fff:~/public_html$ git show-branch
[master] Convert to HTML
mei@4144e8c22fff:~/public_html$ git show-branch --more=10
[master] Convert to HTML
[master^] Initial contents of public_html
mei@4144e8c22fff:~/public_html$
mei@4144e8c22fff:~/public_html$ git branch
* master
```

不带参数时，默认只列出最新的提交。`--more=10`参数表示额外显示10个版本。

### 3.5 查看提交差异

- `git diff`命令可以查看差异信息。

```sh
mei@4144e8c22fff:~/public_html$ git log |grep ^commit
commit b7dc13619a73fa49fe7ea0b9284bcb277717a984
commit daa3d7d538f64637f2b475015ed6858324f17223
mei@4144e8c22fff:~/public_html$ git diff daa3d7d538f64637f2b475015ed6858324f17223 b7dc13619a73fa49fe7ea0b9284bcb277717a984
diff --git a/index.html b/index.html
index 34217e9..8638631 100644
--- a/index.html
+++ b/index.html
@@ -1 +1,5 @@
+<html>
+<body>
 My website is alive!
+</body>
+</html>
mei@4144e8c22fff:~/public_html$
```

比较两个版本时，将较早的版本放在命令行的前面，较新的版本放在命令行的后面。

这个输出与`diff`程序的输出非常相似。

不要担心那些十六进制数字，Git提供了许多更短、更简单的方式来执行这样的命令，而无须产生这样大而复杂的数字。

### 3.6 版本库内文件的删除和重命名

- `git rm filename`删除文件。
- `git mv filename1 filename2`重命名文件。

任何一情况下，暂存的变更必须随后进行提交。

### 3.7 创建版本库副本

- 可以使用`git clone`命令创建版本库的一个完整的副本，或叫克隆。这使得世界各地的人可以通过Git在相同的文件上从事他们喜欢的项目，并保持与其他版本库同步。

我们可以在主目录创建一个`public_html`的副本，命名为`my_website`：

```sh
mei@4144e8c22fff:~/public_html$ cd
mei@4144e8c22fff:~$ git clone public_html my_website
Cloning into 'my_website'...
done.
mei@4144e8c22fff:~$
mei@4144e8c22fff:~$ cd my_website/
mei@4144e8c22fff:~/my_website$ git log
commit b7dc13619a73fa49fe7ea0b9284bcb277717a984 (HEAD -> master, origin/master, origin/HEAD)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Sat Jul 17 01:44:07 2021 +0000

    Convert to HTML

commit daa3d7d538f64637f2b475015ed6858324f17223
Author: Zhaohui Mei <mzh.whut@gmail.com>
Date:   Sat Jul 17 01:20:00 2021 +0000

    Initial contents of public_html
mei@4144e8c22fff:~/my_website$ ls
index.html
mei@4144e8c22fff:~/my_website$ cat index.html
<html>
<body>
My website is alive!
</body>
</html>
```

可以看到`my_website`中的文件内容与`public_html`文件夹里面完全一样，日志信息也是一样的。

更通用的是，我们使用`git clone`命令来下载远程的Git仓库代码。如：

```sh
mei@4144e8c22fff:~$ git clone git@gitee.com:meizhaohui/git.git
Cloning into 'git'...
The authenticity of host 'gitee.com (180.97.125.228)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'gitee.com,180.97.125.228' (ECDSA) to the list of known hosts.
git@gitee.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
mei@4144e8c22fff:~$ git clone https://gitee.com/meizhaohui/git.git
Cloning into 'git'...
remote: Enumerating objects: 309613, done.
remote: Counting objects: 100% (309613/309613), done.
remote: Compressing objects: 100% (76164/76164), done.
remote: Total 309613 (delta 231105), reused 309613 (delta 231105), pack-reused 0
Receiving objects: 100% (309613/309613), 163.07 MiB | 6.58 MiB/s, done.
Resolving deltas: 100% (231105/231105), done.
mei@4144e8c22fff:~$
```

通过该方式下载了Git的源码！一个Git源码的版本库副本就在本地创建好了！！



### 3.8 配置文件

- `/etc/gitconfig`，系统级配置文件，不一定存在，可通过`git config --system`来修改，优先级最低。
- `~/.gitconfig`，用户级配置文件，可用`git config --global`来修改，优先级比系统级配置文件高。
- `.git/config`，版本库特定的配置文件，可以通过`git config --local`来修改，优先级最高。

```sh
# 查看系统级配置信息
mei@4144e8c22fff:~/public_html$ git config --system --list
fatal: unable to read config file '/etc/gitconfig': No such file or directory

# 查看用户级配置信息
mei@4144e8c22fff:~/public_html$ git config --global --list
user.email=mzh@hellogitlab.com
user.name=Zhaohui Mei

# 查看版本库配置信息
mei@4144e8c22fff:~/public_html$ git config --local --list
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
```

尝试修改版本库特定配置信息：

```sh
# 查看版本库配置文件内容
mei@4144e8c22fff:~/public_html$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
mei@4144e8c22fff:~/public_html$ 	

# 查看版本库配置项
mei@4144e8c22fff:~/public_html$ git config --local --list
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
mei@4144e8c22fff:~/public_html$ 

# 更新版本库配置项信息
mei@4144e8c22fff:~/public_html$ git config --local user.name meizhaohui

# 查看版本库配置项
mei@4144e8c22fff:~/public_html$ git config --local --list
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
user.name=meizhaohui
mei@4144e8c22fff:~/public_html$ 

# 查看版本库配置文件
mei@4144e8c22fff:~/public_html$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[user]
	name = meizhaohui
```

可以发现版本库配置文件中已经增加了配置内容。



查看用户级配置文件内容：

```sh
mei@4144e8c22fff:~$ cat ~/.gitconfig
[user]
	email = mzh@hellogitlab.com
	name = Zhaohui Mei
mei@4144e8c22fff:~$
```

配置帮助信息：

```sh
mei@4144e8c22fff:~$ git config
usage: git config [<options>]

Config file location
    --global              use global config file
    --system              use system config file
    --local               use repository config file
    --worktree            use per-worktree config file
    -f, --file <file>     use given config file
    --blob <blob-id>      read config from given blob object

Action
    --get                 get value: name [value-regex]
    --get-all             get all values: key [value-regex]
    --get-regexp          get values for regexp: name-regex [value-regex]
    --get-urlmatch        get value specific for the URL: section[.var] URL
    --replace-all         replace all matching variables: name value [value_regex]
    --add                 add a new variable: name value
    --unset               remove a variable: name [value-regex]
    --unset-all           remove all matches: name [value-regex]
    --rename-section      rename section: old-name new-name
    --remove-section      remove a section: name
    -l, --list            list all
    -e, --edit            open an editor
    --get-color           find the color configured: slot [default]
    --get-colorbool       find the color setting: slot [stdout-is-tty]

Type
    -t, --type <>         value is given this type
    --bool                value is "true" or "false"
    --int                 value is decimal number
    --bool-or-int         value is --bool or --int
    --path                value is a path (file or directory name)
    --expiry-date         value is an expiry date

Other
    -z, --null            terminate values with NUL byte
    --name-only           show variable names only
    --includes            respect include directives on lookup
    --show-origin         show origin of config (file, standard input, blob, command line)
    --default <value>     with --get, use default value when missing entry

mei@4144e8c22fff:~$
```

直接使用`git config`可以获取配置相关的简短的帮助信息，如果使用`git config --help`可以获取配置的详细帮助信息。

```sh
mei@4144e8c22fff:~$ git config --help|head
GIT-CONFIG(1)                                                             Git Manual                                                            GIT-CONFIG(1)

NAME
       git-config - Get and set repository or global options

SYNOPSIS
       git config [<file-option>] [--type=<type>] [--show-origin] [-z|--null] name [value [value_regex]]
       git config [<file-option>] [--type=<type>] --add name value
       git config [<file-option>] [--type=<type>] --replace-all name value [value_regex]
       git config [<file-option>] [--type=<type>] [--show-origin] [-z|--null] --get name [value_regex]
mei@4144e8c22fff:~$
mei@4144e8c22fff:~$ git config --help|wc
   3515   31555  230642
```

可以看到，`git config`有3515行的帮助信息！！非常详细。

- 移除配置项`git config --unset`。

我们可以使用`git config --unset`命令来移除某些不需要的配置项。如我们将刚才在版本库级别配置的用户名给移除掉：

```sh
mei@4144e8c22fff:~/public_html$ git config --local --list
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
user.name=meizhaohui
mei@4144e8c22fff:~/public_html$ git config --local --unset user.name
mei@4144e8c22fff:~/public_html$ git config --local --list
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
mei@4144e8c22fff:~/public_html$
mei@4144e8c22fff:~/public_html$ cat .git/config
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
```

可以看到，配置文件中的配置内容被清理掉，从命令行中查看配置项列表中`user.name`也被清除掉了。

### 3.9 设置别名

正如Linux操作系统中可以使用别名一样，我们在Git中也可以使用别名。如果你经常输入一条常用而复杂的Git命令，你可以考虑为它设置一个简单的Git别名，或者使用Linux别名。

- 不使用别名时，执行命令

```sh
mei@4144e8c22fff:~/public_html$ git log --graph --abbrev-commit --pretty=oneline
* b7dc136 (HEAD -> master) Convert to HTML
* daa3d7d Initial contents of public_html
```

可以发现命令比较长，还容易打错。

- 通过Git设置别名

我们如果想将上面的长命令设置一个`git simple`的简单命令，则可以按如下方式操作：

```sh
# 第一步，看别名是否被占用
mei@4144e8c22fff:~/public_html$ git simple
git: 'simple' is not a git command. See 'git --help'.

# 可以发现上述simple命令没有被占用
# 设置别名，注意，别名中引号内部不需要git开头
mei@4144e8c22fff:~/public_html$ git config --global alias.simple 'log --graph --abbrev-commit --pretty=oneline'

# 查看配置项
mei@4144e8c22fff:~/public_html$ git config --global --list
user.email=mzh@hellogitlab.com
user.name=Zhaohui Mei
alias.simple=log --graph --abbrev-commit --pretty=oneline

# 使用别名查看提交信息
mei@4144e8c22fff:~/public_html$ git simple
* b7dc136 (HEAD -> master) Convert to HTML
* daa3d7d Initial contents of public_html
```

要以看到别名设置后，马上就可以使用了。



- 通过Linux alias设置别名

我们也可以通过Linux `alias`命令来设置别名。如我经常使用`git status`查看当前版本库的状态，我们可以设置一个别名`gs`:

```
mei@4144e8c22fff:~/public_html$ git status
On branch master
nothing to commit, working tree clean
mei@4144e8c22fff:~/public_html$ alias gs='git status'
mei@4144e8c22fff:~/public_html$ gs
On branch master
nothing to commit, working tree clean
```

如果想让`alias`配置的命令永久有效，则可以在`~/.bashrc`配置中加入上述命令。

我们也可以为`git log --graph --abbrev-commit --pretty=oneline`命令设置一个别名`gg`。

使用`vim ~/.bashrc`编译配置文件，在最后增加以下别名：

```sh
alias v.='vim ~/.bashrc'
alias s.='source ~/.bashrc && echo "Reload OK"'
alias gs='git status'
alias gg='git log --graph --abbrev-commit --pretty=oneline'
```

退出后，查看配置文件：

```sh
mei@4144e8c22fff:~/public_html$ tail -n 4 ~/.bashrc
alias v.='vim ~/.bashrc'
alias s.='source ~/.bashrc && echo "Reload OK"'
alias gs='git status'
alias gg='git log --graph --abbrev-commit --pretty=oneline'
```

使用`source ~/.bashrc`重新加载配置文件。

```sh
mei@4144e8c22fff:~/public_html$ source ~/.bashrc
mei@4144e8c22fff:~/public_html$ s.
Reload OK
mei@4144e8c22fff:~/public_html$ gg
* b7dc136 (HEAD -> master) Convert to HTML
* daa3d7d Initial contents of public_html
mei@4144e8c22fff:~/public_html$ gs
On branch master
nothing to commit, working tree clean
mei@4144e8c22fff:~/public_html$
```

此时，可以看到，使用`alias`配置的更简单的命令已经生效了！

这两种方式都可以配置命令的别名。我更喜欢使用Linux `alias`命令来配置别名，可以配置更简短的别名，相比Git的别名，我可以少输入`git `等字符！

## 第4章 基本的Git概念

### 4.1 基本概念

#### 4.1.1 版本库

- Git版本库(repository)只是一个简单的数据库，其中包含所有用来维护与管理项目的修订版本和历史的信息。
- 一个版本库维护项目整个生命周期的完整副本。
- Git版本库不仅仅提供版本库中所有文件的完整副本，还提供版本库本身的副本。
- Git在每个版本库里维护一组配置项。如版本库的用户名和邮箱地址信息。
- Git在把一个版本库克隆clone或者复制到另一个版本库的时候，配置设置不会跟着转移。
- 在版本库中，Git维护两个主要的数据结构：**对象库object store**和**索引index**。所有这些版本库数据存放在工作目录根目录下的.git的隐藏子目录中。

#### 4.1.2 Git对象类型

对象库是Git版本库实现的心脏。它包含用户的原始数据文件和所有日志信息、作者信息、日期，以及其他用来重建项目任意版本或分支的信息。

Git放在对象库中的对象只有4种类型：块blob，目录树tree，提交commit，标签tag。这4种原子对象构成Git高层数据结构的基础。

- 块blob: 文件的每一个版本表示为一个块(blob)。 blob是二进制大对象 *binary large object*的缩写。用来指代某些可以包含任意数据的变量或文件，同时其内部结构会被程序忽略。一个blob被视为一个墨盒。一个blob保存一个文件的数据，但不包含任何关于这个文件的元数据，甚至连文件名也没有。
- 目录树tree: 一个目录树tree对象代表一层目录信息。它记录blob标识符、路径名和在一个目录里所有文件的一些元数据。它也可以递归引用其他目录树或子树对象，从而建立一个包含文件和子目录的完整层次结构。
- 提交commit: 一个提交commit对象保存版本库中每一次变化的元数据，包括作者、提交者、提交日期和日志消息。每一个提交对象指向一个目录树对象，这个目录树对象在一张完整的快照中捕获提交时版本库的状态。最初的提交或者根提交(root commit)是没有父提交的。大多数提交都有一个父提交。
- 标签tag: 一个标签对象分配一个任意的且人类可读的名字给一个特定对象，通常是一个提交对象。虽然像commit-id那样指的是一个确切且定义好的提交，但是一个更熟悉的标签名(如:v1.1.0)可能会更有意义。

随意时间的推移，所有信息在对象库中会变化和增长，项目的编辑、添加和删除都会被跟踪和建模。为了有效地利用磁盘空间和网络带宽，Git把对象压缩并存储在打包文件 *(pack file)* 里，这些文件也在对象库里。





#### 4.1.3 索引

- 索引是一个临时的、动态的二进制文件。它描述整个版本库的目录结构。
- 索引捕获项目在某个时刻的整体结构的一个版本。
- 项目的状态可以用一个提交和一棵目录树表示，它可以来自项目历史中的任意时刻，也可以是你正在开发的未来状态。
- 工作原理：当你通过执行Git命令在索引中暂存stage变更，这些变更通常是添加、删除或者编辑某个文件或某些文件。索引会记录和保存那些变更，保障它们的安全直到你准备好提交了。还可以删除或者替换索引中的变更。索引支持一个由你主导的从复杂的版本库状态到一个可推测的更好状态的逐步过渡。



#### 4.1.4 可寻址内容名称

- Git对象库被组织及实现成一个内容寻址的存储系统。
- 对象库中每个对象都有一个唯一的名称，这个名称是向对象的内容应用SHA1得到SHA1散列值。
- 一个对象的完整内容决定了该散列值，这个散列值能有效并唯一地对应特定的内容。
- 文件的任意微小变化都会导致SHA1散列值的改变，使得文件的新版本被单独编入索引。

> **SHA-1**（英语：Secure Hash Algorithm 1，中文名：安全散列算法1）是一种[密码散列函数](https://baike.baidu.com/item/密码散列函数)，[美国国家安全局](https://baike.baidu.com/item/美国国家安全局)设计，并由美国国家标准技术研究所（NIST）发布为联邦数据处理标准（FIPS）。SHA-1可以生成一个被称为消息摘要的160[位](https://baike.baidu.com/item/位)（20[字节](https://baike.baidu.com/item/字节)）散列值，散列值通常的呈现形式为40个[十六进制](https://baike.baidu.com/item/十六进制/4162457)数。

- SHA1的值是一个160位的数，通常表示为一个40位的十六进制数。有时候，在显示期间，SHA1值被简化成一个较小的、唯一的前缀。
- Git用户所说的SHA1、散列码和对象ID都是指同一个东西。

::: tip 提示

- 全局唯一标识符：SHA散列计算的一个重要特性是不管内容在哪里，它对同样的内容始终产生同样的ID。
- 换言之，在不同的目录里甚至不同机器中的相同的文件内容产生的SHA1哈希ID是完全相同的。
- 因此，文件的SHA1散列ID是一种有效的全局唯一标识符。
- 在互联网上，文件或者任意大小的blob都可以通过仅比较它们的SHA1标识符来判断是否相同。

:::





#### 4.1.5 Git追踪内容

- Git不仅仅是一个VCS，它同时也是一个内容追踪系统content tracking system。
- Git的内容追踪主要表现为两个关键的形式。
- Git的对象库基于其对象内容的散列计算的值，而不是基于用户原始文件布局的文件名或目录名设置。因此，当Git放置一个文件到对象库中的时候，它基于数据的散列而不是文件名。事实上，Git并不追踪那些和文件次相关的文件名或者目录名。
- Git追踪的是内容而不是文件。
- **如果两个文件的内容完全一样，无论是否在相同的目录，Git在对象库里只保存一份blob形式的内容副本。** Git仅根据文件内容来计算每一个文件的散列值，如果文件有相同的SHA1值，它们的内容就是相同的，然后将这个blob对象放到对象库里，并以SHA1值作为索引。项目中的这两个文件，不管它们在用户的目录结构中处于什么位置，都使用那个相同的对象提供其内容。如果这些文件中的一个发生了变化，Git会为它计算一个新的SHA1值，识别出它现在是一个不同的blob对象，然后把这个新的blob加到对象库里。原来的blob在对象库里保持不变，为没有变化的文件所使用。
- 当文件从一个版本变到下一个版本的时候，Git的内部数据库有效地存储每个文件的每个版本，而不是它们的差异。因为Git使用一个文件的全部内容的散列值作为文件名，所以它必须对每个文件的完整副本进行操作。Git不能将工作或者对象库条目建立在文件内容的一部分或者文件的两个版本之间的差异上。





#### 4.1.6 路径名与内容

- Git需要维护一个明确的文件列表来组成版本库的内容。
- Git把文件名视为一段区别于文件内容的数据。
- Git仅仅记录每个路径名，并且确保能通过它的内容精确地重建文件和目录，这些是由散列值过索引的。
- Git的物理数据布局并不模仿用户的文件目录结构。Git的内部结构是一种更高效的数据结构。



#### 4.1.7 打包文件

- Git使用了一种收做打包文件pack file的更有效的存储机制。要创建一个打包文件，Git首先定位内容非常相似的全部文件，然后为它们之一存储整个内容，之后计算相似文件之间的差异并且只存储差异。例如，如果你只添加一行到文件中，Git可能会存储新版本的全部内容，然后记录那一行的更改作为差异，并存储在包里。
- Git可以在版本库里的任何地方取出两个文件并计算差异，只要它认为它们足够相似来产生良好的数据压缩。因此，Git有一套相当复杂的算法来定位和匹配版本库中潜在的全局候选差异。
- Git还维护打包文件中表示每个完整文件(包含完整内容的文件和通过差异重建出来的文件)的原始blob的SHA1值。这给定位包内对象的索引机制提供了基础。
- 打包文件和对象库中其他对象存储在一起。它们也用于网络中版本库的高效数据传输。





### 4.2  对象库图示

- blob对象是数据结构的“底端”；它什么也不引用而且只被树对象引用。每个blob块由一个矩形表示。

- 树对象指向若干blob对象，也可能指向其他树对象。许多不同的提交对象可能指向任何给定的树对象。每个树对象由一个三角形表示。

- 一个圆圈表示一个提交对象。一个提交对象指向一个特定的树对象，并且这个树对象是由提交对象引入版本库的。

- 每个标签由一个平行四边形表示。每个标签可以指向最多一个提交对象。
- 分支不是一个基本的Git对象，但是它在命名提交对象的时候起到了至关重要的作用。把每个分支画成一个圆角矩形。



### 4.3 Git在工作时的概念

我们来创建一个新的版本库，并更详细的检查内容文件和对象库。

#### 4.3.1 创建版本库

- 使用`git init`创建一个空的版本库。

```sh
# 创建目录
mei@4144e8c22fff:~$ mkdir hello

# 切换到hello目录下
mei@4144e8c22fff:~$ cd hello/

# 创建一个空的版本库
mei@4144e8c22fff:~/hello$ git init
Initialized empty Git repository in /home/mei/hello/.git/

# 查看当前目录的所有文件
mei@4144e8c22fff:~/hello$ find .|sort
.
./.git
./.git/HEAD
./.git/branches
./.git/config
./.git/description
./.git/hooks
./.git/hooks/applypatch-msg.sample
./.git/hooks/commit-msg.sample
./.git/hooks/fsmonitor-watchman.sample
./.git/hooks/post-update.sample
./.git/hooks/pre-applypatch.sample
./.git/hooks/pre-commit.sample
./.git/hooks/pre-merge-commit.sample
./.git/hooks/pre-push.sample
./.git/hooks/pre-rebase.sample
./.git/hooks/pre-receive.sample
./.git/hooks/prepare-commit-msg.sample
./.git/hooks/update.sample
./.git/info
./.git/info/exclude
./.git/objects
./.git/objects/info
./.git/objects/pack
./.git/refs
./.git/refs/heads
./.git/refs/tags
mei@4144e8c22fff:~/hello$
```

可以看到，`.git`目录包含很多内容，这些文件是基于模板目录显示的，根据需要可以进行调整。根据使用的Git的版本，实际列表可能看起来会有一点不同。例如，旧版本的Git不对`.git/hooks`文件夹中的文件使用`.sample`后缀。

- 在一般情况下，不需要查看或者操作`.git`目录下的文件。认为这些隐藏的文件是Git底层(plumbing)或者配置的一部分。Git有一小部分命令来处理这些隐藏的文件，但是你很少会用到它们。

最初，除了几个占位符之外，`.git/objects`目录（用来存放所有Git对象的目录）是空的。

```sh
mei@4144e8c22fff:~/hello$ find .git/objects
.git/objects
.git/objects/pack
.git/objects/info
```

现在，让我们来小心地创建一个简单的对象。

```sh
# 创建一个hello.txt文件
mei@4144e8c22fff:~/hello$ echo 'hello world' > hello.txt

# 将文件加入到暂存区
mei@4144e8c22fff:~/hello$ git add .
```

此时再次查看`.git/objects`目录：

```sh
mei@4144e8c22fff:~/hello$ find .git/objects
.git/objects
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
```

可以发现已经发生变化了！



#### 4.3.1 扩展 Git是如何计算散列值的？

参考：

- [How does git compute file hashes?](https://stackoverflow.com/questions/7225313/how-does-git-compute-file-hashes)

- [Git Tip of the Week: Objects](https://alblue.bandlem.com/2011/08/git-tip-of-week-objects.html)

Git计算散列值的方法：

```
 Commit Hash (SHA1) = SHA1("blob " + <size_of_file> + "\0" + <contents_of_file>)
```

文本 "blob "是一个常量前缀，"\0" 也是一个常量并且是 NULL 字符。 <size_of_file>是文件长度 和 <contents_of_file>是文件内容， 因文件而异。

- 即Git会在文件内容前面添加一些字符，包含`blob `前缀，文件长度，"\0" ，以及文件内容。



我们来测试一下。

```sh
# 方式1，计算散列值
mei@4144e8c22fff:~/hello$ echo -e 'blob 12\0hello world'|shasum
3b18e512dba79e4c8300dd08aeb37f8e728b8dad  -

# 方式2，计算散列值，注意printf最后的\n
mei@4144e8c22fff:~/hello$ printf "blob 12\0hello world\n"|openssl dgst --sha1
(stdin)= 3b18e512dba79e4c8300dd08aeb37f8e728b8dad

# 方式3，计算散列值，使用git内置命令
mei@4144e8c22fff:~/hello$ echo 'hello world'|git hash-object --stdin
3b18e512dba79e4c8300dd08aeb37f8e728b8dad

# 方式4，直接使用git内置命令来计算文件的散列值
mei@4144e8c22fff:~/hello$ git hash-object hello.txt
3b18e512dba79e4c8300dd08aeb37f8e728b8dad

# 注意，如果字符后面不带换行符，计算出现的hash值与git实际的hash值不一样
mei@4144e8c22fff:~/hello$ echo -n 'hello world'|git hash-object --stdin
95d09f2b10159347eece71399a7e2e907ea3df4f
```



也可以直接在linux定义以下函数：

```sh
git-hash-object-test () { # substitute when the `git` command is not available
    local type=blob
    [ "$1" = "-t" ] && shift && type=$1 && shift
    # depending on eol/autocrlf settings, you may want to substitute CRLFs by LFs
    # by using `perl -pe 's/\r$//g'` instead of `cat` in the next 2 commands
    local size=$(cat $1 | wc -c | sed 's/ .*$//')
    ( echo -en "$type $size\0"; cat "$1" ) | sha1sum | sed 's/ .*$//'
}
```

测试：

```sh
mei@4144e8c22fff:~/hello$ git-hash-object-test hello.txt
3b18e512dba79e4c8300dd08aeb37f8e728b8dad
```

可以看到，与上述获取到正确的结果相同。说明这个函数也是可以正常使用的。



空文件的散列值：

```sh
# 创建空文件
mei@4144e8c22fff:~/hello$ touch empty

# 通过git自带命令计算空文件的散列值
mei@4144e8c22fff:~/hello$ git hash-object empty
e69de29bb2d1d6434b8b29ae775ad8c2e48c5391

# 通过自定义命令计算空文件的散列值
mei@4144e8c22fff:~/hello$ git-hash-object-test empty
e69de29bb2d1d6434b8b29ae775ad8c2e48c5391

# 将空文件empty删除掉
mei@4144e8c22fff:~/hello$ rm empty
```



#### 4.3.2  对象、散列和blob

当为hello.txt创建一个对象的时候，Git并不关心hello.txt的文件名。Git只关心文件里面的内容。

计算blob的SHA1散列值，把散列值的十六进制表示作为文件名放进对象库中。

- 两个不同blob产生相同SHA1散列值的机会十分渺茫。当这种情况发生的时候，称为一次碰撞。
- SHA1是安全散列加密算法。
- 对于160位数，你有2^160或者大约10^48种可能的SHA1散列值。这个数是极其巨大的，即使你雇用一万亿人来每秒产生一万亿个新的唯一blob对象，持续一万亿年，你也只有10^43个blob对象。
- 160位的SHA1散列值对应20个字节，这需要40个字节的十六进制来表示。
- Git在前两个数字后面插入一个`/`以提高文件系统效率（如果你把太多的文件放在同一个目录中，一些文件系统会变慢。使SHA1的第一个字节成为一个目录是一个很简单的办法，可以为所有均匀分布的可能对象创建一个固定的、256路分区的命令空间）。
- Git没有对文件的内容做很多事情，可以在任何时候使用散列值把它从对象库里提取出来。

查看对象库对应的文件内容：

```sh
mei@4144e8c22fff:~/hello$ git cat-file -p 3b18e512dba79e4c8300dd08aeb37f8e728b8dad
hello world
mei@4144e8c22fff:~/hello$

# 查看该对象的类型，返回的是blob，说明是一个blob块对象
mei@4144e8c22fff:~/hello$ git cat-file -t 3b18e5
blob
```

- `git cat-file`查看存储库对象的内容。

查看`git cat-file`的帮助信息:

```sh
mei@4144e8c22fff:~/hello$ git cat-file --help|head -n 5
GIT-CAT-FILE(1)                                                           Git Manual                                                          GIT-CAT-FILE(1)

NAME
       git-cat-file - Provide content or type and size information for repository objects
mei@4144e8c22fff:~/hello$
mei@4144e8c22fff:~/hello$ git cat-file -h
usage: git cat-file (-t [--allow-unknown-type] | -s [--allow-unknown-type] | -e | -p | <type> | --textconv | --filters) [--path=<path>] <object>
   or: git cat-file (--batch | --batch-check) [--follow-symlinks] [--textconv | --filters]

<type> can be one of: blob, tree, commit, tag
    -t                    show object type
    -s                    show object size
    -e                    exit with zero when there's no error
    -p                    pretty-print object's content
    --textconv            for blob objects, run textconv on object's content
    --filters             for blob objects, run filters on object's content
    --path <blob>         use a specific path for --textconv/--filters
    --allow-unknown-type  allow -s and -t to work with broken/corrupt objects
    --buffer              buffer --batch output
    --batch[=<format>]    show info and content of objects fed from the standard input
    --batch-check[=<format>]
                          show info about objects fed from the standard input
    --follow-symlinks     follow in-tree symlinks (used with --batch or --batch-check)
    --batch-all-objects   show all objects with --batch or --batch-check
    --unordered           do not order --batch-all-objects output

mei@4144e8c22fff:~/hello$
```



Git知道手动输入40个字符是很不切实际的，因此它提供了一个命令通过对象的唯一前缀来查找对象的散列值。

```sh
mei@4144e8c22fff:~/hello$ git rev-parse 3b18
3b18e512dba79e4c8300dd08aeb37f8e728b8dad
mei@4144e8c22fff:~/hello$ git rev-parse 3b18e5
3b18e512dba79e4c8300dd08aeb37f8e728b8dad
```



#### 4.3.3  文件和树

既然`hello world`那个blob块已经安置在对象库里了，那么它的文件名又发生了什么事呢？如果不能通过文件名找到文件Git就太没用了。

- 正如前面提到的，Git通过另一种叫做 **目录树tree** 的对象来跟踪文件的路径名。当使用`git add`命令时，Git会给添加的每个文件的内容创建一个对象，但它并不会马上为树创建一个对象。相反，索引更新了，索引位于`.git/index`中，它跟踪文件的路径名和相应的blob。
- 每次执行命令(比如,`git add`、`git rm`或者`git mv`)的时候，Git会用新的路径名和blob信息来更新索引。
- 任何时间都可以从当前索引创建一个树对象。只要通过底层的`git write-tree`命令来捕获索引当前信息的快照就可以了。

目前，该索引只包含一个文件，`hello.txt`：

```sh
mei@4144e8c22fff:~/hello$ git ls-files --stage
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	hello.txt
```

- `git ls-files`显示索引中的文件信息。

查看命令`git ls-files`的帮助信息:

```
mei@4144e8c22fff:~/hello$ git ls-files --help|head -n 5
GIT-LS-FILES(1)                                                           Git Manual                                                          GIT-LS-FILES(1)

NAME
       git-ls-files - Show information about files in the index and the working tree

mei@4144e8c22fff:~/hello$
mei@4144e8c22fff:~/hello$ git ls-files -h
usage: git ls-files [<options>] [<file>...]

    -z                    paths are separated with NUL character
    -t                    identify the file status with tags
    -v                    use lowercase letters for 'assume unchanged' files
    -f                    use lowercase letters for 'fsmonitor clean' files
    -c, --cached          show cached files in the output (default)
    -d, --deleted         show deleted files in the output
    -m, --modified        show modified files in the output
    -o, --others          show other files in the output
    -i, --ignored         show ignored files in the output
    -s, --stage           show staged contents' object name in the output
    -k, --killed          show files on the filesystem that need to be removed
    --directory           show 'other' directories' names only
    --eol                 show line endings of files
    --empty-directory     don't show empty directories
    -u, --unmerged        show unmerged files in the output
    --resolve-undo        show resolve-undo information
    -x, --exclude <pattern>
                          skip files matching pattern
    -X, --exclude-from <file>
                          exclude patterns are read from <file>
    --exclude-per-directory <file>
                          read additional per-directory exclude patterns in <file>
    --exclude-standard    add the standard git exclusions
    --full-name           make the output relative to the project top directory
    --recurse-submodules  recurse through submodules
    --error-unmatch       if any <file> is not in the index, treat this as an error
    --with-tree <tree-ish>
                          pretend that paths removed since <tree-ish> are still present
    --abbrev[=<n>]        use <n> digits to display SHA-1s
    --debug               show debugging data

mei@4144e8c22fff:~/hello$
```

我们在执行底层命令`git write-tree`前，再次查看`.git/object`目录下有哪些文件：

```sh
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
```

- `git write-tree` 根据当前索引创建一个树对象。

查看`git write-tree`帮助信息：

```sh
# git-write-tree - Create a tree object from the current index
mei@4144e8c22fff:~/hello$ git write-tree -h
usage: git write-tree [--missing-ok] [--prefix=<prefix>/]

    --missing-ok          allow missing objects
    --prefix <prefix>/    write tree object for a subdirectory <prefix>
```

创建树对象：

```sh
mei@4144e8c22fff:~/hello$ git write-tree
68aba62e560c0ebc3396e8ae9335232cd93a3f60
```

查看`.git/object`目录下有哪些文件：

```sh
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
```

可以发现多出了`68`文件夹，以及`aba62e560c0ebc3396e8ae9335232cd93a3f60`文件。

查看该对象的内容：

```sh
# 查看对象的类型，返回tree，说明该对象是一个树对象
mei@4144e8c22fff:~/hello$ git cat-file -t 68aba62
tree

# 查看树对象的内容
mei@4144e8c22fff:~/hello$ git cat-file -p 68aba62
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad	hello.txt

# 索引中的内容
mei@4144e8c22fff:~/hello$ git ls-files --stage
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	hello.txt
```

可以看到树对象68aba62已经捕获了索引中的信息。

第一个数100644是对象的文件属性的八进制表示。

`3b18e512dba79e4c8300dd08aeb37f8e728b8dad`是`hello world`的blob的对象名，`hello.txt`是与该blob关联的名字。

- `git ls-tree`显示树对象内容。

也可以使用`git ls-tree`来显示树对象的内容：

```sh
mei@4144e8c22fff:~/hello$ git ls-tree --help|head -n 5|awk NF
GIT-LS-TREE(1)                                                            Git Manual                                                           GIT-LS-TREE(1)
NAME
       git-ls-tree - List the contents of a tree object
mei@4144e8c22fff:~/hello$ git ls-tree -h
usage: git ls-tree [<options>] <tree-ish> [<path>...]

    -d                    only show trees
    -r                    recurse into subtrees
    -t                    show trees when recursing
    -z                    terminate entries with NUL byte
    -l, --long            include object size
    --name-only           list only filenames
    --name-status         list only filenames
    --full-name           use full path names
    --full-tree           list entire tree; not just current directory (implies --full-name)
    --abbrev[=<n>]        use <n> digits to display SHA-1s

mei@4144e8c22fff:~/hello$
```

我们查看一下树对象`68aba62e560c0ebc3396e8ae9335232cd93a3f60`的内容：

```sh
mei@4144e8c22fff:~/hello$ git ls-tree 68aba62e560c0ebc3396e8ae9335232cd93a3f60
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad	hello.txt
mei@4144e8c22fff:~/hello$
```

#### 4.3.3 扩展 Git是如何生成树对象的散列值的？



参考：[Git工程开发实践（二）——Git内部实现机制](https://blog.51cto.com/u_9291927/2173002)

树对象的SHA1散列值计算方法如下：

```
tree <content length><NUL><file mode> <filename><NUL><item sha>
```

说明：content length是生成的内容长度，NUL是`\0`字符，file mode是文件模式，如`100644`，filename是文件名，item sha是blob对象散列值的二进制形式。

我们来看一下树对象`68aba62e560c0ebc3396e8ae9335232cd93a3f60`这个散列值是如何计算出来的。

当前索引中的内容：

```sh
mei@4144e8c22fff:~/hello$ git ls-files --stage
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	hello.txt
mei@4144e8c22fff:~/hello$
```

对该行进行处理，生成树对象的散列值。

首先使用`xxd`把blob块对象`3b18e512dba79e4c8300dd08aeb37f8e728b8dad`转换成二进制的形式，并将结果保存为sha1.txt以方便后面做追加操作。

```sh
mei@4144e8c22fff:~/hello$ echo -en '3b18e512dba79e4c8300dd08aeb37f8e728b8dad'|xxd -r -p > sha1.txt
```

构建content部分，并保存至文件content.txt：

```sh
mei@4144e8c22fff:~/hello$ echo -en "100644 hello.txt\0" | cat - sha1.txt > content.txt
```

计算content的长度：

```sh
mei@4144e8c22fff:~/hello$ cat content.txt |wc -c
37
```

长度为37。

生成SHA1散列值：

```sh
mei@4144e8c22fff:~/hello$ echo -en "tree 37\0" | cat - content.txt |shasum
68aba62e560c0ebc3396e8ae9335232cd93a3f60  -
mei@4144e8c22fff:~/hello$ echo -en "tree 37\0" | cat - content.txt |openssl dgst --sha1
(stdin)= 68aba62e560c0ebc3396e8ae9335232cd93a3f60
```

得到树对象的散列值为`68aba62e560c0ebc3396e8ae9335232cd93a3f60`。

而我们知道，通过`git write-tree`得到的树对象散列值如下：

```sh
mei@4144e8c22fff:~/hello$ git write-tree
68aba62e560c0ebc3396e8ae9335232cd93a3f60
```

可以看到，我们通过命令行手动计算的散列值与`git write-tree`生成的树对象散列值是一样的！！！说明我们的计算方法是对的。

以上只是验证了按这种方式计算的树对象的散列值刚好相同，后续还需要确认树对象的散列值的计算方法。



#### 4.3.4 对Git使用SHA1的一点说明



- 当我们多次对相同的索引计算其树对象的散列值时，其散列值是相同的。

多次执行`git write-tree`:

```sh
mei@4144e8c22fff:~/hello$ git write-tree
68aba62e560c0ebc3396e8ae9335232cd93a3f60
mei@4144e8c22fff:~/hello$ git write-tree
68aba62e560c0ebc3396e8ae9335232cd93a3f60
mei@4144e8c22fff:~/hello$ git write-tree
68aba62e560c0ebc3396e8ae9335232cd93a3f60
```

可以看到，返回的树对象的散列值保持不变。Git并不需要重新创建一个新的树对象。

```sh
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
```

`.git/objects`中并没有新增对象。

- 散列函数在数学意义上是一个真正的函数：对于一个给定的输入，它的输出总是相同的。这样的散列函数也称为摘要。
- 相同的散列值并不算碰撞，只有两个不同的对象产生一个相同的散列值时才算碰撞。



#### 4.3.5 树层次结构

- 只对单个文件的信息是很好管理的。但项目包含复杂而且深层嵌套的目录结构，并且会随着时间的推移而重构和移动。

下面我们创建一个子目录，并包含hello.txt的一个完全相同的副本，让我们看看Git是如何处理的：

```sh
mei@4144e8c22fff:~/hello$ mkdir subdir && cp hello.txt subdir/
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
mei@4144e8c22fff:~/hello$ git add subdir/hello.txt
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
mei@4144e8c22fff:~/hello$
```

我们创建了子目录subdir，并将hello.txt复制了一份到subdir/目录中，在我们执行`git add`前后，`.git/object`中的对象并没有新增。

此时查看索引中的内容：

```sh
mei@4144e8c22fff:~/hello$ git ls-files -s
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	hello.txt
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	subdir/hello.txt
```

可以看到，索引中增加了一行，包含了`subdir/hello.txt`相关的信息。此时我们创建一个对对象：

```sh
mei@4144e8c22fff:~/hello$ git write-tree
492413269336d21fac079d4a4672e55d5d2147ac
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/49
.git/objects/49/2413269336d21fac079d4a4672e55d5d2147ac
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
mei@4144e8c22fff:~/hello$
```

可以看到，创建了树对象`492413269336d21fac079d4a4672e55d5d2147ac`。

查看一下树对象的内容：

```sh
mei@4144e8c22fff:~/hello$ git ls-tree 492413269336d21fac079d4a4672e55d5d2147ac
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad	hello.txt
040000 tree 68aba62e560c0ebc3396e8ae9335232cd93a3f60	subdir
mei@4144e8c22fff:~/hello$ git cat-file -p 492413269336d21fac079d4a4672e55d5d2147ac
100644 blob 3b18e512dba79e4c8300dd08aeb37f8e728b8dad	hello.txt
040000 tree 68aba62e560c0ebc3396e8ae9335232cd93a3f60	subdir
```

通过两种方式查看到树对象的内容是一样的。

新的顶级树包含两个条目：原始的hello.txt以及新的子目录，子目录是树而不是blob。subdir的对象名，是之前的树对象。



#### 4.3.6 提交

上一节我们已经将hello.txt添加到暂存区了，也通过`git write-tree`生成了树对象，下面也可以使用底层命令创建提交对象。

- `git commit-tree`创建提交对象。

```sh
mei@4144e8c22fff:~/hello$ git commit-tree --help|head -n 5
GIT-COMMIT-TREE(1)                                                        Git Manual                                                       GIT-COMMIT-TREE(1)

NAME
       git-commit-tree - Create a new commit object

mei@4144e8c22fff:~/hello$ git commit-tree --help|head -n 5|awk NF
GIT-COMMIT-TREE(1)                                                        Git Manual                                                       GIT-COMMIT-TREE(1)
NAME
       git-commit-tree - Create a new commit object
mei@4144e8c22fff:~/hello$ git commit-tree -h
usage: git commit-tree [(-p <parent>)...] [-S[<keyid>]] [(-m <message>)...] [(-F <file>)...] <tree>

    -p <parent>           id of a parent commit object
    -m <message>          commit message
    -F <file>             read commit log message from file
    -S, --gpg-sign[=<key-id>]
                          GPG sign commit
```

通过查看帮助文档可知，`This is usually not what an end user wants to run directly. See git-commit(1) instead.`不推荐直接使用该命令来创建一个提交对象，而应使用`git commit`命令来代替。

我们先使用这种方式来创建提交对象，后面再测试一次使用`git commit`来创建提交对象。

```sh
mei@4144e8c22fff:~/hello$ git commit-tree -m "Commit a file that says hello" 492413269336d21fac079d4a4672e55d5d2147ac
174a235d644ebbcad3b9c8f4c817e0f048c15fe3
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/49
.git/objects/49/2413269336d21fac079d4a4672e55d5d2147ac
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/17
.git/objects/17/4a235d644ebbcad3b9c8f4c817e0f048c15fe3
.git/objects/info
```

可以看到，此时多出了一个对象`174a235d644ebbcad3b9c8f4c817e0f048c15fe3`，与教程中的对象值不一样。

查看提交对象的内容：

```sh
mei@4144e8c22fff:~/hello$ git cat-file -p 174a235d644ebbcad3b9c8f4c817e0f048c15fe3
tree 492413269336d21fac079d4a4672e55d5d2147ac
author Zhaohui Mei <mzh@hellogitlab.com> 1626963401 +0800
committer Zhaohui Mei <mzh@hellogitlab.com> 1626963401 +0800

Commit a file that says hello
mei@4144e8c22fff:~/hello$
```

查看对象的类型：

```sh
mei@4144e8c22fff:~/hello$ git cat-file -t 174a235d644ebbcad3b9c8f4c817e0f048c15fe3
commit
```

可以看到`174a235d644ebbcad3b9c8f4c817e0f048c15fe3`是一个提交对象。

如果你在计算机上按步骤操作，你会发现你生成的提交对象不一样。

原因如下：

- 这是不同的提交。提交包含你的名字和创建提交的时间，尽管这区别很微小，但依然是不同的。但你的提交却有相同的树。



树对象和提交对象是分开的。不同的提交经常指向同一棵树。

在实际生活中，你应跳过底层的`git write-tree`和`git commit-tree`命令的步骤。而是只使用`git commit`命令。成为一个快乐的Git用户，你不需要记住那些底层命令。

- `git show --pretty=fuller COMMIT_ID`查看提交的详细细节。

我们查看一下刚才的提交的详情：

```sh
mei@4144e8c22fff:~/hello$ git show --pretty=fuller 174a235d644ebbcad3b9c8f4c817e0f048c15fe3
commit 174a235d644ebbcad3b9c8f4c817e0f048c15fe3
Author:     Zhaohui Mei <mzh@hellogitlab.com>
AuthorDate: Thu Jul 22 22:16:41 2021 +0800
Commit:     Zhaohui Mei <mzh@hellogitlab.com>
CommitDate: Thu Jul 22 22:16:41 2021 +0800

    Commit a file that says hello

diff --git a/hello.txt b/hello.txt
new file mode 100644
index 0000000..3b18e51
--- /dev/null
+++ b/hello.txt
@@ -0,0 +1 @@
+hello world
diff --git a/subdir/hello.txt b/subdir/hello.txt
new file mode 100644
index 0000000..3b18e51
--- /dev/null
+++ b/subdir/hello.txt
@@ -0,0 +1 @@
+hello world
mei@4144e8c22fff:~/hello$
```

- 一般情况下，作者和提交者是同一个人，也有一些情况下，他们是不同的。



#### 4.3.6 扩展 提交

现在，我们忘了那些底层的命令吧。

我们直接在一行命令中重试之前的一系列操作，并使用`git commit`进行提交：

```sh
mei@4144e8c22fff:~$ mkdir hello && cd hello && git init && echo 'hello world' > hello.txt && git add hello.txt && mkdir subdir && cp hello.txt subdir/ && git add subdir/hello.txt && git commit -m"Commit a file that says hello"
Initialized empty Git repository in /home/mei/hello/.git/
[master (root-commit) 80d703a] Commit a file that says hello
 2 files changed, 2 insertions(+)
 create mode 100644 hello.txt
 create mode 100644 subdir/hello.txt
mei@4144e8c22fff:~/hello$ git log
commit 80d703ac7da69ce3e5c0c87c8173fb23c50b5105 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Thu Jul 22 23:04:51 2021 +0800

    Commit a file that says hello
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/49
.git/objects/49/2413269336d21fac079d4a4672e55d5d2147ac
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/info
.git/objects/80
.git/objects/80/d703ac7da69ce3e5c0c87c8173fb23c50b5105
mei@4144e8c22fff:~/hello$
```

可以看到，除了最后的提交对象不同外，其他对象与之前测试的结果是一样。

此时，可以通过`git log`查看到提交日志信息：

```sh
mei@4144e8c22fff:~/hello$ git log
commit 80d703ac7da69ce3e5c0c87c8173fb23c50b5105 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Thu Jul 22 23:04:51 2021 +0800

    Commit a file that says hello
```

相应的，也可以看到分支情况：

```sh
mei@4144e8c22fff:~/hello$ git branch
* master
```

查看提交详情：

```sh
mei@4144e8c22fff:~/hello$ git show --pretty=fuller 80d703ac7da69ce3e5c0c87c8173fb23c50b5105
commit 80d703ac7da69ce3e5c0c87c8173fb23c50b5105 (HEAD -> master)
Author:     Zhaohui Mei <mzh@hellogitlab.com>
AuthorDate: Thu Jul 22 23:04:51 2021 +0800
Commit:     Zhaohui Mei <mzh@hellogitlab.com>
CommitDate: Thu Jul 22 23:04:51 2021 +0800

    Commit a file that says hello

diff --git a/hello.txt b/hello.txt
new file mode 100644
index 0000000..3b18e51
--- /dev/null
+++ b/hello.txt
@@ -0,0 +1 @@
+hello world
diff --git a/subdir/hello.txt b/subdir/hello.txt
new file mode 100644
index 0000000..3b18e51
--- /dev/null
+++ b/subdir/hello.txt
@@ -0,0 +1 @@
+hello world
```

可以看到，除了提交时间不一样外，其他的内容与使用底层命令`git write-tree`和`git commit-tree`得到的结果是一样的。



我们再来复盘一次使用底层命令进行操作推演：

```sh
mei@4144e8c22fff:~$ mkdir hello
mei@4144e8c22fff:~$ cd hello
mei@4144e8c22fff:~/hello$ git init
Initialized empty Git repository in /home/mei/hello/.git/
mei@4144e8c22fff:~/hello$ echo 'hello world' > hello.txt
mei@4144e8c22fff:~/hello$ mkdir subdir
mei@4144e8c22fff:~/hello$ cp hello.txt subdir/
mei@4144e8c22fff:~/hello$ git add .
mei@4144e8c22fff:~/hello$ gs
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   hello.txt
	new file:   subdir/hello.txt

mei@4144e8c22fff:~/hello$ git branch
mei@4144e8c22fff:~/hello$ git ls-files -s
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	hello.txt
100644 3b18e512dba79e4c8300dd08aeb37f8e728b8dad 0	subdir/hello.txt
mei@4144e8c22fff:~/hello$ git write-tree
492413269336d21fac079d4a4672e55d5d2147ac

# ==========> 注意此处，写树对象后，查看分支情况和日志情况都是异常的！！！
mei@4144e8c22fff:~/hello$ git branch
mei@4144e8c22fff:~/hello$ git log
fatal: your current branch 'master' does not have any commits yet
mei@4144e8c22fff:~/hello$ git commit-tree -m"Commit a file that says hello" 492413269336d21fac079d4a4672e55d5d2147ac
b938f3081d70bd52a2032ef3f870b3a0afc5e376
mei@4144e8c22fff:~/hello$ git cat-file -p b938f3081d70bd52a2032ef3f870b3a0afc5e376
tree 492413269336d21fac079d4a4672e55d5d2147ac
author Zhaohui Mei <mzh@hellogitlab.com> 1626967226 +0800
committer Zhaohui Mei <mzh@hellogitlab.com> 1626967226 +0800

Commit a file that says hello

# ==========> 注意此处，写提交对象后，查看分支情况和日志情况都是异常的！！！
mei@4144e8c22fff:~/hello$ git log
fatal: your current branch 'master' does not have any commits yet
mei@4144e8c22fff:~/hello$ git branch
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/49
.git/objects/49/2413269336d21fac079d4a4672e55d5d2147ac
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/b9
.git/objects/b9/38f3081d70bd52a2032ef3f870b3a0afc5e376
.git/objects/info
mei@4144e8c22fff:~/hello$

# 查看.git/refs下的文件
mei@4144e8c22fff:~/hello$ find .git/refs/
.git/refs/
.git/refs/heads
.git/refs/tags
```

即，直接使用底次`git commit-tree`命令可以创建一个提交对象，但并没有提交数据！！！！没有提交记录！

```sh
mei@4144e8c22fff:~/hello$ git log b938f3081d70bd52a2032ef3f870b3a0afc5e376
commit b938f3081d70bd52a2032ef3f870b3a0afc5e376
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Thu Jul 22 23:20:26 2021 +0800

    Commit a file that says hello
```

可以看到，使用`git commit`提交与`git commit-tree`底层命令进行提交还是存在一些差异的！



我们可以在 [git log and show on a bare repo](https://stackoverflow.com/questions/6214711/git-log-and-show-on-a-bare-repo)找到答案。

其中，[Richard Hansen](https://stackoverflow.com/users/712605/richard-hansen)的答案告诉我们：

 > Fix
 >
 >To get rid of the error message, you can do one of the following:
 >
 >- Change `HEAD` to point to a branch that does exist:
 >
 >    ```sh
 >    git symbolic-ref HEAD refs/heads/some_other_branch
 >    ```
 >
 >- Push a new `master` branch into the repository from somewhere else
 >
 >- Create a new `master` branch locally:
 >
 >    ```sh
 >    git branch master some_existing_commit
 >    ```

为了消除这种错误消息，可以使用以上三种方法中的一种，我们使用第三种方式来解决。



我们需要再执行一步命令`git branch master b938f3081d70bd52a2032ef3f870b3a0afc5e376`来创建一个分支：

```sh
# 创建分支
mei@4144e8c22fff:~/hello$ git branch master b938f3081d70bd52a2032ef3f870b3a0afc5e376
mei@4144e8c22fff:~/hello$ git branch
* master
mei@4144e8c22fff:~/hello$ git log
commit b938f3081d70bd52a2032ef3f870b3a0afc5e376 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Thu Jul 22 23:20:26 2021 +0800

    Commit a file that says hello
    
# 查看.git/refs下的文件
mei@4144e8c22fff:~/hello$ find .git/refs/
.git/refs/
.git/refs/heads
.git/refs/heads/master
.git/refs/tags
```

总结：

`git commit`与`git commit-tree`的区别：

- `git commit-tree`命令基于一个tree树对象的hash id创建了一个commit提交对象。
- `git commit`则是将暂存区的内容放到仓库。暂存区的通常通常是一个commit对象。`git commit`还额外做了其他的事情。


分支与提交的关系：

- Git的分支必须指向一个commit,没有任何commit就没有任何分支。提交第一个commit后Git自动创建master分支。



正如我们上面操作的，在使用`git commit-tree`创建提交对象commit_id后，还需要使用`git branch master commit_id`来将提交对象与分支`master`绑定在一起。这样绑定后，就有了分支，也能查看`git log`日志信息了！！！

也就是说，`git commit`命令在创建了提交对象后，又将提交对象与分支进行绑定了！绑定分支后，我们就可以直接查看到`git log`的日志信息。

按Git的建议，我们只用使用`git commit`去提交修改就行，没有必要去使用底层的`git commit-tree`命令！





#### 4.3.7 标签

- Git还管理的一个对象是`标签`，尽管Git只实现了一种标签对象，但是有两种基本的标签类型。
- 两种标签类型：轻量级的(lightweight)和带附注的(annotated)。
- 轻量级标签只是一个提交对象的引用，通常被版本库视为私有的。这些标签并不会在版本库里创建永久的对象。
- 带附注的标签则会创建一个对象。
- Git在命名一个提交的时候对轻量级的标签和带标注的标签同等对待。
- `git tag`命令来创建标签！

先看看这个命令的帮助信息。

```sh
mei@4144e8c22fff:~$ git tag --help|head -n 4|awk NF
GIT-TAG(1)                                                                Git Manual                                                               GIT-TAG(1)
NAME
       git-tag - Create, list, delete or verify a tag object signed with GPG
mei@4144e8c22fff:~$ git tag -h
usage: git tag [-a | -s | -u <key-id>] [-f] [-m <msg> | -F <file>]
		<tagname> [<head>]
   or: git tag -d <tagname>...
   or: git tag -l [-n[<num>]] [--contains <commit>] [--no-contains <commit>] [--points-at <object>]
		[--format=<format>] [--[no-]merged [<commit>]] [<pattern>...]
   or: git tag -v [--format=<format>] <tagname>...

    -l, --list            list tag names
    -n[<n>]               print <n> lines of each tag message
    -d, --delete          delete tags
    -v, --verify          verify tags

Tag creation options
    -a, --annotate        annotated tag, needs a message
    -m, --message <message>
                          tag message
    -F, --file <file>     read message from file
    -e, --edit            force edit of tag message
    -s, --sign            annotated and GPG-signed tag
    --cleanup <mode>      how to strip spaces and #comments from message
    -u, --local-user <key-id>
                          use another key to sign the tag
    -f, --force           replace the tag if exists
    --create-reflog       create a reflog

Tag listing options
    --column[=<style>]    show tag list in columns
    --contains <commit>   print only tags that contain the commit
    --no-contains <commit>
                          print only tags that don't contain the commit
    --merged <commit>     print only tags that are merged
    --no-merged <commit>  print only tags that are not merged
    --sort <key>          field name to sort on
    --points-at <object>  print only tags of the object
    --format <format>     format to use for the output
    --color[=<when>]      respect format colors
    -i, --ignore-case     sorting and filtering are case insensitive

mei@4144e8c22fff:~$
```

可以看到，使用`git tag`命令可以创建、删除、检验或者列出当前的标签。

我们来创建一个`V1.0`的标签：

```sh
# 列出当前标签
mei@4144e8c22fff:~/hello$ git tag --list
# 不带任何参数时，也是列出当前标签
mei@4144e8c22fff:~/hello$ git tag
# 创建标签
mei@4144e8c22fff:~/hello$ git tag -m"Tag version 1.0" V1.0
# 再次列出当前的标签
mei@4144e8c22fff:~/hello$ git tag --list
V1.0
mei@4144e8c22fff:~/hello$ git tag
V1.0
```

此时，我们查看一下Git的对象文件：

```sh
mei@4144e8c22fff:~/hello$ find .git/objects/
.git/objects/
.git/objects/68
.git/objects/68/aba62e560c0ebc3396e8ae9335232cd93a3f60
.git/objects/49
.git/objects/49/2413269336d21fac079d4a4672e55d5d2147ac
.git/objects/38
.git/objects/38/ab1e8230e171894dd47a24fb27bf2873322159
.git/objects/pack
.git/objects/3b
.git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
.git/objects/b9
.git/objects/b9/38f3081d70bd52a2032ef3f870b3a0afc5e376
.git/objects/info
mei@4144e8c22fff:~/hello$
```

可以发现新增了对象数据。

我们查看一下`V1.0`标签对象的SHA1值：

```sh
mei@4144e8c22fff:~/hello$ git rev-parse V1.0
38ab1e8230e171894dd47a24fb27bf2873322159
```

这样获取到了标签对象的SHA1值为`38ab1e8230e171894dd47a24fb27bf2873322159`。

我们查看一下该对象的内容和类型：

```sh
mei@4144e8c22fff:~/hello$ git cat-file -p 38ab1e8230e171894dd47a24fb27bf2873322159
object b938f3081d70bd52a2032ef3f870b3a0afc5e376
type commit
tag V1.0
tagger Zhaohui Mei <mzh@hellogitlab.com> 1627141359 +0800

Tag version 1.0
mei@4144e8c22fff:~/hello$ git cat-file -t 38ab1e8230e171894dd47a24fb27bf2873322159
tag
```

标签指向对象`b938f3081d70bd52a2032ef3f870b3a0afc5e376`，是一个commit提交对象。正是我们在上一节的最后的提交对象。

我们查看一下当前日志信息：

```sh
mei@4144e8c22fff:~/hello$ git log
commit b938f3081d70bd52a2032ef3f870b3a0afc5e376 (HEAD -> master, tag: V1.0)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Thu Jul 22 23:20:26 2021 +0800

    Commit a file that says hello
```

可以看到对于提交对象`b938f3081d70bd52a2032ef3f870b3a0afc5e376`,其有一个标签，标签名为`V1.0`。

- 通常情况下，Git通过某些分支来给特定的提交命名标签。



查看标签的详情：

```sh
mei@4144e8c22fff:~/hello$ git show V1.0
tag V1.0
Tagger: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Sat Jul 24 23:42:39 2021 +0800

Tag version 1.0

commit b938f3081d70bd52a2032ef3f870b3a0afc5e376 (HEAD -> master, tag: V1.0)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Thu Jul 22 23:20:26 2021 +0800

    Commit a file that says hello

diff --git a/hello.txt b/hello.txt
new file mode 100644
index 0000000..3b18e51
--- /dev/null
+++ b/hello.txt
@@ -0,0 +1 @@
+hello world
diff --git a/subdir/hello.txt b/subdir/hello.txt
new file mode 100644
index 0000000..3b18e51
--- /dev/null
+++ b/subdir/hello.txt
@@ -0,0 +1 @@
+hello world
mei@4144e8c22fff:~/hello$
```









## 第5章 文件管理和索引

- Git在工作目录和版本库之间加设了一层索引index，用来暂存stage、收集或者修改。
- 当你使用Git来管理代码时，你会在工作目录下编辑，在索引中积累修改，然后把索引中累积的修改作为一次性的变更来进行提交。
- 可以把Git的索引看作是一组打算的或预期的修改。
- 一次提交其实是分两步的过程：暂存变更和提交变更。在工作目录下而不在索引中的变更是没暂存的，没暂存的变更是不会被提交的。

### 5.1 关于索引的一切

- Git的索引不包含任何文件内容，它仅仅追踪提交的内容。
- 当执行`git commit`命令的时候，Git会通过检查索引而不是工作目录来找到提交的内容。
- 在任何时候，可以通过`git status`命令查询索引的状态。
- `git diff`命令可以显示两组不同的差异。`git diff`会显示仍留在工作目录中未暂存的变更；`git diff --cached`显示已经暂存并且因此要有助于下次提交的变更。
- 可以用`git diff`的这两种形式引导你完成暂存变更的过程。刚开始，`git diff`显示所有修改的大集合，`git diff --cached`则是空的。而当暂存时，前者的集合将会收缩，后者会增大。如果所有修改都暂存了并准备提交，`git diff --cached`将是满的，而`git diff`则什么也不显示。





### 5.2 Git中的文件分类

Git将所有文件分为3类：已追踪的、被忽略的以及未追踪的。

- 已追踪的(Tracked):已追踪的文件是指已经在版本库中的文件，或者是已经暂存到索引中的文件。
- 被忽略的(Ignored): 被忽略的文件必须在版本库中被明确声明为不可见的或被忽略，即使它可能会在你的工作目录中出现。一个软件项目通常都会有很多被忽略的文件。Git维护一个默认忽略文件列表，也可以配置版本库来识别其他文件。
- 未追踪的(Untracked):未追踪的文件是指那些不在前两类中的文件。
- 编辑器和构建环境常常会在源码文件周围遗留一些临时文件。在版本库中这些文件通常是不应被当作源文件追踪的。而为了让Git忽略目录中的文件，只需要将该文件名添加到一个特殊的文件`.gitignore`中就可以。
- `.gitignore`文件对Git的特殊的意义，但是它和版本库中任何其他普通文件都是同样管理的。
- 除非把`.gitignore`添加到索引中，否则Git仍会把它当成未追踪的文件。



### 5.3 使用`git add`暂存文件

- `git add`命令将暂存一个文件。
- 如果一个文件是未追踪的，那么`git add`就会将文件的状态转化成已追踪的。
- 如果`git add`作用于一个目录，那么该目录下的文件和子目录都会递归暂存起来。



查看`git add`的帮助信息：

```sh
mei@4144e8c22fff:~$ git add --help|head -n 5|awk NF
GIT-ADD(1)                                                                Git Manual                                                               GIT-ADD(1)
NAME
       git-add - Add file contents to the index
mei@4144e8c22fff:~/my_stuff$ git add -h
usage: git add [<options>] [--] <pathspec>...

    -n, --dry-run         dry run
    -v, --verbose         be verbose

    -i, --interactive     interactive picking
    -p, --patch           select hunks interactively
    -e, --edit            edit current diff and apply
    -f, --force           allow adding otherwise ignored files
    -u, --update          update tracked files
    --renormalize         renormalize EOL of tracked files (implies -u)
    -N, --intent-to-add   record only the fact that the path will be added later
    -A, --all             add changes from all tracked and untracked files
    --ignore-removal      ignore paths removed in the working tree (same as --no-all)
    --refresh             don't add, only refresh the index
    --ignore-errors       just skip files which cannot be added because of errors
    --ignore-missing      check if - even missing - files are ignored in dry run
    --chmod (+|-)x        override the executable bit of the listed files
    --pathspec-from-file <file>
                          read pathspec from file
    --pathspec-file-nul   with --pathspec-from-file, pathspec elements are separated with NUL character
```

- 在Git的对象模型中，在发出`git add`命令时，每个文件的全部内容都将被复制到对象库中，并且按文件的SHA1名来索引。
- 暂存一个文件也称作缓存(caching)一个文件。或者叫把文件放进索引。
- 可以使用`git ls-files`命令查看隐藏在对象模型下的东西，并且可以找到那些暂存文件的SHA1值。

```sh
# 显示索引中文件信息
mei@4144e8c22fff:~/my_stuff$ git ls-files --stage
100644 0487f44090ad950f61955271cf0a2d6c6a83ad9a 0	.gitignore
100644 534469f67ae5ce72a7a274faf30dee3c2ea1746d 0	data

# 查看对象文件夹文件列表
mei@4144e8c22fff:~/my_stuff$ find .git/objects/
.git/objects/
.git/objects/04
.git/objects/04/87f44090ad950f61955271cf0a2d6c6a83ad9a
.git/objects/pack
.git/objects/53
.git/objects/53/4469f67ae5ce72a7a274faf30dee3c2ea1746d
.git/objects/info
```



- 使用`git hash-object file`命令可以直接计算文件的SHA1值，注意，目录不能hash。

对文件进行修改：

```sh
# 编辑文件后，查看文件内容
mei@4144e8c22fff:~/my_stuff$ cat data
New data
And some more data now
mei@4144e8c22fff:~/my_stuff$

# 查看文件的新的SHA1值
mei@4144e8c22fff:~/my_stuff$ git hash-object data
e476983f39f6e4f453f0fe4a859410f63b58b500

# 可以发现文件生成了新的散列值，但在.git/objects目录下并没有增新的对象
mei@4144e8c22fff:~/my_stuff$ find .git/objects/
.git/objects/
.git/objects/04
.git/objects/04/87f44090ad950f61955271cf0a2d6c6a83ad9a
.git/objects/pack
.git/objects/53
.git/objects/53/4469f67ae5ce72a7a274faf30dee3c2ea1746d
.git/objects/info
```

将文件再加入到暂存区，然后再查看一下索引：

```sh
mei@4144e8c22fff:~/my_stuff$ git add data
mei@4144e8c22fff:~/my_stuff$ find .git/objects/
.git/objects/
.git/objects/e4
.git/objects/e4/76983f39f6e4f453f0fe4a859410f63b58b500
.git/objects/04
.git/objects/04/87f44090ad950f61955271cf0a2d6c6a83ad9a
.git/objects/pack
.git/objects/53
.git/objects/53/4469f67ae5ce72a7a274faf30dee3c2ea1746d
.git/objects/info
mei@4144e8c22fff:~/my_stuff$ git ls-files
.gitignore
data
mei@4144e8c22fff:~/my_stuff$ git ls-files --stage
100644 0487f44090ad950f61955271cf0a2d6c6a83ad9a 0	.gitignore
100644 e476983f39f6e4f453f0fe4a859410f63b58b500 0	data
```

可以看到文件已经暂存了，索引中的内容已经更新了。





### 5.4  使用`git commit`的一些注意事项

#### 5.4.1 使用`git commit --all`

- `git commit`的`-a`或`--all`选项会导致执行提交之前自动暂存所有未暂存的和未追踪的文件变化，包括中工作副本中删除已追踪的文件，
- 如果执行`git commit --all`命令，Git会递归整个版本库，暂存所有已知的和修改的文件，然后提交它们。此时会打开编辑器，让输入提交消息，并显示哪些文件会被提交。
- 如果一个子目录是一个全新的目录，而且该目录下没有任何文件名或路径是已经追踪的，则此时即使使用`git commit --all`也不会将其提交。要想提交这种目录，必须先使用`git add`先将目录添加进暂存区，再使用`git commit --all`则可以全部提交。



#### 5.4.2 编写提交日志消息

- 如果不通过命令行直接提供日志消息，Git会启用编辑器。并提示你写一个日志消息。
- 编辑器的选取根据配置文件中的设定来确定。



- 当系统安装有`nano`和`vim`时，Git默认会启动`nano`编辑器。

```sh
mei@4144e8c22fff:~$ nano --version|head -n 1
 GNU nano, version 4.8
mei@4144e8c22fff:~$ vim --version|head -n 1
VIM - Vi IMproved 8.1 (2018 May 18, compiled Apr 15 2020 06:40:31)
```

如果我们在Git工作目录直接输入`git commit`则会进入到`nano`界面。而`nano`我们平时很少使用，更多的时候使用的是`vim`。

我们修改一下编辑器。

我们可以设置以下环境变量：

```sh
mei@4144e8c22fff:~/commit-all-example$ export GIT_EDITOR=vim
mei@4144e8c22fff:~/commit-all-example$
```

此时，我们输入`git commit`则会打开vim编辑器。

- Git不会处理空提交，即没有任何提交消息的提交！

当我们直接退出编辑器时，会提示没有输入任何提交消息：

```sh
mei@4144e8c22fff:~/commit-all-example$ git commit
Aborting commit due to empty commit message.
```

由于未输入任何消息，则放弃提交。



另外，我们也可以通过在Git中设置编辑器。刚才我们已经使用`export GIT_EDITOR=vim`设置了默认的编辑器。

我们使用`git config --global core.editor`来设置编辑器试一下。

尝试全局设置编辑器：

```sh
mei@4144e8c22fff:~/commit-all-example$ git config --global core.editor 'nano'
mei@4144e8c22fff:~/commit-all-example$ git config --global core.editor
nano
mei@4144e8c22fff:~/commit-all-example$ git commit
Aborting commit due to empty commit message.
```

此时，虽然全局使用`nano`编辑器，但使用`git commit`时仍然打开了`vim`编辑器。说明使用Git的全局设置并未生效，而是使用了`export GIT_EDITOR=vim`的设置。



我们再尝试设置存储库级别的编辑器：

```sh
mei@4144e8c22fff:~/commit-all-example$ git config --local core.editor 'nano'
mei@4144e8c22fff:~/commit-all-example$ git config --local core.editor
nano
mei@4144e8c22fff:~/commit-all-example$ git commit
Aborting commit due to empty commit message.
```

此时，使用的编辑器也是`vim`，说明本地设置未能生效。

在3.3节中，提到以下知识：

- 多个配置选项和环境变量常常是为了同一个目的出现的。如在编写提交日志消息的时候，编辑器的选择按照以下步骤的顺序确定：
    - `GIT_EDITOR`环境变量。
    - `core.editor`配置选项。
    - `VISUAL`环境变量。
    - `EDITOR`环境变量。
    - `vi`命令。

由于我们在前面设置了`GIT_EDITOR`环境变量为`vim`，因此Git会将vim作为编辑器。

```sh
# 删除环境变量GIT_EDITOR
mei@4144e8c22fff:~/commit-all-example$ unset GIT_EDITOR
mei@4144e8c22fff:~/commit-all-example$ git commit
Aborting commit due to empty commit message.
```

当我们将环境变量`GIT_EDITOR`删除后，马上使用`git commit`进行提交时，编辑器就变成了`nano`。说明我们使用配置文件设置是正确的。

假如我将编辑器设置成一个不存在的编辑器名称，会怎么样呢？

```sh
mei@4144e8c22fff:~/commit-all-example$ emacs
bash: emacs: command not found
mei@4144e8c22fff:~/commit-all-example$ git config --local core.editor emacs
mei@4144e8c22fff:~/commit-all-example$ git config --local core.editor
emacs
mei@4144e8c22fff:~/commit-all-example$ git commit
hint: Waiting for your editor to close the file... error: cannot run emacs: No such file or directory
error: unable to start editor 'emacs'
Please supply the message using either -m or -F option.
mei@4144e8c22fff:~/commit-all-example$
```

可以看到，当编辑器程序不存在时，使用`git commit`将不能正常打开编辑器，将会提示异常。



我们将编辑器修改为我们常用的`vim`。

```sh
mei@4144e8c22fff:~/commit-all-example$ git config --global core.editor vim
mei@4144e8c22fff:~/commit-all-example$ git config --global core.editor
vim
mei@4144e8c22fff:~/commit-all-example$ git config --local core.editor vim
mei@4144e8c22fff:~/commit-all-example$ git config --local core.editor
vim
mei@4144e8c22fff:~/commit-all-example$ git commit
Aborting commit due to empty commit message.
```

这样后期Git都会使用vim作为默认的编辑器了！



### 5.5 使用`git rm`

- `git rm`会在版本库和工作目录中同时删除文件。
- 从工作目录和索引中删除一个文件，并不会删除该文件在版本库中的历史记录。文件的任何版本，只要是提交到版本库的历史记录的一部分，就会留在对象库并优点历史记录。
- `git rm`也是一条对索引进行操作的命令，所以它对没有添加到版本库或索引中的文件是不起作用的。
- 要将一个文件由已暂存的转换成未暂存的，可以使用`git rm --cached`命令。
- `git rm --cached`命令会删除索引中的文件并且把它保留在工作目录中。`git rm`会将文件从索引和工作目录中都删除。
- 请谨慎使用`git rm --cached`命令，有可能你忘记将已经追踪的文件转换成了未追踪的状态了。
- `git rm`在删除一个文件之前，会先进行检查以确保工作目录下的该文件的版本与当前分支中的最新版本是匹配的。这个验证可以防止文件的修改意外丢失。

```sh
mei@4144e8c22fff:~/commit-all-example$ git diff notyet
diff --git a/notyet b/notyet
index 3dfdc59..da34ada 100644
--- a/notyet
+++ b/notyet
@@ -1 +1,2 @@
 something else
+new
mei@4144e8c22fff:~/commit-all-example$ git rm notyet
error: the following file has local modifications:
    notyet
(use --cached to keep the file, or -f to force removal)
```

可以看到`notyet`由于增加了一行`new`，在删除时，会提示本地该文件已经被修改了，不能直接删除。

- 可以使用`git rm -f`强制删除文件。

```sh
mei@4144e8c22fff:~/commit-all-example$ git rm -f notyet
rm 'notyet'
```

如果不小心删除了该文件，也可以从版本库中恢复回来：

```sh
# 恢复文件
mei@4144e8c22fff:~/commit-all-example$ git checkout HEAD -- notyet
mei@4144e8c22fff:~/commit-all-example$ ls
notyet  ready  subdir
mei@4144e8c22fff:~/commit-all-example$ cat notyet
something else
```





### 5.6 使用`git mv`

- 如果你需要移动或复命名文件，可以对旧文件使用`git rm`命令，然后使用`git add`命令添加新文件，或者可以直接使用`git mv`命令。

`git mv`命令的帮助信息：

```sh
mei@4144e8c22fff:~/test-mv$ git mv --help|head -n 5|awk NF
GIT-MV(1)                                                                 Git Manual                                                                GIT-MV(1)
NAME
       git-mv - Move or rename a file, a directory, or a symlink
mei@4144e8c22fff:~/test-mv$ git mv -h
usage: git mv [<options>] <source>... <destination>

    -v, --verbose         be verbose
    -n, --dry-run         dry run
    -f, --force           force move/rename even if target exists
    -k                    skip move/rename errors

mei@4144e8c22fff:~/test-mv$
```



下面我们来测试一下`git mv`，创建一个版本库，并在版本库中添加一个`stuff`文件：

```sh
mei@4144e8c22fff:~$ mkdir test-mv
mei@4144e8c22fff:~$ cd test-mv
mei@4144e8c22fff:~/test-mv$ git init
Initialized empty Git repository in /home/mei/test-mv/.git/
mei@4144e8c22fff:~/test-mv$ echo 'something' > stuff
mei@4144e8c22fff:~/test-mv$ gs
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	stuff

nothing added to commit but untracked files present (use "git add" to track)
mei@4144e8c22fff:~/test-mv$ git add .
mei@4144e8c22fff:~/test-mv$ git commit -m"add one file"
[master (root-commit) c19762a] add one file
 1 file changed, 1 insertion(+)
 create mode 100644 stuff
mei@4144e8c22fff:~/test-mv$
```

现在文件stuff已经添加到版本库中了。我们将`stuff`命名为`newstuff`：

```sh
mei@4144e8c22fff:~/test-mv$ git mv stuff newstuff
mei@4144e8c22fff:~/test-mv$ gs
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	renamed:    stuff -> newstuff

mei@4144e8c22fff:~/test-mv$ git commit -m"move stuff to newstuff"
[master 0112e0c] move stuff to newstuff
 1 file changed, 0 insertions(+), 0 deletions(-)
 rename stuff => newstuff (100%)
```

可以看到`git mv`操作会自动将修改添加到暂存区，不需要我们手动执行`git add`命令。



- Git记得全部的历史记录，但是显示要限制于在命令中指定的文件名。`git log --follow`命令会让Git在日志中回溯并找到内容相关联的整个历史记录。

可以看一下以下差别：

```sh
# 不使用--follow选项，只查看到了一条历史记录
mei@4144e8c22fff:~/test-mv$ git log newstuff
commit 0112e0cfa80c240542d2b96cddb93aa27ab8e3b9 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 07:11:41 2021 +0800

    move stuff to newstuff
    
# 使用follow选项，可以看到文件重命名前的原始文件的提交记录，查看到两条历史记录了
mei@4144e8c22fff:~/test-mv$ git log --follow newstuff
commit 0112e0cfa80c240542d2b96cddb93aa27ab8e3b9 (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 07:11:41 2021 +0800

    move stuff to newstuff

commit c19762a29fa408a7c7e1c7ed6b0fa125a756ce17
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 07:07:50 2021 +0800

    add one file
```

我们可以在`git log`的帮助信息中查看到`--follow           Continue listing the history of a file beyond renames (works only for a single file).` 即，`--follow`选项，继续列出重命名之外的文件历史记录（仅适用于单个文件）。也就是说该选项会追溯单文件的整个历史记录。

- VCS的经典问题之一就是文件重命名会导致它们丢失对文件历史记录的追踪。而Git即使经历过重命名，也仍然能保留历史记录信息。

当我们再次进行重命名后，仍然是可以查找到文件的源头历史：

```sh
mei@4144e8c22fff:~/test-mv$ mv newstuff otherstuff
mei@4144e8c22fff:~/test-mv$ gs
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	deleted:    newstuff

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	otherstuff

no changes added to commit (use "git add" and/or "git commit -a")
mei@4144e8c22fff:~/test-mv$ git add .
mei@4144e8c22fff:~/test-mv$ gs
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	renamed:    newstuff -> otherstuff

mei@4144e8c22fff:~/test-mv$ git commit -m"move newstuff to otherstuff"
[master ddb0ebd] move newstuff to otherstuff
 1 file changed, 0 insertions(+), 0 deletions(-)
 rename newstuff => otherstuff (100%)
mei@4144e8c22fff:~/test-mv$ git log otherstuff
commit ddb0ebd315adbfbf9258158e01db826a6f23b19e (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 19:14:27 2021 +0800

    move newstuff to otherstuff
mei@4144e8c22fff:~/test-mv$ git log --follow otherstuff
commit ddb0ebd315adbfbf9258158e01db826a6f23b19e (HEAD -> master)
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 19:14:27 2021 +0800

    move newstuff to otherstuff

commit 0112e0cfa80c240542d2b96cddb93aa27ab8e3b9
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 07:11:41 2021 +0800

    move stuff to newstuff

commit c19762a29fa408a7c7e1c7ed6b0fa125a756ce17
Author: Zhaohui Mei <mzh@hellogitlab.com>
Date:   Mon Jul 26 07:07:50 2021 +0800

    add one file
mei@4144e8c22fff:~/test-mv$
```

经过了两次重命名后，`otherstuff`文件的历史记录仍然可以找到！





### 5.7 追踪重命名注解

- Git不追踪重命名。
- 重命名只会影响树对象。树对象保存内容间的关系，而内容本身保存在blob块中。
- GIt基于散列的简单存储系统简化了许多其他RCS被难倒或选择回避的事情。
- 没有能完美处理文件重命名的系统。



### 5.8 `.gitignore`文件

- `.gitignore`文件用来忽略不需要版本库管理的文件。
- 你可以忽略任何文件，只需要将想要忽略的文件的文件名加到同一目录下的`.gitignore`文件中即可。也可以将文件名添加到版本库顶层目录下的`.gitignore`文件中来忽略它。

`.gitignore`文件的格式如下：

- 空行会被忽略，以井号#开头的行可以用于注释。#跟在其他文本后面，则不表示注释。
- 一个简单的字面置文件名匹配任何目录中的同名文件。
- 目录名由末尾的反斜杠/标记。
- 支持Shell通配符，如星号`*`可扩展为shell通配模式。
- 起始的感叹号!会对该行其余的模式进行取反。
- `.gitignore`在版本库中被视为一个普通文件。
- 可以在各级目录中使用`.gitignore`文件，子目录的`.gitignore`优先级高于父级目录的`.gitignore`。



我们来测试一下`.gitignore`文件。创建一个版本库，并随意添加一些文件。

```sh
mei@4144e8c22fff:~$ mkdir test-ignore
mei@4144e8c22fff:~$ cd test-ignore/
mei@4144e8c22fff:~/test-ignore$ git init
Initialized empty Git repository in /home/mei/test-ignore/.git/
mei@4144e8c22fff:~/test-ignore$ touch test.py
mei@4144e8c22fff:~/test-ignore$ mkdir app1
mei@4144e8c22fff:~/test-ignore$ mkdir app2
mei@4144e8c22fff:~/test-ignore$ cp test.py app1/
mei@4144e8c22fff:~/test-ignore$ cp test.py app2/
mei@4144e8c22fff:~/test-ignore$ touch main.c
mei@4144e8c22fff:~/test-ignore$ touch main.o
mei@4144e8c22fff:~/test-ignore$ touch app1/app1.o
mei@4144e8c22fff:~/test-ignore$ touch app2/app2.o

# 查看版本库上的文件，查看所有文件，但忽略.git文件夹
mei@4144e8c22fff:~/test-ignore$ tree -a -I .git
.
|-- .gitignore
|-- app1
|   |-- app1.o
|   `-- test.py
|-- app2
|   |-- app2.o
|   `-- test.py
|-- main.c
|-- main.o
`-- test.py

2 directories, 8 files
mei@4144e8c22fff:~/test-ignore$ gs
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	app1/
	app2/
	main.c
	main.o
	test.py

nothing added to commit but untracked files present (use "git add" to track)
```

忽略`test.py`文件：

```sh
mei@4144e8c22fff:~/test-ignore$ echo 'test.py' > .gitignore
mei@4144e8c22fff:~/test-ignore$ gs
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	app1/
	app2/
	main.c
	main.o

nothing added to commit but untracked files present (use "git add" to track)
```

可以使用以下命令来查看哪些文件被忽略：

- `git status --ignored` 查看被忽略的文件。
- `git check-ignore`命令查看文件是否被忽略。

```sh
# 使用git status查看被忽略的文件
mei@4144e8c22fff:~/test-ignore$ git status --ignored
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	app1/
	app2/
	main.c
	main.o

Ignored files:
  (use "git add -f <file>..." to include in what will be committed)
	app1/test.py
	app2/test.py
	test.py

nothing added to commit but untracked files present (use "git add" to track)
mei@4144e8c22fff:~/test-ignore$
```

可以看到，当我们仅在`.gitignore`中指定`test.py`时，Git会忽略所有目录中的`test.py`文件。

我们也可以使用`git check-ignore`命令来检查一下。

```sh
mei@4144e8c22fff:~/test-ignore$ git check-ignore --help|head -n 5|awk NF
GIT-CHECK-IGNORE(1)                                                       Git Manual                                                      GIT-CHECK-IGNORE(1)
NAME
       git-check-ignore - Debug gitignore / exclude files
mei@4144e8c22fff:~/test-ignore$ git check-ignore -h
usage: git check-ignore [<options>] <pathname>...
   or: git check-ignore [<options>] --stdin

    -q, --quiet           suppress progress reporting
    -v, --verbose         be verbose

    --stdin               read file names from stdin
    -z                    terminate input and output records by a NUL character
    -n, --non-matching    show non-matching input paths
    --no-index            ignore index when checking
```

我们检查工作目录下的三个`test.py`文件：

```sh
mei@4144e8c22fff:~/test-ignore$ git check-ignore -v test.py && echo $?
.gitignore:1:test.py	test.py
0
mei@4144e8c22fff:~/test-ignore$ git check-ignore -v app1/test.py && echo $?
.gitignore:1:test.py	app1/test.py
0
mei@4144e8c22fff:~/test-ignore$ git check-ignore -v app2/test.py && echo $?
.gitignore:1:test.py	app2/test.py
0
```

可以看到`.gitignore`第一行的`test.py`同时匹配上了3个`test.py`，这三个文件都被忽略了！



假如我们现在要忽略所有`.o`文件，则可以像下面这样操作。

忽略所有`.o`文件：

```sh
mei@4144e8c22fff:~/test-ignore$ echo -e '# ignore object file\n*.o' >> .gitignore
mei@4144e8c22fff:~/test-ignore$ cat .gitignore
test.py
# ignore object file
*.o
mei@4144e8c22fff:~/test-ignore$ gs
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	main.c

nothing added to commit but untracked files present (use "git add" to track)
mei@4144e8c22fff:~/test-ignore$ git status --ignored
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.gitignore
	main.c

Ignored files:
  (use "git add -f <file>..." to include in what will be committed)
	app1/
	app2/
	main.o
	test.py

nothing added to commit but untracked files present (use "git add" to track)
mei@4144e8c22fff:~/test-ignore$
```

现在由于我们加了了忽略`.o`文件，此时`app1`和`app2`文件都被忽略了。我们使用`git check-ignore`检查一下。

```sh
mei@4144e8c22fff:~/test-ignore$ git check-ignore -v app1/app1.o
.gitignore:3:*.o	app1/app1.o
mei@4144e8c22fff:~/test-ignore$ git check-ignore -v app2/app1.o
.gitignore:3:*.o	app2/app1.o
mei@4144e8c22fff:~/test-ignore$ git check-ignore -v main.o
.gitignore:3:*.o	main.o
```

可以看到`.gitignore`的第3行`*.o`使用通配符匹配到了多个`.o`文件。



一般我们仅在版本库顶层目录设置`.gitignore`，你也可以在子目录中设置`.gitignore`文件。





## 第6章 提交

- 在Git中，提交commit是用来记录版本库的变更的。
- 当提交时，Git会记录索引的快照并把快照放进对象库。
- 提交是将变更引入版本库的唯一方法，任何版本库中的变更都必须由一个提交引入。
- 最常见的提交是由开发人员引入的。但Git自身也会引入提交。除了用户在合并之前做的提交外，合并操作自身会导致在版本库中多出一个提交。

### 6.1 原子变更集

- 每一个Git提交都代表一个相对于之前的状态的单个原子变更集。
- 对于一个提交中的所有做过的改动，无论多少目录、文件、行、字节的改变，要么全部应用，要么全部拒绝。
- Git不关心文件为什么变化。即变更的内容并不重要。
- Git不会把版本库置于两次提交之间的过渡状态。



### 6.2 识别提交

- 在团队工作中，识别个人的提交是一个很重要的任务。
- 当创建新分支时，必须要选择某个提交来作为分支点。
- 当比较代码差异时，必须要指定两个提交。
- 当编辑提交历史记录时，必须提供一个提交集。
- 在Git中，可以通过显式或隐式引用来指代每一个提交。
- 唯一的40位十六进制SHA1散列值提交ID是显式引用。始终指向最新提交的HEAD则是隐式引用。





#### 6.2.1 绝对提交名

- 对提交来说，最严谨的名字是它的散列标识符。
- 散列ID是个绝对名，这意味它只能表示唯一的一个提交。
- 每一个提交的散列ID都是全局唯一的。不仅仅是对某个版本库，而且是对任意和所有版本库都是唯一的。
- 由于输入一个40位十六进制的SHA1数字是一项繁琐且容易出错的工作，因此Git允许你使用版本库的对象库中唯一的前缀来缩短这个数字。



下面是Git自己的版本库中的一个例子：

```sh
# 查看Git的最开始的3次提交
mei@4144e8c22fff:~/git$ git log --reverse --oneline|head -n 3
e83c516331 Initial revision of "git", the information manager from hell
8bc9a0c769 Add copyright notices.
e497ea2a9b Make read-tree actually unpack the whole tree.

# 使用SHA1散列前缀来来看日志信息
mei@4144e8c22fff:~/git$ git log --oneline e83c5
e83c516331 Initial revision of "git", the information manager from hell
mei@4144e8c22fff:~/git$ git log --oneline e83
fatal: ambiguous argument 'e83': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
mei@4144e8c22fff:~/git$

# 第一次提交是林纳斯提交的
mei@4144e8c22fff:~/git$ git log e83c5
commit e83c5163316f89bfbde7d9ab23ca2e25604af290
Author: Linus Torvalds <torvalds@linux-foundation.org>
Date:   Thu Apr 7 15:13:13 2005 -0700

    Initial revision of "git", the information manager from hell
mei@4144e8c22fff:~/git$
```



#### 6.2.2 引用和符号引用

- 引用(ref)是一个SHA1散列值，指向Git对象库中的对象。
- 虽然一个引用可以指向任何Git对象，但是它通常指向提交对象。
- 符号引用（symbolic reference）,或称为symref，间接指向Git对象。它们仍然是一个引用。
- 本地特性分支名称、远程跟踪分支名称和标签名都是引用。
- 引用都存储在版本库的`.git/refs/`目录中。目录中基本上有三种不同的命名空间代表不同的引用：`refs/heads/ref`代表本地分支，`refs/remotes/ref`代表远程跟踪分支，`refs/tags/ref`代表标签。

例如，一个叫做`dev`的本地特性分支就是`refs/heads/dev`的缩写。因为远程追踪分支在`refs/remotes`命名空间中，所以`origin/master`实际上是`refs/remotes/origin/master`，标签`v1.0`就是`refs/tags/v1.0`的缩写。

如果你有一个分支和一个标签使用相同的名称，Git会根据`git rev-parse`手册上的列表选取每个匹配项：

```
<refname>, e.g. master, heads/master, refs/heads/master
    A symbolic ref name. E.g.  master typically means the commit object referenced by refs/heads/master. 
    If you happen to have both heads/master and tags/master, you can explicitly say heads/master to tell Git which one you mean. 
    When ambiguous, a <refname> is disambiguated by taking the first match in the following rules:
    If $GIT_DIR/<refname> exists, that is what you mean (this is usually useful only for HEAD, FETCH_HEAD, ORIG_HEAD, MERGE_HEAD and CHERRY_PICK_HEAD);
    otherwise, refs/<refname> if it exists;    
    otherwise, refs/tags/<refname> if it exists;   
    otherwise, refs/heads/<refname> if it exists;
    otherwise, refs/remotes/<refname> if it exists;
    otherwise, refs/remotes/<refname>/HEAD if it exists.
```

- 使用`git init`初始化的版本库默认没有任何的符号引用。


我们创建一个`test-ref`仓库，可以看到`.git/refs`目录下没有生成`ref`文件：

```sh
mei@4144e8c22fff:~$ mkdir test-ref
mei@4144e8c22fff:~$ cd test-ref
mei@4144e8c22fff:~/test-ref$ git init
Initialized empty Git repository in /home/mei/test-ref/.git/
mei@4144e8c22fff:~/test-ref$ find .git/refs/
.git/refs/
.git/refs/heads
.git/refs/tags
mei@4144e8c22fff:~/test-ref$ find .git/refs/ -exec ls -ld {} \;
drwxrwxr-x 4 mei mei 4096 Jul 28 23:02 .git/refs/
drwxrwxr-x 2 mei mei 4096 Jul 28 23:02 .git/refs/heads
drwxrwxr-x 2 mei mei 4096 Jul 28 23:02 .git/refs/tags
```

- 从技术角度来说，Git的目录名`.git`这个名字是可以改变的，Git的内部文件都使用变量`$GIT_DIR`，而不是字面量`.git`。

GIt中特殊的符号引用：

- `HEAD`， HEAD始终指向当前分支的最近提交。当切换分支时，HEAD会更新为指向新分支的最近提交。
- `ORIG_HEAD`，某些操作，如合并merge和复位reset,会把调整为新值之前的先前版本的HEAD记录到ORIG_HEAD中，可以使用ORIG_HEAD来恢复或回滚到之前的状态或者做一个比较。
- `FETCH_HEAD`，当使用远程库时， `git fetch`命令将所有抓取分支的头记录到`.git/FETCH_HEAD`中，FETCH_HEAD是最近抓取fetch的分支HEAD的缩写。
- `MERGE_HEAD`，当一个合并操作正在进行时，其他分支的头暂时记录在MERGE_HEAD中，换言之，MERGE_HEAD是正在合并进HEAD的提交。
- 不使用使用这些特殊名称来创建你自己的分支。





#### 6.2.3 相对提交名

- `master^`始终指的是在`master`分支中的倒数第二个提交。
- 除了第一个根提交之外，每一个提交都来自至少一个比它更早的提交，这其中的直接祖先称作该提交的父提交。
- 若一个提交存在多个父提交，那么它必定是由合并操作产生的。
- 在同一代提交中，插入符号`^`是用来选择不同的父提交的。给定一个提交`C`，则`C^1`是其第一个父提交，`C^2`是其第二个父提交，`C^3`是其第三个父提交，依次类推。
- 波浪线`~`用于返回父提交之前并选择上一代提交。`C~1`表示提交`C`的第一个父提交，`C~2`是祖父提交，`C~3`是曾祖父提交。
- Git也支持其他形式的简写，如`C^`和`C~`两种形式的简写分别等同于`C^1`和`C~1`。



提交历史图中可以看到类似的显示：

```sh
mei@4144e8c22fff:~/git$ git rev-parse master
670b81a890388c60b7032a4f5b879f2ece8c4558
mei@4144e8c22fff:~/git$ git show-branch --more=35|tail -10
[master~14] Merge branch 'ah/setup-extensions-message-i18n-fix'
[master~14^2] setup: split "extensions found" messages into singular and plural
[master~15] Merge branch 'ah/fetch-reject-warning-grammofix'
[master~15^2] fetch: improve grammar of "shallow roots" message
[master~16] Merge branch 'jk/doc-color-pager'
[master~16^2] doc: explain the use of color.pager
[master~17] Merge branch 'tl/fix-packfile-uri-doc'
[master~17^2] packfile-uri.txt: fix blobPackfileUri description
[master~18] Merge branch 'ry/clarify-fast-forward-in-glossary'
[master~18^2] docs: improve fast-forward in glossary content
```

查看相对提交的散列值：

```sh
mei@4144e8c22fff:~/git$ git rev-parse master~14
ccf03789058e9fd2a6120d88a3ad1ceac478e5ab
mei@4144e8c22fff:~/git$ git rev-parse master~14^2
8013d7d9ee7674774f6dbdbaeab11ce173bee016
```



### 6.3  提交历史记录

#### 6.3.1 查看旧提交

- 显示提交历史记录的主要命令是`git log`。
- 在参数形式上，`git log`跟`git log HEAD`是一样的，输出每一个可从HEAD找到的历史记录中的提交日志信息。
- 变更从HEAD提交开始显示，并从提交图中回溯。大致按时间逆序显示。

为了和书上的显示结果保持一致，我们切换到`1fbb58b4153e90eda08c2b022ee32d90729582e6`这次提交，并绑定到`dev`分支上：

```sh
mei@4144e8c22fff:~/git$ git checkout -b dev 1fbb58b415
Switched to a new branch 'dev'
mei@4144e8c22fff:~/git$ git branch
* dev
  master
```

此时查看日志信息：

```sh
mei@4144e8c22fff:~/git$ git log
commit 1fbb58b4153e90eda08c2b022ee32d90729582e6 (HEAD -> dev)
Merge: 58949bb18a 76bb40cde0
Author: Junio C Hamano <gitster@pobox.com>
Date:   Thu May 15 01:31:15 2008 -0700

    Merge git://repo.or.cz/git-gui

    * git://repo.or.cz/git-gui:
      git-gui: Delete branches with 'git branch -D' to clear config
      git-gui: Setup branch.remote,merge for shorthand git-pull
      git-gui: Update German translation
      git-gui: Don't use '$$cr master' with aspell earlier than 0.60
      git-gui: Report less precise object estimates for database compression

commit 58949bb18a1610d109e64e997c41696e0dfe97c3
Author: Chris Frey <cdfrey@foursquare.net>
Date:   Wed May 14 19:22:18 2008 -0400

    Documentation/git-prune.txt: document unpacked logic

    Clarifies the git-prune man page, documenting that it only
    prunes unpacked objects.

    Signed-off-by: Chris Frey <cdfrey@foursquare.net>
    Signed-off-by: Junio C Hamano <gitster@pobox.com>

commit c7ea453618e41e05a06f05e3ab63d555d0ddd7d9
Merge: 4b172de81b 08ba820fd7
Author: Junio C Hamano <gitster@pobox.com>
。。。省略
```



查看两个区间内的提交：

```sh
mei@4144e8c22fff:~/git$ git log --abbrev-commit --pretty=short dev~12..dev~10
commit 6d9878cc60
Author: Jeff King <peff@peff.net>

    clone: bsd shell portability fix

commit 30684dfaf8
Author: Jeff King <peff@peff.net>

    t5000: tar portability fix
mei@4144e8c22fff:~/git$
```

这是查看dev分支上之前10次和第11次的提交。

- `--abbrev-commit`参数用于显示缩写散列ID值。
- `--pretty=short`用于调整每个提交的信息量，short表示简短的信息，还可以是`oneline`单行显示或`full`完整显示。

```sh
mei@4144e8c22fff:~/git$ git log --abbrev-commit --pretty=oneline dev~12..dev~10
6d9878cc60 clone: bsd shell portability fix
30684dfaf8 t5000: tar portability fix
mei@4144e8c22fff:~/git$ git log --abbrev-commit --pretty=full dev~12..dev~10
commit 6d9878cc60
Author: Jeff King <peff@peff.net>
Commit: Junio C Hamano <gitster@pobox.com>

    clone: bsd shell portability fix

    When using /bin/sh from FreeBSD 6.1, the value of $? is lost
    when calling a function inside the 'trap' action. This
    resulted in clone erroneously indicating success when it
    should have reported failure.

    As a workaround, we save the value of $? before calling any
    functions.

    Signed-off-by: Jeff King <peff@peff.net>
    Signed-off-by: Junio C Hamano <gitster@pobox.com>

commit 30684dfaf8
Author: Jeff King <peff@peff.net>
Commit: Junio C Hamano <gitster@pobox.com>

    t5000: tar portability fix

    The output of 'tar tv' varies from system to system. In
    particular, the t5000 was expecting to parse the date from
    something like:

      -rw-rw-r-- root/root         0 2008-05-13 04:27 file

    but FreeBSD's tar produces this:

      -rw-rw-r--  0 root   root        0 May 13 04:27 file

    Instead of relying on tar's output, let's just extract the
    file using tar and stat the result using perl.

    Signed-off-by: Jeff King <peff@peff.net>
    Signed-off-by: Junio C Hamano <gitster@pobox.com>
```



- `--stat`参数可以列出提交中所更改的文件以及每个更改的文件中有多少行做了改动。

```sh
mei@4144e8c22fff:~/git$ git log --abbrev-commit --pretty=oneline --stat dev~12..dev~10
6d9878cc60 clone: bsd shell portability fix
 git-clone.sh | 3 +--
 1 file changed, 1 insertion(+), 2 deletions(-)
30684dfaf8 t5000: tar portability fix
 t/t5000-tar-tree.sh | 8 ++++----
 1 file changed, 4 insertions(+), 4 deletions(-)
```

`git log`中还有很多其他的参数，可以查看帮助文档。



#### 6.3.2 提交图

略。

#### 6.3.3 提交范围

略。

### 6.4 查找提交

Git提供多种机制来帮助你找到符合特定条件的提交。

我们以Git源码进行测试。

#### 6.4.1 使用`git bisect`查找bug是哪个提交引入的

查看`git bisect`的帮助信息：

```sh
mei@4144e8c22fff:~/git$ git bisect --help|head -n 4|awk NF
GIT-BISECT(1)                                         Git Manual                                        GIT-BISECT(1)
NAME
       git-bisect - Use binary search to find the commit that introduced a bug
mei@4144e8c22fff:~/git$ git bisect -h
usage: git bisect [help|start|bad|good|new|old|terms|skip|next|reset|visualize|view|replay|log|run]

git bisect help
	print this long help message.
git bisect start [--term-{old,good}=<term> --term-{new,bad}=<term>]
		 [--no-checkout] [<bad> [<good>...]] [--] [<pathspec>...]
	reset bisect state and start bisection.
git bisect (bad|new) [<rev>]
	mark <rev> a known-bad revision/
		a revision after change in a given property.
git bisect (good|old) [<rev>...]
	mark <rev>... known-good revisions/
		revisions before change in a given property.
git bisect terms [--term-good | --term-bad]
	show the terms used for old and new commits (default: bad, good)
git bisect skip [(<rev>|<range>)...]
	mark <rev>... untestable revisions.
git bisect next
	find next bisection to test and check it out.
git bisect reset [<commit>]
	finish bisection search and go back to commit.
git bisect (visualize|view)
	show bisect status in gitk.
git bisect replay <logfile>
	replay bisection log.
git bisect log
	show bisect log.
git bisect run <cmd>...
	use <cmd>... to automatically bisect.

Please use "git help bisect" to get the full man page.
mei@4144e8c22fff:~/git$
```

可知，该命令是使用进制搜索查找引入错误的提交。

通过`git bisect start`开始二分查找，然后指定一个旧的版本看哪个版本是`good`好的，再检查下一个是好是坏。



#### 6.4.2 `git blame`代码行最后是谁修改的

- `git blame`可以告诉你一个文件中的每一行最后是谁修改的和哪次提交做出了变更。
- `blame`是责备，责任的意思，即这一行代码最后由谁负责，因为你最后修改了这一行，你就需要为你的修改负责。

我们测试一下。

先查看`README.md`文件30-37行的内容：

```sh
mei@4144e8c22fff:~/git$ sed -n '30,37p' README.md
installed).

The user discussion and development of Git take place on the Git
mailing list -- everyone is welcome to post bug reports, feature
requests, comments and patches to git@vger.kernel.org (read
[Documentation/SubmittingPatches][] for instructions on patch submission).
To subscribe to the list, send an email with just "subscribe git" in
the body to majordomo@vger.kernel.org. The mailing list archives are
mei@4144e8c22fff:~/git$
```

再修改`git blame`查看一下这些行最后是由谁修改的：

```sh
mei@4144e8c22fff:~/git$ git blame -L 30,37 README.md
aa98eb3d658 README    (Christian Couder 2009-02-24 21:16:37 +0100 30) installed).
556b6600b25 README    (Nicolas Pitre    2007-01-17 13:04:39 -0500 31)
556b6600b25 README    (Nicolas Pitre    2007-01-17 13:04:39 -0500 32) The user discussion and development of Git take place on the Git
556b6600b25 README    (Nicolas Pitre    2007-01-17 13:04:39 -0500 33) mailing list -- everyone is welcome to post bug reports, feature
07f050c9996 README    (Matthieu Moy     2012-02-23 13:52:06 +0100 34) requests, comments and patches to git@vger.kernel.org (read
6164972018b README.md (Matthieu Moy     2016-02-25 09:37:27 +0100 35) [Documentation/SubmittingPatches][] for instructions on patch submission).
07f050c9996 README    (Matthieu Moy     2012-02-23 13:52:06 +0100 36) To subscribe to the list, send an email with just "subscribe git" in
07f050c9996 README    (Matthieu Moy     2012-02-23 13:52:06 +0100 37) the body to majordomo@vger.kernel.org. The mailing list archives are
mei@4144e8c22fff:~/git$
```

对于`git`的源代码，其`README.md`文件的第30到37行分别由哪些人修改的。比如，32行的内容`The user discussion and development of Git take place on the Git`，最后是由`Nicolas Pitre`这个开发人员于2007-01-17 13:04:39 -0500这个时间修改的，对应的提交ID是`556b6600b25`。

我们使用`git show`查看一下该提交到底修改了什么：

```sh
mei@4144e8c22fff:~/git$ git show 556b6600b25|head
commit 556b6600b25713054430b1dcaa731120eefbbd5b
Author: Nicolas Pitre <nico@fluxnic.net>
Date:   Wed Jan 17 13:04:39 2007 -0500

    sanitize content of README file

    Current README content is way too esoteric for someone looking at GIT
    for the first time. Instead it should provide a quick summary of what
    GIT is with a few pointers to other resources.

mei@4144e8c22fff:~/git$ git show 556b6600b25|grep 'The user'
+The user discussion and development of Git take place on the Git
mei@4144e8c22fff:~/git$
```

由于此次修改的内容比较多，你可以直接使用`git show 556b6600b25`查看修改的内容，此处仅显示前十行，然后通过过滤可以看到，的确有一个`+The user discussion and development of Git take place on the Git`,表示此次修改增加了一行，其内容是`The user discussion and development of Git take place on the Git`,这刚好与我们使用`git blame`显示出来的结果是对应的。说明的确可以通过`git blame`找到是谁修改了这行代码！！



## 第7章 分支

- 分支是在软件项目中启动一条单独的开发线的基本方法。
- Git的分支系统是轻量级的、简单的。

### 7.1 使用分支的原因

有无数个技术、哲学、管理，甚至是社会方面的理由来创建分支。如：

- 一个分支通常代表一个单独的客户发布版。
- 一个分支可以封装一个开发阶段，比如原型、测试、稳定或临近发布。
- 一个分支可以隔离一个特性的开发或者研究特别复杂的bug。
- 每一个分支可以代表单个贡献者的工作，另一个分支集成分支，可以专门用于凝聚(五笔`uxbc`)力量。



Git把列出的这些分支视为特性分支(topic branch)或开发分支(development branch)，特性仅指每个分支在版本库中的特定的目的。



#### 7.1.1 分支还是标签

- 标签和分支用于不同的目的。
- 标签是一个静态的名字，它不随着时间的推移而改变。一旦应用，你不应该对它做任何改动。它相当于地上的一个支柱和参考点。
- 分支是动态的，并且随着你的每次提交而移动。分支名用来跟随你的持续开发。
- 可以用同一个名字来命名分支和标签。但应避免使用相同的名称命名分支和标签。



### 7.2 分支名

- 版本库中的默认分支是`master`，大多数开发人员在这个分支上保持版本库中最强大和最可靠的开发线。
- 最佳实践是不要修改`master`分支的名称，也不要删除它。
- 为了支持可扩展性和分类组织，可以创建一个带层次的分支名，类似于UNIX的路径名。如`bug/pr-01`，`bug/pr-02`。
- Git支持Unix类似的通配符，如`*`。

分支名的限制，可以使用`git check-ref-format --help`来查看分支名的要求。该命令会检查`refname`是否是可接受的，如果不是的话，则会以非零状态退出。

```sh
mei@4144e8c22fff:~/git$ git check-ref-format --help|cat
GIT-CHECK-REF-FOR(1)                                  Git Manual                                 GIT-CHECK-REF-FOR(1)

NAME
       git-check-ref-format - Ensures that a reference name is well formed

SYNOPSIS
       git check-ref-format [--normalize]
              [--[no-]allow-onelevel] [--refspec-pattern]
              <refname>
       git check-ref-format --branch <branchname-shorthand>

DESCRIPTION
       Checks if a given refname is acceptable, and exits with a non-zero status if it is not.

       A reference is used in Git to specify branches and tags. A branch head is stored in the refs/heads hierarchy,
       while a tag is stored in the refs/tags hierarchy of the ref namespace (typically in $GIT_DIR/refs/heads and
       $GIT_DIR/refs/tags directories or, as entries in file $GIT_DIR/packed-refs if refs are packed by git gc).

       Git imposes the following rules on how references are named:

        1. They can include slash / for hierarchical (directory) grouping, but no slash-separated component can begin
           with a dot .  or end with the sequence .lock.

        2. They must contain at least one /. This enforces the presence of a category like heads/, tags/ etc. but the
           actual names are not restricted. If the --allow-onelevel option is used, this rule is waived.

        3. They cannot have two consecutive dots ..  anywhere.

        4. They cannot have ASCII control characters (i.e. bytes whose values are lower than \040, or \177 DEL),
           space, tilde ~, caret ^, or colon : anywhere.

        5. They cannot have question-mark ?, asterisk *, or open bracket [ anywhere. See the --refspec-pattern option
           below for an exception to this rule.

        6. They cannot begin or end with a slash / or contain multiple consecutive slashes (see the --normalize
           option below for an exception to this rule)

        7. They cannot end with a dot ..

        8. They cannot contain a sequence @{.

        9. They cannot be the single character @.

       10. They cannot contain a \.

       These rules make it easy for shell script based tools to parse reference names, pathname expansion by the
       shell when a reference name is used unquoted (by mistake), and also avoid ambiguities in certain reference
       name expressions (see gitrevisions(7)):

        1. A double-dot ..  is often used as in ref1..ref2, and in some contexts this notation means ^ref1 ref2 (i.e.
           not in ref1 and in ref2).

        2. A tilde ~ and caret ^ are used to introduce the postfix nth parent and peel onion operation.

        3. A colon : is used as in srcref:dstref to mean "use srcref's value and store it in dstref" in fetch and
           push operations. It may also be used to select a specific object such as with git cat-file: "git cat-file
           blob v1.3.3:refs.c".

        4. at-open-brace @{ is used as a notation to access a reflog entry.

       With the --branch option, the command takes a name and checks if it can be used as a valid branch name (e.g.
       when creating a new branch). But be cautious when using the previous checkout syntax that may refer to a
       detached HEAD state. The rule git check-ref-format --branch $name implements may be stricter than what git
       check-ref-format refs/heads/$name says (e.g. a dash may appear at the beginning of a ref component, but it is
       explicitly forbidden at the beginning of a branch name). When run with --branch option in a repository, the
       input is first expanded for the "previous checkout syntax" @{-n}. For example, @{-1} is a way to refer the
       last thing that was checked out using "git switch" or "git checkout" operation. This option should be used by
       porcelains to accept this syntax anywhere a branch name is expected, so they can act as if you typed the
       branch name. As an exception note that, the "previous checkout operation" might result in a commit object name
       when the N-th last thing checked out was not a branch.

OPTIONS
       --[no-]allow-onelevel
           Controls whether one-level refnames are accepted (i.e., refnames that do not contain multiple /-separated
           components). The default is --no-allow-onelevel.

       --refspec-pattern
           Interpret <refname> as a reference name pattern for a refspec (as used with remote repositories). If this
           option is enabled, <refname> is allowed to contain a single * in the refspec (e.g., foo/bar*/baz or
           foo/bar*baz/ but not foo/bar*/baz*).

       --normalize
           Normalize refname by removing any leading slash (/) characters and collapsing runs of adjacent slashes
           between name components into a single slash. If the normalized refname is valid then print it to standard
           output and exit with a status of 0, otherwise exit with a non-zero status. (--print is a deprecated way to
           spell --normalize.)

EXAMPLES
       o   Print the name of the previous thing checked out:

               $ git check-ref-format --branch @{-1}

       o   Determine the reference name to use for a new branch:

               $ ref=$(git check-ref-format --normalize "refs/heads/$newbranch")||
               { echo "we do not like '$newbranch' as a branch name." >&2 ; exit 1 ; }

GIT
       Part of the git(1) suite

Git 2.25.1                                            03/04/2021                                 GIT-CHECK-REF-FOR(1)
mei@4144e8c22fff:~/git$
```



下面列出帮助信息中，10条引用命名的规则：

- 1. 可以使用`/`斜杠创建分层的命名方案，但是，分支名不能以`.`开头，也不能是`.lock`结尾。
- 2. 必须至少包含一个`/`，由于我们一版使用的是相对引用，此条是非必须的。
- 3. 不包包含两个点号`..`。
- 4. 不能包含ASCII码控制符，如低于`\040`的字符、空格、波浪号`~`、插入符`^`、冒号`:`。
- 5. 不能包含`?`、`*`、`[`等。
- 6. 不能以`/`斜杠开头。
- 7. 不能以`.`圆点结尾。
- 8. 不能包含`@{`序列。
- 9. 不能包含单一的`@`字符。
- 10. 不能包含`\`反斜杠。

可以看到，规则真复杂。建议使用英文小写开头、后接英文小写、数字、`-`等组成的引用命名。



我们使用`git chec-ref-format`进行命名检查一下。

```sh
# 分支名异常的示例
mei@4144e8c22fff:~/git$ git check-ref-format --branch "@{"
fatal: '@{' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch "/"
fatal: '/' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch "/bug"
fatal: '/bug' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch "/.bug"
fatal: '/.bug' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch ".bug"
fatal: '.bug' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch "bug/"
fatal: 'bug/' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch "bug."
fatal: 'bug.' is not a valid branch name
mei@4144e8c22fff:~/git$ git check-ref-format --branch "bug\\"
fatal: 'bug\' is not a valid branch name


# 分支名正确的示例
mei@4144e8c22fff:~/git$ git check-ref-format --branch "bug/pr-1"
bug/pr-1
mei@4144e8c22fff:~/git$ git check-ref-format --branch "bug/pr-2"
bug/pr-2
mei@4144e8c22fff:~/git$ git check-ref-format --branch "develop"
develop
mei@4144e8c22fff:~/git$ git check-ref-format --branch "master"
master
mei@4144e8c22fff:~/git$ git check-ref-format --branch "feature-01"
feature-01
mei@4144e8c22fff:~/git$ git check-ref-format --branch "feature-02"
feature-02
mei@4144e8c22fff:~/git$
```

可以看到使用英文字母开头+横线`-`+数字序列作为分支名比较靠谱。



### 7.3 使用分支

- 在任何给定的时间里， 版本库中可能有许多不同的分支。但最多只有一个当前的或活动的分支。
- 活动分支决定在工作目录中检出哪些文件。
- 默认情况下，`master`分支是活动分支，但可以把任何分支设置成当前分支。
- 分支允许版本库中每一分支的内容赂许多不同的方向发散。
- 当一个版本库你分出至少一个分支时，把每次提交应用到某个分支，取决于哪个分支是活动的。
- 每个分支在一特定的版本库中必须有唯一的名字，这个名字始终指向该分支上最近提交的版本。一个分支的最近提交称为该分支的头部(tip或head)。
- Git不会保持分支的起源信息。
- 发布一分支必须是显式的完成。
- 如果复制版本库，分支名和那些分支上的开发都将是新复制版本库的副本的一部分。



### 7.4 创建分支

- 新的分支基于版本库中现在的提交。
- 可以使用`git branch branchName`创建分支。
- `git branch`命令只是把分支名引进版本库。并没有改变工作目录去使用新的分支。

如创建`dev`分支：

```sh
mei@4144e8c22fff:~/git$ git branch dev
mei@4144e8c22fff:~/git$ git branch
  dev
* master
mei@4144e8c22fff:~/git$
```

可以看到虽然创建新的分支`dev`，但当前分支还是`master`，并没有切换到`dev`分支。

### 7.5 列出分支名

- 可以直接使用`git branch`列出版本库中的分支名。
- `git branch -r`则会列出远程分支。
- `git branch -a`则会列出本地分支和远程分支。

```sh
mei@4144e8c22fff:~/git$ git branch -r
  origin/HEAD -> origin/master
  origin/maint
  origin/master
  origin/next
  origin/seen
  origin/todo
mei@4144e8c22fff:~/git$ git branch -a
  dev
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/maint
  remotes/origin/master
  remotes/origin/next
  remotes/origin/seen
  remotes/origin/todo
```



### 7.6 查看分支

- `git show-branch`则可以提供比`git branch`更详细的分支信息。

```sh
mei@4144e8c22fff:~/git$ git show-branch
! [dev] The second batch
 * [master] The second batch
--
+* [dev] The second batch
mei@4144e8c22fff:~/git$
```

`git show-branch`的输出被一排破折号(如第4行的`--`)分为两部分。分隔符上方的部分列出分支名，并用方括号括起来，每行一个。每个分支名前会用感叹号或星号标记，如果该分支是当前分支，则会用星号`*`标记(如第3行的`master`分支是当前分支，用星号标记了)。输出的下半部分是一个表示每个分支中提交的矩阵。



### 7.7 检出分支

- 工作目录一次只能反映一个分支。
- 要在不同的分支上开始工作，要发出`git checkout`命令。
- 使用`git checkout branchName`可以使用`branchName`分支变成新的当前分支。它改变了工作树文件和目录结构来匹配给定分支的状态。

如现在我们要切换到`dev`分支，则可以这样：

```sh
mei@4144e8c22fff:~/git$ git checkout dev
Switched to branch 'dev'
mei@4144e8c22fff:~/git$ git branch
* dev
  master
mei@4144e8c22fff:~/git$ git show-branch
* [dev] The second batch
 ! [master] The second batch
--
*+ [dev] The second batch
mei@4144e8c22fff:~/git$
```

可以看到当前分支已经是`dev`分支了，在分支名`dev`前方也可以看到星号标记。



选择一个新的当前分支可能会对工作树文件和目录结构产生巨大影响。如：

- 在要被检出的分支中但不在当前分支中的文件和目录，会从对象库中检出并放置到工作树中。
- 在当前分支中但不在要被检出的分支中的文件和目录，会从工作树中删除。
- 这两个分支都有的文件会被修改为要被检出的分支的内容。



如果想在创建分支的同时检出到该分支，则可以使用以下快捷命令：

- `git checkout -b new-branch`，这样git会创建`new-branch`分支，并切换到该分支。

```sh
mei@4144e8c22fff:~/git$ git checkout -b test
Switched to a new branch 'test'
mei@4144e8c22fff:~/git$ git branch
  dev
  master
* test
mei@4144e8c22fff:~/git$
```

可以看到，此时我们直接切换到了`test`分支，并没有使用`git branch`命令来先创建`test`分支。



### 7.8 删除分支

- 可以使用`git branch -d branchName`删除版本库中的分支`branchName`。
- 不能删除当前分支。
- `git branch -D branchName`会强制删除分支。



```sh
# 当前分支是test分支
mei@4144e8c22fff:~/git$ git branch
  dev
  master
* test
mei@4144e8c22fff:~/git$

# 尝试删除当前分支，可以发现无法删除
mei@4144e8c22fff:~/git$ git branch -d test
error: Cannot delete branch 'test' checked out at '/home/mei/git'

# 切换分支
mei@4144e8c22fff:~/git$ git checkout dev
Switched to branch 'dev'

# 再次删除test分支，可以删除成功
mei@4144e8c22fff:~/git$ git branch -d test
Deleted branch test (was 670b81a890).

# 再次查看分支情况，发现test分支已经没有了
mei@4144e8c22fff:~/git$ git branch
* dev
  master
```



- Git不会保持任何形式的关于分支名创建、移动、操纵、合并或删除的历史记录。一旦某个分支名删除了，它就没了。



## 第8章 diff差异

- `diff`是英文单词`differences`差异的缩写，指的是两个事务的不同。
- 使用`git diff`可以对版本库中的对象进行比较，显示其差异。

`git diff`命令的基本来源：

- 整个提交图中的任意树对象；
- 工作目录；
- 索引。

`git diff`命令可以使用上述三种来源的组合进行如下4种基本比较。

- `git diff`，显示工作目录和索引之间的差异。
- `git diff commit` , 显示工作目录和给你写提交间的差异。
- `git diff --cached commit`， 显示索引中的变更和给你写提交中的变更之间的差异。
- `git diff commit1 commit2`， 显示任意两个提交之间的差异。



当你对你的工作满意的时候，你可以利用`git add`命令暂存该文件，一旦将更改的文件暂存了，`git diff`命令就不会再为该文件输出diff。

- `git diff --cached`命令可以显示下次提交时索引中的额外变更或已暂存的变更。
- `git diff --staged`也可以看到暂存区中已经暂存的变更。







































