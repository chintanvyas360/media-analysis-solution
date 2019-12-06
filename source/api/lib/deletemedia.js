/********************************************************************************************************************* 
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.                                           * 
 *                                                                                                                    * 
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    * 
 *  with the License. A copy of the License is located at                                                             * 
 *                                                                                                                    * 
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    * 
 *                                                                                                                    * 
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES * 
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    * 
 *  and limitations under the License.                                                                                * 
 *********************************************************************************************************************/

/** 
 * @author Solution Builders 
 */

'use strict';

let AWS = require('aws-sdk');

let creds = new AWS.EnvironmentCredentials('AWS');
const s3Bucket = process.env.S3_BUCKET;

/**
 * Deletes all data pertaining to an object id
 *
 * @class deletemedia
 */
let deletemedia = (function () {

    /**
     * @class deletemedia
     * @constructor
     */
    console.log("delete media function 1")
    let deletemedia = function () { };
    /**
     * Deletes all data pertaining to an object
     * @param {string} object_id - uuid of the vizon object
     * @param {string} owner_id - cognitoIdentityId of the requester
     * @param {deletemedia~requestCallback} cb - The callback that handles the response.
     */
    deletemedia.prototype.purgeData = function (object_id, owner_id, cb) {

        console.log("purge data");
        console.log("owner_id:" + owner_id);
        let params = {
            Bucket: s3Bucket,
            Delete: {
                Objects: [
                    { Key: ['mediaconvert', 'private', owner_id, 'vizon', object_id].join('/') },
                    { Key: ['private', owner_id, 'vizon', object_id].join('/') }
                ]
            }
        };
        console.log("deleting");
        console.log(params.Delete.Objects)

        purgeDataHandler(params, owner_id, object_id, function (err, data) {
            console.log("purge data handler")
            if (err) {
                console.log(err);
                return cb(err, null);
            }
            else {
                console.log('purged data');
                console.log(data);
                return cb(null, data);
            }
        });
    };

    /**
      * Deletes data from S3
      * @param {JSON} params - location of the result file
      * @param {string} owner_id - cognitoIdentityId of the requester
      * @param {string} object_id - uuid of the vizon object
      * @param {retrieveData~callback} cb - The callback that handles the response.
      */

    let purgeDataHandler = function (params, owner_id, object_id, cb) {
        let s3 = new AWS.S3();
        s3.deleteObjects(params, function (err, data) {
            if (err) {
                console.log(err);
                return cb(`Failed to delete data related to ${objectId}`, null);
            }
            else {
                return cb(null, data);
            }
        });
    };

    return deletemedia;

})();

module.exports = deletemedia;