#!/usr/bin/env node

/*
 * @description: @botaoxy/cli 全局命令
 * @Author: ChengBotao
 * @Date: 2023-03-11 17:46:03
 */

import { program } from "commander";
import create from "../lib/create";
import pkg from "../package.json"

const version = pkg.version;

// 新建工程命令
program
    .version(version)
    .command("create [name]")
    .description("创建一个新工程")
    .action((name)=>{
        create(name);
    })

// 解析命令
program.parse(process.argv)