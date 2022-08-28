function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

function isInViewport(element) {
    const bounding = element.getBoundingClientRect();

    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const screenSize = {
    isXs: () => {
        return window.innerWidth < 768;
    },
    isSm: () => {
        return window.innerWidth >= 768 && window.innerWidth < 992;
    },
    isMd: () => {
        return window.innerWidth >= 992 && window.innerWidth <= 1200;
    },
    isLg: () => {
        return window.innerWidth > 1200;
    },
};

function qs(selector, root = document) {
    return root.querySelector(selector);
}

function qsa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
}

export {
    debounce,
    isInViewport,
    screenSize,
    qs,
    qsa,
};
