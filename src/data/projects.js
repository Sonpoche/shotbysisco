// projects.js - VERSION MISE À JOUR AVEC NOUVEAUX MEDIAS PRIVE
const projects = [
  // PROJETS RÉSEAUX SOCIAUX (category: "reseaux")
  {
    id: 1,
    title: "Annonce UMD",
    description: "Campagne publicitaire dynamique",
    thumbnail: "https://videos.agencememento.com/Reseaux/ANNONCE-UMD_ahq12-poster-thumb.webp",
    media: "https://videos.agencememento.com/Reseaux/ANNONCE-UMD_ahq12-web.mp4",
    mediaType: "video",
    category: "reseaux"
  },
  {
    id: 2,
    title: "Captions Creative",
    description: "Contenu viral optimisé",
    thumbnail: "https://videos.agencememento.com/Reseaux/Captions_92967C-poster-thumb.webp",
    media: "https://videos.agencememento.com/Reseaux/Captions_92967C-web.mp4",
    mediaType: "video",
    category: "reseaux"
  },
  {
    id: 3,
    title: "Final Selten",
    description: "Brand storytelling moderne",
    thumbnail: "https://videos.agencememento.com/Reseaux/FINAL-SELTEN_ahq12-poster-thumb.webp",
    media: "https://videos.agencememento.com/Reseaux/FINAL-SELTEN_ahq12-web.mp4",
    mediaType: "video",
    category: "reseaux"
  },
  {
    id: 4,
    title: "Marion et Ryan Portrait",
    description: "Photographie lifestyle réseaux",
    thumbnail: "https://videos.agencememento.com/Reseaux/marion-ryan-5-thumb.webp",
    media: "https://videos.agencememento.com/Reseaux/marion-ryan-5-web.webp",
    mediaType: "image",
    category: "reseaux"
  },
  {
    id: 5,
    title: "Marion et Ryan Session",
    description: "Série photo pour Instagram",
    thumbnail: "https://videos.agencememento.com/Reseaux/marion-ryan-13-thumb.webp",
    media: "https://videos.agencememento.com/Reseaux/marion-ryan-13-web.webp",
    mediaType: "image",
    category: "reseaux"
  },

  // NOUVEAUX PROJETS RÉSEAUX SOCIAUX - IMAGES
  {
    id: 30,
    title: "Contenu Social 1",
    description: "Création optimisée pour réseaux sociaux",
    thumbnail: "https://videos.agencememento.com/Reseaux/reseaux_img_thumb1.webp",
    media: "https://videos.agencememento.com/Reseaux/reseaux_img1.webp",
    mediaType: "image",
    category: "reseaux"
  },
  {
    id: 31,
    title: "Contenu Social 2",
    description: "Visuel engageant pour Instagram",
    thumbnail: "https://videos.agencememento.com/Reseaux/reseaux_img_thumb2.webp",
    media: "https://videos.agencememento.com/Reseaux/reseaux_img2.webp",
    mediaType: "image",
    category: "reseaux"
  },
  {
    id: 32,
    title: "Contenu Social 3",
    description: "Production digitale moderne",
    thumbnail: "https://videos.agencememento.com/Reseaux/reseaux_img_thumb3.webp",
    media: "https://videos.agencememento.com/Reseaux/reseaux_img3.webp",
    mediaType: "image",
    category: "reseaux"
  },
  {
    id: 33,
    title: "Contenu Social 4",
    description: "Storytelling visuel impactant",
    thumbnail: "https://videos.agencememento.com/Reseaux/reseaux_img_thumb4.webp",
    media: "https://videos.agencememento.com/Reseaux/reseaux_img4.webp",
    mediaType: "image",
    category: "reseaux"
  },
  {
    id: 34,
    title: "Contenu Social 5",
    description: "Contenu viral pour TikTok",
    thumbnail: "https://videos.agencememento.com/Reseaux/reseaux_img_thumb5.webp",
    media: "https://videos.agencememento.com/Reseaux/reseaux_img5.webp",
    mediaType: "image",
    category: "reseaux"
  },
  {
    id: 35,
    title: "Contenu Social 6",
    description: "Publication optimisée LinkedIn",
    thumbnail: "https://videos.agencememento.com/Reseaux/reseaux_img_thumb6.webp",
    media: "https://videos.agencememento.com/Reseaux/reseaux_img6.webp",
    mediaType: "image",
    category: "reseaux"
  },

  // PROJETS PRIVÉ (category: "prive") - ANCIENS MÉDIAS
  {
    id: 6,
    title: "Mario et Verde",
    description: "Mariage intimiste en pleine nature",
    thumbnail: "https://videos.agencememento.com/Prive/marioVERT-mariage-poster-thumb.webp",
    media: "https://videos.agencememento.com/Prive/marioVERT-mariage-web.mp4",
    mediaType: "video",
    category: "prive"
  },
  {
    id: 7,
    title: "Chris et Philo", 
    description: "Portrait de couple authentique",
    thumbnail: "https://videos.agencememento.com/Prive/ChrisetPhilo-longueversion-poster-thumb.webp",
    media: "https://videos.agencememento.com/Prive/ChrisetPhilo-longueversion-web.mp4",
    mediaType: "video", 
    category: "prive"
  },
  {
    id: 8,
    title: "Seance Tournesol",
    description: "Portrait lifestyle en golden hour",
    thumbnail: "https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-thumb.webp",
    media: "https://videos.agencememento.com/Prive/jeans-tournesol_0002_Generative_Fill-web.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 9,
    title: "Portrait Artistique",
    description: "Jeu d'ombres et de lumières",
    thumbnail: "https://videos.agencememento.com/Prive/jeans-tournesol_0000_Generative_Fill_4-thumb.webp", 
    media: "https://videos.agencememento.com/Prive/jeans-tournesol_0000_Generative_Fill_4-web.webp",
    mediaType: "image",
    category: "prive"
  },

  // NOUVEAUX PROJETS PRIVÉ - VIDÉOS (avec thumbnails WebP générés)
  {
    id: 15,
    title: "Moments Privés 1",
    description: "Célébration intime et authentique",
    thumbnail: "https://videos.agencememento.com/Prive/prive1-poster.webp",
    media: "https://videos.agencememento.com/Prive/prive1.mp4",
    mediaType: "video",
    category: "prive"
  },
  {
    id: 16,
    title: "Moments Privés 2",
    description: "Émotions capturées avec délicatesse",
    thumbnail: "https://videos.agencememento.com/Prive/prive2-poster.webp",
    media: "https://videos.agencememento.com/Prive/prive2.mp4",
    mediaType: "video",
    category: "prive"
  },
  {
    id: 17,
    title: "Moments Privés 3",
    description: "Souvenirs précieux immortalisés",
    thumbnail: "https://videos.agencememento.com/Prive/prive3-poster.webp",
    media: "https://videos.agencememento.com/Prive/prive3.mp4",
    mediaType: "video",
    category: "prive"
  },

  // NOUVEAUX PROJETS PRIVÉ - IMAGES
  {
    id: 18,
    title: "Portrait Intime 1",
    description: "Photographie émotionnelle et naturelle",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb1.webp",
    media: "https://videos.agencememento.com/Prive/prive_img1.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 19,
    title: "Portrait Intime 2",
    description: "Lumière naturelle et spontanéité",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb2.webp",
    media: "https://videos.agencememento.com/Prive/prive_img2.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 20,
    title: "Portrait Intime 3",
    description: "Moments de complicité capturés",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb3.webp",
    media: "https://videos.agencememento.com/Prive/prive_img3.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 21,
    title: "Portrait Intime 4",
    description: "Atmosphère intimiste et chaleureuse",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb4.webp",
    media: "https://videos.agencememento.com/Prive/prive_img4.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 22,
    title: "Portrait Intime 5",
    description: "Beauté des instants simples",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb5.webp",
    media: "https://videos.agencememento.com/Prive/prive_img5.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 23,
    title: "Portrait Intime 6",
    description: "Émotions authentiques saisies",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb6.webp",
    media: "https://videos.agencememento.com/Prive/prive_img6.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 24,
    title: "Portrait Intime 7",
    description: "Douceur et intimité photographiée",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb7.webp",
    media: "https://videos.agencememento.com/Prive/prive_img7.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 25,
    title: "Portrait Intime 8",
    description: "Connexion et présence capturées",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb8.webp",
    media: "https://videos.agencememento.com/Prive/prive_img8.webp",
    mediaType: "image",
    category: "prive"
  },
  {
    id: 26,
    title: "Portrait Intime 9",
    description: "Élégance et naturel immortalisés",
    thumbnail: "https://videos.agencememento.com/Prive/prive_img_thumb9.webp",
    media: "https://videos.agencememento.com/Prive/prive_img9.webp",
    mediaType: "image",
    category: "prive"
  },

  // PROJETS ÉVÉNEMENTIEL (category: "evenementiel")
  {
    id: 10,
    title: "Interview Alvin",
    description: "Portrait corporate et interview",
    thumbnail: "https://videos.agencememento.com/evenementiel/ALVIN_FINAL_ITWmp4-poster-thumb.webp",
    media: "https://videos.agencememento.com/evenementiel/ALVIN_FINAL_ITWmp4-web.mp4",
    mediaType: "video",
    category: "evenementiel"
  },
  {
    id: 11,
    title: "Birthday Final",
    description: "Célébration événementielle",
    thumbnail: "https://videos.agencememento.com/evenementiel/BIRTHDAY_FINAL-poster-thumb.webp",
    media: "https://videos.agencememento.com/evenementiel/BIRTHDAY_FINAL-web.mp4",
    mediaType: "video",
    category: "evenementiel"
  },
  {
    id: 12,
    title: "C-Sphere Event",
    description: "Couverture événement corporate",
    thumbnail: "https://videos.agencememento.com/evenementiel/CSPHERE_FINALVIDEOHOG_SBS-poster-thumb.webp",
    media: "https://videos.agencememento.com/evenementiel/CSPHERE_FINALVIDEOHOG_SBS-web.mp4",
    mediaType: "video",
    category: "evenementiel"
  },
  {
    id: 13,
    title: "P.G Corporate",
    description: "Photographie événement entreprise",
    thumbnail: "https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-thumb.webp",
    media: "https://videos.agencememento.com/evenementiel/PandG-Final-Memento-45-web.webp",
    mediaType: "image",
    category: "evenementiel"
  },
  {
    id: 14,
    title: "P.G Session",
    description: "Reportage photo corporate",
    thumbnail: "https://videos.agencememento.com/evenementiel/PandG-Final-Memento-68-thumb.webp",
    media: "https://videos.agencememento.com/evenementiel/PandG-Final-Memento-68-web.webp",
    mediaType: "image",
    category: "evenementiel"
  },

  // NOUVEAUX PROJETS ÉVÉNEMENTIEL - IMAGES
  {
    id: 27,
    title: "Événement Corporate 1",
    description: "Couverture professionnelle d'entreprise",
    thumbnail: "https://videos.agencememento.com/evenementiel/event_img_thumb1.webp",
    media: "https://videos.agencememento.com/evenementiel/event_img1.webp",
    mediaType: "image",
    category: "evenementiel"
  },
  {
    id: 28,
    title: "Événement Corporate 2",
    description: "Moments clés capturés en entreprise",
    thumbnail: "https://videos.agencememento.com/evenementiel/event_img_thumb2.webp",
    media: "https://videos.agencememento.com/evenementiel/event_img2.webp",
    mediaType: "image",
    category: "evenementiel"
  },
  {
    id: 29,
    title: "Événement Corporate 3",
    description: "Reportage photo événementiel professionnel",
    thumbnail: "https://videos.agencememento.com/evenementiel/event_img_thumb3.webp",
    media: "https://videos.agencememento.com/evenementiel/event_img3.webp",
    mediaType: "image",
    category: "evenementiel"
  }
];

export default projects;