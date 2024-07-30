package com.nextgeneration.genqr;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.nextgeneration.genqr.agenda.AddContact;

@CapacitorPlugin(name = "Contact")
public class ContactPlugin extends Plugin {
    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }

    @PluginMethod()
    public void add_new(PluginCall call) {
        AddContact contact = new AddContact();
        contact.create(); // crea el contacto


        JSObject ret = new JSObject();
        ret.put("value", true);
        call.resolve(ret);
    }

    @PluginMethod()
    public void add_new2(PluginCall call) {
        AddContact contact = new AddContact();
        contact.agregarContacto("Jose Perez", "+584242102537"); // crea el contacto


        JSObject ret = new JSObject();
        ret.put("value", true);
        call.resolve(ret);
    }
}
