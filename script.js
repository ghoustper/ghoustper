// ============================================
// GHOSTPER - Main JavaScript
// ============================================

// ============ Data ============
const papercraftsData = [
    {
        id: 1,
        name: 'Naruto Uzumaki',
        anime: 'Naruto',
        difficulty: 'medium',
        description: 'The cheerful ninja and main character from Naruto. This template captures his iconic orange suit and headband perfectly.',
        imagePath: 'assets/papercrafts/naruto/preview.jpg',
        pdfPath: 'assets/papercrafts/naruto/naruto-template.pdf'
    },
    {
        id: 2,
        name: 'Sasuke Uchiha',
        anime: 'Naruto',
        difficulty: 'hard',
        description: 'The talented and serious ninja with the Sharingan. A challenging build featuring detailed facial features and his distinctive outfit.',
        imagePath: 'assets/papercrafts/sasuke/preview.jpg',
        pdfPath: 'assets/papercrafts/sasuke/sasuke-template.pdf'
    },
    {
        id: 3,
        name: 'Ichigo Kurosaki',
        anime: 'Bleach',
        difficulty: 'medium',
        description: 'The Soul Reaper protector with his signature orange hair and black coat. Perfect for intermediate builders.',
        imagePath: 'assets/papercrafts/ichigo/preview.jpg',
        pdfPath: 'assets/papercrafts/ichigo/ichigo-template.pdf'
    },
    {
        id: 4,
        name: 'Goku',
        anime: 'Dragon Ball',
        difficulty: 'easy',
        description: 'The legendary Saiyan warrior. A great starting project with its simple and iconic design.',
        imagePath: 'assets/papercrafts/goku/preview.jpg',
        pdfPath: 'assets/papercrafts/goku/goku-template.pdf'
    },
    {
        id: 5,
        name: 'Gojo Satoru',
        anime: 'Jujutsu Kaisen',
        difficulty: 'hard',
        description: 'The powerful sorcerer with his infinity ability. This complex design is for advanced papercraft builders.',
        imagePath: 'assets/papercrafts/gojo/preview.jpg',
        pdfPath: 'assets/papercrafts/gojo/gojo-template.pdf'
    },
    {
        id: 6,
        name: 'Luffy',
        anime: 'One Piece',
        difficulty: 'medium',
        description: 'The rubber pirate captain with his signature straw hat. A fun and recognizable build for all levels.',
        imagePath: 'assets/papercrafts/luffy/preview.jpg',
        pdfPath: 'assets/papercrafts/luffy/luffy-template.pdf'
    },
    {
        id: 7,
        name: 'Tanjiro Kamado',
        anime: 'Demon Slayer',
        difficulty: 'easy',
        description: 'The demon slayer with his checkered haori. A beginner-friendly template with striking colors.',
        imagePath: 'assets/papercrafts/tanjiro/preview.jpg',
        pdfPath: 'assets/papercrafts/tanjiro/tanjiro-template.pdf'
    },
    {
        id: 8,
        name: 'Saitama',
        anime: 'One Punch Man',
        difficulty: 'easy',
        description: 'The bald hero with unmatched power. Simple yet iconic, perfect for beginning builders.',
        imagePath: 'assets/papercrafts/saitama/preview.jpg',
        pdfPath: 'assets/papercrafts/saitama/saitama-template.pdf'
    },
    {
        id: 9,
        name: 'Madara Uchiha',
        anime: 'Naruto',
        difficulty: 'hard',
        description: 'The legendary Uchiha clan leader with his signature Sharingan and flowing black hair. An advanced build featuring intricate details and his iconic dark red outfit.',
        imagePath: 'assets/papercrafts/madara/preview.jpg',
        pdfPath: 'assets/papercrafts/madara/madara-template.pdf'
    }
];

// ============ Navigation ============
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============ Generate Placeholder Image ============
function generatePlaceholderImage(character, anime) {
    const colors = [
        { bg: '#9d4edd', text: '#ffffff' },
        { bg: '#7b68ee', text: '#ffffff' },
        { bg: '#1a1a2e', text: '#00d084' },
        { bg: '#16213e', text: '#e0e0e0' }
    ];
    
    const colorIndex = Math.abs(character.charCodeAt(0)) % colors.length;
    const color = colors[colorIndex];

    return `
        <div style="
            width: 100%; 
            height: 100%; 
            background-color: ${color.bg}; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            padding: 20px;
            text-align: center;
            color: ${color.text};
        ">
            <div style="font-size: 3rem; margin-bottom: 10px;">📄</div>
            <div style="font-weight: 700; margin-bottom: 5px;">${character}</div>
            <div style="font-size: 0.85rem; opacity: 0.8;">${anime}</div>
        </div>
    `;
}

// ============ Create Papercraft Card ============
function createPapercraftCard(papercraft, isFeatured = false) {
    const card = document.createElement('div');
    card.className = 'papercraft-card';
    
    const difficultyClass = papercraft.difficulty.toLowerCase();
    
    card.innerHTML = `
        <div class="card-image placeholder">
            ${generatePlaceholderImage(papercraft.name, papercraft.anime)}
        </div>
        <div class="card-content">
            <div class="card-title">${papercraft.name}</div>
            <div class="card-anime">${papercraft.anime}</div>
            <div class="card-difficulty ${difficultyClass}">
                ${papercraft.difficulty.charAt(0).toUpperCase() + papercraft.difficulty.slice(1)}
            </div>
            <button class="card-button" onclick="viewPapercraft(${papercraft.id})">
                View Template
            </button>
        </div>
    `;
    
    return card;
}

// ============ Render Featured Grid (Home Page) ============
function renderFeaturedGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    // Show featured papercrafts: Naruto, Gojo, Madara, Luffy (mix of easy/medium/hard)
    const featuredIds = [1, 5, 9, 6]; // Naruto, Gojo, Madara, Luffy
    const featured = papercraftsData.filter(p => featuredIds.includes(p.id))
                                    .sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));
    
    featured.forEach(papercraft => {
        const card = createPapercraftCard(papercraft, true);
        featuredGrid.appendChild(card);
    });
}

// ============ Render All Papercrafts (Papercrafts Page) ============
function renderAllPapercrafts(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('papercraftsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!grid) return;
    
    // Clear grid
    grid.innerHTML = '';
    
    // Filter papercrafts
    let filtered = papercraftsData.filter(papercraft => {
        const matchDifficulty = filter === 'all' || papercraft.difficulty === filter;
        const matchSearch = searchTerm === '' || 
                          papercraft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          papercraft.anime.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchDifficulty && matchSearch;
    });
    
    // Update result count
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        const count = filtered.length;
        resultCount.textContent = `Showing ${count} papercraft${count !== 1 ? 's' : ''}`;
    }
    
    // Show no results message
    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    // Render cards
    filtered.forEach(papercraft => {
        const card = createPapercraftCard(papercraft);
        grid.appendChild(card);
    });
}

// ============ Initialize Filtering (Papercrafts Page) ============
function initFiltering() {
    const filterButtons = document.getElementById('filterButtons');
    const searchInput = document.getElementById('searchInput');
    
    if (!filterButtons || !searchInput) return;
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Filter button clicks
    filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            renderAllPapercrafts(currentFilter, currentSearch);
        });
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderAllPapercrafts(currentFilter, currentSearch);
    });
    
    // Initial render
    renderAllPapercrafts('all', '');
}

// ============ Reset Filters ============
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const filterButtons = document.getElementById('filterButtons');
    if (filterButtons) {
        filterButtons.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        filterButtons.querySelector('[data-filter="all"]').classList.add('active');
    }
    
    renderAllPapercrafts('all', '');
}

// ============ View Papercraft Detail ============
function viewPapercraft(papercraftId) {
    // Store selected papercraft ID in session storage
    sessionStorage.setItem('selectedPapercraftId', papercraftId);
    
    // Redirect to detail page
    window.location.href = 'detail.html';
}

// ============ Initialize Detail Page ============
function initDetailPage() {
    // Get selected papercraft ID
    const papercraftId = sessionStorage.getItem('selectedPapercraftId');
    
    if (!papercraftId) {
        window.location.href = 'papercrafts.html';
        return;
    }
    
    // Find papercraft
    const papercraft = papercraftsData.find(p => p.id === parseInt(papercraftId));
    
    if (!papercraft) {
        window.location.href = 'papercrafts.html';
        return;
    }
    
    // Update page content
    document.title = `${papercraft.name} - GHOSTPER`;
    document.getElementById('breadcrumbName').textContent = papercraft.name;
    document.getElementById('detailName').textContent = papercraft.name;
    document.getElementById('detailAnime').textContent = papercraft.anime;
    document.getElementById('detailDifficulty').textContent = 
        papercraft.difficulty.charAt(0).toUpperCase() + papercraft.difficulty.slice(1);
    document.getElementById('detailDescription').textContent = papercraft.description;
    
    // Set preview image
    const previewImage = document.getElementById('previewImage');
    const img = document.createElement('img');
    img.src = papercraft.imagePath;
    img.alt = papercraft.name;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.onerror = () => {
        // Fallback to placeholder if image fails to load
        previewImage.innerHTML = generatePlaceholderImage(papercraft.name, papercraft.anime);
    };
    previewImage.innerHTML = '';
    previewImage.appendChild(img);
    
    // Set download button
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.href = papercraft.pdfPath;
    downloadBtn.download = `${papercraft.name.toLowerCase().replace(/\s+/g, '-')}-template.pdf`;
    
    // Load related papercrafts
    const related = papercraftsData
        .filter(p => p.anime === papercraft.anime && p.id !== papercraft.id)
        .slice(0, 3);
    
    const relatedGrid = document.getElementById('relatedGrid');
    related.forEach(p => {
        const card = createPapercraftCard(p);
        relatedGrid.appendChild(card);
    });
}

// ============ Initialize Page ============
function initPage() {
    // Always initialize navigation
    initNavigation();
    
    // Check which page we're on
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        // Home page
        renderFeaturedGrid();
    } else if (currentPage === 'papercrafts.html') {
        // Papercrafts page
        initFiltering();
    } else if (currentPage === 'detail.html') {
        // Detail page
        initDetailPage();
    }
}

// ============ DOM Ready ============
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// ============ Smooth Page Transitions ============
window.addEventListener('beforeunload', function() {
    // Add fade out animation if needed
});

// ============ Keyboard Navigation ============
document.addEventListener('keydown', function(event) {
    // Close mobile menu on ESC
    if (event.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ============ Accessibility: Focus Management ============
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Add visual focus indicator
        document.body.classList.add('keyboard-focused');
    }
});

document.addEventListener('click', function() {
    // Remove keyboard focus indicator on mouse click
    document.body.classList.remove('keyboard-focused');
});
