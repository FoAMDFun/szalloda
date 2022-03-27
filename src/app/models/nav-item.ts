export interface NavItem{
  _id: string;
  text: string,
  value:string,
  type: NavItemType
}

export enum NavItemType{
  ROUTERLINK,SELECT
}
