/*
 * @description: 
 * @Author: ChengBotao
 * @Date: 2023-03-29 17:15:05
 */
import fs from "fs-extra"
import path from "path"

export default async function writeFileTree(dir: string, files: Record<string, string | NodeJS.ArrayBufferView>) {
    Object.keys(files).forEach((name) => {
        const filePath = path.join(dir, name)
        fs.ensureDirSync(path.dirname(filePath))
        fs.writeFileSync(filePath, files[name])
    })
}