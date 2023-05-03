// use ecommerce_gt;

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
    name: 'producto 1',
    description: 'super descripcion',
    image: 'images/none.png',
    price: 100,
    tags: [tags[1], tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'producto 2',
    description: 'super descripcion',
    image: 'images/none.png',
    price: 100,
    tags: [tags[1], tags[0]],
    amount: 5,
    status: 'accepted',
    user: normalUsers[0]
  },
  {
    name: 'producto 3',
    description: 'super descripcion',
    image: 'images/none.png',
    price: 100,
    tags: [tags[1], tags[0]],
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