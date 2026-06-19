import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import { formatRupiah } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { MapPin, Star, ShieldCheck, UserCheck, CalendarCheck } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const supabase = createClient();
  const { data: tours } = await supabase.from('tours').select('*').limit(6);
  const { data: testimonials } = await supabase.from('testimonials').select('*');

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000"
          alt="Bali Landscape"
          fill
          priority
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container flex flex-col items-center gap-6">
          <h1 className="font-heading text-4xl md:text-6xl font-bold drop-shadow-lg">
            Jelajahi Keindahan <span className="text-tosca">Nusantara</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-100">
            Temukan pengalaman liburan tak terlupakan ke destinasi terpopuler di Indonesia.
          </p>
          <div className="bg-white/90 p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 text-navy">
            <input type="text" placeholder="Mau ke mana?" className="p-2 rounded border border-gray-300" />
            <input type="date" className="p-2 rounded border border-gray-300" />
            <input type="number" min={1} defaultValue={2} className="p-2 rounded border border-gray-300 w-20" />
            <Button className="bg-tosca hover:bg-tosca/80">Cari Tour</Button>
          </div>
        </div>
      </section>

      {/* DESTINASI POPULER */}
      <section className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy">Destinasi Populer</h2>
          <p className="text-gray-500 mt-2">Pilihan terbaik untuk liburanmu</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours?.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100">
              <div className="relative h-56 w-full">
                <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14} /> {tour.location}</span>
                  <span className="text-sm font-semibold flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {tour.rating}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{tour.description}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400">Mulai dari</span>
                    <p className="font-bold text-tosca">{formatRupiah(tour.price)}</p>
                  </div>
                  <Link href={`/tours/${tour.slug}`}>
                    <Button variant="outline" className="border-tosca text-tosca hover:bg-tosca hover:text-white">Lihat Detail</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KENAPA PILIH KAMI */}
      <section className="bg-navy text-white py-20">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">Kenapa Pilih Kami?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-tosca/20 p-5 rounded-full"><ShieldCheck className="text-tosca" size={32} /></div>
              <h3 className="text-xl font-semibold">Harga Terjamin</h3>
              <p className="text-gray-400">Harga kompetitif tanpa biaya tersembunyi.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-tosca/20 p-5 rounded-full"><UserCheck className="text-tosca" size={32} /></div>
              <h3 className="text-xl font-semibold">Guide Berpengalaman</h3>
              <p className="text-gray-400">Guide lokal yang ramah dan tahu seluk beluk destinasi.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-tosca/20 p-5 rounded-full"><CalendarCheck className="text-tosca" size={32} /></div>
              <h3 className="text-xl font-semibold">Booking Gampang</h3>
              <p className="text-gray-400">Proses reservasi cepat dalam hitungan menit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA WHATSAPP */}
      <section className="container">
        <div className="bg-tosca rounded-3xl p-10 text-center text-white flex flex-col items-center gap-6">
          <h2 className="font-heading text-3xl font-bold">Siap Liburan?</h2>
          <p className="text-lg max-w-lg">Konsultasikan rencana liburanmu secara gratis bersama tim ahli kami sekarang!</p>
          <a href="https://wa.me/6281234567890" target="_blank">
            <Button size="lg" className="bg-navy hover:bg-navy/90 text-white text-lg px-8 py-6">Konsultasi Gratis via WA</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
