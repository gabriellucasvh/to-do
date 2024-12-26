interface InformacoesCriacaoProps {
  data: string;
  hora: string;
}

const InformacoesCriacao: React.FC<InformacoesCriacaoProps> = ({ data, hora }) => {
  const formatarDia = (dataCriacao: string): string => {
    const dataTarefa = new Date(dataCriacao);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    if (dataTarefa.toDateString() === hoje.toDateString()) {
      return "Hoje";
    }
    if (dataTarefa.toDateString() === ontem.toDateString()) {
      return "Ontem";
    }

    const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    return diasDaSemana[dataTarefa.getDay()];
  };

  return (
    <div className="text-sm text-gray-500">
      <p>{formatarDia(data)}, {hora}</p>
    </div>
  );
};

export default InformacoesCriacao;
