/*
 * @description: 
 * @Author: ChengBotao
 * @Date: 2023-03-29 16:57:51
 */
import fs from "fs-extra";
import path from "path";
import { readPackageSync } from "read-pkg"

/**
 * @description: 
 * @param {string} dir
 * @return {*}
 */
export default function resolvePkg(dir: string) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
        return readPackageSync({ cwd: dir })
    }
    return {}
}