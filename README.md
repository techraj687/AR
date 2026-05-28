# 🎂 The Ultimate Birthday Website 💕

A romantic, fully responsive birthday website created with love for someone special.

## Features

### 🌟 Interactive Sections

1. **Birthday Star Gatekeeper** 💫
   - Landing page with playful "Will you be my Birthday Star?" prompt
   - Yes button leads to dashboard
   - No button that runs away when hovered (fun interaction)

2. **Birthday Letter** 💌
   - Elegant animated letter card
   - Opens with smooth GSAP animations
   - Heartfelt, personalized message

3. **Why I Love You** ❤️
   - 10 reasons why you love them
   - Fade-in scroll animations
   - Personalized content

4. **Photo Gallery** 📸
   - Grid layout with hover effects
   - Memory labels appear on hover
   - Smooth zoom and rotation animations
   - Responsive design

5. **Birthday Quiz** 🎯
   - Multi-step questions
   - Sweet messages on answers
   - Interactive feedback

6. **Love Match Game** 🎮
   - Card-matching game
   - Pairs reveal parts of secret message
   - Final message upon completion

7. **Grand Finale** 🎉
   - Confetti animation
   - Countdown to next special date
   - Scratch-off gift reveal
   - Personalized messages

## Design

### Color Palette
- **Primary**: Deep Rose (#d4477f)
- **Secondary**: Dark Purple (#8b3a62)
- **Accent**: Soft Gold (#d4af37)
- **Background**: Dark Navy (#0f0815)
- **Card Background**: Deep Purple (#1a0f2e)

### Features
- Dark, romantic, elegant aesthetic
- Floating hearts animation
- Sparkling particles
- Nebula background effect
- Fully responsive for all devices
- Premium smooth animations using GSAP
- Background music capability with mute button

## Personalization

Edit the `CONFIG` object in `script.js` to customize:

```javascript
const CONFIG = {
    yourName: 'Your Name',
    herName: 'Her Name',
    firstMeetingDate: '2023-01-15', // When you met
    nextAnniversaryDate: '2025-06-28', // Next special date
};
```

## How to Customize

### 1. Add Your Content

**Birthday Letter:**
Edit the letter content in `index.html` (search for "Dear Birthday Star")

**Why I Love You:**
Update the 10 reasons in the `reasons-list` div

**Photo Gallery:**
Replace the gradient backgrounds with image URLs and update data-memory text

**Personal Names & Dates:**
Update the CONFIG object in `script.js`

### 2. Add Background Music

Place an MP3 file in your repository and update the audio source:
```html
<audio id="bgMusic" loop>
    <source src="path/to/your-song.mp3" type="audio/mpeg">
</audio>
```

### 3. Update Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #d4477f;
    --accent-color: #d4af37;
    /* ... update other colors ... */
}
```

### 4. Add Real Photos

Replace the gradient backgrounds in the photo grid with actual images:
```html
<div class="photo-item" style="background-image: url('path/to/image.jpg');" data-memory="Memory description"></div>
```

## File Structure

```
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactivity and animations
└── README.md       # This file
```

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients, animations, and flexbox/grid
- **JavaScript (ES6+)** - Interactivity and game logic
- **GSAP 3** - Professional animations
- **Canvas Confetti** - Celebration effects

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Responsiveness

The website is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (below 768px)
- Small Mobile (480px and below)

## Special Touches

✨ Floating hearts in background
✨ Sparkling particles
✨ Smooth GSAP animations
✨ Countdown timer to special dates
✨ Interactive scratch-off gift reveal
✨ Dynamic color schemes
✨ Personalized footer with names and dates

## Tips for Maximum Impact

1. **Music**: Choose a soft, instrumental version of "your song"
2. **Photos**: Use high-quality images with good contrast against the dark background
3. **Messages**: Personalize every letter and reason - authenticity matters most
4. **Timing**: Share on the special day or the evening before
5. **Device**: Test on the device she'll use first
6. **Connection**: Add your actual anniversary date for the countdown

## License

Created with ❤️ for someone special. Feel free to customize and share your love!

## Support

If you encounter any issues or want to add more features, check the code comments or feel free to customize further.

---

**Made with 💕 to celebrate someone special** ✨