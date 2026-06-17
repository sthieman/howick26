/* @ds-bundle: {"namespace":"Howick","components":[{"name":"Button","sourcePath":"components/general/Button/Button.jsx"},{"name":"Gallery","sourcePath":"components/general/Gallery/Gallery.jsx"},{"name":"SiteFooter","sourcePath":"components/general/SiteFooter/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/general/SiteHeader/SiteHeader.jsx"}],"sourceHashes":{"components/general/Button/Button.jsx":"45aeb5134f23","components/general/Button/Button.d.ts":"55d4f304f59c","components/general/Button/Button.prompt.md":"936cf4457d1a","components/general/Gallery/Gallery.jsx":"6150f35fd9e6","components/general/Gallery/Gallery.d.ts":"060d3fc1c2a4","components/general/Gallery/Gallery.prompt.md":"f6e5b311de40","components/general/SiteFooter/SiteFooter.jsx":"c05a05577c24","components/general/SiteFooter/SiteFooter.d.ts":"25b3f2f27d5e","components/general/SiteFooter/SiteFooter.prompt.md":"0e7991a1c6a2","components/general/SiteHeader/SiteHeader.jsx":"f88b0dc875c9","components/general/SiteHeader/SiteHeader.d.ts":"0c2ef4b7c114","components/general/SiteHeader/SiteHeader.prompt.md":"112ba78b7d3d"},"inlinedExternals":[],"builtBy":"cc-design-sync"} */
var Howick = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      var R = window.React;
      function jsx5(t, p, k) {
        return R.createElement(t, k === void 0 ? p : Object.assign({ key: k }, p));
      }
      module.exports = R;
      module.exports.jsx = jsx5;
      module.exports.jsxs = jsx5;
      module.exports.jsxDEV = jsx5;
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync-src/index.ts
  var index_exports = {};
  __export(index_exports, {
    Button: () => Button,
    Gallery: () => Gallery,
    SiteFooter: () => SiteFooter,
    SiteHeader: () => SiteHeader
  });

  // .design-sync-src/shims/next-link.tsx
  var React = __toESM(require_react_shim());
  function Link({
    href,
    children,
    ...rest
  }) {
    const url = typeof href === "string" ? href : href?.pathname ?? "#";
    return React.createElement("a", { href: url, ...rest }, children);
  }

  // src/components/Button.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var base = "inline-flex items-center justify-center gap-2 px-6 py-3 font-heading font-semibold uppercase tracking-wide text-sm border-2 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  var variants = {
    primary: "bg-brand border-brand text-white hover:bg-brand-shade hover:border-brand-shade",
    outline: "bg-transparent border-brand text-brand hover:bg-brand hover:text-white"
  };
  function Button(props) {
    const { variant = "primary", className = "", children, ...rest } = props;
    const cls = `${base} ${variants[variant]} ${className}`;
    if ("href" in props && props.href) {
      const { href, ...linkRest } = rest;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { href, className: cls, ...linkRest, children });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: cls, ...rest, children });
  }

  // src/components/Gallery.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  function Gallery({ photos }) {
    if (photos.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "flex aspect-square items-center justify-center rounded-lg bg-paper-soft text-xs uppercase tracking-wide text-mute",
          children: "Photo"
        },
        i
      )) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", children: photos.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("figure", { className: "group relative overflow-hidden rounded-lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "img",
        {
          src: photo.url,
          alt: photo.caption ?? "Howick 2026 photo",
          className: "aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105",
          loading: "lazy"
        }
      ),
      photo.caption && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("figcaption", { className: "absolute inset-x-0 bottom-0 bg-ink/70 p-2 text-xs text-paper opacity-0 transition-opacity group-hover:opacity-100", children: photo.caption })
    ] }, photo.id)) });
  }

  // src/content/trip.ts
  var trip = {
    church: "Brave Church",
    title: "Howick 2026",
    location: "Howick, KwaZulu-Natal, South Africa",
    dates: "July 5\u201315, 2026",
    tagline: "Following the Howick 2026 mission team to South Africa \u2014 the people, the partners, and the story as it unfolds.",
    donateUrl: "https://brave.org/howick26"
  };

  // src/components/SiteHeader.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var nav = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/donate", label: "Give" }
  ];
  function SiteHeader() {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("header", { className: "sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Link, { href: "/", className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "font-display text-2xl font-bold uppercase tracking-tight text-brand", children: trip.title }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "hidden text-xs font-semibold uppercase tracking-widest text-mute sm:inline", children: trip.church })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("nav", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ul", { className: "hidden items-center gap-6 sm:flex", children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Link,
          {
            href: item.href,
            className: "font-heading text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-brand",
            children: item.label
          }
        ) }, item.href)) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Button, { href: "/donate", className: "px-4 py-2", children: "Support the Team" })
      ] })
    ] }) });
  }

  // src/components/SiteFooter.tsx
  var import_jsx_runtime4 = __toESM(require_react_shim());
  function SiteFooter() {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("footer", { className: "mt-24 border-t border-line bg-ink text-paper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "font-display text-xl font-bold uppercase tracking-tight", children: trip.title }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "mt-1 text-sm text-line-strong", children: [
          trip.church,
          " \xB7 ",
          trip.location,
          " \xB7 ",
          trip.dates
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("nav", { className: "flex gap-6 text-sm font-semibold uppercase tracking-wide", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, { href: "/", className: "hover:text-brand-tint", children: "Home" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, { href: "/blog", className: "hover:text-brand-tint", children: "Blog" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Link, { href: "/donate", className: "hover:text-brand-tint", children: "Give" })
      ] })
    ] }) });
  }
  return __toCommonJS(index_exports);
})();
window.Howick=Howick.__dsMainNs?Object.assign({},Howick,Howick.__dsMainNs,{__dsMainNs:undefined}):Howick;
