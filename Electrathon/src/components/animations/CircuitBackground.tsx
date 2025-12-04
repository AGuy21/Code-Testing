import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const particleCount = 30;

    class Particle {
      x: number;
      y: number;
      speed: number;
      direction: number; // 0: right, 1: down, 2: left, 3: up
      length: number;
      maxLength: number;
      history: { x: number; y: number }[];
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 2 + Math.random() * 2;
        this.direction = Math.floor(Math.random() * 4);
        this.length = 0;
        this.maxLength = 50 + Math.random() * 100;
        this.history = [{ x: this.x, y: this.y }];
        this.color = Math.random() > 0.5 ? "#d4af37" : "#ffffff"; // Gold or White
      }

      update() {
        this.length += this.speed;
        
        // Change direction randomly
        if (Math.random() < 0.02) {
          this.direction = (this.direction + (Math.random() > 0.5 ? 1 : 3)) % 4;
        }

        if (this.direction === 0) this.x += this.speed;
        else if (this.direction === 1) this.y += this.speed;
        else if (this.direction === 2) this.x -= this.speed;
        else if (this.direction === 3) this.y -= this.speed;

        this.history.push({ x: this.x, y: this.y });

        if (this.history.length > this.maxLength / this.speed) {
          this.history.shift();
        }

        // Reset if out of bounds
        if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.history = [{ x: this.x, y: this.y }];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.1;
        ctx.stroke();
        
        // Draw head
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-30"
    />
  );
}
