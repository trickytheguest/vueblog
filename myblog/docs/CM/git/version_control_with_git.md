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

~~虽然我们可以通过在`git commit`中指定`--author`参数，~~但更常用的方法是，在全局指定用户名和邮箱信息，正如上面提示的信息那样，使用以下命令：

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

此时，我们再尝试使用`git commit`来`--author`参数提交：

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

### 3.6 版本为内文件的删除和重命名

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

- `/etc/gitconfig`， 系统级配置文件，不一定存在，可通过`git config --system`来修改，优先级最低。
- `~/.gitconfig`，用户级配置文件，可用`git config --global`来修改，优先级比系统级配置文件高。
- `.git/config`,版本库特定的配置文件，可以通过`git config --local`来修改，优先级最高。

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

随意时间的推移，所有信息在对象库中会变化和增长，项目的编辑、添加和删除都会被跟踪和建模。为了有效地利用磁盘空间和网络带宽，Git把对象压缩并存储在打包文件*(pack file)*里，这些文件也在对象库里。



#### 4.1.3 索引

- 索引是一个临时的、动态的二进制文件。它描述整个版本库的目录结构。
- 索引捕获项目在某个时刻的整体结构的一个版本。
- 项目的状态可以用一个提交和一棵目录树表示，它要以来自项目历史中的任意时刻，也可以是你正在开发的未来状态。
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























