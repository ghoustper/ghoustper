/* ==========================================================
   GHOSTPER - script.js
   1) SITE      : site ayarları (linkler, isim)
   2) PAPERCRAFTS: şablon listesi (yeni şablon buraya eklenir)
   3) Geri kalanı: sayfaları çizen kod (dokunmana gerek yok)
   ========================================================== */

/* ----------------------------------------------------------
   1) SITE AYARLARI
   Boş bıraktığın linkler sitede görünmez.
   ---------------------------------------------------------- */
const SITE = {
    name: 'GHOSTPER',
    tagline: 'Free anime papercraft templates. Download, print, cut, fold and build.',
    github: 'https://github.com/ghoustper/ghoustper',
    discord: '',
    instagram: '',
    youtube: ''
};

/* ----------------------------------------------------------
   2) PAPERCRAFT LİSTESİ

   Yeni şablon eklemek için bir blok kopyala ve doldur:
     slug        : benzersiz, küçük harf, boşluk yerine tire (URL'de kullanılır)
     difficulty  : 'easy' | 'medium' | 'hard'
     added       : eklenme tarihi (YYYY-MM-DD), "Newest" sıralaması için
     featured    : true olursa ana sayfada görünür
     pdf         : PDF dosya adı (repo ana klasöründe). Yoksa '' bırak -> "PDF coming soon" görünür
     image       : önizleme görseli dosya adı (ör. 'madara.jpg'). Yoksa '' bırak -> otomatik çizim görünür
   ---------------------------------------------------------- */
const PAPERCRAFTS = [
    {
        slug: 'madara-uchiha',
        name: 'Madara Uchiha',
        anime: 'Naruto',
        difficulty: 'hard',
        added: '2026-09-30',
        featured: true,
        description: 'The legendary Uchiha clan leader with his spiky black hair and stern Sharingan stare. A detailed build for experienced folders.',
        pdf: 'madara-build-guide.pdf',
        image: ''
    },
    {
        slug: 'naruto-uzumaki',
        name: 'Naruto Uzumaki',
        anime: 'Naruto',
        difficulty: 'medium',
        added: '2026-09-28',
        featured: true,
        description: 'The cheerful ninja with his orange jumpsuit and forehead protector. A fun mid-level build with bold colors.',
        pdf: '',
        image: ''
    },
    {
        slug: 'sasuke-uchiha',
        name: 'Sasuke Uchiha',
        anime: 'Naruto',
        difficulty: 'hard',
        added: '2026-09-28',
        featured: false,
        description: 'The talented ninja with the Sharingan. Fine facial details make this a challenge worth the effort.',
        pdf: '',
        image: ''
    },
    {
        slug: 'ichigo-kurosaki',
        name: 'Ichigo Kurosaki',
        anime: 'Bleach',
        difficulty: 'medium',
        added: '2026-09-28',
        featured: false,
        description: 'The Soul Reaper with bright orange hair and a black shihakusho. Great for intermediate builders.',
        pdf: '',
        image: ''
    },
    {
        slug: 'goku',
        name: 'Goku',
        anime: 'Dragon Ball',
        difficulty: 'easy',
        added: '2026-09-28',
        featured: true,
        description: 'The legendary Saiyan warrior. Simple shapes and an iconic look make this a perfect first project.',
        pdf: '',
        image: ''
    },
    {
        slug: 'gojo-satoru',
        name: 'Gojo Satoru',
        anime: 'Jujutsu Kaisen',
        difficulty: 'hard',
        added: '2026-09-28',
        featured: true,
        description: 'The strongest sorcerer with white hair and a blindfold. A complex design for advanced builders.',
        pdf: '',
        image: ''
    },
    {
        slug: 'luffy',
        name: 'Monkey D. Luffy',
        anime: 'One Piece',
        difficulty: 'medium',
        added: '2026-09-28',
        featured: false,
        description: 'The rubber-bodied pirate captain and his signature straw hat. Recognizable and rewarding at any skill level.',
        pdf: '',
        image: ''
    },
    {
        slug: 'tanjiro-kamado',
        name: 'Tanjiro Kamado',
        anime: 'Demon Slayer',
        difficulty: 'easy',
        added: '2026-09-28',
        featured: false,
        description: 'The demon slayer in his green and black checkered haori. Beginner friendly with striking patterns.',
        pdf: '',
        image: ''
    },
    {
        slug: 'saitama',
        name: 'Saitama',
        anime: 'One Punch Man',
        difficulty: 'easy',
        added: '2026-09-28',
        featured: false,
        description: 'The hero who wins with one punch. Minimal details and clean shapes, ideal for beginners.',
        pdf: '',
        image: ''
    }
];

/* ==========================================================
   3) KOD (buradan aşağısını değiştirmene gerek yok)
   ========================================================== */
(function () {
    'use strict';

    /* ---------- Helpers ---------- */
    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

    const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

    const DIFFICULTY = {
        easy: { label: 'Easy', level: 1 },
        medium: { label: 'Medium', level: 2 },
        hard: { label: 'Hard', level: 3 }
    };

    const findBySlug = (slug) => PAPERCRAFTS.find((p) => p.slug === slug);
    const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');

    function hashHue(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
        return h % 360;
    }

    function initials(name) {
        return name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0].toUpperCase())
            .join('');
    }

    /* ---------- Reusable pieces ---------- */
    function difficultyBadge(key) {
        const d = DIFFICULTY[key] || DIFFICULTY.medium;
        const bars = [1, 2, 3].map((n) => '<i class="' + (n <= d.level ? 'on' : '') + '"></i>').join('');
        return (
            '<span class="diff diff--' + esc(key) + '">' +
            '<span class="diff__bars" aria-hidden="true">' + bars + '</span>' +
            '<span>' + d.label + '</span></span>'
        );
    }

    /* Otomatik çizilen önizleme: küçük bir kutu açılımı (papercraft net) */
    function placeholderSVG(p) {
        const color = 'hsl(' + hashHue(p.anime) + ' 60% 74%)';
        return (
            '<svg class="art" viewBox="24 16 152 196" role="img" aria-label="Preview for ' + esc(p.name) + '">' +
            '<path d="M80 30H120V70H160V110H120V190H80V110H40V70H80Z" fill="' + color + '" fill-opacity="0.07" stroke="' + color + '" stroke-width="1.6" stroke-linejoin="round"/>' +
            '<path d="M80 70H120M80 110H120M80 150H120M80 70V110M120 70V110" fill="none" stroke="' + color + '" stroke-opacity="0.55" stroke-width="1.2" stroke-dasharray="4 4"/>' +
            '<text x="100" y="91" text-anchor="middle" dominant-baseline="middle" font-family="Bricolage Grotesque, Segoe UI, sans-serif" font-weight="700" font-size="20" fill="' + color + '">' + esc(initials(p.name)) + '</text>' +
            '</svg>'
        );
    }

    function artHTML(p) {
        if (p.image) {
            return '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' papercraft preview" loading="lazy" data-slug="' + esc(p.slug) + '">';
        }
        return placeholderSVG(p);
    }

    /* Görsel yüklenmezse otomatik çizime dön */
    function hydrateArt(root) {
        $$('img[data-slug]', root).forEach((img) => {
            img.addEventListener('error', () => {
                const p = findBySlug(img.dataset.slug);
                if (p) img.replaceWith(htmlToNode(placeholderSVG(p)));
            }, { once: true });
        });
    }

    function htmlToNode(html) {
        const t = document.createElement('template');
        t.innerHTML = html.trim();
        return t.content.firstChild;
    }

    function cardHTML(p) {
        return (
            '<a class="card" href="detail.html?p=' + encodeURIComponent(p.slug) + '">' +
            '<div class="card__art">' + artHTML(p) +
            (p.pdf ? '' : '<span class="card__tag">PDF soon</span>') +
            '</div>' +
            '<div class="card__body">' +
            '<p class="card__anime">' + esc(p.anime) + '</p>' +
            '<h3 class="card__title">' + esc(p.name) + '</h3>' +
            '<div class="card__foot">' + difficultyBadge(p.difficulty) + '<span class="card__cta">View template</span></div>' +
            '</div></a>'
        );
    }

    function renderCards(container, list) {
        container.innerHTML = list.map(cardHTML).join('');
        hydrateArt(container);
    }

    /* ---------- Header & Footer ---------- */
    function renderHeader() {
        const host = $('#site-header');
        if (!host) return;
        const page = document.body.dataset.page;
        const cur = (name) => (page === name ? ' aria-current="page"' : '');

        host.className = 'site-header';
        host.innerHTML =
            '<div class="wrap header__in">' +
            '<a class="brand" href="index.html" aria-label="' + esc(SITE.name) + ' home">' +
            '<img class="brand__logo" src="logo.png" alt="" width="36" height="36">' +
            '<span>' + esc(SITE.name) + '</span></a>' +
            '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span></button>' +
            '<nav class="nav" id="site-nav" aria-label="Main">' +
            '<a href="index.html"' + cur('home') + '>Home</a>' +
            '<a href="papercraft.html"' + cur('list') + '>Papercrafts</a>' +
            '<a href="index.html#categories">Categories</a>' +
            '<a href="about.html"' + cur('about') + '>About</a>' +
            '</nav></div>';

        const logo = $('.brand__logo', host);
        logo.addEventListener('error', () => logo.remove(), { once: true });

        const btn = $('.menu-btn', host);
        const nav = $('#site-nav', host);
        const setOpen = (open) => {
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            nav.dataset.open = String(open);
        };
        btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
        $$('a', nav).forEach((a) => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
        document.addEventListener('click', (e) => { if (!host.contains(e.target)) setOpen(false); });
    }

    function renderFooter() {
        const host = $('#site-footer');
        if (!host) return;

        const social = [];
        if (SITE.github) social.push(['GitHub', SITE.github]);
        if (SITE.discord) social.push(['Discord', SITE.discord]);
        if (SITE.instagram) social.push(['Instagram', SITE.instagram]);
        if (SITE.youtube) social.push(['YouTube', SITE.youtube]);
        const socialHTML = social
            .map((s) => '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener noreferrer">' + s[0] + '</a></li>')
            .join('');

        host.className = 'site-footer';
        host.innerHTML =
            '<div class="wrap">' +
            '<div class="footer__grid">' +
            '<div class="footer__brand"><a class="brand" href="index.html">' +
            '<img class="brand__logo" src="logo.png" alt="" width="36" height="36"><span>' + esc(SITE.name) + '</span></a>' +
            '<p>' + esc(SITE.tagline) + '</p></div>' +
            '<div class="footer__col"><h4>Explore</h4><ul>' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="papercraft.html">Papercrafts</a></li>' +
            '<li><a href="index.html#categories">Categories</a></li>' +
            '<li><a href="about.html">About</a></li></ul></div>' +
            (socialHTML ? '<div class="footer__col"><h4>Community</h4><ul>' + socialHTML + '</ul></div>' : '') +
            '</div>' +
            '<div class="footer__bottom">' +
            '<span>&copy; ' + new Date().getFullYear() + ' ' + esc(SITE.name) + '</span>' +
            '<span>Fan-made templates. All characters belong to their respective owners.</span>' +
            '</div></div>';

        const logo = $('.brand__logo', host);
        if (logo) logo.addEventListener('error', () => logo.remove(), { once: true });
    }

    /* ---------- Home ---------- */
    function initHome() {
        const featured = $('#featuredGrid');
        if (featured) {
            const list = PAPERCRAFTS.filter((p) => p.featured).slice(0, 4);
            renderCards(featured, list.length ? list : PAPERCRAFTS.slice(0, 4));
        }

        const cats = $('#catGrid');
        if (cats) {
            const counts = {};
            PAPERCRAFTS.forEach((p) => { counts[p.anime] = (counts[p.anime] || 0) + 1; });
            cats.innerHTML = Object.keys(counts)
                .sort((a, b) => a.localeCompare(b))
                .map((name) =>
                    '<a class="cat" href="papercraft.html?anime=' + encodeURIComponent(name) + '">' +
                    '<strong>' + esc(name) + '</strong><span>' + plural(counts[name], 'template') + '</span></a>'
                )
                .join('');
        }
    }

    /* ---------- Papercraft list ---------- */
    function initList() {
        const grid = $('#grid');
        if (!grid) return;

        const qEl = $('#q');
        const animeEl = $('#anime');
        const sortEl = $('#sort');
        const chips = $$('#diffChips .chip');
        const countEl = $('#count');
        const emptyEl = $('#empty');
        const resetBtn = $('#reset');

        /* Anime seçeneklerini doldur */
        Array.from(new Set(PAPERCRAFTS.map((p) => p.anime)))
            .sort((a, b) => a.localeCompare(b))
            .forEach((name) => {
                const o = document.createElement('option');
                o.value = name;
                o.textContent = name;
                animeEl.appendChild(o);
            });

        /* URL'den başlangıç durumu */
        const params = new URLSearchParams(window.location.search);
        const state = {
            q: params.get('q') || '',
            d: DIFFICULTY[params.get('d')] ? params.get('d') : 'all',
            anime: params.get('anime') || 'all',
            sort: ['new', 'az', 'easy', 'hard'].includes(params.get('sort')) ? params.get('sort') : 'new'
        };
        if (state.anime !== 'all' && !PAPERCRAFTS.some((p) => p.anime === state.anime)) state.anime = 'all';

        qEl.value = state.q;
        animeEl.value = state.anime;
        sortEl.value = state.sort;

        function syncUrl() {
            try {
                const u = new URL(window.location.href);
                const set = (k, v, def) => (v && v !== def ? u.searchParams.set(k, v) : u.searchParams.delete(k));
                set('q', state.q.trim(), '');
                set('d', state.d, 'all');
                set('anime', state.anime, 'all');
                set('sort', state.sort, 'new');
                window.history.replaceState(null, '', u);
            } catch (err) { /* file:// gibi durumlarda sessizce geç */ }
        }

        function render() {
            const q = state.q.trim().toLowerCase();
            const list = PAPERCRAFTS.filter((p) =>
                (state.d === 'all' || p.difficulty === state.d) &&
                (state.anime === 'all' || p.anime === state.anime) &&
                (!q || (p.name + ' ' + p.anime).toLowerCase().includes(q))
            );

            list.sort((a, b) => {
                if (state.sort === 'az') return a.name.localeCompare(b.name);
                if (state.sort === 'easy') return DIFFICULTY[a.difficulty].level - DIFFICULTY[b.difficulty].level || a.name.localeCompare(b.name);
                if (state.sort === 'hard') return DIFFICULTY[b.difficulty].level - DIFFICULTY[a.difficulty].level || a.name.localeCompare(b.name);
                return b.added.localeCompare(a.added) || a.name.localeCompare(b.name);
            });

            chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.d === state.d)));
            countEl.textContent = plural(list.length, 'template') + ' found';

            const none = list.length === 0;
            grid.hidden = none;
            emptyEl.hidden = !none;
            if (!none) renderCards(grid, list);
            syncUrl();
        }

        qEl.addEventListener('input', () => { state.q = qEl.value; render(); });
        animeEl.addEventListener('change', () => { state.anime = animeEl.value; render(); });
        sortEl.addEventListener('change', () => { state.sort = sortEl.value; render(); });
        chips.forEach((c) => c.addEventListener('click', () => { state.d = c.dataset.d; render(); }));
        resetBtn.addEventListener('click', () => {
            state.q = ''; state.d = 'all'; state.anime = 'all'; state.sort = 'new';
            qEl.value = ''; animeEl.value = 'all'; sortEl.value = 'new';
            render();
            qEl.focus();
        });

        render();
    }

    /* ---------- Detail ---------- */
    function initDetail() {
        const slug = new URLSearchParams(window.location.search).get('p');
        const p = slug ? findBySlug(slug) : null;
        const content = $('#content');
        const notFound = $('#notfound');

        if (!p) {
            content.hidden = true;
            notFound.hidden = false;
            document.title = 'Template not found - ' + SITE.name;
            return;
        }

        const d = DIFFICULTY[p.difficulty] || DIFFICULTY.medium;
        document.title = p.name + ' papercraft template - ' + SITE.name;
        const meta = $('meta[name="description"]');
        if (meta) meta.setAttribute('content', 'Download the free ' + p.name + ' (' + p.anime + ') papercraft template. Difficulty: ' + d.label + '.');

        $('#crumbName').textContent = p.name;
        $('#dAnime').textContent = p.anime;
        $('#dTitle').textContent = p.name;
        $('#dDesc').textContent = p.description;
        $('#fChar').textContent = p.name;
        $('#fSeries').textContent = p.anime;
        $('#fDiff').innerHTML = difficultyBadge(p.difficulty);

        const art = $('#dArt');
        art.innerHTML = artHTML(p);
        hydrateArt(art);

        const dl = $('#dDownload');
        if (p.pdf) {
            dl.innerHTML =
                '<a class="btn btn--primary btn--lg btn--block" href="' + esc(p.pdf) + '" download>Download PDF</a>' +
                '<p class="download-note">Free for personal use. Print at 100% scale on A4.</p>';
        } else {
            dl.innerHTML =
                '<span class="btn btn--disabled btn--lg btn--block" aria-disabled="true">PDF coming soon</span>' +
                '<p class="download-note">This template is being prepared. Check back soon.</p>';
        }

        /* Related: önce aynı anime, sonra diğerleri */
        const others = PAPERCRAFTS.filter((x) => x.slug !== p.slug);
        const related = others.filter((x) => x.anime === p.anime)
            .concat(others.filter((x) => x.anime !== p.anime))
            .slice(0, 3);
        renderCards($('#relatedGrid'), related);
    }

    /* ---------- Boot ---------- */
    function boot() {
        renderHeader();
        renderFooter();
        const page = document.body.dataset.page;
        if (page === 'home') initHome();
        else if (page === 'list') initList();
        else if (page === 'detail') initDetail();

        $$('[data-link="github"]').forEach((a) => { if (SITE.github) a.href = SITE.github; else a.hidden = true; });
        $$('[data-link="issues"]').forEach((a) => { if (SITE.github) a.href = SITE.github + '/issues'; else a.hidden = true; });
    }

    if (document.readyState === '
