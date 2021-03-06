! function(t) {
    "use strict";

    function e() {}

    function i(t) {
        if (!t || "object" != typeof t) return !1;
        var e = b(t) || ue;
        return /object|function/.test(typeof e.Element) ? t instanceof e.Element : 1 === t.nodeType && "string" == typeof t.nodeName
    }

    function r(t) {
        return !(!t || !t.Window) && t instanceof t.Window
    }

    function s(t) {
        return !!t && t instanceof ve
    }

    function n(t) {
        return o(t) && void 0 !== typeof t.length && a(t.splice)
    }

    function o(t) {
        return !!t && "object" == typeof t
    }

    function a(t) {
        return "function" == typeof t
    }

    function h(t) {
        return "number" == typeof t
    }

    function p(t) {
        return "boolean" == typeof t
    }

    function l(t) {
        return "string" == typeof t
    }

    function c(t) {
        return !!l(t) && (ge.querySelector(t), !0)
    }

    function d(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function u(t, e) {
        t.page = t.page || {}, t.page.x = e.page.x, t.page.y = e.page.y, t.client = t.client || {}, t.client.x = e.client.x, t.client.y = e.client.y, t.timeStamp = e.timeStamp
    }

    function g(t, e, i) {
        e || (e = i.pointerIds.length > 1 ? z(i.pointers) : i.pointers[0]), f(e, be, i), t.page.x = be.x, t.page.y = be.y, y(e, be, i), t.client.x = be.x, t.client.y = be.y, t.timeStamp = (new Date).getTime()
    }

    function v(t, e, i) {
        t.page.x = i.page.x - e.page.x, t.page.y = i.page.y - e.page.y, t.client.x = i.client.x - e.client.x, t.client.y = i.client.y - e.client.y, t.timeStamp = (new Date).getTime() - e.timeStamp;
        var r = Math.max(t.timeStamp / 1e3, .001);
        t.page.speed = Se(t.page.x, t.page.y) / r, t.page.vx = t.page.x / r, t.page.vy = t.page.y / r, t.client.speed = Se(t.client.x, t.page.y) / r, t.client.vx = t.client.x / r, t.client.vy = t.client.y / r
    }

    function m(t, e, i) {
        return i = i || {}, t = t || "page", i.x = e[t + "X"], i.y = e[t + "Y"], i
    }

    function f(t, e, i) {
        return e = e || {}, t instanceof B ? /inertiastart/.test(t.type) ? (i = i || t.interaction, d(e, i.inertiaStatus.upCoords.page), e.x += i.inertiaStatus.sx, e.y += i.inertiaStatus.sy) : (e.x = t.pageX, e.y = t.pageY) : He ? (m("screen", t, e), e.x += ue.scrollX, e.y += ue.scrollY) : m("page", t, e), e
    }

    function y(t, e, i) {
        return e = e || {}, t instanceof B ? /inertiastart/.test(t.type) ? (d(e, i.inertiaStatus.upCoords.client), e.x += i.inertiaStatus.sx, e.y += i.inertiaStatus.sy) : (e.x = t.clientX, e.y = t.clientY) : m(He ? "screen" : "client", t, e), e
    }

    function x(t) {
        return t = t || ue, {
            x: t.scrollX || t.document.documentElement.scrollLeft,
            y: t.scrollY || t.document.documentElement.scrollTop
        }
    }

    function E(t) {
        return h(t.pointerId) ? t.pointerId : t.identifier
    }

    function S(t) {
        return t instanceof ye ? t.correspondingUseElement : t
    }

    function b(t) {
        if (r(t)) return t;
        var e = t.ownerDocument || t;
        return e.defaultView || e.parentWindow || ue
    }

    function w(t) {
        var e = We ? {
                x: 0,
                y: 0
            } : x(b(t)),
            i = t instanceof me ? t.getBoundingClientRect() : t.getClientRects()[0];
        return i && {
            left: i.left + e.x,
            right: i.right + e.x,
            top: i.top + e.y,
            bottom: i.bottom + e.y,
            width: i.width || i.right - i.left,
            height: i.heigh || i.bottom - i.top
        }
    }

    function D(t) {
        var e = [];
        return n(t) ? (e[0] = t[0], e[1] = t[1]) : "touchend" === t.type ? 1 === t.touches.length ? (e[0] = t.touches[0], e[1] = t.changedTouches[0]) : 0 === t.touches.length && (e[0] = t.changedTouches[0], e[1] = t.changedTouches[1]) : (e[0] = t.touches[0], e[1] = t.touches[1]), e
    }

    function z(t) {
        var e = D(t);
        return {
            pageX: (e[0].pageX + e[1].pageX) / 2,
            pageY: (e[0].pageY + e[1].pageY) / 2,
            clientX: (e[0].clientX + e[1].clientX) / 2,
            clientY: (e[0].clientY + e[1].clientY) / 2
        }
    }

    function T(t) {
        if (t.length || t.touches && t.touches.length > 1) {
            var e = D(t),
                i = Math.min(e[0].pageX, e[1].pageX),
                r = Math.min(e[0].pageY, e[1].pageY);
            return {
                x: i,
                y: r,
                left: i,
                top: r,
                width: Math.max(e[0].pageX, e[1].pageX) - i,
                height: Math.max(e[0].pageY, e[1].pageY) - r
            }
        }
    }

    function C(t, e) {
        e = e || Me.deltaSource;
        var i = e + "X",
            r = e + "Y",
            s = D(t),
            n = s[0][i] - s[1][i],
            o = s[0][r] - s[1][r];
        return Se(n, o)
    }

    function M(t, e, i) {
        i = i || Me.deltaSource;
        var r = i + "X",
            s = i + "Y",
            n = D(t),
            o = n[0][r] - n[1][r],
            a = n[0][s] - n[1][s],
            p = 180 * Math.atan(a / o) / Math.PI;
        if (h(e)) {
            var l = p - e,
                c = l % 360;
            c > 315 ? p -= 360 + p / 360 | 0 : c > 135 ? p -= 180 + p / 360 | 0 : -315 > c ? p += 360 + p / 360 | 0 : -135 > c && (p += 180 + p / 360 | 0)
        }
        return p
    }

    function P(t, e) {
        var r = t ? t.options.origin : Me.origin;
        return "parent" === r ? r = k(e) : "self" === r ? r = t.getRect(e) : c(r) && (r = Y(e, r) || {
            x: 0,
            y: 0
        }), a(r) && (r = r(t && e)), i(r) && (r = w(r)), r.x = "x" in r ? r.x : r.left, r.y = "y" in r ? r.y : r.top, r
    }

    function O(t, e, i, r) {
        var s = 1 - t;
        return s * s * e + 2 * s * t * i + t * t * r
    }

    function _(t, e, i, r, s, n, o) {
        return {
            x: O(o, t, i, s),
            y: O(o, e, r, n)
        }
    }

    function A(t, e, i, r) {
        return t /= r, -i * t * (t - 2) + e
    }

    function X(t, e) {
        for (; e;) {
            if (e === t) return !0;
            e = e.parentNode
        }
        return !1
    }

    function Y(t, e) {
        for (var r = k(t); i(r);) {
            if (pe(r, e)) return r;
            r = k(r)
        }
        return null
    }

    function k(t) {
        var e = t.parentNode;
        if (s(e)) {
            for (;
                (e = e.host) && s(e););
            return e
        }
        return e
    }

    function I(t, e) {
        return t._context === e.ownerDocument || X(t._context, e)
    }

    function R(t, e, r) {
        var s = t.options.ignoreFrom;
        return !(!s || !i(r)) && (l(s) ? le(r, s, e) : !!i(s) && X(s, r))
    }

    function F(t, e, r) {
        var s = t.options.allowFrom;
        return !s || !!i(r) && (l(s) ? le(r, s, e) : !!i(s) && X(s, r))
    }

    function q(t, e) {
        if (!e) return !1;
        var i = e.options.drag.axis;
        return "xy" === t || "xy" === i || i === t
    }

    function N(t, e) {
        var i = t.options;
        return /^resize/.test(e) && (e = "resize"), i[e].snap && i[e].snap.enabled
    }

    function H(t, e) {
        var i = t.options;
        return /^resize/.test(e) && (e = "resize"), i[e].restrict && i[e].restrict.enabled
    }

    function W(t, e) {
        var i = t.options;
        return /^resize/.test(e) && (e = "resize"), i[e].autoScroll && i[e].autoScroll.enabled
    }

    function U(t, e, i) {
        for (var r = t.options, s = r[i.name].max, n = r[i.name].maxPerElement, o = 0, a = 0, h = 0, p = 0, l = ze.length; l > p; p++) {
            var c = ze[p],
                d = c.prepared.name;
            if (c.interacting()) {
                if (++o >= ke) return !1;
                if (c.target === t) {
                    if ((a += d === i.name | 0) >= s) return !1;
                    if (c.element === e && (h++, d !== i.name || h >= n)) return !1
                }
            }
        }
        return ke > 0
    }

    function V(t) {
        var e, i, r, s, n, o = t[0],
            a = o ? 0 : -1,
            h = [],
            p = [];
        for (s = 1; s < t.length; s++)
            if ((e = t[s]) && e !== o)
                if (o) {
                    if (e.parentNode !== e.ownerDocument)
                        if (o.parentNode !== e.ownerDocument) {
                            if (!h.length)
                                for (i = o; i.parentNode && i.parentNode !== i.ownerDocument;) h.unshift(i), i = i.parentNode;
                            if (o instanceof xe && e instanceof me && !(e instanceof fe)) {
                                if (e === o.parentNode) continue;
                                i = e.ownerSVGElement
                            } else i = e;
                            for (p = []; i.parentNode !== i.ownerDocument;) p.unshift(i), i = i.parentNode;
                            for (n = 0; p[n] && p[n] === h[n];) n++;
                            var l = [p[n - 1], p[n], h[n]];
                            for (r = l[0].lastChild; r;) {
                                if (r === l[1]) {
                                    o = e, a = s, h = [];
                                    break
                                }
                                if (r === l[2]) break;
                                r = r.previousSibling
                            }
                        } else o = e, a = s
                } else o = e, a = s;
        return a
    }

    function $() {
        if (this.target = null, this.element = null, this.dropTarget = null, this.dropElement = null, this.prevDropTarget = null, this.prevDropElement = null, this.prepared = {
                name: null,
                axis: null,
                edges: null
            }, this.matches = [], this.matchElements = [], this.inertiaStatus = {
                active: !1,
                smoothEnd: !1,
                startEvent: null,
                upCoords: {},
                xe: 0,
                ye: 0,
                sx: 0,
                sy: 0,
                t0: 0,
                vx0: 0,
                vys: 0,
                duration: 0,
                resumeDx: 0,
                resumeDy: 0,
                lambda_v0: 0,
                one_ve_v0: 0,
                i: null
            }, a(Function.prototype.bind)) this.boundInertiaFrame = this.inertiaFrame.bind(this), this.boundSmoothEndFrame = this.smoothEndFrame.bind(this);
        else {
            var t = this;
            this.boundInertiaFrame = function() {
                return t.inertiaFrame()
            }, this.boundSmoothEndFrame = function() {
                return t.smoothEndFrame()
            }
        }
        this.activeDrops = {
            dropzones: [],
            elements: [],
            rects: []
        }, this.pointers = [], this.pointerIds = [], this.downTargets = [], this.downTimes = [], this.holdTimers = [], this.prevCoords = {
            page: {
                x: 0,
                y: 0
            },
            client: {
                x: 0,
                y: 0
            },
            timeStamp: 0
        }, this.curCoords = {
            page: {
                x: 0,
                y: 0
            },
            client: {
                x: 0,
                y: 0
            },
            timeStamp: 0
        }, this.startCoords = {
            page: {
                x: 0,
                y: 0
            },
            client: {
                x: 0,
                y: 0
            },
            timeStamp: 0
        }, this.pointerDelta = {
            page: {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                speed: 0
            },
            client: {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                speed: 0
            },
            timeStamp: 0
        }, this.downEvent = null, this.downPointer = {}, this._eventTarget = null, this._curEventTarget = null, this.prevEvent = null, this.tapTime = 0, this.prevTap = null, this.startOffset = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, this.restrictOffset = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, this.snapOffsets = [], this.gesture = {
            start: {
                x: 0,
                y: 0
            },
            startDistance: 0,
            prevDistance: 0,
            distance: 0,
            scale: 1,
            startAngle: 0,
            prevAngle: 0
        }, this.snapStatus = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            realX: 0,
            realY: 0,
            snappedX: 0,
            snappedY: 0,
            targets: [],
            locked: !1,
            changed: !1
        }, this.restrictStatus = {
            dx: 0,
            dy: 0,
            restrictedX: 0,
            restrictedY: 0,
            snap: null,
            restricted: !1,
            changed: !1
        }, this.restrictStatus.snap = this.snapStatus, this.pointerIsDown = !1, this.pointerWasMoved = !1, this.gesturing = !1, this.dragging = !1, this.resizing = !1, this.resizeAxes = "xy", this.mouse = !1, ze.push(this)
    }

    function G(t, e, i) {
        var r, s = 0,
            n = ze.length,
            o = /mouse/i.test(t.pointerType || e) || 4 === t.pointerType,
            a = E(t);
        if (/down|start/i.test(e))
            for (s = 0; n > s; s++) {
                r = ze[s];
                var h = i;
                if (r.inertiaStatus.active && r.target.options[r.prepared.name].inertia.allowResume && r.mouse === o)
                    for (; h;) {
                        if (h === r.element) return r.pointers[0] && r.removePointer(r.pointers[0]), r.addPointer(t), r;
                        h = k(h)
                    }
            }
        if (o || !Oe && !_e) {
            for (s = 0; n > s; s++)
                if (ze[s].mouse && !ze[s].inertiaStatus.active) return ze[s];
            for (s = 0; n > s; s++)
                if (ze[s].mouse && (!/down/.test(e) || !ze[s].inertiaStatus.active)) return r;
            return r = new $, r.mouse = !0, r
        }
        for (s = 0; n > s; s++)
            if (he(ze[s].pointerIds, a)) return ze[s];
        if (/up|end|out/i.test(e)) return null;
        for (s = 0; n > s; s++)
            if (r = ze[s], !(r.prepared.name && !r.target.options.gesture.enabled || r.interacting() || !o && r.mouse)) return r.addPointer(t), r;
        return new $
    }

    function L(t) {
        return function(e) {
            var i, r, s = S(e.path ? e.path[0] : e.target),
                n = S(e.currentTarget);
            if (Oe && /touch/.test(e.type))
                for (Ye = (new Date).getTime(), r = 0; r < e.changedTouches.length; r++) {
                    var o = e.changedTouches[r];
                    (i = G(o, e.type, s)) && (i._updateEventTargets(s, n), i[t](o, e, s, n))
                } else {
                    if (!_e && /mouse/.test(e.type)) {
                        for (r = 0; r < ze.length; r++)
                            if (!ze[r].mouse && ze[r].pointerIsDown) return;
                        if ((new Date).getTime() - Ye < 500) return
                    }
                    if (!(i = G(e, e.type, s))) return;
                    i._updateEventTargets(s, n), i[t](e, e, s, n)
                }
        }
    }

    function B(t, e, i, r, s, n) {
        var o, a, h = t.target,
            p = t.snapStatus,
            l = t.restrictStatus,
            c = t.pointers,
            u = (h && h.options || Me).deltaSource,
            g = u + "X",
            v = u + "Y",
            m = h ? h.options : Me,
            f = P(h, s),
            y = "start" === r,
            x = "end" === r,
            E = y ? t.startCoords : t.curCoords;
        s = s || t.element, a = d({}, E.page), o = d({}, E.client), a.x -= f.x, a.y -= f.y, o.x -= f.x, o.y -= f.y;
        var S = m[i].snap && m[i].snap.relativePoints;
        !N(h, i) || y && S && S.length || (this.snap = {
            range: p.range,
            locked: p.locked,
            x: p.snappedX,
            y: p.snappedY,
            realX: p.realX,
            realY: p.realY,
            dx: p.dx,
            dy: p.dy
        }, p.locked && (a.x += p.dx, a.y += p.dy, o.x += p.dx, o.y += p.dy)), !H(h, i) || y && m[i].restrict.elementRect || !l.restricted || (a.x += l.dx, a.y += l.dy, o.x += l.dx, o.y += l.dy, this.restrict = {
            dx: l.dx,
            dy: l.dy
        }), this.pageX = a.x, this.pageY = a.y, this.clientX = o.x, this.clientY = o.y, this.x0 = t.startCoords.page.x, this.y0 = t.startCoords.page.y, this.clientX0 = t.startCoords.client.x, this.clientY0 = t.startCoords.client.y, this.ctrlKey = e.ctrlKey, this.altKey = e.altKey, this.shiftKey = e.shiftKey, this.metaKey = e.metaKey, this.button = e.button, this.target = s, this.t0 = t.downTimes[0], this.type = i + (r || ""), this.interaction = t, this.interactable = h;
        var b = t.inertiaStatus;
        if (b.active && (this.detail = "inertia"), n && (this.relatedTarget = n), x ? "client" === u ? (this.dx = o.x - t.startCoords.client.x, this.dy = o.y - t.startCoords.client.y) : (this.dx = a.x - t.startCoords.page.x, this.dy = a.y - t.startCoords.page.y) : y ? (this.dx = 0, this.dy = 0) : "inertiastart" === r ? (this.dx = t.prevEvent.dx, this.dy = t.prevEvent.dy) : "client" === u ? (this.dx = o.x - t.prevEvent.clientX, this.dy = o.y - t.prevEvent.clientY) : (this.dx = a.x - t.prevEvent.pageX, this.dy = a.y - t.prevEvent.pageY), t.prevEvent && "inertia" === t.prevEvent.detail && !b.active && m[i].inertia && m[i].inertia.zeroResumeDelta && (b.resumeDx += this.dx, b.resumeDy += this.dy, this.dx = this.dy = 0), "resize" === i && t.resizeAxes ? m.resize.square ? ("y" === t.resizeAxes ? this.dx = this.dy : this.dy = this.dx, this.axes = "xy") : (this.axes = t.resizeAxes, "x" === t.resizeAxes ? this.dy = 0 : "y" === t.resizeAxes && (this.dx = 0)) : "gesture" === i && (this.touches = [c[0], c[1]], y ? (this.distance = C(c, u), this.box = T(c), this.scale = 1, this.ds = 0, this.angle = M(c, void 0, u), this.da = 0) : x || e instanceof B ? (this.distance = t.prevEvent.distance, this.box = t.prevEvent.box, this.scale = t.prevEvent.scale, this.ds = this.scale - 1, this.angle = t.prevEvent.angle, this.da = this.angle - t.gesture.startAngle) : (this.distance = C(c, u), this.box = T(c), this.scale = this.distance / t.gesture.startDistance, this.angle = M(c, t.gesture.prevAngle, u), this.ds = this.scale - t.gesture.prevScale, this.da = this.angle - t.gesture.prevAngle)), y) this.timeStamp = t.downTimes[0], this.dt = 0, this.duration = 0, this.speed = 0, this.velocityX = 0, this.velocityY = 0;
        else if ("inertiastart" === r) this.timeStamp = t.prevEvent.timeStamp, this.dt = t.prevEvent.dt, this.duration = t.prevEvent.duration, this.speed = t.prevEvent.speed, this.velocityX = t.prevEvent.velocityX, this.velocityY = t.prevEvent.velocityY;
        else if (this.timeStamp = (new Date).getTime(), this.dt = this.timeStamp - t.prevEvent.timeStamp, this.duration = this.timeStamp - t.downTimes[0], e instanceof B) {
            var w = this[g] - t.prevEvent[g],
                D = this[v] - t.prevEvent[v],
                z = this.dt / 1e3;
            this.speed = Se(w, D) / z, this.velocityX = w / z, this.velocityY = D / z
        } else this.speed = t.pointerDelta[u].speed, this.velocityX = t.pointerDelta[u].vx, this.velocityY = t.pointerDelta[u].vy;
        if ((x || "inertiastart" === r) && t.prevEvent.speed > 600 && this.timeStamp - t.prevEvent.timeStamp < 150) {
            var O = 180 * Math.atan2(t.prevEvent.velocityY, t.prevEvent.velocityX) / Math.PI;
            0 > O && (O += 360);
            var A = O >= 112.5 && 247.5 > O,
                X = O >= 202.5 && 337.5 > O,
                Y = !A && (O >= 292.5 || 67.5 > O),
                k = !X && O >= 22.5 && 157.5 > O;
            this.swipe = {
                up: X,
                down: k,
                left: A,
                right: Y,
                angle: O,
                speed: t.prevEvent.speed,
                velocity: {
                    x: t.prevEvent.velocityX,
                    y: t.prevEvent.velocityY
                }
            }
        }
    }

    function K() {
        this.originalEvent.preventDefault()
    }

    function j(t) {
        var e = "";
        if ("drag" === t.name && (e = Ie.drag), "resize" === t.name)
            if (t.axis) e = Ie[t.name + t.axis];
            else if (t.edges) {
            for (var i = "resize", r = ["top", "bottom", "left", "right"], s = 0; 4 > s; s++) t.edges[r[s]] && (i += r[s]);
            e = Ie[i]
        }
        return e
    }

    function J(t, e, r, s, n, o) {
        if (!e) return !1;
        if (!0 === e) {
            var a = h(o.width) ? o.width : o.right - o.left,
                p = h(o.height) ? o.height : o.bottom - o.top;
            if (0 > a && ("left" === t ? t = "right" : "right" === t && (t = "left")), 0 > p && ("top" === t ? t = "bottom" : "bottom" === t && (t = "top")), "left" === t) return r.x < (a >= 0 ? o.left : o.right) + Ae;
            if ("top" === t) return r.y < (p >= 0 ? o.top : o.bottom) + Ae;
            if ("right" === t) return r.x > (a >= 0 ? o.right : o.left) - Ae;
            if ("bottom" === t) return r.y > (p >= 0 ? o.bottom : o.top) - Ae
        }
        return !!i(s) && (i(e) ? e === s : le(s, e, n))
    }

    function Q(t, e, i) {
        var r, s = this.getRect(i),
            n = !1,
            a = null,
            h = null,
            p = d({}, e.curCoords.page),
            l = this.options;
        if (!s) return null;
        if (Re.resize && l.resize.enabled) {
            var c = l.resize;
            if (r = {
                    left: !1,
                    right: !1,
                    top: !1,
                    bottom: !1
                }, o(c.edges)) {
                for (var u in r) r[u] = J(u, c.edges[u], p, e._eventTarget, i, s);
                r.left = r.left && !r.right, r.top = r.top && !r.bottom, n = r.left || r.right || r.top || r.bottom
            } else {
                var g = "y" !== l.resize.axis && p.x > s.right - Ae,
                    v = "x" !== l.resize.axis && p.y > s.bottom - Ae;
                n = g || v, h = (g ? "x" : "") + (v ? "y" : "")
            }
        }
        return a = n ? "resize" : Re.drag && l.drag.enabled ? "drag" : null, Re.gesture && e.pointerIds.length >= 2 && !e.dragging && !e.resizing && (a = "gesture"), a ? {
            name: a,
            axis: h,
            edges: r
        } : null
    }

    function Z(t, e) {
        if (!o(t)) return null;
        var i = t.name,
            r = e.options;
        return ("resize" === i && r.resize.enabled || "drag" === i && r.drag.enabled || "gesture" === i && r.gesture.enabled) && Re[i] ? (("resize" === i || "resizeyx" === i) && (i = "resizexy"), t) : null
    }

    function te(t, e) {
        var r = {},
            s = Ce[t.type],
            n = S(t.path ? t.path[0] : t.target),
            o = n;
        e = !!e;
        for (var a in t) r[a] = t[a];
        for (r.originalEvent = t, r.preventDefault = K; i(o);) {
            for (var h = 0; h < s.selectors.length; h++) {
                var p = s.selectors[h],
                    l = s.contexts[h];
                if (pe(o, p) && X(l, n) && X(l, o)) {
                    var c = s.listeners[h];
                    r.currentTarget = o;
                    for (var d = 0; d < c.length; d++) c[d][1] === e && c[d][0](r)
                }
            }
            o = k(o)
        }
    }

    function ee(t) {
        return te.call(this, t, !0)
    }

    function ie(t, e) {
        return De.get(t, e) || new re(t, e)
    }

    function re(t, e) {
        this._element = t, this._iEvents = this._iEvents || {};
        var r;
        if (c(t)) {
            this.selector = t;
            var s = e && e.context;
            r = s ? b(s) : ue, s && (r.Node ? s instanceof r.Node : i(s) || s === r.document) && (this._context = s)
        } else r = b(t), i(t, r) && (Ee ? (Ge.add(this._element, ce.down, Le.pointerDown), Ge.add(this._element, ce.move, Le.pointerHover)) : (Ge.add(this._element, "mousedown", Le.pointerDown), Ge.add(this._element, "mousemove", Le.pointerHover), Ge.add(this._element, "touchstart", Le.pointerDown), Ge.add(this._element, "touchmove", Le.pointerHover)));
        this._doc = r.document, he(we, this._doc) || oe(this._doc), De.push(this), this.set(e)
    }

    function se(t, e) {
        var i = !1;
        return function() {
            return i || (ue.console.warn(e), i = !0), t.apply(this, arguments)
        }
    }

    function ne(t) {
        for (var e = 0; e < ze.length; e++) ze[e].pointerEnd(t, t)
    }

    function oe(t) {
        if (!he(we, t)) {
            var e = t.defaultView || t.parentWindow;
            for (var i in Ce) Ge.add(t, i, te), Ge.add(t, i, ee, !0);
            Ee ? (ce = Ee === e.MSPointerEvent ? {
                up: "MSPointerUp",
                down: "MSPointerDown",
                over: "mouseover",
                out: "mouseout",
                move: "MSPointerMove",
                cancel: "MSPointerCancel"
            } : {
                up: "pointerup",
                down: "pointerdown",
                over: "pointerover",
                out: "pointerout",
                move: "pointermove",
                cancel: "pointercancel"
            }, Ge.add(t, ce.down, Le.selectorDown), Ge.add(t, ce.move, Le.pointerMove), Ge.add(t, ce.over, Le.pointerOver), Ge.add(t, ce.out, Le.pointerOut), Ge.add(t, ce.up, Le.pointerUp), Ge.add(t, ce.cancel, Le.pointerCancel), Ge.add(t, ce.move, Pe.edgeMove)) : (Ge.add(t, "mousedown", Le.selectorDown), Ge.add(t, "mousemove", Le.pointerMove), Ge.add(t, "mouseup", Le.pointerUp), Ge.add(t, "mouseover", Le.pointerOver), Ge.add(t, "mouseout", Le.pointerOut), Ge.add(t, "touchstart", Le.selectorDown), Ge.add(t, "touchmove", Le.pointerMove), Ge.add(t, "touchend", Le.pointerUp), Ge.add(t, "touchcancel", Le.pointerCancel), Ge.add(t, "mousemove", Pe.edgeMove), Ge.add(t, "touchmove", Pe.edgeMove)), Ge.add(e, "blur", ne);
            try {
                if (e.frameElement) {
                    var r = e.frameElement.ownerDocument,
                        s = r.defaultView;
                    Ge.add(r, "mouseup", Le.pointerEnd), Ge.add(r, "touchend", Le.pointerEnd), Ge.add(r, "touchcancel", Le.pointerEnd), Ge.add(r, "pointerup", Le.pointerEnd), Ge.add(r, "MSPointerUp", Le.pointerEnd), Ge.add(s, "blur", ne)
                }
            } catch (n) {
                ie.windowParentError = n
            }
            Ge.useAttachEvent && (Ge.add(t, "selectstart", function(t) {
                var e = ze[0];
                e.currentAction() && e.checkAndPreventDefault(t)
            }), Ge.add(t, "dblclick", L("ie8Dblclick"))), we.push(t)
        }
    }

    function ae(t, e) {
        for (var i = 0, r = t.length; r > i; i++)
            if (t[i] === e) return i;
        return -1
    }

    function he(t, e) {
        return -1 !== ae(t, e)
    }

    function pe(e, i, r) {
        return de ? de(e, i, r) : (ue !== t && (i = i.replace(/\/deep\//g, " ")), e[Ue](i))
    }

    function le(t, e, r) {
        for (; i(t);) {
            if (pe(t, e)) return !0;
            if ((t = k(t)) === r) return pe(t, e)
        }
        return !1
    }
    var ce, de, ue = function() {
            var e = t.document.createTextNode("");
            return e.ownerDocument !== t.document && "function" == typeof t.wrap && t.wrap(e) === e ? t.wrap(t) : t
        }(),
        ge = ue.document,
        ve = ue.DocumentFragment || e,
        me = ue.SVGElement || e,
        fe = ue.SVGSVGElement || e,
        ye = ue.SVGElementInstance || e,
        xe = ue.HTMLElement || ue.Element,
        Ee = ue.PointerEvent || ue.MSPointerEvent,
        Se = Math.hypot || function(t, e) {
            return Math.sqrt(t * t + e * e)
        },
        be = {},
        we = [],
        De = [],
        ze = [],
        Te = !1,
        Ce = {},
        Me = {
            base: {
                accept: null,
                actionChecker: null,
                styleCursor: !0,
                preventDefault: "auto",
                origin: {
                    x: 0,
                    y: 0
                },
                deltaSource: "page",
                allowFrom: null,
                ignoreFrom: null,
                _context: ge,
                dropChecker: null
            },
            drag: {
                enabled: !1,
                manualStart: !0,
                max: 1 / 0,
                maxPerElement: 1,
                snap: null,
                restrict: null,
                inertia: null,
                autoScroll: null,
                axis: "xy"
            },
            drop: {
                enabled: !1,
                accept: null,
                overlap: "pointer"
            },
            resize: {
                enabled: !1,
                manualStart: !1,
                max: 1 / 0,
                maxPerElement: 1,
                snap: null,
                restrict: null,
                inertia: null,
                autoScroll: null,
                square: !1,
                axis: "xy",
                edges: null,
                invert: "none"
            },
            gesture: {
                manualStart: !1,
                enabled: !1,
                max: 1 / 0,
                maxPerElement: 1,
                restrict: null
            },
            perAction: {
                manualStart: !1,
                max: 1 / 0,
                maxPerElement: 1,
                snap: {
                    enabled: !1,
                    endOnly: !1,
                    range: 1 / 0,
                    targets: null,
                    offsets: null,
                    relativePoints: null
                },
                restrict: {
                    enabled: !1,
                    endOnly: !1
                },
                autoScroll: {
                    enabled: !1,
                    container: null,
                    margin: 60,
                    speed: 300
                },
                inertia: {
                    enabled: !1,
                    resistance: 10,
                    minSpeed: 100,
                    endSpeed: 10,
                    allowResume: !0,
                    zeroResumeDelta: !0,
                    smoothEndDuration: 300
                }
            },
            _holdDuration: 600
        },
        Pe = {
            interaction: null,
            i: null,
            x: 0,
            y: 0,
            scroll: function() {
                var t = Pe.interaction.target.options[Pe.interaction.prepared.name].autoScroll,
                    e = t.container || b(Pe.interaction.element),
                    i = (new Date).getTime(),
                    s = (i - Pe.prevTime) / 1e3,
                    n = t.speed * s;
                n >= 1 && (r(e) ? e.scrollBy(Pe.x * n, Pe.y * n) : e && (e.scrollLeft += Pe.x * n, e.scrollTop += Pe.y * n), Pe.prevTime = i), Pe.isScrolling && ($e(Pe.i), Pe.i = Ve(Pe.scroll))
            },
            edgeMove: function(t) {
                for (var e, i, s = !1, n = 0; n < ze.length; n++)
                    if (e = ze[n], e.interacting() && W(e.target, e.prepared.name)) {
                        i = e.target, s = !0;
                        break
                    }
                if (s) {
                    var o, a, h, p, l = i.options[e.prepared.name].autoScroll,
                        c = l.container || b(e.element);
                    if (r(c)) p = t.clientX < Pe.margin, o = t.clientY < Pe.margin, a = t.clientX > c.innerWidth - Pe.margin, h = t.clientY > c.innerHeight - Pe.margin;
                    else {
                        var d = w(c);
                        p = t.clientX < d.left + Pe.margin, o = t.clientY < d.top + Pe.margin, a = t.clientX > d.right - Pe.margin, h = t.clientY > d.bottom - Pe.margin
                    }
                    Pe.x = a ? 1 : p ? -1 : 0, Pe.y = h ? 1 : o ? -1 : 0, Pe.isScrolling || (Pe.margin = l.margin, Pe.speed = l.speed, Pe.start(e))
                }
            },
            isScrolling: !1,
            prevTime: 0,
            start: function(t) {
                Pe.isScrolling = !0, $e(Pe.i), Pe.interaction = t, Pe.prevTime = (new Date).getTime(), Pe.i = Ve(Pe.scroll)
            },
            stop: function() {
                Pe.isScrolling = !1, $e(Pe.i)
            }
        },
        Oe = "ontouchstart" in ue || ue.DocumentTouch && ge instanceof ue.DocumentTouch,
        _e = !!Ee,
        Ae = Oe || _e ? 20 : 10,
        Xe = 1,
        Ye = 0,
        ke = 1 / 0,
        Ie = ge.all && !ue.atob ? {
            drag: "move",
            resizex: "e-resize",
            resizey: "s-resize",
            resizexy: "se-resize",
            resizetop: "n-resize",
            resizeleft: "w-resize",
            resizebottom: "s-resize",
            resizeright: "e-resize",
            resizetopleft: "se-resize",
            resizebottomright: "se-resize",
            resizetopright: "ne-resize",
            resizebottomleft: "ne-resize",
            gesture: ""
        } : {
            drag: "move",
            resizex: "ew-resize",
            resizey: "ns-resize",
            resizexy: "nwse-resize",
            resizetop: "ns-resize",
            resizeleft: "ew-resize",
            resizebottom: "ns-resize",
            resizeright: "ew-resize",
            resizetopleft: "nwse-resize",
            resizebottomright: "nwse-resize",
            resizetopright: "nesw-resize",
            resizebottomleft: "nesw-resize",
            gesture: ""
        },
        Re = {
            drag: !0,
            resize: !0,
            gesture: !0
        },
        Fe = "onmousewheel" in ge ? "mousewheel" : "wheel",
        qe = ["dragstart", "dragmove", "draginertiastart", "dragend", "dragenter", "dragleave", "dropactivate", "dropdeactivate", "dropmove", "drop", "resizestart", "resizemove", "resizeinertiastart", "resizeend", "gesturestart", "gesturemove", "gestureinertiastart", "gestureend", "down", "move", "up", "cancel", "tap", "doubletap", "hold"],
        Ne = {},
        He = "Opera" == navigator.appName && Oe && navigator.userAgent.match("Presto"),
        We = /iP(hone|od|ad)/.test(navigator.platform) && /OS [1-7][^\d]/.test(navigator.appVersion),
        Ue = "matches" in Element.prototype ? "matches" : "webkitMatchesSelector" in Element.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in Element.prototype ? "mozMatchesSelector" : "oMatchesSelector" in Element.prototype ? "oMatchesSelector" : "msMatchesSelector",
        Ve = t.requestAnimationFrame,
        $e = t.cancelAnimationFrame,
        Ge = function() {
            function t(t, e, a, d) {
                var u = ae(p, t),
                    g = l[u];
                if (g || (g = {
                        events: {},
                        typeCount: 0
                    }, u = p.push(t) - 1, l.push(g), c.push(n ? {
                        supplied: [],
                        wrapped: [],
                        useCount: []
                    } : null)), g.events[e] || (g.events[e] = [], g.typeCount++), !he(g.events[e], a)) {
                    var v;
                    if (n) {
                        var m = c[u],
                            f = ae(m.supplied, a),
                            y = m.wrapped[f] || function(e) {
                                e.immediatePropagationStopped || (e.target = e.srcElement, e.currentTarget = t, e.preventDefault = e.preventDefault || i, e.stopPropagation = e.stopPropagation || r, e.stopImmediatePropagation = e.stopImmediatePropagation || s, /mouse|click/.test(e.type) && (e.pageX = e.clientX + b(t).document.documentElement.scrollLeft, e.pageY = e.clientY + b(t).document.documentElement.scrollTop), a(e))
                            };
                        v = t[o](h + e, y, Boolean(d)), -1 === f ? (m.supplied.push(a), m.wrapped.push(y), m.useCount.push(1)) : m.useCount[f]++
                    } else v = t[o](e, a, d || !1);
                    return g.events[e].push(a), v
                }
            }

            function e(t, i, r, s) {
                var o, d, u, g = ae(p, t),
                    v = l[g],
                    m = r;
                if (v && v.events)
                    if (n && (d = c[g], u = ae(d.supplied, r), m = d.wrapped[u]), "all" !== i) {
                        if (v.events[i]) {
                            var f = v.events[i].length;
                            if ("all" === r)
                                for (o = 0; f > o; o++) e(t, i, v.events[i][o], Boolean(s));
                            else
                                for (o = 0; f > o; o++)
                                    if (v.events[i][o] === r) {
                                        t[a](h + i, m, s || !1), v.events[i].splice(o, 1), n && d && 0 === --d.useCount[u] && (d.supplied.splice(u, 1), d.wrapped.splice(u, 1), d.useCount.splice(u, 1));
                                        break
                                    }
                            v.events[i] && 0 === v.events[i].length && (v.events[i] = null, v.typeCount--)
                        }
                        v.typeCount || (l.splice(g), p.splice(g), c.splice(g))
                    } else
                        for (i in v.events) v.events.hasOwnProperty(i) && e(t, i, "all")
            }

            function i() {
                this.returnValue = !1
            }

            function r() {
                this.cancelBubble = !0
            }

            function s() {
                this.cancelBubble = !0, this.immediatePropagationStopped = !0
            }
            var n = "attachEvent" in ue && !("addEventListener" in ue),
                o = n ? "attachEvent" : "addEventListener",
                a = n ? "detachEvent" : "removeEventListener",
                h = n ? "on" : "",
                p = [],
                l = [],
                c = [];
            return {
                add: t,
                remove: e,
                useAttachEvent: n,
                _elements: p,
                _targets: l,
                _attachedListeners: c
            }
        }();
    $.prototype = {
        getPageXY: function(t, e) {
            return f(t, e, this)
        },
        getClientXY: function(t, e) {
            return y(t, e, this)
        },
        setEventXY: function(t, e) {
            return g(t, e, this)
        },
        pointerOver: function(t, e, i) {
            function r(t, e) {
                t && I(t, i) && !R(t, i, i) && F(t, i, i) && pe(i, e) && (s.push(t), n.push(i))
            }
            if (!this.prepared.name && this.mouse) {
                var s = [],
                    n = [],
                    o = this.element;
                this.addPointer(t), !this.target || !R(this.target, this.element, i) && F(this.target, this.element, i) || (this.target = null, this.element = null, this.matches = [], this.matchElements = []);
                var a = De.get(i),
                    h = a && !R(a, i, i) && F(a, i, i) && Z(a.getAction(t, this, i), a);
                h && !U(a, i, h) && (h = null), h ? (this.target = a, this.element = i, this.matches = [], this.matchElements = []) : (De.forEachSelector(r), this.validateSelector(t, s, n) ? (this.matches = s, this.matchElements = n, this.pointerHover(t, e, this.matches, this.matchElements), Ge.add(i, Ee ? ce.move : "mousemove", Le.pointerHover)) : this.target && (X(o, i) ? (this.pointerHover(t, e, this.matches, this.matchElements), Ge.add(this.element, Ee ? ce.move : "mousemove", Le.pointerHover)) : (this.target = null, this.element = null, this.matches = [], this.matchElements = [])))
            }
        },
        pointerHover: function(t, e, i, r, s, n) {
            var o = this.target;
            if (!this.prepared.name && this.mouse) {
                var a;
                this.setEventXY(this.curCoords, t), s ? a = this.validateSelector(t, s, n) : o && (a = Z(o.getAction(this.pointers[0], this, this.element), this.target)), o && o.options.styleCursor && (o._doc.documentElement.style.cursor = a ? j(a) : "")
            } else this.prepared.name && this.checkAndPreventDefault(e, o, this.element)
        },
        pointerOut: function(t, e, i) {
            this.prepared.name || (De.get(i) || Ge.remove(i, Ee ? ce.move : "mousemove", Le.pointerHover), this.target && this.target.options.styleCursor && !this.interacting() && (this.target._doc.documentElement.style.cursor = ""))
        },
        selectorDown: function(t, e, r, s) {
            function n(t, e, i) {
                var s = de ? i.querySelectorAll(e) : void 0;
                I(t, p) && !R(t, p, r) && F(t, p, r) && pe(p, e, s) && (a.matches.push(t), a.matchElements.push(p))
            }
            var o, a = this,
                h = Ge.useAttachEvent ? d({}, e) : e,
                p = r,
                l = this.addPointer(t);
            if (this.holdTimers[l] = setTimeout(function() {
                    a.pointerHold(Ge.useAttachEvent ? h : t, h, r, s)
                }, Me._holdDuration), this.pointerIsDown = !0, this.inertiaStatus.active && this.target.selector)
                for (; i(p);) {
                    if (p === this.element && Z(this.target.getAction(t, this, this.element), this.target).name === this.prepared.name) return $e(this.inertiaStatus.i), this.inertiaStatus.active = !1, void this.collectEventTargets(t, e, r, "down");
                    p = k(p)
                }
            if (this.interacting()) return void this.collectEventTargets(t, e, r, "down");
            for (this.setEventXY(this.curCoords, t); i(p) && !o;) this.matches = [], this.matchElements = [], De.forEachSelector(n), o = this.validateSelector(t, this.matches, this.matchElements), p = k(p);
            return o ? (this.prepared.name = o.name, this.prepared.axis = o.axis, this.prepared.edges = o.edges, this.collectEventTargets(t, e, r, "down"), this.pointerDown(t, e, r, s, o)) : (this.downTimes[l] = (new Date).getTime(), this.downTargets[l] = r, this.downEvent = e, d(this.downPointer, t), u(this.prevCoords, this.curCoords), this.pointerWasMoved = !1, void this.collectEventTargets(t, e, r, "down"))
        },
        pointerDown: function(t, e, i, r, s) {
            if (!s && !this.inertiaStatus.active && this.pointerWasMoved && this.prepared.name) return void this.checkAndPreventDefault(e, this.target, this.element);
            this.pointerIsDown = !0;
            var n, o = this.addPointer(t);
            if (this.pointerIds.length < 2 && !this.target || !this.prepared.name) {
                var a = De.get(r);
                a && !R(a, r, i) && F(a, r, i) && (n = Z(s || a.getAction(t, this, r), a)) && U(a, r, n) && (this.target = a, this.element = r)
            }
            var h = this.target,
                p = h && h.options;
            if (h && !this.interacting()) {
                if (n = n || Z(s || h.getAction(t, this, r), h, this.element), this.setEventXY(this.startCoords), !n) return;
                p.styleCursor && (h._doc.documentElement.style.cursor = j(n)), this.resizeAxes = "resize" === n.name ? n.axis : null, "gesture" === n && this.pointerIds.length < 2 && (n = null), this.prepared.name = n.name, this.prepared.axis = n.axis, this.prepared.edges = n.edges, this.snapStatus.snappedX = this.snapStatus.snappedY = this.restrictStatus.restrictedX = this.restrictStatus.restrictedY = NaN, this.downTimes[o] = (new Date).getTime(), this.downTargets[o] = i, this.downEvent = e, d(this.downPointer, t), this.setEventXY(this.prevCoords), this.pointerWasMoved = !1, this.checkAndPreventDefault(e, h, this.element)
            } else this.inertiaStatus.active && r === this.element && Z(h.getAction(t, this, this.element), h).name === this.prepared.name && ($e(this.inertiaStatus.i), this.inertiaStatus.active = !1, this.checkAndPreventDefault(e, h, this.element))
        },
        setModifications: function(t, e) {
            var i = this.target,
                r = !0,
                s = N(i, this.prepared.name) && (!i.options[this.prepared.name].snap.endOnly || e),
                n = H(i, this.prepared.name) && (!i.options[this.prepared.name].restrict.endOnly || e);
            return s ? this.setSnapping(t) : this.snapStatus.locked = !1, n ? this.setRestriction(t) : this.restrictStatus.restricted = !1, s && this.snapStatus.locked && !this.snapStatus.changed ? r = n && this.restrictStatus.restricted && this.restrictStatus.changed : n && this.restrictStatus.restricted && !this.restrictStatus.changed && (r = !1), r
        },
        setStartOffsets: function(t, e, i) {
            var r, s, n = e.getRect(i),
                o = P(e, i),
                a = e.options[this.prepared.name].snap,
                h = e.options[this.prepared.name].restrict;
            n ? (this.startOffset.left = this.startCoords.page.x - n.left, this.startOffset.top = this.startCoords.page.y - n.top, this.startOffset.right = n.right - this.startCoords.page.x, this.startOffset.bottom = n.bottom - this.startCoords.page.y, r = "width" in n ? n.width : n.right - n.left, s = "height" in n ? n.height : n.bottom - n.top) : this.startOffset.left = this.startOffset.top = this.startOffset.right = this.startOffset.bottom = 0, this.snapOffsets.splice(0);
            var p = a && "startCoords" === a.offset ? {
                x: this.startCoords.page.x - o.x,
                y: this.startCoords.page.y - o.y
            } : a && a.offset || {
                x: 0,
                y: 0
            };
            if (n && a && a.relativePoints && a.relativePoints.length)
                for (var l = 0; l < a.relativePoints.length; l++) this.snapOffsets.push({
                    x: this.startOffset.left - r * a.relativePoints[l].x + p.x,
                    y: this.startOffset.top - s * a.relativePoints[l].y + p.y
                });
            else this.snapOffsets.push(p);
            n && h.elementRect ? (this.restrictOffset.left = this.startOffset.left - r * h.elementRect.left, this.restrictOffset.top = this.startOffset.top - s * h.elementRect.top, this.restrictOffset.right = this.startOffset.right - r * (1 - h.elementRect.right), this.restrictOffset.bottom = this.startOffset.bottom - s * (1 - h.elementRect.bottom)) : this.restrictOffset.left = this.restrictOffset.top = this.restrictOffset.right = this.restrictOffset.bottom = 0
        },
        start: function(t, e, i) {
            this.interacting() || !this.pointerIsDown || this.pointerIds.length < ("gesture" === t.name ? 2 : 1) || (-1 === ae(ze, this) && ze.push(this), this.prepared.name = t.name, this.prepared.axis = t.axis, this.prepared.edges = t.edges, this.target = e, this.element = i, this.setStartOffsets(t.name, e, i), this.setModifications(this.startCoords.page), this.prevEvent = this[this.prepared.name + "Start"](this.downEvent))
        },
        pointerMove: function(t, e, r, s, n) {
            this.recordPointer(t), this.setEventXY(this.curCoords, t instanceof B ? this.inertiaStatus.startEvent : void 0);
            var o, a, h = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y,
                p = this.mouse ? 0 : ae(this.pointerIds, E(t));
            if (this.pointerIsDown && !this.pointerWasMoved && (o = this.curCoords.client.x - this.startCoords.client.x, a = this.curCoords.client.y - this.startCoords.client.y, this.pointerWasMoved = Se(o, a) > Xe), h || this.pointerIsDown && !this.pointerWasMoved || (this.pointerIsDown && clearTimeout(this.holdTimers[p]), this.collectEventTargets(t, e, r, "move")), this.pointerIsDown) {
                if (h && this.pointerWasMoved && !n) return void this.checkAndPreventDefault(e, this.target, this.element);
                if (v(this.pointerDelta, this.prevCoords, this.curCoords), this.prepared.name) {
                    if (this.pointerWasMoved && (!this.inertiaStatus.active || t instanceof B && /inertiastart/.test(t.type))) {
                        if (!this.interacting() && (v(this.pointerDelta, this.prevCoords, this.curCoords), "drag" === this.prepared.name)) {
                            var l = Math.abs(o),
                                c = Math.abs(a),
                                d = this.target.options.drag.axis,
                                g = l > c ? "x" : c > l ? "y" : "xy";
                            if ("xy" !== g && "xy" !== d && d !== g) {
                                this.prepared.name = null;
                                for (var m = r; i(m);) {
                                    var f = De.get(m);
                                    if (f && f !== this.target && !f.options.drag.manualStart && "drag" === f.getAction(this.downPointer, this, m).name && q(g, f)) {
                                        this.prepared.name = "drag", this.target = f, this.element = m;
                                        break
                                    }
                                    m = k(m)
                                }
                                if (!this.prepared.name) {
                                    var y = function(t, e, i) {
                                        var s = de ? i.querySelectorAll(e) : void 0;
                                        if (t !== this.target) return I(t, r) && !t.options.drag.manualStart && !R(t, m, r) && F(t, m, r) && pe(m, e, s) && "drag" === t.getAction(this.downPointer, this, m).name && q(g, t) && U(t, m, "drag") ? t : void 0
                                    };
                                    for (m = r; i(m);) {
                                        var x = De.forEachSelector(y);
                                        if (x) {
                                            this.prepared.name = "drag", this.target = x, this.element = m;
                                            break
                                        }
                                        m = k(m)
                                    }
                                }
                            }
                        }
                        var S = !!this.prepared.name && !this.interacting();
                        if (S && (this.target.options[this.prepared.name].manualStart || !U(this.target, this.element, this.prepared))) return void this.stop();
                        if (this.prepared.name && this.target) {
                            S && this.start(this.prepared, this.target, this.element);
                            (this.setModifications(this.curCoords.page, n) || S) && (this.prevEvent = this[this.prepared.name + "Move"](e)), this.checkAndPreventDefault(e, this.target, this.element)
                        }
                    }
                    u(this.prevCoords, this.curCoords), (this.dragging || this.resizing) && Pe.edgeMove(e)
                }
            }
        },
        dragStart: function(t) {
            var e = new B(this, t, "drag", "start", this.element);
            this.dragging = !0, this.target.fire(e), this.activeDrops.dropzones = [], this.activeDrops.elements = [], this.activeDrops.rects = [], this.dynamicDrop || this.setActiveDrops(this.element);
            var i = this.getDropEvents(t, e);
            return i.activate && this.fireActiveDrops(i.activate), e
        },
        dragMove: function(t) {
            var e = this.target,
                i = new B(this, t, "drag", "move", this.element),
                r = this.element,
                s = this.getDrop(i, r);
            this.dropTarget = s.dropzone, this.dropElement = s.element;
            var n = this.getDropEvents(t, i);
            return e.fire(i), n.leave && this.prevDropTarget.fire(n.leave), n.enter && this.dropTarget.fire(n.enter), n.move && this.dropTarget.fire(n.move), this.prevDropTarget = this.dropTarget, this.prevDropElement = this.dropElement, i
        },
        resizeStart: function(t) {
            var e = new B(this, t, "resize", "start", this.element);
            if (this.prepared.edges) {
                var i = this.target.getRect(this.element);
                if (this.target.options.resize.square) {
                    var r = d({}, this.prepared.edges);
                    r.top = r.top || r.left && !r.bottom, r.left = r.left || r.top && !r.right, r.bottom = r.bottom || r.right && !r.top, r.right = r.right || r.bottom && !r.left, this.prepared._squareEdges = r
                } else this.prepared._squareEdges = null;
                this.resizeRects = {
                    start: i,
                    current: d({}, i),
                    restricted: d({}, i),
                    previous: d({}, i),
                    delta: {
                        left: 0,
                        right: 0,
                        width: 0,
                        top: 0,
                        bottom: 0,
                        height: 0
                    }
                }, e.rect = this.resizeRects.restricted, e.deltaRect = this.resizeRects.delta
            }
            return this.target.fire(e), this.resizing = !0, e
        },
        resizeMove: function(t) {
            var e = new B(this, t, "resize", "move", this.element),
                i = this.prepared.edges,
                r = this.target.options.resize.invert,
                s = "reposition" === r || "negate" === r;
            if (i) {
                var n = e.dx,
                    o = e.dy,
                    a = this.resizeRects.start,
                    h = this.resizeRects.current,
                    p = this.resizeRects.restricted,
                    l = this.resizeRects.delta,
                    c = d(this.resizeRects.previous, p);
                if (this.target.options.resize.square) {
                    var u = i;
                    i = this.prepared._squareEdges, u.left && u.bottom || u.right && u.top ? o = -n : u.left || u.right ? o = n : (u.top || u.bottom) && (n = o)
                }
                if (i.top && (h.top += o), i.bottom && (h.bottom += o), i.left && (h.left += n), i.right && (h.right += n), s) {
                    if (d(p, h), "reposition" === r) {
                        var g;
                        p.top > p.bottom && (g = p.top, p.top = p.bottom, p.bottom = g), p.left > p.right && (g = p.left, p.left = p.right, p.right = g)
                    }
                } else p.top = Math.min(h.top, a.bottom), p.bottom = Math.max(h.bottom, a.top), p.left = Math.min(h.left, a.right), p.right = Math.max(h.right, a.left);
                p.width = p.right - p.left, p.height = p.bottom - p.top;
                for (var v in p) l[v] = p[v] - c[v];
                e.edges = this.prepared.edges, e.rect = p, e.deltaRect = l
            }
            return this.target.fire(e), e
        },
        gestureStart: function(t) {
            var e = new B(this, t, "gesture", "start", this.element);
            return e.ds = 0, this.gesture.startDistance = this.gesture.prevDistance = e.distance, this.gesture.startAngle = this.gesture.prevAngle = e.angle, this.gesture.scale = 1, this.gesturing = !0, this.target.fire(e), e
        },
        gestureMove: function(t) {
            if (!this.pointerIds.length) return this.prevEvent;
            var e;
            return e = new B(this, t, "gesture", "move", this.element), e.ds = e.scale - this.gesture.scale, this.target.fire(e), this.gesture.prevAngle = e.angle, this.gesture.prevDistance = e.distance, 1 / 0 === e.scale || null === e.scale || void 0 === e.scale || isNaN(e.scale) || (this.gesture.scale = e.scale), e
        },
        pointerHold: function(t, e, i) {
            this.collectEventTargets(t, e, i, "hold")
        },
        pointerUp: function(t, e, i, r) {
            var s = this.mouse ? 0 : ae(this.pointerIds, E(t));
            clearTimeout(this.holdTimers[s]), this.collectEventTargets(t, e, i, "up"), this.collectEventTargets(t, e, i, "tap"), this.pointerEnd(t, e, i, r), this.removePointer(t)
        },
        pointerCancel: function(t, e, i, r) {
            var s = this.mouse ? 0 : ae(this.pointerIds, E(t));
            clearTimeout(this.holdTimers[s]), this.collectEventTargets(t, e, i, "cancel"), this.pointerEnd(t, e, i, r), this.removePointer(t)
        },
        ie8Dblclick: function(t, e, i) {
            this.prevTap && e.clientX === this.prevTap.clientX && e.clientY === this.prevTap.clientY && i === this.prevTap.target && (this.downTargets[0] = i, this.downTimes[0] = (new Date).getTime(), this.collectEventTargets(t, e, i, "tap"))
        },
        pointerEnd: function(t, e, i, r) {
            var s, n = this.target,
                o = n && n.options,
                a = o && this.prepared.name && o[this.prepared.name].inertia,
                h = this.inertiaStatus;
            if (this.interacting()) {
                if (h.active) return;
                var p, c = (new Date).getTime(),
                    g = !1,
                    v = !1,
                    m = !1,
                    f = N(n, this.prepared.name) && o[this.prepared.name].snap.endOnly,
                    y = H(n, this.prepared.name) && o[this.prepared.name].restrict.endOnly,
                    x = 0,
                    E = 0;
                if (p = this.dragging ? "x" === o.drag.axis ? Math.abs(this.pointerDelta.client.vx) : "y" === o.drag.axis ? Math.abs(this.pointerDelta.client.vy) : this.pointerDelta.client.speed : this.pointerDelta.client.speed, g = a && a.enabled && "gesture" !== this.prepared.name && e !== h.startEvent, v = g && c - this.curCoords.timeStamp < 50 && p > a.minSpeed && p > a.endSpeed, g && !v && (f || y)) {
                    var S = {};
                    S.snap = S.restrict = S, f && (this.setSnapping(this.curCoords.page, S), S.locked && (x += S.dx, E += S.dy)), y && (this.setRestriction(this.curCoords.page, S), S.restricted && (x += S.dx, E += S.dy)), (x || E) && (m = !0)
                }
                if (v || m) {
                    if (u(h.upCoords, this.curCoords), this.pointers[0] = h.startEvent = new B(this, e, this.prepared.name, "inertiastart", this.element), h.t0 = c, n.fire(h.startEvent), v) {
                        h.vx0 = this.pointerDelta.client.vx, h.vy0 = this.pointerDelta.client.vy, h.v0 = p, this.calcInertia(h);
                        var b, w = d({}, this.curCoords.page),
                            D = P(n, this.element);
                        if (w.x = w.x + h.xe - D.x, w.y = w.y + h.ye - D.y, b = {
                                useStatusXY: !0,
                                x: w.x,
                                y: w.y,
                                dx: 0,
                                dy: 0,
                                snap: null
                            }, b.snap = b, x = E = 0, f) {
                            var z = this.setSnapping(this.curCoords.page, b);
                            z.locked && (x += z.dx, E += z.dy)
                        }
                        if (y) {
                            var T = this.setRestriction(this.curCoords.page, b);
                            T.restricted && (x += T.dx, E += T.dy)
                        }
                        h.modifiedXe += x, h.modifiedYe += E, h.i = Ve(this.boundInertiaFrame)
                    } else h.smoothEnd = !0, h.xe = x, h.ye = E, h.sx = h.sy = 0, h.i = Ve(this.boundSmoothEndFrame);
                    return void(h.active = !0)
                }(f || y) && this.pointerMove(t, e, i, r, !0)
            }
            if (this.dragging) {
                s = new B(this, e, "drag", "end", this.element);
                var C = this.element,
                    M = this.getDrop(s, C);
                this.dropTarget = M.dropzone, this.dropElement = M.element;
                var O = this.getDropEvents(e, s);
                O.leave && this.prevDropTarget.fire(O.leave), O.enter && this.dropTarget.fire(O.enter), O.drop && this.dropTarget.fire(O.drop), O.deactivate && this.fireActiveDrops(O.deactivate), n.fire(s)
            } else this.resizing ? (s = new B(this, e, "resize", "end", this.element), n.fire(s)) : this.gesturing && (s = new B(this, e, "gesture", "end", this.element), n.fire(s));
            this.stop(e)
        },
        collectDrops: function(t) {
            var e, r = [],
                s = [];
            for (t = t || this.element, e = 0; e < De.length; e++)
                if (De[e].options.drop.enabled) {
                    var n = De[e],
                        o = n.options.drop.accept;
                    if (!(i(o) && o !== t || l(o) && !pe(t, o)))
                        for (var a = n.selector ? n._context.querySelectorAll(n.selector) : [n._element], h = 0, p = a.length; p > h; h++) {
                            var c = a[h];
                            c !== t && (r.push(n), s.push(c))
                        }
                }
            return {
                dropzones: r,
                elements: s
            }
        },
        fireActiveDrops: function(t) {
            var e, i, r, s;
            for (e = 0; e < this.activeDrops.dropzones.length; e++) i = this.activeDrops.dropzones[e], r = this.activeDrops.elements[e], r !== s && (t.target = r, i.fire(t)), s = r
        },
        setActiveDrops: function(t) {
            var e = this.collectDrops(t, !0);
            this.activeDrops.dropzones = e.dropzones, this.activeDrops.elements = e.elements, this.activeDrops.rects = [];
            for (var i = 0; i < this.activeDrops.dropzones.length; i++) this.activeDrops.rects[i] = this.activeDrops.dropzones[i].getRect(this.activeDrops.elements[i])
        },
        getDrop: function(t, e) {
            var i = [];
            Te && this.setActiveDrops(e);
            for (var r = 0; r < this.activeDrops.dropzones.length; r++) {
                var s = this.activeDrops.dropzones[r],
                    n = this.activeDrops.elements[r],
                    o = this.activeDrops.rects[r];
                i.push(s.dropCheck(this.pointers[0], this.target, e, n, o) ? n : null)
            }
            var a = V(i);
            return {
                dropzone: this.activeDrops.dropzones[a] || null,
                element: this.activeDrops.elements[a] || null
            }
        },
        getDropEvents: function(t, e) {
            var i = {
                enter: null,
                leave: null,
                activate: null,
                deactivate: null,
                move: null,
                drop: null
            };
            return this.dropElement !== this.prevDropElement && (this.prevDropTarget && (i.leave = {
                target: this.prevDropElement,
                dropzone: this.prevDropTarget,
                relatedTarget: e.target,
                draggable: e.interactable,
                dragEvent: e,
                interaction: this,
                timeStamp: e.timeStamp,
                type: "dragleave"
            }, e.dragLeave = this.prevDropElement, e.prevDropzone = this.prevDropTarget), this.dropTarget && (i.enter = {
                target: this.dropElement,
                dropzone: this.dropTarget,
                relatedTarget: e.target,
                draggable: e.interactable,
                dragEvent: e,
                interaction: this,
                timeStamp: e.timeStamp,
                type: "dragenter"
            }, e.dragEnter = this.dropElement, e.dropzone = this.dropTarget)), "dragend" === e.type && this.dropTarget && (i.drop = {
                target: this.dropElement,
                dropzone: this.dropTarget,
                relatedTarget: e.target,
                draggable: e.interactable,
                dragEvent: e,
                interaction: this,
                timeStamp: e.timeStamp,
                type: "drop"
            }), "dragstart" === e.type && (i.activate = {
                target: null,
                dropzone: null,
                relatedTarget: e.target,
                draggable: e.interactable,
                dragEvent: e,
                interaction: this,
                timeStamp: e.timeStamp,
                type: "dropactivate"
            }), "dragend" === e.type && (i.deactivate = {
                target: null,
                dropzone: null,
                relatedTarget: e.target,
                draggable: e.interactable,
                dragEvent: e,
                interaction: this,
                timeStamp: e.timeStamp,
                type: "dropdeactivate"
            }), "dragmove" === e.type && this.dropTarget && (i.move = {
                target: this.dropElement,
                dropzone: this.dropTarget,
                relatedTarget: e.target,
                draggable: e.interactable,
                dragEvent: e,
                interaction: this,
                dragmove: e,
                timeStamp: e.timeStamp,
                type: "dropmove"
            }, e.dropzone = this.dropTarget), i
        },
        currentAction: function() {
            return this.dragging && "drag" || this.resizing && "resize" || this.gesturing && "gesture" || null
        },
        interacting: function() {
            return this.dragging || this.resizing || this.gesturing
        },
        clearTargets: function() {
            this.target && !this.target.selector && (this.target = this.element = null), this.dropTarget = this.dropElement = this.prevDropTarget = this.prevDropElement = null
        },
        stop: function(t) {
            if (this.interacting()) {
                Pe.stop(), this.matches = [], this.matchElements = [];
                var e = this.target;
                e.options.styleCursor && (e._doc.documentElement.style.cursor = ""), t && a(t.preventDefault) && this.checkAndPreventDefault(t, e, this.element), this.dragging && (this.activeDrops.dropzones = this.activeDrops.elements = this.activeDrops.rects = null), this.clearTargets()
            }
            this.pointerIsDown = this.snapStatus.locked = this.dragging = this.resizing = this.gesturing = !1, this.prepared.name = this.prevEvent = null, this.inertiaStatus.resumeDx = this.inertiaStatus.resumeDy = 0;
            for (var i = 0; i < this.pointers.length; i++) - 1 === ae(this.pointerIds, E(this.pointers[i])) && this.pointers.splice(i, 1);
            ze.length > 1 && ze.splice(ae(ze, this), 1)
        },
        inertiaFrame: function() {
            var t = this.inertiaStatus,
                e = this.target.options[this.prepared.name].inertia,
                i = e.resistance,
                r = (new Date).getTime() / 1e3 - t.t0;
            if (r < t.te) {
                var s = 1 - (Math.exp(-i * r) - t.lambda_v0) / t.one_ve_v0;
                if (t.modifiedXe === t.xe && t.modifiedYe === t.ye) t.sx = t.xe * s, t.sy = t.ye * s;
                else {
                    var n = _(0, 0, t.xe, t.ye, t.modifiedXe, t.modifiedYe, s);
                    t.sx = n.x, t.sy = n.y
                }
                this.pointerMove(t.startEvent, t.startEvent), t.i = Ve(this.boundInertiaFrame)
            } else t.sx = t.modifiedXe, t.sy = t.modifiedYe, this.pointerMove(t.startEvent, t.startEvent), t.active = !1, this.pointerEnd(t.startEvent, t.startEvent)
        },
        smoothEndFrame: function() {
            var t = this.inertiaStatus,
                e = (new Date).getTime() - t.t0,
                i = this.target.options[this.prepared.name].inertia.smoothEndDuration;
            i > e ? (t.sx = A(e, 0, t.xe, i), t.sy = A(e, 0, t.ye, i), this.pointerMove(t.startEvent, t.startEvent), t.i = Ve(this.boundSmoothEndFrame)) : (t.sx = t.xe, t.sy = t.ye, this.pointerMove(t.startEvent, t.startEvent), t.active = !1, t.smoothEnd = !1, this.pointerEnd(t.startEvent, t.startEvent))
        },
        addPointer: function(t) {
            var e = E(t),
                i = this.mouse ? 0 : ae(this.pointerIds, e);
            return -1 === i && (i = this.pointerIds.length), this.pointerIds[i] = e, this.pointers[i] = t, i
        },
        removePointer: function(t) {
            var e = E(t),
                i = this.mouse ? 0 : ae(this.pointerIds, e); - 1 !== i && (this.interacting() || this.pointers.splice(i, 1), this.pointerIds.splice(i, 1), this.downTargets.splice(i, 1), this.downTimes.splice(i, 1), this.holdTimers.splice(i, 1))
        },
        recordPointer: function(t) {
            if (!this.inertiaStatus.active) {
                var e = this.mouse ? 0 : ae(this.pointerIds, E(t)); - 1 !== e && (this.pointers[e] = t)
            }
        },
        collectEventTargets: function(t, e, r, s) {
            function n(t, e, n) {
                var o = de ? n.querySelectorAll(e) : void 0;
                t._iEvents[s] && i(p) && I(t, p) && !R(t, p, r) && F(t, p, r) && pe(p, e, o) && (a.push(t), h.push(p))
            }
            var o = this.mouse ? 0 : ae(this.pointerIds, E(t));
            if ("tap" !== s || !this.pointerWasMoved && this.downTargets[o] && this.downTargets[o] === r) {
                for (var a = [], h = [], p = r; p;) ie.isSet(p) && ie(p)._iEvents[s] && (a.push(ie(p)), h.push(p)), De.forEachSelector(n), p = k(p);
                (a.length || "tap" === s) && this.firePointers(t, e, r, a, h, s)
            }
        },
        firePointers: function(t, e, i, r, s, n) {
            var o, a, h, p = this.mouse ? 0 : ae(E(t)),
                c = {};
            for ("doubletap" === n ? c = t : (d(c, e), e !== t && d(c, t), c.preventDefault = K, c.stopPropagation = B.prototype.stopPropagation, c.stopImmediatePropagation = B.prototype.stopImmediatePropagation, c.interaction = this, c.timeStamp = (new Date).getTime(), c.originalEvent = e, c.type = n, c.pointerId = E(t), c.pointerType = this.mouse ? "mouse" : _e ? l(t.pointerType) ? t.pointerType : [, , "touch", "pen", "mouse"][t.pointerType] : "touch"), "tap" === n && (c.dt = c.timeStamp - this.downTimes[p], a = c.timeStamp - this.tapTime, h = !!(this.prevTap && "doubletap" !== this.prevTap.type && this.prevTap.target === c.target && 500 > a), c["double"] = h, this.tapTime = c.timeStamp), o = 0; o < r.length && (c.currentTarget = s[o], c.interactable = r[o], r[o].fire(c), !(c.immediatePropagationStopped || c.propagationStopped && s[o + 1] !== c.currentTarget)); o++);
            if (h) {
                var u = {};
                d(u, c), u.dt = a, u.type = "doubletap", this.collectEventTargets(u, e, i, "doubletap"), this.prevTap = u
            } else "tap" === n && (this.prevTap = c)
        },
        validateSelector: function(t, e, i) {
            for (var r = 0, s = e.length; s > r; r++) {
                var n = e[r],
                    o = i[r],
                    a = Z(n.getAction(t, this, o), n);
                if (a && U(n, o, a)) return this.target = n, this.element = o, a
            }
        },
        setSnapping: function(t, e) {
            var i, r, s, n = this.target.options[this.prepared.name].snap,
                o = [];
            if (e = e || this.snapStatus, e.useStatusXY) r = {
                x: e.x,
                y: e.y
            };
            else {
                var p = P(this.target, this.element);
                r = d({}, t), r.x -= p.x, r.y -= p.y
            }
            e.realX = r.x, e.realY = r.y, r.x = r.x - this.inertiaStatus.resumeDx, r.y = r.y - this.inertiaStatus.resumeDy;
            for (var l = n.targets ? n.targets.length : 0, c = 0; c < this.snapOffsets.length; c++) {
                var u = {
                    x: r.x - this.snapOffsets[c].x,
                    y: r.y - this.snapOffsets[c].y
                };
                for (s = 0; l > s; s++)(i = a(n.targets[s]) ? n.targets[s](u.x, u.y, this) : n.targets[s]) && o.push({
                    x: h(i.x) ? i.x + this.snapOffsets[c].x : u.x,
                    y: h(i.y) ? i.y + this.snapOffsets[c].y : u.y,
                    range: h(i.range) ? i.range : n.range
                })
            }
            var g = {
                target: null,
                inRange: !1,
                distance: 0,
                range: 0,
                dx: 0,
                dy: 0
            };
            for (s = 0, l = o.length; l > s; s++) {
                i = o[s];
                var v = i.range,
                    m = i.x - r.x,
                    f = i.y - r.y,
                    y = Se(m, f),
                    x = v >= y;
                1 / 0 === v && g.inRange && 1 / 0 !== g.range && (x = !1), (!g.target || (x ? g.inRange && 1 / 0 !== v ? y / v < g.distance / g.range : 1 / 0 === v && 1 / 0 !== g.range || y < g.distance : !g.inRange && y < g.distance)) && (1 / 0 === v && (x = !0), g.target = i, g.distance = y, g.range = v, g.inRange = x, g.dx = m, g.dy = f, e.range = v)
            }
            var E;
            return g.target ? (E = e.snappedX !== g.target.x || e.snappedY !== g.target.y, e.snappedX = g.target.x, e.snappedY = g.target.y) : (E = !0, e.snappedX = NaN, e.snappedY = NaN), e.dx = g.dx, e.dy = g.dy, e.changed = E || g.inRange && !e.locked, e.locked = g.inRange, e
        },
        setRestriction: function(t, e) {
            var r, s = this.target,
                n = s && s.options[this.prepared.name].restrict,
                o = n && n.restriction;
            if (!o) return e;
            e = e || this.restrictStatus, r = r = e.useStatusXY ? {
                x: e.x,
                y: e.y
            } : d({}, t), e.snap && e.snap.locked && (r.x += e.snap.dx || 0, r.y += e.snap.dy || 0), r.x -= this.inertiaStatus.resumeDx, r.y -= this.inertiaStatus.resumeDy, e.dx = 0, e.dy = 0, e.restricted = !1;
            var h, p, c;
            return l(o) && !(o = "parent" === o ? k(this.element) : "self" === o ? s.getRect(this.element) : Y(this.element, o)) ? e : (a(o) && (o = o(r.x, r.y, this.element)), i(o) && (o = w(o)), h = o, o ? "x" in o && "y" in o ? (p = Math.max(Math.min(h.x + h.width - this.restrictOffset.right, r.x), h.x + this.restrictOffset.left), c = Math.max(Math.min(h.y + h.height - this.restrictOffset.bottom, r.y), h.y + this.restrictOffset.top)) : (p = Math.max(Math.min(h.right - this.restrictOffset.right, r.x), h.left + this.restrictOffset.left), c = Math.max(Math.min(h.bottom - this.restrictOffset.bottom, r.y), h.top + this.restrictOffset.top)) : (p = r.x, c = r.y), e.dx = p - r.x, e.dy = c - r.y, e.changed = e.restrictedX !== p || e.restrictedY !== c, e.restricted = !(!e.dx && !e.dy), e.restrictedX = p, e.restrictedY = c, e)
        },
        checkAndPreventDefault: function(t, e, i) {
            if (e = e || this.target) {
                var r = e.options,
                    s = r.preventDefault;
                if ("auto" === s && i && !/^input$|^textarea$/i.test(i.nodeName)) {
                    if (/down|start/i.test(t.type) && "drag" === this.prepared.name && "xy" !== r.drag.axis) return;
                    if (r[this.prepared.name] && r[this.prepared.name].manualStart && !this.interacting()) return;
                    return void t.preventDefault()
                }
                return "always" === s ? void t.preventDefault() : void 0
            }
        },
        calcInertia: function(t) {
            var e = this.target.options[this.prepared.name].inertia,
                i = e.resistance,
                r = -Math.log(e.endSpeed / t.v0) / i;
            t.x0 = this.prevEvent.pageX, t.y0 = this.prevEvent.pageY, t.t0 = t.startEvent.timeStamp / 1e3, t.sx = t.sy = 0, t.modifiedXe = t.xe = (t.vx0 - r) / i, t.modifiedYe = t.ye = (t.vy0 - r) / i, t.te = r, t.lambda_v0 = i / t.v0, t.one_ve_v0 = 1 - e.endSpeed / t.v0
        },
        _updateEventTargets: function(t, e) {
            this._eventTarget = t, this._curEventTarget = e
        }
    }, B.prototype = {
        preventDefault: e,
        stopImmediatePropagation: function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        },
        stopPropagation: function() {
            this.propagationStopped = !0
        }
    };
    for (var Le = {}, Be = ["dragStart", "dragMove", "resizeStart", "resizeMove", "gestureStart", "gestureMove", "pointerOver", "pointerOut", "pointerHover", "selectorDown", "pointerDown", "pointerMove", "pointerUp", "pointerCancel", "pointerEnd", "addPointer", "removePointer", "recordPointer"], Ke = 0, je = Be.length; je > Ke; Ke++) {
        var Je = Be[Ke];
        Le[Je] = L(Je)
    }
    De.indexOfElement = function(t, e) {
            e = e || ge;
            for (var i = 0; i < this.length; i++) {
                var r = this[i];
                if (r.selector === t && r._context === e || !r.selector && r._element === t) return i
            }
            return -1
        }, De.get = function(t, e) {
            return this[this.indexOfElement(t, e && e.context)]
        }, De.forEachSelector = function(t) {
            for (var e = 0; e < this.length; e++) {
                var i = this[e];
                if (i.selector) {
                    var r = t(i, i.selector, i._context, e, this);
                    if (void 0 !== r) return r
                }
            }
        }, re.prototype = {
            setOnEvents: function(t, e) {
                return "drop" === t ? (a(e.ondrop) && (this.ondrop = e.ondrop), a(e.ondropactivate) && (this.ondropactivate = e.ondropactivate), a(e.ondropdeactivate) && (this.ondropdeactivate = e.ondropdeactivate), a(e.ondragenter) && (this.ondragenter = e.ondragenter), a(e.ondragleave) && (this.ondragleave = e.ondragleave), a(e.ondropmove) && (this.ondropmove = e.ondropmove)) : (t = "on" + t, a(e.onstart) && (this[t + "start"] = e.onstart), a(e.onmove) && (this[t + "move"] = e.onmove), a(e.onend) && (this[t + "end"] = e.onend), a(e.oninertiastart) && (this[t + "inertiastart"] = e.oninertiastart)), this
            },
            draggable: function(t) {
                return o(t) ? (this.options.drag.enabled = !1 !== t.enabled, this.setPerAction("drag", t), this.setOnEvents("drag", t), /^x$|^y$|^xy$/.test(t.axis) ? this.options.drag.axis = t.axis : null === t.axis && delete this.options.drag.axis, this) : p(t) ? (this.options.drag.enabled = t, this) : this.options.drag
            },
            setPerAction: function(t, e) {
                for (var i in e) i in Me[t] && (o(e[i]) ? (this.options[t][i] = d(this.options[t][i] || {}, e[i]), o(Me.perAction[i]) && "enabled" in Me.perAction[i] && (this.options[t][i].enabled = !1 !== e[i].enabled)) : p(e[i]) && o(Me.perAction[i]) ? this.options[t][i].enabled = e[i] : void 0 !== e[i] && (this.options[t][i] = e[i]))
            },
            dropzone: function(t) {
                return o(t) ? (this.options.drop.enabled = !1 !== t.enabled, this.setOnEvents("drop", t), this.accept(t.accept), /^(pointer|center)$/.test(t.overlap) ? this.options.drop.overlap = t.overlap : h(t.overlap) && (this.options.drop.overlap = Math.max(Math.min(1, t.overlap), 0)), this) : p(t) ? (this.options.drop.enabled = t, this) : this.options.drop
            },
            dropCheck: function(t, e, i, r, s) {
                var n = !1;
                if (!(s = s || this.getRect(r))) return !!this.options.dropChecker && this.options.dropChecker(t, n, this, r, e, i);
                var o = this.options.drop.overlap;
                if ("pointer" === o) {
                    var a, p, l = f(t),
                        c = P(e, i);
                    l.x += c.x, l.y += c.y, a = l.x > s.left && l.x < s.right, p = l.y > s.top && l.y < s.bottom, n = a && p
                }
                var d = e.getRect(i);
                if ("center" === o) {
                    var u = d.left + d.width / 2,
                        g = d.top + d.height / 2;
                    n = u >= s.left && u <= s.right && g >= s.top && g <= s.bottom
                }
                if (h(o)) {
                    n = Math.max(0, Math.min(s.right, d.right) - Math.max(s.left, d.left)) * Math.max(0, Math.min(s.bottom, d.bottom) - Math.max(s.top, d.top)) / (d.width * d.height) >= o
                }
                return this.options.dropChecker && (n = this.options.dropChecker(t, n, this, r, e, i)), n
            },
            dropChecker: function(t) {
                return a(t) ? (this.options.dropChecker = t, this) : null === t ? (delete this.options.getRect, this) : this.options.dropChecker
            },
            accept: function(t) {
                return i(t) ? (this.options.drop.accept = t, this) : c(t) ? (this.options.drop.accept = t, this) : null === t ? (delete this.options.drop.accept, this) : this.options.drop.accept
            },
            resizable: function(t) {
                return o(t) ? (this.options.resize.enabled = !1 !== t.enabled, this.setPerAction("resize", t), this.setOnEvents("resize", t), /^x$|^y$|^xy$/.test(t.axis) ? this.options.resize.axis = t.axis : null === t.axis && (this.options.resize.axis = Me.resize.axis), p(t.square) && (this.options.resize.square = t.square), this) : p(t) ? (this.options.resize.enabled = t, this) : this.options.resize
            },
            squareResize: function(t) {
                return p(t) ? (this.options.resize.square = t, this) : null === t ? (delete this.options.resize.square, this) : this.options.resize.square
            },
            gesturable: function(t) {
                return o(t) ? (this.options.gesture.enabled = !1 !== t.enabled, this.setPerAction("gesture", t), this.setOnEvents("gesture", t), this) : p(t) ? (this.options.gesture.enabled = t, this) : this.options.gesture
            },
            autoScroll: function(t) {
                return o(t) ? t = d({
                    actions: ["drag", "resize"]
                }, t) : p(t) && (t = {
                    actions: ["drag", "resize"],
                    enabled: t
                }), this.setOptions("autoScroll", t)
            },
            snap: function(t) {
                var e = this.setOptions("snap", t);
                return e === this ? this : e.drag
            },
            setOptions: function(t, e) {
                var i, r = e && n(e.actions) ? e.actions : ["drag"];
                if (o(e) || p(e)) {
                    for (i = 0; i < r.length; i++) {
                        var s = /resize/.test(r[i]) ? "resize" : r[i];
                        if (o(this.options[s])) {
                            var a = this.options[s][t];
                            o(e) ? (d(a, e), a.enabled = !1 !== e.enabled, "snap" === t && ("grid" === a.mode ? a.targets = [ie.createSnapGrid(d({
                                offset: a.gridOffset || {
                                    x: 0,
                                    y: 0
                                }
                            }, a.grid || {}))] : "anchor" === a.mode ? a.targets = a.anchors : "path" === a.mode && (a.targets = a.paths), "elementOrigin" in e && (a.relativePoints = [e.elementOrigin]))) : p(e) && (a.enabled = e)
                        }
                    }
                    return this
                }
                var h = {},
                    l = ["drag", "resize", "gesture"];
                for (i = 0; i < l.length; i++) t in Me[l[i]] && (h[l[i]] = this.options[l[i]][t]);
                return h
            },
            inertia: function(t) {
                var e = this.setOptions("inertia", t);
                return e === this ? this : e.drag
            },
            getAction: function(t, e, i) {
                var r = this.defaultActionChecker(t, e, i);
                return this.options.actionChecker ? this.options.actionChecker(t, r, this, i, e) : r
            },
            defaultActionChecker: Q,
            actionChecker: function(t) {
                return a(t) ? (this.options.actionChecker = t, this) : null === t ? (delete this.options.actionChecker, this) : this.options.actionChecker
            },
            getRect: function(t) {
                return t = t || this._element, this.selector && !i(t) && (t = this._context.querySelector(this.selector)), w(t)
            },
            rectChecker: function(t) {
                return a(t) ? (this.getRect = t, this) : null === t ? (delete this.options.getRect, this) : this.getRect
            },
            styleCursor: function(t) {
                return p(t) ? (this.options.styleCursor = t, this) : null === t ? (delete this.options.styleCursor, this) : this.options.styleCursor
            },
            preventDefault: function(t) {
                return /^(always|never|auto)$/.test(t) ? (this.options.preventDefault = t, this) : p(t) ? (this.options.preventDefault = t ? "always" : "never", this) : this.options.preventDefault
            },
            origin: function(t) {
                return c(t) ? (this.options.origin = t, this) : o(t) ? (this.options.origin = t, this) : this.options.origin
            },
            deltaSource: function(t) {
                return "page" === t || "client" === t ? (this.options.deltaSource = t, this) : this.options.deltaSource
            },
            restrict: function(t) {
                if (!o(t)) return this.setOptions("restrict", t);
                for (var e, i = ["drag", "resize", "gesture"], r = 0; r < i.length; r++) {
                    var s = i[r];
                    if (s in t) {
                        var n = d({
                            actions: [s],
                            restriction: t[s]
                        }, t);
                        e = this.setOptions("restrict", n)
                    }
                }
                return e
            },
            context: function() {
                return this._context
            },
            _context: ge,
            ignoreFrom: function(t) {
                return c(t) ? (this.options.ignoreFrom = t, this) : i(t) ? (this.options.ignoreFrom = t, this) : this.options.ignoreFrom
            },
            allowFrom: function(t) {
                return c(t) ? (this.options.allowFrom = t, this) : i(t) ? (this.options.allowFrom = t, this) : this.options.allowFrom
            },
            element: function() {
                return this._element
            },
            fire: function(t) {
                if (!t || !t.type || !he(qe, t.type)) return this;
                var e, i, r, s = "on" + t.type;
                if (t.type in this._iEvents)
                    for (e = this._iEvents[t.type], i = 0, r = e.length; r > i && !t.immediatePropagationStopped; i++) e[i].name, e[i](t);
                if (a(this[s]) && (this[s].name, this[s](t)), t.type in Ne && (e = Ne[t.type]))
                    for (i = 0, r = e.length; r > i && !t.immediatePropagationStopped; i++) e[i].name, e[i](t);
                return this
            },
            on: function(t, e, i) {
                var r;
                if (l(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), n(t)) {
                    for (r = 0; r < t.length; r++) this.on(t[r], e, i);
                    return this
                }
                if (o(t)) {
                    for (var s in t) this.on(s, t[s], e);
                    return this
                }
                if ("wheel" === t && (t = Fe), i = !!i, he(qe, t)) t in this._iEvents ? this._iEvents[t].push(e) : this._iEvents[t] = [e];
                else if (this.selector) {
                    if (!Ce[t])
                        for (Ce[t] = {
                                selectors: [],
                                contexts: [],
                                listeners: []
                            }, r = 0; r < we.length; r++) Ge.add(we[r], t, te), Ge.add(we[r], t, ee, !0);
                    var a, h = Ce[t];
                    for (a = h.selectors.length - 1; a >= 0 && (h.selectors[a] !== this.selector || h.contexts[a] !== this._context); a--); - 1 === a && (a = h.selectors.length, h.selectors.push(this.selector), h.contexts.push(this._context), h.listeners.push([])), h.listeners[a].push([e, i])
                } else Ge.add(this._element, t, e, i);
                return this
            },
            off: function(t, e, i) {
                var r;
                if (l(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), n(t)) {
                    for (r = 0; r < t.length; r++) this.off(t[r], e, i);
                    return this
                }
                if (o(t)) {
                    for (var s in t) this.off(s, t[s], e);
                    return this
                }
                var a, h = -1;
                if (i = !!i, "wheel" === t && (t = Fe), he(qe, t))(a = this._iEvents[t]) && -1 !== (h = ae(a, e)) && this._iEvents[t].splice(h, 1);
                else if (this.selector) {
                    var p = Ce[t],
                        c = !1;
                    if (!p) return this;
                    for (h = p.selectors.length - 1; h >= 0; h--)
                        if (p.selectors[h] === this.selector && p.contexts[h] === this._context) {
                            var d = p.listeners[h];
                            for (r = d.length - 1; r >= 0; r--) {
                                var u = d[r][0],
                                    g = d[r][1];
                                if (u === e && g === i) {
                                    d.splice(r, 1), d.length || (p.selectors.splice(h, 1), p.contexts.splice(h, 1), p.listeners.splice(h, 1), Ge.remove(this._context, t, te), Ge.remove(this._context, t, ee, !0), p.selectors.length || (Ce[t] = null)), c = !0;
                                    break
                                }
                            }
                            if (c) break
                        }
                } else Ge.remove(this._element, t, e, i);
                return this
            },
            set: function(t) {
                o(t) || (t = {}), this.options = d({}, Me.base);
                var e, i = ["drag", "drop", "resize", "gesture"],
                    r = ["draggable", "dropzone", "resizable", "gesturable"],
                    s = d(d({}, Me.perAction), t[n] || {});
                for (e = 0; e < i.length; e++) {
                    var n = i[e];
                    this.options[n] = d({}, Me[n]), this.setPerAction(n, s), this[r[e]](t[n])
                }
                var a = ["accept", "actionChecker", "allowFrom", "deltaSource", "dropChecker", "ignoreFrom", "origin", "preventDefault", "rectChecker"];
                for (e = 0, je = a.length; je > e; e++) {
                    var h = a[e];
                    this.options[h] = Me.base[h], h in t && this[h](t[h])
                }
                return this
            },
            unset: function() {
                if (Ge.remove(this, "all"), l(this.selector))
                    for (var t in Ce)
                        for (var e = Ce[t], i = 0; i < e.selectors.length; i++) {
                            e.selectors[i] === this.selector && e.contexts[i] === this._context && (e.selectors.splice(i, 1), e.contexts.splice(i, 1), e.listeners.splice(i, 1), e.selectors.length || (Ce[t] = null)), Ge.remove(this._context, t, te), Ge.remove(this._context, t, ee, !0);
                            break
                        } else Ge.remove(this, "all"), this.options.styleCursor && (this._element.style.cursor = "");
                return this.dropzone(!1), De.splice(ae(De, this), 1), ie
            }
        }, re.prototype.snap = se(re.prototype.snap, "Interactable#snap is deprecated. See the new documentation for snapping at http://interactjs.io/docs/snapping"), re.prototype.restrict = se(re.prototype.restrict, "Interactable#restrict is deprecated. See the new documentation for resticting at http://interactjs.io/docs/restriction"), re.prototype.inertia = se(re.prototype.inertia, "Interactable#inertia is deprecated. See the new documentation for inertia at http://interactjs.io/docs/inertia"), re.prototype.autoScroll = se(re.prototype.autoScroll, "Interactable#autoScroll is deprecated. See the new documentation for autoScroll at http://interactjs.io/docs/#autoscroll"), ie.isSet = function(t, e) {
            return -1 !== De.indexOfElement(t, e && e.context)
        }, ie.on = function(t, e, i) {
            if (l(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), n(t)) {
                for (var r = 0; r < t.length; r++) ie.on(t[r], e, i);
                return ie
            }
            if (o(t)) {
                for (var s in t) ie.on(s, t[s], e);
                return ie
            }
            return he(qe, t) ? Ne[t] ? Ne[t].push(e) : Ne[t] = [e] : Ge.add(ge, t, e, i), ie
        }, ie.off = function(t, e, i) {
            if (l(t) && -1 !== t.search(" ") && (t = t.trim().split(/ +/)), n(t)) {
                for (var r = 0; r < t.length; r++) ie.off(t[r], e, i);
                return ie
            }
            if (o(t)) {
                for (var s in t) ie.off(s, t[s], e);
                return ie
            }
            if (he(qe, t)) {
                var a;
                t in Ne && -1 !== (a = ae(Ne[t], e)) && Ne[t].splice(a, 1)
            } else Ge.remove(ge, t, e, i);
            return ie
        }, ie.enableDragging = se(function(t) {
            return null !== t && void 0 !== t ? (Re.drag = t, ie) : Re.drag
        }, "interact.enableDragging is deprecated and will soon be removed."), ie.enableResizing = se(function(t) {
            return null !== t && void 0 !== t ? (Re.resize = t, ie) : Re.resize
        }, "interact.enableResizing is deprecated and will soon be removed."), ie.enableGesturing = se(function(t) {
            return null !== t && void 0 !== t ? (Re.gesture = t, ie) : Re.gesture
        }, "interact.enableGesturing is deprecated and will soon be removed."), ie.eventTypes = qe, ie.debug = function() {
            var t = ze[0] || new $;
            return {
                interactions: ze,
                target: t.target,
                dragging: t.dragging,
                resizing: t.resizing,
                gesturing: t.gesturing,
                prepared: t.prepared,
                matches: t.matches,
                matchElements: t.matchElements,
                prevCoords: t.prevCoords,
                startCoords: t.startCoords,
                pointerIds: t.pointerIds,
                pointers: t.pointers,
                addPointer: Le.addPointer,
                removePointer: Le.removePointer,
                recordPointer: Le.recordPointer,
                snap: t.snapStatus,
                restrict: t.restrictStatus,
                inertia: t.inertiaStatus,
                downTime: t.downTimes[0],
                downEvent: t.downEvent,
                downPointer: t.downPointer,
                prevEvent: t.prevEvent,
                Interactable: re,
                interactables: De,
                pointerIsDown: t.pointerIsDown,
                defaultOptions: Me,
                defaultActionChecker: Q,
                actionCursors: Ie,
                dragMove: Le.dragMove,
                resizeMove: Le.resizeMove,
                gestureMove: Le.gestureMove,
                pointerUp: Le.pointerUp,
                pointerDown: Le.pointerDown,
                pointerMove: Le.pointerMove,
                pointerHover: Le.pointerHover,
                events: Ge,
                globalEvents: Ne,
                delegatedEvents: Ce
            }
        }, ie.getTouchAverage = z, ie.getTouchBBox = T, ie.getTouchDistance = C, ie.getTouchAngle = M, ie.getElementRect = w, ie.matchesSelector = pe, ie.closest = Y, ie.margin = function(t) {
            return h(t) ? (Ae = t, ie) : Ae
        }, ie.supportsTouch = function() {
            return Oe
        }, ie.supportsPointerEvent = function() {
            return _e
        }, ie.stop = function(t) {
            for (var e = ze.length - 1; e > 0; e--) ze[e].stop(t);
            return ie
        }, ie.dynamicDrop = function(t) {
            return p(t) ? (Te = t, ie) : Te
        }, ie.pointerMoveTolerance = function(t) {
            return h(t) ? (Xe = t, this) : Xe
        }, ie.maxInteractions = function(t) {
            return h(t) ? (ke = t, this) : ke
        }, ie.createSnapGrid = function(t) {
            return function(e, i) {
                var r = 0,
                    s = 0;
                o(t.offset) && (r = t.offset.x, s = t.offset.y);
                var n = Math.round((e - r) / t.x),
                    a = Math.round((i - s) / t.y);
                return {
                    x: n * t.x + r,
                    y: a * t.y + s,
                    range: t.range
                }
            }
        }, oe(ge), Ue in Element.prototype && a(Element.prototype[Ue]) || (de = function(t, e, i) {
            i = i || t.parentNode.querySelectorAll(e);
            for (var r = 0, s = i.length; s > r; r++)
                if (i[r] === t) return !0;
            return !1
        }),
        function() {
            for (var e = 0, i = ["ms", "moz", "webkit", "o"], r = 0; r < i.length && !t.requestAnimationFrame; ++r) Ve = t[i[r] + "RequestAnimationFrame"], $e = t[i[r] + "CancelAnimationFrame"] || t[i[r] + "CancelRequestAnimationFrame"];
            Ve || (Ve = function(t) {
                var i = (new Date).getTime(),
                    r = Math.max(0, 16 - (i - e)),
                    s = setTimeout(function() {
                        t(i + r)
                    }, r);
                return e = i + r, s
            }), $e || ($e = function(t) {
                clearTimeout(t)
            })
        }(), "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = ie), exports.interact = ie) : "function" == typeof define && define.amd ? define("interact", function() {
            return ie
        }) : t.interact = ie
}(window),
function() {
    var Form, __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            function ctor() {
                this.constructor = child
            }
            for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
            return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
        };
    Form = function(_super) {
        function Form($form, logicJumpsController, scoreCalculator, priceCalculator, submitButton, observer, templates, settings, currencyFormatter, numberFormatter, controlsFactory, submissionRepository, featureService) {
            function startConversation(control) {
                var isStaged = !(App.Utils.isControlRequired(control) && !App.Utils.getControlValue(control));
            }
            var numAnswers, self, stripeService, blurHeight;
            this.$form = $form, this.logicJumpsController = logicJumpsController, this.scoreCalculator = scoreCalculator, this.priceCalculator = priceCalculator, this.submitButton = submitButton, this.observer = observer, this.templates = templates, this.currencyFormatter = currencyFormatter, this.numberFormatter = numberFormatter, this.controlsFactory = controlsFactory, this.submissionRepository = submissionRepository, this.featureService = featureService, self = this, this.$document = $(document), this.$body = $("body"), this.settings = $.extend({}, defaults, settings), this.header = new App["default"].Header({
                    model: new App.HeaderModel
                }), this.subheader = new App["default"].SubHeader({
                    model: new App.HeaderModel
                }), this.$footer = this.$form.find("#unfixed-footer"), this.$upButton = $(".nav-buttons").find(".up").children(".button"), this.$downButton = $(".nav-buttons").find(".down").children(".button"), this.scrollPoints = new App.Service.ScrollPoints, stripeService = App.Utils.StripeServiceFactory.getStripeService(this.settings.stripePublishableKey), blurHeight = Globals.isEmbed && Globals.embedOptions.hideFooter ? 0 : 58, this.footer = new App.Footer(this.$footer, stripeService, this.scoreCalculator, this.priceCalculator, this.numberFormatter, this.submitButton, this.submissionRepository, {
                    useKeyboard: !0,
                    blurHeight: blurHeight,
                    onSuccess: function() {
                        return self.close()
                    }
                }, this.featureService), this.$ul = this.$form.children(".questions"),
                this.$quickys = this.$ul.children("li"), this.numQuestions = this.$quickys.length, numAnswers = this.$ul.children("li:not(.statement,.group)").length, 0 === numAnswers && this.$body.removeClass("percent proportion"), this.$body.hasClass("proportion") && !_.isEmpty(jumps) && this.$body.removeClass("proportion").addClass("percent"), this.$body.hasClass("proportion") ? this.apiProgress = this.$body.find("#progress").progressBar(numAnswers, {
                    mode: 0,
                    text: App.Texts["progress-proportion"]
                }).data("progress") : this.$body.hasClass("percent") ? this.apiProgress = this.$body.find("#progress").progressBar(numAnswers, {
                    mode: 1,
                    text: App.Texts["progress-percent"]
                }).data("progress") : this.apiProgress = this.$body.find("#progress").progressBar(numAnswers, {
                    mode: 1,
                    text: App.Texts["progress-percent"],
                    hidden: !0
                }).data("progress"), this.scroll = new App.Scroll(this.$ul, {
                    footer: "field" !== Globals.parent ? this.footer : void 0,
                    onFocus: function($quicky) {
                        var control;
                        return control = $quicky.data("control"), self.preloadNextVisibleImages(control), self.scroll.isAtFooter() ? (self.$downButton.enable(!1), self.$upButton.enable(!0)) : (self.$downButton.enable(!0), self.$upButton.enable(!self.scroll.isAtFirst()), control.bindEvents(), self.Error.check(control.$elem), control.open(), null != control.connect && (control.connect.$elem.addClass("focus"), control.connect.bindEvents(), control.connect.open(), control.connect.attachment ? control.connect.attachment.load() : "list-image" === control.connect.type && control.connect.load()), self.footer.hide(), self.$ul.css({
                            top: 0
                        }), control.attachment ? control.attachment.load() : "list-image" === control.type ? control.load() : void 0)
                    },
                    onBlur: function($quicky) {
                        var control;
                        control = $quicky.data("control"), null != control.connect && (control.connect.$elem.removeClass("focus"), control.connect.unbindEvents(), control.connect.setValue(), control.connect.attachment ? control.connect.attachment.pause() : "list-image" === control.connect.type && control.connect.pause()), control.unbindEvents(), self.confirmButton.hide(), control.attachment ? control.attachment.pause() : "list-image" === control.type && control.pause(), typeform.Form.scroll.current >= 0 && !App.Utils.isGroupControl(control) && _.defer(function() {
                            startConversation(control)
                        }, 0)
                    }
                }), this.Error = new App.Error(this.footer, {
                    onFinish: function() {
                        return self.scroll.refresh()
                    }
                }), this.confirmButton = new App.Confirm(this.scroll), window.useKeyboardEvents = !0, window.form = {
                    error: {
                        show: function(elem, str) {
                            return self.Error.show(elem, str)
                        },
                        hide: function(elem, str) {
                            return self.Error.hide(elem, str)
                        }
                    },
                    autoNext: function(delay) {
                        return null == delay && (delay = !0), self.next(delay, !1)
                    },
                    next: function(delay) {
                        return null == delay && (delay = !1), self.next(delay)
                    },
                    scrollTo: function(index) {
                        return self.scroll.scrollTo(index)
                    },
                    updatePositions: function() {
                        return self.scroll.refresh()
                    },
                    center: function(h) {
                        return self.scroll.scrollToPos(window.pageYOffset + h)
                    },
                    checkConfirm: self.confirmButton.check
                }, this.controls = this.controlsFactory.build(this.$quickys, this.confirmButton, this.scroll, this.templates, this.footer), this.footer.setControls(this.controls), this.logicJumpsController.setControls(this.controls), this.scoreCalculator.connect(this.controls), this.priceCalculator.connect(this.controls), this.extend(), Form.__super__.constructor.call(this)
        }
        var defaults, resizeDocument, resizeFooter, resizeFromDocumentSize;
        return __extends(Form, _super), defaults = {
            onClose: function() {}
        }, !1, resizeFooter = function() {
            return this.footer.resize(this.windowHeight)
        }, resizeDocument = function() {
            var $wrapper, attachmentContainerWidth, control, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
            for (attachmentContainerWidth = null, this.$body.addClass("resize-precalculate"), _ref = this.controls, _i = 0, _len = _ref.length; _i < _len; _i++) control = _ref[_i], $wrapper = control.$elem.children(".wrapper"), $wrapper.height(""), control.attachment && control.attachment.precalculate(), control.resize();
            for (this.$body.removeClass("resize-precalculate"), _ref1 = this.controls, _j = 0, _len1 = _ref1.length; _j < _len1; _j++) control = _ref1[_j], control.attachment && (null == attachmentContainerWidth && (attachmentContainerWidth = control.attachment.$attachment.parent().width()), control.attachment.resize(this.windowHeight, attachmentContainerWidth)), null != control.applyResize && control.applyResize();
            for (_ref2 = this.controls, _k = 0, _len2 = _ref2.length; _k < _len2; _k++) control = _ref2[_k], null != control.sortKeyboardNavigation && control.sortKeyboardNavigation(), "field" !== Globals.parent && (control.$wrapper = control.$elem.children(".wrapper"), control.wrapperHeight = control.$wrapper.height());
            if ("field" !== Globals.parent)
                for (_ref3 = this.controls, _l = 0, _len3 = _ref3.length; _l < _len3; _l++) control = _ref3[_l], control.$wrapper.height(control.wrapperHeight);
            return this.$ul.css({
                marginTop: this.windowHeight / 2,
                marginBottom: this.windowHeight / 2 + this.footer.getScrollableLength()
            })
        }, resizeFromDocumentSize = function() {
            var current, _ref;
            return this.header.hide(), this.subheader.hide(), this.$body.addClass("resizing-scroll"), this.scroll.refresh(!1), this.setScrollPoints(), this.$body.removeClass("resizing-scroll"), current = this.scroll.getCurrent(), current > 0 && this.scroll.scrollTo(current, !1, !1), null != (null != (_ref = this.controls[current]) ? _ref.parent : void 0) && this.header.show(), resizeFooter.call(this)
        }, Form.prototype.show = function() {}, Form.prototype.hide = function() {
            return this.$form.hide()
        }, Form.prototype.afterHideLoader = function() {
            return this.$form.prepend(this.subheader.render(), this.header.render())
        }, Form.prototype.open = function(startQuestion, animate) {
            var self;
            return null == startQuestion && (startQuestion = 0), null == animate && (animate = !0), self = this, this.$form.fadeIn(Globals.pageTransitionDelay), self.scroll.start(animate), "field" !== Globals.parent && this.scroll.bindEvents(), this.bindEvents()
        }, Form.prototype.close = function() {
            var self;
            return self = this, this.$form.fadeOut(Globals.pageTransitionDelay, function() {
                return self.settings.onClose()
            }), this.unbindEvents()
        }, Form.prototype.refresh = function() {
            this.scroll.refresh(!0), resizeFooter.call(this), this.setScrollPoints()
        }, Form.prototype.resize = function(windowHeight) {
            this.windowHeight = windowHeight, resizeDocument.call(this), resizeFromDocumentSize.call(this)
        }, Form.prototype.bindEvents = function() {
            return $(document).on("keydown.form", this, function(e) {
                var currentControl, displayedControls, key, self;
                if (self = e.data, key = document.all ? e.keyCode : e.which, self.scroll.isAtFooter() || (currentControl = self.scroll.getCurrentControl()), displayedControls = _.filter(self.controls, function(control) {
                        return control.isActive && control.isVisible
                    }), "keydown" === e.type)
                    if (App.Keyboard.isEnter(key) && !self.preventNavEvents) {
                        if (currentControl && currentControl.checkEnter() && (e.preventDefault(), !self.scroll.isAtFooter())) return form.next("fast")
                    } else if (App.Keyboard.isSpace(key)) {
                    if (!$(e.target).is(":input")) return e.preventDefault()
                } else if ((App.Keyboard.isTab(key) && e.shiftKey || App.Keyboard.isPageUp(key)) && !this.preventNavEvents) {
                    if (e.preventDefault(), !self.scroll.isAtFirst()) return self.scroll.scrollToPrev(!1)
                } else if ((App.Keyboard.isTab(key) && !e.shiftKey || App.Keyboard.isPageDown(key)) && !this.preventNavEvents) {
                    if (e.preventDefault(), !self.scroll.isAtFooter()) return self.scroll.scrollToNext(!1)
                } else {
                    if (App.Keyboard.isArrowDown(key)) {
                        if (!self.scroll.isAtFooter() && (currentControl.advanceArrow(App.Keyboard.DOWN) || e.shiftKey)) {
                            self.scroll.scrollToNext(!1);
                            try {
                                displayedControls[self.scroll.getCurrent() + 1].preSelectFirst()
                            } catch (_error) {}
                        }
                        return !1
                    }
                    if (App.Keyboard.isArrowUp(key)) return (self.scroll.isAtFooter() || currentControl.advanceArrow(App.Keyboard.UP) || e.shiftKey) && (self.scroll.isAtFirst() || (self.scroll.scrollToPrev(!1), displayedControls[self.scroll.getCurrent() - 1].preSelectLast())), !1;
                    if (App.Keyboard.isArrowRight(key)) {
                        if (!self.scroll.isAtFooter() && (currentControl.advanceArrow(App.Keyboard.RIGHT) || e.shiftKey)) {
                            self.scroll.scrollToNext(!1);
                            try {
                                displayedControls[self.scroll.getCurrent() + 1].preSelectFirst()
                            } catch (_error) {}
                        }
                        return !1
                    }
                    if (App.Keyboard.isArrowLeft(key)) return (self.scroll.isAtFooter() || currentControl.advanceArrow(App.Keyboard.LEFT) || e.shiftKey) && (self.scroll.isAtFirst() || (self.scroll.scrollToPrev(!1), displayedControls[self.scroll.getCurrent() - 1].preSelectLast())), !1
                }
            }), $(document).on("mouseenter.form mouseleave.form", ".container", this, function(e) {
                return "mouseenter" === e.type ? ($(".pre-selected").removeClass("pre-selected"), $(this).addClass("pre-selected")) : $(this).removeClass("pre-selected")
            }), $(".nav-buttons").on("mouseup.form", ".nav.enabled", this, function(e) {
                var self;
                return self = e.data, $(this).parent(".down").length ? self.scroll.scrollToNext(!1) : self.scroll.scrollToPrev(!1)
            })
        }, Form.prototype.unbindEvents = function() {
            $(document).off(".form"), this.scroll.unbindEvents(), this.footer.unbindEvents()
        }, Form.prototype.updateHeaderModel = function(header, control) {
            var attachment, splitQuestion;
            attachment = null != control.attachment.$attachment && control.attachment, splitQuestion = control.question.getText().split("<br>"), splitQuestion.length > 1 && (splitQuestion[0] += "..."), header.model.set({
                question: splitQuestion[0],
                item: control.$elem.find(".item").html(),
                type: "group" === control.type ? "group" : "default",
                attachment: attachment,
                description: control.description.getText(),
                showStripeBanner: control.isPaymentField && control.isPaymentField()
            })
        }, Form.prototype.calculatePoints = function(control) {
            var bottomOffset, bottomPoint, childrenHeight, childs, fieldHeight, topOffset, topPoint, windowHeight;
            return windowHeight = $(window).height(), fieldHeight = control.$elem.outerHeight(), "group" === control.type ? (childs = control.getActiveAndVisibleSubquestions(), childrenHeight = _.reduce(childs, function(memo, child) {
                return memo + child.$elem.outerHeight(!0)
            }, 0), null != control.connect ? childs.length > 0 ? topPoint = childs[0].position.next : (topOffset = 20, topPoint = control.position.item - fieldHeight / 2 + windowHeight / 2 + topOffset) : topPoint = control.position.next, bottomOffset = 100, bottomPoint = control.position.item + fieldHeight + childrenHeight - bottomOffset) : (null != control.parent ? (topOffset = -117, bottomOffset = 80) : (topOffset = 20, bottomOffset = 30), topPoint = control.position.item - fieldHeight / 2 + windowHeight / 2 + topOffset, bottomPoint = control.position.item + fieldHeight / 2 - bottomOffset), {
                topPoint: topPoint,
                bottomPoint: bottomPoint
            }
        }, Form.prototype.setScrollPoints = function() {
            var _this = this;
            this.scrollPoints.reset(), _.each(this.controls, function(control) {
                var bottomPoint, delayCallbackId, headerToUse, timeToAct, topPoint, _ref;
                return !(!control.isActive || !control.isVisible) && (headerToUse = null != control.parent ? _this.subheader : _this.header, (null == control.parent || control.parent.connect !== control) && (_ref = _this.calculatePoints(control), topPoint = _ref.topPoint, bottomPoint = _ref.bottomPoint, topPoint > bottomPoint ? void 0 : (timeToAct = 150, delayCallbackId = null, _this.scrollPoints.add({
                    y: topPoint,
                    callback: function(direction) {
                        clearTimeout(delayCallbackId), delayCallbackId = _.delay(function(direction) {
                            if ("down" === direction) {
                                if (_this.updateHeaderModel(headerToUse, control), headerToUse.show(), "group" === control.type) return control.$elem.addClass("fadeout"), _this.header.$el.trigger("thumbnail-show")
                            } else if (headerToUse.hide(), "group" === control.type) return control.$elem.removeClass("fadeout")
                        }, timeToAct, direction)
                    }
                }), _this.scrollPoints.add({
                    y: bottomPoint,
                    callback: function(direction) {
                        return clearTimeout(delayCallbackId), delayCallbackId = _.delay(function(direction) {
                            if ("down" === direction) {
                                if (headerToUse === _this.header && headerToUse.$el.trigger("thumbnail-hide"), headerToUse.hide(), "group" === control.type) return control.$elem.removeClass("fadeout")
                            } else if (_this.updateHeaderModel(headerToUse, control), headerToUse.show(), "group" === control.type) return control.$elem.addClass("fadeout")
                        }, timeToAct, direction)
                    }
                }))))
            })
        }, Form.prototype.extend = function() {
            var self;
            return self = this, $(window).scrollTop(0), this.$body.on("mouseup mousedown mouseleave", ".focus .button,#fixed-footer .button,#unfixed-footer .button,.screen .button,.footer-confirm .button", function(e) {
                return "mousedown" === e.type ? $(this).addClass("active") : $(this).removeClass("active")
            }), App.KeyboardTooltips(), $("#private").each(function() {
                var $quickyPreview;
                return $quickyPreview = $(this), self === top ? $quickyPreview.addClass("top") : $quickyPreview.addClass("embed"), $quickyPreview.on("click", "img", function() {
                    return $(this).parent().fadeOut(), self.$body.removeClass("private")
                })
            })
        }, Form
    }(App.Logic), namespace("App", function(exports) {
        return exports.Form = Form
    })
}.call(this),
    function() {
        var Scroll;
        Scroll = function() {
            function Scroll($element, settings) {
                this.settings = $.extend({}, defaults, settings), this.footer = settings.footer || !1, this.$element = $element, this.$items = $element.children(".active"), this.numQuestions = this.$items.length, this.current = -1, this.positions = [], this.$items.filter(":lt(3)").addClass("visible")
            }
            var defaults, getCurrent, shouldPreventFocus, _scroll;
            return defaults = {
                scrollSpeed: 225,
                animateEase: "easeOutCubic",
                delayAutoScroll: 700,
                delayAutoScrollFast: 100,
                onFocus: function() {},
                onBlur: function() {},
                onReachPrev: function() {},
                onReachNext: function() {},
                onScrollStart: function() {},
                onScrollStop: function() {}
            }, Scroll.prototype.getScrollSpeed = function() {
                return this.settings.scrollSpeed
            }, Scroll.prototype.refresh = function(hasDomChanges) {
                var offsetFooter, pos, self, windowHeight;
                if (null == hasDomChanges && (hasDomChanges = !1), self = this, hasDomChanges && (this.$items = this.$element.children(".active"), this.numQuestions = this.$items.length), pos = 0, offsetFooter = 0, this.footer && (offsetFooter = this.footer.get("blurHeight") / 2), windowHeight = $(window).height(), this.$items.each(function(index, item) {
                        var connected_height, control, itemHeight, position, positionTop, scrollPointA, scrollPointItem;
                        return control = $(item).data("control"), positionTop = pos, itemHeight = $(item).outerHeight(), pos += itemHeight, connected_height = "group" === control.type && null != control.connect ? itemHeight + control.connect.$elem.outerHeight() : itemHeight, scrollPointItem = positionTop + itemHeight / 2 + offsetFooter, scrollPointA = null != control.parent ? Math.min(positionTop + connected_height / 2 + offsetFooter, positionTop + (windowHeight + offsetFooter) / 2 - typeform.Form.header.getProperty("heights", "group") - 40) : Math.min(positionTop + connected_height / 2 + offsetFooter, positionTop + (windowHeight + offsetFooter) / 2), position = {
                            prev: positionTop + offsetFooter,
                            item: scrollPointItem,
                            next: positionTop + itemHeight + offsetFooter,
                            a: scrollPointA
                        }, control && (control.position = position), self.positions[index] = position
                    }), this.footer) return self.positions[this.numQuestions] = {
                    prev: self.positions[this.numQuestions - 1].next,
                    item: self.positions[this.numQuestions - 1].next + 120,
                    next: $(document).height()
                }
            }, Scroll.prototype.start = function(animate) {
                var preventFocus = shouldPreventFocus();
                return this.focus(0, !1, preventFocus), animate ? this.scrollTo(0) : $(window).scrollTop(this.positions[0].a)
            }, Scroll.prototype.getCurrent = function() {
                return this.current
            }, Scroll.prototype.getCurrentControl = function() {
                var currentControl;
                return currentControl = this.$items.eq(this.current).data("control"), currentControl && "group" === currentControl.type && null != currentControl.connect && (currentControl = currentControl.connect), currentControl
            }, Scroll.prototype.isAtFirst = function() {
                return 0 === this.current
            }, Scroll.prototype.isAtLastField = function() {
                return this.current === this.numQuestions - 1
            }, Scroll.prototype.isAtFooter = function() {
                return this.current === this.numQuestions
            }, Scroll.prototype.scrollToPos = function(top, callback, animate) {
                return null == animate && (animate = !0), animate ? $("html,body").stop(!0, !0).animate({
                    scrollTop: top
                }, this.settings.scrollSpeed, this.settings.animateEase, function() {
                    if (callback) return callback()
                }) : $("html,body").scrollTop(top)
            }, Scroll.prototype.scrollTo = function(index, delay, animate, inReview) {
                var control, self, time;
                return null == delay && (delay = !1), null == animate && (animate = !0), null == inReview && (inReview = !1), self = this, time = 0, delay && (time = this.settings.delayAutoScroll), clearTimeout(this.timeoutScroll), control = this.$items.eq(index).data("control"), null == control || null == control.connect || inReview || null != control.parent && control.parent.connect === control && (this.current < index ? index++ : index--), this.timeoutScroll = setTimeout(function() {
                    return index === self.numQuestions ? self.scrollToFooter() : self.scrollToPos(self.positions[index].a, function() {
                        return self.focus(index)
                    }, animate)
                }, time)
            }, Scroll.prototype.scrollToPrev = function() {
                return this.scrollTo(this.current - 1)
            }, Scroll.prototype.scrollToNext = function(delay) {
                var self, time;
                return null == delay && (delay = !1), self = this, time = 0, delay && (time = this.settings.delayAutoScroll), clearTimeout(this.timeoutScroll), this.timeoutScroll = setTimeout(function() {
                    return self.current !== self.numQuestions - 1 ? self.scrollTo(self.current + 1) : self.footer ? self.scrollToFooter() : void 0
                }, time)
            }, Scroll.prototype.scrollToFooter = function(delay) {
                var time, _this = this;
                return null == delay && (delay = !1), time = 0, delay && (time = this.settings.delayAutoScroll), clearTimeout(this.timeoutScroll), this.timeoutScroll = setTimeout(function() {
                    return _this.scrollToPos(_this.positions[_this.numQuestions].item)
                }, time)
            }, Scroll.prototype.focus = function(index, forceFocus, preventFocus) {
                return (index !== this.current || forceFocus) && (this.current < this.numQuestions && (this.$items.eq(this.current).removeClass("focus"), this.settings.onBlur(this.$items.eq(this.current))), this.current = index, preventFocus || this.settings.onFocus(this.$items.eq(this.current)), this.current < this.numQuestions ? (this.$items.eq(this.current).addClass("focus"), this.footer && this.footer.unbindEvents()) : this.footer && this.footer.bindEvents(), this.$items.eq(this.current - 3).removeClass("visible"), this.$items.eq(this.current - 2).addClass("visible"), this.$items.eq(this.current - 1).addClass("visible"), this.$items.eq(this.current).addClass("visible"), this.$items.eq(this.current + 1).addClass("visible"), this.$items.eq(this.current + 2).addClass("visible"), this.current > 0 && this.$items.eq(this.current + 3).removeClass("visible")), this
            }, Scroll.prototype.bindEvents = function() {
                var self;
                return self = this, $(window).on("scroll.form", this, _scroll).on("scrollstart.form", this, function(e) {
                    return self = e.data, self.settings.onScrollStart()
                }).on("scrollstop.form", this, function(e) {
                    return self = e.data, self.settings.onScrollStop(self.$items.eq(self.current))
                }), $("body").on("click.form", ".scroll-overlay", this, function(e) {
                    return self = e.data, self.scrollToPrev()
                }), this.$element.on("click.form", "> li:not(.focus)", function() {
                    var control;
                    if (control = $(this).data("control"), !control.$elem.hasClass("focus")) return self.scrollToPos(control.position.a)
                })
            }, Scroll.prototype.unbindEvents = function() {
                return $(window).off(".form"), this.$element.off(".form")
            }, getCurrent = function(positions, y, current) {
                return positions[current].next <= y ? current = getCurrent(positions, y, current + 1) : positions[current].prev > y && current > 0 && (current = getCurrent(positions, y, current - 1)), current
            }, shouldPreventFocus = function() {
                return Globals.isEmbed && "default" === Globals.browser && Globals.embedOptions.embedIsWidget && !typeform.hasIntro
            }, _scroll = function(e) {
                var self;
                if (self = e.data, self.focus(getCurrent(self.positions, window.pageYOffset, self.current)), self.footer) return self.footer.updatePosition(window.pageYOffset)
            }, Scroll
        }(), namespace("App", function(exports) {
            return exports.Scroll = Scroll
        })
    }.call(this);
var Confirm, __bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments)
    }
};
Confirm = function() {
    function Confirm(scroll) {
        this.scroll = scroll, this.check = __bind(this.check, this), this.$body = $("body"), this.$footerConfirm = $(".footer-confirm").find(".button"), $("#typeform").on("click", ".footer-confirm .button,.focus .confirm .button.nav", function() {
            return form.next()
        })
    }
    return Confirm.prototype.scrollUpThreshold = 160, Confirm.prototype.scrollUpOffset = 70, Confirm.prototype.scroll = null, Confirm.prototype.check = function(isFilled, $confirm, $element, id) {
        var currentControl, isAtLastField, _this = this;
        return null == id && (id = null), (null == id || !(currentControl = this.scroll.getCurrentControl()) || currentControl.id === id) && (isAtLastField = this.scroll.isAtLastField(), this.isRankingField($element) ? void this.show($confirm) : isFilled || isAtLastField ? (this.setSkipState(!isFilled), this.scrollUp($element.offset().top, $(window).height(), window.pageYOffset, function() {
            return _this.show($confirm)
        })) : this.hide($confirm))
    }, Confirm.prototype.isRankingField = function($element) {
        var fieldModel;
        return (fieldModel = $element.data("model")) && "ranking" === fieldModel.type
    }, Confirm.prototype.setSkipState = function(isSkipState) {
        isSkipState ? this.$body.addClass("confirm-skip") : this.$body.removeClass("confirm-skip")
    }, Confirm.prototype.scrollUp = function(offsetTop, windowHeight, pageYOffset, callback) {
        this.scrollUpThreshold > windowHeight + pageYOffset - offsetTop ? (this.scroll.scrollToPos(offsetTop - windowHeight + this.scrollUpThreshold + this.scrollUpOffset), setTimeout(callback, this.scroll.getScrollSpeed())) : callback()
    }, Confirm.prototype.show = function($confirm) {
        var self;
        return this.$confirm = $confirm, self = this, this.ready = !0, this.checkPosition(), this.$confirm.find(".button").hasClass("red") ? this.$footerConfirm.addClass("red") : this.$footerConfirm.removeClass("red"), $(window).on("scroll.confirm", function() {
            return self.checkPosition()
        })
    }, Confirm.prototype.hide = function() {
        return $("body").removeClass("confirm-nav"), $(window).off(".confirm"), this.ready = !1
    }, Confirm.prototype.startLoading = function() {
        var opts;
        this.$spin = $("<div id='spin'></div>"), this.$buttonWrapper = this.$confirm.children(".button-wrapper"), this.$buttonWrapper.addClass("loading").append(this.$spin), opts = {
            lines: 12,
            length: 2.3,
            width: 2.5,
            radius: 8,
            color: this.$buttonWrapper.css("color"),
            speed: 2.1,
            trail: 60,
            shadow: !1,
            hwaccel: !1
        }, new Spinner(opts).spin(this.$spin[0])
    }, Confirm.prototype.stopLoading = function() {
        this.$spin.remove(), this.$buttonWrapper.removeClass("loading")
    }, Confirm.prototype.checkPosition = function() {
        if (this.ready) return this.$confirm.offset().top - window.pageYOffset - $(window).height() > -120 ? $("body").addClass("confirm-nav confirm-footer").removeClass("confirm-inline") : $("body").addClass("confirm-nav confirm-inline").removeClass("confirm-footer")
    }, Confirm
}(), namespace("App", function(exports) {
    return exports.Confirm = Confirm
});
var Error;
Error = function() {
    function Error(Footer, settings) {
        this.Footer = Footer, this.settings = $.extend({}, defaults, settings), this.$footerMessage = $(".footer-message").find("span")
    }
    var defaults;
    return defaults = {
        onFinish: function() {},
        speed: 200
    }, Error.prototype.check = function($elem) {
        return $elem.hasClass("error") ? (this.hasError = !0, this.show($elem, $elem.find(".message").children("span").html(), !1)) : (this.hasError = !1, $(window).off(".error .confirm"), $("body").removeClass("footer-error confirm-nav confirm-footer"))
    }, Error.prototype.show = function($elem, str, repeatEffect) {
        var $message, self;
        return null == repeatEffect && (repeatEffect = !0), this.hasError = !0, self = this, $message = $elem.find(".message"), $message.children("span").html(str), this.$footerMessage.html(str), $elem.hasClass("error") && repeatEffect ? ($message.selectEffect(0), this.$footerMessage.selectEffect(0)) : ($elem.addClass("error"), $message.slideDown(self.settings.speed, function() {
            return self.settings.onFinish()
        }).css({
            display: "inline-block"
        }), this.checkPosition($message)), $(window).on("scroll.error", function() {
            return self.checkPosition($message)
        })
    }, Error.prototype.hide = function($elem) {
        var self;
        return this.hasError = !1, self = this, $("body").removeClass("footer-error"), $elem.hasClass("error") && $elem.find(".message").stop(!0, !0).slideUp(self.settings.speed, function() {
            return $elem.removeClass("error"), self.settings.onFinish()
        }), $(window).off(".error")
    }, Error.prototype.checkPosition = function($message) {
        if (this.hasError) return $message.offset().top - window.pageYOffset - $(window).height() > -90 ? $("body").addClass("footer-error") : $("body").removeClass("footer-error")
    }, Error
}(), namespace("App", function(exports) {
    return exports.Error = Error
});
var Header, SubHeader, _ref, _ref1, __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
        function ctor() {
            this.constructor = child
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
    };
Header = function(_super) {
    function Header() {
        return _ref = Header.__super__.constructor.apply(this, arguments)
    }
    return __extends(Header, _super), Header.prototype.setEvents = function() {
        var click_event, _this = this;
        Header.__super__.setEvents.call(this), click_event = "touch" === Globals.browser ? "touchend" : "click", this.$el.on(click_event, function(e) {
            if (_this.isOpenable() && "full" !== _this.model.attributes.state) return _this.model.set("state", "full")
        }), $(document).on("keyup", function(e) {
            var key;
            if ("full" === _this.model.attributes.state && (key = document.all ? e.keyCode : e.which, App.Keyboard.isEsc(key))) return _this.model.set("state", "default")
        })
    }, Header
}(App.Header), SubHeader = function(_super) {
    function SubHeader() {
        return _ref1 = SubHeader.__super__.constructor.apply(this, arguments)
    }
    return __extends(SubHeader, _super), SubHeader
}(App.SubHeader), namespace("App.default", function(exports) {
    return exports.Header = Header, exports.SubHeader = SubHeader
});
var Footer, START_SCROLLING_WITHIN, _ref, __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
        function ctor() {
            this.constructor = child
        }
        for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
        return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
    };
START_SCROLLING_WITHIN = 80, Footer = function(_super) {
    function Footer() {
        return this.review = __bind(this.review, this), this.submit = __bind(this.submit, this), _ref = Footer.__super__.constructor.apply(this, arguments)
    }
    return __extends(Footer, _super), Footer.prototype.initialize = function() {
        return this.$document = $(document), this.$footer = this.$elem, this.$reviewButton = this.$footer.find(".review .button"), this.$footer.css({
            height: 0
        }), this
    }, Footer.prototype.resize = function(windowHeight) {
        return this.windowHeight = windowHeight, this.settings.maxHeight = windowHeight / 2, this
    }, Footer.prototype.getScrollableLength = function() {
        return START_SCROLLING_WITHIN
    }, Footer.prototype.get = function(property) {
        return this.settings[property]
    }, Footer.prototype.show = function() {
        return this.$footer.css({
            height: this.settings.maxHeight
        })
    }, Footer.prototype.hide = function() {
        return this.$footer.css({
            height: this.settings.blurHeight
        }), this.$footer.removeClass("review")
    }, Footer.prototype.open = function() {
        return this.show(), this.bindEvents()
    }, Footer.prototype.close = function() {
        return this.hide(), this.unbindEvents()
    }, Footer.prototype.updatePosition = function(windowPageYOffset) {
        var distanceFromBottom, fixedFooterHeight;
        return distanceFromBottom = this.$document.height() - (windowPageYOffset + this.windowHeight), fixedFooterHeight = $("#fixed-footer").height(), this.$footer.css({
            height: (1 - distanceFromBottom / fixedFooterHeight) * this.settings.maxHeight
        })
    }, Footer.prototype.submit = function() {
        return Footer.__super__.submit.apply(this, arguments)
    }, Footer.prototype.review = function() {
        return Footer.__super__.review.apply(this, arguments)
    }, Footer.prototype.getNext = function() {
        return Footer.__super__.getNext.apply(this, arguments)
    }, Footer.prototype.showMessage = function(str) {
        return $("body").addClass("footer-error footer-submit"), this.$footerMessage.find(".default-message").html(str)
    }, Footer.prototype.showMessageWarning = function(str) {
        return $("body").addClass("footer-submit footer-warning"), this.$footerMessage.find(".default-message").html(str)
    }, Footer
}(App.Submit), namespace("App", function(exports) {
    return exports.Footer = Footer
});
var hasUpdate = !1,
    asterisk = '<span class="asterisk">*</span>',
    _updateControl = function(evt, obj) {
        var control, $current, $description, $attachmentWrapper, $attachment, attachmentObject, attachment, $window = $(window),
            variableMap = window.top.form_variables;
        if ("intro" === obj.type) obj.values.text && (obj.values.text = App.TagEncoder.encode(obj.values.text, variableMap)), obj.values.description && (obj.values.description = App.TagEncoder.encode(obj.values.description, variableMap)), evt.data.Intro.update(obj.values);
        else if ("outro" === obj.type) obj.values.text && (obj.values.text = App.TagEncoder.encode(obj.values.text, variableMap)), obj.values.button && (obj.values.button = App.TagEncoder.encode(obj.values.button, variableMap)), evt.data.outrosCollection.get()[0].update(obj.values);
        else {
            $current = $("." + obj.type), control = $current.data("control"), obj.values.required && (obj.values.question += asterisk), obj.values.question && (obj.values.question = App.TagEncoder.encode(obj.values.question, variableMap)), obj.values.description && (obj.values.description = App.TagEncoder.encode(obj.values.description, variableMap)), obj.values.text && (obj.values.text = App.TagEncoder.encode(obj.values.text, variableMap)), control.update(obj.values), $description = $current.find(".description");
            var descriptionEnabled = obj.values.descriptionEnabled;
            descriptionEnabled !== undefined && null !== descriptionEnabled && (!0 === descriptionEnabled ? ($description.show(), "" === obj.values.description ? $description.html('<span class="secondaryColor placeholder">' + App.Texts["placeholder-description"] + "</span>") : $description.html(obj.values.description)) : $description.hide()), $attachmentWrapper = $current.find(".attachment-wrapper"), $attachment = $attachmentWrapper.children(".attachment"), $attachment.length || ($attachment = $('<div class="attachment"></div>'), $attachmentWrapper.prepend($attachment)), attachmentObject = obj.values.attachment, attachmentObject && (attachmentObject.height || attachmentObject.hasOwnProperty("video_id") ? ($current.addClass("attachment"), $attachment.data("attachment", attachmentObject), "" !== attachmentObject.image && $attachment.html('<img src="" width="0" height="0"/>'), attachment = new App.Attachment($attachment, {
                $question: control.$elem.find(".question"),
                $description: control.$elem.find(".description"),
                attachLimit: control.attachLimit["default"],
                questionType: control.type,
                useLazyLoad: !0,
                browser: "default",
                useFreezeFrame: !1
            }), attachment.precalculate(), attachment.resize($window.height(), control.$elem.find(".content").width()), attachment.load()) : ($current.removeClass("attachment"), $attachment.remove()), hasUpdate = !0, _.defer(function() {
                typeform.Form.scroll.refresh(!1), $window.scrollTop(typeform.Form.scroll.positions[0].a)
            })), $(".header > span").html(obj.values.question), hasUpdate || setTimeout(function() {
                form.center(Math.min($current.height() / 2, $window.height() / 2)), hasUpdate = !0
            }, 50)
        }
    },
    lessVars = {},
    _updateStyle = function(evt, obj) {
        var backgroundImage, fontName, $typeform = $(this);
        obj["primary-color"] && _.extend(lessVars, {
            "@primary-color": obj["primary-color"]
        }), obj["secondary-color"] && _.extend(lessVars, {
            "@secondary-color": obj["secondary-color"]
        }), obj["background-color"] && _.extend(lessVars, {
            "@background-color": obj["background-color"]
        }), backgroundImage = obj["background-image"] ? "url(" + obj["background-image"] + ")" : "", _.extend(lessVars, {
            "@background-image": backgroundImage
        }), (obj["background-brightness"] || 0 == obj["background-brightness"]) && _.extend(lessVars, {
            "@background-brightness": "" + obj["background-brightness"]
        }), obj["button-color"] && _.extend(lessVars, {
            "@button-color": obj["button-color"]
        }), obj["font-family"] && _.extend(lessVars, {
            "@font-family": obj["font-family"]
        }), less.modifyVars(lessVars), obj["background-repeat"] && $("body").removeClass("repeat fullscreen no-repeat").addClass(obj["background-repeat"]), obj["font-css"] ? (fontName = obj["font-css"].match(/=+?(.*)[&;].?/)[1], typeform.updateFontClass(fontName), $typeform.trigger("loadingFont"), WebFont.load({
            google: {
                families: [fontName]
            },
            active: function() {
                $typeform.trigger("appliedFont")
            },
            inactive: function() {
                $typeform.trigger("appliedFont")
            }
        })) : obj["font-family"] && (typeform.updateFontClass(obj["font-family"].split(",")[0]), $typeform.trigger("loadingFont"), $typeform.trigger("appliedFont")), App.Utils.setContainerColor(lessVars["@background-color"] + "", lessVars["@secondary-color"] + ""), $typeform.trigger("colour-update", obj)
    },
    TagEncoder;
TagEncoder = function() {
        function TagEncoder() {}
        return TagEncoder.encode = function(text, valueMap) {
            var regex_pattern, tags;
            return regex_pattern = /\{\{(.+?)\}\}/g, tags = text.match(regex_pattern) || [], tags.forEach(function(tag) {
                var id, node, regEx, replacement, tag_content;
                return id = tag.substring(2, tag.length - 2), replacement = _.findWhere(valueMap, {
                        val: id
                    }), tag_content = replacement ? replacement.name.replace(regex_pattern, "{{ ... }}") : "Unknown", node = '<var class="tag">' + tag_content + "</var>",
                    regEx = new RegExp("(" + tag + ")(?!([^<]+)?>)", "g"), text = text.replace(regEx, node), text = text.replace(tag, tag_content)
            }), text
        }, TagEncoder
    }(), namespace("App", function(exports) {
        return exports.TagEncoder = TagEncoder
    }),
    function() {
        var options = {
                interval: 75,
                distance: 10,
                times: 3
            },
            ShakeAnimation = {
                shake: function($div, callback) {
                    $div.stop(!0, !0);
                    var i = 0;
                    for (i; i < options.times + 1; i++) {
                        moveLeft($div, i % 2 == 0 ? options.distance : -1 * options.distance)
                    }
                    moveLeft($div, 0, callback)
                }
            },
            moveLeft = function($div, left, callback) {
                $div.animate({
                    left: left
                }, {
                    complete: callback,
                    duration: options.interval
                })
            };
        namespace("App", function(exports) {
            return exports.ShakeAnimation = ShakeAnimation
        })
    }(),
    function($) {
        "use strict";

        function guid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = 16 * Math.random() | 0;
                return ("x" == c ? r : 3 & r | 8).toString(16)
            })
        }
        var TUBE_PLAYER_CLASS = "jquery-youtube-tubeplayer",
            OPTS = "opts.tubeplayer",
            TubePlayer = {};
        TubePlayer.ytplayers = {}, TubePlayer.inits = [], TubePlayer.iframeScriptInited = !1, TubePlayer.inited = !1, $.tubeplayer = {}, $.tubeplayer.TubePlayer = TubePlayer, $.tubeplayer.events = {}, $.tubeplayer.defaults = {
            afterReady: function($player) {},
            stateChange: function(player) {
                var _ret = this.onPlayer;
                return function(state) {
                    switch ("object" == typeof state && (state = state.data), state) {
                        case -1:
                            return _ret.unstarted[player]();
                        case 0:
                            return _ret.ended[player]();
                        case 1:
                            return _ret.playing[player]();
                        case 2:
                            return _ret.paused[player]();
                        case 3:
                            return _ret.buffering[player]();
                        case 5:
                            return _ret.cued[player]();
                        default:
                            return null
                    }
                }
            },
            onError: function(player) {
                var _ret = this.onErr;
                return function(errorCode) {
                    switch ("object" == typeof errorCode && (errorCode = errorCode.data), errorCode) {
                        case 2:
                            return _ret.invalidParameter[player]();
                        case 100:
                            return _ret.notFound[player]();
                        case 101:
                        case 150:
                            return _ret.notEmbeddable[player]();
                        default:
                            return null
                    }
                }
            },
            qualityChange: function(player) {
                var _this = this;
                return function(suggested) {
                    return "object" == typeof suggested && (suggested = suggested.data), _this.onQualityChange[player](suggested)
                }
            },
            onQualityChange: {},
            onPlayer: {
                unstarted: {},
                ended: {},
                playing: {},
                paused: {},
                buffering: {},
                cued: {}
            },
            onErr: {
                notFound: {},
                notEmbeddable: {},
                invalidParameter: {}
            }
        };
        var defaults = {
            width: 425,
            height: 355,
            allowFullScreen: "true",
            initialVideo: "DkoeNLuMbcI",
            start: 0,
            preferredQuality: "default",
            showControls: !0,
            showRelated: !1,
            annotations: !0,
            autoPlay: !1,
            autoHide: !0,
            loop: 0,
            theme: "dark",
            color: "red",
            showinfo: !1,
            modestbranding: !0,
            protocol: "http",
            wmode: "transparent",
            swfobjectURL: "ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",
            loadSWFObject: !0,
            allowScriptAccess: "always",
            playerID: "tubeplayer-player-container",
            iframed: !0,
            onPlay: function(id) {},
            onPause: function() {},
            onStop: function() {},
            onSeek: function(time) {},
            onMute: function() {},
            onUnMute: function() {},
            onPlayerUnstarted: function() {},
            onPlayerEnded: function() {},
            onPlayerPlaying: function() {},
            onPlayerPaused: function() {},
            onPlayerBuffering: function() {},
            onPlayerCued: function() {},
            onQualityChange: function() {},
            onErrorNotFound: function() {},
            onErrorNotEmbeddable: function() {},
            onErrorInvalidParameter: function() {}
        };
        $.fn.tubeplayer = function(input, xtra) {
            var $this = $(this),
                type = typeof input;
            return 0 === arguments.length || "object" === type ? $this.each(function() {
                TubePlayer.init($(this), input)
            }) : "string" === type ? $this.triggerHandler(input + ".tubeplayer", xtra || null) : void 0
        };
        var buildFN = function(fn, after) {
            return function(evt, param) {
                var p = TubePlayer.getPkg(evt);
                if (p.ytplayer) {
                    var ret = fn(evt, param, p);
                    return void 0 === ret && (ret = p.$player), ret
                }
                return p.$player
            }
        };
        $.tubeplayer.getPlayers = function() {
            return TubePlayer.ytplayers
        }, TubePlayer.init = function($player, opts) {
            if ($player.hasClass(TUBE_PLAYER_CLASS)) return $player;
            var o = $.extend({}, defaults, opts);
            o.playerID += "-" + guid(), $player.addClass(TUBE_PLAYER_CLASS).data(OPTS, o);
            for (var event in PLAYER) $player.bind(event + ".tubeplayer", $player, PLAYER[event]);
            return TubePlayer.initDefaults($.tubeplayer.defaults, o), $("<div></div>").attr("id", o.playerID).appendTo($player), TubePlayer.initPlayer($player, o), $player
        }, TubePlayer.getPkg = function(evt) {
            var $player = evt.data,
                opts = $player.data(OPTS);
            return {
                $player: $player,
                opts: opts,
                ytplayer: TubePlayer.ytplayers[opts.playerID]
            }
        }, TubePlayer.iframeReady = function(o) {
            return TubePlayer.inits.push(function() {
                new YT.Player(o.playerID, {
                    videoId: o.initialVideo,
                    width: o.width,
                    height: o.height,
                    playerVars: {
                        autoplay: o.autoPlay ? 1 : 0,
                        autohide: o.autoHide ? 1 : 0,
                        controls: o.showControls ? 1 : 0,
                        loop: o.loop ? 1 : 0,
                        playlist: o.loop ? o.initialVideo : "",
                        rel: o.showRelated ? 1 : 0,
                        fs: o.allowFullScreen ? 1 : 0,
                        wmode: o.wmode,
                        showinfo: o.showinfo ? 1 : 0,
                        modestbranding: o.modestbranding ? 1 : 0,
                        iv_load_policy: o.annotations ? 1 : 3,
                        start: o.start,
                        theme: o.theme,
                        color: o.color,
                        html5: 1,
                        vq: o.preferredQuality
                    },
                    events: {
                        onReady: function(evt) {
                            TubePlayer.ytplayers[o.playerID] = evt.target;
                            var $player = $(evt.target).parents("." + TUBE_PLAYER_CLASS);
                            $.tubeplayer.defaults.afterReady($player)
                        },
                        onPlaybackQualityChange: $.tubeplayer.defaults.qualityChange(o.playerID),
                        onStateChange: $.tubeplayer.defaults.stateChange(o.playerID),
                        onError: $.tubeplayer.defaults.onError(o.playerID)
                    }
                })
            }), TubePlayer.inits.length >= 1 && !TubePlayer.inited ? function() {
                for (var i = 0; i < TubePlayer.inits.length; i++) TubePlayer.inits[i]();
                TubePlayer.inited = !0
            } : (TubePlayer.inited && TubePlayer.inits.pop()(), window.onYouTubePlayerAPIReady)
        }, TubePlayer.supportsHTML5 = function() {
            return !!document.createElement("video").canPlayType
        }, TubePlayer.initDefaults = function(d, o) {
            var ID = o.playerID,
                dp = d.onPlayer;
            dp.unstarted[ID] = o.onPlayerUnstarted, dp.ended[ID] = o.onPlayerEnded, dp.playing[ID] = o.onPlayerPlaying, dp.paused[ID] = o.onPlayerPaused, dp.buffering[ID] = o.onPlayerBuffering, dp.cued[ID] = o.onPlayerCued, d.onQualityChange[ID] = o.onQualityChange;
            var de = d.onErr;
            de.notFound[ID] = o.onErrorNotFound, de.notEmbeddable[ID] = o.onErrorNotEmbeddable, de.invalidParameter[ID] = o.onErrorInvalidParameter
        }, TubePlayer.initPlayer = function($player, o) {
            o.iframed && TubePlayer.supportsHTML5() ? TubePlayer.initIframePlayer($player, o) : TubePlayer.initFlashPlayer($player, o)
        }, TubePlayer.initIframePlayer = function($player, o) {
            if (!TubePlayer.iframeScriptInited) {
                var tag = document.createElement("script");
                tag.src = o.protocol + "://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag), TubePlayer.iframeScriptInited = !0
            }
            window.onYouTubePlayerAPIReady = TubePlayer.iframeReady(o)
        }, TubePlayer.initFlashPlayer = function($player, o) {
            o.loadSWFObject ? (o.swfobjectURL = o.swfobjectURL.replace("http://", ""), o.swfobjectURL = o.swfobjectURL.replace("https://", ""), o.swfobjectURL = o.protocol + "://" + o.swfobjectURL, $.getScript(o.swfobjectURL, TubePlayer.initFlashPlayerFN(o))) : TubePlayer.initFlashPlayerFN(o)()
        }, TubePlayer.initFlashPlayerFN = function(o) {
            return function() {
                var url = ["//www.youtube.com/v/"];
                url.push(o.initialVideo), url.push("?&enablejsapi=1&version=3"), url.push("&playerapiid=" + o.playerID), url.push("&rel= " + (o.showRelated ? 1 : 0)), url.push("&autoplay=" + (o.autoPlay ? 1 : 0)), url.push("&autohide=" + (o.autoHide ? 1 : 0)), url.push("&loop=" + (o.loop ? 1 : 0)), url.push("&playlist=" + (o.loop ? o.initialVideo : "")), url.push("&controls=" + (o.showControls ? 1 : 0)), url.push("&showinfo=" + (o.showinfo ? 1 : 0)), url.push("&modestbranding=" + (o.modestbranding ? 1 : 0)), url.push("&iv_load_policy=" + (o.annotations ? 1 : 3)), url.push("&start=" + o.start), url.push("&theme=" + o.theme), url.push("&color=" + o.color), url.push("&fs=" + (o.allowFullScreen ? 1 : 0)), swfobject.embedSWF(url.join(""), o.playerID, o.width, o.height, "8", null, null, {
                    allowScriptAccess: o.allowScriptAccess,
                    wmode: o.wmode,
                    allowFullScreen: o.allowFullScreen
                }, {
                    id: o.playerID
                }), window.onYouTubePlayerReady = function(playerId) {
                    var player = document.getElementById(playerId),
                        pid = playerId.replace(/-/g, ""),
                        d = $.tubeplayer.defaults;
                    $.tubeplayer.events[pid] = {
                        stateChange: d.stateChange(playerId),
                        error: d.onError(playerId),
                        qualityChange: d.qualityChange(playerId)
                    }, player.addEventListener("onStateChange", "$.tubeplayer.events." + pid + ".stateChange"), player.addEventListener("onError", "$.tubeplayer.events." + pid + ".error"), player.addEventListener("onPlaybackQualityChange", "$.tubeplayer.events." + pid + ".qualityChange"), TubePlayer.ytplayers[playerId] = player;
                    var $player = $(player).parents("." + TUBE_PLAYER_CLASS);
                    $.tubeplayer.defaults.afterReady($player)
                }
            }
        }, TubePlayer.getVideoIDFromURL = function(sURL) {
            sURL = sURL || "";
            var qryParamsStart = sURL.indexOf("?"),
                qryParams = sURL.substring(qryParamsStart, sURL.length),
                videoStart = qryParams.indexOf("v=");
            if (videoStart > -1) {
                var videoEnd = qryParams.indexOf("&", videoStart);
                return -1 === videoEnd && (videoEnd = qryParams.length), qryParams.substring(videoStart + "v=".length, videoEnd)
            }
            return ""
        };
        var PLAYER = {
            cue: buildFN(function(evt, param, p) {
                p.ytplayer.cueVideoById(param, p.opts.preferredQuality)
            }),
            play: buildFN(function(evt, param, p) {
                "object" == typeof param ? p.ytplayer.loadVideoById(param.id, param.time, p.opts.preferredQuality) : param ? p.ytplayer.loadVideoById(param, 0, p.opts.preferredQuality) : p.ytplayer.playVideo(), p.opts.onPlay(param)
            }),
            pause: buildFN(function(evt, param, p) {
                p.ytplayer.pauseVideo(), p.opts.onPause(p)
            }),
            stop: buildFN(function(evt, param, p) {
                p.ytplayer.stopVideo(), p.opts.onStop(p)
            }),
            seek: buildFN(function(evt, param, p) {
                p.ytplayer.seekTo(param, !0), p.opts.onSeek(param)
            }),
            mute: buildFN(function(evt, param, p) {
                p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume()), p.ytplayer.mute(), p.opts.onMute(p)
            }),
            unmute: buildFN(function(evt, param, p) {
                p.ytplayer.unMute(), p.ytplayer.setVolume(p.$player.attr("data-prev-mute-volume") || 50), p.opts.onUnMute()
            }),
            isMuted: buildFN(function(evt, param, p) {
                return p.ytplayer.isMuted()
            }),
            volume: buildFN(function(evt, param, p) {
                if (!param) return p.ytplayer.getVolume() || 0;
                p.ytplayer.setVolume(param), p.$player.attr("data-prev-mute-volume", p.ytplayer.getVolume())
            }),
            quality: buildFN(function(evt, param, p) {
                if (!param) return p.ytplayer.getPlaybackQuality();
                p.ytplayer.setPlaybackQuality(param)
            }),
            data: buildFN(function(evt, param, p) {
                var ret = {},
                    P = p.ytplayer;
                return ret.bytesLoaded = P.getVideoBytesLoaded(), ret.bytesTotal = P.getVideoBytesTotal(), ret.startBytes = P.getVideoStartBytes(), ret.state = P.getPlayerState(), ret.currentTime = P.getCurrentTime(), ret.duration = P.getDuration(), ret.videoURL = P.getVideoUrl(), ret.getVideoEmbedCode = P.getVideoEmbedCode(), ret.videoID = TubePlayer.getVideoIDFromURL(ret.videoURL), ret.availableQualityLevels = P.getAvailableQualityLevels(), ret
            }),
            videoId: buildFN(function(evt, param, p) {
                return TubePlayer.getVideoIDFromURL(p.ytplayer.getVideoUrl())
            }),
            size: buildFN(function(evt, param, p) {
                param.width && param.height && (p.ytplayer.setSize(param.width, param.height), $(p.ytplayer).css(param))
            }),
            destroy: buildFN(function(evt, param, p) {
                p.$player.removeClass(TUBE_PLAYER_CLASS).data(OPTS, null).unbind(".tubeplayer").html(""), delete TubePlayer.ytplayers[p.opts.playerID];
                var d = $.tubeplayer.defaults,
                    events = ["unstarted", "ended", "playing", "paused", "buffering", "cued"];
                for (var _event in events) delete d.onPlayer[events[_event]][p.opts.playerID];
                events = ["notFound", "notEmbeddable", "invalidParameter"];
                for (var _event in events) delete d.onErr[events[_event]][p.opts.playerID];
                return delete d.onQualityChange[p.opts.playerID], delete $.tubeplayer.events[p.opts.playerID], $(p.ytplayer).remove(), null
            }),
            player: buildFN(function(evt, param, p) {
                return p.ytplayer
            })
        }
    }(jQuery),
    function(factory) {
        "function" == typeof define && define.amd ? define(["jquery"], factory) : "object" == typeof exports ? module.exports = factory : factory(jQuery)
    }(function($) {
        function handler(event) {
            var orgEvent = event || window.event,
                args = slice.call(arguments, 1),
                delta = 0,
                deltaX = 0,
                deltaY = 0,
                absDelta = 0,
                offsetX = 0,
                offsetY = 0;
            if (event = $.event.fix(orgEvent), event.type = "mousewheel", "detail" in orgEvent && (deltaY = -1 * orgEvent.detail), "wheelDelta" in orgEvent && (deltaY = orgEvent.wheelDelta), "wheelDeltaY" in orgEvent && (deltaY = orgEvent.wheelDeltaY), "wheelDeltaX" in orgEvent && (deltaX = -1 * orgEvent.wheelDeltaX), "axis" in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaX = -1 * deltaY, deltaY = 0), delta = 0 === deltaY ? deltaX : deltaY, "deltaY" in orgEvent && (deltaY = -1 * orgEvent.deltaY, delta = deltaY), "deltaX" in orgEvent && (deltaX = orgEvent.deltaX, 0 === deltaY && (delta = -1 * deltaX)), 0 !== deltaY || 0 !== deltaX) {
                if (1 === orgEvent.deltaMode) {
                    var lineHeight = $.data(this, "mousewheel-line-height");
                    delta *= lineHeight, deltaY *= lineHeight, deltaX *= lineHeight
                } else if (2 === orgEvent.deltaMode) {
                    var pageHeight = $.data(this, "mousewheel-page-height");
                    delta *= pageHeight, deltaY *= pageHeight, deltaX *= pageHeight
                }
                if (absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX)), (!lowestDelta || absDelta < lowestDelta) && (lowestDelta = absDelta, shouldAdjustOldDeltas(orgEvent, absDelta) && (lowestDelta /= 40)), shouldAdjustOldDeltas(orgEvent, absDelta) && (delta /= 40, deltaX /= 40, deltaY /= 40), delta = Math[delta >= 1 ? "floor" : "ceil"](delta / lowestDelta), deltaX = Math[deltaX >= 1 ? "floor" : "ceil"](deltaX / lowestDelta), deltaY = Math[deltaY >= 1 ? "floor" : "ceil"](deltaY / lowestDelta), special.settings.normalizeOffset && this.getBoundingClientRect) {
                    var boundingRect = this.getBoundingClientRect();
                    offsetX = event.clientX - boundingRect.left, offsetY = event.clientY - boundingRect.top
                }
                return event.deltaX = deltaX, event.deltaY = deltaY, event.deltaFactor = lowestDelta, event.offsetX = offsetX, event.offsetY = offsetY, event.deltaMode = 0, args.unshift(event, delta, deltaX, deltaY), nullLowestDeltaTimeout && clearTimeout(nullLowestDeltaTimeout), nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200), ($.event.dispatch || $.event.handle).apply(this, args)
            }
        }

        function nullLowestDelta() {
            lowestDelta = null
        }

        function shouldAdjustOldDeltas(orgEvent, absDelta) {
            return special.settings.adjustOldDeltas && "mousewheel" === orgEvent.type && absDelta % 120 == 0
        }
        var nullLowestDeltaTimeout, lowestDelta, toFix = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            toBind = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            slice = Array.prototype.slice;
        if ($.event.fixHooks)
            for (var i = toFix.length; i;) $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        var special = $.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var i = toBind.length; i;) this.addEventListener(toBind[--i], handler, !1);
                else this.onmousewheel = handler;
                $.data(this, "mousewheel-line-height", special.getLineHeight(this)), $.data(this, "mousewheel-page-height", special.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var i = toBind.length; i;) this.removeEventListener(toBind[--i], handler, !1);
                else this.onmousewheel = null;
                $.removeData(this, "mousewheel-line-height"), $.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(elem) {
                var $elem = $(elem),
                    $parent = $elem["offsetParent" in $.fn ? "offsetParent" : "parent"]();
                return $parent.length || ($parent = $("body")), parseInt($parent.css("fontSize"), 10) || parseInt($elem.css("fontSize"), 10) || 16
            },
            getPageHeight: function(elem) {
                return $(elem).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        $.fn.extend({
            mousewheel: function(fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
            },
            unmousewheel: function(fn) {
                return this.unbind("mousewheel", fn)
            }
        })
    });
var KeyboardTooltips;
KeyboardTooltips = function() {
        var numClicks = 0,
            numClicksNav = 0;
        $tooltip = $("<div class='tooltip-key backgroundColor'><span class='t'>" + App.Texts.key + "</span> <span class='k'>A</span></span></div>"), $(".letter").closest("li").on("mouseenter.tooltip mouseleave.tooltip", function(e) {
            "mouseenter" == e.type ? ($letter = $(this).find(".letter"), $tooltip.find(".k").html($letter.children("span").html()), $letter.append($tooltip)) : $tooltip.detach()
        }), $(document).on("mouseenter.tooltipNav mouseleave.tooltipNav", ".button.general,.button.confirm", function(e) {
            $buttonToolTip = $(this).siblings(".tooltip"), "mouseenter" == e.type ? $buttonToolTip.addClass("show") : $buttonToolTip.removeClass("show")
        });
        var disableTooltips = function() {
                $(".letter").closest("li").off(".tooltip"), $tooltip.remove()
            },
            disableNavTooltips = function() {
                $(document).off(".tooltipNav"), $(".button.nav").siblings(".tooltip").remove()
            };
        $(document).on("mousedown", function(e) {
            $(e.target).hasClass("button") ? numClicksNav++ : numClicks++, numClicks > 1 && disableTooltips(), numClicksNav > 1 && disableNavTooltips()
        }), $(document).on("keyup", function(evt) {
            key = document.all ? evt.keyCode : evt.which, App.Keyboard.isEnter(key) ? disableNavTooltips() : "TEXTAREA" != evt.target.nodeName && "INPUT" != evt.target.nodeName && disableTooltips()
        })
    }, namespace("App", function(exports) {
        return exports.KeyboardTooltips = KeyboardTooltips
    }),
    function() {
        var special = jQuery.event.special,
            uid1 = "D" + +new Date,
            uid2 = "D" + (+new Date + 1);
        special.scrollstart = {
            setup: function() {
                var timer, handler = function(evt) {
                    var _self = this,
                        _args = arguments;
                    timer ? clearTimeout(timer) : (evt.type = "scrollstart", jQuery.event.dispatch.apply(_self, _args)), timer = setTimeout(function() {
                        timer = null
                    }, special.scrollstop.latency)
                };
                jQuery(this).bind("scroll", handler).data(uid1, handler)
            },
            teardown: function() {
                jQuery(this).unbind("scroll", jQuery(this).data(uid1))
            }
        }, special.scrollstop = {
            latency: 300,
            setup: function() {
                var timer, handler = function(evt) {
                    var _self = this,
                        _args = arguments;
                    timer && clearTimeout(timer), timer = setTimeout(function() {
                        timer = null, evt.type = "scrollstop", jQuery.event.dispatch.apply(_self, _args)
                    }, special.scrollstop.latency)
                };
                jQuery(this).bind("scroll", handler).data(uid2, handler)
            },
            teardown: function() {
                jQuery(this).unbind("scroll", jQuery(this).data(uid2))
            }
        }
    }(),
    function($) {
        "use strict";
        var Typeahead = function(element, options) {
            this.$element = $(element), this.options = $.extend({}, $.fn.typeahead.defaults, options), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.onProcess = this.options.onProcess || this.onProcess, this.onDropdownShow = this.options.onDropdownShow || this.onDropdownShow, this.onDropdownHide = this.options.onDropdownHide || this.onDropdownHide, this.onActive = this.options.onActive || this.onActive, this.source = this.options.source, this.$menu = $(this.options.menu), this.$menu.insertAfter(this.$element), this.mouseX = 0, this.mouseY = 0, this.isIe = /(msie|trident|edge)/i.test(navigator.userAgent), this.options.wrapper && this.$menu.wrap(this.options.wrapper), this.shown = !1, this.listen()
        };
        Typeahead.prototype = {
            constructor: Typeahead,
            select: function() {
                var val = this.$menu.find(".active").attr("data-value");
                return this.$element.val(this.updater(val)).change(), this
            },
            updater: function(item) {
                return item
            },
            onProcess: function() {},
            onDropdownShow: function() {},
            onDropdownHide: function() {},
            show: function() {
                $.extend({}, this.$element.position(), {
                    height: this.$element[0].offsetHeight
                });
                return this.$menu.show(), this.shown = !0, this.options.onDropdownShow(), this
            },
            hide: function() {
                return this.$menu.hide(), this.shown = !1, this.options.onDropdownHide(), this
            },
            lookup: function(event) {
                var items;
                return this.query = this.$element.val(), this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, items ? this.process(items) : this)
            },
            process: function(items) {
                var that = this;
                return items = $.grep(items, function(item) {
                    return that.matcher(item)
                }), items = this.sorter(items), this.onProcess(items.length), items.length ? this.render(items.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
            },
            matcher: function(item) {
                return ~item.toLowerCase().indexOf(this.query.toLowerCase())
            },
            sorter: function(items) {
                for (var item, beginswith = [], caseSensitive = [], caseInsensitive = []; item = items.shift();) item.toLowerCase().indexOf(this.query.toLowerCase()) ? ~item.indexOf(this.query) ? caseSensitive.push(item) : caseInsensitive.push(item) : beginswith.push(item);
                return beginswith.concat(caseSensitive, caseInsensitive)
            },
            highlighter: function(item) {
                var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                return item.replace(new RegExp("(" + query + ")", "ig"), function($1, match) {
                    return "<strong>" + match + "</strong>"
                })
            },
            render: function(items) {
                var that = this;
                return items = $(items).map(function(i, item) {
                    return i = $(that.options.item).attr("data-value", item), i.find("a").html(that.highlighter(item)), i[0]
                }), items.first().addClass("active"), this.$menu.html(items), this
            },
            onActive: function(elem) {
                elem.addClass("active")
            },
            next: function(event) {
                var active = this.$menu.find(".active").removeClass("active"),
                    next = active.next();
                next.length || (next = $(this.$menu.find("li")[0])), this.onActive(next)
            },
            prev: function(event) {
                var active = this.$menu.find(".active").removeClass("active"),
                    prev = active.prev();
                prev.length || (prev = this.$menu.find("li:last-child")), this.onActive(prev)
            },
            listen: function() {
                this.$element.on("focus", $.proxy(this.focus, this)).on("blur", $.proxy(this.blur, this)).on("keypress", $.proxy(this.keypress, this)).on("keyup", $.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", $.proxy(this.keydown, this)), this.$menu.on("click", $.proxy(this.click, this)).on("mouseenter", "li", $.proxy(this.mouseenter, this)).on("mouseleave", "li", $.proxy(this.mouseleave, this)).on("mousemove", "li", $.proxy(this.mousemove, this))
            },
            eventSupported: function(eventName) {
                var isSupported = eventName in this.$element;
                return isSupported || (this.$element.setAttribute(eventName, "return;"), isSupported = "function" == typeof this.$element[eventName]), isSupported
            },
            move: function(e) {
                if (this.shown) switch (e.keyCode) {
                    case 9:
                        break;
                    case 13:
                    case 27:
                        e.preventDefault();
                        break;
                    case 38:
                        e.preventDefault(), this.prev();
                        break;
                    case 40:
                        e.preventDefault(), this.next()
                }
            },
            keydown: function(e) {
                this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
            },
            keypress: function(e) {
                this.suppressKeyPressRepeat || this.move(e)
            },
            keyup: function(e) {
                switch (e.keyCode) {
                    case 38:
                    case 16:
                    case 17:
                    case 18:
                        break;
                    case 40:
                        if (this.shown) break;
                        return this.lookup();
                    case 9:
                        this.hide();
                        break;
                    case 13:
                        if (!this.shown) return;
                        this.select();
                        break;
                    case 27:
                        if (!this.shown) return;
                        this.hide();
                        break;
                    default:
                        this.lookup()
                }
                e.stopPropagation(), e.preventDefault()
            },
            focus: function(e) {
                this.focused = !0
            },
            blur: function(e) {
                this.focused = !1, !this.mousedover && this.shown && this.hide()
            },
            click: function(e) {
                e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus()
            },
            mouseenter: function(e) {
                (this.mouseX != e.pageX || this.mouseY != e.pageY || this.isIe) && (this.mousedover = !0, this.$menu.find(".active").removeClass("active"), $(e.currentTarget).addClass("active"))
            },
            mousemove: function(e) {
                this.mouseX = e.pageX, this.mouseY = e.pageY
            },
            mouseleave: function(e) {
                this.mousedover = !1, !this.focused && this.shown && this.hide()
            }
        };
        var old = $.fn.typeahead;
        $.fn.typeahead = function(option) {
            return this.each(function() {
                var $this = $(this),
                    data = $this.data("typeahead"),
                    options = "object" == typeof option && option;
                data || $this.data("typeahead", data = new Typeahead(this, options)), "string" == typeof option && data[option]()
            })
        }, $.fn.typeahead.defaults = {
            source: [],
            items: 8,
            menu: '<ul class="typeahead dropdown-menu"></ul>',
            item: '<li><a href="#"></a></li>',
            minLength: 1
        }, $.fn.typeahead.Constructor = Typeahead, $.fn.typeahead.noConflict = function() {
            return $.fn.typeahead = old, this
        }, $(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
            var $this = $(this);
            $this.data("typeahead") || $this.typeahead($this.data())
        })
    }(window.jQuery),
    function($, window, document) {
        "use strict";
        var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, TOUCHMOVE, UP, WHEEL, defaults, getBrowserScrollbarWidth;
        defaults = {
            paneClass: "pane",
            sliderClass: "slider",
            contentClass: "content",
            iOSNativeScrolling: !1,
            preventPageScrolling: !1,
            disableResize: !1,
            alwaysVisible: !1,
            flashDelay: 1500,
            sliderMinHeight: 20,
            sliderMaxHeight: null
        }, SCROLL = "scroll", MOUSEDOWN = "mousedown", MOUSEMOVE = "mousemove", MOUSEWHEEL = "mousewheel", MOUSEUP = "mouseup", RESIZE = "resize", DRAG = "drag", UP = "up", PANEDOWN = "panedown", DOMSCROLL = "DOMMouseScroll", DOWN = "down", WHEEL = "wheel", TOUCHMOVE = "touchmove", BROWSER_IS_IE7 = "Microsoft Internet Explorer" === window.navigator.appName && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject, BROWSER_SCROLLBAR_WIDTH = null, getBrowserScrollbarWidth = function() {
            var outer, outerStyle, scrollbarWidth;
            return outer = document.createElement("div"), outerStyle = outer.style, outerStyle.position = "absolute", outerStyle.width = "100px", outerStyle.height = "100px", outerStyle.overflow = SCROLL, outerStyle.top = "-9999px", document.body.appendChild(outer), scrollbarWidth = outer.offsetWidth - outer.clientWidth, document.body.removeChild(outer), scrollbarWidth
        }, NanoScroll = function() {
            function NanoScroll(el, options) {
                this.el = el, this.options = options, BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth()), this.$el = $(this.el), this.doc = $(document), this.win = $(window), this.$content = this.$el.children("." + options.contentClass), this.$content.attr("tabindex", 0), this.content = this.$content[0], this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
            }
            return NanoScroll.prototype.preventScrolling = function(e, direction) {
                if (this.isActive)
                    if (e.type === DOMSCROLL)(direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) && e.preventDefault();
                    else if (e.type === MOUSEWHEEL) {
                    if (!e.originalEvent || !e.originalEvent.wheelDelta) return;
                    (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) && e.preventDefault()
                }
            }, NanoScroll.prototype.nativeScrolling = function() {
                this.$content.css({
                    WebkitOverflowScrolling: "touch"
                }), this.iOSNativeScrolling = !0, this.isActive = !0
            }, NanoScroll.prototype.updateScrollValues = function() {
                var content;
                content = this.content, this.maxScrollTop = content.scrollHeight - content.clientHeight, this.contentScrollTop = content.scrollTop, this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
            }, NanoScroll.prototype.createEvents = function() {
                var _this = this;
                this.events = {
                    down: function(e) {
                        return _this.isBeingDragged = !0, _this.offsetY = e.pageY - _this.slider.offset().top, _this.pane.addClass("active"), _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]), !1
                    },
                    drag: function(e) {
                        return _this.sliderY = e.pageY - _this.$el.offset().top - _this.offsetY, _this.scroll(), _this.updateScrollValues(), _this.contentScrollTop >= _this.maxScrollTop ? _this.$el.trigger("scrollend") : 0 === _this.contentScrollTop && _this.$el.trigger("scrolltop"), !1
                    },
                    up: function(e) {
                        return _this.isBeingDragged = !1, _this.pane.removeClass("active"), _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]), !1
                    },
                    resize: function(e) {
                        _this.reset()
                    },
                    panedown: function(e) {
                        return _this.sliderY = (e.offsetY || e.originalEvent.layerY) - .5 * _this.sliderHeight, _this.scroll(), _this.events.down(e), !1
                    },
                    scroll: function(e) {
                        _this.isBeingDragged || (_this.updateScrollValues(), _this.iOSNativeScrolling || (_this.sliderY = _this.sliderTop, _this.slider.css({
                            top: _this.sliderTop
                        })), null != e && (_this.contentScrollTop >= _this.maxScrollTop ? (_this.options.preventPageScrolling && _this.preventScrolling(e, DOWN), _this.$el.trigger("scrollend")) : 0 === _this.contentScrollTop && (_this.options.preventPageScrolling && _this.preventScrolling(e, UP), _this.$el.trigger("scrolltop"))))
                    },
                    wheel: function(e) {
                        if (null != e) return _this.sliderY += -e.wheelDeltaY || -e.delta, _this.scroll(), !1
                    }
                }
            }, NanoScroll.prototype.addEvents = function() {
                var events;
                this.removeEvents(), events = this.events, this.options.disableResize || this.win.bind(RESIZE, events[RESIZE]), this.iOSNativeScrolling || (this.slider.bind(MOUSEDOWN, events[DOWN]), this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind(MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL])), this.$content.bind(SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL])
            }, NanoScroll.prototype.removeEvents = function() {
                var events;
                events = this.events, this.win.unbind(RESIZE, events[RESIZE]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind(SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL])
            }, NanoScroll.prototype.generate = function() {
                var cssRule, options, paneClass, sliderClass;
                return options = this.options, paneClass = options.paneClass, sliderClass = options.sliderClass, options.contentClass, this.$el.find("" + paneClass).length || this.$el.find("" + sliderClass).length || this.$el.append('<div class="' + paneClass + '"><div class="' + sliderClass + '" /></div>'), this.pane = this.$el.children("." + paneClass), this.slider = this.pane.find("." + sliderClass), BROWSER_SCROLLBAR_WIDTH && (cssRule = "rtl" === this.$el.css("direction") ? {
                    left: -BROWSER_SCROLLBAR_WIDTH
                } : {
                    right: -BROWSER_SCROLLBAR_WIDTH
                }, this.$el.addClass("has-scrollbar")), null != cssRule && this.$content.css(cssRule), this
            }, NanoScroll.prototype.restore = function() {
                this.stopped = !1, this.pane.show(), this.addEvents()
            }, NanoScroll.prototype.reset = function() {
                var content, contentHeight, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, sliderHeight;
                return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), content = this.content, contentStyle = content.style, contentStyleOverflowY = contentStyle.overflowY, BROWSER_IS_IE7 && this.$content.css({
                    height: this.$content.height()
                }), contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH, paneHeight = this.pane.outerHeight(), paneTop = parseInt(this.pane.css("top"), 10), paneBottom = parseInt(this.pane.css("bottom"), 10), paneOuterHeight = paneHeight + paneTop + paneBottom, sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight), sliderHeight < this.options.sliderMinHeight ? sliderHeight = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && sliderHeight > this.options.sliderMaxHeight && (sliderHeight = this.options.sliderMaxHeight), contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL && (sliderHeight += BROWSER_SCROLLBAR_WIDTH), this.maxSliderTop = paneOuterHeight - sliderHeight, this.contentHeight = contentHeight, this.paneHeight = paneHeight, this.paneOuterHeight = paneOuterHeight, this.sliderHeight = sliderHeight, this.slider.height(sliderHeight), this.events.scroll(), this.pane.show(), this.isActive = !0, content.scrollHeight === content.clientHeight || this.pane.outerHeight(!0) >= content.scrollHeight && contentStyleOverflowY !== SCROLL ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL ? this.slider.hide() : this.slider.show(), this.pane.css({
                    opacity: this.options.alwaysVisible ? 1 : "",
                    visibility: this.options.alwaysVisible ? "visible" : ""
                }), this)
            }, NanoScroll.prototype.scroll = function() {
                if (this.isActive) return this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop((this.paneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.sliderY / this.maxSliderTop * -1), this.iOSNativeScrolling || this.slider.css({
                    top: this.sliderY
                }), this
            }, NanoScroll.prototype.scrollBottom = function(offsetY) {
                if (this.isActive) return this.reset(), this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL), this
            }, NanoScroll.prototype.scrollTop = function(offsetY) {
                if (this.isActive) return this.reset(), this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL), this
            }, NanoScroll.prototype.scrollTo = function(node) {
                if (this.isActive) return this.reset(), this.scrollTop($(node).get(0).offsetTop), this
            }, NanoScroll.prototype.stop = function() {
                return this.stopped = !0, this.removeEvents(), this.pane.hide(), this
            }, NanoScroll.prototype.flash = function() {
                var _this = this;
                if (this.isActive) return this.reset(), this.pane.addClass("flashed"), setTimeout(function() {
                    _this.pane.removeClass("flashed")
                }, this.options.flashDelay), this
            }, NanoScroll
        }(), $.fn.nanoScroller = function(settings) {
            return this.each(function() {
                var options, scrollbar;
                if ((scrollbar = this.nanoscroller) || (options = $.extend({}, defaults, settings), this.nanoscroller = scrollbar = new NanoScroll(this, options)), settings && "object" == typeof settings) {
                    if ($.extend(scrollbar.options, settings), settings.scrollBottom) return scrollbar.scrollBottom(settings.scrollBottom);
                    if (settings.scrollTop) return scrollbar.scrollTop(settings.scrollTop);
                    if (settings.scrollTo) return scrollbar.scrollTo(settings.scrollTo);
                    if ("bottom" === settings.scroll) return scrollbar.scrollBottom(0);
                    if ("top" === settings.scroll) return scrollbar.scrollTop(0);
                    if (settings.scroll && settings.scroll instanceof $) return scrollbar.scrollTo(settings.scroll);
                    if (settings.stop) return scrollbar.stop();
                    if (settings.flash) return scrollbar.flash()
                }
                return scrollbar.reset()
            })
        }
    }(jQuery, window, document),
    function($) {
        var supportsScrollHeight, mirrored, defaults = {
                className: "autosizejs",
                append: "",
                callback: !1
            },
            hidden = "hidden",
            copyStyle = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
            mirror = $('<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;"/>').data("autosize", !0)[0];
        mirror.style.lineHeight = "99px", "99px" === $(mirror).css("lineHeight") && copyStyle.push("lineHeight"), mirror.style.lineHeight = "", $.fn.autosize = function(options) {
            return options = $.extend({}, defaults, options || {}), mirror.parentNode !== document.body && ($(document.body).append(mirror), mirror.value = "\n\n\n", mirror.scrollTop = 9e4, supportsScrollHeight = mirror.scrollHeight === mirror.scrollTop + mirror.clientHeight), this.each(function() {
                function initMirror() {
                    mirrored = ta, mirror.className = options.className, $.each(copyStyle, function(i, val) {
                        mirror.style[val] = $ta.css(val)
                    })
                }

                function adjust() {
                    var height, overflow, original;
                    if (mirrored !== ta && initMirror(), !active) {
                        active = !0, mirror.value = ta.value + options.append, mirror.style.overflowY = ta.style.overflowY, original = parseInt(ta.style.height, 10), mirror.style.width = Math.max($ta.width(), 0) + "px", supportsScrollHeight ? height = mirror.scrollHeight : (mirror.scrollTop = 0, mirror.scrollTop = 9e4, height = mirror.scrollTop);
                        var maxHeight = parseInt($ta.css("maxHeight"), 10);
                        maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4, height > maxHeight ? (height = maxHeight, overflow = "scroll") : height < minHeight && (height = minHeight), height += boxOffset, ta.style.overflowY = overflow || hidden, original !== height && (ta.style.height = height + "px", callback && options.callback.call(ta)), setTimeout(function() {
                            active = !1
                        }, 1)
                    }
                }
                var minHeight, active, resize, ta = this,
                    $ta = $(ta),
                    boxOffset = 0,
                    callback = $.isFunction(options.callback);
                $ta.data("autosize") || ("border-box" !== $ta.css("box-sizing") && "border-box" !== $ta.css("-moz-box-sizing") && "border-box" !== $ta.css("-webkit-box-sizing") || (boxOffset = $ta.outerHeight() - $ta.height()), minHeight = Math.max(parseInt($ta.css("minHeight"), 10) - boxOffset, $ta.height()), resize = "none" === $ta.css("resize") || "vertical" === $ta.css("resize") ? "none" : "horizontal", $ta.css({
                    overflow: hidden,
                    overflowY: hidden,
                    wordWrap: "break-word",
                    resize: resize
                }).data("autosize", !0), "onpropertychange" in ta ? "oninput" in ta ? ta.oninput = ta.onkeyup = adjust : ta.onpropertychange = adjust : ta.oninput = adjust, $(window).on("resize", function() {
                    active = !1, adjust()
                }), $ta.on("autosize", function() {
                    active = !1, adjust()
                }), adjust())
            })
        }
    }(window.jQuery || window.Zepto);
var ScrollPoints, __bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments)
    }
};
ScrollPoints = function() {
    function ScrollPoints() {
        this.scroll = __bind(this.scroll, this), $(window).on("scroll", _.throttle(this.scroll, this.throttleWait))
    }
    return ScrollPoints.prototype.points = [], ScrollPoints.prototype.lastScrollY = -1, ScrollPoints.prototype.throttleWait = 50, ScrollPoints.prototype.add = function(point) {
        return this.points.push(point), this
    }, ScrollPoints.prototype.reset = function() {
        return this.points = [], this
    }, ScrollPoints.prototype.scroll = function() {
        this.checkPoints(window.pageYOffset)
    }, ScrollPoints.prototype.checkPoints = function(scrollY) {
        var direction, from, i, numPoints, point, reachDownPoint, reachUpPoint, to, _i;
        if ((numPoints = this.points.length) > 0) {
            for (direction = scrollY > this.lastScrollY ? "down" : "up", "up" === direction ? (from = numPoints - 1, to = 0) : (from = 0, to = numPoints - 1), i = _i = from; from <= to ? _i <= to : _i >= to; i = from <= to ? ++_i : --_i) point = this.points[i], reachDownPoint = "down" === direction && point.y <= scrollY && point.y > this.lastScrollY, reachUpPoint = "up" === direction && point.y >= scrollY && point.y < this.lastScrollY, (reachDownPoint || reachUpPoint) && point.callback(direction);
            this.lastScrollY = scrollY
        }
    }, ScrollPoints
}(), namespace("App.Service", function(exports) {
    return exports.ScrollPoints = ScrollPoints
});