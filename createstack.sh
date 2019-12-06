#!/bin/bash
#
# This file is created to automatically build and deploy this solution
cd deployment || exit
./build-s3-dist.sh vizon-analysis-new vizon-analysis v1.0.0
aws s3 cp ./regional-s3-assets/ s3://vizon-analysis-new-us-east-1/vizon-analysis/v1.0.0/ --recursive --acl bucket-owner-full-control --profile bv-vchintan
aws cloudformation deploy --template-file ./regional-s3-assets/vizon-analysis-deploy.template --stack-name vizon-stack --region us-east-1 --parameter-overrides Email=chintan_vyas@berkeley.edu --capabilities CAPABILITY_IAM --profile bv-vchintan