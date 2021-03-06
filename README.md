# Refactr CLI

The Refactr command line tool is used to interact with the Refactr Platform API from the command line.

Basic usage and installation is described below. [Click here for complete Refactr CLI documentation.](https://docs.refactr.it/docs/using-the-cli/)

**NOTE**: version `1.x` has been redone from scratch and is not compatible with `0.12.x`.

## Usage

```shell
$ refactrctl --help   
Usage: refactrctl <command> [options]

Commands:
  refactrctl run             Execute pipeline or job
  refactrctl rerun [run-id]  Reschedule pipeline run
  refactrctl delete          Delete specified resource
  refactrctl list            List specified resources
  refactrctl get             Get specified resource
  refactrctl create          Create specified resource

Options:
      --version     Show version number                                                                        [boolean]
  -v, --verbose     Print detailed output                                                                      [boolean]
      --format      Output format                                    [choices: "wide", "json", "yaml"] [default: "wide"]
      --filter      Filter output using JsonPath                                                                [string]
      --address     Address of the Refactr API server
                    [string] [default: REFACTR_ADDRESS environment variable if set, otherwise https://api.refactr.it/v1]
      --auth-token  Authentication token                     [string] [default: REFACTR_AUTH_TOKEN environment variable]
      --help        Show help                                                                                  [boolean]
```

## Installation

### Binary

Starting from version `1.0.0` the CLI is primarily distributed via binary builds.
Currently, we provide official binaries for Linux and macOS. Get the
latest version from [this page](https://github.com/refactr/refactr-cli/releases/latest),
and download the archive file for your operating system/architecture.
Unpack the archive, and put the binary somewhere in your `$PATH` (e.g. on UNIX-y systems `/usr/local/bin`).
Make sure it has execution permission granted.

### npm

To get the latest version of the CLI tool, use `npm`:

```shell
$ npm install @refactr/cli -g
```

or with `yarn`:
```shell
$ yarn global add @refactr/cli
```

### Docker

The CLI [available on Docker Hub](https://hub.docker.com/r/refactr/cli) as well:

```shell
$ docker pull refactr/cli
```

## License
Refactr CLI is [MIT](./LICENSE) licensed.
