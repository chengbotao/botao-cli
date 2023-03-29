/*
 * @description: 检验 Node 版本
 * @Author: ChengBotao
 * @Date: 2023-03-27 11:45:47
 */
import semver from "semver";
import chalk from "chalk"

/**
 * @description: 检验 Node 版本
 * @param {string} range
 * @param {string} packageName
 * @param {boolean} optionsOrLoose
 * @return {*}
 */
export default function checkNodeVersion(range: string | semver.Range, packageName: string, optionsOrLoose: boolean | semver.RangeOptions = { includePrerelease: true }) {
    if (!semver.satisfies(process.version, range, optionsOrLoose)) {
        console.log(chalk.red(
            `You are using Node ${process.version}, but this version of ${packageName} requires Node ${range}.

Please upgrade your Node version.`
        ))
        process.exit(1)
    }
}