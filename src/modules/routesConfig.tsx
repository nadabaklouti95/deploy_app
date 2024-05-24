export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: "Workspace",
    title: "Workspace",
    messageId: "Workspace",
    type: "item",
    icon: "storeMallDirector",
    url: "/workspace",
  },
  {
    id: "Store",
    title: "Store",
    messageId: "sidebar.store",
    type: "item",
    icon: "storeMallDirector",
    url: "/store",
  },
  {
    id: "Context",
    title: "Context",
    messageId: "sidebar.context",
    type: "item",
    icon: "cable",
    url: "/context",
  },
  {
    id: "Properties",
    title: "Properties",
    messageId: "Properties",
    type: "item",
    icon: "schema",
    url: "/properties",
  },
  {
    id: "Import / Export",
    title: "Import / Export",
    messageId: "Import / Export",
    type: "collapse",
    icon: "upload",
    children: [
      {
        id: "Import",
        title: "Import",
        messageId: "Import",
        type: "item",
        icon: "upload",
        url: "/upload",
      },
      {
        id: "Export",
        title: "Export",
        messageId: "Export",
        type: "item",
        icon: "upload",
        url: "/export",
      },
    ],
  },
  {
    id: "Tags",
    title: "Tags",
    messageId: "Tags",
    type: "item",
    icon: "loyalty",
    url: "/tags",
  },
  {
    id: "Publish",
    title: "Publish",
    messageId: "Publish",
    type: "item",
    icon: "publishIcon",
    url: "/publish",
  },

  {
    id: "Workflow",
    title: "Workflow",
    messageId: "Workflow",
    type: "item",
    icon: "ruleFolder",
    url: "/sample/page-7",
  },

  {
    id: "Tasks",
    title: "Tasks",
    messageId: "Task",
    type: "collapse",
    icon: "ruleFolder",
    children: [
      {
        id: "Task",
        title: "Task",
        messageId: "Task",
        type: "item",
        icon: "schema",
        url: "/csTask",
      },
      {
        id: "taskAdmin",
        title: "Task Admin",
        messageId: "Task Admin",
        type: "item",
        icon: "schema",
        url: "/task/admin",
      },
      {
        id: "mergeTag",
        title: "Merge Tag",
        messageId: "Merge Tag",
        type: "item",
        icon: "loyalty",
        url: "/mergeTag",
      },
    ],
  },
  {
    id: "Users&Groups",
    title: "Users&Groups",
    messageId: "Users & Groups",
    type: "collapse",
    icon: "groups",
    children: [
      {
        id: "Users",
        title: "Users",
        messageId: "Users",
        type: "item",
        icon: "group",
        url: "/user",
      },
      {
        id: "Groups",
        title: "Groups",
        messageId: "Groups",
        type: "item",
        icon: "folderShared",
        url: "/userGroupes",
      }
    ],
  },

  {
    id: "Settings",
    title: "Settings",
    messageId: "Settings",
    type: "collapse",
    icon: "settings",
    children: [
      {
        id: "Security",
        title: "Security",
        messageId: "Security",
        type: "item",
        icon: "security",
        url: "/sample/page-10",
      },
      {
        id: "Clean Up",
        title: "Clean Up",
        messageId: "Clean Up",
        type: "item",
        icon: "wash",
        url: "/sample/page-11",
      },
      {
        id: "Token",
        title: "Token",
        messageId: "Token",
        type: "item",
        icon: "wash",
        url: "/token",
      },
    ],
  },
  {
    id: "Revision",
    title: "Revision",
    messageId: "Revision",
    type: "collapse",
    icon: "biotech",
    children: [
      {
        id: "property_revision",
        title: "property Revision",
        messageId: "Property",
        type: "item",
        icon: "schema",
        url: "/revision/property",
      },
    ],
  },

];
export default routesConfig;
