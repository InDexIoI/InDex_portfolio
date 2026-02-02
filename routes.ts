import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "In Dex",
      title: "Aspiring IT & Cybersecurity Student",
      bio: "Hi, I’m In Dex. I am interested in IT and cybersecurity and plan to study in Japan. I have passed JLPT N4 and I am preparing for JLPT N3. I enjoy learning technology, problem-solving, and languages.",
      email: "yourname@email.com",
      github: "github.com/yourusername"
    });

    const skillList = [
      { name: "HTML & CSS", category: "Basic" },
      { name: "JavaScript", category: "Beginner" },
      { name: "Linux Basics", category: "System" },
      { name: "Networking Fundamentals", category: "System" },
      { name: "English Communication", category: "Language" },
      { name: "Japanese (JLPT N3 level)", category: "Language" }
    ];
    for (const skill of skillList) {
      await storage.createSkill(skill);
    }

    const projectList = [
      {
        title: "Personal Portfolio Website",
        description: "A simple portfolio website built using HTML and CSS to introduce myself and show my learning journey.",
        techStack: "HTML, CSS"
      },
      {
        title: "Basic Calculator",
        description: "A beginner-friendly calculator made with JavaScript to practice logic and UI.",
        techStack: "HTML, CSS, JavaScript"
      }
    ];
    for (const project of projectList) {
      await storage.createProject(project);
    }

    const goalList = [
      "JLPT N3 preparation",
      "EJU Mathematics (Course 2)",
      "Cybersecurity fundamentals",
      "Linux command line practice"
    ];
    for (const goal of goalList) {
      await storage.createGoal({ goal });
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database on startup
  await seedDatabase();

  // Profile
  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Goals
  app.get(api.goals.list.path, async (req, res) => {
    const goals = await storage.getGoals();
    res.json(goals);
  });

  // Messages
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
