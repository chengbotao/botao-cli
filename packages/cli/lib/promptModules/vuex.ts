/*
 * @description: vuex 交互提示
 * @Author: ChengBotao
 * @Date: 2023-03-11 20:07:06
 */

import PromptModule from "../helpers/PromptModule";

export default (creator: PromptModule)=>{
    creator.injectFeature({
        name: 'Vuex',
        value: 'vuex',
        // description: 'Manage the app state with a centralized store',
        description: '使用集中式存储管理应用状态',
        link: 'https://vuex.vuejs.org/',
    })
}