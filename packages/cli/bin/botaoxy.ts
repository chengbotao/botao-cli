#!/usr/bin/env node

/*
 * @description: @botaoxy/cli 全局命令
 * @Author: ChengBotao
 * @Date: 2023-03-11 17:46:03
 */

import { program } from "commander";
import chalk from "chalk";
import create from "../lib/create";
import pkg from "../package.json"
import checkNodeVersion from "../lib/utils/checkNodeVersion";
import suggestCommands from "../lib/utils/suggestCommands";

const { version, engines, name } = pkg;

// 校验 node 版本
checkNodeVersion(engines.node, name)

// 包名及版本,使用的基本格式
program
    .version(`${name} ${version}`)
    .usage("<command> [options]")

// 新建工程命令
program
    .command("create [name]")
    .description("创建一个新工程")
    .action((name) => {
        create(name);
    })

// 输出有关未知命令的帮助信息及推荐命令
program.on('command:*', ([cmd]) => {
    program.outputHelp()
    console.log()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(program, cmd)
    process.exit(1)
})

// 解析命令
program.parse(process.argv)

// TODO create options 实现处理
