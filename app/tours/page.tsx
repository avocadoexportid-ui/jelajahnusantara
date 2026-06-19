import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';

export default async function ToursPage({ searchParams }: { searchParams: { q?: string } }) {
  const supabase = createClient();
  
  let query = supabase.from('tours').select('*');
  
  // Search real-time via URL params
  if (searchParams.q) {
    query = query.ilike('title', `%${searchParams.q}%`);
  }

  const { data: tours } = await query.order('created_at', { ascending: false });

  return (
    <div className="container py-12 flex gap-8">
      {/* Sidebar Filter (UI Only untuk singkatnya) */}
      <aside className="w-64 hidden md:block">
        <div className="border p-5 rounded-xl sticky top-20">
          <h3 className="font-heading text-lg font-bold mb-4">Filter Tour</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Harga Min</label>
              <input type="number" className="w-full mt-1 p-2 border rounded" placeholder="500000" />
            </div>
            <div>
              <label className="text-sm font-medium">Harga Max</label>
              <input type="number" className="w-full mt-1 p-2 border rounded" placeholder="5000000" />
            </div>
            <Button className="w-full bg-tosca">Terapkan Filter</Button>
          </div>
        </div>
      </aside>

      {/* Grid Tour */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-heading text-2xl font-bold">Semua Paket Tour ({tours?.length || 0})</h1>
          <select className="border p-2 rounded-md">
            <option>Terbaru</option>
            <option>Termurah</option>
            <option>Terpopuler</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours?.map((tour) => (
             <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden border">
               <div className="relative h-48 w-full">
                 <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" />
               </div>
               <div className="p-4">
                 <span className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14} /> {tour.location}</span>
                 <h3 className="font-heading text-lg font-semibold mt-1">{tour.title}</h3>
                 <div className="flex justify-between items-center mt-4 pt-4 border-t">
                   <p className="font-bold text-tosca">{formatRupiah(tour.price)}</p>
                   <Link href={`/tours/${tour.slug}`}>
                     <Button size="sm" variant="outline" className="border-tosca text-tosca">Detail</Button>
                   </Link>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
