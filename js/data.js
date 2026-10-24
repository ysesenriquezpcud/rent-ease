const properties = [
  {
    id: 1,
    name: "Hanna - Minami Residences",
    location: "General Trias, Cavite",
    areaKey: "cavite",
    type: "duplex",
    landlord: {
      name: "Roberto Cruz",
      phone: "+63 918 234 5678",
      verified: true
    },
    price: 33000,
    rating: 0,
    reviews: 0,
    bedrooms: 3,
    bathrooms: 2,
    area: 54,
    storeys: 2,
    amenities: ["Covered Court", "Club House", "Garage", "24/7 Security"],
    image: "images/duplex.webp",
    description:
      "Spacious duplex in a quiet residential area of General Trias. Ideal for families looking for comfort and security.",
    reviewList: []
  },
  {
    id: 2,
    name: "The Rochester",
    location: "San Joaquin, Pasig",
    areaKey: "pasig",
    type: "apartment",
    landlord: {
      name: "Maria Santos",
      phone: "+63 917 123 4567",
      verified: true
    },
    price: 20000,
    rating: 5.0,
    reviews: 3,
    bedrooms: 1,
    bathrooms: 1,
    area: 25,
    storeys: null,
    amenities: ["Fully Furnished", "Basketball Court", "Pool", "Gym"],
    image: "images/apartment.webp",
    description:
      "Modern fully furnished studio apartment with access to pool, gym and basketball court. Perfect for young professionals.",
    reviewList: [
      {
        name: "Maria S.",
        date: "Aug 2024",
        rating: 5,
        text: "Clean, well-maintained, and the amenities are great. Highly recommended!",
        stayed: "6 months"
      },
      {
        name: "James L.",
        date: "Oct 2025",
        rating: 5,
        text: "Convenient location and responsive management. Worth every peso.",
        stayed: "1 year & 2 months"
      },
      {
        name: "Anna R.",
        date: "July 2026",
        rating: 5,
        text: "Loved the unit. Fully furnished and move-in ready.",
        stayed: "9 months"
      }
    ]
  },
  {
    id: 3,
    name: "Super Dorm",
    location: "Arenas St., Sampaloc, Manila",
    areaKey: "manila",
    type: "dormitory",
    landlord: {
      name: "Jose Reyes",
      phone: "+63 919 555 0101",
      verified: true
    },
    price: 7000,
    rating: 4.0,
    reviews: 67,
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    storeys: null,
    amenities: ["Study Area", "24/7 Security", "Proximity Card Entry", "Wifi"],
    image: "images/dorm.png",
    description:
      "Affordable dormitory near universities in Sampaloc. Secure and student-friendly with study areas and WiFi.",
    reviewList: [
      {
        name: "Ken T.",
        date: "March 2024",
        rating: 4,
        text: "Good value for money. Security is solid and WiFi is decent.",
        stayed: "2 years & 5 months"
      },
      {
        name: "Lisa M.",
        date: "May 2025",
        rating: 4,
        text: "Clean rooms and helpful staff. A bit noisy on weekends.",
        stayed: "1 year & 2 months"
      },
      {
        name: "Carlos P.",
        date: "Sep 2026",
        rating: 5,
        text: "Perfect for students. Close to school and very affordable.",
        stayed: "1 year & 4 months"
      }
    ]
  },
  {
    id: 4,
    name: "Anica - Lancaster New City",
    location: "Kawit, Cavite",
    areaKey: "cavite",
    type: "townhouse",
    landlord: {
      name: "Angela Mendoza",
      phone: "+63 920 888 3344",
      verified: true
    },
    price: 20000,
    rating: 5.0,
    reviews: 1,
    bedrooms: 3,
    bathrooms: 2,
    area: 80,
    storeys: 2,
    amenities: ["Club House", "Swimming Pool", "Garage", "Church"],
    image: "images/townhouse.webp",
    description:
      "Family townhouse inside Lancaster New City with access to clubhouse, pool and other community amenities.",
    reviewList: [
      {
        name: "Elena V.",
        date: "Jan 2025",
        rating: 5,
        text: "Spacious and peaceful. The community facilities are excellent.",
        stayed: "11 months"
      }
    ]
  },
  {
    id: 5,
    name: "Avida Towers Taguig",
    location: "Bonifacio Global City, Taguig",
    areaKey: "taguig",
    type: "condominium",
    landlord: {
      name: "Patrick Lim",
      phone: "+63 922 111 7788",
      verified: true
    },
    price: 39000,
    rating: 4.9,
    reviews: 10,
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    storeys: null,
    amenities: ["24/7 Security", "Pet Allowed", "Pool", "Wifi"],
    image: "images/condo.png",
    description:
      "Premium condo in BGC with modern finishes, pet-friendly policy, and top-tier building amenities.",
    reviewList: [
      {
        name: "David K.",
        date: "Oct 2025",
        rating: 5,
        text: "Great location in BGC. Building is well managed.",
        stayed: "8 months"
      },
      {
        name: "Sofia N.",
        date: "Aug 2025",
        rating: 5,
        text: "Pet-friendly and spacious. Love the pool area.",
        stayed: "1 year"
      },
      {
        name: "Mark H.",
        date: "Apr 2025",
        rating: 4,
        text: "Nice unit overall. Parking can be limited at peak hours.",
        stayed: "4 months"
      }
    ]
  },
  {
    id: 6,
    name: "Dani - Camella Alta Silang",
    location: "Silang, Cavite",
    areaKey: "cavite",
    type: "house",
    landlord: {
      name: "Carmen Villanueva",
      phone: "+63 915 444 2299",
      verified: false
    },
    price: 43000,
    rating: 0,
    reviews: 0,
    bedrooms: 4,
    bathrooms: 2,
    area: 83,
    storeys: 2,
    amenities: ["Covered Court", "Security", "Gym", "Playground"],
    image: "images/House.webp",
    description:
      "Large family house in Camella Alta Silang with playground, gym and covered court for the whole family.",
    reviewList: []
  }
];

const mapAreas = [
  { key: "manila", name: "Manila", lat: 14.5995, lng: 120.9842 },
  { key: "pasig", name: "Pasig", lat: 14.5764, lng: 121.0851 },
  { key: "taguig", name: "Taguig", lat: 14.5176, lng: 121.0509 },
  { key: "cavite", name: "Cavite", lat: 14.3294, lng: 120.9367 }
];

const icons = {
  bed: "images/bed-light.png",
  bath: "images/bathroom-light.png",
  area: "images/space-light.png",
  storey: "images/storey-light.png"
};