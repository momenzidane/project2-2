const { dbConnection } = require("../configuration");
const { userValidator } = require("../validation");
const {hashSync}= require('bcryptjs');
//class User
class User {

  constructor(userData) {
       this.userData = userData;
  }

//funcition (save) insert data to database by collection user
  save(cb) {
      dbConnection("user", async (collection) => {
        try {
             const hashPassword = hashSync(this.userData.password)
             this.userData.password= hashPassword
             await collection.insertOne(this.userData);
             cb({
              status : true
             })
        } catch (error) {
             cb({
                status : false,
                message : 'some of the problem in to the save function'
             })
        }
      })
    }
  

//funcition (validate) validate data 
  static validate(userData) {
    try {
      const validationResult = userValidator.validate(userData);
      return validationResult;
    } catch (error) {
      return{
        status: false,
        message: 'some of the problme in to the validate function'
      }
    }
  }

// check data is exist before insert data
  isExist() {
    return new Promise((resolve, reject) => {
      dbConnection("user", async (collection) => {
          try {
            const user = await collection.findOne({
              $or: [
                { email: this.userData.email },
                { username: this.userData.username },
              ],
            });

            //if check false --> Ok--> user and email not exist
            if (!user) {
              resolve({
                check: false,
              });
            } else {
              if (user.email == this.userData.email) {
                resolve({
                  check: true,
                  message: "The email is already used",
                });
              } else if (user.username === this.userData.username) {
                resolve({
                  check: true,
                  message: "The username is already used",
                });
              }
            }
          } catch (error) {
            reject(error)
          }
      });
    });
  }
}
module.exports = User;


//*****************manuoall insert data ********************

// const userData = {
//   name: "yara",
//   email: "yara@gmail.com",
//   username: "yara223",
//   password: "AaA0593098132",
// };

// const user = new User(userData);
// const valueResalt = User.validate(userData);
// // console.log(valueResalt.error);

// user
//   .isExist()
//   .then((result) => {
//     console.log(result);
//     if (result.check == false) {
//       if (valueResalt.error) {
//             console.log(valueResalt.error);
//             return;
//       } else {
//             user.save();
//             console.log("sucss added ");
//       }
//     }
//   })
//   .catch((err) => {
   
//   });
