import { ProjectRole, Role } from './enums'

export const NOCO = 'noco'

export const SYSTEM_COLUMNS = ['id', 'title', 'created_at', 'updated_at']

export const BASE_FALLBACK_URL = process.env.NODE_ENV === 'production' ? '..' : 'http://localhost:8080'

export const DINGTALK_CONF =
  process.env.NODE_ENV === 'production'
    ? {
        AGENT_ID: process.env.NC_DT_AGENT_ID,
        APP_KEY: process.env.NC_DT_APP_KEY,
        APP_SECRET: process.env.NC_DT_APP_SECRET,
        OSS_URL: process.env.NC_DT_OSS_URL,
      }
    : {
        AGENT_ID: '2662676623',
        APP_KEY: 'dingx1amn58fc4tdnrjg',
        APP_SECRET: 'q0QFQoHXP_MaZ8mvbKS7HPjVHei8SQmpLjSi2_WGxj2czYOyDYtwOtESPPXnZ6-w',
        OSS_URL: 'https://dingbot.minws.com/#/sso/dingtalk',
      }
/**
 * Each permission value means the following
 * `*` - which is wildcard, means all permissions are allowed
 *  `include` - which is an object, means only the permissions listed in the object are allowed
 *  `exclude` - which is an object, means all permissions are allowed except the ones listed in the object
 *  `undefined` or `{}` - which is the default value, means no permissions are allowed
 * */
export const rolePermissions = {
  // general role permissions

  [Role.Super]: '*',
  [Role.Admin]: {} as Record<string, boolean>,
  [Role.Guest]: {} as Record<string, boolean>,
  [Role.OrgLevelCreator]: {
    include: {
      projectCreate: true,
      projectActions: true,
      projectSettings: true,
    },
  },

  // Project role permissions
  [ProjectRole.Creator]: {
    exclude: {
      appStore: true,
      superAdminUserManagement: true,
      superAdminAppSettings: true,
      appLicense: true,
    },
  },
  [ProjectRole.Owner]: {
    exclude: {
      appStore: true,
      superAdminUserManagement: true,
      superAdminAppSettings: true,
      appLicense: true,
    },
  },
  [ProjectRole.Editor]: {
    include: {
      smartSheet: true,
      xcDatatableEditable: true,
      column: true,
      tableAttachment: true,
      tableRowUpdate: true,
      dataInsert: true,
      rowComments: true,
      gridViewOptions: true,
      sortSync: true,
      fieldsSync: true,
      gridColUpdate: true,
      filterSync: true,
      filterChildrenRead: true,
      csvImport: true,
      apiDocs: true,
      projectSettings: true,
      newUser: false,
    },
  },
  [ProjectRole.Commenter]: {
    include: {
      smartSheet: true,
      column: true,
      rowComments: true,
      projectSettings: true,
    },
  },
  [ProjectRole.Viewer]: {
    include: {
      smartSheet: true,
      column: true,
      projectSettings: true,
    },
  },
} as const
