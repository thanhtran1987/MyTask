export interface IConfig {
  pageTheme: string[];
  pageLayOut: string[];
}
export interface INavigation {
  label: string;
  value: string;
}

export const pageNavigation: INavigation[] = [
  {
    label: "My Tasks",
    value: "/",
  },
  {
    label: "Add Task",
    value: "/add",
  },
  {
    label: "Setting",
    value: "/setting",
  },
];
