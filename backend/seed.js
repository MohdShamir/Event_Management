// seed.js
const Event = require("./models/Event");

const seedEvents = async () => {
  const existing = await Event.find();
  if (existing.length > 0) return; // don’t insert again

  await Event.insertMany([
    {
      title: "Tech Conference 2025",
      description: "A conference about AI, Blockchain and Web3.",
      date: new Date("2025-10-15"),
      location: "Mumbai",
    },
    {
      title: "Music Festival",
      description: "Live bands, DJs and fun activities.",
      date: new Date("2025-11-05"),
      location: "Delhi",
    },
    {
      title: "Startup Pitch Night",
      description: "Entrepreneurs showcase ideas to investors.",
      date: new Date("2025-12-01"),
      location: "Bangalore",
    }
  ]);

  console.log("✅ Sample events inserted");
};

module.exports = seedEvents;
