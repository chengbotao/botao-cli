/*
 * @description: create 命令
 * @Author: ChengBotao
 * @Date: 2023-03-11 18:04:13
 */

import inquirer from "inquirer";
import Creator from "./helpers/Creator";
import PromptModule from "./helpers/PromptModule";
import getPromptModules from "./utils/getPromptModules";


export default async function create(name?: string) {
    const creator = new Creator();
    // 获取功能交互提示语
    const promptModules = getPromptModules();
    const promptModule = new PromptModule(creator);
    await Promise.all(promptModules).then(module => {
        return module.forEach((prompt) => prompt(promptModule))
    })

    // 弹出交互提示语并获取用户的选择
    const answers = await inquirer.prompt(creator.resolveFinalPrompts())
}