# 🎉 Birthday Party Landing Page

A beautiful, modern landing page to celebrate your daughter's birthday and invite guests to join the party!

## ✨ Features

- **Beautiful Design**: Modern, responsive design with animations and birthday-themed styling
- **Image Carousel**: Stunning photo gallery with auto-play and touch/swipe support
- **Parallax Animations**: Floating decorations and smooth scroll effects throughout
- **Party Details**: Customizable sections for date, time, location, and theme with contact info
- **Invitation Sharing**: Built-in sharing functionality for social media and messaging
- **Fullscreen Gallery**: Click any image to view in beautiful fullscreen mode
- **Mobile Responsive**: Perfect viewing experience on all devices
- **Accessibility**: Designed with accessibility best practices

## 🚀 Quick Start

1. **Open the landing page**: Simply open `index.html` in any modern web browser
2. **Customize party details**: Edit the configuration in `script.js` (see customization section below)
3. **Share with guests**: Use the built-in sharing feature or send the link directly

## 🎨 Customization

### Party Details

Edit the `PARTY_CONFIG` object in `script.js` to customize your party:

```javascript
const PARTY_CONFIG = {
    daughter: {
        name: "Emma", // ← Change to your daughter's name
        age: "7th"    // ← Change to the birthday age (e.g., "5th", "8th")
    },
    details: {
       date: "Saturday, September 27, 2025",  // Party date
       time: "11:00 AM",                      // Party time
       location: "SESAN Restaurant, 14 Einstein St., Bình Thọ, Thủ Đức", // Party location
       theme: "Dress in Your Own Style"      
    },
    contact: {
        phone: "+1 (555) 123-4567",              // ← Your phone number
        email: "party@example.com",               // ← Your email
        address: "123 Birthday Street, Celebration City, ST 12345" // ← Your address
    }
};
```

### Colors and Styling

To customize the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #ff6b9d;    /* Main pink color */
    --secondary-color: #ffd93d;  /* Yellow accent */
    --accent-color: #6bcf7f;     /* Green accent */
    /* ... other colors */
}
```

### Adding Photos to the Carousel

The carousel automatically displays all images from your `images` folder:

1. **Add your photos** to the `images` folder (supported formats: .jpg, .jpeg, .png, .gif)
2. **Update image references** in `index.html` if you add new photos:
   ```html
   <div class="carousel-slide">
       <img src="images/your-new-photo.jpg" alt="Description" loading="lazy">
       <div class="slide-caption">
           <h3>🎉 Your Title 🎉</h3>
           <p>Your description</p>
       </div>
   </div>
   ```
3. **Add corresponding indicator** in the indicators section
4. **Customize captions** to match your photos and memories

### Carousel Features

- **Auto-play**: Slides change automatically every 4 seconds
- **Navigation**: Previous/Next buttons and indicator dots
- **Touch Support**: Swipe left/right on mobile devices
- **Keyboard Controls**: Arrow keys, spacebar (play/pause), F (fullscreen)
- **Fullscreen Mode**: Click any image or use the fullscreen button
- **Responsive**: Adapts perfectly to all screen sizes
- **Parallax Integration**: Floating camera and photo-themed decorations

## 📱 Using the Landing Page

### For Party Organizers

1. **Customize the details** using the instructions above
2. **Add your photos** to the carousel gallery
3. **Share the invitation** using the share button or by copying the URL
4. **Monitor engagement** through the browser console (logs interactions)

### For Guests

1. **View party details** in the Party Details section
2. **Browse the photo gallery** to see beautiful memories
3. **Contact the organizer** using the contact information in the Special Notes section

## 🔧 Technical Features

### Photo Gallery

- **Auto-play carousel**: Smooth transitions between photos
- **Touch/swipe support**: Mobile-friendly navigation
- **Fullscreen viewing**: Click any image for immersive experience
- **Lazy loading**: Optimized performance for faster loading

### Sharing System

- **Native Sharing**: Uses Web Share API when available
- **Fallback**: Copies invitation text to clipboard
- **Social Media**: Easy sharing to social platforms

### Accessibility

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **High Contrast**: Readable color combinations
- **Reduced Motion**: Respects user's motion preferences

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: Uses modern CSS and JavaScript features with graceful fallbacks

## 📊 Analytics & Tracking

The landing page includes basic analytics tracking for:

1. **Page visits**: Track when people view your invitation
2. **Gallery interactions**: Monitor which photos are viewed most
3. **Navigation patterns**: See which sections guests visit
4. **Sharing activity**: Track invitation sharing

### Viewing Analytics Data

Analytics events are logged to the browser console. In production, you can:
- Integrate with Google Analytics or similar services
- Set up custom tracking endpoints
- Monitor engagement patterns

## 🎯 Deployment Options

### 🚀 **Recommended: Netlify (Easiest)**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Deploy manually"
3. Drag your entire `McBirthDay` folder to the deployment area
4. Get instant URL like: `minh-chau-birthday.netlify.app`
5. Share with family and friends!

### 🐙 **GitHub Pages (Most Popular)**
1. Create account at [github.com](https://github.com)
2. Create new repository: `minh-chau-birthday`
3. Upload all your files
4. Enable GitHub Pages in Settings
5. Site live at: `yourusername.github.io/minh-chau-birthday`

### ⚡ **Other Options**
- **Vercel**: [vercel.com](https://vercel.com) - Fast and modern
- **Firebase**: [firebase.google.com](https://firebase.google.com) - Google's hosting
- **Surge.sh**: Simple command-line deployment

### 📋 **Pre-Deployment Checklist**
- [ ] Update party details in `script.js`
- [ ] Test locally by opening `index.html`
- [ ] Verify all images are in `images/` folder
- [ ] Run `deploy-check.html` to verify readiness

### 🌐 **Sharing Your Site**
Once deployed, share via:
- Direct link in text messages
- Email invitations
- Social media posts
- QR codes for physical invitations
- WhatsApp family groups

## 🛠 Development

### File Structure
```
McBirthDay/
├── index.html      # Main HTML file with gallery carousel
├── styles.css      # All styling, animations, and parallax effects
├── script.js       # Interactive functionality and carousel
├── images/         # Birthday photos for the carousel
└── README.md       # This documentation
```

### Making Changes
1. **Content**: Edit HTML for structural changes
2. **Styling**: Modify CSS for visual customizations  
3. **Functionality**: Update JavaScript for feature changes
4. **Testing**: Always test changes in multiple browsers

## 🎁 Tips for a Great Party Page

1. **Personal Touch**: Add specific details about your daughter's interests
2. **Clear Information**: Make sure all party details are accurate and clear
3. **RSVP Deadline**: Consider adding an RSVP deadline to the party details
4. **Special Instructions**: Use the special notes section for any important information
5. **Contact Options**: Provide multiple ways for guests to reach you

## 🆘 Troubleshooting

### Common Issues

**RSVP form not working?**
- Check browser console for errors
- Ensure JavaScript is enabled
- Try refreshing the page

**Styling looks broken?**
- Clear browser cache
- Check if CSS file is loading properly
- Try a different browser

**Page not responsive on mobile?**
- Check viewport meta tag in HTML
- Test in mobile browser or developer tools

## 📞 Support

For technical assistance or feature requests:
- Check the browser console for error messages
- Test in different browsers
- Review the customization instructions above

## 🎉 Have a Wonderful Party!

We hope this landing page helps make your daughter's birthday celebration extra special! The combination of beautiful design and practical functionality should make it easy for guests to learn about the party and RSVP.

Remember to customize all the party details before sharing, and don't forget to test the RSVP form to make sure everything works perfectly.

**Happy Birthday to your daughter!** 🎂✨
