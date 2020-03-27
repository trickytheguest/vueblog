#!/bin/bash
cd $(dirname $0)
pwd
git pull
cd myblog/
if [ -d "/var/www/html/vueblog/" ]; then
    yarn docs:build && \cp -rf docs/.vuepress/dist/* /var/www/html/vueblog/
fi
systemctl restart httpd
