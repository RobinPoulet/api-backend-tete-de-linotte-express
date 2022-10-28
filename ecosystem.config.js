module.exports = {
  apps : [{
    script: 'server.js',
    watch: '.'
  }, ],

  deploy : {
    production : {
      user : 'tete-de-linotte',
      host : 'ssh-tete-de-linotte.alwaysdata.net',
      ref  : 'origin/main',
      repo : 'git@github.com:RobinPoulet/express-mongoDb-oc.git',
      path : '/home/tete-de-linotte',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
