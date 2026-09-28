# GHOSTPER - Free Anime Papercraft Templates

A modern, responsive website for sharing free anime papercraft templates. Built with HTML5, CSS3, and Vanilla JavaScript. Fully compatible with GitHub Pages.

## 🎨 Features

- ✨ **Modern Dark Theme** - Eye-catching purple accents on a dark background
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔍 **Search & Filter** - Find papercrafts by character or anime name
- ⭐ **Difficulty Levels** - Easy, Medium, and Hard templates
- 📥 **Free Downloads** - All templates available for free as PDF files
- 🚀 **GitHub Pages Ready** - No backend required, static site only
- ♿ **Accessible** - Built with accessibility in mind
- ⚡ **Fast & Lightweight** - No heavy frameworks, pure vanilla code

## 📁 File Structure

```
ghostper/
├── index.html          # Home page
├── papercrafts.html    # Papercrafts listing page
├── detail.html         # Individual papercraft detail page
├── about.html          # About page
├── style.css           # All styling
├── script.js           # All JavaScript functionality
├── README.md           # This file
└── assets/
    ├── logo.png        # Your GHOSTPER logo
    ├── papercrafts/    # Papercraft images
    │   └── naruto/
    │       └── preview.jpg
    └── pdf/            # PDF templates
        └── naruto/
            └── naruto-template.pdf
```

## 🚀 Getting Started

### Local Development

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/yourusername/ghostper.git
   cd ghostper
   ```

2. **Open with a local server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js (with http-server)
   npx http-server
   ```
   
   Then open `http://localhost:8000` in your browser.

3. **Or simply open index.html** in your browser for basic functionality.

### Adding Your Logo

1. Replace or update `/assets/logo.png` with your GHOSTPER logo
2. The site automatically uses this file for:
   - Navigation bar logo
   - Browser favicon
   - Mobile navigation

### Adding Papercraft Templates

1. **Create directory structure**:
   ```
   assets/papercrafts/naruto/
   ├── preview.jpg           # Preview image (used on cards)
   └── ...-template.pdf      # Downloadable PDF
   ```

2. **Update data in script.js**:
   ```javascript
   {
       id: 1,
       name: 'Naruto Uzumaki',
       anime: 'Naruto',
       difficulty: 'medium',  // 'easy', 'medium', or 'hard'
       description: 'Description text...',
       imagePath: 'assets/papercrafts/naruto/preview.jpg',
       pdfPath: 'assets/papercrafts/naruto/naruto-template.pdf'
   }
   ```

## 🌐 Deploying to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Create a new GitHub repository** named `ghostper`
2. **Upload all files** via GitHub's web interface:
   - Upload index.html, papercrafts.html, detail.html, about.html
   - Upload style.css and script.js
   - Create assets folder and upload images/PDFs

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
   - Click Save

4. Your site will be live at: `https://yourusername.github.io/ghostper`

### Method 2: Using Git Command Line

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/yourusername/ghostper.git

# Push to GitHub
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 🎨 Customization

### Colors
Edit the CSS variables in `style.css`:

```css
:root {
    --primary-dark: #000000;
    --accent-primary: #9d4edd;      /* Main purple */
    --accent-secondary: #7b68ee;    /* Lighter purple */
    --success: #00d084;             /* Green */
    --warning: #ffb703;             /* Orange */
    --error: #ff006e;               /* Pink */
}
```

### Fonts
Change font family in `style.css`:
```css
body {
    font-family: 'Your Font Name', sans-serif;
}
```

### Site Title & Description
Update in each HTML file:
```html
<title>Your Site Title - GHOSTPER</title>
<meta name="description" content="Your description here">
```

## 📊 Advertising Spaces

The site includes reserved areas for ads:
- **Homepage**: Top banner ad space
- **Papercrafts page**: List page ad space
- **Detail page**: Detail page ad space

Ad spaces are marked with HTML comments and placeholder divs:
```html
<div class="ad-space" id="ad-banner">
    <!-- Ad Banner will be placed here -->
</div>
```

To add ads, replace the comment with your ad code (Google AdSense, etc.).

## 🔧 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## ✨ Features Explained

### Search & Filter
- Real-time search across character and anime names
- Difficulty filters (All, Easy, Medium, Hard)
- Results counter
- "No results" fallback with reset button

### Papercrafts Data
Data is stored in `script.js` as a JavaScript array. All 8 example papercrafts are included:
- Naruto Uzumaki
- Sasuke Uchiha
- Ichigo Kurosaki
- Goku
- Gojo Satoru
- Luffy
- Tanjiro Kamado
- Saitama

### Detail Page
- Beautiful preview image display
- Character and anime information
- Difficulty level display
- Full description
- Direct PDF download link
- Step-by-step building instructions
- Related papercrafts suggestions
- Breadcrumb navigation

## 🚨 Important Notes

1. **All links use relative paths** - This ensures compatibility with GitHub Pages subdirectories
2. **Static site only** - No backend or database required
3. **Placeholder images** - Currently showing colored placeholders. Replace with your own images
4. **Session storage** - Uses browser session storage for detail page navigation (not stored permanently)
5. **Mobile optimization** - Touch-friendly buttons and readable font sizes on all devices

## 🐛 Troubleshooting

### Links not working
- Ensure all HTML files are in the root directory
- Check that relative paths are correct
- Use forward slashes `/` even on Windows

### Images not showing
- Ensure images are in the `assets/` folder
- Check file paths match exactly (case-sensitive)
- Use `.jpg` or `.png` format

### PDF downloads not working
- Verify PDF files exist in the correct path
- Check PDF file permissions
- Ensure PDF paths use forward slashes

### Mobile menu not opening
- Clear browser cache
- Check browser console for JavaScript errors
- Ensure script.js is loaded

## 📄 License

This project is open source. Feel free to use and modify for your needs.

## 🤝 Contributing

Feel free to:
- Add more papercraft templates
- Improve the design
- Add new features
- Report bugs

## 📧 Contact & Support

For questions or suggestions, reach out through:
- GitHub Issues
- Email
- Discord community

---

**Happy crafting! 🎨✂️📄**
