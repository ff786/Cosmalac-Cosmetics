import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const createLabelTexture = (product) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f7e8bf";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#8c5a19";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "600 76px Georgia, serif";
    ctx.fillText(
        product?.name?.includes("Queen") ? "8X" : "6 in 1",
        512,
        205
    );

    ctx.font = "italic 74px cursive";
    ctx.fillText(
        product?.name?.includes("Queen") ? "Beauty Night Care" : "Solution",
        512,
        302
    );

    ctx.strokeStyle = "#9a6b27";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(120, 265);
    ctx.lineTo(330, 265);
    ctx.moveTo(694, 265);
    ctx.lineTo(904, 265);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;

    return texture;
};

const ThreeProductViewer = ({ product, className = "" }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const targetRotation = useRef({ x: 0, y: 0 });
    const rotation = useRef({ x: 0, y: 0 });
    const pointer = useRef({
        active: false,
        x: 0,
        y: 0,
        moved: false,
    });

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            28,
            mount.clientWidth / mount.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 0.25, 7.2);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        mount.appendChild(renderer.domElement);

        const root = new THREE.Group();
        root.position.y = 0.1;
        scene.add(root);

        const jar = new THREE.Group();
        root.add(jar);

        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#f4dfad"),
            roughness: 0.26,
            metalness: 0.02,
            clearcoat: 0.65,
            clearcoatRoughness: 0.18,
            transmission: 0.04,
            thickness: 0.3,
        });

        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(2.05, 2.12, 1.55, 96, 6),
            bodyMaterial
        );
        body.position.y = -0.15;
        jar.add(body);

        const lidMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#090909"),
            roughness: 0.12,
            metalness: 0.68,
            clearcoat: 1,
            clearcoatRoughness: 0.08,
        });

        const lid = new THREE.Mesh(
            new THREE.CylinderGeometry(2.12, 2.08, 0.78, 96, 4),
            lidMaterial
        );
        lid.position.y = 1.03;
        jar.add(lid);

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#f3f5f5"),
            transparent: true,
            opacity: 0.58,
            roughness: 0.08,
            metalness: 0,
            transmission: 0.6,
            thickness: 0.22,
            clearcoat: 1,
        });

        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(2.12, 2.18, 0.23, 96),
            glassMaterial
        );
        base.position.y = -0.97;
        jar.add(base);

        const rim = new THREE.Mesh(
            new THREE.TorusGeometry(2.08, 0.055, 16, 96),
            glassMaterial
        );
        rim.rotation.x = Math.PI / 2;
        rim.position.y = -0.9;
        jar.add(rim);

        const labelGroup = new THREE.Group();
        labelGroup.position.set(0, -0.08, 2.065);
        labelGroup.scale.set(1.58, 0.66, 1);
        jar.add(labelGroup);

        const label = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 1),
            new THREE.MeshStandardMaterial({
                color: "#ffffff",
                roughness: 0.45,
                metalness: 0,
                transparent: true,
            })
        );
        label.rotation.y = 0;
        labelGroup.add(label);

        label.material.map = createLabelTexture(product);
        label.material.needsUpdate = true;

        const inner = new THREE.Mesh(
            new THREE.CylinderGeometry(1.82, 1.88, 1.34, 96),
            new THREE.MeshPhysicalMaterial({
                color: new THREE.Color("#fff1c8"),
                roughness: 0.42,
                metalness: 0,
                clearcoat: 0.15,
            })
        );
        inner.position.y = -0.15;
        jar.add(inner);

        const ground = new THREE.Mesh(
            new THREE.CircleGeometry(2.15, 96),
            new THREE.MeshBasicMaterial({
                color: "#4a3527",
                transparent: true,
                opacity: 0.2,
            })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2.0;
        root.add(ground);

        const key = new THREE.DirectionalLight("#fff4df", 4.4);
        key.position.set(-4, 6, 6);
        scene.add(key);

        const fill = new THREE.DirectionalLight("#e7c68e", 2.1);
        fill.position.set(5, 2, 3);
        scene.add(fill);

        const rimLight = new THREE.DirectionalLight("#ffffff", 3);
        rimLight.position.set(0, 4, -5);
        scene.add(rimLight);

        scene.add(new THREE.HemisphereLight("#fffaf1", "#6d4e35", 1.4));

        const resize = () => {
            if (!mount.clientWidth || !mount.clientHeight) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };

        const onPointerDown = (event) => {
            pointer.current.active = true;
            pointer.current.moved = false;
            pointer.current.x = event.clientX;
            pointer.current.y = event.clientY;
            renderer.domElement.setPointerCapture?.(event.pointerId);
        };

        const onPointerMove = (event) => {
            if (!pointer.current.active) return;

            const dx = event.clientX - pointer.current.x;
            const dy = event.clientY - pointer.current.y;

            if (Math.abs(dx) + Math.abs(dy) > 2) {
                pointer.current.moved = true;
            }

            pointer.current.x = event.clientX;
            pointer.current.y = event.clientY;

            targetRotation.current.y += dx * 0.009;
            targetRotation.current.x = clamp(
                targetRotation.current.x + dy * 0.006,
                -0.22,
                0.22
            );
        };

        const onPointerUp = (event) => {
            pointer.current.active = false;
            renderer.domElement.releasePointerCapture?.(event.pointerId);
        };

        renderer.domElement.addEventListener("pointerdown", onPointerDown);
        renderer.domElement.addEventListener("pointermove", onPointerMove);
        renderer.domElement.addEventListener("pointerup", onPointerUp);
        renderer.domElement.addEventListener("pointercancel", onPointerUp);
        window.addEventListener("resize", resize);

        let raf = 0;
        const clock = new THREE.Clock();

        const animate = () => {
            raf = requestAnimationFrame(animate);

            const elapsed = clock.getElapsedTime();

            if (!pointer.current.active) {
                targetRotation.current.y += 0.0017;
                targetRotation.current.x +=
                    (Math.sin(elapsed * 0.55) * 0.035 - targetRotation.current.x) * 0.002;
            }

            rotation.current.x +=
                (targetRotation.current.x - rotation.current.x) * 0.075;
            rotation.current.y +=
                (targetRotation.current.y - rotation.current.y) * 0.075;

            jar.rotation.x = rotation.current.x;
            jar.rotation.y = rotation.current.y;

            root.position.y =
                0.1 + Math.sin(elapsed * 1.15) * 0.09;

            root.rotation.z =
                Math.sin(elapsed * 0.55) * 0.018;

            ground.scale.x =
                1 - Math.abs(Math.sin(elapsed * 1.15)) * 0.12;
            ground.scale.y =
                1 - Math.abs(Math.sin(elapsed * 1.15)) * 0.12;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            renderer.domElement.removeEventListener("pointerdown", onPointerDown);
            renderer.domElement.removeEventListener("pointermove", onPointerMove);
            renderer.domElement.removeEventListener("pointerup", onPointerUp);
            renderer.domElement.removeEventListener("pointercancel", onPointerUp);

            body.geometry.dispose();
            lid.geometry.dispose();
            base.geometry.dispose();
            rim.geometry.dispose();
            inner.geometry.dispose();
            label.geometry.dispose();
            ground.geometry.dispose();

            bodyMaterial.dispose();
            lidMaterial.dispose();
            glassMaterial.dispose();
            inner.material.dispose();
            label.material.dispose();
            ground.material.dispose();

            renderer.dispose();

            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [product]);

    return (
        <div
            ref={mountRef}
            className={`three-product-viewer ${className}`}
            aria-label={`${product?.name || "Product"} interactive 3D viewer`}
        />
    );
};

export default ThreeProductViewer;
