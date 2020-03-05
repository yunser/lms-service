/* eslint-diable */
import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg'

export default (appInfo: EggAppInfo) => {
    const config: PowerPartial<EggAppConfig> = {}

    console.log('local config')

    config.keys = appInfo.name + '_1582774878129_167'

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }

    config.security = {
        csrf: {
            enable: false
        }
    }

    config.cluster = {
        listen: {
            path: '',
            port: 7022,
            hostname: '0.0.0.0'
        }
    }

    console.log('config', config)

    return config;
};
