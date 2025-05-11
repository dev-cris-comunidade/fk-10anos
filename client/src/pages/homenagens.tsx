import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertHomenagemSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import HomenagemCard from "@/components/homenagens/homenagem-card";

// Extend the schema with validation
const homenagemFormSchema = insertHomenagemSchema.extend({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  content: z.string().min(10, {
    message: "A homenagem deve ter pelo menos 10 caracteres",
  }),
});

type HomenagemFormValues = z.infer<typeof homenagemFormSchema>;

const Homenagens = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: homenagens = [], isLoading } = useQuery({
    queryKey: ["/api/homenagens"],
  });

  const form = useForm<HomenagemFormValues>({
    resolver: zodResolver(homenagemFormSchema),
    defaultValues: {
      name: "",
      content: "",
      yearStart: undefined,
      yearEnd: undefined,
      imageUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: HomenagemFormValues) => {
      return apiRequest("POST", "/api/homenagens", values);
    },
    onSuccess: () => {
      form.reset();
      setIsDialogOpen(false);
      toast({
        title: "Homenagem enviada com sucesso!",
        description: "Sua homenagem será revisada e publicada em breve.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/homenagens"] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar homenagem",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: HomenagemFormValues) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Helmet>
        <title>Homenagens | FK 10 Anos</title>
        <meta
          name="description"
          content="Homenagens a membros da FK que deixaram um legado em nossa comunidade. Espaço de memória e gratidão."
        />
      </Helmet>

      <section className="py-20 bg-gradient-to-br from-primary to-neutral-dark text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Homenagens
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            "Algumas pessoas fizeram tanto parte da FK que continuam aqui, mesmo que não estejam mais. 
            Essa página é pra lembrar com carinho e gratidão."
          </p>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-white">Carregando homenagens...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homenagens.map((homenagem) => (
                <HomenagemCard key={homenagem.id} homenagem={homenagem} />
              ))}

              {/* Adicionar Homenagem */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center mb-4">
                  <i className="fas fa-plus text-white/60"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">Adicionar Homenagem</h3>
                <p className="text-white/70 text-center mb-6">
                  Quer homenagear alguém especial que fez parte da FK?
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-primary hover:bg-white/90 font-bold py-2 px-6 rounded-full transition-all">
                      Criar Homenagem
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Criar Homenagem</DialogTitle>
                      <DialogDescription>
                        Preste uma homenagem a alguém que foi importante para a comunidade FK
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome*</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Nome da pessoa homenageada" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-4">
                          <FormField
                            control={form.control}
                            name="yearStart"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Ano Início</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={2014}
                                    max={new Date().getFullYear()}
                                    placeholder="2014"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="yearEnd"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Ano Fim</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={2014}
                                    max={new Date().getFullYear()}
                                    placeholder="2023"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mensagem*</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={4}
                                  placeholder="Compartilhe uma lembrança ou mensagem sobre esta pessoa"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Imagem (URL)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://exemplo.com/imagem.jpg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button
                            type="submit"
                            variant="secondary"
                            disabled={mutation.isPending}
                          >
                            {mutation.isPending ? "Enviando..." : "Enviar Homenagem"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Homenagens;
