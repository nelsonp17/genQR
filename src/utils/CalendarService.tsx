import { CapacitorCalendar, PluginPermission } from '@ebarooni/capacitor-calendar';

export const checkPermission = async ():Promise<boolean> => {
    let permission_read = await CapacitorCalendar.checkPermission({alias: PluginPermission.READ_CALENDAR})
    let permission_write = await CapacitorCalendar.checkPermission({alias: PluginPermission.WRITE_CALENDAR})

    if(permission_read.result == 'granted' || permission_write.result == 'granted'){
        return true;
    }

    return false;
}

export const requestPermission = async ():Promise<boolean> => {
    let permission_read = await CapacitorCalendar.requestPermission({alias: PluginPermission.READ_CALENDAR})
    let permission_write = await CapacitorCalendar.requestPermission({alias: PluginPermission.WRITE_CALENDAR})

    if(permission_read.result == 'granted' || permission_write.result == 'granted'){
        return true;
    }
    return false
}

export const createEvent = async (title:string, location:string, url:string, notes:string, _startDate:string, _endDate:string, isAllDay:boolean) => {
    const startDate = dateToTimestamp(_startDate);
    const endDate = dateToTimestamp(_endDate);
    
    const options = { 
        title, 
        //calendarId?: string; 
        location, 
        startDate,
        endDate,
        isAllDay, 
        //alertOffsetInMinutes?: number | number[]; 
        url, 
        notes
    }
    const event = await CapacitorCalendar.createEventWithPrompt(options)
    return event.result.length > 0
}

export function dateToTimestamp(date: string | number | Date) :number {
    try {
        // Crea un objeto Date a partir de la cadena de fecha
        const dateObj = new Date(date);
  
        // Obtiene el timestamp (milisegundos desde el 1 de enero de 1970)
        const timestamp = dateObj.getTime();
  
        return timestamp;
    } catch (error) {
        console.error('Error al convertir la fecha:', error);
        return 0; // Devuelve null en caso de error
    }
}
  
// Ejemplo de uso:
//const inputDate = '2024-08-09T16:11'; // Cambia esto a tu fecha
//const timestampResult = dateToTimestamp(inputDate);
//console.log('Timestamp resultante:', timestampResult);
  
const CalendarSevice = async (title:string, location:string, url:string, notes:string, _startDate:string, _endDate:string, isAllDay:boolean) => {
    // checkeamos los permisos
    const permission = await checkPermission();
    if(!permission){
        const permissionRequest = requestPermission();
        if(!permissionRequest) return false;
    }
    return await createEvent(title, location, url, notes, _startDate, _endDate, isAllDay)
}
export const PermissionCalendar = async () => {
    // checkeamos los permisos
    const permission = await checkPermission();
    if(!permission){
        const permissionRequest = requestPermission();
        if(!permissionRequest) return false;
    }
    return true;
}

export default CalendarSevice;