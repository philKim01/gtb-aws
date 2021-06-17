"use strict";

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

// Data for user seeding
const userFirstNames = ["Freddie", "Rasheeda", "Alex", "Phillip"];
const userLastNames = ["Bergener", "Salaam", "Shapiro", "Kim"];

// Data for product seeding
// Data source for products: https://retrododo.com/90s-toys/
const products = [
  {
    name: "Beanie Babies",
    description:
      "The beads that the Beanie Babies are stuffed with make them heavier than regular teddies and are the perfect comforting buddy. They are also slightly under stuffed which makes them floppy and more realistic then usual teddy bears.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/www.bbtoystore.com/mm5/beanies/schweetheart.jpg?ezimgfmt=rs:420x420/rscb1/ng:webp/ngcb1",
    price: 499,
    stock: 50,
    category: "Stuffed Animals",
  },
  {
    name: "Nintendo 64",
    description:
      "The N64 was Nintendo’s fifth generation of gaming console and has gone on to produce some of the most loved characters in gaming history. This retro gaming system was released with three cartridge games: Super Mario 64, Pilot Wings 64, and Saikyō Habu Shōgi (exclusive to Japan). Other classic Nintendo 64 games include Golden Eye, Mario Party, The Legend of Zelda and Donkey Kong 64.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/images-na.ssl-images-amazon.com/images/I/713O5npuQYL._SX679_.jpg?ezimgfmt=rs:679x308/rscb1/ng:webp/ngcb1",
    price: 9999,
    stock: 40,
    category: "Videogames",
  },
  {
    name: "Polly Pocket",
    description:
      "This miniature creation featured ‘Polly’, a tiny figurine that stood under one inch tall. Polly came enclosed inside a small case that opened up to reveal a small dolls house or ‘world’. The worlds always looked pretty magical- a fairy tree or a ship on the ocean in beautiful, pastel colours.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/hips.hearstapps.com/ghk.h-cdn.co/assets/18/02/1515430971-polly-pocket-world-bundle-index.jpg?ezimgfmt=rs:800x400/rscb1/ng:webp/ngcb1",
    price: 999,
    stock: 50,
    category: "Action Figures & Dolls",
  },
  {
    name: "Bop It",
    description:
      "Bop It was a handheld electronic toy that first came out in 1996, but is so popular that new and improved versions are still on the shelves today. The original game came with just three instructions: bop it, twist it and pull it and you could compete against yourself, or others for the highest score.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/upload.wikimedia.org/wikipedia/commons/b/bc/Bop_it.jpg?ezimgfmt=rs:450x290/rscb1/ng:webp/ngcb1",
    price: 1999,
    stock: 50,
    category: "Games",
  },
  {
    name: "Game Boy Color",
    description:
      "The Game Boy Color was brought out at the tail end of the 90s, landing in late 1998 and following its predecessor, the Game Boy. The release of the Game Boy Color was very exciting as it meant that you could finally play handheld games on a coloured screen! Pokemon in colour; what more could you possibly want!",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/upload.wikimedia.org/wikipedia/commons/b/bc/Bop_it.jpg?ezimgfmt=rs:450x290/rscb1/ng:webp/ngcb1",
    price: 4999,
    stock: 50,
    category: "Videogames",
  },
  {
    name: "Etch-a-Sketch",
    description:
      "The Etch a Sketch was actually first produced in 1960 but has continued its popularity right up to the present day, establishing itself as one of the most well known 90s toys. Woody from Toy Story used the Etch-a-Sketch to write messages and draw, bringing the Etch-a-Sketch into the public eye and causing every kid to want one and write their own secret messages.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/images-na.ssl-images-amazon.com/images/I/81t0yMDVKoL._SL1500_.jpg?ezimgfmt=rs:487x404/rscb1/ng:webp/ngcb1",
    price: 1999,
    stock: 80,
    category: "Games",
  },
  {
    name: "Mouse Trap",
    description:
      "Mouse Trap was a great 90s game for those rainy days. This competitive board game saw players working together at first to complete the mouse trap course and then turn on each other to try and trap their mouse-shaped playing pieces.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/i.pinimg.com/originals/2e/8e/e5/2e8ee57ac31fb29da11c11651e5d942d.jpg?ezimgfmt=rs:521x405/rscb1/ng:webp/ngcb1",
    price: 1999,
    stock: 80,
    category: "Games",
  },
  {
    name: "Mr. Potato Head",
    description:
      "Everyone’s favourite moustachioed potato actually originated in the 1950s where it was sold as pronged body parts that were used in conjunction with a real potato. However, the plastic body was supplied several years later and the Mr Potato Head that we know and love today was born.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/www.standingstills.com/pub/media/catalog/product/cache/75eed2686e01eb22cb4050b2f40ddf97/c/a/cad195-1-1.jpg?ezimgfmt=rs:350x350/rscb1/ng:webp/ngcb1",
    price: 999,
    stock: 80,
    category: "Action Figures & Dolls",
  },
  {
    name: "GoGo's Crazy Bones",
    description:
      "GoGo’s Crazy Bones were another collectable toy fad throughout the 1990s and, with 31.5million packages sold between 1998 and 2000, they deserve a spot on our list of the best 90s toys.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/i.redd.it/w6y206286hzy.jpg?ezimgfmt=rs:770x343/rscb1/ng:webp/ngcb1",
    price: 499,
    stock: 80,
    category: "Action Figures & Dolls",
  },
  {
    name: "Buzz Lightyear",
    description:
      "Buzz Lightyear first featured in the 1995 original Toy Story Film and is one of the most loved characters of all time. The Buzz Lightyear doll was almost identical to the characters in the movie and said some of his most loved phrases such as “To Infinity, And Beyond!”. A classic and a must-have 90s toy.",
    imageUrl:
      "https://retrododo.com/ezoimgfmt/images-na.ssl-images-amazon.com/images/I/511NCRLSOLL.jpg?ezimgfmt=rs:402x500/rscb1/ng:webp/ngcb1",
    price: 1499,
    stock: 50,
    category: "Action Figures & Dolls",
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  for (let firstName of userFirstNames) {
    for (let lastName of userLastNames) {
      await User.create({
        // firstName,
        // lastName,
        username: `${firstName}.${lastName}@email.com`,
        password: "graceshopper",
        // streetAddress: "12345 FullStack St",
        // city: "New York",
        // state: "New York",
        // zipCode: 12345,
      });
    }
  }

  // Add Admin User for Testing
  await User.create({
    // firstName,
    // lastName,
    username: `admin@email.com`,
    password: "graceshopper",
    // streetAddress: "12345 FullStack St",
    // city: "New York",
    // state: "New York",
    // zipCode: 12345,
    isAdmin: true,
  });

  // Creating Products
  for (let product of products) {
    const { name, description, imageUrl, price, stock, category } = product;
    await Product.create({
      name,
      description,
      imageUrl,
      price,
      stock,
      category,
    });
  }

  // Creating Dummy Cart with status Unfulfilled
  await Order.create({
    fulfilled: false,
    userId: 1,
  });


  // Creating Dummy Cart with status Fulfilled
  await Order.create({
    fulfilled: true,
    userId: 1,
  });

  // Creating Dummy Cart with status Unfulfilled
  await Order.create({
    fulfilled: false,
    userId: 11,
  });


  // Create Dummy Order Items
  await OrderItem.create({
    orderId: 1,
    productId: 1,
    price: 499,
    quantity: 2,
  });

  await OrderItem.create({
    orderId: 1,
    productId: 2,
    price: 9999,
    quantity: 5,
  });

  await OrderItem.create({
    orderId: 2,
    productId: 3,
    price: 999,
    quantity: 7,
  });

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
