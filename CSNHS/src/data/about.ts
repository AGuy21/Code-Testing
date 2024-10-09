// Importing images of programming language and framework icons from the assets directory
import js from "../assets/js.png"; // JavaScript icon
import python from "../assets/python.png"; // Python icon
import typescript from "../assets/typescript.png"; // TypeScript icon
import react from "../assets/physics.png"; // React icon (using physics.png for React)
import expo from "../assets/Expo.webp"; // Expo icon
import clerk from "../assets/clerk.png"; // Clerk Auth icon
import firebase from "../assets/firebase-svgrepo-com.svg"; // Firebase icon

//!This file will contain all necesssary hardcoded data for the About Me page (/pages/About.tsx)

//*Data for About Me section containing, my prgramming languages, frameworks, and my techstack
export const AboutMeData = {
  // List of programming languages with their names and associated icon URLs
  ProgrammingLanguages: [
    {
      name: "Typescript",
      iconUrl: typescript,
    },
    {
      name: "Javascript",
      iconUrl: js,
    },
    {
      name: "Python",
      iconUrl: python,
    },
  ],
  // List of frameworks with their names and associated icon URLs
  Frameworks: [
    {
      name: "React Native",
      iconUrl: react,
    },
    {
      name: "Expo",
      iconUrl: expo,
    },
    {
      name: "React Js",
      iconUrl: react, // Used same icon as react native since they both the same no need to change
    },
  ],
  // List of technologies in the user's tech stack with their names and associated icon URLs
  TechStack: [
    {
      name: "React Native",
      iconUrl: react,
    },
    {
      name: "Expo",
      iconUrl: expo,
    },
    {
      name: "Firebase",
      iconUrl: firebase,
    },
    {
      name: "Clerk Auth",
      iconUrl: clerk,
    },
    {
      name: "Typescript",
      iconUrl: typescript,
    },
  ],
};
