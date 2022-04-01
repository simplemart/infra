# infra

1. `npx cdk bootstrap aws://AWS_ACCOUNT/AWS_REGION --profile YOUR_AWS_PROFILE`
2. `echo AWS_PROFILE=YOUR_AWS_PROFILE > .env`
3. `./yr build`
4. `./yr deploy`

## Structure

* Org
  * root (management acc)
  * Security OU
    * Prod OU
      * SecurityReadOnlyProd Acc
      * SecurityToolingProd Acc
      * SecurityLogArchiveProd Acc
    * SDLC OU
        * SecurityToolingTest Acc
  * Infrastructure OU
      * Prod OU
          * OfficeNetworkProd Acc
      * SDLC OU
          * OfficeNetworkTest Acc
  * Sandbox OU
    * Ellis Acc
    * Rochelle Acc
  * Workloads OU
      * Prod OU
          * ApiProd Acc
          * WebProd Acc
      * SDLC OU
          * WebQa Acc
          * ApiNick Acc
  * PolicyStaging OU
