/**
 * Referente ao menu do aplicativo
 * 
 * @param title 
 * @param pages 
 */
export interface IMenu {
  title: string;
  pages: IMenuItem[];
}

/**
 * Referente ao item de menu do aplicativo
 * 
 * @param title 
 * @param component 
 * @param index 
 * @param icon 
 */
export interface IMenuItem {
  title: string;
  component: any;
  status: string;
  icon?: string;
}
