// Track recently used tools
const recentTools = JSON.parse(localStorage.getItem('recentTools')) || [];

// When a tool is clicked
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', function() {
        const toolName = this.querySelector('h4').textContent;
        const toolUrl = this.getAttribute('href');
        
        // Add to recent tools (max 5)
        const existingIndex = recentTools.findIndex(t => t.url === toolUrl);
        if (existingIndex >= 0) {
            recentTools.splice(existingIndex, 1);
        }
        
        recentTools.unshift({
            name: toolName,
            url: toolUrl,
            icon: this.querySelector('.tool-icon img').getAttribute('src'),
            timestamp: new Date().getTime()
        });
        
        if (recentTools.length > 5) {
            recentTools.pop();
        }
        
        localStorage.setItem('recentTools', JSON.stringify(recentTools));
    });
});

// Display recent tools
function displayRecentTools() {
    const recentToolsSection = document.querySelector('.recent-tools');
    if (recentTools.length > 0) {
        let html = `
            <div class="container">
                <h2>Recently Used Tools</h2>
                <div class="tools-grid">
        `;
        
        recentTools.slice(0, 5).forEach(tool => {
            html += `
                <a href="${tool.url}" class="tool-card">
                    <div class="tool-icon">
                        <img src="${tool.icon}" alt="" width="40" height="40" loading="lazy">
                    </div>
                    <h4>${tool.name}</h4>
                </a>
            `;
        });
        
        html += `</div></div>`;
        recentToolsSection.innerHTML = html;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayRecentTools();
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
