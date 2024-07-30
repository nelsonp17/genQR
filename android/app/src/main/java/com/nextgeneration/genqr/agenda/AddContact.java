package com.nextgeneration.genqr.agenda;

import android.app.Activity;
import android.Manifest;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.net.Uri;
import android.provider.ContactsContract;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class AddContact extends Activity{
    public void create(){
        // Verificar permisos (necesario a partir de Android 6.0)
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.WRITE_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            // Solicitar permiso
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_CONTACTS}, 1);
            return;
        }

        // Crear un nuevo contacto
        ContentValues values = new ContentValues();
        values.put(ContactsContract.CommonDataKinds.Phone.NUMBER, "1234567890");
        values.put(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE);
        values.put(ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME, "Nuevo Contacto");

        // Insertar el contacto
        ContentResolver cr = getContentResolver();
        Uri uri = cr.insert(ContactsContract.Contacts.CONTENT_URI, values);

    }

    public void agregarContacto(String nombre, String telefono) {
        // Verificar permisos
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.WRITE_CONTACTS}, 1);
            return;
        }

        ContentValues values = new ContentValues();
        values.put(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME, nombre);
        values.put(ContactsContract.CommonDataKinds.Phone.NUMBER, telefono);

        ContentResolver contentResolver = getContentResolver();
        Uri uri = contentResolver.insert(ContactsContract.Contacts.CONTENT_URI, values);

        if (uri != null) {
            // Obtener el ID del contacto recién creado
            long contactId = ContentUris.parseId(uri);

            // Agregar el número de teléfono
            ContentValues phoneValues = new ContentValues();
            phoneValues.put(ContactsContract.CommonDataKinds.Phone.CONTACT_ID, contactId);
            phoneValues.put(ContactsContract.CommonDataKinds.Phone.NUMBER, telefono);
            phoneValues.put(ContactsContract.CommonDataKinds.Phone.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE);

            contentResolver.insert(ContactsContract.Data.CONTENT_URI,
                    phoneValues);


            Toast.makeText(this, "Contacto agregado correctamente", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(this, "Error al agregar contacto", Toast.LENGTH_SHORT).show();
        }
    }
}
