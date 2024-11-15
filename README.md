# Pulse-mobile

//////////////////////////////////////////////////////////////     IOS RELEASE BUILD     //////////////////////////////////////////////////////////////


Steps to Follow for Creating a New iOS Build:

1) Update the eas.json File:

 • Navigate to the eas.json file located at the root of the project.
 • Find line 12 and update the channel name to reflect the version you’re releasing. For example, if you’re releasing version 1.0.1, set the channel name to something like prod-1.    Ensure the version in the channel name aligns with the version you are deploying for that release.
 
2) Update the buildNumber in app.config.js:

 • Open the app.config.js file at the root level of your project.
 • Go to line 20 and update the buildNumber to reflect the new build version. This number should increment with each new release to differentiate between builds.

3) Update CFBundleShortVersionString in info.plist:

 • Open the info.plist file located at ios/boiler/info.plist.
 • On line 22, update the value of CFBundleShortVersionString to the specific version of the app you are about to release (e.g., 1.0.1). This version represents the public-facing version number of the app.

4) Update CFBundleVersion in info.plist:

 • Still in the info.plist file, navigate to line 35 and update the CFBundleVersion value. This value should reflect the specific build number (not the app version) and must increment with each new release.

5) Run the Build Command:

 • Once all the changes are made, execute the build command by running: "yarn build-ios"
 • This command is already defined in the package.json file and will generate the iOS build for release.

By following these steps, you'll ensure that all necessary versioning and build numbers are correctly updated before creating a new iOS build, preventing potential issues during deployment.







//////////////////////////////////////////////////////////////     ANDROID RELEASE BUILD     //////////////////////////////////////////////////////////////


Steps for Creating an Android Release Build:

1) Follow Step 1 from iOS Build:

 • Similar to the iOS build process, start by navigating to the eas.json file at the root level of your project.
 • Update the channel name at line 12 to reflect the version being released (e.g., prod-1.0.1). Make sure the channel name aligns with the version you’re releasing.
 
2) Update versionCode in app.config.js:

 • Open the app.config.js file located at the root of your project.
 • Update the versionCode at line 24 to reflect the new Android build version. This code should increment with every new Android release.

3) Update versionName and versionCode in build.gradle:

 • Navigate to android/app/build.gradle.
 • Update the versionName with the release version you’re about to publish (e.g., 1.0.1).
 • Also, update the versionCode here to the new version code for this release.

4) Run the Build Command:

 • Once all the changes are made, execute the build command by running: "yarn build-android"
 • This command is already defined in the package.json file and will generate the ANDROID build for release.

4) APK for Testing or App Bundle for Play Store:

 • If you want to generate an APK for testing, update the buildType at line 18 in the eas.json file to "apk". This will allow you to create an APK that can be directly installed on a device for testing.
 • If you are preparing a build for submission to the Play Store, update the buildType to "app-bundle".
 • After setting the correct build type, rerun the build command from Step 4. If building for the Play Store, simply upload the generated file to the Play Store.

This process will ensure you properly update versioning and build types based on the specific requirements, whether you’re creating an APK for testing or an app bundle for release on the Play Store.







//////////////////////////////////////////////////////////////     UPDATE BUILD DIRECTLY TO LIVE     //////////////////////////////////////////////////////////////


1) Run the Update Command:

 • If you need to update the build without creating a new release, use the command defined in the package.json file, "yarn update-stage".

2) Verify the Branch Name:

 • Ensure that the branch name specified at the end of line 11 in package.json matches the one used in the last release for both the Play Store and App Store. For instance, if the channel name in eas.json is set to "prod-1.0.1", then the corresponding command in package.json at line 11 should be, "eas update --branch prod-1.0.1".
 • This ensures that the correct branch is used for the update, keeping the release version consistent across platforms.


This version clarifies the process and emphasizes the importance of keeping the branch name consistent for updates.