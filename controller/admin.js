const { QueryTypes } = require('sequelize');

class admin
{
    static async login(db,obj) {
        console.log(obj);      
                      
              const user = await db.Admin.sequelize.query(
                'SELECT * FROM Admins WHERE id = :id',
                {
                  replacements: { id: obj.id },
                  type: QueryTypes.SELECT,
                });
              console.log(user.length)
              if (!user.length) {
                
                return false;
              }
          
              console.log(user, obj.password, user[0].email);
              if (user[0].password_hash=== obj.password) {
                
                console.log(user[0].password_hash, obj.password);
                
                return true;
              } else {
                return false
                
              }
            
        
    }

}
module.exports=admin;