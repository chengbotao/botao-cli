/*
 * @description: serve 命令
 * @Author: ChengBotao
 * @Date: 2023-03-28 15:34:05
 */

import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import HtmlWebpackPlugin from "html-webpack-plugin"
// @ts-ignore
import {vueLoaderPlugin}  from "vue-loader"

export default async function serve(options?: string) {
    console.log("-------------", process.cwd());

    // create compiler
    const compiler = webpack({
        mode: 'development',
        entry: `${process.cwd()}\\src\\main.js`,
        module: {
            rules: [
                {
                    test:/\.vue$/,
                    use:['vue-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'] // 从右向左解析原则
                },
                {
                    test: /\.less$/,
                    use: ['style-loader', 'css-loader', 'less-loader'] // 从右向左解析原则
                },
                
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Development',
                // template: process.cwd()
            }),
            new vueLoaderPlugin()

        ]
    });

    // create server
    const server = new WebpackDevServer(Object.assign({
        open: true
    }), compiler)

    await server.start();
}