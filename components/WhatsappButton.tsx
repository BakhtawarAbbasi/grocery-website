// app/components/WhatsAppButton.tsx
'use client';

import { PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppButton() {
  return (
    <div className="fixed z-50 bottom-22 right-6">
      <Link href="https://wa.me/923453380161" target="_blank">
        <div className="flex items-center justify-center bg-green-500 rounded-full shadow-lg w-14 h-14 hover:bg-green-600">
          <PhoneCall className="w-6 h-6 text-white" />
        </div>
      </Link>
    </div>
  );
}