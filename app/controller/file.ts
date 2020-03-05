import { Controller } from 'egg'
// import superagent from 'superagent'
import { existsSync, mkdirSync, createWriteStream } from 'fs'
import { resolve } from 'path'
import Axios from 'axios'

export default class HomeController extends Controller {

    public async index() {
        const { ctx } = this
        ctx.body = {
            desc: 'lms-api v1.0.1',
            env: ctx.app.config.env,
            // config: ctx.app.config,
        }
    }

    public async about() {
        const { ctx } = this
        ctx.body = 'v1.0.0'
    }

    public async download() {
        // url 是图片地址，如，http://wximg.233.com/attached/image/20160815/20160815162505_0878.png
        // filepath 是文件下载的本地目录
        // name 是下载后的文件名
        async function downloadFile(url: string, filepath: string, name: string) {
            if (!existsSync(filepath)) {
                mkdirSync(filepath);
            }
            const mypath = resolve(filepath, name);
            const writer = createWriteStream(mypath);
            const response = await Axios({
                url,
                method: "GET",
                responseType: "stream",
            });
            response.data.pipe(writer);
            return new Promise((resolve, reject) => {
                writer.on("finish", resolve);
                writer.on("error", reject);
            });
        }

        await downloadFile
    }
}
