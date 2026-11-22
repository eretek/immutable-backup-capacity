/*! Eretek Online Araçlar #60 — Immutable Backup Kapasite Senaryosu */
ERT.def('60', {
	run: function (v, c) {
		var gen = v.gen === null || v.gen === undefined ? 10 : v.gen, fe = v.full || 0, inc = v.full0 * v.change / 100;
		var calc = function (days) { var f = fe > 0 ? Math.ceil(days / fe) + 1 : 1, i = fe > 0 ? days - (f - 1) : days; return { f: f, i: Math.max(0, i), cap: f * v.full0 + Math.max(0, i) * inc }; };
		var plain = calc(v.ret), effDays = Math.max(v.ret, v.imm) + gen, im = calc(effDays), d = im.cap - plain.cap;
		var msgs = [['info', c.t('eff', { d: effDays, r: v.ret, i: v.imm, g: gen })]];
		if (v.imm > v.ret) { msgs.push(['warn', c.t('immLong')]); }
		if (fe === 0) { msgs.push(['warn', c.t('fi')]); }
		msgs.push(['info', c.t('note')]);
		var T = function (x) { return c.n(x, 2) + ' TB'; };
		return { big: T(im.cap), kv: [[c.t('effD'), effDays + ' ' + c.t('days')], [c.t('fulls'), im.f], [c.t('incs'), im.i], [c.t('plain'), T(plain.cap)], [c.t('imm'), T(im.cap)], [c.t('delta'), T(d) + ' (+' + c.pct(plain.cap ? d / plain.cap : 0, 0) + ')']], msgs: msgs, x: { copy: c.t('imm') + ': ' + T(im.cap) }, v: { cap: Math.round(im.cap * 1000) / 1000, plain: Math.round(plain.cap * 1000) / 1000, effDays: effDays } };
	}
});
