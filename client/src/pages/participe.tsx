import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertParticipacaoSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Extend the schema with validation
const participacaoFormSchema = insertParticipacaoSchema.extend({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Digite um email válido",
  }),
  type: z.string().min(2, {
    message: "Selecione um tipo de participação",
  }),
});

const newsletterFormSchema = insertNewsletterSchema.extend({
  email: z.string().email({
    message: "Digite um email válido",
  }),
});

type ParticipacaoFormValues = z.infer<typeof participacaoFormSchema>;
type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

const Participe = () => {
  const { toast } = useToast();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  
  // Participation form
  const participacaoForm = useForm<ParticipacaoFormValues>({
    resolver: zodResolver(participacaoFormSchema),
    defaultValues: {
      name: "",
      email: "",
      type: "",
      message: "",
    },
  });

  const participacaoMutation = useMutation({
    mutationFn: async (values: ParticipacaoFormValues) => {
      return apiRequest("POST", "/api/participacoes", values);
    },
    onSuccess: () => {
      participacaoForm.reset();
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Entraremos em contato em breve. Obrigado por querer participar!",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar solicitação",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmitParticipacao = (values: ParticipacaoFormValues) => {
    participacaoMutation.mutate(values);
  };

  // Newsletter form
  const newsletterForm = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (values: NewsletterFormValues) => {
      return apiRequest("POST", "/api/newsletter", values);
    },
    onSuccess: () => {
      newsletterForm.reset();
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá as novidades sobre os 10 anos da FK.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao se inscrever",
        description: error.message === "Email already subscribed" 
          ? "Este email já está inscrito na nossa newsletter."
          : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmitNewsletter = (values: NewsletterFormValues) => {
    newsletterMutation.mutate(values);
  };

  const participationTypes = [
    { value: "Fotos", label: "Enviar Fotos" },
    { value: "Histórias", label: "Compartilhar Histórias" },
    { value: "Colaboração", label: "Ajudar na Organização" },
  ];

  return (
    <>
      <Helmet>
        <title>Participe | FK 10 Anos</title>
        <meta
          name="description"
          content="Participe da celebração dos 10 anos da FK. Envie fotos, compartilhe histórias ou ajude na organização."
        />
      </Helmet>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-4">
            Participe
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Ajude a construir esse momento histórico. Compartilhe suas memórias, 
            envie fotos ou contribua de outras formas para celebrarmos juntos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Envie Fotos */}
            <Card className={`bg-primary/5 hover:bg-primary/10 p-8 rounded-xl shadow-md transition-all ${activeCard === 'fotos' ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveCard('fotos')}>
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4 mx-auto">
                  <i className="fas fa-camera"></i>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">
                  Envie Fotos
                </h3>
                <p className="text-center mb-6">
                  Tem fotos de eventos da FK? Compartilhe esses momentos para nossa galeria comemorativa.
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setActiveCard('fotos');
                      participacaoForm.setValue("type", "Fotos");
                    }}
                  >
                    Enviar Fotos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Compartilhe Histórias */}
            <Card className={`bg-primary/5 hover:bg-primary/10 p-8 rounded-xl shadow-md transition-all ${activeCard === 'historias' ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveCard('historias')}>
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4 mx-auto">
                  <i className="fas fa-book-open"></i>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">
                  Compartilhe Histórias
                </h3>
                <p className="text-center mb-6">
                  Conte casos, momentos marcantes ou como a FK impactou sua vida nesses 10 anos.
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setActiveCard('historias');
                      participacaoForm.setValue("type", "Histórias");
                    }}
                  >
                    Contar História
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Ajude na Organização */}
            <Card className={`bg-primary/5 hover:bg-primary/10 p-8 rounded-xl shadow-md transition-all ${activeCard === 'colaboracao' ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveCard('colaboracao')}>
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4 mx-auto">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">
                  Colabore
                </h3>
                <p className="text-center mb-6">
                  Quer ajudar na organização da festa de 10 anos ou contribuir com o site comemorativo?
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setActiveCard('colaboracao');
                      participacaoForm.setValue("type", "Colaboração");
                    }}
                  >
                    Quero Colaborar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Participation Form */}
          {activeCard && (
            <div className="mt-12 bg-gray-50 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-heading font-bold text-primary mb-6 text-center">
                {activeCard === 'fotos'
                  ? 'Enviar Fotos'
                  : activeCard === 'historias'
                    ? 'Contar História'
                    : 'Quero Colaborar'}
              </h3>
              
              <Form {...participacaoForm}>
                <form onSubmit={participacaoForm.handleSubmit(onSubmitParticipacao)} className="space-y-4 max-w-lg mx-auto">
                  <FormField
                    control={participacaoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu Nome*</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nome completo" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={participacaoForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu Email*</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} placeholder="seu.email@exemplo.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={participacaoForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Participação*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione como quer participar" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {participationTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={participacaoForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {activeCard === 'fotos'
                            ? 'Detalhes sobre as fotos'
                            : activeCard === 'historias'
                              ? 'Resumo da sua história'
                              : 'Como gostaria de colaborar?'}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            {...field}
                            placeholder={
                              activeCard === 'fotos'
                                ? 'Descreva brevemente as fotos que gostaria de compartilhar...'
                                : activeCard === 'historias'
                                  ? 'Conte brevemente sua história com a FK...'
                                  : 'Descreva como gostaria de colaborar com o projeto...'
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      disabled={participacaoMutation.isPending}
                    >
                      {participacaoMutation.isPending ? "Enviando..." : "Enviar Solicitação"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-16 bg-gradient-primary rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 p-8 text-white">
                <h3 className="font-heading font-bold text-2xl mb-4">Receba Novidades</h3>
                <p className="mb-6">
                  Inscreva-se para receber informações sobre a festa de 10 anos da FK e 
                  outras atualizações do projeto comemorativo.
                </p>
                <Form {...newsletterForm}>
                  <form onSubmit={newsletterForm.handleSubmit(onSubmitNewsletter)} className="flex flex-col sm:flex-row gap-3">
                    <FormField
                      control={newsletterForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Seu email"
                              className="py-2 px-4 rounded-md focus:outline-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-white/80" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      className="bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-md transition-all"
                      disabled={newsletterMutation.isPending}
                    >
                      {newsletterMutation.isPending ? "Inscrevendo..." : "Inscrever"}
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="md:w-1/3 bg-secondary/20 hidden md:flex items-center justify-center">
                <div className="text-white text-8xl heart-icon">
                  <i className="fas fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Participe;
