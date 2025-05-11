import { 
  events, depoimentos, homenagens, familias, galleryImages, participacoes, newsletters,
  type Event, type InsertEvent, 
  type Depoimento, type InsertDepoimento,
  type Homenagem, type InsertHomenagem,
  type Familia, type InsertFamilia,
  type GalleryImage, type InsertGalleryImage,
  type Participacao, type InsertParticipacao,
  type Newsletter, type InsertNewsletter,
  initialEvents
} from "@shared/schema";

export interface IStorage {
  // Events
  getAllEvents(): Promise<Event[]>;
  getEventsByYear(year: number): Promise<Event[]>;
  getEventsByType(type: string): Promise<Event[]>;
  getEventsByYearAndType(year: number, type: string): Promise<Event[]>;
  insertEvent(event: InsertEvent): Promise<Event>;
  
  // Depoimentos
  getAllDepoimentos(approvedOnly?: boolean): Promise<Depoimento[]>;
  insertDepoimento(depoimento: InsertDepoimento): Promise<Depoimento>;
  
  // Homenagens
  getAllHomenagens(approvedOnly?: boolean): Promise<Homenagem[]>;
  insertHomenagem(homenagem: InsertHomenagem): Promise<Homenagem>;
  
  // Famílias
  getAllFamilias(approvedOnly?: boolean): Promise<Familia[]>;
  insertFamilia(familia: InsertFamilia): Promise<Familia>;
  
  // Gallery
  getAllGalleryImages(approvedOnly?: boolean): Promise<GalleryImage[]>;
  getGalleryImagesByYear(year: number, approvedOnly?: boolean): Promise<GalleryImage[]>;
  getGalleryImagesByType(type: string, approvedOnly?: boolean): Promise<GalleryImage[]>;
  getGalleryImagesByYearAndType(year: number, type: string, approvedOnly?: boolean): Promise<GalleryImage[]>;
  insertGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  
  // Participacoes
  insertParticipacao(participacao: InsertParticipacao): Promise<Participacao>;
  
  // Newsletter
  insertNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private eventsData: Map<number, Event>;
  private depoimentosData: Map<number, Depoimento>;
  private homenagensData: Map<number, Homenagem>;
  private familiasData: Map<number, Familia>;
  private galleryImagesData: Map<number, GalleryImage>;
  private participacoesData: Map<number, Participacao>;
  private newslettersData: Map<number, Newsletter>;
  
  private eventId: number = 1;
  private depoimentoId: number = 1;
  private homenagemId: number = 1;
  private familiaId: number = 1;
  private galleryImageId: number = 1;
  private participacaoId: number = 1;
  private newsletterId: number = 1;
  
  constructor() {
    this.eventsData = new Map();
    this.depoimentosData = new Map();
    this.homenagensData = new Map();
    this.familiasData = new Map();
    this.galleryImagesData = new Map();
    this.participacoesData = new Map();
    this.newslettersData = new Map();
    
    // Populate with initial data
    this.initializeEvents();
    
    // Initialize sample data asynchronously
    (async () => {
      try {
        await this.initializeSampleData();
      } catch (error) {
        console.error("Error initializing sample data:", error);
      }
    })();
  }
  
  private initializeEvents() {
    initialEvents.forEach(event => {
      const newEvent: Event = {
        ...event,
        id: this.eventId++,
        description: "",
        imageUrl: ""
      };
      this.eventsData.set(newEvent.id, newEvent);
    });
  }
  
  private async initializeSampleData() {
    try {
      // Add sample depoimentos
      const depoimentoMariana = {
        name: "Mariana S.",
        content: "A FK foi onde encontrei coragem para ser quem eu realmente sou. Em 2018, no meu primeiro evento, percebi que existia um lugar onde a liberdade e o respeito podiam coexistir. Formei amizades que levo para a vida e aprendi sobre relacionamentos de uma forma que nenhum outro espaço permitiria.",
        year: 2018,
        memberSince: 2016,
        imageUrl: ""
      };
      
      const depoimentoRafael = {
        name: "Rafael T.",
        content: "Conheci meu atual marido na FK de 2017! Quem diria que um evento assim pudesse criar uma família? Conversamos a noite toda numa Social Teórica, trocamos contato e nunca mais nos separamos. A FK não é só festa, é um espaço de conexões profundas e transformadoras. Sou eternamente grato.",
        year: 2017,
        memberSince: 2015,
        imageUrl: ""
      };
      
      // Add directly to the map with approved status
      const depoMariana: Depoimento = {
        id: this.depoimentoId++,
        content: depoimentoMariana.content,
        name: depoimentoMariana.name || null,
        year: depoimentoMariana.year || null,
        memberSince: depoimentoMariana.memberSince || null,
        imageUrl: depoimentoMariana.imageUrl || null,
        approved: true,
        createdAt: new Date()
      };
      this.depoimentosData.set(depoMariana.id, depoMariana);
      
      const depoRafael: Depoimento = {
        id: this.depoimentoId++,
        content: depoimentoRafael.content,
        name: depoimentoRafael.name || null,
        year: depoimentoRafael.year || null,
        memberSince: depoimentoRafael.memberSince || null,
        imageUrl: depoimentoRafael.imageUrl || null,
        approved: true,
        createdAt: new Date()
      };
      this.depoimentosData.set(depoRafael.id, depoRafael);
      
      // Add sample homenagens
      const homenagemCarlos = {
        name: "Carlos S.",
        yearStart: 2016,
        yearEnd: 2022,
        content: "Seu sorriso iluminava todas as festas. Sua generosidade e espírito livre inspiraram muitos de nós. Continuamos dançando por você.",
        imageUrl: ""
      };
      
      const homenagemJulia = {
        name: "Júlia M.",
        yearStart: 2015,
        yearEnd: 2020,
        content: "Organizadora das primeiras edições, sua criatividade e dedicação ajudaram a construir tudo o que a FK representa hoje. Sentimos sua falta todos os dias.",
        imageUrl: ""
      };
      
      const homCarlos: Homenagem = {
        id: this.homenagemId++,
        name: homenagemCarlos.name,
        content: homenagemCarlos.content,
        yearStart: homenagemCarlos.yearStart || null,
        yearEnd: homenagemCarlos.yearEnd || null,
        imageUrl: homenagemCarlos.imageUrl || null,
        approved: true,
        createdAt: new Date()
      };
      this.homenagensData.set(homCarlos.id, homCarlos);
      
      const homJulia: Homenagem = {
        id: this.homenagemId++,
        name: homenagemJulia.name,
        content: homenagemJulia.content,
        yearStart: homenagemJulia.yearStart || null,
        yearEnd: homenagemJulia.yearEnd || null,
        imageUrl: homenagemJulia.imageUrl || null,
        approved: true,
        createdAt: new Date()
      };
      this.homenagensData.set(homJulia.id, homJulia);
      
      // Add sample familias
      const familiaAnaPedro = {
        title: "Ana & Pedro",
        type: "Casal",
        description: "Nos conhecemos na pista de dança da FK Anos 80, em 2016. Trocamos contatos, começamos a conversar, e hoje estamos casados e esperando nosso primeiro filho. Sem a FK, talvez jamais tivéssemos nos encontrado.",
        year: 2016,
        eventName: "FK Anos 80",
        imageUrl: ""
      };
      
      const familiaGrupoConexao = {
        title: "Grupo Conexão",
        type: "Amizade",
        description: "Éramos desconhecidos que se encontraram numa Social Teórica sobre comunicação não-violenta. A conversa foi tão boa que criamos um grupo no WhatsApp naquela mesma noite. Hoje somos família, nos reunimos toda semana e já viajamos juntos várias vezes.",
        year: 2018,
        eventName: "FK Social Club",
        imageUrl: ""
      };
      
      const famAnaPedro: Familia = {
        id: this.familiaId++,
        title: familiaAnaPedro.title,
        type: familiaAnaPedro.type,
        description: familiaAnaPedro.description,
        year: familiaAnaPedro.year || null,
        eventName: familiaAnaPedro.eventName || null,
        imageUrl: familiaAnaPedro.imageUrl || null,
        approved: true,
        createdAt: new Date()
      };
      this.familiasData.set(famAnaPedro.id, famAnaPedro);
      
      const famGrupoConexao: Familia = {
        id: this.familiaId++,
        title: familiaGrupoConexao.title,
        type: familiaGrupoConexao.type,
        description: familiaGrupoConexao.description,
        year: familiaGrupoConexao.year || null,
        eventName: familiaGrupoConexao.eventName || null,
        imageUrl: familiaGrupoConexao.imageUrl || null,
        approved: true,
        createdAt: new Date()
      };
      this.familiasData.set(famGrupoConexao.id, famGrupoConexao);
      
      // Add sample gallery images
      for (let i = 1; i <= 8; i++) {
        const year = 2014 + i;
        const types = ["Festa", "Social Teórica", "Lounge", "Festa Junina"];
        const type = types[i % 4];
        
        const galleryImage: GalleryImage = {
          id: this.galleryImageId++,
          imageUrl: "",
          title: `FK ${type} ${year}`,
          description: `Evento de ${year}`,
          year,
          eventType: type,
          approved: true,
          createdAt: new Date()
        };
        
        this.galleryImagesData.set(galleryImage.id, galleryImage);
      }
    } catch (error) {
      console.error("Error initializing sample data:", error);
    }
  }
  
  // Events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.eventsData.values());
  }
  
  async getEventsByYear(year: number): Promise<Event[]> {
    return Array.from(this.eventsData.values()).filter(event => event.year === year);
  }
  
  async getEventsByType(type: string): Promise<Event[]> {
    return Array.from(this.eventsData.values()).filter(event => event.eventType === type);
  }
  
  async getEventsByYearAndType(year: number, type: string): Promise<Event[]> {
    return Array.from(this.eventsData.values()).filter(
      event => event.year === year && event.eventType === type
    );
  }
  
  async insertEvent(event: InsertEvent): Promise<Event> {
    const newEvent: Event = {
      id: this.eventId++,
      title: event.title,
      date: event.date,
      year: event.year,
      eventType: event.eventType,
      description: event.description || null,
      imageUrl: event.imageUrl || null
    };
    this.eventsData.set(newEvent.id, newEvent);
    return newEvent;
  }
  
  // Depoimentos
  async getAllDepoimentos(approvedOnly: boolean = true): Promise<Depoimento[]> {
    return Array.from(this.depoimentosData.values())
      .filter(depoimento => !approvedOnly || depoimento.approved);
  }
  
  async insertDepoimento(depoimento: InsertDepoimento): Promise<Depoimento> {
    const createdAt = new Date();
    const newDepoimento: Depoimento = {
      id: this.depoimentoId++,
      content: depoimento.content,
      name: depoimento.name || null,
      year: depoimento.year || null,
      memberSince: depoimento.memberSince || null,
      imageUrl: depoimento.imageUrl || null,
      approved: false,
      createdAt
    };
    this.depoimentosData.set(newDepoimento.id, newDepoimento);
    return newDepoimento;
  }
  
  // Homenagens
  async getAllHomenagens(approvedOnly: boolean = true): Promise<Homenagem[]> {
    return Array.from(this.homenagensData.values())
      .filter(homenagem => !approvedOnly || homenagem.approved);
  }
  
  async insertHomenagem(homenagem: InsertHomenagem): Promise<Homenagem> {
    const createdAt = new Date();
    const newHomenagem: Homenagem = {
      id: this.homenagemId++,
      name: homenagem.name,
      content: homenagem.content,
      yearStart: homenagem.yearStart || null,
      yearEnd: homenagem.yearEnd || null,
      imageUrl: homenagem.imageUrl || null,
      approved: false,
      createdAt
    };
    this.homenagensData.set(newHomenagem.id, newHomenagem);
    return newHomenagem;
  }
  
  // Famílias
  async getAllFamilias(approvedOnly: boolean = true): Promise<Familia[]> {
    return Array.from(this.familiasData.values())
      .filter(familia => !approvedOnly || familia.approved);
  }
  
  async insertFamilia(familia: InsertFamilia): Promise<Familia> {
    const createdAt = new Date();
    const newFamilia: Familia = {
      id: this.familiaId++,
      title: familia.title,
      type: familia.type,
      description: familia.description,
      year: familia.year || null,
      eventName: familia.eventName || null,
      imageUrl: familia.imageUrl || null,
      approved: false,
      createdAt
    };
    this.familiasData.set(newFamilia.id, newFamilia);
    return newFamilia;
  }
  
  // Gallery
  async getAllGalleryImages(approvedOnly: boolean = true): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesData.values())
      .filter(image => !approvedOnly || image.approved);
  }
  
  async getGalleryImagesByYear(year: number, approvedOnly: boolean = true): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesData.values())
      .filter(image => image.year === year && (!approvedOnly || image.approved));
  }
  
  async getGalleryImagesByType(type: string, approvedOnly: boolean = true): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesData.values())
      .filter(image => image.eventType === type && (!approvedOnly || image.approved));
  }
  
  async getGalleryImagesByYearAndType(year: number, type: string, approvedOnly: boolean = true): Promise<GalleryImage[]> {
    return Array.from(this.galleryImagesData.values())
      .filter(image => 
        image.year === year && 
        image.eventType === type && 
        (!approvedOnly || image.approved)
      );
  }
  
  async insertGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const createdAt = new Date();
    const newImage: GalleryImage = {
      id: this.galleryImageId++,
      imageUrl: image.imageUrl,
      title: image.title || null,
      description: image.description || null,
      year: image.year,
      eventType: image.eventType,
      approved: false,
      createdAt
    };
    this.galleryImagesData.set(newImage.id, newImage);
    return newImage;
  }
  
  // Participacoes
  async insertParticipacao(participacao: InsertParticipacao): Promise<Participacao> {
    const createdAt = new Date();
    const newParticipacao: Participacao = {
      id: this.participacaoId++,
      name: participacao.name,
      email: participacao.email,
      type: participacao.type,
      message: participacao.message || null,
      processed: false,
      createdAt
    };
    this.participacoesData.set(newParticipacao.id, newParticipacao);
    return newParticipacao;
  }
  
  // Newsletter
  async insertNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingEmails = Array.from(this.newslettersData.values())
      .map(entry => entry.email);
    
    if (existingEmails.includes(newsletter.email)) {
      throw new Error("Email already subscribed");
    }
    
    const createdAt = new Date();
    const newNewsletter: Newsletter = {
      id: this.newsletterId++,
      email: newsletter.email,
      createdAt
    };
    this.newslettersData.set(newNewsletter.id, newNewsletter);
    return newNewsletter;
  }
}

export const storage = new MemStorage();
