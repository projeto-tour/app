/**
 * Referente ao um objeto generico
 * 
 * @param id 
 * @param descricao 
 * @param status 
 */
export class Item {
    id: number;
    constructor(public descricao: string = "",
        public status: boolean = false) {

    }
}