/* ==========================================================
   GHOSTPER v2 - script.js
   1) SITE       : site ayarları (linkler, isim)
   2) PAPERCRAFTS: şablon listesi (yeni şablon buraya eklenir)
   3) PDF        : indirme sistemi (dokunmana gerek yok)
   4) Geri kalanı: sayfaları çizen kod (dokunmana gerek yok)
   ========================================================== */

/* ----------------------------------------------------------
   1) SITE AYARLARI
   Boş bıraktığın linkler sitede görünmez.
   ---------------------------------------------------------- */
const SITE = {
    name: 'GHOSTPER',
    tagline: 'Free anime papercraft templates. Download, print, cut, fold and build.',
    discord: 'https://discord.gg/vYdAUbtXw',
    instagram: 'https://www.instagram.com/ghoustper',
    youtube: '',
    github: ''
};

/* ----------------------------------------------------------
   2) PAPERCRAFT LİSTESİ

   Yeni şablon eklemek için bir blok kopyala ve doldur:
     slug        : benzersiz, küçük harf, boşluk yerine tire
     difficulty  : 'easy' | 'medium' | 'hard'
     added       : eklenme tarihi (YYYY-MM-DD), "Newest" sıralaması için
     featured    : true olursa ana sayfada görünür
     file        : indirilecek dosyanın adı (repo ana klasöründe).
                   PDF olabilir. PNG, JPG veya SVG de olabilir:
                   site onu otomatik olarak gerçek bir A4 PDF'e çevirip indirtir.
                   Dosya yoksa '' bırak -> "PDF coming soon" görünür.
     image       : kart önizleme görseli (ör. 'madara.jpg'). Yoksa '' bırak.
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
        file: 'madara-build-guide.pdf',
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
        file: '',
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
        file: '',
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
        file: '',
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
        file: '',
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
        file: '',
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
        file: '',
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
        file: '',
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
        file: '',
        image: ''
    }
];

/* ==========================================================
   3) PDF SİSTEMİ
   - Dosya gerçek PDF ise: olduğu gibi indirilir.
   - Dosya PNG / JPG / SVG ise (uzantısı .pdf olsa bile):
     tarayıcıda A4 PDF'e çevrilip indirilir.
   ========================================================== */
/* PDF-START */
function gpSniff(bytes) {
    const n = Math.min(bytes.length, 4096);
    let head = '';
    for (let i = 0; i < n; i++) head += String.fromCharCode(bytes[i]);
    if (head.indexOf('%PDF-') !== -1) return 'pdf';
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'png';
    if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpeg';
    if (head.toLowerCase().indexOf('<svg') !== -1) return 'svg';
    return 'unknown';
}

function gpSvgSize(txt) {
    const tag = (txt.match(/<svg[^>]*>/i) || [''])[0];
    const num = '([\\d.\\-eE]+)';
    const vb = tag.match(new RegExp('viewBox\\s*=\\s*["\']\\s*' + num + '[\\s,]+' + num + '[\\s,]+' + num + '[\\s,]+' + num, 'i'));
    if (vb && +vb[3] > 0 && +vb[4] > 0) return { w: +vb[3], h: +vb[4] };
    const w = tag.match(/\swidth\s*=\s*["']([\d.]+)/i);
    const h = tag.match(/\sheight\s*=\s*["']([\d.]+)/i);
    if (w && h && +w[1] > 0 && +h[1] > 0) return { w: +w[1], h: +h[1] };
    return null;
}

/* Tek sayfalık A4 PDF üretir. Görsel sayfaya ortalanır (10 mm kenar boşluğu). */
function gpBuildPdf(jpeg, imgW, imgH) {
    const landscape = imgW > imgH;
    const pw = landscape ? 841.89 : 595.28;
    const ph = landscape ? 595.28 : 841.89;
    const margin = 28.35;
    const s = Math.min((pw - 2 * margin) / imgW, (ph - 2 * margin) / imgH);
    const w = imgW * s, h = imgH * s;
    const x = (pw - w) / 2, y = (ph - h) / 2;

    const enc = new TextEncoder();
    const chunks = [];
    const offsets = [];
    let len = 0;
    const push = (d) => {
        const b = typeof d === 'string' ? enc.encode(d) : d;
        chunks.push(b);
        len += b.length;
    };

    push('%PDF-1.4\n');
    offsets[1] = len; push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
    offsets[2] = len; push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
    offsets[3] = len;
    push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pw.toFixed(2) + ' ' + ph.toFixed(2) + '] ' +
         '/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n');
    offsets[4] = len;
    push('4 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + imgW + ' /Height ' + imgH +
         ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpeg.length + ' >>\nstream\n');
    push(jpeg);
    push('\nendstream\nendobj\n');
    const content = 'q ' + w.toFixed(2) + ' 0 0 ' + h.toFixed(2) + ' ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' cm /Im0 Do Q';
    offsets[5] = len;
    push('5 0 obj\n<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream\nendobj\n');

    const xrefPos = len;
    let xref = 'xref\n0 6\n0000000000 65535 f \n';
    for (let i = 1; i <= 5; i++) xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    push(xref + 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefPos + '\n%%EOF');

    return new Blob(chunks, { type: 'application/pdf' });
}

/* PNG / JPG / SVG baytlarını A4 PDF'e çevirir (sadece tarayıcıda çalışır). */
async function gpImageToPdf(bytes, kind) {
    const mime = kind === 'svg' ? 'image/svg+xml' : kind === 'png' ? 'image/png' : 'image/jpeg';
    let svgSize = null;
    if (kind === 'svg') svgSize = gpSvgSize(new TextDecoder().decode(bytes.subarray(0, 8192)));

    const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
    try {
        const img = await new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = () => resolve(im);
            im.onerror = () => reject(new Error('Image could not be decoded'));
            im.src = url;
        });

        let w = img.naturalWidth, h = img.naturalHeight;
        if (svgSize) { w = svgSize.w; h = svgSize.h; }
        if (!w || !h) { w = 1240; h = 1754; }

        /* SVG vektördür: uzun kenarı 3000 px olacak şekilde ölçekle. Görsel: en fazla 3508 px. */
        const scale = kind === 'svg' ? 3000 / Math.max(w, h) : Math.min(1, 3508 / Math.max(w, h));
        const cw = Math.max(1, Math.round(w * scale));
        const ch = Math.max(1, Math.round(h * scale));

        const canvas = document.createElement('canvas');
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, 0, 0, cw, ch);

        const jpegBlob = await new Promise((resolve, reject) => {
            canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Canvas export failed'))), 'image/jpeg', 0.92);
        });
        const jpeg = new Uint8Array(await jpegBlob.arrayBuffer());
        return gpBuildPdf(jpeg, cw, ch);
    } finally {
        URL.revokeObjectURL(url);
    }
}

/* Dosyayı indirir, türünü tanır ve indirilebilir bir PDF Blob'u döndürür. */
async function gpFileToPdfBlob(url) {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('File not found (HTTP ' + res.status + ')');
    const bytes = new Uint8Array(await res.arrayBuffer());
    const kind = gpSniff(bytes);
    if (kind === 'pdf') return new Blob([bytes], { type: 'application/pdf' });
    if (kind === 'png' || kind === 'jpeg' || kind === 'svg') return gpImageToPdf(bytes, kind);
    throw new Error('Unsupported file type');
}
/* PDF-END */

/* ==========================================================
   4) SAYFA KODU (buradan aşağısını değiştirmene gerek yok)
   ========================================================== */
(function () {
    'use strict';

    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
    const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);
    const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');

    const DIFFICULTY = {
        easy: { label: 'Easy', level: 1, time: 'About 1 hour' },
        medium: { label: 'Medium', level: 2, time: 'About 2-3 hours' },
        hard: { label: 'Hard', level: 3, time: 'About 4-6 hours' }
    };

    const ICON = {
        heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>',
        discord: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11h-9l-4 4v-4H4z"/></svg>',
        instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none"/></svg>',
        youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/></svg>',
        github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.400 11.400 0 0 0-6 0C6.700 2.900 5.700 3.200 5.700 3.200a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4.300 9.600c0 4.600 2.800 5.700 5.500 6A3 3 0 0 0 9 17.900V21"/></svg>'
    };

    const findBySlug = (slug) => PAPERCRAFTS.find((p) => p.slug === slug);

    /* ---------- Stil dosyası koruması ----------
       style.css yüklenmediyse (ör. dosya adı style.ccs kaldıysa) içeriği
       kendisi bulup sayfaya ekler. Böylece site yine siyah ve animasyonlu açılır. */
    let cssRescued = false;
    async function ensureStyles() {
        if (cssRescued) return;
        const loaded = getComputedStyle(document.documentElement).getPropertyValue('--ghostper').trim();
        if (loaded) return;
        cssRescued = true;
        const names = ['style.css', 'style.ccs'];
        for (const name of names) {
            try {
                const res = await fetch(name, { cache: 'no-cache' });
                if (!res.ok) continue;
                const text = await res.text();
                if (text.indexOf('GHOSTPER v2') === -1) continue;
                const tag = document.createElement('style');
                tag.textContent = text;
                document.head.appendChild(tag);
                return;
            } catch (err) { /* sıradaki adı dene */ }
        }
        console.warn('GHOSTPER: style.css bulunamadı. Repoda "style.css" adlı bir dosya olduğundan emin ol.');
    }

    /* ---------- Favoriler (tarayıcıda saklanır) ---------- */
    const FAV_KEY = 'ghostper:saved';
    let favMemory = null;
    const Fav = {
        list() {
            if (favMemory) return favMemory;
            try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { return []; }
        },
        save(list) {
            favMemory = list;
            try { localStorage.setItem(FAV_KEY, JSON.stringify(list)); } catch (e) { /* özel gezinme */ }
        },
        has(slug) { return this.list().indexOf(slug) !== -1; },
        toggle(slug) {
            const list = this.list().slice();
            const i = list.indexOf(slug);
            if (i === -1) list.push(slug); else list.splice(i, 1);
            this.save(list);
            return i === -1;
        }
    };

    /* ---------- Bildirim (toast) ---------- */
    let toastTimer;
    function toast(msg) {
        let el = $('#toast');
        if (!el) {
            el = document.createElement('div');
            el.id = 'toast';
            el.className = 'toast';
            el.setAttribute('role', 'status');
            document.body.appendChild(el);
        }
        el.textContent = msg;
        el.hidden = false;
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
    }

    /* ---------- Yardımcılar ---------- */
    function hashHue(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
        return h % 360;
    }
    function initials(name) {
        return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
    }
    function htmlToNode(html) {
        const t = document.createElement('template');
        t.innerHTML = html.trim();
        return t.content.firstChild;
    }

    function difficultyBadge(key) {
        const d = DIFFICULTY[key] || DIFFICULTY.medium;
        const bars = [1, 2, 3].map((n) => '<i class="' + (n <= d.level ? 'on' : '') + '"></i>').join('');
        return '<span class="diff diff--' + esc(key) + '"><span class="diff__bars" aria-hidden="true">' + bars + '</span><span>' + d.label + '</span></span>';
    }

    /* Otomatik önizleme: papercraft açılımı çizimi */
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
        if (p.image) return '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' papercraft preview" loading="lazy" data-slug="' + esc(p.slug) + '">';
        return placeholderSVG(p);
    }

    function hydrateArt(root) {
        $$('img[data-slug]', root).forEach((img) => {
            img.addEventListener('error', () => {
                const p = findBySlug(img.dataset.slug);
                if (p) img.replaceWith(htmlToNode(placeholderSVG(p)));
            }, { once: true });
        });
    }

    function cardHTML(p, i, mode) {
        const saved = Fav.has(p.slug);
        const attrs = mode === 'enter'
            ? ' class="card card--enter" style="--i:' + i + '"'
            : ' class="card" data-reveal style="--rd:' + (i % 4) * 80 + 'ms"';
        return (
            '<article' + attrs + '>' +
            '<div class="card__art">' + artHTML(p) + (p.file ? '' : '<span class="card__tag">PDF soon</span>') + '</div>' +
            '<button class="fav" type="button" data-fav="' + esc(p.slug) + '" aria-pressed="' + saved + '" aria-label="Save ' + esc(p.name) + ' to favorites">' + ICON.heart + '</button>' +
            '<div class="card__body">' +
            '<p class="card__anime">' + esc(p.anime) + '</p>' +
            '<h3 class="card__title"><a class="card__link" href="detail.html?p=' + encodeURIComponent(p.slug) + '">' + esc(p.name) + '</a></h3>' +
            '<div class="card__foot">' + difficultyBadge(p.difficulty) + '<span class="card__cta">View template</span></div>' +
            '</div></article>'
        );
    }

    function renderCards(container, list, mode) {
        container.innerHTML = list.map((p, i) => cardHTML(p, i, mode)).join('');
        hydrateArt(container);
        if (mode !== 'enter') initReveal(container);
    }

    /* ---------- Kaydırma animasyonları ---------- */
    let io = null;
    function countUp(el) {
        const target = parseFloat(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        if (REDUCED) { el.textContent = target + suffix; return; }
        const t0 = performance.now();
        (function tick(t) {
            const p = Math.min(1, (t - t0) / 1400);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        })(t0);
    }

    function initReveal(root) {
        const els = $$('[data-reveal]:not(.is-in), [data-count]:not([data-counted])', root || document);
        const show = (el) => {
            if (el.ha
