// use ecommerce_gt;
const { faker } = require('@faker-js/faker/locale/es_MX');
const usersPassword =
  "$2b$10$pQZaTlg0z1zXcOVP.wJ.s.luAmm3yhf2GKvqELapV2xidemCIyIZu";
let result = db.categories.insertMany([
  {
    name: "Tecnología",
  },
  {
    name: "Hogar",
  },
  {
    name: "Académico",
  },
  {
    name: "Literatura",
  },
  {
    name: "Decoración",
  },
  {
    name: "Otros",
  },
]);

const categories = Object.values(result.insertedIds);

const adminUser = db.users.insertOne({
  firstname: "super",
  lastname: "admin",
  username: "admin",
  roles: {
    Admin: 5002,
    Delivery: 1580,
    User: 2000,
  },
  password: usersPassword,
});

const deliveryUsers = db.users.insertMany([
  {
    firstname: "Hector",
    lastname: "Lopez",
    username: "delivery1",
    roles: {
      Delivery: 1580,
      User: 2000,
    },
    password: usersPassword,
  },
  {
    firstname: "Karl",
    lastname: "Pep",
    username: "delivery2",
    roles: {
      Delivery: 1580,
      User: 2000,
    },
    password: usersPassword,
  },
]);

result = db.users.insertMany([
  {
    firstname: "Ana",
    lastname: "García",
    username: "ana22",
    roles: {
    User: 2000,
    },
    password: usersPassword,
  },
  {
    firstname: "Oscar",
    lastname: "Rolp",
    username: "os34",
    roles: {
      User: 2000,
    },
    password: usersPassword,
  },
  {
    firstname: "Pedro",
    lastname: "Martínez",
    username: "pm90",
    roles: {
    User: 2000,
    },
    password: usersPassword,
  },
  {
    firstname: "María",
    lastname: "López",
    username: "ml78",
    roles: {
    User: 2000,
    },
    password: usersPassword,
  },
  {
    firstname: "Juan",
    lastname: "Pérez",
    username: "jp45",
    roles: {
    User: 2000,
    },
    password: usersPassword,
  }
]);

const normalUsers = Object.values(result.insertedIds);

result = db.products.insertMany([
  {
    name: 'Apple iPad (9th Generation)',
    description: 'Se parte de la nueva etapa en la evolución, gracias el Moto g22, un dispositivo diseñado para acompañarte en tus actividades diarias, ya que viene con una súper pantalla de 6.5”, con una tasa de refresco de 90Hz, un sistema de cámara cuádruple de 50MP y cuenta con una interfaz rediseñada y una seguridad mejorada, gracias a Android 12.',
    image: '/images/1.png',
    price: 1399.00,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Samsung Galaxy A32, Dual SIM, Liberado (Lavanda)',
    description: 'Con una resolución asombrosamente alta con la cámara principal, además este teléfono soporta hasta 1.0 metros de agua durante 30 minutos. Así que no te preocupes si tu teléfono se moja un poco y quieres seguir jugando o tomando fotos.',
    image: '/images/2.png',
    price: 2099,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Consola Nintendo Switch™ Modelo OLED',
    description: 'Consola Nintendo Switch™ Modelo OLED + Controles Joy-Con Neon Red y Neon Blue',
    image: '/images/3.png',
    price: 4799,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Audífonos Apple AirPods 3 In-Ear con Estuche de Carga Inalámbrico (Blanco)',
    description: 'Los Audífonos Apple AirPods 3 son una opción innovadora para disfrutar de una experiencia auditiva de alta calidad.',
    image: '/images/4.png',
    price: 1949,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Audífonos Apple AirPods Max Over-Ear Inalámbricos con Micrófonos y Noise Cancelling (Space Gray)',
    description: 'Los Audífonos Apple AirPods Max ofrecen una experiencia inalámbrica inmersiva con micrófonos y cancelación de ruido.',
    image: '/images/5.png',
    price: 3998,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Apple iPhone 13 Pro 5G, 512GB, Liberado (Celeste)',
    description: 'El dispositivo móvil más revolucionario del mundo, que gracias a su sistema de cámaras pro, ofrece mejores resultados con poca luz y capta detalles increíbles, además cuenta con pantalla de súper retina XDR con ProMotion.',
    image: '/images/6.png',
    price: 11999,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Apple iPhone 12 5G, 128GB, Liberado (Azul)',
    description: 'El iPhone 12 5G al igual que sus sucesores cuenta con el chip A14 Bionic, que es el más rápido en un smartphone, una pantalla OLED y el Ceramic Shield cuatro veces más resistente a caídas, el iPhone 12 lo tiene todo.',
    image: '/images/7.png',
    price: 7999,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'PROCESADOR AMD RYZEN 7 5700G',
    description: 'Cuando cuentas con la arquitectura de procesadores más avanzada del mundo para jugadores y creadores de contenido, las posibilidades son infinitas.',
    image: '/images/8.png',
    price: 2068,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'PROCESADOR AMD RYZEN 9 7950X AM5 SIN VENTILADOR',
    description: 'Cuando cuentas con la arquitectura de procesadores más avanzada del mundo para jugadores y creadores de contenido, las posibilidades son infinitas.',
    image: '/images/9.png',
    price: 6818,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'DELL INSPIRON 3511 i5 1135G7 2.4GHZ 8GB 2667 256GB',
    description: 'Cuando cuentas con la arquitectura de procesadores más avanzada del mundo para jugadores y creadores de contenido, las posibilidades son infinitas.',
    image: '/images/10.png',
    price: 5505,
    category: categories[0],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Estufa de mesa, a gas, color gris metálico',
    description: 'La estufa de mesa es de gas y tiene un elegante color gris metálico.',
    image: '/images/11.png',
    price: 696,
    category: categories[1],
    amount: 5,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Estufa a gas de 24", color negro. Whirlpool WEG60BK.',
    description: 'Estufa a gas de 24", color negro. Whirlpool WEG60BK.',
    image: '/images/12.png',
    price: 696,
    category: categories[1],
    amount: 5,
    status: 'accepted',
    user: normalUsers[1]
  },
])

//Collections
User = {
  username,
  firstname,
  lastname,
  roles,
  password,
  refreshToken,
};

Product = {
  name,
  description,
  imageUrl,
  price,
  category: { tecnologia, hogar, academico, literatura, decoracion, otros },
  amount,
  state: { accepted, rejected, inReview },
};

ShoppingCart = {
  Product: {
    productId,
    amount,
  },
  userId,
  isComplete,
  subtotal,
};

Sale = {
  userId,
  total,
  date,
  cartId,
  creditCardId, //metodo de pago
};

CreditCard = {
  HolderName,
  lastDigits,
  number,
  expirationDate,
  cvcCode,
  userId,
};

Order = {
  isComplete,
  userId,
  createdAt,
  deliveryEta,
};