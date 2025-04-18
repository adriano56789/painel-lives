// src/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js for routing
import { Icons } from "@/components/icons"; // Assuming you have an icons file

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-100 w-64 min-h-screen py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold">
          {/* Replace with your actual logo or text */}
          MyLive 
        </Link>
      </div>

      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-blue-500">
              <Icons.home className="h-5 w-5" /> {/* Replace with your actual home icon */}
              <span>Início (Dashboard)</span>
            </Link>
          </li>
          <li>
            <Link href="/transmitir" className="flex items-center space-x-2 hover:text-blue-500">
              <Icons.broadcast className="h-5 w-5" /> {/* Replace with your actual broadcast icon */}
              <span>Transmitir</span>
            </Link>
          </li>
          <li>
            <Link href="/videos" className="flex items-center space-x-2 hover:text-blue-500">
              <Icons.video className="h-5 w-5" /> {/* Replace with your actual video icon */}
              <span>Vídeos Gravados</span>
            </Link>
          </li>
          <li>
            <Link href="/configuracoes" className="flex items-center space-x-2 hover:text-blue-500">
              <Icons.settings className="h-5 w-5" /> {/* Replace with your actual settings icon */}
              <span>Configurações</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto pt-8 border-t border-gray-200">
        {/* Replace with actual user info */}
        <div className="text-center">
          <span className="font-medium">Nome do usuário</span> 
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
