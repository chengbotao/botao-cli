#!/usr/bin/env node

/*
 * @description: @botaoxy/cli-service 开发服务
 * @Author: ChengBotao
 * @Date: 2023-03-27 15:31:44
 */

import { program } from "commander";
import serve from "../lib/serve";
import pkg from "../package.json";

const version = pkg.version;

// 新建工程命令
program
    .version(version)
    .command("serve [options]")
    .description("start development server")
    .action((args) => {
        console.info('Starting development server...')
        serve(args)
    })

// 解析命令
program.parse(process.argv)