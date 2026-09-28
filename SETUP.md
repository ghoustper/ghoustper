GHOSTPER - Setup and Configuration Guide

📋 Quick Start

1. Prepare the Files

Organize all files according to the following structure:

ghostper/
├── index.html
├── papercrafts.html
├── detail.html
├── about.html
├── style.css
├── script.js
├── README.md
├── SETUP.md
├── .gitignore
└── assets/
    ├── logo.png
    ├── papercrafts/
    │   ├── naruto/
    │   │   └── preview.jpg
    │   ├── sasuke/
    │   │   └── preview.jpg
    │   └── ...
    └── pdf/
        ├── naruto/
        │   └── naruto-template.pdf
        ├── sasuke/
        │   └── sasuke-template.pdf
        └── ...

2. Add Your Logo

Upload your GHOSTPER logo to:

"assets/logo.png"

3. Test Locally

If Python is installed:

python -m http.server 8000

Then open:

"http://localhost:8000"

in your browser.

4. Upload to GitHub Pages

Read the section below.

---

🚀 GitHub Pages Deployment (Step by Step)

Option A: Using the Browser (Easiest)

Step 1: Create a New Repository

1. Go to "GitHub.com" (https://github.com?utm_source=chatgpt.com)
2. Click the "+" button in the top-right corner.
3. Select "New repository".
4. Repository name: "ghostper"
5. Description: "Free Anime Papercraft Templates"
6. Select Public.
7. Click "Create repository".

Step 2: Upload the Files

1. On your repository page, click "Add file".
2. Select "Upload files".
3. Drag and drop or select all files (HTML, CSS, JS, README, etc.).
4. Click "Commit changes".

Step 3: Upload the Assets Folder

1. Click "Add file" → "Create new file".
2. Enter the file path as:

"assets/.gitkeep"

3. Click "Commit new file".
4. After that, use "Upload files" to upload your logo, images, and PDF files.

Step 4: Enable GitHub Pages

1. Go to the "Settings" tab of your repository.
2. Click "Pages" in the left sidebar.
3. Make sure "Deploy from a branch" is selected under "Source".
4. Branch: "main" (or "master")
5. Folder: "/ (root)"
6. Click "Save".

You should see a message like:

Your site is live at https://yourusername.github.io/ghostper/

Done! 🎉 Your website is ready!

---

Option B: Git Command Line (Advanced)

Requirements

- Git must be installed.
- A GitHub account.

Step 1: Create a Repository

Repeat the first 4 steps from Option A using the GitHub web interface.

Step 2: Open Terminal / Command Prompt

Navigate to your project folder:

cd /path/to/ghostper

Step 3: Initialize Git

# Initialize the Git repository
git init

# Add files to staging
git add .

# Create the first commit
git commit -m "GHOSTPER - Initial commit"

# Add the remote repository
git remote add origin https://github.com/yourusername/ghostper.git

# Rename the branch if necessary
git branch -M main

# Push to GitHub
git push -u origin main

Step 4: Enable GitHub Pages

Repeat Step 4 from Option A.

---

🔧 Configuration

Changing the Logo

The logo is automatically used in:

- Navigation bar
- Browser favicon
- About page

After placing your logo at "assets/logo.png", no other changes are required.

Adding a Papercraft

To add a new papercraft, add it to the "papercraftsData" array in "script.js":

{
    id: 9,  // Unique ID
    name: 'Character Name',
    anime: 'Anime Name',
    difficulty: 'easy',  // easy, medium, or hard
    description: 'Detailed description...',
    imagePath: 'assets/papercrafts/folder/preview.jpg',
    pdfPath: 'assets/papercrafts/folder/template.pdf'
}

Then upload the corresponding image and PDF files to the "assets/" folder.

Changing Colors

Edit the variables at the beginning of "style.css":

:root {
    --primary-dark: #000000;           /* Background */
    --accent-primary: #9d4edd;         /* Primary accent color (purple) */
    --accent-secondary: #7b68ee;       /* Secondary accent */
    --text-primary: #ffffff;           /* Text color */
    --text-secondary: #e0e0e0;         /* Secondary text */
    --success: #00d084;                /* Success color (green) */
    --warning: #ffb703;                /* Warning color (orange) */
    --error: #ff006e;                  /* Error color (pink) */
}

Title and Description

Update the "<title>" and "<meta name="description">" tags in every HTML file:

<title>GHOSTPER - Free Anime Papercraft Templates</title>
<meta name="description" content="Download paper craft templates of your favorite anime characters for free.">

Updating Content

- Home Page: Edit the hero section in "index.html"
- About Page: Update the content in "about.html"
- Footer: Add your social media links to all HTML files

---

📊 GitHub Pages Verification

To check whether your website is live:

1. Go to your GitHub repository.
2. Open "Settings" → "Pages".
3. You should see a green confirmation mark.

If you see an error:

- Make sure the file names are correct.
- Make sure the HTML files are located in the root folder.
- Wait 5–10 minutes and refresh the page.

---

🔐 Private Settings

After publishing with GitHub Pages:

- [ ] Make the repository Public (required)
- [ ] You can disable Issues (optional)
- [ ] You can enable Discussions (optional)
- [ ] Edit the README file if needed

---

🛠️ Troubleshooting

The Page Appears Blank

Solution:

1. Clear your browser cache ("Ctrl+Shift+Delete").
2. Make sure "index.html" is in the root folder.
3. Check your GitHub Pages settings.

Styles Are Not Applied

Solution:

- Check whether the CSS file path is "style.css".
- Make sure there are no uppercase/lowercase errors in the file name.
- Perform a hard refresh ("Ctrl+Shift+R").

Images Are Not Loading

Solution:

- Make sure the "assets/" folder is in the root directory.
- File paths are case-sensitive.
- Check the file names on GitHub.

Scripts Are Not Working

Solution:

- Make sure "script.js" is in the root folder.
- Check that the script tag is correct in your HTML files:

<script src="script.js"></script>

- Check the browser console (F12) for errors.

---

📈 Improvements

SEO Optimization

- Use unique page titles.
- Add meta descriptions.
- Add Open Graph tags:

<meta property="og:title" content="GHOSTPER">
<meta property="og:description" content="Free anime papercraft templates">
<meta property="og:image" content="assets/logo.png">

Analytics

To add Google Analytics (optional):

1. Create a Google Analytics account.
2. Add the tracking code before "</head>" in every HTML file.

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
      window.dataLayer = window.dataLayer || [];
      gtag('js', new Date());
      gtag('config', 'GA_ID');
  }
</script>

Performance Optimization

- Convert images to WebP format.
- Minify CSS and JavaScript.
- Consider using a CDN.

---

🎯 Next Steps

1. ✅ Upload all files to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Add your logo
4. ✅ Add your own papercraft templates
5. ✅ Promote the website on social media
6. ✅ Integrate an advertising system

---

📚 Resources

- "GitHub Pages Documentation" (https://pages.github.com/?utm_source=chatgpt.com)
- "Git Book - Getting Started" (https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control?utm_source=chatgpt.com)
- "HTML Living Standard" (https://html.spec.whatwg.org/?utm_source=chatgpt.com)
- "W3C CSS" (https://www.w3.org/Style/CSS/?utm_source=chatgpt.com)

---

If you have any questions, read the README.md file!

Good luck! 🚀
