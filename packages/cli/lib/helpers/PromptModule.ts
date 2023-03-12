/*
 * @description: PromptModule 将功能的提示语注入 Creator
 * @Author: ChengBotao
 * @Date: 2023-03-11 20:28:59
 */
import { DistinctQuestion, CheckboxChoiceOptions, Answers, ChoiceOptions } from 'inquirer';

interface OnPromptCompleteCb<T> {
    (
        answers: T,
        options: {
            useConfigFiles: boolean
            plugins: Record<string, any>
        }
    ): void
}

export interface SupplementPrompt {
    description: string,
    link: string
}

export default class PromptModule {
    creator: Answers
    constructor(creator: Answers) {
        this.creator = creator
    }

    injectFeature(feature: Partial<CheckboxChoiceOptions & SupplementPrompt>) {
        this.creator.featurePrompt.choices.push(feature)
    }

    injectPrompt(prompt: Partial<DistinctQuestion & SupplementPrompt>) {
        this.creator.injectedPrompts.push(prompt)
    }

    injectOptionForPrompt(name: string, option: ChoiceOptions) {
        this.creator.injectedPrompts.find((feature: CheckboxChoiceOptions) => {
            return feature.name === name
        }).choices.push(option)
    }

    onPromptComplete(cb: OnPromptCompleteCb<Answers>) {
        this.creator.promptCompleteCbs.push(cb)
    }
}