

const regis_users = "usersdb";
const rankuser = "user";
const rankmod = "mod";
const rankadmin = "admin";
const userDB = "user-database";
const logged = "logged";

export class OBJidentificator {
    identificator();
    id;
    userid;
    creaion_date;
}


class UserObj{
    UserObj(){};
    id;
    password;
    img;
    username;
    title;
    rank;
    setDefault() {
        this.id="000"; this.username="visit";this.rank="nouser";this.title="visit"; this.img="resources/img icon color.png";
    }
}

class postedobj extends OBJidentificator {
    postedobj(){};
    title;
    gametitle;
    description;
    gamecover;
    files;
    plataforms;
    likes; dislikes;
    ccomments_id=[];
};

class comentobj extends OBJidentificator {
    comentobj(){};
    beloning_post_id;
    likes; dislikes;
}