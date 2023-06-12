import * as usersDao from "./users-dao.js";

var currentUserVar;
const AuthController = (app) => {
  const register = async(req, res) => {
    const username = req.body.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const tmp=req.body;
    tmp._id = (new Date()).getTime() + '';
    const newUser = usersDao.createUser(tmp);
    currentUserVar = newUser;
    // req.session["currentUser"] = tmp;
    res.json(newUser);
  };

  const login = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);
    if (user) {
      currentUserVar = user;
      // req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    const currentUser = currentUserVar;
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update   = (req, res) => {

    const userId = req.params['uid'];
    const updates = req.body;
    usersDao.updateUser(userId,updates);
    res.json(updates);
    //res.sendStatus(200);

  };


  app.post("/api/users/register", register);
  app.post("/api/users/login",    login);
  app.post("/api/users/profile",  profile);
  app.post("/api/users/logout",   logout);
  app.put ("/api/users/:uid",          update);
};
export default AuthController;