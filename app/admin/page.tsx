import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login'); // Buat halaman login sederhana atau pakai Supabase Auth UI
  }

  const { data: tours } = await supabase.from('tours').select('*');
  const { data: bookings } = await supabase.from('bookings').select('*, tours(title)');

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manajemen Tour ({tours?.length})</h2>
            <Link href="/admin/tours"><Button size="sm">Tambah Tour</Button></Link>
          </div>
          <div className="border rounded-lg divide-y">
            {tours?.map(t => (
              <div key={t.id} className="p-4 flex justify-between items-center">
                <span>{t.title}</span>
                <span className="text-sm text-gray-500">{t.location}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Booking Terbaru ({bookings?.length})</h2>
          <div className="border rounded-lg divide-y">
            {bookings?.map(b => (
              <div key={b.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{b.customer_name}</p>
                  <p className="text-sm text-gray-500">{b.tours?.title}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
