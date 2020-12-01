# bazelisk-action

Installs bazelisk as a Github Action.

## Usage

```
jobs:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout
      uses: actions/checkout@v2
      
    - name: Install Bazelisk
      uses: vsco/bazelisk-action@1.1
      with:
        # [required]
        # Version of Bazelisk we would like to install, defaults to 1.5.0
        version: '1.5.0'
        # [required]
        # Install path for Bazelisk binaries, defaults to ./.local/bin
        bazel-install-path: './.local/bin'
        # [required]
        # The OS of the system that wishes to install Bazelisk. Can be 'darwin' or 'linux'
        os: 'linux'
```

## License

The Javascript Github Action and any documentation is released under the MIT License.
Check LICENSE.md for more info.
