import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const SignupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');

  const [address, setAddress] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (password.length < 6) {
        setError('Password tidak boleh kurang dari 6');
        return;
      }
      if (password !== confirmPassword) {
        setError('Password tidak cocok');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      if (!agreeToTerms) {
        setError('Anda harus menyetujui syarat dan ketentuan');
        return;
      }

      setError('');
      setLoading(true);

      try {
        await signUp(email, password, {
          full_name: fullName,
          username,
          phone_number: phoneNumber,
          birth_date: birthDate,
          gender,
          address,
        });
        navigate('/');
      } catch (err) {
        setError('Terjadi kesalahan saat mendaftar');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <Link to="/" className="flex items-center text-red-600 text-2xl font-bold">
          <Film className="mr-2" />
          <span>AulyaFlix</span>
        </Link>
      </div>

      <div className="bg-black/80 p-8 rounded-md w-full max-w-md z-10">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/3 h-1 rounded-full mx-1 ${s <= step ? 'bg-red-600' : 'bg-gray-600'
                }`}
            />
          ))}
        </div>

        <h1 className="text-white text-3xl font-bold mb-6">
          {step === 1 && 'Buat Akun'}
          {step === 2 && 'Informasi Pribadi'}
          {step === 3 && 'Informasi Tambahan'}
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Konfirmasi Password"
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap"
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Nomor Telepon"
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                  required
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Alamat"
                  required
                  rows={4}
                  className="w-full bg-gray-700 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-red-600 focus:ring-red-600"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                  Saya menyetujui syarat dan ketentuan yang berlaku
                </label>
              </div>
            </>
          )}

          <Button  fullWidth >
            {loading ? 'Memuat...' : step === 3 ? 'Daftar' : 'Lanjut'}
          </Button>
        </form>

        <div className="mt-8">
          <p className="text-gray-400">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-white hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;