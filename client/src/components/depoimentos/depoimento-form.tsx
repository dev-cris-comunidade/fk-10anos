import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDepoimentoSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { FormState } from "@/lib/types";

// Extend the schema with validation
const depoimentoFormSchema = insertDepoimentoSchema.extend({
  content: z.string().min(10, {
    message: "O depoimento deve ter pelo menos 10 caracteres",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "Você precisa consentir com o uso do seu depoimento",
  }),
});

// Define the form values type including consent field
type DepoimentoFormValues = z.infer<typeof depoimentoFormSchema>;

const DepoimentoForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>("idle");

  const form = useForm<DepoimentoFormValues>({
    resolver: zodResolver(depoimentoFormSchema),
    defaultValues: {
      name: "",
      content: "",
      year: new Date().getFullYear(),
      memberSince: undefined,
      imageUrl: "",
      consent: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: DepoimentoFormValues) => {
      // Remove consent field before sending to API
      const { consent, ...depoimentoData } = values;
      return apiRequest("POST", "/api/depoimentos", depoimentoData);
    },
    onSuccess: () => {
      setFormState("success");
      form.reset();
      toast({
        title: "Depoimento enviado com sucesso!",
        description: "Obrigado por compartilhar sua história com a FK.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/depoimentos"] });
    },
    onError: (error) => {
      setFormState("error");
      toast({
        title: "Erro ao enviar depoimento",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: DepoimentoFormValues) => {
    setFormState("submitting");
    mutation.mutate(values);
  };

  return (
    <div className="bg-neutral-light p-6 rounded-xl shadow-lg mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold text-primary mb-2">
          Envie seu Depoimento
        </h3>
        <p className="text-sm mb-4">
          "Tem algo que só a FK poderia ter proporcionado? Um beijo, um encontro, um começo, uma virada? 
          Conta pra gente e deixa esse momento registrado."
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu Nome (opcional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Como quer ser identificado(a)"
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu Depoimento*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte sua história com a FK..."
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano do evento/memória (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={2014}
                    max={new Date().getFullYear()}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary"
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
                <FormLabel>Adicionar Foto (opcional)</FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <i className="fas fa-camera text-gray-400 text-xl mb-2"></i>
                    <p className="text-sm text-gray-500">
                      Insira URL da imagem
                    </p>
                    <Input
                      type="text"
                      placeholder="https://exemplo.com/imagem.jpg"
                      {...field}
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-primary"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Insira o link de uma imagem já hospedada online
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Concordo com o uso do meu depoimento no site comemorativo dos 10 anos da FK
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-2 rounded-md transition-all"
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? (
              <>
                <span className="mr-2">Enviando</span>
                <i className="fas fa-spinner animate-spin"></i>
              </>
            ) : (
              "Enviar Depoimento"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DepoimentoForm;
