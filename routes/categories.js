var mysql = require('mysql');
module.exports = function(connectionPool, boonex_modules) {
    return {
        get: {
            categories: function(req, res){
                try{
                    connectionPool.getConnection(function (err, connection) {
                        connection.query('SELECT * FROM  sys_categories', null, function(){
                            res.send({
                                result: 'success',
                                err: '',
                                json: rows                                        
                            });
                            connection.release();
                        });
                    });
                }catch(e){
                    
                }
                
            }
        },
        post: {
        }
    };
};