module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  }, ],

  deploy : {
    production : {
      key  : "/c/Users/dev2/.ssh/id_ed25519",
      user : 'tete-de-linotte',
      host : 'ssh-tete-de-linotte.alwaysdata.net',
      ref  : 'origin/main',
      repo : 'git@github.com:RobinPoulet/express-mongoDb-oc.git',
      path : '/home/tete-de-linotte/tdl_backend',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
