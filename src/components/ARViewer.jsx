import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Eye, Zap, AlertTriangle, CheckCircle, RefreshCw, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ARViewer({
  scenario,
  discoveredHazards,
  onHazardDiscovered,
  language
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [inspectingHazard, setInspectingHazard] = useState(null);
  const [hudStats, setHudStats] = useState({ azimuth: 0, pitch: 0 });

  // Three.js instances ref
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    hazardMeshes: [],
    pinMeshes: [],
    particles: null,
    animFrameId: null,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    spherical: { radius: 6.5, theta: Math.PI / 4, phi: Math.PI / 3 }
  });

  // 1. Initialize Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError(language === 'hi' ? 'कैमरा उपलब्ध नहीं है। 3D ट्विन मोड चालू है।' : 'Camera access unavailable. Falling back to 3D Twin Mode.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // 2. Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // Setup Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff1dc, 1.2);
    dirLight.position.set(5, 12, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Secondary industrial work light
    const pointLight = new THREE.PointLight(scenario.themeColor, 2, 15);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    threeRef.current.scene = scene;
    threeRef.current.camera = camera;
    threeRef.current.renderer = renderer;
    threeRef.current.hazardMeshes = [];
    threeRef.current.pinMeshes = [];

    // Build the specific Scenario 3D Environment
    build3DEnvironment(scenario.id, scene);

    // Camera update helper
    const updateCameraPos = () => {
      const { radius, theta, phi } = threeRef.current.spherical;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 1.2, 0);
    };
    updateCameraPos();

    // Mouse / Touch Orbit Handlers
    const onPointerDown = (e) => {
      threeRef.current.isDragging = true;
      threeRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!threeRef.current.isDragging) return;
      const deltaX = e.clientX - threeRef.current.prevMousePos.x;
      const deltaY = e.clientY - threeRef.current.prevMousePos.y;

      threeRef.current.spherical.theta -= deltaX * 0.008;
      threeRef.current.spherical.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2.05, threeRef.current.spherical.phi - deltaY * 0.008)
      );

      threeRef.current.prevMousePos = { x: e.clientX, y: e.clientY };
      updateCameraPos();

      setHudStats({
        azimuth: Math.round(((threeRef.current.spherical.theta * 180) / Math.PI) % 360),
        pitch: Math.round(((threeRef.current.spherical.phi * 180) / Math.PI))
      });
    };

    const onPointerUp = () => {
      threeRef.current.isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      threeRef.current.spherical.radius = Math.max(
        3.0,
        Math.min(14.0, threeRef.current.spherical.radius + e.deltaY * 0.005)
      );
      updateCameraPos();
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Click / Tap Raycaster for Hazard Detection
    const handleTapDetection = (event) => {
      const rect = domElement.getBoundingClientRect();
      const pointer = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);

      const checkList = [
        ...threeRef.current.hazardMeshes,
        ...threeRef.current.pinMeshes
      ];
      const intersects = raycaster.intersectObjects(checkList, true);

      if (intersects.length > 0) {
        // Find which hazard was clicked
        let topObj = intersects[0].object;
        while (topObj && !topObj.userData.hazardId && topObj.parent) {
          topObj = topObj.parent;
        }

        if (topObj && topObj.userData.hazardId) {
          const matchedHazard = scenario.hazards.find(
            (h) => h.id === topObj.userData.hazardId
          );
          if (matchedHazard) {
            handleHazardClick(matchedHazard);
          }
        }
      }
    };
    domElement.addEventListener('click', handleTapDetection);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      threeRef.current.animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate floating hazard pins
      threeRef.current.pinMeshes.forEach((pin, index) => {
        pin.rotation.y += 0.03;
        pin.position.y = pin.userData.baseY + Math.sin(elapsedTime * 3 + index) * 0.08;
      });

      // Animate particles (smoke/sparks)
      if (threeRef.current.particles) {
        threeRef.current.particles.rotation.y = elapsedTime * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(threeRef.current.animFrameId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('click', handleTapDetection);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      stopCamera();
    };
  }, [scenario.id]);

  // Adjust scene background depending on Camera passthrough state
  useEffect(() => {
    if (!threeRef.current.renderer) return;
    if (isCameraActive) {
      threeRef.current.scene.background = null;
      threeRef.current.renderer.setClearColor(0x000000, 0);
    } else {
      threeRef.current.scene.background = new THREE.Color(0x080d1a);
      threeRef.current.renderer.setClearColor(0x080d1a, 1);
    }
  }, [isCameraActive]);

  // 3. Procedural 3D Environment Builders
  const build3DEnvironment = (id, scene) => {
    if (id === 'mining') {
      buildMiningScene(scene);
    } else if (id === 'manufacturing') {
      buildManufacturingScene(scene);
    } else if (id === 'emergency') {
      buildEmergencyScene(scene);
    }

    // Add floating 3D hazard indicator pins for all hazards in this scenario
    scenario.hazards.forEach((hazard) => {
      createHazardPin(hazard, scene);
    });
  };

  const createHazardPin = (hazard, scene) => {
    const isDiscovered = discoveredHazards.includes(hazard.id);
    const pinGroup = new THREE.Group();
    pinGroup.position.set(hazard.position[0], hazard.position[1] + 0.45, hazard.position[2]);
    pinGroup.userData = { hazardId: hazard.id, baseY: hazard.position[1] + 0.45 };

    // Holographic cone pin
    const coneGeo = new THREE.ConeGeometry(0.12, 0.35, 8);
    coneGeo.rotateX(Math.PI); // point downwards
    const coneMat = new THREE.MeshStandardMaterial({
      color: isDiscovered ? 0x10b981 : 0xf59e0b,
      emissive: isDiscovered ? 0x10b981 : 0xf59e0b,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    pinGroup.add(cone);

    // Floating pulsing ring
    const ringGeo = new THREE.TorusGeometry(0.2, 0.02, 8, 24);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDiscovered ? 0x10b981 : 0xf59e0b,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.2;
    pinGroup.add(ring);

    scene.add(pinGroup);
    threeRef.current.pinMeshes.push(pinGroup);
  };

  // Mining 3D Environment
  const buildMiningScene = (scene) => {
    // Rocky Mine Floor
    const floorGeo = new THREE.PlaneGeometry(16, 16, 20, 20);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.9,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Cavern Wall & Roof Arches
    for (let z = -6; z <= 6; z += 3) {
      const archGroup = new THREE.Group();
      archGroup.position.set(0, 0, z);

      // Timber props (Pillars)
      const propMat = new THREE.MeshStandardMaterial({ color: 0x5a381e, roughness: 0.8 });
      const leftProp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 3.2, 8), propMat);
      leftProp.position.set(-2.6, 1.6, 0);
      const rightProp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 3.2, 8), propMat);
      rightProp.position.set(2.6, 1.6, 0);

      // Crossbar Beam
      const beam = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.22, 0.22), propMat);
      beam.position.set(0, 3.1, 0);

      archGroup.add(leftProp, rightProp, beam);
      scene.add(archGroup);
    }

    // Hazard 1: Worker without Helmet
    const workerGroup = new THREE.Group();
    workerGroup.position.set(-1.2, 0, 0.4);
    workerGroup.userData = { hazardId: 'h_helmet' };

    // Boots & Legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9), legMat);
    leftLeg.position.set(-0.15, 0.45, 0);
    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9), legMat);
    rightLeg.position.set(0.15, 0.45, 0);

    // Reflective Jacket (Body)
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.3), bodyMat);
    torso.position.set(0, 1.15, 0);

    // Bare Head (No Helmet! Hazard!)
    const headMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), headMat);
    head.position.set(0, 1.65, 0);

    workerGroup.add(leftLeg, rightLeg, torso, head);
    scene.add(workerGroup);
    threeRef.current.hazardMeshes.push(workerGroup);

    // Hazard 2: Fractured Roof Strata
    const fractureGroup = new THREE.Group();
    fractureGroup.position.set(0.3, 2.7, -1.0);
    fractureGroup.userData = { hazardId: 'h_roof' };
    const rockChunkMat = new THREE.MeshStandardMaterial({ color: 0x44403c, roughness: 0.95 });
    for (let i = 0; i < 4; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28 + i * 0.05), rockChunkMat);
      rock.position.set(i * 0.3 - 0.4, Math.sin(i) * 0.1, i * 0.1);
      fractureGroup.add(rock);
    }
    scene.add(fractureGroup);
    threeRef.current.hazardMeshes.push(fractureGroup);

    // Hazard 3: Torn Ventilation Duct with yellow gas mist
    const ventGroup = new THREE.Group();
    ventGroup.position.set(2.1, 2.2, -0.6);
    ventGroup.userData = { hazardId: 'h_methane' };
    const ductMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.4 });
    const duct = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 2.8, 16), ductMat);
    duct.rotateX(Math.PI / 2);
    // Torn section
    const tornDuct = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.8, 16), new THREE.MeshStandardMaterial({ color: 0x7c2d12, wireframe: true }));
    tornDuct.position.set(0, 0, 1.2);
    duct.add(tornDuct);
    ventGroup.add(duct);
    scene.add(ventGroup);
    threeRef.current.hazardMeshes.push(ventGroup);

    // Hazard 4: High Voltage Cable in Water Puddle
    const cableGroup = new THREE.Group();
    cableGroup.position.set(-0.4, 0.02, 1.2);
    cableGroup.userData = { hazardId: 'h_cable' };

    // Water Puddle (Reflective shiny dark surface)
    const puddleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85
    });
    const puddle = new THREE.Mesh(new THREE.CircleGeometry(0.8, 24), puddleMat);
    puddle.rotateX(-Math.PI / 2);
    cableGroup.add(puddle);

    // Submerged yellow cable
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.2, 0.04, -0.4),
      new THREE.Vector3(-0.2, 0.01, 0.0),
      new THREE.Vector3(0.5, 0.01, 0.2),
      new THREE.Vector3(1.4, 0.04, 0.8)
    ]);
    const cableGeo = new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
    const cableMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
    const cableMesh = new THREE.Mesh(cableGeo, cableMat);
    cableGroup.add(cableMesh);

    scene.add(cableGroup);
    threeRef.current.hazardMeshes.push(cableGroup);

    // Continuous Miner Machine in background
    const minerMachine = new THREE.Group();
    minerMachine.position.set(0, 0.7, -3.8);
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 3.2), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 2.6, 16), new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 }));
    drum.rotateZ(Math.PI / 2);
    drum.position.set(0, 0.6, 1.8);
    minerMachine.add(chassis, drum);
    scene.add(minerMachine);
  };

  // Manufacturing 3D Environment
  const buildManufacturingScene = (scene) => {
    // Concrete Factory Floor with Safety Yellow Stripes
    const floorGeo = new THREE.PlaneGeometry(18, 18);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Hazard 1: Overhead Molten Metal Crane Ladle
    const craneGroup = new THREE.Group();
    craneGroup.position.set(0, 3.2, 0);
    craneGroup.userData = { hazardId: 'h_crane' };

    const gantry = new THREE.Mesh(new THREE.BoxGeometry(7, 0.4, 0.4), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    const ladle = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.5, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 }));
    ladle.position.set(0, -1.0, 0);

    // Glowing liquid molten steel surface inside ladle
    const moltenCore = new THREE.Mesh(new THREE.CircleGeometry(0.65, 16), new THREE.MeshBasicMaterial({ color: 0xff4500 }));
    moltenCore.rotateX(-Math.PI / 2);
    moltenCore.position.set(0, -0.42, 0);

    craneGroup.add(gantry, ladle, moltenCore);
    scene.add(craneGroup);
    threeRef.current.hazardMeshes.push(craneGroup);

    // Hazard 2: 500-Ton Hydraulic Stamping Press
    const pressGroup = new THREE.Group();
    pressGroup.position.set(-1.8, 0, -0.8);
    pressGroup.userData = { hazardId: 'h_press' };

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.6 });
    const colLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.0, 0.35), frameMat);
    colLeft.position.set(-0.8, 1.5, 0);
    const colRight = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.0, 0.35), frameMat);
    colRight.position.set(0.8, 1.5, 0);
    const headBlock = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.6, 0.8), frameMat);
    headBlock.position.set(0, 2.7, 0);
    const ram = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 0.6), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
    ram.position.set(0, 1.6, 0);

    // Taped bypassed sensor
    const sensorTape = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 0.1), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    sensorTape.position.set(0.85, 1.3, 0.2);

    pressGroup.add(colLeft, colRight, headBlock, ram, sensorTape);
    scene.add(pressGroup);
    threeRef.current.hazardMeshes.push(pressGroup);

    // Hazard 3: Electrical Panel without LOTO
    const lotoGroup = new THREE.Group();
    lotoGroup.position.set(1.8, 0, 0.7);
    lotoGroup.userData = { hazardId: 'h_loto' };

    const panelBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.0, 0.4), new THREE.MeshStandardMaterial({ color: 0x64748b }));
    panelBox.position.set(0, 1.0, 0);
    // Exposed live copper busbars inside open door
    const busbars = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.05), new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.9 }));
    busbars.position.set(0, 1.0, 0.21);
    lotoGroup.add(panelBox, busbars);
    scene.add(lotoGroup);
    threeRef.current.hazardMeshes.push(lotoGroup);

    // Hazard 4: Hydraulic Oil Spill Slick
    const oilGroup = new THREE.Group();
    oilGroup.position.set(0.8, 0.01, 1.4);
    oilGroup.userData = { hazardId: 'h_oil' };
    const oilSlick = new THREE.Mesh(
      new THREE.CircleGeometry(0.9, 16),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.9 })
    );
    oilSlick.rotateX(-Math.PI / 2);
    oilGroup.add(oilSlick);
    scene.add(oilGroup);
    threeRef.current.hazardMeshes.push(oilGroup);
  };

  // Emergency 3D Environment
  const buildEmergencyScene = (scene) => {
    // Substation Ground
    const floorGeo = new THREE.PlaneGeometry(18, 18);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    scene.add(floor);

    // Hazard 1: Transformer Cabinet on Fire
    const transGroup = new THREE.Group();
    transGroup.position.set(-1.4, 0, -0.5);
    transGroup.userData = { hazardId: 'h_trans_fire' };

    const tank = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 1.2), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    tank.position.set(0, 1.0, 0);

    // Cooling radiator fins
    for (let f = -0.6; f <= 0.6; f += 0.25) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.4, 0.4), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      fin.position.set(f, 1.0, 0.7);
      transGroup.add(fin);
    }
    transGroup.add(tank);
    scene.add(transGroup);
    threeRef.current.hazardMeshes.push(transGroup);

    // Particle Fire & Smoke effect
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = -1.4 + (Math.random() - 0.5) * 1.2;
      positions[i + 1] = 1.8 + Math.random() * 2.0;
      positions[i + 2] = -0.5 + (Math.random() - 0.5) * 1.2;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0xff3b00,
      size: 0.25,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(geometry, pMaterial);
    scene.add(particles);
    threeRef.current.particles = particles;

    // Hazard 2: Blocked Exit Door
    const exitGroup = new THREE.Group();
    exitGroup.position.set(2.2, 0, -1.2);
    exitGroup.userData = { hazardId: 'h_blocked_exit' };

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x15803d }));
    door.position.set(0, 1.2, 0);
    // Exit Sign
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.12), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
    sign.position.set(0, 2.5, 0);

    // Scrap pallets blocking door
    const pallet1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.6), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    pallet1.position.set(0, 0.2, 0.4);
    const pallet2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    pallet2.position.set(0.1, 0.65, 0.45);

    exitGroup.add(door, sign, pallet1, pallet2);
    scene.add(exitGroup);
    threeRef.current.hazardMeshes.push(exitGroup);

    // Hazard 3: Wrong (Water) Extinguisher next to panel
    const extGroup = new THREE.Group();
    extGroup.position.set(0.6, 0, 1.2);
    extGroup.userData = { hazardId: 'h_wrong_extinguisher' };
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.9, 12), new THREE.MeshStandardMaterial({ color: 0x1d4ed8 })); // Blue = Water
    stand.position.set(0, 0.45, 0);
    extGroup.add(stand);
    scene.add(extGroup);
    threeRef.current.hazardMeshes.push(extGroup);

    // Hazard 4: Flammable Chemical Solvent Drums
    const drumGroup = new THREE.Group();
    drumGroup.position.set(1.3, 0, -0.2);
    drumGroup.userData = { hazardId: 'h_chemical_drums' };
    const d1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.9, 16), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
    d1.position.set(0, 0.45, 0);
    const d2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.9, 16), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
    d2.position.set(0.4, 0.45, 0.3);
    drumGroup.add(d1, d2);
    scene.add(drumGroup);
    threeRef.current.hazardMeshes.push(drumGroup);
  };

  const handleHazardClick = (hazard) => {
    sound.playHazardFound();
    setInspectingHazard(hazard);
    if (!discoveredHazards.includes(hazard.id)) {
      onHazardDiscovered(hazard);
    }
  };

  return (
    <div className="relative w-full h-[65vh] min-h-[480px] bg-slate-950 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl select-none">
      {/* Real Live Camera Video feed (Rendered behind Three.js canvas in WebAR mode) */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          isCameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Three.js 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing" />

      {/* AR Scanner Crosshair HUD */}
      <div className="ar-crosshair z-20 pointer-events-none">
        <div className="w-full h-full border border-amber-500/30 rounded-full animate-ping opacity-25" />
      </div>
      <div className="ar-scanline z-20 pointer-events-none" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          {/* Mode Pill Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-amber-500/40 text-xs font-mono text-amber-400">
            <span className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`} />
            <span>{isCameraActive ? 'LIVE WEBAR' : '3D DIGITAL TWIN'}</span>
          </div>

          {/* Compass / Azimuth */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-700/50 text-[11px] font-mono text-slate-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>AZ: {hudStats.azimuth}°</span>
          </div>
        </div>

        {/* Camera Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCamera}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium text-xs transition-all shadow-lg ${
              isCameraActive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{isCameraActive ? (language === 'hi' ? 'कैमरा बंद' : 'Stop AR') : (language === 'hi' ? 'लाइव AR कैमरा' : 'Launch AR Camera')}</span>
          </button>
        </div>
      </div>

      {/* Camera error toast if permissions denied */}
      {cameraError && (
        <div className="absolute top-14 left-3 right-3 z-30 px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-600/40 text-amber-200 text-xs text-center backdrop-blur-md">
          {cameraError}
        </div>
      )}

      {/* Floating Instructions Pill at Bottom */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2 pointer-events-auto">
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {language === 'hi'
              ? 'खतरों पर सीधे टैप करें | ड्रैग करके 360° घूमें'
              : 'Tap directly on 3D hazards to identify | Drag to rotate 360°'}
          </span>
        </div>

        {/* Hazard Discovery Counter Badge */}
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-xs font-bold text-amber-300 flex items-center gap-1.5 pointer-events-auto">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {language === 'hi' ? 'खतरे खोजे:' : 'Hazards:'}{' '}
            {discoveredHazards.filter(id => scenario.hazards.some(h => h.id === id)).length} / {scenario.hazards.length}
          </span>
        </div>
      </div>

      {/* Detail Slide-up Card when a Hazard is tapped */}
      {inspectingHazard && (
        <div className="absolute inset-x-3 bottom-14 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-96 z-40 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-4 shadow-2xl transition-all animate-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {inspectingHazard.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">
                  {language === 'hi' ? inspectingHazard.nameHi : inspectingHazard.nameEn}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setInspectingHazard(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-2 leading-relaxed">
            {language === 'hi' ? inspectingHazard.explanationHi : inspectingHazard.explanationEn}
          </p>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 mb-2.5 text-[11px] text-amber-300">
            <span className="font-semibold block text-slate-400 text-[10px] uppercase">
              {language === 'hi' ? 'कानूनी नियम (DGMS / Factories Act):' : 'Statutory Standard:'}
            </span>
            {language === 'hi' ? inspectingHazard.regulationHi : inspectingHazard.regulationEn}
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
            <span className="text-emerald-400 font-bold">
              +{inspectingHazard.points} {language === 'hi' ? 'अंक अर्जित' : 'Points Earned'}
            </span>
            <span className="text-[11px] text-slate-400">
              {language === 'hi' ? 'प्रमाणित सुरक्षा मानक' : 'Verified Safety Standard'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
