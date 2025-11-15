(function (global) {
    const PAH = global.PAH || (global.PAH = {});
    PAH.logger = {
        enabled: true,
        log: (...args) => { if (PAH.logger.enabled) console.log("[PAH]", ...args); },
        error: (...args) => { console.error("[PAH]", ...args); }
    };
})(typeof window !== "undefined" ? window : this);
