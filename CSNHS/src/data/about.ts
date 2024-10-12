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
  AboutMe: [
    {
      title: "What do i do?",
      text: `
            I do mobile application development as my main hobby. I also dive
            into programming algorithms or scripts with python. And as of right
            Now I am learning React JS for website creation.
        `,
    },
    {
      title: "About Me",
      text: `
          I have & always will love both computer science and nature. When I was a kid and first saw nature in it’s true beauty I always strived to learn more about how it worked, how it came to be, & how it affects society. 
          With these ideals at a young age when I finally got introduced into technology when I was 11 I was just as struck with excitement to learn more about it just like nature when I was younger. 
          Ever since then I have been learning more about computers, its effects on society , and how I make both my life and everyone else’s lives better. So, when I was first introduced into programming, 
          I loved it since I could create something that I admired and I wanted to do mobile apps since it not only had a super far reach, but also my first ever piece of technology was a small android phone as a kid, so it just felt right.
      `,
    },
  ],
};
