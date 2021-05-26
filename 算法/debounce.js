function debounce(func, wait, immediate) {
    let timeout, result;

    const debounced = function () {
        const context = this;
        const args = arguments;

        if (timeout) clearTimeout(timeout);

        if (immediate) {
            // 如果已经执行过，不再执行
            const callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)

            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                result = func.apply(context, args)
            }, wait)
        }

        return result
    }

    debounce.cancel = () => {
        clearTimeout(timeout);
        timeout = null;
    }

    return debounced
}