import { Controller } from 'egg'

export default class MysqlController extends Controller {

    async users() {
        const { ctx } = this
        ctx.body = []
    }
}
