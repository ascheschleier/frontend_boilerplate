define(['whitestorm' ], function(WHS){

    var animation = {
        init: function(){
            const world = new WHS.App([
                new WHS.app.ElementModule(),
                new WHS.app.SceneModule(),
                new WHS.app.CameraModule({
                    position: new THREE.Vector3(-50, 15, 250),
                    far: 1000,
                    near: 1,
                    fov: 70
                }),
                new WHS.app.RenderingModule({
                    bgColor: 0xffffff,

                    renderer: {
                        antialias: false
                    }
                }),
                new WHS.controls.OrbitModule({target: new THREE.Vector3(50, 50, 50),autoRotate: true}),
                new WHS.app.ResizeModule()
            ]);

            const size = new THREE.Vector3(100, 100, 100);
            const sizel = size.x * size.y * size.z * 4;

            const data = new Float32Array(sizel); // 3993000
            const colors = new Float32Array(sizel);

            let i = 0;
            for (let x = 0; x <= size.x; x++) {
                for (let y = 0; y <= size.y; y++) {
                    for (let z = 0; z <= size.z; z++) {
                        data[i * 4] = x;
                        data[i * 4 + 1] = y;
                        data[i * 4 + 2] = z;
                        colors[i * 4] = x / 100;
                        colors[i * 4 + 1] = y / 100;
                        colors[i * 4 + 2] = z / 100;
                        colors[i * 4 + 3] = 0.1;
                        i++;
                    }
                }
            }

            const geom = new THREE.BufferGeometry();

            geom.addAttribute('position', new THREE.BufferAttribute(data, 4));
            geom.addAttribute('color', new THREE.BufferAttribute(colors, 4));

            class Points extends WHS.MeshComponent {
                build(params = {}) {
                    return new THREE.Points(
                        params.geom,
                        new THREE.PointsMaterial({
                            color: 0xffff00,
                            vertexColors: THREE.VertexColors,
                            size: 1,
                            transparent: true,
                            shading: THREE.FlatShading,
                            sizeAttenuation: false
                        })
                        /*THREE.MeshBasicMaterial({
                         uniforms: {
                         time: { value: 1.0 }
                         },
                         vertexShader: document.getElementById( 'vertexShader' ).textContent,
                         fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
                         side: THREE.DoubleSide,
                         transparent: true
                         })*/
                    );
                }
            }

            new Points({geom}).addTo(world);

// Start rendering.
            world.start();

        }
    };

    return animation;
});

