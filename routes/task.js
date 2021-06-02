var express = require('express');
var router = express.Router();
var fs = require("fs");
const { exec } = require("child_process");

router.get('/createTask', function(req, res) {
    var newTask = new Task();

    newTask.save(function(err, data) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    })
});


router.get('/task/:id', function(req, res) {

    if (req.params.id) {
        Task.findOne({ _id: req.params.id }, function(err, data) {
            if (err) {
                console.log(err);
                res.render('error');
            }

            if (data) {
                res.render('task', { data: data ,roomId: data.id});
            } else {
                res.render('error');
            }
        })
    } else {
        res.render('error');
    }
});

router.post('/task/:id', function(req,res){
    id = req.params.id;
    lang = req.body.lang;
    code = req.body.code;
    input = req.body.input;
    let output = "not much";

    codedir = 'codes/'+id;

    // make folder of name id
    fs.mkdir(codedir, function(err){
        if(err) console.log(err);
        else console.log("code folder created!");
        // make input file
        fs.appendFile(codedir + "/input.txt", input, function (err) {
            if (err) throw err;
            console.log("input file created!");
            // select language
            if(lang=="C++"){
                // make code file
                fs.appendFile(codedir + "/main.cpp", code, function (err) {
                    if (err) throw err;
                    console.log("code file created!");
                    // running script for C++
                    fs.appendFile(codedir + "/runner.py", "import os;os.system('g++ -o /project/main /project/main.cpp');os.system('/project/main < /project/input.txt');", function (err) {
                        if (err) throw err;
                        console.log("runner script created.");
                        // execute cmd in docker container
                        exec("docker run -v $(pwd)/"+codedir+":/project my-cont python3 /project/runner.py", (err, stdout, stderr) => {
                            if (err) console.log(err);
                            console.log("Done!");
                            output = stdout;
                            console.log(output);
                            fs.rmdirSync(codedir, { recursive: true });
                            res.render("task", { output: output });
                        });
                    });
                });           
            }
            if (lang=="C") {
                // make code file
                fs.appendFile(codedir + "/main.c", code, function (err) {
                    if (err) throw err;
                    console.log("code file created!");
                    // running script for C
                    fs.appendFile(codedir + "/runner.py", "import os;os.system('g++ -o /project/main /project/main.c');os.system('/project/main < /project/input.txt');", function (err) {
                        if (err) throw err;
                        console.log("runner script created.");
                        // execute cmd in docker container
                        exec("docker run -v $(pwd)/"+codedir+":/project my-cont python3 /project/runner.py", (err, stdout, stderr) => {
                            if (err) console.log(err);
                            console.log("Done!");
                            output = stdout;
                            console.log(output);
                            fs.rmdirSync(codedir, { recursive: true });
                            res.render("task", { output: output });
                        });
                    });
                });
            }
            if(lang=="Python"){
                fs.appendFile(codedir + "/main.py", code, function (err) {
                    if (err) throw err;
                    console.log("code file created!");
                    exec("docker run -v $(pwd)/"+codedir+":/project my-cont python3 /project/main.py", (err, stdout, stderr) => {
                        if (err) console.log(err);
                        console.log("Done!");
                        output = stdout;
                        console.log(output);
                        fs.rmdirSync(codedir, { recursive: true });
                        res.render("task", { output: output });
                    });
                });
            }
        });
    });
})




module.exports = router;