module.exports = {
  apps: [
    {
      name: 'diploma',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      args: 'start',
      env: {
        PGHOST: 'ep-ancient-math-035022.eu-central-1.aws.neon.tech',
        PGDATABASE: 'diploma',
        PGUSER: 'postgres',
        PGPASSWORD: 'z7AxVnbOJC0W',
        PGPORT: '5432'
      }
    }
  ]
}
