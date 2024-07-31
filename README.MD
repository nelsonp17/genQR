#https://www.npmjs.com/package/@anuradev/capacitor-contacts
#https://www.npmjs.com/package/javascript-barcode-reader
#https://www.npmjs.com/search?q=%40capacitor%2F&page=3&perPage=20
#https://coolors.co/visualizer/454ade-1b1f3b-b14aed-c874d9
#https://github.com/Fir3st/capacitor-calendar
#https://www.npmjs.com/package/capacitor-calendar
#https://capacitorjs.com/docs/plugins/community
#https://capacitorjs.com/docs/apis/barcode-scanner#capacitorbarcodescannertypehintalloption
#https://capacitorjs.com/docs/apis/filesystem#downloadfile
#https://www.npmjs.com/package/@capacitor/barcode-scanner
#https://phosphoricons.com/?q=%22%22
#https://capacitorjs.com/docs/apis/camera

#https://supabase.com/dashboard/project/tkrfsnotdiebjdspaqat/editor/29127
#https://coolors.co/palette/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8
#https://www.hyperui.dev/components/marketing/forms
#https://tailwindcomponents.com/component/gsap-3d-animation
#https://ionicframework.com/docs/api/toggle#events
#https://docs-demo.ionic.io/component/nav


#https://www.npmjs.com/package/capacitor-document-scanner-mod


#https://play.google.com/console/u/1/developers/8118882367239890415/app-list


# Ofuscar aplicación de Android, warning Play Console
Advertencia Este APK contiene código Java o Kotlin, que puede ser ofuscado. Te recomendamos que subas un archivo de desofuscación para facilitar el análisis y la depuración de los errores ANR y bloqueos. Más información

Esto se realiza con la siguiente configuración, principalmente la propiedad minifyEnabled true:

android {
    buildTypes {
        release {
            // Enables code shrinking, obfuscation, and optimization for only
            // your project's release build type.
            minifyEnabled true

            // Enables resource shrinking, which is performed by the
            // Android Gradle plugin.
            shrinkResources true

            // Includes the default ProGuard rules files that are packaged with
            // the Android Gradle plugin. To learn more, go to the section about
            // R8 configuration files.
            proguardFiles getDefaultProguardFile(
                    'proguard-android-optimize.txt'),
                    'proguard-rules.pro'
        }
    }
    ...
}

fuente [https://es.stackoverflow.com/questions/427607/ofuscar-aplicaci%C3%B3n-de-android-warning-play-console](https://es.stackoverflow.com/questions/427607/ofuscar-aplicaci%C3%B3n-de-android-warning-play-console)