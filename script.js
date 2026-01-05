// Language management
let currentLanguage = localStorage.getItem('language') || 'he';

// Language translations
const translations = {
    en: {
        'logo': 'Professional Services',
        'tab-landscape': 'Nature Design',
        'tab-cosmetics': 'Cosmetics',
        'tab-graphic-design': 'Graphic Design',
        'hero-title': 'Nature Design',
        'hero-subtitle': 'Your Garden is the Biggest Room in the House',
        'hero-description': "Let's Turn Your Dreams Into Reality",
        'hero-button': 'Our Projects',
        'vision-title': 'OUR VISION',
        'how-it-works-title': 'HOW IT WORKS',
        'section-projects': 'Our Projects',
        'section-services': 'Our Services',
        'section-products': 'Our Products',
        'cosmetics-title': 'MAAYAN',
        'cosmetics-subtitle': 'Quality Cosmetic Products',
        'design-title': 'Sunny Spring',
        'design-subtitle': 'Professional Design Services for Every Need',
        'footer': 'All Rights Reserved'
    },
    he: {
        'logo': 'שירותים מקצועיים',
        'tab-landscape': 'אדריכלות נוף',
        'tab-cosmetics': 'מוצרי קוסמטיקה',
        'tab-graphic-design': 'עיצוב גרפי',
        'hero-title': 'אדריכלות נוף',
        'hero-subtitle': 'הגן שלך הוא החדר הגדול ביותר בבית',
        'hero-description': 'בואו נהפוך את החלומות שלכם למציאות',
        'hero-button': 'הפרוייקטים שלנו',
        'vision-title': 'החזון שלנו',
        'how-it-works-title': 'איך זה עובד',
        'section-projects': 'הפרויקטים שלנו',
        'section-services': 'השירותים שלנו',
        'section-products': 'המוצרים שלנו',
        'cosmetics-title': 'MAAYAN',
        'cosmetics-subtitle': 'מבחר מוצרי קוסמטיקה איכותיים',
        'design-title': 'Sunny Spring',
        'design-subtitle': 'שירותי עיצוב מקצועיים לכל צורך',
        'footer': 'כל הזכויות שמורות'
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    
    // Update elements with data attributes
    document.querySelectorAll('[data-en][data-he]').forEach(element => {
        const newText = element.getAttribute(`data-${lang}`);
        // Check if element contains strong tag (for MAAYAN)
        if (element.querySelector('strong')) {
            element.innerHTML = `<strong>${newText}</strong>`;
        } else {
            element.textContent = newText;
        }
    });
    
    // Update language toggle button
    const toggleBtn = document.getElementById('language-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'en' ? 'עברית' : 'English';
    }
    
    // Update body class for RTL support
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    switchLanguage(currentLanguage);
    
    // Language toggle button
    const toggleBtn = document.getElementById('language-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newLang = currentLanguage === 'en' ? 'he' : 'en';
            switchLanguage(newLang);
        });
    }
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            const targetSection = document.getElementById(targetTab);

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            targetSection.classList.add('active');

            // Smooth scroll to section
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });
});

// Function to add images to landscape gallery (will be used later)
function addLandscapeImage(imageUrl, altText = '') {
    const gallery = document.getElementById('landscape-gallery');
    const placeholder = gallery.querySelector('.gallery-placeholder');
    
    if (placeholder) {
        placeholder.remove();
    }

    const imageContainer = document.createElement('div');
    imageContainer.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText || 'תמונה';
    img.loading = 'lazy';
    
    // Set random height for masonry effect
    const heights = [250, 300, 350, 400];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];
    imageContainer.style.gridRowEnd = `span ${Math.floor(randomHeight / 10)}`;
    
    imageContainer.appendChild(img);
    gallery.appendChild(imageContainer);
}

// Function to add multiple images at once
function addLandscapeImages(imageUrls) {
    const gallery = document.getElementById('landscape-gallery');
    const placeholder = gallery.querySelector('.gallery-placeholder');
    
    if (placeholder) {
        placeholder.remove();
    }

    imageUrls.forEach((imageUrl, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `תמונה ${index + 1}`;
        img.loading = 'lazy';
        
        // Set random height for masonry effect
        const heights = [250, 300, 350, 400];
        const randomHeight = heights[Math.floor(Math.random() * heights.length)];
        imageContainer.style.gridRowEnd = `span ${Math.floor(randomHeight / 10)}`;
        
        imageContainer.appendChild(img);
        gallery.appendChild(imageContainer);
    });
}

