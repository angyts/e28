#Continuous Deployment of any static site to AWS S3 bucket in less than 30minutes!

# Table of contents
1. [Introduction](#introduction)
2. [Some paragraph](#paragraph1)
    1. [Sub paragraph](#subparagraph1)
3. [Another paragraph](#paragraph2)

## This is the introduction <a name="introduction"></a>
Static sites are all the rage in the galaxy at the moment. 

The internet started with them, if you still can remember
![Million Dollar Page](https://en.wikipedia.org/wiki/The_Million_Dollar_Homepage#/media/File:The_Million_Dollar_Homepage.png)
 
 then we got adventurous running bigger and bigger backend servers.

![TEst image](images/getting%20started.png)

###Why?
- Cheap
- Fast
- "Serverless environment"

###Why Not?
- Appears rather daunting
- The configurations might kill me

## Seems like there are many ways to skin the cat <a name="paragraph1"></a>
###AWS cloudformation --> AWS lambda --> S3  <a name="subparagraph1"></a>
https://developer.okta.com/blog/2018/07/31/use-aws-cloudformation-to-automate-static-site-deployment-with-s3

###Github --> Github Webhooks --> AWS CodePipeline --> S3
https://medium.com/@sithum/automate-static-website-deployment-from-github-to-s3-using-aws-codepipeline-16acca25ebc1

###Github --> AWS CodePipeline --> CodeBuild --> S3
[Automatic static site deployment](https://medium.com/@hzburki.hzb/automate-static-site-deployment-on-s3-with-aws-codebuild-8b2546a360df)

https://medium.com/faun/deploy-static-website-to-amazon-s3-from-github-repository-3f1245d2a780

**Codebuild might actually be key to the deployment because the Vue needs to be built, but are there alternatives?**

###Gitlab --> S3 **What is gitlab??**
https://www.codementor.io/@mariuszmasztalerczuk/automatic-deployment-of-an-app-from-git-branch-to-s3-p634n6d2u

###Github Actions
https://blog.kylegalbraith.com/2019/12/09/deploying-your-static-websites-to-aws-in-style-using-github-actions/

###Use NPM build command + AWS CLI
https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html

###Use NPM package
https://www.npmjs.com/package/deploy-aws-s3-cloudfront 

### Vue-cli add on 
https://github.com/multiplegeorges/vue-cli-plugin-s3-deploy

### I love bash
https://www.tothenew.com/blog/automating-deployment-of-a-static-website-hosted-on-amazon-s3/
https://s3tools.org/s3cmd

### I love third party tools
Travis CI
https://app.wercker.com/sessions/new?return_url=%2F
https://codeship.com/
https://app.shippable.com/

## Another paragraph <a name="paragraph2"></a>
The second paragraph text