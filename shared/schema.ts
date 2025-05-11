import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Event Types
export const eventTypes = ["Festa", "Social Teórica", "Lounge", "Festa Junina", "Especial"] as const;
export type EventType = (typeof eventTypes)[number];

// Timeline Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  year: integer("year").notNull(),
  eventType: text("event_type").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Depoimentos (Testimonials)
export const depoimentos = pgTable("depoimentos", {
  id: serial("id").primaryKey(),
  name: text("name"),
  content: text("content").notNull(),
  year: integer("year"),
  memberSince: integer("member_since"),
  imageUrl: text("image_url"),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDepoimentoSchema = createInsertSchema(depoimentos).omit({ id: true, approved: true, createdAt: true });
export type InsertDepoimento = z.infer<typeof insertDepoimentoSchema>;
export type Depoimento = typeof depoimentos.$inferSelect;

// Homenagens (Tributes)
export const homenagens = pgTable("homenagens", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  yearStart: integer("year_start"),
  yearEnd: integer("year_end"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHomenagemSchema = createInsertSchema(homenagens).omit({ id: true, approved: true, createdAt: true });
export type InsertHomenagem = z.infer<typeof insertHomenagemSchema>;
export type Homenagem = typeof homenagens.$inferSelect;

// Famílias FK
export const familias = pgTable("familias", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // Casal, Amizade, etc.
  description: text("description").notNull(),
  year: integer("year"),
  eventName: text("event_name"),
  imageUrl: text("image_url"),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFamiliaSchema = createInsertSchema(familias).omit({ id: true, approved: true, createdAt: true });
export type InsertFamilia = z.infer<typeof insertFamiliaSchema>;
export type Familia = typeof familias.$inferSelect;

// Gallery Images
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  title: text("title"),
  description: text("description"),
  year: integer("year").notNull(),
  eventType: text("event_type").notNull(),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true, approved: true, createdAt: true });
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;

// Participações (Contributions)
export const participacoes = pgTable("participacoes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(), // Fotos, Histórias, Colaboração
  message: text("message"),
  processed: boolean("processed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertParticipacaoSchema = createInsertSchema(participacoes).omit({ id: true, processed: true, createdAt: true });
export type InsertParticipacao = z.infer<typeof insertParticipacaoSchema>;
export type Participacao = typeof participacoes.$inferSelect;

// Newsletter Subscriptions
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true, createdAt: true });
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Initial Events Data
export const initialEvents = [
  {
    title: "Free Kisses | 2ª Edição",
    date: "10/07/2015",
    year: 2015,
    eventType: "Festa"
  },
  {
    title: "Free Kisses | Edição Especial: Aniversário da Ju",
    date: "12/09/2015",
    year: 2015,
    eventType: "Festa"
  },
  {
    title: "Free Kisses | Edição Fantasia",
    date: "07/11/2015",
    year: 2015,
    eventType: "Festa"
  },
  {
    title: "Free Kisses 80's & 90's | Beija Eu, Beija Eu, Beija eu, Me Beija",
    date: "05/12/2015",
    year: 2015,
    eventType: "Festa"
  },
  {
    title: "Free Kisses | Correio do Amor",
    date: "16/01/2016",
    year: 2016,
    eventType: "Festa"
  },
  {
    title: "Free Kisses | Folia",
    date: "12/02/2016",
    year: 2016,
    eventType: "Festa"
  },
  {
    title: "Free Kisses | 8ª Edição",
    date: "11/03/2016",
    year: 2016,
    eventType: "Festa"
  },
  {
    title: "Relações Não Monogâmicas - Quebrando o Tabu da Exclusividade Sexual e Afetiva",
    date: "30/03/2016",
    year: 2016,
    eventType: "Social Teórica"
  },
  {
    title: "Free Kisses Social Club | Conversa e Videokê",
    date: "28/04/2016",
    year: 2016,
    eventType: "Social Teórica"
  },
  {
    title: "Free Kisses | Divas",
    date: "14/05/2016",
    year: 2016,
    eventType: "Festa"
  }
];
