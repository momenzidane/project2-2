const { dbConnection } = require("../configuration");
const { ObjectId } = require("bson");
const createError = require("http-errors");

/*
 * GET EMPLOYEE WITH LIMET http://localhost:5000/employees
 */
const getEmployee = (req, res, next) => {
  dbConnection("emploees", async (collection) => {
    const pageNum = parseInt(req.query.page);
    console.log(req.query);
//with chatgpt
    if (isNaN(pageNum)) {
      const error = createError(
        400,
        "the value of the page is not exeset or the value of the page is not a number"
      );
      next(error);
    }
    // if (!isNaN(pageNum)) {
    //   const error = createError(
    //     400,
    //     "the value of the page is not exeset or the value of the page is not a number"
    //   );
    //   next(error);
    // }


    /*
          page  limet  skip
           1      10    0
           2      10    10
           3      10    20
        */
    const limit = 2;
    const skip = (pageNum - 1) * limit;

    const emploees = await collection
      .find({})
      .limit(limit)
      .skip(skip)
      .toArray();
    res.status(200).json(emploees);
  });
};
/**
 * GET PAGE COUNT http://localhost:5000/employees/pages
 */
const getPagesCou = (req, res, next) => {
  dbConnection("emploees", async (collection) => {
    const limit = 2;
    const employesCount = await collection.count({});
    const page = Math.ceil(employesCount / limit);

    res.json({
      numberOfPage: page,
    });
  });
};

/**
 * GET EMPLOYEE BY ID http://localhost:5000/employees/672901af59e7818f1f70cfd5
 */
const getEmpById = (req, res, next) => {
  const _id = new ObjectId(req.params.id);
  console.log(_id);

  dbConnection("emploees", async (collection) => {
    try {
      const employee = await collection.findOne({ _id: _id });
      if (!employee) {
        const error = createError(400, "id of the employee is not found :");
        next(error);
      }
      res.json(employee);
    } catch (err) {
        const error = createError(500, err.message);
        next(error);
    }
  });
};
module.exports = { getEmployee, getPagesCou, getEmpById };
