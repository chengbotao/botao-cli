
/*
* @description: Creator
* @Author: ChengBotao
* @Date: 2023-03-11 20:11:24
*/

import { DistinctQuestion, Answers, ListQuestionOptions } from 'inquirer';
import { SupplementPrompt } from './PromptModule';

export default class Creator {
    injectedPrompts: Partial<DistinctQuestion & SupplementPrompt>[];
    featurePrompt: ListQuestionOptions;
    constructor() {
        this.featurePrompt = this.resolveFeaturePrompts();
        this.injectedPrompts = []
    }
    resolveFeaturePrompts() {
        const featurePrompt = {
            name: 'features',
            type: 'checkbox',
            message: 'Check the features needed for your project:',
            choices: [],
            pageSize: 10
        }
        return featurePrompt
    }
    resolveFinalPrompts() {
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true)
            prompt.when = typeof originalWhen === "function" ? answers => originalWhen(answers) : originalWhen;
        })

        const prompts = [
            this.featurePrompt,
            ...this.injectedPrompts
        ];
        return prompts;
    }
    async resolvePlugins(pkg: any) {
        const plugins = []
    }
}

// TODO 预设模板
// TODO 选择构建工具[npm yarn pnpm]
// TODO 获取最新的 CLI 插件版本
// TODO 校验官方插件