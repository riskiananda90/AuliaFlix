import { Movie, Category } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'KKN di Desa Penari',
    description: 'Enam mahasiswa yang melaksanakan KKN di sebuah desa terpencil menghadapi teror mistis yang mengancam nyawa mereka.',
    thumbnailUrl: 'https://images.search.yahoo.com/images/view;_ylt=AwrOrK1sli5oPW0N1gaJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzRiNTM4ZjIyZWIwYTEwY2QwZjlhYTc4M2E3N2I0YzBhBGdwb3MDMgRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dposter%2Bkkn%2Bdesa%2Bpenari%26type%3DE210US885G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D2&w=474&h=669&imgurl=blue.kumparan.com%2Fimage%2Fupload%2Ffl_progressive%2Cfl_lossy%2Cc_fill%2Cq_auto%3Abest%2Cw_640%2Fv1584063713%2Fqxn8zf5vwzycnaw3ateo.jpg&rurl=https%3A%2F%2Fkumparan.com%2Fkumparanhits%2Ffilm-kkn-di-desa-penari-tayang-30-april-2022-di-bioskop-1xtPEnITUW1&size=90KB&p=poster+kkn+desa+penari&oid=4b538f22eb0a10cd0f9aa783a77b4c0a&fr2=piv-web&fr=mcafee&tt=Film+KKN+di+Desa+Penari+Tayang+30+April+2022+di+Bioskop+%7C+kumparan.com&b=0&ni=21&no=2&ts=&tab=organic&sigr=6L9aITvDFYRU&sigb=K7z_j2c3X4Z6&sigi=FtOg4CO6Vt1B&sigt=mFR5jFG9gQjW&.crumb=N5.Fwvk3G9S&fr=mcafee&fr2=piv-web&type=E210US885G0',
    coverUrl: 'https://images.search.yahoo.com/images/view;_ylt=AwrOrK1sli5oPW0N1gaJzbkF;_ylu=c2VjA3NyBHNsawNpbWcEb2lkAzRiNTM4ZjIyZWIwYTEwY2QwZjlhYTc4M2E3N2I0YzBhBGdwb3MDMgRpdANiaW5n?back=https%3A%2F%2Fimages.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dposter%2Bkkn%2Bdesa%2Bpenari%26type%3DE210US885G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D2&w=474&h=669&imgurl=blue.kumparan.com%2Fimage%2Fupload%2Ffl_progressive%2Cfl_lossy%2Cc_fill%2Cq_auto%3Abest%2Cw_640%2Fv1584063713%2Fqxn8zf5vwzycnaw3ateo.jpg&rurl=https%3A%2F%2Fkumparan.com%2Fkumparanhits%2Ffilm-kkn-di-desa-penari-tayang-30-april-2022-di-bioskop-1xtPEnITUW1&size=90KB&p=poster+kkn+desa+penari&oid=4b538f22eb0a10cd0f9aa783a77b4c0a&fr2=piv-web&fr=mcafee&tt=Film+KKN+di+Desa+Penari+Tayang+30+April+2022+di+Bioskop+%7C+kumparan.com&b=0&ni=21&no=2&ts=&tab=organic&sigr=6L9aITvDFYRU&sigb=K7z_j2c3X4Z6&sigi=FtOg4CO6Vt1B&sigt=mFR5jFG9gQjW&.crumb=N5.Fwvk3G9S&fr=mcafee&fr2=piv-web&type=E210US885G0',
    year: 2022,
    duration: '2j 10m',
    genre: ['Horor', 'Misteri', 'Drama'],
    rating: '13+',
    cast: ['Tissa Biani', 'Adinda Thomas', 'Achmad Megantara'],
    director: 'Awi Suryadi',
    isTrending: true,
    isNewRelease: true,
    videoUrl: 'https://www.youtube.com/watch?v=_BpfTsq0jxQ'
  },
  {
    id: '2',
    title: 'Mencuri Raden Saleh',
    description: 'Sekelompok mahasiswa merencanakan pencurian lukisan bersejarah dalam sebuah misi yang penuh ketegangan dan intrik.',
    thumbnailUrl: 'https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg',
    coverUrl: 'https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg',
    year: 2022,
    duration: '2j 35m',
    genre: ['Aksi', 'Kejahatan', 'Drama'],
    rating: '13+',
    cast: ['Iqbaal Ramadhan', 'Angga Yunanda', 'Rachel Amanda'],
    director: 'Angga Dwimas Sasongko',
    isTrending: true,
    videoUrl: 'https://www.youtube.com/watch?v=DN3sRz_veBU'
  },
  {
    id: '3',
    title: 'Pengabdi Setan 2: Communion',
    description: 'Sebuah keluarga menghadapi teror baru di rumah susun setelah kejadian mengerikan di rumah lama mereka.',
    thumbnailUrl: 'https://images.pexels.com/photos/1738280/pexels-photo-1738280.jpeg',
    coverUrl: 'https://images.pexels.com/photos/1738280/pexels-photo-1738280.jpeg',
    year: 2022,
    duration: '1j 59m',
    genre: ['Horor', 'Drama'],
    rating: '13+',
    cast: ['Tara Basro', 'Endy Arfian', 'Nasar Annuz'],
    director: 'Joko Anwar',
    isNewRelease: true,
    videoUrl: 'https://www.youtube.com/watch?v=93c842501LM'
  },
  {
    id: '4',
    title: 'Seperti Dendam, Rindu Harus Dibayar Tuntas',
    description: 'Seorang petinju yang kehilangan masa depannya mencari pembalasan dendam dalam dunia yang keras.',
    thumbnailUrl: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg',
    coverUrl: 'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg',
    year: 2021,
    duration: '1j 55m',
    genre: ['Drama', 'Aksi'],
    rating: '17+',
    cast: ['Marthino Lio', 'Ladya Cheryl', 'Kevin Ardilova'],
    director: 'Edwin',
    isTrending: true,
    videoUrl: 'https://www.youtube.com/watch?v=fqvWIaGo3Y4'
  },
  {
    id: '5',
    title: 'Nanti Kita Cerita Tentang Hari Ini',
    description: 'Tiga bersaudara menghadapi rahasia keluarga yang terpendam selama bertahun-tahun.',
    thumbnailUrl: 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg',
    coverUrl: 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg',
    year: 2020,
    duration: '2j 1m',
    genre: ['Drama', 'Keluarga'],
    rating: '13+',
    cast: ['Rio Dewanto', 'Sheila Dara', 'Rachel Amanda'],
    director: 'Angga Dwimas Sasongko',
    isNewRelease: true,
    videoUrl: 'https://www.youtube.com/watch?v=iQBbkh6OX4o'
  },
  {
    id: '6',
    title: 'Ali & Ratu Ratu Queens',
    description: 'Seorang remaja mencari ibunya yang telah lama hilang di New York dan menemukan keluarga baru yang tak terduga.',
    thumbnailUrl: 'https://images.pexels.com/photos/4507967/pexels-photo-4507967.jpeg',
    coverUrl: 'https://images.pexels.com/photos/4507967/pexels-photo-4507967.jpeg',
    year: 2021,
    duration: '1j 47m',
    genre: ['Drama', 'Komedi'],
    rating: '13+',
    cast: ['Iqbaal Ramadhan', 'Nirina Zubir', 'Asri Welas'],
    director: 'Lucky Kuswandi',
    isTrending: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: '7',
    title: 'Pengkhianatan G30S/PKI',
    description: 'Film sejarah yang menggambarkan peristiwa G30S/PKI dan dampaknya terhadap bangsa Indonesia.',
    thumbnailUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    coverUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    year: 1984,
    duration: '4j 31m',
    genre: ['Sejarah', 'Drama'],
    rating: '13+',
    cast: ['Amoroso Katamsi', 'Umar Kayam', 'Sofia W.D.'],
    director: 'Arifin C. Noer',
    isClassic: true,
    videoUrl: 'https://www.youtube.com/watch?v=a4uFVN-y5MI'
  },
    {
    id: '8',
    title: 'Pengkhianatan G30S/PKI',
    description: 'Film sejarah yang menggambarkan peristiwa G30S/PKI dan dampaknya terhadap bangsa Indonesia.',
    thumbnailUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    coverUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    year: 1984,
    duration: '4j 31m',
    genre: ['Sejarah', 'Drama'],
    rating: '13+',
    cast: ['Amoroso Katamsi', 'Umar Kayam', 'Sofia W.D.'],
    director: 'Arifin C. Noer',
    isClassic: true,
    videoUrl: 'https://www.youtube.com/watch?v=a4uFVN-y5MI'
  },
  {
    id: '30',
    title: 'Laskar Pelangi',
    description: 'Kisah perjuangan anak-anak di Belitung untuk mendapatkan pendidikan yang layak.',
    thumbnailUrl: 'https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg',
    coverUrl: 'https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg',
    year: 2008,
    duration: '2j 5m',
    genre: ['Drama', 'Keluarga'],
    rating: 'SU',
    cast: ['Cut Mini', 'Ikranagara', 'Lukman Sardi'],
    director: 'Riri Riza',
    isClassic: true,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  }
];

export const categories: Category[] = [
  {
    id: 'trending',
    name: 'Sedang Tren',
    movies: movies.filter(movie => movie.isTrending)
  },
  {
    id: 'new-releases',
    name: 'Film Terbaru',
    movies: movies.filter(movie => movie.isNewRelease)
  },
  {
    id: 'classics',
    name: 'Film Klasik',
    movies: movies.filter(movie => movie.isClassic)
  },
  {
    id: 'drama',
    name: 'Drama',
    movies: movies.filter(movie => movie.genre.includes('Drama'))
  },
  {
    id: 'horror',
    name: 'Horor',
    movies: movies.filter(movie => movie.genre.includes('Horor'))
  }
];

export const getFeaturedMovie = (): Movie => {
  const trendingMovies = movies.filter(movie => movie.isTrending);
  return trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
};

export const getMovieById = (id: string): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};