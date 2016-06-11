/**
 * Referente ao menu do aplicativo
 * 
 * @param title 
 * @param pages 
 */
export interface Menu {
  title: string;
  pages: MenuItem[];
}

/**
 * Referente ao item de menu do aplicativo
 * 
 * @param title 
 * @param component 
 * @param index 
 * @param icon 
 */
export interface MenuItem {
  title: string;
  component: any;
  status: string;
  icon?: string;
}
