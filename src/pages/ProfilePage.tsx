import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Save } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuthStore();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone_number: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching profile for user ID:", user.id);
      
        if (!user.id) {
          throw new Error("User ID tidak tersedia");
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        console.log("Profile data response:", data);
        
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        if (data) {
          setFormData({
            full_name: data.full_name || '',
            address: data.address || '',
            phone_number: data.phone_number || '',
          });
        } else {
          console.log("No profile data found for this user");
        }
      } catch (err: any) {
        console.error("Fetch profile failed:", err);
        setError(err.message || "Gagal mengambil data profil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        address: profile.address || '',
        phone_number: profile.phone_number || '',
      });
    }
  }, [profile]);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    try {
      if (!user) return;
      
      await updateProfile(formData);
      setEditing(false);
    } catch (err: any) {
      console.error("Update profile failed:", err);
      alert("Gagal menyimpan perubahan: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-8">
          {isLoading ? (
            <div className="text-white text-center py-8">Memuat data profil...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">
              Error: {error}
              <button 
                onClick={() => window.location.reload()} 
                className="block mx-auto mt-4 px-4 py-2 bg-gray-800 rounded text-white"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl text-white">
                  {user?.email?.[0].toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">{formData.full_name || 'Profil Saya'}</h1>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Informasi Akun */}
                <div className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Informasi Akun</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <p className="text-white">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Member Sejak</label>
                      <p className="text-white">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID') : '-'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Profil */}
                <div className="border-t border-gray-800 pt-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Edit Profil</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        disabled={!editing}
                        className="w-full p-2 bg-gray-800 text-white rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Alamat</label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        disabled={!editing}
                        className="w-full p-2 bg-gray-800 text-white rounded"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Nomor Telepon</label>
                      <input
                        type="text"
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        disabled={!editing}
                        className="w-full p-2 bg-gray-800 text-white rounded"
                      />
                    </div>

                    <div className="flex gap-4 flex-wrap">
                      {!editing ? (
                        <Button variant="outlined" onClick={handleEdit}>
                          <Pencil size={18} className="mr-2" /> Edit Profil
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={handleSave}>
                          <Save size={18} className="mr-2" /> Simpan Perubahan
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;