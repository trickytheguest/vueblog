#!/bin/bash
cd $(dirname $0)
pwd
git pull
# copy the secure file that the content is yourself info to project config folder
\cp -rf ~/secureinfo.js myblog/config/
cd myblog/
if [ -d "/var/www/html/vueblog/" ]; then
    yarn docs:build && \cp -rf docs/.vuepress/dist/* /var/www/html/vueblog/
fi
systemctl restart nginx && systemctl status nginx
