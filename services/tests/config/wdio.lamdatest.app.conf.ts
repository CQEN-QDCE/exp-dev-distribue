import { config } from './wdio.conf'

config.specs = ['../test/features/**/*.feature']

config.user = process.env.LT_USERNAME
config.key = process.env.LT_ACCESS_KEY

config.services.push(
  ['lambdatest', {
    tunnel: true,
    ltErrorRemark: true,
    preferScenarioName: true,
    useScenarioName: true
  }]
)

config.capabilities = [
  {
    browserName: 'Chrome',
    browserVersion: '120.0'
  },
]

exports.config = config