window.Subjx = function (r) {
	var n = {};

	function o(t) {
		if (n[t]) return n[t].exports;
		var e = n[t] = {
			i: t,
			l: !1,
			exports: {}
		};
		return r[t].call(e.exports, e, e.exports, o), e.l = !0, e.exports
	}
	return o.m = r, o.c = n, o.d = function (t, e, r) {
		o.o(t, e) || Object.defineProperty(t, e, {
			enumerable: !0,
			get: r
		})
	}, o.r = function (t) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(t, "__esModule", {
			value: !0
		})
	}, o.t = function (e, t) {
		if (1 & t && (e = o(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var r = Object.create(null);
		if (o.r(r), Object.defineProperty(r, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var n in e) o.d(r, n, function (t) {
				return e[t]
			}.bind(null, n));
		return r
	}, o.n = function (t) {
		var e = t && t.__esModule ? function () {
			return t.default
		} : function () {
			return t
		};
		return o.d(e, "a", e), e
	}, o.o = function (t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, o.p = "", o(o.s = 1)
}([function (t, e, r) {}, function (t, e, r) {
	"use strict";
	r.r(e);
	r(0);
	var z = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || function (t) {
			return setTimeout(t, 1e3 / 60)
		},
		a = cancelAnimationFrame || mozCancelAnimationFrame || function (t) {
			clearTimeout(t)
		},
		o = (Array.prototype.forEach, Array.prototype.slice),
		i = Array.prototype.map,
		s = console.warn;

	function d(t) {
		return null != t
	}

	function X(t) {
		return null == t
	}

	function f(t) {
		return "function" == typeof t
	}

	function c(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}
	var u = function () {
		function t() {
			! function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}(this, t), this.observers = {}
		}
		var e, r, n;
		return e = t, (r = [{
			key: "subscribe",
			value: function (t, e) {
				var r = this.observers;
				X(r[t]) && Object.defineProperty(r, t, {
					value: []
				}), r[t].push(e)
			}
		}, {
			key: "unsubscribe",
			value: function (e) {
				this.observers = this.observers.filter(function (t) {
					return t !== e
				})
			}
		}, {
			key: "notify",
			value: function (e, r, n) {
				X(this.observers[e]) || this.observers[e].forEach(function (t) {
					if (r !== t) switch (e) {
						case "onmove":
							t.onMove(n);
							break;
						case "onrotate":
							t.onRotate(n);
							break;
						case "onresize":
							t.onResize(n);
							break;
						case "onapply":
							t.onApply(n);
							break;
						case "onrefreshstate":
							t.onRefreshState(n)
					}
				})
			}
		}]) && c(e.prototype, r), n && c(e, n), t
	}();

	function l(t) {
		return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		})(t)
	}

	function n(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}
	var h = function () {
		function a(t) {
			if (function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, a), !t) return this;
			if ("string" == typeof t) {
				var e = document.querySelectorAll(t);
				this.length = e.length;
				for (var r = 0; r < this.length; r++) this[r] = e[r]
			} else if (1 === t.nodeType || t === document) this[0] = t, this.length = 1;
			else if (t instanceof Subjx || "object" === l(t)) {
				this.length = t.length;
				for (var n = 0; n < this.length; n++) this[n] = t[n]
			} else if (Array.isArray(t))
				for (var o = this.length = 0; o < this.length; o++) 1 === t.nodeType && (this[o] = t[o], this.length++);
			return this
		}
		var t, e, r;
		return t = a, (e = [{
			key: "css",
			value: function (t) {
				return function (r) {
					var t = {
						setStyle: function (t) {
							return function (t, e) {
								var r = t.length;
								for (; r--;)
									for (var n in e) t[r].style[n] = e[n];
								return t.style
							}(this, t)
						},
						getStyle: function () {
							return function (t) {
								var e = t.length;
								for (; e--;) return t[e].currentStyle ? t[e].currentStyle[r] : document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(t[e], "")[r] : t[e].style[r]
							}(this)
						}
					}; {
						if ("string" == typeof r) return t.getStyle.apply(this, o.call(arguments, 1));
						if ("object" === l(r) || !r) return t.setStyle.apply(this, arguments);
						s("Method ".concat(r, " does not exist"))
					}
					return !1
				}.call(this, t)
			}
		}, {
			key: "find",
			value: function (t) {
				return function (t) {
					var e = this.length;
					for (; e--;) return O(this[e].querySelectorAll(t))
				}.call(this, t)
			}
		}, {
			key: "each",
			value: function (t) {
				return function (e) {
					for (var r = o.call(this, 0), t = function (t) {
							e.call(r[t])
						}, n = r.length - 1; 0 <= n; --n) t(n);
					return this
				}.call(this, t)
			}
		}, {
			key: "on",
			value: function () {
				return function () {
					var t = this.length;
					for (; t--;) this[t].events || (this[t].events = {}, this[t].events[arguments[0]] = []), 2 === arguments.length ? document.addEventListener ? this[t].addEventListener(arguments[0], arguments[1], !1) : document.attachEvent ? this[t].attachEvent("on".concat(arguments[0]), arguments[1]) : this[t]["on".concat(arguments[0])] = arguments[1] : 3 === arguments.length && "string" == typeof arguments[1] && p(this[t], arguments[0], arguments[1], arguments[2], !0);
					return this
				}.apply(this, arguments)
			}
		}, {
			key: "off",
			value: function () {
				return function () {
					var t = this.length;
					for (; t--;) this[t].events || (this[t].events = {}, this[t].events[arguments[0]] = []), 2 === arguments.length ? document.removeEventListener ? this[t].removeEventListener(arguments[0], arguments[1], !1) : document.detachEvent ? this[t].detachEvent("on".concat(arguments[0]), arguments[1]) : this[t]["on".concat(arguments[0])] = null : 3 === arguments.length && "string" == typeof arguments[1] && p(this[t], arguments[0], arguments[1], arguments[2], !1);
					return this
				}.apply(this, arguments)
			}
		}, {
			key: "is",
			value: function (t) {
				return function (t) {
					var e = O(t),
						r = this.length;
					for (; r--;)
						if (this[r] === e[r]) return !0;
					return !1
				}.call(this, t)
			}
		}]) && n(t.prototype, e), r && n(t, r), a
	}();

	function p(t, e, r, n, o) {
		var a = function (t) {
			for (var e = t.target; e && e !== this;) e.matches(r) && n.call(e, t), e = e.parentNode
		};
		!0 === o ? document.addEventListener ? t.addEventListener(e, a, !1) : document.attachEvent ? t.attachEvent("on".concat(e), a) : t["on".concat(e)] = a : document.removeEventListener ? t.removeEventListener(e, a, !1) : document.detachEvent ? t.detachEvent("on".concat(e), a) : t["on".concat(e)] = null
	}

	function O(t) {
		return new h(t)
	}

	function S(t) {
		return t.getBoundingClientRect()
	}

	function b(t) {
		return t.css("-webkit-transform") || t.css("-moz-transform") || t.css("-ms-transform") || t.css("-o-transform") || t.css("transform") || "none"
	}

	function Y(t) {
		var e = {};
		for (var r in t = t.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*(?:,|\s)?)+\))+/g)) {
			var n = t[r].match(/[\w\.\-]+/g);
			e[n.shift()] = n.map(function (t) {
				return Number(t)
			})
		}
		return e
	}

	function E(t) {
		var e = b(t).match(/-?\d+\.?\d+|-?\d+/g);
		return e ? e.map(function (t) {
			return parseFloat(t)
		}) : [1, 0, 0, 1, 0, 0]
	}

	function y(e, t) {
		if (t) {
			if (e.classList) {
				if (!(-1 < t.indexOf(" "))) return e.classList.add(t);
				t.split(/\s+/).forEach(function (t) {
					return e.classList.add(t)
				})
			}
			return e
		}
	}
	var v = /px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc|deg/,
		g = Math.PI / 180,
		pt = 180 / Math.PI;

	function Gt(t) {
		var e = t.x,
			r = t.y,
			n = t.centerX,
			o = t.centerY,
			a = t.angle,
			i = t.newCenterX,
			s = t.newCenterY,
			c = R(n, o, e, r, a, !1, !1),
			u = R(i, s, e, r, a, !1, !1),
			l = e - (c.left - u.left),
			h = r - (c.top - u.top);
		return {
			resX: m(l),
			resY: m(h)
		}
	}

	function j(t, e) {
		if (0 === e) return t;
		var r = T(t, e);
		return r - t < e ? r : void 0
	}

	function T(t, e) {
		return 0 === e ? t : e * Math.round(t / e)
	}

	function N(t, e, r, n, o, a, i) {
		var s = t + parseFloat(r) / 2,
			c = e + parseFloat(n) / 2,
			u = t - s,
			l = e - c,
			h = Math.atan2(l, u) + o,
			f = Math.sqrt(Math.pow(parseFloat(r) / 2, 2) + Math.pow(parseFloat(n) / 2, 2)),
			p = Math.cos(h),
			d = Math.sin(h),
			b = c + f * (d = !0 === i ? -d : d);
		return {
			left: m(s + f * (p = !0 === a ? -p : p)),
			top: m(b)
		}
	}

	function R(t, e, r, n, o, a, i) {
		var s = Math.cos(o),
			c = Math.sin(o),
			u = (s = !0 === a ? -s : s) * (n - e) - (c = !0 === i ? -c : c) * (r - t) + e;
		return {
			left: m(s * (r - t) + c * (n - e) + t),
			top: m(u)
		}
	}

	function P(t, e) {
		return /px/.test(t) ? t : /%/.test(t) ? "".concat(parseFloat(t) * parseFloat(e) / 100, "px") : void 0
	}

	function _(t, e, r) {
		return /px/.test(r) ? t : /%/.test(r) ? "".concat(100 * parseFloat(t) / parseFloat(e), "%") : void 0
	}

	function C(t) {
		return t.match(v)[0]
	}

	function m(t) {
		return Number(t.toFixed(6))
	}

	function w(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}
	var x = function () {
		function r(t, e) {
			if (function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, r), this.constructor === r) throw new TypeError("Cannot construct Subject instances directly");
			this.el = t, this.storage = null, this.Ob = e, this._onMouseDown = this._onMouseDown.bind(this), this._onTouchStart = this._onTouchStart.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this)
		}
		var t, e, n;
		return t = r, (e = [{
			key: "enable",
			value: function (t) {
				X(this.storage) ? (this._load(t), this._init(this.el)) : warn("Already enabled")
			}
		}, {
			key: "disable",
			value: function () {
				var t = this.storage,
					e = this.el;
				X(t) || (! function (e, t) {
					if (t) {
						if (e.classList) {
							if (!(-1 < t.indexOf(" "))) return e.classList.remove(t);
							t.split(/\s+/).forEach(function (t) {
								return e.classList.remove(t)
							})
						}
					}
				}(e, "dg-drag"), this._destroy(), delete this.storage)
			}
		}, {
			key: "_load",
			value: function (t) {
				(function (e) {
					y(this.el, "dg-drag");
					var t = {
							x: 10,
							y: 10,
							angle: 10 * g
						},
						r = {
							move: !1,
							resize: !1,
							rotate: !1
						};
					if (d(e)) {
						if (d(e.snap)) {
							var n = e.snap,
								o = n.x,
								a = n.y,
								i = n.angle;
							t.x = X(o) ? 10 : o, t.y = X(a) ? 10 : a, t.angle = X(i) ? 10 * g : i * g
						}
						if (d(e.each)) {
							var s = e.each,
								c = s.move,
								u = s.resize,
								l = s.rotate;
							r.move = c || !1, r.resize = u || !1, r.rotate = l || !1
						}
					}
					var h = this.Ob;
					(r.move || r.resize || r.rotate) && (h.subscribe("onrefreshstate", this), h.subscribe("onapply", this));
					r.move && h.subscribe("onmove", this);
					r.resize && h.subscribe("onresize", this);
					r.rotate && h.subscribe("onrotate", this);
					this.storage = {
						drop: e && f(e.drop) ? function (t) {
							e.drop(t, this.el)
						} : function () {},
						snap: t,
						each: r
					}
				}).call(this, t)
			}
		}, {
			key: "_draw",
			value: function () {
				var L = this;
				! function t() {
					var e = L.storage;
					if (e.frame = z(t), e.doDraw) {
						e.doDraw = !1;
						var r = e.handle,
							n = e.handles,
							o = e.cx,
							a = e.cy,
							i = e.ch,
							s = e.cw,
							c = e.refang,
							u = e.pressang,
							l = e.pageX,
							h = e.pageY,
							f = e.center,
							p = e.snap,
							d = e.parentScale,
							b = e.doDrag,
							y = e.doResize,
							v = e.doRotate,
							g = d[0],
							m = d[1],
							w = e.each,
							x = w.move,
							_ = w.resize,
							k = w.rotate;
						if (y) {
							var M, A, E, O, S, j = null,
								T = null;
							if (r.is(n.br) || r.is(n.mr)) O = ((h = (S = R(o, a, l, h, c, !1, !1)).top) - a) / m, E = ((l = S.left) - o) / g, r.is(n.br) && (T = O + i), j = E + s, A = M = !1;
							else if (r.is(n.tl) || r.is(n.ml)) O = -((h = (S = R(o, a, l, h, c, !1, !1)).top) - a) / m, j = (E = -((l = S.left) - o) / g) + s, r.is(n.tl) && (T = O + i), A = M = !0;
							else if (r.is(n.tr) || r.is(n.tc)) {
								var X = r.is(n.tr),
									Y = r.is(n.tc);
								O = -((h = (S = R(o, a, l, h, c, X, !1)).top) - a) / m, E = -((l = S.left) - o) / g, X && (O = -O), T = O + i, X && (j = E + s), M = Y, A = !0
							} else if (r.is(n.bl) || r.is(n.bc)) {
								var N = r.is(n.bl);
								h = (S = R(o, a, l, h, c, !1, N)).top, E = -((l = S.left) - o) / g, T = (O = (h - a) / m) + i, N && (j = E + s), M = N, A = !1
							}
							L._resize(j, T, M, A, E, O), _ && L.Ob.notify("onresize", L, {
								width: j,
								height: T,
								x: E,
								y: O,
								revX: M,
								revY: A,
								snap: p
							})
						}
						if (b) {
							var P = (h - a) / m,
								C = (l - o) / g;
							L._drag(P, C), x && L.Ob.notify("onmove", L, {
								diffTop: P,
								diffLeft: C
							})
						}
						if (v) {
							var D = Math.atan2(h - f.y, l - f.x) - u;
							L._rotate(D), k && L.Ob.notify("onrotate", L, {
								radians: D
							})
						}
					}
				}()
			}
		}, {
			key: "_start",
			value: function (t) {
				t.stopImmediatePropagation && t.stopImmediatePropagation();
				var e = this.storage,
					r = this._compute(t);
				e.pageX = t.pageX, e.pageY = t.pageY, e.cx = t.pageX, e.cy = t.pageY, e.ctrlKey = t.ctrlKey, Object.keys(r).forEach(function (t) {
					e[t] = r[t]
				});
				var n = r.onRightEdge,
					o = r.onBottomEdge,
					a = r.onTopEdge,
					i = r.onLeftEdge,
					s = r.handle,
					c = r.factor,
					u = r.revX,
					l = r.revY,
					h = n || o || a || i,
					f = s.is(e.handles.rotator);
				e.doResize = h, e.doDrag = !f && !h, e.doRotate = f, this.Ob && this.Ob.notify("onrefreshstate", this, {
					factor: c,
					revX: u,
					revY: l,
					onTopEdge: a,
					onLeftEdge: i,
					onRightEdge: n,
					onBottomEdge: o
				}), this._draw()
			}
		}, {
			key: "_moving",
			value: function (t) {
				t.preventDefault && t.preventDefault();
				var e = this.storage;
				e.pageX = t.pageX, e.pageY = t.pageY, e.doDraw = !0
			}
		}, {
			key: "_end",
			value: function (t) {
				t.stopImmediatePropagation && t.stopImmediatePropagation();
				var e = this.storage,
					r = e.doResize ? "resize" : e.doDrag ? "drag" : "rotate";
				e.doResize = !1, e.doDrag = !1, e.doRotate = !1, e.doDraw = !1, this._apply(r), this.Ob && this.Ob.notify("onapply", this, r), a(e.frame), e.drop.call(this, t)
			}
		}, {
			key: "_onMouseDown",
			value: function (t) {
				this._start(t), O(document).on("mousemove", this._onMouseMove).on("mouseup", this._onMouseUp)
			}
		}, {
			key: "_onTouchStart",
			value: function (t) {
				this._start(t.touches[0]), O(document).on("touchmove", this._onTouchMove).on("touchend", this._onTouchEnd)
			}
		}, {
			key: "_onMouseMove",
			value: function (t) {
				this._moving(t, this.el)
			}
		}, {
			key: "_onTouchMove",
			value: function (t) {
				this._moving(t.touches[0], this.el)
			}
		}, {
			key: "_onMouseUp",
			value: function (t) {
				this._end(t, this.el), O(document).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp)
			}
		}, {
			key: "_onTouchEnd",
			value: function (t) {
				0 === t.touches.length && this._end(t.changedTouches[0], this.el), O(document).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd)
			}
		}, {
			key: "onMove",
			value: function (t) {
				this._drag(t.diffTop, t.diffLeft)
			}
		}, {
			key: "onRotate",
			value: function (t) {
				this._rotate(t.radians)
			}
		}, {
			key: "onResize",
			value: function (t) {
				var e = null !== t.width ? this.storage.cw + t.x : null,
					r = null !== t.height ? this.storage.ch + t.y : null;
				this._resize(e, r, t.revX, t.revY)
			}
		}, {
			key: "onApply",
			value: function (t) {
				this._apply(t)
			}
		}]) && w(t.prototype, e), n && w(t, n), r
	}();

	function k(t) {
		return (k = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		})(t)
	}

	function M(t) {
		return function (t) {
			if (Array.isArray(t)) {
				for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
				return r
			}
		}(t) || function (t) {
			if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t)
		}(t) || function () {
			throw new TypeError("Invalid attempt to spread non-iterable instance")
		}()
	}

	function A(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}

	function D(t, e) {
		return !e || "object" !== k(e) && "function" != typeof e ? function (t) {
			if (void 0 !== t) return t;
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
		}(t) : e
	}

	function L(t) {
		return (L = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
			return t.__proto__ || Object.getPrototypeOf(t)
		})(t)
	}

	function B(t, e) {
		return (B = Object.setPrototypeOf || function (t, e) {
			return t.__proto__ = e, t
		})(t, e)
	}
	var F = function (t) {
		function o(t, e, r) {
			var n;
			return function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}(this, o), (n = D(this, L(o).call(this, t, r))).enable(e), n
		}
		var e, r, n;
		return function (t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
			t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			}), e && B(t, e)
		}(o, x), e = o, (r = [{
			key: "_init",
			value: function (t, e) {
				(function (t) {
					var e = document.createElement("div");
					y(e, "dg-wrapper"), t.parentNode.insertBefore(e, t);
					var r = e,
						n = O(t),
						o = n.css("width"),
						a = n.css("height"),
						i = n.css("top"),
						s = n.css("left"),
						c = O(r.parentNode),
						u = {
							top: i,
							left: s,
							width: P(o, c.css("width")),
							height: P(a, c.css("height")),
							transform: b(n)
						},
						l = document.createElement("div");
					l.innerHTML = '<div class="dg-hdl dg-rotator"></div>        <div class="dg-hdl dg-hdl-t dg-hdl-l dg-hdl-tl"></div>        <div class="dg-hdl dg-hdl-t dg-hdl-r dg-hdl-tr"></div>        <div class="dg-hdl dg-hdl-b dg-hdl-r dg-hdl-br"></div>        <div class="dg-hdl dg-hdl-b dg-hdl-l dg-hdl-bl"></div>        <div class="dg-hdl dg-hdl-t dg-hdl-c dg-hdl-tc"></div>        <div class="dg-hdl dg-hdl-b dg-hdl-c dg-hdl-bc"></div>        <div class="dg-hdl dg-hdl-m dg-hdl-l dg-hdl-ml"></div>        <div class="dg-hdl dg-hdl-m dg-hdl-r dg-hdl-mr"></div>', y(l, "dg-controls"), r.appendChild(l);
					var h = O(l);
					h.css(u);
					var f = O(r);
					Object.assign(this.storage, {
						controls: l,
						handles: {
							tl: f.find(".dg-hdl-tl"),
							tr: f.find(".dg-hdl-tr"),
							br: f.find(".dg-hdl-br"),
							bl: f.find(".dg-hdl-bl"),
							tc: f.find(".dg-hdl-tc"),
							bc: f.find(".dg-hdl-bc"),
							ml: f.find(".dg-hdl-ml"),
							mr: f.find(".dg-hdl-mr"),
							rotator: f.find(".dg-rotator")
						},
						parent: c
					}), h.on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
				}).call(this, t, e)
			}
		}, {
			key: "_destroy",
			value: function (t) {
				(function () {
					var t = this.storage.controls;
					O(t).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), this.el.parentNode.removeChild(t.parentNode)
				}).call(this, t)
			}
		}, {
			key: "_drag",
			value: function () {
				q.call.apply(q, [this].concat(Array.prototype.slice.call(arguments)))
			}
		}, {
			key: "_rotate",
			value: function () {
				V.call.apply(V, [this].concat(Array.prototype.slice.call(arguments)))
			}
		}, {
			key: "_resize",
			value: function () {
				U.call.apply(U, [this].concat(Array.prototype.slice.call(arguments)))
			}
		}, {
			key: "_compute",
			value: function () {
				return I.call.apply(I, [this].concat(Array.prototype.slice.call(arguments)))
			}
		}, {
			key: "_apply",
			value: function () {
				var t = this.storage,
					e = O(this.el),
					r = t.cached,
					n = t.parent,
					o = t.dimens,
					a = t.controls;
				if (r) {
					var i = M(r),
						s = i[4],
						c = i[5];
					i[4] = 0, i[5] = 0;
					var u = H(i),
						l = n.css("width"),
						h = n.css("height"),
						f = parseFloat(P(e.css("left"), l)),
						p = parseFloat(P(e.css("top"), h));
					u.left = _(f + s + "px", l, o.left), u.top = _(p + c + "px", h, o.top), e.css(u), O(a).css(u), this.storage.cached = null
				}
			}
		}, {
			key: "onRefreshState",
			value: function (t) {
				var e = this.storage,
					r = function (t, e, r) {
						var n = this.storage,
							o = n.controls,
							a = n.handles,
							i = n.parent,
							s = n.snap,
							c = S(a.tl[0]),
							u = S(a.tr[0]),
							l = Math.atan2(u.top - c.top, u.left - c.left) * t,
							h = parseFloat(P(o.style.width, i.css("width"))),
							f = parseFloat(P(o.style.height, i.css("height"))),
							p = E(O(o)),
							d = N(p[4], p[5], h, f, l, e, r),
							b = O(this.el),
							y = this.el.style;
						return {
							transform: p,
							parentTransform: E(i),
							left: T(p[4], s.x),
							top: T(p[5], s.y),
							coordX: d.left,
							coordY: d.top,
							refang: l,
							cw: h,
							ch: f,
							dimens: {
								top: C(y.top || b.css("top")),
								left: C(y.left || b.css("left")),
								width: C(y.width || b.css("width")),
								height: C(y.height || b.css("height"))
							}
						}
					}.call(this, t.factor, t.revX, t.revY);
				Object.keys(r).forEach(function (t) {
					e[t] = r[t]
				})
			}
		}]) && A(e.prototype, r), n && A(e, n), o
	}();

	function I(t) {
		var e = this.el,
			r = this.storage,
			n = r.handles,
			o = r.controls,
			a = r.parent,
			i = r.snap,
			s = O(t.target),
			c = 1,
			u = s.is(n.tl) || s.is(n.ml) || s.is(n.bl) || s.is(n.tc),
			l = s.is(n.tl) || s.is(n.tr) || s.is(n.tc) || s.is(n.ml);
		(s.is(n.tr) || s.is(n.bl)) && (c = -1);
		var h = S(n.tl[0]),
			f = S(n.tr[0]),
			p = Math.atan2(f.top - h.top, f.left - h.left) * c,
			d = parseFloat(P(o.style.width, a.css("width"))),
			b = parseFloat(P(o.style.height, a.css("height"))),
			y = E(O(o)),
			v = N(y[4], y[5], d, b, p, u, l),
			g = S(o),
			m = g.left + d / 2,
			w = g.top + b / 2,
			x = Math.atan2(t.pageY - w, t.pageX - m),
			_ = O(e),
			k = e.style,
			M = {
				top: C(k.top || _.css("top")),
				left: C(k.left || _.css("left")),
				width: C(k.width || _.css("width")),
				height: C(k.height || _.css("height"))
			},
			A = E(a);
		return {
			parentScale: [A[0], A[3]],
			transform: y,
			cw: d,
			ch: b,
			center: {
				x: m,
				y: w
			},
			left: T(y[4], i.x),
			top: T(y[5], i.y),
			coordY: v.top,
			coordX: v.left,
			factor: c,
			pressang: x,
			refang: p,
			revX: u,
			revY: l,
			handle: s,
			onTopEdge: s.is(n.tl) || s.is(n.tc) || s.is(n.tr),
			onLeftEdge: s.is(n.tl) || s.is(n.ml) || s.is(n.bl),
			onRightEdge: s.is(n.tr) || s.is(n.mr) || s.is(n.br),
			onBottomEdge: s.is(n.br) || s.is(n.bc) || s.is(n.bl),
			dimens: M
		}
	}

	function U(t, e, r, n) {
		var o = this.el,
			a = this.storage,
			i = a.controls,
			s = a.snap,
			c = a.left,
			u = a.top,
			l = a.coordX,
			h = a.coordY,
			f = a.refang,
			p = a.dimens,
			d = a.parent,
			b = a.transform,
			y = i.style;
		null !== t && (y.width = "".concat(j(t, s.x), "px")), null !== e && (y.height = "".concat(j(e, s.y), "px"));
		var v = N(c, u, y.width, y.height, f, r, n),
			g = u - (v.top - h),
			m = c - (v.left - l),
			w = M(b);
		w[4] = m, w[5] = g;
		var x = H(w);
		O(i).css(x), x.width = _(y.width, d.css("width"), p.width), x.height = _(y.height, d.css("height"), p.height), O(o).css(x), a.cached = w
	}

	function q(t, e) {
		var r = this.el,
			n = this.storage,
			o = n.controls,
			a = n.transform,
			i = n.snap,
			s = M(a);
		s[4] = j(a[4] + e, i.x), s[5] = j(a[5] + t, i.y);
		var c = H(s);
		O(o).css(c), O(r).css(c), n.cached = s
	}

	function V(t) {
		var e = this.el,
			r = this.storage,
			n = r.controls,
			o = r.transform,
			a = r.refang,
			i = r.snap,
			s = M(o),
			c = j(a + t, i.angle);
		s[0] = m(Math.cos(c)), s[1] = m(Math.sin(c)), s[2] = -m(Math.sin(c)), s[3] = m(Math.cos(c));
		var u = H(s);
		O(n).css(u), O(e).css(u), r.cached = s
	}

	function H(t) {
		var e = "matrix(".concat(t.join(), ")");
		return {
			transform: e,
			webkitTranform: e,
			mozTransform: e,
			msTransform: e,
			otransform: e
		}
	}

	function $t(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = null != arguments[t] ? arguments[t] : {},
				n = Object.keys(r);
			"function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function (t) {
				return Object.getOwnPropertyDescriptor(r, t).enumerable
			}))), n.forEach(function (t) {
				K(e, t, r[t])
			})
		}
		return e
	}

	function K(t, e, r) {
		return e in t ? Object.defineProperty(t, e, {
			value: r,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = r, t
	}

	function Jt(t, e) {
		return function (t) {
			if (Array.isArray(t)) return t
		}(t) || function (t, e) {
			var r = [],
				n = !0,
				o = !1,
				a = void 0;
			try {
				for (var i, s = t[Symbol.iterator](); !(n = (i = s.next()).done) && (r.push(i.value), !e || r.length !== e); n = !0);
			} catch (t) {
				o = !0, a = t
			} finally {
				try {
					n || null == s.return || s.return()
				} finally {
					if (o) throw a
				}
			}
			return r
		}(t, e) || function () {
			throw new TypeError("Invalid attempt to destructure non-iterable instance")
		}()
	}
	var Q = /([achlmqstvz])([^achlmqstvz]*)/gi,
		Z = /\s*,\s*|\s+/g;

	function Wt(t) {
		for (var e = Q.lastIndex = 0, r = []; e = Q.exec(t);) {
			var n = e[1],
				o = n.toUpperCase();
			r.push({
				relative: n !== o,
				key: o,
				cmd: n,
				value: e[2].trim().split(Z).map(function (t) {
					if (!isNaN(t)) return Number(t)
				})
			})
		}
		return r
	}

	function te(t, e, r, n) {
		return t + e * (Math.abs(t - r) / n)
	}

	function ee(t, e, r) {
		return t + e * (t / r)
	}

	function re(t) {
		return !0 === t ? -1 : 1
	}

	function dt(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = null != arguments[t] ? arguments[t] : {},
				n = Object.keys(r);
			"function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function (t) {
				return Object.getOwnPropertyDescriptor(r, t).enumerable
			}))), n.forEach(function (t) {
				G(e, t, r[t])
			})
		}
		return e
	}

	function G(t, e, r) {
		return e in t ? Object.defineProperty(t, e, {
			value: r,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = r, t
	}

	function $(t) {
		return ($ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		})(t)
	}

	function J(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}

	function W(t, e) {
		return !e || "object" !== $(e) && "function" != typeof e ? function (t) {
			if (void 0 !== t) return t;
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
		}(t) : e
	}

	function tt(t) {
		return (tt = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
			return t.__proto__ || Object.getPrototypeOf(t)
		})(t)
	}

	function et(t, e) {
		return (et = Object.setPrototypeOf || function (t, e) {
			return t.__proto__ = e, t
		})(t, e)
	}
	var rt = 25,
		nt = /[+-]?\d+(\.\d+)?/g,
		ot = /translate\(.*\)(.*)translate\(.*\)|$/,
		at = function (t) {
			function o(t, e, r) {
				var n;
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, o), (n = W(this, tt(o).call(this, t, r))).enable(e), n
			}
			var e, r, n;
			return function (t, e) {
				if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && et(t, e)
			}(o, x), e = o, (r = [{
				key: "_init",
				value: function (t, e) {
					(function (t) {
						var s = lt("g");
						t.parentNode.appendChild(s);
						var e = t.getBBox(),
							r = e.width,
							n = e.height,
							o = e.x,
							a = e.y,
							c = t.getAttribute("transform") || "translate(0 0)",
							i = lt("rect");
						[
							["width", r],
							["height", n],
							["x", o],
							["y", a],
							["fill", "transparent"],
							["stroke", "#00a8ff"],
							["stroke-dasharray", "3 3"],
							["transform", c]
						].forEach(function (t) {
							i.setAttribute(t[0], t[1])
						});
						var u = lt("g");
						u.appendChild(i), s.appendChild(u);
						var l = {
							tl: [o, a],
							tr: [o + r, a],
							br: [o + r, a + n],
							bl: [o, a + n],
							tc: [o + r / 2, a],
							bc: [o + r / 2, a + n],
							ml: [o, a + n / 2],
							mr: [o + r, a + n / 2],
							rotator: [o + r / 2, a - rt]
						};
						Object.keys(l).forEach(function (t) {
							var e, r, n, o, a, i = l[t];
							l[t] = (e = i[0], r = i[1], n = c, o = lt("circle"), a = {
								cx: e,
								cy: r,
								r: 6,
								fill: "white",
								stroke: "#00a8ff",
								transform: n
							}, Object.keys(a).map(function (t) {
								o.setAttribute(t, a[t])
							}), o), s.appendChild(lt("g").appendChild(l[t]).parentNode)
						}), Object.assign(this.storage, {
							wrapper: s,
							box: i,
							handles: l,
							parent: s.parentNode
						}), O(s).on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
					}).call(this, t, e)
				}
			}, {
				key: "_destroy",
				value: function (t) {
					(function () {
						var t = this.storage.wrapper;
						O(t).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), this.el.parentNode.removeChild(t)
					}).call(this, t)
				}
			}, {
				key: "_drag",
				value: function () {
					ct.call.apply(ct, [this].concat(Array.prototype.slice.call(arguments)))
				}
			}, {
				key: "_rotate",
				value: function () {
					ut.call.apply(ut, [this].concat(Array.prototype.slice.call(arguments)))
				}
			}, {
				key: "_resize",
				value: function () {
					st.call.apply(st, [this].concat(Array.prototype.slice.call(arguments)))
				}
			}, {
				key: "_compute",
				value: function () {
					return it.call.apply(it, [this].concat(Array.prototype.slice.call(arguments)))
				}
			}, {
				key: "_apply",
				value: function (t) {
					var e = this,
						r = this.storage,
						n = r.box,
						o = r.handles,
						a = r.refang,
						i = r.factor,
						s = r.wrapper,
						c = r.cached,
						u = r.transform,
						l = Y(s.getAttribute("transform") || "translate(0 0)").translate,
						h = n.getBBox(),
						f = h.x,
						p = h.y,
						d = h.width,
						b = h.height,
						y = l[0],
						v = l[1],
						g = f + y,
						m = p + v,
						w = g + d / 2,
						x = m + b / 2;
					if ("rotate" !== t && ht(n, o, {
							x: g,
							y: m,
							width: d,
							height: b,
							angle: a * i
						}), "drag" === t) {
						if (0 === y && 0 === v) return;
						s.removeAttribute("transform");
						var _ = [];
						"g" === this.el.tagName.toLowerCase() ? (this.el.childNodes.forEach(function (t) {
							1 === t.nodeType && _.push(t)
						}), this.el.removeAttribute("transform")) : _.push(this.el), _.forEach(function (t) {
							! function (e, t) {
								var r = t.x,
									n = t.y,
									o = t.angle,
									a = t.centerX,
									i = t.centerY,
									s = [
										["transform", "rotate(".concat(o, " ").concat(a, " ").concat(i, ")")]
									];
								switch (e.tagName.toLowerCase()) {
									case "text":
									case "rect":
										var c = Number(e.getAttribute("x")) + r,
											u = Number(e.getAttribute("y")) + n;
										s.push(["x", c], ["y", u]);
										break;
									case "circle":
									case "ellipse":
										var l = Number(e.getAttribute("cx")) + r,
											h = Number(e.getAttribute("cy")) + n;
										s.push(["cx", l], ["cy", h]);
										break;
									case "line":
										var f = Number(e.getAttribute("x1")) + r,
											p = Number(e.getAttribute("y1")) + n,
											d = Number(e.getAttribute("x2")) + r,
											b = Number(e.getAttribute("y2")) + n;
										s.push(["x1", f], ["y1", p], ["x2", d], ["y2", b]);
										break;
									case "polygon":
									case "polyline":
										var y = bt(e.getAttribute("points")),
											v = y.map(function (t) {
												return t[0] = Number(t[0]) + r, t[1] = Number(t[1]) + n, t.join(" ")
											}).join(" ");
										s.push(["points", v]);
										break;
									case "path":
										var g = e.getAttribute("d");
										s.push(["d", function (t) {
											for (var e = t.path, r = t.x, n = t.y, o = Wt(e), a = "", i = !0, s = 0, c = o.length; s < c; s++) {
												var u = o[s],
													l = u.value,
													h = u.key,
													f = u.relative;
												switch (h) {
													case "M":
														if (f && !i) break;
														l[0] = l[0] + r, l[1] = l[1] + n;
														break;
													case "A":
														if (f) break;
														l[5] = l[5] + r, l[6] = l[6] + n;
														break;
													case "C":
														if (f) break;
														l[0] = l[0] + r, l[1] = l[1] + n, l[2] = l[2] + r, l[3] = l[3] + n, l[4] = l[4] + r, l[5] = l[5] + n;
														break;
													case "H":
														if (f) break;
														l[0] = l[0] + r;
														break;
													case "V":
														if (f) break;
														l[0] = l[0] + n;
														break;
													case "L":
													case "T":
														if (f) break;
														l[0] = l[0] + r, l[1] = l[1] + n;
														break;
													case "Q":
													case "S":
														if (f) break;
														l[0] = l[0] + r, l[1] = l[1] + n, l[2] = l[2] + r, l[3] = l[3] + n;
														break;
													case "Z":
														l[0] = ""
												}
												a += u.cmd + u.value.join(",") + " ", i = !1
											}
											return a
										}({
											path: g,
											x: r,
											y: n
										})])
								}
								s.forEach(function (t) {
									e.setAttribute(t[0], t[1])
								})
							}(t, {
								x: y,
								y: v,
								angle: a * i * pt,
								centerX: w,
								centerY: x
							})
						})
					}
					if ("resize" === t) {
						if (X(c)) return;
						var k = [],
							M = c.revX,
							A = c.revY,
							E = c.scaleX,
							O = c.scaleY,
							S = c.diffX,
							j = c.diffY,
							T = !1;
						"g" === this.el.tagName.toLowerCase() ? (this.el.childNodes.forEach(function (t) {
							1 === t.nodeType && k.push(t)
						}), T = !0) : k.push(this.el), k.forEach(function (t) {
							! function (e, t) {
								var r = t.scaleX,
									n = t.scaleY,
									o = t.diffX,
									a = t.diffY,
									i = t.revX,
									s = t.revY,
									c = t.angle,
									u = t.centerX,
									l = t.centerY,
									h = t.bBox,
									f = t.store,
									p = f.onRightEdge,
									d = f.onLeftEdge,
									b = f.onTopEdge,
									y = f.onBottomEdge,
									v = f.center,
									g = h.x,
									m = h.y,
									w = h.width,
									x = h.height,
									_ = 0,
									k = 0;
								p && (_ = g);
								d && (_ = g + w);
								b && (k = m + x);
								y && (k = m);
								var M = {
										centerX: v.left,
										centerY: v.top,
										newCenterX: u,
										newCenterY: l,
										angle: c
									},
									A = [
										["transform", "rotate(".concat(c * pt, " ").concat(u, " ").concat(l, ")")]
									];
								switch (e.tagName.toLowerCase()) {
									case "text":
										var E = Number(e.getAttribute("x")),
											O = Number(e.getAttribute("y")),
											S = Gt(dt({
												x: te(E, o, _, w),
												y: te(O, a, k, x)
											}, M)),
											j = S.resX,
											T = S.resY;
										A.push(["x", j + (r < 0 ? w : 0)], ["y", T + (n < 0 ? x : 0)]);
										break;
									case "circle":
										var X = Number(e.getAttribute("r")),
											Y = Number(e.getAttribute("cx")),
											N = Number(e.getAttribute("cy")),
											P = X * (Math.abs(r) + Math.abs(n)) / 2,
											C = Gt(dt({
												x: te(Y, o, _, w),
												y: te(N, a, k, x)
											}, M)),
											D = C.resX,
											L = C.resY;
										A.push(["r", P], ["cx", D], ["cy", L]);
										break;
									case "rect":
										var z = Number(e.getAttribute("width")),
											R = Number(e.getAttribute("height")),
											B = Number(e.getAttribute("x")),
											F = Number(e.getAttribute("y")),
											I = Gt(dt({
												x: te(B, o, _, w),
												y: te(F, a, k, x)
											}, M)),
											U = I.resX,
											q = I.resY,
											V = z * Math.abs(r),
											H = R * Math.abs(n);
										A.push(["x", U - (r < 0 ? V : 0)], ["y", q - (n < 0 ? H : 0)], ["width", V], ["height", H]);
										break;
									case "ellipse":
										var K = Number(e.getAttribute("rx")),
											Q = Number(e.getAttribute("ry")),
											Z = Number(e.getAttribute("cx")),
											G = Number(e.getAttribute("cy")),
											$ = Gt(dt({
												x: te(Z, o, _, w),
												y: te(G, a, k, x)
											}, M)),
											J = $.resX,
											W = $.resY;
										A.push(["rx", K * Math.abs(r)], ["ry", Q * Math.abs(n)], ["cx", J], ["cy", W]);
										break;
									case "line":
										var tt = Number(e.getAttribute("x1")),
											et = Number(e.getAttribute("y1")),
											rt = Number(e.getAttribute("x2")),
											nt = Number(e.getAttribute("y2")),
											ot = Gt(dt({
												x: te(tt, o, _, w),
												y: te(et, a, k, x)
											}, M)),
											at = ot.resX,
											it = ot.resY,
											st = Gt(dt({
												x: te(rt, o, _, w),
												y: te(nt, a, k, x)
											}, M)),
											ct = st.resX,
											ut = st.resY;
										A.push(["x1", at], ["y1", it], ["x2", ct], ["y2", ut]);
										break;
									case "polygon":
									case "polyline":
										var lt = bt(e.getAttribute("points")),
											ht = lt.map(function (t) {
												var e = Gt(dt({
														x: te(Number(t[0]), o, _, w),
														y: te(Number(t[1]), a, k, x)
													}, M)),
													r = e.resX,
													n = e.resY;
												return t[0] = r, t[1] = n, t.join(" ")
											}).join(" ");
										A.push(["points", ht]);
										break;
									case "path":
										var ft = e.getAttribute("d");
										A.push(["d", function (t) {
											for (var e = t.bBox, r = t.path, n = t.baseData, o = t.dx, a = t.dy, i = t.revX, s = t.revY, c = t.fixedX, u = t.fixedY, l = Wt(r), h = e.width, f = e.height, p = "", d = [], b = !0, y = 0, v = l.length; y < v; y++) {
												var g = l[y],
													m = g.value,
													w = g.key,
													x = g.relative;
												switch (w) {
													case "A":
														var _ = Jt(m, 7),
															k = _[0],
															M = _[1],
															A = _[2],
															E = _[3],
															O = _[4],
															S = _[5],
															j = _[6],
															T = re(i),
															X = re(s),
															Y = [],
															N = k + o * T * (k / h),
															P = M + a * X * (M / f);
														if (Y.push(N, P, A, E, O), x) Y.push(ee(S, o * T, h), ee(j, a * X, f));
														else {
															var C = Gt($t({
																	x: te(S, o, c, h),
																	y: te(j, a, u, f)
																}, n)),
																D = C.resX,
																L = C.resY;
															Y.push(D, L)
														}
														d.push(Y);
														break;
													case "C":
														var z = Jt(m, 6),
															R = z[0],
															B = z[1],
															F = z[2],
															I = z[3],
															U = z[4],
															q = z[5];
														if (x) {
															var V = re(i),
																H = re(s);
															d.push([ee(R, o * V, h), ee(B, a * H, f), ee(F, o * V, h), ee(I, a * H, f), ee(U, o * V, h), ee(q, a * H, f)])
														} else {
															var K = s && u < B || !s && B < u ? -1 : 1,
																Q = i && c < F || !i && F < c ? -1 : 1,
																Z = s && u < I || !s && I < u ? -1 : 1,
																G = Gt($t({
																	x: te(R, o * (i && c < R || !i && R < c ? -1 : 1), c, h),
																	y: te(B, a * K, u, f)
																}, n)),
																$ = G.resX,
																J = G.resY,
																W = Gt($t({
																	x: te(F, o * Q, c, h),
																	y: te(I, a * Z, u, f)
																}, n)),
																tt = W.resX,
																et = W.resY,
																rt = Gt($t({
																	x: te(U, o, c, h),
																	y: te(q, a, u, f)
																}, n)),
																nt = rt.resX,
																ot = rt.resY;
															d.push([$, J, tt, et, nt, ot])
														}
														break;
													case "H":
														if (x) {
															var at = re(i);
															d.push([ee(m[0], o * at, h)])
														} else {
															var it = Gt($t({
																x: te(m[0], o, c, h),
																y: 0
															}, n)).resX;
															d.push([it])
														}
														break;
													case "V":
														if (x) {
															var st = re(s);
															d.push([ee(m[0], a * st, f)])
														} else {
															var ct = Gt($t({
																x: 0,
																y: te(m[0], a, u, f)
															}, n)).resY;
															d.push([ct])
														}
														break;
													case "T":
													case "L":
														if (x) {
															var ut = re(i),
																lt = re(s);
															d.push([ee(m[0], o * ut, h), ee(m[1], a * lt, f)])
														} else {
															var ht = Gt($t({
																	x: te(m[0], o, c, h),
																	y: te(m[1], a, u, f)
																}, n)),
																ft = ht.resX,
																pt = ht.resY;
															d.push([ft, pt])
														}
														break;
													case "M":
														var dt = Jt(m, 2),
															bt = dt[0],
															yt = dt[1];
														if (x && !b) {
															var vt = re(i),
																gt = re(s);
															d.push([ee(bt, o * vt, h), ee(yt, a * gt, f)])
														} else {
															var mt = Gt($t({
																	x: te(bt, o, c, h),
																	y: te(yt, a, u, f)
																}, n)),
																wt = mt.resX,
																xt = mt.resY;
															d.push([wt, xt])
														}
														break;
													case "Q":
														var _t = Jt(m, 4),
															kt = _t[0],
															Mt = _t[1],
															At = _t[2],
															Et = _t[3];
														if (x) {
															var Ot = re(i),
																St = re(s);
															d.push([ee(kt, o * Ot, h), ee(Mt, a * St, f), ee(At, o * Ot, h), ee(Et, a * St, f)])
														} else {
															var jt = s && u < Mt || !s && Mt < u ? -1 : 1,
																Tt = Gt($t({
																	x: te(kt, o * (i && c < kt || !i && kt < c ? -1 : 1), c, h),
																	y: te(Mt, a * jt, u, f)
																}, n)),
																Xt = Tt.resX,
																Yt = Tt.resY,
																Nt = Gt($t({
																	x: te(At, o, c, h),
																	y: te(Et, a, u, f)
																}, n)),
																Pt = Nt.resX,
																Ct = Nt.resY;
															d.push([Xt, Yt, Pt, Ct])
														}
														break;
													case "S":
														var Dt = Jt(m, 4),
															Lt = Dt[0],
															zt = Dt[1],
															Rt = Dt[2],
															Bt = Dt[3];
														if (x) {
															var Ft = re(i),
																It = re(s);
															d.push([ee(Lt, o * Ft, h), ee(zt, a * It, f), ee(Rt, o * Ft, h), ee(Bt, a * It, f)])
														} else {
															var Ut = s && u < zt || !s && zt < u ? -1 : 1,
																qt = Gt($t({
																	x: te(Lt, o * (i && c < Lt || !i && Lt < c ? -1 : 1), c, h),
																	y: te(zt, a * Ut, u, f)
																}, n)),
																Vt = qt.resX,
																Ht = qt.resY,
																Kt = Gt($t({
																	x: te(Rt, o, c, h),
																	y: te(Bt, a, u, f)
																}, n)),
																Qt = Kt.resX,
																Zt = Kt.resY;
															d.push([Vt, Ht, Qt, Zt])
														}
														break;
													case "Z":
														d.push([""])
												}
												p += g.cmd + d[y].join(",") + " ", b = !1
											}
											return p
										}({
											bBox: h,
											path: ft,
											baseData: M,
											dx: o,
											dy: a,
											revX: i,
											revY: s,
											fixedX: _,
											fixedY: k
										})])
								}
								A.forEach(function (t) {
									e.setAttribute(t[0], t[1])
								})
							}(t, {
								scaleX: E,
								scaleY: O,
								diffX: S * re(M),
								diffY: j * re(A),
								revX: M,
								revY: A,
								angle: a * i,
								factor: i,
								centerX: w,
								centerY: x,
								bBox: !0 === T ? u.bBox : t.getBBox(),
								store: e.storage
							})
						}), this.storage.cached = null
					}
				}
			}, {
				key: "onRefreshState",
				value: function (e) {
					var r = this.storage,
						n = function (t) {
							var e = t.factor,
								r = t.revX,
								n = t.revY,
								o = this.storage,
								a = o.box,
								i = o.handles,
								s = o.snap,
								c = S(i.tl),
								u = S(i.tr),
								l = Math.atan2(u.y - c.y, u.x - c.x) * e,
								h = a.getBBox(),
								f = h.width,
								p = h.height,
								d = h.x,
								b = h.y,
								y = N(d, b, f, p, l, r, n),
								v = S(a);
							return {
								transform: {
									orig: this.el.getAttribute("transform"),
									value: a.getAttribute("transform"),
									scaleX: r ? f + d : d,
									scaleY: n ? p + b : b,
									bBox: h
								},
								cw: f,
								ch: p,
								center: {
									x: v.left + f / 2,
									y: v.top + p / 2,
									left: d + f / 2,
									top: b + p / 2
								},
								left: T(d, s.x),
								top: T(b, s.y),
								coordX: y.left,
								coordY: y.top,
								factor: e,
								refang: l
							}
						}.call(this, e);
					Object.keys(e).forEach(function (t) {
						r[t] = e[t]
					}), Object.keys(n).forEach(function (t) {
						r[t] = n[t]
					})
				}
			}]) && J(e.prototype, r), n && J(e, n), o
		}();

	function it(t) {
		var e = this.storage,
			r = e.box,
			n = e.handles,
			o = e.snap,
			a = e.parent,
			i = O(t.target),
			s = 1,
			c = i.is(n.tl) || i.is(n.ml) || i.is(n.bl) || i.is(n.tc),
			u = i.is(n.tl) || i.is(n.tr) || i.is(n.tc) || i.is(n.ml);
		(i.is(n.tr) || i.is(n.bl)) && (s = -1);
		var l = S(n.tl),
			h = S(n.tr),
			f = Math.atan2(h.top - l.top, h.left - l.left) * s,
			p = r.getBBox(),
			d = p.width,
			b = p.height,
			y = p.x,
			v = p.y,
			g = N(y, v, d, b, f, c, u),
			m = S(r),
			w = m.left + d / 2,
			x = m.top + b / 2,
			_ = Math.atan2(t.pageY - x, t.pageX - w),
			k = i.is(n.tl) || i.is(n.tc) || i.is(n.tr),
			M = i.is(n.tl) || i.is(n.ml) || i.is(n.bl),
			A = i.is(n.tr) || i.is(n.mr) || i.is(n.br),
			E = i.is(n.br) || i.is(n.bc) || i.is(n.bl);
		return {
			transform: {
				orig: this.el.getAttribute("transform"),
				value: r.getAttribute("transform"),
				scaleX: c ? d + y : y,
				scaleY: u ? b + v : v,
				bBox: p
			},
			parentScale: Y(a.getAttribute("transform") || "scale(1 1)").scale,
			cw: d,
			ch: b,
			center: {
				x: m.left + d / 2,
				y: m.top + b / 2,
				left: y + d / 2,
				top: v + b / 2
			},
			left: T(y, o.x),
			top: T(v, o.y),
			coordX: g.left,
			coordY: g.top,
			factor: s,
			pressang: _,
			refang: f,
			revX: c,
			revY: u,
			handle: i,
			onTopEdge: k,
			onLeftEdge: M,
			onRightEdge: A,
			onBottomEdge: E
		}
	}

	function st(t, e, r, n) {
		var o = this.storage,
			a = o.box,
			i = o.handles,
			s = o.snap,
			c = o.left,
			u = o.top,
			l = o.coordX,
			h = o.coordY,
			f = o.refang,
			p = o.factor,
			d = o.cw,
			b = o.ch,
			y = o.transform,
			v = this.el,
			g = Number(a.getAttribute("width")),
			m = Number(a.getAttribute("height"));
		if (null !== t && (g = j(t, s.x)), null !== e && (m = j(e, s.y)), !(Math.abs(g) < 2 || Math.abs(m) < 2)) {
			var w = N(c, u, g, m, f, r, n),
				x = u - (w.top - h);
			ht(a, i, {
				x: c - (w.left - l),
				y: x,
				width: g,
				height: m,
				angle: f * p
			});
			var _ = g / d,
				k = m / b;
			this.storage.cached = {
				scaleX: _,
				scaleY: k,
				diffX: g - d,
				diffY: m - b,
				revX: r,
				revY: n
			};
			var M = y.scaleX,
				A = y.scaleY,
				E = "translate(".concat(M, " ").concat(A, ") scale(").concat(_, " ").concat(k, ") translate(").concat(-M, " ").concat(-A, ")");
			if ("g" === v.tagName.toLowerCase()) v.childNodes.forEach(function (t) {
				if (1 === t.nodeType) {
					var e = t.getAttribute("transform") || "";
					t.setAttribute("transform", e.replace(ot, E))
				}
			});
			else {
				var O = v.getAttribute("transform") || "";
				v.setAttribute("transform", O.replace(ot, E))
			}
		}
	}

	function ct(t, e) {
		var r = this.storage,
			n = r.snap,
			o = r.transform,
			a = r.wrapper,
			i = o.orig || "",
			s = j(e, n.x),
			c = j(t, n.y),
			u = "translate(".concat(s, " ").concat(c, ")"),
			l = i.replace(/translate\(.+\)|^/, u);
		a.setAttribute("transform", u), this.el.setAttribute("transform", l)
	}

	function ut(t) {
		var e = this.storage,
			r = e.refang,
			n = e.snap,
			o = e.center,
			a = e.box,
			i = e.handles,
			s = j(r + t, n.angle),
			c = "rotate(".concat(s * pt, " ").concat(o.left, " ").concat(o.top, ")");
		a.setAttribute("transform", c), Object.keys(i).forEach(function (t) {
			i[t].setAttribute("transform", c)
		}), "g" === this.el.tagName.toLowerCase() ? this.el.childNodes.forEach(function (t) {
			1 === t.nodeType && t.setAttribute("transform", c)
		}) : this.el.setAttribute("transform", c)
	}

	function lt(t) {
		return document.createElementNS("http://www.w3.org/2000/svg", t)
	}

	function ht(e, r, t) {
		var n = t.x,
			o = t.y,
			a = t.width,
			i = t.height,
			s = t.angle,
			c = a / 2,
			u = i / 2,
			l = "rotate(".concat(s * pt, " ").concat(n + c, " ").concat(o + u, ")"),
			h = {
				tl: [n, o],
				ml: [n, o + u],
				bl: [n, o + i],
				tc: [n + c, o],
				tr: [n + a, o],
				mr: [n + a, o + u],
				br: [n + a, o + i],
				bc: [n + c, o + i],
				rotator: [n + c, o - rt + (i < 0 ? i : 0)]
			},
			f = {
				x: n += a < 0 ? a : 0,
				y: o += i < 0 ? i : 0,
				width: Math.abs(a),
				height: Math.abs(i),
				transform: l
			};
		Object.keys(f).forEach(function (t) {
			e.setAttribute(t, f[t])
		}), Object.keys(r).forEach(function (t) {
			var e = r[t];
			e.setAttribute("cx", h[t][0]), e.setAttribute("cy", h[t][1]), e.setAttribute("transform", l)
		})
	}

	function bt(t) {
		return t.match(nt).reduce(function (t, e, r, n) {
			return r % 2 == 0 && t.push(n.slice(r, r + 2)), t
		}, [])
	}

	function ft(t) {
		return (ft = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		})(t)
	}

	function yt(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}
	var vt = function () {
		function r(t, e) {
			! function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}(this, r), this.el = t, this.options = e || {}, this.storage = null, this._onMouseDown = this._onMouseDown.bind(this), this._onTouchStart = this._onTouchStart.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this.enable()
		}
		var t, e, n;
		return t = r, (e = [{
			key: "enable",
			value: function () {
				X(this.storage) ? this._init() : s("Already enabled")
			}
		}, {
			key: "disable",
			value: function () {
				(function () {
					if (X(this.storage)) return;
					O(this.el).off("mousedown", this._onMouseDown).off("touchstart", this._onTouchStart), delete this.storage
				}).call(this)
			}
		}, {
			key: "_init",
			value: function () {
				(function () {
					var t = O(this.el),
						e = this.options,
						r = e.style,
						p = e.drop,
						n = e.appendTo,
						o = e.stack,
						a = {
							width: t.css("width"),
							height: t.css("height"),
							margin: 0,
							padding: 0,
							position: "absolute"
						};
					X(r) ? (a.border = "#32B5FE 1px dashed", a.background = "transparent", a.transform = "none") : "object" === ft(r) && (a = function (o) {
						for (var t = 1; t < arguments.length; t++) {
							var a = null != arguments[t] ? arguments[t] : {},
								e = Object.keys(a);
							"function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(a).filter(function (t) {
								return Object.getOwnPropertyDescriptor(a, t).enumerable
							}))), e.forEach(function (t) {
								var e, r, n;
								e = o, n = a[r = t], r in e ? Object.defineProperty(e, r, {
									value: n,
									enumerable: !0,
									configurable: !0,
									writable: !0
								}) : e[r] = n
							})
						}
						return o
					}({}, r));
					var i = function () {};
					f(p) && (i = function (t) {
						var e, r, n, o, a, i, s, c, u = this.storage,
							l = u.clone,
							h = u.stack,
							f = !0;
						d(h) && (e = h, r = S(l), n = r.top, o = r.left, a = S(e), i = a.top, s = a.left, c = O(e), f = !(n < i || n > i + c.css("height") || o < s || o > s + c.css("width"))), f && p.call(this, t, this.el, l)
					});
					var s = {
						onDrop: i,
						options: this.options,
						css: a,
						parent: O(n || "body")[0],
						stack: O(o)[0]
					};
					this.storage = s, t.on("mousedown", this._onMouseDown).on("touchstart", this._onTouchStart)
				}).call(this)
			}
		}, {
			key: "_draw",
			value: function (t) {
				(function (c) {
					var u = this;
					! function t() {
						var e = u.storage;
						e.frameId = z(t);
						var r = e.doDraw,
							n = e.pageX,
							o = e.pageY,
							a = e.cx,
							i = e.cy;
						if (!r) return;
						e.doDraw = !1;
						var s = "translate(".concat(n - a, "px, ").concat(o - i, "px)");
						O(c).css({
							transform: s,
							webkitTranform: s,
							mozTransform: s,
							msTransform: s,
							otransform: s
						})
					}()
				}).call(this, t)
			}
		}, {
			key: "_onMouseDown",
			value: function (t) {
				gt.call(this, t), O(document).on("mousemove", this._onMouseMove).on("mouseup", this._onMouseUp)
			}
		}, {
			key: "_onMouseMove",
			value: function (t) {
				mt.call(this, t)
			}
		}, {
			key: "_onMouseUp",
			value: function (t) {
				wt.call(this, t), O(document).off("mousemove", this._onMouseMove).off("mouseup", this._onMouseUp)
			}
		}, {
			key: "_onTouchStart",
			value: function (t) {
				gt.call(this, t.touches[0]), O(document).on("touchmove", this._onTouchMove).on("touchend", this._onTouchEnd)
			}
		}, {
			key: "_onTouchMove",
			value: function (t) {
				mt.call(this, t.touches[0])
			}
		}, {
			key: "_onTouchEnd",
			value: function (t) {
				0 === t.touches.length && wt.call(this, t.changedTouches[0]), O(document).off("touchmove", this._onTouchMove).off("touchend", this._onTouchEnd)
			}
		}]) && yt(t.prototype, e), n && yt(t, n), r
	}();

	function gt(t) {
		t.stopImmediatePropagation && t.stopImmediatePropagation();
		var e = this.storage,
			r = this.el,
			n = e.options,
			o = e.parent,
			a = e.css,
			i = "clone" === n.style ? r.cloneNode(!0) : document.createElement("div"),
			s = S(o);
		a.left = "".concat(t.pageX - s.left, "px"), a.top = "".concat(t.pageY - s.top, "px"), O(i).css(a), e.pageX = t.pageX, e.pageY = t.pageY, e.cx = t.pageX, e.cy = t.pageY, e.clone = i, O(o)[0].appendChild(i), this._draw(i)
	}

	function mt(t) {
		t.preventDefault && t.preventDefault();
		var e = this.storage;
		e.pageX = t.pageX, e.pageY = t.pageY, e.doDraw = !0, e.doMove = !0
	}

	function wt(t) {
		t.stopImmediatePropagation && t.stopImmediatePropagation();
		var e = this.storage,
			r = e.clone,
			n = e.frameId,
			o = e.onDrop;
		e.doDraw = !1, a(n), X(r) || (o.call(this, t), r.parentNode.removeChild(r), delete e.clone)
	}

	function xt(t) {
		return (xt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
			return typeof t
		} : function (t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		})(t)
	}

	function _t(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
		}
	}

	function kt(t, e) {
		return !e || "object" !== xt(e) && "function" != typeof e ? function (t) {
			if (void 0 !== t) return t;
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
		}(t) : e
	}

	function Mt(t) {
		return (Mt = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
			return t.__proto__ || Object.getPrototypeOf(t)
		})(t)
	}

	function At(t, e) {
		return (At = Object.setPrototypeOf || function (t, e) {
			return t.__proto__ = e, t
		})(t, e)
	}
	/* @license
	 * Move/Rotate/Resize tool
	 * Released under the MIT license, 2018-2019
	 * nichollascarter@gmail.com
	 */
	var Et = function (t) {
		function e(t) {
			return function (t, e) {
				if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
			}(this, e), kt(this, Mt(e).call(this, t))
		}
		var r, n, o;
		return function (t, e) {
			if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
			t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			}), e && At(t, e)
		}(e, h), r = e, (n = [{
			key: "drag",
			value: function (t) {
				return function (e) {
					if (this.length) {
						var r = new u;
						return i.call(this, function (t) {
							return t instanceof SVGElement ? new at(t, e, r) : new F(t, e, r)
						})
					}
				}.call(this, t)
			}
		}, {
			key: "clone",
			value: function (t) {
				return function (e) {
					if (this.length) return i.call(this, function (t) {
						return new vt(t, e)
					})
				}.call(this, t)
			}
		}]) && _t(r.prototype, n), o && _t(r, o), e
	}();
	e.default = function (t) {
		return new Et(t)
	}
}]).default;
//# sourceMappingURL=subjx.js.map