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
