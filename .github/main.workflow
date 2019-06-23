workflow "Test my code" {
  on = "push"
  resolves = ["codecov"]
}

action "install and test" {
  uses = "docker://node:lts-alpine"
  runs = "npm"
  args = "cit"
}

action "codecov" {
  needs = "install and test"
  uses = "docker://node:lts"
  runs = "npx"
  args = "codecov"
  secrets = ["CODECOV_TOKEN"]
}
