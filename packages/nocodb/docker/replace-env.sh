#!/bin/sh
# 此脚本主要功能是替换文件中形如{{XXX_XXXX}}的环境变量占位符为实际的环境变量值
# 占位符都是大写字符和下划线组成
# 例如：{{NUXT_APP_LANG}}替换为$NUXT_APP_LANG的值
# DIR为要替换的文件所在目录
# 作者：Chatgpt & Github Copilot & Chenzhuoqi

sysOS=`uname -s`

#替换文件所在目录
DIR="/usr/src/app/docker/nc-gui/"

# 以下代码来自chatgpt
# Get list of files with {{VAR}} strings
FILES=$(grep -rl '{{[A-Z_]*}}' "$DIR")
echo "Replace Env Start."
echo ""
# Loop through files and replace strings with environment variables
for FILE in $FILES
do
  echo "Processing file $FILE"
  # Loop through variables
  for VAR in $(cat "$FILE" | grep -o '{{[A-Z_]*}}' | tr -d '{}')
  do
    echo "Processing '$VAR'"
    # Get value of variable from environment
    VAR_VALUE="$(eval echo '$'$(eval echo '$'VAR))"

    if [ -z "$VAR_VALUE" ]; then
      echo "Variable '$VAR' is not set. Skipping."
      continue
    fi
    
    echo "Replacing '$VAR' with '$VAR_VALUE'" 

    # Replace variable with value in file
    if [ "$sysOS" == "Darwin" ]; then
       # Mac OS X sed requires an empty string for the -i option
      sed -i '' "s|{{${VAR}}}|${VAR_VALUE}|g" "$FILE"
    else
      # Linux sed requires an extension for the -i option
      sed -i "s|{{${VAR}}}|${VAR_VALUE}|g" "$FILE"
    fi
  done
  echo ""
done

echo "Replace Env Done."
