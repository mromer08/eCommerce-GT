// use ecommerce_gt;
const { faker } = require('@faker-js/faker/locale/es_MX');
const usersPassword =
  "$2b$10$pQZaTlg0z1zXcOVP.wJ.s.luAmm3yhf2GKvqELapV2xidemCIyIZu";
let result = db.tags.insertMany([
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

const tags = Object.values(result.insertedIds);

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
    image: 'https://www.max.com.gt/media/catalog/product/cache/40cff66e483d5074b1ae49efef994171/m/o/motog22b.png',
    price: 1399.00,
    categories: [tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Samsung Galaxy Z Flip4 5G, Liberado (Gris)',
    description: 'Pequeño pero poderoso cuando se pliega, el Galaxy Z Flip4 es un teléfono inteligente compacto y con el tamaño justo para deslizarse en el bolsillo, cuenta con una pantalla de 6,7 pulgadas, despliega una hermosa vista gracias al vidrio Ultra Thin Glass, además ya no debes preocuparte por el agua. Este es el primer teléfono inteligente plegable resistente al agua del mundo.',
    image: 'https://www.max.com.gt/media/catalog/product/cache/40cff66e483d5074b1ae49efef994171/s/m/smf721bza.jpg',
    price: 100,
    categories: [tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'Samsung Galaxy Z Flip4 5G, Liberado (Gris)',
    description: 'Pequeño pero poderoso cuando se pliega, el Galaxy Z Flip4 es un teléfono inteligente compacto y con el tamaño justo para deslizarse en el bolsillo, cuenta con una pantalla de 6,7 pulgadas, despliega una hermosa vista gracias al vidrio Ultra Thin Glass, además ya no debes preocuparte por el agua. Este es el primer teléfono inteligente plegable resistente al agua del mundo.',
    image: 'https://www.max.com.gt/media/catalog/product/cache/40cff66e483d5074b1ae49efef994171/s/m/smf721bza.jpg',
    price: 100,
    categories: [tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'producto 4',
    description: 'super descripcion',
    image: 'images/none.png',
    price: 100,
    tags: [tags[1], tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'producto 5',
    description: 'super descripcion',
    image: 'images/none.png',
    price: 100,
    tags: [tags[1], tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  }
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
  tags: { tecnologia, hogar, academico, literatura, decoracion, otros },
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


tags.insertedIds.forEach((element, i) => {
  console.log(`hola ${i}`);
});