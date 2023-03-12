/*
 * @description: babel 交互提示
 * @Author: ChengBotao
 * @Date: 2023-03-11 19:53:44
 */

import PromptModule from "../helpers/PromptModule"

export default (creator: PromptModule) => {
    creator.injectFeature({
        name: 'Babel',
        value: 'babel',
        // description: 'Transpile modern JavaScript to older versions (for compatibility)',
        description: '将现代 JavaScript 转译为旧版本（为了兼容）',
        link: 'https://babeljs.io/',
        checked: true, // 默认配置
    })
}