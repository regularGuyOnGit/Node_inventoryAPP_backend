#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Items = require("./models/product");
const commodity = [];
const Category = require("./models/category");
const noOfCategories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createItems();
  await createCategory();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function itemsCreate(
  index,
  name,
  description,
  category,
  price,
  number_in_stock
) {
  const items = new Items({
    name,
    description,
    category,
    price,
    number_in_stock,
  });
  await items.save();
  commodity[index] = items;
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemsCreate(
      0,
      "36'inch Sony Touch Screen Anroid device",
      "The 36-inch Sony infotainment system is a state-of-the-art in-car entertainment unit with a large touchscreen display, supporting Apple CarPlay, Android Auto, Bluetooth, and Wi-Fi. It offers seamless media playback, GPS navigation, and high-quality audio, enhancing the driving experience.",
      "Infotainment System",
      "$4.99",
      36
    ),
    itemsCreate(
      1,
      "Hyundai Verna Alloy 18'inch Alloy Wheels",
      "The 18-inch Hyundai Verna alloy wheels are stylish and durable, designed to enhance the car's appearance and performance. Crafted from high-quality materials, these alloy wheels offer a sleek, modern look with a multi-spoke design. They are lightweight, which helps improve fuel efficiency and handling, while also being strong enough to withstand various road conditions. The wheels are finished with a corrosion-resistant coating, ensuring long-lasting shine and durability.",
      "Alloy Wheels",
      "$18.99",
      12
    ),
    itemsCreate(
      2,
      "Swift racing body kit red and black",
      "The Swift racing body kit in red and black features aerodynamic enhancements for improved performance and a sporty look. It includes a front bumper, side skirts, rear bumper, and a spoiler, all designed to fit seamlessly with the Swift's contours. The striking red and black color scheme adds a bold, aggressive style to the vehicle.",
      "Body Kit",
      "$110",
      4
    ),
    itemsCreate(
      3,
      "Mahindra Scorpio's Interior Leather ",
      "The Mahindra Scorpio's interior features premium leather upholstery, providing a luxurious and comfortable experience. The high-quality leather is durable and easy to maintain, enhancing the overall aesthetic with its sophisticated look. This interior upgrade adds to the Scorpio's appeal, combining elegance with practicality.",
      "Interior",
      "$45.99",
      3
    ),
    itemsCreate(
      4,
      "Bose Infotainment super system apple car play ",
      "This is very cool system",
      "Infotainment System",
      "$105.99",
      3
    ),
  ]);
}

async function categoryCreate(index, name, description, products) {
  const category = new Category({
    name,
    description,
    products,
  });
  await category.save();
  noOfCategories[index] = category;
}

async function createCategory() {
  console.log("Adding Category");
  await Promise.all([
    categoryCreate(
      0,
      "Infotainment System",
      "An infotainment system for cars integrates audio, video, navigation, and connectivity features into a single user-friendly interface. It typically includes a touchscreen display, supports smartphone integration like Apple CarPlay and Android Auto, and offers Bluetooth and Wi-Fi connectivity. Designed to enhance the driving experience, it provides seamless access to media, hands-free communication, and real-time navigation.",
      [commodity[0], commodity[4]]
    ),
    categoryCreate(
      1,
      "Car Kit",
      "A car kit includes a collection of accessories and parts designed to enhance and customize your vehicle. This can range from performance upgrades and body kits to interior enhancements and technology add-ons. Car kits may include items like spoilers, alloy wheels, infotainment systems, custom upholstery, and lighting modifications, providing everything needed to personalize and improve your car's aesthetics, comfort, and functionality.",
      [commodity[2]]
    ),
    categoryCreate(
      2,
      "Interior",
      "An interior car kit includes various components and accessories designed to enhance the look, feel, and functionality of your vehicle's cabin. Items typically found in an interior kit can include custom upholstery, premium leather seats, dashboard trim, floor mats, steering wheel covers, and advanced infotainment systems. These upgrades aim to provide a more comfortable, luxurious, and personalized driving experience.",
      [commodity[3]]
    ),
    categoryCreate(
      3,
      "Alloy Wheels",
      "Alloy wheels are lightweight, high-performance wheels made from an alloy of aluminum or magnesium. Known for their strength and durability, they improve vehicle handling, fuel efficiency, and braking performance. Available in various sizes and designs, alloy wheels also enhance the aesthetic appeal of a car, giving it a sleek and modern look. Their corrosion-resistant properties ensure long-lasting shine and durability.",
      [commodity[1]]
    ),
  ]);
}
