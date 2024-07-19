
/* Algoritmo para formatear los datos para colocarlos en un QR */
export const formatDataQR = (data:any, typeData:string)=>{
    let formatted = {toString:'', data}
    if(typeData=='clipboard' || typeData=='url' || typeData=='text'){
        formatted.toString = data;
        formatted.data = data
    }

    if(typeData=='contact'){
        console.log(data.map((ele)=>ele))
        formatted.toString = data.map((ele)=>ele);
        formatted.data = data
    }

    return formatted;
}

/* Formulario render */
export const renderFormHtml = (e{typeElement:string, className:string, placeholder:string, name:string, label:any, labelClassName:any, value:any, cols:number=9, row:number=12, handleChange:Function}) => {
    let elemHtml:any, label:any;
    if(e.typeElement == 'input'){
        elemHtml = <input className={e.className} name={e.name} placeholder={e.placeholder} id={name} value={e.value} onChange={e.handleChange} />
    }else if(e.typeElement == 'select'){
        elemHtml = <select className={e.className} name={e.name} value={e.value} id={name} onChange={e.handleChange} ></select/>
    }else if(e.typeElement == 'textarea'){
        elemHtml = <textarea className={e.className} name={e.name} placeholder={e.placeholder} value={e.value} id={name} onChange={e.handleChange} cols={e.cols} rows={e.rows}></textarea>
    }

    if(e.label != '' || e.label == undefined || e.label != null){
        label = <label for={e.name} className={e.labelClassName}>{e.label}</label>
    }

    return label + elemHtml

}