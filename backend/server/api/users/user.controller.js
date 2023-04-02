var bcrypt = require("bcryptjs");
require("dotenv").config();

const {
  register,
  getAllUsers,
  userById,
  profile,
  getUserByEmail,
} = require("./user.service");
const pool = require("../../config/database").pool;

var validator = require("validator"); //npm

var jwt = require("jsonwebtoken"); //npm

module.exports = {
  createUser: (req, res) => {
    // accepting data from front end
    // console.log(req.body)
    const { email, firstName, lastName, userName, password } = req.body;
    // validation process
    if (!userName || !firstName || !lastName || !email || !password)
      // console.log("error")
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    // console.log(validator.isStrongPassword(password));
    if (password <= 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters!" });
    }

    //     if ( !validator.isStrongPassword(password)) {
    //   return res
    //       .status(400)
    //       .json({ msg: "Password is not strong enough ! minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10" });
    // }

    // Checking if there is existing email
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          return res.status(err).json({ msg: "database connection err" });
        }
        if (result.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account whith this email already exsists !" });
        } else {
          const salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);

          // Console after password is encrypted
          // console.log("HELLO")
          // console.log(req.body);

          register(req.body, (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ msg: "Database Connection Error on register" });
            }

            //   Query to get userId
            pool.query(
              "SELECT * FROM registration WHERE user_email = ?",
              [email],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ msg: "Database Connection Error toget user id" });
                }

                req.body.userId = result[0].user_id; //from database

                //  Console after geting encrypted password and user id
                console.log(req.body);

                profile(req.body, (err, result) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "Database Connection Error to profile" });
                  }
                  return res.status(200).json({
                    msg: "New user added successfully",
                    data: result,
                  });
                });
              }
            );
          });
        }
      }
    );
  },

  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        // console.log(err);
        return res
          .status(500)
          .json({ msg: "Database Connection Error to get all users" });
      }

      return res.status(200).json({ data: results });
    });
  },

  // getUserById: (req, res) => {
  //   // console.log(req.id)
  //   userById(req.id, (err, result) => {
  //     if (err) {
  //       return res
  //         .status(500)
  //         .json({ msg: "Database Connection Error to get siiiingle user id" });
  //     }
  //     if (!result) {
  //       return res.status(404).json({
  //         msg: "Record not found",
  //       });
  //     }
  //     return res.status(200).json({ data: result });
  //   });
  // },

  getUserById: (req, res) => {
    // const id = req.params.id;
    // console.log("id===>",id,"user===>",req.id);
    userById(req.id, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ msg: "database connection err fetching single user by id " });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).json({ msg: "Not all feild has been provided " });
    }

    getUserByEmail(email, (err, result) => {
      if (err) {
        // console.log(err);
        return res
          .status(500)
          .json({ msg: "Database Connection Error to get all users" });
      }
      if (!result) {
        return res.status(404).json({
          msg: "No account with this email has been registerd",
        });
      }

      const isMatch = bcrypt.compareSync(password, result.user_password);

      if (!isMatch) {
        return res.status(500).json({ msg: "Invalid Credential" });
      }

      const token = jwt.sign({ id: result.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // console.log(token);

      return res.json({
        token,
        user: {
          id: result.user_id,
          display_name: result.user_name,
        },
      });
    });
  },
};
