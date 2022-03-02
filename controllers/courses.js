const Course = require("../models/Course"),
  asyncHandler = require("../middleware/asyncHandler"),
  ErrorResponse = require("../utils/ErrorResponse"),
  Bootcamp = require("../models/Bootcamp");

//Desc                      //Get all courses
//Route                     //GET /api/v1/courses
//Route                     //GET /api/v1/bootcamps/:id/courses
//Require Auth              //False
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      data: courses,
    });
  } else {
    res.status(200).json(res.advRes);
  }
});

//Desc                      //Create a course
//Route                     //POST /api/v1/bootcamps/:bootcampId/courses
//Require Auth              //True
exports.createCourse = asyncHandler(async (req, res, next) => {
  //Check if bootcamp exists
  const bootcamp = await Bootcamp.findOne({ user: req.user.id });

  //Check bootcamp exists
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        404,
        `Bootcamp not found`,
        `Bootcamp with specified id does not exist.`
      )
    );
  }

  //Add bootcamp and user identifiers for course
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  //Check if user is owner of bootcamp
  if (bootcamp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        401,
        `Unathorized: User cannot add course to bootcamp`,
        `User not owner of bootcamp`
      )
    );
  }

  //Create course for bootcamp
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

//Desc                      //Get single course
//Route                     //GET /api/v1/courses/:id/
//Require Auth              //False
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: course,
  });
});

//Desc                      //Update a course
//Route                     //PUT /api/v1/courses/:id
//Require Auth              //True
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        404,
        `Could not update course`,
        `No course with specified id: ${req.params.id} found`
      )
    );
  }

  //Check if user is owner of course
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        401,
        `Anauthorized: Cannot add course to bootcamp`,
        `User ${req.user.id} not owner of bootcamp`
      )
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

//Desc                      //Delete a course
//Route                     //DELETE /api/v1/courses/:id
//Require Auth              //True
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        400,
        `Could not delete bootcamp`,
        `Not bootcamp with specified id: ${req.params.id} exists.`
      )
    );
  }

  //Check if user is owner of course
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        401,
        `Anauthorized: Cannot delete for course bootcamp`,
        `User ${req.user.id} not owner of bootcamp`
      )
    );
  }

  course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
