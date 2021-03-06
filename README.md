# check-commit-action  

![Lint](https://github.com/HikawaRin/check-commit-action/workflows/Lint/badge.svg)  

This Action check your commit message with commitlint.  
At this repository we uesd the [commitlint-config-megengine](https://github.com/HikawaRin/commitlint-config-megengine.git) style.  

## Usage  

See [lint.yml](https://github.com/HikawaRin/check-commit-action/blob/master/.github/workflows/lint.yml)  

Basic:  

```yml
steps:
    # Set up node enviroment
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: '12'
    - run: npm install
    - run: npm test
    # give execute permission for current path
    - run: chmod -R +x ./
    - uses: HikawaRin/check-commit-action@master
      id: 'lint'
      with: 
        config: 'megengine'
```

## License  

The scripts and documentation in this project are released under the [MIT License](https://github.com/HikawaRin/check-commit-action/blob/master/LICENSE).  
