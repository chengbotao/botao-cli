#!/usr/bin/env node

/*
 * @description: @botaoxy/cli 全局命令
 * @Author: ChengBotao
 * @Date: 2023-03-11 17:46:03
 */

import { program } from "commander";
import chalk from "chalk";
import leven from "leven";
import create from "../lib/create";
import pkg from "../package.json"
import checkNodeVersion from "../lib/utils/checkNodeVersion";

const { version, engines, name } = pkg;

/**
 * @description: 未知命令的推荐
 * @param {string} unknownCommand
 * @return {*}
 */
function suggestCommands(unknownCommand: string) {
    const availableCommands = program.commands.map(cmd => cmd.name())

    let suggestion: any;
    availableCommands.forEach(cmd => {
        const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
        if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
            suggestion = cmd
        }
    })

    if (suggestion) {
        console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
}

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
    suggestCommands(cmd)
    process.exit(1)
})

// 解析命令
program.parse(process.argv)

// TODO create options 实现处理
