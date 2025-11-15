(function (global) {
    const PAH = global.PAH || (global.PAH = {});

    PAH.utils = PAH.utils || {};

    PAH.utils.safeText = function (el) {
        if (!el) return "";
        return (el.innerText || el.textContent || "").trim();
    };

    PAH.utils.createEl = function (tag, attrs = {}, children = []) {
        const el = document.createElement(tag);
        Object.entries(attrs).forEach(([k, v]) => {
            if (k === "style") {
                Object.assign(el.style, v);
            } else if (k in el) {
                el[k] = v;
            } else {
                el.setAttribute(k, v);
            }
        });
        children.forEach((c) => {
            if (typeof c === "string") el.appendChild(document.createTextNode(c));
            else if (c instanceof Node) el.appendChild(c);
        });
        return el;
    };

    PAH.utils.showToast = function (msg) {
        const id = "pah-toast";
        let toast = document.getElementById(id);
        if (!toast) {
            toast = PAH.utils.createEl("div", {
                id,
                style: {
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    padding: "10px 16px",
                    background: "#333",
                    color: "#fff",
                    borderRadius: "6px",
                    zIndex: 999999,
                    fontSize: "12px",
                    opacity: "0",
                    transition: "opacity 0.2s"
                }
            });
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = "1";
        setTimeout(() => { toast.style.opacity = "0"; }, 2000);
    };
})(typeof window !== "undefined" ? window : this);
