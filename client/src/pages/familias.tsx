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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFamiliaSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import FamiliaCard from "@/components/familias/familia-card";

// Extend the schema with validation
const familiaFormSchema = insertFamiliaSchema.extend({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres",
  }),
  type: z.string().min(2, {
    message: "Selecione um tipo de relação",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
});

type FamiliaFormValues = z.infer<typeof familiaFormSchema>;

const Familias = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: familias = [], isLoading } = useQuery({
    queryKey: ["/api/familias"],
  });

  const form = useForm<FamiliaFormValues>({
    resolver: zodResolver(familiaFormSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
      year: undefined,
      eventName: "",
      imageUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FamiliaFormValues) => {
      return apiRequest("POST", "/api/familias", values);
    },
    onSuccess: () => {
      form.reset();
      setIsDialogOpen(false);
      toast({
        title: "História enviada com sucesso!",
        description: "Sua história será revisada e publicada em breve.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/familias"] });
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar história",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FamiliaFormValues) => {
    mutation.mutate(values);
  };

  const relationshipTypes = [
    { value: "Casal", label: "Casal" },
    { value: "Amizade", label: "Amizade" },
    { value: "Família", label: "Família" },
    { value: "Grupo", label: "Grupo" },
  ];

  return (
    <>
      <Helmet>
        <title>Famílias FK | FK 10 Anos</title>
        <meta
          name="description"
          content="Casais, amizades, grupos e famílias que nasceram nos eventos da FK. Conheça histórias de conexões que ultrapassaram as festas."
        />
      </Helmet>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-4">
            Famílias FK
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Casais, amizades, grupos e famílias que nasceram nos nossos eventos.
            Esses laços são o maior legado da nossa comunidade.
          </p>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-primary">Carregando histórias...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {familias.map((familia) => (
                <FamiliaCard key={familia.id} familia={familia} />
              ))}
            </div>
          )}

          {/* Adicionar História */}
          <div className="col-span-1 md:col-span-2 mt-8 bg-neutral-light p-6 rounded-xl shadow-md">
            <h3 className="font-heading font-bold text-xl text-primary mb-4 text-center">
              Compartilhe sua História
            </h3>
            <p className="text-center mb-6">
              Encontrou sua família de escolha na FK? Sua história de amor começou em uma de nossas festas?
              Conte como a comunidade FK transformou sua vida.
            </p>
            <div className="flex justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="rounded-full font-bold">
                    Enviar Minha História
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Compartilhe sua História</DialogTitle>
                    <DialogDescription>
                      Conte-nos como a FK ajudou a formar relacionamentos significativos na sua vida
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título*</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ex: Ana & Pedro ou Grupo Conexão" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Relação*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo de relação" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {relationshipTypes.map((type) => (
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
                      <div className="flex gap-4">
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Ano de Formação</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={2014}
                                  max={new Date().getFullYear()}
                                  placeholder="2016"
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
                          name="eventName"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Nome do Evento</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ex: FK Anos 80"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sua História*</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={4}
                                placeholder="Conte como a FK possibilitou essa conexão e como ela transformou sua vida..."
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
                          {mutation.isPending ? "Enviando..." : "Enviar História"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Familias;
