export let verificarAdmin = (req) => {
    let activeSession;
    let admin;
    if (req.session?.user) {
      activeSession = true;
    } else {
      activeSession = false;
    }
    if (req.session?.user.rol == "admin") {
      admin = true;
    } else {
      admin = false;
    }
    return {activeSession, admin};
};