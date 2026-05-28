// Comprehensive list of time zones with their UTC offsets
const TIMEZONES = {
    // Americas
    'America/New_York': { name: 'New York', region: 'USA (Eastern)', offset: null },
    'America/Chicago': { name: 'Chicago', region: 'USA (Central)', offset: null },
    'America/Denver': { name: 'Denver', region: 'USA (Mountain)', offset: null },
    'America/Los_Angeles': { name: 'Los Angeles', region: 'USA (Pacific)', offset: null },
    'America/Anchorage': { name: 'Anchorage', region: 'USA (Alaska)', offset: null },
    'Pacific/Honolulu': { name: 'Honolulu', region: 'USA (Hawaii)', offset: null },
    'America/Toronto': { name: 'Toronto', region: 'Canada (Eastern)', offset: null },
    'America/Vancouver': { name: 'Vancouver', region: 'Canada (Pacific)', offset: null },
    'America/Mexico_City': { name: 'Mexico City', region: 'Mexico', offset: null },
    'America/Buenos_Aires': { name: 'Buenos Aires', region: 'Argentina', offset: null },
    'America/Sao_Paulo': { name: 'São Paulo', region: 'Brazil', offset: null },
    
    // Europe
    'Europe/London': { name: 'London', region: 'United Kingdom', offset: null },
    'Europe/Paris': { name: 'Paris', region: 'France', offset: null },
    'Europe/Berlin': { name: 'Berlin', region: 'Germany', offset: null },
    'Europe/Madrid': { name: 'Madrid', region: 'Spain', offset: null },
    'Europe/Rome': { name: 'Rome', region: 'Italy', offset: null },
    'Europe/Amsterdam': { name: 'Amsterdam', region: 'Netherlands', offset: null },
    'Europe/Brussels': { name: 'Brussels', region: 'Belgium', offset: null },
    'Europe/Zurich': { name: 'Zurich', region: 'Switzerland', offset: null },
    'Europe/Vienna': { name: 'Vienna', region: 'Austria', offset: null },
    'Europe/Prague': { name: 'Prague', region: 'Czech Republic', offset: null },
    'Europe/Budapest': { name: 'Budapest', region: 'Hungary', offset: null },
    'Europe/Warsaw': { name: 'Warsaw', region: 'Poland', offset: null },
    'Europe/Moscow': { name: 'Moscow', region: 'Russia', offset: null },
    'Europe/Istanbul': { name: 'Istanbul', region: 'Turkey', offset: null },
    'Europe/Athens': { name: 'Athens', region: 'Greece', offset: null },
    'Europe/Dublin': { name: 'Dublin', region: 'Ireland', offset: null },
    'Europe/Lisbon': { name: 'Lisbon', region: 'Portugal', offset: null },
    'Europe/Stockholm': { name: 'Stockholm', region: 'Sweden', offset: null },
    'Europe/Copenhagen': { name: 'Copenhagen', region: 'Denmark', offset: null },
    
    // Middle East & Central Asia
    'Asia/Dubai': { name: 'Dubai', region: 'United Arab Emirates', offset: null },
    'Asia/Kolkata': { name: 'Mumbai', region: 'India', offset: null },
    'Asia/Bangkok': { name: 'Bangkok', region: 'Thailand', offset: null },
    'Asia/Singapore': { name: 'Singapore', region: 'Singapore', offset: null },
    'Asia/Hong_Kong': { name: 'Hong Kong', region: 'Hong Kong', offset: null },
    'Asia/Shanghai': { name: 'Shanghai', region: 'China', offset: null },
    'Asia/Tokyo': { name: 'Tokyo', region: 'Japan', offset: null },
    'Asia/Seoul': { name: 'Seoul', region: 'South Korea', offset: null },
    'Asia/Jakarta': { name: 'Jakarta', region: 'Indonesia', offset: null },
    'Asia/Manila': { name: 'Manila', region: 'Philippines', offset: null },
    'Asia/Kuala_Lumpur': { name: 'Kuala Lumpur', region: 'Malaysia', offset: null },
    'Asia/Ho_Chi_Minh': { name: 'Ho Chi Minh City', region: 'Vietnam', offset: null },
    'Asia/Karachi': { name: 'Karachi', region: 'Pakistan', offset: null },
    'Asia/Tehran': { name: 'Tehran', region: 'Iran', offset: null },
    'Asia/Jerusalem': { name: 'Jerusalem', region: 'Israel', offset: null },
    
    // Australia & Pacific
    'Australia/Sydney': { name: 'Sydney', region: 'Australia (Eastern)', offset: null },
    'Australia/Melbourne': { name: 'Melbourne', region: 'Australia (Eastern)', offset: null },
    'Australia/Brisbane': { name: 'Brisbane', region: 'Australia (Eastern)', offset: null },
    'Australia/Adelaide': { name: 'Adelaide', region: 'Australia (Central)', offset: null },
    'Australia/Perth': { name: 'Perth', region: 'Australia (Western)', offset: null },
    'Pacific/Auckland': { name: 'Auckland', region: 'New Zealand', offset: null },
    'Pacific/Fiji': { name: 'Fiji', region: 'Fiji', offset: null },
    'Pacific/Samoa': { name: 'Samoa', region: 'Samoa', offset: null },
    
    // Africa
    'Africa/Cairo': { name: 'Cairo', region: 'Egypt', offset: null },
    'Africa/Johannesburg': { name: 'Johannesburg', region: 'South Africa', offset: null },
    'Africa/Lagos': { name: 'Lagos', region: 'Nigeria', offset: null },
    'Africa/Nairobi': { name: 'Nairobi', region: 'Kenya', offset: null },
    'Africa/Casablanca': { name: 'Casablanca', region: 'Morocco', offset: null },
};

// Default time zones to display
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Asia/Dubai',
    'Europe/Paris'
];

// Global state
let selectedTimezones = [];
let timeFormat = '12h';
let customTimezones = [];

// Initialize app
function initializeClock() {
    loadCustomTimezones();
    loadSelectedTimezones();
    setupEventListeners();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
    populateTimezoneModal();
}

// Setup Event Listeners
function setupEventListeners() {
    // Format toggle
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            timeFormat = e.target.dataset.format;
            updateAllClocks();
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterClocks(e.target.value.toLowerCase());
    });

    // Add custom timezone
    document.getElementById('addTzBtn').addEventListener('click', addCustomTimezone);

    // Modal search
    document.getElementById('modalSearch').addEventListener('input', (e) => {
        filterModal(e.target.value.toLowerCase());
    });

    // Enter key for inputs
    document.getElementById('tzOffset').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCustomTimezone();
    });
}

// Load and save selected timezones
function loadSelectedTimezones() {
    const saved = localStorage.getItem('selectedTimezones');
    if (saved) {
        selectedTimezones = JSON.parse(saved);
    } else {
        selectedTimezones = [...DEFAULT_TIMEZONES];
    }
    renderClocks();
}

function saveSelectedTimezones() {
    localStorage.setItem('selectedTimezones', JSON.stringify(selectedTimezones));
}

// Load and save custom timezones
function loadCustomTimezones() {
    const saved = localStorage.getItem('customTimezones');
    if (saved) {
        customTimezones = JSON.parse(saved);
    }
}

function saveCustomTimezones() {
    localStorage.setItem('customTimezones', JSON.stringify(customTimezones));
}

// Add custom timezone
function addCustomTimezone() {
    const name = document.getElementById('tzName').value.trim();
    const offset = document.getElementById('tzOffset').value.trim();

    if (!name || !offset) {
        alert('Please enter both name and UTC offset');
        return;
    }

    // Validate offset format
    const offsetRegex = /^([+-])?([0-9]{1,2}):?([0-9]{0,2})$/;
    if (!offsetRegex.test(offset)) {
        alert('Invalid offset format. Use: +5:30, -8:00, or +2');
        return;
    }

    const tzId = `custom_${Date.now()}`;
    const tzData = parseOffset(offset);

    customTimezones.push({
        id: tzId,
        name: name,
        offset: tzData
    });

    selectedTimezones.push(tzId);
    saveCustomTimezones();
    saveSelectedTimezones();

    document.getElementById('tzName').value = '';
    document.getElementById('tzOffset').value = '';

    renderClocks();
    showNotification(`Added ${name}!`);
}

// Parse UTC offset string
function parseOffset(offsetStr) {
    const match = offsetStr.match(/^([+-])?(\d{1,2}):?(\d{0,2})$/);
    if (!match) return 0;

    const sign = match[1] === '-' ? -1 : 1;
    const hours = parseInt(match[2]) || 0;
    const minutes = parseInt(match[3]) || 0;

    return sign * (hours * 60 + minutes);
}

// Format UTC offset for display
function formatOffset(minutes) {
    const hours = Math.floor(Math.abs(minutes) / 60);
    const mins = Math.abs(minutes) % 60;
    const sign = minutes >= 0 ? '+' : '-';
    return `UTC ${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Render clock cards
function renderClocks() {
    const grid = document.getElementById('clocksGrid');
    grid.innerHTML = '';

    selectedTimezones.forEach(tzId => {
        let tzData;
        let tzName;
        let region;
        let isCustom = false;

        if (tzId.startsWith('custom_')) {
            const custom = customTimezones.find(c => c.id === tzId);
            if (!custom) return;
            tzData = custom;
            tzName = custom.name;
            region = '';
            isCustom = true;
        } else {
            tzData = TIMEZONES[tzId];
            if (!tzData) return;
            tzName = tzData.name;
            region = tzData.region;
        }

        const card = document.createElement('div');
        card.className = 'clock-card';
        card.id = `clock-${tzId}`;

        const removeBtn = isCustom ? `
            <button class="clock-remove" onclick="removeTimezone('${tzId}')">✕</button>
        ` : '';

        card.innerHTML = `
            ${removeBtn}
            <div class="clock-timezone">${tzName}</div>
            ${region ? `<div class="clock-location">${region}</div>` : ''}
            <div class="clock-display">
                <div class="clock-time" data-tz="${tzId}">--:--:--</div>
                <div class="clock-period" data-period="${tzId}">--</div>
            </div>
            <div class="clock-date" data-date="${tzId}">-- -- ----</div>
            <div class="clock-offset" data-offset="${tzId}">UTC</div>
        `;

        grid.appendChild(card);
    });

    updateAllClocks();
}

// Update all clock displays
function updateAllClocks() {
    const now = new Date();
    const updateTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const utcTime = updateTime.getTime();

    selectedTimezones.forEach(tzId => {
        let offsetMinutes = 0;

        if (tzId.startsWith('custom_')) {
            const custom = customTimezones.find(c => c.id === tzId);
            if (custom) offsetMinutes = custom.offset;
        } else {
            // Get actual offset using timezone formatter
            const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tzId }));
            const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
            offsetMinutes = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);
        }

        const tzTime = new Date(utcTime + offsetMinutes * 60000);
        updateClockDisplay(tzId, tzTime, offsetMinutes);
    });

    // Update last updated time
    const lastUpdated = new Date();
    document.getElementById('lastUpdated').textContent = lastUpdated.toLocaleTimeString();
}

// Update individual clock
function updateClockDisplay(tzId, date, offsetMinutes) {
    const timeElement = document.querySelector(`[data-tz="${tzId}"]`);
    const periodElement = document.querySelector(`[data-period="${tzId}"]`);
    const dateElement = document.querySelector(`[data-date="${tzId}"]`);
    const offsetElement = document.querySelector(`[data-offset="${tzId}"]`);

    if (!timeElement) return;

    // Format time based on selected format
    let timeStr;
    if (timeFormat === '24h') {
        timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    } else {
        const hours = date.getHours() % 12 || 12;
        const period = date.getHours() >= 12 ? 'PM' : 'AM';
        timeStr = `${String(hours).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
        if (periodElement) periodElement.textContent = period;
    }

    timeElement.textContent = timeStr;

    // Format date
    const dateStr = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    dateElement.textContent = dateStr;

    // Format offset
    offsetElement.textContent = formatOffset(offsetMinutes);
}

// Filter clocks by search
function filterClocks(query) {
    const cards = document.querySelectorAll('.clock-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

// Populate timezone modal with full list
function populateTimezoneModal() {
    const list = document.getElementById('timezoneList');
    list.innerHTML = '';

    Object.entries(TIMEZONES).forEach(([tzId, tzData]) => {
        const item = document.createElement('div');
        item.className = 'timezone-item';
        item.innerHTML = `<strong>${tzData.name}</strong><br><small>${tzData.region}</small>`;
        item.addEventListener('click', () => {
            if (!selectedTimezones.includes(tzId)) {
                selectedTimezones.push(tzId);
                saveSelectedTimezones();
                renderClocks();
                closeModal();
            }
        });
        list.appendChild(item);
    });
}

// Filter modal timezone list
function filterModal(query) {
    const items = document.querySelectorAll('.timezone-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}

// Remove timezone
function removeTimezone(tzId) {
    selectedTimezones = selectedTimezones.filter(id => id !== tzId);
    customTimezones = customTimezones.filter(tz => tz.id !== tzId);
    saveCustomTimezones();
    saveSelectedTimezones();
    renderClocks();
}

// Modal functions
function closeModal() {
    document.getElementById('timezoneModal').classList.remove('active');
}

// Show notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(212, 71, 127, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initializeClock);
