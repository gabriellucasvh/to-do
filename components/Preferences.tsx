'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
// import { Languages } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
// import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';

const Preferences = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLanguage = (lang: string) => {
    router.push(`/${lang}${pathname}`);
  };

  return (
    <div>
      <div className='flex flex-row items-center gap-2'>
        <ModeToggle />
        {/* <Select onValueChange={handleChangeLanguage}>
          <SelectTrigger className='w-12'>
            <Languages />
          </SelectTrigger>
          <SelectContent className='outline-none'>
            <SelectItem value="pt-BR">Português</SelectItem>
            <SelectItem value="en">Inglês</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
};

export default Preferences;
