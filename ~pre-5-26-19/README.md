# UPB Event Check-In Mobile App

This repository is for the development of the mobile application for checking into campuse events at the University of Pittsburgh at Bradford. The project uses [Cordova](https://cordova.apache.org/) to run on both iOS and Android so that anyone with a smartphone can check into events using primarily NFC. The backend of the project is handled through [Google Firebase](https://firebase.google.com/) using the Firestore and Firebase Storage. 

## Idea
The idea is that students (or faculty) could register as "Going" to an event with relative ease. The data gathered from this could help the university tailor their events to what students overall enjoy. 

Students are also rewarded with "points" for each event they attend, and those points could be required to earn any number of things at events. e.g. VIP status, prizes, upb swag.

## Showcase
Below are some images of the current state of the app.

TODO



## Up and Running : Android (May not be up to date)
To get the application up and running on your machine follow these steps.

1. Download and install the [Oracle JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html), or Java Development Kit.
2. Download and install the [Android SDK](https://developer.android.com/studio#downloads).
    * Easiest way to do this is to download [Android Studio](https://developer.android.com/studio#downloads)
    * Note that this step requires the enviorment variable JAVA_HOME as a prequisite. More info can be found on how to do that [here](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)
    * During this step, if not downloading Android Studio, you will be required to set your ANDROID_HOME environment variable. 
3. Download and install Grade.
    * If you chose the Android Studio route, this should be installed automatically.
    * If you're on a debian based linux this can be done rather easily.

            sudo apt install gradle

4. Download the Cordova NPM package

    npm install -g Cordova

5. In the Checkinator Directory, add the Cordova Android platform.

        cordova platform add android

6. Run the Cordova App

        cordova run android