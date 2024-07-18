
/* Algoritmo para formatear los datos para colocarlos en un QR */
export const formatDataQR = (data:any, typeData:string)=>{
    let formatted = {toString:'', data}
    if(typeData=='clipboard' || typeData=='url' || typeData=='text'){
        formatted.toString = data;
        formatted.data = data
    }

    return formatted;
}