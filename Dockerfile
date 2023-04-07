# node版本号
FROM node:15
# 工作目录
WORKDIR /v5zoneh5
# 添加所有文件到create-react-app目录
ADD . /v5zoneh5
# 执行命令
RUN npm install && npm run build && npm install -g http-server
# 暴露端口号
EXPOSE 8848
# 容器启动之后, 执行http-server 注：./build是指打包后的文件
CMD http-server ./build -p 8848