module.exports = {
  apps: [{
    name: '𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐞𝐫𝐠𝐫𝐚𝐝𝐞𝐧',
    script: './index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true
  }]
};
