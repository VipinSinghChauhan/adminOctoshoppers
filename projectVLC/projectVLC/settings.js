exports.dbConfig = {
    user: "vcp1cob@myvlcproject.database.windows.net",
    password: "VipAzure@1358",
    server: "myvlcproject.database.windows.net",
    database: "projectVLC",
    port: 1433,
    options: {
        encrypt:true
    }
};
exports.webPort = process.env.PORT || 9000;


exports.httpMsgsFormat = "JSON";