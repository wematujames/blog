const Bootcamp = require("../models/Bootcamp"),
  ErrorResponse = require("../utils/ErrorResponse"),
  asyncHandler = require("../middleware/asyncHandler"),
  geocoder = require("../utils/geocoder"),
  path = require("path");

//Desc                      //Get all bootcamps
//Route                     //GET /api/v1/bootcamps
//Require Auth              //False
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advRes);
});

//Desc                      //Create a bootcamp
//Route                     //POST /api/v1/bootcamps
//Require Auth              //True
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  //Check if user already has a bootcamp
  const pubBootcamps = await Bootcamp.findOne({ user: req.user.id });
  if (pubBootcamps && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        403,
        `Publisher ${req.user.id} already has a bootcamp`,
        `Role ${req.user.role} can only publish one bootcamp`
      )
    );
  }

  //Add user to bootcamp fields
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.create(req.body);

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//Desc                      //Get a bootcamp
//Route                     //POST /api/v1/bootcamps/:id
//Require Auth              //False
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        404,
        `Bootcamp not found`,
        `No bootcamp with specified id: ${req.params.id}`
      )
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//Desc                      //Update a bootcamp
//Route                     //PUT /api/v1/bootcamps/:id
//Require Auth              //True
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        404,
        `Bootcamp could not be updated`,
        `No bootcamp with specified id: ${req.params.id}`
      )
    );
  }

  //Make sure user is the owner of bootcamp
  if (bootcamp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        401,
        `Unathorized: Cannot update bootcamp`,
        `User:${req.user.id} is not the owner of this bootcamp`
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    msg: `Successfully updated bootcamp with id: ${req.params.id}`,
    data: bootcamp,
  });
});

//Desc                      //Delete a bootcamp
//Route                     //DELETE /api/v1/bootcamps/:id
//Require Auth              //True
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        404,
        `Bootcamp could not be deleted`,
        `No bootcamp with specified id: ${req.params.id}`
      )
    );
  }

  //Make sure user is the owner of bootcamp
  if (bootcamp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        401,
        `Unathorized: Cannot delete bootcamp`,
        `User:${req.user.id} is not the owner of this bootcamp`
      )
    );
  }

  bootcamp.remove();

  res.status(200).json({
    success: true,
    msg: `Bootcamp with id: ${req.params.id} deleted successfully`,
    data: {},
  });
});

//Desc                      //Get bootcamp within radius of zipcode
//Route                     //GET /api/v1/bootcamps/raduis/:zipcode/:distance
//Require Auth              //False
exports.getBootcampWithRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);

  const radius = distance / 3963;

  const lon = loc[0].longitude;
  const lat = loc[0].latitude;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lon, lat], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

//Desc                      //Delete a bootcamp
//Route                     //DELETE /api/v1/bootcamps/:id/photo
//Require Auth              //True
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        404,
        `Bootcamp not found`,
        `No bootcamp with specified id: ${req.params.id}`
      )
    );
  }

  //Make sure user is the owner of bootcamp
  if (bootcamp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        401,
        `Unathorized: Cannot update bootcamp with photo`,
        `User:${req.user.id} is not the owner of this bootcamp`
      )
    );
  }
  //Check if file was uploaded
  if (!req.files) {
    return next(
      new ErrorResponse(400, `Please upload an image`, `No image uploaded`)
    );
  }
  const file = req.files.file;

  //Check file type (must be image file)
  if (!file.mimetype.startsWith("image")) {
    return next(
      new ErrorResponse(
        400,
        `Please upload an image file`,
        `A ${path.parse(file.name).ext} was uploaded.`
      )
    );
  }

  //Check files size
  if (file.size > process.env.MAX_UPLOAD_LIMIT) {
    return next(
      new ErrorResponse(
        404,
        `Please upload a image of size not greater than 1Mb`,
        `Image size ${file.size} greater than 1Mb`
      )
    );
  }

  //Set custom filename
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  //Save to uploads folder
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      console.err(err);
      return next(
        new ErrorResponse(500, `Problem uploading file`, `Server Error`)
      );
    }
    res.status(200).json({
      success: true,
      fileUrl: `http://localhost:3000/uploads/${file.name}`,
    });
  });
});
