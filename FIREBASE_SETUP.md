# 🔥 Firebase Setup Guide for Time Capsule Messages

## ☁️ Why Use Firebase?

Firebase Firestore allows **all guests** to share time capsule messages in real-time! Messages are stored in the cloud and visible to everyone who visits the birthday site.

## 📋 Setup Instructions

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project (e.g., "minh-chau-birthday")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database
1. In your Firebase project, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose closest to your guests)
5. Click "Done"

### 3. Get Your Configuration
1. Go to "Project Settings" (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app (name: "Birthday Website")
5. Copy the `firebaseConfig` object

### 4. Update Your Code
Replace the `FIREBASE_CONFIG` in `script.js` with your real config:

```javascript
const FIREBASE_CONFIG = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```

### 5. Configure Security Rules
1. Go to "Firestore Database" → "Rules"
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reading and writing time capsule messages
    match /timeCapsuleMessages/{messageId} {
      allow read, write: if true;
    }
  }
}
```

3. Click "Publish"

## ✅ Testing

1. Open your website
2. Click the time capsule bottle 💌
3. Write a test message
4. Check Firebase Console → Firestore Database to see your message!

## 🚀 Features You'll Get

- **☁️ Real-time sharing**: All guests see each other's messages
- **🔄 Automatic sync**: Messages appear instantly for all visitors
- **💾 Backup**: Falls back to localStorage if Firebase fails
- **📱 Mobile friendly**: Works on all devices
- **🆓 Free tier**: Firebase free plan is generous for small events

## 🔧 Troubleshooting

**Messages not saving?**
- Check browser console for errors
- Verify your Firebase config is correct
- Make sure Firestore rules allow writing

**Using localhost?**
- Firebase works fine with localhost for development
- For production, deploy to a proper domain

## 💡 Tips

- **Share the link** with all guests so they can leave messages
- **Monitor Firebase Console** to see messages coming in real-time
- **Consider moderation** if you expect many guests

---

**Need help?** Check the browser console (F12) for detailed error messages!
