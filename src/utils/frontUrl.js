const FRONT_LOGIN = "/"
const FRONT_ERROR = "/*"
const FRONT_FORGOT_PASSWORD = "/reset/password"
const FRONT_RESET_PASSWORD = "/reset/password/token/:token"
const FRONT_CGU ="/cgu"
const FRONT_CONFIDENTIAL = "/confidential"
const FRONT_RULES = "/rules"
const FRONT_POLICY = "/policy"

// LOGGED USER

const FRONT_HOME = "/home"
const FRONT_TRAINER_PRATICAL_LIFE = "/trainer-pratical-life"

const FRONT_FORMATION_DETAIL = "/formations/:id"
const FRONT_FORMATION_DETAIL_PROMOTION_DETAIL = "/formations/:formationId/promotions/:promotionId"


// ADMIN

const FRONT_ADMIN_DASHBOARD = "/admin/dashboard"

const FRONT_ADMIN_USERS = "/admin/users"
const FRONT_ADMIN_USERDETAILS ="/admin/users/:id"
const FRONT_ADMIN_ADD_USERS = "/admin/users/add"

const FRONT_ADMIN_TRAINING= "/admin/training"
const FRONT_ADMIN_ADD_TRAINING = "/admin/training/add"
const FRONT_ADMIN_TRAININGDETAILS = "/admin/training/:id"

const FRONT_ADMIN_EVALUATION = "/admin/evaluation"

const FRONT_ADMIN_PROMOTION= "/admin/promotions"
const FRONT_ADMIN_ADD_PROMOTION = "/admin/promotions/add"
const FRONT_ADMIN_PROMOTIONDETAILS = "/admin/promotions/:id"




export {FRONT_LOGIN, FRONT_ERROR, FRONT_RESET_PASSWORD, FRONT_HOME, FRONT_TRAINER_PRATICAL_LIFE,
     FRONT_FORMATION_DETAIL, FRONT_FORMATION_DETAIL_PROMOTION_DETAIL, FRONT_ADMIN_USERS,
      FRONT_ADMIN_ADD_USERS, FRONT_ADMIN_DASHBOARD, FRONT_ADMIN_EVALUATION, FRONT_ADMIN_TRAINING,
       FRONT_ADMIN_PROMOTION, FRONT_ADMIN_USERDETAILS, FRONT_ADMIN_ADD_TRAINING,
        FRONT_ADMIN_TRAININGDETAILS, FRONT_ADMIN_PROMOTIONDETAILS, FRONT_ADMIN_ADD_PROMOTION,
        FRONT_FORGOT_PASSWORD, FRONT_CGU, FRONT_POLICY, FRONT_RULES, FRONT_CONFIDENTIAL,
        
     
     }