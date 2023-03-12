/*
 * @description: router 交互提示
 * @Author: ChengBotao
 * @Date: 2023-03-11 20:03:21
 */

import chalk from "chalk";
import PromptModule from "../helpers/PromptModule";

export default (creator: PromptModule) => {
    creator.injectFeature({
        name: 'Router',
        value: 'router',
        // description: 'Structure the app with dynamic pages',
        description: '使用动态页面构建应用',
        link: 'https://router.vuejs.org/',
    })

    creator.injectPrompt({
        name: 'historyMode',
        when: answers => answers.features.includes('router'),
        type: 'confirm',
        // message: `Use history mode for router? ${chalk.yellow(`(Requires proper server setup for index fallback in production)`)}`,
        message: `使用路由器的 history 模式？ ${chalk.yellow(`(需要正确设置服务器才能在生产环境中进行索引回退)`)}`,
        // description: `By using the HTML5 History API, the URLs don't need the '#' character anymore.`,
        description: `通过使用 HTML5  History API，URL 不再需要“#”字符。`,
        link: 'https://router.vuejs.org/guide/essentials/history-mode.html',
    })
}