var  express = require('express');
var  bodyParser = require('body-parser');
var  cors = require('cors');
var  app = express();
var  router = express.Router();
var  config = require('./config');
const  sql = require('mssql');
  
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/app', router);


router.use((req, res, next) => {
    console.log('done!!');
    next();
  });
 
  // add/get/patch/delete Data to/from SQLserver //    IMP : Table = Employees ,with coulmn (id-firstname-........) and u change only Employees to your table //

  // 1 add data //


  
 
  
  router.route('/Employees').post((req, res) => {
    
    let  id =  req.body.EMP_Id 
    let  firstName =  req.body.EMP_FirstName
    let  lastName=  req.body.EMP_LastName
    let  experience=  req.body.EMP_Experience
    let  address =  req.body.EMP_Adddress
    let  jobgrade =  req.body.EMP_JobGradde
    let  dateofbirth =  req.body.EMP_DateOfBirth
    let  phone =  req.body.EMP_Phone
    let salary =  req.body.EMP_Salary
    const funcEmployeess =async  function () {
      try {
        let  pool = await  sql.connect(config);
        let   insertAirPortDB = await  pool.request()
        .input('EMP_Id', sql.Int)
        .input('EMP_FirstName', sql.VarChar)
        .input('EMP_LastName', sql.VarChar)
        .input('EMP_Experience', sql.VarChar)
        .input('EMP_Adddress', sql.VarChar)
        .input('EMP_JobGrade', sql.VarChar)
        .input('EMP_DateOfBirth', sql.VarChar)
        .input('EMP_Phone', sql.VarChar)
        .input('EMP_Salary', sql.VarChar)


        .query(`INSERT INTO EMPLOYEES(EMP_Id,EMP_FirstName,EMP_LastName,EMP_Experience,EMP_Adddress,EMP_JobGrade,EMP_DateOfBirth,EMP_Phone,EMP_Salary) VALUES(${id},'${firstName}','${lastName}','${experience}','${address}','${jobgrade}','${dateofbirth}','${phone}','${salary}');`)
        return insertAirPortDB.recordsets;
      
      }
      catch (err) {
        console.log(err.message);
      }
    }

    funcEmployeess().then((data)  => {
      res.status(201).send(data);
    })
  })
  
 


  // 2 get all data //


  
  router.route('/Employees').get((req, res) => {
  const getEMPLOYEES =async  function() {
    try {
      
      let  pool = await  sql.connect(config);
      let  insertAirPortDB = await  pool.request().query("SELECT * from EMPLOYEES");
      
      return  insertAirPortDB.recordsets;
    }
    catch (error) {
      console.log(error.message);
    }
    }
      getEMPLOYEES().then((data) => {
        res.status(200).json(data[0]);
      })
      })
  


  // 3 get data //

 
  router.route('/Employees/:id').get((req,res) => {
      const getEMPLOYEES = async  function () {
        try {
          var id = req.params.id
          let  pool = await  sql.connect(config);
          let  insertAirPortDB = await  pool.request()
          .input('EMP_Id', sql.Int)
          .query(`SELECT * from EMPLOYEES where EMP_Id = ${id} `);
          return  insertAirPortDB.recordsets;
        }
        catch (error) {
          console.log(error);
        }
      }
      getEMPLOYEES().then((data) => {
            res.status(200).json(data);
          })
  })
 


  // 4 update data //


 router.route('/Employees/:id').patch((req, res) => {
    
  let  id =  req.params.id
    let  firstName =  req.body.EMP_FirstName
    let  lastName=  req.body.EMP_LastName
    let  experience=  req.body.EMP_Experience
    let  address =  req.body.EMP_Adddress
    let  jobgrade =  req.body.EMP_JobGradde
    let  dateofbirth =  req.body.EMP_DateOfBirth
    let  phone =  req.body.EMP_Phone
    const editEMPLOYEES =async  function () {
      try {
        let  pool = await  sql.connect(config);
        let   insertAirPortDB = await  pool.request()
        .input('EMP_Id', sql.Int)
        .input('EMP_FirstName', sql.VarChar)
        .input('EMP_LastName', sql.VarChar)
        .input('EMP_Experience', sql.VarChar)
        .input('EMP_Adddress', sql.VarChar)
        .input('EMP_JobGrade', sql.VarChar)
        .input('EMP_DateOfBirth', sql.VarChar)
        .input('EMP_Phone', sql.VarChar)
        .input('EMP_Salary', sql.VarChar)
      .query(`UPDATE EMPLOYEES SET EMP_FirstName ='${firstName}', EMP_LastName ='${lastName}',EMP_Experience ='${experience}', EMP_Adddress ='${address}', EMP_JobGrade ='${jobgrade}', EMP_DateOfBirth ='${dateofbirth}', EMP_Phone ='${phone}' WHERE EMP_Id= ${id}`)
      return insertAirPortDB.recordsets;
    
    }
    catch (err) {
      console.log(err.message);
    }
  }

  editEMPLOYEES().then((data)  => {
    res.status(201).send(data);
  })

 })

// 5 delete data //


 router.route('/Employees/:id').delete((req, res) => {
  var id = req.params.id
   const deleteEMPLOYEES =async  function() {
     try {
       
       let  pool = await  sql.connect(config);
       let  insertAirPortDB = await  pool.request().query(`DELETE FROM EMPLOYEES WHERE EMP_ID=${id}`);
       
       return  insertAirPortDB.recordsets;
     }
     catch (error) {
       console.log(error.message);
     }
    }
       deleteEMPLOYEES().then((data) => {
         res.status(200).send('done deleted !!!');
       })
 })

 


var  port = process.env.PORT || 8090;
app.listen(port);
console.log('YOUR DB API is runnning at ' + port);