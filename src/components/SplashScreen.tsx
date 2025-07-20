import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
// Vite allows importing images like this:
import introImg from "../assets/intro.png";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
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
          }}
        >
          <CardHeader>
            <CardTitle>Are you ready to start tasting?</CardTitle>
            <CardDescription>
              Begin your wine journey. Discover, score, and enjoy!
            </CardDescription>
          </CardHeader>
          <CardContent style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => navigate("/categories")}>Start Tasting</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SplashScreen; 