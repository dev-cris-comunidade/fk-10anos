import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDepoimentoSchema, 
  insertHomenagemSchema, 
  insertFamiliaSchema,
  insertGalleryImageSchema,
  insertParticipacaoSchema,
  insertNewsletterSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year as string) : undefined;
      const type = req.query.type as string | undefined;
      
      let events;
      if (year && type) {
        events = await storage.getEventsByYearAndType(year, type);
      } else if (year) {
        events = await storage.getEventsByYear(year);
      } else if (type) {
        events = await storage.getEventsByType(type);
      } else {
        events = await storage.getAllEvents();
      }
      
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  
  // Depoimentos
  app.get("/api/depoimentos", async (req, res) => {
    try {
      const depoimentos = await storage.getAllDepoimentos();
      res.json(depoimentos);
    } catch (error) {
      console.error("Error fetching depoimentos:", error);
      res.status(500).json({ message: "Failed to fetch depoimentos" });
    }
  });
  
  app.post("/api/depoimentos", async (req, res) => {
    try {
      const depoimento = insertDepoimentoSchema.parse(req.body);
      const result = await storage.insertDepoimento(depoimento);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating depoimento:", error);
        res.status(500).json({ message: "Failed to create depoimento" });
      }
    }
  });
  
  // Homenagens
  app.get("/api/homenagens", async (req, res) => {
    try {
      const homenagens = await storage.getAllHomenagens();
      res.json(homenagens);
    } catch (error) {
      console.error("Error fetching homenagens:", error);
      res.status(500).json({ message: "Failed to fetch homenagens" });
    }
  });
  
  app.post("/api/homenagens", async (req, res) => {
    try {
      const homenagem = insertHomenagemSchema.parse(req.body);
      const result = await storage.insertHomenagem(homenagem);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating homenagem:", error);
        res.status(500).json({ message: "Failed to create homenagem" });
      }
    }
  });
  
  // Famílias
  app.get("/api/familias", async (req, res) => {
    try {
      const familias = await storage.getAllFamilias();
      res.json(familias);
    } catch (error) {
      console.error("Error fetching familias:", error);
      res.status(500).json({ message: "Failed to fetch familias" });
    }
  });
  
  app.post("/api/familias", async (req, res) => {
    try {
      const familia = insertFamiliaSchema.parse(req.body);
      const result = await storage.insertFamilia(familia);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating familia:", error);
        res.status(500).json({ message: "Failed to create familia" });
      }
    }
  });
  
  // Gallery
  app.get("/api/gallery", async (req, res) => {
    try {
      const year = req.query.year ? parseInt(req.query.year as string) : undefined;
      const type = req.query.type as string | undefined;
      
      let images;
      if (year && type) {
        images = await storage.getGalleryImagesByYearAndType(year, type);
      } else if (year) {
        images = await storage.getGalleryImagesByYear(year);
      } else if (type) {
        images = await storage.getGalleryImagesByType(type);
      } else {
        images = await storage.getAllGalleryImages();
      }
      
      res.json(images);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      res.status(500).json({ message: "Failed to fetch gallery images" });
    }
  });
  
  app.post("/api/gallery", async (req, res) => {
    try {
      const image = insertGalleryImageSchema.parse(req.body);
      const result = await storage.insertGalleryImage(image);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating gallery image:", error);
        res.status(500).json({ message: "Failed to create gallery image" });
      }
    }
  });
  
  // Participações
  app.post("/api/participacoes", async (req, res) => {
    try {
      const participacao = insertParticipacaoSchema.parse(req.body);
      const result = await storage.insertParticipacao(participacao);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        console.error("Error creating participacao:", error);
        res.status(500).json({ message: "Failed to create participacao" });
      }
    }
  });
  
  // Newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletter = insertNewsletterSchema.parse(req.body);
      const result = await storage.insertNewsletter(newsletter);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else if (error instanceof Error && error.message === "Email already subscribed") {
        res.status(409).json({ message: "Email already subscribed" });
      } else {
        console.error("Error creating newsletter subscription:", error);
        res.status(500).json({ message: "Failed to create newsletter subscription" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
