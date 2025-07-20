import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import introImg from "../assets/intro.png";

const typewriterFont = `font-family: 'Fira Mono', 'Consolas', 'Menlo', 'monospace'`;

const words = ["tasting", "enjoying", "rating", "sipping", "smelling", "discovering"];

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout: number;
    const currentWord = words[wordIndex];

    if (!isDeleting && typed.length < currentWord.length) {
      typingTimeout = setTimeout(() => {
        setTyped(currentWord.slice(0, typed.length + 1));
      }, 120);
    } else if (!isDeleting && typed.length === currentWord.length) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typed.length > 0) {
      typingTimeout = setTimeout(() => {
        setTyped(currentWord.slice(0, typed.length - 1));
      }, 60);
    } else if (isDeleting && typed.length === 0) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
    }
    return () => clearTimeout(typingTimeout);
  }, [typed, isDeleting, wordIndex]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          background: `url(${introImg}) center center / cover no-repeat`,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Card
          style={{
            minWidth: 340,
            maxWidth: 400,
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
            pointerEvents: "auto",
            padding: 32,
            borderRadius: 16,
            border: "1px solid #bbb",
          }}
        >
          <CardHeader>
            <CardTitle style={{ fontWeight: 700, ...typewriterFont ? { fontFamily: 'Fira Mono, Consolas, Menlo, monospace' } : {} }}>
              Are you ready to start <span style={{ color: '#7f1d1d' }}>{typed}<span style={{ opacity: !isDeleting ? 1 : 0 }}>|</span></span>?
            </CardTitle>
            <CardDescription>
              Begin your wine journey. Discover, score, and enjoy!
            </CardDescription>
            <div style={{ margin: '16px 0', borderTop: '1px solid #ccc', borderRadius: 4, height: 1, width: '100%' }} />
            <div style={{ fontSize: 14, color: '#555', textAlign: 'center' }}>
              This is a blind tasting app. Your adventure starts here!
            </div>
          </CardHeader>
          <CardContent style={{ display: "flex", justifyContent: "center" }}>
            <Button 
              onClick={() => navigate("/categories")}
              style={{ fontSize: 20, padding: '18px 40px', marginTop: 24 }}
              size="lg"
            >
              Start Tasting
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SplashScreen; 