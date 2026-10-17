import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const canvas = document.getElementById('three-canvas')
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // ── Starfield particles
    const starGeo = new THREE.BufferGeometry()
    const starCount = 1800
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      const t = Math.random()
      colors[i * 3]     = 0.8 + t * 0.2   // R
      colors[i * 3 + 1] = 0.6 + t * 0.1   // G
      colors[i * 3 + 2] = 0.2 + t * 0.3   // B
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const starMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.85 })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ── Floating donut / torus (cake ring shape)
    const torusGeo = new THREE.TorusGeometry(1.4, 0.35, 32, 100)
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xd4a853,
      emissive: 0xc5943b,
      emissiveIntensity: 0.15,
      metalness: 0.3,
      roughness: 0.5,
      wireframe: false,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.position.set(-3, 1, -3)
    scene.add(torus)

    // ── Second torus
    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.22, 16, 60),
      new THREE.MeshStandardMaterial({ color: 0xdb8e88, emissive: 0xcb766f, emissiveIntensity: 0.2, metalness: 0.4, roughness: 0.4 })
    )
    torus2.position.set(3.5, -1, -2)
    scene.add(torus2)

    // ── Sphere (cake ball)
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf9,
      emissive: 0xd4a853,
      emissiveIntensity: 0.1,
      metalness: 0.1,
      roughness: 0.7,
    })
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), sphereMat)
    sphere.position.set(2, 2, -1)
    scene.add(sphere)

    // ── Lights
    scene.add(new THREE.AmbientLight(0xfff7ee, 0.9))
    const pointLight1 = new THREE.PointLight(0xd4a853, 2, 15)
    pointLight1.position.set(3, 3, 3)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0xdb8e88, 1.5, 12)
    pointLight2.position.set(-4, -2, 2)
    scene.add(pointLight2)

    // ── Water wave plane (bottom)
    const waveGeo = new THREE.PlaneGeometry(20, 6, 80, 30)
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0xd5c2b0,
      emissive: 0xc5943b,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
    })
    const wave = new THREE.Mesh(waveGeo, waveMat)
    wave.rotation.x = -Math.PI / 3
    wave.position.set(0, -4, -2)
    scene.add(wave)

    let mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let clock = new THREE.Clock()
    let animId

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Star drift
      stars.rotation.y = t * 0.018
      stars.rotation.x = t * 0.008

      // Torus spin
      torus.rotation.x = t * 0.4
      torus.rotation.y = t * 0.6
      torus2.rotation.x = -t * 0.5
      torus2.rotation.z = t * 0.3

      // Sphere float
      sphere.position.y = 2 + Math.sin(t * 1.2) * 0.3

      // Wave vertices
      const pos = waveGeo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        pos.setZ(i, Math.sin(x * 0.8 + t * 1.5) * 0.2 + Math.cos(y * 1.2 + t) * 0.15)
      }
      pos.needsUpdate = true

      // Camera mouse parallax
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return null
}
