import React from 'react';

interface HoraAtualProps {
  hora: string;
}

const HoraAtual: React.FC<HoraAtualProps> = ({ hora }) => {
  return (
    <p className="text-sm text-gray-500 italic">
      Criado às: {hora}
    </p>
  );
};

export default HoraAtual;

