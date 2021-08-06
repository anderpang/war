// aaa
!function r(A, a, s) {
    function l(e, t) {
        if (!a[e]) {
            if (!A[e]) {
                var n = "function" == typeof require && require;
                if (!t && n)
                    return n(e, !0);
                if (c)
                    return c(e, !0);
                var i = new Error("Cannot find module '" + e + "'");
                throw i.code = "MODULE_NOT_FOUND",
                i
            }
            var o = a[e] = {
                exports: {}
            };
            A[e][0].call(o.exports, function(t) {
                return l(A[e][1][t] || t)
            }, o, o.exports, r, A, a, s)
        }
        return a[e].exports
    }
    for (var c = "function" == typeof require && require, t = 0; t < s.length; t++)
        l(s[t]);
    return l
}({
    1: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (Object.defineProperty(o.prototype, "gameObject", {
            get: function() {
                return this
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(o.prototype, "transform", {
            get: function() {
                return this._transform
            },
            set: function(t) {
                this._transform = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(o.prototype, "name", {
            get: function() {
                return this.transform.name
            },
            set: function(t) {
                this.transform.name = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(o.prototype, "isEmpty", {
            get: function() {
                return this._transform.isEmpty
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(o.prototype, "mesh", {
            get: function() {
                return this._transform.mesh
            },
            enumerable: !0,
            configurable: !0
        }),
        o.Destroy = function(t) {
            t && t.transform.destroy()
        }
        ,
        o.CreateInstance = function(t) {
            return t ? t.isEmpty ? new o : t.transform.mesh ? new o("",t.transform.mesh instanceof BABYLON.Mesh ? t.transform.mesh.createInstance(t.name + "_instance") : t.transform.mesh.sourceMesh.createInstance(t.name + "_instance")) : new o("",null,t.transform.transformNode.clone(t.name + "_intance")) : null
        }
        ,
        o);
        function o(t, e, n) {
            void 0 === e && (e = null),
            void 0 === n && (n = null),
            this._transform = e ? new r("",e) : n ? new r("",null,n) : t ? new r(t) : new r
        }
        n.GameObject = i;
        var r = (Object.defineProperty(A.prototype, "transformNode", {
            get: function() {
                return this._mesh ? this._mesh : this._transformNode ? this._transformNode : null
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "mesh", {
            get: function() {
                return this._mesh
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "isMesh", {
            get: function() {
                return !!this._mesh
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "isEmpty", {
            get: function() {
                return !this._transformNode && !this._mesh
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "name", {
            get: function() {
                return this._name
            },
            set: function(t) {
                this._transformNode && (this._transformNode.name = t),
                this._mesh && (this._mesh.name = t),
                this._name = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "parent", {
            get: function() {
                return this._parent
            },
            set: function(t) {
                this.isEmpty || (t && !t.isEmpty ? (this._transformNode.setParent(t.transformNode),
                this._parent = t) : (this._transformNode.setParent(null),
                this._parent = null))
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "localPosition", {
            get: function() {
                return this.isEmpty ? BABYLON.Vector3.Zero() : (this._tempVec.copyFrom(this.transformNode.position),
                this._tempVec)
            },
            set: function(t) {
                this.isEmpty || (this.transformNode.position = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "position", {
            get: function() {
                return this.isEmpty ? BABYLON.Vector3.Zero() : (this._tempVec.copyFrom(this.transformNode.getAbsolutePosition()),
                this._tempVec)
            },
            set: function(t) {
                this.isEmpty || this.transformNode.setAbsolutePosition(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "localEulerAngles", {
            get: function() {
                if (this.isEmpty)
                    return BABYLON.Vector3.Zero();
                var t = 180 / Math.PI;
                return this.transformNode.rotation.multiplyByFloats(t, t, t)
            },
            set: function(t) {
                if (!this.isEmpty) {
                    var e = Math.PI / 180;
                    this.transformNode.rotation = t.multiplyByFloats(e, e, e)
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "localRotation", {
            get: function() {
                return this.isEmpty ? BABYLON.Vector3.Zero() : (this._tempVec.copyFrom(this.transformNode.rotation),
                this._tempVec)
            },
            set: function(t) {
                this.isEmpty || (this.transformNode.rotation = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "eulerAngles", {
            get: function() {
                if (this.isEmpty)
                    return BABYLON.Vector3.Zero();
                var t = this.transformNode.parent
                  , e = 180 / Math.PI;
                this.transformNode.setParent(null);
                var n = this.transformNode.rotation.multiplyByFloats(e, e, e);
                return this.transformNode.setParent(t),
                n
            },
            set: function(t) {
                if (!this.isEmpty) {
                    var e = this.transformNode.parent
                      , n = Math.PI / 180;
                    this.transformNode.setParent(null),
                    this.transformNode.rotation = t.multiplyByFloats(n, n, n),
                    this.transformNode.setParent(e)
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "rotation", {
            get: function() {
                if (this.isEmpty)
                    return BABYLON.Vector3.Zero();
                var t = this.transformNode.parent;
                return this.transformNode.setParent(null),
                this._tempVec.copyFrom(this.transformNode.rotation),
                this.transformNode.setParent(t),
                this._tempVec
            },
            set: function(t) {
                if (!this.isEmpty) {
                    var e = this.transformNode.parent;
                    this.transformNode.setParent(null),
                    this.transformNode.rotation = t,
                    this.transformNode.setParent(e)
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "childCount", {
            get: function() {
                return 0
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(A.prototype, "hierarchyCount", {
            get: function() {
                return 0
            },
            enumerable: !0,
            configurable: !0
        }),
        A.prototype.translate = function(t, e) {
            this.transformNode && this.transformNode.translate(t, 1, e)
        }
        ,
        A.prototype.translateRelativeTo = function(t, e) {
            if (this.transformNode) {
                var n = t.clone();
                e && e.transformNode && (n = this.transformDirection(n)),
                this.transformNode.translate(n, 1, BABYLON.Space.WORLD)
            }
        }
        ,
        A.prototype.transformPosition = function(t) {
            if (this.transformNode) {
                var e = this.transformNode.computeWorldMatrix();
                return BABYLON.Vector3.TransformCoordinates(t, e)
            }
            return t
        }
        ,
        A.prototype.transformDirection = function(t) {
            if (this.transformNode) {
                var e = this.transformNode.computeWorldMatrix();
                return BABYLON.Vector3.TransformCoordinates(t, e).subtract(this.transformNode.getAbsolutePosition())
            }
            return t
        }
        ,
        A.prototype.inverseTransformPosition = function(t) {
            if (this.transformNode) {
                var e = BABYLON.Matrix.Invert(this.transformNode.computeWorldMatrix());
                return BABYLON.Vector3.TransformCoordinates(t, e)
            }
            return t
        }
        ,
        A.prototype.inverseTransformDirection = function(t) {
            if (this.transformNode) {
                var e = BABYLON.Matrix.Invert(this.transformNode.computeWorldMatrix())
                  , n = BABYLON.Vector3.TransformCoordinates(t, e)
                  , i = BABYLON.Vector3.TransformCoordinates(BABYLON.Vector3.Zero(), e);
                return n.subtract(i)
            }
            return t
        }
        ,
        A.prototype.destroy = function() {
            this.mesh && this.mesh.dispose(),
            this.transformNode && this.transformNode.dispose()
        }
        ,
        A);
        function A(t, e, n) {
            if (void 0 === e && (e = null),
            void 0 === n && (n = null),
            this._transformNode = null,
            this._mesh = null,
            this._name = "",
            this._tempVec = BABYLON.Vector3.Zero(),
            this._parent = null,
            this.forward = BABYLON.Vector3.Forward(),
            this.localScale = new BABYLON.Vector3(1,1,1),
            e ? (this._mesh = e,
            this._transformNode = e,
            this._name = e.name) : n ? (this._mesh = null,
            this._transformNode = n,
            this._name = n.name) : t ? (this._mesh = null,
            this._transformNode = new BABYLON.TransformNode(t),
            this._name = t) : (this._mesh = null,
            this._transformNode = null,
            this._name = ""),
            this._transformNode) {
                var i = this._transformNode.parent;
                i && (i instanceof BABYLON.AbstractMesh ? this._parent = new A(i.name,i) : this._parent = new A(i.name,null,i))
            } else
                this._parent = null
        }
        n.Transform = r
    }
    , {}],
    2: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        function(t) {
            for (var e in t)
                n.hasOwnProperty(e) || (n[e] = t[e])
        }(t("./babylonVariables"))
    }
    , {
        "./babylonVariables": 1
    }],
    3: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var m = t("./globalControl")
          , i = (o.prototype.initTrigger = function() {
            var e = this
              , n = this
              , t = BABYLON.MeshBuilder.CreatePlane("a-trigger1", {
                width: 250,
                height: 200
            }, this._scene);
            t.checkCollisions = !1,
            t.isPickable = !0,
            t.isVisible = !0,
            t.visibility = 0,
            t.position = new BABYLON.Vector3(597.385,137.608,640.023),
            t.actionManager = new BABYLON.ActionManager(this._scene),
            t.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                n._first || (n._first = !1,
                m.GlobalControl.PauseVideo(),
                n.backgroundMusic(!1))
            }
            ));
            var i = BABYLON.MeshBuilder.CreatePlane("a-trigger2", {
                width: 250,
                height: 200
            }, this._scene);
            i.checkCollisions = !1,
            i.isPickable = !0,
            i.isVisible = !0,
            i.visibility = 0,
            i.position = new BABYLON.Vector3(-593.719,137.608,624.38),
            i.actionManager = new BABYLON.ActionManager(this._scene),
            i.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                n._first ? (n._first = !1,
                e.stop(),
                m.GlobalControl.PauseVideo(),
                n.backgroundMusicChange(0)) : (n._first = !0,
                m.GlobalControl.PauseVideo(),
                n.backgroundMusicChange(1))
            }
            ));
            var o = BABYLON.MeshBuilder.CreatePlane("a-trigger-hall-5-1", {
                width: 280,
                height: 250
            }, this._scene);
            o.checkCollisions = !1,
            o.isPickable = !1,
            o.isVisible = !0,
            o.visibility = 0,
            o.position = new BABYLON.Vector3(-593.761,137.608,2514.59),
            o.actionManager = new BABYLON.ActionManager(this._scene),
            o.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                n._first ? (n._first = !1,
                n.backgroundMusicChange(0)) : (n._first = !0,
                n.backgroundMusicChange(1))
            }
            ));
            var r = BABYLON.MeshBuilder.CreatePlane("a-gate1", {
                width: 250,
                height: 200
            }, this._scene);
            r.checkCollisions = !1,
            r.isPickable = !0,
            r.isVisible = !0,
            r.visibility = 0,
            r.position = new BABYLON.Vector3(597.385,137.608,1451.986),
            r.actionManager = new BABYLON.ActionManager(this._scene),
            r.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 1"),
                n.playExhibit(1)
            }
            ));
            var A = BABYLON.MeshBuilder.CreatePlane("a-gate12", {
                width: 250,
                height: 200
            }, this._scene);
            A.checkCollisions = !1,
            A.isPickable = !0,
            A.isVisible = !0,
            A.visibility = 0,
            A.position = new BABYLON.Vector3(597.385,137.608,2285),
            A.actionManager = new BABYLON.ActionManager(this._scene),
            A.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 1"),
                n.playExhibit(1)
            }
            ));
            var a = BABYLON.MeshBuilder.CreatePlane("a-gate2", {
                width: 250,
                height: 200
            }, this._scene);
            a.checkCollisions = !1,
            a.isPickable = !0,
            a.isVisible = !0,
            a.visibility = 0,
            a.position = new BABYLON.Vector3(597.385,137.608,3126.488),
            a.actionManager = new BABYLON.ActionManager(this._scene),
            a.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 2"),
                n.playExhibit(2)
            }
            ));
            var s = BABYLON.MeshBuilder.CreatePlane("a-gate22", {
                width: 250,
                height: 200
            }, this._scene);
            s.checkCollisions = !1,
            s.isPickable = !0,
            s.isVisible = !0,
            s.visibility = 0,
            s.position = new BABYLON.Vector3(597.385,137.608,4161.63),
            s.actionManager = new BABYLON.ActionManager(this._scene),
            s.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 2"),
                n.playExhibit(2)
            }
            ));
            var l = BABYLON.MeshBuilder.CreatePlane("a-gate3", {
                width: 250,
                height: 200
            }, this._scene);
            l.checkCollisions = !1,
            l.isPickable = !0,
            l.isVisible = !0,
            l.visibility = 0,
            l.position = new BABYLON.Vector3(597.385,137.608,4979.63),
            l.actionManager = new BABYLON.ActionManager(this._scene),
            l.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 3"),
                n.playExhibit(3)
            }
            ));
            var c = BABYLON.MeshBuilder.CreatePlane("a-gate32", {
                width: 250,
                height: 200
            }, this._scene);
            c.checkCollisions = !1,
            c.isPickable = !0,
            c.isVisible = !0,
            c.visibility = 0,
            c.position = new BABYLON.Vector3(597.385,137.608,6054.28),
            c.actionManager = new BABYLON.ActionManager(this._scene),
            c.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 3"),
                n.playExhibit(3)
            }
            ));
            var h = BABYLON.MeshBuilder.CreatePlane("a-gate4", {
                width: 250,
                height: 200
            }, this._scene);
            h.checkCollisions = !1,
            h.isPickable = !0,
            h.isVisible = !0,
            h.visibility = 0,
            h.position = new BABYLON.Vector3(-593.761,137.608,6083.69),
            h.actionManager = new BABYLON.ActionManager(this._scene),
            h.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 4"),
                n.playExhibit(4)
            }
            ));
            var d = BABYLON.MeshBuilder.CreatePlane("a-gate42", {
                width: 250,
                height: 200
            }, this._scene);
            d.checkCollisions = !1,
            d.isPickable = !0,
            d.isVisible = !0,
            d.visibility = 0,
            d.position = new BABYLON.Vector3(-593.761,137.608,5216.86),
            d.actionManager = new BABYLON.ActionManager(this._scene),
            d.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 4"),
                n.playExhibit(4)
            }
            ));
            var u = BABYLON.MeshBuilder.CreatePlane("a-gate5", {
                width: 250,
                height: 200
            }, this._scene);
            u.checkCollisions = !1,
            u.isPickable = !0,
            u.isVisible = !0,
            u.visibility = 0,
            u.position = new BABYLON.Vector3(-593.761,137.608,4393.08),
            u.actionManager = new BABYLON.ActionManager(this._scene),
            u.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 5"),
                n.playExhibit(5)
            }
            ));
            var p = BABYLON.MeshBuilder.CreatePlane("a-gate52", {
                width: 250,
                height: 200
            }, this._scene);
            p.checkCollisions = !1,
            p.isPickable = !0,
            p.isVisible = !0,
            p.visibility = 0,
            p.position = new BABYLON.Vector3(-593.761,137.608,3336.53),
            p.actionManager = new BABYLON.ActionManager(this._scene),
            p.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 5"),
                n.playExhibit(5)
            }
            ));
            var f = BABYLON.MeshBuilder.CreatePlane("a-gate6", {
                width: 280,
                height: 250
            }, this._scene);
            f.checkCollisions = !1,
            f.isPickable = !0,
            f.isVisible = !0,
            f.visibility = 0,
            f.position = new BABYLON.Vector3(-593.761,137.608,2512.59),
            f.actionManager = new BABYLON.ActionManager(this._scene),
            f.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 6"),
                n.playExhibit(6)
            }
            ));
            var g = BABYLON.MeshBuilder.CreatePlane("a-gate62", {
                width: 250,
                height: 200
            }, this._scene);
            g.checkCollisions = !1,
            g.isPickable = !0,
            g.isVisible = !0,
            g.visibility = 0,
            g.position = new BABYLON.Vector3(-593.761,137.608,1475.18),
            g.actionManager = new BABYLON.ActionManager(this._scene),
            g.actionManager.registerAction(new BABYLON.ExecuteCodeAction({
                trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
                parameter: m.GlobalControl.personMesh
            },function(t) {
                console.warn("exhibit 6"),
                n.playExhibit(6)
            }
            )),
            m.GlobalControl.stopAudio = n.stop.bind(n)
        }
        ,
        o.prototype.backgroundMusicChange = function(t) {
            t !== this._backgroundIndex && (0 === (this._backgroundIndex = t) ? (this._backgroundActive = this._backgroundMusic1,
            null !== this._backgroundMusic2 && this._backgroundMusic2.pause()) : (this._backgroundActive = this._backgroundMusic2,
            null !== this._backgroundMusic1 && this._backgroundMusic1.pause()),
            this._backgroundPaused ? this._backgroundActive.pause() : this._backgroundActive.play())
        }
        ,
        o.prototype.backgroundMusic = function(t) {
            (this._backgroundPaused = t) ? this._backgroundActive && this._backgroundActive.pause() : this._backInitialized ? this._backgroundActive.isPaused && this._backgroundActive.play() : (this._backgroundIndex = -1,
            this._backInitialized = !0,
            this.backgroundMusicChange(0))
        }
        ,
        o.prototype.playExhibit = function(t) {
            this._record[t] ? (this._activeAudio.pause(),
            m.GlobalControl.PauseVideo(),
            this._record[t] = !1) : (this.stop(),
            1 === t ? (this._exhibit1 = new BABYLON.Sound("Music1","sound/exhibit1.mp3",this._scene,null,{
                loop: !1,
                autoplay: !0
            }),
            this._activeAudio = this._exhibit1) : 2 === t ? (this._exhibit2 = new BABYLON.Sound("Music2","sound/exhibit2.mp3",this._scene,null,{
                loop: !1,
                autoplay: !0
            }),
            this._activeAudio = this._exhibit2) : 3 === t ? (this._exhibit3 = new BABYLON.Sound("Music3","sound/exhibit3.mp3",this._scene,null,{
                loop: !1,
                autoplay: !0
            }),
            this._activeAudio = this._exhibit3) : 4 === t ? (this._exhibit4 = new BABYLON.Sound("Music4","sound/exhibit4.mp3",this._scene,null,{
                loop: !1,
                autoplay: !0
            }),
            this._activeAudio = this._exhibit4) : 5 === t ? (this._exhibit5 = new BABYLON.Sound("Music5","sound/exhibit5.mp3",this._scene,null,{
                loop: !1,
                autoplay: !0
            }),
            this._activeAudio = this._exhibit5) : 6 === t && (this._exhibit6 = new BABYLON.Sound("Music6","sound/exhibit6.mp3",this._scene,null,{
                loop: !1,
                autoplay: !0
            }),
            this._activeAudio = this._exhibit6),
            m.GlobalControl.PauseVideo(),
            this.backgroundMusic(!1),
            this._record[t] = !0)
        }
        ,
        o.prototype.pauseControl = function(t) {
            this._activeAudio && (t ? this._activeAudio.pause() : this._activeAudio.isPaused && this._activeAudio.play()),
            this.backgroundMusic(t)
        }
        ,
        o.prototype.stop = function() {
            this._exhibit1 && this._exhibit1.stop(),
            this._exhibit2 && this._exhibit2.stop(),
            this._exhibit3 && this._exhibit3.stop(),
            this._exhibit4 && this._exhibit4.stop(),
            this._exhibit5 && this._exhibit5.stop(),
            this._exhibit6 && this._exhibit6.stop()
        }
        ,
        o);
        function o(t) {
            this._first = !1,
            this._backInitialized = !1,
            this._backgroundMusic1 = null,
            this._backgroundMusic2 = null,
            this._backgroundActive = null,
            this._backgroundIndex = -1,
            this._backgroundPaused = !1,
            this._record = {},
            this._scene = t,
            this._backgroundMusic1 = new BABYLON.Sound("Music-back","sound/background.mp3",this._scene,null,{
                loop: !0,
                autoplay: !1
            }),
            this._backgroundMusic1.setVolume(.8),
            this._backgroundMusic2 = new BABYLON.Sound("Music-back2","sound/background2.mp3",this._scene,null,{
                loop: !0,
                autoplay: !1
            }),
            this._backgroundMusic2.setVolume(.8),
            this.initTrigger()
        }
        n.AudioControl = i
    }
    , {
        "./globalControl": 8
    }],
    4: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("./globalControl")
          , o = (r.prototype.firstPerson = function() {
            this._camera1 = new BABYLON.UniversalCamera("UniversalCamera",new BABYLON.Vector3(0,125.7,0),this._scene),
            this._camera1.attachControl(this._canvas, !0),
            this._camera1.applyGravity = !0,
            this._camera1.checkCollisions = !0,
            this._camera1.ellipsoid = new BABYLON.Vector3(8,60,8),
            this._camera1.keysUp.push(87),
            this._camera1.keysDown.push(83),
            this._camera1.keysLeft.push(65),
            this._camera1.keysRight.push(68),
            this._camera1.speed = 6,
            this._camera1.touchAngularSensibility = 7e4,
            i.GlobalControl.personMesh = BABYLON.MeshBuilder.CreateSphere("person", {
                diameter: 50,
                updatable: !0
            }, this._scene),
            i.GlobalControl.personMesh.isVisible = !1,
            i.GlobalControl.personMesh.isPickable = !1,
            i.GlobalControl.personMesh.setParent(this._camera1),
            i.GlobalControl.personMesh.position = BABYLON.Vector3.Zero(),
            this._camera2 = new BABYLON.ArcRotateCamera("Camera",-Math.PI / 2,Math.PI / 2,5,BABYLON.Vector3.Zero(),this._scene),
            this._camera2.maxZ = 2e3,
            this._camera2.target = new BABYLON.Vector3(0,6500,0),
            this._camera2.radius = 60,
            this._camera2.alpha = 0,
            this._camera2.beta = Math.PI / 2,
            this._camera2.setEnabled(!1),
            i.GlobalControl.camera360 = this._camera2
           
            // 相机位置
           // this._camera1.position=new BABYLON.Vector3(-976,135,5813);
           // this._camera1.position=new BABYLON.Vector3(-808,135,2329);
        }
        ,
        r.prototype.changeActiveCamera = function(t) {
            "360" === t ? (this._camera1.setEnabled(!1),
            this._camera2.setEnabled(!0),
            this._camera2.target = new BABYLON.Vector3(0,6500,0),
            this._camera2.radius = 60,
            this._camera2.alpha = 0,
            this._camera2.beta = Math.PI / 2,
            this._camera1.detachControl(this._canvas),
            this._camera2.attachControl(this._canvas, !0),
            this._camera2.inputs.attached.mousewheel.detachControl(this._canvas),
            this._scene.activeCamera = this._camera2) : "first" === t && (this._camera1.setEnabled(!0),
            this._camera2.detachControl(this._canvas),
            this._camera1.attachControl(this._canvas, !0),
            this._scene.activeCamera = this._camera1,
            this._camera2.setEnabled(!1))
        }
        ,
        r.prototype.focusCamera = function() {
            this._camera1 = new BABYLON.UniversalCamera("UniversalCamera",new BABYLON.Vector3(0,125.7,0),this._scene),
            this._camera1.attachControl(this._canvas, !0),
            this._camera1.keysUp.push(87),
            this._camera1.keysDown.push(83),
            this._camera1.keysLeft.push(65),
            this._camera1.keysRight.push(68),
            this._camera1.speed = 6,
            this._camera1.touchAngularSensibility = 7e4
        }
        ,
        r.prototype.changeCamera = function() {
            this._camera2 = new BABYLON.ArcRotateCamera("Camera",-Math.PI / 2,Math.PI / 2,5,BABYLON.Vector3.Zero(),this._scene),
            this._camera2.attachControl(this._canvas, !0),
            this._camera2.inputs.attached.mousewheel.detachControl(this._canvas),
            this._camera2.target = new BABYLON.Vector3(0,6500,0),
            this._camera2.radius = 60,
            this._camera2.alpha = 0,
            this._camera2.beta = Math.PI / 2,
            new BABYLON.PhotoDome("testdome","images/360/test1.jpg",{
                resolution: 32,
                size: 1e3
            },this._scene).position = new BABYLON.Vector3(0,6500,0),
            this._scene.activeCamera = this._camera2
        }
        ,
        r.prototype.camera360 = function() {
            new BABYLON.ArcRotateCamera("Camera",-Math.PI / 2,Math.PI / 2,5,BABYLON.Vector3.Zero(),this._scene).attachControl(this._canvas, !0),
            new BABYLON.PhotoDome("testdome","./images/360/nanjing/南京条约史料陈列馆/5展厅内景（第二部分）.jpg",{
                resolution: 64,
                size: 500
            },this._scene)
        }
        ,
        r);
        function r(t, e) {
            this._scene = t,
            this._canvas = e,
            this.firstPerson()
        }
        n.CameraControl = o
    }
    , {
        "./globalControl": 8
    }],
    5: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.prototype.add = function(t) {
            this._names.push(t),
            this._flags.push(!1)
        }
        ,
        o.prototype.done = function(t) {
            var e = this._names.indexOf(t);
            if (-1 < e) {
                this._flags[e] = !0;
                for (var n = 0; n < this._flags.length; n++)
                    if (!this._flags[n])
                        return !1;
                return !0
            }
            return !1
        }
        ,
        o.prototype.resume = function() {
            for (var t = 0; t < this._flags.length; t++)
                this._flags[t] = !1
        }
        ,
        o.prototype.clear = function() {
            this._flags = [],
            this._names = []
        }
        ,
        o);
        function o() {
            this._names = [],
            this._flags = []
        }
        n.EventProxy = i
    }
    , {}],
    6: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var X = t("./uiMain")
          , Y = t("../babylon")
          , H = t("./globalControl")
          , j = t("./veryNetty/SocketManager")
          , Q = t("./veryNetty/VeryNettyPara")
          , S = t("./veryNetty/CallBackManager")
          , K = t("./veryNetty/veryVariables")
          , J = t("./visitDisplay")
          , i = (o.prototype.Co = function(t) {
            t && j.SocketManager.Instance.OperateNum(this.visitNumber, "+", 25, this.Do.bind(this))
        }
        ,
        o.prototype.Do = function() {
            this.visitText.text = this.visitNumber.value.toString(),
            this.visitNumber.value < 100 && (this.visitText.fontSize = "200px"),
            this.visitNumber.value < 1e3 && 100 <= this.visitNumber.value && (this.visitText.fontSize = "150px"),
            1e3 <= this.visitNumber.value && (this.visitText.fontSize = "100px")
        }
        ,
        o.prototype.loadData = function() {
            var e = this;
            axios.get("./data/exhibits.json").then(function(t) {
                e._data = t.data,
                e._success = !0
            }).catch(function(t) {
                console.log("load error: " + t)
            })
        }
        ,
        o.prototype.initUI = function() {
            var n = this
              , i = this;
            this._scene.onPointerObservable.add(function(t) {
                if (t.type === BABYLON.PointerEventTypes.POINTERTAP && 0 === t.event.button && t.pickInfo && t.pickInfo.hit) {
                    if (i.pickedMesh = t.pickInfo.pickedMesh,
                    n._success && !n._record[i.pickedMesh.name] && n._data && n._data[i.pickedMesh.name] && !S.CallBackManager.IsExitDirectSend(3) && !S.CallBackManager.IsExitDirectSend(4))
                        if (n.close(n._lastName),
                        n._lastName = i.pickedMesh.name,
                        j.SocketManager.IsConnceted) {
                            n.comments.clear(),
                            n.totalComments.clear(),
                            n._commentsNumber = 0,
                            n.personlike.value = !1,
                            n.likecount.value = 0,
                            n._tag = !0,
                            n.personlike.name = n._lastName + "personlike",
                            n.comments.name = n._lastName + "comments",
                            n.likecount.name = n._lastName + "likecount",
                            axios.post("http://39.104.131.145:8080/Extra/listVariable", {
                                software: Q.VeryNettyPara.ProjectID,
                                varName: n.pickedMesh.name + "comments",
                                type: "string",
                                start: 0,
                                count: 1
                            }).then(function(t) {
                                "99999" === t.data.code ? console.log("comments获取失败") : (t.data.data.forEach(function(t) {
                                    var e = new K.VeryString("",t);
                                    n.comments.add(e),
                                    j.SocketManager.Instance.OperateList(n.comments, e, "add")
                                }),
                                j.SocketManager.Instance.GetValues([n.personlike], !0, 4, n.run1.bind(n)))
                            }),
                            axios.post("http://39.104.131.145:8080/Extra/listCount", {
                                software: Q.VeryNettyPara.ProjectID,
                                varName: n.pickedMesh.name + "comments"
                            }).then(function(t) {
                                "99999" === t.data.code ? console.log("comments获取失败") : n._commentsNumber = t.data.data
                            }),
                            axios.post("http://39.104.131.145:8080/Extra/listVariable", {
                                software: Q.VeryNettyPara.ProjectID,
                                varName: n.pickedMesh.name + "comments",
                                type: "string",
                                start: 0,
                                count: 999999
                            }).then(function(t) {
                                "99999" === t.data.code ? console.log("comments获取失败") : t.data.data.forEach(function(t) {
                                    var e = new K.VeryString("",t);
                                    n.totalComments.add(e),
                                    j.SocketManager.Instance.OperateList(n.totalComments, e, "add")
                                })
                            });
                            var e = new BABYLON.TransformNode("empty",n._scene);
                            e.setParent(i.pickedMesh),
                            e.rotation = BABYLON.Vector3.Zero(),
                            e.position = new BABYLON.Vector3(0,230 / i.pickedMesh.scaling.y,0),
                            e.setParent(null),
                            n._scene.activeCamera.position.x = e.position.x,
                            n._scene.activeCamera.position.z = e.position.z,
                            n._scene.activeCamera.setTarget(i.pickedMesh.position),
                            e.dispose()
                        } else
                            n.display(n.pickedMesh);
                    n._success && n._record[i.pickedMesh.name] && n._data && n._data[i.pickedMesh.name] && (i.close(),
                    i._tag = !0,
                    i.comments.clear())
                }
            })
        }
        ,
        o.prototype.run1 = function() {
            j.SocketManager.Instance.GetValues([this.likecount], !1, 3, this.run2.bind(this))
        }
        ,
        o.prototype.run2 = function() {
            this.display(this.pickedMesh)
        }
        ,
        o.prototype.display = function(t) {
            this.createParent(t);
            var e = this._data[t.name];
            this.createControlButton(e),
            this.createDisplayPanel(e),
            this._record[t.name] = !0
        }
        ,
        o.prototype.createParent = function(t) {
            this._parent = new BABYLON.TransformNode("parent-" + t.name,this._scene),
            this._parent.setParent(t),
            this._parent.position = BABYLON.Vector3.Zero(),
            this._parent.rotation = BABYLON.Vector3.Zero(),
            this._parent.setParent(null),
            this._parent.scaling = new BABYLON.Vector3(1,1,1),
            this._parentObj = new Y.GameObject("parent",null,this._parent)
        }
        ,
        o.prototype.createControlButton = function(t) {
            this._location.left = !0,
            void 0 !== t.left && !1 === t.left && (this._location.left = !1),
            this._location.left ? (this._location.position1.x = 130,
            this._location.position2.x = 130) : (this._location.position1.x = -130,
            this._location.position2.x = -130),
            this._location.position1.z = 87,
            this._location.y = 20,
            void 0 !== t.y && (this._location.y = t.y),
            this._location.position1.y = this._location.y,
            this._location.position2.y = this._location.y
        }
        ,
        o.prototype.createDisplayPanel = function(e) {
            var A = this
              , n = this
              , t = BABYLON.MeshBuilder.CreatePlane("_ui-exhibits-plane2", {
                height: this._plane2Size,
                width: this._plane2Size
            }, this._scene)
              , i = new Y.GameObject("plane2",t);
            i.transform.parent = this._parentObj.transform,
            i.transform.localPosition = this._location.position2,
            i.transform.localEulerAngles = this._location.angle,
            this._plane2 = t,
            this.meshAdvancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(t),
            this.composePanel = new BABYLON.GUI.StackPanel("displayPanel"),
            this.composePanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this.meshAdvancedTexture2.addControl(this.composePanel);
            var o = new BABYLON.GUI.Rectangle("info-area");
            o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            o.background = "#ffffffB2",
            o.color = "#ffffffB2",
            o.thickness = 0,
            o.cornerRadius = 10,
            o.width = "100%",
            o.height = "600px",
            o.paddingLeft = "50px",
            this.composePanel.addControl(o);
            var r = new BABYLON.GUI.TextBlock("title-chinese");
            if (r.fontSize = 50,
            r.fontStyle = "bold",
            r.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            r.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            r.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            r.text = e.title,
            r.color = "#404040E5",
            r.width = "100%",
            r.height = "120px",
            r.paddingLeft = "30px",
            r.paddingRight = "30px",
            o.addControl(r),
            void 0 !== e.english && "" !== e.english) {
                var a = new BABYLON.GUI.TextBlock("title-english");
                a.fontSize = 35,
                a.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                a.text = e.english,
                a.color = "#404040A5";
                var s = 46 * r.text.length + 40;
                a.left = Math.round(s) + "px",
                a.top = "10px",
                a.width = "100%",
                a.height = "120px",
                a.paddingLeft = "30px",
                a.paddingRight = "30px",
                o.addControl(a)
            }
            var l = new BABYLON.GUI.TextBlock("title-line");
            l.fontSize = 15,
            l.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            l.text = "_______________________________________________________________________________________________________________________________",
            l.width = "100%",
            l.top = "100px",
            l.height = "20px",
            l.paddingLeft = "30px",
            l.paddingRight = "30px",
            l.color = "#404040",
            o.addControl(l);
            var c = new BABYLON.GUI.ScrollViewer("info-scrollview");
            c.barColor = "#ffffff00",
            c.thickness = 0,
            c.barSize = 0,
            c.background = "#CCCCCC00",
            c.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            c.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            c.top = "140px",
            c.width = "100%",
            c.height = "400px",
            c.paddingLeft = "30px",
            c.paddingRight = "30px",
            o.addControl(c);
            var h = new BABYLON.GUI.TextBlock("info-body");
            h.fontSize = 35,
            h.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            h.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            h.text = e.content,
            h.color = "#696969",
            h.top = "0px",
            h.width = "100%",
            h.height = "400px",
            h.textWrapping = !0,
            h.lineSpacing = "10px",
            c.addControl(h);
            var d = Math.ceil(e.content.length / 30);
            o.height = 7 < d ? "580px" : 50 * d + 200 + 50 + "px";
            var u = this._scene.onBeforeCameraRenderObservable.add(function(t) {
                if (h.lines) {
                    var e = 50 * h.lines.length;
                    7 < h.lines.length ? (h.height = e + "px",
                    c.height = "350px",
                    o.height = "580px") : (h.height = e + "px",
                    c.height = e + "px",
                    o.height = 50 * h.lines.length + 200 + 50 + "px")
                }
                A._scene.onBeforeCameraRenderObservable.remove(u)
            })
              , p = new BABYLON.GUI.StackPanel("button-panel");
            if (p.isVertical = !1,
            p.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            p.width = "100%",
            p.height = "80px",
            p.paddingLeft = "30px",
            p.paddingRight = "30px",
            o.addControl(p),
            void 0 !== e.video && "" !== e.video) {
                var f = BABYLON.GUI.Button.CreateImageOnlyButton("video", "images/exhibits/videoButton.png");
                f.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                f.left = "0px",
                f.top = "0px",
                f.width = "50px",
                f.height = "42px",
                f.color = "#FFFFFF00",
                f.background = "#FFFFFF00",
                f.children[0].color = "#696969",
                f.children[0].fontSize = 100,
                f.thickness = 0,
                f.onPointerClickObservable.add(function(t) {
                    console.log("播放视频: " + e.video),
                    n.playVideo(e.video)
                }),
                p.addControl(f)
            }
            if (void 0 !== e.photo360 && "" !== e.photo360) {
                var g = BABYLON.GUI.Button.CreateImageOnlyButton("360", "images/exhibits/360Button.png");
                g.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                g.left = "0px",
                g.top = "0px",
                g.width = "50px",
                g.height = "42px",
                g.color = "#FFFFFF00",
                g.background = "#FFFFFF00",
                g.children[0].color = "#696969",
                g.children[0].fontSize = 100,
                g.thickness = 0,
                g.onPointerClickObservable.add(function(t) {
                    console.log("360全景: " + e.photo360),
                    H.GlobalControl.OpenPhoto360(e.photo360)
                }),
                p.addControl(g)
            }
            if (void 0 !== e.model3d && "" !== e.model3d) {
                var m = BABYLON.GUI.Button.CreateImageOnlyButton("model-3d", "images/exhibits/3DButton.png");
                m.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                m.left = "0px",
                m.top = "0px",
                m.width = "50px",
                m.height = "42px",
                m.color = "#FFFFFF00",
                m.background = "#FFFFFF00",
                m.children[0].color = "#696969",
                m.children[0].fontSize = 100,
                m.thickness = 0,
                m.onPointerClickObservable.add(function(t) {
                    console.log("3d模型预览: " + e.model3d),
                    H.GlobalControl.OpenModel3D(e.model3d)
                }),
                p.addControl(m)
            }
            if (void 0 !== e.link && "" !== e.link) {
                var N = BABYLON.GUI.Button.CreateImageOnlyButton("link", "images/exhibits/link.png");
                N.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                N.left = "0px",
                N.top = "0px",
                N.width = "50px",
                N.height = "42px",
                N.color = "#FFFFFF00",
                N.background = "#FFFFFF00",
                N.children[0].color = "#696969",
                N.children[0].fontSize = 100,
                N.thickness = 0,
                N.onPointerClickObservable.add(function(t) {
                    console.log("超链接: " + e.link),
                    window.open(e.link)
                }),
                p.addControl(N)
            }
            var B = new BABYLON.GUI.Container("operation-area");
            B.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            B.background = "#FFE4E100",
            B.color = "#FFE4E100",
            B.width = "100%",
            B.height = "120px",
            B.paddingLeft = "50px",
            this.composePanel.addControl(B);
            var v = new BABYLON.GUI.Image("comment-image","images/exhibits/comment2.png");
            v.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            v.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            v.top = "50px",
            v.left = "0px",
            v.width = "60px",
            v.height = "60px",
            B.addControl(v);
            var b = new BABYLON.GUI.TextBlock("comment-number");
            b.fontSize = 35,
            b.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            b.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            b.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            b.text = "展开评论（" + this._commentsNumber + "）",
            1e3 <= this._commentsNumber && (b.text = "展开评论(1k+)"),
            b.color = "#FFFFFFCC",
            b.top = "45px",
            b.left = "80px",
            b.width = "250px",
            b.height = "70px",
            B.addControl(b);
            var y = BABYLON.GUI.Button.CreateSimpleButton("comment-image", "");
            y.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            y.thickness = 0,
            y.color = "#FFE4E100",
            y.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            y.top = "50px",
            y.left = "0px",
            y.width = "330px",
            y.height = "60px",
            y.onPointerClickObservable.add(function() {
                A._tag ? 0 < A._commentsNumber && (A.commentDisplay(),
                o.isVisible = !1,
                A.commentRect3.isVisible = !1,
                A.sv2.isVisible = !0,
                b.text = "收起评论（" + A._commentsNumber + "）",
                A._tag = !1,
                1e3 <= A._commentsNumber && (b.text = "收起评论（1k+）")) : (o.isVisible = !0,
                A.commentRect3.isVisible = !0,
                A.sv2.isVisible = !1,
                b.text = "展开评论（" + A._commentsNumber + "）",
                1e3 <= A._commentsNumber && (b.text = "展开评论（1k+）"),
                A._tag = !0)
            }),
            B.addControl(y);
            var O = BABYLON.GUI.Button.CreateImageOnlyButton("like-image", "images/exhibits/like-a.png")
              , L = BABYLON.GUI.Button.CreateImageOnlyButton("like-image", "images/exhibits/like.png");
            n.personlike.value ? L.isVisible = !1 : O.isVisible = !1,
            L.onPointerClickObservable.add(function() {
                S.CallBackManager.IsExitDirectSend(21) || S.CallBackManager.IsExitDirectSend(20) || (A.likecount.value += 1,
                A.personlike.value = !0,
                L.isVisible = !1,
                O.isVisible = !0,
                I.text = "点赞（" + A.likecount.value + "）",
                1e3 <= A.likecount.value && (I.text = "点赞(1k+)"),
                j.SocketManager.Instance.OperateNum(A.likecount, "+", 21, function() {}),
                j.SocketManager.Instance.SaveValues([A.personlike], !0, 11))
            }),
            O.onPointerClickObservable.add(function() {
                S.CallBackManager.IsExitDirectSend(21) || S.CallBackManager.IsExitDirectSend(20) || (--A.likecount.value,
                A.personlike.value = !1,
                L.isVisible = !0,
                O.isVisible = !1,
                I.text = "点赞（" + A.likecount.value + "）",
                1e3 <= A.likecount.value && (I.text = "点赞(1k+)"),
                j.SocketManager.Instance.OperateNum(A.likecount, "-", 20, function() {}),
                j.SocketManager.Instance.SaveValues([A.personlike], !0, 10))
            }),
            O.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            O.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            O.thickness = 0,
            O.top = "50px",
            O.left = "-200px",
            O.width = "60px",
            O.height = "60px",
            B.addControl(O),
            L.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            L.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            L.thickness = 0,
            L.top = "50px",
            L.left = "-200px",
            L.width = "60px",
            L.height = "60px",
            B.addControl(L);
            var I = new BABYLON.GUI.TextBlock("like-number");
            I.fontSize = 35,
            I.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            I.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            I.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            I.text = "点赞（" + this.likecount.value + "）",
            1e3 <= this.likecount.value && (I.text = "点赞(1k+)"),
            I.color = "#FFFFFFCC",
            I.top = "45px",
            I.left = "0px",
            I.width = "200px",
            I.height = "70px",
            B.addControl(I);
            var C = new BABYLON.GUI.Image("comment-image","images/exhibits/ping.png");
            C.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            C.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            C.top = "50px",
            C.left = "-70px",
            C.width = "60px",
            C.height = "60px",
            B.addControl(C);
            var P = new BABYLON.GUI.TextBlock("comment-number");
            P.fontSize = 35,
            P.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            P.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            P.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            P.text = "我要评论",
            P.color = "#FFFFFFCC",
            P.top = "45px",
            P.left = "45px",
            P.width = "170px",
            P.height = "70px",
            B.addControl(P);
            var V = window.document.getElementById("pinglun");
            window.document.getElementById("quxiao").onclick = function() {
                A.composePanel.isVisible = !0,
                V.style.display = "none"
            }
            ;
            var x = window.document.getElementById("fabiao")
              , T = window.document.getElementById("pingText");
            x.onclick = function() {
                if ("" != T.value) {
                    var t = A.totalComments.value.length
                      , e = new K.VeryString("",Q.VeryNettyPara.UserName + ":" + T.value);
                    A.totalComments.add(e),
                    console.log(A.totalComments.RecordTag + "--32768"),
                    j.SocketManager.Instance.OperateList(A.totalComments, e, "add");
                    var n = new BABYLON.GUI.Image("comment-show","images/exhibits/kuang.png");
                    n.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    n.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    n.top = 160 * t + "px",
                    n.width = "100%",
                    n.height = "150px",
                    A.commentRect2.addControl(n);
                    var i = new BABYLON.GUI.Image("comment-tou","images/exhibits/tou.png");
                    i.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    i.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    i.top = 160 * t + 25 + "px",
                    i.left = "20px",
                    i.width = "100px",
                    i.height = "100px",
                    A.commentRect2.addControl(i);
                    var o = new BABYLON.GUI.TextBlock("comment-body");
                    o.fontSize = 35,
                    o.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    o.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    o.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    o.text = Q.VeryNettyPara.UserName + ":" + T.value,
                    o.color = "#696969",
                    o.top = 160 * t + 25 + "px",
                    o.left = "160px",
                    o.width = "80%",
                    o.height = "100px",
                    o.textWrapping = !0,
                    o.lineSpacing = "10px",
                    A.commentRect2.addControl(o);
                    var r = Math.max(490, 160 * A.totalComments.value.length + 20);
                    A.commentRect2.height = r + "px",
                    T.value = "",
                    A.composePanel.isVisible = !0,
                    1 == A.totalComments.value.length && (A.commentRect3.isVisible = !0),
                    V.style.display = "none",
                    1e3 <= A.totalComments.value.length && (b.text = "展开评论（1k+）")
                }
            }
            ;
            var M = BABYLON.GUI.Button.CreateSimpleButton("comment-image", "");
            M.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            M.thickness = 0,
            M.color = "#FFE4E100",
            M.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            M.top = "50px",
            M.left = "0px",
            M.width = "230px",
            M.height = "60px",
            M.onPointerClickObservable.add(function() {
                "游客" !== Q.VeryNettyPara.UserName.slice(0, 2) ? (A.composePanel.isVisible = !1,
                V.style.display = "block",
                window.document.getElementById("count").innerHTML = "0") : A._loginPanel.isVisible = !0
            }),
            B.addControl(M),
            this.commentRect = new BABYLON.GUI.Container("comment_rect"),
            this.commentRect.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this.commentRect.background = "#FFE4E100",
            this.commentRect.color = "#FFE4E100",
            this.commentRect.width = "100%",
            this.commentRect.height = "580px",
            this.commentRect.paddingLeft = "50px",
            this.composePanel.addControl(this.commentRect);
            var G = new BABYLON.GUI.TextBlock("comment-good");
            G.fontSize = 35,
            G.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            G.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            G.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            G.text = "精彩评论",
            G.color = "#FFFFFFCC",
            G.top = "10px",
            G.left = "0px",
            G.width = "250px",
            G.height = "50px",
            this.commentRect.addControl(G);
            var z = new BABYLON.GUI.TextBlock("title-line2");
            z.fontSize = 15,
            z.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            z.text = "_______________________________________________________________________________________________________________________________",
            z.width = "100%",
            z.top = "60px",
            z.height = "20px",
            z.paddingLeft = "0px",
            z.paddingRight = "0px",
            z.color = "#404040",
            this.commentRect.addControl(z),
            this.commentRect3 = new BABYLON.GUI.Container("comment_rect"),
            this.commentRect3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this.commentRect3.top = "90px",
            this.commentRect3.background = "#FFE4E100",
            this.commentRect3.color = "#FFE4E100",
            this.commentRect3.width = "100%",
            this.commentRect3.height = "170px",
            this.commentRect.addControl(this.commentRect3);
            var D = new BABYLON.GUI.Image("comment-show","images/exhibits/kuang.png");
            D.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            D.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            D.top = "0px",
            D.width = "100%",
            D.height = "150px",
            this.commentRect3.addControl(D);
            var w = new BABYLON.GUI.Image("comment-tou","images/exhibits/tou.png");
            w.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            w.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            w.top = "25px",
            w.left = "20px",
            w.width = "100px",
            w.height = "100px",
            this.commentRect3.addControl(w);
            var E = new BABYLON.GUI.TextBlock("comment-body");
            E.fontSize = 35,
            E.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            E.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            E.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            E.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            0 < this.comments.value.length ? E.text = this.comments.value[this.comments.value.length - 1].getValue().toString() : this.commentRect3.isVisible = !1,
            E.color = "#696969",
            E.top = "25px",
            E.left = "160px",
            E.width = "80%",
            E.height = "100px",
            E.textWrapping = !0,
            E.lineSpacing = "10px",
            this.commentRect3.addControl(E)
        }
        ,
        o.prototype.commentDisplay = function() {
            this.sv2 = new BABYLON.GUI.ScrollViewer("info-scrollview"),
            this.sv2.barColor = "#ffffff00",
            this.sv2.thickness = 0,
            this.sv2.barSize = 0,
            this.sv2.background = "#CCCCCC00",
            this.sv2.wheelPrecision = .008,
            this.sv2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            this.sv2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this.sv2.top = "90px",
            this.sv2.width = "100%",
            this.sv2.height = "490px",
            this.commentRect.addControl(this.sv2),
            this.sv2.isVisible = !1,
            this.commentRect2 = new BABYLON.GUI.Container("comment_rect"),
            this.commentRect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this.commentRect2.background = "#FFE4E100",
            this.commentRect2.color = "#FFE4E100",
            this.commentRect2.width = "100%";
            var t = Math.max(490, 160 * this.totalComments.value.length + 20);
            this.commentRect2.height = t + "px",
            this.sv2.addControl(this.commentRect2);
            for (var e = 0; e < this.totalComments.value.length; e++) {
                var n = new BABYLON.GUI.Image("comment-show","images/exhibits/kuang.png");
                n.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                n.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                n.top = 160 * e + "px",
                n.width = "100%",
                n.height = "150px",
                this.commentRect2.addControl(n);
                var i = new BABYLON.GUI.Image("comment-tou","images/exhibits/tou.png");
                i.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                i.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                i.top = 160 * e + 25 + "px",
                i.left = "20px",
                i.width = "100px",
                i.height = "100px",
                this.commentRect2.addControl(i);
                var o = new BABYLON.GUI.TextBlock("comment-body");
                o.fontSize = 35,
                o.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                o.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                o.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                o.text = this.totalComments.value[e].getValue().toString(),
                o.color = "#696969",
                o.top = 160 * e + 25 + "px",
                o.left = "160px",
                o.width = "80%",
                o.height = "100px",
                o.textWrapping = !0,
                o.lineSpacing = "10px",
                this.commentRect2.addControl(o)
            }
        }
        ,
        o.prototype.playVideo = function(t) {
            this._plane2.setEnabled(!1),
            this._videoParent.setEnabled(!0),
            this._videoParent.setParent(this._parent),
            this._videoParent.rotation = new BABYLON.Vector3(0,0,0);
            var e = this._location.position2.x - this._plane2Size / 2;
            if (this._location.position2.x < 0 && (e = -(Math.abs(this._location.position2.x) - this._plane2Size / 2 + this._videoLength)),
            this._videoParent.position = new BABYLON.Vector3(e,this._location.position2.y,this._location.position2.z),
            this._videoParent.setParent(null),
            this._videoPlaying = !0,
            this._initializedVideo)
                this._lastVideo !== t && (this._videoTex.updateURL("video/" + t),
                this._lastVideo = t),
                this._videoTex.video.play(),
                H.GlobalControl.PauseAudio(!0),
                H.GlobalControl.PauseScreenVideo();
            else {
                this._lastVideo = t,
                this._initializedVideo = !0,
                this._videoTex = new BABYLON.VideoTexture("exhibit-video-tex","video/" + t,this._scene,!0,!1,BABYLON.Texture.TRILINEAR_SAMPLINGMODE,{
                    autoPlay: !0,
                    autoUpdateTexture: !0,
                    loop: !0
                }),
                this._videoTex.coordinatesIndex = 0;
                var n = new BABYLON.StandardMaterial("exhibit-video-mat",this._scene);
                n.emissiveColor = BABYLON.Color3.White(),
                n.diffuseTexture = this._videoTex,
                n.backFaceCulling = !1,
                this._videoPlane.material = n,
                this._videoTex.video.play(),
                H.GlobalControl.PauseAudio(!0),
                H.GlobalControl.PauseScreenVideo()
            }
        }
        ,
        o.prototype.pauseVideo = function() {
            this._videoTex && this._videoTex.video && this._videoTex.video.pause()
        }
        ,
        o.prototype.closeVideo = function() {
            this._videoTex.video.pause(),
            H.GlobalControl.screenVideoOn || H.GlobalControl.PauseAudio(!1),
            this._videoParent.setEnabled(!1),
            this._plane2.setEnabled(!0),
            this._videoPlaying = !1
        }
        ,
        o.prototype.close = function(t) {
            t ? this._record[t] = !1 : this._record[this._lastName] = !1,
            this._videoPlaying && this.closeVideo(),
            this._parent && (this._parent.getChildMeshes().forEach(function(t) {
                t.material.dispose()
            }),
            this._parent.dispose()),
            this.meshAdvancedTexture1 && this.meshAdvancedTexture1.dispose(),
            this.meshAdvancedTexture2 && this.meshAdvancedTexture2.dispose(),
            this.picAdvancedTexture && this.picAdvancedTexture.dispose(),
            this._uis = [],
            this._currentIndex = 1
        }
        ,
        o.prototype.createEmpty = function(t) {
            var e = new BABYLON.GUI.Rectangle("_empty_");
            return e.width = t,
            e.background = "#FFFFFF00",
            e.color = "#FFFFFF00",
            e
        }
        ,
        o.prototype.loadPicData = function() {
            var e = this;
            axios.get("./data/highPicture.json").then(function(t) {
                e._picdata = t.data,
                e._picsuccess = !0
            }).catch(function(t) {
                console.log("load error: " + t)
            })
        }
        ,
        o.prototype.initHighPic = function(t) {
            if (this._picdata[t]) {
                this._pictures = [];
                for (var e = 0; e < this._picdata[t].length; e++) {
                    var n = {
                        index: this._picdata[t][e].index,
                        name: this._picdata[t][e].name,
                        path: this._picdata[t][e].path,
                        introduct: this._picdata[t][e].introduct
                    };
                    this._pictures.push(n)
                }
                this.createPicUI(this._pictures),
                this._currentIndex = 1
            }
        }
        ,
        o.prototype.createPicUI = function(t) {
            this._plane2.setEnabled(!1),
            this._picPlane = BABYLON.MeshBuilder.CreatePlane("_ui-exhibits-PicPlane", {
                height: this._plane2Size,
                width: this._plane2Size
            }, this._scene);
            var e = new Y.GameObject("picParentPlane",this._picPlane);
            e.transform.parent = this._parentObj.transform,
            e.transform.localPosition = this._location.position2,
            e.transform.localEulerAngles = this._location.angle,
            this.picAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this._picPlane);
            var n = new BABYLON.GUI.Rectangle("pic-parent");
            n.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            n.width = "900px",
            n.height = "600px",
            n.paddingLeft = "100px",
            n.background = "#ffffff00",
            n.color = "#ffffff00",
            n.thickness = 0,
            this.picAdvancedTexture.addControl(n);
            for (var i = 0; i < t.length; i++) {
                var o = new BABYLON.GUI.StackPanel("picture-panel-" + i);
                o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                n.addControl(o),
                o.addControl(this.creatBodyUI(t[i], t.length)),
                0 !== i && (o.isVisible = !1),
                this._uis.push(o)
            }
        }
        ,
        o.prototype.creatBodyUI = function(t, e) {
            var n = this
              , i = this
              , o = new BABYLON.GUI.Rectangle("picture-body-container");
            o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            o.width = "100%",
            o.height = "600px",
            o.background = "#ffffff00",
            o.color = "#ffffff00",
            o.thickness = 0;
            var r = BABYLON.GUI.Button.CreateImageOnlyButton("high-pic-close", "images/exhibits/close.png");
            r.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            r.top = "7px",
            r.left = "-383px",
            r.width = "30px",
            r.height = "30px",
            r.thickness = 0,
            r.onPointerClickObservable.add(function() {
                i.closepicture()
            }),
            o.addControl(r);
            var A = new BABYLON.GUI.TextBlock("pic-index-title");
            A.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            A.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            A.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            A.text = t.name + "(" + t.index + "/" + e + ")",
            A.fontWeight = "bold",
            A.color = "white",
            A.paddingLeft = "35px",
            A.width = "100%",
            A.height = "40px",
            A.fontSize = 30,
            o.addControl(A);
            var a = new BABYLON.GUI.Image("picture" + t.index,t.path);
            if (a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            a.top = "50px",
            a.height = "332px",
            a.width = "721px",
            o.addControl(a),
            1 !== t.index) {
                console.log("左边箭头出现");
                var s = BABYLON.GUI.Button.CreateImageOnlyButton("left-arrow", "images/question/left.png");
                s.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                s.width = "38px",
                s.height = "63px",
                s.top = "175px",
                s.left = "-320.5px",
                s.thickness = 0,
                s.onPointerClickObservable.add(function() {
                    i.previous(t.index)
                }),
                o.addControl(s)
            }
            if (t.index !== e) {
                console.log("右边箭头出现");
                var l = BABYLON.GUI.Button.CreateImageOnlyButton("right-arrow", "images/question/right.png");
                l.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                l.width = "38px",
                l.height = "63px",
                l.top = "175px",
                l.left = "320.5px",
                l.thickness = 0,
                l.onPointerClickObservable.add(function() {
                    i.next(t.index)
                }),
                o.addControl(l)
            }
            if ("" !== t.introduct) {
                var c = new BABYLON.GUI.Rectangle("pictureIntroRec");
                c.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                c.background = "#ffffffB2",
                c.color = "#ffffffB2",
                c.thickness = 0,
                c.cornerRadius = 10,
                c.top = "412px",
                c.width = "721px",
                c.height = "160px",
                o.addControl(c);
                var h = new BABYLON.GUI.ScrollViewer("pictureIntro-scrollview");
                h.barColor = "#ffffff00",
                h.thickness = 0,
                h.barSize = 0,
                h.background = "#CCCCCC00",
                h.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                h.top = "10px",
                h.width = "691px",
                h.height = "160px",
                c.addControl(h);
                var d = new BABYLON.GUI.TextBlock("pictureIntro-body");
                d.fontSize = 22,
                d.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                d.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                d.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                d.text = t.introduct,
                d.color = "#424242",
                d.top = "0px",
                d.width = "691px",
                d.height = "400px",
                d.textWrapping = !0,
                d.lineSpacing = "7px",
                h.addControl(d);
                var u = Math.ceil(t.introduct.length / 30);
                c.height = 5 < u ? "160px" : 30 * u + 10 + "px";
                var p = this._scene.onBeforeCameraRenderObservable.add(function(t) {
                    var e = 30 * d.lines.length;
                    5 < d.lines.length ? (d.height = 10 + e + "px",
                    h.height = "170px",
                    c.height = "170px") : (d.height = e + "px",
                    h.height = e + "px",
                    c.height = 30 * d.lines.length + 10 + "px"),
                    n._scene.onBeforeCameraRenderObservable.remove(p)
                })
            }
            return o
        }
        ,
        o.prototype.next = function(t) {
            t < this._pictures.length && (this._currentIndex++,
            this.show(this._currentIndex))
        }
        ,
        o.prototype.previous = function(t) {
            1 < t && (this._currentIndex--,
            this.show(this._currentIndex))
        }
        ,
        o.prototype.show = function(n) {
            this._uis.forEach(function(t, e) {
                t.isVisible = e + 1 === n
            })
        }
        ,
        o.prototype.closepicture = function() {
            this._uis = [],
            this._currentIndex = 1,
            this._picPlane.dispose(),
            this._plane2.setEnabled(!0),
            this.picAdvancedTexture && this.picAdvancedTexture.dispose()
        }
        ,
        o);
        function o(t, e) {
            var n = this;
            this._plane2Size = 180,
            this._videoLength = 240,
            this._record = {},
            this._lastName = "",
            this._initializedVideo = !1,
            this._videoPlaying = !1,
            this._lastVideo = "",
            this._pictures = [],
            this._uis = [],
            this._currentIndex = 1,
            this._picsuccess = !1,
            this._picdata = null,
            this._success = !1,
            this._data = null,
            this.visitNumber = new K.VeryNumber("vistnum",0),
            this._initScreen = 0,
            this._commentsNumber = 0,
            this._location = {
                y: 20,
                left: !0,
                angle: new BABYLON.Vector3(90,0,0),
                position1: new BABYLON.Vector3(130,20,87),
                position2: new BABYLON.Vector3(130,20,-10)
            },
            this.comments = new K.VeryList("comments",new K.VeryString("","")),
            this.totalComments = new K.VeryList("totalComments",new K.VeryString("","")),
            this.likecount = new K.VeryNumber("liskcount",0),
            this.personlike = new K.VeryBool("personlike",!1),
            this._tag = !0,
            this._loginPanel = new BABYLON.GUI.Rectangle("login-area"),
            this._loginPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            this._loginPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            this._loginPanel.background = "#FFFFFF00",
            this._loginPanel.color = "#FFFFFF00",
            this._loginPanel.thickness = 0,
            this._loginPanel.width = "397px",
            this._loginPanel.height = "442px",
            X.UIMain.advancedTexture.addControl(this._loginPanel),
            this._loginPanel.isVisible = !1,
            X.UIMain.personInfoPanel = this._loginPanel;
            var i = new BABYLON.GUI.Image("BG1","images/login/BG.png");
            i.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            i.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            i.width = "397px",
            i.height = "442px",
            this._loginPanel.addControl(i);
            var o = new BABYLON.GUI.Image("账号--X","images/login/account--X.png");
            o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            o.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            o.top = "-30px",
            o.width = "326px",
            o.height = "35px",
            this._loginPanel.addControl(o);
            var r = new BABYLON.GUI.InputText;
            r.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            r.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            r.top = "-30px",
            r.left = "40px",
            r.width = "340px",
            r.height = "35px",
            r.fontSize = "18px",
            r.placeholderText = "请输入账号",
            r.placeholderColor = "#6E6E6E",
            r.color = "black",
            r.thickness = 0,
            r.focusedBackground = "#FFFFFF00",
            r.background = "#FFFFFF00",
            this._loginPanel.addControl(r);
            var A = new BABYLON.GUI.Image("密码--X","images/login/password--X.png");
            A.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            A.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            A.top = "43px",
            A.width = "326px",
            A.height = "38px",
            this._loginPanel.addControl(A);
            var a = new BABYLON.GUI.InputText;
            a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            a.top = "43px",
            a.left = "40px",
            a.width = "340px",
            a.height = "38px",
            a.fontSize = "18px",
            a.placeholderText = "请输入密码",
            a.placeholderColor = "#6E6E6E",
            a.color = "black",
            a.thickness = 0,
            a.focusedBackground = "#FFFFFF00",
            a.background = "#FFFFFF00",
            this._loginPanel.addControl(a);
            var s = new BABYLON.GUI.TextBlock("errorMsg1","");
            s.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            s.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            s.color = "#6E6E6E",
            s.top = "83px",
            s.width = "340px",
            s.height = "38px",
            s.fontSize = "15px",
            this._loginPanel.addControl(s);
            var l = BABYLON.GUI.Button.CreateImageOnlyButton("登录", "images/login/login.png");
            l.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            l.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            l.thickness = 0,
            l.top = "123px",
            l.width = "329px",
            l.height = "38px",
            this._loginPanel.addControl(l);
            var c = BABYLON.GUI.Button.CreateImageOnlyButton("随便看看", "images/login/wander.png");
            c.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            c.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            c.thickness = 0,
            c.top = "180px",
            c.left = "-90.5px",
            c.width = "148px",
            c.height = "38px",
            this._loginPanel.addControl(c);
            var h = BABYLON.GUI.Button.CreateImageOnlyButton("注册1", "images/login/register.png");
            h.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            h.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            h.thickness = 0,
            h.top = "180px",
            h.left = "90.5px",
            h.width = "148px",
            h.height = "38px",
            this._loginPanel.addControl(h);
            var d = this._loginPanel
              , u = !0;
            l.onPointerClickObservable.add(function() {
                if (("" !== r.text || "" !== a.text) && u) {
                    u = !1;
                    var t = setInterval(function() {
                        clearInterval(t),
                        u = !0
                    }, 1e3);
                    j.SocketManager.Instance.Login(r.text, a.text).then(function(t) {
                        var e = t.ReadString();
                        console.log(e),
                        0 < t.ReadableBytes() ? s.text = S.CallBackManager.BackMessage(t.ReadByte()) : (d.isVisible = !1,
                        Q.VeryNettyPara.UserName = e,
                        Q.VeryNettyPara.UserID = r.text)
                    }
                    .bind(n))
                }
            }),
            c.onPointerClickObservable.add(function() {
                n._loginPanel.isVisible = !1
            }),
            h.onPointerClickObservable.add(function() {
                n._loginPanel.isVisible = !1,
                p.isVisible = !0
            });
            var p = new BABYLON.GUI.Rectangle("register-area");
            p.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            p.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            p.background = "#FFFFFF00",
            p.color = "#FFFFFF00",
            p.thickness = 0,
            p.width = "397px",
            p.height = "442px",
            X.UIMain.advancedTexture.addControl(p),
            p.isVisible = !1,
            X.UIMain.personInfoPanel = p;
            var f = new BABYLON.GUI.Image("BG2","images/register/BG.png");
            f.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            f.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            f.width = "397px",
            f.height = "442px",
            p.addControl(f);
            var g = new BABYLON.GUI.Image("昵称--X","images/register/username--X.png");
            g.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            g.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            g.top = "-83px",
            g.width = "326px",
            g.height = "35px",
            p.addControl(g);
            var m = new BABYLON.GUI.InputText;
            m.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            m.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            m.top = g.top,
            m.left = "40px",
            m.width = "340px",
            m.height = "35px",
            m.fontSize = "18px",
            m.placeholderText = "请输入昵称",
            m.placeholderColor = "#6E6E6E",
            m.color = "black",
            m.thickness = 0,
            m.focusedBackground = "#FFFFFF00",
            m.background = "#FFFFFF00",
            p.addControl(m);
            var N = new BABYLON.GUI.Image("手机号--X","images/register/account--X.png");
            N.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            N.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            N.top = "-23px",
            N.width = "326px",
            N.height = "35px",
            p.addControl(N);
            var B = new BABYLON.GUI.InputText;
            B.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            B.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            B.top = N.top,
            B.left = "40px",
            B.width = "340px",
            B.height = "35px",
            B.fontSize = "18px",
            B.placeholderText = "请输入手机号 11位数字",
            B.placeholderColor = "#6E6E6E",
            B.color = "black",
            B.thickness = 0,
            B.focusedBackground = "#FFFFFF00",
            B.background = "#FFFFFF00",
            p.addControl(B);
            var v = new BABYLON.GUI.Image("设置密码--X","images/register/password--X.png");
            v.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            v.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            v.top = "97px",
            v.width = "326px",
            v.height = "39px",
            p.addControl(v);
            var b = new BABYLON.GUI.InputText;
            b.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            b.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            b.fontStyle,
            b.top = v.top,
            b.left = "40px",
            b.width = "340px",
            b.height = "39px",
            b.fontSize = "18px",
            b.placeholderText = "请输入密码",
            b.placeholderColor = "#6E6E6E",
            b.color = "black",
            b.thickness = 0,
            b.focusedBackground = "#FFFFFF00",
            b.background = "#FFFFFF00",
            p.addControl(b);
            var y = new BABYLON.GUI.Image("输入验证码-X","images/register/Captcha--X.png");
            y.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            y.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            y.top = "37px",
            y.left = "-73px",
            y.width = "182px",
            y.height = "34px",
            p.addControl(y);
            var O = new BABYLON.GUI.InputText;
            O.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            O.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            O.fontStyle,
            O.top = y.top,
            O.left = "40px",
            O.width = "340px",
            O.height = "34px",
            O.fontSize = "18px",
            O.placeholderText = "请输验证码",
            O.placeholderColor = "#6E6E6E",
            O.color = "black",
            O.thickness = 0,
            O.focusedBackground = "#FFFFFF00",
            O.background = "#FFFFFF00",
            p.addControl(O);
            var L = new BABYLON.GUI.TextBlock("errorMsg2","");
            L.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            L.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            L.color = "#6E6E6E",
            L.top = "140px",
            L.width = "340px",
            L.height = "35px",
            L.fontSize = "15px",
            p.addControl(L);
            var I = BABYLON.GUI.Button.CreateImageOnlyButton("发送验证码", "images/register/sendCaptcha.png");
            I.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            I.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            I.thickness = 0,
            I.top = y.top,
            I.left = "103px",
            I.width = "126px",
            I.height = "38px",
            p.addControl(I);
            var C = BABYLON.GUI.Button.CreateImageOnlyButton("登录", "images/register/login.png");
            C.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            C.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            C.thickness = 0,
            C.top = "170px",
            C.width = "326px",
            C.height = "38px",
            p.addControl(C);
            var P = BABYLON.GUI.Button.CreateImageOnlyButton("返回", "images/register/BackLogin.png");
            P.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            P.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            P.thickness = 0,
            P.top = "20px",
            P.left = "170px",
            P.width = "24px",
            P.height = "20px",
            p.addControl(P);
            C.onPointerClickObservable.add(function() {
                if (u) {
                    u = !1;
                    var t = setInterval(function() {
                        clearInterval(t),
                        u = !0
                    }, 1e3);
                    j.SocketManager.Instance.Regist(B.text, m.text, b.text, O.text).then(function(t) {
                        0 < t.ReadableBytes() ? L.text = S.CallBackManager.BackMessage(t.ReadByte()) : (p.isVisible = !1,
                        Q.VeryNettyPara.UserName = m.text,
                        Q.VeryNettyPara.UserID = B.text)
                    })
                }
            }),
            I.onPointerClickObservable.add(function() {
                j.SocketManager.Instance.SendCaptcha(B.text).then(function(t) {
                    0 < t.ReadableBytes() ? (L.text = S.CallBackManager.BackMessage(t.ReadByte()),
                    console.log(L.text)) : (O.placeholderText = "验证码发送成功",
                    console.log("验证码发送成功"))
                })
            }),
            P.onPointerClickObservable.add(function() {
                n._loginPanel.isVisible = !0,
                p.isVisible = !1
            });
            var V = BABYLON.GUI.Button.CreateImageOnlyButton("person", "images/person/person.png");
            V.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            V.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            V.left = "-20px",
            V.top = "20px",
            V.width = "51px",
            V.height = "51px",
            V.thickness = 0;
            var x = V.image;
            V.onPointerDownObservable.add(function() {
                x.source = "images/person/person2.png",
                V.height = "68px"
            }),
            V.onPointerUpObservable.add(function() {
                x.source = "images/person/person.png",
                V.height = "51px"
            }),
            V.onPointerClickObservable.add(function() {
                T.isVisible ? T.isVisible = !1 : (E.text = 20 * Q.VeryNettyPara.roomIndex + " 分",
                q.text = Q.VeryNettyPara.roomIndex + 1 + "/6",
                z.text = Q.VeryNettyPara.UserName,
                D.text = "ID:" + Q.VeryNettyPara.UserID.slice(0, 9),
                T.isVisible = !0)
            }),
            X.UIMain.advancedTexture.addControl(V),
            X.UIMain.personInfoBtn = V;
            var T = new BABYLON.GUI.Rectangle("info-area");
            T.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            T.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            T.background = "#FFFFFF00",
            T.color = "#FFFFFF00",
            T.thickness = 0,
            T.width = "404px",
            T.height = "700px",
            X.UIMain.advancedTexture.addControl(T),
            T.isVisible = !1,
            X.UIMain.personInfoPanel = T;
            var M = new BABYLON.GUI.Image("BG","images/person/BG.png");
            M.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            M.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            M.width = "404px",
            M.height = "389px",
            T.addControl(M);
            var G = new BABYLON.GUI.Image("tou","images/person/tou.png");
            G.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            G.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            G.top = "-95px",
            G.width = "121px",
            G.height = "121px",
            T.addControl(G);
            var z = new BABYLON.GUI.TextBlock("name",Q.VeryNettyPara.UserName);
            z.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            z.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            z.color = "black",
            z.top = "-10px",
            z.width = "1501px",
            z.height = "30px",
            z.fontSize = "20px",
            T.addControl(z);
            var D = new BABYLON.GUI.TextBlock("id","ID:" + Q.VeryNettyPara.UserID.slice(0, 9));
            D.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            D.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            D.color = "#696969",
            D.top = "18px",
            D.width = "250px",
            D.height = "20px",
            D.fontSize = "15px",
            T.addControl(D);
            var w = new BABYLON.GUI.TextBlock("fasf","闯关得分:");
            w.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            w.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            w.color = "black",
            w.left = "-50px",
            w.top = "90px",
            w.width = "100px",
            w.height = "30px",
            w.fontSize = "18px",
            T.addControl(w);
            var E = new BABYLON.GUI.TextBlock("asdasd",20 * Q.VeryNettyPara.roomIndex + " 分");
            E.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            E.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            E.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            E.color = "red",
            E.left = "50px",
            E.top = "90px",
            E.width = "60px",
            E.height = "30px",
            E.fontSize = "18px",
            T.addControl(E);
            var Y = new BABYLON.GUI.TextBlock("sdasd","解锁展厅:");
            Y.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            Y.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            Y.color = "black",
            Y.left = "-50px",
            Y.top = "123px",
            Y.width = "100px",
            Y.height = "30px",
            Y.fontSize = "18px",
            T.addControl(Y);
            var q = new BABYLON.GUI.TextBlock("ty",Q.VeryNettyPara.roomIndex + 1 + "/6");
            q.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            q.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            q.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            q.color = "red",
            q.left = "50px",
            q.top = "123px",
            q.width = "60px",
            q.height = "30px",
            q.fontSize = "18px",
            T.addControl(q),
            this._scene = t,
            this._canvas = e;
            var U = this;
            this._videoPlane = BABYLON.MeshBuilder.CreatePlane("exhibit-video-plane", {
                width: this._videoLength,
                height: 9 * this._videoLength / 16
            }, this._scene),
            this._videoClosePlane = BABYLON.MeshBuilder.CreatePlane("exhibit-close-video-plane", {
                width: 10,
                height: 10
            }, this._scene),
            this._videoParent = new BABYLON.TransformNode("exhibit-video-parent",this._scene),
            this._videoPlane.setParent(this._videoParent),
            this._videoClosePlane.setParent(this._videoParent),
            this._videoParent.setAbsolutePosition(new BABYLON.Vector3(-160,158,67)),
            this._videoClosePlane.rotation = new BABYLON.Vector3(90,0,0).multiplyByFloats(Math.PI / 180, Math.PI / 180, Math.PI / 180),
            this._videoClosePlane.position = new BABYLON.Vector3(5,0,5 + 9 * this._videoLength / 16 / 2),
            this._videoPlane.rotation = new BABYLON.Vector3(90,0,0).multiplyByFloats(Math.PI / 180, Math.PI / 180, Math.PI / 180),
            this._videoPlane.position = new BABYLON.Vector3(10 + this._videoLength / 2,0,0),
            this._videoCloseAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this._videoClosePlane);
            var Z = BABYLON.GUI.Button.CreateImageOnlyButton("close", "images/exhibits/close.png");
            Z.top = "0px",
            Z.width = "100%",
            Z.height = "100%",
            Z.color = "#FFFFFF00",
            Z.background = "#FFFFFF00",
            Z.children[0].color = "#696969",
            Z.children[0].fontSize = 20,
            Z.thickness = 0,
            Z.onPointerClickObservable.add(function(t) {
                n.closeVideo()
            }),
            this._videoCloseAdvancedTexture.addControl(Z),
            this._videoParent.setEnabled(!1),
            this._scene.onPointerObservable.add(function(t) {
                U._videoPlaying && t.type === BABYLON.PointerEventTypes.POINTERPICK && null !== t.pickInfo && null !== t.pickInfo.pickedMesh && t.pickInfo.pickedMesh === n._videoPlane && (n._videoTex.video.paused ? (n._videoTex.video.play(),
                H.GlobalControl.PauseAudio(!0),
                H.GlobalControl.PauseScreenVideo()) : (n._videoTex.video.pause(),
                H.GlobalControl.PauseAudio(!1)))
            });
            var W = new Date;
            J.visitDisplay.fixDate(W),
            W.setTime(W.getTime() + 31536e6);
            var k = J.visitDisplay.getCookie("counter");
            k = k ? parseInt(k) + 1 : 1,
            J.visitDisplay.setCookie("counter", k, W);
            var F = BABYLON.Mesh.CreatePlane("visitPlane", 50, this._scene);
            F.position = new BABYLON.Vector3(-82.66,123.91,260.81),
            F.rotationQuaternion = new BABYLON.Quaternion(.1478,0,0,1),
            F.scaling = new BABYLON.Vector3(1,1,1);
            var R = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(F);
            this.visitText = new BABYLON.GUI.TextBlock("visitText","0"),
            this.visitText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            this.visitText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            this.visitText.color = "#A9F5F2",
            this.visitText.fontFamily = "Monaco",
            this.visitText.fontWeight = "bold",
            j.SocketManager.AddConnectEvent(this.Co.bind(this)),
            R.addControl(this.visitText),
            this._scene.onPointerObservable.add(function(t) {
                0 == n._initScreen && t.type === BABYLON.PointerEventTypes.POINTERDOWN && (n._initScreen = 1,
                n._loginPanel.isVisible = !0)
            }),
            this.loadData(),
            this.loadPicData(),
            this.initUI()
        }
        n.Exhibits = i
    }
    , {
        "../babylon": 2,
        "./globalControl": 8,
        "./uiMain": 20,
        "./veryNetty/CallBackManager": 26,
        "./veryNetty/SocketManager": 31,
        "./veryNetty/VeryNettyPara": 32,
        "./veryNetty/veryVariables": 33,
        "./visitDisplay": 34
    }],
    7: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var l = t("./museum")
          , c = t("./cameraControl")
          , h = t("./loading")
          , d = t("./globalControl")
          , i = t("./veryNetty/MonoBehaviourMessageCenter")
          , u = t("./veryNetty/SocketManager")
          , r = t("./eventProxy")
          , o = (A.prototype.createScene = function() {
            this._engine && this._engine.dispose(),
            this._engine = new BABYLON.Engine(this._canvas,!0);
            var o = this._engine;
            window.addEventListener("resize", function() {
                o.resize()
            });
            var t = new h.CustomLoadingScreen("");
            t.waitAMoment = !0,
            o.loadingScreen = t,
            this._scene = new BABYLON.Scene(this._engine),
            this._scene.gravity = new BABYLON.Vector3(0,-9.81,0),
            this._scene.collisionsEnabled = !0;
            var r = this
              , e = new c.CameraControl(this._scene,this._canvas);
            d.GlobalControl.cameraChange = e;
            var A = !1
              , a = !1
              , n = 9
              , s = function() {
                n++,
                t.waiting || (window.document.getElementById("id-progress1").style.width = n + "%",
                window.document.getElementById("id-progress2").innerHTML = n + "%"),
                n < 99 && !A && !t.waiting && setTimeout(s, 1500)
            }
              , i = "./assets/";
            return d.GlobalControl.subPackage && (i = "./sub-assets/"),
            BABYLON.SceneLoader.Append(i, "JWHZ.babylon", this._scene, function(n) {
                n.ambientColor = BABYLON.Color3.White(),
                n.gravity = new BABYLON.Vector3(0,-9.81,0),
                n.collisionsEnabled = !0;
                // var i = n.onReadyObservable.addOnce(function() {
    
                //     if (A = !0,
                //     d.GlobalControl.subPackage) {
                //         o.hideLoadingUI(),
                //         BABYLON.SceneLoader.ShowLoadingScreen = !1,
                //         r.loadOthers(r._scene),
                //         n.getMeshByName("大厅门遮挡").material.diffuseColor = new BABYLON.Color3(.753,.753,.753),
                //         d.GlobalControl.subPackagePlane = BABYLON.MeshBuilder.CreatePlane("door-display-ui", {
                //             width: 200,
                //             height: 200
                //         }, n),
                //         d.GlobalControl.subPackagePlane.position = new BABYLON.Vector3(597.385,137.608,640.023),
                //         d.GlobalControl.subPackageTex = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(d.GlobalControl.subPackagePlane),
                //         d.GlobalControl.doorMsg = new BABYLON.GUI.TextBlock("door-display-ui-msg"),
                //         d.GlobalControl.doorMsg.fontSize = 80,
                //         d.GlobalControl.doorMsg.fontStyle = "bold",
                //         d.GlobalControl.doorMsg.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                //         d.GlobalControl.doorMsg.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                //         d.GlobalControl.doorMsg.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
                //         d.GlobalControl.doorMsg.text = "资源加载中，请稍后。。。",
                //         d.GlobalControl.doorMsg.color = "#ffffff",
                //         d.GlobalControl.doorMsg.top = "100px",
                //         d.GlobalControl.doorMsg.width = "100%",
                //         d.GlobalControl.doorMsg.height = "150px",
                //         d.GlobalControl.doorMsg.paddingLeft = "30px",
                //         d.GlobalControl.doorMsg.paddingRight = "30px",
                //         d.GlobalControl.subPackageTex.addControl(d.GlobalControl.doorMsg);
                //         var t = !0
                //           , e = function() {
                //             d.GlobalControl.subPackageComplete ? d.GlobalControl.doorMsg.isVisible = !0 : (t = d.GlobalControl.doorMsg.isVisible = !t,
                //             setTimeout(e, 1e3))
                //         };
                //         setTimeout(e, 1e3)
                //     }
                //     n.onReadyObservable.remove(i)
                // });
                u.SocketManager.Instance.Connect("47.92.212.118", 3331),
                r._museum = new l.Museum(r._engine,n,r._canvas,r)
            }, function(t) {
                if (!a) {
                    var e = 0
                      , n = "0%";
                    if (t.lengthComputable)
                        n = 9 <= (e = 100 * t.loaded / t.total) ? (a || (a = !0,
                        setTimeout(s, 1500)),
                        "9%") : e.toFixed() + "%";
                    else {
                        var i = t.loaded / 1048576;
                        n = 9 <= (e = Math.floor(100 * i) / 100) ? (a || (a = !0,
                        setTimeout(s, 1500)),
                        "9%") : e.toFixed() + "%"
                    }
                    a || (window.document.getElementById("id-progress1").style.width = n,
                    window.document.getElementById("id-progress2").innerHTML = n)
                }
            }),
            this
        }
        ,
        A.prototype.loadOthers = function(n) {
            var i = this
              , o = new r.EventProxy;
            o.add("定远号"),
            o.add("吉野号"),
            o.add("辽宁舰"),
            o.add("致远号"),
            BABYLON.SceneLoader.LoadAssetContainerAsync("./model/01/", "dyh.babylon", n).then(function(t) {
                t.addAllToScene();
                var e = t.meshes;
                i.meshCollisionSet(e),
                o.done("定远号") && i.doneSceneLoad(n)
            }),
            BABYLON.SceneLoader.LoadAssetContainerAsync("./model/03/", "jyh.babylon", n).then(function(t) {
                t.addAllToScene();
                var e = t.meshes;
                i.meshCollisionSet(e),
                o.done("吉野号") && i.doneSceneLoad(n)
            }),
            BABYLON.SceneLoader.LoadAssetContainerAsync("./model/04/", "lnj.babylon", n).then(function(t) {
                t.addAllToScene();
                var e = t.meshes;
                i.meshCollisionSet(e),
                o.done("辽宁舰") && i.doneSceneLoad(n)
            }),
            BABYLON.SceneLoader.LoadAssetContainerAsync("./model/02/", "zyh.babylon", n).then(function(t) {
                t.addAllToScene();
                var e = t.meshes;
                i.meshCollisionSet(e),
                o.done("致远号") && i.doneSceneLoad(n)
            })
        }
        ,
        A.prototype.meshCollisionSet = function(t) {
            t.forEach(function(t) {
                t.isPickable = !0,
                t.checkCollisions = !0
            })
        }
        ,
        A.prototype.doneSceneLoad = function(n) {
            BABYLON.SceneLoader.ShowLoadingScreen = !0,
            d.GlobalControl.subPackageComplete = !0,
            d.GlobalControl.doorMsg.text = "敬请参观！",
            d.GlobalControl.doorMsg.color = "green",
            setTimeout(function() {
                d.GlobalControl.subPackageTex.dispose(),
                d.GlobalControl.subPackagePlane.dispose();
                var t = n.getMeshByName("大厅门遮挡");
                t.checkCollisions = !1,
                t.isPickable = !1,
                t.setEnabled(!1);
                var e = n.getMeshByName("大厅门遮挡001");
                null !== e && (e.checkCollisions = !1,
                e.isPickable = !1,
                e.setEnabled(!1))
            }, 2e3)
        }
        ,
        A.prototype.animate = function() {
            function t(t) {
                i.MonoBehaviourMessageCenter.Instance.update()
            }
            var e = this
              , n = new Worker("webwork.js");
            return document.addEventListener("visibilitychange", function() {
                document.hidden ? n.onmessage = t : n.onmessage = null
            }),
            this._engine.runRenderLoop(function() {
                e._canvas.width !== e._canvas.clientWidth && e._engine.resize(),
                e._scene && e._scene.render(),
                e.updateFpsPos(),
                i.MonoBehaviourMessageCenter.Instance.update()
            }),
            this
        }
        ,
        A.prototype.toggleDebug = function() {
            if (this._engine) {
                var t = this._engine.scenes[0];
                t.debugLayer.isVisible() ? t.debugLayer.hide() : t.debugLayer.show({
                    embedMode: !0
                })
            }
            return this
        }
        ,
        A.prototype.updateFpsPos = function() {
            this._fps && (this._fps.style.right = document.body.clientWidth - this._canvas.clientWidth + 20 + "px",
            this._fps.innerHTML = this._engine.getFps().toFixed() + " fps")
        }
        ,
        A);
        function A(t) {
            this._canvas = t,
            this._fps = document.getElementById("fpsLabel")
        }
        n.Game = o
    }
    , {
        "./cameraControl": 4,
        "./eventProxy": 5,
        "./globalControl": 8,
        "./loading": 12,
        "./museum": 15,
        "./veryNetty/MonoBehaviourMessageCenter": 28,
        "./veryNetty/SocketManager": 31
    }],
    8: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("./uiMain")
          , o = (r.LobbyVideoControl = function(t) {
            r.lobbyScreenVideoTex && (t ? r.lobbyScreenVideoTex.video.play() : r.lobbyScreenVideoTex.video.pause())
        }
        ,
        r.OpenModel3D = function(t) {
            r.model3D && r.model3D.openModel(t)
        }
        ,
        r.OpenPhoto360 = function(t) {
            r.photo360 && (r.photo360.camera360(t),
            i.UIMain.closePersonMenu(!0))
        }
        ,
        r.ChangeActiveCamera = function(t) {
            r.cameraChange && r.cameraChange.changeActiveCamera(t)
        }
        ,
        r.PauseAudio = function(t) {
            r.audio && r.audio.pauseControl(t)
        }
        ,
        r.PauseVideo = function() {
            r.PauseScreenVideo(),
            r.PauseExhibitsVideo()
        }
        ,
        r.PauseScreenVideo = function() {
            r.screenVideo && r.screenVideo.stop()
        }
        ,
        r.PauseExhibitsVideo = function() {
            r.exhibits && r.exhibits.pauseVideo()
        }
        ,
        r.screenVideoOn = !1,
        r.subPackage = !1,
        r.subPackageComplete = !1,
        r);
        function r() {}
        n.GlobalControl = o
    }
    , {
        "./uiMain": 20
    }],
    9: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("./ui-control")
          , p = t("./uiMain")
          , o = (r.prototype.loadPersonData = function() {}
        ,
        r.prototype.initUI = function() {
            var t = this;
            this._key = 0;
            var e = p.UIMain.advancedTexture
              , n = new BABYLON.GUI.Container("guide7-container");
            n.width = "100%",
            n.height = "100%",
            n.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            n.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            e.addControl(n);
            var i = new BABYLON.GUI.Image("guide7","images/guide/7.png");
            i.width = "100%",
            i.height = "100%",
            i.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            i.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            i.isPointerBlocker = !0,
            n.addControl(i);
            var o = BABYLON.GUI.Button.CreateSimpleButton("guide7-btn", "下一步");
            o.cornerRadius = 10,
            o.color = "white",
            o.background = "#ffffff00",
            o.top = "-50px",
            o.width = "200px",
            o.height = "70px",
            o.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            o.children[0].color = "white",
            o.children[0].fontSize = 38,
            o.onPointerClickObservable.add(function() {
                t.timer("guide8", 10)
            }),
            n.addControl(o);
            var r = new BABYLON.GUI.Container("guide8-container");
            r.width = "100%",
            r.height = "100%",
            r.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            r.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            e.addControl(r);
            var A = new BABYLON.GUI.Image("guide8","images/guide/8.jpg");
            A.width = "100%",
            A.height = "100%",
            A.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            A.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            A.isPointerBlocker = !0,
            r.addControl(A);
            var a = BABYLON.GUI.Button.CreateSimpleButton("guide8-btn", "下一步");
            a.cornerRadius = 10,
            a.color = "white",
            a.background = "#ffffff00",
            a.top = "-50px",
            a.width = "200px",
            a.height = "70px",
            a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            a.children[0].color = "white",
            a.children[0].fontSize = 38,
            a.onPointerClickObservable.add(function() {
                t.timer("guide9", 10)
            }),
            r.addControl(a);
            var s = new BABYLON.GUI.Container("guide9-container");
            s.width = "100%",
            s.height = "100%",
            s.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            s.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            e.addControl(s);
            var l = new BABYLON.GUI.Image("guide9","images/guide/9.jpg");
            l.width = "100%",
            l.height = "100%",
            l.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            l.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            l.isPointerBlocker = !0,
            s.addControl(l);
            var c = BABYLON.GUI.Button.CreateSimpleButton("guide9-btn", "下一步");
            c.cornerRadius = 10,
            c.color = "white",
            c.background = "#ffffff00",
            c.top = "-50px",
            c.width = "200px",
            c.height = "70px",
            c.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            c.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            c.children[0].color = "white",
            c.children[0].fontSize = 38,
            c.onPointerClickObservable.add(function() {
                t.timer("done", 10)
            }),
            s.addControl(c);
            var h = new BABYLON.GUI.Container("guide10-container");
            h.width = "100%",
            h.height = "100%",
            h.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            h.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            e.addControl(h);
            var d = new BABYLON.GUI.Image("guide10","images/guide/10.png");
            d.width = "100%",
            d.height = "100%",
            d.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            d.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            d.isPointerBlocker = !0,
            h.addControl(d);
            var u = BABYLON.GUI.Button.CreateSimpleButton("guide10-btn", "下一步");
            u.cornerRadius = 10,
            u.color = "white",
            u.background = "#ffffff00",
            u.top = "-50px",
            u.width = "200px",
            u.height = "70px",
            u.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            u.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            u.children[0].color = "white",
            u.children[0].fontSize = 38,
            u.onPointerClickObservable.add(function() {
                t.timer("guide7", 10)
            }),
            h.addControl(u),
            this._guideElement.add("guide7", n),
            this._guideElement.add("guide8", r),
            this._guideElement.add("guide9", s),
            this._guideElement.add("guide10", h),
            this._guideElement.init("guide10")
        }
        ,
        r.prototype.timer = function(t, e) {
            void 0 === e && (e = 1e3),
            this._waiting = !0,
            setTimeout(this.wait.bind(this), e, t)
        }
        ,
        r.prototype.wait = function(t) {
            this._key++,
            this._guideElement.display(t),
            this._waiting = !1
        }
        ,
        r.prototype.done = function() {
            this._guideElement.display("")
        }
        ,
        r);
        function r(t, e) {
            this._guideElement = new i.UIControl,
            this._key = 0,
            this._waiting = !1,
            this._hasDown = !1,
            this._kbObserver = null,
            this._pObserver = null,
            this._scene = t,
            this._canvas = e,
            this.initUI()
        }
        n.Guide = o
    }
    , {
        "./ui-control": 19,
        "./uiMain": 20
    }],
    10: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.splash = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAIAAABnsVYUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzUwYTljMC02NTQ3LWJhNDYtOTQwNS00YTJkNDNmNzA5Y2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTMzNjk0MTVCQzE5MTFFOUFBMzlBODc2RkRFRUU4NzkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTMzNjk0MTRCQzE5MTFFOUFBMzlBODc2RkRFRUU4NzkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDhmOGQ0MzUtMTA1Ni05OTQ2LTg2NDMtY2U3Yjc2OTI4Y2IxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmVjNTBhOWMwLTY1NDctYmE0Ni05NDA1LTRhMmQ0M2Y3MDljZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnFxHBMABaCvSURBVHja7N0LsKRnfd/53/953+4+9zP3OXPVjIQQkoVA3G0DXuJysFmcUK41SznZiqmt2EnMury1vuyu14nZtSNna7eySew4icsJDsGsg40BW8L4gsxVgECgu4Sk0WU0mvvlzLl29/u+/32f5z2n1ZwZQBqp2czw/dSppk/3e+ueU11dP/76PebuAgAAAAAAAADgxRZ4CwAAAAAAAAAAo0AADQAAAAAAAAAYCQJoAAAAAAAAAMBIEEADAAAAAAAAAEaCABoAAAAAAAAAMBIE0AAAAAAAAACAkSCABgAAAAAAAACMBAE0AAAAAAAAAGAkCKABAAAAAAAAACNBAA0AAAAAAAAAGAkCaAAAAAAAAADASBBAAwAAAAAAAABGggAaAAAAAAAAADASBNAAAAAAAAAAgJEggAYAAAAAAAAAjAQBNAAAAAAAAABgJAigAQAAAAAAAAAjQQANAAAAAAAAABgJAmgAAAAAAAAAwEgQQAMAAAAAAAAARoIAGgAAAAAAAAAwEgTQAAAAAAAAAICRIIAGAAAAAAAAAIwEATQAAAAAAAAAYCQIoAEAAAAAAAAAI0EADQAAAAAAAAAYCQJoAAAAAAAAAMBIEEADAAAAAAAAAEaCABoAAAAAAAAAMBIE0AAAAAAAAACAkSCABgAAAAAAAACMBAE0AAAAAAAAAGAkCKABAAAAAAAAACNBAA0AAAAAAAAAGAkCaAAAAAAAAADASBBAAwAAAAAAAABGggAaAAAAAAAAADASBNAAAAAAAAAAgJEggAYAAAAAAAAAjAQBNAAAAAAAAABgJAigAQAAAAAAAAAjQQANAAAAAAAAABgJAmgAAAAAAAAAwEgQQAMAAAAAAAAARoIAGgAAAAAAAAAwEgTQAAAAAAAAAICRIIAGAAAAAAAAAIwEATQAAAAAAAAAYCQIoAEAAAAAAAAAI0EADQAAAAAAAAAYCQJoAAAAAAAAAMBIEEADAAAAAAAAAEaCABoAAAAAAAAAMBIE0AAAAAAAAACAkSCABgAAAAAAAACMBAE0AAAAAAAAAGAkCKABAAAAAAAAACNBAA0AAAAAAAAAGAkCaAAAAAAAAADASBBAAwAAAAAAAABGggAaAAAAAAAAADASBNAAAAAAAAAAgJEggAYAAAAAAAAAjAQBNAAAAAAAAABgJAigAQAAAAAAAAAjQQANAAAAAAAAABgJAmgAAAAAAAAAwEgQQAMAAAAAAAAARoIAGgAAAAAAAAAwEgTQAAAAAAAAAICRIIAGAAAAAAAAAIwEATQAAAAAAAAAYCQIoAEAAAAAAAAAI0EADQAAAAAAAAAYCQJoAAAAAAAAAMBIEEADAAAAAAAAAEaCABoAAAAAAAAAMBIE0AAAAAAAAACAkSCABgAAAAAAAACMBAE0AAAAAAAAAGAkCKABAAAAAAAAACNBAA0AAAAAAAAAGAkCaAAAAAAAAADASBBAAwAAAAAAAABGggAaAAAAAAAAADASBNAAAAAAAAAAgJEggAYAAAAAAAAAjAQBNAAAAAAAAABgJAigAQAAAAAAAAAjQQANAAAAAAAAABgJAmgAAAAAAAAAwEgQQAMAAAAAAAAARoIAGgAAAAAAAAAwEgTQAAAAAAAAAICRIIAGAAAAAAAAAIwEATQAAAAAAAAAYCQIoAEAAAAAAAAAI0EADQAAAAAAAAAYCQJoAAAAAAAAAMBIEEADAAAAAAAAAEaCABoAAAAAAAAAMBIE0AAAAAAAAACAkSCABgAAAAAAAACMBAE0AAAAAAAAAGAkCKABAAAAAAAAACNBAA0AAAAAAAAAGAkCaAAAAAAAAADASBBAAwAAAAAAAABGggAaAAAAAAAAADASBNAAAAAAAAAAgJEggAYAAAAAAAAAjAQBNAAAAAAAAABgJAigAQAAAAAAAAAjQQANAAAAAAAAABgJAmgAAAAAAAAAwEgQQAMAAAAAAAAARoIAGgAAAAAAAAAwEgTQAAAAAAAAAICRIIAGAAAAAAAAAIwEATQAAAAAAAAAYCQIoAEAAAAAAAAAI0EADQAAAAAAAAAYCQJoAAAAAAAAAMBIEEADAAAAAAAAAEaCABoAAAAAAAAAMBIE0AAAAAAAAACAkSCABgAAAAAAAACMBAE0AAAAAAAAAGAkCKABAAAAAAAAACNBAA0AAAAAAAAAGAkCaAAAAAAAAADASBBAAwAAAAAAAABGggAaAAAAAAAAADASBNAAAAAAAAAAgJEggAYAAAAAAAAAjAQBNAAAAAAAAABgJAigAQAAAAAAAAAjQQANAAAAAAAAABgJAmgAAAAAAAAA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3AgAAPAOI4AGAABvCLGaw0f3qz1y5Mgrr7ziHhpa2NDQsH379ptuusnJrzPWRx555MSJE6tXr66re6Owbt26dffee29nZ+djjz1WVla2teC+++47e/asYzXPhjc2NlZdXT0/Pz85OelGw85qW1tbN27cuGrVqpUrV+qj/fv3a3lXV5dz58bGxqJZAUNw6bw1vMaz0dDr2b0XXBEcekB7NZ2Aewfv27fvtddeGx0d1Y+68NC22E0YnGnqVRelM9TF9vT06MTCTIM+Ge2wsrLSNcupVKqjo2PFihUaKw1CLpfThesy9drW1qYrWrt2rUbPnRN0pbpeh5KurvXgaEk2m3XRrjZ0FXZLS0tzc7POv6amRkO3eCbJolscYt9QAB4y7tnZWe1Qm8/NzekMde2uBXbI7m4e8RkI48PuxyaMsMvDtUPdYjdl1mBOTEzU1tbW19frhOPp/1VPQhhOXsMbmlRoELQrnb+zXZ2kHlQ30/DsjroROjc9VOl0Wo+rTqa3t9fl86KBdZir9Q8cOPD888/rpri9TLTQHEav7j/j6H/NmjXayalTp1599VWH2h5b90jROegOajB1VrrX2pvulH59PvzhD2tX2kSnp7vv/UexWQf9AOte79mzR59+4AMfuOhf5Zcv16Xt2rVLm+hR9GMQn2wT15plvauqvvJlvU7d94Beq7/y7+f7+jNf/JPordVB5594uuyjF3R2LvnI9sWr6RBUQAMAgHcefz0FAOB9LdTJ+k0IFnft2vWd73zHEXM2m9WS6urqD3/4w9u3b6+trXW9cHl5+Xe/+93HH398bGzMbRA++clP3nXXXVrhySefHB0dve222+69996//du/HRwcdH3x3Nyc899bb721tbX1zJkzOuLatWvb29ubmpq0w4aGht7eXmedOvQtt9zivg0h9NQeooWOCpfOLufn56PYzIHOK+MdJ7SrTCbjAmedye7du48cOTIxMTE5OalPq6qq3EjEdIGdnZ2bNm3auHGjzrajo0OXGS2UVPvc3D7Y6bZLiaempjypozY8cOCAjqVhrK+vd0fmFStWpNNpHUULQxaso7tC3OGvboH24FPVsGtbLdS2brzgTULD69DbOuwttBmJYsXOIfYNA6hD6NzcLLusrEzXXldX55pcnZ4TUm/u6w0D6K3ENexujqwx9FVHhR7Quq2+v35ywsSG8RYo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AAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAAAAAAAAAEAiCKABAAAAAAAAAIkggAYAAAAAAAAAJIIAGgAAAAAAAACQCAJoAPj/2bFjAQAAAIBB/taj2FcYAQAAALAQ0AAAAAAALAQ0AAAAAAALAQ0AAAAAwEJAAwAAAACwENAAAAAAACwENAAAAAAACwENAAAAAMBCQAMAAAAAsBDQAAAAAAAsBDQAAAAAAAsBDQAAAADAQkADAAAAALAQ0AAAAAAALBJgALLKkTqOaJxAAAAAAElFTkSuQmCC",
        o);
        function o() {}
        n.ImageCode = i
    }
    , {}],
    11: [function(t, e, n) {
        "use strict";
        function i(t) {
            for (var e in t)
                n.hasOwnProperty(e) || (n[e] = t[e])
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        i(t("./game")),
        i(t("./uiMain")),
        i(t("./ui-control")),
        i(t("./guide")),
        i(t("./museum")),
        i(t("./question")),
        i(t("./exhibits")),
        i(t("./cameraControl")),
        i(t("./globalControl")),
        i(t("./audioControl")),
        i(t("./screenVideo")),
        i(t("./imageCode")),
        i(t("./loading")),
        i(t("./photo360")),
        i(t("./model3D")),
        i(t("./eventProxy"))
    }
    , {
        "./audioControl": 3,
        "./cameraControl": 4,
        "./eventProxy": 5,
        "./exhibits": 6,
        "./game": 7,
        "./globalControl": 8,
        "./guide": 9,
        "./imageCode": 10,
        "./loading": 12,
        "./model3D": 14,
        "./museum": 15,
        "./photo360": 16,
        "./question": 17,
        "./screenVideo": 18,
        "./ui-control": 19,
        "./uiMain": 20
    }],
    12: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("./imageCode")
          , o = (r.prototype.displayLoadingUI = function() {
            if (window.document.getElementById("id-progress1").style.width = "0%",
            window.document.getElementById("id-progress2").innerHTML = "0%",
            this.loadingScreenDiv.style.display = "block",
            null === window.document.getElementById("id-image")) {
                var t = window.document.getElementById("id-demo")
                  , e = new Image;
                e.src = i.ImageCode.splash,
                e.id = "id-image",
                e.style.position = "absolute",
                e.style.left = "0px",
                e.style.top = "0px",
                e.style.width = "100%",
                e.style.height = "100%",
                e.style.animation = "spin1 2s infinite ease-in-out",
                e.style.webkitAnimation = "spin1 2s infinite ease-in-out",
                e.style.transformOrigin = "50% 50%",
                e.style.webkitTransformOrigin = "50% 50%",
                this.loadingScreenDiv.insertBefore(e, t)
            }
        }
        ,
        r.prototype.hideLoadingUI = function() {
            this.waitAMoment ? (this.waiting = !0,
            window.document.getElementById("id-progress1").style.width = "100%",
            window.document.getElementById("id-progress2").innerHTML = "100%",
            setTimeout(this.close.bind(this), 1e3)) : this.loadingScreenDiv.style.display = "none"
        }
        ,
        r.prototype.close = function() {
            this.waiting = !1,
            this.loadingScreenDiv.style.display = "none"
        }
        ,
        r);
        function r(t) {
            this.loadingUIText = t,
            this.loadingScreenDiv = window.document.getElementById("loadingScreen"),
            this.waitAMoment = !1,
            this.waiting = !1,
            this.loadingUIBackgroundColor = "black"
        }
        n.CustomLoadingScreen = o
    }
    , {
        "./imageCode": 10
    }],
    13: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.Slerp = function(t, e, n) {
            n < 0 ? n = 0 : 1 < n && (n = 1);
            var i = new BABYLON.Vector3
              , o = .5 * (Math.sin(Math.PI * (n - .5)) + 1);
            return i.x = t.x + (e.x - t.x) * o,
            i.y = t.y + (e.y - t.y) * o,
            i.z = t.z + (e.z - t.z) * o,
            i
        }
        ,
        o);
        function o() {}
        n.Vector3Utility = i;
        var r = (A.Lerp = function(t, e, n) {
            return n < 0 ? n = 0 : 1 < n && (n = 1),
            t + (e - t) * n
        }
        ,
        A.SLerp = function(t, e, n) {
            return n < 0 ? n = 0 : 1 < n && (n = 1),
            t + (e - t) * (.5 * (Math.sin(Math.PI * (n - .5)) + 1))
        }
        ,
        A);
        function A() {}
        n.FloatUitlity = r
    }
    , {}],
    14: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var h = t("./loading")
          , i = (o.prototype.openModel = function(t) {
            this._canvas3D.style.display = "block",
            this._canvasMain.style.display = "none",
            t !== this._lastName && this.initialize(t),
            this._lastName = t
        }
        ,
        o.prototype.close = function() {
            this._canvasMain.style.display = "block",
            this._canvas3D.style.display = "none"
        }
        ,
        o.prototype.initialize = function(t) {
            var e = this;
            this._engine3D && this._engine3D.dispose(),
            this._engine3D = new BABYLON.Engine(this._canvas3D,!0);
            var n = this._engine3D;
            window.addEventListener("resize", function() {
                n.resize()
            });
            var i = new h.CustomLoadingScreen("");
            n.loadingScreen = i,
            n.displayLoadingUI(),
            this._scene3D = new BABYLON.Scene(this._engine3D);
            var o = new BABYLON.ArcRotateCamera("Model3DCamera",-Math.PI / 2,Math.PI / 2,5,new BABYLON.Vector3(0,0,0),this._scene3D);
            o.attachControl(this._canvas3D, !0),
            new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0,1,0),this._scene3D);
            var r = this
              , A = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Model-3D", void 0, this._scene3D)
              , a = BABYLON.GUI.Button.CreateImageOnlyButton("close", "images/system/quit.png");
            a.top = "20px",
            a.left = "-20px",
            a.width = "50px",
            a.height = "50px",
            a.thickness = 0,
            a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            a.onPointerClickObservable.add(function() {
                r.close()
            }),
            A.addControl(a);
            var s = t.split(/\//g)
              , l = s.pop()
              , c = "./model/" + s.join("/");
              console.log(s)
            BABYLON.SceneLoader.Append(c + "/", l, this._scene3D, function(t) {
                t.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Gray()),
                t.ambientColor = BABYLON.Color3.Gray();
                var e = BABYLON.Vector3.Zero().copyFrom(t.meshes[0].position);
                o.setTarget(t.meshes[0]),
                o.setPosition(new BABYLON.Vector3(e.x,e.y,e.z + 150)),
                o.radius = 500
            }, function(t) {
                var e = 0
                  , n = "0%";
                if (t.lengthComputable)
                    n = 100 == (e = 100 * t.loaded / t.total) ? "99%" : e.toFixed() + "%";
                else {
                    var i = t.loaded / 1048576;
                    n = 100 == (e = Math.floor(100 * i) / 100) ? "99%" : e.toFixed() + "%"
                }
                window.document.getElementById("id-progress1").style.width = n,
                window.document.getElementById("id-progress2").innerHTML = n
            }),
            this._engine3D.runRenderLoop(function() {
                e._scene3D && e._scene3D.render()
            })
        }
        ,
        o);
        function o(t, e, n) {
            this._lastName = "",
            this._canvasMain = t,
            this._sceneMain = e,
            this._engineMain = n,
            this._canvas3D = document.getElementById("model3d")
        }
        n.Model3D = i
    }
    , {
        "./loading": 12
    }],
    15: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = t("./guide")
          , l = t("./uiMain")
          , c = t("./question")
          , h = t("./exhibits")
          , d = t("./globalControl")
          , u = t("./screenVideo")
          , p = t("./audioControl")
          , f = t("./model3D")
          , g = t("./photo360")
          , i = (o.prototype.init = function() {
            var e = this
              , t = this._scene
              , n = this;
            t.onPointerObservable.add(function(t) {}),
            t.meshes.forEach(function(t) {
                n._ignore[t.name] || (t.isPickable = !0,
                t.checkCollisions = !0),
                "画_00" === t.name || "标题_255" !== t.name && "标题_127" !== t.name || (t.material.ambientColor = new BABYLON.Color3(.173,.173,.173))
            }),
            t.onKeyboardObservable.add(function(t) {
                t.type === BABYLON.KeyboardEventTypes.KEYDOWN && 81 === t.event.keyCode && t.event.ctrlKey && t.event.altKey && (console.log("Ctrl + Alt + Q"),
                e._game.toggleDebug())
            }),
            l.UIMain.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Museum"),
            new s.Guide(t,this._canvas);
            var i = new h.Exhibits(t,this._canvas);
            d.GlobalControl.exhibits = i;
            var o = new u.ScreenVideo(t);
            d.GlobalControl.screenVideo = o;
            var r = new p.AudioControl(t);
            d.GlobalControl.audio = r,
            new c.Question(t,this._canvas);
            var A = new f.Model3D(this._canvas,t,this._engine);
            d.GlobalControl.model3D = A;
            var a = new g.Photo360(t,this._canvas,this._engine);
            d.GlobalControl.photo360 = a
        }
        ,
        o);
        function o(t, e, n, i) {
            this._ignore = {},
            this._engine = t,
            this._scene = e,
            this._canvas = n,
            this._game = i,
            this._ignore["可拼接354"] = !0,
            this._ignore["可拼接313"] = !0,
            this._ignore.person = !0,
            this.init()
        }
        n.Museum = i
    }
    , {
        "./audioControl": 3,
        "./exhibits": 6,
        "./globalControl": 8,
        "./guide": 9,
        "./model3D": 14,
        "./photo360": 16,
        "./question": 17,
        "./screenVideo": 18,
        "./uiMain": 20
    }],
    16: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var a = t("./globalControl")
          , o = t("./uiMain")
          , s = t("./mathUtility")
          , i = (r.prototype.loadData = function() {
            var e = this;
            axios.get("./data/360.json").then(function(t) {
                e._data = t.data,
                e._success = !0
            }).catch(function(t) {
                console.log("load error: " + t)
            })
        }
        ,
        r.prototype.camera360 = function(t) {
            if (this._display = !0,
            this.rotateControl(),
            this.uiInit(),
            t !== this._lastName) {
                if (this._lastName = t,
                this._lastChangeName = t,
                this._data[t]) {
                    var e = this._data[t].one
                      , n = this._data[t].path;
                    this._photoDome && this._photoDome.dispose(),
                    this._sixBox && this._sixBox.setEnabled(!1),
                    e ? (this._photoDome = new BABYLON.PhotoDome("360-" + t,"./360/" + n,{
                        resolution: 32,
                        size: 1e3
                    },this._scene),
                    this._photoDome.position = new BABYLON.Vector3(0,6500,0),
                    this._photoDome.rotation = BABYLON.Vector3.Zero()) : (this._sixMaterial.reflectionTexture = new BABYLON.CubeTexture("./360/" + n,this._scene),
                    this._sixMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE,
                    this._sixBox.setEnabled(!0)),
                    this._data[t].intro && this._data[t].intro.path && "" !== this._data[t].intro.path ? (this.initIntroPic(this._data[t].intro),
                    this._lastHasIntro = !0) : this._lastHasIntro = !1,
                    this._data[t].links && 0 !== this._data[t].links.length ? (this.initLinks(this._data[t].links),
                    this._lastHasLinks = !0) : this._lastHasLinks = !1,
                    this._data[t].triggers && 0 !== this._data[t].triggers.length ? (this.initTriggers(this._data[t].triggers),
                    this._lastHasTriggers = !0) : (this.triggersControl(!1),
                    this._lastHasTriggers = !1)
                }
            } else
                this._lastHasIntro && this.introControl(!0),
                this._lastHasLinks && this.linksControl(!0);
            a.GlobalControl.ChangeActiveCamera("360"),
            a.GlobalControl.camera360.alpha = -Math.PI / 2,
            a.GlobalControl.camera360.beta = Math.PI / 2,
            this._zoomLevel = 45.84 * Math.PI / 180,
            this._lastName = t
        }
        ,
        r.prototype.uiInit = function() {
            var t = this;
            this._closeBtn || (this._closeBtn = BABYLON.GUI.Button.CreateImageOnlyButton("360-close", "images/system/quit.png"),
            this._closeBtn.top = "20px",
            this._closeBtn.left = "-20px",
            this._closeBtn.width = "50px",
            this._closeBtn.height = "50px",
            this._closeBtn.thickness = 0,
            this._closeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            this._closeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this._closeBtn.onPointerClickObservable.add(function() {
                t.close()
            }),
            o.UIMain.advancedTexture.addControl(this._closeBtn)),
            this._closeBtn.isVisible = !0
        }
        ,
        r.prototype.initIntroPic = function(t) {
            var e = this;
            this._introPic ? (this._introPic.source = "./360/" + t.path,
            this._introPic.width = t.width + "px",
            this._introPic.height = t.height + "px",
            this._introPic.isVisible = !0) : (this._introPic = new BABYLON.GUI.Image("360-intro","./360/" + t.path),
            this._introPic.width = t.width + "px",
            this._introPic.height = t.height + "px",
            this._introPic.top = "-100px",
            o.UIMain.advancedTexture.addControl(this._introPic)),
            this._picCloseBtn ? (this._picCloseBtn.top = -15 - t.height / 2 - 100 + "px",
            this._picCloseBtn.left = -15 - t.width / 2 + "px",
            this._picCloseBtn.isVisible = !0) : (this._picCloseBtn = BABYLON.GUI.Button.CreateImageOnlyButton("360-intro-close", "images/exhibits/close.png"),
            this._picCloseBtn.top = -15 - t.height / 2 - 100 + "px",
            this._picCloseBtn.left = -15 - t.width / 2 + "px",
            this._picCloseBtn.width = "30px",
            this._picCloseBtn.height = "30px",
            this._picCloseBtn.thickness = 0,
            this._picCloseBtn.onPointerClickObservable.add(function() {
                e.introControl(!1)
            }),
            o.UIMain.advancedTexture.addControl(this._picCloseBtn))
        }
        ,
        r.prototype.introControl = function(t) {
            this._introPic && (this._introPic.isVisible = t),
            this._picCloseBtn && (this._picCloseBtn.isVisible = t)
        }
        ,
        r.prototype.linksResize = function() {
            var t = "100%"
              , e = this._canvas.clientWidth;
            110 * this.linksCount - 10 < e && (t = 110 * this.linksCount - 10 + "px"),
            this._sv && (this._sv.width = t)
        }
        ,
        r.prototype.initLinks = function(r) {
            var A = this;
            this._uiLinks ? this._uiLinks.isVisible = !0 : (this._uiLinks = new BABYLON.GUI.Container("360-links"),
            this._uiLinks.width = "100%",
            this._uiLinks.height = "110px",
            this._uiLinks.background = "#00000033",
            this._uiLinks.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
            this._uiLinks.top = "-50px",
            o.UIMain.advancedTexture.addControl(this._uiLinks)),
            this.linksCount = r.length;
            var t = this._canvas.clientWidth
              , e = "100%";
            110 * this.linksCount - 10 < t && (e = 110 * this.linksCount - 10 + "px"),
            this._sv ? (this._sv.width = e,
            this._sv.isVisible = !0) : (this._sv = new BABYLON.GUI.ScrollViewer("360-links-scrollview"),
            this._sv.barColor = "#ffffff00",
            this._sv.thickness = 0,
            this._sv.barSize = 8,
            this._sv.barColor = "#FFA500",
            this._sv.background = "#CCCCCC00",
            this._sv.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            this._sv.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this._sv.width = e,
            this._sv.height = "100%",
            this._uiLinks.addControl(this._sv)),
            this._uiLinksContainer && this._uiLinksContainer.dispose(),
            this._uiLinksContainer = new BABYLON.GUI.Container("360-links-container"),
            this._uiLinksContainer.height = "100%",
            this._uiLinksContainer.width = 110 * this.linksCount - 10 + "px",
            this._sv.addControl(this._uiLinksContainer),
            this._uiLinksBtns = [];
            for (var n = function(t) {
                var e = r[t];
                if (a._data[e]) {
                    var n = BABYLON.GUI.Button.CreateImageOnlyButton("360-link-" + (t + 1), "./360/" + a._data[e].thumbnail);
                    n.thickness = 3,
                    n.width = "100px",
                    n.height = "100px",
                    n.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                    n.left = 110 * t + "px",
                    e === a._lastChangeName ? (n.color = "#FFA500",
                    a._lastChangeIndex = t) : n.color = "white",
                    n.onPointerClickObservable.add(function() {
                        A.change360(e, t)
                    }),
                    a._uiLinksContainer.addControl(n),
                    a._uiLinksBtns.push(n);
                    var i = e;
                    6 < i.length && (i = i.substr(0, 5) + "...");
                    var o = BABYLON.GUI.Button.CreateSimpleButton("360-link-text-" + (t + 1), i);
                    o.thickness = 0,
                    o.width = "100%",
                    o.height = "20px",
                    o.color = "white",
                    o.background = "#000000B2",
                    o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                    o.children[0].fontSize = 14,
                    n.addControl(o)
                } else
                    console.error("360关联列表信息错误，link name：" + e)
            }, a = this, i = 0; i < this.linksCount; i++)
                n(i)
        }
        ,
        r.prototype.linksControl = function(t) {
            this._uiLinks && (this._uiLinks.isVisible = t)
        }
        ,
        r.prototype.calculatePoint = function(t, e, n) {
            var i = BABYLON.Vector3.Distance(t, e);
            return BABYLON.Vector3.Lerp(t, e, n / i)
        }
        ,
        r.prototype.change360 = function(t, e) {
            if (t !== this._lastChangeName) {
                this._lastChangeName = t,
                a.GlobalControl.camera360.alpha = -Math.PI / 2,
                a.GlobalControl.camera360.beta = Math.PI / 2,
                this._zoomLevel = 45.84 * Math.PI / 180,
                this.rotateControl(),
                this._photoDome && this._photoDome.dispose(),
                this._sixBox && this._sixBox.setEnabled(!1);
                var n = this._data[t].one
                  , i = this._data[t].path;
                n ? (this._photoDome = new BABYLON.PhotoDome("360-" + t,"./360/" + i,{
                    resolution: 32,
                    size: 1e3
                },this._scene),
                this._photoDome.position = new BABYLON.Vector3(0,6500,0),
                this._photoDome.rotation = BABYLON.Vector3.Zero()) : (this._sixMaterial.reflectionTexture = new BABYLON.CubeTexture("./360/" + i,this._scene),
                this._sixMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE,
                this._sixBox.setEnabled(!0)),
                this._data[t].intro && this._data[t].intro.path && "" !== this._data[t].intro.path ? (this.initIntroPic(this._data[t].intro),
                this._lastHasIntro = !0) : (this.introControl(!1),
                this._lastHasIntro = !1),
                this._data[t].triggers && 0 !== this._data[t].triggers.length ? (this.initTriggers(this._data[t].triggers),
                this._lastHasTriggers = !0) : (this.triggersControl(!1),
                this._lastHasTriggers = !1),
                this._uiLinksBtns[this._lastChangeIndex].color = "white",
                this._lastChangeIndex = e,
                this._uiLinksBtns[this._lastChangeIndex].color = "#FFA500"
            }
        }
        ,
        r.prototype.initTriggers = function(t) {
            this.spriteManager.sprites.forEach(function(t) {
                t.dispose()
            }),
            this.spriteManager.sprites = [],
            this._triggersDic = {};
            for (var e = 0; e < t.length; e++)
                if (t[e].position) {
                    var n = new BABYLON.Sprite("360-sprite-" + e,this.spriteManager);
                    n.width = this._size,
                    n.height = this._size,
                    n.position = new BABYLON.Vector3(t[e].position.x,t[e].position.y,t[e].position.z),
                    n.isPickable = !0,
                    this._triggersDic[n.name] = t[e].intro
                }
        }
        ,
        r.prototype.triggersControl = function(t) {
            t || (this.spriteManager.sprites.forEach(function(t) {
                t.dispose()
            }),
            this.spriteManager.sprites = [],
            this._triggersDic = {})
        }
        ,
        r.prototype.triggerActive = function(t) {
            this._triggersDic[t] && (this.initIntroPic(this._triggersDic[t]),
            this._lastHasIntro = !0)
        }
        ,
        r.prototype.rotateControl = function() {
            this._allowRotate = !1,
            this._timeout && clearTimeout(this._timeout),
            this._timeout = setTimeout(this.startRotate.bind(this), this._waitTimeTotal)
        }
        ,
        r.prototype.startRotate = function() {
            this._allowRotate = !0
        }
        ,
        r.prototype.calculateBeta = function(t, e, n) {
            return t === e || (e < t ? (t -= n) < e && (t = e) : e < (t += n) && (t = e)),
            t
        }
        ,
        r.prototype.close = function() {
            this.uiClose(),
            this._display = !1,
            this._allowRotate = !1,
            o.UIMain.closePersonMenu(!1),
            a.GlobalControl.ChangeActiveCamera("first")
        }
        ,
        r.prototype.uiClose = function() {
            this._closeBtn && (this._closeBtn.isVisible = !1),
            this.linksControl(!1),
            this.introControl(!1)
        }
        ,
        r);
        function r(o, t, e) {
            var n = this;
            this._lastName = "",
            this._lastChangeName = "",
            this._lastChangeIndex = 0,
            this._display = !1,
            this._uiLinksBtns = [],
            this._lastHasIntro = !1,
            this._lastHasLinks = !1,
            this._lastHasTriggers = !1,
            this._triggersDic = {},
            this._triggerColor = new BABYLON.Color4(1,1,1,1),
            this._timer = 0,
            this._timeLimit = 1,
            this._timeDivide = 2,
            this._size = 20,
            this._zoomLevel = 60,
            this._waitTimeTotal = 5e3,
            this._allowRotate = !1,
            this._success = !1,
            this._data = null,
            this._test = !1,
            this.linksCount = 0,
            this._scene = o,
            this._canvas = t,
            this._engine = e,
            this.loadData(),
            this._sixBox = BABYLON.MeshBuilder.CreateBox("360-skyBox", {
                size: 1e3
            }, this._scene),
            this._sixBox.position = new BABYLON.Vector3(0,6500,0),
            this._sixBox.rotation = BABYLON.Vector3.Zero(),
            this._sixMaterial = new BABYLON.StandardMaterial("360-skyBox",this._scene),
            this._sixMaterial.backFaceCulling = !1,
            this._sixMaterial.diffuseColor = new BABYLON.Color3(0,0,0),
            this._sixMaterial.specularColor = new BABYLON.Color3(0,0,0),
            this._sixBox.material = this._sixMaterial,
            this._sixBox.setEnabled(!1),
            this.spriteManager = new BABYLON.SpriteManager("sm","./images/jiawu/point.png",1e3,83,o),
            this.spriteManager.isPickable = !0;
            var r = this;
            o.onPointerObservable.add(function(t) {
                if (r._display && t.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                    if (r._lastHasTriggers) {
                        var e = o.pickSprite(t.event.x, t.event.y);
                        e && e.hit && r.triggerActive(e.pickedSprite.name)
                    }
                    if (r.rotateControl(),
                    r._test && t.pickInfo) {
                        console.warn(t.pickInfo.pickedPoint);
                        var n = t.pickInfo.pickedPoint.subtract(t.pickInfo.ray.origin).multiplyByFloats(.8, .8, .8).add(t.pickInfo.ray.origin);
                        console.log(n),
                        n = r.calculatePoint(t.pickInfo.ray.origin, t.pickInfo.pickedPoint, 450),
                        console.error(n);
                        var i = new BABYLON.Sprite("360-sprite",r.spriteManager);
                        i.width = r._size,
                        i.height = r._size,
                        i.position = n,
                        i.isPickable = !0
                    }
                }
            }),
            o.onBeforeCameraRenderObservable.add(function() {
                if (r._display) {
                    if (r._lastHasTriggers) {
                        r._timer += .001 * r._engine.getDeltaTime();
                        var t = r._timer % r._timeDivide;
                        t > r._timeLimit ? r._triggerColor.a = s.FloatUitlity.SLerp(1, 0, (t - r._timeLimit) / r._timeLimit) : r._triggerColor.a = s.FloatUitlity.SLerp(0, 1, t / r._timeLimit),
                        r.spriteManager.sprites.forEach(function(t) {
                            t.color = r._triggerColor
                        })
                    }
                    if (n._allowRotate) {
                        var e = 3e-5 * r._engine.getDeltaTime();
                        a.GlobalControl.camera360.alpha += e,
                        a.GlobalControl.camera360.beta = r.calculateBeta(a.GlobalControl.camera360.beta, Math.PI / 2, e)
                    }
                }
            }),
            window.addEventListener("resize", this.linksResize.bind(this)),
            r._zoomLevel = a.GlobalControl.camera360.fov,
            this._scene.registerAfterRender(function() {
                r._display && (a.GlobalControl.camera360.fov = r._zoomLevel)
            });
            var i = 65 * Math.PI / 180
              , A = 32 * Math.PI / 180;
            o.onPointerObservable.add(function(t) {
                r._display && (r._zoomLevel += 1e-4 * t.event.deltaY,
                r._zoomLevel < A && (r._zoomLevel = A),
                r._zoomLevel > i && (r._zoomLevel = i))
            }, BABYLON.PointerEventTypes.POINTERWHEEL)
        }
        n.Photo360 = i
    }
    , {
        "./globalControl": 8,
        "./mathUtility": 13,
        "./uiMain": 20
    }],
    17: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = t("./uiMain")
          , i = t("./ui-control")
          , o = t("./veryNetty/VeryNettyPara")
          , r = t("./xuebei")
          , A = (a.prototype.loadQuestionData = function() {
            var e = this;
            axios.get("./data/question.json").then(function(t) {
                e._data = t.data,
                e._success = !0
            }).catch(function(t) {
                console.log("load error: " + t)
            })
        }
        ,
        a.prototype.loadPersonData = function() {}
        ,
        a.prototype.gogo = function(t) {
            o.VeryNettyPara.roomIndex = t.ReadInt(),
            this._personData = o.VeryNettyPara.roomIndex - 1,
            console.log(this._personData),
            this.initDoor(this._personData)
        }
        ,
        a.prototype.startExam = function(t) {
            if (this._hide || !this._checking) {
                if (this._hide && this._parentRect)
                    return this._parentRect.isVisible = !0,
                    void (this._hide = !1);
                if (!this._checking && this._success && (this._checking = !0,
                this._hide = !1,
                this._data[t])) {
                    this._questions = [];
                    for (var e = 0; e < this._data[t].length; e++) {
                        var n = {
                            type: this._data[t][e].type,
                            index: this._data[t][e].index,
                            question: this._data[t][e].question,
                            options: this._data[t][e].options,
                            answer: this._data[t][e].answer,
                            answers: this._data[t][e].answers
                        };
                        this._questions.push(n),
                        this._answers.push(!1)
                    }
                    this.createUI(this._questions),
                    this._currentIndex = 1
                }
            }
        }
        ,
        a.prototype.createUI = function(t) {
            var e = this;
            this.advancedTexture = s.UIMain.advancedTexture;
            var n = new BABYLON.GUI.Rectangle("question-parent");
            n.width = "800px",
            n.height = "600px",
            n.background = "#ffffff00",
            n.color = "#ffffff00",
            n.thickness = 0,
            this.advancedTexture.addControl(n),
            this._parentRect = n,
            this._successUI = new BABYLON.GUI.Image("question-success","images/question/pass.png"),
            this._successUI.width = "325px",
            this._successUI.height = "149px",
            this._successUI.isVisible = !1,
            this.advancedTexture.addControl(this._successUI);
            for (var i = 0; i < t.length; i++) {
                var o = new BABYLON.GUI.StackPanel("question-panel-" + i);
                o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                n.addControl(o);
                var r = new BABYLON.GUI.Container("top-area");
                r.height = "50px",
                r.background = "#ffffff00",
                r.color = "#ffffff00",
                o.addControl(r);
                var A = new BABYLON.GUI.Image("correct-error","images/question/correct.png");
                A.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                A.top = "0px",
                A.width = "202px",
                A.height = "50px",
                r.addControl(A),
                A.isVisible = !1,
                this._correntDic[t[i].index] = A,
                o.addControl(this.createEmpty()),
                o.addControl(this.createBody(t[i], t.length)),
                o.addControl(this.createEmpty()),
                o.addControl(this.createOptions(t[i])),
                o.addControl(this.createEmpty("40px"));
                var a = BABYLON.GUI.Button.CreateImageOnlyButton("close", "images/question/close.png");
                a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM,
                a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
                a.width = "59px",
                a.thickness = 0,
                a.height = "59px",
                a.onPointerClickObservable.add(function() {
                    e.close()
                }),
                o.addControl(a),
                0 !== i && (o.isVisible = !1),
                this._uis.push(o)
            }
        }
        ,
        a.prototype.createEmpty = function(t) {
            var e = new BABYLON.GUI.Container("empty-area");
            return e.height = t || "20px",
            e.background = "#ffffff00",
            e.color = "#ffffff00",
            e
        }
        ,
        a.prototype.maxLength = function(t) {
            var n = 0;
            return t.forEach(function(t, e) {
                n = 0 === e || n < t.length ? t.length : n
            }),
            n
        }
        ,
        a.prototype.createBody = function(t, e) {
            var n = this
              , i = this
              , o = new BABYLON.GUI.Rectangle("question-body-container");
            o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            o.top = "70px",
            o.width = "100%",
            o.height = "200px",
            o.background = "#ffffff00",
            o.color = "#ffffff00",
            o.thickness = 0;
            var r = new BABYLON.GUI.Rectangle("question-body");
            r.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            r.top = "0px",
            r.width = "400px",
            r.height = "200px",
            r.background = "#ffffffB2",
            r.color = "#ffffffB2",
            r.thickness = 0,
            r.cornerRadius = 5,
            r.isPointerBlocker = !0,
            o.addControl(r);
            var A = new BABYLON.GUI.TextBlock("title");
            A.fontSize = 20,
            A.fontStyle = "bold",
            A.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            A.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            A.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            A.text = "知识问答 (" + t.type + ")",
            A.width = "200px",
            A.color = "#696969",
            A.height = "40px",
            A.left = "20px",
            A.top = "10px",
            r.addControl(A);
            var a = new BABYLON.GUI.TextBlock("index-title");
            a.fontSize = 14,
            a.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            a.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            a.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            a.text = "(" + t.index + "/" + e + ")",
            a.color = "#696969",
            a.left = "-77px",
            a.top = "12px",
            a.width = "55px",
            a.height = "40px",
            r.addControl(a);
            var s = new BABYLON.GUI.TextBlock("index-title2");
            s.fontSize = 20,
            s.fontStyle = "bold",
            s.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            s.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            s.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            s.text = "NO." + t.index,
            s.color = "#D82E2D",
            s.left = "-14px",
            s.top = "10px",
            s.width = "60px",
            s.height = "40px",
            r.addControl(s);
            var l = new BABYLON.GUI.TextBlock("title-line");
            l.fontSize = 10,
            l.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            l.text = "____________________________________________________",
            l.width = "500px",
            l.left = "-3px",
            l.top = "25px",
            l.height = "40px",
            l.color = "#BEBEBEB2",
            r.addControl(l);
            var c = new BABYLON.GUI.TextBlock("question-body");
            c.fontSize = 15,
            c.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
            c.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            c.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
            c.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            c.text = t.question,
            c.color = "#696969",
            c.top = "48px",
            c.width = "400px",
            c.height = "150px",
            c.paddingLeft = "20px",
            c.paddingRight = "25px",
            c.paddingTop = "15px",
            c.textWrapping = !0,
            r.addControl(c);
            
            var h = Math.ceil(t.question.length / 24);
            r.height = 25 * h + 10 + 48 + 10 + "px";

            var d = this._scene.onBeforeCameraRenderObservable.add(function(t, e) {
              
                c.height = 25 * c.lines.length + 10 + "px",
                r.height = 25 * c.lines.length + 10 + 48 + 10 + "px",
                o.height = r.height,
                o._markAllAsDirty(),
                n._scene.onBeforeCameraRenderObservable.remove(d)
            });
            if (1 !== t.index) {
                var u = BABYLON.GUI.Button.CreateImageOnlyButton("left-arrow", "images/question/left.png");
                u.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT,
                u.left = "100px",
                u.width = "38px",
                u.height = "63px",
                u.thickness = 0,
                u.onPointerClickObservable.add(function() {
                    i.previous(t.index)
                }),
                o.addControl(u)
            }
            if (t.index !== e) {
                var p = BABYLON.GUI.Button.CreateImageOnlyButton("right-arrow", "images/question/right.png");
                p.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT,
                p.left = "-100px",
                p.width = "38px",
                p.thickness = 0,
                p.height = "63px",
                p.onPointerClickObservable.add(function() {
                    i.next(t.index)
                }),
                o.addControl(p)
            }
            return o
        }
        ,
        a.prototype.createOptions = function(r) {
            var A = this
              , a = this
              , s = new BABYLON.GUI.Container("options-area")
              , t = r.options
              , e = this.maxLength(t);
            if (s.background = "#ffffff00",
            s.color = "#ffffff00",
            e <= 11) {
                var l = 0;
                t.forEach(function(t, e) {
                    var n = e % 2 == 0 ? -105 : 105
                      , i = 50 * parseInt((e / 2).toString());
                    l = 40 + i;
                    var o = BABYLON.GUI.Button.CreateSimpleButton("choice-" + (e + 1), t);
                    o.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    o.left = n + "px",
                    o.top = i + "px",
                    o.width = "190px",
                    o.cornerRadius = 5,
                    o.height = "40px",
                    o.color = "#FFFFFFB2",
                    o.background = "#FFFFFFB2",
                    o.children[0].color = "#696969",
                    o.children[0].fontSize = 16,
                    o.thickness = 0,
                    o.onPointerClickObservable.add(function(t) {
                        o.color = "#D82E2D",
                        o.background = "#D82E2D",
                        o.children[0].color = "white",
                        a.chooseAnswer(r.index, e + 1)
                    }),
                    s.addControl(o),
                    A._btnsDic[r.index] ? A._btnsDic[r.index].push(o) : A._btnsDic[r.index] = [o]
                }),
                s.height = l + "px"
            } else {
                var o = 0;
                t.forEach(function(t, e) {
                    var n = 20 * Math.ceil(t.length / 22) + 20;
                    n < 40 && (n = 40);
                    var i = BABYLON.GUI.Button.CreateSimpleButton("choice-" + (e + 1), t);
                    i.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
                    i.left = "0px",
                    i.top = o + "px",
                    i.width = "400px",
                    i.cornerRadius = 5,
                    i.height = n + "px",
                    i.color = "#FFFFFFB2",
                    i.background = "#FFFFFFB2",
                    i.children[0].color = "#696969",
                    i.children[0].fontSize = 16,
                    i.children[0].paddingLeft = "20px",
                    i.children[0].paddingRight = "20px",
                    i.thickness = 0,
                    i.onPointerClickObservable.add(function(t) {
                        i.color = "#D82E2D",
                        i.background = "#D82E2D",
                        i.children[0].color = "white",
                        a.chooseAnswer(r.index, e + 1)
                    }),
                    s.addControl(i),
                    o += n + 10,
                    A._btnsDic[r.index] ? A._btnsDic[r.index].push(i) : A._btnsDic[r.index] = [i]
                }),
                s.height = o - 10 + "px"
            }
            return s
        }
        ,
        a.prototype.chooseAnswer = function(t, e) {
            var n = this._questions[t - 1]
              , i = !0;
            if ("多选题" === n.type && (i = !1),
            this._pressedDic[t])
                if (i) {
                    var o = this._pressedDic[t][0];
                    o === e ? (delete this._pressedDic[t],
                    this._answers[t - 1] = !1,
                    this._btnsDic[t][e - 1].color = "#FFFFFFB2",
                    this._btnsDic[t][e - 1].background = "#FFFFFFB2",
                    this._btnsDic[t][e - 1].children[0].color = "#696969",
                    this._correntDic[t].isVisible = !1) : (this._btnsDic[t][o - 1].color = "#FFFFFFB2",
                    this._btnsDic[t][o - 1].background = "#FFFFFFB2",
                    this._btnsDic[t][o - 1].children[0].color = "#696969",
                    this._btnsDic[t][e - 1].color = "#D82E2D",
                    this._btnsDic[t][e - 1].background = "#D82E2D",
                    this._btnsDic[t][e - 1].children[0].color = "white",
                    this._pressedDic[t][0] = e,
                    this._correntDic[t].isVisible = !0,
                    this.currentJudge(t, e, i, n) ? this._correntDic[t].source = "images/question/correct.png" : this._correntDic[t].source = "images/question/error.png")
                } else if (-1 < this._pressedDic[t].indexOf(e)) {
                    this._btnsDic[t][e - 1].color = "#FFFFFFB2",
                    this._btnsDic[t][e - 1].background = "#FFFFFFB2",
                    this._btnsDic[t][e - 1].children[0].color = "#696969";
                    var r = this._pressedDic[t].indexOf(e);
                    this._pressedDic[t].splice(r, 1),
                    0 < this._pressedDic[t].length ? this.arrayJudge(this._pressedDic[t], n.answers) ? (this._answers[t - 1] = !0,
                    this._correntDic[t].source = "images/question/correct.png") : (this._answers[t - 1] = !1,
                    this._correntDic[t].source = "images/question/error.png") : this._correntDic[t].isVisible = !1
                } else
                    this._btnsDic[t][e - 1].color = "#D82E2D",
                    this._btnsDic[t][e - 1].background = "#D82E2D",
                    this._btnsDic[t][e - 1].children[0].color = "white",
                    this._pressedDic[t].push(e),
                    this._correntDic[t].isVisible = !0,
                    this.currentJudge(t, e, i, n) ? this._correntDic[t].source = "images/question/correct.png" : this._correntDic[t].source = "images/question/error.png";
            else
                this._pressedDic[t] = [e],
                this._btnsDic[t][e - 1].color = "#D82E2D",
                this._btnsDic[t][e - 1].background = "#D82E2D",
                this._btnsDic[t][e - 1].children[0].color = "white",
                this._correntDic[t].isVisible = !0,
                this.currentJudge(t, e, i, n) ? this._correntDic[t].source = "images/question/correct.png" : this._correntDic[t].source = "images/question/error.png";
            for (var A = 0; A < this._answers.length; A++)
                if (!this._answers[A])
                    return;
            this.finish()
        }
        ,
        a.prototype.currentJudge = function(t, e, n, i) {
            return n ? i.answer === e ? this._answers[t - 1] = !0 : this._answers[t - 1] = !1 : -1 < i.answers.indexOf(e) ? (this._pressedDic[t] ? -1 === this._pressedDic[t].indexOf(e) && this._pressedDic[t].push(e) : this._pressedDic[t] = [e],
            this.arrayJudge(this._pressedDic[t], i.answers) ? this._answers[t - 1] = !0 : this._answers[t - 1] = !1) : this._answers[t - 1] = !1
        }
        ,
        a.prototype.arrayJudge = function(t, e) {
            if (t.length !== e.length)
                return !1;
            for (var n = 0; n < t.length; n++)
                if (-1 === e.indexOf(t[n]))
                    return !1;
            return !0
        }
        ,
        a.prototype.next = function(t) {
            t < this._questions.length && (this._currentIndex++,
            this.show(this._currentIndex))
        }
        ,
        a.prototype.previous = function(t) {
            1 < t && (this._currentIndex--,
            this.show(this._currentIndex))
        }
        ,
        a.prototype.show = function(n) {
            this._uis.forEach(function(t, e) {
                t.isVisible = e + 1 === n
            })
        }
        ,
        a.prototype.settime = function(t) {
            var e = this
              , n = t;
            this.timerNoticeRect = new BABYLON.GUI.Rectangle("timerNoticeRect"),
            this.timerNoticeRect.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP,
            this.timerNoticeRect.top = "0px",
            this.timerNoticeRect.width = "400px",
            this.timerNoticeRect.height = "70px",
            this.timerNoticeRect.background = "#ffffffB2",
            this.timerNoticeRect.color = "#ffffffB2",
            this.timerNoticeRect.thickness = 0,
            this.timerNoticeRect.cornerRadius = 5,
            this.timerNoticeRect.isPointerBlocker = !0,
            this.timerNoticeRect.isVisible = !0,
            s.UIMain.advancedTexture.addControl(this.timerNoticeRect),
            this.bigTitle = new BABYLON.GUI.TextBlock("title"),
            this.bigTitle.fontSize = 20,
            this.bigTitle.fontStyle = "bold",
            this.bigTitle.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER,
            this.bigTitle.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER,
            this.bigTitle.text = n + "秒后可重新答题",
            this.bigTitle.width = "200px",
            this.bigTitle.color = "#696969",
            this.bigTitle.height = "40px",
            this.timerNoticeRect.addControl(this.bigTitle),
            this.clock = setInterval(function() {
                0 < --n ? e.bigTitle.text = n + "秒后可重新答题" : (clearInterval(e.clock),
                n = t,
                e.timerNoticeRect.isVisible = !1,
                e.btn1.isHitTestVisible = !0,
                e.btn2.isHitTestVisible = !0,
                e.btn3.isHitTestVisible = !0,
                e.btn4.isHitTestVisible = !0,
                e.btn5.isHitTestVisible = !0)
            }, 1e3)
        }
        ,
        a.prototype.close = function() {
            console.warn("close"),
            this._hide = !0,
            this._parentRect.isVisible = !1
        }
        ,
        a.prototype.finish = function() {
            console.log("finish"),
            this._uis = [],
            this._btnsDic = {},
            this._correntDic = {},
            this._pressedDic = {},
            this._answers = [],
            this._currentIndex = 1,
            this._questions = [],
            this._parentRect.dispose(),
            this._checking = !1,
            this._hide = !1,
            this._successUI.isVisible = !0,
            setTimeout(this.showSuccess.bind(this), 2e3),
            this._doors.shift().dispose(),
            this._uiTexs.shift().dispose(),
            console.log("当前成绩： " + 20 * (5 - this._doors.length) + "分"),
            r.xuebei.AddStep("解锁第" + (6 - this._doors.length) + "展馆", 20),
            o.VeryNettyPara.roomIndex = 5 - this._doors.length,
            0 === this._doors.length && r.xuebei.Upload(),
            0 === this._doors.length && this._specialDoor && this._specialDoor.dispose()
        }
        ,
        a.prototype.showSuccess = function() {
            this._successUI.dispose()
        }
        ,
        a.prototype.initDoor = function(t) {
            var e = this;
            if (!(4 < t)) {
                this._doors = [],
                this._uiTexs = [];
                var n = this
                  , i = new BABYLON.StandardMaterial("door-plane-mat",this._scene);
                if (i.diffuseColor = new BABYLON.Color3(1,.51,.753),
                i.backFaceCulling = !1,
                t < 4 && (this._specialDoor = this._scene.getMeshByName("touming_006"),
                this._specialDoor.material.backFaceCulling = !1,
                this._specialDoor.material = i,
                this._specialDoor.visibility = .55),
                t < 0) {
                    var o = this._scene.getMeshByName("touming_1");
                    o.material.backFaceCulling = !1,
                    o.material = i,
                    o.visibility = .55;
                    var r = BABYLON.Mesh.CreatePlane("door-lock-1", 50, this._scene);
                    r.position = new BABYLON.Vector3(590.769,130,2254);
                    var A = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(r);
                    this.btn1 = BABYLON.GUI.Button.CreateImageOnlyButton("lock-btn", "images/question/lock.png"),
                    this.btn1.width = 1,
                    this.btn1.height = 1,
                    this.btn1.thickness = 0,
                    o.actionManager = new BABYLON.ActionManager(this._scene),
                    this.btn1.isHitTestVisible && this.btn1.onPointerClickObservable.add(function() {
                        n.startExam("house1"),
                        console.log(e.btn1.isHitTestVisible)
                    }),
                    A.addControl(this.btn1),
                    this._doors.push(o),
                    this._uiTexs.push(A)
                }
                if (t < 1) {
                    var a = this._scene.getMeshByName("touming_002");
                    a.material.backFaceCulling = !1,
                    a.material = i,
                    a.visibility = .55;
                    var s = BABYLON.Mesh.CreatePlane("door-lock-2", 50, this._scene);
                    s.position = new BABYLON.Vector3(590.769,130,4131);
                    var l = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(s);
                    this.btn2 = BABYLON.GUI.Button.CreateImageOnlyButton("lock-btn", "images/question/lock.png"),
                    this.btn2.width = 1,
                    this.btn2.height = 1,
                    this.btn2.thickness = 0,
                    a.actionManager = new BABYLON.ActionManager(this._scene),
                    this.btn2.onPointerClickObservable.add(function() {
                        n.startExam("house2")
                    }),
                    l.addControl(this.btn2),
                    this._doors.push(a),
                    this._uiTexs.push(l)
                }
                if (t < 2) {
                    var c = this._scene.getMeshByName("touming_003");
                    c.material.backFaceCulling = !1,
                    c.material = i,
                    c.visibility = .55;
                    var h = BABYLON.Mesh.CreatePlane("door-lock-3", 50, this._scene);
                    h.position = new BABYLON.Vector3(590.769,130,6031.98);
                    var d = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(h);
                    this.btn3 = BABYLON.GUI.Button.CreateImageOnlyButton("lock-btn", "images/question/lock.png"),
                    this.btn3.width = 1,
                    this.btn3.height = 1,
                    this.btn3.thickness = 0,
                    c.actionManager = new BABYLON.ActionManager(this._scene),
                    this.btn3.onPointerClickObservable.add(function() {
                        n.startExam("house3")
                    }),
                    d.addControl(this.btn3),
                    this._doors.push(c),
                    this._uiTexs.push(d)
                }
                if (t < 3) {
                    var u = this._scene.getMeshByName("touming_004");
                    u.material.backFaceCulling = !1,
                    u.material = i,
                    u.visibility = .55,
                    u.actionManager = new BABYLON.ActionManager(this._scene);
                    var p = BABYLON.Mesh.CreatePlane("door-lock-4", 50, this._scene);
                    p.position = new BABYLON.Vector3(-597.06,120,5245.97);
                    var f = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(p);
                    this.btn4 = BABYLON.GUI.Button.CreateImageOnlyButton("lock-btn", "images/question/lock.png"),
                    this.btn4.width = 1,
                    this.btn4.height = 1,
                    this.btn4.thickness = 0,
                    this.btn4.onPointerClickObservable.add(function() {
                        n.startExam("house4")
                    }),
                    f.addControl(this.btn4),
                    this._doors.push(u),
                    this._uiTexs.push(f)
                }
                if (t < 4) {
                    var g = this._scene.getMeshByName("touming_005");
                    g.material.backFaceCulling = !1,
                    g.material = i,
                    g.visibility = .55;
                    var m = BABYLON.Mesh.CreatePlane("door-lock-5", 50, this._scene);
                    m.position = new BABYLON.Vector3(-596.49,130,3379.61);
                    var N = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(m);
                    this.btn5 = BABYLON.GUI.Button.CreateImageOnlyButton("lock-btn", "images/question/lock.png"),
                    this.btn5.width = 1,
                    this.btn5.height = 1,
                    this.btn5.thickness = 0,
                    g.actionManager = new BABYLON.ActionManager(this._scene),
                    this.btn5.onPointerClickObservable.add(function() {
                        n.startExam("house5")
                    }),
                    N.addControl(this.btn5),
                    this._doors.push(g),
                    this._uiTexs.push(N)
                }
            }
        }
        ,
        a);
        function a(t, e) {
            this._guideElement = new i.UIControl,
            this._checking = !1,
            this._hide = !1,
            this._questionStatus = !1,
            this._questionStatus1 = !1,
            this._questionStatus2 = !1,
            this._questionStatus3 = !1,
            this._questionStatus4 = !1,
            this._uis = [],
            this._btnsDic = {},
            this._correntDic = {},
            this._pressedDic = {},
            this._answers = [],
            this._currentIndex = 1,
            this._success = !1,
            this._data = null,
            this._personData = -1,
            this._questions = [],
            this._doors = [],
            this._uiTexs = [],
            this._scene = t,
            this._canvas = e;
            var n = this;
            this.loadQuestionData(),
            this.initDoor(this._personData),
            window.onbeforeunload = function() {
                0 != n._doors.length && (console.log("当前成绩： " + 20 * (5 - this._doors.length) + " 分"),
                r.xuebei.AddStep("解锁第" + (6 - this._doors.length) + "展馆", 20))
            }
        }
        n.Question = A
    }
    , {
        "./ui-control": 19,
        "./uiMain": 20,
        "./veryNetty/VeryNettyPara": 32,
        "./xuebei": 35
    }],
    18: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = t("./globalControl")
          , h = t("./uiMain")
          , i = (o.prototype.add = function(t, e) {
            this._videoDic[t] = e
        }
        ,
        o.prototype.loadData = function() {
            var e = this;
            axios.get("./data/screen-video.json").then(function(t) {
                e._data = t.data,
                e._success = !0,
                e.lobbyVideoInit()
            }).catch(function(t) {
                console.log("load error: " + t)
            })
        }
        ,
        o.prototype.lobbyVideoInit = function() {
            var e = this;
            Object.keys(this._data).forEach(function(t) {
                if (void 0 !== e._data[t].lobby && e._data[t].lobby)
                    return h.UIMain.lobbyScreen = e._scene.getMeshByName(t),
                    void (e._lobbyVideoName = e._data[t].video)
            })
        }
        ,
        o.prototype.stop = function() {
            var e = this;
            Object.keys(this._videoDic).forEach(function(t) {
                e._videoDic[t] && e._videoDic[t].video && e._videoDic[t].video.pause()
            }),
            c.GlobalControl.screenVideoOn = !1
        }
        ,
        o);
        function o(a) {
            var s = this;
            this._success = !1,
            this._data = null,
            this._videoDic = {},
            this._lobbyVideoLoaded = !1,
            this._lobbyVideoName = "",
            this._scene = a,
            this.loadData();
            var l = this;
            this._scene.onPointerObservable.add(function(t) {
                if (!l._lobbyVideoLoaded && t.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                    var e = new BABYLON.VideoTexture("video-lobby-tex","video/" + l._lobbyVideoName,l._scene,!0,!1,BABYLON.Texture.TRILINEAR_SAMPLINGMODE,{
                        autoPlay: !0,
                        autoUpdateTexture: !0,
                        loop: !0
                    })
                      , n = new BABYLON.StandardMaterial("video-lobby-mat",l._scene);
                    n.emissiveColor = BABYLON.Color3.White(),
                    n.backFaceCulling = !1,
                    n.diffuseTexture = e;
                    var i = h.UIMain.lobbyScreen.name;
                    (A = BABYLON.MeshBuilder.CreatePlane("video-lobby-" + h.UIMain.lobbyScreen.name, {
                        size: 200
                    }, l._scene)).position = new BABYLON.Vector3(l._data[i].position[0],l._data[i].position[1],l._data[i].position[2]),
                    A.rotation = new BABYLON.Vector3(l._data[i].angle[0] / 180 * Math.PI,l._data[i].angle[1] / 180 * Math.PI,l._data[i].angle[2] / 180 * Math.PI),
                    A.scaling = new BABYLON.Vector3(l._data[i].scale[0],l._data[i].scale[1],l._data[i].scale[2]),
                    A.isPickable = !1,
                    A.checkCollisions = !1,
                    A.material = n,
                    c.GlobalControl.lobbyScreenVideoTex = e,
                    l._videoDic[i] = e,
                    l._lobbyVideoLoaded = !0
                }
                if (t.type === BABYLON.PointerEventTypes.POINTERDOWN && 0 === t.event.button && t.pickInfo && t.pickInfo.hit) {
                    var o = t.pickInfo.pickedMesh;
                    if (s._videoDic[o.name])
                        s._videoDic[o.name].video.paused ? (l.stop(),
                        s._videoDic[o.name].video.play(),
                        c.GlobalControl.PauseAudio(!0),
                        c.GlobalControl.PauseExhibitsVideo(),
                        c.GlobalControl.screenVideoOn = !0) : (s._videoDic[o.name].video.pause(),
                        c.GlobalControl.PauseAudio(!1),
                        c.GlobalControl.screenVideoOn = !1);
                    else if (s._success && s._data[o.name]) {
                        l.stop(),
                        (e = new BABYLON.VideoTexture("video-tex-" + o.name,"video/" + s._data[o.name].video,a,!0,!1,BABYLON.Texture.TRILINEAR_SAMPLINGMODE,{
                            autoPlay: !0,
                            autoUpdateTexture: !0,
                            loop: !0
                        })).coordinatesIndex = 0;
                        var r = new BABYLON.StandardMaterial("video-mat-" + o.name,a);
                        r.emissiveColor = BABYLON.Color3.White(),
                        r.diffuseTexture = e,
                        r.backFaceCulling = !1;
                        var A;
                        i = o.name;
                        (A = BABYLON.MeshBuilder.CreatePlane("video-screen-" + i, {
                            size: 200
                        }, l._scene)).position = new BABYLON.Vector3(l._data[i].position[0],l._data[i].position[1],l._data[i].position[2]),
                        A.rotation = new BABYLON.Vector3(l._data[i].angle[0] / 180 * Math.PI,l._data[i].angle[1] / 180 * Math.PI,l._data[i].angle[2] / 180 * Math.PI),
                        A.scaling = new BABYLON.Vector3(l._data[i].scale[0],l._data[i].scale[1],l._data[i].scale[2]),
                        A.isPickable = !1,
                        A.checkCollisions = !1,
                        A.material = r,
                        l._videoDic[o.name] = e,
                        c.GlobalControl.PauseAudio(!0),
                        c.GlobalControl.PauseExhibitsVideo(),
                        c.GlobalControl.screenVideoOn = !0
                    }
                }
            })
        }
        n.ScreenVideo = i
    }
    , {
        "./globalControl": 8,
        "./uiMain": 20
    }],
    19: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (r.prototype.init = function(e) {
            var n = this;
            this._lastKey = e,
            Object.keys(this._uiSet).forEach(function(t) {
                n._uiSet[t].isVisible = t === e
            })
        }
        ,
        r.prototype.add = function(t, e) {
            var n = t.lastIndexOf(":");
            if (-1 < n) {
                var i = t.substring(0, n)
                  , o = t.substring(n + 1);
                this._uiControlSet[i] || (this._uiControlSet[i] = new r),
                this._uiControlSet[i].add(o, e)
            } else
                this._uiSet[t] = e
        }
        ,
        r.prototype.display = function(t) {
            t !== this._lastKey && (this._uiSet[this._lastKey] && (this._uiSet[this._lastKey].isVisible = !1),
            this._uiSet[t] && (this._uiSet[t].isVisible = !0),
            this._lastKey = t)
        }
        ,
        r.prototype.meanwhile = function() {}
        ,
        r.prototype.exclude = function(t) {
            t.lastIndexOf(":")
        }
        ,
        r.prototype.close = function() {
            var e = this;
            Object.keys(this._uiSet).forEach(function(t) {
                e._uiSet[t].isVisible = !1
            }),
            Object.keys(this._uiControlSet).forEach(function(t) {
                e._uiControlSet[t].close()
            }),
            this._lastKey = ""
        }
        ,
        r);
        function r() {
            this._uiSet = {},
            this._lastKey = "",
            this._uiControlSet = {}
        }
        n.UIControl = i
    }
    , {}],
    20: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.closePersonMenu = function(t) {
            t ? (o.personInfoBtn && (o.personInfoBtn.isVisible = !1),
            o.personInfoPanel && (o.personInfoPanel.isVisible = !1)) : o.personInfoBtn && (o.personInfoBtn.isVisible = !0)
        }
        ,
        o);
        function o() {}
        n.UIMain = i
    }
    , {}],
    21: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.ToInt32 = function(t, e) {
            var n = t[e] << 24;
            return n += t[e + 1] << 16,
            n += t[e + 2] << 8,
            n += t[e + 3]
        }
        ,
        o.GetBytesInt32 = function(t) {
            var e = new Array(4);
            return e[0] = t >> 24,
            e[1] = (t >> 16) - (e[0] << 8),
            e[2] = (t >> 8) - (e[1] << 8) - (e[0] << 16),
            e[3] = t - (e[2] << 8) - (e[1] << 16) - (e[0] << 24),
            e
        }
        ,
        o);
        function o() {}
        n.BitConverter = i
    }
    , {}],
    22: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.prototype.add = function(t) {
            this._value.push(t)
        }
        ,
        o.prototype.run = function() {
            for (var t = 0; t < this._value.length; t++)
                this._value[t]()
        }
        ,
        o.prototype.remove = function(t) {
            var e = this._value.indexOf(t);
            -1 < e && this._value.splice(e, 1)
        }
        ,
        Object.defineProperty(o.prototype, "count", {
            get: function() {
                return this._value.length
            },
            enumerable: !0,
            configurable: !0
        }),
        o);
        function o() {
            this._value = new Array
        }
        n.action0 = i;
        var r = (A.prototype.add = function(t) {
            this._value.push(t)
        }
        ,
        A.prototype.run = function(t) {
            for (var e = 0; e < this._value.length; e++)
                this._value[e](t)
        }
        ,
        A.prototype.remove = function(t) {
            var e = this._value.indexOf(t);
            -1 < e && this._value.splice(e, 1)
        }
        ,
        Object.defineProperty(A.prototype, "count", {
            get: function() {
                return this._value.length
            },
            enumerable: !0,
            configurable: !0
        }),
        A);
        function A() {
            this._value = new Array
        }
        n.action1 = r;
        var a = (s.prototype.add = function(t) {
            this._value.push(t)
        }
        ,
        s.prototype.run = function(t, e) {
            for (var n = 0; n < this._value.length; n++)
                this._value[n](t, e)
        }
        ,
        s.prototype.remove = function(t) {
            var e = this._value.indexOf(t);
            -1 < e && this._value.splice(e, 1)
        }
        ,
        Object.defineProperty(s.prototype, "count", {
            get: function() {
                return this._value.length
            },
            enumerable: !0,
            configurable: !0
        }),
        s);
        function s() {
            this._value = new Array
        }
        n.action2 = a
    }
    , {}],
    23: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (Object.defineProperty(o.prototype, "count", {
            get: function() {
                return this.Count()
            },
            enumerable: !0,
            configurable: !0
        }),
        o.prototype.clear = function() {
            this._keys = [],
            this._values = []
        }
        ,
        o.prototype.Add = function(t, e) {
            return this._keys.push(t),
            this._values.push(e)
        }
        ,
        o.prototype.Remove = function(t) {
            var e = this._keys.indexOf(t, 0);
            this._keys.splice(e, 1),
            this._values.splice(e, 1)
        }
        ,
        o.prototype.RemoveAt = function(t) {
            this._keys.splice(t, 1),
            this._values.splice(t, 1)
        }
        ,
        o.prototype.Count = function() {
            return this._keys.length
        }
        ,
        o.prototype.SetValue = function(t, e) {
            var n = this._keys.indexOf(t, 0);
            return -1 != n && (this._keys[n] = t,
            this._values[n] = e,
            !0)
        }
        ,
        o.prototype.GetValue = function(t) {
            var e = this._keys.indexOf(t, 0);
            return -1 != e ? this._values[e] : null
        }
        ,
        o.prototype.GetValueByIndex = function(t) {
            return -1 < t && t < this.count ? this._values[t] : null
        }
        ,
        o.prototype.GetKeyByIndex = function(t) {
            return -1 < t && t < this.count ? this._keys[t] : null
        }
        ,
        o.prototype.ContainsKey = function(t) {
            for (var e = this._keys, n = 0; n < e.length; ++n)
                if (e[n] == t)
                    return !0;
            return !1
        }
        ,
        o.prototype.ContainsValue = function(t) {
            for (var e = this._values, n = 0; n < e.length; ++n)
                if (e[n] == t)
                    return !0;
            return !1
        }
        ,
        o.prototype.GetKeys = function() {
            return this._keys
        }
        ,
        o.prototype.GetValues = function() {
            return this._values
        }
        ,
        o);
        function o() {
            this._keys = [],
            this._values = []
        }
        n.Dictionary = i
    }
    , {}],
    24: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.prototype.hex_md5 = function(t) {
            return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)))
        }
        ,
        o.prototype.b64_md5 = function(t) {
            return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)))
        }
        ,
        o.prototype.any_md5 = function(t, e) {
            return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)), e)
        }
        ,
        o.prototype.hex_hmac_md5 = function(t, e) {
            return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)))
        }
        ,
        o.prototype.b64_hmac_md5 = function(t, e) {
            return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)))
        }
        ,
        o.prototype.any_hmac_md5 = function(t, e, n) {
            return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t), this.str2rstr_utf8(e)), n)
        }
        ,
        o.prototype.md5_vm_test = function() {
            return "900150983cd24fb0d6963f7d28e17f72" == this.hex_md5("abc").toLowerCase()
        }
        ,
        o.prototype.rstr_md5 = function(t) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(t), 8 * t.length))
        }
        ,
        o.prototype.rstr_hmac_md5 = function(t, e) {
            var n = this.rstr2binl(t);
            16 < n.length && (n = this.binl_md5(n, 8 * t.length));
            for (var i = Array(16), o = Array(16), r = 0; r < 16; r++)
                i[r] = 909522486 ^ n[r],
                o[r] = 1549556828 ^ n[r];
            var A = this.binl_md5(i.concat(this.rstr2binl(e)), 512 + 8 * e.length);
            return this.binl2rstr(this.binl_md5(o.concat(A), 640))
        }
        ,
        o.prototype.rstr2hex = function(t) {
            try {
                this.hexcase
            } catch (t) {
                this.hexcase = 0
            }
            for (var e, n = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef", i = "", o = 0; o < t.length; o++)
                e = t.charCodeAt(o),
                i += n.charAt(e >>> 4 & 15) + n.charAt(15 & e);
            return i
        }
        ,
        o.prototype.rstr2b64 = function(t) {
            try {
                this.b64pad
            } catch (t) {
                this.b64pad = ""
            }
            for (var e = "", n = t.length, i = 0; i < n; i += 3)
                for (var o = t.charCodeAt(i) << 16 | (i + 1 < n ? t.charCodeAt(i + 1) << 8 : 0) | (i + 2 < n ? t.charCodeAt(i + 2) : 0), r = 0; r < 4; r++)
                    8 * i + 6 * r > 8 * t.length ? e += this.b64pad : e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >>> 6 * (3 - r) & 63);
            return e
        }
        ,
        o.prototype.rstr2any = function(t, e) {
            var n, i, o, r, A, a = e.length, s = Array(Math.ceil(t.length / 2));
            for (n = 0; n < s.length; n++)
                s[n] = t.charCodeAt(2 * n) << 8 | t.charCodeAt(2 * n + 1);
            var l = Math.ceil(8 * t.length / (Math.log(e.length) / Math.log(2)))
              , c = Array(l);
            for (i = 0; i < l; i++) {
                for (A = Array(),
                n = r = 0; n < s.length; n++)
                    r = (r << 16) + s[n],
                    r -= (o = Math.floor(r / a)) * a,
                    (0 < A.length || 0 < o) && (A[A.length] = o);
                c[i] = r,
                s = A
            }
            var h = "";
            for (n = c.length - 1; 0 <= n; n--)
                h += e.charAt(c[n]);
            return h
        }
        ,
        o.prototype.str2rstr_utf8 = function(t) {
            for (var e, n, i = "", o = -1; ++o < t.length; )
                e = t.charCodeAt(o),
                n = o + 1 < t.length ? t.charCodeAt(o + 1) : 0,
                55296 <= e && e <= 56319 && 56320 <= n && n <= 57343 && (e = 65536 + ((1023 & e) << 10) + (1023 & n),
                o++),
                e <= 127 ? i += String.fromCharCode(e) : e <= 2047 ? i += String.fromCharCode(192 | e >>> 6 & 31, 128 | 63 & e) : e <= 65535 ? i += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | 63 & e) : e <= 2097151 && (i += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | 63 & e));
            return i
        }
        ,
        o.prototype.str2rstr_utf16le = function(t) {
            for (var e = "", n = 0; n < t.length; n++)
                e += String.fromCharCode(255 & t.charCodeAt(n), t.charCodeAt(n) >>> 8 & 255);
            return e
        }
        ,
        o.prototype.str2rstr_utf16be = function(t) {
            for (var e = "", n = 0; n < t.length; n++)
                e += String.fromCharCode(t.charCodeAt(n) >>> 8 & 255, 255 & t.charCodeAt(n));
            return e
        }
        ,
        o.prototype.rstr2binl = function(t) {
            for (var e = Array(t.length >> 2), n = 0; n < e.length; n++)
                e[n] = 0;
            for (n = 0; n < 8 * t.length; n += 8)
                e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << n % 32;
            return e
        }
        ,
        o.prototype.binl2rstr = function(t) {
            for (var e = "", n = 0; n < 32 * t.length; n += 8)
                e += String.fromCharCode(t[n >> 5] >>> n % 32 & 255);
            return e
        }
        ,
        o.prototype.binl_md5 = function(t, e) {
            t[e >> 5] |= 128 << e % 32,
            t[14 + (e + 64 >>> 9 << 4)] = e;
            for (var n = 1732584193, i = -271733879, o = -1732584194, r = 271733878, A = 0; A < t.length; A += 16) {
                var a = n
                  , s = i
                  , l = o
                  , c = r;
                n = this.md5_ff(n, i, o, r, t[A + 0], 7, -680876936),
                r = this.md5_ff(r, n, i, o, t[A + 1], 12, -389564586),
                o = this.md5_ff(o, r, n, i, t[A + 2], 17, 606105819),
                i = this.md5_ff(i, o, r, n, t[A + 3], 22, -1044525330),
                n = this.md5_ff(n, i, o, r, t[A + 4], 7, -176418897),
                r = this.md5_ff(r, n, i, o, t[A + 5], 12, 1200080426),
                o = this.md5_ff(o, r, n, i, t[A + 6], 17, -1473231341),
                i = this.md5_ff(i, o, r, n, t[A + 7], 22, -45705983),
                n = this.md5_ff(n, i, o, r, t[A + 8], 7, 1770035416),
                r = this.md5_ff(r, n, i, o, t[A + 9], 12, -1958414417),
                o = this.md5_ff(o, r, n, i, t[A + 10], 17, -42063),
                i = this.md5_ff(i, o, r, n, t[A + 11], 22, -1990404162),
                n = this.md5_ff(n, i, o, r, t[A + 12], 7, 1804603682),
                r = this.md5_ff(r, n, i, o, t[A + 13], 12, -40341101),
                o = this.md5_ff(o, r, n, i, t[A + 14], 17, -1502002290),
                i = this.md5_ff(i, o, r, n, t[A + 15], 22, 1236535329),
                n = this.md5_gg(n, i, o, r, t[A + 1], 5, -165796510),
                r = this.md5_gg(r, n, i, o, t[A + 6], 9, -1069501632),
                o = this.md5_gg(o, r, n, i, t[A + 11], 14, 643717713),
                i = this.md5_gg(i, o, r, n, t[A + 0], 20, -373897302),
                n = this.md5_gg(n, i, o, r, t[A + 5], 5, -701558691),
                r = this.md5_gg(r, n, i, o, t[A + 10], 9, 38016083),
                o = this.md5_gg(o, r, n, i, t[A + 15], 14, -660478335),
                i = this.md5_gg(i, o, r, n, t[A + 4], 20, -405537848),
                n = this.md5_gg(n, i, o, r, t[A + 9], 5, 568446438),
                r = this.md5_gg(r, n, i, o, t[A + 14], 9, -1019803690),
                o = this.md5_gg(o, r, n, i, t[A + 3], 14, -187363961),
                i = this.md5_gg(i, o, r, n, t[A + 8], 20, 1163531501),
                n = this.md5_gg(n, i, o, r, t[A + 13], 5, -1444681467),
                r = this.md5_gg(r, n, i, o, t[A + 2], 9, -51403784),
                o = this.md5_gg(o, r, n, i, t[A + 7], 14, 1735328473),
                i = this.md5_gg(i, o, r, n, t[A + 12], 20, -1926607734),
                n = this.md5_hh(n, i, o, r, t[A + 5], 4, -378558),
                r = this.md5_hh(r, n, i, o, t[A + 8], 11, -2022574463),
                o = this.md5_hh(o, r, n, i, t[A + 11], 16, 1839030562),
                i = this.md5_hh(i, o, r, n, t[A + 14], 23, -35309556),
                n = this.md5_hh(n, i, o, r, t[A + 1], 4, -1530992060),
                r = this.md5_hh(r, n, i, o, t[A + 4], 11, 1272893353),
                o = this.md5_hh(o, r, n, i, t[A + 7], 16, -155497632),
                i = this.md5_hh(i, o, r, n, t[A + 10], 23, -1094730640),
                n = this.md5_hh(n, i, o, r, t[A + 13], 4, 681279174),
                r = this.md5_hh(r, n, i, o, t[A + 0], 11, -358537222),
                o = this.md5_hh(o, r, n, i, t[A + 3], 16, -722521979),
                i = this.md5_hh(i, o, r, n, t[A + 6], 23, 76029189),
                n = this.md5_hh(n, i, o, r, t[A + 9], 4, -640364487),
                r = this.md5_hh(r, n, i, o, t[A + 12], 11, -421815835),
                o = this.md5_hh(o, r, n, i, t[A + 15], 16, 530742520),
                i = this.md5_hh(i, o, r, n, t[A + 2], 23, -995338651),
                n = this.md5_ii(n, i, o, r, t[A + 0], 6, -198630844),
                r = this.md5_ii(r, n, i, o, t[A + 7], 10, 1126891415),
                o = this.md5_ii(o, r, n, i, t[A + 14], 15, -1416354905),
                i = this.md5_ii(i, o, r, n, t[A + 5], 21, -57434055),
                n = this.md5_ii(n, i, o, r, t[A + 12], 6, 1700485571),
                r = this.md5_ii(r, n, i, o, t[A + 3], 10, -1894986606),
                o = this.md5_ii(o, r, n, i, t[A + 10], 15, -1051523),
                i = this.md5_ii(i, o, r, n, t[A + 1], 21, -2054922799),
                n = this.md5_ii(n, i, o, r, t[A + 8], 6, 1873313359),
                r = this.md5_ii(r, n, i, o, t[A + 15], 10, -30611744),
                o = this.md5_ii(o, r, n, i, t[A + 6], 15, -1560198380),
                i = this.md5_ii(i, o, r, n, t[A + 13], 21, 1309151649),
                n = this.md5_ii(n, i, o, r, t[A + 4], 6, -145523070),
                r = this.md5_ii(r, n, i, o, t[A + 11], 10, -1120210379),
                o = this.md5_ii(o, r, n, i, t[A + 2], 15, 718787259),
                i = this.md5_ii(i, o, r, n, t[A + 9], 21, -343485551),
                n = this.safe_add(n, a),
                i = this.safe_add(i, s),
                o = this.safe_add(o, l),
                r = this.safe_add(r, c)
            }
            return [n, i, o, r]
        }
        ,
        o.prototype.md5_cmn = function(t, e, n, i, o, r) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(e, t), this.safe_add(i, r)), o), n)
        }
        ,
        o.prototype.md5_ff = function(t, e, n, i, o, r, A) {
            return this.md5_cmn(e & n | ~e & i, t, e, o, r, A)
        }
        ,
        o.prototype.md5_gg = function(t, e, n, i, o, r, A) {
            return this.md5_cmn(e & i | n & ~i, t, e, o, r, A)
        }
        ,
        o.prototype.md5_hh = function(t, e, n, i, o, r, A) {
            return this.md5_cmn(e ^ n ^ i, t, e, o, r, A)
        }
        ,
        o.prototype.md5_ii = function(t, e, n, i, o, r, A) {
            return this.md5_cmn(n ^ (e | ~i), t, e, o, r, A)
        }
        ,
        o.prototype.safe_add = function(t, e) {
            var n = (65535 & t) + (65535 & e);
            return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
        }
        ,
        o.prototype.bit_rol = function(t, e) {
            return t << e | t >>> 32 - e
        }
        ,
        o);
        function o() {
            this.hexcase = 0,
            this.b64pad = ""
        }
        n.default = i
    }
    , {}],
    25: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.Allocate = function(t) {
            if ("number" == typeof t)
                return new o(t);
            var e = new o(t.length);
            return e.WriteBytes(t),
            e
        }
        ,
        o.prototype.ToArray = function() {
            return this.buf
        }
        ,
        o.prototype.ToBytes = function() {
            for (var t = new Array, e = 0; e < this.ReadableBytes(); e++)
                t.push(this.bufView.getUint8(e + this.readIndex));
            return t
        }
        ,
        o.GetFromPool = function(t) {
            var e;
            if (0 == this.pool.length)
                return (e = o.Allocate(t)).isPool = !0,
                e;
            var n = this.pool.length - 1;
            return e = this.pool[n],
            this.pool.splice(n, 1),
            e.isPool || (e.isPool = !0),
            e
        }
        ,
        o.prototype.FixLength = function(t) {
            for (var e = 2, n = 2; n < t; )
                n = 2 << e,
                e++;
            return n
        }
        ,
        o.prototype.FixSizeAndReset = function(t, e) {
            if (t < e) {
                var n = 2 * this.FixLength(t);
                n < e && (n = 2 * this.FixLength(e));
                var i = new ArrayBuffer(n);
                this.Copy(this.buf, 0, i, 0, t),
                this.buf = i,
                this.bufView = new DataView(this.buf),
                this.capacity = i.byteLength
            }
            return e
        }
        ,
        o.prototype.WriteBytes = function(t, e, n) {
            if (void 0 === e && (e = 0),
            void 0 === n && (n = -1),
            0 != t.length && (-1 === n && (e = 0,
            n = t.length),
            !(e + n > t.length))) {
                var i = this.buf.byteLength;
                this.FixSizeAndReset(i, this.writeIndex + n);
                for (var o = 0; o < n; o++)
                    this.bufView.setUint8(this.writeIndex, t[o + e]),
                    this.writeIndex += 1
            }
        }
        ,
        o.prototype.WriteString = function(t) {
            var e = this.UTF8GetBytes(t)
              , n = e.length;
            this.WriteInt(n),
            this.WriteBytes(e)
        }
        ,
        o.prototype.ReadString = function() {
            var t = this.ReadInt()
              , e = new Array(t);
            return this.ReadBytes(e, 0, t),
            this.UTF8GetString(e)
        }
        ,
        o.prototype.WriteInt = function(t) {
            this.bufView.setInt32(this.writeIndex, t, o.IslittleEndian),
            this.writeIndex += 4
        }
        ,
        o.prototype.ReadBytes = function(t, e, n) {
            for (var i = e + n, o = e; o < i; o++)
                t[o] = this.ReadByte()
        }
        ,
        o.prototype.ReadByte = function() {
            var t = this.bufView.getUint8(this.readIndex);
            return this.readIndex++,
            t
        }
        ,
        o.prototype.UTF8GetBytes = function(t) {
            for (var e = [], n = 0; n < t.length; n++) {
                var i = t.charCodeAt(n);
                0 <= i && i <= 127 ? e.push(i) : 128 <= i && i <= 2047 ? (e.push(192 | 31 & i >> 6),
                e.push(128 | 63 & i)) : (2048 <= i && i <= 55295 || 57344 <= i && i <= 65535) && (e.push(224 | 15 & i >> 12),
                e.push(128 | 63 & i >> 6),
                e.push(128 | 63 & i))
            }
            for (n = 0; n < e.length; n++)
                e[n] &= 255;
            return e
        }
        ,
        o.prototype.UTF8GetString = function(t) {
            for (var e = "", n = 0; n < t.length; n++) {
                var i = t[n].toString(2)
                  , o = i.match(/^1+?(?=0)/);
                if (o && 8 == i.length) {
                    for (var r = o[0].length, A = t[n].toString(2).slice(7 - r), a = 1; a < r; a++)
                        A += t[a + n].toString(2).slice(2);
                    e += String.fromCharCode(parseInt(A, 2)),
                    n += r - 1
                } else
                    e += String.fromCharCode(t[n])
            }
            return e
        }
        ,
        o.prototype.Copy = function(t, e, n, i, o) {
            for (var r = new Int8Array(t), A = new Int8Array(n), a = 0; a < o; a++)
                A[a + i] = r[e + a]
        }
        ,
        o.prototype.Write = function(t) {
            null != t && (t instanceof ArrayBuffer ? (this.Copy(t, 0, this.buf, this.writeIndex, t.byteLength),
            this.writeIndex += t.byteLength) : (this.Copy(t.ToArray(), t.readIndex, this.buf, this.writeIndex, t.ReadableBytes()),
            this.writeIndex += t.ReadableBytes()))
        }
        ,
        o.prototype.WriteShort = function(t) {
            this.bufView.setInt16(this.writeIndex, t, o.IslittleEndian),
            this.writeIndex += 2
        }
        ,
        o.prototype.WriteUshort = function(t) {
            this.bufView.setUint16(this.writeIndex, t, o.IslittleEndian),
            this.writeIndex += 2
        }
        ,
        o.prototype.WriteUint = function(t) {
            this.bufView.setUint32(this.writeIndex, t, o.IslittleEndian),
            this.writeIndex += 4
        }
        ,
        o.prototype.WriteLong = function(t) {}
        ,
        o.prototype.WriteUlong = function(t) {}
        ,
        o.prototype.WriteFloat = function(t) {
            this.bufView.setFloat32(this.writeIndex, t, o.IslittleEndian),
            this.writeIndex += 4
        }
        ,
        o.prototype.WriteByte = function(t) {
            this.bufView.setUint8(this.writeIndex, t),
            this.writeIndex += 1
        }
        ,
        o.prototype.WriteDouble = function(t) {
            this.bufView.setFloat64(this.writeIndex, t, o.IslittleEndian),
            this.writeIndex += 8
        }
        ,
        o.prototype.WriteChar = function(t) {
            this.WriteUshort(t)
        }
        ,
        o.prototype.WriteBoolean = function(t) {
            var e = 0;
            t && (e = 1),
            this.bufView.setUint8(this.writeIndex, e),
            this.writeIndex += 1
        }
        ,
        o.prototype.Read = function(t) {
            for (var e = new Array, n = 0; n < t; n++)
                e.push(this.ReadByte());
            return e
        }
        ,
        o.prototype.ReadUshort = function() {
            var t = this.bufView.getUint16(this.readIndex, o.IslittleEndian);
            return this.readIndex += 2,
            t
        }
        ,
        o.prototype.ReadShort = function() {
            var t = this.bufView.getInt16(this.readIndex, o.IslittleEndian);
            return this.readIndex += 2,
            t
        }
        ,
        o.prototype.ReadUint = function() {
            var t = this.bufView.getUint32(this.readIndex, o.IslittleEndian);
            return this.readIndex += 4,
            t
        }
        ,
        o.prototype.ReadInt = function() {
            var t = this.bufView.getInt32(this.readIndex, o.IslittleEndian);
            return this.readIndex += 4,
            t
        }
        ,
        o.prototype.ReadUlong = function() {}
        ,
        o.prototype.ReadLong = function() {}
        ,
        o.prototype.ReadFloat = function() {
            var t = this.bufView.getFloat32(this.readIndex, o.IslittleEndian);
            return this.readIndex += 4,
            t
        }
        ,
        o.prototype.ReadDouble = function() {
            var t = this.bufView.getFloat64(this.readIndex, o.IslittleEndian);
            return this.readIndex += 8,
            t
        }
        ,
        o.prototype.ReadChar = function() {
            return this.ReadUshort
        }
        ,
        o.prototype.ReadBoolean = function() {
            var t = this.bufView.getUint8(this.readIndex);
            return this.readIndex++,
            0 !== t
        }
        ,
        o.prototype.ReadRetainedSlice = function(t) {
            if (null == t)
                return t = this.ReadableBytes(),
                e = this.buf.slice(this.readIndex, this.readIndex + t),
                this.readIndex += t,
                new o(e);
            var e = this.buf.slice(this.readIndex, this.readIndex + t);
            return this.readIndex += t,
            new o(e)
        }
        ,
        o.prototype.ReadableBytes = function() {
            return this.writeIndex - this.readIndex
        }
        ,
        o.prototype.DiscardReadBytes = function() {
            if (!(this.readIndex <= 0)) {
                var t = this.buf.byteLength - this.readIndex
                  , e = new ArrayBuffer(t);
                this.Copy(this.buf, this.readIndex, e, 0, t),
                this.buf = e,
                this.writeIndex -= this.readIndex,
                this.markReadIndex -= this.readIndex,
                this.markReadIndex < 0 && (this.markReadIndex = 0),
                this.markWirteIndex -= this.readIndex,
                (this.markWirteIndex < 0 || this.markWirteIndex < this.readIndex || this.markWirteIndex < this.markReadIndex) && (this.markWirteIndex = this.writeIndex),
                this.readIndex = 0
            }
        }
        ,
        o.prototype.Clear = function() {
            this.buf = new ArrayBuffer(this.buf.byteLength),
            this.readIndex = 0,
            this.writeIndex = 0,
            this.markReadIndex = 0,
            this.markWirteIndex = 0,
            this.capacity = this.buf.byteLength
        }
        ,
        o.prototype.Dispose = function() {
            this.readIndex = 0,
            this.writeIndex = 0,
            this.markReadIndex = 0,
            this.markWirteIndex = 0,
            this.isPool ? o.pool.length < o.poolMaxCount && o.pool.push(this) : (this.capacity = 0,
            this.buf = new ArrayBuffer(0))
        }
        ,
        Object.defineProperty(o.prototype, "ReaderIndex", {
            get: function() {
                return this.readIndex
            },
            set: function(t) {
                t < 0 || (this.readIndex = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(o.prototype, "WriterIndex", {
            get: function() {
                return this.writeIndex
            },
            set: function(t) {
                t < 0 || (this.writeIndex = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        o.prototype.MarkReaderIndex = function() {
            this.markReadIndex = this.readIndex
        }
        ,
        o.prototype.MarkWriterIndex = function() {
            this.markWirteIndex = this.writeIndex
        }
        ,
        o.prototype.ResetReaderIndex = function() {
            this.readIndex = this.markReadIndex
        }
        ,
        o.prototype.ResetWriterIndex = function() {
            this.writeIndex = this.markWirteIndex
        }
        ,
        o.prototype.GetCapacity = function() {
            return this.capacity
        }
        ,
        o.prototype.Clone = function() {
            if (null == this.buf)
                return new o(16);
            if (this.readIndex < this.writeIndex) {
                var t = new ArrayBuffer(this.writeIndex - this.readIndex);
                return this.Copy(this.buf, this.readIndex, t, 0, t.byteLength),
                new o(t)
            }
            return new o(16)
        }
        ,
        o.pool = new Array,
        o.poolMaxCount = 200,
        o.IslittleEndian = !1,
        o);
        function o(t) {
            this.readIndex = 0,
            this.writeIndex = 0,
            this.markReadIndex = 0,
            this.markWirteIndex = 0,
            this.isPool = !1,
            "number" == typeof t ? (this.buf = new ArrayBuffer(t),
            this.bufView = new DataView(this.buf),
            this.capacity = t,
            this.readIndex = 0,
            this.writeIndex = 0) : (this.capacity = t.byteLength,
            this.buf = t,
            this.bufView = new DataView(this.buf),
            this.readIndex = 0,
            this.writeIndex = this.capacity)
        }
        n.ByteBuffer = i
    }
    , {}],
    26: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("./../utility/dictionary")
          , r = t("./../utility/action")
          , o = (A.AddCallBackRecord = function(t) {
            if (!A._veryAct2Number.ContainsKey(t)) {
                var e = A._veryAct2Number.count + 10;
                A._veryAct2Number.Add(t, e)
            }
        }
        ,
        A.AddCallBackAction = function(t, e, n) {
            var i = 0;
            if ("number" == typeof t)
                i = t;
            else {
                var o = A._veryAct2Number.GetValue(t);
                if (null == o)
                    return -1;
                i = o
            }
            if (n) {
                if (0 <= A._recordDirectSend.indexOf(i))
                    return -1;
                A._recordDirectSend.push(i)
            }
            return A._callBackAction.ContainsKey(i) || (A._callBackAction.Add(i, new r.action1),
            n && A._callBackAction.GetValue(i).add(function() {
                A.RemoveDirectSend(i)
            })),
            A._callBackAction.GetValue(i).add(e),
            i
        }
        ,
        A.IsExitDirectSend = function(t) {
            return 0 <= A._recordDirectSend.indexOf(t)
        }
        ,
        A.RemoveDirectSend = function(t) {
            var e = A._recordDirectSend.indexOf(t);
            0 <= e && A._recordDirectSend.splice(e, 1)
        }
        ,
        A.CallBackAceppt = function(t) {
            var e = t.ReadInt();
            A._callBackAction.ContainsKey(e) && A._callBackAction.GetValue(e).run(t)
        }
        ,
        A.BackMessage = function(t) {
            switch (t) {
            case 1:
                return "创建房间发生错误，错误代码001";
            case 2:
                return "创建房间发生错误，房间名已存在";
            case 3:
                return "加入房间发生错误，错误代码003";
            case 4:
                return "加入房间发生错误，人数已满";
            case 5:
                return "加入房间发生错误，房间名不存在";
            case 6:
                return "账号登录发生错误，登录人数超过节点";
            case 7:
                return "账号登录发生错误，账号密码不符";
            case 8:
                return "发送验证码失败";
            case 9:
                return "注册失败";
            case 10:
                return "数组添加单元，数据库中该数组不存在";
            case 11:
                return "账号已存在";
            default:
                return "返回信息类型不存在!"
            }
        }
        ,
        A._veryAct2Number = new i.Dictionary,
        A._callBackAction = new i.Dictionary,
        A._recordDirectSend = new Array,
        A);
        function A() {}
        n.CallBackManager = o
    }
    , {
        "./../utility/action": 22,
        "./../utility/dictionary": 23
    }],
    27: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i, o = t("./../utility/BitConverter");
        (i = n.LoginCommand || (n.LoginCommand = {}))[i.binary_login = 4096] = "binary_login",
        i[i.protobuf_login = 8192] = "protobuf_login";
        function r() {}
        n.SocketData = r;
        var A = (Object.defineProperty(a, "HEAD_LEN", {
            get: function() {
                return this.HEAD_DATA_LEN + this.HEAD_TYPE_LEN
            },
            enumerable: !0,
            configurable: !0
        }),
        a.HEAD_DATA_LEN = 4,
        a.HEAD_TYPE_LEN = 1,
        a);
        function a() {}
        n.Constants = A;
        var s = (l.prototype.AddBuffer = function(t) {
            var e = t.length;
            if (e > this._buff.length - this._curBuffPosition) {
                var n = new Array(this._curBuffPosition + e);
                this.Copy(this._buff, 0, n, 0, this._curBuffPosition),
                this.Copy(t, 0, n, this._curBuffPosition, e),
                this._buff = n
            } else
                this.Copy(t, 0, this._buff, this._curBuffPosition, e);
            this._curBuffPosition += e
        }
        ,
        l.prototype.UpdateDataLength = function() {
            if (0 == this._dataLength && this._curBuffPosition >= A.HEAD_DATA_LEN) {
                var t = new Array(A.HEAD_DATA_LEN);
                this.Copy(this._buff, 0, t, 0, A.HEAD_DATA_LEN),
                this._dataLength = o.BitConverter.ToInt32(t, 0),
                this._tagName = this._buff[A.HEAD_DATA_LEN],
                this._buffLength = this._dataLength + A.HEAD_DATA_LEN
            }
        }
        ,
        l.prototype.GetData = function(t) {
            if (this._buffLength <= 0 && this.UpdateDataLength(),
            0 < this._buffLength && this._curBuffPosition >= this._buffLength) {
                t.BuffLength = this._buffLength,
                t.TagName = this._tagName,
                t.Data = new Array(this._dataLength - A.HEAD_TYPE_LEN),
                this.Copy(this._buff, A.HEAD_LEN, t.Data, 0, this._dataLength - A.HEAD_TYPE_LEN),
                this._curBuffPosition -= this._buffLength;
                var e = new Array(this._curBuffPosition < this._minBuffLen ? this._minBuffLen : this._curBuffPosition);
                return this.Copy(this._buff, this._buffLength, e, 0, this._curBuffPosition),
                this._buff = e,
                this._buffLength = 0,
                !(this._dataLength = 0)
            }
            return !1
        }
        ,
        l.prototype.Copy = function(t, e, n, i, o) {
            for (var r = 0; r < o; r++)
                n[r + i] = t[r + e]
        }
        ,
        l);
        function l(t) {
            void 0 === t && (t = 1024),
            this._curBuffPosition = 0,
            this._buffLength = 0,
            this._dataLength = 0,
            this._tagName = 0,
            this._minBuffLen = t <= 0 ? 1024 : t,
            this._buff = new Array(this._minBuffLen)
        }
        n.DataBuffer = s
    }
    , {
        "./../utility/BitConverter": 21
    }],
    28: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        function i() {}
        var o = t("./ByteBuffer")
          , r = t("./../utility/action")
          , A = t("./../utility/dictionary")
          , a = t("./SocketBusiness");
        n.VE_ActionBehaviour = i;
        function s() {}
        n.VE_TriggerBehaviour = s;
        var l = function() {};
        n.VeryEngineMessage = l;
        var c = function() {};
        n.CallbackNetMessage = c;
        var h = (Object.defineProperty(d, "Instance", {
            get: function() {
                return d.CreateInstance(),
                d.sInstance
            },
            enumerable: !0,
            configurable: !0
        }),
        d.CreateInstance = function() {
            1 != d.IsCreate && (d.IsCreate = !0,
            this.sInstance = new d)
        }
        ,
        Object.defineProperty(d.prototype, "LockStepTurnID", {
            get: function() {
                return this.lockStepTurnID
            },
            enumerable: !0,
            configurable: !0
        }),
        d.prototype.NextTurn = function() {
            0 != this._upDate.count && this._upDate.run(),
            this.lockStepTurnID++
        }
        ,
        d.prototype.GetVeryEngineIndex = function(t) {
            return this._recordVeryEngine.ContainsKey(t) ? this._recordVeryEngine.GetValue(t) : -1
        }
        ,
        d.prototype.GetSendMode = function(t) {
            return this._recordSendMode.ContainsKey(t) ? this._recordSendMode.GetValue(t) : a.VerySendMode.All
        }
        ,
        d.prototype.GetVeryEngineVar = function(t) {
            for (var e = this._recordVeryEngine.GetKeys(), n = 0; n < e.length; n++) {
                var i = e[n];
                if (this._recordVeryEngine.GetValue(i) === t)
                    return i
            }
            return null
        }
        ,
        d.prototype.AddVeryEngineVeryVarEvent = function(t, e) {
            if (!this._recordVeryEngine.ContainsKey(t)) {
                var n = 100 + this.count++;
                this._recordVeryEngine.Add(t, n),
                this._veryEngineBufEvent.Add(n, new r.action1),
                this._veryEngineBufEvent.GetValue(n).add(e)
            }
            return this._recordVeryEngine.GetValue(t)
        }
        ,
        d.prototype.AddVeryEngineTriggerEvent = function(t, e, n) {
            if (!this._recordVeryEngine.ContainsKey(t)) {
                var i = 100 + this.count++;
                this._recordVeryEngine.Add(t, i),
                this._veryEngineVoidEvent.Add(i, new r.action0),
                this._veryEngineVoidEvent.GetValue(i).add(e),
                this._recordSendMode.Add(i, n)
            }
        }
        ,
        d.prototype.AddVeryEngineTriggerSpecial = function(t, e) {
            this._veryEngineVoidEvent.ContainsKey(t) || this._veryEngineVoidEvent.Add(t, new r.action0),
            this._veryEngineVoidEvent.GetValue(t).add(e)
        }
        ,
        d.prototype.AddVeryEngineActionEvent = function(t, e, n) {
            if (!this._recordVeryEngine.ContainsKey(t)) {
                var i = 100 + this.count++;
                this._recordVeryEngine.Add(t, i),
                this._veryEngineBoolEvent.Add(i, new r.action2),
                this._veryEngineBoolEvent.GetValue(i).add(e),
                this._recordSendMode.Add(i, n)
            }
        }
        ,
        d.prototype.AddObserverEvent = function(t, e) {
            this._netMessageEventList.ContainsKey(t) || this._netMessageEventList.Add(t, new r.action1),
            this._netMessageEventList.GetValue(t).add(e)
        }
        ,
        d.prototype.removeObserver = function(t, e) {
            this._netMessageEventList.ContainsKey(t) && (this._netMessageEventList.GetValue(t).remove(e),
            this._netMessageEventList.GetValue(t).count && this._netMessageEventList.Remove(t))
        }
        ,
        d.prototype.AddTriggerMessage = function(t) {
            var e = new l;
            e.index = t,
            e.value = o.ByteBuffer.Allocate(0),
            this.VeryEngineData.push(e)
        }
        ,
        d.prototype.AddTriggerSpecial = function(t) {
            var e = new l;
            e.index = t,
            e.value = o.ByteBuffer.Allocate(0),
            this.VeryEngineData.push(e)
        }
        ,
        d.prototype.AddActionMessage = function(t, e) {
            var n = new l;
            n.index = t,
            n.value = e,
            this.VeryEngineData.push(n)
        }
        ,
        d.prototype.AddValMessage = function(t, e) {
            var n = new l;
            n.index = t,
            n.value = e,
            this.VeryEngineData.push(n)
        }
        ,
        d.prototype.AddObseverMessage = function(t, e) {
            var n = new c;
            n.type = t,
            n.value = null != e ? e : o.ByteBuffer.Allocate(0),
            this.NetMessageData.push(n)
        }
        ,
        d.prototype.AddUpdateEvent = function(t) {
            null != this._upDate && this._upDate.add(t)
        }
        ,
        d.prototype.update = function() {
            if (d.IsCreate) {
                for (; 0 < this.NetMessageData.length; ) {
                    var t = this.NetMessageData.shift();
                    this._netMessageEventList.ContainsKey(t.type) && this._netMessageEventList.GetValue(t.type).run(t.value)
                }
                for (; 0 < this.VeryEngineData.length; ) {
                    var e = this.VeryEngineData.shift()
                      , n = e.index;
                    this._veryEngineVoidEvent.ContainsKey(n) ? this._veryEngineVoidEvent.GetValue(n).run() : this._veryEngineBoolEvent.ContainsKey(n) ? this._veryEngineBoolEvent.GetValue(n).run(e.value.ReadBoolean(), e.value.ReadBoolean()) : this._veryEngineBufEvent.ContainsKey(n) && this._veryEngineBufEvent.GetValue(n).run(e.value)
                }
            }
        }
        ,
        d.prototype.RuningNow = function(t, e) {
            this._veryEngineBufEvent.ContainsKey(t) ? this._veryEngineBufEvent.GetValue(t).run(e) : this._veryEngineBoolEvent.ContainsKey(t) && this._veryEngineBoolEvent.GetValue(t).run(e.ReadBoolean(), e.ReadBoolean())
        }
        ,
        d.IsCreate = !1,
        d);
        function d() {
            this.lockStepTurnID = 0,
            this._upDate = new r.action0,
            this._netMessageEventList = new A.Dictionary,
            this.NetMessageData = new Array,
            this._veryEngineVoidEvent = new A.Dictionary,
            this._veryEngineBoolEvent = new A.Dictionary,
            this._veryEngineBufEvent = new A.Dictionary,
            this._recordSendMode = new A.Dictionary,
            this._recordVeryEngine = new A.Dictionary,
            this.count = 0,
            this.VeryEngineData = new Array
        }
        n.MonoBehaviourMessageCenter = h
    }
    , {
        "./../utility/action": 22,
        "./../utility/dictionary": 23,
        "./ByteBuffer": 25,
        "./SocketBusiness": 30
    }],
    29: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("./SocketBusiness")
          , o = (r.CreatNettyNumber = function(t, e) {
            var n = new r;
            return n.value = t,
            n.type = e,
            n
        }
        ,
        r.prototype.IsDirect = function() {
            return "byte" === this.type && (this.value === i.SocketHandle.GameStart || this.value === i.SocketHandle.GetVal || this.value === i.SocketHandle.SaveVal)
        }
        ,
        r.prototype.WirteNumbr = function(t) {
            "int" === this.type ? t.WriteInt(this.value) : "float" === this.type ? t.WriteFloat(this.value) : "byte" === this.type ? t.WriteByte(this.value) : this.type
        }
        ,
        r);
        function r() {
            this.value = 0,
            this.type = "int"
        }
        n.NettyNumber = o
    }
    , {
        "./SocketBusiness": 30
    }],
    30: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i, o, r, A = (a.prototype.clear = function() {
            this.isRight = !0,
            this.message = ""
        }
        ,
        a);
        function a() {
            this.isRight = !0,
            this.message = ""
        }
        n.ErrorInfo = A,
        (i = n.VerySendMode || (n.VerySendMode = {}))[i.All = 255] = "All",
        i[i.Other = 254] = "Other",
        (o = n.SocketHandle || (n.SocketHandle = {}))[o.Login = 0] = "Login",
        o[o.JoinGame = 1] = "JoinGame",
        o[o.GameTurn = 2] = "GameTurn",
        o[o.NextTurn = 3] = "NextTurn",
        o[o.CreatRoom = 4] = "CreatRoom",
        o[o.GameStart = 5] = "GameStart",
        o[o.GetIdentity = 6] = "GetIdentity",
        o[o.CreatTemplet = 7] = "CreatTemplet",
        o[o.GetRoomID = 8] = "GetRoomID",
        o[o.Exit = 9] = "Exit",
        o[o.CallBack = 10] = "CallBack",
        o[o.SendCaptcha = 11] = "SendCaptcha",
        o[o.Regist = 12] = "Regist",
        o[o.SaveVal = 13] = "SaveVal",
        o[o.GetVal = 14] = "GetVal",
        o[o.ListOp = 15] = "ListOp",
        o[o.NumOp = 16] = "NumOp",
        o[o.Empty = 99] = "Empty",
        o[o.Valid = 127] = "Valid",
        (r = n.VeryEngineNode || (n.VeryEngineNode = {}))[r.VeryGameObject = 2] = "VeryGameObject",
        r[r.VeryString = 3] = "VeryString",
        r[r.Var = 97] = "Var",
        r[r.Action = 98] = "Action",
        r[r.Trigger = 99] = "Trigger"
    }
    , {}],
    31: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var A = t("./MonoBehaviourMessageCenter")
          , s = t("./SocketBusiness")
          , l = t("./CallBackManager")
          , c = t("./VeryNettyPara")
          , i = t("./DataBuffer")
          , h = t("./ByteBuffer")
          , o = t("./../utility/BitConverter")
          , r = t("../utility/action")
          , d = t("./NettyNumber")
          , a = t("./veryVariables")
          , u = (Object.defineProperty(p, "Instance", {
            get: function() {
                return null == p._instance && (p._instance = new p),
                p._instance
            },
            enumerable: !0,
            configurable: !0
        }),
        p.prototype.ValidUser = function(t) {
            t.ReadBoolean() ? (p._isConnected = !0,
            console.log("连接成功"),
            p.connectEvent.run(!0)) : console.log("非法用户，禁止登录")
        }
        ,
        p.prototype.GetProjectNetID = function() {}
        ,
        Object.defineProperty(p, "IsConnceted", {
            get: function() {
                return p._isConnected
            },
            enumerable: !0,
            configurable: !0
        }),
        p.prototype.close = function() {
            p._isConnected && (p._isConnected = !1,
            this.SendMsg(s.SocketHandle.Exit),
            null != this.clientSocket && 1 == this.clientSocket.readyState && (this.clientSocket.close(),
            this.clientSocket = null))
        }
        ,
        p.prototype.OnClose = function() {
            this.close()
        }
        ,
        p.prototype.OnError = function(t) {
            console.error("[ERROR] " + t.type),
            p.connectEvent.run(!1),
            this.close()
        }
        ,
        p.prototype.ReConnect = function() {}
        ,
        p.AddConnectEvent = function(t) {
            p.connectEvent.add(t)
        }
        ,
        p.prototype.onConnet = function() {
            try {
                this.clientSocket = new WebSocket("ws://" + this._currIP + ":" + this._currPort + "/ws"),
                this.clientSocket.onopen = this.onConnectSucess.bind(this),
                this.clientSocket.onclose = this.OnClose,
                this.clientSocket.onmessage = this.onReceiveSocket,
                this.clientSocket.onerror = this.OnError,
                this.clientSocket.binaryType = "arraybuffer"
            } catch (t) {
                console.error(t),
                this.onConnectFail()
            }
        }
        ,
        p.prototype.onConnectSucess = function() {
            var t = h.ByteBuffer.Allocate(1024);
            this.WriteObject(t, d.NettyNumber.CreatNettyNumber(s.SocketHandle.Valid, "byte")),
            this.WriteObject(t, d.NettyNumber.CreatNettyNumber(841483552, "int")),
            this.SendMsg(t)
        }
        ,
        p.prototype.onConnectFail = function() {
            this.close()
        }
        ,
        p.prototype.onReceiveSocket = function(t) {
            try {
                for (var e = new Uint8Array(t.data), n = new Array, i = 0; i < e.length; i++)
                    n.push(e[i]);
                for (p._databuffer.AddBuffer(n); p._databuffer.GetData(p._socketData); ) {
                    var o = h.ByteBuffer.Allocate(p._socketData.Data)
                      , r = p._socketData.TagName;
                    A.MonoBehaviourMessageCenter.Instance.AddObseverMessage(r, o)
                }
            } catch (t) {
                null != this.clientSocket && (this.clientSocket.close(),
                this.clientSocket = null)
            }
        }
        ,
        p.prototype.DataToBytes = function(t) {
            var e = o.BitConverter.GetBytesInt32(i.Constants.HEAD_DATA_LEN + t.length)
              , n = new Array(i.Constants.HEAD_DATA_LEN + t.length);
            return this.Copy(e, 0, n, 0, i.Constants.HEAD_DATA_LEN),
            this.Copy(t, 0, n, i.Constants.HEAD_DATA_LEN, t.length),
            n
        }
        ,
        p.prototype.Copy = function(t, e, n, i, o) {
            for (var r = 0; r < o; r++)
                n[r + i] = t[r + e]
        }
        ,
        p.prototype.Connect = function(t, e) {
            p.IsConnceted || (this._currIP = t,
            this._currPort = e,
            this.onConnet())
        }
        ,
        p.prototype.SendMsgBase = function() {
            null != this.clientSocket && 1 == this.clientSocket.readyState ? null == this._sendPool || 0 == this._sendPool.length ? this.SendMsg(s.SocketHandle.NextTurn) : (this.Send(this._sendPool),
            this._sendPool = new Array(0)) : this.ReConnect()
        }
        ,
        p.prototype.SendMsg = function(t) {
            if (null != this.clientSocket && 1 == this.clientSocket.readyState) {
                var e = new Array;
                "number" == typeof t ? e.push(t) : e = t instanceof h.ByteBuffer ? t.ToBytes() : t;
                var n = this.DataToBytes(e);
                this.Send(n)
            } else
                this.ReConnect()
        }
        ,
        p.prototype.Send = function(t) {
            var e = h.ByteBuffer.Allocate(t);
            null != this.clientSocket && this.clientSocket.send(e.ToArray())
        }
        ,
        p.prototype.PoolSendMsg = function(t) {
            if (c.VeryNettyPara.GameTurnStart) {
                var e = void 0;
                e = t instanceof h.ByteBuffer ? this.DataToBytes(t.ToBytes()) : this.DataToBytes(t);
                var n = new Array(this._sendPool.length + e.length);
                this.Copy(this._sendPool, 0, n, 0, this._sendPool.length),
                this.Copy(e, 0, n, this._sendPool.length, e.length),
                this._sendPool = n
            }
        }
        ,
        p.prototype.PoolSendMsg2 = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n];
            for (var i = h.ByteBuffer.Allocate(1024), o = 0; o < e.length; o++)
                i.WriteString(e[o]);
            i.Write(t),
            this.PoolSendMsg(i)
        }
        ,
        p.prototype.SendMsg2 = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n];
            for (var i = h.ByteBuffer.Allocate(1024), o = 0; o < e.length; o++)
                i.WriteString(e[o]);
            i.Write(t),
            this.SendMsg(i)
        }
        ,
        p.prototype.CreatCallbackPromise = function(i, o) {
            for (var r = [], t = 2; t < arguments.length; t++)
                r[t - 2] = arguments[t];
            var A = h.ByteBuffer.Allocate(1024)
              , a = -1;
            return new Promise(function(t, e) {
                if (0 <= (a = l.CallBackManager.AddCallBackAction(i, t, !0))) {
                    this.WriteObject(A, o),
                    A.WriteInt(a);
                    for (var n = 0; n < r.length; n++)
                        this.WriteObject(A, r[n]);
                    this.SendMsg(A)
                }
            }
            .bind(this))
        }
        ,
        p.prototype.WriteObject = function(t, e, n) {
            if (void 0 === n && (n = !1),
            "string" == typeof e)
                t.WriteString(e);
            else if ("boolean" == typeof e)
                t.WriteBoolean(e);
            else if (e instanceof d.NettyNumber)
                e.WirteNumbr(t);
            else if (this.IsIVeryVal(e)) {
                t.WriteString(e.name);
                var i = e.GetBytes();
                n && t.WriteInt(i.ReadableBytes()),
                t.Write(i)
            } else if (e instanceof Array)
                for (var o = 0; o < e.length; o++)
                    this.WriteObject(t, e[o], !0)
        }
        ,
        p.prototype.IsIVeryVal = function(t) {
            return "IVeryVar" === t.discriminator
        }
        ,
        p.prototype.Close = function() {
            this.close()
        }
        ,
        p.prototype.Login = function(t, e) {
            return 11 != t.length || 0 == e.length ? null : this.CreatCallbackPromise(1, d.NettyNumber.CreatNettyNumber(s.SocketHandle.Login, "byte"), t, e, c.VeryNettyPara.ProjectID)
        }
        ,
        p.prototype.Regist = function(t, e, n, i) {
            return 11 != t.length || 0 == n.length || 4 != i.length ? null : this.CreatCallbackPromise(2, d.NettyNumber.CreatNettyNumber(s.SocketHandle.Regist, "byte"), t, e, n, i)
        }
        ,
        p.prototype.SendCaptcha = function(t) {
            return 11 != t.length ? null : this.CreatCallbackPromise(3, d.NettyNumber.CreatNettyNumber(s.SocketHandle.SendCaptcha, "byte"), t)
        }
        ,
        p.prototype.GetValues = function(A, t, e, a) {
            if (0 != A.length) {
                for (var n = new Array, i = 0; i < A.length; i++)
                    n.push(A[i].name);
                var o = "";
                t && (o = c.VeryNettyPara.UserID),
                p.Instance.CreatCallbackPromise(e, d.NettyNumber.CreatNettyNumber(s.SocketHandle.GetVal, "byte"), c.VeryNettyPara.ProjectID, o, "", n).then(function(t) {
                    for (var e = t.ReadInt(), n = new Array, i = 0; i < e; i++)
                        n.push(t.ReadInt());
                    for (i = 0; i < A.length; i++)
                        if (n.indexOf(i) < 0) {
                            var o = t.ReadInt()
                              , r = t.ReadRetainedSlice(o);
                            A[i].setBuf(r)
                        }
                    0 < t.ReadableBytes() ? console.error(l.CallBackManager.BackMessage(t.ReadByte())) : a()
                })
            }
        }
        ,
        p.prototype.SaveValues = function(t, e, n) {
            if (0 != t.length) {
                for (var i = new Array, o = 0; o < t.length; o++)
                    t[o]instanceof a.VeryList && i.push(d.NettyNumber.CreatNettyNumber(o, "byte"));
                var r = d.NettyNumber.CreatNettyNumber(s.SocketHandle.SaveVal, "byte")
                  , A = "";
                e && (A = c.VeryNettyPara.UserID),
                p.Instance.CreatCallbackPromise(n, r, c.VeryNettyPara.ProjectID, A, "", d.NettyNumber.CreatNettyNumber(i.length, "int"), i, t)
            }
        }
        ,
        p.prototype.OperateNum = function(e, t, n, i) {
            p.Instance.CreatCallbackPromise(n, d.NettyNumber.CreatNettyNumber(s.SocketHandle.NumOp, "byte"), c.VeryNettyPara.ProjectID, "", "", t, e.name).then(function(t) {
                e.value = t.ReadInt(),
                null != i && i()
            })
        }
        ,
        p.prototype.OperateList = function(t, e, n) {
            p.Instance.CreatCallbackPromise(98, d.NettyNumber.CreatNettyNumber(s.SocketHandle.ListOp, "byte"), c.VeryNettyPara.ProjectID, "", "", n, t.name, d.NettyNumber.CreatNettyNumber(t.RecordTag, "int"), e)
        }
        ,
        p._instance = null,
        p._isConnected = !1,
        p._databuffer = new i.DataBuffer,
        p._socketData = new i.SocketData,
        p.connectEvent = new r.action1,
        p);
        function p() {
            this.clientSocket = null,
            this._sendPool = new Array(0),
            this.GetProjectNetID(),
            A.MonoBehaviourMessageCenter.Instance.AddObserverEvent(s.SocketHandle.CallBack, l.CallBackManager.CallBackAceppt),
            A.MonoBehaviourMessageCenter.Instance.AddObserverEvent(s.SocketHandle.Valid, this.ValidUser)
        }
        n.SocketManager = u
    }
    , {
        "../utility/action": 22,
        "./../utility/BitConverter": 21,
        "./ByteBuffer": 25,
        "./CallBackManager": 26,
        "./DataBuffer": 27,
        "./MonoBehaviourMessageCenter": 28,
        "./NettyNumber": 29,
        "./SocketBusiness": 30,
        "./VeryNettyPara": 32,
        "./veryVariables": 33
    }],
    32: [function(t, e, n) {
        "use strict";
        var i, o;
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        (o = i = n.OpenMode || (n.OpenMode = {}))[o.ilab = 0] = "ilab",
        o[o.walkclass = 1] = "walkclass",
        o[o.direct = 2] = "direct";
        var r = (A.GameTurnStart = !1,
        A.ProjectID = "jiawu",
        A.UserName = "游客",
        A.UserID = "007",
        A.taskId = "",
        A.resId = "",
        A.customId = "",
        A.url2 = "",
        A.url = "",
        A.roomIndex = 0,
        A.mode = i.direct,
        A);
        function A() {}
        n.VeryNettyPara = r
    }
    , {}],
    33: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = t("../veryNetty/ByteBuffer")
          , o = t("../utility/dictionary")
          , r = (A.addVar = function(t) {
            this._record.ContainsKey(t.name) ? console.error(t.name + "该变量已经存在，请勿重复创建!") : this._record.Add(t.name, t)
        }
        ,
        A.GetVeryVar = function(t) {
            return this._record.GetValue(t)
        }
        ,
        A._record = new o.Dictionary,
        A);
        function A() {}
        n.VarTools = r;
        var a = (Object.defineProperty(s.prototype, "varType", {
            get: function() {
                return "bool"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(s.prototype, "value", {
            get: function() {
                return this._value
            },
            set: function(t) {
                this._value = t
            },
            enumerable: !0,
            configurable: !0
        }),
        s.prototype.setValue = function(t) {
            this._value = t
        }
        ,
        s.prototype.getValue = function() {
            return this._value
        }
        ,
        s.prototype.GetBytes = function() {
            var t = i.ByteBuffer.Allocate(2);
            return t.WriteBoolean(this._value),
            t
        }
        ,
        s.prototype.setBuf = function(t) {
            this._value = t.ReadBoolean()
        }
        ,
        s.prototype.clone = function() {
            return new s(this.name,this._value)
        }
        ,
        s);
        function s(t, e) {
            this.discriminator = "IVeryVar",
            this.name = "",
            this._value = !1,
            this.name = t,
            this._value = e
        }
        n.VeryBool = a;
        var l = (Object.defineProperty(c.prototype, "varType", {
            get: function() {
                return "number"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(c.prototype, "value", {
            get: function() {
                return this._value
            },
            set: function(t) {
                this._value = t
            },
            enumerable: !0,
            configurable: !0
        }),
        c.prototype.setValue = function(t) {
            this._value = t
        }
        ,
        c.prototype.getValue = function() {
            return this._value
        }
        ,
        c.prototype.GetBytes = function() {
            var t = i.ByteBuffer.Allocate(10);
            return this._value.toString().indexOf(".") < 0 ? t.WriteInt(this._value) : t.WriteFloat(this._value),
            t
        }
        ,
        c.prototype.setBuf = function(t) {
            this._value.toString().indexOf(".") < 0 ? this._value = t.ReadInt() : this._value = t.ReadFloat()
        }
        ,
        c.prototype.clone = function() {
            return new c(this.name,this._value)
        }
        ,
        c);
        function c(t, e) {
            this.discriminator = "IVeryVar",
            this.name = "",
            this._value = 0,
            this.name = t,
            this._value = e
        }
        n.VeryNumber = l;
        var h = (Object.defineProperty(d.prototype, "varType", {
            get: function() {
                return "string"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(d.prototype, "value", {
            get: function() {
                return this._value
            },
            set: function(t) {
                this._value = t
            },
            enumerable: !0,
            configurable: !0
        }),
        d.prototype.getValue = function() {
            return this._value
        }
        ,
        d.prototype.setValue = function(t) {
            this._value = t
        }
        ,
        d.prototype.GetBytes = function() {
            var t = i.ByteBuffer.Allocate(1024);
            return t.WriteString(this._value),
            t
        }
        ,
        d.prototype.setBuf = function(t) {
            this._value = t.ReadString()
        }
        ,
        d.prototype.clone = function() {
            return new d(this.name,this._value)
        }
        ,
        d);
        function d(t, e) {
            this.discriminator = "IVeryVar",
            this.name = "",
            this._value = "",
            this.name = t,
            this._value = e
        }
        n.VeryString = h;
        var u = (Object.defineProperty(p.prototype, "varType", {
            get: function() {
                return "List"
            },
            enumerable: !0,
            configurable: !0
        }),
        p.IsList = function(t) {
            return "list" == t.toLowerCase() || "数组" == t
        }
        ,
        Object.defineProperty(p.prototype, "value", {
            get: function() {
                return this._value
            },
            set: function(t) {
                this._value = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(p.prototype, "RecordTag", {
            get: function() {
                return this._recordTag
            },
            enumerable: !0,
            configurable: !0
        }),
        p.prototype.getValue = function() {
            return this._value
        }
        ,
        p.prototype.setValue = function(t) {
            this._value = new Array,
            this._record = new Array;
            for (var e = t, n = 0; n < e.length; n++)
                this._value.push(e[n]),
                this._record.push(n << 15)
        }
        ,
        p.prototype.add = function(t) {
            this._value.push(t),
            this._maxIndex = this._maxIndex + 32768,
            this._recordTag = this._maxIndex,
            this._record.push(this._maxIndex)
        }
        ,
        p.prototype.insert = function(t, e) {
            if (t < 0 || t >= this._value.length)
                console.error(this.name + " 在数组中插入元素的下标:" + t + ",超出范围!");
            else {
                this._value.splice(t, 0, e);
                var n = this._record[t] - 1;
                this._recordTag = n,
                this._record.splice(t, 0, n)
            }
        }
        ,
        p.prototype.addRange = function(t) {
            for (var e = t.value, n = 0; n < e.length; n++)
                this._value.push(e[n]),
                this._maxIndex = this._maxIndex + 32768,
                0 == n && (this._recordTag = this._maxIndex),
                this._record.push(this._maxIndex)
        }
        ,
        p.prototype.contains = function(t) {
            for (var e = 0; e < this._value.length; e++)
                if (this._value[e].getValue() == t.getValue())
                    return !0;
            return !1
        }
        ,
        p.prototype.indexOf = function(t) {
            for (var e = 0; e < this._value.length; e++)
                if (this._value[e].getValue() == t.getValue())
                    return e;
            return -1
        }
        ,
        p.prototype.insertRange = function(t, e) {
            if (t < 0 || t >= this._value.length)
                console.error(this.name + " 在数组中插入元素的下标:" + t + ",超出范围!");
            else
                for (var n = e.value, i = 0; i < n.length; i++) {
                    this._value.splice(t + i, 0, n[i]);
                    var o = this._record[t + i] - 1;
                    this._record.splice(t + i, 0, o)
                }
        }
        ,
        p.prototype.removeAt = function(t) {
            this._recordTag = this._record[t],
            this._value.splice(t, 1),
            this._record.splice(t, 1)
        }
        ,
        p.prototype.clear = function() {
            this._value = new Array,
            this._record = new Array,
            this._recordTag = 0,
            this._maxIndex = 0
        }
        ,
        p.prototype.getValueByIndex = function(t) {
            return this._value[t]
        }
        ,
        p.prototype.setValueByIndex = function(t, e) {
            this._value[t].setValue(e.getValue())
        }
        ,
        p.prototype.ConvertNetMode = function() {
            this._netOperate = !0
        }
        ,
        p.prototype.GetBytes = function() {
            for (var t = i.ByteBuffer.Allocate(8192), e = 0; e < this._value.length; e++) {
                var n = this._value[e].GetBytes();
                this._netOperate && (t.WriteInt(n.ReadableBytes()),
                t.WriteInt(this._record[e])),
                t.Write(n)
            }
            return t
        }
        ,
        p.prototype.setBuf = function(t) {
            for (var e = 0, n = this._value.length; 0 < t.ReadableBytes(); ) {
                if (e < n)
                    this._netOperate && (this._record[e] = t.ReadInt(),
                    this._maxIndex < this._record[e] && (this._maxIndex = this._record[e])),
                    this._value[e].setBuf(t);
                else {
                    var i = this._type.clone();
                    this._netOperate && (this._record.push(t.ReadInt()),
                    this._maxIndex < this._record[e] && (this._maxIndex = this._record[e])),
                    i.setBuf(t),
                    this._value.push(i)
                }
                e++
            }
            for (; e < n; )
                this._value.splice(e, 1),
                e++
        }
        ,
        p.prototype.clone = function() {
            var t = new p(this.name,this._type);
            return t.addRange(this),
            t
        }
        ,
        p);
        function p(t, e) {
            this.discriminator = "IVeryVar",
            this.name = "",
            this._value = new Array,
            this._record = new Array,
            this._maxIndex = 0,
            this._recordTag = 0,
            this._netOperate = !0,
            this.name = t,
            this._type = e,
            this._value = new Array
        }
        n.VeryList = u
    }
    , {
        "../utility/dictionary": 23,
        "../veryNetty/ByteBuffer": 25
    }],
    34: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var i = (o.setCookie = function(t, e, n, i, o, r) {
            var A = t + "=" + escape(e) + (n ? ";expires=" + n.toGMTString() : "") + (i ? "; path=" + i : "") + (o ? "; domain=" + o : "") + (r ? ";secure" : "");
            (!this.caution || (t + "=" + escape(e)).length <= 4e3 || confirm("Cookie exceeds 4KB and will be cut!")) && (document.cookie = A)
        }
        ,
        o.getCookie = function(t) {
            var e = t + "="
              , n = document.cookie.indexOf(e);
            if (-1 == n)
                return null;
            var i = document.cookie.indexOf(";", n + e.length);
            return -1 == i && (i = document.cookie.length),
            unescape(document.cookie.substring(n + e.length, i))
        }
        ,
        o.deleteCookie = function(t, e, n) {
            o.getCookie(t) && (document.cookie = t + "=" + (e ? "; path=" + e : "") + (n ? "; domain=" + n : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT")
        }
        ,
        o.fixDate = function(t) {
            var e = new Date(0).getTime();
            0 < e && t.setTime(t.getTime() - e)
        }
        ,
        o.caution = !1,
        o);
        function o() {}
        n.visitDisplay = i
    }
    , {}],
    35: [function(t, e, n) {
        "use strict";
        var i = this && this.__importDefault || function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = t("./veryNetty/VeryNettyPara")
          , o = i(t("./utility/md5"))
          , r = (l.StartCheck = function(t) {
            for (var e = t.split("&"), n = 0; n < e.length; n++) {
                var i = e[n].split("=");
                2 == i.length && ("signature" == i[0] ? i[1] : "userName" == i[0] ? l.userName = i[1] : "userId" == i[0] ? l.userId = i[1] : "appendix" == i[0] ? l.appendix = i[1].replace(new RegExp("%7B","gm"), "{").replace(new RegExp("%22","gm"), '"').replace(new RegExp("%3A","gm"), ":").replace(new RegExp("%7D","gm"), "}").replace(new RegExp("%2C","gm"), ",") : "serverAddress" == i[0] ? l.serverAddress = i[1].replace("%3A%2F%2F", "://") : "role" == i[0] ? l.role = i[1] : "id" == i[0] ? l.id = i[1] : "content" == i[0] ? l.content = i[1] : "accessKey" == i[0] && (l.accessKey = i[1].replace(new RegExp("%7B","gm"), "{").replace(new RegExp("%22","gm"), '"').replace(new RegExp("%3A","gm"), ":").replace(new RegExp("%7D","gm"), "}").replace(new RegExp("%2C","gm"), ",")))
            }
            return !0
        }
        ,
        l.ExamStart = function() {
            if (s.VeryNettyPara.mode == s.OpenMode.walkclass)
                l.START_TIME = (new Date).getTime(),
                l._stepName = new Array,
                l._stepScore = new Array;
            else if (s.VeryNettyPara.mode == s.OpenMode.ilab) {
                var t = new Date;
                l._stepName = new Array,
                l._stepScore = new Array,
                l.START_TIME = t.getTime(),
                l.START_TIME_STR = l.dateFormat("YYYY-mm-dd HH:MM:SS", t)
            }
        }
        ,
        l.AddStep = function(t, e) {
            s.VeryNettyPara.mode != s.OpenMode.direct && (l._stepName.push(t),
            l._stepScore.push(e))
        }
        ,
        l.Upload = function() {
            s.VeryNettyPara.mode == s.OpenMode.walkclass ? l.walkclassUp() : s.VeryNettyPara.mode == s.OpenMode.ilab && l.ilabUp()
        }
        ,
        l.walkclassUp = function() {
            l.END_TIME = (new Date).getTime();
            for (var t = 0, e = 0; e < l._stepScore.length; e++)
                t += l._stepScore[e];
            var n = '{"userId":"' + l.userId + '","appendix":' + l.appendix + ',"totalScore":' + t + ',"startTime":' + l.START_TIME + ',"endTime":' + l.END_TIME + ',"result":{"fieldMap":{"stepNo":"序号","stepName": "步骤名称"},"content":[';
            for (e = 0; e < l._stepName.length; e++)
                0 != e && (n += ","),
                n += '{"stepNo":' + (e + 1) + ',"stepName":"' + l._stepName[e] + '","score":' + l._stepScore[e] + "}";
            n += "]}}",
            axios.defaults.withCredentials = !0;
            var i = {
                "Content-Type": "application/json"
            };
            l.GetJsonHeader(i, n),
            console.log(n),
            axios.post(l.serverAddress + "/openApi/vr/v2/results.json", n, {
                headers: i
            }).then(function(t) {
                console.log(t)
            }).catch(function(t) {
                console.log(t)
            })
        }
        ,
        l.GetJsonHeader = function(t, e) {
            var n = (new Date).getTime();
            e = e + "&accessKey=" + l.accessKey + "&timestamp=" + n;
            var i = CryptoJS.HmacSHA256(e, l.accessSecret)
              , o = CryptoJS.enc.Base64.stringify(i);
            t.accessKey = l.accessKey,
            t.timestamp = n,
            t.signature = o
        }
        ,
        l.ilabUp = function() {
            if ("" != s.VeryNettyPara.url) {
                for (var t = '"StartTime":"' + l.START_TIME_STR + '",', e = '"ExamLength":"' + ((new Date).getTime() - l.START_TIME) / 1e3 + '",', n = l._stepName.length, i = 20 * n, o = "", r = 0; r < n; r++)
                    0 == r ? o = r == n - 1 ? '[{"Index":"' + r + '","StepName":"' + l._stepName[r] + '","Score":"' + l._stepScore[r] + '"}]' : '[{"Index":"' + r + '","StepName":"' + l._stepName[r] + '","Score":"' + l._stepScore[r] + '"},' : o += r != n - 1 ? '{"Index":"' + r + '","StepName":"' + l._stepName[r] + '","Score":"' + l._stepScore[r] + '"},' : '{"Index":"' + r + '","StepName":"' + l._stepName[r] + '","Score":"' + l._stepScore[r] + '"}]';
                var A = '"TotalScore":"' + i + '"}],'
                  , a = '{"BaseInfo":[{"customId":"NaN","UserName":"' + s.VeryNettyPara.UserName + '","ResourceID":"","TaskID":"",' + t + e + A + '"ExamInfo":' + o + "}";
                this.UploadScore(a)
            }
        }
        ,
        l.UploadScore = function(t) {
            if ("" != t) {
                var e = "param=" + t;
                e += "&sign=" + (new o.default).hex_md5(t + "BaPUEW9y9DECU/PfsNJrjA=="),
                axios.post(s.VeryNettyPara.url, e, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    }
                }).then(function(t) {
                    console.log(t)
                }).catch(function(t) {
                    console.log(t)
                })
            }
        }
        ,
        l.dateFormat = function(t, e) {
            var n, i = {
                "Y+": e.getFullYear().toString(),
                "m+": (e.getMonth() + 1).toString(),
                "d+": e.getDate().toString(),
                "H+": e.getHours().toString(),
                "M+": e.getMinutes().toString(),
                "S+": e.getSeconds().toString()
            };
            for (var o in i)
                (n = new RegExp("(" + o + ")").exec(t)) && (t = t.replace(n[1], 1 == n[1].length ? i[o] : i[o].padStart(n[1].length, "0")));
            return t
        }
        ,
        l.accessKey = "",
        l.accessSecret = "6V0v6vWRWBwEWYvowckrFkNsQ3PROxwo",
        l);
        function l() {}
        n.xuebei = r
    }
    , {
        "./utility/md5": 24,
        "./veryNetty/VeryNettyPara": 32
    }],
    36: [function(t, e, n) {
        "use strict";
        function i(t) {
            for (var e in t)
                n.hasOwnProperty(e) || (n[e] = t[e])
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        i(t("./game")),
        i(t("./babylon"))
    }
    , {
        "./babylon": 2,
        "./game": 11
    }],
    37: [function(t, e, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        function(t) {
            for (var e in t)
                n.hasOwnProperty(e) || (n[e] = t[e])
        }(t("./index"));
        var i = t("./game")
          , o = t("./game/veryNetty/VeryNettyPara")
          , r = t("./game/xuebei");
        var A, a = window.location.href, s = a.split("?");
        if (console.log(s[0]),
        1 < s.length) {
            o.VeryNettyPara.mode = o.OpenMode.walkclass;
            for (var l = s[1].split("&"), c = 0; c < l.length; c++)
                if (l[c].startsWith("token=")) {
                    a = l[c].slice(6);
                    var h = CryptoJS.enc.Latin1.parse("abcdef0123456789")
                      , d = CryptoJS.enc.Latin1.parse("0123456789abcdef")
                      , u = CryptoJS.AES.decrypt(a, h, {
                        iv: d,
                        padding: CryptoJS.pad.ZeroPadding
                    }).toString(CryptoJS.enc.Utf8)
                      , p = JSON.parse(u);
                    o.VeryNettyPara.UserID = p.ID,
                    o.VeryNettyPara.UserName = p.username,
                    o.VeryNettyPara.url = p.URL,
                    o.VeryNettyPara.taskId = p.Task,
                    o.VeryNettyPara.resId = p.ResourceID,
                    o.VeryNettyPara.url2 = p.URL2,
                    o.VeryNettyPara.customId = p.customId.split(":")[1],
                    o.VeryNettyPara.mode = o.OpenMode.ilab,
                    axios.get(o.VeryNettyPara.url2 + "?userId=" + o.VeryNettyPara.UserID + "&taskId=" + o.VeryNettyPara.taskId + "&resourceId=" + o.VeryNettyPara.resId + "&customId=" + o.VeryNettyPara.customId).then(function(t) {
                        console.log(t)
                    }).catch(function(t) {
                        console.log(t)
                    })
                }
            o.VeryNettyPara.mode == o.OpenMode.walkclass && (r.xuebei.StartCheck(s[1]),
            o.VeryNettyPara.UserName = decodeURIComponent(r.xuebei.userName),
            o.VeryNettyPara.UserID = r.xuebei.userId),
            r.xuebei.ExamStart()
        }
        null !== (A = document.getElementById("renderCanvas")) && new i.Game(A).createScene().animate(),
        axios.defaults.headers.post["Content-Type"] = "application/json"
    }
    , {
        "./game": 11,
        "./game/veryNetty/VeryNettyPara": 32,
        "./game/xuebei": 35,
        "./index": 36
    }]
}, {}, [37]);
//# sourceMappingURL=museum15.js.map
