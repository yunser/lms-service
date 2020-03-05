// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportD = require('../../../app/controller/d');
import ExportData = require('../../../app/controller/data');
import ExportDd from '../../../app/controller/dd';
import ExportDownload from '../../../app/controller/download';
import ExportFile from '../../../app/controller/file';
import ExportHome from '../../../app/controller/home';
import ExportMysql from '../../../app/controller/mysql';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    d: ExportD;
    data: ExportData;
    dd: ExportDd;
    download: ExportDownload;
    file: ExportFile;
    home: ExportHome;
    mysql: ExportMysql;
    user: ExportUser;
  }
}
