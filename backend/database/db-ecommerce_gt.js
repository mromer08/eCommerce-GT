// use ecommerce_gt;

db.users.insertOne({
  username: "dave1",
  roles: {
    User: 2001,
  },
  password: "$2b$10$oEbHZlazDHE1YnnJ4XdpGuGh9a/JZOO7Xe6WZtRRsSMgprxMXnKza",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmUxIiwiaWF0IjoxNjMzOTkyMjkwLCJleHAiOjE2MzQwNzg2OTB9.U85HVX_gcDZkHHSRWeo7AHfIe7q9i03dGW2ed3fHqAk",
});

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
  tags: {tecnologia, hogar, academico, literatura, decoracion, otros},
  amount,
  state: {accepted, rejected, inReview}
}

ShoppingCart = {
 Product: {
  productId,
  amount
 },
 userId,
 isComplete,
 subtotal
}

Sale = {
  userId,
  total,
  date,
  cartId,
  creditCardId //metodo de pago
}

CreditCard = {
  HolderName,
  lastDigits,
  number,
  expirationDate,
  cvcCode,
  userId
}

Order ={
  isComplete,
  userId,
  createdAt,
  deliveryEta,
}


