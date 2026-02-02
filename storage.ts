import { 
  profile, skills, projects, learningGoals, messages,
  type Profile, type Skill, type Project, type LearningGoal, type Message, type InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Profile
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: Omit<Profile, "id">): Promise<Profile>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: Omit<Skill, "id">): Promise<Skill>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: Omit<Project, "id">): Promise<Project>;
  
  // Goals
  getGoals(): Promise<LearningGoal[]>;
  createGoal(goal: Omit<LearningGoal, "id">): Promise<LearningGoal>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  // Profile
  async getProfile(): Promise<Profile | undefined> {
    const [userProfile] = await db.select().from(profile).limit(1);
    return userProfile;
  }
  
  async createProfile(newProfile: Omit<Profile, "id">): Promise<Profile> {
    const [created] = await db.insert(profile).values(newProfile).returning();
    return created;
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(newSkill: Omit<Skill, "id">): Promise<Skill> {
    const [created] = await db.insert(skills).values(newSkill).returning();
    return created;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(newProject: Omit<Project, "id">): Promise<Project> {
    const [created] = await db.insert(projects).values(newProject).returning();
    return created;
  }

  // Goals
  async getGoals(): Promise<LearningGoal[]> {
    return await db.select().from(learningGoals);
  }

  async createGoal(newGoal: Omit<LearningGoal, "id">): Promise<LearningGoal> {
    const [created] = await db.insert(learningGoals).values(newGoal).returning();
    return created;
  }

  // Messages
  async createMessage(newMessage: InsertMessage): Promise<Message> {
    const [created] = await db.insert(messages).values(newMessage).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
