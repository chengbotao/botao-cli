
/*
* @description: Creator
* @Author: ChengBotao
* @Date: 2023-03-11 20:11:24
*/

import { DistinctQuestion, Answers, ListQuestionOptions } from 'inquirer';
import { SupplementPrompt } from './PromptModule';

const isManualMode = (answers: Answers) => answers.preset === '__manual__';

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
            // @ts-ignore
            prompt.when = answers => originalWhen(answers)
        })

        const prompts = [
            this.featurePrompt,
            ...this.injectedPrompts
        ];
        return prompts;
    }
}