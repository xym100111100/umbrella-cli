/**
 * 得到相对位置的left
 */
export function getRelLeft(dom) {
    // let actualLeft = dom.offsetLeft;
    // let current = dom.offsetParent;

    // while (current !== null) {
    //     actualLeft += current.offsetLeft;
    //     current = current.offsetParent;
    // }

    // return actualLeft;
    return dom.getBoundingClientRect().left;
}

/**
 * 得到相对位置的top
 */
export function getRelTop(dom) {
    // let actualTop = dom.offsetTop;
    // let current = dom.offsetParent;

    // while (current !== null) {
    //     actualTop += current.offsetTop;
    //     current = current.offsetParent;
    // }

    // return actualTop;
    return dom.getBoundingClientRect().top;
}

/**
 * 得到绝对位置的left
 */
export function getAbsLeft(dom) {
    return dom.getBoundingClientRect().left + document.documentElement.scrollLeft;
}

/**
 * 得到绝对位置的top
 */
export function getAbsTop(dom) {
    return dom.getBoundingClientRect().top + document.documentElement.scrollTop;
}
