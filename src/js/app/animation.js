define(['whitestorm'], function (WHS) {

    var animation = {
        init: function () {
            const world = new WHS.App([
                new WHS.app.ElementModule(),
                new WHS.app.SceneModule(),
                new WHS.app.CameraModule({
                    position: new THREE.Vector3(0, 0, 400),
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
                //new WHS.controls.OrbitModule({target: new THREE.Vector3(50, 50, 50), autoRotate: true}),
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

            const space = new WHS.Group();
            //space.rotation.z = Math.PI / 12;

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

            const meshComp = new Points({geom});

            const planet = new WHS.Tetrahedron({
                geometry: {
                    radius: 15,
                    detail: 4
                },

                material: new THREE.MeshStandardMaterial({
                    color: 0xee5624,
                    shading: THREE.FlatShading,
                    roughness: 0.9,
                    emissive: 0x270000
                })
            });

            // planet.position.setX(-25);
            // planet.position.setY(-25);

            //planet.addTo(space);

            meshComp.position.setX(-50);
            meshComp.position.setY(-50);
            meshComp.position.setZ(-50);
            meshComp.addTo(space);

            space.rotation.y = -Math.PI / 3;
            space.rotation.x = Math.PI / 8;
            space.addTo(world);


            let zoomedIn = false;

            const rotate = new WHS.Loop(() => {
                    if(zoomedIn) {
                        //space.rotation.y += 0.0001;
                        //space.rotation.x += 0.0001;
                        //space.rotation.z += 0.0001;
                    } else {
                        space.rotation.y += 0.005;
                        space.rotation.x += 0.0001;
                    }


                //world.$camera.position.x -= .067;
                //world.$camera.native.lookAt(meshComp);
                //world.$camera.native.lookAt(new THREE.Vector3(50, 15, 50));
            });

            const zoomIn = new WHS.Loop(() => {

                if(world.$camera.position.z > 10){
                world.$camera.position.z -= 5.87;
                }
            });

            const zoomOut = new WHS.Loop(() => {
                if(world.$camera.position.z < 400){
                world.$camera.position.z += 8.67;                }

             });

            //meshComp.rotation.y += 0.005;

            //world.addLoop(animation);
            world.addLoop(rotate);
            world.addLoop(zoomIn);
            world.addLoop(zoomOut);
            //zoomIn.start();
            //animation.start();
            rotate.start();
// Start rendering.
            world.$camera.native.lookAt(new THREE.Vector3(0, 0, 0));
            //world.$camera.native.lookAt(new THREE.Vector3(-25, -25, 0));
            world.start();

            let oldX,oldY,oldScroll = 0;

            document.body.addEventListener('mousemove', (e) => {

                if(zoomedIn) {
                    if(oldX != e.screenX){
                        space.rotation.y += (e.screenX - oldX) / 10000;
                    }

                    /*
                    if(oldY != e.screenY){
                        space.rotation.x += (e.screenY - oldY) / 10000;
                    }
                     */
                    oldX = e.screenX;
                    oldY = e.screenY;

                    //space.rotation.y = (e.screenX - window.innerWidth / 2) / 1000;
                    //space.rotation.x = (e.screenX - window.innerWidth / 2) / 1000;

                    // world.$camera.position.x = 0 + (e.screenX - window.innerWidth / 2) ;
                    // world.$camera.position.y = 0 + (e.screenY - window.innerHeight / 2) ;
                    //world.$camera.native.lookAt(new THREE.Vector3(0, 0, 0));
                } else {

                }

            });

            window.onscroll = function() {
                if(oldScroll != document.body.scrollTop){
                    space.position.y += (document.body.scrollTop - oldScroll) /1000;
                    oldScroll = document.body.scrollTop;
                }
                console.log(oldScroll);
            };

            /*document.body.addEventListener('scroll', (e) => {
                if(oldScroll != document.body.scrollTop){
                    space.position.y += document.body.scrollTop - oldScroll;
                    oldScroll = document.body.scrollTop;
                }
                console.log(oldScroll);
            });*/


            document.body.addEventListener('click', (e) => {
                if(zoomedIn) {
                    zoomIn.stop();
                    zoomOut.start();
                    zoomedIn = false;
                } else {
                    oldX = e.screenX;
                    oldY = e.screenY;
                    zoomOut.stop();
                    zoomIn.start();
                    zoomedIn = true;
                }
                //meshComp.position.z += 10;
            });


        }
    };

    return animation;
});

