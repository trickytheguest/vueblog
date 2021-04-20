#!/bin/bash
##################################################
#      Filename: auto_generate_sites.sh
#        Author: Zhaohui Mei<mzh.whut@gmail.com>
#   Description: 自动生成网站URL超链接并提交至百度资源中 
#   Create Time: 2021-04-20 21:28:06
# Last Modified: 2021-04-20 21:53:09
# 百度资源链接 : https://ziyuan.baidu.com/linksubmit/index?site=https://hellogitlab.com/
##################################################

SCRIPT_PATH=$(cd "$(dirname "${0}")" && pwd)
echo "SCRIPT_PATH:${SCRIPT_PATH}"
site_file="${SCRIPT_PATH}/urls.txt"
# 将百度token存放在环境变量中
echo "BAIDU_TOKEN:${BAIDU_TOKEN}"
find . -name '*.md'|sed 's/.md$/.html/g'|sed 's/README.html//g'|sed 's@^.@https://hellogitlab.com@g'|sort > "${site_file}"
upload_result=$(curl -H 'Content-Type:text/plain' --data-binary @${site_file} "http://data.zz.baidu.com/urls?site=https://hellogitlab.com&token=${BAIDU_TOKEN}")
echo "字段	说明
remain	当天剩余的可推送url条数
success	成功推送的url条数"
echo "upload_result:${upload_result}"

