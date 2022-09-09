// const express = require('express')
// const multer=require('multer')

// const fs=require('file-system');
// const path = require('path');
// const app = express()
// const port = 3000
// const uploadfile=
// // multer({
// //   storage:multer.diskStorage({
// //     destination:function(req,file,cb){
// //       // console.log(file)
// //       cb(null,"uploads")
// //     },
// //     filename:function(req,file,cb){
      
// //       cb(null,file.originalname)
// //     }
// //   })
// // }).single("user_file")

// multer({storage:multer.diskStorage({
//   destination: function (req, file, cb) {
//        cb(null, "uploads")
//    },
//    filename: function (req, file, cb) {
//      console.log(file);
     
//        cb(null, file.originalname)
     
//  },
//  fileFilter: function (req, file, cb) {
//   var ext = path.extname(file.originalname);
//   if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg')
//    {
//       cb(new Error('Wrong extension type'), false);
//   }
//   cb(null, true)
// }
// })}).single("user_file")








// app.post('/upload',uploadfile,async (req, res) => {
 
//    console.log(req.file);
//   res.send('send successful')
// })
// app.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })






const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { readdir } = require('node:fs/promises');
var fs = require('file-system');
const { send } = require("process");


const app = express();


app.use(express.json());


app.use(cors())




app.get("/test", async (req, res) => {
  console.log(req.body);
  //   res.send(req.body)
  res.send("Its working 2")
})


const newUploads = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      // fs.exists("uploads" + file.originalname, function(exists) {
      //   let uploadedFileName;
      //   if (exists) {
      //      console.log("already exist")
      //   } else {
      //       uploadedFileName = file.originalname;
      //   } 
      //   cb(null, uploadedFileName)
      // });

      if (fs.existsSync(path.join("uploads",file.originalname))) {
        req.fileValidationError="File Already uploaded";
        // console.log(req.fileValidationError)
         cb(null, req.fileValidationError);
      }else{
        cb(null, file.originalname)
      }
   
    }
  })
}).single("user_file")



app.post('/upload', newUploads, async (req, res) => 
{
  if(req.fileValidationError)
  {
  res.send(req.fileValidationError)
  }
  else
  {
    res.send('uploaded file')
  }
})

// app.post("/login",(req,res)=>{
//   console.log(req.body,"hiii");
//   res.send(req.body)
// })


// app.post("/patientEntry", async (req, res) => {
//     console.log(req.body, " hi");
//   const patient = new PatientModel({ patientName: req.body.patientName, price: req.body.price });
//   try {
//     await patient.save();
//   } catch (err) {
//     console.log(err);
//   }
//   res.send("data");
// });

// app.get("/patientRecords",(req,res)=>{
//   PatientModel.find({},(err,result)=>{
//     console.log(result);
//    if(err)
//    res.send(err)
//    else
//    res.json(result)
//   })
// })

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on ${port} `);
});


