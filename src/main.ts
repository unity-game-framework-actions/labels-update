import * as core from '@actions/core'
import * as utility from './utility'
import * as action from './action'

run()

async function run(): Promise<void> {
  try {
    const repository = utility.getRepository()
    const config = await utility.readConfigAny()

    await action.updateLabels(repository.owner, repository.repo, config)
  } catch (error) {
    core.setFailed(error.message)
  }
}
