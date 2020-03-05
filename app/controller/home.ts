import { Controller } from 'egg';

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
}
