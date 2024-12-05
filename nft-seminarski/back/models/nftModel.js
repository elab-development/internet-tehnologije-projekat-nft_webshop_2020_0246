const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const nftSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A NFT must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "nft mora da ima max 40 karaktera"],
      minlength: [10, "nft mora da ima min 10 karaktera"],
      
    },
    slug: String,
    duration: {
      type: String,
      required: [true, "mora da ima tranjanje"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "mora da ima veličinu grupe"],
    },
    difficulty: {
      type: String,
      required: [true, "mora da ima difficulty"],
      enum: {
        values: ["easy", "medium", "difficulty"],
        message: "Difficulty mora biti: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "min 1"],
      max: [5, "max 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "NFT mroa da ima cenu"],
    },
    priceDiscount: {
      
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; // 200 > 100  20 < 100
        },
        message: "Cena na popustu treba da bud ispod originalne",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "morate staviti summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "morate staviti sliku"],
    },
    images: [String],

    startDates: [Date],
    secretNfts: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

nftSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});



//DOCUMNT MIDDLEWARE: runs before .save() or .create()
nftSchema.pre("save", function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});



//---------pre
// nftSchema.pre("find", function (next) {
nftSchema.pre(/^find/, function (next) {
  this.find({ secretNfts: { $ne: true } });
  this.start = Date.now();
  next();
});



//-----post
nftSchema.post(/^find/, function (doc, next) {
  console.log(`Query took time: ${Date.now() - this.start} times`);
  // console.log(doc);
  next();
});

//AGGREATION MIDDLEWARE
nftSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretNfts: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;