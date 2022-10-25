var express = require('express');
const bodyParser = require("express");
const koneksi = require('./database/user')
const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const querySql = 'SELECT * FROM user_data';
    koneksi.query(querySql,(err,rows,field)=>{
        if(err){
            return res.status(500).json({message:"Status internal server eror", error:err})
        }
        res.status(200).json({success:true , data: rows})
    })
})

app.post('/insert/student',(req, res)=>{
    const data = { ...req.body };
    const querySql = 'INSERT INTO user_data SET ?';
    if(data.id == null || data.id == ""){
        return res.status(400).json({ message: 'id tidak boleh kosong!', error: "id null" });
    }
    if(data.name == null || data.name == ""){
        return res.status(400).json({ message: 'nama tidak boleh kosong!', error: "name null" });
    }
    if(data.grade == null || data.grade == ""){
        return res.status(400).json({ message: 'grade tidak boleh kosong!', error: "grade null" });
    }
    if(data.age == null || data.age == ""){
        return res.status(400).json({ message: 'age tidak boleh kosong!', error: "age null" });
    }

    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data!', error: err });
        }
        // jika request berhasil
        res.status(201).json({ success: true, message: 'Berhasil insert data!' });
    });
})

app.post('/register',(req, res)=>{
    const data = { ...req.body };
    const querySql = 'INSERT INTO user_login SET ?';
    if(data.name == null || data.name == ""){
        return res.status(400).json({ message: 'name tidak boleh kosong!', error: "name null" });
    }
    if(data.password == null || data.password == ""){
        return res.status(400).json({ message: 'password tidak boleh kosong!', error: "password null" });
    }
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data!', error: err });
        }
        // jika request berhasil
        res.status(201).json({ success: true, message: 'Berhasil insert data!' });
    });
})

app.post('/login',(req, res)=>{
    const data = { ...req.body };
    if(data.name == null || data.name == ""){
        return res.status(400).json({ message: 'nama tidak boleh kosong!', error: "name null" });
    }
    if(data.password == null || data.password == ""){
        return res.status(400).json({ message: 'password tidak boleh kosong !', error: "password null" });
    }
    const querySql = "SELECT * FROM user_login WHERE name ="+data.name;
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Pasword atau Name salah!', error: err });
        }
        // jika request berhasil
        res.status(201).json({ success: true, message: 'Berhasil Login' });
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})