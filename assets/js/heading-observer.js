document.addEventListener("DOMContentLoaded", () => {
    const tocLinks = Array.from(
        document.querySelectorAll('aside nav a[href^="#"]')
    );

    const items = tocLinks
        .map((link) => {
            const id = decodeURIComponent(link.hash.slice(1));
            const heading = document.getElementById(id);

            return heading ? { link, heading } : null;
        })
        .filter(Boolean);

    if (items.length === 0) {
        return;
    }

    const visibleHeadings = new Set();

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleHeadings.add(entry.target);
                } else {
                    visibleHeadings.delete(entry.target);
                }
            });

            items.forEach(({ link, heading }) => {
                link.classList.toggle(
                    "is-visible",
                    visibleHeadings.has(heading)
                );
            });
        },
        {
            rootMargin: "0px 0px 0px 0px",
            threshold: 0,
        }
    );

    items.forEach(({ heading }) => observer.observe(heading));

    const updateVisibleItems = () => {
        const viewportHeight = window.innerHeight;

        items.forEach(({ link, heading }, index) => {
            const nextHeading = items[index + 1]?.heading;
            const top = heading.getBoundingClientRect().top;
            const nextTop = nextHeading
                ? nextHeading.getBoundingClientRect().top
                : Infinity;

            const isVisible = top < viewportHeight && nextTop > 0;

            link.classList.toggle("is-visible", isVisible);
        });
    };

    window.addEventListener("scroll", updateVisibleItems, {
        passive: true,
    });

    window.addEventListener("resize", updateVisibleItems);

    updateVisibleItems();
});