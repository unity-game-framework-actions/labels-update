import * as utility from './utility'

export async function updateLabels(owner: string, repo: string, config: any): Promise<void> {
  for (const label of config) {
    if (await existsLabel(owner, repo, label.name)) {
      await updateLabel(owner, repo, label.name, label.description, label.color)
    } else {
      await createLabel(owner, repo, label.name, label.description, label.color)
    }
  }
}

async function existsLabel(owner: string, repo: string, name: string): Promise<boolean> {
  const octokit = utility.getOctokit()

  try {
    await octokit.request(`GET /repos/${owner}/${repo}/labels/${name}`)
    return true
  } catch {
    return false
  }
}

async function createLabel(owner: string, repo: string, name: string, description: string, color: string): Promise<void> {
  const octokit = utility.getOctokit()

  await octokit.request(`POST /repos/${owner}/${repo}/labels`, {
    name: name,
    description: description,
    color: color
  })
}

async function updateLabel(owner: string, repo: string, name: string, description: string, color: string): Promise<void> {
  const octokit = utility.getOctokit()

  await octokit.request(`PATCH /repos/${owner}/${repo}/labels/${name}`, {
    new_name: name,
    description: description,
    color: color
  })
}
