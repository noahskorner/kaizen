# Continous Integration / Continuous Deployment

## GitHub Workflow

The GitHub workflow [found here](./github/workflows.kaizen-ci.yml), currently runs the following checks that must pass before merging PRs:

1. Lint
2. Build
3. Test

The `test` check spins up a docker container for integration testing. The `docker-compose.yml` can be [found here](/docker-compose.yml).

## Continous Deployment

