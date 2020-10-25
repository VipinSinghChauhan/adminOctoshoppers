var db = require("../core/db");
var util = require("util");
var httpMsgs = require('../core/httpMsgs');


//GET METHOD
// getUser get details of indivisual user
exports.getUser = function (req, resp, userid) {
    sqls = "select * from userDetails where users = ";
    sqls += util.format("('%s')", userid);
    db.executeSql(sqls, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};
// getAllUser Details
exports.getAllUser = function (req, resp) {
    sqls = "select * from userDetails";
    db.executeSql(sqls, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};

// userList Table

// GET Method

exports.getList = function (req, resp, userid) {
    sqls = "select * from userList where users = ";
    sqls += util.format("('%s')", userid);
    db.executeSql(sqls, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};



//productDetails Table 
exports.getProduct = function (req, resp, pName) {
    sqls = "select * from productDetails where pName = ";
    sqls += util.format("('%s')", pName);
    db.executeSql(sqls, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};

exports.getAllProduct = function (req, resp) {
    sqls = "select * from productDetails";
    db.executeSql(sqls, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson(req, resp, data);
        }

    });
};


//POST METHODS

// userDetails Table
exports.addUser = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input is not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "Insert into userDetails(users,password) values ";
            sql += util.format("('%s','%s')", data.users, data.password);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input is not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
}

// table: userList
exports.addList = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input is not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "Insert into userList(users,cartID,productList) values ";
            sql += util.format("('%s',%d,'%s')", data.users, data.cartID,data.productList);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input is not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
}


// table productDetails
exports.addProduct = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input is not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "Insert into productDetails(pID, pName,aisle,pOffers) values ";
            sql += util.format("(%d,'%s','%s','%s')",data.pID, data.pName, data.aisle,data.pOffers);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input is not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
}


// UPDATES
// table: productDetails
exports.updateProduct = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input is not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "UPDATE productDetails SET ";
            var isDataProvided = false;
            if (data.pID) {
                sql += " pID = " + data.pID + ",";
                //sql + = util.format("('%s')", data.pName);
                isDataProvided = true;
            }

            if (data.aisle) {
                sql += " aisle = '" + data.aisle + "',";
                //sql + = util.format("('%s')", data.pName);
                isDataProvided = true;
            }

            if (data.pOffers) {
                sql += " pOffers = '" + data.pOffers + "',";
                //sql + = util.format("('%s')", data.pName);
                isDataProvided = true;
            }
            sql = sql.slice(0, -1);
            sql += " WHERE pName = ";
            sql += util.format("'%s'", data.pName);
            console.log(sql);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }

            });
        }
        else {
            throw new Error("Input is not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};


// DELETE Request
// table: userList(users,cartID(int),productList)
exports.deleteList = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input is not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.users) throw new Error("Empno not provided");
            var sql = "DELETE FROM userList where users = ";
            sql += util.format("('%s')", data.users);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }

            });
        }
        else {
            throw new Error("Input is not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

// table:productDetails(pID(int),pName,aisle,pOffers)
exports.deleteProduct = function (req, resp, reqBody) {
    try {
        if (!reqBody) throw new Error("Input is not valid");
        var data = JSON.parse(reqBody);
        if (data) {
            if (!data.pName) throw new Error("Empno not provided");
            var sql = "DELETE FROM productDetails where pName = ";
            sql += util.format("('%s')", data.pName);
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }

            });
        }
        else {
            throw new Error("Input is not valid");
        }
    }
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};