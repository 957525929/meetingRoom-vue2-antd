import Vue from 'vue'
import { login, logout, phoneLogin, thirdLogin } from '@/api/login'
import {
  ACCESS_TOKEN,
  USER_NAME,
  USER_INFO,
  USER_AUTH,
  SYS_BUTTON_AUTH,
  UI_CACHE_DB_DICT_DATA
} from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { queryPermissionsByUser } from '@/api/api'
import { getAction } from '@/api/manage'

const user = {
  state: {
    token: '',
    username: '',
    realname: '',
    welcome: '',
    avatar: '',
    permissionList: [],
    info: {}
    //////////////
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
    // ////////////
  },
  actions: {
    ///////////////
    // CAS验证登录
    ValidateLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getAction('/cas/client/validateLogin', userInfo)
          .then(response => {
            console.log('----cas 登录--------', response)
            if (response.success) {
              const result = response.result
              const userInfo = result.userInfo
              Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.token)
              commit('SET_INFO', userInfo)
              commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname, welcome: welcome() })
              commit('SET_AVATAR', userInfo.avatar)
              resolve(response)
            } else {
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            if (response.code == '200') {
              const result = response
              const userInfo = {
                username: '管理员',
                realname: '管理员'
              }
              Vue.ls.set(ACCESS_TOKEN, result.data, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.data)
              commit('SET_INFO', userInfo)
              commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname, welcome: welcome() })
              // commit('SET_AVATAR', userInfo.avatar)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        phoneLogin(userInfo)
          .then(response => {
            if (response.code == '200') {
              const result = response.result
              const userInfo = result.userInfo
              Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.token)
              commit('SET_INFO', userInfo)
              commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname, welcome: welcome() })
              commit('SET_AVATAR', userInfo.avatar)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetPermissionList({ commit }) {
      return new Promise((resolve, reject) => {
        let response = {
          success: true,
          message: '查询成功',
          code: 200,
          result: {
            allAuth: [
              {
                action: 'online:goGenerateCode',
                describe: '代码生成按钮',
                type: '1',
                status: '1'
              },
              {
                action: 'user:form:phone',
                describe: '手机号禁用',
                type: '2',
                status: '1'
              },
              {
                action: 'user:add',
                describe: '添加用户按钮',
                type: '1',
                status: '1'
              }
            ],
            auth: [
              {
                action: 'user:add',
                describe: '添加用户按钮',
                type: '1'
              },
              {
                action: 'user:form:phone',
                describe: '手机号禁用',
                type: '2'
              },
              {
                action: 'online:goGenerateCode',
                describe: '代码生成按钮',
                type: '1'
              }
            ],
            menu: [
              //   {
              //   "redirect": null,
              //   "path": "/dashboard/analysis",
              //   "component": "dashboard/Analysis",
              //   "route": "1",
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "home",
              //     "title": "首页"
              //   },
              //   "name": "dashboard-analysis",
              //   "id": "9502685863ab87f0ad1134142788a385"
              // },
              // {
              //   "redirect": null,
              //   "path": "/assetMgr/asset",
              //   "component": "layouts/RouteView",
              //   "route": "1",
              //   "children": [ {
              //     "path": "/assetMgr/asset/entryAsset",
              //     "component": "assetMgr/entryAssetList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": true,
              //       "title": "入帐资产管理"
              //     },
              //     "name": "assetMgr-asset-entryAsset",
              //     "id": "1265462136117207042"
              //   }],
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "money-collect",
              //     "title": "资产管理"
              //   },
              //   "name": "erp-finance",
              //   "id": "1249544156015607810"
              // },
              {
                redirect: null,
                path: '/erp/bas',
                component: 'layouts/RouteView',
                route: '1',
                children: [
                  {
                    path: '/erp/bas/supplier',
                    component: 'erp/bas/BasSupplierList',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '教师信息管理'
                    },
                    name: 'erp-bas-supplier',
                    id: '1245154914959151105'
                  },
                  {
                    path: '/erp/bas/BasWareArrange',
                    component: 'erp/bas/BasWareArrange',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '会务安排员信息管理'
                    },
                    name: 'erp-bas-BasWareArrange',
                    id: '1245154050731200514'
                  },
                  {
                    path: '/erp/bas/materialCategory',
                    component: 'erp/bas/BasMaterialCategoryList',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '基础设施位置数据管理'
                    },
                    name: 'erp-bas-materialCategory',
                    id: '1244271300749729794'
                  }
                ],
                meta: {
                  keepAlive: false,
                  internalOrExternal: false,
                  icon: 'table',
                  title: '基础数据'
                },
                name: 'erp-bas',
                id: '1242263502445903874'
              },
              // {
              //   "redirect": null,
              //   "path": "/dashboard3",
              //   "component": "layouts/RouteView",
              //   "route": "1",
              //   "children": [{
              //     "path": "/isystem/log",
              //     "component": "system/LogList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "日志管理"
              //     },
              //     "name": "isystem-log",
              //     "id": "58857ff846e61794c69208e9d3a85466"
              //   }],
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "dashboard",
              //     "title": "系统监控"
              //   },
              //   "name": "dashboard3",
              //   "id": "08e6b9dc3c04489c8e1ff2ce6f105aa4"
              // },
              // {
              //   "redirect": null,
              //   "path": "/isystem",
              //   "component": "layouts/RouteView",
              //   "route": "1",
              //   "children": [{
              //     "path": "/isystem/user",
              //     "component": "system/UserList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "用户管理"
              //     },
              //     "name": "isystem-user",
              //     "id": "3f915b2769fc80648e92d04e84ca059d"
              //   }, {
              //     "path": "/isystem/role",
              //     "component": "system/RoleList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "角色管理"
              //     },
              //     "name": "isystem-role",
              //     "id": "e8af452d8948ea49d37c934f5100ae6a"
              //   }, {
              //     "path": "/isystem/permission",
              //     "component": "system/PermissionList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "菜单管理"
              //     },
              //     "name": "isystem-permission",
              //     "id": "54dd5457a3190740005c1bfec55b1c34"
              //   }, {
              //     "path": "/isystem/depart",
              //     "component": "system/DepartList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "部门管理"
              //     },
              //     "name": "isystem-depart",
              //     "id": "45c966826eeff4c99b8f8ebfe74511fc"
              //   }, {
              //     "path": "/isystem/checkRule",
              //     "component": "system/SysCheckRuleList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "编码校验规则"
              //     },
              //     "name": "isystem-checkRule",
              //     "id": "1224641973866467330"
              //   }, {
              //     "path": "/isystem/dict",
              //     "component": "system/DictList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "数据字典"
              //     },
              //     "name": "isystem-dict",
              //     "id": "f1cb187abf927c88b89470d08615f5ac"
              //   }, {
              //     "path": "/isystem/departUserList",
              //     "component": "system/DepartUserList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "我的部门"
              //     },
              //     "name": "isystem-departUserList",
              //     "id": "5c2f42277948043026b7a14692456828"
              //   }, {
              //     "path": "/isystem/roleUserList",
              //     "component": "system/RoleUserList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "角色用户"
              //     },
              //     "name": "isystem-roleUserList",
              //     "id": "190c2b43bec6a5f7a4194a85db67d96a"
              //   }, {
              //     "path": "/isystem/position",
              //     "component": "system/SysPositionList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "职务管理"
              //     },
              //     "name": "isystem-position",
              //     "id": "1174506953255182338"
              //   }, {
              //     "path": "/isystem/dataSource",
              //     "component": "system/SysDataSourceList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "多数据源管理"
              //     },
              //     "name": "isystem-dataSource",
              //     "id": "1209731624921534465"
              //   }, {
              //     "path": "/isystem/addressList",
              //     "component": "system/AddressList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "通讯录"
              //     },
              //     "name": "isystem-addressList",
              //     "id": "1174590283938041857"
              //   }, {
              //     "path": "/isys/category",
              //     "component": "system/SysCategoryList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "分类字典"
              //     },
              //     "name": "isys-category",
              //     "id": "ebb9d82ea16ad864071158e0c449d186"
              //   }, {
              //     "path": "/isystem/annountCement",
              //     "component": "system/SysAnnouncementList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "系统通告"
              //     },
              //     "name": "isystem-annountCement",
              //     "id": "e08cb190ef230d5d4f03824198773950"
              //   }, {
              //     "path": "/isystem/newPermissionList",
              //     "component": "system/NewPermissionList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "菜单管理2"
              //     },
              //     "name": "isystem-newPermissionList",
              //     "id": "1170592628746878978"
              //   }],
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "setting",
              //     "title": "系统管理"
              //   },
              //   "name": "isystem",
              //   "id": "d7d6e2e4e2934f2c9385a623fd98c6f3"
              // }, {
              //   "redirect": null,
              //   "path": "/message",
              //   "component": "layouts/RouteView",
              //   "route": "1",
              //   "children": [{
              //     "path": "/modules/message/sysMessageList",
              //     "component": "modules/message/SysMessageList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "消息管理"
              //     },
              //     "name": "modules-message-sysMessageList",
              //     "id": "944abf0a8fc22fe1f1154a389a574154"
              //   }, {
              //     "path": "/modules/message/sysMessageTemplateList",
              //     "component": "modules/message/SysMessageTemplateList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "模板管理"
              //     },
              //     "name": "modules-message-sysMessageTemplateList",
              //     "id": "f780d0d3083d849ccbdb1b1baee4911d"
              //   }, {
              //     "path": "/isps/userAnnouncement",
              //     "component": "system/UserAnnouncementList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "我的消息"
              //     },
              //     "name": "isps-userAnnouncement",
              //     "id": "53a9230444d33de28aa11cc108fb1dba"
              //   }],
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "message",
              //     "title": "消息中心"
              //   },
              //   "name": "message",
              //   "id": "5c8042bd6c601270b2bbd9b20bccc68b"
              // }, {
              //   "redirect": null,
              //   "path": "/account",
              //   "component": "layouts/RouteView",
              //   "route": "1",
              //   "hidden": true,
              //   "children": [{
              //     "path": "/account/center",
              //     "component": "account/center/Index",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "个人中心"
              //     },
              //     "name": "account-center",
              //     "id": "d86f58e7ab516d3bc6bfb1fe10585f97"
              //   }, {
              //     "path": "/account/settings/Index",
              //     "component": "account/settings/Index",
              //     "route": "1",
              //     "children": [{
              //       "path": "/account/settings/notification",
              //       "component": "account/settings/Notification",
              //       "route": "1",
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "title": "新消息通知"
              //       },
              //       "name": "account-settings-notification",
              //       "id": "fedfbf4420536cacc0218557d263dfea"
              //     }, {
              //       "path": "/account/settings/binding",
              //       "component": "account/settings/Binding",
              //       "route": "1",
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "title": "账户绑定"
              //       },
              //       "name": "account-settings-binding",
              //       "id": "4f66409ef3bbd69c1d80469d6e2a885e"
              //     }, {
              //       "path": "/account/settings/custom",
              //       "component": "account/settings/Custom",
              //       "route": "1",
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "title": "个性化设置"
              //       },
              //       "name": "account-settings-custom",
              //       "id": "882a73768cfd7f78f3a37584f7299656"
              //     }, {
              //       "path": "/account/settings/security",
              //       "component": "account/settings/Security",
              //       "route": "1",
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "title": "安全设置"
              //       },
              //       "name": "account-settings-security",
              //       "id": "ec8d607d0156e198b11853760319c646"
              //     }, {
              //       "path": "/account/settings/BaseSetting",
              //       "component": "account/settings/BaseSetting",
              //       "route": "1",
              //       "hidden": true,
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "title": "基本设置"
              //       },
              //       "name": "account-settings-base",
              //       "id": "1367a93f2c410b169faa7abcbad2f77c"
              //     }],
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "个人设置"
              //     },
              //     "name": "account-settings-Index",
              //     "id": "6e73eb3c26099c191bf03852ee1310a1",
              //     "alwaysShow": true
              //   }, {
              //     "path": "/dashboard/workplace",
              //     "component": "dashboard/Workplace",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "工作台"
              //     },
              //     "name": "dashboard-workplace",
              //     "id": "8fb8172747a78756c11916216b8b8066"
              //   }],
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "user",
              //     "title": "个人页"
              //   },
              //   "name": "account",
              //   "id": "717f6bee46f44a3897eca9abd6e2ec44"
              // }, {
              //   "redirect": null,
              //   "path": "/online",
              //   "component": "layouts/RouteView",
              //   "route": "1",
              //   "children": [{
              //     "path": "/online/cgform",
              //     "component": "modules/online/cgform/OnlCgformHeadList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "Online表单开发"
              //     },
              //     "name": "online-cgform",
              //     "id": "8d4683aacaa997ab86b966b464360338"
              //   }, {
              //     "path": "/online/copyform/:code",
              //     "component": "modules/online/cgform/OnlCgformCopyList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO复制表单"
              //     },
              //     "name": "online-copyform-@code",
              //     "id": "f2849d3814fc97993bfc519ae6bbf049"
              //   }, {
              //     "path": "/online/cgreport",
              //     "component": "modules/online/cgreport/OnlCgreportHeadList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "Online报表配置"
              //     },
              //     "name": "online-cgreport",
              //     "id": "109c78a583d4693ce2f16551b7786786"
              //   }, {
              //     "path": "/isystem/fillRule",
              //     "component": "system/SysFillRuleList",
              //     "route": "1",
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "系统编码规则"
              //     },
              //     "name": "isystem-fillRule",
              //     "id": "1192318987661234177"
              //   }, {
              //     "path": "/online/cgformErpList/:code",
              //     "component": "modules/online/cgform/auto/erp/OnlCgformErpList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO在线表单ERP"
              //     },
              //     "name": "online-cgformErpList-@code",
              //     "id": "1229674163694841857"
              //   }, {
              //     "path": "/online/cgformList/:code",
              //     "component": "modules/online/cgform/auto/OnlCgformAutoList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO在线表单"
              //     },
              //     "name": "online-cgformList-@code",
              //     "id": "54097c6a3cf50fad0793a34beff1efdf"
              //   }, {
              //     "path": "/online/cgformTreeList/:code",
              //     "component": "modules/online/cgform/auto/OnlCgformTreeList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO树表单列表"
              //     },
              //     "name": "online-cgformTreeList-@code",
              //     "id": "fba41089766888023411a978d13c0aa4"
              //   }, {
              //     "path": "/online/df/:table/:id",
              //     "component": "modules/online/cgform/auto/OnlineDynamicForm",
              //     "route": "0",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO动态表单"
              //     },
              //     "name": "online-df-@table-@id",
              //     "id": "22d6a3d39a59dd7ea9a30acfa6bfb0a5"
              //   }, {
              //     "path": "/online/cgreport/:code",
              //     "component": "modules/online/cgreport/auto/OnlCgreportAutoList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO在线报表"
              //     },
              //     "name": "onlineAutoList",
              //     "id": "9fe26464838de2ea5e90f2367e35efa0"
              //   }, {
              //     "path": "/demo",
              //     "component": "layouts/RouteView",
              //     "route": "1",
              //     "children": [{
              //       "path": "/big/screen",
              //       "component": "layouts/RouteView",
              //       "route": "1",
              //       "children": [{
              //         "path": "45f8908389f7804a8bbcc6c13a433171",
              //         "component": "layouts/IframePageView",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": true,
              //           "title": "生产销售监控",
              //           "url": "{{ window._CONFIG['domianURL'] }}/big/screen/templat/index1"
              //         },
              //         "name": "{{ window._CONFIG['domianURL'] }}-big-screen-templat-index1",
              //         "id": "1205098241075453953"
              //       }, {
              //         "path": "8a1d8dfe759ca380aa235d1824802481",
              //         "component": "layouts/IframePageView",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "智慧物流监控",
              //           "url": "{{ window._CONFIG['domianURL'] }}/big/screen/templat/index2"
              //         },
              //         "name": "{{ window._CONFIG['domianURL'] }}-big-screen-templat-index2",
              //         "id": "1205306106780364802"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "area-chart",
              //         "title": "大屏设计"
              //       },
              //       "name": "big-screen",
              //       "id": "1205097455226462210"
              //     }, {
              //       "path": "/report",
              //       "component": "layouts/RouteView",
              //       "route": "1",
              //       "children": [{
              //         "path": "/report/ArchivesStatisticst",
              //         "component": "jeecg/report/ArchivesStatisticst",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "布局统计报表"
              //         },
              //         "name": "report-ArchivesStatisticst",
              //         "id": "2aeddae571695cd6380f6d6d334d6e7d"
              //       }, {
              //         "path": "/report/ViserChartDemo",
              //         "component": "jeecg/report/ViserChartDemo",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "ViserChartDemo"
              //         },
              //         "name": "report-ViserChartDemo",
              //         "id": "020b06793e4de2eee0007f603000c769"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "bar-chart",
              //         "title": "统计报表"
              //       },
              //       "name": "report",
              //       "id": "f0675b52d89100ee88472b6800754a08"
              //     }, {
              //       "path": "/jeecg",
              //       "component": "layouts/RouteView",
              //       "route": "1",
              //       "children": [{
              //         "path": "/jeecg/SelectDemo",
              //         "component": "jeecg/SelectDemo",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "自定义组件"
              //         },
              //         "name": "jeecg-SelectDemo",
              //         "id": "9a90363f216a6a08f32eecb3f0bf12a3"
              //       }, {
              //         "path": "/jeecg/TableExpandeSub",
              //         "component": "jeecg/TableExpandeSub",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "内嵌Table"
              //         },
              //         "name": "jeecg-TableExpandeSub",
              //         "id": "4356a1a67b564f0988a484f5531fd4d9"
              //       }, {
              //         "path": "/jeecg/jeecgDemoList",
              //         "component": "jeecg/JeecgDemoList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "单表模型示例"
              //         },
              //         "name": "DemoList",
              //         "id": "4148ec82b6acd69f470bea75fe41c357"
              //       }, {
              //         "path": "/jeecg/ImagPreview",
              //         "component": "jeecg/ImagPreview",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "图片预览"
              //         },
              //         "name": "jeecg-ImagPreview",
              //         "id": "655563cd64b75dcf52ef7bcdd4836953"
              //       }, {
              //         "path": "/oss/file",
              //         "component": "modules/oss/OSSFileList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "对象存储"
              //         },
              //         "name": "oss-file",
              //         "id": "1166535831146504193"
              //       }, {
              //         "path": "/jeecg/tablist/JeecgOrderDMainList",
              //         "component": "jeecg/tablist/JeecgOrderDMainList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "一对多Tab示例"
              //         },
              //         "name": "jeecg-tablist-JeecgOrderDMainList",
              //         "id": "6ad53fd1b220989a8b71ff482d683a5a"
              //       }, {
              //         "path": "/jeecg/JeecgOrderMainList",
              //         "component": "jeecg/JeecgOrderMainList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "一对多示例"
              //         },
              //         "name": "jeecg-JeecgOrderMainList",
              //         "id": "fb367426764077dcf94640c843733985"
              //       }, {
              //         "path": "/jeecg/JEditableTable",
              //         "component": "jeecg/JeecgEditableTableExample",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "JEditableTable示例"
              //         },
              //         "name": "jeecg-JEditableTable",
              //         "id": "7960961b0063228937da5fa8dd73d371"
              //       }, {
              //         "path": "/jeecg/tableTotal",
              //         "component": "jeecg/TableTotal",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "表格合计"
              //         },
              //         "name": "jeecg-tableTotal",
              //         "id": "043780fa095ff1b2bec4dc406d76f023"
              //       }, {
              //         "path": "/jeecg/PrintDemo",
              //         "component": "jeecg/PrintDemo",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "打印测试"
              //         },
              //         "name": "jeecg-PrintDemo",
              //         "id": "e6bfd1fcabfd7942fdd05f076d1dad38"
              //       }, {
              //         "path": "/jeecg/JeecgOrderMainListForJEditableTable",
              //         "component": "jeecg/JeecgOrderMainListForJEditableTable",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "一对多JEditable"
              //         },
              //         "name": "jeecg-JeecgOrderMainListForJEditableTable",
              //         "id": "c431130c0bc0ec71b0a5be37747bb36a"
              //       }, {
              //         "path": "/jeecg/jeecgPdfView",
              //         "component": "jeecg/JeecgPdfView",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "PDF预览"
              //         },
              //         "name": "jeecg-jeecgPdfView",
              //         "id": "e1979bb53e9ea51cecc74d86fd9d2f64"
              //       }, {
              //         "path": "/jeecg/JeecgTreeTable",
              //         "component": "jeecg/JeecgTreeTable",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "异步树列表Demo"
              //         },
              //         "name": "jeecg-JeecgTreeTable",
              //         "id": "0620e402857b8c5b605e1ad9f4b89350"
              //       }, {
              //         "path": "/jeecg/helloworld",
              //         "component": "jeecg/helloworld",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "helloworld"
              //         },
              //         "name": "jeecg-helloworld",
              //         "id": "339329ed54cf255e1f9392e84f136901"
              //       }, {
              //         "path": "bfa89e563d9509fbc5c6503dd50faf2e",
              //         "component": "layouts/IframePageView",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "百度",
              //           "url": "http://www.baidu.com"
              //         },
              //         "name": "http@--www.baidu.com",
              //         "id": "a400e4f4d54f79bf5ce160ae432231af"
              //       }, {
              //         "path": "/jeecg/imgDragSort",
              //         "component": "jeecg/ImgDragSort",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "图片拖拽排序"
              //         },
              //         "name": "jeecg-imgDragSort",
              //         "id": "265de841c58907954b8877fb85212622"
              //       }, {
              //         "path": "/jeecg/imgTurnPage",
              //         "component": "jeecg/ImgTurnPage",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "图片翻页"
              //         },
              //         "name": "jeecg-imgTurnPage",
              //         "id": "58b9204feaf07e47284ddb36cd2d8468"
              //       }, {
              //         "path": "/jeecg/splitPanel",
              //         "component": "jeecg/SplitPanel",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "分屏"
              //         },
              //         "name": "jeecg-splitPanel",
              //         "id": "3fac0d3c9cd40fa53ab70d4c583821f8"
              //       }, {
              //         "path": "/jeecg/InterfaceTest",
              //         "component": "jeecg/InterfaceTest",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "数据回执模拟"
              //         },
              //         "name": "jeecg-InterfaceTest",
              //         "id": "c6cf95444d80435eb37b2f9db3971ae6"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "qrcode",
              //         "title": "常见案例"
              //       },
              //       "name": "jeecg",
              //       "id": "2a470fc0c3954d9dbb61de6d80846549"
              //     }, {
              //       "path": "/result",
              //       "component": "layouts/PageView",
              //       "route": "1",
              //       "children": [{
              //         "path": "/result/success",
              //         "component": "result/Success",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "成功"
              //         },
              //         "name": "result-success",
              //         "id": "00a2a0ae65cdca5e93209cdbde97cbe6"
              //       }, {
              //         "path": "/result/fail",
              //         "component": "result/Error",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "失败"
              //         },
              //         "name": "result-fail",
              //         "id": "13212d3416eb690c2e1d5033166ff47a"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "check-circle-o",
              //         "title": "结果页"
              //       },
              //       "name": "result",
              //       "id": "2e42e3835c2b44ec9f7bc26c146ee531"
              //     }, {
              //       "path": "/profile",
              //       "component": "layouts/RouteView",
              //       "route": "1",
              //       "children": [{
              //         "path": "/profile/basic",
              //         "component": "profile/basic/Index",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "基础详情页"
              //         },
              //         "name": "profile-basic",
              //         "id": "cc50656cf9ca528e6f2150eba4714ad2"
              //       }, {
              //         "path": "/profile/advanced",
              //         "component": "profile/advanced/Advanced",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "高级详情页"
              //         },
              //         "name": "profile-advanced",
              //         "id": "b3c824fc22bd953e2eb16ae6914ac8f9"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "profile",
              //         "title": "详情页"
              //       },
              //       "name": "profile",
              //       "id": "4875ebe289344e14844d8e3ea1edd73f"
              //     }, {
              //       "path": "/form",
              //       "component": "layouts/PageView",
              //       "route": "1",
              //       "children": [{
              //         "path": "/form/base-form",
              //         "component": "form/BasicForm",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "基础表单"
              //         },
              //         "name": "form-base-form",
              //         "id": "277bfabef7d76e89b33062b16a9a5020"
              //       }, {
              //         "path": "/form/step-form",
              //         "component": "form/stepForm/StepForm",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "分步表单"
              //         },
              //         "name": "form-step-form",
              //         "id": "6531cf3421b1265aeeeabaab5e176e6d"
              //       }, {
              //         "path": "/form/advanced-form",
              //         "component": "form/advancedForm/AdvancedForm",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "高级表单"
              //         },
              //         "name": "form-advanced-form",
              //         "id": "e5973686ed495c379d829ea8b2881fc6"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "form",
              //         "title": "表单页"
              //       },
              //       "name": "form",
              //       "id": "e3c13679c73a4f829bcff2aba8fd68b1"
              //     }, {
              //       "path": "/list",
              //       "component": "layouts/PageView",
              //       "route": "1",
              //       "children": [{
              //         "path": "/list/query-list",
              //         "component": "list/TableList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "查询表格"
              //         },
              //         "name": "list-query-list",
              //         "id": "418964ba087b90a84897b62474496b93"
              //       }, {
              //         "path": "/list/edit-table",
              //         "component": "list/TableInnerEditList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "内联编辑表格"
              //         },
              //         "name": "list-edit-table",
              //         "id": "ae4fed059f67086fd52a73d913cf473d"
              //       }, {
              //         "path": "/list/user-list",
              //         "component": "list/UserList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "用户列表"
              //         },
              //         "name": "list-user-list",
              //         "id": "05b3c82ddb2536a4a5ee1a4c46b5abef"
              //       }, {
              //         "path": "/list/role-list",
              //         "component": "list/RoleList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "角色列表"
              //         },
              //         "name": "list-role-list",
              //         "id": "4f84f9400e5e92c95f05b554724c2b58"
              //       }, {
              //         "path": "/list/permission-list",
              //         "component": "list/PermissionList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "权限列表"
              //         },
              //         "name": "list-permission-list",
              //         "id": "73678f9daa45ed17a3674131b03432fb"
              //       }, {
              //         "path": "/list/basic-list",
              //         "component": "list/StandardList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "标准列表"
              //         },
              //         "name": "list-basic-list",
              //         "id": "f23d9bfff4d9aa6b68569ba2cff38415"
              //       }, {
              //         "path": "/list/card",
              //         "component": "list/CardList",
              //         "route": "1",
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "卡片列表"
              //         },
              //         "name": "list-card",
              //         "id": "7ac9eb9ccbde2f7a033cd4944272bf1e"
              //       }, {
              //         "path": "/list/search",
              //         "component": "list/search/SearchLayout",
              //         "route": "1",
              //         "children": [{
              //           "path": "/list/search/application",
              //           "component": "list/TableList",
              //           "route": "1",
              //           "meta": {
              //             "keepAlive": false,
              //             "internalOrExternal": false,
              //             "title": "搜索列表（应用）"
              //           },
              //           "name": "list-search-application",
              //           "id": "200006f0edf145a2b50eacca07585451"
              //         }, {
              //           "path": "/list/search/article",
              //           "component": "list/TableList",
              //           "route": "1",
              //           "meta": {
              //             "keepAlive": false,
              //             "internalOrExternal": false,
              //             "title": "搜索列表（文章）"
              //           },
              //           "name": "list-search-article",
              //           "id": "078f9558cdeab239aecb2bda1a8ed0d1"
              //         }, {
              //           "path": "/list/search/project",
              //           "component": "list/TableList",
              //           "route": "1",
              //           "meta": {
              //             "keepAlive": false,
              //             "internalOrExternal": false,
              //             "title": "搜索列表（项目）"
              //           },
              //           "name": "list-search-project",
              //           "id": "de13e0f6328c069748de7399fcc1dbbd"
              //         }],
              //         "meta": {
              //           "keepAlive": false,
              //           "internalOrExternal": false,
              //           "title": "搜索列表"
              //         },
              //         "name": "list-search",
              //         "id": "fb07ca05a3e13674dbf6d3245956da2e"
              //       }],
              //       "meta": {
              //         "keepAlive": false,
              //         "internalOrExternal": false,
              //         "icon": "table",
              //         "title": "列表页"
              //       },
              //       "name": "list",
              //       "id": "540a2936940846cb98114ffb0d145cb8"
              //     }],
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "icon": "layout",
              //       "title": "DEMO"
              //     },
              //     "name": "demo",
              //     "id": "1240582498747314177"
              //   }, {
              //     "path": "/online/cgformInnerTableList/:code",
              //     "component": "modules/online/cgform/auto/innerTable/OnlCgformInnerTableList",
              //     "route": "1",
              //     "hidden": true,
              //     "meta": {
              //       "keepAlive": false,
              //       "internalOrExternal": false,
              //       "title": "AUTO在线内嵌子表"
              //     },
              //     "name": "online-cgformInnerTableList-@code",
              //     "id": "1235823781053313025"
              //   }],
              //   "meta": {
              //     "keepAlive": false,
              //     "internalOrExternal": false,
              //     "icon": "cloud",
              //     "title": "在线开发"
              //   },
              //   "name": "online",
              //   "id": "e41b69c57a941a3bbcce45032fe57605"
              // },
              // 会议室
              {
                redirect: null,
                path: '/meetingRoom',
                component: 'layouts/RouteView',
                route: '1',
                children: [
                  {
                    path: '/meetingRoom/RoomInformation',
                    component: 'meetingRoom/RoomInformation',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,

                      title: '会议室管理'
                    },
                    name: 'meetingRoom-Information',
                    id: '1245154570166390786'
                  },
                  {
                    path: '/meetingRoom/AppointmentPersonal',
                    component: 'meetingRoom/AppointmentPersonal',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '会议室预约'
                    },
                    name: 'meetingRoom-AppointmentPersonal',
                    id: '1245154914959151105'
                  },
                  {
                    path: '/meetingRoom/AppointmentNotice',
                    component: 'meetingRoom/AppointmentNotice',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '短信通知日志'
                    },
                    name: 'meetingRoom-AppointmentNotice',
                    id: '1245154914959151105'
                  },
                  {
                    path: '/meetingRoom/AppointmentManagement',
                    component: 'meetingRoom/AppointmentManagement',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '预约管理'
                    },
                    name: 'meetingRoom-AppointmentManagement',
                    id: '1245154914959151105'
                  },
                  {
                    path: '/meetingRoom/UseStatistics',
                    component: 'meetingRoom/UseStatistics',
                    route: '1',
                    meta: {
                      keepAlive: false,
                      internalOrExternal: false,
                      title: '预约统计'
                    },
                    name: 'meetingRoom-UseStatistics',
                    id: '1245154050731200514'
                  }
                ],
                meta: {
                  keepAlive: false,
                  internalOrExternal: false,
                  icon: 'phone',
                  title: '会议室预约'
                },
                name: 'meetingRoomAppointmen',
                id: '08e6b9dc3c04489c8e1ff2ce6f105aa4'
              }
            ]
          },
          timestamp: 1625195766991
        }
        let v_token = Vue.ls.get(ACCESS_TOKEN)
        let params = { token: v_token }
        const menuData = response.result.menu
        const authData = response.result.auth
        const allAuthData = response.result.allAuth
        //Vue.ls.set(USER_AUTH,authData);
        sessionStorage.setItem(USER_AUTH, JSON.stringify(authData))
        sessionStorage.setItem(SYS_BUTTON_AUTH, JSON.stringify(allAuthData))
        if (menuData && menuData.length > 0) {
          //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
          menuData.forEach((item, index) => {
            if (item['children']) {
              let hasChildrenMenu = item['children'].filter(i => {
                return !i.hidden || i.hidden == false
              })
              if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
                item['hidden'] = true
              }
            }
          })
          console.log(' menu show json ', menuData)
          //update--end--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
          commit('SET_PERMISSIONLIST', menuData)
        } else {
          reject('getPermissionList: permissions must be a non-null array !')
        }
        resolve(response)

        // queryPermissionsByUser(params).then(response => {
        //   const menuData = response.result.menu;
        //   const authData = response.result.auth;
        //   const allAuthData = response.result.allAuth;
        //   //Vue.ls.set(USER_AUTH,authData);
        //   sessionStorage.setItem(USER_AUTH,JSON.stringify(authData));
        //   sessionStorage.setItem(SYS_BUTTON_AUTH,JSON.stringify(allAuthData));
        //   if (menuData && menuData.length > 0) {
        //     //update--begin--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
        //     menuData.forEach((item, index) => {
        //       if (item["children"]) {
        //         let hasChildrenMenu = item["children"].filter((i) => {
        //           return !i.hidden || i.hidden == false
        //         })
        //         if (hasChildrenMenu == null || hasChildrenMenu.length == 0) {
        //           item["hidden"] = true
        //         }
        //       }
        //     })
        //     console.log(" menu show json ", menuData)
        //     //update--end--autor:qinfeng-----date:20200109------for：JEECG-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
        //     commit('SET_PERMISSIONLIST', menuData)
        //   } else {
        //     reject('getPermissionList: permissions must be a non-null array !')
        //   }
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        let logoutToken = state.token
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONLIST', [])
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
        //console.log('logoutToken: '+ logoutToken)
        logout(logoutToken)
          .then(() => {
            //let sevice = "http://"+window.location.host+"/";
            //let serviceUrl = encodeURIComponent(sevice);
            //window.location.href = window._CONFIG['casPrefixUrl']+"/logout?service="+serviceUrl;
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    },
    // 第三方登录
    ThirdLogin({ commit }, token) {
      return new Promise((resolve, reject) => {
        thirdLogin(token)
          .then(response => {
            if (response.code == '200') {
              const result = response.result
              const userInfo = result.userInfo
              Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.token)
              commit('SET_INFO', userInfo)
              commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname, welcome: welcome() })
              commit('SET_AVATAR', userInfo.avatar)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
