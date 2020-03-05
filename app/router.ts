import { Application } from 'egg'

export default (app: Application) => {

    const { controller, router } = app

    router.get('/', controller.home.index)
    router.get('/about', controller.home.about)
    router.get('/users', controller.user.users)
    // mysql
    const mysqlPath = '/mysql'
    router.get(`${mysqlPath}`, controller.mysql.index)
    router.post(`${mysqlPath}/connect`, controller.mysql.connect)
    router.get(`${mysqlPath}/databases`, controller.mysql.databases)
    router.get(`${mysqlPath}/databases/:name/tables`, controller.mysql.tables)
    router.get(`${mysqlPath}/databases/:name/tableNames`, controller.mysql.tableNames)
    router.get(`${mysqlPath}/databases/:dbName/tables/:tableName`, controller.mysql.tableDetail)
    // router.get(`${mysqlPath}/tables/:name`, controller.mysql.tableDetail)
    router.get(`${mysqlPath}/users`, controller.mysql.users)
    router.post(`${mysqlPath}/execSql`, controller.mysql.execSql)
    // dev
    router.get(`${mysqlPath}/users`, controller.mysql.users)
}
