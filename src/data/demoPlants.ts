import type { Plant } from '../types/plant';

export const demoPlants: Plant[] = [
  {
    id: 'capsicum-annuum',
    slug: 'capsicum-annuum',
    scientificName: 'Capsicum annuum',
    localName: 'Cabai / Cabe',
    family: 'Solanaceae',
    genus: 'Capsicum',
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590005354167-6da97870c757?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526346698789-22fd84314424?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Capsicum annuum adalah tanaman perdu semak dari famili Solanaceae yang menghasilkan buah cabai bercitarasa pedas karena kandungan zat aktif kapsaisin (capsaicin). Buahnya memiliki variasi warna menarik mulai dari hijau, kuning, oranye, hingga merah menyala saat matang.',
    type: 'Perdu semak semusim / tahunan',
    height: '0.5–1.5 meter',
    leaves: 'Tunggal lonjong / bulat telur',
    flowers: 'Putih bintang di ketiak daun',
    habitat: 'Tropis hangat, sinar matahari penuh, drainase gembur',
    altitude: '0 - 1.400 mdpl',
    lifecycle: 'Tahunan (perennial semak)',
    partsUsed: 'Buah cabai, daun muda, biji',
    origin: 'Amerika Tengah dan Amerika Selatan tropis',
    benefits: [
      'Kaya vitamin C, vitamin A, dan antioksidan karotenoid (kapsantin)',
      'Kandungan kapsaisin memicu pelepasan endorfin dan mempercepat metabolisme',
      'Bumbu utama kuliner Nusantara dan pengawet alami makanan tradisional'
    ],
    recordedInEastJava: true,
    distributionText:
      'Cabai dibudidayakan secara masif di seluruh kepulauan Indonesia, dengan sentra produksi utama di Jawa Timur (Kediri, Blitar, Banyuwangi), Jawa Tengah, dan Sumatra.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.8480, lng: 112.0178, observationCount: 1420, notes: 'Sentra produksi cabai rawit dan cabai besar di Kediri & Blitar.' },
      { region: 'Sumatra', status: 'Tercatat', lat: 3.1250, lng: 98.6722, observationCount: 780, notes: 'Dibudidayakan luas di dataran tinggi Karo dan Simalungun.' },
      { region: 'Sulawesi', status: 'Tercatat', lat: -5.1477, lng: 119.4327, observationCount: 430, notes: 'Varietas cabai rawit lokal dan katokkon Toraja.' },
      { region: 'Bali', status: 'Tercatat', lat: -8.3405, lng: 115.0920, observationCount: 510, notes: 'Komoditas bumbu utama di Tabanan dan Kintamani.' },
      { region: 'Nusa Tenggara', status: 'Tercatat', lat: -8.5833, lng: 116.1167, observationCount: 390, notes: 'Cabai rawit tahan kering di Lombok dan Sumbawa.' }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Solanales',
      family: 'Solanaceae',
      genus: 'Capsicum',
      species: 'Capsicum annuum'
    }
  },
  {
    id: 'capsicum-frutescens',
    slug: 'capsicum-frutescens',
    scientificName: 'Capsicum frutescens',
    localName: 'Cabai Rawit',
    family: 'Solanaceae',
    genus: 'Capsicum',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Capsicum_%27Siling_Labuyo%27_%28Mindanao%2C_Philippines%29_2.jpg/800px-Capsicum_%27Siling_Labuyo%27_%28Mindanao%2C_Philippines%29_2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Tabasco_peppers.JPG/800px-Tabasco_peppers.JPG'
    ],
    description:
      'Cabai rawit adalah tumbuhan anggota genus Capsicum yang buahnya tumbuh menjulang menghadap ke atas. Warna buahnya hijau sewaktu muda dan jika telah masak berwarna merah tua. Memiliki rasa sangat pedas karena konsentrasi kapsaisin tinggi dan sangat populer dalam kuliner Nusantara.',
    type: 'Perdu kecil tahunan tegak',
    height: '0.5–1.2 meter',
    leaves: 'Bulat telur hingga lanset hijau cerah berujung meruncing',
    flowers: 'Putih kehijauan soliter di ketiak daun dengan tangkai tegak',
    habitat: 'Pekarangan dan ladang tropis lembap dengan paparan sinar matahari cukup',
    altitude: '0 - 1.300 mdpl',
    lifecycle: 'Tahunan (perennial semak kecil)',
    partsUsed: 'Buah buni pedas, daun muda',
    origin: 'Amerika Tengah dan Amerika Selatan tropis',
    benefits: [
      'Tinggi kandungan vitamin C dan antioksidan kapsaisin pereda nyeri alami',
      'Meningkatkan laju metabolisme tubuh dan melancarkan sirkulasi darah',
      'Pelengkap utama sajian makanan dan sambal tradisional'
    ],
    recordedInEastJava: true,
    distributionText:
      'Tumbuh subur di seluruh wilayah Indonesia dengan sentra produksi di Jawa Timur (Kediri, Blitar, Malang), Jawa Tengah, Nusa Tenggara, dan Sulawesi.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.8480, lng: 112.0178, observationCount: 1650, notes: 'Sentra perkebunan cabai rawit terluas di Jawa Timur.' },
      { region: 'Sulawesi', status: 'Tercatat', lat: -5.1477, lng: 119.4327, observationCount: 620, notes: 'Varietas cabai rawit lokal dan katokkon.' },
      { region: 'Nusa Tenggara', status: 'Tercatat', lat: -8.5833, lng: 116.1167, observationCount: 480, notes: 'Budidaya cabai rawit tahan kering di Lombok.' }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Tracheophytes',
      class: 'Magnoliopsida',
      order: 'Solanales',
      family: 'Solanaceae',
      genus: 'Capsicum',
      species: 'Capsicum frutescens'
    }
  },
  {
    id: 'rosa',
    slug: 'rosa',
    scientificName: 'Rosa',
    localName: 'Bunga Mawar / Mawar',
    family: 'Rosaceae',
    genus: 'Rosa',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Bouquet_de_roses_roses.jpg/800px-Bouquet_de_roses_roses.jpg',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Mawar adalah tumbuhan perdu semak berduri dari genus Rosa dan famili Rosaceae yang terkenal dengan mahkota bunga tersusun bertingkat dan beraroma harum semerbak. Terdiri dari ratusan spesies liar dan ribuan kultivar hias yang dibudidayakan di seluruh dunia.',
    type: 'Perdu semak berduri tegak / merambat',
    height: '1–3 meter',
    leaves: 'Majemuk menyirip gasal dengan tepi anak daun bergerigi',
    flowers: 'Mahkota bertingkat konsentris beraneka warna (merah, pink, kuning, putih) beraroma harum',
    habitat: 'Dataran tinggi tropis dan wilayah subtropis dengan tanah gembur berdrainase lancar',
    altitude: '600 - 1.500 mdpl',
    lifecycle: 'Tahunan (perennial semak)',
    partsUsed: 'Mahkota bunga, minyak atsiri, kuncup bunga, buah (rose hip)',
    origin: 'Asia, Eropa, Amerika Utara, dan Afrika barat laut',
    benefits: [
      'Ekstrak air mawar (rose water) kaya antioksidan untuk perawatan kelembapan kulit',
      'Minyak atsiri aromaterapi relaksasi dan pereda ketegangan saraf',
      'Tanaman hias lanskap bernilai estetika dan ekonomi tinggi'
    ],
    recordedInEastJava: true,
    distributionText:
      'Dibudidayakan secara intensif di daerah dataran tinggi sejuk Jawa Timur (Kota Batu, Pujon, Malang) serta Lembang (Jawa Barat) dan Brastagi (Sumatra Utara).',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.8700, lng: 112.5270, observationCount: 1120, notes: 'Sentra agrowisata bunga mawar potong di Kota Batu, Jawa Timur.' },
      { region: 'Sumatra', status: 'Tercatat', lat: 3.1833, lng: 98.5000, observationCount: 380, notes: 'Budidaya dataran tinggi Brastagi.' },
      { region: 'Bali', status: 'Tercatat', lat: -8.2750, lng: 115.1630, observationCount: 290, notes: 'Kawasan Bedugul untuk bunga upacara dan dekorasi.' }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Tracheophytes',
      class: 'Magnoliopsida',
      order: 'Rosales',
      family: 'Rosaceae',
      genus: 'Rosa',
      species: 'Informasi belum tersedia'
    }
  },
  {
    id: 'moringa-oleifera',
    slug: 'moringa-oleifera',
    scientificName: 'Moringa oleifera',
    localName: 'Kelor',
    family: 'Moringaceae',
    genus: 'Moringa',
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Moringa oleifera adalah tanaman tropis yang dikenal dengan daun majemuk, bunga berwarna putih kekuningan, dan polong panjang. Tanaman ini banyak dibudidayakan karena memiliki nilai gizi tinggi dan manfaat kesehatan yang beragam.',
    type: 'Pohon kecil',
    height: '3–10 meter',
    leaves: 'Majemuk menyirip',
    flowers: 'Putih kekuningan',
    habitat: 'Daerah tropis dan subtropis',
    altitude: '0 - 1.000 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Daun, biji, kulit batang',
    origin: 'Asia Selatan',
    benefits: [
      'Kaya akan vitamin C, vitamin A, kalsium, dan zat besi',
      'Mengandung antioksidan alami seperti quercetin dan asam klorogenat',
      'Digunakan dalam pengolahan pangan tradisional dan pakan ternak',
      'Minyak bijinya (Ben oil) digunakan dalam kosmetik dan pelumas halus'
    ],
    recordedInEastJava: true,
    distributionText:
      'Moringa oleifera tercatat di wilayah tropis dan subtropis, termasuk Indonesia, India, Afrika, dan beberapa negara di Asia Tenggara.',
    distributionRegions: [
      {
        region: 'Jawa',
        status: 'Tercatat',
        lat: -7.6145,
        lng: 111.5278,
        observationCount: 342,
        notes: 'Sangat umum dibudidayakan di pekarangan rumah di Jawa Timur dan Jawa Tengah.'
      },
      {
        region: 'Sumatra',
        status: 'Tercatat',
        lat: -0.5897,
        lng: 101.3431,
        observationCount: 189,
        notes: 'Ditemukan di pesisir barat dan perkebunan rakyat di Sumatra Utara dan Lampung.'
      },
      {
        region: 'Kalimantan',
        status: 'Kemungkinan',
        lat: -1.6815,
        lng: 113.3824,
        observationCount: 47,
        notes: 'Tercatat sporadis pada kebun botani lokal dan daerah permukiman pesisir.'
      },
      {
        region: 'Sulawesi',
        status: 'Tercatat',
        lat: -1.4300,
        lng: 121.4456,
        observationCount: 128,
        notes: 'Tersebar di wilayah lembah Palu dan Sulawesi Selatan sebagai tanaman pagar.'
      },
      {
        region: 'Papua',
        status: 'Kemungkinan',
        lat: -4.2699,
        lng: 138.0804,
        observationCount: 21,
        notes: 'Introduksi terbatas di dataran rendah Merauke dan Jayapura.'
      },
      {
        region: 'Nusa Tenggara',
        status: 'Tercatat',
        lat: -8.6529,
        lng: 121.0794,
        observationCount: 265,
        notes: 'Sangat adaptif di iklim kering NTT sebagai sumber pangan bergizi tahan kering.'
      }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Brassicales',
      family: 'Moringaceae',
      genus: 'Moringa',
      species: 'Moringa oleifera'
    }
  },
  {
    id: 'hibiscus-rosa-sinensis',
    slug: 'hibiscus-rosa-sinensis',
    scientificName: 'Hibiscus rosa-sinensis',
    localName: 'Bunga Kembang Sepatu',
    family: 'Malvaceae',
    genus: 'Hibiscus',
    images: [
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589134763071-778848d6db90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Hibiscus rosa-sinensis adalah semak berbunga tropis dari famili Malvaceae dengan bunga tunggal besar mencolok beraneka warna, umumnya merah cerah dengan benang sari menjulur khas.',
    type: 'Semak hias',
    height: '1–4 meter',
    leaves: 'Tunggal, tepi bergerigi',
    flowers: 'Merah, kelopak 5 helai',
    habitat: 'Tropis hangat, sinar matahari penuh',
    altitude: '0 - 1.200 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Bunga, daun, akar',
    origin: 'Asia Timur / Pasifik',
    benefits: [
      'Tanaman hias lanskap dan pagar pekarangan',
      'Ekstrak kelopak bunga digunakan sebagai teh herbal kembang sepatu',
      'Pewarna alami makanan dan minuman',
      'Bahan sampo dan tonik rambut tradisional'
    ],
    recordedInEastJava: true,
    distributionText:
      'Bunga Kembang Sepatu tersebar luas di seluruh kepulauan Indonesia, sering ditanam di pekarangan rumah, taman kota, dan area publik.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.2575, lng: 112.7521, observationCount: 820 },
      { region: 'Sumatra', status: 'Tercatat', lat: -2.9761, lng: 104.7754, observationCount: 450 },
      { region: 'Bali', status: 'Tercatat', lat: -8.4095, lng: 115.1889, observationCount: 610 },
      { region: 'Sulawesi', status: 'Tercatat', lat: -5.1477, lng: 119.4327, observationCount: 310 },
      { region: 'Kalimantan', status: 'Tercatat', lat: -0.0263, lng: 109.3425, observationCount: 220 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Malvales',
      family: 'Malvaceae',
      genus: 'Hibiscus',
      species: 'Hibiscus rosa-sinensis'
    }
  },
  {
    id: 'jasminum-sambac',
    slug: 'jasminum-sambac',
    scientificName: 'Jasminum sambac',
    localName: 'Melati Putih',
    family: 'Oleaceae',
    genus: 'Jasminum',
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Melati putih adalah bunga nasional Indonesia (Puspa Bangsa) beraroma sangat harum, berwarna putih bersih dengan daun hijau mengilap.',
    type: 'Perdu merambat',
    height: '0.5–2 meter',
    leaves: 'Tunggal, berhadapan',
    flowers: 'Putih bintang, wangi semerbak',
    habitat: 'Dataran rendah hingga tinggi, lembab',
    altitude: '10 - 800 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Bunga, daun',
    origin: 'Asia Selatan dan Tenggara',
    benefits: [
      'Puspa bangsa dan elemen utama upacara adat Nusantara',
      'Bahan aromaterapi, minyak atsiri, dan pengharum teh melati',
      'Membantu relaksasi dan menurunkan stres'
    ],
    recordedInEastJava: true,
    distributionText:
      'Dibudidayakan secara intensif di Jawa Tengah (Batang, Pekalongan) dan Jawa Timur (Pasuruan, Bangil) serta tersebar di penjuru Indonesia.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -6.9175, lng: 109.7289, observationCount: 950 },
      { region: 'Sumatra', status: 'Tercatat', lat: 3.5952, lng: 98.6722, observationCount: 280 },
      { region: 'Bali', status: 'Tercatat', lat: -8.6705, lng: 115.2126, observationCount: 390 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Lamiales',
      family: 'Oleaceae',
      genus: 'Jasminum',
      species: 'Jasminum sambac'
    }
  },
  {
    id: 'monstera-deliciosa',
    slug: 'monstera-deliciosa',
    scientificName: 'Monstera deliciosa',
    localName: 'Monstera / Janda Bolong Tropis',
    family: 'Araceae',
    genus: 'Monstera',
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Monstera deliciosa adalah tanaman liana epifit khas hutan hujan tropis dengan fenestrasi lubang daun yang ikonik dan elegan.',
    type: 'Liana / Tanaman hias daun',
    height: '2–6 meter (merambat)',
    leaves: 'Besar dengan robekan alami (fenestrasi)',
    flowers: 'Spadiks terlindung seludang putih',
    habitat: 'Hutan hujan tropis lembap naungan parsial',
    altitude: '50 - 1.200 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Daun (estetika), buah matang di habitat asli',
    origin: 'Meksiko dan Amerika Tengah',
    benefits: [
      'Tanaman hias indoor pembersih udara populer',
      'Elemen dekorasi interior bergaya botanical biophilic'
    ],
    recordedInEastJava: true,
    distributionText:
      'Diintroduksi dan dibudidayakan secara masif di kebun tanaman hias di Jawa, Bali, dan kota-kota besar di Indonesia.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -6.8222, lng: 107.6186, observationCount: 540 },
      { region: 'Bali', status: 'Tercatat', lat: -8.5069, lng: 115.2625, observationCount: 320 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Liliopsida',
      order: 'Alismatales',
      family: 'Araceae',
      genus: 'Monstera',
      species: 'Monstera deliciosa'
    }
  },
  {
    id: 'phalaenopsis-amabilis',
    slug: 'phalaenopsis-amabilis',
    scientificName: 'Phalaenopsis amabilis',
    localName: 'Anggrek Bulan',
    family: 'Orchidaceae',
    genus: 'Phalaenopsis',
    images: [
      'https://images.unsplash.com/photo-1524355865-c7b7ae357891?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Anggrek Bulan merupakan salah satu bunga nasional Indonesia (Puspa Pesona) dengan kelopak putih lebar anggun dan daya mekar yang tahan lama.',
    type: 'Epifit monopodial',
    height: '20–60 cm',
    leaves: 'Tebal berdaging, hijau tua',
    flowers: 'Putih bersih dengan lidah bercak kuning-merah',
    habitat: 'Menempel pada batang pohon hutan tropis',
    altitude: '50 - 600 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Bunga (estetika)',
    origin: 'Indonesia dan Filipina',
    benefits: [
      'Puspa pesona Indonesia dan komoditas florikultura bernilai tinggi',
      'Simbol keanggunan, ketahanan, dan pesona alam Nusantara'
    ],
    recordedInEastJava: true,
    distributionText:
      'Habitat aslinya tersebar di hutan tropis basah Jawa, Sumatra, Kalimantan, Sulawesi, hingga Maluku dan Papua.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.5361, lng: 110.4462, observationCount: 410 },
      { region: 'Sumatra', status: 'Tercatat', lat: -3.7928, lng: 102.2608, observationCount: 330 },
      { region: 'Kalimantan', status: 'Tercatat', lat: 0.5387, lng: 116.4194, observationCount: 290 },
      { region: 'Papua', status: 'Tercatat', lat: -2.5916, lng: 140.6690, observationCount: 180 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Liliopsida',
      order: 'Asparagales',
      family: 'Orchidaceae',
      genus: 'Phalaenopsis',
      species: 'Phalaenopsis amabilis'
    }
  },
  {
    id: 'psidium-guajava',
    slug: 'psidium-guajava',
    scientificName: 'Psidium guajava',
    localName: 'Jambu Biji',
    family: 'Myrtaceae',
    genus: 'Psidium',
    images: [
      'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Psidium guajava adalah tanaman buah tropis dengan kulit batang licin mengelupas, daun beraroma harum saat diremas, dan buah kaya vitamin C serta antioksidan.',
    type: 'Pohon kecil',
    height: '3–8 meter',
    leaves: 'Oval berhadapan dengan tulang daun tegas',
    flowers: 'Putih dengan benang sari lebat',
    habitat: 'Dataran rendah hingga sedang, tahan kekeringan',
    altitude: '0 - 1.200 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Buah, daun pucuk',
    origin: 'Meksiko dan Amerika Selatan (ternaturalisasi luas)',
    benefits: [
      'Buah bernutrisi tinggi dan meningkatkan trombosit darah',
      'Pucuk daun digunakan secara tradisional untuk mengatasi gangguan pencernaan'
    ],
    recordedInEastJava: true,
    distributionText:
      'Tumbuh subur dan dibudidayakan di seluruh wilayah pertanian dan pekarangan di Jawa, Sumatra, dan Bali.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.4243, lng: 111.4428, observationCount: 680 },
      { region: 'Sumatra', status: 'Tercatat', lat: -5.4500, lng: 105.2667, observationCount: 290 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Myrtales',
      family: 'Myrtaceae',
      genus: 'Psidium',
      species: 'Psidium guajava'
    }
  },
  {
    id: 'annona-muricata',
    slug: 'annona-muricata',
    scientificName: 'Annona muricata',
    localName: 'Sirsak',
    family: 'Annonaceae',
    genus: 'Annona',
    images: [
      'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Sirsak adalah pohon buah berdaun hijau gelap mengilap dengan buah berduri lunak dan daging buah putih berair dengan rasa asam-manis menyegarkan.',
    type: 'Pohon kecil',
    height: '4–9 meter',
    leaves: 'Tunggal lonjong tebal berbau khas',
    flowers: 'Kuning kehijauan dengan 3 kelopak tebal',
    habitat: 'Tropis lembap',
    altitude: '0 - 1.000 mdpl',
    lifecycle: 'Tahunan',
    partsUsed: 'Buah, daun',
    origin: 'Karibia dan Amerika Tengah',
    benefits: [
      'Buah kaya vitamin C, B1, B2 dan serat pangan',
      'Daun sirsak banyak diteliti kandungan asetogeninnya'
    ],
    recordedInEastJava: true,
    distributionText:
      'Ditanam secara luas di kebun buah Jawa Timur, Jawa Barat, dan pulau-pulau sekitarnya.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.7956, lng: 110.3695, observationCount: 410 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Magnoliales',
      family: 'Annonaceae',
      genus: 'Annona',
      species: 'Annona muricata'
    }
  },
  {
    id: 'carica-papaya',
    slug: 'carica-papaya',
    scientificName: 'Carica papaya',
    localName: 'Pepaya',
    family: 'Caricaceae',
    genus: 'Carica',
    images: [
      'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=800&q=80'
    ],
    description:
      'Pepaya adalah tanaman herba berbatang basah dengan daun menjari lebar berukuran besar dan getah putih yang mengandung enzim papain pengurai protein.',
    type: 'Herba berkayu lunak',
    height: '2–7 meter',
    leaves: 'Menjari besar bertangkai panjang',
    flowers: 'Putih kekuningan berumah dua atau hermafrodit',
    habitat: 'Tropis hangat dengan drainase tanah baik',
    altitude: '0 - 1.000 mdpl',
    lifecycle: 'Tahunan pendek',
    partsUsed: 'Buah, daun muda, bunga, biji',
    origin: 'Amerika Tengah tropis',
    benefits: [
      'Sumber enzim papain pelancar pencernaan dan vitamin A & C',
      'Daun muda diolah sebagai sayur dan jamu tradisional'
    ],
    recordedInEastJava: true,
    distributionText:
      'Ditemukan di hampir setiap pekarangan dan sentra perkebunan pepaya di seluruh penjuru Indonesia.',
    distributionRegions: [
      { region: 'Jawa', status: 'Tercatat', lat: -7.5666, lng: 110.8166, observationCount: 920 }
    ],
    taxonomy: {
      kingdom: 'Plantae',
      division: 'Magnoliophyta',
      class: 'Magnoliopsida',
      order: 'Brassicales',
      family: 'Caricaceae',
      genus: 'Carica',
      species: 'Carica papaya'
    }
  }
];

export const sampleUploadPhotos = [
  {
    name: 'Cabai Rawit (Capsicum frutescens)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Capsicum_%27Siling_Labuyo%27_%28Mindanao%2C_Philippines%29_2.jpg/400px-Capsicum_%27Siling_Labuyo%27_%28Mindanao%2C_Philippines%29_2.jpg',
    plantId: 'capsicum-frutescens'
  },
  {
    name: 'Bunga Mawar (Rosa)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Bouquet_de_roses_roses.jpg/400px-Bouquet_de_roses_roses.jpg',
    plantId: 'rosa'
  },
  {
    name: 'Kelor (Moringa oleifera)',
    url: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80',
    plantId: 'moringa-oleifera'
  },
  {
    name: 'Kembang Sepatu (Hibiscus)',
    url: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=400&q=80',
    plantId: 'hibiscus-rosa-sinensis'
  },
  {
    name: 'Melati Putih (Jasminum)',
    url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80',
    plantId: 'jasminum-sambac'
  },
  {
    name: 'Monstera Deliciosa',
    url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80',
    plantId: 'monstera-deliciosa'
  }
];
