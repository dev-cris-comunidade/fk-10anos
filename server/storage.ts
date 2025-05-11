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
    this.initializeSampleData();
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
  
  private initializeSampleData() {
    // Add sample depoimentos
    const depoimentoMariana = {
      name: "Mariana S.",
      content: "A FK foi onde encontrei coragem para ser quem eu realmente sou. Em 2018, no meu primeiro evento, percebi que existia um lugar onde a liberdade e o respeito podiam coexistir. Formei amizades que levo para a vida e aprendi sobre relacionamentos de uma forma que nenhum outro espaço permitiria.",
      year: 2018,
      memberSince: 2016,
      imageUrl: ""
    };
    const newDepoimentoMariana = this.insertDepoimento(depoimentoMariana);
    this.depoimentosData.set(newDepoimentoMariana.id, { ...newDepoimentoMariana, approved: true });
    
    const depoimentoRafael = {
      name: "Rafael T.",
      content: "Conheci meu atual marido na FK de 2017! Quem diria que um evento assim pudesse criar uma família? Conversamos a noite toda numa Social Teórica, trocamos contato e nunca mais nos separamos. A FK não é só festa, é um espaço de conexões profundas e transformadoras. Sou eternamente grato.",
      year: 2017,
      memberSince: 2015,
      imageUrl: ""
    };
    const newDepoimentoRafael = this.insertDepoimento(depoimentoRafael);
    this.depoimentosData.set(newDepoimentoRafael.id, { ...newDepoimentoRafael, approved: true });
    
    // Add sample homenagens
    const homenagemCarlos = {
      name: "Carlos S.",
      yearStart: 2016,
      yearEnd: 2022,
      content: "Seu sorriso iluminava todas as festas. Sua generosidade e espírito livre inspiraram muitos de nós. Continuamos dançando por você.",
      imageUrl: ""
    };
    const newHomenagemCarlos = this.insertHomenagem(homenagemCarlos);
    this.homenagensData.set(newHomenagemCarlos.id, { ...newHomenagemCarlos, approved: true });
    
    const homenagemJulia = {
      name: "Júlia M.",
      yearStart: 2015,
      yearEnd: 2020,
      content: "Organizadora das primeiras edições, sua criatividade e dedicação ajudaram a construir tudo o que a FK representa hoje. Sentimos sua falta todos os dias.",
      imageUrl: ""
    };
    const newHomenagemJulia = this.insertHomenagem(homenagemJulia);
    this.homenagensData.set(newHomenagemJulia.id, { ...newHomenagemJulia, approved: true });
    
    // Add sample familias
    const familiaAnaPedro = {
      title: "Ana & Pedro",
      type: "Casal",
      description: "Nos conhecemos na pista de dança da FK Anos 80, em 2016. Trocamos contatos, começamos a conversar, e hoje estamos casados e esperando nosso primeiro filho. Sem a FK, talvez jamais tivéssemos nos encontrado.",
      year: 2016,
      eventName: "FK Anos 80",
      imageUrl: ""
    };
    const newFamiliaAnaPedro = this.insertFamilia(familiaAnaPedro);
    this.familiasData.set(newFamiliaAnaPedro.id, { ...newFamiliaAnaPedro, approved: true });
    
    const familiaGrupoConexao = {
      title: "Grupo Conexão",
      type: "Amizade",
      description: "Éramos desconhecidos que se encontraram numa Social Teórica sobre comunicação não-violenta. A conversa foi tão boa que criamos um grupo no WhatsApp naquela mesma noite. Hoje somos família, nos reunimos toda semana e já viajamos juntos várias vezes.",
      year: 2018,
      eventName: "FK Social Club",
      imageUrl: ""
    };
    const newFamiliaGrupoConexao = this.insertFamilia(familiaGrupoConexao);
    this.familiasData.set(newFamiliaGrupoConexao.id, { ...newFamiliaGrupoConexao, approved: true });
    
    // Add sample gallery images
    for (let i = 1; i <= 8; i++) {
      const year = 2014 + i;
      const types = ["Festa", "Social Teórica", "Lounge", "Festa Junina"];
      const type = types[i % 4];
      
      const galleryImage = {
        imageUrl: "",
        title: `FK ${type} ${year}`,
        description: `Evento de ${year}`,
        year,
        eventType: type
      };
      const newGalleryImage = this.insertGalleryImage(galleryImage);
      this.galleryImagesData.set(newGalleryImage.id, { ...newGalleryImage, approved: true });
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
      ...participacao,
      id: this.participacaoId++,
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
      ...newsletter,
      id: this.newsletterId++,
      createdAt
    };
    this.newslettersData.set(newNewsletter.id, newNewsletter);
    return newNewsletter;
  }
}

export const storage = new MemStorage();
