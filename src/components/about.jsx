import React, { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Howtouse = () => { // Renamed to PascalCase for convention
  // State to store window dimensions
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  // useEffect to run code on the client and update on resize
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Construct className string for the card
  const cardClassName = `
    ${windowSize.height > 800 ? "h-[32rem]" : "h-auto"} // Adjusted height logic
    ${windowSize.width > 500 ? "w-[30rem]" : "w-full"} // Adjusted width logic
    bg-neutral-900/80 // A semi-transparent dark background for the card
    border
    border-neutral-700
  `;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black p-4 sm:p-8">
      <h2 className="mb-8 text-center text-5xl font-bold text-white sm:text-7xl">
        How to Use
      </h2>
      <Card className={cardClassName.trim()}>
        <CardHeader>
          <CardTitle>Step:1</CardTitle>
          <CardDescription>Template Straight out from our website</CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <p>Copy and paste template code from our website into your code eidtor.Customize template according to your requirements.</p>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-3 gap-x-28 gap-y-3 sm:grid-cols-2 ">

          <p>✔No plagraism</p>
          <p>✔Offline support</p>
          <p>✔oops supported </p>
          <p>✔Time saving</p>
          <p>✔Customized easily</p>
          <p>✔Chat support</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Howtouse;