// use ecommerce_gt;
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
  {
    name: 'Congelador horizontal de 7 cúbicos con rodos',
    description: 'Congelador horizontal de 7 cúbicos con rodos y chapa de seguridad, Frigidaire FFCC07C3HQW.',
    image: '/images/13.png',
    price: 3299,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Congelador horizontal dual de 25 cubicos',
    description: 'Congelador horizontal dual de 25 cubicos con doble puerta, Frigidaire',
    image: '/images/14.png',
    price: 9999,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Congelador Twin Frigidaire Professional',
    description: 'Ice maker interno, bandejas de vidrio templado, control de temperatura interno, iluminación LED, modo sabático, acero con acabado Smudge-Proof resistente a huellas.',
    image: '/images/15.png',
    price: 19996,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Lavadora de ropa de 37 libras LG',
    description: 'Fuerza de lavado Punch + 3. Motor LG Smart Inverter. Sistema de lavado TurboDrum',
    image: '/images/16.png',
    price: 2996,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Lavadora de ropa, 44 libras FRIGIDAIRE',
    description: 'Lavadora de ropa, 44 libras de capacidad, tina de acero, filtro atrapa pelusa, ciclo de lavado rápido.',
    image: '/images/17.png',
    price: 3496,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Lavadora de ropa de 42 libras Mabe',
    description: 'Ahorra agua gracias a la Tecnología Aqua Saver Green. Nuevo diseño con acabados metálicos. La más fácil de usar por su diseño, gracias a la renovación en gráficos. Ciclo de sanitizado que cuida tu salud al eliminar el 99.9% de bacterias.',
    image: '/images/18.png',
    price: 3596,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Lavadora de ropa de 48 libras Samsung',
    description: 'Optimiza el uso de tu lavadora con mayor facilidad con SmartThings (sistema de inteligencia artificial). Función Autolimpieza que elimina bacterias para mayor higiene. Ciclo Super Speed para lavar una carga completa en 30 minutos.',
    image: '/images/19.png',
    price: 6996,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'Sandwichera de 2 porciones Black+Decker SM24520',
    description: 'Corta y sella los sandwiches. 700 watts de potencia. Capacidad 2 piezas',
    image: '/images/20.png',
    price: 6996,
    category: categories[1],
    amount: 10,
    status: 'accepted',
    user: normalUsers[1]
  },
  {
    name: 'ESFERAS DUROPOR NO. 4 (100)',
    description: 'Esferas de duropor',
    image: '/images/21.png',
    price: 4,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'SERIES DE PAPEL LUSTRE APUNTA 10 COLORES',
    description: 'SERIES DE PAPEL LUSTRE APUNTA 10 COLORES',
    image: '/images/22.png',
    price: 1.5,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'CARTON CHIP C-40 PLIEGO 30X40',
    description: 'CARTON CHIP C-40 PLIEGO 30X40',
    image: '/images/23.png',
    price: 10,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'SILICON LIQUIDO PEGAFAST 250 ML',
    description: 'Silicón liquido Pegafast 250 ml. Especial para trabajos manuales, pega tela, foamy, cartón y otros',
    image: '/images/24.png',
    price: 20,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'SOBRE MANILA IRASA 6005 OFICIO',
    description: 'Sobre manila con solapa engomada, oficio de 10X15 de 90 g. Para el envío de publicidad, catálogos, revistas y otros documentos.',
    image: '/images/25.png',
    price: 1.1,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'FOLDER MANILA EN CAJA 1432 T/CARTA',
    description: 'Folder manila 172 gr. Tamaño carta, folder de media ceja, con perforación para fastener de 8 cm.',
    image: '/images/26.png',
    price: 1,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'SEPARADORES CARTA FAST DE CARTONCILLO C-12 05 COL',
    description: 'Separadores de cartoncillo 5 colores, para cartapacio, folders, archivadores',
    image: '/images/27.png',
    price: 4.5,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'ARCHIVADOR FAST 21 CARTA VINIL DESARMADO AZUL',
    description: 'Archivador tamaño carta forrado con vinil color azul, con rados de metal, perforación para mayor agarre, protector metálico, mecanismo de metal, con identificador, prensador de metal',
    image: '/images/28.png',
    price: 32.5,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'LIBRETA C/FUNDA PLASTICA 60H. P/POLICIA',
    description: 'Libreta de bolsillo con funda plástica de 60 hojas para policías, anotaciones rápidas y precisas',
    image: '/images/29.png',
    price: 8.5,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'LIBRETA ENGRAPADA # 4 60H',
    description: 'Libreta engrapada # 4 60 hojas papel bond rayado, de bolsillo para apuntes rápidos',
    image: '/images/30.png',
    price: 4,
    category: categories[2],
    amount: 200,
    status: 'accepted',
    user: normalUsers[2]
  },
  {
    name: 'Manga: Komi CanT Communicate Tomo 6',
    description: 'Gracias a Tadano-kun, la distancia de Komi con los demás se ha reducido poco a poco… ¡pero todavía se estresa al ir al karaoke y al Neko Cafe! La proximidad del invierno se siente en el aire, pero los días son cálidos gracias a que la comunicación con sus amigos ha aumentado… y quizá también porque su relación con Tadano-kun ha cambiado un poco.',
    image: '/images/31.png',
    price: 105,
    category: categories[3],
    amount: 50,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Naruto: La Historia Secreta De Konoha Novel',
    description: 'Se acerca el gran día: la boda del héroe de Konoha, Naruto Uzumaki, y la tímida pero valiente Hinata Hyuga tiene vuelto loco al Sexto Hokage, Kakashi Hatake, pues sus mejores shinobi, quienes obviamente están invitados al evento, deben cumplir misiones que los alejan de la aldea. Kakashi debe asegurar que la feliz pareja viva un día espectacular, por lo que inventa una estrategia a fin de asegurar la presencia y los obsequios que recibirán por parte de los convidados. ¿Cómo resultará su plan? ¡He aquí la boda de estos jóvenes ninja!',
    image: '/images/32.png',
    price: 125,
    category: categories[3],
    amount: 50,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'My Hero Academia / Boku No Hero Calendario 2023 Oficial ENSKY',
    description: 'My Hero Academia / Boku No Hero Calendario 2023 Oficial ENSKY',
    image: '/images/33.png',
    price: 125,
    category: categories[3],
    amount: 50,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Manga: Las Quintillizas Tomo 10',
    description: 'Futaro y las quintillizas van al esperado viaje escolar a Kioto. ¿Será él capaz de recordar la verdad sobre la chica de la foto que conoció ahí hace seis años? Por otro lado, Miku tiene un plan para declararle su amor, pero Ichika se disfraza de ella para echárselo a perder. Todas se dan cuenta de ello, y Miku queda muy lastimada. Sin embargo, Nino le da ánimos, y con la ayuda de todas, Miku y Futaro se quedan a solas el último día. ¿Qué sucederá al final?',
    image: '/images/34.png',
    price: 105,
    category: categories[3],
    amount: 50,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'LA CICIG: EXPERIMENTO O CONSPIRACION',
    description: 'La CICIG (Comisión Internacional Contra la Impunidad en Guatemala) adquirió un inusitado protagonismo durante los 12 años que permaneció en el país. Concebida como un ente de apoyo y asesoría a las instituciones locales se convirtió pronto, sin embargo, en un poderoso factor de la política guatemalteca. El movimiento cívico de 2015 la hizo gozar de amplia aceptación y prestigio pero, cuatro años después, se canceló su mandato, sin que la medida suscitara más que débiles resistencias.',
    image: '/images/35.png',
    price: 213,
    category: categories[3],
    amount: 50,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Manga: Hanako Kun Tomo 17',
    description: 'Nene y Kou buscan pistas que guarden una conexión con la frontera donde Hanako-kun se encuentra. Aquel a quien encontraron en la Mansión Roja maldita es Tsukasa en sus días de infancia. Junto con él, intentan escapar de la casa, pero el camino les es obstruido… ¡En el relato espectral de los Siete Misterios de la Academia, el clímax del arco de la Mansión Roja!',
    image: '/images/36.png',
    price: 100,
    category: categories[3],
    amount: 20,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Manga: Shaman King Tomo 8',
    description: 'Ya es el turno del equipo liderado por Yoh: Aguas Termales Funbari. Combatirán contra los Ice Men, cuyo ataque combinado demuestra su compenetración y fuerza. Pero de nada sirve preocuparse, ya que el equipo de Yoh ha mejorado enormemente gracias a la gran Bitácora Mágica... ¿¡Qué rumbo tomará la batalla...!?',
    image: '/images/37.png',
    price: 150,
    category: categories[3],
    amount: 20,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Manga: Shaman King Tomo 6',
    description: 'Lyserg, un chamán zahorí, busca a Hao para vengar la muerte de sus padres. Yoh y los demás lo aceptan como compañero y juntos continúan su búsqueda de la aldea de los apaches. Por otro lado, en Izumo, el abuelo de Yoh le revela a Anna la identidad de Hao. ¿¡Quién es realmente ese "futuro rey" Hao...!?',
    image: '/images/38.png',
    price: 135,
    category: categories[3],
    amount: 20,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Manga: Shaman King Tomo 11',
    description: 'Yoh fue asesinado por Saty y enviado al infierno. con un objetivo. Allí se encuentra con su ancestro, Yohken Asakura, y tendrá que enfrentarse a él para lograr su objetivo en el infierno. Mientras tanto, los Gandhara continúan en su misión de reunir a los cinco guerreros para derrotar finalmente a Hao. Yoh toma una decisión y continúa con su entrenamiento.',
    image: '/images/39.png',
    price: 150,
    category: categories[3],
    amount: 20,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Manga: Love Is War Tomo 21',
    description: 'La academia Shuchiin celebra la graduación de los estudiantes de tercero, por lo que es el momento de conocer la respuesta de Tsubame. ¿Habrá una nueva pareja en la Shuchiin? Pase lo que pase, después de las vacaciones comenzará el nuevo curso escolar, que estará marcado por los reencuentros y las presentaciones.',
    image: '/images/40.png',
    price: 110,
    category: categories[3],
    amount: 20,
    status: 'accepted',
    user: normalUsers[3]
  },
  {
    name: 'Maceta Musa Amarilla',
    description: 'Yeso. ceramica amarilla mate. Frente 10cm Prof. 12cm Alto 16cm',
    image: '/images/41.png',
    price: 195,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Consola Tube',
    description: 'El uso del metal en los muebles de almacenamiento es fabuloso porque es una garantia probada de mucha durabilidad, sin que tenga que ser voluminoso. Ademas, funciona como guiño a un estilo industrial que siguen siendo una tendencia muy aceptada.',
    image: '/images/42.png',
    price: 1240,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Jarron Masai Ceramica Gris',
    description: 'Ceramica gris. Frente 7cm Alto 20cm',
    image: '/images/43.png',
    price: 175,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Cuadro Cono Gris 30 X 30cm',
    description: 'Cuadro Cono Gris 30 X 30cm',
    image: '/images/44.png',
    price: 155,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Cesta Cuadrada Mediana Negro',
    description: 'Algodon reciclado con costura mixta negra. Frente 16cm Prof. 16cm Alto 12cm',
    image: '/images/45.png',
    price: 95,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Espejo Dima Dorado',
    description: 'Marco metal dorado. Set de 3 espejos. Frente:17cm; Prof:1cm; Alto:29cm c. espejo. Tamaño de cadena: 38cms',
    image: '/images/46.png',
    price: 575,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Cesta Idalis Redonda',
    description: 'Algodón reciclado natural. Diámetro 16cm;Alto 16cms.',
    image: '/images/47.png',
    price: 175,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Jarron Odra Rectangular',
    description: 'Madera teca rectangular. Medida:5X17.5X22.5cms. Incluye 3 tubos de ensayo',
    image: '/images/48.png',
    price: 150,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Cojin Jona Turquesa',
    description: 'Tela Spandex turquesa. Ancho:57cm;Alto:40cm',
    image: '/images/49.png',
    price: 150,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
  },
  {
    name: 'Lampara De Mesa Helge Amarillo',
    description: 'Top madera claro. Micro terrazo amarillo. Foco led 4W tipo globo. Cable negro. Diametro:10cms Alto:22cms',
    image: '/images/50.png',
    price: 150,
    category: categories[4],
    amount: 20,
    status: 'accepted',
    user: normalUsers[4]
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