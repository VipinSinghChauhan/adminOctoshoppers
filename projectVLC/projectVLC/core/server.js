var http = require("http");
var emp = require("../controllers/employee");
var settings = require("../settings");
var httpMsgs = require('./httpMsgs');
//const port = 3000;
http.createServer(function (req, resp) {
    var str = req.url;

    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    resp.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    resp.setHeader('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    console.log("Header executed");
    switch (req.method) {
        case "GET":
            /* if (req.url === "/") {
                 httpMsgs.showHome(req, resp);
             }*/

            // getUser/name : used for get user id and password : table: userDetails
            if (str.includes("getUser")) {
                var pattern = '[a-z]+';
                var patt = new RegExp("/getUser/" + pattern);
                if (patt.test(req.url)) {
                    patt = new RegExp(pattern);
                    var userid = patt.exec(req.url);

                    console.log(userid.input);
                    var str = userid.input;
                    var res = str.split('/');
                    userid = res[2];
                    console.log(userid);
                    emp.getUser(req, resp, userid);
                }
            }
                
            
            // /getList/name  : to get product list corresponding to the person : table: userList
            else if (str.includes("getList")) {
                var pattern = '[a-z]+';
                var patt = new RegExp("/getList/" + pattern);
                if (patt.test(req.url)) {
                    patt = new RegExp(pattern);
                    var userid = patt.exec(req.url);

                    console.log(userid.input);
                    var str = userid.input;
                    var res = str.split('/');
                    userid = res[2];
                    console.log(userid);
                    emp.getList(req, resp, userid);
                }
              

            }
            // getProduct/product_name , get product details aisle,id,name and offers : table: productDetails
            else if (str.includes("getProduct")) {
                var pattern = '[a-z]+';
                var patt = new RegExp("/getProduct/" + pattern);
                if (patt.test(req.url)) {
                    patt = new RegExp(pattern);
                    var userid = patt.exec(req.url);

                    console.log(userid.input);
                    var str = userid.input;
                    var res = str.split('/');
                    userid = res[2];
                    console.log(userid);
                    emp.getProduct(req, resp, userid);
                }
            }


            else if (str.includes("/getAllUser")) {
                    emp.getAllUser(req, resp);
            }

            else if (str.includes("/getAllProduct")) {
                emp.getAllProduct(req, resp);
            }

            else {
                httpMsgs.show404(req, resp);
            }

            break;
        case "POST":
            // /addUser    Adding a new User to table userDetails
            if (req.url === "/addUser") {
                var reqBody = "";
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.addUser(req, resp, reqBody);
                });
            }

            else if (req.url === "/addList") {
                var reqBody = "";
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.addList(req, resp, reqBody);
                });
            }

            else if (req.url === "/addProduct") {
                var reqBody = "";
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.addProduct(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;

        case "PUT":
            if (str.includes("updateProduct")) {
                var reqBody = "";
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.updateProduct(req, resp, reqBody);
                });
            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case "DELETE":
            if (str.includes("deleteList")) {
                var reqBody = "";
                req.on("data", function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end", function () {
                    emp.deleteList(req, resp, reqBody);
                });
            }
    

    else if (str.includes("deleteProduct")) {
        var reqBody = "";
        req.on("data", function (data) {
            reqBody += data;
            if (reqBody.length > 1e7) {
                httpMsgs.show413(req, resp);
            }
        });
        req.on("end", function () {
            emp.deleteProduct(req, resp, reqBody);
        });
    }
    else {
        httpMsgs.show404(req, resp);
    }

    break;
        default:
    httpMsgs.show405(req, resp);
    break;
}

}).listen(settings.webPort, function () {
    console.log("started listening at: " + settings.webPort);
});