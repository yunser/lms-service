import { Controller } from 'egg'
// import superagent from 'superagent'
import { existsSync, mkdirSync, createWriteStream } from 'fs'
import { resolve } from 'path'
import Axios from 'axios'
import { v4 as uuid } from 'uuid'

let tasks: Array<any> = []

export default class HomeController extends Controller {

    public async tasks() {
        const { ctx } = this

        ctx.body = tasks
    }

    public async download() {
        const { ctx } = this
        const { urls } : { urls: Array<string> } = ctx.request.body

        // url 是图片地址，如，http://wximg.233.com/attached/image/20160815/20160815162505_0878.png
        // filepath 是文件下载的本地目录
        // name 是下载后的文件名
        async function downloadFile(id: string, url: string, filepath: string, name: string) {
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
                tasks.find(item => item.id === id).progress = 1
                writer.on("finish", resolve);
                writer.on("error", reject);
            });
        }

        const downloadFolder = 'C:\\Users\\Y700\\Desktop\\download'

        for (let url of urls) {
            let arr = url.split('/')
            let fileName = arr[arr.length - 1]
            let id = uuid()
            tasks.push({
                id,
                url,
                fileName,
                downloadUrl: resolve(downloadFolder, fileName),
                progress: 0
            })
            downloadFile(id, url, downloadFolder , fileName)
        }

        ctx.body = tasks
    }

    public async download2() {
        const { ctx } = this

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

        const downloadFolder = 'C:\\Users\\Y700\\Desktop\\download'

        await downloadFile('http://www.sqliteexpert.com/v5/SQLiteExpertPersSetup64.exe', downloadFolder, 'SQLiteExpertPersSetup64.exe')

        ctx.body = 'success'
    }
}
