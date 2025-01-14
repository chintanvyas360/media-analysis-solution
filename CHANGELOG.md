# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2019-08-26
### Added
- CHANGELOG file
- Support programmatically set language code when processing transcription and comprehend
- Support programmatically enable/disable specific analysis processing such as celebrity and label detection
- Retry logic when calling low TPS api (for example, get-transcription-job)

### Changed
- Updated Elasticsearch cluster version from 6.0 to 6.8

### Fixed
- Fixed front-end to correctly handle how Transcribe outputs numbers
- Fixed typo in Cognito user pool invite message
