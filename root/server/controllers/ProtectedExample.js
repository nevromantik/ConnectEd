const {isAuth} = require('../utils/isAuth');



module.exports.panel = async (req, res) => {
    try {
      const userId = isAuth(req);
      if(userId !== null){
        res.send({
            data: 'Protected data! '
        })
      }
    } catch(error) {
        res.send({
            error: error.message
        })
    }
}


 