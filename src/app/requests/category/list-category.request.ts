import { convertDateToRequest } from "@shared/functions/helpers";
import { params } from "src/app/commons/params-api.interface";

// Todo para poder paginar y filtrar los parametros de la peticion en el front
export class ListCategoryRequest extends params {
    constructor(
        numPage: number,
        order: 'desc' | 'asc',
        sort: string,
        records: 10 | 20 | 50,
        numFilter: number = 0,
        textFilter: string = "",
        stateFilter: number = null,
        private startDate: string, // Fecha inicio de creacion
        private endDate: string // Fecha fin de creacion
    ) {
        super(
            true,
            numPage,
            order,
            sort,
            records,
            false,
            numFilter,
            textFilter,
            stateFilter
        )

        this.startDate = convertDateToRequest(this.startDate, 'date');
        this.endDate = convertDateToRequest(this.endDate, 'date');
    }
}