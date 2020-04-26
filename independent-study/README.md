#Continuous Deployment of any static site to AWS S3 bucket in less than 30 minutes!

# Table of contents
1. [Introduction](#introduction)
2. [What is this about?](#paragraph1)
    1. [Why?](#subparagraph1)
3. [Another paragraph](#paragraph2)

## Why do I want to do this?<a name="introduction"></a>
Static sites are all the rage in the galaxy at the moment. 

The internet started with them, if you still can remember.
| ![Million Dollar Page](images/million-dollar-page.png) | 
|:--:| 
| *Million dollar page screenshot (Disclaimer: I am not affiliated with them in any way)* |
 
Then we got adventurous running bigger and bigger backend servers with whatever programming language we can lay our hands on. 
The trouble we soon realised is that there are simply too many humans in this world, and the moment something goes viral, **everyone** wants to have a piece of it.
| ![Burning Servers](images/burning.jpg) | 
|:--:| 
| *Burning Servers* |

Me sleeping at 3am: "No Sir, I'm not going to rescue your burning servers right now, not even if you pay me double."

So we came up with more and more complexity in autoscaling, CDN and many crowd control measures. They still work and are very much a large part of our current world, nothing wrong.

And developers started moving towards a `serverless` stack which is quite a misnomer as well. Before discovering a [new type of hell](https://medium.com/xebia-engineering/11-reasons-why-you-are-going-to-fail-with-microservices-29b93876268b).

**This article will share with you how to "keep it simple", commit to github, publish to website, sleep in peace, rinse and repeat**

##What is this about?<a name="paragraph1"></a>
By the end of this article, you should be able to:
- Make a `git push`
- Make `github actions` pick up on any deployments
- Publish your site on an S3 bucket automatically

###Why?<a name="subparagraph1"></a>
- It's simple.
- It's cheap, infinitely, actually free for low traffic sites.
- It scales, infinitely.
- You can run tests before you deploy (please stay tuned for the next article!).

###Why Not?
- It appears rather daunting. (If you stop reading here and not continue.)
- The configurations might kill me. (Perhaps it might without a guiding hand here.)
- Without some human eyeballs, you might actually deploy something you do not want to deploy out in the public domain. Like secrets, passwords, keys and who your girlfriend is. (You could start by adding [the following]() to your `.gitignore`)
- 

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