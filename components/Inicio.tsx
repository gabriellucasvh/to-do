'use client';
import { Button } from './ui/button';
import Image from 'next/image';

const Inicio = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center justify-center gap-6 pt-24 w-full md:w-2/3">
                <h1 className=" text-center text-3xl md:text-5xl font-bold ">
                    Organize sua Vida, <span className="text-pastel-green-500">Simplifique</span> seu Dia!
                </h1>
                <p className="text-xl px-3 text-center text-muted-foreground">
                    Gerencie tarefas de forma simples e eficiente com nossa plataforma intuitiva. Priorize, acompanhe e alcance seus objetivos com facilidade, tudo em um só lugar!
                </p>
            </div>
            <Button onClick={() => window.location.href = "/todo"} className='mt-12 w-44 h-10 font-bold text-lg py-3 px-6 bg-pastel-green-500 hover:bg-pastel-green-600 hover:scale-105 transition-all duration-300 shadow-md'>Começar</Button>
            <div className='flex items-center justify-center px-10'>
                <Image
                    src="/card.png"
                    width={500}
                    height={500}
                    alt="Planner Master logo"
                    quality={100}
                    className='flex items-center justify-center border rounded-lg my-10 shadow-2xl'
                    />
                    </div>
        </div>
    )
}

export default Inicio