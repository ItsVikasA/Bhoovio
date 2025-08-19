import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Chip, Button, LinearProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import bhoovioLogo from '../assets/Bhoovio.png';

gsap.registerPlugin(TextPlugin);

const Construction = () => {
  const logoRef = useRef(null);
  const heroTextRef = useRef(null);
  const particlesRef = useRef([]);
  const featuresRef = useRef([]);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);
  const [currentText, setCurrentText] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const dynamicTexts = [
    "Connecting Rural Roots to Urban Markets",
    "Empowering Village Artisans Globally", 
    "Sustainable Commerce Revolution",
    "Authentic Crafts, Modern Platform"
  ];

  useEffect(() => {
    // Advanced cursor follower
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic text animation timeline
    const textTl = gsap.timeline({ repeat: -1 });
    dynamicTexts.forEach((text, index) => {
      textTl
        .to(heroTextRef.current, { 
          duration: 0.5, 
          text: text,
          ease: "none",
          delay: index === 0 ? 0 : 3
        })
        .to({}, { duration: 2.5 });
    });

    // 3D logo animation with rotation and floating
    gsap.set(logoRef.current, { transformStyle: "preserve-3d" });
    const logoTl = gsap.timeline({ repeat: -1 });
    logoTl
      .to(logoRef.current, { 
        rotationY: 360, 
        y: -20, 
        duration: 8, 
        ease: "power2.inOut" 
      })
      .to(logoRef.current, { 
        rotationY: 720, 
        y: 0, 
        duration: 8, 
        ease: "power2.inOut" 
      });

    // Advanced particle system
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.set(particle, {
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2
        });
        
        gsap.to(particle, {
          y: `random(-200, 200)`,
          x: `random(-100, 100)`,
          rotation: `random(0, 720)`,
          scale: `random(0.2, 1.2)`,
          duration: `random(5, 15)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      }
    });

    // Magnetic hover effects for features
    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        const handleMouseEnter = () => {
          gsap.to(feature, {
            scale: 1.08,
            rotationY: 5,
            z: 50,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(feature, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
          });
        };

        feature.addEventListener('mouseenter', handleMouseEnter);
        feature.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    // Animated progress with realistic loading
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 2;
      if (progress >= 87) {
        progress = 87;
        clearInterval(progressInterval);
      }
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${progress}%`,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    }, 200);

    return () => {
      textTl.kill();
      logoTl.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(progressInterval);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99] 
      }
    }
  };

  const features = [
    { 
      icon: "🛒", 
      title: "AI-Powered Shopping", 
      desc: "Smart recommendations & voice search",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      icon: "🌱", 
      title: "Eco-Intelligence", 
      desc: "Carbon-neutral delivery & packaging",
      color: "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
    },
    { 
      icon: "🚀", 
      title: "Instant Delivery", 
      desc: "Drone delivery & real-time tracking",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    { 
      icon: "🔐", 
      title: "Blockchain Security", 
      desc: "Crypto payments & NFT certificates",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at top, rgba(16, 185, 129, 0.1) 0%, transparent 70%),
          radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
          linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}
    >
      {/* Custom cursor */}
      <Box
        ref={cursorRef}
        sx={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          background: 'radial-gradient(circle, #10b981, #34d399)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
          transition: 'transform 0.1s ease-out',
          mixBlendMode: 'difference'
        }}
      />

      {/* Advanced particle system */}
      {[...Array(25)].map((_, index) => (
        <Box
          key={index}
          ref={(el) => (particlesRef.current[index] = el)}
          sx={{
            position: 'absolute',
            width: `${Math.random() * 12 + 4}px`,
            height: `${Math.random() * 12 + 4}px`,
            background: index % 3 === 0 ? 
              'linear-gradient(45deg, #10b981, #34d399)' : 
              index % 3 === 1 ? 
              'linear-gradient(45deg, #3b82f6, #60a5fa)' :
              'linear-gradient(45deg, #8b5cf6, #a78bfa)',
            borderRadius: Math.random() > 0.5 ? '50%' : '20%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Mesh gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            conic-gradient(from 230.29deg at 51.63% 52.16%, #2563eb 0deg, #0891b2 67.5deg, #059669 198.75deg, #7c3aed 251.25deg, #db2777 301.88deg, #2563eb 360deg),
            linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.8) 100%)
          `,
          opacity: 0.1,
          zIndex: 1
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Navigation Bar */}
        <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              ref={logoRef}
              component="img"
              src={bhoovioLogo}
              alt="Bhoovio Logo"
              sx={{
                width: '80px',
                height: 'auto',
                filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))'
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Chip 
              label="🔥 Limited Beta Access" 
              sx={{ 
                background: 'linear-gradient(45deg, #f59e0b, #f97316)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                animation: 'pulse 2s infinite'
              }}
            />
          </motion.div>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', pt: 8, pb: 12 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '5.5rem' },
                  mb: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #10b981 50%, #3b82f6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em'
                }}
              >
                The Future of
                <br />
                <span style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Commerce
                </span>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                ref={heroTextRef}
                variant="h4"
                sx={{
                  color: '#94a3b8',
                  mb: 6,
                  fontWeight: 300,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                Bhoovio: Connecting Rural Roots to Urban Markets
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: '#cbd5e1',
                  mb: 8,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontSize: '1.2rem'
                }}
              >
                Experience the next generation of e-commerce with AI-powered personalization, 
                blockchain security, and sustainable delivery solutions. Where tradition meets innovation.
              </Typography>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 8 }}>
                <Button
                  variant="contained"
                  component={motion.button}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                    borderRadius: '50px',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    border: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%'
                    }
                  }}
                >
                  Join Waitlist
                </Button>
                
                <Button
                  variant="outlined"
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    borderColor: '#475569',
                    color: '#e2e8f0',
                    borderRadius: '50px',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      borderColor: '#10b981',
                      background: 'rgba(16, 185, 129, 0.1)'
                    }
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
            </motion.div>

            {/* Progress Section */}
            <motion.div variants={itemVariants}>
              <Box sx={{ maxWidth: '500px', mx: 'auto', mb: 8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Platform Development
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
                    87% Complete
                  </Typography>
                </Box>
                <Box sx={{ 
                  background: 'rgba(30, 41, 59, 0.8)', 
                  borderRadius: '10px', 
                  height: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(71, 85, 105, 0.3)'
                }}>
                  <Box
                    ref={progressRef}
                    sx={{
                      height: '100%',
                      width: 0,
                      background: 'linear-gradient(90deg, #10b981, #34d399, #06d6a0)',
                      borderRadius: '10px',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        animation: 'shimmer 2s infinite'
                      }
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4} sx={{ mb: 12 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  ref={(el) => (featuresRef.current[index] = el)}
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(71, 85, 105, 0.3)',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: feature.color
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h2" 
                      sx={{ mb: 3, fontSize: '3rem', textAlign: 'center' }}
                    >
                      {feature.icon}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#f1f5f9', 
                        mb: 2,
                        textAlign: 'center' 
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#94a3b8',
                        textAlign: 'center',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Final CTA Section */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                borderRadius: '32px',
                p: 8,
                textAlign: 'center',
                position: 'relative',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                backdropFilter: 'blur(20px)',
                mb: 8
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: '#f1f5f9' }}>
                Ready to Transform Commerce?
              </Typography>
              <Typography variant="h6" sx={{ color: '#94a3b8', mb: 4, maxWidth: '600px', mx: 'auto' }}>
                Join thousands of early adopters who are already experiencing the future of sustainable e-commerce.
              </Typography>
              <Button
                variant="contained"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                  borderRadius: '50px',
                  px: 6,
                  py: 3,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                Get Early Access 🚀
              </Button>
            </Box>
          </motion.div>

          {/* Developer Credits */}
          <motion.div variants={itemVariants}>
            <Box 
              sx={{ 
                textAlign: 'center',
                py: 6,
                borderTop: '1px solid rgba(71, 85, 105, 0.3)',
                mt: 8
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#64748b', 
                  mb: 2,
                  fontSize: '0.9rem'
                }}
              >
                Developed with ❤️ by
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                {[
                  { name: 'Vikas', url: 'https://www.linkedin.com/in/vikas028' },
                  { name: 'Rakesh', url: '#' },
                  { name: 'Sanjana', url: 'https://www.linkedin.com/in/sanjana-ammanagimath-aa6baa329' },
                  { name: 'Rajeshwari', url: '#' }
                ].map((developer, index) => (
                  <Chip
                    key={index}
                    label={developer.name}
                    component={motion.a}
                    href={developer.url}
                    target={developer.url !== '#' ? '_blank' : undefined}
                    rel={developer.url !== '#' ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontWeight: 500,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'rgba(16, 185, 129, 0.2)',
                        borderColor: '#10b981',
                        color: '#34d399'
                      }
                    }}
                  />
                ))}
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#475569', 
                  mt: 3,
                  fontSize: '0.8rem',
                  opacity: 0.8
                }}
              >
                © 2025 Bhoovio. Building the future of sustainable commerce.
              </Typography>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          cursor: none;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </Box>
  );
};

export default Construction;
