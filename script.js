// Configuration
const CONFIG = {
    // PERSONALIZATION - Update these with your information
    yourName: 'Your Name',
    herName: 'Her Name',
    firstMeetingDate: '2023-01-15', // Format: YYYY-MM-DD
    nextBirthdayDate: new Date(new Date().getFullYear() + 1, 0, 1), // Next year, January 1st
    nextAnniversaryDate: '2025-06-28', // Format: YYYY-MM-DD
};

// Game Cards Data (pairs for the matching game)
const GAME_CARDS = [
    { id: 1, pair: 1, emoji: '💕' },
    { id: 2, pair: 2, emoji: '💑' },
    { id: 3, pair: 3, emoji: '✨' },
    { id: 4, pair: 4, emoji: '🌙' },
    { id: 5, pair: 1, emoji: '💕' },
    { id: 6, pair: 2, emoji: '💑' },
    { id: 7, pair: 3, emoji: '✨' },
    { id: 8, pair: 4, emoji: '🌙' },
];

// Global State
let gameFlipped = [];
let gameMatched = [];
let gamesStarted = false;

// Initialize the app
function initApp() {
    setupPersonalization();
    setupEventListeners();
    createFloatingHearts();
    createSparkles();
    setupScratchCard();
}

// Personalization
function setupPersonalization() {
    const personalNote = document.getElementById('personalNote');
    const firstMeetingDate = new Date(CONFIG.firstMeetingDate);
    const timeTogether = getTimeTogether(firstMeetingDate);
    
    personalNote.textContent = `${CONFIG.yourName} & ${CONFIG.herName} • Together since ${firstMeetingDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} (${timeTogether})`;
}

function getTimeTogether(startDate) {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        days += 30;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    const parts = [];
    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months}m`);
    if (days > 0) parts.push(`${days}d`);

    return parts.join(' ');
}

// Event Listeners Setup
function setupEventListeners() {
    // Landing Page
    document.getElementById('yesBtn').addEventListener('click', handleYesClick);
    document.getElementById('noBtn').addEventListener('click', handleNoClick);

    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', handleNavClick);
    });

    // Audio Control
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);

    // Finale
    document.getElementById('surpriseBtn').addEventListener('click', handleSurprise);
}

// Landing Page Handlers
function handleYesClick() {
    const landing = document.getElementById('landing');
    const dashboard = document.getElementById('dashboard');
    
    gsap.to(landing, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
            landing.style.display = 'none';
            dashboard.style.display = 'block';
            gsap.from(dashboard, { duration: 0.8, opacity: 0 });
            initializeGame();
        }
    });
}

function handleNoClick() {
    const noBtn = document.getElementById('noBtn');
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    
    gsap.to(noBtn, {
        duration: 0.3,
        x: randomX,
        y: randomY,
        ease: 'power2.out'
    });
}

// Navigation
function handleNavClick(e) {
    const sectionName = e.target.dataset.section;
    
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update active content section
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionName).classList.add('active');
    
    // Start countdown if finale section
    if (sectionName === 'finale') {
        startCountdown();
    }
}

// Letter Section
function openLetter() {
    const letterContent = document.getElementById('letterContent');
    letterContent.classList.add('open');
    gsap.from(letterContent, { duration: 0.8, scaleY: 0, transformOrigin: 'top' });
}

function closeLetter() {
    document.getElementById('letterContent').classList.remove('open');
}

// Quiz Section
function checkQuizAnswer(isCorrect) {
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    
    quizContent.style.display = 'none';
    quizResult.style.display = 'block';
    
    gsap.from(quizResult, { duration: 0.5, scale: 0 });
}

// Game Section (Love Match)
function initializeGame() {
    if (gamesStarted) return;
    gamesStarted = true;
    
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    // Shuffle cards
    const shuffledCards = [...GAME_CARDS].sort(() => Math.random() - 0.5);
    
    shuffledCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'game-card';
        cardEl.innerHTML = '❓';
        cardEl.dataset.id = card.id;
        cardEl.dataset.pair = card.pair;
        cardEl.dataset.emoji = card.emoji;
        cardEl.addEventListener('click', () => flipGameCard(cardEl));
        gameBoard.appendChild(cardEl);
    });
}

function flipGameCard(cardEl) {
    if (cardEl.classList.contains('matched') || gameFlipped.includes(cardEl)) return;
    
    cardEl.innerHTML = cardEl.dataset.emoji;
    gameFlipped.push(cardEl);
    
    if (gameFlipped.length === 2) {
        checkGameMatch();
    }
}

function checkGameMatch() {
    const [card1, card2] = gameFlipped;
    const isMatch = card1.dataset.pair === card2.dataset.pair;
    
    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameMatched.push(card1, card2);
        gameFlipped = [];
        
        if (gameMatched.length === GAME_CARDS.length) {
            setTimeout(showSecretMessage, 500);
        }
    } else {
        setTimeout(() => {
            card1.innerHTML = '❓';
            card2.innerHTML = '❓';
            gameFlipped = [];
        }, 1000);
    }
}

function showSecretMessage() {
    document.getElementById('secretMessage').style.display = 'block';
    gsap.from(document.getElementById('secretMessage'), { duration: 0.5, scale: 0 });
}

// Finale Section
function handleSurprise() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseContent = document.getElementById('surpriseContent');
    
    surpriseBtn.style.display = 'none';
    surpriseContent.style.display = 'block';
    
    // Trigger confetti
    triggerConfetti();
    startCountdown();
}

function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {
                x: randomInRange(0.1, 0.9),
                y: Math.random() - 0.2
            }
        }));
    }, 250);
}

function startCountdown() {
    const targetDate = new Date(CONFIG.nextAnniversaryDate).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('daysCount').textContent = '0';
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        document.getElementById('daysCount').textContent = days;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Background Animations
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const hearts = ['💕', '💗', '💖', '💝', '❤️'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 8) + 's';
        container.appendChild(heart);
    }
}

function createSparkles() {
    const container = document.querySelector('.sparkles');
    
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(sparkle);
    }
}

// Audio Control
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    
    if (audio.paused) {
        audio.play().catch(e => {
            console.log('Auto-play prevented. User interaction required.');
        });
        musicBtn.classList.remove('muted');
    } else {
        audio.pause();
        musicBtn.classList.add('muted');
    }
}

// Scratch Card
function setupScratchCard() {
    const scratchSurface = document.querySelector('.scratch-surface');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const card = document.querySelector('.scratch-card');
    
    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
    
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let isDrawing = false;
    
    function startDrawing(e) {
        isDrawing = true;
        scratch(e);
    }
    
    function scratch(e) {
        if (!isDrawing && e.type !== 'touchstart') return;
        
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.clearRect(x - 20, y - 20, 40, 40);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let cleared = 0;
        
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] === 0) cleared++;
        }
        
        if (cleared > (canvas.width * canvas.height * 0.5)) {
            scratchSurface.appendChild(canvas);
            canvas.style.opacity = '0';
            canvas.style.pointerEvents = 'none';
        }
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', () => isDrawing = false);
    
    scratchSurface.appendChild(canvas);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initApp);