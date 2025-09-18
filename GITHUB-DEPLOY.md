# 🐙 GitHub Pages Deployment Guide

## 🚀 Step-by-Step GitHub Pages Deployment

### 📋 **Files to Upload**
Make sure you have these files ready:
```
McBirthDay/
├── index.html          ← Main page
├── styles.css          ← All styling
├── script.js           ← Functionality
├── images/             ← Photo folder
│   ├── Happy Birthday.jpg
│   ├── LONG0842.jpg
│   ├── LONG0865.jpg
│   ├── LONG0879.jpg
│   ├── LONG0894.jpg
│   ├── LONG0917.jpg
│   ├── LONG0963.jpg
│   ├── LONG0972.jpg
│   ├── LONG0978.jpg
│   └── LONG1020.jpg
└── README.md           ← Documentation
```

### 📤 **Upload Method 1: Web Interface (Easiest)**

1. **Go to your repository** on GitHub
2. **Click** "uploading an existing file" link
3. **Drag and drop** ALL your files at once:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`
4. **For images folder:**
   - Create folder by typing `images/` before filename
   - Upload each image file
   - Or drag the entire images folder
5. **Commit message:** "🎉 Add Minh Châu's 1st birthday page"
6. **Click** "Commit changes"

### 📤 **Upload Method 2: GitHub Desktop (User-Friendly)**

1. **Download** GitHub Desktop from [desktop.github.com](https://desktop.github.com)
2. **Clone** your repository to your computer
3. **Copy** all your files into the local repository folder
4. **Commit** changes with message: "Add birthday page files"
5. **Push** to GitHub

### 🌐 **Step 4: Enable GitHub Pages**

1. **Go to** your repository on GitHub
2. **Click** "Settings" tab (top right of repo)
3. **Scroll down** to "Pages" section (left sidebar)
4. **Source:** Select "Deploy from a branch"
5. **Branch:** Select "main" (or "master")
6. **Folder:** Select "/ (root)"
7. **Click** "Save"

### ✅ **Step 5: Get Your Live URL**

After 5-10 minutes, your site will be live at:
```
https://YOURUSERNAME.github.io/minh-chau-birthday
```

Replace `YOURUSERNAME` with your actual GitHub username.

### 🔧 **Pro Tips**

**Custom Domain (Optional):**
- In Pages settings, add custom domain like `minhchaubirthday.com`
- Requires purchasing domain separately

**Update Your Site:**
- Edit files directly on GitHub, or
- Upload new versions of files
- Changes appear within 10 minutes

**Make Repository Private (Paid Feature):**
- Upgrade to GitHub Pro for private repositories with Pages
- Keep code private while site remains public

### 📱 **Share Your Site**

Once live, share your GitHub Pages URL:
- **WhatsApp:** "Check out Minh Châu's birthday page: https://yourusername.github.io/minh-chau-birthday"
- **Email:** Include link in invitations
- **Social Media:** Post the link
- **QR Code:** Generate QR code pointing to your URL

### 🛠 **Troubleshooting**

**Site not loading?**
- Wait 10-15 minutes after enabling Pages
- Check if `index.html` is in root folder
- Ensure repository is public

**Images not showing?**
- Verify images are in `images/` folder
- Check file names match exactly (case-sensitive)
- Make sure images uploaded completely

**Need to make changes?**
- Edit files directly on GitHub
- Or upload new versions
- GitHub automatically rebuilds the site

### 🎯 **Quick Command Line Method (Advanced)**

If you prefer terminal:
```bash
# Navigate to your project folder
cd /Users/macbookm2/Desktop/Ringkas/McBirthDay

# Initialize git repository
git init

# Add all files
git add .

# First commit
git commit -m "🎉 Initial commit - Minh Châu's birthday page"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOURUSERNAME/minh-chau-birthday.git

# Push to GitHub
git push -u origin main
```

### 🎉 **Success Checklist**

- [ ] Repository created on GitHub
- [ ] All files uploaded (HTML, CSS, JS, images)
- [ ] GitHub Pages enabled in Settings
- [ ] Site accessible at yourusername.github.io/repo-name
- [ ] Images and carousel working
- [ ] Contact information updated
- [ ] Ready to share with family and friends!

**Your beautiful birthday page for Minh Châu will be live and accessible to everyone! 🎂✨**
