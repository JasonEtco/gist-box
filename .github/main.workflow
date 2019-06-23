workflow "Test my code" {
  on = "push"
  resolves = ["codecov"]
}

action "CI" {
  uses = "docker://node:lts-alpine"
  runs = "npm"
  args = "cit"
}

action "codecov" {
  needs = "CI"
  uses = "docker://node:lts"
  runs = "npx"
  args = "codecov"
  secrets = ["CODECOV_TOKEN"]
}
