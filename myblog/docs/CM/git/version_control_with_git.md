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

虽然我们可以通过在`git commit`中指定`--author`参数。