
/*
* @description: 获取所有功能的交互提示语
* @Author: ChengBotao
* @Date: 2023-03-11 20:52:09
*/

import PromptModule from "../helpers/PromptModule";

export default function getPromptModules(): Promise<(creator: PromptModule) => void>[] {
    return [
        "babel",
        "router",
        "vuex"
    ].map(file => import(`../promptModules/${file}`).then(module => module.default))
}