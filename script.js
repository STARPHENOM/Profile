document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect
    const paragraphs = document.querySelectorAll(".typewriter");

    paragraphs.forEach((paragraph, index) => {
        const text = paragraph.getAttribute("data-text");
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                paragraph.innerHTML += text.charAt(i);
                i++;
                if(index==1) setTimeout(typeWriter, 5);
                else setTimeout(typeWriter, 15);
            } else if (index + 1 < paragraphs.length) {
                setTimeout(() => paragraphs[index + 1].classList.add("active"), 500);
            }
        }

        typeWriter();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".icon");
    const popup = document.getElementById("popup");
    const platformLinksContainer = document.getElementById("platform-links");

    // Social media links with multiple IDs
    const links = {
        Instagram: ["http://www.instagram.com/star.phenom", "http://www.instagram.com/phenom.dulcet", "http://www.instagram.com/phenom.global", "http://www.instagram.com/phenomxindia"],
        GitHub: ["https://github.com/STARPHENOM"],
        LinkedIn: ["http://www.linkedin.com/in/starphenom"],
        LeetCode: ["https://leetcode.com/u/STARPHENOM/"],
        Twitter: ["https://x.com/phenomkanishk"],
        Telegram: ["https://t.me/starphenom1", "https://t.me/star_phenom"],
        Discord: ["https://discord.gg/4txukxFV"],
        Services: ["www.google.com"],
    };

    icons.forEach((icon) => {
        icon.addEventListener("mouseover", () => {
            const platform = icon.getAttribute("data-platform");
            platformLinksContainer.innerHTML = ""; // Clear previous links

            // Create and append link elements for each ID
            links[platform].forEach((url) => {
                const row = document.createElement("div");
                row.classList.add("platform-row");

                // Add platform logo
                const logo = document.createElement("img");
                logo.src = icon.querySelector("img").src;
                logo.alt = platform + " logo";
                row.appendChild(logo);

                // Add link with username
                const linkElement = document.createElement("a");
                linkElement.href = url;
                linkElement.textContent = extractUsernameFromURL(url);
                linkElement.target = "_blank";
                row.appendChild(linkElement);

                platformLinksContainer.appendChild(row);
                
            });

            // Calculate position after content is added
            popup.style.display = "flex"; // Temporarily display to calculate size
            const popupHeight = popup.offsetHeight;
            const popupWidth = popup.offsetWidth;
            popup.style.display = "none"; // Hide again until fully ready

            const iconRect = icon.getBoundingClientRect();
            const spaceAbove = iconRect.top;
            const spaceBelow = window.innerHeight - iconRect.bottom;

            let popupX = iconRect.left + window.scrollX;
            let popupY;

            if (spaceAbove >= popupHeight) {
                popupY = iconRect.top + window.scrollY - popupHeight; // Position above
            } else {
                popupY = iconRect.bottom + window.scrollY; // Position below
            }

            // Prevent horizontal overflow
            if (popupX + popupWidth > window.innerWidth) {
                popupX = window.innerWidth - popupWidth - 10;
            }

            popup.style.left = `${popupX}px`;
            popup.style.top = `${popupY}px`;
            popup.style.display = "flex"; // Show popup with correct position
            
            popup.classList.add("fade-in")
            
            document.querySelector(".header").classList.add("blur");
            document.querySelector(".social-icons").classList.add("blur");
        });
    });

    popup.addEventListener("mouseleave", () => {
        popup.style.display = "none";
        document.querySelector(".header").classList.remove("blur");
        document.querySelector(".social-icons").classList.remove("blur");
    });

    function extractUsernameFromURL(url) {
        const match = url.match(/\/([^\/]+)\/?$/);
        return match ? match[1] : "Unknown User";
    }
});
