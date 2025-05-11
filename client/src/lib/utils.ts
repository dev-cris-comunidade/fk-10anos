import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const eventTypeColors = {
  "Festa": "bg-secondary text-white",
  "Social Teórica": "bg-primary text-white",
  "Lounge": "bg-primary/50 text-white",
  "Festa Junina": "bg-accent text-primary",
  "Especial": "bg-purple-500 text-white"
};

export const eventTypeIcon = {
  "Festa": "fas fa-music",
  "Social Teórica": "fas fa-comment",
  "Lounge": "fas fa-glass-cheers",
  "Festa Junina": "fas fa-hat-cowboy",
  "Especial": "fas fa-star"
};

export const yearsList = [2015, 2016, 2017, 2018, 2019, 2020, 2022, 2023, 2024];

export const staticImages = {
  // Party images
  party1: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  party2: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  party3: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80",
  party4: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  party5: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  party6: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  
  // Timeline graphics
  timeline1: "https://images.unsplash.com/photo-1636488363717-97629ef485b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  timeline2: "https://images.unsplash.com/photo-1580927944699-a36b471f2e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  timeline3: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  
  // Community gathering
  community1: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  community2: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  community3: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  community4: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  
  // Profile placeholders
  profile1: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
  profile2: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80",
  
  // Social events
  social1: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  social2: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  
  // Festivals & special events
  festival1: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  festival2: "https://images.unsplash.com/photo-1542628682-88321d2a4828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  
  // Couple/friendship images
  couple1: "https://pixabay.com/get/gf8e6f4379d6b5be1b348d2b007187e882d42a40629bea7c4e0185a681387b5b955ac8f1b42c083c16d5903d6f619399a34495bca4aad7e23e16a143f0a8b7751_1280.jpg",
};
