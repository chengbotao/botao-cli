/*
 * @description: 未知命令的推荐(错误命令,猜测用户意图)
 * @Author: ChengBotao
 * @Date: 2023-03-29 21:23:37
 */
import chalk from "chalk";
import { Command } from "commander";
import leven from "leven";

/**
 * @description: 未知命令的推荐(错误命令,猜测用户意图)
 * @param {Command} program
 * @param {string} unknownCommand
 * @return {*}
 */
export default function suggestCommands(program: Command, unknownCommand: string) {
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