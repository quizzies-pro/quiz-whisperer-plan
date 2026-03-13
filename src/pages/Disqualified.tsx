import { AlertTriangle } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";
import { useNavigate } from "react-router-dom";

const Disqualified = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-yellow-500/15 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
          Que pena!
        </h1>

        <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
          Agradecemos pelo seu interesse, mas para que você tenha sucesso com a Franquia LocaGora seria necessário a dedicação de no mínimo{" "}
          <strong className="text-foreground">1 hora do seu dia</strong>.
        </p>

        <div className="space-y-3 pt-2">
          <CTAButton
            onClick={() => navigate("/quiz/step/9")}
            fullWidth
            className="py-4"
          >
            Voltar para aplicação
          </CTAButton>

          <p className="text-xs text-muted-foreground/70 font-body italic">
            Ao clicar, eu me comprometo a me dedicar 1 hora no mínimo por dia para o negócio.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disqualified;
