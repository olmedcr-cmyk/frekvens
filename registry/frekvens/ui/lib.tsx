"use client"
/* Frekvens — utilidades compartidas. MIT © Cris Olmedo */

import * as React from "react"

const R: any = React
const { useState, useRef, useEffect }: any = React

export var useIsoLayout: any =
  typeof window !== "undefined" && R.useLayoutEffect ? R.useLayoutEffect : R.useEffect
export function cx(..._args: any[]): any {
  return Array.prototype.filter.call(arguments, Boolean).join(" ")
}
export function omit(o?: any, keys?: any): any {
  var r: any = {}
  for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]
  return r
}
export function range(n?: any): any {
  var a: any = []
  for (var i: any = 0; i < n; i++) a.push(i)
  return a
}
export function clamp(v?: any, a?: any, b?: any): any {
  return Math.max(a, Math.min(b, v))
}
/* controlled-or-uncontrolled value */
/* controlled-or-uncontrolled value */
export function useValue(p?: any, fallback?: any): any {
  var s: any = useState(p.defaultValue != null ? p.defaultValue : fallback)
  var v: any = p.value != null ? p.value : s[0]
  return [
    v,
    function (n?: any): any {
      if (p.value == null) s[1](n)
      if (p.onChange) p.onChange(n)
    },
  ]
}

/* ---------- Icon: 24 grid, 2px stroke, square caps ---------- */
export var F: any = {
  fill: "currentColor",
  stroke: "none",
}
export var ICONS: any = {
  play: [
    [
      "path",
      Object.assign(
        {
          d: "M7 4.5 19.5 12 7 19.5z",
        },
        F,
      ),
    ],
  ],
  pause: [
    [
      "rect",
      Object.assign(
        {
          x: 6,
          y: 5,
          width: 4,
          height: 14,
        },
        F,
      ),
    ],
    [
      "rect",
      Object.assign(
        {
          x: 14,
          y: 5,
          width: 4,
          height: 14,
        },
        F,
      ),
    ],
  ],
  stop: [
    [
      "rect",
      Object.assign(
        {
          x: 6,
          y: 6,
          width: 12,
          height: 12,
        },
        F,
      ),
    ],
  ],
  rec: [
    [
      "circle",
      Object.assign(
        {
          cx: 12,
          cy: 12,
          r: 7,
        },
        F,
      ),
    ],
  ],
  plus: [
    [
      "path",
      {
        d: "M12 4v16M4 12h16",
      },
    ],
  ],
  minus: [
    [
      "path",
      {
        d: "M4 12h16",
      },
    ],
  ],
  "arrow-right": [
    [
      "path",
      {
        d: "M4 12h15M13 6l6 6-6 6",
      },
    ],
  ],
  "arrow-left": [
    [
      "path",
      {
        d: "M20 12H5M11 6l-6 6 6 6",
      },
    ],
  ],
  "arrow-up-right": [
    [
      "path",
      {
        d: "M7 17 17 7M9 7h8v8",
      },
    ],
  ],
  "chevron-down": [
    [
      "path",
      {
        d: "M6 9l6 6 6-6",
      },
    ],
  ],
  "chevron-right": [
    [
      "path",
      {
        d: "M9 6l6 6-6 6",
      },
    ],
  ],
  "chevron-left": [
    [
      "path",
      {
        d: "M15 6l-6 6 6 6",
      },
    ],
  ],
  "arrow-down": [
    [
      "path",
      {
        d: "M12 4v15M6 13l6 6 6-6",
      },
    ],
  ],
  "arrow-down-left": [
    [
      "path",
      {
        d: "M17 7 7 17M15 17H7V9",
      },
    ],
  ],
  menu: [
    [
      "path",
      {
        d: "M4 8h16M4 16h16",
      },
    ],
  ],
  search: [
    [
      "circle",
      {
        cx: 11,
        cy: 11,
        r: 6.5,
      },
    ],
    [
      "path",
      {
        d: "M16 16l4.5 4.5",
      },
    ],
  ],
  heart: [
    [
      "path",
      {
        d: "M12 20 4.5 12.5a4.6 4.6 0 0 1 6.5-6.5l1 1 1-1a4.6 4.6 0 0 1 6.5 6.5z",
      },
    ],
  ],
  bookmark: [
    [
      "path",
      {
        d: "M6.5 4h11v16.5L12 16l-5.5 4.5z",
      },
    ],
  ],
  calendar: [
    [
      "rect",
      {
        x: 4,
        y: 5.5,
        width: 16,
        height: 14.5,
      },
    ],
    [
      "path",
      {
        d: "M4 10h16M8 3v4M16 3v4",
      },
    ],
  ],
  folder: [
    [
      "path",
      {
        d: "M3.5 6h6l2 2.5h9V19h-17z",
      },
    ],
  ],
  card: [
    [
      "rect",
      {
        x: 3,
        y: 5.5,
        width: 18,
        height: 13,
      },
    ],
    [
      "path",
      {
        d: "M3 10h18M6.5 15h4",
      },
    ],
  ],
  user: [
    [
      "circle",
      {
        cx: 12,
        cy: 8,
        r: 4,
      },
    ],
    [
      "path",
      {
        d: "M4.5 20.5a7.5 7.5 0 0 1 15 0",
      },
    ],
  ],
  sliders: [
    [
      "path",
      {
        d: "M4 8h9M17 8h3M4 16h3M11 16h9",
      },
    ],
    [
      "circle",
      {
        cx: 15,
        cy: 8,
        r: 2,
      },
    ],
    [
      "circle",
      {
        cx: 9,
        cy: 16,
        r: 2,
      },
    ],
  ],
  share: [
    [
      "circle",
      {
        cx: 6,
        cy: 12,
        r: 2.5,
      },
    ],
    [
      "circle",
      {
        cx: 17.5,
        cy: 6,
        r: 2.5,
      },
    ],
    [
      "circle",
      {
        cx: 17.5,
        cy: 18,
        r: 2.5,
      },
    ],
    [
      "path",
      {
        d: "M8.2 10.8 15.3 7.2M8.2 13.2l7.1 3.6",
      },
    ],
  ],
  chart: [
    [
      "path",
      {
        d: "M5 20V11M12 20V4M19 20v-6",
      },
    ],
  ],
  bolt: [
    [
      "path",
      {
        d: "M13 3 5.5 13.5H12L11 21l7.5-10.5H12z",
      },
    ],
  ],
  grid: [
    [
      "rect",
      {
        x: 4,
        y: 4,
        width: 6.5,
        height: 6.5,
      },
    ],
    [
      "rect",
      {
        x: 13.5,
        y: 4,
        width: 6.5,
        height: 6.5,
      },
    ],
    [
      "rect",
      {
        x: 4,
        y: 13.5,
        width: 6.5,
        height: 6.5,
      },
    ],
    [
      "rect",
      {
        x: 13.5,
        y: 13.5,
        width: 6.5,
        height: 6.5,
      },
    ],
  ],
  close: [
    [
      "path",
      {
        d: "M6 6l12 12M18 6 6 18",
      },
    ],
  ],
  check: [
    [
      "path",
      {
        d: "M4.5 12.5 9.5 17.5 19.5 6.5",
      },
    ],
  ],
  timer: [
    [
      "circle",
      {
        cx: 12,
        cy: 13.5,
        r: 7.5,
      },
    ],
    [
      "path",
      {
        d: "M12 13.5V9M9 2.5h6",
      },
    ],
  ],
  power: [
    [
      "path",
      {
        d: "M12 3v8M7.1 6.4a7.5 7.5 0 1 0 9.8 0",
      },
    ],
  ],
  lock: [
    [
      "rect",
      {
        x: 5,
        y: 11,
        width: 14,
        height: 9,
      },
    ],
    [
      "path",
      {
        d: "M8 11V8a4 4 0 0 1 8 0v3",
      },
    ],
  ],
  dots: [
    [
      "circle",
      Object.assign(
        {
          cx: 6,
          cy: 6,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 12,
          cy: 6,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 18,
          cy: 6,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 6,
          cy: 12,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 12,
          cy: 12,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 18,
          cy: 12,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 6,
          cy: 18,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 12,
          cy: 18,
          r: 1.6,
        },
        F,
      ),
    ],
    [
      "circle",
      Object.assign(
        {
          cx: 18,
          cy: 18,
          r: 1.6,
        },
        F,
      ),
    ],
  ],
  home: [
    [
      "path",
      {
        d: "M4 11 12 4l8 7v9H4z",
      },
    ],
  ],
  drop: [
    [
      "path",
      {
        d: "M12 3.5s6 6.6 6 10.5a6 6 0 0 1-12 0c0-3.9 6-10.5 6-10.5z",
      },
    ],
  ],
  flag: [
    [
      "path",
      {
        d: "M6 21V4h11l-2 4 2 4H6",
      },
    ],
  ],
  refresh: [
    [
      "path",
      {
        d: "M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4v4h-4",
      },
    ],
  ],
  mic: [
    [
      "rect",
      {
        x: 9,
        y: 3,
        width: 6,
        height: 11,
        rx: 3,
      },
    ],
    [
      "path",
      {
        d: "M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21",
      },
    ],
  ],
  "arrow-up": [
    [
      "path",
      {
        d: "M12 20V5M6 11l6-6 6 6",
      },
    ],
  ],
  copy: [
    [
      "rect",
      {
        x: 8,
        y: 8,
        width: 12,
        height: 12,
      },
    ],
    [
      "path",
      {
        d: "M16 8V4H4v12h4",
      },
    ],
  ],
  "volume-off": [
    [
      "path",
      Object.assign(
        {
          d: "M4 9h4l5-4v14l-5-4H4z",
        },
        F,
      ),
    ],
    [
      "path",
      {
        d: "M16 9l6 6M22 9l-6 6",
      },
    ],
  ],
  expand: [
    [
      "path",
      {
        d: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
      },
    ],
  ],
  volume: [
    [
      "path",
      Object.assign(
        {
          d: "M4 9h4l5-4v14l-5-4H4z",
        },
        F,
      ),
    ],
    [
      "path",
      {
        d: "M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11",
      },
    ],
  ],
  sun: [
    [
      "circle",
      Object.assign(
        {
          cx: 12,
          cy: 12,
          r: 4.5,
        },
        F,
      ),
    ],
    [
      "path",
      {
        d: "M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1",
      },
    ],
  ],
}
/* ---------- Switch ---------- */
/* ---------- useFollow: muelle que se pega a un rectángulo y conserva el impulso al cambiar de destino
   (de Follow, stageshow/benjitaylor: k 0.25, amortiguación 2·√k·0.95, paso fijo de 60 Hz). Una transición CSS
   vuelve a arrancar desde parado en cada cambio; esto reengancha desde la posición y velocidad actuales. ---------- */
export function useFollow(target?: any, opts?: any): any {
  var ref: any = useRef(null),
    st: any = useRef({
      c: null,
      v: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },
      raf: 0,
      t: null,
      prev: 0,
      rem: 0,
    }),
    k: any = (opts && opts.stiffness) || 0.25,
    damp: any = 2 * Math.sqrt(k) * 0.95,
    keys: any = ["x", "y", "w", "h"]
  function paint(c?: any): any {
    var el: any = ref.current
    if (!el) return
    el.style.transform = "translate(" + c.x.toFixed(2) + "px," + c.y.toFixed(2) + "px)"
    el.style.width = c.w.toFixed(2) + "px"
    if (c.h) el.style.height = c.h.toFixed(2) + "px"
  }
  useIsoLayout(
    function (): any {
      var s: any = st.current
      s.t = target
      if (!target) return
      if (!s.c || reduced() || (opts && opts.instant)) {
        s.c = Object.assign({}, target)
        s.v = {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        }
        paint(s.c)
        return
      }
      if (s.raf) return
      s.prev = performance.now()
      s.rem = 0
      function step(now?: any): any {
        var t: any = s.t
        s.rem += Math.min(100, now - s.prev)
        s.prev = now
        while (s.rem >= 16.667) {
          keys.forEach(function (q?: any): any {
            s.v[q] += ((t[q] || 0) - (s.c[q] || 0)) * k - s.v[q] * damp
            s.c[q] = (s.c[q] || 0) + s.v[q]
          })
          s.rem -= 16.667
        }
        paint(s.c)
        var rest: any = keys.every(function (q?: any): any {
          return Math.abs((t[q] || 0) - (s.c[q] || 0)) < 0.2 && Math.abs(s.v[q]) < 0.05
        })
        if (rest) {
          s.c = Object.assign({}, t)
          paint(s.c)
          s.raf = 0
          return
        }
        s.raf = requestAnimationFrame(step)
      }
      s.raf = requestAnimationFrame(step)
    },
    [target && target.x, target && target.y, target && target.w, target && target.h],
  )
  useEffect(function (): any {
    return function (): any {
      cancelAnimationFrame(st.current.raf)
    }
  }, [])
  return ref
}
export var GLYPH: any = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  ":": ["0", "0", "1", "0", "1", "0", "0"],
  ".": ["0", "0", "0", "0", "0", "0", "1"],
  "°": ["010", "101", "010", "000", "000", "000", "000"],
  "%": ["11001", "11010", "00010", "00100", "01000", "01011", "10011"],
  "-": ["000", "000", "000", "111", "000", "000", "000"],
  " ": ["00", "00", "00", "00", "00", "00", "00"],
}
export function textRows(str?: any): any {
  var rows: any = ["", "", "", "", "", "", ""]
  String(str)
    .split("")
    .forEach(function (ch?: any, i?: any): any {
      var g: any = GLYPH[ch] || GLYPH[" "]
      for (var r: any = 0; r < 7; r++) rows[r] += (i ? "0" : "") + g[r]
    })
  return rows
}
export function shapeRows(name?: any, n?: any): any {
  n = n || 15
  var rows: any = [],
    c: any = (n - 1) / 2
  for (var y: any = 0; y < n; y++) {
    var row: any = ""
    for (var x: any = 0; x < n; x++) {
      var dx: any = x - c,
        dy: any = y - c,
        d: any = Math.sqrt(dx * dx + dy * dy),
        on: any = false
      if (name === "sun") {
        on = d <= c * 0.55
        for (var k: any = 0; k < 8; k++) {
          var a: any = (k * Math.PI) / 4,
            rx: any = c + c * 0.9 * Math.sin(a),
            ry: any = c - c * 0.9 * Math.cos(a)
          if (Math.abs(x - rx) <= 0.75 && Math.abs(y - ry) <= 0.75) on = true
        }
      } else if (name === "cloud") {
        var yy: any = y - n * 0.22
        on =
          Math.hypot(x - n * 0.33, yy - n * 0.42) <= n * 0.2 ||
          Math.hypot(x - n * 0.58, yy - n * 0.33) <= n * 0.25 ||
          Math.hypot(x - n * 0.78, yy - n * 0.47) <= n * 0.16 ||
          (yy >= n * 0.42 && yy <= n * 0.6 && x >= n * 0.16 && x <= n * 0.9)
      } else if (name === "drop") {
        var cy2: any = c + n * 0.15
        on =
          Math.hypot(dx, y - cy2) <= n * 0.33 ||
          (y < cy2 && y >= 1 && Math.abs(dx) <= ((y - 1) / (cy2 - 1)) * n * 0.33 * 0.95)
      } else if (name === "ring") {
        on = d <= c + 0.2 && d >= c - 1.6
      } else if (name === "disc") {
        on = d <= c + 0.2
      } else if (name === "heart") {
        var X: any = (dx / c) * 1.25,
          Y: any = (-dy / c) * 1.25 + 0.25
        on = Math.pow(X * X + Y * Y - 1, 3) - X * X * Y * Y * Y <= 0
      }
      row += on ? "1" : "0"
    }
    rows.push(row)
  }
  return rows
}
export function norm(opts?: any): any {
  return (opts || []).map(function (o?: any): any {
    return typeof o === "string"
      ? {
          value: o,
          label: o,
        }
      : o
  })
}
export function reduced(): any {
  return (
    typeof window !== "undefined" &&
    !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  )
}
/* keep an overlay mounted through its exit animation */
/* keep an overlay mounted through its exit animation */
export function usePresence(open?: any, ms?: any): any {
  var s: any = useState(open),
    mounted: any = s[0],
    setMounted: any = s[1]
  var v: any = useState(false),
    shown: any = v[0],
    setShown: any = v[1]
  useEffect(
    function (): any {
      if (open) {
        setMounted(true)
        var r: any = requestAnimationFrame(function (): any {
          requestAnimationFrame(function (): any {
            setShown(true)
          })
        })
        return function (): any {
          cancelAnimationFrame(r)
        }
      }
      setShown(false)
      var t: any = setTimeout(
        function (): any {
          setMounted(false)
        },
        reduced() ? 0 : ms,
      )
      return function (): any {
        clearTimeout(t)
      }
    },
    [open],
  )
  return [mounted, shown]
}
export function useOutside(ref?: any, active?: any, cb?: any): any {
  useEffect(
    function (): any {
      if (!active) return
      function f(e?: any): any {
        if (ref.current && !ref.current.contains(e.target)) cb()
      }
      document.addEventListener("pointerdown", f)
      return function (): any {
        document.removeEventListener("pointerdown", f)
      }
    },
    [active],
  )
}

/* ---------- Select: listbox dropdown, focus stays on the trigger ---------- */

/* ================= Frekvens 3: tiempo, mecanismos, conversación, generativo ================= */
export function pad(n?: any, w?: any): any {
  n = String(Math.floor(n))
  while (n.length < (w || 2)) n = "0" + n
  return n
}
export function fmt(ms?: any, cs?: any): any {
  var t: any = Math.max(0, ms),
    m: any = Math.floor(t / 60000),
    s: any = Math.floor(t / 1000) % 60,
    c: any = Math.floor(t / 10) % 100
  return pad(m) + ":" + pad(s) + (cs ? "." + pad(c) : "")
}
/* rAF clock: returns elapsed ms while running */
/* rAF clock: returns elapsed ms while running */
export function useClock(running?: any, base?: any): any {
  var s: any = useState(0),
    now: any = s[0],
    setNow: any = s[1],
    start: any = useRef(null),
    acc: any = useRef(0)
  useEffect(
    function (): any {
      if (!running) {
        if (start.current != null) {
          acc.current += performance.now() - start.current
          start.current = null
        }
        return
      }
      start.current = performance.now()
      var raf: any
      function tick(): any {
        setNow(acc.current + performance.now() - start.current)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return function (): any {
        cancelAnimationFrame(raf)
      }
    },
    [running],
  )
  return [
    running ? now : acc.current,
    function (): any {
      acc.current = 0
      start.current = running ? performance.now() : null
      setNow(0)
    },
  ]
}
export var TEXT_TAG: any = {
  "display-xl": "h1",
  title: "h2",
  headline: "h3",
  "numeral-xl": "div",
  "dot-hero": "div",
  "dot-display": "div",
  lead: "p",
  body: "p",
  "body-strong": "p",
  caption: "p",
  label: "span",
  readout: "span",
}
/* ================= Frekvens 4: medios, tickers, carrusel, agente, formularios, feedback, navegación ================= */
export function useMedia(p?: any, ref?: any): any {
  /* real <video>/<audio> when src exists; otherwise a simulated clock so demos and generated UI still behave */
  var sim: any = !p.src,
    dur0: any = p.duration || 90
  var s: any = useState({
      t: 0,
      d: sim ? dur0 : 0,
      playing: !!p.autoPlay,
      muted: !!p.muted,
    }),
    st: any = s[0],
    set: any = s[1]
  var clk: any = useClock(sim && st.playing)
  var base: any = useRef(0)
  var t: any = sim ? Math.min(st.d, base.current + clk[0] / 1000) : st.t
  useEffect(function (): any {
    if (sim && t >= st.d && st.playing) {
      if (p.loop) {
        base.current = 0
        clk[1]()
      } else
        set(
          Object.assign({}, st, {
            playing: false,
          }),
        )
    }
  })
  useEffect(
    function (): any {
      var m: any = ref.current
      if (sim || !m) return
      function up(): any {
        set(function (o?: any): any {
          return Object.assign({}, o, {
            t: m.currentTime,
            d: m.duration || o.d,
            playing: !m.paused,
            muted: m.muted,
          })
        })
      }
      ;["timeupdate", "durationchange", "play", "pause", "volumechange", "loadedmetadata"].forEach(function (
        e?: any,
      ): any {
        m.addEventListener(e, up)
      })
      return function (): any {
        ;["timeupdate", "durationchange", "play", "pause", "volumechange", "loadedmetadata"].forEach(
          function (e?: any): any {
            m.removeEventListener(e, up)
          },
        )
      }
    },
    [sim],
  )
  return {
    t: t,
    d: st.d,
    playing: st.playing,
    muted: st.muted,
    toggle: function (): any {
      if (sim) {
        if (t >= st.d) {
          base.current = 0
          clk[1]()
        }
        set(
          Object.assign({}, st, {
            playing: !st.playing,
          }),
        )
      } else {
        var m: any = ref.current
        m.paused ? m.play() : m.pause()
      }
    },
    seek: function (x?: any): any {
      x = clamp(x, 0, st.d || 0)
      if (sim) {
        base.current = x
        clk[1]()
        set(Object.assign({}, st))
      } else ref.current.currentTime = x
    },
    mute: function (): any {
      if (sim)
        set(
          Object.assign({}, st, {
            muted: !st.muted,
          }),
        )
      else ref.current.muted = !ref.current.muted
    },
  }
}
export function fmtS(s?: any): any {
  s = Math.max(0, Math.floor(s || 0))
  return pad(Math.floor(s / 60)) + ":" + pad(s % 60)
}
export function Scrub(p?: any): any {
  var ref: any = useRef(null),
    drag: any = useRef(false)
  function at(e?: any): any {
    var r: any = ref.current.getBoundingClientRect()
    p.onSeek(clamp((e.clientX - r.left) / r.width, 0, 1) * p.d)
  }
  var pct: any = p.d ? (p.t / p.d) * 100 : 0
  return (
    <div
      ref={ref}
      className="frk-scrub"
      role="slider"
      tabIndex={0}
      aria-label={p.label || "Posición"}
      aria-valuemin={0}
      aria-valuemax={Math.round(p.d || 0)}
      aria-valuenow={Math.round(p.t)}
      aria-valuetext={fmtS(p.t) + " de " + fmtS(p.d)}
      onPointerDown={function (e?: any): any {
        drag.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        at(e)
      }}
      onPointerMove={function (e?: any): any {
        if (drag.current) at(e)
      }}
      onPointerUp={function (): any {
        drag.current = false
      }}
      onKeyDown={function (e?: any): any {
        if (e.key === "ArrowRight") {
          e.preventDefault()
          p.onSeek(p.t + 5)
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          p.onSeek(p.t - 5)
        } else if (e.key === "Home") p.onSeek(0)
        else if (e.key === "End") p.onSeek(p.d)
      }}
    >
      <span className="frk-scrub__rail">
        <span
          className="frk-scrub__fill"
          style={{
            width: pct + "%",
          }}
        />
        {(p.marks || []).map(function (m?: any, i?: any): any {
          return (
            <span
              key={i}
              className="frk-scrub__mark"
              style={{
                left: (m / (p.d || 1)) * 100 + "%",
              }}
            />
          )
        })}
      </span>
      <span
        className="frk-scrub__thumb"
        style={{
          left: pct + "%",
        }}
      />
    </div>
  )
}

/* ---------- MediaPlayer: vídeo ---------- */

/* ---------- AudioTrack: onda de barras ---------- */
export function seeded(n?: any, seed?: any): any {
  var x: any = seed || 7,
    a: any = []
  for (var i: any = 0; i < n; i++) {
    x = (x * 9301 + 49297) % 233280
    var r: any = x / 233280
    a.push(0.25 + 0.75 * Math.abs(Math.sin(i / 5 + r * 2)) * (0.6 + 0.4 * r))
  }
  return a
}
export var FLAP: any = " ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789:·-"
export var DOW: any = ["L", "M", "X", "J", "V", "S", "D"]
export var MES: any = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
]
export function iso(d?: any): any {
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate())
}
export function parseISO(s?: any): any {
  var a: any = String(s).split("-")
  return new Date(+a[0], +a[1] - 1, +a[2])
}
export function addD(d?: any, n?: any): any {
  var x: any = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
export var BANNER: any = {
  info: ["klein-soft", "dots"],
  ok: ["verde", "check"],
  warn: ["sol", "timer"],
  error: ["rec", "close"],
}
/* ================= Frekvens 5: datos densos, música, SaaS, notch, 3D, banca, energía, captura ================= */
export function lvl(v?: any, mx?: any): any {
  return mx ? clamp(v / mx, 0, 1) : 0
}

/* ---------- Heatmap: semitono de puntos ---------- */
export var BLOCKS: any = [
  {
    type: "p",
    label: "Texto",
    icon: "dots",
  },
  {
    type: "h",
    label: "Título",
    icon: "arrow-up",
  },
  {
    type: "todo",
    label: "Tarea",
    icon: "check",
  },
  {
    type: "quote",
    label: "Cita",
    icon: "copy",
  },
  {
    type: "voice",
    label: "Nota de voz",
    icon: "mic",
  },
]
/* ---------- FileDrop: subir archivos ---------- */
export function fmtSize(b?: any): any {
  return b > 1048576
    ? (b / 1048576).toFixed(1).replace(".", ",") + " MB"
    : Math.max(1, Math.round(b / 1024)) + " KB"
}
/* ---------- Frekvens Lang: UI generativa en líneas (streaming) ---------- */
/* id = Tipo({props}, [hijos])   ·   id = Tipo("texto")   ·   las referencias a ids aún no llegados se pintan como hueco */
export function parseLang(src?: any): any {
  var defs: any = {},
    order: any = []
  String(src || "")
    .split("\n")
    .forEach(function (line?: any): any {
      line = line.trim()
      if (!line || line.indexOf("//") === 0) return
      var m: any = /^([A-Za-z_][\w]*)\s*=\s*([A-Z][A-Za-z0-9]*)\s*\(([\s\S]*)\)\s*;?$/.exec(line)
      if (!m) return
      var args: any = m[3].trim(),
        props: any = {},
        children: any = []
      try {
        var i: any = 0
        if (args.charAt(0) === "{") {
          var depth: any = 0,
            j: any = 0,
            inS: any = false
          for (; j < args.length; j++) {
            var c: any = args.charAt(j)
            if (c === '"' && args.charAt(j - 1) !== "\\") inS = !inS
            if (inS) continue
            if (c === "{") depth++
            if (c === "}") {
              depth--
              if (!depth) break
            }
          }
          props = JSON.parse(args.slice(0, j + 1).replace(/([{,]\s*)([A-Za-z_][\w-]*)\s*:/g, '$1"$2":'))
          i = j + 1
          args = args.slice(i).replace(/^\s*,\s*/, "")
        }
        if (args.charAt(0) === "[") {
          var inner: any = args.slice(1, args.lastIndexOf("]"))
          children = inner
            .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
            .map(function (x?: any): any {
              x = x.trim()
              return x.charAt(0) === '"'
                ? JSON.parse(x)
                : x
                  ? {
                      ref: x,
                    }
                  : null
            })
            .filter(Boolean)
        } else if (args.charAt(0) === '"') children = [JSON.parse(args)]
      } catch (e) {
        props = {
          __error: true,
        }
      }
      defs[m[1]] = {
        type: m[2],
        props: props,
        children: children,
      }
      order.push(m[1])
    })
  function build(id?: any, seen?: any): any {
    var d: any = defs[id]
    if (!d)
      return {
        type: "__Pending",
        props: {
          name: id,
        },
      }
    if (seen[id]) return null
    seen[id] = 1
    return {
      type: d.type,
      props: d.props,
      children: d.children.map(function (c?: any): any {
        return c.ref ? build(c.ref, Object.assign({}, seen)) : c
      }),
    }
  }
  var root: any = defs.root ? "root" : order[0]
  return root ? build(root, {}) : null
}

/* ================= Frekvens 7: relojes, hi-fi, teclas, pads, cinta, arrastrar, plano, gráficas ================= */
/* ================= Frekvens 7: relojes, hi-fi, teclas, pads, cinta, arrastrar, plano, gráficas ================= */
export function useNow(live?: any, ms?: any): any {
  var s: any = useState(Date.now()),
    t: any = s[0],
    set: any = s[1]
  useEffect(
    function (): any {
      if (!live) return
      var i: any = setInterval(function (): any {
        set(Date.now())
      }, ms || 1000)
      return function (): any {
        clearInterval(i)
      }
    },
    [live],
  )
  return t
}
export function polar(cx0?: any, cy0?: any, r?: any, deg?: any): any {
  var a: any = ((deg - 90) * Math.PI) / 180
  return [cx0 + r * Math.cos(a), cy0 + r * Math.sin(a)]
}

/* ---------- Clock ---------- */
export var PADKEYS: any = ["q", "w", "e", "a", "s", "d", "z", "x", "c", "r", "f", "v", "t", "g", "b", "y"]
export var VSIDES: any = {
  left: "a la izquierda",
  ahead: "delante",
  right: "a la derecha",
}
export var VSTATE: any = {
  idle: "En espera",
  listening: "Escuchando",
  speaking: "Hablando",
  processing: "Pensando",
}
export var VDEMO: any = [
  {
    ms: 2600,
    state: "listening",
    pan: -0.85,
    side: "left",
    distance: "near",
    pr: [0.86, 0.12, 0.02],
  },
  {
    ms: 1400,
    state: "idle",
    pan: null,
    side: null,
    distance: "near",
    pr: [0.34, 0.33, 0.33],
  },
  {
    ms: 2600,
    state: "listening",
    pan: 0,
    side: "ahead",
    distance: "far",
    pr: [0.08, 0.82, 0.1],
  },
  {
    ms: 1800,
    state: "processing",
    pan: 0,
    side: "ahead",
    distance: "far",
    pr: [0.08, 0.82, 0.1],
  },
  {
    ms: 2600,
    state: "speaking",
    pan: 0.8,
    side: "right",
    distance: "near",
    pr: [0.03, 0.15, 0.82],
  },
  {
    ms: 1400,
    state: "idle",
    pan: null,
    side: null,
    distance: "near",
    pr: [0.34, 0.33, 0.33],
  },
]
export var AURA: any = {
  online: "verde",
  available: "verde",
  live: "rec",
  away: "sol",
  busy: "rams",
  ai: "klein",
}
export var SHAPES: any = {
  disc: [
    [
      "circle",
      {
        cx: 50,
        cy: 50,
        r: 50,
      },
    ],
  ],
  ring: [
    [
      "path",
      {
        fillRule: "evenodd",
        d: "M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0zm0 30a20 20 0 1 1 0 40 20 20 0 0 1 0-40z",
      },
    ],
  ],
  half: [
    [
      "path",
      {
        d: "M0 75a50 50 0 0 1 100 0z",
      },
    ],
  ],
  quarter: [
    [
      "path",
      {
        d: "M0 100A100 100 0 0 1 100 0v100z",
      },
    ],
  ],
  arch: [
    [
      "path",
      {
        d: "M0 100V50a50 50 0 0 1 100 0v50H68V50a18 18 0 0 0-36 0v50z",
      },
    ],
  ],
  pill: [
    [
      "rect",
      {
        x: 0,
        y: 25,
        width: 100,
        height: 50,
        rx: 25,
      },
    ],
  ],
  arrow: [
    [
      "path",
      {
        d: "M0 39h60L38 14h27l35 36-35 36H38l22-25H0z",
      },
    ],
  ],
  cross: [
    [
      "path",
      {
        d: "M35 0h30v35h35v30H65v35H35V65H0V35h35z",
      },
    ],
  ],
  steps: [
    [
      "path",
      {
        d: "M0 100V67h33V33h34V0h33v100z",
      },
    ],
  ],
  slash: [
    [
      "path",
      {
        d: "M45 6a44 44 0 0 0 0 88z",
        transform: "rotate(20 50 50)",
      },
    ],
    [
      "path",
      {
        d: "M55 6a44 44 0 0 1 0 88z",
        transform: "rotate(20 50 50)",
      },
    ],
  ],
  cloud: [
    [
      "circle",
      {
        cx: 28,
        cy: 62,
        r: 22,
      },
    ],
    [
      "circle",
      {
        cx: 54,
        cy: 46,
        r: 30,
      },
    ],
    [
      "circle",
      {
        cx: 78,
        cy: 64,
        r: 20,
      },
    ],
    [
      "rect",
      {
        x: 28,
        y: 60,
        width: 50,
        height: 24,
      },
    ],
  ],
}
