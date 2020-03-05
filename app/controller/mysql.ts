import { Controller } from 'egg'
import { createConnection } from 'mysql'
// import { uuid } from 'uuid/v1'
import { v4 as uuid } from 'uuid'
let g_connection

let connections = {}

// console.log('uuid', uuid())

export default class MysqlController extends Controller {

    async index() {
        const { ctx } = this
        ctx.body = 'mysql index'
    }

    async _connect() {
        return new Promise((resolve, reject) => {
            if (g_connection) {
                resolve()
            }
            let connection = createConnection({
                // dialect: 'mysql',
                // host: '47.104.75.242',
                // port: 3306,
                // database: 'linxot',
                // username: 'linxot',
                // password: 'xcvt6efee4d',
                // dialectOptions: {
                //     decimalNumbers: true
                // },
                host: 'testhost',
                user: 'user',
                password: 'password',
                database: 'dbname'
            })
            connection.connect(function(err) {
                if (err) {
                  console.error('error connecting: ' + err.stack)
                  reject()
                  return
                }
                g_connection = connection
                resolve()
                console.log('connected as id ' + connection.threadId)
            })
        })
    }

    async _connect2(params) {
        // console.log('connect2', params)
        return new Promise((resolve, reject) => {
            let connection = createConnection(params)
            connection.connect(function(err) {
                if (err) {
                  console.error('error connecting: ' + err.stack)
                  reject(err)
                  return
                }
                g_connection = connection
                // console.log('nonnect ok', connection)
                resolve(connection)
            })
        })
    }

    async connect() {
        const { ctx } = this
        console.log('connect', ctx.request.body)
        let connection = await this._connect2(ctx.request.body)
        let id = uuid()
        connections[id] = {
            id,
            connection,
            createTime: new Date().getTime(),
            updateTime: new Date().getTime(),
        }
        ctx.body = id
    }

    async query(sql: string) : Promise<Array<any>> {
        // await this._connect()
        return new Promise((resolve, reject) => {
            g_connection.query(sql, function (error, results) {
                if (error) {
                    reject()
                }
                resolve(results)
            })
        })
    }

    async databases() {
        const { ctx } = this
        ctx.body = (await this.query('show databases;')).map(item => item.Database)
    }

    async tables() {
        const { ctx } = this
        const { name } = ctx.params
        let sql = `SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = '${name}'`
        ctx.body = await this.query(sql)
    }

    async tableNames() {
        const { ctx } = this
        const { name } = ctx.params
        let sql = `SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = '${name}'`
        ctx.body = (await this.query(sql)).map(item => item.TABLE_NAME)
    }

    async tableDetail() {
        const { ctx } = this
        const { dbName, tableName } = ctx.params
        let sql = `describe ${dbName}.${tableName};`
        ctx.body = await this.query(sql)
    }

    async execSql() {
        const { ctx } = this
        let { sql } = ctx.request.body
        ctx.body = await this.query(sql)
    }

    async users() {
        const { ctx } = this
        await this.connect()
        ctx.body = await this.query("describe user;")
        // ctx.body = await this.query("SELECT * FROM target.user;")
    }
}
