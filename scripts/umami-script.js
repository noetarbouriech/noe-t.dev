!(function () {
  "use strict";
  ((t) => {
    const {
        screen: { width: e, height: a },
        navigator: { language: r },
        location: i,
        document: n,
        history: s,
        top: o,
      } = t,
      { hostname: c, href: u, origin: l } = i,
      { currentScript: d, referrer: h } = n,
      m = u.startsWith("data:") ? void 0 : t.localStorage;
    if (!d) return;
    const f = "data-",
      p = "true",
      g = d.getAttribute.bind(d),
      y = g(f + "website-id"),
      b = g(f + "host-url"),
      v = g(f + "tag"),
      w = "false" !== g(f + "auto-track"),
      S = g(f + "exclude-search") === p,
      N = g(f + "exclude-hash") === p,
      T = g(f + "domains") || "",
      A = T.split(",").map((t) => t.trim()),
      j = `${(
        b ||
        "https://api-gateway.umami.dev" ||
        d.src.split("/").slice(0, -1).join("/")
      ).replace(/\/$/, "")}/api/send`,
      x = `${e}x${a}`,
      O = /data-umami-event-([\w-_]+)/,
      k = f + "umami-event",
      E = 300,
      L = () => ({
        website: y,
        screen: x,
        language: r,
        title: J,
        hostname: c,
        url: C,
        referrer: I,
        tag: v || void 0,
      }),
      $ = (t, e, a) => {
        a &&
          ((I = C),
          (C = new URL(a, i.href)),
          S && (C.search = ""),
          N && (C.hash = ""),
          (C = C.toString()),
          C !== I && setTimeout(B, E));
      },
      K = () =>
        M || !y || (m && m.getItem("umami.disabled")) || (T && !A.includes(c)),
      U = async (t, e = "event") => {
        if (K()) return;
        const a = { "Content-Type": "application/json" };
        void 0 !== W && (a["x-umami-cache"] = W);
        try {
          const r = await fetch(j, {
              method: "POST",
              body: JSON.stringify({ type: e, payload: t }),
              headers: a,
              credentials: "omit",
            }),
            i = await r.json();
          i && ((M = !!i.disabled), (W = i.cache));
        } catch (t) {}
      },
      _ = () => {
        q ||
          (B(),
          (() => {
            const t = (t, e, a) => {
              const r = t[e];
              return (...e) => (a.apply(null, e), r.apply(t, e));
            };
            (s.pushState = t(s, "pushState", $)),
              (s.replaceState = t(s, "replaceState", $));
          })(),
          (() => {
            const t = new MutationObserver(([t]) => {
                J = t && t.target ? t.target.text : void 0;
              }),
              e = n.querySelector("head > title");
            e &&
              t.observe(e, { subtree: !0, characterData: !0, childList: !0 });
          })(),
          n.addEventListener(
            "click",
            async (t) => {
              const e = (t) => ["BUTTON", "A"].includes(t),
                a = async (t) => {
                  const e = t.getAttribute.bind(t),
                    a = e(k);
                  if (a) {
                    const r = {};
                    return (
                      t.getAttributeNames().forEach((t) => {
                        const a = t.match(O);
                        a && (r[a[1]] = e(t));
                      }),
                      B(a, r)
                    );
                  }
                },
                r = t.target,
                n = e(r.tagName)
                  ? r
                  : ((t, a) => {
                      let r = t;
                      for (let t = 0; t < a; t++) {
                        if (e(r.tagName)) return r;
                        if (((r = r.parentElement), !r)) return null;
                      }
                    })(r, 10);
              if (!n) return a(r);
              {
                const { href: e, target: r } = n,
                  s = n.getAttribute(k);
                if (s)
                  if ("A" === n.tagName) {
                    const c =
                      "_blank" === r ||
                      t.ctrlKey ||
                      t.shiftKey ||
                      t.metaKey ||
                      (t.button && 1 === t.button);
                    if (s && e)
                      return (
                        c || t.preventDefault(),
                        a(n).then(() => {
                          c || (("_top" === r ? o.location : i).href = e);
                        })
                      );
                  } else if ("BUTTON" === n.tagName) return a(n);
              }
            },
            !0
          ),
          (q = !0));
      },
      B = (t, e) =>
        U(
          "string" == typeof t
            ? { ...L(), name: t, data: "object" == typeof e ? e : void 0 }
            : "object" == typeof t
            ? t
            : "function" == typeof t
            ? t(L())
            : L()
        ),
      D = (t) => U({ ...L(), data: t }, "identify");
    t.umami || (t.umami = { track: B, identify: D });
    let W,
      q,
      C = u,
      I = h.startsWith(l) ? "" : h,
      J = n.title,
      M = !1;
    w &&
      !K() &&
      ("complete" === n.readyState
        ? _()
        : n.addEventListener("readystatechange", _, !0));
  })(window);
})();
