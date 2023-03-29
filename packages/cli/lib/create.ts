/*
 * @description: create 命令
 * @Author: ChengBotao
 * @Date: 2023-03-11 18:04:13
 */

import inquirer from "inquirer";
// import fs from "fs-extra"
import path from "path";
import Creator from "./helpers/Creator";
import PromptModule from "./helpers/PromptModule";
import getPromptModules from "./utils/getPromptModules";
import resolvePkg from "./utils/resolvePkg";
import writeFileTree from "./utils/writeFileTree";

/**
 * @description: 创建项目
 * @param {string} projectName 项目名称
 * @return {*}
 */
export default async function create(projectName: string) {
    // 处理当前文件夹为项目名称新建项目
    const cwd = process.cwd();
    // 传入 . 则代表要在当前目录下生成新项目
    const inCurrent = projectName === '.';
    const name = inCurrent ? path.relative('../', cwd) : projectName;
    const targetDir = path.resolve(cwd, projectName || '.');

    const creator = new Creator();
    // 获取功能交互提示语
    const promptModules = getPromptModules();
    const promptModule = new PromptModule(creator);
    await Promise.all(promptModules).then(module => {
        return module.forEach((prompt) => prompt(promptModule))
    })

    // 弹出交互提示语并获取用户的选择
    const answers = await inquirer.prompt(creator.resolveFinalPrompts())

    // 生成 package.json
    const pkg = {
        name,
        version: '0.1.0',
        private: true,
        devDependencies: {},
        ...resolvePkg(targetDir)
    }

    // 写 package.json
    await writeFileTree(targetDir, {
        'package.json': JSON.stringify(pkg, null, 2)
    })

    // 插件系统
    const plugins = await creator.resolvePlugins(pkg)
}

// TODO 校验项目名称是否符合规范
// TODO 处理创建已有文件夹名的项(相同文件夹的处理逻辑)
// TODO packageJson 添加插件
// TODO 是否初始化 git