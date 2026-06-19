"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function BookingForm({ params }: { params: { tourId: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const supabase = createClient();

  const handleSubmit = async () => {
    // Simulasi Insert ke database
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('bookings').insert({
      tour_id: params.tourId,
      user_id: user?.id,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      total_price: 1500000, // Dihitung dinamis di production
      booking_date: new Date().toISOString().split('T')[0],
      status: 'pending'
    });

    if (!error) {
      router.push('/booking/success');
    }
  };

  return (
    <div className="container max-w-2xl py-20">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-2 w-full ${step >= s ? 'bg-tosca' : 'bg-gray-200'} rounded`}></div>
        ))}
      </div>
      
      {step === 1 && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Data Pemesan</h1>
          <input className="w-full p-2 border rounded" placeholder="Nama Lengkap" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input className="w-full p-2 border rounded" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input className="w-full p-2 border rounded" placeholder="No. Telepon" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <Button className="w-full bg-tosca" onClick={() => setStep(2)}>Lanjut</Button>
        </div>
      )}
      {step === 2 && (
         <div className="space-y-4">
           <h1 className="text-2xl font-bold">Data Penumpang</h1>
           <p>Form anggota keluarga/penumpang lain...</p>
           <Button className="w-full bg-tosca" onClick={() => setStep(3)}>Lanjut ke Pembayaran</Button>
         </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Pembayaran</h1>
          <p>Silakan transfer ke Rek 12345...</p>
          <Button className="w-full bg-tosca" onClick={handleSubmit}>Konfirmasi Booking</Button>
        </div>
      )}
    </div>
  );
}
