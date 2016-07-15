THREE.RenderableObject = function() {
	this.id = 0, this.object = null, this.z = 0
}, THREE.RenderableFace = function() {
	this.id = 0, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.normalModel = new THREE.Vector3, this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.vertexNormalsLength = 0, this.color = new THREE.Color, this.material = null, this.uvs = [new THREE.Vector2, new THREE.Vector2, new THREE.Vector2], this.z = 0
}, THREE.RenderableVertex = function() {
	this.position = new THREE.Vector3, this.positionWorld = new THREE.Vector3, this.positionScreen = new THREE.Vector4, this.visible = !0
}, THREE.RenderableVertex.prototype.copy = function(e) {
	this.positionWorld.copy(e.positionWorld), this.positionScreen.copy(e.positionScreen)
}, THREE.RenderableLine = function() {
	this.id = 0, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.vertexColors = [new THREE.Color, new THREE.Color], this.material = null, this.z = 0
}, THREE.RenderableSprite = function() {
	this.id = 0, this.object = null, this.x = 0, this.y = 0, this.z = 0, this.rotation = 0, this.scale = new THREE.Vector2, this.material = null
}, THREE.Projector = function() {
	function e() {
		if (c === T) {
			var e = new THREE.RenderableObject;
			return R.push(e), T++, c++, e
		}
		return R[c++]
	}

	function t() {
		if (E === y) {
			var e = new THREE.RenderableVertex;
			return x.push(e), y++, E++, e
		}
		return x[E++]
	}

	function i() {
		if (u === w) {
			var e = new THREE.RenderableFace;
			return H.push(e), w++, u++, e
		}
		return H[u++]
	}

	function n() {
		if (v === b) {
			var e = new THREE.RenderableLine;
			return g.push(e), b++, v++, e
		}
		return g[v++]
	}

	function r() {
		if (f === S) {
			var e = new THREE.RenderableSprite;
			return M.push(e), S++, f++, e
		}
		return M[f++]
	}

	function o(e, t) {
		return e.z !== t.z ? t.z - e.z : e.id !== t.id ? e.id - t.id : 0
	}

	function a(e, t) {
		var i = 0,
			n = 1,
			r = e.z + e.w,
			o = t.z + t.w,
			a = -e.z + e.w,
			s = -t.z + t.w;
		return r >= 0 && o >= 0 && a >= 0 && s >= 0 ? !0 : 0 > r && 0 > o || 0 > a && 0 > s ? !1 : (0 > r ? i = Math.max(i, r / (r - o)) : 0 > o && (n = Math.min(n, r / (r - o))), 0 > a ? i = Math.max(i, a / (a - s)) : 0 > s && (n = Math.min(n, a / (a - s))), i > n ? !1 : (e.lerp(t, i), t.lerp(e, 1 - n), !0))
	}
	var s, c, l, E, p, u, h, v, d, f, m, R = [],
		T = 0,
		x = [],
		y = 0,
		H = [],
		w = 0,
		g = [],
		b = 0,
		M = [],
		S = 0,
		z = {
			objects: [],
			lights: [],
			elements: []
		},
		V = new THREE.Vector3,
		j = new THREE.Vector4,
		O = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
		L = new THREE.Box3,
		C = new Array(3),
		k = (new Array(4), new THREE.Matrix4),
		F = new THREE.Matrix4,
		N = new THREE.Matrix4,
		W = new THREE.Matrix3,
		B = new THREE.Frustum,
		P = new THREE.Vector4,
		D = new THREE.Vector4;
	this.projectVector = function(e, t) {
		console.warn("THREE.Projector: .projectVector() is now vector.project()."), e.project(t)
	}, this.unprojectVector = function(e, t) {
		console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."), e.unproject(t)
	}, this.pickingRay = function() {
		console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
	};
	var I = function() {
			var e = [],
				r = [],
				o = null,
				a = null,
				s = new THREE.Matrix3,
				c = function(t) {
					o = t, a = o.material, s.getNormalMatrix(o.matrixWorld), e.length = 0, r.length = 0
				},
				E = function(e) {
					var t = e.position,
						i = e.positionWorld,
						n = e.positionScreen;
					i.copy(t).applyMatrix4(m), n.copy(i).applyMatrix4(F);
					var r = 1 / n.w;
					n.x *= r, n.y *= r, n.z *= r, e.visible = n.x >= -1 && n.x <= 1 && n.y >= -1 && n.y <= 1 && n.z >= -1 && n.z <= 1
				},
				u = function(e, i, n) {
					l = t(), l.position.set(e, i, n), E(l)
				},
				v = function(t, i, n) {
					e.push(t, i, n)
				},
				d = function(e, t) {
					r.push(e, t)
				},
				f = function(e, t, i) {
					return e.visible === !0 || t.visible === !0 || i.visible === !0 ? !0 : (C[0] = e.positionScreen, C[1] = t.positionScreen, C[2] = i.positionScreen, O.isIntersectionBox(L.setFromPoints(C)))
				},
				R = function(e, t, i) {
					return (i.positionScreen.x - e.positionScreen.x) * (t.positionScreen.y - e.positionScreen.y) - (i.positionScreen.y - e.positionScreen.y) * (t.positionScreen.x - e.positionScreen.x) < 0
				},
				T = function(e, t) {
					var i = x[e],
						r = x[t];
					h = n(), h.id = o.id, h.v1.copy(i), h.v2.copy(r), h.z = (i.positionScreen.z + r.positionScreen.z) / 2, h.material = o.material, z.elements.push(h)
				},
				y = function(t, n, c) {
					var l = x[t],
						E = x[n],
						u = x[c];
					if (f(l, E, u) !== !1 && (a.side === THREE.DoubleSide || R(l, E, u) === !0)) {
						p = i(), p.id = o.id, p.v1.copy(l), p.v2.copy(E), p.v3.copy(u), p.z = (l.positionScreen.z + E.positionScreen.z + u.positionScreen.z) / 3;
						for (var h = 0; 3 > h; h++) {
							var v = 3 * arguments[h],
								d = p.vertexNormalsModel[h];
							d.set(e[v], e[v + 1], e[v + 2]), d.applyMatrix3(s).normalize();
							var m = 2 * arguments[h],
								T = p.uvs[h];
							T.set(r[m], r[m + 1])
						}
						p.vertexNormalsLength = 3, p.material = o.material, z.elements.push(p)
					}
				};
			return {
				setObject: c,
				projectVertex: E,
				checkTriangleVisibility: f,
				checkBackfaceCulling: R,
				pushVertex: u,
				pushNormal: v,
				pushUv: d,
				pushLine: T,
				pushTriangle: y
			}
		},
		A = new I;
	this.projectScene = function(l, R, T, y) {
		u = 0, v = 0, f = 0, z.elements.length = 0, l.autoUpdate === !0 && l.updateMatrixWorld(), void 0 === R.parent && R.updateMatrixWorld(), k.copy(R.matrixWorldInverse.getInverse(R.matrixWorld)), F.multiplyMatrices(R.projectionMatrix, k), B.setFromMatrix(F), c = 0, z.objects.length = 0, z.lights.length = 0, l.traverseVisible(function(t) {
			if (t instanceof THREE.Light) z.lights.push(t);
			else if (t instanceof THREE.Mesh || t instanceof THREE.Line || t instanceof THREE.Sprite) {
				if (t.material.visible === !1) return;
				(t.frustumCulled === !1 || B.intersectsObject(t) === !0) && (s = e(), s.id = t.id, s.object = t, V.setFromMatrixPosition(t.matrixWorld), V.applyProjection(F), s.z = V.z, z.objects.push(s))
			}
		}), T === !0 && z.objects.sort(o);
		for (var H = 0, w = z.objects.length; w > H; H++) {
			var g = z.objects[H].object,
				b = g.geometry;
			if (A.setObject(g), m = g.matrixWorld, E = 0, g instanceof THREE.Mesh) {
				if (b instanceof THREE.BufferGeometry) {
					var M = b.attributes,
						S = b.offsets;
					if (void 0 === M.position) continue;
					for (var O = M.position.array, L = 0, C = O.length; C > L; L += 3) A.pushVertex(O[L], O[L + 1], O[L + 2]);
					if (void 0 !== M.normal)
						for (var I = M.normal.array, L = 0, C = I.length; C > L; L += 3) A.pushNormal(I[L], I[L + 1], I[L + 2]);
					if (void 0 !== M.uv)
						for (var G = M.uv.array, L = 0, C = G.length; C > L; L += 2) A.pushUv(G[L], G[L + 1]);
					if (void 0 !== M.index) {
						var U = M.index.array;
						if (S.length > 0)
							for (var H = 0; H < S.length; H++)
								for (var q = S[H], Q = q.index, L = q.start, C = q.start + q.count; C > L; L += 3) A.pushTriangle(U[L] + Q, U[L + 1] + Q, U[L + 2] + Q);
						else
							for (var L = 0, C = U.length; C > L; L += 3) A.pushTriangle(U[L], U[L + 1], U[L + 2])
					} else
						for (var L = 0, C = O.length / 3; C > L; L += 3) A.pushTriangle(L, L + 1, L + 2)
				} else if (b instanceof THREE.Geometry) {
					var X = b.vertices,
						Y = b.faces,
						Z = b.faceVertexUvs[0];
					W.getNormalMatrix(m);
					for (var J = g.material, K = J instanceof THREE.MeshFaceMaterial, $ = K === !0 ? g.material : null, _ = 0, et = X.length; et > _; _++) {
						var tt = X[_];
						if (V.copy(tt), J.morphTargets === !0)
							for (var it = b.morphTargets, nt = g.morphTargetInfluences, rt = 0, ot = it.length; ot > rt; rt++) {
								var at = nt[rt];
								if (0 !== at) {
									var st = it[rt],
										ct = st.vertices[_];
									V.x += (ct.x - tt.x) * at, V.y += (ct.y - tt.y) * at, V.z += (ct.z - tt.z) * at
								}
							}
						A.pushVertex(V.x, V.y, V.z)
					}
					for (var lt = 0, Et = Y.length; Et > lt; lt++) {
						var pt = Y[lt],
							J = K === !0 ? $.materials[pt.materialIndex] : g.material;
						if (void 0 !== J) {
							var ut = J.side,
								ht = x[pt.a],
								vt = x[pt.b],
								dt = x[pt.c];
							if (A.checkTriangleVisibility(ht, vt, dt) !== !1) {
								var ft = A.checkBackfaceCulling(ht, vt, dt);
								if (ut !== THREE.DoubleSide) {
									if (ut === THREE.FrontSide && ft === !1) continue;
									if (ut === THREE.BackSide && ft === !0) continue
								}
								p = i(), p.id = g.id, p.v1.copy(ht), p.v2.copy(vt), p.v3.copy(dt), p.normalModel.copy(pt.normal), ft !== !1 || ut !== THREE.BackSide && ut !== THREE.DoubleSide || p.normalModel.negate(), p.normalModel.applyMatrix3(W).normalize();
								for (var mt = pt.vertexNormals, Rt = 0, Tt = Math.min(mt.length, 3); Tt > Rt; Rt++) {
									var xt = p.vertexNormalsModel[Rt];
									xt.copy(mt[Rt]), ft !== !1 || ut !== THREE.BackSide && ut !== THREE.DoubleSide || xt.negate(), xt.applyMatrix3(W).normalize()
								}
								p.vertexNormalsLength = mt.length;
								var yt = Z[lt];
								if (void 0 !== yt)
									for (var Ht = 0; 3 > Ht; Ht++) p.uvs[Ht].copy(yt[Ht]);
								p.color = pt.color, p.material = J, p.z = (ht.positionScreen.z + vt.positionScreen.z + dt.positionScreen.z) / 3, z.elements.push(p)
							}
						}
					}
				}
			} else if (g instanceof THREE.Line) {
				if (b instanceof THREE.BufferGeometry) {
					var M = b.attributes;
					if (void 0 !== M.position) {
						for (var O = M.position.array, L = 0, C = O.length; C > L; L += 3) A.pushVertex(O[L], O[L + 1], O[L + 2]);
						if (void 0 !== M.index)
							for (var U = M.index.array, L = 0, C = U.length; C > L; L += 2) A.pushLine(U[L], U[L + 1]);
						else
							for (var wt = g.mode === THREE.LinePieces ? 2 : 1, L = 0, C = O.length / 3 - 1; C > L; L += wt) A.pushLine(L, L + 1)
					}
				} else if (b instanceof THREE.Geometry) {
					N.multiplyMatrices(F, m);
					var X = g.geometry.vertices;
					if (0 === X.length) continue;
					ht = t(), ht.positionScreen.copy(X[0]).applyMatrix4(N);
					for (var wt = g.mode === THREE.LinePieces ? 2 : 1, _ = 1, et = X.length; et > _; _++) ht = t(), ht.positionScreen.copy(X[_]).applyMatrix4(N), (_ + 1) % wt > 0 || (vt = x[E - 2], P.copy(ht.positionScreen), D.copy(vt.positionScreen), a(P, D) === !0 && (P.multiplyScalar(1 / P.w), D.multiplyScalar(1 / D.w), h = n(), h.id = g.id, h.v1.positionScreen.copy(P), h.v2.positionScreen.copy(D), h.z = Math.max(P.z, D.z), h.material = g.material, g.material.vertexColors === THREE.VertexColors && (h.vertexColors[0].copy(g.geometry.colors[_]), h.vertexColors[1].copy(g.geometry.colors[_ - 1])), z.elements.push(h)))
				}
			} else if (g instanceof THREE.Sprite) {
				j.set(m.elements[12], m.elements[13], m.elements[14], 1), j.applyMatrix4(F);
				var gt = 1 / j.w;
				j.z *= gt, j.z >= -1 && j.z <= 1 && (d = r(), d.id = g.id, d.x = j.x * gt, d.y = j.y * gt, d.z = j.z, d.object = g, d.rotation = g.rotation, d.scale.x = g.scale.x * Math.abs(d.x - (j.x + R.projectionMatrix.elements[0]) / (j.w + R.projectionMatrix.elements[12])), d.scale.y = g.scale.y * Math.abs(d.y - (j.y + R.projectionMatrix.elements[5]) / (j.w + R.projectionMatrix.elements[13])), d.material = g.material, z.elements.push(d))
			}
		}
		return y === !0 && z.elements.sort(o), z
	}
}, THREE.DeviceOrientationControls = function(e) {
	var t = this;
	this.object = e, this.object.rotation.reorder("YXZ"), this.enabled = !0, this.deviceOrientation = {}, this.screenOrientation = 0;
	var i = function(e) {
			t.deviceOrientation = e
		},
		n = function() {
			t.screenOrientation = window.orientation || 0
		},
		r = function() {
			var e = new THREE.Vector3(0, 0, 1),
				t = new THREE.Euler,
				i = new THREE.Quaternion,
				n = new THREE.Quaternion(-Math.sqrt(.5), 0, 0, Math.sqrt(.5));
			return function(r, o, a, s, c) {
				t.set(a, o, -s, "YXZ"), r.setFromEuler(t), r.multiply(n), r.multiply(i.setFromAxisAngle(e, -c))
			}
		}();
	this.connect = function() {
		n(), window.addEventListener("orientationchange", n, !1), window.addEventListener("deviceorientation", i, !1), t.enabled = !0
	}, this.disconnect = function() {
		window.removeEventListener("orientationchange", n, !1), window.removeEventListener("deviceorientation", i, !1), t.enabled = !1
	}, this.update = function() {
		if (t.enabled !== !1) {
			var e = t.deviceOrientation.alpha ? THREE.Math.degToRad(t.deviceOrientation.alpha) : 0,
				i = t.deviceOrientation.beta ? THREE.Math.degToRad(t.deviceOrientation.beta) : 0,
				n = t.deviceOrientation.gamma ? THREE.Math.degToRad(t.deviceOrientation.gamma) : 0,
				o = t.screenOrientation ? THREE.Math.degToRad(t.screenOrientation) : 0;
			r(t.object.quaternion, e, i, n, o)
		}
	}, this.connect()
};