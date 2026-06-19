import { createClient } from '@/lib/supabase/server';
import { formatRupiah } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, MapPin, Clock, Users } from 'lucide-react';

export default async function TourDetail({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: tour } = await supabase.from('tours').select('*').eq('slug', params.slug).single();

  if (!tour) return <div className="container py-20 text-center">Tour tidak ditemukan.</div>;

  return (
    <div className="container py-12 grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        {/* Gallery */}
        <div className="grid grid-cols-4 gap-2 h-96">
          <div className="col-span-2 row-span-2 relative h-full rounded-lg overflow-hidden">
            <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" />
          </div>
          {/* Dummy gallery items */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative h-48 rounded-lg overflow-hidden">
              <Image src={tour.images[0]} alt="gallery" fill className="object-cover" />
            </div>
          ))}
        </div>

        <div>
          <h1 className="font-heading text-3xl font-bold">{tour.title}</h1>
          <div className="flex gap-4 text-gray-500 mt-2">
            <span className="flex items-center gap-1"><MapPin size={16}/> {tour.location}</span>
            <span className="flex items-center gap-1"><Clock size={16}/> {tour.duration_days} Hari</span>
            <span className="flex items-center gap-1"><Users size={16}/> Kuota {tour.max_quota}</span>
          </div>
        </div>

        {/* Itinerary Accordion */}
        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-bold">Itinerary</h2>
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: tour.duration_days }).map((_, i) => (
              <AccordionItem key={i} value={`day-${i+1}`}>
                <AccordionTrigger>Hari ke-{i+1}</AccordionTrigger>
                <AccordionContent>
                  Penjemputan di hotel, menuju destinasi wisata utama, makan siang, dan kembali ke hotel.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Sticky Booking Box */}
      <div className="lg:col-span-1">
        <div className="border rounded-xl p-6 shadow-xl sticky top-20">
          <h3 className="text-sm text-gray-400">Mulai dari</h3>
          <p className="font-heading text-3xl font-bold text-tosca mb-4">{formatRupiah(tour.price)}</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Pilih Tanggal</label>
              <input type="date" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div>
              <label className="text-sm font-medium">Jumlah Orang</label>
              <input type="number" min={1} defaultValue={2} className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="flex justify-between font-medium pt-4 border-t">
              <span>Total</span>
              <span>{formatRupiah(tour.price * 2)}</span>
            </div>
            <Link href={`/booking/${tour.id}`}>
              <Button className="w-full bg-tosca text-lg py-6">Booking Sekarang</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
